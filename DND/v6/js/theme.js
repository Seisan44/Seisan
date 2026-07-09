// Confort de lecture : thème nuit (encre arcanique) / jour (parchemin), taille de texte.

import { storeGet, storeSet, qs } from './utils.js';

const THEME_KEY = 'grimoire.theme';
const FONT_KEY = 'grimoire.fontScale';
const FONT_STEPS = [0.9, 1, 1.1, 1.22, 1.35];

export function initTheme(){
  applyTheme(storeGet(THEME_KEY, 'nuit'));
  applyFontScale(storeGet(FONT_KEY, 1));
}

export function currentTheme(){
  return document.documentElement.dataset.theme || 'nuit';
}

export function applyTheme(theme){
  document.documentElement.dataset.theme = theme === 'jour' ? 'jour' : 'nuit';
  storeSet(THEME_KEY, currentTheme());
  const meta = qs('meta[name="theme-color"]');
  if(meta) meta.content = currentTheme() === 'jour' ? '#efe4cb' : '#0d0a14';
}

export function toggleTheme(){
  applyTheme(currentTheme() === 'jour' ? 'nuit' : 'jour');
}

export function applyFontScale(scale){
  const s = FONT_STEPS.includes(scale) ? scale : 1;
  document.documentElement.style.setProperty('--font-scale', s);
  storeSet(FONT_KEY, s);
}

export function cycleFontScale(){
  const cur = Number(getComputedStyle(document.documentElement).getPropertyValue('--font-scale')) || 1;
  const idx = FONT_STEPS.findIndex(s => Math.abs(s - cur) < 0.01);
  const next = FONT_STEPS[(idx + 1) % FONT_STEPS.length];
  applyFontScale(next);
  return next;
}
