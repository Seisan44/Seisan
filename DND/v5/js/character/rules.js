// Règles de jeu D&D 2024 qui ne sont pas fournies par data/*.json et qu'il faut donc
// reconstruire soi-même (kits de départ par classe, tables de progression des sorts,
// méthode d'attribution des caractéristiques). Reconstitution volontairement plausible
// et cohérente à partir des règles officielles — voir README pour le détail des choix.

import { readResourceColumn } from '../class-traits.js';

export const ABILITIES = [
  { key:'force', label:'Force', short:'For' },
  { key:'dexterite', label:'Dextérité', short:'Dex' },
  { key:'constitution', label:'Constitution', short:'Con' },
  { key:'intelligence', label:'Intelligence', short:'Int' },
  { key:'sagesse', label:'Sagesse', short:'Sag' },
  { key:'charisme', label:'Charisme', short:'Cha' },
];

export const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];

// Caractéristique associée à chacune des 18 compétences (règles 2024) — permet de
// calculer le bonus total de chaque compétence (mod. de caractéristique + maîtrise
// éventuelle) sans avoir à le stocker en dur pour chaque personnage.
export const SKILL_ABILITY = {
  'Acrobaties':'dexterite',
  'Arcanes':'intelligence',
  'Athlétisme':'force',
  'Discrétion':'dexterite',
  'Dressage':'sagesse',
  'Escamotage':'dexterite',
  'Histoire':'intelligence',
  'Intimidation':'charisme',
  'Intuition':'sagesse',
  'Investigation':'intelligence',
  'Médecine':'sagesse',
  'Nature':'intelligence',
  'Perception':'sagesse',
  'Persuasion':'charisme',
  'Religion':'intelligence',
  'Représentation':'charisme',
  'Survie':'sagesse',
  'Tromperie':'charisme',
};

export const LANGUAGES = [
  'Commun','Argot commun','Draconique','Elfique','Gnome','Gobelin','Halfelin','Nain','Orc','Géant',
  'Abyssal','Céleste','Infernal','Primordial','Sylvestre','Profond','Druidique','Voleur',
];

// L'équipement de départ officiel par classe est extrait directement de
// html_traits_table (voir js/class-traits.js -> parseStartingEquipmentChoices),
// qui contient déjà le texte exact des règles 2024 pour les 12 classes — inutile de
// le reconstituer à la main ici.

export const CASTER_TYPE = {
  'Barde':'full', 'Clerc':'full', 'Druide':'full', 'Ensorceleur':'full', 'Magicien':'full',
  'Paladin':'half', 'Rodeur':'half', 'Occultiste':'pact',
};
export const SPELLCASTING_ABILITY = {
  'Barde':'charisme', 'Clerc':'sagesse', 'Druide':'sagesse', 'Ensorceleur':'charisme', 'Magicien':'intelligence',
  'Paladin':'charisme', 'Rodeur':'sagesse', 'Occultiste':'charisme',
};
export const PREPARED_CASTERS = new Set(['Clerc','Druide','Magicien','Paladin']);

export function isCasterClass(classTitle){ return !!CASTER_TYPE[classTitle]; }

// Le nombre de sorts mineurs/préparés-connus et les emplacements de sorts par niveau ne
// sont plus reconstruits à la main ici : ils dépendent de la classe d'une façon trop fine
// (paliers propres à chaque classe en 2024, pas une simple formule "niveau + modificateur")
// et sont déjà publiés en toutes lettres dans classes.json (html_capacites_table). Voir
// js/class-traits.js -> parseSpellcastingTable, utilisé directement par la fiche.

function clampLevel(l){ return Math.min(20, Math.max(1, parseInt(l,10)||1)); }

export function proficiencyBonus(level){
  const lvl = clampLevel(level);
  return 2 + Math.floor((lvl - 1) / 4);
}

// ---------- Statistiques de combat dérivées (CA, Initiative, Vitesse, DD sorts...) ----------
// Reconstruites ici (plutôt que codées en dur dans sheet.js) pour rester testables et
// partagées entre l'affichage écran et la fiche imprimable.

/** Parse la formule de CA d'une armure ("11 + modificateur de Dex", "... (max 2)", ou une valeur fixe). */
export function parseArmorCA(caStr, dexMod){
  const str = String(caStr || '');
  const capped = str.match(/^(\d+)\s*\+\s*modificateur de Dex\s*\(max\s*(\d+)\)/i);
  if(capped){
    const base = Number(capped[1]);
    const cap = Number(capped[2]);
    const applied = Math.min(dexMod, cap);
    return { value: base + applied, breakdown: [`${base} (armure)`, `${applied>=0?'+':''}${applied} Dex (max +${cap})`] };
  }
  const uncapped = str.match(/^(\d+)\s*\+\s*modificateur de Dex/i);
  if(uncapped){
    const base = Number(uncapped[1]);
    return { value: base + dexMod, breakdown: [`${base} (armure)`, `${dexMod>=0?'+':''}${dexMod} Dex`] };
  }
  const fixed = str.match(/^(\d+)$/);
  if(fixed){
    return { value: Number(fixed[1]), breakdown: [`${fixed[1]} (armure lourde — Dex non appliquée)`] };
  }
  return { value: 10 + dexMod, breakdown: [`10 (base)`, `${dexMod>=0?'+':''}${dexMod} Dex`] };
}

/**
 * Classe d'Armure : sans armure équipée, 10 + Dex ; avec armure, formule propre à
 * l'armure (voir parseArmorCA) ; + 2 si un bouclier est équipé en main secondaire.
 * `armorItem`/`hasShield` sont dérivés de l'équipement (ch.inventory[i].equipped).
 */
export function computeArmorClass({ dexMod, armorCA, hasShield }){
  const base = armorCA != null ? parseArmorCA(armorCA, dexMod) : { value: 10 + dexMod, breakdown: [`10 (base, aucune armure)`, `${dexMod>=0?'+':''}${dexMod} Dex`] };
  const shieldBonus = hasShield ? 2 : 0;
  return {
    value: base.value + shieldBonus,
    breakdown: shieldBonus ? [...base.breakdown, '+2 bouclier'] : base.breakdown,
  };
}

/** Vitesse de base de l'espèce (ex. "9 m") réduite de 3 m si l'armure requiert plus de Force que le personnage n'en a. */
export function computeSpeed({ speciesSpeedLabel, forceScore, armorForceReq }){
  const m = String(speciesSpeedLabel || '9 m').match(/(\d+(?:[.,]\d+)?)/);
  const base = m ? parseFloat(m[1].replace(',', '.')) : 9;
  const penalized = armorForceReq != null && (forceScore || 0) < armorForceReq;
  return { value: penalized ? Math.max(0, base - 3) : base, penalized, base };
}

export function spellSaveDC(prof, abilityMod){ return 8 + prof + abilityMod; }
export function spellAttackBonus(prof, abilityMod){ return prof + abilityMod; }
export function passivePerception(perceptionSkillBonus){ return 10 + perceptionSkillBonus; }

// ---------- Ressources de classe (Rage, Second souffle, Points de Sorcellerie...) ----------
// Comme les emplacements de sorts, ces valeurs par niveau sont déjà publiées en toutes
// lettres dans html_capacites_table (voir js/class-traits.js -> parseClassResourceColumns) :
// il suffit de dire, pour chaque classe, quelle colonne lire (ou comment la calculer quand
// elle n'est pas tabulée, ex. Fougue/Action Surge) et selon quelle règle elle se récupère.
// `recovery`: 'long' (repos long uniquement), 'rest' (repos court OU long, intégralement),
// ou 'rage' (règle propre à la Rage : 1 utilisation récupérée par repos court, toutes par
// repos long). `kind:'info'` = valeur affichée mais non consommable (pas de jetons à cocher).
export const CLASS_RESOURCE_DEFS = {
  'Barbare': [
    { key:'rage', label:'Rage', icon:'🔥', column:'Rages', recovery:'rage', kind:'pool' },
    { key:'ragedmg', label:'Bonus aux dégâts de Rage', icon:'💥', column:'Dégâts de Rage', kind:'info' },
  ],
  'Guerrier': [
    { key:'secondsouffle', label:'Second souffle', icon:'💨', column:'Second souffle', recovery:'rest', kind:'pool' },
    { key:'fougue', label:'Fougue (action supplémentaire)', icon:'⚡', staticMax: (lvl) => lvl>=17?2:lvl>=2?1:0, recovery:'rest', kind:'pool' },
  ],
  'Moine': [
    { key:'credo', label:'Points de Credo', icon:'☯️', column:'Points de credo', recovery:'rest', kind:'pool' },
  ],
  'Ensorceleur': [
    { key:'sorcellerie', label:'Points de Sorcellerie', icon:'✨', column:'Sorcellerie', recovery:'long', kind:'pool' },
  ],
  'Clerc': [
    { key:'conduit', label:'Conduit divin', icon:'☀️', column:'divin', recovery:'rest', kind:'pool' },
  ],
  'Paladin': [
    { key:'conduit', label:'Conduit divin', icon:'☀️', column:'divin', recovery:'rest', kind:'pool' },
  ],
};

/** Valeur maximale (ou affichée) d'une ressource de classe au niveau donné. `resourceTable`
 * est le résultat de parseClassResourceColumns(html_capacites_table) pour la classe. */
export function classResourceValue(def, level, resourceTable){
  if(def.staticMax) return def.staticMax(clampLevel(level));
  const raw = def.column ? readResourceColumn(resourceTable, level, def.column) : null;
  if(raw == null || raw === '-' || raw === '–') return def.kind === 'info' ? raw : 0;
  if(def.kind === 'info') return raw;
  const n = parseInt(raw, 10);
  return Number.isFinite(n) ? n : 0;
}

// ---------- Maîtrise des armes ("Bottes d'arme") ----------
// Barbare/Guerrier progressent selon une colonne dédiée de html_capacites_table ; Paladin/
// Rôdeur/Roublard sont fixés à 2 types d'armes dès le niveau 1 sans progression ultérieure
// (règle 2024 stable, non tabulée dans les données — texte de la capacité "Bottes d'arme").
const FIXED_WEAPON_MASTERY_COUNT = { 'Paladin':2, 'Rodeur':2, 'Roublard':2 };
export function weaponMasteryCount(className, level, resourceTable){
  if(FIXED_WEAPON_MASTERY_COUNT[className] != null) return clampLevel(level) >= 1 ? FIXED_WEAPON_MASTERY_COUNT[className] : 0;
  if(className === 'Barbare' || className === 'Guerrier'){
    const raw = readResourceColumn(resourceTable, level, "Botte d'arme");
    const n = parseInt(raw, 10);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}
export function hasWeaponMastery(className){
  return className === 'Barbare' || className === 'Guerrier' || FIXED_WEAPON_MASTERY_COUNT[className] != null;
}

// ---------- Maître de guerre (Guerrier) : dés de Supériorité & manœuvres ----------
// "Vous disposez de quatre dés de Supériorité (d8)... vous gagnez un dé supplémentaire aux
// niveaux 7 (cinq) et 15 (six)" + "Vos dés de Supériorité deviennent des d10" au niveau 10.
export function superiorityDice(level){
  const lvl = clampLevel(level);
  if(lvl < 3) return { count:0, faces:8 };
  return { count: lvl>=15?6:lvl>=7?5:4, faces: lvl>=10?10:8 };
}
// "Vous apprenez trois manœuvres... deux manœuvres supplémentaires... aux niveaux 7, 10 et 15."
export function maneuversKnownCount(level){
  const lvl = clampLevel(level);
  if(lvl < 3) return 0;
  if(lvl >= 15) return 9;
  if(lvl >= 10) return 7;
  if(lvl >= 7) return 5;
  return 3;
}

// Les 20 manœuvres du Maître de guerre (texte officiel 2024, source aidedd.org — la même
// source que le reste de classes.json — car la section "Options de manœuvre" référencée
// dans la description de la capacité Supériorité martiale n'est pas incluse dans les
// données fournies).
export const MANEUVERS_2024 = [
  { name:"Attaque menaçante", description:"Lorsque vous touchez une créature avec un jet d'attaque, vous pouvez dépenser un dé de Supériorité pour tenter de l'effrayer. Ajoutez le résultat du dé de Supériorité aux dégâts de l'attaque. La cible doit réussir un jet de sauvegarde de Sagesse ou subir l'état Effrayé jusqu'à la fin de votre prochain tour." },
  { name:"Attaque précise", description:"En cas d'échec à un jet d'attaque, vous pouvez dépenser un dé de Supériorité, le lancer et l'ajouter au jet d'attaque, ce qui peut potentiellement vous faire toucher." },
  { name:"Autorité naturelle", description:"Lorsque vous effectuez un jet de Charisme (Intimidation, Représentation ou Persuasion), vous pouvez dépenser un dé de Supériorité et l'ajouter au résultat." },
  { name:"Balayage", description:"Lorsque vous touchez une créature avec un jet d'attaque au corps à corps utilisant une arme ou une Frappe à mains nues, vous pouvez dépenser un dé de Supériorité pour tenter d'infliger des dégâts à une autre créature. Choisissez une autre créature située dans un rayon de 1,50 mètre autour de la cible initiale et à portée de votre allonge. Si le jet d'attaque initial aurait touché la seconde créature, celle-ci subit des dégâts égaux au résultat de votre dé de Supériorité. Ces dégâts sont du même type que ceux infligés par l'attaque initiale." },
  { name:"Bélier", description:"Lorsque vous touchez une créature avec un jet d'attaque utilisant une arme ou une Frappe à mains nues, vous pouvez dépenser un dé de Supériorité pour tenter de repousser la cible. Ajoutez le résultat du dé de Supériorité aux dégâts de l'attaque. Si la cible est de taille G ou inférieure, elle doit réussir un jet de sauvegarde de Force ou être repoussée jusqu'à 4,50 mètres en ligne droite." },
  { name:"Chassé-croisé", description:"Lorsque vous vous trouvez dans un rayon de 1,50 mètre autour d'une créature à votre tour, vous pouvez dépenser un dé de Supériorité et échanger votre place avec elle, à condition de vous déplacer d'au moins 1,50 mètre, que la créature soit consentante, qu'elle ne subisse pas l'état Incapable d'agir. Ce déplacement ne provoque pas d'attaques d'Opportunité. Lancez le dé de Supériorité. Jusqu'au début de votre prochain tour, vous ou l'autre créature (à votre choix) gagnez un bonus à la CA égal au résultat du dé." },
  { name:"Croc-en-jambe", description:"Lorsque vous touchez une créature avec un jet d'attaque utilisant une arme ou une Frappe à mains nues, vous pouvez dépenser un dé de Supériorité et ajouter le résultat au jet de dégâts. Si la cible est de taille G ou inférieure, elle doit réussir un jet de sauvegarde de Force ou subir l'état À terre." },
  { name:"Désarmement", description:"Lorsque vous touchez une créature avec un jet d'attaque, vous pouvez dépenser un dé de Supériorité pour tenter de la désarmer. Ajoutez le résultat du dé de Supériorité aux dégâts de l'attaque. La cible doit réussir un jet de sauvegarde de Force ou lâcher un objet de votre choix qu'elle tient, celui-ci tombant dans son espace." },
  { name:"Diversion", description:"Lorsque vous touchez une créature avec un jet d'attaque, vous pouvez dépenser un dé de Supériorité pour distraire la cible. Ajoutez le résultat du dé de Supériorité au jet de dégâts de l'attaque. Le prochain jet d'attaque contre la cible effectué par un autre attaquant que vous bénéficie d'un Avantage si l'attaque est effectuée avant le début de votre prochain tour." },
  { name:"Embuscade", description:"Lorsque vous effectuez un jet de Dextérité (Discrétion) ou un jet d'Initiative, vous pouvez dépenser un dé de Supériorité et ajouter le résultat au jet, sauf si vous subissez l'état Incapable d'agir." },
  { name:"Évaluation tactique", description:"Lorsque vous effectuez un jet d'Intelligence (Histoire ou Investigation) ou un jet de Sagesse (Intuition), vous pouvez dépenser un dé de Supériorité et ajouter ce dé au jet de caractéristique." },
  { name:"Feinte", description:"Par une action Bonus, vous pouvez dépenser un dé de Supériorité pour feinter, en choisissant une créature dans un rayon de 1,50 mètre comme cible. Vous avez un Avantage à votre prochain jet d'attaque contre cette cible pendant ce tour. Si cette attaque touche, ajoutez le résultat du dé de Supériorité aux dégâts de l'attaque." },
  { name:"Fente", description:"Par une action Bonus, vous pouvez dépenser un dé de Supériorité et prendre l'action Pointe. Si vous vous déplacez d'au moins 1,50 mètre en ligne droite juste avant de porter une attaque au corps à corps dans le cadre d'une action Attaque durant ce tour, vous pouvez ajouter le résultat du dé de Supériorité au jet de dégâts de l'attaque." },
  { name:"Instruction", description:"Lorsque vous prenez l'action Attaque à votre tour, vous pouvez remplacer l'une de vos attaques pour ordonner à l'un de vos compagnons d'attaquer. Choisissez alors une créature consentante qui peut vous voir ou vous entendre et dépensez un dé de Supériorité. Cette créature peut immédiatement utiliser sa Réaction pour effectuer une attaque avec une arme ou une Frappe à mains nues, en ajoutant le résultat du dé de Supériorité aux dégâts de l'attaque en cas de succès." },
  { name:"Jeu de jambes défensif", description:"Par une action Bonus, vous pouvez dépenser un dé de Supériorité et prendre l'action Désengagement. Vous lancez également le dé et ajoutez le résultat à votre CA jusqu'au début de votre prochain tour." },
  { name:"Manœuvre tactique", description:"Lorsque vous touchez une créature avec un jet d'attaque, vous pouvez dépenser un dé de Supériorité pour positionner l'un de vos alliés. Ajoutez le résultat du dé de Supériorité aux dégâts de l'attaque et choisissez une créature consentante qui peut vous voir ou vous entendre. Cette créature peut utiliser sa Réaction pour se déplacer jusqu'à la moitié de sa Vitesse sans provoquer d'attaque d'Opportunité de la part de la cible de votre attaque." },
  { name:"Parade", description:"Lorsqu'une autre créature vous inflige des dégâts avec un jet d'attaque au corps à corps, vous pouvez utiliser une Réaction et dépenser un dé de Supériorité pour réduire les dégâts du résultat de votre dé de Supériorité plus votre modificateur de Force ou de Dextérité (au choix)." },
  { name:"Provocation", description:"Lorsque vous touchez une créature avec un jet d'attaque, vous pouvez dépenser un dé de Supériorité pour tenter de la provoquer et l'inciter à vous attaquer. Ajoutez le résultat du dé de Supériorité aux dégâts de l'attaque. La cible doit réussir un jet de sauvegarde de Sagesse ou subir un Désavantage aux jets d'attaque contre les cibles autres que vous jusqu'à la fin de votre prochain tour." },
  { name:"Regain", description:"Par une action Bonus, vous pouvez dépenser un dé de Supériorité pour renforcer la détermination d'un allié. Choisissez un allié dans un rayon de 9 mètres qui peut vous voir ou vous entendre. Cette créature gagne des points de vie temporaires égaux au résultat du dé de Supériorité plus la moitié de votre niveau de guerrier (arrondi à l'inférieur)." },
  { name:"Riposte", description:"Lorsqu'une créature vous rate avec un jet d'attaque au corps à corps, vous pouvez utiliser une Réaction et dépenser un dé de Supériorité pour effectuer un jet d'attaque au corps à corps avec une arme ou une Frappe à mains nues contre elle. En cas de succès, ajoutez le résultat du dé de Supériorité aux dégâts de l'attaque." },
];

// ---------- Ensorceleur : Métamagie ----------
// "Vous obtenez deux options de Métamagie... Vous en obtenez deux supplémentaires au
// niveau 10... et deux autres au niveau 17."
export function metamagicKnownCount(level){
  const lvl = clampLevel(level);
  if(lvl < 2) return 0;
  if(lvl >= 17) return 6;
  if(lvl >= 10) return 4;
  return 2;
}

// Les 10 options de Métamagie 2024 (texte officiel, source aidedd.org — la section
// "Options de Métamagie" référencée dans la description de la capacité Métamagie n'est
// pas incluse dans les données fournies).
export const METAMAGIC_2024 = [
  { name:"Sort accéléré", cost:2, description:"Lorsque vous lancez un sort dont le temps d'incantation est de une action, vous pouvez dépenser 2 points de Sorcellerie pour transformer le temps d'incantation en une action Bonus pour cette incantation. Vous ne pouvez pas modifier un sort de cette manière si vous avez déjà lancé un sort de niveau 1 ou plus pendant le tour en cours, ni lancer un sort de niveau 1 ou plus pendant ce tour après avoir modifié un sort de cette manière." },
  { name:"Sort ample", cost:1, description:"Lorsque vous lancez un sort d'une portée d'au moins 1,50 mètre, vous pouvez dépenser 1 point de Sorcellerie pour doubler sa portée. Ou, lorsque vous lancez un sort de contact, vous pouvez dépenser 1 point de Sorcellerie pour que sa portée soit de 9 mètres." },
  { name:"Sort chercheur", cost:1, description:"Si vous ratez un jet d'attaque pour un sort, vous pouvez dépenser 1 point de Sorcellerie pour relancer le d20, et vous devez utiliser le nouveau jet. Vous pouvez utiliser Sort chercheur même si vous avez déjà utilisé une autre option de Métamagie lors de l'incantation du sort." },
  { name:"Sort étendu", cost:1, description:"Lorsque vous lancez un sort d'une durée d'une minute ou plus, vous pouvez dépenser 1 point de Sorcellerie pour doubler sa durée, jusqu'à une durée maximale de 24 heures. Si le sort affecté requiert de la Concentration, vous bénéficiez d'un Avantage à chaque jet de sauvegarde effectué pour maintenir cette Concentration." },
  { name:"Sort intensifié", cost:2, description:"Lorsque vous lancez un sort qui force une créature à effectuer un jet de sauvegarde, vous pouvez dépenser 2 points de Sorcellerie pour donner à une cible du sort un Désavantage aux jets de sauvegarde contre le sort." },
  { name:"Sort jumeau", cost:1, description:"Lorsque vous lancez un sort, comme charme-personne, qui peut être lancé avec un emplacement de sort de niveau supérieur pour cibler une créature supplémentaire, vous pouvez dépenser 1 point de Sorcellerie pour augmenter le niveau effectif du sort de 1." },
  { name:"Sort prévenant", cost:1, description:"Lorsque vous lancez un sort qui force d'autres créatures à effectuer un jet de sauvegarde, vous pouvez protéger certaines d'entre elles de la pleine puissance du sort. Pour ce faire, dépensez 1 point de Sorcellerie et choisissez un nombre de ces créatures inférieur ou égal à votre modificateur de Charisme (minimum une créature). Une créature choisie réussit automatiquement son jet de sauvegarde contre le sort et ne subit aucun dégât si elle subit normalement la moitié des dégâts en cas de jet réussi." },
  { name:"Sort renforcé", cost:1, description:"Lorsque vous lancez les dégâts pour un sort, vous pouvez dépenser 1 point de Sorcellerie pour relancer un nombre de dés de dégâts inférieur ou égal à votre modificateur de Charisme (minimum 1), et vous devez utiliser les nouveaux jets. Vous pouvez utiliser Sort renforcé même si vous avez déjà utilisé une autre option de Métamagie lors de l'incantation du sort." },
  { name:"Sort subtil", cost:1, description:"Lorsque vous lancez un sort, vous pouvez dépenser 1 point de Sorcellerie pour le lancer sans aucune composante verbale, somatique ou matérielle, à l'exception des composantes matérielles qui sont consommées par le sort ou qui ont un coût spécifié dans le sort." },
  { name:"Sort transmuté", cost:1, description:"Lorsque vous lancez un sort qui inflige un type de dégâts de la liste suivante, vous pouvez dépenser 1 point de Sorcellerie pour changer ce type de dégâts par l'un des autres types répertoriés : acide, feu, foudre, froid, poison, tonnerre." },
];

// ---------- Occultiste : Manifestations occultes ----------
// Contrairement aux Manœuvres/Métamagie ci-dessus (paliers fixes non tabulés), le nombre
// de manifestations connues progresse selon la colonne "Manifestations occultes" de
// html_capacites_table (déjà publiée en toutes lettres dans classes.json — voir
// js/class-traits.js -> parseClassResourceColumns). La liste des manifestations elle-même
// (nom, prérequis, description) est fournie par le champ "manifestations" de la classe
// Occultiste dans classes.json, pas reconstruite ici.
export function manifestationsKnownCount(level, resourceTable){
  const raw = readResourceColumn(resourceTable, level, 'Manifestations occultes');
  const n = parseInt(raw, 10);
  return Number.isFinite(n) ? n : 0;
}
