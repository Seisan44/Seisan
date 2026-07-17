// Point d'entrée de la section « Outils de Maître du jeu ».
// Chargé paresseusement par le routeur (import() dynamique dans main.js) :
// rien de ce module ne s'exécute tant que l'utilisateur ne visite pas #mj.
//
// Structure façon Notion : barre latérale fixe (classeur actif, recherche,
// outils au même niveau) + panneau de contenu. Les routes sont plates
// (#mj/<outil>/...) ; les anciennes URL #mj/campagnes/<outil> redirigent.

import { qs, el, escapeHtml } from '../utils.js';
import { navigate } from '../router.js';
import { initStore, getActiveCampaign, getActiveSession, sessionLabel, listCampaigns, openCampaign, isAtelier } from './store.js';
import { initWikiListeners } from './wiki.js';
import { openPalette } from './palette.js';
import { renderOverview } from './views/overview.js';
import { renderBrainstorm } from './views/brainstorm.js';
import { renderLore } from './views/lore.js';
import { renderCreatures } from './views/creatures.js';
import { renderButins } from './views/butins.js';
import { renderEncounters } from './views/encounters.js';
import { renderMaps } from './views/maps.js';
import { renderBestiaire } from './views/bestiaire.js';
import { renderCampagnes } from './views/campagnes.js';
import { renderSessions } from './views/sessions.js';
import { renderJoueurs } from './views/joueurs.js';

let booted = false;

function ensureCss(){
  if(qs('link[data-mj-css]')) return;
  document.head.append(el('link', { rel: 'stylesheet', href: 'css/mj.css', 'data-mj-css': '1' }));
}

const TOOLS = [
  { key: 'apercu',     icon: '🏠', label: 'Vue d’ensemble', render: renderOverview },
  { key: 'sessions',   icon: '📅', label: 'Sessions',       render: renderSessions },
  { key: 'brainstorm', icon: '💡', label: 'Brainstorming',  render: renderBrainstorm },
  { key: 'lore',       icon: '📜', label: 'Lore',           render: renderLore },
  { key: 'creatures',  icon: '🎭', label: 'PNJ & Monstres', render: renderCreatures },
  { key: 'joueurs',    icon: '🧙', label: 'Joueurs',        render: renderJoueurs },
  { key: 'butins',     icon: '💰', label: 'Butins',         render: renderButins },
  { key: 'encounters', icon: '⚔️', label: 'Rencontres',     render: renderEncounters },
  { key: 'maps',       icon: '🗺️', label: 'Cartes',         render: renderMaps },
  { key: 'bestiaire',  icon: '🐉', label: 'Bestiaire',      render: renderBestiaire },
  { key: 'campagnes',  icon: '⚙️', label: 'Campagnes',      render: renderCampagnes },
];

// Sous-outils autrefois nichés sous l'onglet Campagnes (vieux liens/favoris).
const LEGACY_SUBROUTES = new Set(['brainstorm', 'maps', 'creatures', 'butins', 'encounters', 'lore']);

export async function renderMJ(view, params){
  if(!booted){
    ensureCss();
    initStore();          // garantit un classeur actif (Atelier au besoin)
    initWikiListeners();  // délégation survol/clic des .wiki-link — une seule fois
    initPaletteShortcut();
    booted = true;
  }

  // Redirection des anciennes routes #mj/campagnes/<outil>/...
  if(params[0] === 'campagnes' && LEGACY_SUBROUTES.has(params[1])){
    navigate('mj', ...params.slice(1));
    return;
  }

  const [toolKey = 'apercu', ...rest] = params;
  const tool = TOOLS.find(t => t.key === toolKey) || TOOLS[0];

  const panel = el('div', { class: 'mj-tool-panel' });
  view.append(el('div', { class: 'mj-layout' }, [
    sidebar(tool),
    el('section', { class: 'mj-content' }, [
      el('header', { class: 'mj-content-head' }, [
        el('h1', { text: tool.label }),
        el('span', { class: 'mj-content-campaign', html: campaignBadgeHTML() }),
      ]),
      panel,
    ]),
  ]));

  await tool.render(panel, rest);   // rest = sous-route (ex. ['<id de carte>'])
}

function campaignBadgeHTML(){
  const active = getActiveCampaign();
  const base = isAtelier() ? '✦ Atelier <em>(sans campagne)</em>' : `📖 ${escapeHtml(active?.nom ?? '')}`;
  // Session en cours : rappel permanent et cliquable — on revient au poste de
  // pilotage depuis n'importe quel outil de la section MJ.
  const session = getActiveSession();
  if(!session) return base;
  return `${base} · <a class="mj-session-badge" href="#mj/sessions/${session.id}">🎲 ${escapeHtml(sessionLabel(session))} <em>(en cours)</em></a>`;
}

/* ------------------------------ Barre latérale ---------------------------- */

function sidebar(activeTool){
  const active = getActiveCampaign();

  // Sélecteur de classeur : l'Atelier d'abord, puis les campagnes.
  const sel = el('select', { class: 'select mj-side-select', 'aria-label': 'Classeur actif' },
    listCampaigns().map(c => el('option', { value: c.id, text: c.builtin ? '✦ Atelier' : c.nom })));
  sel.value = active?.id ?? '';
  sel.addEventListener('change', () => {
    openCampaign(sel.value);
    navigate('mj', activeTool.key);
  });

  const searchBtn = el('button', {
    class: 'mj-side-search', type: 'button', onclick: () => openPalette(),
  }, [
    el('span', { text: '🔍 Rechercher…' }),
    el('kbd', { text: 'Ctrl K' }),
  ]);

  return el('aside', { class: 'mj-sidebar', 'aria-label': 'Outils MJ' }, [
    el('p', { class: 'mj-side-brand', text: 'Outils du MJ' }),
    sel,
    searchBtn,
    el('nav', { class: 'mj-side-nav' }, TOOLS.map(t =>
      el('a', {
        href: `#mj/${t.key}`,
        class: t === activeTool ? 'is-active' : '',
        'aria-current': t === activeTool ? 'page' : null,
      }, [
        el('span', { class: 'mj-side-icon', text: t.icon }),
        el('span', { text: t.label }),
      ])
    )),
  ]);
}

/* ------------------------------ Raccourci Ctrl+K --------------------------- */

// Dans la section MJ, Ctrl+K ouvre la recherche du classeur plutôt que celle
// du compendium (search.js, abonnée en phase de bouillonnement : la capture
// passe avant). Partout ailleurs, le raccourci du site reste inchangé.
function initPaletteShortcut(){
  document.addEventListener('keydown', (e) => {
    if(!(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== 'k') return;
    if(!location.hash.startsWith('#mj')) return;
    if(qs('.palette-overlay.is-open')) return; // laisser search.js se refermer
    e.preventDefault();
    e.stopPropagation();
    openPalette();
  }, { capture: true });
}
