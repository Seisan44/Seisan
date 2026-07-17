// Confort de lecture : thème nuit (encre arcanique) / jour (parchemin),
// taille de texte, et police du texte courant (les titres gardent Cinzel).

import { storeGet, storeSet, qs } from './utils.js';

const THEME_KEY = 'grimoire.theme';
const FONT_KEY = 'grimoire.fontScale';
const FAMILY_KEY = 'grimoire.fontFamily';
const FONT_STEPS = [0.9, 1, 1.1, 1.22, 1.35];

// Le CSS (style.css, :root[data-font=…]) porte les piles de secours ; ici, la
// part Google Fonts de chaque police — chargée seulement si on la choisit,
// l'utilisateur de la police d'origine ne télécharge rien de plus.
export const FONT_FAMILIES = [
  { key: 'manuscrit', label: 'Manuscrit', desc: 'EB Garamond — la plume d’origine', gf: null },
  { key: 'lisible',   label: 'Lisible',   desc: 'Atkinson Hyperlegible — conçue pour la lisibilité', gf: 'Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700' },
  { key: 'moderne',   label: 'Moderne',   desc: 'Inter — sans-serif nette', gf: 'Inter:ital,wght@0,400;0,500;0,600;0,700;1,400' },
  { key: 'livre',     label: 'Livre',     desc: 'Literata — serif contemporaine', gf: 'Literata:ital,wght@0,400;0,500;0,600;0,700;1,400' },
];

export function initTheme(){
  applyTheme(storeGet(THEME_KEY, 'nuit'));
  applyFontScale(storeGet(FONT_KEY, 1));
  applyFontFamily(storeGet(FAMILY_KEY, 'manuscrit'));
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

/* ------------------------------ Police du texte ---------------------------- */

export function currentFontFamily(){
  return document.documentElement.dataset.font || 'manuscrit';
}

/** Injecte (une fois) la feuille Google Fonts des polices non chargées par défaut. */
export function ensureFontCss(keys = null){
  const wanted = FONT_FAMILIES.filter(f => f.gf && (!keys || keys.includes(f.key)));
  const missing = wanted.filter(f => !qs(`link[data-font-css="${f.key}"]`));
  for(const f of missing){
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${f.gf}&display=swap`;
    link.dataset.fontCss = f.key;
    document.head.append(link);
  }
}

export function applyFontFamily(key){
  const font = FONT_FAMILIES.find(f => f.key === key) || FONT_FAMILIES[0];
  ensureFontCss([font.key]);
  document.documentElement.dataset.font = font.key;
  storeSet(FAMILY_KEY, font.key);
  return font;
}
