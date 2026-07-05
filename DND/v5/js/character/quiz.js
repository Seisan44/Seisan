// Quiz rapide (Mode Découverte) : 4 questions fermées dont les réponses portent des tags
// recoupant ceux de js/character/pregens.js. Le score est un simple comptage de tags en
// commun — pas besoin de plus fin pour orienter un joueur vers 1 des 6 personnages.

export const QUIZ_QUESTIONS = [
  {
    question:'Au combat, vous préférez plutôt…',
    answers:[
      { label:'Foncer au contact et encaisser les coups', tags:['melee','tank','protecteur'] },
      { label:"Rester à distance et tirer avant qu'on me touche", tags:['ranged','nature','explorateur'] },
      { label:'Agir dans l’ombre et frapper une seule fois, fort', tags:['stealth','skill','malin'] },
      { label:'Soutenir mes alliés et les soigner', tags:['healer','support'] },
    ],
  },
  {
    question:'Ce qui vous fait le plus envie…',
    answers:[
      { label:'Lancer des sorts spectaculaires', tags:['caster','arcane','tactique'] },
      { label:'Être le plus fort possible physiquement', tags:['melee','berserker','degats'] },
      { label:'Résoudre les problèmes avec ruse et discrétion', tags:['skill','malin','stealth'] },
      { label:'Explorer la nature et suivre des traces', tags:['nature','explorateur','ranged'] },
    ],
  },
  {
    question:'Votre style de personnage préféré…',
    answers:[
      { label:'Un protecteur loyal et robuste', tags:['tank','protecteur','simple'] },
      { label:'Un érudit qui maîtrise la magie', tags:['caster','arcane','tactique'] },
      { label:'Un vagabond insaisissable', tags:['stealth','malin','skill'] },
      { label:'Un gardien pieux au service d’une cause', tags:['healer','support','simple'] },
    ],
  },
  {
    question:'Pour votre première partie, vous préférez…',
    answers:[
      { label:'Le plus simple possible (peu de choix à gérer)', tags:['simple'] },
      { label:'Un peu de tactique (des options au combat)', tags:['tactique','degats'] },
      { label:'De la magie à apprendre au fil du temps', tags:['caster'] },
      { label:'Un mélange équilibré de tout', tags:['polyvalent'] },
    ],
  },
];

/** answersTags : tableau de tableaux de tags (un par réponse choisie). Retourne les
 * PREGEN_DEFS triés du meilleur score au moins bon (score = nb de tags en commun). */
export function scorePregens(answersTags, pregenDefs){
  const picked = answersTags.flat();
  const scored = pregenDefs.map(def => {
    const score = def.tags.reduce((n, t) => n + (picked.includes(t) ? 1 : 0), 0);
    return { def, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored;
}
