// Règles de points de vie, de repos et de sauvegardes contre la mort, partagées par la
// fiche classique et la fiche expérimentale : une seule source de vérité, les deux
// interfaces modifient exactement les mêmes données du personnage.

import { clamp } from '../utils.js';
import { roll } from '../dice.js';

/**
 * Dégâts : les PV temporaires encaissent d'abord. À 0 PV : un échec de sauvegarde
 * contre la mort (deux sur un coup critique) et la stabilisation est perdue.
 * Mort instantanée si les dégâts restants égalent ou dépassent les PV max.
 */
export function applyDamage(ch, amount, { crit = false } = {}){
  const before = ch.hp.current;
  let n = amount;
  const fromTemp = Math.min(ch.hp.temp || 0, n);
  ch.hp.temp = (ch.hp.temp || 0) - fromTemp;
  n -= fromTemp;
  ch.hp.current = clamp(ch.hp.current - n, 0, ch.hp.max);
  if(before === 0 && n > 0){
    const s = ch.deathSaves.s >= 3 ? 0 : ch.deathSaves.s;
    const f = n >= ch.hp.max ? 3 : Math.min(3, ch.deathSaves.f + (crit ? 2 : 1));
    ch.deathSaves = { s, f };
  }
  if(before > 0 && ch.hp.current === 0) ch.deathSaves = { s: 0, f: n - before >= ch.hp.max ? 3 : 0 };
}

export function applyHeal(ch, amount){
  ch.hp.current = clamp(ch.hp.current + amount, 0, ch.hp.max);
  if(ch.hp.current > 0) ch.deathSaves = { s: 0, f: 0 };
}

/** Les PV temporaires ne se cumulent pas : on garde le meilleur. */
export function applyTempHp(ch, amount){
  ch.hp.temp = Math.max(ch.hp.temp || 0, amount);
}

/** Repos long (règles 2024) : tous les PV, emplacements, ressources et tous les dés de vie. */
export function applyLongRest(ch){
  ch.hp.current = ch.hp.max;
  ch.hp.temp = 0;
  ch.usedSlots = {};
  ch.usedRes = {};
  ch.deathSaves = { s: 0, f: 0 };
  ch.hitDiceUsed = 0;
}

/**
 * Jet de sauvegarde contre la mort (10+ = succès, 9- = échec, 1 naturel = deux échecs,
 * 20 naturel = debout à 1 PV). Renvoie { r, kind } avec kind ∈ nat20 | nat1 | success | fail.
 */
export function rollDeathSave(ch){
  const r = roll(1, 20, 0).total;
  if(r === 20){
    ch.hp.current = 1;
    ch.deathSaves = { s: 0, f: 0 };
    return { r, kind: 'nat20' };
  }
  if(r === 1){
    ch.deathSaves.f = Math.min(3, ch.deathSaves.f + 2);
    return { r, kind: 'nat1' };
  }
  if(r >= 10){
    ch.deathSaves.s = Math.min(3, ch.deathSaves.s + 1);
    return { r, kind: 'success' };
  }
  ch.deathSaves.f = Math.min(3, ch.deathSaves.f + 1);
  return { r, kind: 'fail' };
}

/** Texte et icône du toast annonçant le résultat de rollDeathSave. */
export function deathSaveMessage({ r, kind }){
  if(kind === 'nat20') return { text: 'd20 → 20 naturel ! Tu te relèves à 1 PV !', icon: '✨' };
  if(kind === 'nat1') return { text: 'd20 → 1 naturel… deux échecs d\'un coup.', icon: '💀' };
  if(kind === 'success') return { text: `d20 → ${r} : succès !`, icon: '🎲' };
  return { text: `d20 → ${r} : échec…`, icon: '🎲' };
}

/** Pastille de sauvegarde contre la mort : clic = cocher / décocher jusqu'à ce rang. */
export function toggleDeathPip(ch, kind, index){
  const cur = ch.deathSaves[kind] || 0;
  ch.deathSaves[kind] = index < cur ? index : index + 1;
}
