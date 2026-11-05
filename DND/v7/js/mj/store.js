// Store de la section MJ : classeur actif, persistance localStorage, pub/sub.
// Il y a TOUJOURS un classeur actif : une campagne ouverte, ou à défaut
// l'« Atelier » (classeur par défaut, créé automatiquement) — les outils
// fonctionnent donc sans jamais exiger la création d'une campagne.
// Toutes les vues lisent/écrivent le classeur via ce module et terminent
// leurs mutations par commit() ; le wiki s'abonne pour invalider son index.

import { storeGet, storeDel } from '../utils.js';
import { toast } from '../ui.js';
import { createCampaign, migrateCampaign, uuid } from './schema.js';

const K_INDEX  = 'mj.campaigns';           // [{id, nom, updatedAt, builtin?}] — liste légère
const K_ACTIVE = 'mj.activeCampaign';      // id du classeur ouvert
const K_DATA   = id => `mj.campaign.${id}`; // JSON complet, une clé par classeur

let active = null;
let saveTimer = null;
const listeners = new Set();

/* --------------------------------- Pub/sub -------------------------------- */

export function subscribe(fn){
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function emit(event){
  for(const fn of listeners) fn(event, active);
}

/* ------------------------------- Persistance ------------------------------ */

// storeSet() d'utils.js avale les erreurs de quota : ici on veut les voir
// pour prévenir le MJ (les cartes en Base64 peuvent remplir localStorage).
function safeSet(key, value){
  try { localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch { return false; }
}

function upsertIndex(entry){
  const idx = storeGet(K_INDEX, []).filter(c => c.id !== entry.id);
  idx.push(entry);
  safeSet(K_INDEX, idx);
}

function indexEntry(campaign){
  return {
    id: campaign.id, nom: campaign.nom, updatedAt: campaign.updatedAt,
    ...(campaign.builtin ? { builtin: true } : {}),
  };
}

function saveNow(){
  clearTimeout(saveTimer);
  saveTimer = null;
  if(!active) return;
  active.updatedAt = new Date().toISOString();
  const ok = safeSet(K_DATA(active.id), active);
  if(!ok){
    toast('Sauvegarde impossible : stockage plein. Exportez la campagne et allégez les cartes.', { icon: '⚠️', duration: 5000 });
    return;
  }
  upsertIndex(indexEntry(active));
}

/** Toute mutation du classeur actif se termine par commit(). */
export function commit(event = 'update'){
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveNow, 400);
  emit(event);
}

/* --------------------------------- Atelier -------------------------------- */

function createAtelier(){
  const atelier = createCampaign('Atelier');
  atelier.builtin = true;
  return atelier;
}

/** Charge l'Atelier existant, ou le crée s'il n'existe pas encore. */
function loadOrCreateAtelier(){
  const entry = storeGet(K_INDEX, []).find(c => c.builtin);
  const data = entry ? migrateCampaign(storeGet(K_DATA(entry.id))) : null;
  if(data) return data;
  const atelier = createAtelier();
  safeSet(K_DATA(atelier.id), atelier);
  upsertIndex(indexEntry(atelier));
  return atelier;
}

export function isAtelier(){ return !!active?.builtin; }

/** Bascule sur l'Atelier (le classeur par défaut, sans campagne). */
export function openAtelier(){
  saveNow();
  active = loadOrCreateAtelier();
  safeSet(K_ACTIVE, active.id);
  emit('open');
  return active;
}

/**
 * L'Atelier mûrit en vraie campagne : simple renommage (aucune copie),
 * et un Atelier vierge renaît pour les prochaines idées en vrac.
 */
export function promoteAtelier(nom){
  if(!active?.builtin) return null;
  delete active.builtin;
  active.nom = nom;
  saveNow();
  const fresh = createAtelier();
  safeSet(K_DATA(fresh.id), fresh);
  upsertIndex(indexEntry(fresh));
  emit('open');
  return active;
}

/** Vide l'Atelier (même id, contenu neuf) — il n'est jamais supprimé. */
export function clearAtelier(){
  if(!active?.builtin) return;
  const fresh = createAtelier();
  fresh.id = active.id;
  fresh.createdAt = active.createdAt;
  active = fresh;
  saveNow();
  emit('open');
}

/* ------------------------------ CRUD campagnes ---------------------------- */

export function initStore(){
  const id = storeGet(K_ACTIVE);
  if(id) active = migrateCampaign(storeGet(K_DATA(id)));
  if(!active) openAtelier();
  // Utilisateur d'avant l'Atelier arrivé avec une campagne active : l'Atelier
  // doit quand même exister (et apparaître dans le sélecteur de classeurs).
  else if(!storeGet(K_INDEX, []).some(c => c.builtin)) loadOrCreateAtelier();
}

export function getActiveCampaign(){ return active; }

/** Atelier d'abord, puis les campagnes de la plus à la moins récente. */
export function listCampaigns(){
  return storeGet(K_INDEX, []).sort((a, b) =>
    (b.builtin ? 1 : 0) - (a.builtin ? 1 : 0) || (b.updatedAt || '').localeCompare(a.updatedAt || ''));
}

export function loadCampaignData(id){
  return migrateCampaign(storeGet(K_DATA(id)));
}

export function createNewCampaign(nom){
  saveNow(); // ne pas perdre une écriture en attente du classeur précédent
  active = createCampaign(nom);
  safeSet(K_ACTIVE, active.id);
  saveNow();
  emit('open');
  return active;
}

export function openCampaign(id){
  if(active?.id === id) return active;
  saveNow();
  const data = loadCampaignData(id);
  if(!data){ toast('Campagne introuvable dans le stockage local', { icon: '⚠️' }); return null; }
  active = data;
  safeSet(K_ACTIVE, id);
  emit('open');
  return active;
}

export function renameCampaign(nom){
  if(!active) return;
  active.nom = nom;
  commit('rename');
}

/** Supprime une campagne ; si c'était la campagne active, retour à l'Atelier. */
export function deleteCampaign(id){
  const entry = storeGet(K_INDEX, []).find(c => c.id === id);
  if(entry?.builtin) return; // l'Atelier ne se supprime pas, il se vide
  storeDel(K_DATA(id));
  safeSet(K_INDEX, storeGet(K_INDEX, []).filter(c => c.id !== id));
  if(active?.id === id){
    clearTimeout(saveTimer);
    saveTimer = null;
    active = null;
    openAtelier();
  }
  emit('delete');
}

/** Enregistre une campagne importée et l'ouvre. asCopy : nouvel id + suffixe. */
export function importCampaignData(data, { asCopy = false } = {}){
  saveNow();
  if(asCopy){
    data.id = uuid();
    data.nom = `${data.nom} (copie)`;
  }
  active = data;
  safeSet(K_ACTIVE, active.id);
  saveNow();
  emit('open');
  return active;
}

/* --------------------------- Résolution d'entités ------------------------- */

// Type logique -> collection du classeur. « pnj » et « monstre » partagent
// la collection creatures (discriminée par le champ kind).
export const COLLECTIONS = {
  idea: 'ideas', map: 'maps', pnj: 'creatures', monstre: 'creatures',
  butin: 'butins', encounter: 'encounters', lore: 'lore',
  session: 'sessions', pj: 'pjs',
};

export function findEntity(type, id){
  const list = active?.[COLLECTIONS[type]];
  return list?.find(e => e.id === id) || null;
}

export const entityName = (entity) => entity?.nom ?? entity?.titre ?? '';

/** Nom affichable d'une session (le titre est optionnel). */
export const sessionLabel = (s) => (s?.titre || '').trim() || `Session ${s?.numero ?? '?'}`;

/** Variante longue, avec le numéro : « S3 · L'embuscade du col ». */
export const sessionDisplay = (s) => (s?.titre || '').trim()
  ? `S${s.numero} · ${s.titre.trim()}` : `Session ${s?.numero ?? '?'}`;

/* --------------------------------- Sessions -------------------------------- */

/** La session en cours de jeu, s'il y en a une (il y en a au plus une). */
export function getActiveSession(){
  return active?.sessions?.find(s => s.statut === 'en_cours') || null;
}

export function nextSessionNumber(){
  return (active?.sessions || []).reduce((n, s) => Math.max(n, s.numero || 0), 0) + 1;
}

/**
 * La biographie d'une entité : ses événements de journal et les conséquences
 * qui l'ont visée, groupés par session (de la plus récente à la plus ancienne).
 * Dérivée à la lecture — un événement n'est stocké qu'une seule fois, dans le
 * journal de sa session : pas de double saisie, pas de divergence possible.
 */
export function historyFor(type, id){
  const out = [];
  for(const s of active?.sessions || []){
    const events = s.log.filter(ev => ev.refs?.some(r => r.type === type && r.id === id));
    const consequences = s.consequences.filter(c => c.refType === type && c.refId === id);
    if(events.length || consequences.length) out.push({ session: s, events, consequences });
  }
  return out.reverse();
}

/**
 * Marque une entité comme récemment modifiée (Vue d'ensemble). À appeler
 * avant commit() — la liste est plafonnée pour rester légère.
 */
export function touch(type, id){
  if(!active) return;
  active.recent = (active.recent || []).filter(r => !(r.type === type && r.id === id));
  active.recent.unshift({ type, id, at: new Date().toISOString() });
  if(active.recent.length > 12) active.recent.length = 12;
}

/**
 * Suppression d'une entité AVEC nettoyage des références pendantes
 * (inventaires, contenus de conteneurs, participants, marqueurs, boîtes
 * finalisées, éléments récents).
 */
export function deleteEntity(type, id){
  if(!active) return;
  const list = active[COLLECTIONS[type]];
  const i = list?.findIndex(e => e.id === id) ?? -1;
  if(i === -1) return;
  list.splice(i, 1);

  if(type === 'butin'){
    for(const c of active.creatures) c.inventaire = c.inventaire.filter(x => x !== id);
    for(const b of active.butins) b.contenu = b.contenu.filter(x => x !== id);
    for(const e of active.encounters) e.butins = e.butins.filter(x => x !== id);
  }
  if(type === 'pnj' || type === 'monstre'){
    for(const e of active.encounters) e.participants = e.participants.filter(p => p.creatureId !== id);
  }
  if(type === 'session'){
    // Les objectifs résolus pendant cette session perdent leur ancrage.
    for(const pj of active.pjs) for(const o of pj.objectifs) if(o.sessionId === id) o.sessionId = null;
  }
  // Plateaux et journaux des sessions : on retire les références, jamais les
  // textes — l'histoire écrite ne s'efface pas avec la fiche.
  const rosterKey = { pnj: 'creatures', monstre: 'creatures', encounter: 'encounters',
    map: 'maps', lore: 'lore', butin: 'butins', pj: 'pjs' }[type];
  for(const s of active.sessions){
    if(rosterKey) s.roster[rosterKey] = s.roster[rosterKey].filter(x => x !== id);
    for(const ev of s.log) if(ev.refs?.length) ev.refs = ev.refs.filter(r => !(r.type === type && r.id === id));
  }
  for(const m of active.maps) m.pins = m.pins.filter(p => p.ref?.id !== id);
  for(const idea of active.ideas) if(idea.finalizedAs?.id === id) idea.finalizedAs = null;
  active.recent = (active.recent || []).filter(r => !(r.type === type && r.id === id));

  commit(`delete:${type}`);
}
