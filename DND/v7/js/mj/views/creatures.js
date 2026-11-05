// Monstres & PNJ de la campagne : liste filtrable, fiches, édition,
// gestion d'inventaire (butins portés) et suppression avec nettoyage des refs.

import { el } from '../../utils.js';
import { confirmDialog } from '../../ui.js';
import { getActiveCampaign, deleteEntity } from '../store.js';
import { ETAT_STATUTS } from '../schema.js';
import { openEntityModal } from '../wiki.js';
import { openCreatureForm, openInventoryForm } from '../forms.js';

export function renderCreatures(container){
  const campaign = getActiveCampaign();
  let filter = 'tous'; // tous | pnj | monstre

  const pills = el('div', { class: 'pill-row' });
  const toolbar = el('div', { class: 'mj-toolbar' }, [
    el('button', { class: 'btn btn-primary btn-sm', type: 'button', text: '+ Nouveau PNJ', onclick: () => openCreatureForm({ kind: 'pnj', onSave: refresh }) }),
    el('button', { class: 'btn btn-primary btn-sm', type: 'button', text: '+ Nouveau monstre', onclick: () => openCreatureForm({ kind: 'monstre', onSave: refresh }) }),
    el('a', { class: 'btn btn-ghost btn-sm', href: '#mj/bestiaire', text: 'Ajouter depuis le bestiaire' }),
    pills,
  ]);
  const grid = el('div', { class: 'mj-creature-grid' });
  container.append(toolbar, grid);

  const FILTERS = [['tous', 'Tous'], ['pnj', 'PNJ'], ['monstre', 'Monstres']];

  function refresh(){
    pills.replaceChildren(...FILTERS.map(([key, label]) =>
      el('button', {
        class: `pill${filter === key ? ' is-active' : ''}`, type: 'button', text: label,
        onclick: () => { filter = key; refresh(); },
      })
    ));

    const creatures = campaign.creatures.filter(c => filter === 'tous' || c.kind === filter);
    grid.replaceChildren(...(creatures.length ? creatures.map(card) : [
      el('p', { class: 'mj-empty', text: 'Aucune créature. Créez un PNJ, un monstre, ou piochez dans le bestiaire global.' }),
    ]));
  }

  function card(cr){
    const isPnj = cr.kind === 'pnj';
    const sub = isPnj
      ? (cr.role || 'PNJ') + (cr.statBlock ? ' · peut combattre' : ' · narratif')
      : `FP ${cr.statBlock?.fp || '—'} · ${cr.statBlock?.pv || '—'} PV`;
    // L'état vivant (mis à jour par la clôture des sessions) se voit d'un
    // coup d'œil : badge si le statut a changé, lieu et attitude en méta.
    const etatMeta = cr.etat?.statut && cr.etat.statut !== 'vivant'
      ? ETAT_STATUTS.find(s => s.key === cr.etat.statut) : null;
    const etatBits = [cr.etat?.attitude, cr.etat?.lieu ? `📍 ${cr.etat.lieu}` : ''].filter(Boolean).join(' · ');
    return el('article', { class: `mj-card mj-creature-card${etatMeta ? ` is-etat-${cr.etat.statut}` : ''}` }, [
      cr.image && el('img', { src: cr.image, alt: '', loading: 'lazy', onerror: (e) => e.target.remove() }),
      el('div', { class: 'mj-card-body' }, [
        el('div', { class: 'mj-card-head' }, [
          el('span', { class: `chip ${isPnj ? 'mj-tag-pnj' : 'mj-tag-encounter'}`, text: isPnj ? 'PNJ' : 'Monstre' }),
          el('h3', { text: cr.nom }),
          etatMeta && el('span', { class: `mj-etat mj-etat--${cr.etat.statut}`, text: `${etatMeta.icon} ${etatMeta.label}`.trim() }),
        ]),
        el('p', { class: 'mj-card-meta', text: sub }),
        etatBits ? el('p', { class: 'mj-card-meta', text: etatBits }) : null,
        cr.inventaire.length ? el('p', { class: 'mj-card-meta', text: `🎒 ${cr.inventaire.length} butin(s)` }) : null,
        el('div', { class: 'mj-card-actions' }, [
          el('button', { class: 'btn btn-sm btn-ghost', type: 'button', text: 'Fiche', onclick: () => openEntityModal(cr.kind, cr.id) }),
          el('button', { class: 'btn btn-sm btn-ghost', type: 'button', text: 'Éditer', onclick: () => openCreatureForm({ creature: cr, onSave: refresh }) }),
          el('button', { class: 'btn btn-sm btn-ghost', type: 'button', text: 'Inventaire', onclick: () => { openInventoryForm(cr); } }),
          el('button', {
            class: 'icon-btn', type: 'button', 'aria-label': `Supprimer ${cr.nom}`,
            html: '<svg class="icon"><use href="#i-trash"/></svg>',
            onclick: async () => {
              if(await confirmDialog({
                title: 'Supprimer', danger: true, confirmLabel: 'Supprimer',
                message: `« ${cr.nom} » sera retiré de la campagne, des rencontres et des marqueurs de cartes.`,
              })){
                deleteEntity(cr.kind, cr.id);
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
