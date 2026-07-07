// Mode Découverte (Débutant) : un simple drapeau persistant, reflété par l'attribut
// data-beginner sur <html>. Tout ce qui est purement visuel (nav, page d'accueil,
// onglets de Combat) est piloté en CSS pur via cet attribut — voir css/style.css,
// section "MODE DÉCOUVERTE". Seuls les rendus qui diffèrent réellement selon le mode
// (recherche globale, wizard, page Personnage) interrogent isBeginnerMode() en JS.

import { toast } from './toast.js';

const KEY = 'codex_beginner_mode';
const PROGRESS_KEY = 'codex_beginner_progress';

// Jalons d'apprentissage suivis pendant le Mode Découverte : volontairement universels
// (valables quelle que soit la classe jouée), pour donner un vrai sentiment d'avancement
// plutôt qu'un simple on/off — voir markMilestone(), appelé depuis les points du site où
// chaque jalon se produit réellement (wizard/pregens, page Combat, lanceur de dés).
export const MILESTONES = [
  { id:'created', label:'Personnage créé' },
  { id:'combat', label:'Combat consulté' },
  { id:'dice', label:'Premier jet de dés' },
];

export function isBeginnerMode(){
  return localStorage.getItem(KEY) === '1';
}

function getProgress(){
  try {
    const raw = JSON.parse(localStorage.getItem(PROGRESS_KEY));
    return Array.isArray(raw) ? raw.filter(id => MILESTONES.some(m => m.id === id)) : [];
  } catch {
    return [];
  }
}

function syncProgressUI(){
  const done = getProgress();
  const badge = document.getElementById('beginner-progress-badge');
  if(badge){
    const show = done.length > 0 && done.length < MILESTONES.length;
    badge.hidden = !show;
    if(show) badge.textContent = String(done.length);
  }
  const detail = document.getElementById('beginner-banner-progress');
  if(detail){
    detail.innerHTML = MILESTONES.map(m => `<span class="beginner-progress-step${done.includes(m.id) ? ' is-done' : ''}">${done.includes(m.id) ? '✓' : '○'} ${m.label}</span>`).join('');
  }
}

/** Enregistre un jalon d'apprentissage franchi (idempotent). Sans effet si l'id est
 * inconnu ou déjà validé. */
export function markMilestone(id){
  if(!MILESTONES.some(m => m.id === id)) return;
  const done = getProgress();
  if(done.includes(id)) return;
  done.push(id);
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(done));
  syncProgressUI();
  if(isBeginnerMode()){
    const milestone = MILESTONES.find(m => m.id === id);
    toast(`🎉 Jalon franchi : ${milestone.label}`, { type:'success' });
  }
}

function applyState(on){
  localStorage.setItem(KEY, on ? '1' : '0');
  document.documentElement.setAttribute('data-beginner', on ? '1' : '0');
  syncToggleButton();
  syncProgressUI();
}

function syncToggleButton(){
  const btn = document.getElementById('beginner-toggle');
  if(!btn) return;
  const on = isBeginnerMode();
  btn.setAttribute('aria-pressed', String(on));
  btn.title = on ? 'Mode Découverte activé (cliquer pour désactiver)' : 'Activer le Mode Découverte';
  btn.setAttribute('aria-label', btn.title);
}

function toggleBeginnerMode(next){
  const enabling = typeof next === 'boolean' ? next : !isBeginnerMode();
  applyState(enabling);
  toast(
    enabling
      ? 'Mode Découverte activé — le site est simplifié pour apprendre les bases.'
      : 'Mode Découverte désactivé — toutes les pages sont de nouveau visibles.',
    { type:'success' }
  );
}

export function initBeginnerMode(){
  applyState(isBeginnerMode());

  document.getElementById('beginner-toggle')?.addEventListener('click', () => toggleBeginnerMode());

  document.addEventListener('click', (e) => {
    if(e.target.closest('[data-beginner-enable]')){ toggleBeginnerMode(true); return; }
    if(e.target.closest('[data-beginner-disable]')){ toggleBeginnerMode(false); return; }
  });
}
