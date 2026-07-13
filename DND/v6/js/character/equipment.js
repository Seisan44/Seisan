// Équipement : les armes s'équipent librement — autant qu'on veut, chacune
// apparaît dans l'onglet Actions ('tenu'). Une arme Polyvalente peut se manier
// à deux mains ('2m', son dé de dégâts augmente) ; une arme « Deux mains » est
// toujours en '2m'. Le bouclier se tient ('tenu'), l'armure se porte
// ('armure', une seule). `it.slot` est la source de vérité ; `it.equipped`
// reste synchronisé pour le code existant (CA, attaques, print).

import { DATA } from '../data.js';

export const isShield = (known) => known?.kind === 'armure' && /bouclier/i.test(known.categorie || '');
export const isBodyArmor = (known) => known?.kind === 'armure' && !/bouclier/i.test(known.categorie || '');
const hasProp = (known, name) => (known?.proprietes || []).some(p => String(p).toLowerCase().startsWith(name));
export const isTwoHandedOnly = (known) => known?.kind === 'arme' && hasProp(known, 'deux mains');
export const isVersatile = (known) => hasProp(known, 'polyvalente');
export const isLightWeapon = (known) => known?.kind === 'arme' && hasProp(known, 'légère');
export const canTwoHand = (known) => known?.kind === 'arme' && (isTwoHandedOnly(known) || isVersatile(known));

/** "Polyvalente (1d8)" → "1d8" : dés de dégâts quand l'arme est maniée à deux mains. */
export function versatileDice(known){
  for(const p of known?.proprietes || []){
    const m = String(p).match(/^polyvalente\s*\((\d+d\d+)\)/i);
    if(m) return m[1];
  }
  return null;
}

/**
 * Valide les slots de tout l'inventaire (une seule armure, « Deux mains »
 * toujours à deux mains…) et migre les anciens personnages : les slots par
 * main d'avant ('md', 'mg', 'md+mg') deviennent 'tenu', le booléen `equipped`
 * seul devient un slot.
 */
export function ensureEquipSlots(ch){
  const inv = ch.inventory || [];
  let armorSeen = false;
  inv.forEach((it) => {
    const k = DATA.lookupItem(it.name);
    if(!k || (k.kind !== 'arme' && k.kind !== 'armure')){ delete it.slot; return; }
    if(isBodyArmor(k)){
      const worn = it.slot === undefined ? !!it.equipped : it.slot === 'armure';
      it.slot = worn && !armorSeen ? 'armure' : null;
      armorSeen = armorSeen || it.slot === 'armure';
    } else {
      let slot = it.slot === undefined ? (it.equipped ? 'tenu' : null) : it.slot || null;
      if(slot && slot !== '2m') slot = 'tenu';
      if(slot === '2m' && !canTwoHand(k)) slot = 'tenu';
      if(slot && isTwoHandedOnly(k)) slot = '2m';
      it.slot = slot;
    }
    it.equipped = !!it.slot;
  });
}

/**
 * Équipe / range l'objet `idx` — aucune limite : toutes les armes équipées
 * apparaissent dans l'onglet Actions. 'tenu' = bouton Équiper (bascule),
 * '2m' = poigne à deux mains d'une arme Polyvalente, 'armure' = porter
 * l'armure (une seule à la fois).
 */
export function setEquipSlot(ch, idx, want){
  const inv = ch.inventory || [];
  const it = inv[idx];
  const k = DATA.lookupItem(it?.name);
  if(!it || !k) return;

  if(want === 'armure'){
    if(!isBodyArmor(k)) return;
    if(it.slot === 'armure') it.slot = null;
    else {
      for(const o of inv) if(o !== it && o.slot === 'armure'){ o.slot = null; o.equipped = false; }
      it.slot = 'armure';
    }
  } else if(want === '2m'){
    if(!canTwoHand(k)) return;
    if(isTwoHandedOnly(k)) it.slot = it.slot ? null : '2m';
    else it.slot = it.slot === '2m' ? 'tenu' : '2m';
  } else if(want === 'tenu'){
    if(k.kind !== 'arme' && !isShield(k)) return;
    it.slot = it.slot ? null : isTwoHandedOnly(k) ? '2m' : 'tenu';
  }
  it.equipped = !!it.slot;
}

/* ----------------------- Catégories de l'inventaire ----------------------- */

export const INVENTORY_CATEGORIES = [
  { key: 'equipement', title: 'Équipements', icon: '⚔️', hint: 'Armes, armures et boucliers — les armes équipées apparaissent dans l\'onglet Actions.' },
  { key: 'outil', title: 'Outils', icon: '🧰', hint: 'Instruments, boîtes de jeux et outils d\'artisan.' },
  { key: 'materiel', title: 'Matériels', icon: '🎒', hint: 'Matériel d\'aventurier : cordes, torches, potions, rations…' },
  { key: 'objet_magique', title: 'Objets magiques', icon: '✨', hint: 'Trésors enchantés glanés en aventure.' },
  { key: 'autre', title: 'Autres objets', icon: '📦', hint: 'Objets non reconnus dans les données du Grimoire.' },
];

export function itemCategory(known){
  if(!known) return 'autre';
  if(known.kind === 'arme' || known.kind === 'armure') return 'equipement';
  if(known.kind === 'outil') return 'outil';
  if(known.kind === 'materiel') return 'materiel';
  if(known.kind === 'objet_magique') return 'objet_magique';
  return 'autre';
}
