// Notes de lore : textes libres de la campagne. Leurs titres alimentent le
// wiki (liens automatiques) et elles peuvent être liées aux marqueurs de carte.

import { el } from '../../utils.js';
import { confirmDialog } from '../../ui.js';
import { getActiveCampaign, deleteEntity } from '../store.js';
import { openEntityModal } from '../wiki.js';
import { renderRich } from '../richtext.js';
import { openLoreForm } from '../forms.js';

export function renderLore(container){
  const campaign = getActiveCampaign();

  container.append(el('div', { class: 'mj-toolbar' }, [
    el('button', { class: 'btn btn-primary btn-sm', type: 'button', text: '+ Nouvelle note', onclick: () => openLoreForm({ onSave: refresh }) }),
  ]));
  const list = el('div', { class: 'mj-lore-list' });
  container.append(list);

  function refresh(){
    list.replaceChildren(...(campaign.lore.length ? campaign.lore.map(card) : [
      el('p', { class: 'mj-empty', text: 'Aucune note de lore. Légendes, secrets, histoire du monde : tout se note ici.' }),
    ]));
  }

  function card(note){
    return el('article', { class: 'mj-card mj-lore-card' }, [
      el('div', { class: 'mj-card-body' }, [
        el('h3', { text: note.titre }),
        note.texte && el('div', { class: 'mj-lore-text', html: renderRich(note.texte) }),
        el('div', { class: 'mj-card-actions' }, [
          el('button', { class: 'btn btn-sm btn-ghost', type: 'button', text: 'Fiche', onclick: () => openEntityModal('lore', note.id) }),
          el('button', { class: 'btn btn-sm btn-ghost', type: 'button', text: 'Éditer', onclick: () => openLoreForm({ note, onSave: refresh }) }),
          el('button', {
            class: 'icon-btn', type: 'button', 'aria-label': `Supprimer ${note.titre}`,
            html: '<svg class="icon"><use href="#i-trash"/></svg>',
            onclick: async () => {
              if(await confirmDialog({ title: 'Supprimer la note', message: `« ${note.titre} » ?`, confirmLabel: 'Supprimer', danger: true })){
                deleteEntity('lore', note.id);
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
