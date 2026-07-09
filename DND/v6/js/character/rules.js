// Règles D&D 2024 non fournies par data/*.json (caractéristiques, compétences,
// lanceurs de sorts, calculs dérivés). Les tables de progression par niveau sont
// lues depuis html_capacites_table (voir js/class-traits.js), pas reconstruites ici.

import { stripAccents } from '../utils.js';

export const ABILITIES = [
  { key: 'force', label: 'Force', short: 'For' },
  { key: 'dexterite', label: 'Dextérité', short: 'Dex' },
  { key: 'constitution', label: 'Constitution', short: 'Con' },
  { key: 'intelligence', label: 'Intelligence', short: 'Int' },
  { key: 'sagesse', label: 'Sagesse', short: 'Sag' },
  { key: 'charisme', label: 'Charisme', short: 'Cha' },
];
export const ABILITY_BY_LABEL = new Map(ABILITIES.map(a => [a.label, a]));

export const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];

// Caractéristique associée à chacune des 18 compétences (règles 2024).
export const SKILL_ABILITY = {
  'Acrobaties': 'dexterite',
  'Arcanes': 'intelligence',
  'Athlétisme': 'force',
  'Discrétion': 'dexterite',
  'Dressage': 'sagesse',
  'Escamotage': 'dexterite',
  'Histoire': 'intelligence',
  'Intimidation': 'charisme',
  'Intuition': 'sagesse',
  'Investigation': 'intelligence',
  'Médecine': 'sagesse',
  'Nature': 'intelligence',
  'Perception': 'sagesse',
  'Persuasion': 'charisme',
  'Religion': 'intelligence',
  'Représentation': 'charisme',
  'Survie': 'sagesse',
  'Tromperie': 'charisme',
};

// Descriptions simples pour les débutants (utilisées par l'assistant et la Voie).
export const ABILITY_HINTS = {
  force: 'Puissance physique : frapper fort, soulever, pousser, grimper.',
  dexterite: 'Agilité et réflexes : esquiver, viser, se faufiler, garder l’équilibre.',
  constitution: 'Endurance : encaisser les coups, résister au poison et à la fatigue.',
  intelligence: 'Savoir et logique : se souvenir, déduire, comprendre la magie des livres.',
  sagesse: 'Instinct et attention : remarquer, percevoir les intentions, garder son calme.',
  charisme: 'Force de personnalité : convaincre, mentir, impressionner, inspirer.',
};

export const CASTER_TYPE = {
  'Barde': 'full', 'Clerc': 'full', 'Druide': 'full', 'Ensorceleur': 'full', 'Magicien': 'full',
  'Paladin': 'half', 'Rodeur': 'half', 'Occultiste': 'pact',
};
export const SPELLCASTING_ABILITY = {
  'Barde': 'charisme', 'Clerc': 'sagesse', 'Druide': 'sagesse', 'Ensorceleur': 'charisme',
  'Magicien': 'intelligence', 'Paladin': 'charisme', 'Rodeur': 'sagesse', 'Occultiste': 'charisme',
};
export function isCasterClass(classTitle){ return !!CASTER_TYPE[classTitle]; }

function clampLevel(l){ return Math.min(20, Math.max(1, parseInt(l, 10) || 1)); }

export function proficiencyBonus(level){
  return 2 + Math.floor((clampLevel(level) - 1) / 4);
}

/** Parse la formule de CA d'une armure ("11 + modificateur de Dex", "... (max 2)", valeur fixe). */
export function parseArmorCA(caStr, dexMod){
  const str = String(caStr || '');
  const capped = str.match(/^(\d+)\s*\+\s*modificateur de Dex\s*\(max\s*(\d+)\)/i);
  if(capped){
    const base = Number(capped[1]);
    const cap = Number(capped[2]);
    const applied = Math.min(dexMod, cap);
    return { value: base + applied, breakdown: [`${base} (armure)`, `${applied >= 0 ? '+' : ''}${applied} Dex (max +${cap})`] };
  }
  const uncapped = str.match(/^(\d+)\s*\+\s*modificateur de Dex/i);
  if(uncapped){
    const base = Number(uncapped[1]);
    return { value: base + dexMod, breakdown: [`${base} (armure)`, `${dexMod >= 0 ? '+' : ''}${dexMod} Dex`] };
  }
  const fixed = str.match(/^(\d+)$/);
  if(fixed){
    return { value: Number(fixed[1]), breakdown: [`${fixed[1]} (armure lourde — Dex non appliquée)`] };
  }
  return { value: 10 + dexMod, breakdown: ['10 (base)', `${dexMod >= 0 ? '+' : ''}${dexMod} Dex`] };
}

export function computeArmorClass({ dexMod, armorCA, hasShield }){
  const base = armorCA != null
    ? parseArmorCA(armorCA, dexMod)
    : { value: 10 + dexMod, breakdown: ['10 (base, aucune armure)', `${dexMod >= 0 ? '+' : ''}${dexMod} Dex`] };
  const shieldBonus = hasShield ? 2 : 0;
  return {
    value: base.value + shieldBonus,
    breakdown: shieldBonus ? [...base.breakdown, '+2 bouclier'] : base.breakdown,
  };
}

/** Vitesse de l'espèce, réduite de 3 m si l'armure exige plus de Force que le
    personnage, et plafonnée à 1,50 m si la charge portée dépasse la capacité. */
export function computeSpeed({ speciesSpeedLabel, forceScore, armorForceReq, overloaded = false }){
  const m = String(speciesSpeedLabel || '9 m').match(/(\d+(?:[.,]\d+)?)/);
  const base = m ? parseFloat(m[1].replace(',', '.')) : 9;
  const penalized = armorForceReq != null && (forceScore || 0) < armorForceReq;
  let value = Math.max(0, base - (penalized ? 3 : 0));
  if(overloaded) value = Math.min(value, 1.5);
  return { value, penalized, overloaded, base };
}

/** "Force 13" -> 13 (exigence de Force des armures lourdes). */
export function parseArmorForceReq(forceStr){
  const m = String(forceStr || '').match(/(\d+)/);
  return m ? Number(m[1]) : null;
}

export function spellSaveDC(prof, abilityMod){ return 8 + prof + abilityMod; }
export function spellAttackBonus(prof, abilityMod){ return prof + abilityMod; }

/** Convertit un champ "poids" ("2 kg", "0,5 kg", "125 g", null) en kilogrammes. */
export function parseWeightKg(poidsStr){
  const m = String(poidsStr || '').trim().match(/^([\d.,]+)\s*(kg|g)?$/i);
  if(!m) return 0;
  const n = parseFloat(m[1].replace(',', '.'));
  if(!Number.isFinite(n)) return 0;
  return m[2]?.toLowerCase() === 'g' ? n / 1000 : n;
}

/* ---------------------------- Capacité de charge ---------------------------- */

// Multiplicateur (kg par point de Force) selon la catégorie de taille.
// Pousser / tirer / soulever = le double.
export const CARRY_MULTIPLIER = { TP: 3.75, P: 7.5, M: 7.5, G: 15, TG: 30, Gig: 60 };

/** "M (entre 1,20 m et 2,15 m) ou P (…)" -> "M" (première catégorie citée). */
export function parseSizeCategory(tailleLabel){
  const m = String(tailleLabel || 'M').trim().match(/^(TP|TG|Gig|G|P|M)\b/);
  return m ? m[1] : 'M';
}

/** Poids maximal porté / poussé-tiré-soulevé, selon taille et Force. */
export function carryCapacity(sizeCat, forceScore){
  const mult = CARRY_MULTIPLIER[sizeCat] ?? CARRY_MULTIPLIER.M;
  const carry = (forceScore || 0) * mult;
  return { carry, pushDragLift: carry * 2, mult, sizeCat };
}

/* --------------------------- Maîtrise des armes ----------------------------- */

/**
 * Le personnage maîtrise-t-il cette arme ? `armesLabel` vient de la table de
 * traits de classe ("Armes courantes et de guerre", "Armes courantes et armes
 * de guerre qui ont la propriété Légère"…). Sans maîtrise : pas de bonus de
 * maîtrise au jet d'attaque.
 */
export function isWeaponProficient(armesLabel, weapon){
  const label = stripAccents(String(armesLabel || '')).toLowerCase();
  const cat = stripAccents(String(weapon?.categorie || '')).toLowerCase();
  if(label.includes('courantes') && cat.includes('courantes')) return true;
  if(cat.includes('guerre') && label.includes('guerre')){
    const propMatch = label.match(/propriete\s+(.+)$/);
    if(!propMatch) return true;
    const wanted = propMatch[1].split(/\s+ou\s+/).map(p => p.trim());
    const props = (weapon?.proprietes || []).map(p => stripAccents(p).toLowerCase());
    return wanted.some(w => props.some(p => p.startsWith(w)));
  }
  return false;
}

/* ----------------------------- Styles de combat ----------------------------- */

// Niveau auquel chaque classe reçoit « Style de combat » (règles 2024).
export const FIGHTING_STYLE_LEVEL = { 'Guerrier': 1, 'Paladin': 2, 'Rodeur': 2 };

export const FIGHTING_STYLES = [
  { id: 'archerie', nom: 'Archerie', desc: '+2 aux jets d\'attaque avec les armes à distance.' },
  { id: 'defense', nom: 'Défense', desc: '+1 à la CA tant que tu portes une armure.' },
  { id: 'duel', nom: 'Duel', desc: '+2 aux dégâts avec une arme de corps à corps maniée à une main (l\'autre main libre ou avec un bouclier).' },
  { id: 'armes-a-deux-mains', nom: 'Armes à deux mains', desc: 'Relance les 1 et 2 des dés de dégâts d\'une arme à deux mains (garde le nouveau résultat).' },
  { id: 'combat-a-deux-armes', nom: 'Combat à deux armes', desc: 'Ajoute ton modificateur de caractéristique aux dégâts de la seconde attaque à deux armes.' },
  { id: 'protection', nom: 'Protection', desc: 'Réaction (bouclier requis) : impose le Désavantage à une attaque visant un allié à 1,50 m de toi.' },
  { id: 'interception', nom: 'Interception', desc: 'Réaction : réduis de 1d10 + bonus de maîtrise les dégâts subis par une créature à 1,50 m.' },
  { id: 'combat-aveugle', nom: 'Combat en aveugle', desc: 'Vision aveugle à 3 m : tu perçois tout ce qui n\'est pas caché de toi, même sans voir.' },
  { id: 'armes-de-lancer', nom: 'Armes de lancer', desc: '+2 aux dégâts avec les armes de lancer.' },
  { id: 'mains-nues', nom: 'Combat à mains nues', desc: 'Tes frappes à mains nues infligent 1d6 + Force (1d8 si les deux mains sont libres).' },
];

/* --------------------------------- Monnaies ---------------------------------
   Les cinq pièces officielles et leur valeur en pièces d'or. La bourse d'un
   personnage est `ch.coins = { pp, po, pe, pa, pc }` (entiers ≥ 0). */

export const COINS = [
  { key: 'pp', label: 'Platine', inPo: 10 },
  { key: 'po', label: 'Or', inPo: 1 },
  { key: 'pe', label: 'Electrum', inPo: 0.5 },
  { key: 'pa', label: 'Argent', inPo: 0.1 },
  { key: 'pc', label: 'Cuivre', inPo: 0.01 },
];

/** Valeur totale de la bourse, en pièces d'or (peut être fractionnaire). */
export function coinsTotalPo(coins){
  return COINS.reduce((sum, c) => sum + Math.max(0, coins?.[c.key] || 0) * c.inPo, 0);
}

/** Convertit l'ancien champ `gold` (po, éventuellement fractionnaire) en bourse. */
export function coinsFromGold(gold){
  const totalPc = Math.max(0, Math.round((Number(gold) || 0) * 100));
  return {
    pp: 0,
    po: Math.floor(totalPc / 100),
    pe: 0,
    pa: Math.floor((totalPc % 100) / 10),
    pc: totalPc % 10,
  };
}

/* --------------------------- Ressources de classe ---------------------------
   Compteurs propres à chaque classe (Rage, Forme sauvage…). `col` référence la
   colonne de html_capacites_table (lue par parseClassResourceColumns) ; `uses`
   permet un calcul direct. `reset` est indicatif ("long", "court ou long").
   `tone` choisit la teinte des jetons (--res-<tone> dans style.css) : rage,
   nature, arcane, sacre, vitalite, ki, charme, chasse, ombre.                 */

export const CLASS_RESOURCES = {
  'Barbare': [
    { key: 'rage', label: 'Rage', icon: 'i-rage', col: 'Rages', reset: 'long', tone: 'rage' },
    { key: 'degats-rage', label: 'Dégâts de Rage', col: 'Dégâts de Rage', static: true, tone: 'rage' },
  ],
  'Barde': [
    { key: 'inspiration', label: 'Inspiration bardique', icon: 'i-sorts', uses: (d) => Math.max(1, d.mods.charisme), suffixCol: 'bardique', reset: 'long', tone: 'charme' },
  ],
  'Clerc': [
    { key: 'conduit', label: 'Conduit divin', icon: 'i-sorts', col: 'divin', reset: 'court ou long', tone: 'sacre' },
  ],
  'Druide': [
    { key: 'forme-sauvage', label: 'Forme sauvage', icon: 'i-especes', col: 'sauvage', reset: 'court ou long', tone: 'nature' },
  ],
  'Ensorceleur': [
    { key: 'sorcellerie', label: 'Points de sorcellerie', icon: 'i-sorts', col: 'Sorcellerie', reset: 'long', tone: 'arcane' },
  ],
  'Guerrier': [
    { key: 'second-souffle', label: 'Second souffle', icon: 'i-heart', col: 'Second souffle', reset: 'court ou long', tone: 'vitalite' },
  ],
  'Moine': [
    { key: 'credo', label: 'Points de credo', icon: 'i-voie', col: 'Points de credo', reset: 'court ou long', tone: 'ki' },
    { key: 'arts-martiaux', label: 'Arts martiaux', col: 'Arts martiaux', static: true, tone: 'ki' },
    { key: 'deplacement', label: 'Déplacement sans armure', col: 'Déplacement sans armure', static: true, tone: 'ki' },
  ],
  'Occultiste': [
    { key: 'manifestations', label: 'Manifestations occultes', col: 'Manifestations occultes', static: true, tone: 'arcane' },
  ],
  'Paladin': [
    { key: 'imposition', label: 'Imposition des mains (PV)', icon: 'i-heart', uses: (d, ch) => ch.level * 5, reset: 'long', tone: 'sacre' },
    { key: 'conduit', label: 'Conduit divin', icon: 'i-sorts', col: 'divin', minLevel: 3, reset: 'court ou long', tone: 'sacre' },
  ],
  'Rodeur': [
    { key: 'ennemi-jure', label: 'Ennemi juré', icon: 'i-target', col: 'juré', reset: 'long', tone: 'chasse' },
  ],
  'Roublard': [
    { key: 'sournoise', label: 'Attaque sournoise', col: 'Attaque sournoise', static: true, tone: 'ombre' },
  ],
};

/* Goliath (règles 2024) : l'« Ascendance gigante » se choisit à la création parmi
   les bienfaits nommés « … (géants des …) » dans species.json — on les repère au
   suffixe entre parenthèses plutôt que de recoder la liste. */
export function giantAncestryLabel(nom){
  const m = String(nom || '').match(/\((g[ée]ants?\s[^)]+)\)\s*$/i);
  if(!m) return '';
  return m[1].charAt(0).toUpperCase() + m[1].slice(1);
}

/** Capacités d'une espèce qui sont des options d'ascendance gigante (vide si aucune). */
export function giantAncestryOptions(sp){
  return (sp?.capacites || []).filter(c => giantAncestryLabel(c.nom));
}
