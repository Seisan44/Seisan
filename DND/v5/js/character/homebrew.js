// Contenu "homebrew" : traits (dons), espèces, classes et objets créés par l'utilisateur.
//
// Principe : le contenu homebrew est stocké dans localStorage sous forme de "modèles" de
// formulaire (facilement réutilisables pour l'édition), puis converti à chaque rafraîchissement
// vers la forme exacte attendue par data/*.json et fusionné dans DATA.species/DATA.dons/
// DATA.classesRaw *avant* que js/data.js relance sa dérivation habituelle (slugs, index de
// recherche, lookup d'objets, regroupement des sorts par classe...). Le contenu homebrew profite
// ainsi de tout le pipeline existant (wizard, pages du compendium, recherche globale) sans
// duplication de code de rendu.

import { DATA, deriveAll, buildSearchIndex } from '../data.js';
import { uid, escapeHtml, stripAccents, normKey } from '../utils.js';
import { CASTER_TYPE, SPELLCASTING_ABILITY, PREPARED_CASTERS } from './rules.js';
import { ALL_SKILLS } from '../class-traits.js';

const STORE_KEY = 'codex_homebrew_v1';
const TYPES = ['traits', 'species', 'classes', 'items'];
const normClass = (s) => stripAccents(s).toLowerCase();

// ---------- Store (localStorage) ----------

function readStore(){
  try {
    const raw = localStorage.getItem(STORE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return { traits: [], species: [], classes: [], items: [], ...parsed };
  } catch(e){
    return { traits: [], species: [], classes: [], items: [] };
  }
}
function writeStore(store){
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

export function listHomebrew(type){
  return readStore()[type] || [];
}
export function getHomebrewEntry(type, id){
  return listHomebrew(type).find(e => e.id === id) || null;
}
export function saveHomebrewEntry(type, model){
  const store = readStore();
  const list = store[type];
  const id = model.id || uid('hb');
  const entry = { ...model, id, updatedAt: Date.now() };
  const idx = list.findIndex(e => e.id === id);
  if(idx >= 0) list[idx] = entry; else list.push(entry);
  writeStore(store);
  return entry;
}
export function deleteHomebrewEntry(type, id){
  const store = readStore();
  store[type] = store[type].filter(e => e.id !== id);
  writeStore(store);
}
export function duplicateHomebrewEntry(type, id){
  const entry = getHomebrewEntry(type, id);
  if(!entry) return null;
  const copy = JSON.parse(JSON.stringify(entry));
  copy.id = uid('hb');
  copy.updatedAt = Date.now();
  if(copy.name) copy.name += ' (copie)';
  if(copy.espece) copy.espece += ' (copie)';
  if(copy.classeTitle) copy.classeTitle += ' (copie)';
  if(copy.nom) copy.nom += ' (copie)';
  const store = readStore();
  store[type].push(copy);
  writeStore(store);
  return copy;
}
export function homebrewCount(){
  const store = readStore();
  return TYPES.reduce((n, t) => n + (store[t]?.length || 0), 0);
}

// ---------- Helpers de mise en forme ----------

// Les champs "html_*"/"description_html"/"classe_description" attendent du HTML réel (rendu tel
// quel par enrichHTML) : on convertit donc un texte brut (textarea) en paragraphes, en échappant
// uniquement les métacaractères HTML structurants (pas les apostrophes/guillemets, qui doivent
// survivre intacts pour la table de traits de classe synthétisée — voir escapeForTable ci-dessous).
function paragraphize(text){
  const paras = String(text || '').split(/\n{2,}/).map(p => p.trim()).filter(Boolean);
  const body = paras.length ? paras : [String(text || '').trim()];
  return body.map(p => `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`).join('');
}

// Échappe seulement & < > (pas les apostrophes) : utilisé dans la table de traits synthétisée
// dont les cellules sont relues par js/class-traits.js via stripTags (qui ne désenchappe pas les
// entités HTML) — échapper les apostrophes y laisserait des "&#39;" visibles dans les noms d'objets.
function escapeForTable(s){
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function joinWithEt(list){
  const a = (list || []).filter(Boolean);
  if(a.length <= 1) return a[0] || '';
  return `${a.slice(0, -1).join(', ')} et ${a[a.length - 1]}`;
}
function fmtEquipOption(label, opt){
  const items = (opt?.items || []).filter(it => it.name).map(it => it.qty > 1 ? `${it.qty} ${it.name}` : it.name);
  const gold = Number(opt?.gold) || 0;
  const parts = gold > 0 ? [...items, `${gold} po`] : items;
  return `(${label}) ${joinWithEt(parts) || 'Rien'}`;
}

/**
 * Génère un html_traits_table exploitable tel quel par js/class-traits.js
 * (parseClassTraits/parseStartingEquipmentChoices) à partir d'un modèle de formulaire de classe
 * homebrew — même structure de libellés que data/classes.json (voir js/class-traits.js pour les
 * expressions régulières attendues).
 */
function synthesizeClassTraitsTableHTML(model){
  const skills = model.skillOptions?.length ? model.skillOptions : ALL_SKILLS;
  const saves = (model.saves || []).filter(Boolean);
  return `<table class="core"><tbody>
    <tr><th colspan="2">Traits de base — ${escapeForTable(model.classeTitle)}</th></tr>
    <tr><td><strong>Caractéristique principale</strong></td><td>${escapeForTable(model.caracteristique)}</td></tr>
    <tr><td><strong>Dé de vie</strong></td><td>D${escapeForTable(model.deVie)} par niveau de ${escapeForTable(model.classeTitle)}</td></tr>
    <tr><td><strong>Maîtrise des jets de sauvegarde</strong></td><td>${escapeForTable(joinWithEt(saves))}</td></tr>
    <tr><td><strong>Maîtrises de compétence</strong></td><td>${escapeForTable(model.skillCount)} au choix parmi : ${escapeForTable(joinWithEt(skills))}</td></tr>
    <tr><td><strong>Maîtrises d'arme</strong></td><td>${escapeForTable(model.armes || 'Aucune')}</td></tr>
    <tr><td><strong>Formation aux armures</strong></td><td>${escapeForTable(model.armures || 'Aucune')}</td></tr>
    <tr><td><strong>Équipement de départ</strong></td><td>Choisissez A ou B : ${escapeForTable(fmtEquipOption('A', model.equipA))} ; ou ${escapeForTable(fmtEquipOption('B', model.equipB))}</td></tr>
  </tbody></table>`;
}

// ---------- Constructeurs modèle -> forme "officielle" ----------

export function buildHomebrewDon(model){
  const id = model.id || uid('hb');
  const prerequis = (model.prerequis || []).map(p => p.type === 'niveau'
    ? { type: 'niveau', minimum: Number(p.minimum) || 1 }
    : { type: 'capacite', nom: p.nom || '' });
  return {
    _homebrew: true, _hbId: id,
    name: model.name,
    prerequis: { type_don: model.typeDon || 'general', prerequis },
    html_description: paragraphize(model.description),
    slug: id,
  };
}

export function buildHomebrewSpecies(model){
  const id = model.id || uid('hb');
  return {
    _homebrew: true, _hbId: id,
    espece: model.espece,
    sous_especes: (model.sousEspeces || []).filter(se => se.nom).map(se => ({ nom: se.nom, description: se.description || '' })),
    infos: {
      'Type de créature': model.typeCreature || '',
      'Taille': model.taille || '',
      'Vitesse': model.vitesse || '',
    },
    capacites: (model.capacites || []).filter(c => c.nom).map(c => ({ nom: c.nom, description: c.description || '' })),
    tables: null,
    slug: id,
  };
}

function findOfficialClassGroup(title){
  return (DATA._officialClassesRawRaw || []).find(g => g[0].classe_title === title) || null;
}

export function buildHomebrewClass(model){
  const id = model.id || uid('hb');
  const capacites = (model.capacites || []).filter(c => c.nom).map(c => ({
    niveau: String(c.niveau || 1),
    capacite_name: c.nom,
    description_html: paragraphize(c.description),
  })).sort((a, b) => Number(a.niveau) - Number(b.niveau));

  if(model.isSubclass){
    return {
      _homebrew: true, _hbId: id, _parentClassTitle: model.parentClassTitle,
      classe_title: model.classeTitle,
      classe_description: paragraphize(model.description),
      capacites,
      image: null,
      slug: id,
    };
  }

  let html_capacites_table = null;
  let _spellListModel = null;
  if(model.casterModel){
    const group = findOfficialClassGroup(model.casterModel);
    if(group){
      html_capacites_table = group[0].html_capacites_table;
      _spellListModel = model.casterModel;
    }
  }

  return {
    _homebrew: true, _hbId: id,
    classe_title: model.classeTitle,
    classe_description: paragraphize(model.description),
    capacites,
    image: null,
    html_traits_table: synthesizeClassTraitsTableHTML(model),
    html_capacites_table,
    _spellListModel,
    slug: id,
  };
}

export function buildHomebrewItem(model){
  const id = model.id || uid('hb');
  const poidsNum = model.poids !== '' && model.poids != null ? Number(model.poids) : null;
  const prixNum = model.prix !== '' && model.prix != null ? Number(model.prix) : null;
  const fr = (n) => String(n).replace('.', ',');
  return {
    _homebrew: true, _hbId: id,
    nom: model.nom,
    type: model.type || 'autre',
    poids: Number.isFinite(poidsNum) ? `${fr(poidsNum)} kg` : '',
    prix: Number.isFinite(prixNum) ? `${fr(prixNum)} po` : '',
    rarete: model.type === 'objet_magique' ? (model.rarete || 'commun') : '',
    lien: model.lien || '',
    description: model.description || '',
  };
}

// ---------- Fusion dans DATA ----------

function ensureSnapshots(){
  if(DATA._hbSnapshotted) return;
  DATA._officialSpeciesRaw = DATA.species.slice();
  DATA._officialDonsRaw = DATA.dons.slice();
  DATA._officialClassesRawRaw = DATA.classesRaw.slice();
  DATA._hbSnapshotted = true;
}

function mergeHomebrewIntoRawData(){
  ensureSnapshots();
  DATA.species = DATA._officialSpeciesRaw.slice();
  DATA.dons = DATA._officialDonsRaw.slice();
  DATA.classesRaw = DATA._officialClassesRawRaw.slice();

  DATA.species.push(...listHomebrew('species').map(buildHomebrewSpecies));
  DATA.dons.push(...listHomebrew('traits').map(buildHomebrewDon));

  const classModels = listHomebrew('classes');
  const baseGroups = classModels.filter(m => !m.isSubclass).map(m => [buildHomebrewClass(m)]);
  const allGroups = [...DATA.classesRaw, ...baseGroups];
  for(const m of classModels.filter(m => m.isSubclass)){
    const sub = buildHomebrewClass(m);
    const group = allGroups.find(g => g[0].classe_title === sub._parentClassTitle);
    if(group) group.push(sub);
  }
  DATA.classesRaw = allGroups;
}

// Après deriveAll() : corrige les slugs homebrew (pour ne jamais entrer en collision avec un
// slug officiel — favoris, deep-links), branche les objets/sorts/progression homebrew sur le
// reste du pipeline, puis reconstruit l'index de recherche (les slugs y sont figés au moment où
// buildSearchIndex() tourne, donc il faut le relancer après la correction des slugs).
function patchHomebrewDerived(){
  for(const d of DATA.dons) if(d._homebrew) d.slug = d._hbId;
  for(const s of DATA.species) if(s._homebrew) s.slug = s._hbId;
  for(const c of DATA.classes){
    if(c._homebrew) c.slug = c._hbId;
    for(const sc of c.subclasses || []) if(sc._homebrew) sc.slug = sc._hbId;
  }
  DATA.classesBySlug = new Map(DATA.classes.map(c => [c.slug, c]));

  DATA.homebrewItems = listHomebrew('items').map(buildHomebrewItem);
  for(const it of DATA.homebrewItems){
    DATA.itemLookup.set(normKey(it.nom), { kind: 'homebrew', ...it });
  }

  for(const c of DATA.classes){
    if(!c._homebrew || !c._spellListModel) continue;
    CASTER_TYPE[c.classe_title] = CASTER_TYPE[c._spellListModel];
    SPELLCASTING_ABILITY[c.classe_title] = SPELLCASTING_ABILITY[c._spellListModel];
    if(PREPARED_CASTERS.has(c._spellListModel)) PREPARED_CASTERS.add(c.classe_title);
    DATA.spellsByClassNorm.set(normClass(c.classe_title), DATA.spellsByClassNorm.get(normClass(c._spellListModel)) || []);
  }

  DATA.searchIndex = buildSearchIndex();
  for(const it of DATA.homebrewItems){
    DATA.searchIndex.push({ cat: 'Équipement', label: it.nom, sub: 'Objet personnalisé', route: 'equipements', key: 'homebrew' });
  }
}

/** Point d'entrée unique : à appeler au démarrage puis après toute création/édition/suppression
 * de contenu homebrew. Aucun rechargement de page nécessaire. */
export function refreshHomebrew(){
  mergeHomebrewIntoRawData();
  deriveAll();
  patchHomebrewDerived();
}
