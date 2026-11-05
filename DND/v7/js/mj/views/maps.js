// Cartes : galerie, upload (Base64), et pose de marqueurs cliquables liés
// aux entités de la campagne (rencontre, PNJ, monstre, lore, butin).

import { el } from '../../utils.js';
import { confirmDialog, toast } from '../../ui.js';
import { navigate } from '../../router.js';
import { getActiveCampaign, commit, findEntity, entityName, deleteEntity } from '../store.js';
import { openEntityModal } from '../wiki.js';
import { openMapForm, openPinForm } from '../forms.js';
import { PIN_TYPES } from '../schema.js';

export function renderMaps(container, params = []){
  const [mapId] = params;
  const campaign = getActiveCampaign();
  const map = mapId ? campaign.maps.find(m => m.id === mapId) : null;
  if(mapId && !map){ navigate('mj', 'maps'); return; }
  map ? renderDetail(container, map) : renderGallery(container);
}

/* --------------------------------- Galerie -------------------------------- */

function renderGallery(container){
  const campaign = getActiveCampaign();

  container.append(el('div', { class: 'mj-toolbar' }, [
    el('button', {
      class: 'btn btn-primary btn-sm', type: 'button', text: '+ Ajouter une carte',
      onclick: () => openMapForm({ onSave: (m) => navigate('mj', 'maps', m.id) }),
    }),
  ]));

  if(!campaign.maps.length){
    container.append(el('p', { class: 'mj-empty', text: 'Aucune carte pour l’instant. Uploadez un plan de donjon, une région, une ville…' }));
    return;
  }

  container.append(el('div', { class: 'mj-map-grid' }, campaign.maps.map(m =>
    el('article', { class: 'mj-card mj-map-card' }, [
      el('a', { href: `#mj/maps/${m.id}`, class: 'mj-map-thumb-link' }, [
        el('img', { src: m.image, alt: m.nom, loading: 'lazy' }),
      ]),
      el('div', { class: 'mj-card-body' }, [
        el('h3', { text: m.nom }),
        el('p', { class: 'mj-card-meta', text: `${m.pins.length} marqueur(s)` }),
        el('div', { class: 'mj-card-actions' }, [
          el('a', { class: 'btn btn-sm btn-primary', href: `#mj/maps/${m.id}`, text: 'Ouvrir' }),
          el('button', { class: 'btn btn-sm btn-ghost', type: 'button', text: 'Éditer', onclick: () => openMapForm({ map: m, onSave: () => navigate('mj', 'maps') }) }),
          el('button', {
            class: 'icon-btn', type: 'button', 'aria-label': `Supprimer ${m.nom}`,
            html: '<svg class="icon"><use href="#i-trash"/></svg>',
            onclick: async () => {
              if(await confirmDialog({ title: 'Supprimer la carte', message: `« ${m.nom} » et ses marqueurs ?`, confirmLabel: 'Supprimer', danger: true })){
                deleteEntity('map', m.id);
                navigate('mj', 'maps');
              }
            },
          }),
        ]),
      ]),
    ])
  )));
}

/* ------------------------------ Détail + pins ----------------------------- */

function renderDetail(container, map){
  let placing = false;

  const placeBtn = el('button', { class: 'btn btn-sm btn-gold', type: 'button', text: '📍 Placer un marqueur' });
  const hint = el('span', { class: 'mj-hint-inline hidden', text: 'Cliquez sur la carte à l’endroit voulu…' });

  const stage = el('div', { class: 'mj-map-stage' }, [
    el('img', { src: map.image, alt: map.nom, draggable: 'false' }),
  ]);

  container.append(
    el('div', { class: 'mj-toolbar' }, [
      el('a', { class: 'btn btn-sm btn-ghost', href: '#mj/maps', html: '← Toutes les cartes' }),
      el('h3', { class: 'mj-map-title', text: map.nom }),
      placeBtn, hint,
    ]),
    stage,
  );
  const pinList = el('div', { class: 'mj-pin-list' });
  container.append(pinList);

  placeBtn.addEventListener('click', () => {
    placing = !placing;
    stage.classList.toggle('is-placing', placing);
    hint.classList.toggle('hidden', !placing);
    placeBtn.classList.toggle('is-active', placing);
  });

  stage.addEventListener('click', (e) => {
    if(!placing || e.target.closest('.mj-pin')) return;
    const rect = stage.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const y = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
    placing = false;
    stage.classList.remove('is-placing');
    hint.classList.add('hidden');
    placeBtn.classList.remove('is-active');
    openPinForm({
      patch: { x, y },
      onSave: (pin) => { map.pins.push(pin); commit('pin:add'); refresh(); },
    });
  });

  function refresh(){
    // Marqueurs sur la carte
    for(const old of stage.querySelectorAll('.mj-pin')) old.remove();
    for(const pin of map.pins){
      const target = pin.ref ? findEntity(pin.ref.type, pin.ref.id) : null;
      const label = pin.label || (target ? entityName(target) : 'Marqueur');
      const btn = el('button', {
        class: `mj-pin mj-pin--${pin.ref?.type || 'autre'}`, type: 'button',
        style: `left:${(pin.x * 100).toFixed(2)}%; top:${(pin.y * 100).toFixed(2)}%;`,
        title: label, 'aria-label': label,
        onclick: () => {
          if(target) openEntityModal(pin.ref.type, pin.ref.id);
          else toast('Ce marqueur pointe vers un élément supprimé', { icon: '⚠️' });
        },
      });
      stage.append(btn);
    }
    // Liste de gestion sous la carte
    pinList.replaceChildren(
      el('h4', { text: `Marqueurs (${map.pins.length})` }),
      ...(map.pins.length ? map.pins.map(pinRow) : [el('p', { class: 'mj-empty', text: 'Aucun marqueur : utilisez « Placer un marqueur » puis cliquez sur la carte.' })])
    );
  }

  function pinRow(pin){
    const target = pin.ref ? findEntity(pin.ref.type, pin.ref.id) : null;
    const typeLabel = PIN_TYPES.find(t => t.key === pin.ref?.type)?.label || '?';
    return el('div', { class: 'mj-pin-row' }, [
      el('span', { class: `mj-pin-dot mj-pin--${pin.ref?.type || 'autre'}` }),
      el('span', { class: 'mj-pin-row-label', text: pin.label || (target ? entityName(target) : 'Référence brisée') }),
      el('span', { class: 'mj-card-meta', text: typeLabel }),
      el('div', { class: 'mj-card-actions' }, [
        target && el('button', { class: 'btn btn-sm btn-ghost', type: 'button', text: 'Fiche', onclick: () => openEntityModal(pin.ref.type, pin.ref.id) }),
        el('button', { class: 'btn btn-sm btn-ghost', type: 'button', text: 'Éditer', onclick: () => openPinForm({ pin, onSave: () => { commit('pin:update'); refresh(); } }) }),
        el('button', {
          class: 'icon-btn', type: 'button', 'aria-label': 'Supprimer le marqueur',
          html: '<svg class="icon"><use href="#i-trash"/></svg>',
          onclick: () => { map.pins = map.pins.filter(p => p !== pin); commit('pin:delete'); refresh(); },
        }),
      ]),
    ]);
  }

  refresh();
}
