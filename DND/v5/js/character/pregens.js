// Personnages prêts à jouer (Mode Découverte) : niveau 1, entièrement définis d'avance
// pour un joueur qui ne veut pas passer par l'assistant de création. La construction du
// personnage final réutilise exactement la même logique que la finalisation de l'assistant
// (js/character/wizard.js -> finish()) pour rester fidèle aux données officielles : mêmes
// parseurs (js/class-traits.js), mêmes règles de bonus d'historique (js/character/rules.js).

import { DATA } from '../data.js';
import { ABILITIES } from './rules.js';
import { parseClassTraits, parseStartingEquipmentChoices } from '../class-traits.js';
import { createCharacterShell } from './storage.js';

export const PREGEN_DEFS = [
  {
    id:'kael', emoji:'🛡️', title:'Kael, le Rempart',
    species:'Humain', className:'Guerrier', background:'Soldat',
    classEquipChoice:'A', backgroundEquipChoice:'A',
    preferredSkills:['Athlétisme','Intimidation'],
    abilityBase:{ force:15, constitution:14, dexterite:13, sagesse:12, charisme:10, intelligence:8 },
    abilityBonus:{ mode:'2-1', plus2:'Force', plus1:'Constitution' },
    languages:['Commun','Orc'],
    profile:{ appearance:"Grand, épaules larges, cicatrices sous une cotte de mailles bien entretenue.", backstory:"Vétéran d'une garnison frontalière, il a appris à encaisser les coups pour protéger les autres." },
    tags:['melee','tank','simple','protecteur'],
    pitch:"Un mur de bouclier increvable, simple à jouer : chargez, tapez, protégez vos alliés.",
    playTips:[
      "À votre tour : avancez, cognez avec votre action Attaque, gardez le reste de vos déplacements pour vous replacer.",
      "Placez-vous entre les ennemis et vos alliés fragiles — vos gros points de vie sont faits pour ça.",
      "Pas de sort à gérer : concentrez-vous sur qui attaquer et où vous déplacer.",
    ],
  },
  {
    id:'vess', emoji:'🗡️', title:"Vess, l'Ombre",
    species:'Halfelin', className:'Roublard', background:'Criminel',
    classEquipChoice:'A', backgroundEquipChoice:'A',
    preferredSkills:['Discrétion','Escamotage','Tromperie','Perception'],
    abilityBase:{ dexterite:15, constitution:14, charisme:13, intelligence:12, sagesse:10, force:8 },
    abilityBonus:{ mode:'2-1', plus2:'Dextérité', plus1:'Constitution' },
    languages:['Commun','Voleur'],
    profile:{ appearance:"Petite silhouette vive, capuche rabattue, toujours un sourire en coin.", backstory:"Ancienne pickpocket des bas-quartiers, elle a rejoint l'aventure pour un nouveau départ — ou un gros coup." },
    tags:['stealth','skill','malin','simple'],
    pitch:"Rapide, discrète, doué pour se sortir des embrouilles : frappez fort par surprise puis disparaissez.",
    playTips:[
      "Restez cachée avant d'attaquer : toucher une cible qui ne vous voit pas déclenche l'Attaque sournoise (gros dégâts bonus).",
      "Hors combat, utilisez vos compétences (Discrétion, Escamotage) pour explorer et éviter les ennuis plutôt que les affronter.",
      "Si le combat tourne mal, désengagez-vous plutôt que d'insister — votre force est la surprise, pas l'encaissement.",
    ],
  },
  {
    id:'lyra', emoji:'📖', title:"Lyra, l'Érudite",
    species:'Elfe', className:'Magicien', background:'Sage',
    classEquipChoice:'A', backgroundEquipChoice:'A',
    preferredSkills:['Arcanes','Investigation'],
    abilityBase:{ intelligence:15, constitution:14, sagesse:13, dexterite:12, charisme:10, force:8 },
    abilityBonus:{ mode:'2-1', plus2:'Intelligence', plus1:'Constitution' },
    languages:['Commun','Elfique'],
    profile:{ appearance:"Longs cheveux argentés, toujours un grimoire à portée de main.", backstory:"Formée dans une tour de mages isolée, elle part sur les routes pour tester en pratique ce qu'elle n'a lu qu'en théorie." },
    tags:['caster','arcane','tactique'],
    pitch:"Une bibliothèque de sorts à portée de main : préparez vos sorts avant l'aventure et adaptez-vous à tout.",
    playTips:[
      "Avant de vous reposer, choisissez (« préparez ») les sorts que vous pensez utiles pour la suite — vous pourrez les changer au prochain repos long.",
      "Gardez vos sorts les plus puissants pour les moments difficiles : vos emplacements de sorts sont limités par repos long.",
      "À distance, un sort d'attaque simple (comme un projectile magique) est votre solution la plus fiable à chaque tour.",
    ],
  },
  {
    id:'bram', emoji:'⚕️', title:'Bram, le Gardien',
    species:'Nain', className:'Clerc', background:'Acolyte',
    classEquipChoice:'A', backgroundEquipChoice:'A',
    preferredSkills:['Médecine','Religion'],
    abilityBase:{ sagesse:15, constitution:14, force:13, charisme:12, dexterite:10, intelligence:8 },
    abilityBonus:{ mode:'2-1', plus2:'Sagesse', plus1:'Charisme' },
    languages:['Commun','Nain'],
    profile:{ appearance:"Trapu, barbe tressée, un symbole sacré toujours visible sur la poitrine.", backstory:"Ancien gardien d'un temple de montagne, envoyé porter la foi de son dieu hors des sanctuaires." },
    tags:['healer','support','simple'],
    pitch:"Le pilier de soin du groupe : gardez vos alliés en vie et frappez avec la faveur des dieux.",
    playTips:[
      "Gardez toujours un sort de soin en réserve pour un allié à terre — c'est souvent plus utile qu'attaquer.",
      "Votre masse d'armes et votre armure vous permettent aussi de tenir au corps-à-corps si besoin, sans y être obligé.",
      "Votre Conduit divin peut être utilisé sans dépenser de sort — pensez-y avant de vous reposer.",
    ],
  },
  {
    id:'grosh', emoji:'🪓', title:'Grosh, la Tempête',
    species:'Orc', className:'Barbare', background:'Fermier',
    classEquipChoice:'A', backgroundEquipChoice:'A',
    preferredSkills:['Athlétisme','Intuition'],
    abilityBase:{ force:15, constitution:14, sagesse:13, dexterite:12, charisme:10, intelligence:8 },
    abilityBonus:{ mode:'2-1', plus2:'Force', plus1:'Constitution' },
    languages:['Commun','Orc'],
    profile:{ appearance:"Massif, tatouages claniques, une hache à deux mains toujours sur le dos.", backstory:"A quitté les champs de sa famille pour prouver, loin des siens, que sa force sert à protéger." },
    tags:['melee','berserker','simple','degats'],
    pitch:"Rage, muscles, et grosse hache : le plus simple et le plus direct de tous les combattants.",
    playTips:[
      "Entrez en Rage avant de foncer au contact : vous encaissez moins de dégâts et en infligez plus.",
      "Pas de sort, pas de choix compliqué : approchez-vous et attaquez, c'est tout ce qu'il faut retenir.",
      "Votre haute Constitution vous donne beaucoup de points de vie — n'hésitez pas à être en première ligne.",
    ],
  },
  {
    id:'sylas', emoji:'🏹', title:'Sylas, le Traqueur',
    species:'Tieffelin', className:'Rodeur', background:'Guide',
    classEquipChoice:'A', backgroundEquipChoice:'A',
    preferredSkills:['Survie','Perception','Discrétion'],
    abilityBase:{ dexterite:15, sagesse:14, constitution:13, force:12, charisme:10, intelligence:8 },
    abilityBonus:{ mode:'2-1', plus2:'Dextérité', plus1:'Sagesse' },
    languages:['Commun','Sylvestre'],
    profile:{ appearance:"Silhouette souple, yeux fendus hérités de son ascendance, arc toujours bandé.", backstory:"Rejeté pour son ascendance infernale, il a trouvé refuge et sens dans les forêts sauvages." },
    tags:['ranged','nature','explorateur','polyvalent'],
    pitch:"Arc en main, à l'aise en pleine nature : suivez les traces, tirez de loin, un peu de magie en renfort.",
    playTips:[
      "Gardez vos distances et tirez à l'arc long — reculez d'un pas avant de tirer si un ennemi approche.",
      "Utilisez vos compétences (Survie, Perception) pour repérer les dangers avant qu'ils ne vous repèrent.",
      "Vos quelques sorts sont un bonus : pas besoin de les maîtriser à fond dès la première partie.",
    ],
  },
];

/** Reproduit js/character/wizard.js -> finish() pour une définition de pregen, sans rien
 * persister (l'appelant décide s'il sauvegarde via saveCharacter()). */
export function buildPregenCharacter(def, customName){
  const species = DATA.species.find(s => s.espece === def.species);
  const classObj = DATA.classes.find(c => c.classe_title === def.className);
  const histo = DATA.historiques.find(h => h.nom === def.background);
  const traits = parseClassTraits(classObj.html_traits_table);
  const equipOptions = parseStartingEquipmentChoices(classObj.html_traits_table);
  const classEquip = equipOptions.find(o => o.label === def.classEquipChoice) || equipOptions[0] || { items:[], gold:0 };
  const histoEquip = def.backgroundEquipChoice === 'B' ? histo._equipB : histo._equipA;

  const finalAbilities = {};
  for(const a of ABILITIES){
    const base = def.abilityBase[a.key] || 10;
    let bonus = 0;
    const bc = def.abilityBonus;
    if(bc?.mode === '1-1-1') bonus = histo.valeurs_caracteristique.includes(a.label) ? 1 : 0;
    else if(bc?.plus2 === a.label) bonus = 2;
    else if(bc?.plus1 === a.label) bonus = 1;
    finalAbilities[a.key] = base + bonus;
  }
  const conMod = Math.floor((finalAbilities.constitution - 10) / 2);
  const maxHp = Math.max(1, traits.deVieFaces + conMod);

  const count = traits.competences.count;
  const opts = traits.competences.options;
  let classSkills = (def.preferredSkills || []).filter(s => opts.includes(s));
  for(const s of opts){
    if(classSkills.length >= count) break;
    if(!classSkills.includes(s)) classSkills.push(s);
  }
  classSkills = classSkills.slice(0, count);

  const draft = createCharacterShell();
  Object.assign(draft, {
    profile:{ ...draft.profile, name: (customName || def.title).trim() || def.title, appearance: def.profile.appearance, backstory: def.profile.backstory },
    species: species.espece,
    speciesChoiceSubrace: null,
    className: classObj.classe_title,
    subclass: null,
    level: 1,
    classSkills,
    classEquipmentChoice: def.classEquipChoice,
    background: histo.nom,
    backgroundEquipmentChoice: def.backgroundEquipChoice,
    abilities: finalAbilities,
    abilityBonusChoice: def.abilityBonus,
    languages: [...def.languages],
    inventory: [...classEquip.items, ...histoEquip.items].map(it => ({ name: it.name, qty: it.qty })),
    gold:{ pp:0, po:(classEquip.gold||0) + (histoEquip.gold||0), pe:0, pa:0, pc:0 },
    hp:{ max:maxHp, current:maxHp, temp:0 },
    savingThrows: traits.sauvegardes,
    complete: true,
    step: 5,
  });
  return draft;
}
