// Chargement et indexation de toutes les données du Codex.
// Tout le site est piloté par data/*.json ; ce module centralise le fetch et
// construit les structures dérivées (index, recherche, tables croisées) une seule
// fois au démarrage plutôt qu'à chaque rendu.

import { slugify, stripAccents, normKey } from './utils.js';
import { buildGlossaryIndex, buildSpellIndex } from './enrich.js';
import { parseEquipmentString } from './equipment.js';
import { spellPrimaryName, spellAltName } from './images.js';
import { ABILITIES, SKILL_ABILITY } from './character/rules.js';

const FILES = {
  species: 'data/species.json',
  races: 'data/races.json',
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

// Dérive toutes les structures secondaires (slugs, index, tables croisées) à partir des
// tableaux "bruts" de DATA (DATA.species/DATA.dons/DATA.classesRaw/...). Extrait de loadData()
// pour pouvoir être rejoué après une fusion de contenu homebrew (voir js/character/homebrew.js
// refreshHomebrew()), sans avoir à recharger les fichiers JSON.
export function deriveAll(){
  // --- glossaire : index + enrichissement de texte ---
  DATA.glossaryIndex = buildGlossaryIndex(DATA.glossaireRaw).index;

  // --- classes : groupes -> {main, subclasses} ---
  DATA.classes = DATA.classesRaw.map(group => {
    const main = group[0];
    const subclasses = group.slice(1).map(sc => ({ ...sc, slug: slugify(sc.classe_title) }));
    return { ...main, slug: slugify(main.classe_title), subclasses };
  });
  DATA.classesBySlug = new Map(DATA.classes.map(c => [c.slug, c]));

  // --- sorts : normalisation classes (accents), regroupement par classe ---
  const normClass = (s) => stripAccents(s).toLowerCase();
  DATA.sorts.forEach(s => {
    s._primaryName = spellPrimaryName(s.name);
    s._altName = spellAltName(s.name);
    s._niveauNum = parseInt(s.niveau, 10);
    s._slug = slugify(s._primaryName);
  });
  buildSpellIndex(DATA.sorts);
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
  DATA.spellLevels = [...new Set(DATA.sorts.map(s => s.niveau))].sort((a,b) => Number(a)-Number(b));
  DATA.spellClassNames = [...new Set(DATA.sorts.flatMap(s => s.classes))].sort();

  // --- historiques : pré-parsing des choix d'équipement ---
  DATA.historiques.forEach(h => {
    h._equipA = parseEquipmentString(h.equipement.choix_A);
    h._equipB = parseEquipmentString(h.equipement.choix_B);
    h.slug = slugify(h.nom);
  });

  // --- espèces : slug ---
  DATA.species.forEach(s => { s.slug = slugify(s.espece); });

  // --- dons : slug + gestion des noms renommés en 2024 ("Ancien|Nouveau") ---
  DATA.dons.forEach(d => {
    const parts = d.name.split('|');
    d._primaryName = parts[0].trim();
    d._altName = parts.length > 1 ? parts[1].trim() : null;
    d.slug = slugify(d._primaryName);
  });

  // --- équipement : lookup par nom (pour tooltips d'inventaire) ---
  DATA.itemLookup = new Map();
  for(const cat of DATA.materiels) DATA.itemLookup.set(normKey(cat.nom), { kind:'materiel', ...cat });
  for(const cat of DATA.outils) DATA.itemLookup.set(normKey(cat.nom), { kind:'outil', ...cat });
  for(const grp of DATA.armes.armes) for(const a of grp.armes) DATA.itemLookup.set(normKey(a.nom), { kind:'arme', categorie:grp.categorie, ...a });
  for(const grp of DATA.armures.armures) for(const a of grp.armures) DATA.itemLookup.set(normKey(a.nom), { kind:'armure', categorie:grp.categorie, ...a });
  for(const o of DATA.objetsMagiques) DATA.itemLookup.set(normKey(o.nom), { kind:'objet_magique', ...o });
  DATA.lookupItem = (name) => DATA.itemLookup.get(normKey(name)) || null;

  // --- armes : liste plate des noms + définitions des propriétés (dont les "bottes" de
  // maîtrise des armes) pour la fiche de personnage (onglet Actions/Traits). ---
  DATA.weaponNames = DATA.armes.armes.flatMap(g => g.armes.map(a => a.nom)).sort((a,b) => a.localeCompare(b));
  DATA.weaponPropertyDefs = new Map(DATA.armes.proprietes.map(p => [p.nom, p.description]));

  // --- index de recherche globale ---
  DATA.searchIndex = buildSearchIndex();
}

export function buildSearchIndex(){
  const idx = [];
  for(const s of DATA.species) idx.push({ cat:'Races', label:s.espece, sub:s.infos?.['Type de créature']||'', route:'races', key:s.slug });
  for(const c of DATA.classes) idx.push({ cat:'Classes', label:c.classe_title, sub:'Classe', route:'classes', key:c.slug });
  for(const c of DATA.classes) for(const sc of c.subclasses) idx.push({ cat:'Classes', label:sc.classe_title, sub:`Sous-classe de ${c.classe_title}`, route:'classes', key:c.slug, sub2:sc.slug });
  for(const d of DATA.dons) idx.push({ cat:'Dons', label:d._primaryName, sub:d.prerequis?.type_don||'', route:'dons', key:d.slug });
  for(const s of DATA.sorts) idx.push({ cat:'Sorts', label:s._primaryName, sub:`Niveau ${s.niveau} · ${s.ecole}`, route:'sorts', key:s._slug });
  for(const h of DATA.historiques) idx.push({ cat:'Historiques', label:h.nom, sub:'Historique', route:'historiques', key:h.slug });
  for(const [id, e] of DATA.glossaryIndex) idx.push({ cat:'Glossaire', label:e.terme, sub:e.categorie, route:'glossaire', key:id });
  for(const grp of DATA.armes.armes) for(const a of grp.armes) idx.push({ cat:'Équipement', label:a.nom, sub:grp.categorie, route:'equipements', key:'armes' });
  for(const grp of DATA.armures.armures) for(const a of grp.armures) idx.push({ cat:'Équipement', label:a.nom, sub:grp.categorie, route:'equipements', key:'armures' });
  for(const o of DATA.outils) idx.push({ cat:'Équipement', label:o.nom, sub:'Outil', route:'equipements', key:'outils' });
  for(const m of DATA.materiels) idx.push({ cat:'Équipement', label:m.nom, sub:'Matériel', route:'equipements', key:'materiel' });
  for(const o of DATA.objetsMagiques) idx.push({ cat:'Équipement', label:o.nom, sub:`${o.type} · ${o.rarete}`, route:'equipements', key:'magiques' });
  idx.push({ cat:'Référence', label:'Combat', sub:'Règles de combat', route:'combat', key:'' });
  idx.push({ cat:'Référence', label:'Personnage', sub:'Créateur de personnage', route:'personnage', key:'' });
  for(const a of ABILITIES) idx.push({ cat:'Référence', label:a.label, sub:'Caractéristique', route:'carac-competences', key:a.key });
  for(const [skill, abilityKey] of Object.entries(SKILL_ABILITY)){
    const ability = ABILITIES.find(a => a.key === abilityKey);
    idx.push({ cat:'Référence', label:skill, sub:`Compétence (${ability?.label||''})`, route:'carac-competences', key:abilityKey });
  }
  return idx;
}
