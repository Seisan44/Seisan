// Contenu de référence de la page "Carac. / Compét." — mécaniques générales du chapitre
// "Utiliser les caractéristiques" du Manuel des Joueurs 2024, condensées et reformulées
// (jamais copiées mot pour mot) dans le même style que js/pages/combat-content.js : des
// données pures, affichées par js/pages/carac-competences.js.

import { proficiencyBonus } from '../character/rules.js';

// ---------- Le jet de base : d20 + modificateur + maîtrise ≥ DD ----------
export const CHECK_FORMULA = {
  parts: [
    { key:'dice', label:'d20' },
    { key:'stat', label:'Modificateur', sub:'de la caractéristique concernée' },
    { key:'prof', label:'Maîtrise', sub:'si la compétence est maîtrisée' },
    { key:'target', label:'DD', op:'≥' },
    { key:'hit', label:'RÉUSSITE', op:'=' },
  ],
};

// ---------- Valeur de caractéristique → modificateur ----------
export const MODIFIER_TABLE = [
  { range:'2-3', mod:-4 }, { range:'4-5', mod:-3 }, { range:'6-7', mod:-2 }, { range:'8-9', mod:-1 },
  { range:'10-11', mod:0 }, { range:'12-13', mod:1 }, { range:'14-15', mod:2 }, { range:'16-17', mod:3 },
  { range:'18-19', mod:4 }, { range:'20-21', mod:5 },
];
export const MODIFIER_SHORTCUT = "Raccourci : soustrayez 10 à la valeur, divisez par 2, arrondissez à l'inférieur.";

// ---------- Avantage / Désavantage (cas généraux, hors attaque — voir la page Combat pour l'attaque) ----------
export const ADV_CASES_GENERAL = [
  "Une capacité de classe, un sort, un don ou un objet magique vous l'accorde explicitement",
  "Un allié vous aide activement dans la tâche (voir « Travailler ensemble » ci-dessous)",
  "Vous dépensez un point d'Inspiration héroïque pour vous l'octroyer",
  "Le MJ juge que les circonstances jouent clairement en votre faveur",
];
export const DISADV_CASES_GENERAL = [
  "Une capacité de classe, un sort, un piège ou un état vous l'impose explicitement",
  "Vous tentez la tâche dans des conditions clairement défavorables (obscurité, outils inadaptés, distraction...)",
  "Le MJ juge que les circonstances jouent clairement en votre défaveur",
];
export const ADV_STACKING_NOTE = "Peu importe le nombre de sources d'Avantage ou de Désavantage, vous ne lancez jamais plus d'un d20 supplémentaire. Si les deux sont présents en même temps, ils s'annulent : lancez un seul d20. Une capacité qui permet de relancer ou remplacer un d20 (comme la Chance du halfelin) ne touche qu'un seul des deux dés, au choix du joueur.";

// ---------- Bonus de maîtrise ----------
// Table dérivée de rules.js -> proficiencyBonus, pour rester automatiquement synchronisée si
// la formule de progression change un jour (plutôt que de dupliquer les paliers en dur ici).
export const PROFICIENCY_TABLE = (() => {
  const rows = [];
  let start = 1, prev = proficiencyBonus(1);
  for(let lvl = 2; lvl <= 21; lvl++){
    const bonus = lvl <= 20 ? proficiencyBonus(lvl) : null;
    if(bonus !== prev){ rows.push({ from:start, to:lvl-1, bonus:prev }); start = lvl; prev = bonus; }
  }
  return rows;
})();
export const PROFICIENCY_NOTE = "Le bonus de maîtrise ne s'applique jamais plus d'une fois au même jet, même si plusieurs règles semblent l'accorder. Certaines capacités le multiplient (l'Expertise du Roublard le double, par exemple) — mais si vous n'êtes pas maîtrisé, votre bonus est 0, et le multiplier reste 0.";

// ---------- Degré de Difficulté ----------
export const DD_TABLE = [
  { tache:'Très facile', dd:5 }, { tache:'Facile', dd:10 }, { tache:'Moyenne', dd:15 },
  { tache:'Difficile', dd:20 }, { tache:'Très difficile', dd:25 }, { tache:'Quasi impossible', dd:30 },
];

// ---------- Jets d'opposition ----------
export const OPPOSED_CHECK = {
  text:"Quand deux créatures s'affrontent directement pour un même objectif — récupérer un objet tombé au sol, forcer une porte que l'autre retient — chacune fait le jet de caractéristique adapté à son effort. Pas de DD fixe : le total le plus haut l'emporte.",
  tieNote:"En cas d'égalité, la situation n'évolue pas : personne ne progresse (sauf si un camp gagnait déjà « par défaut », comme la porte qui reste fermée si personne ne l'ouvre).",
};

// ---------- Jets passifs ----------
export const PASSIVE_CHECK = {
  formulaText:"10 + tous les modificateurs qui s'appliqueraient normalement au jet (+5 si Avantage, -5 si Désavantage).",
  example:"Un personnage de niveau 1 (maîtrise +2) avec 15 en Sagesse (+2) et la maîtrise de Perception a une Sagesse (Perception) passive de 14 — c'est exactement la valeur « Perception passive » affichée sur la fiche de personnage.",
  note:"Aucun jet de dé : représente une vigilance constante (repérer un piège en passant devant) ou un jet secret du MJ (repérer un monstre caché) plutôt qu'un effort ponctuel.",
};

// ---------- Travailler ensemble & Jet de groupe ----------
export const WORKING_TOGETHER = {
  title:'🤝 Travailler ensemble',
  text:"Le personnage qui mène l'effort (généralement le meilleur modificateur) fait son jet avec Avantage si un ou plusieurs autres l'aident utilement. Il faut être capable de réussir la tâche seul pour pouvoir aider — et certaines tâches (enfiler une aiguille...) ne sont pas plus faciles à plusieurs.",
};
export const GROUP_CHECK = {
  title:'👥 Jet de groupe',
  text:"Tout le monde fait le jet ; si au moins la moitié du groupe réussit, le groupe entier réussit — les personnages compétents entraînent ceux qui le sont moins. Utile quand tout le monde doit réussir ou échouer ensemble, comme éviter collectivement un piège naturel dans un marais.",
};

// ---------- Compétences liées à une autre caractéristique (variante) ----------
export const CROSS_ABILITY_NOTE = "Le MJ peut exceptionnellement associer une compétence à une autre caractéristique que la sienne, quand la situation le justifie : nager loin demande de l'endurance (jet de Constitution), mais un maîtrise en Athlétisme reste pertinente et s'applique quand même.";

// ---------- Contenu additionnel par caractéristique : usages annexes + mécaniques liées ----------
export const ABILITY_OTHER_USES = {
  force: ["Enfoncer une porte coincée ou verrouillée", "Vous libérer de liens", "Vous faufiler dans un passage trop étroit", "Vous accrocher à un chariot pour vous faire traîner"],
  dexterite: ["Contrôler un chariot lourdement chargé en pente", "Manœuvrer un chariot dans un virage serré", "Crocheter une serrure ou désarmer un piège", "Ligoter un prisonnier, ou vous détacher de vos liens", "Jouer d'un instrument ou fabriquer un petit objet minutieux"],
  constitution: ["Retenir votre respiration", "Marcher ou travailler des heures sans repos", "Rester éveillé malgré la fatigue", "Survivre sans eau ni nourriture", "Vider une chope d'un trait"],
  intelligence: ["Communiquer sans utiliser de mots", "Estimer la valeur d'un objet précieux", "Vous déguiser pour tromper un garde", "Falsifier un document", "Gagner à un jeu de compétence"],
  sagesse: ["Avoir un pressentiment sur la marche à suivre", "Déterminer si un mort apparent est en réalité un mort-vivant"],
  charisme: ["Trouver la bonne personne pour glaner des rumeurs", "Vous fondre dans une foule pour capter l'ambiance générale"],
};

export const ABILITY_MECHANICS = {
  force: [
    { icon:'⚔', title:'Attaque & dégâts au corps à corps', text:"Ajoutez votre modificateur de Force au jet d'attaque et aux dégâts des armes de corps à corps (masse, hache d'armes, javeline...)." },
    { icon:'🎒', title:'Capacité de charge', text:"Vous portez jusqu'à Force × 7,5 kg (le double pour pousser/tirer/soulever) avant d'être encombré. Calculée automatiquement sur votre fiche de personnage — onglet Inventaire et Statistiques de combat — avec alerte dès que vous la dépassez.", featured:true },
  ],
  dexterite: [
    { icon:'🎯', title:'Attaque & dégâts à distance / finesse', text:"Ajoutez votre modificateur de Dextérité aux attaques à distance (arc, fronde...) et aux armes de corps à corps avec la propriété Finesse (dague, rapière...)." },
    { icon:'🛡', title:'Classe d’Armure', text:"Selon l'armure portée, tout ou partie de votre modificateur de Dextérité s'ajoute à votre CA." },
    { icon:'⏱', title:'Initiative', text:"1d20 + modificateur de Dextérité en début de combat, pour déterminer l'ordre des tours." },
  ],
  constitution: [
    { icon:'❤️', title:'Points de vie', text:"Ajoutez votre modificateur de Constitution à chaque dé de vie lancé. S'il change, votre maximum de PV est recalculé rétroactivement depuis le niveau 1." },
  ],
  intelligence: [
    { icon:'📖', title:'Capacité d’incantation — Magicien', text:"Le Magicien utilise l'Intelligence pour le DD et le bonus d'attaque de ses sorts (8 + maîtrise + modificateur d'Intelligence)." },
  ],
  sagesse: [
    { icon:'📖', title:'Capacité d’incantation — Clerc, Druide, Rôdeur', text:"Ces trois classes utilisent la Sagesse pour le DD et le bonus d'attaque de leurs sorts." },
    { icon:'👂', title:'Perception passive', text:"10 + votre bonus de Perception : la valeur utilisée sans jet actif, affichée automatiquement dans les Statistiques de combat de votre fiche." },
  ],
  charisme: [
    { icon:'📖', title:'Capacité d’incantation — Barde, Ensorceleur, Occultiste, Paladin', text:"Ces quatre classes utilisent le Charisme pour le DD et le bonus d'attaque de leurs sorts." },
  ],
};

// ---------- Jets de sauvegarde ----------
export const SAVE_FORMULA = {
  parts: [
    { key:'dice', label:'d20' },
    { key:'stat', label:'Modificateur', sub:'de la caractéristique visée' },
    { key:'prof', label:'Maîtrise', sub:'si la sauvegarde est maîtrisée' },
    { key:'target', label:'DD', op:'≥' },
    { key:'hit', label:'SAUVEGARDE<br>RÉUSSIE', op:'=' },
  ],
};
export const SAVE_INTRO = "Un jet de sauvegarde tente de résister à un sort, un piège, un poison ou une autre menace directe — vous ne le choisissez jamais, il vous est imposé par la situation.";
export const SAVE_PROFICIENCY_NOTE = "Chaque classe accorde la maîtrise d'au moins deux jets de sauvegarde (visibles sur votre fiche de personnage, dans le bloc Jets de sauvegarde). Le DD dépend de l'effet en jeu : pour un sort, 8 + maîtrise + modificateur de la caractéristique d'incantation du lanceur — la valeur « DD sorts » déjà calculée sur votre fiche.";
