// Stockage local des personnages (multi-personnages, sélection courante).

import { storeGet, storeSet, uid } from '../utils.js';

const KEY = 'grimoire.characters';
const CURRENT_KEY = 'grimoire.currentCharacter';

export function listCharacters(){
  return storeGet(KEY, []);
}

export function getCharacter(id){
  return listCharacters().find(c => c.id === id) || null;
}

export function saveCharacter(ch){
  const list = listCharacters();
  if(!ch.id) ch.id = uid('perso');
  ch.updatedAt = Date.now();
  const i = list.findIndex(c => c.id === ch.id);
  if(i === -1) list.push(ch);
  else list[i] = ch;
  storeSet(KEY, list);
  return ch;
}

export function deleteCharacter(id){
  storeSet(KEY, listCharacters().filter(c => c.id !== id));
  if(getCurrentCharacterId() === id) storeSet(CURRENT_KEY, null);
}

export function getCurrentCharacterId(){
  return storeGet(CURRENT_KEY, null);
}
export function setCurrentCharacterId(id){
  storeSet(CURRENT_KEY, id);
}
export function getCurrentCharacter(){
  const id = getCurrentCharacterId();
  return id ? getCharacter(id) : null;
}

/* ------------------------- Export / import JSON ------------------------- */

/** Fichier d'export : le personnage tel quel, dans une enveloppe identifiable.
    _version 2 : bourse (coins), états (conditions), maîtrises d'outils (tools),
    sorts non préparés (unprepared), sauvegardes contre la mort, dés de vie. */
export function characterExportPayload(ch){
  return { _app: 'grimoire-de-seisan', _type: 'personnage', _version: 2, exportedAt: new Date().toISOString(), personnage: ch };
}

/**
 * Nettoie un personnage importé (enveloppe d'export ou objet brut).
 * Retourne le personnage prêt à sauvegarder (sans id : un nouveau sera créé),
 * ou null si la forme ne ressemble pas à un personnage.
 */
export function sanitizeImportedCharacter(raw){
  if(!raw || typeof raw !== 'object') return null;
  const ch = (raw._type === 'personnage' && raw.personnage && typeof raw.personnage === 'object') ? raw.personnage : raw;
  if(typeof ch.name !== 'string' || !ch.name.trim()) return null;
  if(!ch.abilities || typeof ch.abilities !== 'object') return null;
  if(typeof ch.classSlug !== 'string' || typeof ch.species !== 'string' || typeof ch.background !== 'string') return null;
  if(!ch.hp || typeof ch.hp !== 'object' || !Number.isFinite(Number(ch.hp.max))) return null;
  const clean = { ...ch };
  delete clean.id; // nouvel id à l'import : pas d'écrasement d'un héros existant
  clean.name = ch.name.trim().slice(0, 60);
  clean.level = Math.min(20, Math.max(1, parseInt(clean.level, 10) || 1));
  clean.hp = { max: Math.max(1, Math.round(Number(ch.hp.max))), current: Math.max(0, Math.round(Number(ch.hp.current) || 0)), temp: Math.max(0, Math.round(Number(ch.hp.temp) || 0)) };
  clean.hp.current = Math.min(clean.hp.current, clean.hp.max);
  if(!Array.isArray(clean.skills)) clean.skills = [];
  if(!Array.isArray(clean.inventory)) clean.inventory = [];
  if(!Array.isArray(clean.cantrips)) clean.cantrips = [];
  if(!Array.isArray(clean.spells)) clean.spells = [];
  if(typeof clean.overrides !== 'object' || clean.overrides == null) clean.overrides = {};
  // Champs _version 2 (les vieux exports n'en ont pas : valeurs sûres par défaut).
  clean.tools = Array.isArray(clean.tools) ? clean.tools.filter(t => typeof t === 'string') : [];
  clean.conditions = Array.isArray(clean.conditions) ? clean.conditions.filter(c => typeof c === 'string') : [];
  clean.unprepared = Array.isArray(clean.unprepared) ? clean.unprepared.filter(s => typeof s === 'string') : [];
  if(clean.coins && typeof clean.coins === 'object'){
    const c = {};
    for(const k of ['pp', 'po', 'pe', 'pa', 'pc']) c[k] = Math.max(0, Math.round(Number(clean.coins[k]) || 0));
    clean.coins = c;
  } else {
    delete clean.coins; // la fiche migrera depuis l'ancien champ `gold`
  }
  clean.deathSaves = {
    s: Math.min(3, Math.max(0, Math.round(Number(clean.deathSaves?.s) || 0))),
    f: Math.min(3, Math.max(0, Math.round(Number(clean.deathSaves?.f) || 0))),
  };
  clean.hitDiceUsed = Math.min(clean.level, Math.max(0, Math.round(Number(clean.hitDiceUsed) || 0)));
  if(typeof clean.usedSlots !== 'object' || clean.usedSlots == null) clean.usedSlots = {};
  if(typeof clean.usedRes !== 'object' || clean.usedRes == null) clean.usedRes = {};
  delete clean.turn; // état de tour de combat : éphémère, on repart à neuf
  return clean;
}
