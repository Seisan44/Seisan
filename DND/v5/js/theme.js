// Confort de lecture : taille de police + variante claire "parchemin".
// Persisté en localStorage, appliqué via des attributs sur <html>.

import { qs } from './utils.js';

const KEY_SCALE = 'codex_font_scale';
const KEY_THEME = 'codex_theme';
const SCALES = { s: 0.92, m: 1, l: 1.12, xl: 1.26 };

export function initReaderSettings(){
  const savedScale = localStorage.getItem(KEY_SCALE) || 'm';
  const savedTheme = localStorage.getItem(KEY_THEME) || 'dark';
  applyScale(savedScale);
  applyTheme(savedTheme);

  const trigger = qs('#reader-settings-trigger');
  let popEl = null;

  function closePop(){
    if(!popEl) return;
    popEl.remove(); popEl = null;
    trigger.setAttribute('aria-expanded', 'false');
    document.removeEventListener('click', onDocClick, true);
  }
  function onDocClick(e){
    if(popEl && !popEl.contains(e.target) && e.target !== trigger) closePop();
  }
  function openPop(){
    if(popEl) return;
    popEl = document.createElement('div');
    popEl.className = 'popover reader-popover is-visible';
    popEl.setAttribute('role', 'dialog');
    popEl.setAttribute('aria-label', 'Confort de lecture');
    popEl.innerHTML = `
      <h3>Confort de lecture</h3>
      <div class="reader-row">
        <span>Taille du texte</span>
        <div class="font-size-ctl">
          <button class="icon-toggle btn-sm" data-scale="s" style="font-size:.75rem" aria-label="Petit">A</button>
          <button class="icon-toggle btn-sm" data-scale="m" aria-label="Normal">A</button>
          <button class="icon-toggle btn-sm" data-scale="l" style="font-size:1.15rem" aria-label="Grand">A</button>
          <button class="icon-toggle btn-sm" data-scale="xl" style="font-size:1.3rem" aria-label="Très grand">A</button>
        </div>
      </div>
      <div class="reader-row" style="margin-bottom:0;">
        <span>Thème</span>
        <div class="font-size-ctl">
          <button class="icon-toggle btn-sm" data-theme="dark" aria-label="Sombre">🌙</button>
          <button class="icon-toggle btn-sm" data-theme="light" aria-label="Parchemin">📜</button>
        </div>
      </div>
    `;
    document.body.appendChild(popEl);
    const r = trigger.getBoundingClientRect();
    popEl.style.position = 'fixed';
    popEl.style.top = `${r.bottom + 10}px`;
    popEl.style.right = `${window.innerWidth - r.right}px`;
    popEl.style.left = 'auto';
    trigger.setAttribute('aria-expanded', 'true');
    syncButtons();
    popEl.querySelectorAll('[data-scale]').forEach(b => b.addEventListener('click', () => { applyScale(b.dataset.scale); syncButtons(); }));
    popEl.querySelectorAll('[data-theme]').forEach(b => b.addEventListener('click', () => { applyTheme(b.dataset.theme); syncButtons(); }));
    window.setTimeout(() => document.addEventListener('click', onDocClick, true), 10);
  }
  function syncButtons(){
    if(!popEl) return;
    const scale = localStorage.getItem(KEY_SCALE) || 'm';
    const theme = localStorage.getItem(KEY_THEME) || 'dark';
    popEl.querySelectorAll('[data-scale]').forEach(b => b.classList.toggle('is-active', b.dataset.scale === scale));
    popEl.querySelectorAll('[data-theme]').forEach(b => b.classList.toggle('is-active', b.dataset.theme === theme));
  }
  trigger.addEventListener('click', () => popEl ? closePop() : openPop());
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closePop(); });
}

function applyScale(scale){
  document.documentElement.style.setProperty('--font-scale', SCALES[scale] ?? 1);
  localStorage.setItem(KEY_SCALE, scale);
}
function applyTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(KEY_THEME, theme);
}
