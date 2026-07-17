// Rencontres : scènes avec notes (wikifiées), participants avec quantité,
// butins associés, et lancement du mini-tracker de combat.

import { el } from '../../utils.js';
import { confirmDialog } from '../../ui.js';
import { getActiveCampaign, deleteEntity, findEntity, entityName } from '../store.js';
import { wikiLinkHTML, openEntityModal } from '../wiki.js';
import { renderRich } from '../richtext.js';
import { openEncounterForm } from '../forms.js';
import { openTracker } from '../tracker.js';

export function renderEncounters(container){
  const campaign = getActiveCampaign();

  container.append(el('div', { class: 'mj-toolbar' }, [
    el('button', { class: 'btn btn-primary btn-sm', type: 'button', text: '+ Nouvelle rencontre', onclick: () => openEncounterForm({ onSave: refresh }) }),
  ]));
  const list = el('div', { class: 'mj-encounter-list' });
  container.append(list);

  function refresh(){
    list.replaceChildren(...(campaign.encounters.length ? campaign.encounters.map(card) : [
      el('p', { class: 'mj-empty', text: 'Aucune rencontre. Préparez vos scènes de combat et d’exploration ici.' }),
    ]));
  }

  function card(enc){
    const participants = enc.participants.map(p => {
      const cr = findEntity('pnj', p.creatureId);
      return cr ? `${wikiLinkHTML(cr.kind, cr.id, cr.nom)}${(p.quantite || 1) > 1 ? ` ×${p.quantite}` : ''}` : '<em>?</em>';
    }).join(' · ');
    const butins = enc.butins.map(id => {
      const b = findEntity('butin', id);
      return b ? wikiLinkHTML('butin', id, entityName(b)) : '<em>?</em>';
    }).join(' · ');

    return el('article', { class: 'mj-card mj-encounter-card' }, [
      el('div', { class: 'mj-card-body' }, [
        el('h3', { text: enc.titre }),
        enc.notes && el('div', { class: 'mj-encounter-notes', html: renderRich(enc.notes) }),
        participants && el('p', { class: 'mj-card-meta', html: `⚔ ${participants}` }),
        butins && el('p', { class: 'mj-card-meta', html: `💰 ${butins}` }),
        el('div', { class: 'mj-card-actions' }, [
          el('button', { class: 'btn btn-sm btn-gold', type: 'button', text: '⚔ Lancer le combat', onclick: () => openTracker(enc) }),
          el('button', { class: 'btn btn-sm btn-ghost', type: 'button', text: 'Fiche', onclick: () => openEntityModal('encounter', enc.id) }),
          el('button', { class: 'btn btn-sm btn-ghost', type: 'button', text: 'Éditer', onclick: () => openEncounterForm({ encounter: enc, onSave: refresh }) }),
          el('button', {
            class: 'icon-btn', type: 'button', 'aria-label': `Supprimer ${enc.titre}`,
            html: '<svg class="icon"><use href="#i-trash"/></svg>',
            onclick: async () => {
              if(await confirmDialog({ title: 'Supprimer la rencontre', message: `« ${enc.titre} » ?`, confirmLabel: 'Supprimer', danger: true })){
                deleteEntity('encounter', enc.id);
                refresh();
              }
            },
          }),
        ]),
      ]),
    ]);
  }

  refresh();
}
