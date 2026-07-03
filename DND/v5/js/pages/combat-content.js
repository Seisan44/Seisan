// Contenu de référence sur le combat (règles 2024), structuré en données plutôt qu'en
// HTML figé : combat.js s'en sert pour construire les schémas interactifs de l'aide-mémoire.
// Les actions et états puisent leur texte complet dans le glossaire (data/glossaire.json)
// via getGlossaryEntry, afin de ne jamais dupliquer un texte de règle à deux endroits.

export const TURN_FLOW = [
  { key:'mouvement', icon:'🏃', label:'Mouvement', desc:"Jusqu'à votre Vitesse", note:'Divisible à volonté', badge:'optional', badgeLabel:'Optionnel' },
  { key:'action',    icon:'⚔', label:'Action', desc:'Attaquer, lancer un sort, foncer…', note:'Une par tour', badge:'required', badgeLabel:'1 par tour' },
  { key:'bonus',     icon:'✦', label:'Action Bonus', desc:'Si une capacité vous en accorde une', note:'', badge:'optional', badgeLabel:'Si disponible' },
  { key:'reaction',  icon:'⚡', label:'Réaction', desc:'À tout moment du round', note:'', badge:'special', badgeLabel:'1 par round', linkArrow:true },
];

export const TURN_TIPS = [
  { icon:'🆓', title:'Interagir avec un objet', text:"Dégainer une arme, ouvrir une porte, ramasser un objet… une interaction simple avec votre environnement est possible en plus de votre action, sans lui être soustraite." },
  { icon:'💬', title:'Communiquer', text:"Échanger quelques mots ou un geste bref avec vos alliés ne vous coûte ni action, ni Action Bonus — même hors de votre tour." },
];

export const TURN_ORDER = [
  { title:'Surprise ?', desc:"Le MJ détermine qui est pris par Surprise (une créature qui ne remarque la présence d'aucun adversaire hostile au début du combat). Une créature Surprise a un Désavantage à son jet d'Initiative — elle peut agir normalement dès son premier tour." },
  { title:'Initiative', desc:"Chacun lance un d20 et ajoute son modificateur de Dextérité (l'Initiative). Le MJ classe tous les participants du résultat le plus élevé au plus faible ; cet ordre reste valable pour toute la rencontre." },
  { title:'Rounds', desc:"Chaque participant prend son tour dans l'ordre d'Initiative. Une fois que tout le monde a joué, un nouveau round commence — toujours dans le même ordre." },
  { title:'Fin du combat', desc:"La rencontre se termine quand un camp est vaincu, fuit ou se rend." },
];

export const EN_PERIL_TEXT = "Une créature est En péril dès qu'il lui reste la moitié ou moins de ses points de vie maximum : un simple repère narratif et tactique, sans effet mécanique direct, souvent utilisé par le MJ pour signaler qu'une créature commence à flancher.";

// 12 actions du tronc commun (glossaire « actions ») — l'ordre suit la fréquence d'usage
// en partie plutôt que l'ordre alphabétique du glossaire.
export const COMBAT_ACTIONS = [
  { id:'attaque',       icon:'⚔' },
  { id:'magie',         icon:'🪄' },
  { id:'pointe',        icon:'🏃' },
  { id:'esquive',       icon:'🛡' },
  { id:'soutien',       icon:'🤝' },
  { id:'observation',   icon:'🔍' },
  { id:'furtivite',     icon:'👁' },
  { id:'intention',     icon:'⏳' },
  { id:'desengagement', icon:'💨' },
  { id:'utilisation',   icon:'🔧' },
  { id:'etude',         icon:'📖' },
  { id:'influence',     icon:'💬' },
];

export const MOVEMENT_RULES = [
  {
    icon:'📏', title:'Vitesse de déplacement',
    html:"Vous pouvez vous déplacer d'une distance inférieure ou égale à votre Vitesse par tour. La plupart des personnages humanoïdes ont 9 m de Vitesse.",
    note:"Vous n'êtes jamais obligé de la parcourir en entier.",
  },
  {
    icon:'✂', title:'Diviser son mouvement',
    html:"Vous pouvez découper votre déplacement avant et après votre action, dans l'ordre de votre choix.",
    example:'Ex : avancer de 4,5 m → attaquer → reculer de 4,5 m',
  },
  {
    icon:'🏔', title:'Terrain difficile', variant:'warning',
    html:"Chaque mètre parcouru en Terrain difficile (décombres, sous-bois dense, neige épaisse…) coûte un mètre supplémentaire de déplacement.",
    note:'Avec 9 m de Vitesse, vous ne parcourez que 4,5 m en terrain difficile.',
  },
  {
    icon:'😓', title:'Se relever (À terre)', variant:'danger',
    html:"Se relever depuis l'état À terre coûte la moitié de votre Vitesse, arrondie à l'inférieur — impossible si votre Vitesse est de 0.",
    note:'Avec 9 m de Vitesse, se relever coûte 4,5 m.',
  },
  {
    icon:'👥', title:'Franchir les autres créatures',
    html:"Vous pouvez traverser l'espace occupé par un allié, ou par une créature d'au moins deux catégories de taille au-dessus ou en-dessous de la vôtre. Vous ne pouvez jamais vous arrêter dans un espace déjà occupé.",
  },
  {
    icon:'🕳', title:'Chute', variant:'danger',
    html:"Une chute inflige 1d6 dégâts contondants par tranche de 3 m parcourus (maximum 20d6), et la créature termine sa chute À terre, sauf circonstance qui l'en empêche.",
  },
  {
    icon:'🕯', title:'Vision et lumière',
    html:"En Lumière faible, une créature bénéficie d'un couvert visuel léger contre les attaques à distance. Dans les Ténèbres ou en Visibilité nulle, une créature sans Vision dans le noir ou Vision aveugle y est pratiquement Aveuglée.",
  },
];

export const SIZE_TABLE = [
  { taille:'Minuscule', exemples:'Fée, familier, rat', espace:'0,75 m × 0,75 m' },
  { taille:'Petite / Moyenne', exemples:'Gobelin, Halfelin, Humain, Elfe, Nain', espace:'1,5 m × 1,5 m' },
  { taille:'Grande', exemples:'Cheval, Ours, Ogre', espace:'3 m × 3 m' },
  { taille:'Très Grande', exemples:'Géant des collines', espace:'4,5 m × 4,5 m' },
  { taille:'Gigantesque', exemples:'Tarrasque', espace:'6 m × 6 m ou plus' },
];
export const SIZE_TABLE_NOTE = "Depuis les règles 2024, les créatures de taille Petite et Moyenne occupent exactement le même espace au combat.";

export const ATTACK_FORMULA = {
  parts: [
    { key:'dice', label:'d20' },
    { key:'stat', label:'Mod. Force', sub:'(ou Dex à distance / finesse)' },
    { key:'prof', label:'Bonus de<br>Maîtrise' },
    { key:'target', label:'CA<br>de la cible', op:'≥' },
    { key:'hit', label:'TOUCHÉ', op:'=' },
  ],
};

export const CRIT_RULES = [
  {
    icon:'⭐', title:'Coup critique — 20 naturel', variant:'special',
    html:"Un 20 naturel au d20 est toujours une réussite automatique. Lancez deux fois le nombre de dés de dégâts de l'attaque — les modificateurs ne sont ajoutés qu'une fois.",
    example:'Ex : Dague 1d4+3 → critique = 2d4+3',
  },
  {
    icon:'💀', title:'Échec automatique — 1 naturel', variant:'danger',
    html:"Un 1 naturel au d20 est toujours un échec, quelle que soit la Classe d'armure de la cible.",
  },
];

export const ADV_CASES = [
  "La cible est À terre et vous l'attaquez à moins de 1,50 m",
  "La cible est Aveuglée, Étourdie, Paralysée, Pétrifiée ou Inconsciente",
  "Vous êtes Invisible pour la cible, qui ne peut pas vous voir",
  "Un allié a utilisé l'action Soutien pour vous donner l'Avantage contre cette cible",
];
export const DISADV_CASES = [
  "La cible est Invisible pour vous, ou vous ne la voyez pas",
  "Vous avez l'état À terre, ou l'état Empoisonné",
  "Attaque à distance alors qu'un ennemi hostile se trouve à moins de 1,50 m de vous",
  "La cible est hors de la portée normale d'une arme à distance, mais dans sa portée longue",
];

export const DAMAGE_TYPE_RULES = [
  { icon:'🗡', title:'Résistance', variant:'green', html:'Dégâts divisés par deux (arrondi à l\'inférieur) pour ce type de dégâts.' },
  { icon:'💥', title:'Vulnérabilité', variant:'danger', html:'Dégâts doublés pour ce type de dégâts.' },
  { icon:'✋', title:'Immunité', variant:'steel', html:'Les dégâts de ce type sont entièrement annulés.' },
];
export const DAMAGE_TYPE_NOTE = "Résistance, Vulnérabilité et Immunité s'appliquent après le calcul complet des dégâts, jamais avant ; elles ne se cumulent pas entre elles pour un même type.";

export const UNARMED_NOTE = "Une attaque à mains nues inflige 1 dégât contondant plus le modificateur de Force ; une arme improvisée inflige 1d4 dégâts du type le plus approprié.";

// ── Action Bonus & Réaction ──────────────────────────────────────────────
export const BONUS_ACTION_INFO = {
  rule: "Vous ne pouvez utiliser une Action Bonus que si une capacité, un sort ou une règle vous en accorde une explicitement. Sans une telle source, vous n'en avez tout simplement pas.",
  examples: [
    { tag:'Barbare', color:'crimson', text:'Rage — activation en Action Bonus (résistance aux dégâts, bonus aux dégâts de Force).' },
    { tag:'Roublard', color:'slate', text:'Ruse (niv. 2) — Pointe, Désengagement ou Furtivité en Action Bonus.' },
    { tag:'Paladin', color:'gold', text:'Châtiments (ex. Châtiment divin) — lancés en Action Bonus juste après avoir touché au corps à corps.' },
    { tag:'Deux armes', color:'steel', text:"Attaquer avec une seconde arme légère tenue dans l'autre main." },
    { tag:'Sorts', color:'purple', text:"De nombreux sorts précisent un temps d'incantation en Action Bonus — vérifiez toujours leur description." },
  ],
};
export const REACTION_INFO = {
  rule: "Se recharge au début de votre propre tour. Une réaction peut être utilisée à tout moment du round — pendant votre tour ou celui d'un autre — mais une seule à la fois.",
  examples: [
    { tag:"Attaque d'Opportunité", color:'crimson', text:"Une créature hostile visible quitte votre portée (1,50 m) : vous pouvez l'attaquer au corps à corps." },
    { tag:'Bouclier', color:'purple', text:"Sort : +5 CA jusqu'au début de votre prochain tour, lancé quand vous êtes touché par un jet d'attaque." },
    { tag:'Intention', color:'gold', text:"Déclenchez l'action ou le sort que vous aviez préparés avec l'action Intention." },
  ],
};

// Intention (« Se tenir prêt ») — schéma de décision.
export const READY_TREE = {
  setup: "Pendant votre tour, l'action Intention : vous définissez un déclencheur perceptible et l'action que vous entreprendrez (ou un déplacement n'excédant pas votre Vitesse).",
  example: "« Si un ennemi franchit cette porte, je l'attaque. »",
  branches: [
    { cond:'Le déclencheur se produit', result:'good', text:'Vous utilisez votre Réaction pour agir immédiatement.' },
    { cond:'Le déclencheur ne se produit pas', result:'neutral', text:"Rien ne se passe ; votre Réaction reste disponible." },
  ],
  note: "Préparer un sort de cette façon nécessite de maintenir la Concentration jusqu'à ce que vous le déclenchiez.",
};

export const COVER_LEVELS = [
  { icon:'🧱', level:'Couvert partiel', variant:'half', desc:"Un obstacle bloque au moins la moitié du corps de la cible — pilier, tronc fin, autre créature.", bonus:'+2', bonusLabel:'CA & jets de sauvegarde de Dextérité' },
  { icon:'🏰', level:'Couvert des trois quarts', variant:'three-quarter', desc:"Un obstacle masque environ les trois quarts du corps — mur bas, meurtrière étroite.", bonus:'+5', bonusLabel:'CA & jets de sauvegarde de Dextérité' },
  { icon:'🚫', level:'Couvert total', variant:'full', desc:'La cible est entièrement dissimulée par un obstacle plein.', bonus:'🚫', bonusLabel:'Ne peut pas être ciblée directement' },
];
export const COVER_NOTE = "Seul le meilleur couvert disponible sur la ligne de tir s'applique — les sources ne se cumulent jamais entre elles.";

// ── Règles spéciales (accordéon) ─────────────────────────────────────────
export const SPECIAL_RULES = [
  {
    icon:'🗡🗡', title:'Combat à deux armes', open:true,
    html:`<p>Lorsque vous attaquez avec une arme légère tenue dans une main, vous pouvez utiliser une Action Bonus pour attaquer avec une seconde arme légère tenue dans l'autre main.</p>
      <p><strong>N'ajoutez pas</strong> votre modificateur de caractéristique aux dégâts de cette attaque bonus, sauf s'il est négatif.</p>`,
    example: 'Ex : Dague (1d4+3 en action) puis Dague (1d4 en bonus, sans le +3)',
  },
  {
    icon:'👊', title:"Attaque d'Opportunité",
    html:`<p>Lorsqu'une créature hostile que vous pouvez voir quitte votre zone d'allonge (par un déplacement, une Action Bonus ou une Réaction), vous pouvez dépenser votre Réaction pour effectuer une attaque de corps à corps contre elle, juste avant qu'elle ne quitte cette zone.</p>`,
    note: "Pas d'Attaque d'Opportunité si la créature utilise l'action Désengagement avant de se déplacer.",
  },
  {
    icon:'💪', title:'Agripper (Lutte)',
    html:`<p>En remplacement d'une de vos attaques (à main libre), vous tentez d'agripper une créature d'au plus une catégorie de taille au-dessus de la vôtre.</p>
      <p>La cible effectue un jet de sauvegarde de Force ou de Dextérité (son choix), DD = 8 + votre modificateur de Force + votre Bonus de maîtrise.</p>`,
    branches: [
      { cond:'Échec de la cible', result:'good', text:"Elle reçoit l'état Agrippé (sa Vitesse tombe à 0)." },
      { cond:'Réussite de la cible', result:'neutral', text:"Rien ne se passe." },
    ],
    note: "Pour s'en libérer, la cible peut utiliser son action pour réussir un jet de Force (Athlétisme) ou de Dextérité (Acrobaties) contre ce même DD.",
  },
  {
    icon:'🤜', title:'Bousculer',
    html:`<p>En remplacement d'une de vos attaques (à main libre), vous tentez de repousser ou de faire tomber une créature d'au plus une catégorie de taille au-dessus de la vôtre.</p>
      <p>La cible effectue un jet de sauvegarde de Force ou de Dextérité (son choix), DD = 8 + votre modificateur de Force + votre Bonus de maîtrise.</p>`,
    branches: [
      { cond:'Échec de la cible', result:'good', text:"Vous la poussez de 1,50 m, ou elle reçoit l'état À terre (votre choix)." },
      { cond:'Réussite de la cible', result:'neutral', text:"Rien ne se passe." },
    ],
  },
  {
    icon:'💤', title:'Repos court et Repos long',
    html:`<p>Un <strong>Repos court</strong> dure au moins 1 heure ; il permet de dépenser des Dés de vie pour récupérer des points de vie et de retrouver certaines capacités limitées.</p>
      <p>Un <strong>Repos long</strong> dure au moins 8 heures ; il restaure tous les points de vie, la moitié des Dés de vie dépensés, et la plupart des ressources limitées par jour.</p>`,
  },
];

// ── PV & Mort ─────────────────────────────────────────────────────────────
export const DEATH_SAVE_RESULTS = [
  { icon:'✔', variant:'good', title:'10 ou plus', text:'Succès', note:'3 succès → Stabilisé' },
  { icon:'✗', variant:'bad', title:'9 ou moins', text:'Échec', note:'3 échecs → Mort' },
  { icon:'⭐', variant:'crit', title:'20 naturel', text:'Revenir à 1 PV — reprend conscience immédiatement' },
  { icon:'💀', variant:'worst', title:'1 naturel', text:'2 échecs d\'un coup' },
];

export const STABILIZATION_RULES = [
  "Un allié peut vous stabiliser en réussissant un jet de Sagesse (Médecine) DD 10 à votre contact.",
  "Recevoir des soins (sort, potion) vous fait aussitôt reprendre conscience avec les points de vie regagnés.",
  "Stabilisé, vous n'effectuez plus de jets de sauvegarde contre la mort — vous restez Inconscient à 0 PV, et reprenez 1 PV et conscience après 1d4 heures.",
  "Subir des dégâts à 0 PV inflige un nouvel échec automatique (deux en cas de coup critique) — y compris si vous étiez Stabilisé.",
];

export const INSTANT_DEATH_TEXT = "Si vous tombez à 0 PV et que les dégâts excédentaires égalent ou dépassent votre maximum de points de vie, vous mourez instantanément, sans jet de sauvegarde.";

// États les plus fréquents en combat — texte complet tiré du glossaire (data/glossaire.json).
export const COMBAT_CONDITIONS = [
  { id:'a-terre', icon:'😓' },
  { id:'inconscient', icon:'😵' },
  { id:'agrippe', icon:'⛓' },
  { id:'effraye', icon:'😱' },
  { id:'charme', icon:'🫀' },
  { id:'empoisonne', icon:'🤢' },
  { id:'paralyse', icon:'🧊' },
  { id:'etourdi', icon:'💫' },
];
