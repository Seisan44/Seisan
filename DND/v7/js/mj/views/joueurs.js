// Personnages joueurs : le groupe au niveau campagne. Chaque PJ peut pointer
// vers une fiche du Grimoire (stockage local du site, propriété du joueur —
// un lien, jamais une copie) et porte la couche MJ : objectifs suivis de
// session en session, notes secrètes. Les objectifs se résolvent normalement
// à la clôture des sessions (closeout.js).

import { el, escapeHtml } from '../../utils.js';
import { confirmDialog } from '../../ui.js';
import { getActiveCampaign, deleteEntity, findEntity, sessionDisplay } from '../store.js';
import { OBJECTIF_STATUTS } from '../schema.js';
import { openEntityModal } from '../wiki.js';
import { renderRichInline, stripMarks } from '../richtext.js';
import { openPjForm } from '../forms.js';
import { getCharacter } from '../../character/storage.js';

export function renderJoueurs(container){
  const campaign = getActiveCampaign();

  container.append(el('div', { class: 'mj-toolbar' }, [
    el('button', { class: 'btn btn-primary btn-sm', type: 'button', text: '+ Nouveau personnage joueur', onclick: () => openPjForm({ onSave: refresh }) }),
  ]));
  const grid = el('div', { class: 'mj-pj-grid' });
  container.append(grid);

  function refresh(){
    grid.replaceChildren(...(campaign.pjs.length ? campaign.pjs.map(card) : [
      el('p', { class: 'mj-empty', html:
        'Le groupe est vide. Ajoutez les héros de vos joueurs : la campagne ne garde qu’un <strong>lien</strong> vers leur fiche '
        + '(<a href="#personnages">Mes personnages</a>) et y ajoute la couche MJ — objectifs et notes secrètes.' }),
    ]));
  }

  function card(pj){
    const hero = pj.characterId ? getCharacter(pj.characterId) : null;
    const sub = [
      pj.classe || (hero ? `Niv. ${hero.level ?? '?'}` : ''),
      pj.joueur ? `joué par ${pj.joueur}` : '',
    ].filter(Boolean).join(' · ');

    const objectifLine = (o) => {
      const meta = OBJECTIF_STATUTS.find(s => s.key === o.statut);
      const s = findEntity('session', o.sessionId);
      return el('li', { class: `mj-pj-objectif is-${o.statut}`, html:
        `<span class="mj-status mj-objectif--${o.statut}">${escapeHtml(meta?.label ?? o.statut)}</span> ${renderRichInline(o.texte)}`
        + (s ? ` <em class="mj-suspens-origine">(${escapeHtml(sessionDisplay(s))})</em>` : '') });
    };

    return el('article', { class: 'mj-card mj-pj-card' }, [
      el('div', { class: 'mj-card-body' }, [
        el('div', { class: 'mj-card-head' }, [
          el('span', { class: 'chip mj-tag-pnj', text: 'PJ' }),
          el('h3', { text: pj.nom }),
        ]),
        sub && el('p', { class: 'mj-card-meta', text: sub }),
        pj.objectifs.length
          ? el('ul', { class: 'mj-pj-objectifs' }, pj.objectifs.map(objectifLine))
          : el('p', { class: 'mj-card-meta', text: '🎯 Aucun objectif suivi pour l’instant.' }),
        pj.notesMJ && el('p', { class: 'mj-card-meta mj-pj-notes', html: `🤫 ${renderRichInline(stripMarks(pj.notesMJ))}` }),
        el('div', { class: 'mj-card-actions' }, [
          el('button', { class: 'btn btn-sm btn-ghost', type: 'button', text: 'Fiche', onclick: () => openEntityModal('pj', pj.id) }),
          el('button', { class: 'btn btn-sm btn-ghost', type: 'button', text: 'Éditer', onclick: () => openPjForm({ pj, onSave: refresh }) }),
          hero && el('a', { class: 'btn btn-sm btn-ghost', href: '#personnages', text: '📜 Fiche de perso' }),
          el('button', {
            class: 'icon-btn', type: 'button', 'aria-label': `Retirer ${pj.nom}`,
            html: '<svg class="icon"><use href="#i-trash"/></svg>',
            onclick: async () => {
              if(await confirmDialog({
                title: 'Retirer du groupe', danger: true, confirmLabel: 'Retirer',
                message: `« ${pj.nom} » sera retiré de la campagne et des sessions. Sa fiche de personnage (si elle existe) n’est pas touchée.`,
              })){ deleteEntity('pj', pj.id); refresh(); }
            },
          }),
        ]),
      ]),
    ]);
  }

  refresh();
}
