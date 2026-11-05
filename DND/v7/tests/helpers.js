// Outils communs aux tests : DOM minimal, localStorage en mémoire, données réelles de data/.
import { readFileSync } from 'node:fs';

const memory = new Map();
globalThis.localStorage ??= {
  getItem: (k) => (memory.has(k) ? memory.get(k) : null),
  setItem: (k, v) => memory.set(k, String(v)),
  removeItem: (k) => memory.delete(k),
};
// dice.js pose un écouteur global au chargement.
globalThis.document ??= { addEventListener(){} };

const root = new URL('../', import.meta.url);

export async function loadRealData(){
  const { initData, DATA_FILES } = await import('../js/data.js');
  const raw = {};
  for(const [key, path] of Object.entries(DATA_FILES)) raw[key] = JSON.parse(readFileSync(new URL(path, root), 'utf-8'));
  return initData(raw);
}

export function readJSON(path){
  return JSON.parse(readFileSync(new URL(path, root), 'utf-8'));
}

/** Personnage minimal de niveau 1 ; `over` écrase les champs voulus. */
export function makeCharacter(over = {}){
  return {
    level: 1,
    classSlug: 'guerrier',
    species: 'humain',
    background: 'soldat',
    abilities: { force: 10, dexterite: 10, constitution: 10, intelligence: 10, sagesse: 10, charisme: 10 },
    skills: [],
    expertise: [],
    tools: [],
    inventory: [],
    overrides: {},
    ...over,
  };
}

export const equip = (name, extra = {}) => ({ name, qty: 1, equipped: true, slot: 'tenu', ...extra });
