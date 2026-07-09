// Personnages prêts à jouer (Mode découverte) : six héros de niveau 1 entièrement
// définis, pour jouer tout de suite sans passer par l'assistant. La construction
// réutilise exactement la même logique que la finalisation de l'assistant
// (wizard.js → finish()) : mêmes parseurs, mêmes règles de bonus d'historique,
// sorts pris dans les recommandations (recommendations.js).

import { DATA } from '../data.js';
import { abilityMod } from '../utils.js';
import { parseClassTraits, parseStartingEquipmentChoices, parseSpellcastingTable } from '../class-traits.js';
import { ABILITIES } from './rules.js';
import { parseBackgroundEquipment } from './wizard.js';
import { sortRecommendedFirst } from './recommendations.js';

export const PREGEN_DEFS = [
  {
    id: 'kael', emoji: '🛡️', name: 'Kael', title: 'Kael, le Rempart',
    species: 'humain', subspecies: null, classSlug: 'guerrier', background: 'soldat',
    abilityBase: { force: 15, constitution: 14, dexterite: 13, sagesse: 12, charisme: 10, intelligence: 8 },
    bonusPlus2: 'Force', bonusPlus1: 'Constitution',
    skills: ['Perception', 'Acrobaties'],
    appearance: 'Grand, épaules larges, cicatrices assumées sous une cotte de mailles bien entretenue.',
    backstory: 'Vétéran d\'une garnison frontalière, il a appris à encaisser les coups pour protéger les autres.',
    pitch: 'Un mur increvable, simple à jouer : avance, cogne, protège tes alliés.',
    tags: ['melee', 'tank', 'simple', 'protecteur'],
    playTips: [
      'À ton tour : avance, frappe avec ton action Attaque, garde le reste du déplacement pour te replacer.',
      'Place-toi entre les ennemis et tes alliés fragiles — tes gros points de vie sont faits pour ça.',
      'Pas de sort à gérer : concentre-toi sur qui attaquer et où te déplacer.',
    ],
  },
  {
    id: 'vess', emoji: '🗡️', name: 'Vess', title: 'Vess, l\'Ombre',
    species: 'halfelin', subspecies: null, classSlug: 'roublard', background: 'criminel',
    abilityBase: { dexterite: 15, constitution: 14, charisme: 13, intelligence: 12, sagesse: 10, force: 8 },
    bonusPlus2: 'Dextérité', bonusPlus1: 'Constitution',
    skills: ['Perception', 'Acrobaties', 'Tromperie', 'Persuasion'],
    appearance: 'Petite silhouette vive, capuche rabattue, toujours un sourire en coin.',
    backstory: 'Ancienne pickpocket des bas-quartiers, elle a rejoint l\'aventure pour un nouveau départ — ou un gros coup.',
    pitch: 'Rapide, discrète, douée pour tout : frappe fort par surprise, puis disparais.',
    tags: ['stealth', 'skill', 'malin', 'simple'],
    playTips: [
      'Reste cachée avant d\'attaquer : toucher une cible qui ne te voit pas déclenche l\'Attaque sournoise (gros dégâts).',
      'Hors combat, tes compétences (Discrétion, Escamotage) évitent bien des ennuis — utilise-les !',
      'Si le combat tourne mal, désengage-toi plutôt que d\'insister : ta force, c\'est la surprise.',
    ],
  },
  {
    id: 'lyra', emoji: '📖', name: 'Lyra', title: 'Lyra, l\'Érudite',
    species: 'elfe', subspecies: 'Hauts-elfes', classSlug: 'magicien', background: 'sage',
    abilityBase: { intelligence: 15, constitution: 14, sagesse: 13, dexterite: 12, charisme: 10, force: 8 },
    bonusPlus2: 'Intelligence', bonusPlus1: 'Constitution',
    skills: ['Investigation', 'Intuition'],
    appearance: 'Longs cheveux argentés, toujours un grimoire à portée de main.',
    backstory: 'Formée dans une tour de mages isolée, elle part sur les routes tester en pratique ce qu\'elle n\'a lu qu\'en théorie.',
    pitch: 'Une bibliothèque de sorts ambulante : prépare tes sorts et adapte-toi à tout.',
    tags: ['caster', 'arcane', 'tactique'],
    playTips: [
      'À distance, un sort d\'attaque simple (Trait de feu) est ta solution fiable à chaque tour.',
      'Garde tes emplacements de sorts pour les moments difficiles : ils reviennent au repos long.',
      'Le sort Bouclier se lance en Réaction quand on te touche — ta meilleure assurance-vie.',
    ],
  },
  {
    id: 'bram', emoji: '⚕️', name: 'Bram', title: 'Bram, le Gardien',
    species: 'nain', subspecies: null, classSlug: 'clerc', background: 'acolyte',
    abilityBase: { sagesse: 15, constitution: 14, force: 13, charisme: 12, dexterite: 10, intelligence: 8 },
    bonusPlus2: 'Sagesse', bonusPlus1: 'Charisme',
    skills: ['Médecine', 'Persuasion'],
    appearance: 'Trapu, barbe tressée, un symbole sacré toujours visible sur la poitrine.',
    backstory: 'Ancien gardien d\'un temple de montagne, envoyé porter la foi de son dieu hors des sanctuaires.',
    pitch: 'Le pilier du groupe : soigne tes alliés et frappe avec la faveur des dieux.',
    tags: ['healer', 'support', 'simple'],
    playTips: [
      'Garde toujours un sort de soin en réserve pour un allié à terre — souvent plus utile qu\'attaquer.',
      'Ton armure et ta masse te permettent de tenir au corps à corps sans crainte.',
      'Mot de guérison se lance en action bonus : tu peux soigner ET attaquer au même tour.',
    ],
  },
  {
    id: 'grosh', emoji: '🪓', name: 'Grosh', title: 'Grosh, la Tempête',
    species: 'orc', subspecies: null, classSlug: 'barbare', background: 'fermier',
    abilityBase: { force: 15, constitution: 14, sagesse: 13, dexterite: 12, charisme: 10, intelligence: 8 },
    bonusPlus2: 'Force', bonusPlus1: 'Constitution',
    skills: ['Athlétisme', 'Perception'],
    appearance: 'Massif, tatouages claniques, une hache à deux mains toujours sur le dos.',
    backstory: 'A quitté les champs de sa famille pour prouver, loin des siens, que sa force sert à protéger.',
    pitch: 'Rage, muscles et grosse hache : le plus direct de tous les combattants.',
    tags: ['melee', 'berserker', 'simple', 'degats'],
    playTips: [
      'Entre en Rage (action bonus !) avant de foncer : tu encaisses moitié moins et frappes plus fort.',
      'Pas de choix compliqué : approche-toi et attaque, c\'est tout ce qu\'il faut retenir.',
      'Ta montagne de points de vie est faite pour la première ligne — fonce.',
    ],
  },
  {
    id: 'sylas', emoji: '🏹', name: 'Sylas', title: 'Sylas, le Traqueur',
    species: 'tieffelin', subspecies: 'Infernal', classSlug: 'rodeur', background: 'guide',
    abilityBase: { dexterite: 15, sagesse: 14, constitution: 13, force: 12, charisme: 10, intelligence: 8 },
    bonusPlus2: 'Dextérité', bonusPlus1: 'Sagesse',
    skills: ['Perception', 'Nature', 'Athlétisme'],
    appearance: 'Silhouette souple, yeux fendus hérités de son ascendance, arc toujours bandé.',
    backstory: 'Rejeté pour son ascendance infernale, il a trouvé refuge et sens dans les forêts sauvages.',
    pitch: 'Arc en main, à l\'aise partout : piste, tire de loin, avec un soupçon de magie.',
    tags: ['ranged', 'nature', 'explorateur', 'polyvalent'],
    playTips: [
      'Garde tes distances et tire à l\'arc — recule d\'un pas avant de tirer si un ennemi approche.',
      'Marque du chasseur (action bonus) ajoute des dégâts à chaque flèche sur ta cible.',
      'Tes compétences (Survie, Perception) repèrent les dangers avant qu\'ils ne te repèrent.',
    ],
  },
];

/* ------------------------------- Quiz découverte -------------------------------
   4 questions fermées : chaque réponse porte des tags recoupant ceux des pregens.
   Le score est un simple comptage de tags en commun. */

export const QUIZ_QUESTIONS = [
  {
    question: 'Au combat, tu préfères plutôt…',
    answers: [
      { label: 'Foncer au contact et encaisser les coups', tags: ['melee', 'tank', 'protecteur'] },
      { label: 'Rester à distance et tirer avant qu\'on me touche', tags: ['ranged', 'nature', 'explorateur'] },
      { label: 'Agir dans l\'ombre et frapper une seule fois, fort', tags: ['stealth', 'skill', 'malin'] },
      { label: 'Soutenir mes alliés et les soigner', tags: ['healer', 'support'] },
    ],
  },
  {
    question: 'Ce qui te fait le plus envie…',
    answers: [
      { label: 'Lancer des sorts spectaculaires', tags: ['caster', 'arcane', 'tactique'] },
      { label: 'Être le plus fort possible physiquement', tags: ['melee', 'berserker', 'degats'] },
      { label: 'Résoudre les problèmes avec ruse et discrétion', tags: ['skill', 'malin', 'stealth'] },
      { label: 'Explorer la nature et suivre des traces', tags: ['nature', 'explorateur', 'ranged'] },
    ],
  },
  {
    question: 'Ton style de personnage préféré…',
    answers: [
      { label: 'Un protecteur loyal et robuste', tags: ['tank', 'protecteur', 'simple'] },
      { label: 'Un érudit qui maîtrise la magie', tags: ['caster', 'arcane', 'tactique'] },
      { label: 'Un vagabond insaisissable', tags: ['stealth', 'malin', 'skill'] },
      { label: 'Un gardien pieux au service d\'une cause', tags: ['healer', 'support', 'simple'] },
    ],
  },
  {
    question: 'Pour ta première partie, tu préfères…',
    answers: [
      { label: 'Le plus simple possible (peu de choses à gérer)', tags: ['simple'] },
      { label: 'Un peu de tactique (des options au combat)', tags: ['tactique', 'degats'] },
      { label: 'De la magie à apprendre au fil du temps', tags: ['caster'] },
      { label: 'Un mélange équilibré de tout', tags: ['polyvalent'] },
    ],
  },
];

/** answersTags : un tableau de tags par réponse choisie. Retourne les pregens triés
    du meilleur score au moins bon (score = nombre de tags en commun). */
export function scorePregens(answersTags){
  const picked = answersTags.flat();
  return PREGEN_DEFS
    .map(def => ({ def, score: def.tags.reduce((n, t) => n + (picked.includes(t) ? 1 : 0), 0) }))
    .sort((a, b) => b.score - a.score);
}

/* ------------------------------ Construction ------------------------------ */

/** Sorts de départ d'un pregen lanceur : les recommandés d'abord, complétés
    depuis la liste de classe jusqu'aux quotas du niveau 1 (table officielle). */
function pickSpells(cls){
  const row = parseSpellcastingTable(cls.html_capacites_table)?.[0];
  if(!row) return { cantrips: [], spells: [] };
  const pool = DATA.getSpellsForClass(cls.classe_title);
  const pick = (lvl, want) =>
    sortRecommendedFirst(cls.classe_title, pool.filter(s => s._niveauNum === lvl))
      .slice(0, Math.max(0, want))
      .map(s => s._slug);
  return { cantrips: pick(0, row.cantrips || 0), spells: pick(1, row.known || 0) };
}

/** Construit le personnage complet d'un pregen (même logique que wizard finish()).
    Ne sauvegarde rien : l'appelant décide (saveCharacter). */
export function buildPregenCharacter(def, customName){
  const cls = DATA.classesBySlug.get(def.classSlug);
  const bg = DATA.historiquesBySlug.get(def.background);
  if(!cls || !bg || !DATA.speciesBySlug.get(def.species)) return null;
  const traits = parseClassTraits(cls.html_traits_table);

  // Caractéristiques : base du pregen + bonus d'historique (+2 / +1).
  const abilities = {};
  for(const a of ABILITIES){
    let v = def.abilityBase[a.key] ?? 10;
    if(def.bonusPlus2 === a.label) v += 2;
    if(def.bonusPlus1 === a.label) v += 1;
    abilities[a.key] = v;
  }

  // Compétences : historique + choix de classe (préférences du pregen, complétées).
  const bgSkills = bg.maitriser_competence || [];
  const options = traits.competences.options.filter(o => !bgSkills.includes(o));
  const count = traits.competences.count;
  const classSkills = (def.skills || []).filter(s => options.includes(s)).slice(0, count);
  for(const o of options){
    if(classSkills.length >= count) break;
    if(!classSkills.includes(o)) classSkills.push(o);
  }

  // Équipement : option A des deux lots, armure / bouclier / armes équipés d'office.
  const inventory = [];
  let gold = 0;
  const classChoice = parseStartingEquipmentChoices(cls.html_traits_table).find(c => c.label === 'A');
  if(classChoice){
    for(const it of classChoice.items) inventory.push({ name: it.name, qty: it.qty, equipped: false });
    gold += classChoice.gold || 0;
  }
  const bgParsed = parseBackgroundEquipment(bg.equipement?.choix_A);
  for(const it of bgParsed.items) inventory.push({ name: it.name, qty: it.qty, equipped: false });
  gold += bgParsed.gold;
  let armorDone = false, shieldDone = false;
  for(const item of inventory){
    const known = DATA.lookupItem(item.name);
    if(!known) continue;
    if(known.kind === 'armure' && /bouclier/i.test(known.categorie) && !shieldDone){ item.equipped = true; shieldDone = true; }
    else if(known.kind === 'armure' && !/bouclier/i.test(known.categorie) && !armorDone){ item.equipped = true; armorDone = true; }
    else if(known.kind === 'arme') item.equipped = true;
  }

  const spellPick = pickSpells(cls);
  const hpMax = Math.max(1, traits.deVieFaces + abilityMod(abilities.constitution));

  return {
    name: (customName || def.name).trim().slice(0, 60) || def.name,
    level: 1,
    species: def.species,
    subspecies: def.subspecies || null,
    classSlug: def.classSlug,
    background: def.background,
    abilities,
    skills: [...bgSkills, ...classSkills],
    inventory,
    gold,
    cantrips: spellPick.cantrips,
    spells: spellPick.spells,
    hp: { max: hpMax, current: hpMax, temp: 0 },
    usedSlots: {},
    usedRes: {},
    hitDiceUsed: 0,
    overrides: {},
    portrait: null,
    description: def.backstory,
    appearance: def.appearance,
    notes: '',
    createdAt: Date.now(),
  };
}
