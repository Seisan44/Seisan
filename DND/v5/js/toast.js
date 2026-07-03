import { qs } from './utils.js';

export function toast(message, { type='info', duration=3200 } = {}){
  const root = qs('#toast-root');
  const el = document.createElement('div');
  el.className = 'toast';
  const icon = type === 'success' ? '✓' : type === 'error' ? '⚠' : '✦';
  el.innerHTML = `<span aria-hidden="true">${icon}</span><span>${message}</span>`;
  root.appendChild(el);
  window.setTimeout(() => {
    el.classList.add('is-leaving');
    el.addEventListener('animationend', () => el.remove(), { once:true });
  }, duration);
}
