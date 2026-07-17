// Brainstorming en « boîtes à idées » : chaque boîte accumule des puces
// (mots-clés jetés en vrac, saisis en place), puis une synthèse rédigée
// assemble ces puces en description, et « Finaliser » convertit la boîte en
// élément réel du jeu (PNJ, rencontre, lore, butin) via le formulaire
// associé, prérempli. Le statut (Vrac → Synthétisé → Finalisé) est déduit.

import { el } from '../../utils.js';
import { confirmDialog } from '../../ui.js';
import { IDEA_TAGS, createIdea } from '../schema.js';
import { getActiveCampaign, commit, touch, findEntity, entityName, deleteEntity } from '../store.js';
import { wikiLinkHTML } from '../wiki.js';
import { renderRich, richEditor } from '../richtext.js';
import { openEncounterForm, openCreatureForm, openButinForm, openLoreForm } from '../forms.js';

const TAG_CLASS = { Encounter: 'mj-tag-encounter', Lore: 'mj-tag-lore', PNJ: 'mj-tag-pnj', Loot: 'mj-tag-loot', Autre: 'mj-tag-autre' };

const STATUTS = [
  { key: 'vrac',       label: 'Vrac' },
  { key: 'synthetise', label: 'Synthétisé' },
  { key: 'finalise',   label: 'Finalisé' },
];

const statusOf = (box) =>
  box.finalizedAs ? 'finalise' : (box.synthese || '').trim() ? 'synthetise' : 'vrac';

export function renderBrainstorm(container){
  const campaign = getActiveCampaign();
  let tagFilter = null;
  let statusFilter = null;

  const filters = el('div', { class: 'mj-toolbar mj-brainstorm-filters' }, [
    el('div', { class: 'pill-row' }, [
      pill('Toutes', () => { tagFilter = null; refresh(); }, () => tagFilter === null),
      ...IDEA_TAGS.map(t => pill(t, () => { tagFilter = t; refresh(); }, () => tagFilter === t)),
    ]),
    el('div', { class: 'pill-row' }, [
      pill('Tous statuts', () => { statusFilter = null; refresh(); }, () => statusFilter === null),
      ...STATUTS.map(s => pill(s.label, () => { statusFilter = s.key; refresh(); }, () => statusFilter === s.key)),
    ]),
  ]);
  const grid = el('div', { class: 'mj-box-grid' });
  container.append(filters, grid);

  function pill(text, onclick, isActive){
    const p = el('button', { class: 'pill', type: 'button', text, onclick });
    p.dataset.pillCheck = '1';
    p._isActive = isActive;
    return p;
  }

  function refresh(){
    for(const p of filters.querySelectorAll('[data-pill-check]')) p.classList.toggle('is-active', p._isActive());

    const boxes = campaign.ideas.filter(b =>
      (!tagFilter || b.tag === tagFilter) && (!statusFilter || statusOf(b) === statusFilter));

    grid.replaceChildren(...[
      ...boxes.map(boxCard),
      newBoxCard(),
      !campaign.ideas.length && el('p', { class: 'mj-hint mj-box-hint', html:
        'Créez une boîte, jetez-y des mots-clés (<kbd>Entrée</kbd> après chaque idée : « gobelin », « cuisiner », « mortel »…), '
        + 'puis rédigez la synthèse qui les assemble en description. Quand elle est mûre, « Finaliser » la transforme en PNJ, rencontre, note de lore ou butin.' }),
    ].filter(Boolean));
  }

  /* ------------------------------ Carte « + » ------------------------------ */

  function newBoxCard(){
    return el('button', {
      class: 'mj-box mj-box-new', type: 'button',
      onclick: () => {
        const box = createIdea();
        campaign.ideas.push(box);
        touch('idea', box.id);
        commit('idea:add');
        refresh();
        // Prêt à taper la première puce sans autre clic.
        grid.querySelector(`[data-box="${box.id}"] .mj-chip-input`)?.focus();
      },
    }, [
      el('span', { class: 'mj-box-new-plus', text: '+' }),
      el('span', { text: 'Nouvelle boîte' }),
    ]);
  }

  /* ------------------------------- Une boîte ------------------------------- */

  function boxCard(box){
    const card = el('article', { class: 'mj-box', dataset: { box: box.id } });
    const rerenderCard = () => card.replaceWith(boxCard(box));

    /* --- En-tête : titre inline + catégorie + suppression --- */
    const titre = el('input', {
      class: 'mj-box-title', type: 'text', placeholder: 'Titre de la boîte…',
      'aria-label': 'Titre de la boîte',
    });
    titre.value = box.titre;
    titre.addEventListener('change', () => {
      box.titre = titre.value.trim();
      touch('idea', box.id);
      commit('idea:update');
    });

    const tagSel = el('select', { class: `mj-box-tag ${TAG_CLASS[box.tag] || ''}`, 'aria-label': 'Catégorie' },
      IDEA_TAGS.map(t => el('option', { value: t, text: t })));
    tagSel.value = box.tag;
    tagSel.addEventListener('change', () => {
      box.tag = tagSel.value;
      commit('idea:update');
      rerenderCard();
    });

    const delBtn = el('button', {
      class: 'icon-btn', type: 'button', 'aria-label': 'Supprimer la boîte',
      html: '<svg class="icon"><use href="#i-trash"/></svg>',
      onclick: async () => {
        if(await confirmDialog({ title: 'Supprimer la boîte', message: `« ${box.titre || box.chips.join(', ') || 'sans titre'} » ?`, confirmLabel: 'Supprimer', danger: true })){
          deleteEntity('idea', box.id);
          refresh();
        }
      },
    });

    /* --- Puces d'idées : saisie en place, retrait, glisser-déposer --- */
    const chipsZone = el('div', { class: 'mj-chips' });

    function renderChips(){
      const input = el('input', {
        class: 'mj-chip-input', type: 'text', placeholder: '+ idée',
        'aria-label': 'Ajouter une idée (Entrée pour valider)',
      });
      const addChip = (refocus) => {
        const v = input.value.trim().replace(/,+$/, '');
        // Vidé immédiatement : le blur déclenché par le remplacement du champ
        // repasse ici et ajouterait la puce une seconde fois sinon.
        input.value = '';
        if(!v) return;
        box.chips.push(v);
        touch('idea', box.id);
        commit('idea:chip');
        renderChips();
        if(refocus) chipsZone.querySelector('.mj-chip-input').focus();
      };
      input.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' || e.key === ','){ e.preventDefault(); addChip(true); }
        else if(e.key === 'Backspace' && !input.value && box.chips.length){
          box.chips.pop();
          commit('idea:chip');
          renderChips();
          chipsZone.querySelector('.mj-chip-input').focus();
        }
      });
      // Quitter le champ valide la puce en cours, sans reprendre le focus
      // (isConnected : le champ a pu être remplacé par renderChips entre-temps).
      input.addEventListener('blur', () => { if(input.isConnected) addChip(false); });

      chipsZone.replaceChildren(
        ...box.chips.map((chip, i) => {
          const c = el('span', { class: 'mj-chip', draggable: 'true' }, [
            el('span', { text: chip }),
            el('button', {
              class: 'mj-chip-x', type: 'button', 'aria-label': `Retirer « ${chip} »`, text: '×',
              onclick: () => { box.chips.splice(i, 1); commit('idea:chip'); renderChips(); },
            }),
          ]);
          c.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', JSON.stringify({ mjChip: true, boxId: box.id, index: i }));
            e.dataTransfer.effectAllowed = 'move';
          });
          return c;
        }),
        input,
      );
    }
    renderChips();

    // Toute la carte accepte le dépôt d'une puce venue d'une autre boîte.
    card.addEventListener('dragover', (e) => { e.preventDefault(); card.classList.add('is-dragover'); });
    card.addEventListener('dragleave', () => card.classList.remove('is-dragover'));
    card.addEventListener('drop', (e) => {
      card.classList.remove('is-dragover');
      let payload;
      try { payload = JSON.parse(e.dataTransfer.getData('text/plain')); } catch { return; }
      if(!payload?.mjChip || payload.boxId === box.id) return;
      e.preventDefault();
      const source = campaign.ideas.find(b => b.id === payload.boxId);
      const [chip] = source?.chips.splice(payload.index, 1) ?? [];
      if(chip == null) return;
      box.chips.push(chip);
      commit('idea:chip');
      refresh();
    });

    /* --- Synthèse : lecture wikifiée, édition au clic --- */
    const synthZone = el('div', { class: 'mj-box-synth' });

    function renderSynth({ editing = false } = {}){
      if(editing){
        const ta = el('textarea', {
          class: 'input mj-box-synth-edit', rows: 4,
          placeholder: box.chips.length
            ? `Assemblez vos idées : ${box.chips.join(', ')}…`
            : 'Assemblez vos idées en une description…',
        });
        ta.value = box.synthese;
        let cancelled = false;
        let saved = false;
        const save = () => {
          if(cancelled || saved) return;
          saved = true;
          box.synthese = ta.value.trim();
          touch('idea', box.id);
          commit('idea:synth');
          rerenderCard();
        };
        // La barre de mise en forme partage l'éditeur : on ne sauve que quand
        // le focus sort de l'ensemble (cliquer un bouton de la barre ne doit
        // pas refermer la synthèse).
        const editor = richEditor(ta);
        editor.addEventListener('focusout', (e) => {
          if(editor.contains(e.relatedTarget)) return;
          save();
        });
        ta.addEventListener('keydown', (e) => {
          if(e.key === 'Enter' && (e.ctrlKey || e.metaKey)) save();
          if(e.key === 'Escape'){ cancelled = true; renderSynth(); }
        });
        synthZone.replaceChildren(editor);
        ta.focus();
        ta.setSelectionRange(ta.value.length, ta.value.length);
        return;
      }
      if(box.synthese){
        const p = el('div', { class: 'mj-box-synth-text', html: renderRich(box.synthese) });
        p.addEventListener('click', (e) => {
          if(e.target.closest('.wiki-link')) return; // les liens wiki restent des liens
          renderSynth({ editing: true });
        });
        synthZone.replaceChildren(p);
      } else {
        synthZone.replaceChildren(el('button', {
          class: 'btn btn-sm btn-ghost mj-box-synth-btn', type: 'button',
          text: '✍ Rédiger la synthèse', onclick: () => renderSynth({ editing: true }),
        }));
      }
    }
    renderSynth();

    /* --- Pied : statut déduit + finalisation --- */
    const status = statusOf(box);
    const target = box.finalizedAs ? findEntity(box.finalizedAs.type, box.finalizedAs.id) : null;

    card.append(
      el('div', { class: 'mj-box-head' }, [titre, tagSel, delBtn]),
      chipsZone,
      synthZone,
      el('div', { class: 'mj-box-foot' }, [
        el('span', { class: `mj-status mj-status--${status}`, text: STATUTS.find(s => s.key === status).label }),
        target
          ? el('span', { class: 'mj-box-final', html: `→ ${wikiLinkHTML(box.finalizedAs.type, box.finalizedAs.id, entityName(target))}` })
          : el('button', { class: 'btn btn-sm btn-gold', type: 'button', text: 'Finaliser', onclick: () => finalize(box) }),
      ]),
    );
    return card;
  }

  // « Finaliser » : ouvre le formulaire correspondant à la catégorie,
  // prérempli avec la synthèse (ou les puces) ; à la validation, la boîte
  // est liée à l'entité créée.
  function finalize(box){
    const titre = box.titre || box.chips.slice(0, 3).join(', ');
    const texte = box.synthese || box.chips.join(', ');
    const done = (type) => (entity) => {
      box.finalizedAs = { type: type === 'creature' ? entity.kind : type, id: entity.id };
      touch('idea', box.id);
      commit('idea:finalize');
      refresh();
    };
    switch(box.tag){
      case 'Encounter':
        openEncounterForm({ prefill: { titre, notes: texte }, onSave: done('encounter') });
        break;
      case 'PNJ':
        openCreatureForm({ kind: 'pnj', prefill: { nom: titre, description: texte }, onSave: done('creature') });
        break;
      case 'Loot':
        openButinForm({ prefill: { nom: titre, description: texte }, onSave: done('butin') });
        break;
      default: // Lore & Autre
        openLoreForm({ prefill: { titre, texte }, onSave: done('lore') });
    }
  }

  refresh();
}
