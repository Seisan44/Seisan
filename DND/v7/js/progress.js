// Progression du débutant : chapitres de la Voie de l'Aventurier + jalons de jeu,
// persistés en local. Alimente les pastilles de la nav et le bandeau d'accueil.

import { storeGet, storeSet, qsa } from './utils.js';

const KEY = 'grimoire.progress';

export const MILESTONES = [
  { id: 'premier-jet', label: 'Premier jet de dés', icon: '🎲' },
  { id: 'personnage-cree', label: 'Personnage créé', icon: '🛡️' },
  { id: 'ecran-consulte', label: 'Écran du joueur consulté', icon: '📜' },
];

function load(){
  return storeGet(KEY, { chapters: {}, milestones: {} });
}
function save(p){
  storeSet(KEY, p);
  document.dispatchEvent(new CustomEvent('grimoire:progress'));
  refreshBadges();
}

export function isChapterDone(id){
  return !!load().chapters[id];
}
export function setChapterDone(id, done = true){
  const p = load();
  if(done) p.chapters[id] = Date.now();
  else delete p.chapters[id];
  save(p);
}
export function chaptersDone(){
  return Object.keys(load().chapters);
}
export function resetChapters(){
  const p = load();
  p.chapters = {};
  save(p);
}

export function hasMilestone(id){
  return !!load().milestones[id];
}
export function grantMilestone(id){
  const p = load();
  if(p.milestones[id]) return false;
  p.milestones[id] = Date.now();
  save(p);
  return true;
}
export function milestonesDone(){
  return Object.keys(load().milestones);
}

export function progressSummary(totalChapters){
  const p = load();
  return {
    chapters: Object.keys(p.chapters).length,
    totalChapters,
    milestones: MILESTONES.filter(m => p.milestones[m.id]),
  };
}

// Pastille "progression" sur l'entrée de nav de la Voie.
export function refreshBadges(){
  const done = chaptersDone().length;
  qsa('[data-progress-badge]').forEach(node => {
    node.textContent = done > 0 ? String(done) : '';
    node.classList.toggle('is-visible', done > 0);
  });
}

// Jalon automatique : premier jet de dés.
document.addEventListener('grimoire:roll', () => {
  grantMilestone('premier-jet');
});
