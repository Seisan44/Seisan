// Amorçage du Grimoire de Seisan : chargement des données, routeur, écouteurs globaux.

import { loadData, DATA } from './data.js';
import { registerRoute, startRouter, navigate } from './router.js';
import { qs, escapeHtml } from './utils.js';
import {
  initTheme, toggleTheme, cycleFontScale, currentTheme,
  FONT_FAMILIES, currentFontFamily, applyFontFamily, ensureFontCss,
} from './theme.js';
import { initSearch, openSearch } from './search.js';
import { toggleDiceTray } from './dice.js';
import { openPopover, closePopover, openModal, toast, initTooltips } from './ui.js';
import { getGlossaryEntry, enrichHTML } from './enrich.js';
import { refreshBadges } from './progress.js';
import { spellDetailNode } from './pages/sorts.js';

import { renderHome } from './pages/home.js';
import { renderVoie } from './pages/voie.js';
import { renderEspeces } from './pages/especes.js';
import { renderClasses } from './pages/classes.js';
import { renderSorts } from './pages/sorts.js';
import { renderDons } from './pages/dons.js';
import { renderHistoriques } from './pages/historiques.js';
import { renderEquipement } from './pages/equipement.js';
import { renderGlossaire } from './pages/glossaire.js';
import { renderEcran } from './pages/ecran.js';
import { renderPersonnages } from './pages/personnages.js';

function registerRoutes(){
  registerRoute('accueil', renderHome);
  registerRoute('voie', renderVoie);
  registerRoute('especes', renderEspeces);
  registerRoute('classes', renderClasses);
  registerRoute('sorts', renderSorts);
  registerRoute('dons', renderDons);
  registerRoute('historiques', renderHistoriques);
  registerRoute('equipement', renderEquipement);
  registerRoute('glossaire', renderGlossaire);
  registerRoute('ecran', renderEcran);
  registerRoute('personnages', renderPersonnages);

  // Outils de Maître du jeu : module chargé paresseusement à la 1re visite,
  // rien de la section MJ n'est téléchargé ni exécuté avant.
  let mjModule = null;
  registerRoute('mj', async (view, params) => {
    mjModule ??= await import('./mj/index.js');
    await mjModule.renderMJ(view, params);
  });
}

// Popovers de glossaire et fiches de sorts, où que le texte enrichi apparaisse.
function initGlobalEnrichListeners(){
  const openTermPopover = (target) => {
    const id = target.dataset.glossaryId;
    if(id){
      const entry = getGlossaryEntry(id);
      if(!entry) return;
      openPopover(target, {
        title: escapeHtml(entry.terme),
        category: entry.categorie,
        bodyHTML: enrichHTML(entry.description, { isPlainText: true }),
        footHTML: `<a href="#glossaire/${id}" class="popover-link">Voir dans le glossaire →</a>`,
      });
      return;
    }
    if(target.dataset.abbrDef){
      openPopover(target, {
        title: escapeHtml(target.dataset.abbrCode || ''),
        category: 'abréviation',
        bodyHTML: `<p>${escapeHtml(target.dataset.abbrDef)}</p>`,
      });
    }
  };

  document.addEventListener('click', (e) => {
    const term = e.target.closest?.('.term-link');
    if(term){ e.preventDefault(); openTermPopover(term); return; }
    const spell = e.target.closest?.('.spell-link');
    if(spell){
      e.preventDefault();
      const s = DATA.sortsBySlug.get(spell.dataset.spellSlug);
      if(s) openModal({ title: escapeHtml(s._primaryName), node: spellDetailNode(s), className: 'modal-spell' });
    }
  });
  document.addEventListener('keydown', (e) => {
    if(e.key !== 'Enter' && e.key !== ' ') return;
    const term = e.target.closest?.('.term-link');
    if(term){ e.preventDefault(); openTermPopover(term); }
    const spell = e.target.closest?.('.spell-link');
    if(spell){
      e.preventDefault();
      const s = DATA.sortsBySlug.get(spell.dataset.spellSlug);
      if(s) openModal({ title: escapeHtml(s._primaryName), node: spellDetailNode(s), className: 'modal-spell' });
    }
  });
}

function initChrome(){
  qs('#btn-theme').addEventListener('click', () => {
    toggleTheme();
    toast(currentTheme() === 'jour' ? 'Thème parchemin' : 'Thème nuit arcanique', { icon: currentTheme() === 'jour' ? '☀️' : '🌙' });
  });
  qs('#btn-font').addEventListener('click', () => {
    const s = cycleFontScale();
    toast(`Taille du texte : ${Math.round(s * 100)} %`, { icon: 'Aa' });
  });
  // Menu « plume » : police du texte courant et de la saisie (les titres
  // gardent Cinzel). Chaque option s'affiche dans sa propre police — on charge
  // donc toutes les feuilles à l'ouverture du menu, pas avant.
  qs('#btn-fontfamily').addEventListener('click', () => {
    ensureFontCss();
    const current = currentFontFamily();
    openPopover(qs('#btn-fontfamily'), {
      title: 'Police du texte',
      category: 'lecture & saisie',
      bodyHTML: `<div class="font-menu">${FONT_FAMILIES.map(f =>
        `<button type="button" class="font-choice${f.key === current ? ' is-active' : ''}" data-font-key="${f.key}">`
        + `<span class="font-choice-name font-sample-${f.key}">${escapeHtml(f.label)}</span>`
        + `<span class="font-choice-desc">${escapeHtml(f.desc)}</span>`
        + `</button>`).join('')}</div>`,
    });
  });
  document.addEventListener('click', (e) => {
    const choice = e.target.closest?.('.font-choice');
    if(!choice) return;
    const font = applyFontFamily(choice.dataset.fontKey);
    closePopover();
    toast(`Plume « ${font.label} »`, { icon: '🖋️' });
  });
  qs('#btn-search').addEventListener('click', openSearch);
  qs('#btn-dice').addEventListener('click', toggleDiceTray);

  const navToggle = qs('#btn-nav');
  const closeNav = () => document.body.classList.remove('nav-open');
  navToggle.addEventListener('click', () => document.body.classList.toggle('nav-open'));
  qs('#nav-backdrop').addEventListener('click', closeNav);
  qs('#sidebar').addEventListener('click', (e) => {
    if(e.target.closest('a')) closeNav();
  });
}

async function boot(){
  initTheme();
  const loader = qs('#loader');
  const bar = qs('#loader-bar');
  const label = qs('#loader-label');
  try {
    await loadData((done, total) => {
      bar.style.width = `${Math.round((done / total) * 100)}%`;
      label.textContent = `Les pages s’assemblent… (${done}/${total})`;
    });
  } catch (err) {
    label.innerHTML = `Le grimoire refuse de s’ouvrir :<br><code>${escapeHtml(err.message)}</code><br>Lance un serveur local : <code>python3 -m http.server 8080</code>`;
    bar.style.background = '#a33';
    return;
  }

  registerRoutes();
  initSearch();
  initChrome();
  initGlobalEnrichListeners();
  initTooltips();
  refreshBadges();
  await startRouter();

  loader.classList.add('is-done');
  setTimeout(() => loader.remove(), 700);
}

boot();
