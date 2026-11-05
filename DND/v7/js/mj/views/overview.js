// Vue d'ensemble : la page d'accueil des outils du MJ. Création rapide,
// compteurs par outil et derniers éléments touchés — tout est cliquable.

import { el, escapeHtml } from '../../utils.js';
import { navigate } from '../../router.js';
import {
  getActiveCampaign, getActiveSession, isAtelier, findEntity, entityName,
  sessionDisplay, sessionLabel, nextSessionNumber,
} from '../store.js';
import { wikify, wikiLinkHTML } from '../wiki.js';
import { stripMarks } from '../richtext.js';
import { openCreatureForm, openEncounterForm, openLoreForm, openButinForm, openMapForm, openSessionForm, openPjForm } from '../forms.js';
import { promoteAtelierDialog } from './campagnes.js';

function fmtRelative(iso){
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if(mins < 1) return 'à l’instant';
  if(mins < 60) return `il y a ${mins} min`;
  const hours = Math.round(mins / 60);
  if(hours < 24) return `il y a ${hours} h`;
  const days = Math.round(hours / 24);
  if(days === 1) return 'hier';
  if(days < 30) return `il y a ${days} j`;
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

const RECENT_LABELS = { pnj: 'PNJ', monstre: 'Monstre', butin: 'Butin', encounter: 'Rencontre', lore: 'Lore', map: 'Carte', idea: 'Boîte d’idées', session: 'Session', pj: 'PJ' };

// Extrait court d'un texte mis en forme : syntaxe retirée avant la coupe.
const excerptOf = (s, n = 200) => {
  const t = stripMarks(s || '').trim();
  return t.length > n ? `${t.slice(0, n)}…` : t;
};

export function renderOverview(container){
  const campaign = getActiveCampaign();
  const rerender = () => navigate('mj', 'apercu');

  /* --- L'Atelier se présente (et se transforme en campagne) --- */
  if(isAtelier()){
    container.append(el('div', { class: 'mj-hint mj-atelier-hint' }, [
      el('p', { html: 'Vous travaillez dans l’<strong>Atelier</strong> : le classeur sans campagne. Idées, PNJ, cartes… tout se crée ici librement, et quand le projet mûrit, transformez-le en campagne d’un clic (rien n’est copié, rien n’est perdu).' }),
      el('button', { class: 'btn btn-sm btn-gold', type: 'button', text: '📖 Transformer l’Atelier en campagne', onclick: () => promoteAtelierDialog(rerender) }),
    ]));
  }

  /* --- La session : reprendre celle en cours, ou préparer la prochaine --- */
  const current = getActiveSession();
  const prepared = !current && [...campaign.sessions]
    .filter(s => s.statut === 'preparation')
    .sort((a, b) => (a.numero || 0) - (b.numero || 0))[0];
  const lastDone = [...campaign.sessions]
    .filter(s => s.statut === 'terminee' && s.recap)
    .sort((a, b) => (b.numero || 0) - (a.numero || 0))[0];
  container.append(el('section', { class: 'mj-overview-section mj-overview-session' }, [
    el('h2', { text: 'La session' }),
    current
      ? el('div', { class: 'mj-hint mj-session-live-hint' }, [
          el('p', { html: `🎲 <strong>${escapeHtml(sessionDisplay(current))}</strong> est en cours — ${current.log.length} événement(s) au journal.` }),
          el('button', { class: 'btn btn-sm btn-gold', type: 'button', text: '▶ Reprendre la session', onclick: () => navigate('mj', 'sessions', current.id) }),
        ])
      : prepared
        ? el('div', { class: 'mj-hint' }, [
            el('p', { html: `📅 <strong>${escapeHtml(sessionDisplay(prepared))}</strong> est en préparation${prepared.datePrevue ? ` (prévue le ${new Date(`${prepared.datePrevue}T12:00:00`).toLocaleDateString('fr-FR')})` : ''}.` }),
            el('button', { class: 'btn btn-sm btn-primary', type: 'button', text: 'Ouvrir la préparation', onclick: () => navigate('mj', 'sessions', prepared.id) }),
          ])
        : el('div', { class: 'mj-hint' }, [
            el('p', { text: 'Aucune session en chantier : préparez la prochaine — le plateau, l’ordre du jour, puis en jeu le journal fera l’historique tout seul.' }),
            el('button', { class: 'btn btn-sm btn-primary', type: 'button', text: `+ Préparer la session ${nextSessionNumber()}`, onclick: () => openSessionForm({ onSave: (s) => navigate('mj', 'sessions', s.id) }) }),
          ]),
    lastDone && el('p', { class: 'mj-overview-lastrecap', html:
      `<strong>Dernier récap</strong> (${wikiLinkHTML('session', lastDone.id, sessionLabel(lastDone))}) : ${wikify(excerptOf(lastDone.recap))}` }),
  ]));

  /* --- Création rapide --- */
  const quick = (text, onclick) => el('button', { class: 'btn btn-sm btn-ghost', type: 'button', text, onclick });
  container.append(el('section', { class: 'mj-overview-section' }, [
    el('h2', { text: 'Création rapide' }),
    el('div', { class: 'mj-toolbar' }, [
      quick('💡 Boîte d’idées', () => navigate('mj', 'brainstorm')),
      quick('🎭 PNJ', () => openCreatureForm({ kind: 'pnj', onSave: rerender })),
      quick('🐉 Monstre', () => openCreatureForm({ kind: 'monstre', onSave: rerender })),
      quick('🧙 PJ', () => openPjForm({ onSave: rerender })),
      quick('⚔️ Rencontre', () => openEncounterForm({ onSave: rerender })),
      quick('📜 Note de lore', () => openLoreForm({ onSave: rerender })),
      quick('💰 Butin', () => openButinForm({ onSave: rerender })),
      quick('🗺️ Carte', () => openMapForm({ onSave: (m) => navigate('mj', 'maps', m.id) })),
    ]),
  ]));

  /* --- Le classeur en chiffres --- */
  const pnj = campaign.creatures.filter(c => c.kind === 'pnj').length;
  const monstres = campaign.creatures.length - pnj;
  const stats = [
    { icon: '📅', n: campaign.sessions.length, label: 'sessions', href: '#mj/sessions' },
    { icon: '🧙', n: campaign.pjs.length, label: 'PJ', href: '#mj/joueurs' },
    { icon: '💡', n: campaign.ideas.length, label: 'boîtes d’idées', href: '#mj/brainstorm' },
    { icon: '📜', n: campaign.lore.length, label: 'notes de lore', href: '#mj/lore' },
    { icon: '🎭', n: pnj, label: 'PNJ', href: '#mj/creatures' },
    { icon: '🐉', n: monstres, label: 'monstres', href: '#mj/creatures' },
    { icon: '💰', n: campaign.butins.length, label: 'butins', href: '#mj/butins' },
    { icon: '⚔️', n: campaign.encounters.length, label: 'rencontres', href: '#mj/encounters' },
    { icon: '🗺️', n: campaign.maps.length, label: 'cartes', href: '#mj/maps' },
  ];
  container.append(el('section', { class: 'mj-overview-section' }, [
    el('h2', { text: isAtelier() ? 'L’Atelier en chiffres' : 'La campagne en chiffres' }),
    el('div', { class: 'mj-stat-grid' }, stats.map(s =>
      el('a', { class: 'mj-stat-card', href: s.href }, [
        el('span', { class: 'mj-stat-icon', text: s.icon }),
        el('strong', { class: 'mj-stat-n', text: String(s.n) }),
        el('span', { class: 'mj-stat-label', text: s.label }),
      ])
    )),
  ]));

  /* --- Modifiés récemment --- */
  const recents = (campaign.recent || [])
    .map(r => ({ ...r, entity: findEntity(r.type, r.id) }))
    .filter(r => r.entity);
  container.append(el('section', { class: 'mj-overview-section' }, [
    el('h2', { text: 'Modifiés récemment' }),
    recents.length
      ? el('div', { class: 'mj-recent-list' }, recents.map(r =>
          el('div', { class: 'mj-recent-row' }, [
            el('span', { class: 'mj-recent-type', text: RECENT_LABELS[r.type] || r.type }),
            el('span', { class: 'mj-recent-name', html: wikiLinkHTML(r.type, r.id, r.type === 'session' ? sessionDisplay(r.entity) : (entityName(r.entity) || 'Boîte d’idées')) }),
            el('span', { class: 'mj-recent-when', text: fmtRelative(r.at) }),
          ])
        ))
      : el('p', { class: 'mj-empty', html: `Encore rien ici — lancez-vous avec la création rapide ci-dessus, ou piochez un monstre dans le <a href="#mj/bestiaire">bestiaire</a>.` }),
  ]));
}
