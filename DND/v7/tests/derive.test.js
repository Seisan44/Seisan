import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadRealData, makeCharacter, equip } from './helpers.js';

const DATA = await loadRealData();
const { derive, weaponAttack } = await import('../js/character/derive.js');
const { spellcastingTable, classTraits } = await import('../js/class-traits.js');
const { speciesHpPerLevel } = await import('../js/character/rules.js');

const attack = (ch, name, opts) => {
  const item = ch.inventory.find(i => i.name === name);
  return weaponAttack(ch, derive(ch), item, DATA.lookupItem(name), opts);
};

test('Défense sans armure du Barbare : 10 + Dex + Con, bouclier permis', () => {
  const ch = makeCharacter({ classSlug: 'barbare', abilities: { ...makeCharacter().abilities, dexterite: 14, constitution: 16 } });
  assert.equal(derive(ch).ca.value, 15);
  ch.inventory.push(equip('Bouclier'));
  assert.equal(derive(ch).ca.value, 17);
});

test('Défense sans armure du Moine : perdue avec un bouclier', () => {
  const ch = makeCharacter({ classSlug: 'moine', abilities: { ...makeCharacter().abilities, dexterite: 16, sagesse: 14 } });
  assert.equal(derive(ch).ca.value, 15);
  ch.inventory.push(equip('Bouclier'));
  assert.equal(derive(ch).ca.value, 15, '10 + Dex + bouclier = 15, la formule du Moine ne s\'applique plus');
});

test('initiative : le don Vigilant ajoute le bonus de maîtrise', () => {
  const abilities = { ...makeCharacter().abilities, dexterite: 14 };
  assert.equal(derive(makeCharacter({ abilities, background: 'soldat' })).initiative, 2);
  assert.equal(derive(makeCharacter({ abilities, background: 'criminel' })).initiative, 4);
});

test('perception passive avec expertise', () => {
  const ch = makeCharacter({ abilities: { ...makeCharacter().abilities, sagesse: 14 }, skills: ['Perception'] });
  assert.equal(derive(ch).perception, 14);
  ch.expertise = ['Perception'];
  assert.equal(derive(ch).perception, 16);
});

test('bottes d\'arme : nombre selon la classe et le niveau', () => {
  assert.equal(derive(makeCharacter({ classSlug: 'guerrier', level: 1 })).masteryMax, 3);
  assert.equal(derive(makeCharacter({ classSlug: 'guerrier', level: 10 })).masteryMax, 5);
  assert.equal(derive(makeCharacter({ classSlug: 'barbare', level: 4 })).masteryMax, 3);
  assert.equal(derive(makeCharacter({ classSlug: 'roublard' })).masteryMax, 2);
  assert.equal(derive(makeCharacter({ classSlug: 'magicien' })).masteryMax, 0);
});

test('armure lourde sans la Force requise : -3 m', () => {
  const ch = makeCharacter({ inventory: [equip('Cotte de mailles', { slot: 'armure' })] });
  const d = derive(ch);
  assert.equal(d.ca.value, 16);
  assert.equal(d.speed.value, 6);
});

test('attaque Finesse : la meilleure de For / Dex ; seconde arme sans modificateur', () => {
  const ch = makeCharacter({
    abilities: { ...makeCharacter().abilities, force: 8, dexterite: 16 },
    inventory: [equip('Rapière'), equip('Dague')],
  });
  const r = attack(ch, 'Rapière');
  assert.equal(r.atk, 5);
  assert.equal(r.dmg, '1d8+3');
  assert.equal(attack(ch, 'Dague', { offHand: true }).dmg, '1d4');
});

test('style Duel : +2 aux dégâts, jamais sur la seconde arme', () => {
  const ch = makeCharacter({ fightingStyle: 'duel', abilities: { ...makeCharacter().abilities, force: 16 }, inventory: [equip('Épée longue'), equip('Dague')] });
  assert.equal(attack(ch, 'Épée longue').dmg, '1d8+5');
  assert.equal(attack(ch, 'Dague', { offHand: true }).dmg, '1d4');
});

test('arme Polyvalente à deux mains : dé supérieur', () => {
  const ch = makeCharacter({ abilities: { ...makeCharacter().abilities, force: 14 }, inventory: [equip('Épée longue', { slot: '2m' })] });
  assert.equal(attack(ch, 'Épée longue').dmg, '1d10+2');
});

test('Ténacité naine : +1 PV par niveau, et elle seule', () => {
  const bonus = DATA.species.filter(s => speciesHpPerLevel(s) > 0).map(s => s.slug);
  assert.deepEqual(bonus, ['nain']);
});

test('tables structurées : incantation du Magicien et magie de pacte de l\'Occultiste', () => {
  const wiz = spellcastingTable(DATA.classesBySlug.get('magicien'));
  assert.equal(wiz.length, 20);
  assert.deepEqual([wiz[0].cantrips, wiz[0].known, wiz[0].slots[0]], [3, 4, 2]);
  assert.deepEqual(wiz[19].slots, [4, 3, 3, 3, 3, 2, 2, 1, 1]);
  const lock = spellcastingTable(DATA.classesBySlug.get('occultiste'));
  assert.deepEqual(lock[0].pact, { n: 1, lvl: 1 });
  assert.deepEqual(lock[10].pact, { n: 3, lvl: 5 });
  assert.equal(spellcastingTable(DATA.classesBySlug.get('guerrier')), null);
});

test('traits de classe structurés', () => {
  const t = classTraits(DATA.classesBySlug.get('roublard'));
  assert.equal(t.deVieFaces, 8);
  assert.equal(t.competences.count, 4);
  assert.deepEqual(t.sauvegardes, ['Dextérité', 'Intelligence']);
});
