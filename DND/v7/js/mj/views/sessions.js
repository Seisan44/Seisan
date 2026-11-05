// Sessions : le flux chronologique de la campagne. La campagne reste la
// photographie de l'état actuel du monde ; chaque session en est un épisode :
// elle RÉFÉRENCE des entités sur son « plateau » (préparation), consigne les
// événements de la partie dans son journal (déroulement), puis répercute les
// conséquences validées sur les entités globales (clôture, voir closeout.js).
// #mj/sessions : la timeline — #mj/sessions/<id> : le détail en trois onglets.

import { el, stripAccents, escapeHtml } from '../../utils.js';
import { confirmDialog, toast, openModal } from '../../ui.js';
import { navigate } from '../../router.js';
import {
  getActiveCampaign, getActiveSession, nextSessionNumber, sessionLabel, sessionDisplay,
  findEntity, entityName, deleteEntity, commit, touch, subscribe,
} from '../store.js';
import { createLogEvent, SESSION_STATUTS, LOG_TAGS, ROSTER_GROUPS, ETAT_STATUTS } from '../schema.js';
import { wikiLinkHTML, detectRefs } from '../wiki.js';
import { renderRich, renderRichInline, stripMarks, richEditor } from '../richtext.js';
import { openSessionForm, openPjForm } from '../forms.js';
import { openTracker } from '../tracker.js';
import { openCloseoutWizard } from '../closeout.js';

const norm = s => stripAccents(String(s ?? '')).toLowerCase();
const statutMeta = k => SESSION_STATUTS.find(s => s.key === k) || SESSION_STATUTS[0];
const tagMeta = k => LOG_TAGS.find(t => t.key === k) || LOG_TAGS[0];

const fmtDate = (d) => d ? new Date(`${d}T12:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
const fmtTime = (iso) => new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

// Groupe du plateau -> type logique d'une entité qui s'y trouve.
const typeForGroup = (groupKey, item) =>
  groupKey === 'creatures' ? (item?.kind || 'pnj')
    : ({ encounters: 'encounter', maps: 'map', lore: 'lore', butins: 'butin', pjs: 'pj' })[groupKey];

const rosterEntities = (session, groupKey) =>
  session.roster[groupKey]
    .map(id => findEntity(groupKey === 'creatures' ? 'pnj' : typeForGroup(groupKey), id))
    .filter(Boolean);

export function renderSessions(container, rest = []){
  const campaign = getActiveCampaign();
  const session = rest[0] ? campaign.sessions.find(s => s.id === rest[0]) : null;
  if(rest[0] && !session){
    toast('Session introuvable dans ce classeur', { icon: '⚠️' });
    navigate('mj', 'sessions');
    return;
  }
  if(session) renderDetail(container, campaign, session);
  else renderTimeline(container, campaign);
}

/* ================================ Timeline ================================= */

function renderTimeline(container, campaign){
  const current = getActiveSession();

  container.append(el('div', { class: 'mj-toolbar' }, [
    el('button', {
      class: 'btn btn-primary btn-sm', type: 'button',
      text: `+ Préparer la session ${nextSessionNumber()}`,
      onclick: () => openSessionForm({ onSave: (s) => navigate('mj', 'sessions', s.id) }),
    }),
  ]));

  if(current){
    container.append(el('div', { class: 'mj-hint mj-session-live-hint' }, [
      el('p', { html: `🎲 <strong>${wikiSafe(sessionLabel(current))}</strong> est en cours — le journal vous attend.` }),
      el('button', {
        class: 'btn btn-sm btn-gold', type: 'button', text: '▶ Reprendre la session',
        onclick: () => navigate('mj', 'sessions', current.id),
      }),
    ]));
  }

  const sessions = [...campaign.sessions].sort((a, b) => (b.numero || 0) - (a.numero || 0));
  if(!sessions.length){
    container.append(el('p', { class: 'mj-empty', html:
      'Aucune session pour l’instant. Le cycle : <strong>préparer</strong> le plateau '
      + '(PNJ, rencontres, cartes…), <strong>jouer</strong> en consignant les événements au journal, '
      + 'puis <strong>clôturer</strong> — les conséquences mettent à jour la campagne pour la suite.' }));
    return;
  }

  container.append(el('div', { class: 'mj-timeline' }, sessions.map(s => timelineCard(s, campaign))));
}

function timelineCard(s, campaign){
  const meta = statutMeta(s.statut);
  const rerender = () => navigate('mj', 'sessions');
  const counts = [];
  const nEntities = ROSTER_GROUPS.reduce((n, g) => n + s.roster[g.key].length, 0);
  if(s.roster.pjs.length) counts.push(`${s.roster.pjs.length} PJ`);
  if(nEntities) counts.push(`${nEntities} élément(s) au plateau`);
  if(s.log.length) counts.push(`${s.log.length} évén.`);
  if(s.consequences.length) counts.push(`${s.consequences.length} conséquence(s)`);
  const dates = [fmtDate(s.datePrevue), s.dateMonde].filter(Boolean).join(' · ');

  return el('article', { class: `mj-timeline-item is-${s.statut}` }, [
    el('span', { class: 'mj-timeline-dot', 'aria-hidden': 'true' }),
    el('div', { class: 'mj-card mj-session-card' }, [
      el('div', { class: 'mj-card-body' }, [
        el('div', { class: 'mj-classeur-head' }, [
          el('h3', { text: sessionDisplay(s) }),
          el('span', { class: `mj-status mj-status--${s.statut}`, text: s.statut === 'en_cours' ? '🎲 en cours' : meta.label }),
        ]),
        (dates || counts.length) && el('p', { class: 'mj-card-meta', text: [dates, counts.join(' · ')].filter(Boolean).join(' — ') }),
        s.statut === 'terminee' && s.recap && el('p', { class: 'mj-session-recap-excerpt', html: renderRichInline(excerpt(stripMarks(s.recap), 180)) }),
        el('div', { class: 'mj-card-actions' }, [
          el('button', {
            class: `btn btn-sm ${s.statut === 'en_cours' ? 'btn-gold' : 'btn-primary'}`, type: 'button',
            text: s.statut === 'en_cours' ? '▶ Reprendre' : 'Ouvrir',
            onclick: () => navigate('mj', 'sessions', s.id),
          }),
          el('button', {
            class: 'icon-btn', type: 'button', 'aria-label': `Supprimer la session ${s.numero}`,
            html: '<svg class="icon"><use href="#i-trash"/></svg>',
            onclick: async () => {
              if(await confirmDialog({
                title: 'Supprimer la session', danger: true, confirmLabel: 'Supprimer',
                message: `« ${sessionLabel(s)} », son plateau et son journal seront supprimés. Les entités de la campagne, elles, ne bougent pas.`,
              })){ deleteEntity('session', s.id); rerender(); }
            },
          }),
        ]),
      ]),
    ]),
  ]);
}

/* ================================= Détail ================================== */

function renderDetail(container, campaign, session){
  const rerender = () => navigate('mj', 'sessions', session.id);

  /* --- En-tête : retour, titre, statut, méta, actions du cycle --- */
  const meta = statutMeta(session.statut);
  const dates = [fmtDate(session.datePrevue), session.dateMonde].filter(Boolean).join(' · ');
  container.append(el('div', { class: 'mj-session-head' }, [
    el('a', { class: 'mj-session-back', href: '#mj/sessions', text: '← Timeline' }),
    el('div', { class: 'mj-session-head-main' }, [
      el('h2', { class: 'mj-session-title', text: sessionDisplay(session) }),
      el('span', { class: `mj-status mj-status--${session.statut}`, text: session.statut === 'en_cours' ? '🎲 en cours' : meta.label }),
      el('button', {
        class: 'btn btn-sm btn-ghost', type: 'button', text: '✎ Éditer',
        onclick: () => openSessionForm({ session, onSave: rerender }),
      }),
    ]),
    dates && el('p', { class: 'mj-card-meta', text: dates }),
    el('div', { class: 'mj-session-cycle' }, [
      session.statut === 'preparation' && el('button', {
        class: 'btn btn-gold', type: 'button', text: '▶ Démarrer la session',
        onclick: () => startSession(session, rerender),
      }),
      session.statut === 'en_cours' && el('button', {
        class: 'btn btn-gold', type: 'button', text: '■ Clore la session',
        onclick: () => openCloseoutWizard(session, { onDone: rerender }),
      }),
      session.statut === 'terminee' && el('button', {
        class: 'btn btn-sm btn-ghost', type: 'button', text: 'Rouvrir',
        title: 'Repasser la session en cours (pour la continuer ou compléter son journal)',
        onclick: async () => {
          const current = getActiveSession();
          if(current){ toast(`« ${sessionLabel(current)} » est déjà en cours`, { icon: '⚠️' }); return; }
          session.statut = 'en_cours';
          touch('session', session.id);
          commit('session:reopen');
          rerender();
        },
      }),
    ]),
  ]));

  /* --- Onglets : l'onglet ouvert suit le statut de la session --- */
  const TABS = [
    ['preparation', '🧰 Préparation'],
    ['journal', '📖 Journal'],
    ['recap', '✅ Récap'],
  ];
  let tab = session.statut === 'preparation' ? 'preparation' : session.statut === 'en_cours' ? 'journal' : 'recap';

  const tabBar = el('div', { class: 'mj-session-tabs', role: 'tablist' });
  const panel = el('div', { class: 'mj-session-panel' });
  container.append(tabBar, panel);

  function select(key){
    tab = key;
    tabBar.replaceChildren(...TABS.map(([k, label]) =>
      el('button', {
        class: `mj-session-tab${k === tab ? ' is-active' : ''}`, type: 'button',
        role: 'tab', 'aria-selected': k === tab ? 'true' : 'false', text: label,
        onclick: () => select(k),
      })
    ));
    panel.replaceChildren();
    if(tab === 'preparation') renderPreparation(panel, campaign, session, rerender);
    else if(tab === 'journal') renderJournal(panel, campaign, session, rerender);
    else renderRecap(panel, campaign, session, rerender);
  }
  select(tab);
}

function startSession(session, rerender){
  const current = getActiveSession();
  if(current && current.id !== session.id){
    toast(`« ${sessionLabel(current)} » est déjà en cours — clôturez-la d'abord`, { icon: '⚠️' });
    return;
  }
  session.statut = 'en_cours';
  if(!session.datePrevue) session.datePrevue = new Date().toISOString().slice(0, 10);
  touch('session', session.id);
  commit('session:start');
  toast('Session démarrée — bon jeu !', { icon: '🎲' });
  rerender();
}

/* ------------------------------- Préparation ------------------------------- */

function renderPreparation(panel, campaign, session, rerender){
  const readonly = session.statut === 'terminee';

  /* --- Éléments en suspens des sessions précédentes --- */
  const suspens = [];
  for(const s of campaign.sessions){
    if(s.id === session.id || (s.numero || 0) >= (session.numero || 0)) continue;
    for(const ev of s.log) if(ev.tag === 'suspens') suspens.push({ s, ev });
  }
  if(suspens.length && !readonly){
    panel.append(el('section', { class: 'mj-session-section mj-suspens' }, [
      el('h3', { text: `⏳ En suspens (${suspens.length})` }),
      ...suspens.map(({ s, ev }) => el('div', { class: 'mj-suspens-row' }, [
        el('span', { class: 'mj-suspens-texte', html: `${renderRichInline(ev.texte)} <em class="mj-suspens-origine">— S${s.numero}</em>` }),
        el('button', {
          class: 'btn btn-sm btn-ghost', type: 'button', text: '↪ À l’ordre du jour',
          onclick: () => {
            session.ordreDuJour = `${session.ordreDuJour ? `${session.ordreDuJour}\n` : ''}• ${ev.texte}`;
            commit('session:update');
            rerender();
          },
        }),
        el('button', {
          class: 'btn btn-sm btn-ghost', type: 'button', text: '✓ Résolu',
          onclick: () => { ev.tag = 'note'; commit('session:update'); rerender(); },
        }),
      ])),
    ]));
  }

  /* --- Ordre du jour --- */
  panel.append(el('section', { class: 'mj-session-section' }, [
    el('h3', { text: '🗒️ Ordre du jour' }),
    editableText({
      get: () => session.ordreDuJour,
      set: (v) => { session.ordreDuJour = v; touch('session', session.id); commit('session:update'); },
      placeholder: readonly ? 'Aucun ordre du jour.' : '+ Noter le déroulé prévu (scènes, accroches, ambiance…)',
      readonly,
    }),
  ]));

  /* --- Le plateau : références vers les entités de la campagne --- */
  const previous = [...campaign.sessions]
    .filter(s => s.id !== session.id && (s.numero || 0) < (session.numero || 0))
    .sort((a, b) => (b.numero || 0) - (a.numero || 0))[0];
  const plateau = el('section', { class: 'mj-session-section' }, [
    el('div', { class: 'mj-session-section-head' }, [
      el('h3', { text: '🎬 Le plateau' }),
      previous && !readonly && el('button', {
        class: 'btn btn-sm btn-ghost', type: 'button', text: `↩ Reprendre le plateau de la S${previous.numero}`,
        onclick: () => {
          for(const key of [...ROSTER_GROUPS.map(g => g.key), 'pjs'])
            session.roster[key] = [...new Set([...session.roster[key], ...previous.roster[key]])];
          touch('session', session.id);
          commit('session:update');
          rerender();
        },
      }),
    ]),
    el('div', { class: 'mj-roster-grid' }, ROSTER_GROUPS.map(g => rosterGroupBox(session, g, readonly, rerender))),
  ]);
  panel.append(plateau);

  /* --- Les PJ présents et leurs objectifs --- */
  const pjs = rosterEntities(session, 'pjs');
  panel.append(el('section', { class: 'mj-session-section' }, [
    el('div', { class: 'mj-session-section-head' }, [
      el('h3', { text: `🧙 Joueurs présents (${pjs.length})` }),
      !readonly && el('button', {
        class: 'btn btn-sm btn-ghost', type: 'button', text: '+ Gérer',
        onclick: () => openRosterPicker(session, 'pjs', rerender),
      }),
    ]),
    pjs.length
      ? el('div', { class: 'mj-pj-prep-list' }, pjs.map(pj => el('div', { class: 'mj-pj-prep' }, [
          el('p', { class: 'mj-pj-prep-nom', html: `${wikiLinkHTML('pj', pj.id, pj.nom)}${pj.joueur ? ` <em>(${wikiSafe(pj.joueur)})</em>` : ''}` }),
          ...pj.objectifs.filter(o => o.statut === 'en_cours').map(o =>
            el('p', { class: 'mj-pj-prep-objectif', html: `🎯 ${renderRichInline(o.texte)}` })),
        ])))
      : el('p', { class: 'mj-empty', html: campaign.pjs.length
          ? 'Personne au plateau — ajoutez les joueurs présents avec « + Gérer ».'
          : 'Le groupe est vide : créez les personnages joueurs dans l’onglet <a href="#mj/joueurs">Joueurs</a> (ou via « + Gérer »).' }),
  ]));
}

function rosterGroupBox(session, group, readonly, rerender){
  const items = rosterEntities(session, group.key);
  return el('div', { class: 'mj-roster-box' }, [
    el('div', { class: 'mj-roster-box-head' }, [
      el('h4', { text: `${group.icon} ${group.label}` }),
      !readonly && el('button', {
        class: 'btn btn-sm btn-ghost', type: 'button', text: '+ Ajouter',
        onclick: () => openRosterPicker(session, group.key, rerender),
      }),
    ]),
    items.length
      ? el('div', { class: 'mj-roster-items' }, items.map(it => {
          const type = typeForGroup(group.key, it);
          const dead = group.key === 'creatures' && it.etat?.statut && it.etat.statut !== 'vivant';
          return el('span', { class: 'mj-roster-chip' }, [
            el('span', { html: `${dead ? `${etatIcon(it.etat.statut)} ` : ''}${wikiLinkHTML(type, it.id, entityName(it))}` }),
            !readonly && el('button', {
              class: 'mj-chip-x', type: 'button', 'aria-label': `Retirer ${entityName(it)}`, text: '✕',
              onclick: () => {
                session.roster[group.key] = session.roster[group.key].filter(x => x !== it.id);
                commit('session:update');
                rerender();
              },
            }),
          ]);
        }))
      : el('p', { class: 'mj-empty', text: '—' }),
  ]);
}

const etatIcon = (statut) => ETAT_STATUTS.find(s => s.key === statut)?.icon || '';

/** Sélecteur d'entités de la campagne pour un groupe du plateau. */
function openRosterPicker(session, groupKey, rerender){
  const campaign = getActiveCampaign();
  const group = ROSTER_GROUPS.find(g => g.key === groupKey) || { icon: '🧙', label: 'Joueurs présents' };
  const items = () => campaign[groupKey === 'creatures' ? 'creatures' : groupKey] || [];
  const selected = new Set(session.roster[groupKey]);

  const search = el('input', { class: 'input', type: 'search', placeholder: 'Filtrer…' });
  const list = el('div', { class: 'mj-picker-list mj-roster-picker-list' });
  const refreshList = () => {
    const q = norm(search.value.trim());
    const filtered = items().filter(it => !q || norm(entityName(it)).includes(q));
    list.replaceChildren(...(filtered.length ? filtered.map(it => {
      const cb = el('input', { type: 'checkbox', value: it.id });
      cb.checked = selected.has(it.id);
      cb.addEventListener('change', () => cb.checked ? selected.add(it.id) : selected.delete(it.id));
      const extra = groupKey === 'creatures' ? ` (${it.kind === 'pnj' ? 'PNJ' : 'Monstre'})`
        : groupKey === 'pjs' && it.joueur ? ` (${it.joueur})` : '';
      return el('label', { class: 'mj-picker-item' }, [cb, el('span', { text: `${entityName(it)}${extra}` })]);
    }) : [el('p', { class: 'mj-empty', text: 'Rien de ce type dans le classeur pour l’instant.' })]));
  };
  search.addEventListener('input', refreshList);
  refreshList();

  const form = el('form', { class: 'mj-form' }, [
    search, list,
    groupKey === 'pjs' && el('button', {
      class: 'btn btn-sm btn-ghost', type: 'button', text: '+ Nouveau personnage joueur',
      onclick: () => openPjForm({ onSave: (pj) => { selected.add(pj.id); refreshList(); } }),
    }),
    el('div', { class: 'mj-form-actions' }, [el('button', { class: 'btn btn-primary', type: 'submit', text: 'Mettre au plateau' })]),
  ]);
  const modal = openModal({ title: `${group.icon} ${group.label} — plateau de la session`, node: form, className: 'modal-mj-form' });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    session.roster[groupKey] = [...selected];
    touch('session', session.id);
    commit('session:update');
    modal.close();
    rerender();
  });
  setTimeout(() => search.focus(), 60);
}

/* --------------------------------- Journal --------------------------------- */

function renderJournal(panel, campaign, session, rerender){
  if(session.statut === 'preparation'){
    panel.append(el('div', { class: 'mj-hint' }, [
      el('p', { text: 'Le journal s’ouvre quand la session démarre : chaque événement noté pendant la partie construira l’historique des PNJ, des lieux et des joueurs.' }),
      el('button', { class: 'btn btn-sm btn-gold', type: 'button', text: '▶ Démarrer la session', onclick: () => startSession(session, rerender) }),
    ]));
    return;
  }
  const live = session.statut === 'en_cours';

  const logList = el('div', { class: 'mj-log-list' });
  const refreshLog = () => {
    logList.replaceChildren(...(session.log.length
      ? session.log.map(ev => logRow(session, ev, live, refreshLog))
      : [el('p', { class: 'mj-empty', text: live ? 'Rien encore — notez ce qui compte, en une ligne à la fois.' : 'Journal vide.' })]));
    if(live) logList.scrollTop = logList.scrollHeight;
  };
  refreshLog();

  // Le journal peut être nourri de l'extérieur (« Consigner » du tracker) :
  // on suit les commits tant que la liste est à l'écran, puis on se désabonne.
  const unsub = subscribe((event) => {
    if(event !== 'session:log') return;
    if(!logList.isConnected){ unsub(); return; }
    refreshLog();
  });

  /* --- Saisie rapide : une ligne, Entrée, et l'événement s'attache tout seul
         aux entités citées (via l'index du wiki) --- */
  let inputForm = null;
  if(live){
    const tagSelect = el('select', { class: 'select mj-log-tag-select', 'aria-label': 'Tag de l’événement' },
      LOG_TAGS.map(t => el('option', { value: t.key, text: `${t.icon} ${t.label}` })));
    const texteInput = el('input', {
      class: 'input', type: 'text',
      placeholder: 'Noter un événement… (les noms connus s’attacheront aux fiches)',
      'aria-label': 'Nouvel événement',
    });
    inputForm = el('form', { class: 'mj-log-input' }, [
      tagSelect, texteInput,
      el('button', { class: 'btn btn-sm btn-primary', type: 'submit', text: 'Noter' }),
    ]);
    inputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const texte = texteInput.value.trim();
      if(!texte) return;
      texteInput.value = '';
      session.log.push(createLogEvent({ texte, tag: tagSelect.value, refs: detectRefs(texte) }));
      touch('session', session.id);
      commit('session:log');
      refreshLog();
      texteInput.focus();
    });
  }

  /* --- Colonne plateau : tout le nécessaire de la partie à portée de clic --- */
  const plateauCol = el('aside', { class: 'mj-live-plateau' }, [
    el('h3', { text: '🎬 Plateau' }),
    ...ROSTER_GROUPS.map(g => {
      const items = rosterEntities(session, g.key);
      if(!items.length) return null;
      return el('div', { class: 'mj-live-group' }, [
        el('h4', { text: `${g.icon} ${g.label}` }),
        ...items.map(it => {
          const type = typeForGroup(g.key, it);
          const dead = g.key === 'creatures' && it.etat?.statut && it.etat.statut !== 'vivant';
          return el('p', { class: 'mj-live-item' }, [
            el('span', { html: `${dead ? `${etatIcon(it.etat.statut)} ` : ''}${wikiLinkHTML(type, it.id, entityName(it))}` }),
            g.key === 'encounters' && live && el('button', {
              class: 'btn btn-sm btn-gold', type: 'button', text: '⚔',
              title: 'Lancer le combat', onclick: () => openTracker(it),
            }),
          ]);
        }),
      ]);
    }),
    (() => {
      const pjs = rosterEntities(session, 'pjs');
      return pjs.length ? el('div', { class: 'mj-live-group' }, [
        el('h4', { text: '🧙 Joueurs' }),
        ...pjs.map(pj => el('p', { class: 'mj-live-item', html: wikiLinkHTML('pj', pj.id, pj.nom) })),
      ]) : null;
    })(),
    !ROSTER_GROUPS.some(g => session.roster[g.key].length) && !session.roster.pjs.length
      ? el('p', { class: 'mj-empty', text: 'Plateau vide — préparez-le dans l’onglet Préparation.' })
      : null,
  ]);

  panel.append(el('div', { class: 'mj-session-live' }, [
    el('div', { class: 'mj-live-journal' }, [logList, inputForm]),
    plateauCol,
  ]));
}

function logRow(session, ev, live, refreshLog){
  const t = tagMeta(ev.tag);
  const texteSpan = el('span', { class: 'mj-log-texte', html: renderRichInline(ev.texte) });
  const row = el('div', { class: `mj-log-row is-tag-${ev.tag}` }, [
    el('span', { class: 'mj-log-time', text: fmtTime(ev.at) }),
    el('span', { class: 'mj-log-tag', 'aria-label': t.label, text: t.icon }),
    texteSpan,
    live && el('button', {
      class: 'icon-btn mj-log-del', type: 'button', 'aria-label': 'Supprimer l’événement',
      html: '<svg class="icon"><use href="#i-trash"/></svg>',
      onclick: () => {
        session.log = session.log.filter(x => x.id !== ev.id);
        commit('session:log');
        refreshLog();
      },
    }),
  ]);
  if(live){
    // Édition au clic sur le texte (hors liens wiki) ; les refs se recalculent.
    texteSpan.addEventListener('click', (e) => {
      if(e.target.closest('.wiki-link')) return;
      const input = el('input', { class: 'input mj-log-edit', type: 'text' });
      input.value = ev.texte;
      const done = () => {
        const v = input.value.trim();
        if(v && v !== ev.texte){ ev.texte = v; ev.refs = detectRefs(v); commit('session:log'); }
        refreshLog();
      };
      input.addEventListener('blur', done);
      input.addEventListener('keydown', (k) => { if(k.key === 'Enter'){ k.preventDefault(); input.blur(); } });
      texteSpan.replaceWith(input);
      input.focus();
    });
  }
  return row;
}

/* ---------------------------------- Récap ---------------------------------- */

function renderRecap(panel, campaign, session, rerender){
  if(session.statut !== 'terminee'){
    panel.append(el('p', { class: 'mj-hint', html:
      'Le récap et les conséquences se remplissent à la <strong>clôture</strong> de la session '
      + '(bouton « ■ Clore la session ») — vous pouvez déjà prendre des notes ici.' }));
  }

  panel.append(el('section', { class: 'mj-session-section' }, [
    el('div', { class: 'mj-session-section-head' }, [
      el('h3', { text: '📜 Récap' }),
      session.recap && el('button', {
        class: 'btn btn-sm btn-ghost', type: 'button', text: '📋 Copier pour les joueurs',
        onclick: async () => {
          const md = `# ${sessionLabel(session)} (session ${session.numero})\n`
            + (session.datePrevue ? `*${fmtDate(session.datePrevue)}${session.dateMonde ? ` — ${session.dateMonde}` : ''}*\n` : '')
            + `\n${session.recap}\n`;
          try { await navigator.clipboard.writeText(md); toast('Récap copié (markdown) — collez-le à vos joueurs', { icon: '📋' }); }
          catch { toast('Copie impossible dans ce navigateur', { icon: '⚠️' }); }
        },
      }),
    ]),
    editableText({
      get: () => session.recap,
      set: (v) => { session.recap = v; touch('session', session.id); commit('session:update'); },
      placeholder: '+ Rédiger le récap de la session',
      rows: 8,
    }),
  ]));

  panel.append(el('section', { class: 'mj-session-section' }, [
    el('h3', { text: `🔁 Conséquences appliquées à la campagne (${session.consequences.length})` }),
    session.consequences.length
      ? el('ul', { class: 'mj-ref-list' }, session.consequences.map(c => {
          const target = c.refType ? findEntity(c.refType, c.refId) : null;
          const who = target
            ? (c.refType === 'session' ? sessionLabel(target) : entityName(target))
            : null;
          return el('li', { html: `${who ? `${wikiLinkHTML(c.refType, c.refId, who)} — ` : ''}${renderRichInline(c.resume)}` });
        }))
      : el('p', { class: 'mj-empty', text: 'Aucune conséquence enregistrée pour l’instant.' }),
  ]));
}

/* -------------------------------- Utilitaires ------------------------------ */

const excerpt = (s, n = 140) => {
  const t = (s || '').trim();
  return t.length > n ? `${t.slice(0, n)}…` : t;
};

const wikiSafe = escapeHtml;

/**
 * Bloc de texte enrichi (markdown-lite + liens wiki), éditable au clic — même
 * esprit que la synthèse des boîtes d'idées (pas d'attribut title : il
 * survivrait mal aux re-rendus).
 */
function editableText({ get, set, placeholder, rows = 4, readonly = false }){
  const wrap = el('div', { class: 'mj-editable' });
  const edit = () => {
    const ta = el('textarea', { class: 'input mj-editable-edit', rows });
    ta.value = get();
    let saved = false;
    const done = () => {
      if(saved) return;
      saved = true;
      set(ta.value.trim());
      render();
    };
    // La barre de mise en forme fait partie de l'éditeur : on ne sauve que
    // quand le focus sort de l'ensemble, pas au clic sur un de ses boutons.
    const editor = richEditor(ta);
    editor.addEventListener('focusout', (e) => {
      if(editor.contains(e.relatedTarget)) return;
      done();
    });
    ta.addEventListener('keydown', (e) => { if(e.key === 'Escape'){ e.stopPropagation(); done(); } });
    wrap.replaceChildren(editor);
    ta.focus();
  };
  const render = () => {
    const value = get();
    if(readonly){
      wrap.replaceChildren(value
        ? el('div', { class: 'mj-editable-text is-readonly', html: renderRich(value) })
        : el('p', { class: 'mj-empty', text: placeholder }));
      return;
    }
    if(value){
      const p = el('div', { class: 'mj-editable-text', html: renderRich(value) });
      p.addEventListener('click', (e) => { if(!e.target.closest('.wiki-link')) edit(); });
      wrap.replaceChildren(p);
    } else {
      wrap.replaceChildren(el('button', { class: 'btn btn-sm btn-ghost', type: 'button', text: placeholder, onclick: edit }));
    }
  };
  render();
  return wrap;
}
