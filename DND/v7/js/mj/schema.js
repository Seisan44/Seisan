// Formes canoniques des entités de campagne + version du schéma d'export.
// Toute création d'entité passe par ces factories : c'est le contrat unique
// entre le store, les formulaires, le wiki et l'import/export.

export const SCHEMA_VERSION = 3;

// crypto.randomUUID exige un contexte sécurisé (https / localhost) ;
// repli aléatoire pour les rares hébergements en http simple.
export const uuid = () =>
  (crypto.randomUUID?.() ?? `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`);

export const IDEA_TAGS = ['Encounter', 'Lore', 'PNJ', 'Loot', 'Autre'];

export const BUTIN_TYPES = [
  { key: 'objet', label: 'Objet' },
  { key: 'monnaie', label: 'Monnaie' },
  { key: 'conteneur', label: 'Conteneur' },
];

// Types d'entités pouvant être liés à un marqueur de carte.
export const PIN_TYPES = [
  { key: 'encounter', label: 'Rencontre' },
  { key: 'pnj', label: 'PNJ' },
  { key: 'monstre', label: 'Monstre' },
  { key: 'lore', label: 'Note de lore' },
  { key: 'butin', label: 'Butin / Conteneur' },
];

export const ABILITIES = ['For', 'Dex', 'Con', 'Int', 'Sag', 'Cha'];

// Cycle de vie d'une session de jeu : préparée, jouée, puis clôturée (les
// conséquences validées sont alors répercutées sur les entités de la campagne).
export const SESSION_STATUTS = [
  { key: 'preparation', label: 'En préparation' },
  { key: 'en_cours',    label: 'En cours' },
  { key: 'terminee',    label: 'Terminée' },
];

// Tags des événements du journal de session.
export const LOG_TAGS = [
  { key: 'note',     label: 'Note',       icon: '📝' },
  { key: 'intrigue', label: 'Intrigue',   icon: '🎭' },
  { key: 'combat',   label: 'Combat',     icon: '⚔️' },
  { key: 'pj',       label: 'PJ',         icon: '🧙' },
  { key: 'butin',    label: 'Butin',      icon: '💰' },
  { key: 'suspens',  label: 'En suspens', icon: '⏳' },
];

// État vivant d'une créature dans le monde (mis à jour à la clôture des sessions).
export const ETAT_STATUTS = [
  { key: 'vivant',  label: 'Vivant',  icon: '' },
  { key: 'mort',    label: 'Mort',    icon: '💀' },
  { key: 'disparu', label: 'Disparu', icon: '👣' },
  { key: 'inconnu', label: 'Inconnu', icon: '❓' },
];

export const OBJECTIF_STATUTS = [
  { key: 'en_cours',  label: 'En cours' },
  { key: 'accompli',  label: 'Accompli' },
  { key: 'abandonne', label: 'Abandonné' },
];

// Groupes du « plateau » d'une session : clé du roster -> collection référencée.
export const ROSTER_GROUPS = [
  { key: 'creatures',  icon: '🎭', label: 'PNJ & Monstres' },
  { key: 'encounters', icon: '⚔️', label: 'Rencontres' },
  { key: 'maps',       icon: '🗺️', label: 'Cartes' },
  { key: 'lore',       icon: '📜', label: 'Notes de lore' },
  { key: 'butins',     icon: '💰', label: 'Butins' },
];

export function createCampaign(nom){
  const now = new Date().toISOString();
  return {
    schemaVersion: SCHEMA_VERSION,
    id: uuid(),
    nom,
    createdAt: now,
    updatedAt: now,
    ideas: [],
    maps: [],
    creatures: [],
    butins: [],
    encounters: [],
    lore: [],
    sessions: [],
    pjs: [],
    recent: [],
  };
}

// Boîte de brainstorming : des puces (mots-clés jetés en vrac), puis une
// synthèse rédigée, puis éventuellement une finalisation en vraie entité.
export const createIdea = (patch = {}) => ({
  id: uuid(), titre: '', tag: 'Autre',
  chips: [], synthese: '', finalizedAs: null, ...patch,
});

/**
 * Mise à niveau d'une campagne chargée ou importée vers le schéma courant.
 * v1 → v2 : les idées du kanban deviennent des boîtes (texte → synthèse,
 * colonnes abandonnées) et la campagne gagne la liste des éléments récents.
 * v2 → v3 : arrivée des sessions — la campagne gagne sessions[] et pjs[],
 * chaque créature un état vivant (statut, attitude, lieu).
 */
export function migrateCampaign(data){
  if(!data || typeof data !== 'object') return data;
  if((data.schemaVersion ?? 1) < 2){
    data.ideas = (data.ideas || []).map(i => createIdea({
      id: i.id, titre: i.titre || '', tag: i.tag || 'Autre',
      synthese: i.synthese ?? i.texte ?? '',
      finalizedAs: i.finalizedAs ?? null,
    }));
  }
  for(const k of ['ideas', 'maps', 'creatures', 'butins', 'encounters', 'lore', 'sessions', 'pjs', 'recent'])
    if(!Array.isArray(data[k])) data[k] = [];
  for(const cr of data.creatures) if(!cr.etat || typeof cr.etat !== 'object') cr.etat = createEtat();
  for(const s of data.sessions){
    if(!s.roster || typeof s.roster !== 'object') s.roster = {};
    for(const g of [...ROSTER_GROUPS.map(g => g.key), 'pjs'])
      if(!Array.isArray(s.roster[g])) s.roster[g] = [];
    for(const k of ['log', 'consequences']) if(!Array.isArray(s[k])) s[k] = [];
  }
  for(const pj of data.pjs) if(!Array.isArray(pj.objectifs)) pj.objectifs = [];
  data.schemaVersion = SCHEMA_VERSION;
  return data;
}

export const createMap = (patch = {}) => ({
  id: uuid(), nom: '', image: null, pins: [], ...patch,
});

// x/y sont RELATIFS (0..1) : les marqueurs restent en place quel que soit
// le zoom ou la largeur d'affichage de la carte.
export const createPin = (patch = {}) => ({
  id: uuid(), x: 0.5, y: 0.5, label: '', ref: null, ...patch,
});

export const createCreature = (patch = {}) => ({
  id: uuid(), kind: 'pnj', nom: '', description: '', role: '',
  sourceBestiaire: null, image: null, statBlock: null, inventaire: [],
  etat: createEtat(), ...patch,
});

/** L'état actuel d'une créature dans le monde — la campagne est la photographie,
    les sessions sont le film qui la fait évoluer. */
export const createEtat = (patch = {}) => ({
  statut: 'vivant', attitude: '', lieu: '', note: '', ...patch,
});

export function createStatBlock(patch = {}){
  const caracteristiques = {};
  for(const ab of ABILITIES) caracteristiques[ab] = { valeur: 10, mod: '+0', jds: '+0' };
  return {
    type_texte: '', ca: '10', pv: '10', vitesse: '9 m', initiative: '+0',
    caracteristiques,
    competences: '', vulnerabilites: null, resistances: null, immunites: null,
    sens: '', langues: '', fp: '', px: 0,
    traits: [], actions: [], actions_bonus: [], reactions: [], actions_legendaires: [],
    ...patch,
  };
}

export const createButin = (patch = {}) => ({
  id: uuid(), type: 'objet', nom: '', description: '',
  quantite: 1, valeur: null, contenu: [], ...patch,
});

export const createEncounter = (patch = {}) => ({
  id: uuid(), titre: '', notes: '', participants: [], butins: [], ...patch,
});

export const createLoreNote = (patch = {}) => ({
  id: uuid(), titre: '', texte: '', ...patch,
});

/**
 * Une session de jeu : le plateau (roster de RÉFÉRENCES vers les entités de la
 * campagne — jamais de copies), le journal des événements de la partie, puis
 * le récap et la trace des conséquences appliquées à la clôture.
 */
export const createSession = (patch = {}) => ({
  id: uuid(), numero: 1, titre: '', statut: 'preparation',
  datePrevue: '',        // date réelle de la partie (AAAA-MM-JJ)
  dateMonde: '',         // date fictive, champ libre (« 12 Mirtul 1492 »)
  roster: { creatures: [], encounters: [], maps: [], lore: [], butins: [], pjs: [] },
  ordreDuJour: '',
  log: [],
  recap: '',
  consequences: [],      // [{ refType, refId, resume }] — refType null : conséquence libre
  ...patch,
});

// Événement du journal : texte libre, tag, et refs vers les entités citées
// (auto-détectées via l'index du wiki) — c'est par elles que se construit
// l'historique « session par session » de chaque entité.
export const createLogEvent = (patch = {}) => ({
  id: uuid(), at: new Date().toISOString(), texte: '', tag: 'note', refs: [], ...patch,
});

// Personnage joueur au niveau campagne : un LIEN vers la fiche du Grimoire
// (si elle vit dans ce navigateur) + la couche MJ (objectifs, notes secrètes).
export const createPj = (patch = {}) => ({
  id: uuid(), characterId: null, nom: '', joueur: '', classe: '',
  objectifs: [], notesMJ: '', ...patch,
});

export const createObjectif = (patch = {}) => ({
  id: uuid(), texte: '', statut: 'en_cours', sessionId: null, ...patch,
});
