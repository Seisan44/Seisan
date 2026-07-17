// Formulaires de la section MJ, tous ouverts dans la modale existante du site.
// Chaque formulaire sert trois portes d'entrée : l'onglet dédié, la « création
// à la volée » (depuis une rencontre, une carte, un inventaire) et le bouton
// « Finaliser » du brainstorming — d'où les paramètres prefill/onSave.

import { el, escapeHtml, abilityMod, fmtMod } from '../utils.js';
import { openModal, toast } from '../ui.js';
import {
  createCreature, createStatBlock, createButin, createEncounter,
  createMap, createLoreNote, createPin, createSession, createPj, createObjectif,
  BUTIN_TYPES, PIN_TYPES, ABILITIES, OBJECTIF_STATUTS,
} from './schema.js';
import { getActiveCampaign, commit, touch, entityName, nextSessionNumber, sessionLabel } from './store.js';
import { richEditor } from './richtext.js';
import { generateNpcName } from './namegen.js';
import { fileToDataURL } from './io.js';
import { listCharacters } from '../character/storage.js';

/* ------------------------------ Petits helpers ---------------------------- */

const textInput = (value = '', attrs = {}) => {
  const i = el('input', { class: 'input', type: 'text', ...attrs });
  i.value = value ?? '';
  return i;
};
const numInput = (value = 0, attrs = {}) => {
  const i = el('input', { class: 'input', type: 'number', ...attrs });
  i.value = value ?? 0;
  return i;
};
const textArea = (value = '', attrs = {}) => {
  const t = el('textarea', { class: 'input', rows: 4, ...attrs });
  t.value = value ?? '';
  return t;
};
const selectInput = (options, value, attrs = {}) => {
  const s = el('select', { class: 'select', ...attrs },
    options.map(o => el('option', { value: o.value, text: o.label })));
  if(value != null) s.value = value;
  return s;
};
const field = (label, control) => el('div', { class: 'mj-field' }, [
  el('label', { class: 'field-label', text: label }), control,
]);
const submitRow = (label = 'Enregistrer') => el('div', { class: 'mj-form-actions' }, [
  el('button', { class: 'btn btn-primary', type: 'submit', text: label }),
]);

function requireCampaign(){
  const c = getActiveCampaign();
  if(!c) toast('Ouvrez d’abord une campagne', { icon: '⚠️' });
  return c;
}

/* Sélecteur d'image -> Base64 avec aperçu et bouton de retrait. */
function imagePicker(current, maxDim = 512){
  let value = current ?? null;
  const preview = el('img', { class: 'mj-img-preview', alt: '' });
  const clearBtn = el('button', { class: 'btn btn-sm btn-ghost', type: 'button', text: 'Retirer l’image' });
  const fileInput = el('input', { class: 'input', type: 'file', accept: 'image/*' });
  const refresh = () => {
    preview.src = value || '';
    preview.classList.toggle('hidden', !value);
    clearBtn.classList.toggle('hidden', !value);
  };
  fileInput.addEventListener('change', async () => {
    const f = fileInput.files[0];
    if(!f) return;
    try { value = await fileToDataURL(f, maxDim, 0.82); refresh(); }
    catch { toast('Image illisible', { icon: '⚠️' }); }
  });
  clearBtn.addEventListener('click', () => { value = null; fileInput.value = ''; refresh(); });
  refresh();
  return { node: el('div', { class: 'mj-img-picker' }, [fileInput, preview, clearBtn]), get: () => value };
}

/* Éditeur de liste {nom, texte} (traits, actions d'un stat block). */
function namedTextListEditor(title, items = []){
  const rows = [];
  const list = el('div', { class: 'mj-list-editor' });
  const addRow = (nom = '', texte = '') => {
    const nomInput = textInput(nom, { placeholder: 'Nom' });
    const texteInput = textArea(texte, { rows: 2, placeholder: 'Description' });
    const row = el('div', { class: 'mj-list-editor-row' }, [
      nomInput, texteInput,
      el('button', {
        class: 'icon-btn', type: 'button', 'aria-label': 'Retirer',
        html: '<svg class="icon"><use href="#i-trash"/></svg>',
        onclick: () => { rows.splice(rows.indexOf(entry), 1); row.remove(); },
      }),
    ]);
    const entry = { nomInput, texteInput };
    rows.push(entry);
    list.append(row);
  };
  for(const it of items) addRow(it.nom, it.texte);
  const node = el('div', { class: 'mj-field' }, [
    el('label', { class: 'field-label', text: title }),
    list,
    el('button', { class: 'btn btn-sm btn-ghost', type: 'button', text: `+ Ajouter (${title.toLowerCase()})`, onclick: () => addRow() }),
  ]);
  return {
    node,
    get: () => rows.map(r => ({ nom: r.nomInput.value.trim(), texte: r.texteInput.value.trim() })).filter(a => a.nom),
  };
}

/* Sélecteur multiple de butins (cases à cocher) + création à la volée. */
function butinPicker(selectedIds = [], { excludeId = null } = {}){
  const selected = new Set(selectedIds);
  const list = el('div', { class: 'mj-picker-list' });
  const refresh = () => {
    const c = getActiveCampaign();
    const butins = (c?.butins || []).filter(b => b.id !== excludeId);
    list.replaceChildren(
      butins.length
        ? el('div', {}, butins.map(b => {
            const cb = el('input', { type: 'checkbox', value: b.id });
            cb.checked = selected.has(b.id);
            cb.addEventListener('change', () => cb.checked ? selected.add(b.id) : selected.delete(b.id));
            return el('label', { class: 'mj-picker-item' }, [cb, el('span', { text: `${b.nom} (${b.type})` })]);
          }))
        : el('p', { class: 'mj-empty', text: 'Aucun butin dans la campagne pour l’instant.' })
    );
  };
  refresh();
  const node = el('div', {}, [
    list,
    el('button', {
      class: 'btn btn-sm btn-ghost', type: 'button', text: '+ Créer un butin/conteneur',
      onclick: () => openButinForm({ onSave: (b) => { selected.add(b.id); refresh(); } }),
    }),
  ]);
  return { node, get: () => [...selected] };
}

/* ------------------------------ Monstre / PNJ ----------------------------- */

export function openCreatureForm({ creature = null, kind = 'pnj', prefill = {}, onSave } = {}){
  const campaign = requireCampaign();
  if(!campaign) return;
  const editing = !!creature;
  const base = creature ?? createCreature({ kind, ...prefill });
  const isPnj = base.kind === 'pnj';

  const nomInput = textInput(base.nom, { required: true, placeholder: isPnj ? 'Garrick le Silencieux' : 'Gobelin balafré' });
  const nomRow = el('div', { class: 'mj-form-row' }, [
    nomInput,
    isPnj && el('button', {
      class: 'icon-btn', type: 'button', title: 'Générer un nom',
      html: '<svg class="icon"><use href="#i-d20"/></svg>',
      onclick: () => { nomInput.value = generateNpcName(); },
    }),
  ]);
  const roleInput = textInput(base.role, { placeholder: 'Tavernier, allié réticent…' });
  const descInput = textArea(base.description);
  const img = imagePicker(base.image);

  /* --- Bloc de statistiques optionnel --- */
  const sb = base.statBlock;
  const sbToggle = el('input', { type: 'checkbox' });
  sbToggle.checked = !!sb || (!editing && !isPnj);
  const sbFields = {
    ca: textInput(sb?.ca ?? '10'), pv: textInput(sb?.pv ?? '10'),
    vitesse: textInput(sb?.vitesse ?? '9 m'), initiative: textInput(sb?.initiative ?? '+0'),
    fp: textInput(sb?.fp ?? ''),
    competences: textInput(sb?.competences ?? ''), sens: textInput(sb?.sens ?? ''), langues: textInput(sb?.langues ?? ''),
  };
  const abInputs = {};
  const abGrid = el('div', { class: 'mj-ab-grid' }, ABILITIES.map(ab => {
    abInputs[ab] = numInput(sb?.caracteristiques?.[ab]?.valeur ?? 10, { min: 1, max: 30 });
    return el('div', { class: 'mj-ab-cell' }, [el('label', { class: 'field-label', text: ab }), abInputs[ab]]);
  }));
  const traits = namedTextListEditor('Traits', sb?.traits ?? []);
  const actions = namedTextListEditor('Actions', sb?.actions ?? []);

  const sbBox = el('div', { class: 'mj-sb-editor' }, [
    el('div', { class: 'mj-form-grid' }, [
      field('CA', sbFields.ca), field('PV', sbFields.pv), field('Vitesse', sbFields.vitesse),
      field('Initiative', sbFields.initiative), field('FP', sbFields.fp),
    ]),
    abGrid,
    el('div', { class: 'mj-form-grid' }, [
      field('Compétences', sbFields.competences), field('Sens', sbFields.sens), field('Langues', sbFields.langues),
    ]),
    traits.node,
    actions.node,
  ]);
  const syncSbBox = () => sbBox.classList.toggle('hidden', !sbToggle.checked);
  sbToggle.addEventListener('change', syncSbBox);
  syncSbBox();

  function readStatBlock(){
    if(!sbToggle.checked) return null;
    // On repart du bloc existant pour préserver ce que le formulaire n'édite
    // pas (actions bonus, réactions, actions légendaires venues du bestiaire).
    const out = createStatBlock(sb ? structuredClone(sb) : {});
    for(const k of Object.keys(sbFields)) out[k] = sbFields[k].value.trim();
    for(const ab of ABILITIES){
      const valeur = parseInt(abInputs[ab].value, 10) || 10;
      const old = sb?.caracteristiques?.[ab];
      if(old && old.valeur === valeur){
        out.caracteristiques[ab] = { ...old };  // JdS d'origine conservés
      } else {
        const mod = fmtMod(abilityMod(valeur));
        out.caracteristiques[ab] = { valeur, mod, jds: mod };
      }
    }
    out.traits = traits.get();
    out.actions = actions.get();
    return out;
  }

  const form = el('form', { class: 'mj-form' }, [
    field('Nom', nomRow),
    isPnj && field('Rôle', roleInput),
    field('Description', richEditor(descInput)),
    field('Image (optionnelle)', img.node),
    el('label', { class: 'mj-check' }, [sbToggle, el('span', { text: ' Bloc de statistiques (peut combattre)' })]),
    sbBox,
    submitRow(editing ? 'Enregistrer' : 'Créer'),
  ]);

  const modal = openModal({
    title: editing ? `Éditer — ${escapeHtml(base.nom)}` : (isPnj ? 'Nouveau PNJ' : 'Nouveau monstre'),
    node: form, className: 'modal-mj-form',
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    base.nom = nomInput.value.trim();
    base.role = isPnj ? roleInput.value.trim() : base.role;
    base.description = descInput.value.trim();
    base.image = img.get();
    base.statBlock = readStatBlock();
    if(!editing) campaign.creatures.push(base);
    touch(base.kind, base.id);
    commit(editing ? 'creature:update' : 'creature:add');
    modal.close();
    toast(`${base.nom} ${editing ? 'mis à jour' : 'ajouté à la campagne'}`, { icon: isPnj ? '🎭' : '🐉' });
    onSave?.(base);
  });
}

/* ---------------------------- Butin / Conteneur --------------------------- */

export function openButinForm({ butin = null, prefill = {}, onSave } = {}){
  const campaign = requireCampaign();
  if(!campaign) return;
  const editing = !!butin;
  const base = butin ?? createButin(prefill);

  const nomInput = textInput(base.nom, { required: true, placeholder: 'Coffre en bois renforcé' });
  const typeSelect = selectInput(BUTIN_TYPES.map(t => ({ value: t.key, label: t.label })), base.type);
  const qteInput = numInput(base.quantite || 1, { min: 1 });
  const descInput = textArea(base.description, { rows: 3 });
  const po = numInput(base.valeur?.po ?? 0, { min: 0 });
  const pa = numInput(base.valeur?.pa ?? 0, { min: 0 });
  const pc = numInput(base.valeur?.pc ?? 0, { min: 0 });
  const valeurRow = el('div', { class: 'mj-form-grid' }, [field('PO', po), field('PA', pa), field('PC', pc)]);
  const picker = butinPicker(base.contenu, { excludeId: base.id });
  const contenuField = field('Contenu du conteneur', picker.node);

  const syncType = () => {
    valeurRow.classList.toggle('hidden', typeSelect.value !== 'monnaie');
    contenuField.classList.toggle('hidden', typeSelect.value !== 'conteneur');
  };
  typeSelect.addEventListener('change', syncType);
  syncType();

  const form = el('form', { class: 'mj-form' }, [
    field('Nom', nomInput),
    el('div', { class: 'mj-form-grid' }, [field('Type', typeSelect), field('Quantité', qteInput)]),
    valeurRow,
    field('Description', richEditor(descInput)),
    contenuField,
    submitRow(editing ? 'Enregistrer' : 'Créer'),
  ]);

  const modal = openModal({
    title: editing ? `Éditer — ${escapeHtml(base.nom)}` : 'Nouveau butin / conteneur',
    node: form, className: 'modal-mj-form',
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    base.nom = nomInput.value.trim();
    base.type = typeSelect.value;
    base.quantite = Math.max(1, parseInt(qteInput.value, 10) || 1);
    base.description = descInput.value.trim();
    base.valeur = base.type === 'monnaie'
      ? { po: parseInt(po.value, 10) || 0, pa: parseInt(pa.value, 10) || 0, pc: parseInt(pc.value, 10) || 0 }
      : null;
    base.contenu = base.type === 'conteneur' ? picker.get() : [];
    if(!editing) campaign.butins.push(base);
    touch('butin', base.id);
    commit(editing ? 'butin:update' : 'butin:add');
    modal.close();
    toast(`${base.nom} ${editing ? 'mis à jour' : 'créé'}`, { icon: '💰' });
    onSave?.(base);
  });
}

/* -------------------------------- Rencontre ------------------------------- */

/* Lignes participant : créature + quantité, avec création à la volée. */
function participantsEditor(participants = []){
  const rows = [];
  const list = el('div', { class: 'mj-list-editor' });

  const creatureOptions = () => {
    const c = getActiveCampaign();
    return (c?.creatures || []).map(cr => ({ value: cr.id, label: `${cr.nom} (${cr.kind === 'pnj' ? 'PNJ' : 'Monstre'})` }));
  };

  const addRow = (creatureId = null, quantite = 1) => {
    const opts = creatureOptions();
    if(!opts.length){ toast('Créez d’abord une créature (ou ajoutez-en depuis le bestiaire)', { icon: 'ℹ️' }); return; }
    const sel = selectInput(opts, creatureId ?? opts[0].value);
    const qte = numInput(quantite, { min: 1 });
    const row = el('div', { class: 'mj-list-editor-row mj-participant-row' }, [
      sel, el('span', { class: 'mj-x', text: '×' }), qte,
      el('button', {
        class: 'icon-btn', type: 'button', 'aria-label': 'Retirer',
        html: '<svg class="icon"><use href="#i-trash"/></svg>',
        onclick: () => { rows.splice(rows.indexOf(entry), 1); row.remove(); },
      }),
    ]);
    const entry = { sel, qte };
    rows.push(entry);
    list.append(row);
  };
  for(const p of participants) addRow(p.creatureId, p.quantite || 1);

  const node = el('div', {}, [
    list,
    el('div', { class: 'mj-form-row' }, [
      el('button', { class: 'btn btn-sm btn-ghost', type: 'button', text: '+ Ajouter un participant', onclick: () => addRow() }),
      el('button', {
        class: 'btn btn-sm btn-ghost', type: 'button', text: '+ Créer une créature',
        onclick: () => openCreatureForm({ kind: 'monstre', onSave: (cr) => addRow(cr.id, 1) }),
      }),
    ]),
  ]);
  return {
    node,
    get: () => rows.map(r => ({ creatureId: r.sel.value, quantite: Math.max(1, parseInt(r.qte.value, 10) || 1) })),
  };
}

export function openEncounterForm({ encounter = null, prefill = {}, onSave } = {}){
  const campaign = requireCampaign();
  if(!campaign) return;
  const editing = !!encounter;
  const base = encounter ?? createEncounter(prefill);

  const titreInput = textInput(base.titre, { required: true, placeholder: 'Embuscade au pont' });
  const notesInput = textArea(base.notes, { rows: 5, placeholder: 'Déroulé, tactiques, ambiance… (les noms d’entités deviendront des liens)' });
  const participants = participantsEditor(base.participants);
  const butins = butinPicker(base.butins);

  const form = el('form', { class: 'mj-form' }, [
    field('Titre', titreInput),
    field('Notes', richEditor(notesInput)),
    field('Monstres & PNJ', participants.node),
    field('Butins & Conteneurs de la scène', butins.node),
    submitRow(editing ? 'Enregistrer' : 'Créer'),
  ]);

  const modal = openModal({
    title: editing ? `Éditer — ${escapeHtml(base.titre)}` : 'Nouvelle rencontre',
    node: form, className: 'modal-mj-form',
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    base.titre = titreInput.value.trim();
    base.notes = notesInput.value.trim();
    base.participants = participants.get();
    base.butins = butins.get();
    if(!editing) campaign.encounters.push(base);
    touch('encounter', base.id);
    commit(editing ? 'encounter:update' : 'encounter:add');
    modal.close();
    toast(`Rencontre « ${base.titre} » ${editing ? 'mise à jour' : 'créée'}`, { icon: '⚔️' });
    onSave?.(base);
  });
}

/* ---------------------------------- Carte --------------------------------- */

export function openMapForm({ map = null, onSave } = {}){
  const campaign = requireCampaign();
  if(!campaign) return;
  const editing = !!map;
  const base = map ?? createMap();

  const nomInput = textInput(base.nom, { required: true, placeholder: 'Le Val de Karak' });
  const img = imagePicker(base.image, 1600);

  const form = el('form', { class: 'mj-form' }, [
    field('Nom de la carte', nomInput),
    field('Image (redimensionnée et stockée dans la campagne)', img.node),
    submitRow(editing ? 'Enregistrer' : 'Créer'),
  ]);

  const modal = openModal({ title: editing ? `Éditer — ${escapeHtml(base.nom)}` : 'Nouvelle carte', node: form, className: 'modal-mj-form' });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!img.get()){ toast('Choisissez une image de carte', { icon: '⚠️' }); return; }
    base.nom = nomInput.value.trim();
    base.image = img.get();
    if(!editing) campaign.maps.push(base);
    touch('map', base.id);
    commit(editing ? 'map:update' : 'map:add');
    modal.close();
    toast(`Carte « ${base.nom} » ${editing ? 'mise à jour' : 'ajoutée'}`, { icon: '🗺️' });
    onSave?.(base);
  });
}

/* ------------------------------ Marqueur (pin) ----------------------------- */

export function openPinForm({ pin = null, patch = {}, onSave } = {}){
  const campaign = requireCampaign();
  if(!campaign) return;
  const editing = !!pin;
  const base = pin ?? createPin(patch);

  const labelInput = textInput(base.label, { placeholder: 'Libellé (optionnel)' });
  const typeSelect = selectInput(PIN_TYPES.map(t => ({ value: t.key, label: t.label })), base.ref?.type ?? 'encounter');
  const targetWrap = el('div', {});
  let targetSelect = null;

  const listFor = (type) => {
    if(type === 'encounter') return campaign.encounters;
    if(type === 'lore') return campaign.lore;
    if(type === 'butin') return campaign.butins;
    return campaign.creatures.filter(cr => cr.kind === type);
  };
  const refreshTarget = (keepId = null) => {
    const type = typeSelect.value;
    const items = listFor(type);
    if(!items.length){
      targetSelect = null;
      targetWrap.replaceChildren(el('p', { class: 'mj-empty', text: 'Aucun élément de ce type — créez-en un ci-dessous.' }));
      return;
    }
    targetSelect = selectInput(items.map(it => ({ value: it.id, label: entityName(it) })), keepId ?? items[0].id);
    targetWrap.replaceChildren(targetSelect);
  };
  typeSelect.addEventListener('change', () => refreshTarget());
  refreshTarget(base.ref?.id ?? null);

  const createOnTheFly = () => {
    const type = typeSelect.value;
    const after = (entity) => refreshTarget(entity.id);
    if(type === 'encounter') openEncounterForm({ onSave: after });
    else if(type === 'lore') openLoreForm({ onSave: after });
    else if(type === 'butin') openButinForm({ onSave: after });
    else openCreatureForm({ kind: type, onSave: after });
  };

  const form = el('form', { class: 'mj-form' }, [
    field('Libellé', labelInput),
    field('Type d’élément lié', typeSelect),
    field('Élément', targetWrap),
    el('button', { class: 'btn btn-sm btn-ghost', type: 'button', text: '+ Créer cet élément à la volée', onclick: createOnTheFly }),
    submitRow(editing ? 'Enregistrer' : 'Placer le marqueur'),
  ]);

  const modal = openModal({ title: editing ? 'Éditer le marqueur' : 'Nouveau marqueur', node: form, className: 'modal-mj-form' });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!targetSelect){ toast('Le marqueur doit être lié à un élément', { icon: '⚠️' }); return; }
    base.label = labelInput.value.trim();
    base.ref = { type: typeSelect.value, id: targetSelect.value };
    modal.close();
    onSave?.(base); // c'est la vue Carte qui pousse le pin et commit()
  });
}

/* -------------------------------- Note lore -------------------------------- */

export function openLoreForm({ note = null, prefill = {}, onSave } = {}){
  const campaign = requireCampaign();
  if(!campaign) return;
  const editing = !!note;
  const base = note ?? createLoreNote(prefill);

  const titreInput = textInput(base.titre, { required: true, placeholder: 'Le Pacte de Karak' });
  const texteInput = textArea(base.texte, { rows: 7 });

  const form = el('form', { class: 'mj-form' }, [
    field('Titre', titreInput),
    field('Texte', richEditor(texteInput)),
    submitRow(editing ? 'Enregistrer' : 'Créer'),
  ]);
  const modal = openModal({ title: editing ? `Éditer — ${escapeHtml(base.titre)}` : 'Nouvelle note de lore', node: form, className: 'modal-mj-form' });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    base.titre = titreInput.value.trim();
    base.texte = texteInput.value.trim();
    if(!editing) campaign.lore.push(base);
    touch('lore', base.id);
    commit(editing ? 'lore:update' : 'lore:add');
    modal.close();
    onSave?.(base);
  });
}

/* --------------------------------- Session --------------------------------- */

/** Métadonnées d'une session (le plateau et le journal s'éditent dans la vue). */
export function openSessionForm({ session = null, onSave } = {}){
  const campaign = requireCampaign();
  if(!campaign) return;
  const editing = !!session;
  const base = session ?? createSession({ numero: nextSessionNumber() });

  const numeroInput = numInput(base.numero, { min: 1 });
  const titreInput = textInput(base.titre, { placeholder: 'L’embuscade du col (optionnel)' });
  const dateInput = el('input', { class: 'input', type: 'date' });
  dateInput.value = base.datePrevue || '';
  const mondeInput = textInput(base.dateMonde, { placeholder: '12 Mirtul 1492 (optionnel)' });

  const form = el('form', { class: 'mj-form' }, [
    el('div', { class: 'mj-form-grid' }, [field('Numéro', numeroInput), field('Date de la partie', dateInput)]),
    field('Titre', titreInput),
    field('Date dans le monde', mondeInput),
    submitRow(editing ? 'Enregistrer' : 'Préparer la session'),
  ]);

  const modal = openModal({
    title: editing ? `Éditer — ${escapeHtml(sessionLabel(base))}` : 'Nouvelle session',
    node: form, className: 'modal-mj-form',
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    base.numero = Math.max(1, parseInt(numeroInput.value, 10) || base.numero);
    base.titre = titreInput.value.trim();
    base.datePrevue = dateInput.value;
    base.dateMonde = mondeInput.value.trim();
    if(!editing) campaign.sessions.push(base);
    touch('session', base.id);
    commit(editing ? 'session:update' : 'session:add');
    modal.close();
    toast(`${sessionLabel(base)} ${editing ? 'mise à jour' : '— à vous de dresser le plateau'}`, { icon: '📅' });
    onSave?.(base);
  });
}

/* ---------------------------- Personnage joueur ---------------------------- */

export function openPjForm({ pj = null, onSave } = {}){
  const campaign = requireCampaign();
  if(!campaign) return;
  const editing = !!pj;
  const base = pj ?? createPj();

  // Fiches du Grimoire présentes dans ce navigateur : un lien, jamais une copie
  // — la fiche reste la propriété du joueur, la campagne n'ajoute que la couche MJ.
  const heroes = listCharacters();
  const linkSelect = selectInput(
    [{ value: '', label: '— aucune fiche liée —' },
     ...heroes.map(h => ({ value: h.id, label: `${h.name} (niv. ${h.level ?? '?'})` }))],
    base.characterId ?? '');
  const nomInput = textInput(base.nom, { required: true, placeholder: 'Kara' });
  const joueurInput = textInput(base.joueur, { placeholder: 'Marie' });
  const classeInput = textInput(base.classe, { placeholder: 'Barde niv. 3' });
  linkSelect.addEventListener('change', () => {
    const h = heroes.find(x => x.id === linkSelect.value);
    if(h && !nomInput.value.trim()) nomInput.value = h.name;
  });
  const notesInput = textArea(base.notesMJ, { rows: 4, placeholder: 'Secrets, leviers dramatiques… (les noms d’entités deviendront des liens)' });

  /* --- Objectifs : suivis de session en session, résolus à la clôture --- */
  const objRows = [];
  const objList = el('div', { class: 'mj-list-editor' });
  const addObj = (obj = null) => {
    const o = obj ?? createObjectif();
    const texteInput = textInput(o.texte, { placeholder: 'Retrouver son frère disparu' });
    const statutSelect = selectInput(OBJECTIF_STATUTS.map(s => ({ value: s.key, label: s.label })), o.statut);
    const row = el('div', { class: 'mj-list-editor-row mj-objectif-row' }, [
      texteInput, statutSelect,
      el('button', {
        class: 'icon-btn', type: 'button', 'aria-label': 'Retirer',
        html: '<svg class="icon"><use href="#i-trash"/></svg>',
        onclick: () => { objRows.splice(objRows.indexOf(entry), 1); row.remove(); },
      }),
    ]);
    const entry = { o, texteInput, statutSelect };
    objRows.push(entry);
    objList.append(row);
  };
  for(const o of base.objectifs) addObj(o);

  const form = el('form', { class: 'mj-form' }, [
    el('div', { class: 'mj-form-grid' }, [field('Nom du personnage', nomInput), field('Joueur / Joueuse', joueurInput)]),
    el('div', { class: 'mj-form-grid' }, [field('Classe & niveau', classeInput), field('Fiche du Grimoire', linkSelect)]),
    el('div', { class: 'mj-field' }, [
      el('label', { class: 'field-label', text: 'Objectifs' }),
      objList,
      el('button', { class: 'btn btn-sm btn-ghost', type: 'button', text: '+ Ajouter un objectif', onclick: () => addObj() }),
    ]),
    field('Notes du MJ (secrètes)', richEditor(notesInput)),
    submitRow(editing ? 'Enregistrer' : 'Ajouter au groupe'),
  ]);

  const modal = openModal({
    title: editing ? `Éditer — ${escapeHtml(base.nom)}` : 'Nouveau personnage joueur',
    node: form, className: 'modal-mj-form',
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    base.nom = nomInput.value.trim();
    base.joueur = joueurInput.value.trim();
    base.classe = classeInput.value.trim();
    base.characterId = linkSelect.value || null;
    base.notesMJ = notesInput.value.trim();
    base.objectifs = objRows
      .map(r => ({ ...r.o, texte: r.texteInput.value.trim(), statut: r.statutSelect.value }))
      .filter(o => o.texte);
    if(!editing) campaign.pjs.push(base);
    touch('pj', base.id);
    commit(editing ? 'pj:update' : 'pj:add');
    modal.close();
    toast(`${base.nom} ${editing ? 'mis à jour' : 'rejoint le groupe'}`, { icon: '🧙' });
    onSave?.(base);
  });
}

/* ------------------------- Inventaire d'une créature ----------------------- */

export function openInventoryForm(creature){
  if(!requireCampaign()) return;
  const picker = butinPicker(creature.inventaire);
  const form = el('form', { class: 'mj-form' }, [
    field(`Butins portés par ${creature.nom}`, picker.node),
    submitRow('Enregistrer'),
  ]);
  const modal = openModal({ title: `Inventaire — ${escapeHtml(creature.nom)}`, node: form, className: 'modal-mj-form' });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    creature.inventaire = picker.get();
    touch(creature.kind, creature.id);
    commit('creature:inventory');
    modal.close();
    toast('Inventaire mis à jour', { icon: '🎒' });
  });
}
