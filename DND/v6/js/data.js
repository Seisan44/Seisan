// Chargement et indexation des données du Grimoire.
// Tout le site est piloté par data/*.json ; ce module centralise le fetch et
// construit les index dérivés une seule fois au démarrage.

import { slugify, stripAccents, normKey } from './utils.js';
import { buildGlossaryIndex, buildSpellIndex } from './enrich.js';
import { spellPrimaryName, spellAltName } from './images.js';

const FILES = {
  species: 'data/species.json',
  classesRaw: 'data/classes.json',
  dons: 'data/dons.json',
  glossaireRaw: 'data/glossaire.json',
  sorts: 'data/sorts.json',
  armes: 'data/armes.json',
  armures: 'data/armures.json',
  materiels: 'data/materiels_aventuriers.json',
  outils: 'data/outils.json',
  objetsMagiques: 'data/objets_magiques.json',
  historiques: 'data/historiques.json',
};

export const DATA = {};

export async function loadData(onProgress){
  const entries = Object.entries(FILES);
  let done = 0;
  const results = await Promise.all(entries.map(async ([key, path]) => {
    const res = await fetch(path);
    if(!res.ok) throw new Error(`Échec de chargement de ${path} (${res.status})`);
    const json = await res.json();
    done++;
    onProgress?.(done, entries.length, key);
    return [key, json];
  }));
  for(const [key, json] of results) DATA[key] = json;

  deriveAll();
  return DATA;
}

function deriveAll(){
  // --- glossaire : index + moteur d'enrichissement ---
  DATA.glossaryIndex = buildGlossaryIndex(DATA.glossaireRaw).index;

  // --- classes : groupes -> {main, subclasses} ---
  DATA.classes = DATA.classesRaw.map(group => {
    const main = group[0];
    const subclasses = group.slice(1).map(sc => ({ ...sc, slug: slugify(sc.classe_title) }));
    return { ...main, slug: slugify(main.classe_title), subclasses };
  });
  DATA.classesBySlug = new Map(DATA.classes.map(c => [c.slug, c]));

  // --- sorts : noms 2024, niveaux numériques, regroupement par classe ---
  const normClass = (s) => stripAccents(s).toLowerCase();
  DATA.sorts.forEach(s => {
    s._primaryName = spellPrimaryName(s.name);
    s._altName = spellAltName(s.name);
    s._niveauNum = parseInt(s.niveau, 10);
    s._slug = slugify(s._primaryName);
  });
  buildSpellIndex(DATA.sorts);
  DATA.sortsBySlug = new Map(DATA.sorts.map(s => [s._slug, s]));
  DATA.spellsByClassNorm = new Map();
  for(const s of DATA.sorts){
    for(const cls of s.classes || []){
      const key = normClass(cls);
      if(!DATA.spellsByClassNorm.has(key)) DATA.spellsByClassNorm.set(key, []);
      DATA.spellsByClassNorm.get(key).push(s);
    }
  }
  DATA.getSpellsForClass = (classTitle) => DATA.spellsByClassNorm.get(normClass(classTitle)) || [];
  DATA.spellSchools = [...new Set(DATA.sorts.map(s => s.ecole))].sort();
  DATA.spellLevels = [...new Set(DATA.sorts.map(s => s.niveau))].sort((a, b) => Number(a) - Number(b));
  DATA.spellClassNames = [...new Set(DATA.sorts.flatMap(s => s.classes))].sort();

  // --- historiques ---
  DATA.historiques.forEach(h => { h.slug = slugify(h.nom); });
  DATA.historiquesBySlug = new Map(DATA.historiques.map(h => [h.slug, h]));

  // --- espèces ---
  DATA.species.forEach(s => { s.slug = slugify(s.espece); });
  DATA.speciesBySlug = new Map(DATA.species.map(s => [s.slug, s]));

  // --- dons : noms renommés 2024 ("Ancien|Nouveau") ---
  DATA.dons.forEach(d => {
    const parts = d.name.split('|');
    d._primaryName = parts[0].trim();
    d._altName = parts.length > 1 ? parts[1].trim() : null;
    d.slug = slugify(d._primaryName);
  });
  DATA.donsBySlug = new Map(DATA.dons.map(d => [d.slug, d]));

  // --- équipement : lookup par nom (tooltips d'inventaire) ---
  DATA.itemLookup = new Map();
  for(const it of DATA.materiels) DATA.itemLookup.set(normKey(it.nom), { kind: 'materiel', ...it });
  for(const it of DATA.outils) DATA.itemLookup.set(normKey(it.nom), { kind: 'outil', ...it });
  for(const grp of DATA.armes.armes) for(const a of grp.armes) DATA.itemLookup.set(normKey(a.nom), { kind: 'arme', categorie: grp.categorie, ...a });
  for(const grp of DATA.armures.armures) for(const a of grp.armures) DATA.itemLookup.set(normKey(a.nom), { kind: 'armure', categorie: grp.categorie, ...a });
  for(const o of DATA.objetsMagiques) DATA.itemLookup.set(normKey(o.nom), { kind: 'objet_magique', ...o });
  // Les lots d'équipement écrivent parfois « 2 dagues » ou « Livre (prières) » :
  // on retente sans parenthèse finale, puis au singulier.
  DATA.lookupItem = (name) => {
    const key = normKey(name);
    if(DATA.itemLookup.has(key)) return DATA.itemLookup.get(key);
    const noParen = key.replace(/\s*\([^)]*\)\s*$/, '').trim();
    if(noParen !== key && DATA.itemLookup.has(noParen)) return DATA.itemLookup.get(noParen);
    for(const k of [key, noParen]){
      if(k.endsWith('s') && DATA.itemLookup.has(k.slice(0, -1))) return DATA.itemLookup.get(k.slice(0, -1));
    }
    return null;
  };

  DATA.weaponPropertyDefs = new Map(DATA.armes.proprietes.map(p => [p.nom, p.description]));

  // --- index de recherche globale ---
  DATA.searchIndex = buildSearchIndex();
}

function buildSearchIndex(){
  const idx = [];
  for(const s of DATA.species) idx.push({ cat: 'Espèces', label: s.espece, sub: s.infos?.['Type de créature'] || '', route: 'especes', key: s.slug });
  for(const c of DATA.classes) idx.push({ cat: 'Classes', label: c.classe_title, sub: 'Classe', route: 'classes', key: c.slug });
  for(const c of DATA.classes) for(const sc of c.subclasses) idx.push({ cat: 'Classes', label: sc.classe_title, sub: `Sous-classe de ${c.classe_title}`, route: 'classes', key: c.slug, sub2: sc.slug });
  for(const s of DATA.sorts) idx.push({ cat: 'Sorts', label: s._primaryName, sub: `Niveau ${s.niveau} · ${s.ecole}`, route: 'sorts', key: s._slug });
  for(const d of DATA.dons) idx.push({ cat: 'Dons', label: d._primaryName, sub: d.prerequis?.type_don || '', route: 'dons', key: d.slug });
  for(const h of DATA.historiques) idx.push({ cat: 'Historiques', label: h.nom, sub: 'Historique', route: 'historiques', key: h.slug });
  for(const [id, e] of DATA.glossaryIndex) idx.push({ cat: 'Glossaire', label: e.terme, sub: e.categorie, route: 'glossaire', key: id });
  for(const grp of DATA.armes.armes) for(const a of grp.armes) idx.push({ cat: 'Équipement', label: a.nom, sub: grp.categorie, route: 'equipement', key: 'armes' });
  for(const grp of DATA.armures.armures) for(const a of grp.armures) idx.push({ cat: 'Équipement', label: a.nom, sub: grp.categorie, route: 'equipement', key: 'armures' });
  for(const o of DATA.outils) idx.push({ cat: 'Équipement', label: o.nom, sub: 'Outil', route: 'equipement', key: 'outils' });
  for(const m of DATA.materiels) idx.push({ cat: 'Équipement', label: m.nom, sub: 'Matériel', route: 'equipement', key: 'materiel' });
  for(const o of DATA.objetsMagiques) idx.push({ cat: 'Équipement', label: o.nom, sub: `${o.type} · ${o.rarete}`, route: 'equipement', key: 'magiques' });
  idx.push({ cat: 'Guide', label: 'La Voie de l’Aventurier', sub: 'Guide du débutant', route: 'voie', key: '' });
  idx.push({ cat: 'Guide', label: 'Écran du joueur', sub: 'Aide de jeu à la table', route: 'ecran', key: '' });
  idx.push({ cat: 'Guide', label: 'Mes personnages', sub: 'Créateur de personnage', route: 'personnages', key: '' });
  idx.push({ cat: 'Guide', label: 'Outils de Maître du jeu', sub: 'Campagnes, bestiaire, rencontres', route: 'mj', key: '' });
  return idx;
}
