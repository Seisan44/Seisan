// Recommandations pour guider un joueur débutant pendant la création :
// priorité des caractéristiques par classe (bouton « Optimiser »), historiques
// conseillés (2-3 par classe, toujours cohérents avec la caractéristique
// principale), et premiers sorts conseillés (2-3 mineurs + 2-3 de niveau 1).
// Ce sont des choix éditoriaux classiques des guides D&D 2024 — pas des règles.

import { STANDARD_ARRAY } from './rules.js';

/* -------------------- Priorité des caractéristiques -------------------- */
// De la plus importante à la moins importante, par classe (clés de ABILITIES).
export const CLASS_ABILITY_PRIORITY = {
  'Barbare': ['force', 'constitution', 'dexterite', 'sagesse', 'charisme', 'intelligence'],
  'Barde': ['charisme', 'dexterite', 'constitution', 'sagesse', 'intelligence', 'force'],
  'Clerc': ['sagesse', 'constitution', 'force', 'dexterite', 'charisme', 'intelligence'],
  'Druide': ['sagesse', 'constitution', 'dexterite', 'intelligence', 'charisme', 'force'],
  'Ensorceleur': ['charisme', 'constitution', 'dexterite', 'sagesse', 'intelligence', 'force'],
  'Guerrier': ['force', 'constitution', 'dexterite', 'sagesse', 'charisme', 'intelligence'],
  'Magicien': ['intelligence', 'constitution', 'dexterite', 'sagesse', 'charisme', 'force'],
  'Moine': ['dexterite', 'sagesse', 'constitution', 'force', 'charisme', 'intelligence'],
  'Occultiste': ['charisme', 'constitution', 'dexterite', 'sagesse', 'intelligence', 'force'],
  'Paladin': ['force', 'charisme', 'constitution', 'dexterite', 'sagesse', 'intelligence'],
  'Rodeur': ['dexterite', 'sagesse', 'constitution', 'force', 'intelligence', 'charisme'],
  'Roublard': ['dexterite', 'constitution', 'intelligence', 'charisme', 'sagesse', 'force'],
};

/** Répartition « optimisée » du tableau standard pour une classe : la meilleure
    valeur va à la caractéristique la plus prioritaire. Retourne { key: valeur }. */
export function optimizedAbilities(classTitle){
  const order = CLASS_ABILITY_PRIORITY[classTitle];
  if(!order) return null;
  const values = [...STANDARD_ARRAY].sort((a, b) => b - a);
  const out = {};
  order.forEach((key, i) => { out[key] = values[i]; });
  return out;
}

/** Choix des bonus d'historique (+2 / +1) le plus utile pour la classe, limité
    aux caractéristiques proposées par l'historique (labels : "Force", …). */
export function recommendedBonusChoice(classTitle, bgCaracLabels, abilityLabelByKey){
  const order = CLASS_ABILITY_PRIORITY[classTitle] || [];
  const ranked = order.map(k => abilityLabelByKey(k)).filter(l => bgCaracLabels.includes(l));
  return { plus2: ranked[0] || bgCaracLabels[0] || null, plus1: ranked[1] || bgCaracLabels[1] || null };
}

/* -------------------------- Historiques conseillés -------------------------- */
// 2-3 historiques par classe qui boostent la caractéristique principale
// (et souvent la Constitution), avec un don d'origine qui colle au rôle.
export const RECOMMENDED_BACKGROUNDS = {
  'Barbare': ['Soldat', 'Fermier', 'Marin'],
  'Barde': ['Artiste', 'Charlatan', 'Noble'],
  'Clerc': ['Acolyte', 'Ermite', 'Fermier'],
  'Druide': ['Guide', 'Ermite', 'Fermier'],
  'Ensorceleur': ['Charlatan', 'Marchand', 'Noble'],
  'Guerrier': ['Soldat', 'Garde', 'Criminel'],
  'Magicien': ['Sage', 'Scribe', 'Criminel'],
  'Moine': ['Guide', 'Voyageur', 'Marin'],
  'Occultiste': ['Charlatan', 'Acolyte', 'Marchand'],
  'Paladin': ['Soldat', 'Noble', 'Artiste'],
  'Rodeur': ['Guide', 'Voyageur', 'Marin'],
  'Roublard': ['Criminel', 'Charlatan', 'Voyageur'],
};

export function isRecommendedBackground(classTitle, bgName){
  return (RECOMMENDED_BACKGROUNDS[classTitle] || []).includes(bgName);
}

/* ---------------------------- Sorts conseillés ---------------------------- */
// Noms 2024 (partie avant le « | » dans data/sorts.json). Un mélange classique :
// un sort d'attaque fiable, un utilitaire, un sort de secours.
export const RECOMMENDED_SPELLS = {
  'Barde': {
    cantrips: ['Moquerie cruelle', 'Prestidigitation'],
    spells: ['Mot de guérison', 'Murmures dissonants', 'Sommeil'],
  },
  'Clerc': {
    cantrips: ['Flamme sacrée', 'Assistance', 'Thaumaturgie'],
    spells: ['Bénédiction', 'Soins', 'Rayon traçant'],
  },
  'Druide': {
    cantrips: ['Fouet épineux', 'Assistance', 'Crosse des druides'],
    spells: ['Enchevêtrement', 'Soins', 'Lueurs féeriques'],
  },
  'Ensorceleur': {
    cantrips: ['Trait de feu', 'Rayon de givre', 'Main de mage'],
    spells: ['Bouclier', 'Projectile magique', 'Sommeil'],
  },
  'Magicien': {
    cantrips: ['Trait de feu', 'Main de mage', 'Rayon de givre'],
    spells: ['Projectile magique', 'Bouclier', 'Armure de mage'],
  },
  'Occultiste': {
    cantrips: ['Décharge occulte', 'Main de mage'],
    spells: ['Maléfice', 'Représailles infernales', 'Armure d\'Agathys'],
  },
  'Paladin': {
    cantrips: [],
    spells: ['Bénédiction', 'Soins', 'Châtiment divin'],
  },
  'Rodeur': {
    cantrips: [],
    spells: ['Marque du chasseur', 'Soins', 'Grêle d\'épines'],
  },
};

/** Le sort est-il conseillé pour cette classe ? `s` est un sort indexé (data.js). */
export function isRecommendedSpell(classTitle, s){
  const rec = RECOMMENDED_SPELLS[classTitle];
  if(!rec) return false;
  const list = s._niveauNum === 0 ? rec.cantrips : rec.spells;
  return list.includes(s._primaryName);
}

/** Trie une liste de sorts : conseillés d'abord, puis ordre alphabétique. */
export function sortRecommendedFirst(classTitle, spells){
  return [...spells].sort((a, b) => {
    const ra = isRecommendedSpell(classTitle, a) ? 0 : 1;
    const rb = isRecommendedSpell(classTitle, b) ? 0 : 1;
    return ra - rb || a._primaryName.localeCompare(b._primaryName);
  });
}
