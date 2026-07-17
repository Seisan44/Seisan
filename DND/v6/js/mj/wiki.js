// Le « Wiki » de campagne : détection automatique des noms d'entités dans les
// textes, rendu en liens interactifs, tooltip au survol (popover existant du
// site) et fiche complète au clic (modale existante du site).

import { el, escapeHtml } from '../utils.js';
import { openPopover, closePopover, openModal, closeTopModal } from '../ui.js';
import { getActiveCampaign, subscribe, findEntity, entityName, sessionDisplay, historyFor } from './store.js';
import { ETAT_STATUTS, SESSION_STATUTS, OBJECTIF_STATUTS } from './schema.js';
import { statblockNode } from './statblock.js';
import { openTracker } from './tracker.js';
// Import circulaire assumé avec richtext.js (qui importe wikify) : les deux
// modules ne s'appellent qu'à l'exécution, jamais au chargement.
import { renderRich, renderRichInline, stripMarks } from './richtext.js';

let pattern = null;       // RegExp unique compilée sur tous les noms connus
let byName = new Map();   // nom minuscule -> { nom, type, id }
let dirty = true;
let hoverAnchor = null;

/* ------------------------------ Index des noms ---------------------------- */

const escapeRegExp = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function rebuild(){
  const c = getActiveCampaign();
  const named = [];
  if(c){
    // Les boîtes d'idées d'abord : à nom égal (boîte finalisée en entité du
    // même nom), l'entité réelle écrase la boîte dans la Map ci-dessous.
    for(const bx of c.ideas)      named.push({ nom: bx.titre, type: 'idea',      id: bx.id });
    for(const cr of c.creatures)  named.push({ nom: cr.nom,  type: cr.kind,      id: cr.id });
    for(const b  of c.butins)     named.push({ nom: b.nom,   type: 'butin',      id: b.id });
    for(const m  of c.maps)       named.push({ nom: m.nom,   type: 'map',        id: m.id });
    for(const e  of c.encounters) named.push({ nom: e.titre, type: 'encounter',  id: e.id });
    for(const n  of c.lore)       named.push({ nom: n.titre, type: 'lore',       id: n.id });
    for(const pj of c.pjs)        named.push({ nom: pj.nom,  type: 'pj',         id: pj.id });
    for(const s  of c.sessions)   named.push({ nom: s.titre, type: 'session',    id: s.id });
  }
  // Noms trop courts écartés (bruit), tri du plus long au plus court :
  // l'alternative regex est gourmande de gauche à droite, donc
  // « Garrick le Silencieux » sera testé avant « Garrick ».
  const usable = named.filter(e => e.nom && e.nom.trim().length >= 3);
  usable.sort((a, b) => b.nom.length - a.nom.length);
  byName = new Map(usable.map(e => [e.nom.toLowerCase(), e]));
  // \b ne connaît pas les lettres accentuées : lookarounds Unicode pour que
  // « Karak » ne matche pas au milieu de « Karakéen ».
  pattern = usable.length
    ? new RegExp(`(?<![\\p{L}\\p{N}])(?:${usable.map(e => escapeRegExp(e.nom)).join('|')})(?![\\p{L}\\p{N}])`, 'giu')
    : null;
  dirty = false;
}

/* -------------------------------- Rendu HTML ------------------------------ */

export function wikiLinkHTML(type, id, label){
  return `<a href="#" class="wiki-link" data-wiki-type="${type}" data-wiki-id="${id}">${escapeHtml(label)}</a>`;
}

/**
 * Transforme un texte brut en HTML sûr où chaque nom d'entité connu devient
 * un lien wiki. À utiliser PARTOUT à la place d'escapeHtml() pour les textes
 * libres de la section MJ. Le texte est découpé en segments et chaque segment
 * passe par escapeHtml individuellement : aucune injection possible.
 */
export function wikify(text){
  if(dirty) rebuild();
  if(!pattern || !text) return escapeHtml(text ?? '');
  let out = '', last = 0;
  for(const m of text.matchAll(pattern)){
    const entity = byName.get(m[0].toLowerCase());
    out += escapeHtml(text.slice(last, m.index));
    out += entity ? wikiLinkHTML(entity.type, entity.id, m[0]) : escapeHtml(m[0]);
    last = m.index + m[0].length;
  }
  return out + escapeHtml(text.slice(last));
}

/**
 * Refs auto-détectées : les entités dont le nom apparaît dans un texte libre.
 * Même index que wikify() — le journal de session s'en sert pour attacher
 * chaque événement, écrit en langage naturel, aux biographies des entités
 * citées (« Garrick trahit le groupe » → ref vers le PNJ Garrick).
 */
export function detectRefs(text){
  if(dirty) rebuild();
  if(!pattern || !text) return [];
  const seen = new Set();
  const out = [];
  for(const m of text.matchAll(pattern)){
    const e = byName.get(m[0].toLowerCase());
    if(!e || seen.has(`${e.type}:${e.id}`)) continue;
    seen.add(`${e.type}:${e.id}`);
    out.push({ type: e.type, id: e.id });
  }
  return out;
}

/* ------------------------- Interactions (délégation) ---------------------- */

export function initWikiListeners(){
  subscribe(() => { dirty = true; });   // toute mutation invalide l'index

  // Délégation unique sur le document : fonctionne aussi dans les modales.
  // Le tooltip s'ouvre en survolant un lien et se referme dès que le pointeur
  // survole autre chose — pas de listeners par lien, pas d'état orphelin.
  document.addEventListener('mouseover', (e) => {
    const link = e.target.closest?.('.wiki-link');
    if(link === hoverAnchor) return;
    if(!link){
      if(hoverAnchor){ hoverAnchor = null; closePopover(); }
      return;
    }
    const entity = resolveLink(link);
    if(!entity) return;
    hoverAnchor = link;
    closePopover(); // neutralise le comportement « toggle même ancre » d'openPopover
    openPopover(link, summaryFor(entity, link.dataset.wikiType));
    // Un tooltip de survol ne doit jamais intercepter le pointeur, sinon il
    // bloque les clics sur ce qu'il recouvre (contrairement aux popovers de
    // glossaire du site, ouverts au clic et interactifs).
    for(const p of document.querySelectorAll('.popover')) p.style.pointerEvents = 'none';
  });

  document.addEventListener('click', (e) => {
    const link = e.target.closest?.('.wiki-link');
    if(!link) return;
    e.preventDefault(); // href="#" : ne surtout pas laisser le routeur naviguer
    const entity = resolveLink(link);
    if(entity) openEntityModal(link.dataset.wikiType, link.dataset.wikiId);
  });
}

function resolveLink(link){
  return findEntity(link.dataset.wikiType, link.dataset.wikiId);
}

export function openEntityModal(type, id){
  const entity = findEntity(type, id);
  if(!entity) return;
  closePopover();
  const sheet = fullSheetFor(entity, type);
  const history = historySection(type, id);
  if(history) sheet.append(history);
  const backlinks = backlinksSection(type, id);
  if(backlinks) sheet.append(backlinks);
  openModal({
    title: escapeHtml(type === 'session' ? sessionDisplay(entity) : (entityName(entity) || 'Boîte d’idées')),
    node: sheet,
    className: 'modal-wiki',
  });
}

/* --------------------------- Tooltip (résumé court) ----------------------- */

// Les tooltips montrent le texte nu : la syntaxe de mise en forme est retirée.
const excerpt = (s, n = 140) => {
  const t = stripMarks(s || '').trim();
  return t.length > n ? `${t.slice(0, n)}…` : t;
};

function fmtValeur(v){
  if(!v) return '';
  return ['po', 'pa', 'pc'].filter(k => v[k]).map(k => `${v[k]} ${k}`).join(', ');
}

const TYPE_LABELS = { pnj: 'PNJ', monstre: 'Monstre', butin: 'Butin', map: 'Carte', encounter: 'Rencontre', lore: 'Lore', idea: 'Boîte d’idées', session: 'Session', pj: 'Personnage joueur' };

/** Ligne d'état d'une créature (💀 Mort · hostile · 📍 lieu) — vide si rien à dire. */
export function etatBadgeHTML(etat){
  if(!etat) return '';
  const bits = [];
  if(etat.statut && etat.statut !== 'vivant'){
    const meta = ETAT_STATUTS.find(s => s.key === etat.statut);
    bits.push(`<span class="mj-etat mj-etat--${escapeHtml(etat.statut)}">${meta?.icon || ''} ${escapeHtml(meta?.label || etat.statut)}</span>`);
  }
  if(etat.attitude) bits.push(escapeHtml(etat.attitude));
  if(etat.lieu) bits.push(`📍 ${escapeHtml(etat.lieu)}`);
  return bits.join(' · ');
}

function summaryFor(entity, type){
  const title = escapeHtml(type === 'session' ? sessionDisplay(entity) : entityName(entity));
  const category = TYPE_LABELS[type] || 'Campagne';

  if(type === 'pnj' || type === 'monstre'){
    const sb = entity.statBlock;
    const img = entity.image ? `<img class="mj-wiki-thumb" src="${entity.image}" alt="" loading="lazy">` : '';
    const stats = sb
      ? `<p><strong>CA</strong> ${escapeHtml(sb.ca ?? '—')} · <strong>PV</strong> ${escapeHtml(sb.pv ?? '—')} · <strong>FP</strong> ${escapeHtml(sb.fp || '—')}</p>`
      : (type === 'pnj' ? `<p><em>${escapeHtml(entity.role || 'PNJ narratif')}</em></p>` : '');
    // L'état est visible PARTOUT où le nom apparaît : une vieille note de lore
    // qui cite un PNJ mort depuis l'affiche d'emblée — cohérence inter-sessions.
    const etat = etatBadgeHTML(entity.etat);
    const etatHTML = etat ? `<p class="mj-wiki-etat">${etat}</p>` : '';
    return { title, category, bodyHTML: `${img}${etatHTML}${stats}<p>${escapeHtml(excerpt(entity.description))}</p>` };
  }
  if(type === 'session'){
    const meta = SESSION_STATUTS.find(s => s.key === entity.statut);
    const counts = `${entity.log.length} évén. · ${entity.consequences.length} conséquence(s)`;
    return {
      title, category: `Session · ${meta?.label ?? entity.statut}`,
      bodyHTML: `<p>${counts}</p><p>${escapeHtml(excerpt(entity.recap || entity.ordreDuJour))}</p>`,
    };
  }
  if(type === 'pj'){
    const enCours = entity.objectifs.filter(o => o.statut === 'en_cours');
    const sub = [entity.classe, entity.joueur ? `joué par ${entity.joueur}` : ''].filter(Boolean).join(' — ');
    return {
      title, category,
      bodyHTML: `${sub ? `<p><em>${escapeHtml(sub)}</em></p>` : ''}`
        + (enCours.length ? `<p>🎯 ${enCours.map(o => escapeHtml(excerpt(o.texte, 60))).join(' · ')}</p>` : '<p>Aucun objectif en cours</p>'),
    };
  }
  if(type === 'butin'){
    const val = fmtValeur(entity.valeur);
    return {
      title, category: `Butin · ${entity.type}`,
      bodyHTML: `<p>${entity.quantite > 1 ? `×${entity.quantite} · ` : ''}${val ? `${escapeHtml(val)} · ` : ''}${escapeHtml(excerpt(entity.description))}</p>`
        + (entity.contenu?.length ? `<p><em>${entity.contenu.length} élément(s) à l'intérieur</em></p>` : ''),
    };
  }
  if(type === 'map'){
    return { title, category, bodyHTML: `${entity.image ? `<img class="mj-wiki-thumb" src="${entity.image}" alt="" loading="lazy">` : ''}<p>${entity.pins.length} marqueur(s)</p>` };
  }
  if(type === 'encounter'){
    const count = entity.participants.reduce((n, p) => n + (p.quantite || 1), 0);
    return { title, category, bodyHTML: `<p>${count} combattant(s) · ${entity.butins.length} butin(s)</p><p>${escapeHtml(excerpt(entity.notes))}</p>` };
  }
  if(type === 'idea'){
    const chips = entity.chips.map(c => escapeHtml(c)).join(' · ');
    return {
      title: title || 'Boîte d’idées', category,
      bodyHTML: `${chips ? `<p>${chips}</p>` : ''}<p>${escapeHtml(excerpt(entity.synthese))}</p>`,
    };
  }
  return { title, category, bodyHTML: `<p>${escapeHtml(excerpt(entity.texte))}</p>` };
}

/* ---------------------------- Fiche complète (clic) ----------------------- */

function refList(title, ids, type){
  if(!ids?.length) return null;
  return el('section', { class: 'mj-sheet-section' }, [
    el('h4', { text: title }),
    el('ul', { class: 'mj-ref-list' }, ids.map(id => {
      const target = findEntity(type, id);
      return el('li', { html: target ? wikiLinkHTML(type, id, entityName(target)) : '<em>référence brisée</em>' });
    })),
  ]);
}

function fullSheetFor(entity, type){
  if(type === 'pnj' || type === 'monstre'){
    const etat = etatBadgeHTML(entity.etat);
    return el('div', { class: 'mj-sheet' }, [
      entity.image && el('img', { class: 'mj-sheet-img', src: entity.image, alt: entity.nom }),
      entity.role && el('p', { class: 'mj-sheet-role', text: entity.role }),
      etat && el('p', { class: 'mj-sheet-etat', html: etat }),
      entity.etat?.note && el('p', { class: 'mj-card-meta', text: `🗒 ${entity.etat.note}` }),
      entity.description && el('div', { class: 'mj-sheet-desc', html: renderRich(entity.description) }),
      entity.statBlock
        ? statblockNode(entity.statBlock)
        : el('p', { class: 'mj-empty', text: 'PNJ narratif — pas de bloc de statistiques.' }),
      refList('Inventaire', entity.inventaire, 'butin'),
    ]);
  }
  if(type === 'session'){
    const meta = SESSION_STATUTS.find(s => s.key === entity.statut);
    return el('div', { class: 'mj-sheet' }, [
      el('p', { class: 'mj-sheet-role', text: [meta?.label ?? entity.statut, entity.dateMonde].filter(Boolean).join(' · ') }),
      (entity.recap || entity.ordreDuJour) && el('div', { class: 'mj-sheet-desc', html: renderRich(entity.recap || entity.ordreDuJour) }),
      el('a', {
        class: 'btn btn-primary', href: `#mj/sessions/${entity.id}`,
        text: 'Ouvrir la session', onclick: () => closeTopModal(),
      }),
    ]);
  }
  if(type === 'pj'){
    const chip = (o) => {
      const meta = OBJECTIF_STATUTS.find(s => s.key === o.statut);
      const s = findEntity('session', o.sessionId);
      return `<span class="mj-status mj-objectif--${o.statut}">${escapeHtml(meta?.label ?? o.statut)}</span> ${renderRichInline(o.texte)}`
        + (s ? ` <em class="mj-suspens-origine">(${escapeHtml(sessionDisplay(s))})</em>` : '');
    };
    return el('div', { class: 'mj-sheet' }, [
      el('p', { class: 'mj-sheet-role', text: [entity.classe, entity.joueur ? `joué par ${entity.joueur}` : ''].filter(Boolean).join(' · ') || 'Personnage joueur' }),
      entity.objectifs.length
        ? el('section', { class: 'mj-sheet-section' }, [
            el('h4', { text: 'Objectifs' }),
            el('ul', { class: 'mj-ref-list' }, entity.objectifs.map(o => el('li', { html: chip(o) }))),
          ])
        : null,
      entity.notesMJ && el('section', { class: 'mj-sheet-section' }, [
        el('h4', { text: 'Notes du MJ (secrètes)' }),
        el('div', { class: 'mj-sheet-desc', html: renderRich(entity.notesMJ) }),
      ]),
    ]);
  }
  if(type === 'butin'){
    return el('div', { class: 'mj-sheet' }, [
      el('p', { class: 'mj-sheet-role', text: `${entity.type}${entity.quantite > 1 ? ` · ×${entity.quantite}` : ''}` }),
      entity.valeur && el('p', { html: `<strong>Valeur :</strong> ${escapeHtml(fmtValeur(entity.valeur) || '—')}` }),
      entity.description && el('div', { class: 'mj-sheet-desc', html: renderRich(entity.description) }),
      refList('Contenu', entity.contenu, 'butin'),
    ]);
  }
  if(type === 'map'){
    return el('div', { class: 'mj-sheet' }, [
      entity.image && el('img', { class: 'mj-sheet-map', src: entity.image, alt: entity.nom }),
      el('p', { text: `${entity.pins.length} marqueur(s) sur cette carte.` }),
      el('a', {
        class: 'btn btn-primary', href: `#mj/maps/${entity.id}`,
        text: 'Ouvrir la carte', onclick: () => closeTopModal(),
      }),
    ]);
  }
  if(type === 'idea'){
    return el('div', { class: 'mj-sheet' }, [
      entity.chips.length
        ? el('div', { class: 'mj-chips mj-chips-readonly' }, entity.chips.map(c => el('span', { class: 'mj-chip', text: c })))
        : null,
      entity.synthese && el('div', { class: 'mj-sheet-desc', html: renderRich(entity.synthese) }),
      el('a', {
        class: 'btn btn-primary', href: '#mj/brainstorm',
        text: 'Ouvrir le brainstorming', onclick: () => closeTopModal(),
      }),
    ]);
  }
  if(type === 'encounter'){
    return el('div', { class: 'mj-sheet' }, [
      entity.notes && el('div', { class: 'mj-sheet-desc', html: renderRich(entity.notes) }),
      entity.participants.length
        ? el('section', { class: 'mj-sheet-section' }, [
            el('h4', { text: 'Participants' }),
            el('ul', { class: 'mj-ref-list' }, entity.participants.map(p => {
              const cr = findEntity('pnj', p.creatureId);
              return el('li', { html: cr ? `${wikiLinkHTML(cr.kind, cr.id, cr.nom)} ×${p.quantite || 1}` : '<em>référence brisée</em>' });
            })),
          ])
        : null,
      refList('Butins & Conteneurs', entity.butins, 'butin'),
      el('button', {
        class: 'btn btn-gold', type: 'button', text: '⚔ Lancer le combat',
        onclick: () => { closeTopModal(); openTracker(entity); },
      }),
    ]);
  }
  // lore
  return el('div', { class: 'mj-sheet' }, [
    el('div', { class: 'mj-sheet-desc', html: renderRich(entity.texte) }),
  ]);
}

/* ---------------------- Historique (« la biographie ») --------------------- */

/**
 * La même donnée que le journal des sessions, vue sous l'angle de l'entité :
 * ce qui lui est arrivé, session par session. Rien n'est stocké deux fois —
 * tout vient de historyFor() (events par refs + conséquences appliquées).
 */
function historySection(type, id){
  if(type === 'session' || type === 'idea') return null;
  const entries = historyFor(type, id);
  if(!entries.length) return null;
  return el('section', { class: 'mj-sheet-section mj-history' }, [
    el('h4', { text: 'Historique — session par session' }),
    ...entries.map(({ session, events, consequences }) => el('div', { class: 'mj-history-block' }, [
      el('p', { class: 'mj-history-session', html: wikiLinkHTML('session', session.id, sessionDisplay(session)) }),
      el('ul', { class: 'mj-ref-list' }, [
        ...events.map(ev => el('li', { html: renderRichInline(ev.texte) })),
        ...consequences.map(c => el('li', { class: 'mj-history-consequence', html: `↳ ${escapeHtml(c.resume)}` })),
      ]),
    ])),
  ]);
}

/* ----------------------- Rétroliens (« Mentionné dans ») ------------------- */

/**
 * Tout ce qui référence une entité : mentions de son nom dans les textes
 * libres, et références structurelles (inventaires, conteneurs, participants,
 * butins de scène, marqueurs de carte, boîtes de brainstorming).
 */
export function backlinksFor(type, id){
  const c = getActiveCampaign();
  const me = findEntity(type, id);
  if(!c || !me) return [];

  const name = (entityName(me) || '').trim();
  const mentionRe = name.length >= 3
    ? new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegExp(name)}(?![\\p{L}\\p{N}])`, 'iu')
    : null;
  const mentions = (text) => !!(mentionRe && text && mentionRe.test(text));

  const found = new Map(); // "type:id" -> { type, id, label, vias[] }
  const add = (t, entity, via) => {
    if(!entity || entity.id === id) return;
    const k = `${t}:${entity.id}`;
    const label = t === 'session' ? sessionDisplay(entity) : (entityName(entity) || 'Boîte d’idées');
    if(!found.has(k)) found.set(k, { type: t, id: entity.id, label, vias: [] });
    const e = found.get(k);
    if(!e.vias.includes(via)) e.vias.push(via);
  };

  for(const cr of c.creatures){
    if(mentions(cr.description)) add(cr.kind, cr, 'mention');
    if(type === 'butin' && cr.inventaire.includes(id)) add(cr.kind, cr, 'inventaire');
  }
  for(const b of c.butins){
    if(mentions(b.description)) add('butin', b, 'mention');
    if(type === 'butin' && b.contenu.includes(id)) add('butin', b, 'contenu');
  }
  for(const e of c.encounters){
    if(mentions(e.notes)) add('encounter', e, 'mention');
    if((type === 'pnj' || type === 'monstre') && e.participants.some(p => p.creatureId === id)) add('encounter', e, 'participant');
    if(type === 'butin' && e.butins.includes(id)) add('encounter', e, 'butin de la scène');
  }
  for(const n of c.lore) if(mentions(n.texte)) add('lore', n, 'mention');
  for(const m of c.maps) if(m.pins.some(p => p.ref?.type === type && p.ref?.id === id)) add('map', m, 'marqueur');
  for(const bx of c.ideas){
    if(mentions(bx.synthese)) add('idea', bx, 'synthèse');
    if(bx.finalizedAs?.type === type && bx.finalizedAs?.id === id) add('idea', bx, 'boîte d’origine');
  }
  for(const pj of c.pjs){
    if(mentions(pj.notesMJ)) add('pj', pj, 'notes MJ');
    if(pj.objectifs.some(o => mentions(o.texte))) add('pj', pj, 'objectif');
  }
  for(const s of c.sessions){
    if(Object.values(s.roster).some(list => Array.isArray(list) && list.includes(id))) add('session', s, 'plateau');
    if(s.log.some(ev => ev.refs?.some(r => r.type === type && r.id === id))) add('session', s, 'journal');
    else if(mentions(s.ordreDuJour) || mentions(s.recap) || s.log.some(ev => mentions(ev.texte))) add('session', s, 'mention');
  }
  return [...found.values()];
}

function backlinksSection(type, id){
  const links = backlinksFor(type, id);
  if(!links.length) return null;
  return el('section', { class: 'mj-sheet-section mj-backlinks' }, [
    el('h4', { text: 'Mentionné dans' }),
    el('ul', { class: 'mj-ref-list' }, links.map(l =>
      el('li', { html: `${wikiLinkHTML(l.type, l.id, l.label)} <span class="mj-backlink-via">${escapeHtml(TYPE_LABELS[l.type] || '')} · ${escapeHtml(l.vias.join(', '))}</span>` })
    )),
  ]);
}
