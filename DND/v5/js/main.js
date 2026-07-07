import { loadData } from './data.js';
import { refreshHomebrew } from './character/homebrew.js';
import { initRouter, registerRoute } from './router.js';
import { initGlossaryPopovers } from './popover.js';
import { initCommandPalette } from './search.js';
import { initReaderSettings } from './theme.js';
import { initBeginnerMode } from './beginner.js';
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
import { renderCaracCompetences } from './pages/carac-competences.js';
import { renderHomebrew } from './pages/homebrew.js';
import { renderPersonnage } from './pages/personnage.js';
import { initDiceTriggers } from './dice.js';

// Doit rester synchronisé avec le breakpoint CSS "@media (max-width: 640px)" (section 11,
// css/style.css) : en dessous, la nav est un tiroir hors-écran qu'il faut fermer au clic sur
// un lien ou au redimensionnement ; au-dessus, c'est une sidebar fixe toujours visible.
const NAV_DRAWER_BREAKPOINT = 640;

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
  qsa('#primary-nav a').forEach(a => a.addEventListener('click', () => { if(window.innerWidth <= NAV_DRAWER_BREAKPOINT) closeNav(); }));
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape' && nav.classList.contains('is-open')) closeNav(); });
  window.addEventListener('resize', () => { if(window.innerWidth > NAV_DRAWER_BREAKPOINT) closeNav(); });
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
  registerRoute('carac-competences', renderCaracCompetences);
  registerRoute('homebrew', renderHomebrew);
  registerRoute('personnage', renderPersonnage);
}

async function boot(){
  initNav();
  initReaderSettings();
  initBeginnerMode();
  initGlossaryPopovers();
  initSpellLinks();
  initCommandPalette();
  initDiceTriggers();

  try {
    await loadData();
    refreshHomebrew();
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
