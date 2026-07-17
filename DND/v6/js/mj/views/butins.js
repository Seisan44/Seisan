// Butins & Conteneurs : base générique et flexible. Un même « butin » peut
// être un objet, un groupe de monnaies ou un conteneur composé d'autres butins.

import { el } from '../../utils.js';
import { confirmDialog } from '../../ui.js';
import { BUTIN_TYPES } from '../schema.js';
import { getActiveCampaign, deleteEntity, findEntity, entityName } from '../store.js';
import { openEntityModal, wikiLinkHTML } from '../wiki.js';
import { openButinForm } from '../forms.js';

const TYPE_ICON = { objet: '🗡️', monnaie: '🪙', conteneur: '📦' };

export function renderButins(container){
  const campaign = getActiveCampaign();
  let filter = 'tous';

  const pills = el('div', { class: 'pill-row' });
  container.append(
    el('div', { class: 'mj-toolbar' }, [
      el('button', { class: 'btn btn-primary btn-sm', type: 'button', text: '+ Nouveau butin / conteneur', onclick: () => openButinForm({ onSave: refresh }) }),
      pills,
    ]),
  );
  const list = el('div', { class: 'mj-butin-list' });
  container.append(list);

  function refresh(){
    pills.replaceChildren(
      pillBtn('tous', 'Tous'),
      ...BUTIN_TYPES.map(t => pillBtn(t.key, t.label)),
    );
    const butins = campaign.butins.filter(b => filter === 'tous' || b.type === filter);
    list.replaceChildren(...(butins.length ? butins.map(row) : [
      el('p', { class: 'mj-empty', text: 'Aucun butin. Créez une épée, une bourse de pièces ou un coffre rempli de trésors.' }),
    ]));
  }

  function pillBtn(key, label){
    return el('button', {
      class: `pill${filter === key ? ' is-active' : ''}`, type: 'button', text: label,
      onclick: () => { filter = key; refresh(); },
    });
  }

  function row(b){
    const val = b.valeur ? ['po', 'pa', 'pc'].filter(k => b.valeur[k]).map(k => `${b.valeur[k]} ${k}`).join(', ') : '';
    const contenu = b.contenu.map(id => {
      const t = findEntity('butin', id);
      return t ? wikiLinkHTML('butin', id, entityName(t)) : '<em>?</em>';
    }).join(', ');
    return el('article', { class: 'mj-butin-row' }, [
      el('span', { class: 'mj-butin-icon', text: TYPE_ICON[b.type] || '❔' }),
      el('div', { class: 'mj-butin-main' }, [
        el('strong', { text: b.nom + (b.quantite > 1 ? ` ×${b.quantite}` : '') }),
        el('span', { class: 'mj-card-meta', text: `${b.type}${val ? ` · ${val}` : ''}` }),
        contenu && el('p', { class: 'mj-butin-contenu', html: `Contient : ${contenu}` }),
      ]),
      el('div', { class: 'mj-card-actions' }, [
        el('button', { class: 'btn btn-sm btn-ghost', type: 'button', text: 'Fiche', onclick: () => openEntityModal('butin', b.id) }),
        el('button', { class: 'btn btn-sm btn-ghost', type: 'button', text: 'Éditer', onclick: () => openButinForm({ butin: b, onSave: refresh }) }),
        el('button', {
          class: 'icon-btn', type: 'button', 'aria-label': `Supprimer ${b.nom}`,
          html: '<svg class="icon"><use href="#i-trash"/></svg>',
          onclick: async () => {
            if(await confirmDialog({
              title: 'Supprimer', danger: true, confirmLabel: 'Supprimer',
              message: `« ${b.nom} » sera retiré des inventaires, conteneurs, rencontres et cartes qui l'utilisent.`,
            })){
              deleteEntity('butin', b.id);
              refresh();
            }
          },
        }),
      ]),
    ]);
  }

  refresh();
}
