// Persistance locale des personnages (localStorage). Multi-personnages : une liste de
// fiches sauvegardées, avec un identifiant "actif" utilisé par la page Personnage.

import { uid } from '../utils.js';

const KEY_LIST = 'codex_characters_v1';
const KEY_ACTIVE = 'codex_active_character_id_v1';

function readAll(){
  try {
    const raw = localStorage.getItem(KEY_LIST);
    return raw ? JSON.parse(raw) : [];
  } catch(e){ return []; }
}
function writeAll(list){
  localStorage.setItem(KEY_LIST, JSON.stringify(list));
}

export function listCharacters(){
  return readAll().sort((a,b) => (b.updatedAt||0) - (a.updatedAt||0));
}
export function getCharacter(id){
  return readAll().find(c => c.id === id) || null;
}
export function getActiveId(){
  return localStorage.getItem(KEY_ACTIVE);
}
export function setActiveId(id){
  if(id) localStorage.setItem(KEY_ACTIVE, id);
  else localStorage.removeItem(KEY_ACTIVE);
}
export function getActiveCharacter(){
  const id = getActiveId();
  if(!id) return null;
  return getCharacter(id);
}
export function hasActiveCharacter(){
  return !!getActiveCharacter();
}
export function saveCharacter(character){
  character.updatedAt = Date.now();
  const list = readAll();
  const idx = list.findIndex(c => c.id === character.id);
  if(idx >= 0) list[idx] = character; else list.push(character);
  writeAll(list);
  return character;
}
export function deleteCharacter(id){
  const list = readAll().filter(c => c.id !== id);
  writeAll(list);
  if(getActiveId() === id){
    setActiveId(list.length ? list[0].id : null);
  }
}
export function createCharacterShell(){
  return {
    id: uid('pc'),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    step: 0,
    complete: false,
    profile: { name:'', appearance:'', notes:'', backstory:'', avatar:null },
    species: null,
    speciesChoiceSubrace: null,
    className: null,
    subclass: null,
    level: 1,
    classSkills: [],
    classEquipmentChoice: 'A',
    background: null,
    backgroundEquipmentChoice: 'A',
    abilities: { force:8, dexterite:8, constitution:8, intelligence:8, sagesse:8, charisme:8 },
    abilityBonusChoice: null, // { mode:'2-1'|'1-1-1', assign:{ability:bonus} }
    languages: [],
    inventory: [],
    gold: { pp:0, po:0, pe:0, pa:0, pc:0 },
    hp: { max:10, current:10, temp:0 },
    deathSaves: { success:[false,false,false], fail:[false,false,false] },
    spellsKnown: [],
    preparedSpells: [],
    usedSlots: {},
    hitDiceUsed: 0,
    equipMigrated: false,
    usedResources: {},
    maneuvers: [],
    metamagic: [],
    manifestations: [],
    weaponMasteries: [],
  };
}
