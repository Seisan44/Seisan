// Routeur SPA par hash — navigation clavier/clic, sans rechargement de page.

import { qs, qsa } from './utils.js';

const routes = new Map();
let viewEl, announcerEl;
let currentCleanup = null;

export function registerRoute(name, handler){
  routes.set(name, handler);
}

function parseHash(){
  const raw = (location.hash || '#accueil').slice(1);
  const [route, ...parts] = raw.split('/').filter(Boolean).map(p => decodeURIComponent(p));
  return { route: route || 'accueil', parts };
}

export function navigate(hash){
  if(location.hash === `#${hash}`){
    render();
  } else {
    location.hash = hash;
  }
}

function updateActiveNav(route){
  qsa('#primary-nav a[data-route]').forEach(a => {
    const isActive = a.dataset.route === route;
    a.classList.toggle('is-active', isActive);
    if(isActive) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  document.body.dataset.route = route;
}

async function render(){
  const { route, parts } = parseHash();
  const handler = routes.get(route) || routes.get('accueil');
  const resolvedRoute = routes.has(route) ? route : 'accueil';
  updateActiveNav(resolvedRoute);

  if(typeof currentCleanup === 'function'){
    try { currentCleanup(); } catch(e){ /* noop */ }
    currentCleanup = null;
  }

  viewEl.innerHTML = '';
  const pageWrap = document.createElement('div');
  pageWrap.className = 'page';
  viewEl.appendChild(pageWrap);

  try {
    const result = await handler(pageWrap, parts);
    if(typeof result === 'function') currentCleanup = result;
  } catch(err){
    console.error('Erreur de rendu de page', err);
    pageWrap.innerHTML = `<div class="empty-state"><span class="i-big">⚠️</span><p>Une erreur est survenue pendant l'affichage de cette page.</p></div>`;
  }

  // Une page peut poser data-no-auto-scroll="1" sur son conteneur lorsqu'elle gère
  // elle-même le défilement (ex. Glossaire qui cible une ancre précise via scrollIntoView).
  if(pageWrap.dataset.noAutoScroll !== '1'){
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }
  viewEl.focus({ preventScroll: true });
  if(announcerEl) announcerEl.textContent = `Page ${resolvedRoute} affichée`;
}

export function initRouter(){
  viewEl = qs('#view');
  announcerEl = qs('#route-announcer');
  window.addEventListener('hashchange', render);
  render();
}

export function getCurrentRoute(){ return parseHash(); }
