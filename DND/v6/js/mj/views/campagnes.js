// Gestion des classeurs : l'Atelier (espace par défaut, transformable en
// campagne) et les campagnes nommées (créer, ouvrir, renommer, exporter,
// importer, supprimer). Les outils eux-mêmes vivent au niveau au-dessus,
// dans la barre latérale — cette page ne gère que les classeurs.

import { el, escapeHtml } from '../../utils.js';
import { openModal, confirmDialog, toast } from '../../ui.js';
import { navigate } from '../../router.js';
import {
  getActiveCampaign, listCampaigns, loadCampaignData, createNewCampaign,
  openCampaign, openAtelier, isAtelier, promoteAtelier, clearAtelier,
  renameCampaign, deleteCampaign, importCampaignData,
} from '../store.js';
import { exportCampaign, importCampaign } from '../io.js';

export async function renderCampagnes(panel){
  const active = getActiveCampaign();
  const all = listCampaigns();
  const atelierEntry = all.find(c => c.builtin);
  const campaigns = all.filter(c => !c.builtin);
  const rerender = () => navigate('mj', 'campagnes');

  panel.append(el('div', { class: 'mj-toolbar' }, [
    el('button', { class: 'btn btn-primary btn-sm', type: 'button', text: '+ Nouvelle campagne', onclick: () => newCampaignDialog(rerender) }),
    el('button', { class: 'btn btn-ghost btn-sm', type: 'button', text: '📥 Importer un .json', onclick: () => doImport(rerender) }),
  ]));

  /* --- L'Atelier --- */
  if(atelierEntry){
    const isActive = active?.id === atelierEntry.id;
    panel.append(el('article', { class: `mj-card mj-classeur-card mj-atelier-card${isActive ? ' is-active' : ''}` }, [
      el('div', { class: 'mj-card-body' }, [
        el('div', { class: 'mj-classeur-head' }, [
          el('h3', { text: '✦ Atelier' }),
          isActive && el('span', { class: 'mj-status mj-status--finalise', text: 'Ouvert' }),
        ]),
        el('p', { class: 'mj-card-meta', text: 'Le classeur sans campagne : brouillons, idées et matériel réutilisable. Il ne se supprime pas — il se vide, ou mûrit en campagne.' }),
        el('div', { class: 'mj-card-actions' }, [
          !isActive && el('button', { class: 'btn btn-sm btn-primary', type: 'button', text: 'Ouvrir', onclick: () => { openAtelier(); rerender(); } }),
          el('button', { class: 'btn btn-sm btn-gold', type: 'button', text: '📖 Transformer en campagne', onclick: () => promoteAtelierDialog(rerender) }),
          el('button', { class: 'btn btn-sm btn-ghost', type: 'button', text: 'Exporter', onclick: () => exportById(atelierEntry.id) }),
          el('button', { class: 'btn btn-sm btn-danger', type: 'button', text: 'Vider', onclick: () => doClearAtelier(rerender) }),
        ]),
      ]),
    ]));
  }

  /* --- Les campagnes --- */
  if(!campaigns.length){
    panel.append(el('p', { class: 'mj-empty', text: 'Aucune campagne nommée pour l’instant : créez-en une, importez un fichier, ou laissez l’Atelier mûrir.' }));
    return;
  }
  panel.append(el('div', { class: 'mj-classeur-grid' }, campaigns.map(c => {
    const isActive = active?.id === c.id;
    return el('article', { class: `mj-card mj-classeur-card${isActive ? ' is-active' : ''}` }, [
      el('div', { class: 'mj-card-body' }, [
        el('div', { class: 'mj-classeur-head' }, [
          el('h3', { text: c.nom }),
          isActive && el('span', { class: 'mj-status mj-status--finalise', text: 'Ouverte' }),
        ]),
        el('p', { class: 'mj-card-meta', text: `Modifiée le ${new Date(c.updatedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}` }),
        el('div', { class: 'mj-card-actions' }, [
          !isActive && el('button', { class: 'btn btn-sm btn-primary', type: 'button', text: 'Ouvrir', onclick: () => { openCampaign(c.id); rerender(); } }),
          isActive && el('button', { class: 'btn btn-sm btn-ghost', type: 'button', text: 'Renommer', onclick: () => renameDialog(getActiveCampaign(), rerender) }),
          el('button', { class: 'btn btn-sm btn-ghost', type: 'button', text: 'Exporter', title: 'Télécharger la campagne en .json', onclick: () => exportById(c.id) }),
          el('button', { class: 'btn btn-sm btn-danger', type: 'button', text: 'Supprimer', onclick: () => doDelete(c, rerender) }),
        ]),
      ]),
    ]);
  })));
}

/* --------------------------------- Dialogues ------------------------------ */

function nameForm({ title, label, placeholder, value = '', submitLabel, onSubmit }){
  const input = el('input', { class: 'input', type: 'text', required: true, placeholder });
  input.value = value;
  const form = el('form', { class: 'mj-form' }, [
    el('label', { class: 'field-label', text: label }),
    input,
    el('div', { class: 'mj-form-actions' }, [el('button', { class: 'btn btn-primary', type: 'submit', text: submitLabel })]),
  ]);
  const modal = openModal({ title, node: form, className: 'modal-mj-form' });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    onSubmit(input.value.trim());
    modal.close();
  });
  setTimeout(() => input.focus(), 60);
}

function newCampaignDialog(rerender){
  nameForm({
    title: 'Nouvelle campagne', label: 'Nom de la campagne',
    placeholder: 'La Malédiction de Karak', submitLabel: 'Créer',
    onSubmit: (nom) => {
      createNewCampaign(nom);
      toast('Campagne créée — bonne préparation !', { icon: '📖' });
      rerender();
    },
  });
}

/** L'Atelier devient une campagne nommée (exporté pour la Vue d'ensemble). */
export function promoteAtelierDialog(rerender){
  nameForm({
    title: 'Transformer l’Atelier en campagne', label: 'Nom de la nouvelle campagne',
    placeholder: 'La Malédiction de Karak', submitLabel: 'Transformer',
    onSubmit: (nom) => {
      if(!isAtelier()) openAtelier();
      promoteAtelier(nom);
      toast(`L’Atelier est devenu « ${nom} » — un Atelier vierge vous attend`, { icon: '📖' });
      rerender();
    },
  });
}

function renameDialog(active, rerender){
  nameForm({
    title: `Renommer — ${escapeHtml(active.nom)}`, label: 'Nouveau nom',
    value: active.nom, submitLabel: 'Renommer',
    onSubmit: (nom) => { renameCampaign(nom); rerender(); },
  });
}

function exportById(id){
  const data = loadCampaignData(id);
  if(!data){ toast('Classeur introuvable dans le stockage local', { icon: '⚠️' }); return; }
  exportCampaign(data);
}

async function doClearAtelier(rerender){
  const ok = await confirmDialog({
    title: 'Vider l’Atelier',
    message: 'Tout le contenu de l’Atelier (idées, PNJ, cartes…) sera définitivement supprimé de ce navigateur. Pensez à exporter avant !',
    confirmLabel: 'Vider', danger: true,
  });
  if(!ok) return;
  if(!isAtelier()) openAtelier();
  clearAtelier();
  toast('Atelier vidé', { icon: '🗑️' });
  rerender();
}

async function doDelete(entry, rerender){
  const ok = await confirmDialog({
    title: 'Supprimer la campagne',
    message: `« ${entry.nom} » et tout son contenu (cartes, PNJ, rencontres…) seront définitivement supprimés de ce navigateur. Pensez à exporter avant !`,
    confirmLabel: 'Supprimer', danger: true,
  });
  if(!ok) return;
  deleteCampaign(entry.id);
  toast('Campagne supprimée', { icon: '🗑️' });
  rerender();
}

async function doImport(rerender){
  let data;
  try { data = await importCampaign(); }
  catch (err) { toast(err.message, { icon: '⚠️', duration: 4200 }); return; }
  if(!data) return;

  const exists = listCampaigns().some(c => c.id === data.id);
  let asCopy = false;
  if(exists){
    const replace = await confirmDialog({
      title: 'Campagne déjà présente',
      message: `« ${data.nom} » existe déjà ici. Remplacer la version locale par le fichier importé ? (Annuler importera une copie indépendante.)`,
      confirmLabel: 'Remplacer', danger: true,
    });
    asCopy = !replace;
  }
  importCampaignData(data, { asCopy });
  toast(`Campagne « ${getActiveCampaign().nom} » importée`, { icon: '📥' });
  rerender();
}
