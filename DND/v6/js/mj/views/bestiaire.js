// Onglet A — Monstres : le bestiaire global (data/monstres.json).
// Grille filtrable, fiche complète en modale, ajout à la campagne active.

import { el, escapeHtml, stripAccents, debounce } from '../../utils.js';
import { openModal, toast } from '../../ui.js';
import { loadBestiary, monsterImagePath } from '../bestiary.js';
import { getActiveCampaign, commit, touch, isAtelier } from '../store.js';
import { createCreature } from '../schema.js';
import { statblockNode } from '../statblock.js';

const PAGE = 48;

export async function renderBestiaire(panel){
  panel.append(el('p', { class: 'mj-loading', text: 'Ouverture du bestiaire…' }));
  let monsters;
  try { monsters = await loadBestiary(); }
  catch (err) {
    panel.replaceChildren(el('p', { class: 'mj-empty', text: `Bestiaire indisponible : ${err.message}` }));
    return;
  }
  panel.replaceChildren();

  const search = el('input', { class: 'input search-input', type: 'search', placeholder: `Chercher parmi ${monsters.length} monstres…` });
  const count = el('span', { class: 'filter-count' });
  panel.append(el('div', { class: 'filter-bar' }, [search, count]));

  const grid = el('div', { class: 'mj-monster-grid' });
  const moreBtn = el('button', { class: 'btn btn-ghost', type: 'button', text: 'Afficher plus' });
  panel.append(grid, el('div', { class: 'mj-more' }, [moreBtn]));

  const norm = s => stripAccents(s || '').toLowerCase();
  let filtered = monsters;
  let limit = PAGE;

  function refresh(){
    const q = norm(search.value.trim());
    filtered = q ? monsters.filter(m => norm(m.nom).includes(q) || norm(m.type_texte).includes(q)) : monsters;
    grid.replaceChildren(...filtered.slice(0, limit).map(monsterCard));
    count.textContent = `${Math.min(limit, filtered.length)} / ${filtered.length} monstres`;
    moreBtn.classList.toggle('hidden', filtered.length <= limit);
    if(!filtered.length) grid.append(el('p', { class: 'mj-empty', text: 'Aucun monstre ne correspond.' }));
  }
  search.addEventListener('input', debounce(() => { limit = PAGE; refresh(); }, 150));
  moreBtn.addEventListener('click', () => { limit += PAGE; refresh(); });
  refresh();
}

function monsterCard(m){
  const img = monsterImagePath(m);
  return el('article', { class: 'mj-card mj-monster-card' }, [
    img && el('img', { src: img, alt: '', loading: 'lazy', onerror: (e) => e.target.remove() }),
    el('div', { class: 'mj-card-body' }, [
      el('h3', { text: m.nom }),
      el('p', { class: 'mj-card-meta', text: `${m.type_texte} · FP ${m.fp}` }),
      el('p', { class: 'mj-card-meta', text: `${m.pv} PV · CA ${m.ca}` }),
      el('div', { class: 'mj-card-actions' }, [
        el('button', { class: 'btn btn-sm btn-ghost', type: 'button', text: 'Fiche', onclick: () => openSheet(m) }),
        el('button', { class: 'btn btn-sm btn-primary', type: 'button', text: '+ Ajouter', title: 'Ajouter au classeur actif', onclick: () => addToCampaign(m) }),
      ]),
    ]),
  ]);
}

function openSheet(m){
  const img = monsterImagePath(m);
  openModal({
    title: escapeHtml(m.nom),
    className: 'modal-wiki',
    node: el('div', { class: 'mj-sheet' }, [
      img && el('img', { class: 'mj-sheet-img', src: img, alt: m.nom }),
      statblockNode(m),
      m.description && el('p', { class: 'mj-sheet-desc', text: m.description }),
    ]),
  });
}

function addToCampaign(m){
  const campaign = getActiveCampaign();
  if(!campaign){ toast('Ouvrez d’abord une campagne (onglet Campagnes)', { icon: '⚠️' }); return; }
  // Copie profonde du stat block : la campagne exportée est autosuffisante et
  // le MJ peut modifier SA version du monstre sans toucher au bestiaire.
  const cr = createCreature({
    kind: 'monstre',
    nom: m.nom,
    description: m.description || '',
    sourceBestiaire: m.slug,
    image: monsterImagePath(m),
    statBlock: structuredClone({
      type_texte: m.type_texte, ca: m.ca, pv: m.pv, vitesse: m.vitesse, initiative: m.initiative,
      caracteristiques: m.caracteristiques, competences: m.competences,
      vulnerabilites: m.vulnerabilites, resistances: m.resistances, immunites: m.immunites,
      sens: m.sens, langues: m.langues, fp: m.fp, px: m.px, fp_texte: m.fp_texte,
      traits: m.traits, actions: m.actions, actions_bonus: m.actions_bonus,
      reactions: m.reactions, actions_legendaires: m.actions_legendaires,
    }),
  });
  campaign.creatures.push(cr);
  touch('monstre', cr.id);
  commit('creature:add');
  toast(`${m.nom} rejoint ${isAtelier() ? 'l’Atelier' : 'la campagne'}`, { icon: '🐉' });
}
