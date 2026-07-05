// Mode Découverte (Débutant) : un simple drapeau persistant, reflété par l'attribut
// data-beginner sur <html>. Tout ce qui est purement visuel (nav, page d'accueil,
// onglets de Combat) est piloté en CSS pur via cet attribut — voir css/style.css,
// section "MODE DÉCOUVERTE". Seuls les rendus qui diffèrent réellement selon le mode
// (recherche globale, wizard, page Personnage) interrogent isBeginnerMode() en JS.

import { toast } from './toast.js';

const KEY = 'codex_beginner_mode';

export function isBeginnerMode(){
  return localStorage.getItem(KEY) === '1';
}

function applyState(on){
  localStorage.setItem(KEY, on ? '1' : '0');
  document.documentElement.setAttribute('data-beginner', on ? '1' : '0');
  syncToggleButton();
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
