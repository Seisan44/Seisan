// Routeur SPA par hash : #route/param1/param2

import { qs, qsa } from './utils.js';

const routes = new Map();
let currentRoute = null;
let onBeforeNavigate = null;

export function registerRoute(name, render){
  routes.set(name, render);
}

export function setBeforeNavigate(fn){ onBeforeNavigate = fn; }

export function parseHash(){
  const raw = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
  const parts = raw.split('/').filter(Boolean);
  return { route: parts[0] || 'accueil', params: parts.slice(1) };
}

export function navigate(route, ...params){
  const target = '#' + [route, ...params.filter(p => p != null && p !== '')].map(encodeURIComponent).join('/');
  if(location.hash === target){ renderCurrent(); }
  else location.hash = target;
}

export function getCurrentRoute(){ return currentRoute; }

async function renderCurrent(){
  const { route, params } = parseHash();
  const render = routes.get(route) || routes.get('accueil');
  currentRoute = route;
  onBeforeNavigate?.(route, params);

  const view = qs('#view');
  view.classList.remove('view-enter');
  // Force le reflow pour rejouer l'animation d'entrée à chaque navigation.
  void view.offsetWidth;

  view.innerHTML = '';
  view.scrollTop = 0;
  window.scrollTo(0, 0);
  await render(view, params);
  view.classList.add('view-enter');

  // Met en évidence l'entrée de navigation active.
  qsa('[data-route]').forEach(a => {
    a.classList.toggle('is-active', a.dataset.route === route);
    if(a.dataset.route === route) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

export function startRouter(){
  window.addEventListener('hashchange', renderCurrent);
  return renderCurrent();
}
