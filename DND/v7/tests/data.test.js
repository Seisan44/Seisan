import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readJSON } from './helpers.js';

const SRD = 'SRD 5.2.1';
const classes = readJSON('data/classes.json');
const sorts = readJSON('data/sorts.json');

test('chaque entrée porte un champ source', () => {
  const lists = {
    sorts,
    dons: readJSON('data/dons.json'),
    historiques: readJSON('data/historiques.json'),
    especes: readJSON('data/species.json'),
    objets: readJSON('data/objets_magiques.json'),
    monstres: readJSON('data/monstres.json'),
    classes: classes.flat(),
    outils: readJSON('data/outils.json'),
    materiel: readJSON('data/materiels_aventuriers.json'),
    armes: readJSON('data/armes.json').armes.flatMap(g => g.armes),
    armures: readJSON('data/armures.json').armures.flatMap(g => g.armures),
  };
  for(const [name, list] of Object.entries(lists)){
    const missing = list.filter(e => !e.source).map(e => e.nom || e.name || e.espece || e.classe_title);
    assert.deepEqual(missing, [], `${name} : entrées sans source`);
  }
});

test('le SRD 5.2.1 compte 339 sorts, 12 classes et 12 sous-classes', () => {
  assert.equal(sorts.filter(s => s.source === SRD).length, 339);
  assert.equal(classes.filter(g => g[0].source === SRD).length, 12);
  assert.deepEqual(classes.map(g => g.slice(1).filter(s => s.source === SRD).length), Array(12).fill(1));
});

test('rituel : booléen sur chaque sort, cohérent avec le temps d\'incantation', () => {
  for(const s of sorts){
    assert.equal(typeof s.rituel, 'boolean', s.name);
    assert.equal(s.rituel, /rituel/i.test(`${s.temps} ${s.duree}`), s.name);
  }
  assert.ok(sorts.find(s => s.name === 'Détection de la magie').rituel);
});

test('tables de classes structurées : 20 niveaux, bonus de maîtrise cohérent', () => {
  for(const [main] of classes){
    assert.equal(main.progression.length, 20, main.classe_title);
    assert.deepEqual(main.progression.map(p => p.bonus_maitrise), main.progression.map(p => 2 + Math.floor((p.niveau - 1) / 4)), main.classe_title);
    assert.ok(main.traits.de_vie_faces >= 6, main.classe_title);
    assert.ok(main.traits.equipement_depart.length >= 2, main.classe_title);
  }
});

test('mode « SRD seul » : listes filtrées, index par slug complets', async () => {
  const { loadRealData } = await import('./helpers.js');
  const { setSrdOnly } = await import('../js/data.js');
  setSrdOnly(true);
  const DATA = await loadRealData();
  assert.equal(DATA.sorts.length, 339);
  assert.ok(DATA.historiques.every(h => h.source === SRD));
  assert.ok(DATA.historiquesBySlug.get('fermier'), 'un personnage Fermier reste lisible');
  const barbare = DATA.classesBySlug.get('barbare');
  assert.deepEqual(barbare.subclasses.map(s => s.slug), ['voie_du_berserker']);
  assert.equal(barbare.allSubclasses.length, 3);
});
