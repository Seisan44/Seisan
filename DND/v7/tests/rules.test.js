import { test } from 'node:test';
import assert from 'node:assert/strict';
import './helpers.js';

const rules = await import('../js/character/rules.js');
const vitals = await import('../js/character/vitals.js');
const dice = await import('../js/dice.js');

test('bonus de maîtrise par niveau', () => {
  assert.deepEqual([1, 4, 5, 9, 13, 17, 20].map(rules.proficiencyBonus), [2, 2, 3, 4, 5, 6, 6]);
});

test('CA des armures : Dex plafonnée, armure lourde, bouclier', () => {
  assert.equal(rules.parseArmorCA('11 + modificateur de Dex', 3).value, 14);
  assert.equal(rules.parseArmorCA('14 + modificateur de Dex (max 2)', 4).value, 16);
  assert.equal(rules.parseArmorCA('16', 3).value, 16);
  assert.equal(rules.computeArmorClass({ dexMod: 2, armorCA: null, hasShield: true }).value, 14);
});

test('vitesse : -3 m si la Force est insuffisante pour l\'armure, 1,50 m si surchargé', () => {
  assert.equal(rules.computeSpeed({ speciesSpeedLabel: '9 m', forceScore: 12, armorForceReq: 13 }).value, 6);
  assert.equal(rules.computeSpeed({ speciesSpeedLabel: '9 m', forceScore: 13, armorForceReq: 13 }).value, 9);
  assert.equal(rules.computeSpeed({ speciesSpeedLabel: '9 m', forceScore: 15, overloaded: true }).value, 1.5);
});

test('DD et attaque de sort', () => {
  assert.equal(rules.spellSaveDC(2, 3), 13);
  assert.equal(rules.spellAttackBonus(2, 3), 5);
});

test('expertise : bonus de maîtrise doublé, seulement sur une compétence maîtrisée', () => {
  const ch = { skills: ['Discrétion'], expertise: ['Discrétion', 'Arcanes'] };
  assert.equal(rules.skillProfMultiplier(ch, 'Discrétion'), 2);
  assert.equal(rules.skillProfMultiplier(ch, 'Arcanes'), 0);
  assert.equal(rules.skillProfMultiplier({ skills: ['Arcanes'] }, 'Arcanes'), 1);
});

test('nombre de bottes d\'arme lu dans le texte de la capacité', () => {
  assert.equal(rules.weaponMasteryCountFromText("la botte de deux types d'armes"), 2);
  assert.equal(rules.weaponMasteryCountFromText("la propriété Botte de trois types d'armes"), 3);
  assert.equal(rules.weaponMasteryCountFromText('aucune mention'), 0);
});

const hurt = (over = {}) => ({ hp: { max: 20, current: 10, temp: 0 }, deathSaves: { s: 0, f: 0 }, level: 5, hitDiceUsed: 3, usedSlots: { 1: 2 }, usedRes: { rage: 1 }, ...over });

test('dégâts : les PV temporaires encaissent d\'abord', () => {
  const ch = hurt({ hp: { max: 20, current: 10, temp: 5 } });
  vitals.applyDamage(ch, 7);
  assert.deepEqual(ch.hp, { max: 20, current: 8, temp: 0 });
});

test('dégâts massifs : mort instantanée si le reste atteint les PV max', () => {
  const ch = hurt();
  vitals.applyDamage(ch, 30);
  assert.equal(ch.hp.current, 0);
  assert.equal(ch.deathSaves.f, 3);
  const ch2 = hurt();
  vitals.applyDamage(ch2, 29);
  assert.equal(ch2.deathSaves.f, 0);
});

test('à 0 PV : un échec par coup, deux sur un critique, la stabilisation est perdue', () => {
  const ch = hurt({ hp: { max: 20, current: 0, temp: 0 }, deathSaves: { s: 3, f: 0 } });
  vitals.applyDamage(ch, 2);
  assert.deepEqual(ch.deathSaves, { s: 0, f: 1 });
  vitals.applyDamage(ch, 2, { crit: true });
  assert.deepEqual(ch.deathSaves, { s: 0, f: 3 });
});

test('soins à 0 PV : réinitialisent les sauvegardes contre la mort', () => {
  const ch = hurt({ hp: { max: 20, current: 0, temp: 0 }, deathSaves: { s: 1, f: 2 } });
  vitals.applyHeal(ch, 4);
  assert.equal(ch.hp.current, 4);
  assert.deepEqual(ch.deathSaves, { s: 0, f: 0 });
});

test('PV temporaires : on garde le meilleur, pas de cumul', () => {
  const ch = hurt({ hp: { max: 20, current: 10, temp: 6 } });
  vitals.applyTempHp(ch, 4);
  assert.equal(ch.hp.temp, 6);
  vitals.applyTempHp(ch, 9);
  assert.equal(ch.hp.temp, 9);
});

test('repos long (2024) : tous les PV, emplacements, ressources et tous les dés de vie', () => {
  const ch = hurt();
  vitals.applyLongRest(ch);
  assert.equal(ch.hp.current, 20);
  assert.equal(ch.hitDiceUsed, 0);
  assert.deepEqual(ch.usedSlots, {});
  assert.deepEqual(ch.usedRes, {});
});

test('sauvegarde contre la mort : 20 naturel relève à 1 PV, 1 naturel = deux échecs', (t) => {
  const ch = hurt({ hp: { max: 20, current: 0, temp: 0 } });
  t.mock.method(Math, 'random', () => 0.999);
  assert.equal(vitals.rollDeathSave(ch).kind, 'nat20');
  assert.equal(ch.hp.current, 1);
  ch.hp.current = 0;
  t.mock.method(Math, 'random', () => 0);
  assert.equal(vitals.rollDeathSave(ch).kind, 'nat1');
  assert.equal(ch.deathSaves.f, 2);
});

test('notation de dés et dégâts critiques (dés doublés, pas le modificateur)', () => {
  assert.deepEqual(dice.parseNotation('2d6+3'), { count: 2, faces: 6, mod: 3 });
  assert.equal(dice.parseNotation('abc'), null);
  assert.equal(dice.critNotation('1d8+3'), '2d8+3');
  assert.equal(dice.critNotation('2d6-1'), '4d6-1');
  assert.equal(dice.critNotation('d4'), '2d4');
});
