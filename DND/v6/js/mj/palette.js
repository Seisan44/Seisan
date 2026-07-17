// Recherche rapide (Ctrl+K) : palette qui fouille toutes les entités du
// classeur actif (créatures, butins, rencontres, lore, cartes, boîtes
// d'idées) et ouvre la fiche — ou la carte — sélectionnée.

import { el, stripAccents } from '../utils.js';
import { openModal } from '../ui.js';
import { navigate } from '../router.js';
import { getActiveCampaign, entityName, sessionDisplay } from './store.js';
import { SESSION_STATUTS } from './schema.js';
import { openEntityModal } from './wiki.js';

const TYPE_META = {
  pnj:       { icon: '🎭', label: 'PNJ' },
  monstre:   { icon: '🐉', label: 'Monstre' },
  butin:     { icon: '💰', label: 'Butin' },
  encounter: { icon: '⚔️', label: 'Rencontre' },
  lore:      { icon: '📜', label: 'Lore' },
  map:       { icon: '🗺️', label: 'Carte' },
  idea:      { icon: '💡', label: 'Boîte d’idées' },
  session:   { icon: '📅', label: 'Session' },
  pj:        { icon: '🧙', label: 'PJ' },
};

const norm = s => stripAccents(String(s ?? '')).toLowerCase();

function allEntries(){
  const c = getActiveCampaign();
  if(!c) return [];
  const entries = [];
  for(const cr of c.creatures)  entries.push({ type: cr.kind, id: cr.id, label: cr.nom, extra: cr.kind === 'pnj' ? cr.role : `FP ${cr.statBlock?.fp || '—'}` });
  for(const b  of c.butins)     entries.push({ type: 'butin', id: b.id, label: b.nom, extra: b.type });
  for(const e  of c.encounters) entries.push({ type: 'encounter', id: e.id, label: e.titre, extra: `${e.participants.length} participant(s)` });
  for(const n  of c.lore)       entries.push({ type: 'lore', id: n.id, label: n.titre, extra: '' });
  for(const m  of c.maps)       entries.push({ type: 'map', id: m.id, label: m.nom, extra: `${m.pins.length} marqueur(s)` });
  for(const bx of c.ideas)      entries.push({ type: 'idea', id: bx.id, label: bx.titre || bx.chips.slice(0, 3).join(', ') || 'Boîte sans titre', extra: bx.chips.join(' · ') });
  for(const s  of c.sessions)   entries.push({ type: 'session', id: s.id, label: sessionDisplay(s), extra: SESSION_STATUTS.find(x => x.key === s.statut)?.label ?? '' });
  for(const pj of c.pjs)        entries.push({ type: 'pj', id: pj.id, label: pj.nom, extra: [pj.classe, pj.joueur].filter(Boolean).join(' · ') });
  return entries.filter(e => e.label);
}

export function openPalette(){
  const input = el('input', {
    class: 'input mj-palette-input', type: 'search',
    placeholder: 'Chercher un PNJ, une rencontre, une note, une carte…',
    'aria-label': 'Recherche rapide',
  });
  const list = el('div', { class: 'mj-palette-list', role: 'listbox' });
  const modal = openModal({
    title: 'Recherche rapide',
    node: el('div', { class: 'mj-palette' }, [input, list]),
    className: 'modal-palette',
  });

  const entries = allEntries();
  let results = [];
  let selected = 0;

  function open(entry){
    modal.close();
    if(entry.type === 'map') navigate('mj', 'maps', entry.id);
    else if(entry.type === 'session') navigate('mj', 'sessions', entry.id);
    else openEntityModal(entry.type, entry.id);
  }

  function refresh(){
    const q = norm(input.value.trim());
    results = !q ? entries.slice(0, 20) : entries
      .filter(e => norm(e.label).includes(q) || norm(e.extra).includes(q))
      .sort((a, b) => norm(b.label).startsWith(q) - norm(a.label).startsWith(q))
      .slice(0, 20);
    selected = Math.min(selected, Math.max(0, results.length - 1));

    list.replaceChildren(...(results.length ? results.map((entry, i) => {
      const meta = TYPE_META[entry.type] || { icon: '❔', label: '' };
      const row = el('button', {
        class: `mj-palette-row${i === selected ? ' is-selected' : ''}`,
        type: 'button', role: 'option',
        onclick: () => open(entry),
      }, [
        el('span', { class: 'mj-palette-icon', text: meta.icon }),
        el('span', { class: 'mj-palette-label', text: entry.label }),
        el('span', { class: 'mj-palette-meta', text: entry.extra ? `${meta.label} · ${entry.extra}` : meta.label }),
      ]);
      row.addEventListener('mousemove', () => {
        if(selected === i) return;
        selected = i;
        for(const [j, r] of [...list.children].entries()) r.classList.toggle('is-selected', j === i);
      });
      return row;
    }) : [
      el('p', { class: 'mj-empty', text: q ? 'Rien ne correspond dans ce classeur.' : 'Ce classeur est encore vide.' }),
    ]));
  }

  input.addEventListener('input', () => { selected = 0; refresh(); });
  input.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowDown' || e.key === 'ArrowUp'){
      e.preventDefault();
      if(!results.length) return;
      selected = (selected + (e.key === 'ArrowDown' ? 1 : -1) + results.length) % results.length;
      refresh();
      list.children[selected]?.scrollIntoView({ block: 'nearest' });
    } else if(e.key === 'Enter' && results[selected]){
      e.preventDefault();
      open(results[selected]);
    }
  });

  refresh();
  setTimeout(() => input.focus(), 60);
}
