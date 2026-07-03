import { loadData } from './data.js';
import { initRouter, registerRoute } from './router.js';
import { initGlossaryPopovers } from './popover.js';
import { initCommandPalette } from './search.js';
import { initReaderSettings } from './theme.js';
import { qs, qsa, lockBodyScroll, unlockBodyScroll } from './utils.js';
import { toast } from './toast.js';

import { renderHome } from './pages/home.js';
import { renderRaces } from './pages/races.js';
import { renderClasses } from './pages/classes.js';
import { renderDons } from './pages/dons.js';
import { renderGlossaire } from './pages/glossaire.js';
import { renderSorts, initSpellLinks } from './pages/sorts.js';
import { renderEquipements } from './pages/equipements.js';
import { renderCombat } from './pages/combat.js';
import { renderHistoriques } from './pages/historiques.js';
import { renderPersonnage } from './pages/personnage.js';
import { initDiceTriggers } from './dice.js';

function initNav(){
  const toggle = qs('#nav-toggle');
  const nav = qs('#primary-nav');
  const scrim = qs('#nav-scrim');

  function openNav(){
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    scrim.hidden = false;
    lockBodyScroll();
  }
  function closeNav(){
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    scrim.hidden = true;
    unlockBodyScroll();
  }
  toggle.addEventListener('click', () => nav.classList.contains('is-open') ? closeNav() : openNav());
  scrim.addEventListener('click', closeNav);
  qsa('#primary-nav a').forEach(a => a.addEventListener('click', () => { if(window.innerWidth <= 980) closeNav(); }));
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape' && nav.classList.contains('is-open')) closeNav(); });
  window.addEventListener('resize', () => { if(window.innerWidth > 980) closeNav(); });
}

function registerAllRoutes(){
  registerRoute('accueil', renderHome);
  registerRoute('races', renderRaces);
  registerRoute('classes', renderClasses);
  registerRoute('dons', renderDons);
  registerRoute('glossaire', renderGlossaire);
  registerRoute('sorts', renderSorts);
  registerRoute('equipements', renderEquipements);
  registerRoute('combat', renderCombat);
  registerRoute('historiques', renderHistoriques);
  registerRoute('personnage', renderPersonnage);
}

async function boot(){
  initNav();
  initReaderSettings();
  initGlossaryPopovers();
  initSpellLinks();
  initCommandPalette();
  initDiceTriggers();

  try {
    await loadData();
  } catch(err){
    console.error(err);
    qs('#loading-screen .loading-text').textContent = "Erreur de chargement des données. Vérifiez que le site tourne via un serveur local.";
    return;
  }

  registerAllRoutes();
  initRouter();

  const loading = qs('#loading-screen');
  loading.classList.add('is-hidden');
  window.setTimeout(() => loading.remove(), 500);

  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}

boot();
