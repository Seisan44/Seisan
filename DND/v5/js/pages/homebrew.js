// Page "Atelier" — gestion et création de contenu homebrew (dons, espèces, classes, objets).
// Chaque onglet gère sa propre grille (voir/modifier/dupliquer/supprimer) et son propre
// formulaire de création en page. Le contenu créé ici est fusionné dans DATA par
// js/character/homebrew.js et apparaît ensuite tel quel sur les pages du compendium.

import { DATA } from '../data.js';
import { escapeHtml } from '../utils.js';
import { enrichHTML } from '../enrich.js';
import { ABILITIES } from '../character/rules.js';
import { ALL_SKILLS } from '../class-traits.js';
import { openModal } from '../modal.js';
import { confirmAction } from '../confirm.js';
import { toast } from '../toast.js';
import { navigate } from '../router.js';
import {
  listHomebrew, getHomebrewEntry, saveHomebrewEntry, deleteHomebrewEntry,
  duplicateHomebrewEntry, refreshHomebrew,
} from '../character/homebrew.js';

const TABS = [
  { key:'traits', storeType:'traits', label:'Dons & traits', icon:'🎗️', createLabel:'un don', emptyLabel:'Aucun don personnalisé pour l’instant.' },
  { key:'especes', storeType:'species', label:'Espèces', icon:'🧬', createLabel:'une espèce', emptyLabel:'Aucune espèce personnalisée pour l’instant.' },
  { key:'classes', storeType:'classes', label:'Classes', icon:'⚔️', createLabel:'une classe', emptyLabel:'Aucune classe personnalisée pour l’instant.' },
  { key:'objets', storeType:'items', label:'Objets', icon:'💰', createLabel:'un objet', emptyLabel:'Aucun objet personnalisé pour l’instant.' },
];
const SIZE_WORDS = { 'TP':'Très petite', 'P':'Petite', 'M':'Moyenne', 'G':'Grande', 'TG':'Très grande' };
const TYPE_DON_LABEL = { general:'Général', style_combat:'Style de combat', origine:'Origine' };
const ITEM_TYPE_LABEL = { arme:'Arme', armure:'Armure', materiel:'Matériel', outil:'Outil', objet_magique:'Objet magique', autre:'Autre' };
const CASTER_GROUPS = [
  { label:'Progression complète', options:['Barde','Clerc','Druide','Ensorceleur','Magicien'] },
  { label:'Demi-progression', options:['Paladin','Rodeur'] },
  { label:'Pacte', options:['Occultiste'] },
];
const GUIDES = {
  traits: {
    title:'Concevoir un don équilibré',
    body:`<ul>
      <li>Distinguez le type : <strong>Général</strong> (accessible à tous), <strong>Style de combat</strong> (lié à une arme/tactique) ou <strong>Origine</strong> (accordé par un historique).</li>
      <li>Un don pèse à peu près comme un <strong>+1 de caractéristique</strong> — évitez d'empiler plusieurs bonus numériques forts sur un seul don.</li>
      <li>Un effet utilisable une fois par repos court/long est presque toujours plus sain qu'un effet illimité.</li>
    </ul>`,
  },
  especes: {
    title:'Concevoir une espèce équilibrée',
    body:`<ul>
      <li>En 2024, les <strong>bonus de caractéristiques viennent de l'historique</strong>, pas de l'espèce — une espèce homebrew doit rester purement qualitative.</li>
      <li>Visez <strong>2 à 4 traits</strong> : vision dans le noir, résistance, mobilité, une capacité mineure utilisable une fois par repos.</li>
      <li>Gardez taille et vitesse cohérentes avec la description de l'espèce.</li>
    </ul>`,
  },
  classes: {
    title:'Concevoir une classe équilibrée',
    body:`<ul>
      <li>Dé de vie selon le rôle : <strong>D6</strong> lanceurs fragiles, <strong>D8</strong> hybrides, <strong>D10</strong> martiaux, <strong>D12</strong> martiaux lourds.</li>
      <li>Exactement <strong>2 jets de sauvegarde</strong>, et <strong>2 à 4 compétences</strong> au choix.</li>
      <li>Proposez deux options d'équipement de départ (A/B) de valeur comparable.</li>
      <li>Pour une classe lanceuse de sorts, réutilisez la progression d'une classe officielle existante plutôt que d'inventer une nouvelle table.</li>
    </ul>`,
  },
  objets: {
    title:'Concevoir un objet équilibré',
    body:`<ul>
      <li>Paliers de rareté (DMG 2024) : <strong>commun</strong>, <strong>peu commun</strong>, <strong>rare</strong>, <strong>très rare</strong>, <strong>légendaire</strong> — plus la rareté augmente, plus l'effet doit être marquant.</li>
      <li>Exigez un <strong>lien (attunement)</strong> pour tout effet permanent ou puissant, afin de limiter le cumul.</li>
      <li>Cet atelier reste volontairement simple : pas de dégâts/CA chiffrés directement exploitables dans les jets.</li>
    </ul>`,
  },
};

let activeTabKey = 'traits';
let viewMode = 'grid'; // 'grid' | 'form'
let editingId = null;

function currentTab(){ return TABS.find(t => t.key === activeTabKey); }

export async function renderHomebrew(container, parts){
  if(parts && parts[0] && TABS.some(t => t.key === parts[0])) activeTabKey = parts[0];
  viewMode = 'grid'; editingId = null;
  renderShell(container);
}

function renderShell(container){
  container.innerHTML = `
    <header class="page-header">
      <p class="eyebrow">Atelier</p>
      <h1 class="page-title">Contenu personnalisé</h1>
      <p class="page-lede">Créez vos propres dons, espèces, classes et objets — ils apparaissent ensuite partout dans le codex, exactement comme le contenu officiel : dans l'assistant de création, sur la fiche de personnage, et dans la recherche.</p>
    </header>
    <div class="tabs" role="tablist" id="hb-tabs">
      ${TABS.map(t => `<button class="tab" role="tab" data-tab="${t.key}" aria-selected="${t.key===activeTabKey}">${t.icon} ${t.label}</button>`).join('')}
    </div>
    <div class="tabpanel" id="hb-tabpanel"></div>
  `;
  const panel = container.querySelector('#hb-tabpanel');
  const tabBtns = container.querySelectorAll('#hb-tabs .tab');
  tabBtns.forEach(b => b.addEventListener('click', () => {
    activeTabKey = b.dataset.tab; viewMode = 'grid'; editingId = null;
    tabBtns.forEach(x => x.setAttribute('aria-selected', String(x === b)));
    renderPanel(panel);
  }));
  renderPanel(panel);
}

function renderPanel(panel){
  if(viewMode === 'form') return renderForm(panel);
  renderGrid(panel);
}

// ---------- Grille de gestion ----------

function displayName(tab, entry){
  if(tab.storeType === 'traits') return entry.name;
  if(tab.storeType === 'species') return entry.espece;
  if(tab.storeType === 'classes') return entry.classeTitle;
  return entry.nom;
}
function subtitle(tab, entry){
  if(tab.storeType === 'traits') return TYPE_DON_LABEL[entry.typeDon] || 'Don';
  if(tab.storeType === 'species') return entry.typeCreature || 'Espèce';
  if(tab.storeType === 'classes') return entry.isSubclass ? `Sous-classe de ${entry.parentClassTitle}` : 'Classe';
  return ITEM_TYPE_LABEL[entry.type] || 'Objet';
}

function renderGrid(panel){
  const tab = currentTab();
  const entries = listHomebrew(tab.storeType);
  panel.innerHTML = `
    <div class="flex-gap" style="justify-content:space-between;align-items:center;margin-bottom:1.4em;flex-wrap:wrap;">
      <p class="page-lede" style="margin:0;">${entries.length} entrée${entries.length>1?'s':''} personnalisée${entries.length>1?'s':''}.</p>
      <button class="btn btn-primary" id="hb-create-btn"><svg class="i"><use href="#i-plus"/></svg> Créer ${tab.createLabel}</button>
    </div>
    ${entries.length ? `<div class="card-grid" id="hb-grid"></div>` : `<div class="empty-state"><span class="i-big">✨</span><p>${tab.emptyLabel}</p></div>`}
  `;
  panel.querySelector('#hb-create-btn').addEventListener('click', () => { viewMode = 'form'; editingId = null; renderPanel(panel); });
  if(!entries.length) return;
  const grid = panel.querySelector('#hb-grid');
  grid.innerHTML = entries.map(e => `
    <div class="card" style="padding:0;" data-id="${e.id}">
      <div class="card-body" style="padding-top:20px;">
        <span class="pill" style="margin-bottom:.6em;">✨ Homebrew</span>
        <h2 class="card-title">${escapeHtml(displayName(tab, e) || '(sans nom)')}</h2>
        <p class="card-desc">${escapeHtml(subtitle(tab, e))}</p>
        <div class="flex-gap" style="margin-top:1em;flex-wrap:wrap;">
          <button class="btn btn-sm" data-act="view" type="button">Voir</button>
          <button class="btn btn-sm btn-ghost" data-act="edit" type="button">Modifier</button>
          <button class="btn btn-sm btn-ghost" data-act="dup" type="button">Dupliquer</button>
          <button class="btn btn-sm btn-ghost btn-danger" data-act="del" type="button">Supprimer</button>
        </div>
      </div>
    </div>
  `).join('');
  grid.querySelectorAll('.card[data-id]').forEach(card => {
    const entry = entries.find(e => e.id === card.dataset.id);
    card.querySelector('[data-act="view"]').addEventListener('click', () => viewEntry(tab, entry, card));
    card.querySelector('[data-act="edit"]').addEventListener('click', () => { viewMode = 'form'; editingId = entry.id; renderPanel(panel); });
    card.querySelector('[data-act="dup"]').addEventListener('click', () => {
      duplicateHomebrewEntry(tab.storeType, entry.id);
      refreshHomebrew();
      toast('Copie créée.', { type:'success' });
      renderGrid(panel);
    });
    card.querySelector('[data-act="del"]').addEventListener('click', async () => {
      const ok = await confirmAction({
        title:'Supprimer',
        message:`Supprimer définitivement « ${displayName(tab, entry) || 'cette entrée'} » ? Cette action est irréversible.`,
        confirmLabel:'Supprimer',
      });
      if(!ok) return;
      deleteHomebrewEntry(tab.storeType, entry.id);
      refreshHomebrew();
      toast('Supprimé.', { type:'success' });
      renderGrid(panel);
    });
  });
}

function viewEntry(tab, entry, originEl){
  if(tab.storeType === 'items') return openItemDetailModal(entry, originEl);
  if(tab.storeType === 'traits') return navigate(`dons/${entry.id}`);
  if(tab.storeType === 'species') return navigate(`races/${entry.id}`);
  if(tab.storeType === 'classes'){
    if(entry.isSubclass){
      const parent = DATA.classes.find(c => (c.subclasses||[]).some(sc => sc._hbId === entry.id));
      if(parent) return navigate(`classes/${parent.slug}/${entry.id}`);
      toast('Classe parente introuvable (a-t-elle été supprimée ?).', { type:'error' });
      return;
    }
    return navigate(`classes/${entry.id}`);
  }
}

function openItemDetailModal(entry, originEl){
  openModal({
    eyebrow: ITEM_TYPE_LABEL[entry.type] || 'Objet personnalisé',
    title: escapeHtml(entry.nom || '(sans nom)'),
    originEl,
    build(body){
      body.innerHTML = `
        <div class="flex-gap" style="margin-bottom:1em;flex-wrap:wrap;">
          <span class="pill">✨ Homebrew</span>
          ${entry.poids !== '' && entry.poids != null ? `<span class="pill pill-muted">${escapeHtml(entry.poids)} kg</span>` : ''}
          ${entry.prix !== '' && entry.prix != null ? `<span class="pill pill-muted">${escapeHtml(entry.prix)} po</span>` : ''}
          ${entry.type === 'objet_magique' ? `<span class="pill">${escapeHtml(entry.rarete || 'commun')}</span>` : ''}
          ${entry.lien ? `<span class="pill">${escapeHtml(entry.lien)}</span>` : ''}
        </div>
        <div class="prose">${enrichHTML(entry.description, { isPlainText:true })}</div>
      `;
    },
  });
}

// ---------- Helpers de formulaire partagés ----------

function wireCollapsibles(root){
  root.querySelectorAll('[data-guide-toggle]').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.is-collapsible').classList.toggle('is-expanded'));
  });
}
function guideHTML(key){
  const g = GUIDES[key];
  if(!g) return '';
  return `
    <article class="capacite-block is-collapsible" style="margin-top:1em;">
      <button type="button" class="capacite-toggle" data-guide-toggle>
        <span class="capacite-toggle-title">📖 ${escapeHtml(g.title)}</span>
        <svg class="i chevron"><use href="#i-chevron"/></svg>
      </button>
      <div class="capacite-body"><div class="prose">${g.body}</div></div>
    </article>
  `;
}

/** Éditeur répétable générique pour des entrées {niveau?, nom, description} : capacités de
 * classe/espèce, lignées de sous-espèce. Retourne { addRow() } pour brancher un bouton "+". */
function renderCapaciteEditor(container, list, { withNiveau=false, nomPlaceholder='', descLabel='' } = {}){
  function draw(){
    container.innerHTML = list.map((c, i) => `
      <div class="frame" style="padding:14px;margin-bottom:10px;">
        <div class="flex-gap" style="align-items:flex-start;">
          ${withNiveau ? `<input type="number" class="field" style="width:76px;" min="1" max="20" value="${c.niveau||1}" data-cap-niveau="${i}" title="Niveau">` : ''}
          <input type="text" class="field" style="flex:1;" value="${escapeHtml(c.nom||'')}" placeholder="${escapeHtml(nomPlaceholder)}" data-cap-nom="${i}">
          <button type="button" class="btn btn-sm btn-ghost" data-cap-rm="${i}" aria-label="Retirer">✕</button>
        </div>
        <textarea class="field" rows="2" style="margin-top:8px;" placeholder="${escapeHtml(descLabel)}" data-cap-desc="${i}">${escapeHtml(c.description||'')}</textarea>
      </div>
    `).join('') || `<p class="page-lede" style="font-size:.88em;">Aucune entrée pour le moment.</p>`;
    container.querySelectorAll('[data-cap-niveau]').forEach(inp => inp.addEventListener('input', () => { list[Number(inp.dataset.capNiveau)].niveau = Number(inp.value)||1; }));
    container.querySelectorAll('[data-cap-nom]').forEach(inp => inp.addEventListener('input', () => { list[Number(inp.dataset.capNom)].nom = inp.value; }));
    container.querySelectorAll('[data-cap-desc]').forEach(ta => ta.addEventListener('input', () => { list[Number(ta.dataset.capDesc)].description = ta.value; }));
    container.querySelectorAll('[data-cap-rm]').forEach(btn => btn.addEventListener('click', () => { list.splice(Number(btn.dataset.capRm), 1); draw(); }));
  }
  draw();
  return { addRow(){ list.push(withNiveau ? { niveau:1, nom:'', description:'' } : { nom:'', description:'' }); draw(); } };
}

/** Éditeur d'une option d'équipement de départ (objets + or). */
function renderEquipEditor(container, opt){
  function draw(){
    container.innerHTML = `
      ${opt.items.map((it, i) => `
        <div class="flex-gap" style="margin-bottom:6px;align-items:center;">
          <input type="text" class="field" style="flex:1;" value="${escapeHtml(it.name||'')}" placeholder="Nom de l'objet" data-eq-name="${i}">
          <input type="number" class="field" style="width:64px;" min="1" value="${it.qty||1}" data-eq-qty="${i}">
          <button type="button" class="btn btn-sm btn-ghost" data-eq-rm="${i}" aria-label="Retirer">✕</button>
        </div>
      `).join('')}
      <div class="flex-gap" style="align-items:center;margin-top:4px;flex-wrap:wrap;">
        <button type="button" class="btn btn-sm btn-ghost" data-eq-add>+ Objet</button>
        <label class="field-label" style="margin:0 0 0 auto;">Or : <input type="number" class="field" style="width:70px;display:inline-block;" min="0" value="${opt.gold||0}" data-eq-gold></label>
      </div>
    `;
    container.querySelectorAll('[data-eq-name]').forEach(inp => inp.addEventListener('input', () => { opt.items[Number(inp.dataset.eqName)].name = inp.value; }));
    container.querySelectorAll('[data-eq-qty]').forEach(inp => inp.addEventListener('input', () => { opt.items[Number(inp.dataset.eqQty)].qty = Number(inp.value)||1; }));
    container.querySelectorAll('[data-eq-rm]').forEach(btn => btn.addEventListener('click', () => { opt.items.splice(Number(btn.dataset.eqRm), 1); draw(); }));
    container.querySelector('[data-eq-add]').addEventListener('click', () => { opt.items.push({ name:'', qty:1 }); draw(); });
    container.querySelector('[data-eq-gold]').addEventListener('input', (e) => { opt.gold = Number(e.target.value)||0; });
  }
  draw();
}

function renderForm(panel){
  const tab = currentTab();
  const existing = editingId ? getHomebrewEntry(tab.storeType, editingId) : null;
  if(tab.storeType === 'traits') return renderTraitForm(panel, existing);
  if(tab.storeType === 'species') return renderSpeciesForm(panel, existing);
  if(tab.storeType === 'classes') return renderClassForm(panel, existing);
  if(tab.storeType === 'items') return renderItemForm(panel, existing);
}

// ---------- Formulaire : Don / trait ----------

function renderTraitForm(panel, existing){
  const state = existing ? JSON.parse(JSON.stringify(existing)) : { name:'', typeDon:'general', prerequis:[], description:'' };
  state.prerequis = state.prerequis || [];

  panel.innerHTML = `
    <button class="btn btn-ghost btn-sm" id="hb-back" style="margin-bottom:1.2em;">&larr; Retour</button>
    <h2>${existing ? 'Modifier' : 'Créer'} un don</h2>
    ${guideHTML('traits')}
    <div class="abil-grid" style="grid-template-columns:1fr;max-width:640px;gap:16px;margin-top:1.4em;">
      <div>
        <label class="field-label" for="hb-t-name">Nom du don</label>
        <input type="text" class="field" id="hb-t-name" value="${escapeHtml(state.name)}" placeholder="Ex. Frappe Ardente">
      </div>
      <div>
        <label class="field-label" for="hb-t-type">Type de don</label>
        <select class="field" id="hb-t-type">
          <option value="general" ${state.typeDon==='general'?'selected':''}>Général</option>
          <option value="style_combat" ${state.typeDon==='style_combat'?'selected':''}>Style de combat</option>
          <option value="origine" ${state.typeDon==='origine'?'selected':''}>Origine</option>
        </select>
      </div>
      <div>
        <p class="field-label">Prérequis (optionnel)</p>
        <div id="hb-t-prereqs"></div>
        <button type="button" class="btn btn-sm btn-ghost" id="hb-t-prereq-add">+ Ajouter un prérequis</button>
      </div>
      <div>
        <label class="field-label" for="hb-t-desc">Description</label>
        <textarea class="field" id="hb-t-desc" rows="6" placeholder="Effet du don…">${escapeHtml(state.description)}</textarea>
      </div>
    </div>
    <div class="flex-gap" style="margin-top:1.6em;">
      <button class="btn btn-primary" id="hb-t-save">${existing ? 'Enregistrer' : 'Créer le don'}</button>
    </div>
  `;
  wireCollapsibles(panel);

  function renderPrereqs(){
    const box = panel.querySelector('#hb-t-prereqs');
    box.innerHTML = state.prerequis.map((p, i) => `
      <div class="flex-gap" style="margin-bottom:.5em;align-items:center;">
        <select class="field" style="width:150px;" data-pr-type="${i}">
          <option value="niveau" ${p.type==='niveau'?'selected':''}>Niveau min.</option>
          <option value="capacite" ${p.type==='capacite'?'selected':''}>Capacité requise</option>
        </select>
        ${p.type === 'niveau'
          ? `<input type="number" class="field" style="width:80px;" min="1" max="20" value="${p.minimum||1}" data-pr-val="${i}">`
          : `<input type="text" class="field" style="flex:1;" value="${escapeHtml(p.nom||'')}" data-pr-val="${i}" placeholder="Ex. Maîtrise d'une arme de guerre">`}
        <button type="button" class="btn btn-sm btn-ghost" data-pr-rm="${i}" aria-label="Retirer">✕</button>
      </div>
    `).join('') || `<p class="page-lede" style="font-size:.88em;">Aucun prérequis.</p>`;
    box.querySelectorAll('[data-pr-type]').forEach(sel => sel.addEventListener('change', () => {
      const i = Number(sel.dataset.prType);
      state.prerequis[i] = sel.value === 'niveau' ? { type:'niveau', minimum:1 } : { type:'capacite', nom:'' };
      renderPrereqs();
    }));
    box.querySelectorAll('[data-pr-val]').forEach(inp => inp.addEventListener('input', () => {
      const i = Number(inp.dataset.prVal);
      if(state.prerequis[i].type === 'niveau') state.prerequis[i].minimum = Number(inp.value)||1;
      else state.prerequis[i].nom = inp.value;
    }));
    box.querySelectorAll('[data-pr-rm]').forEach(btn => btn.addEventListener('click', () => {
      state.prerequis.splice(Number(btn.dataset.prRm), 1); renderPrereqs();
    }));
  }
  renderPrereqs();
  panel.querySelector('#hb-t-prereq-add').addEventListener('click', () => { state.prerequis.push({ type:'niveau', minimum:1 }); renderPrereqs(); });
  panel.querySelector('#hb-t-name').addEventListener('input', e => state.name = e.target.value);
  panel.querySelector('#hb-t-type').addEventListener('change', e => state.typeDon = e.target.value);
  panel.querySelector('#hb-t-desc').addEventListener('input', e => state.description = e.target.value);
  panel.querySelector('#hb-back').addEventListener('click', () => { viewMode = 'grid'; renderPanel(panel); });
  panel.querySelector('#hb-t-save').addEventListener('click', () => {
    if(!state.name.trim()){ toast('Donnez un nom au don.', { type:'error' }); return; }
    saveHomebrewEntry('traits', state);
    refreshHomebrew();
    toast(existing ? 'Don mis à jour.' : 'Don créé !', { type:'success' });
    viewMode = 'grid'; editingId = null;
    renderPanel(panel);
  });
}

// ---------- Formulaire : Espèce ----------

function renderSpeciesForm(panel, existing){
  const state = existing ? JSON.parse(JSON.stringify(existing)) : { espece:'', typeCreature:'', taille:'M', vitesse:'9 m', capacites:[], sousEspeces:[] };
  state.capacites = state.capacites || [];
  state.sousEspeces = state.sousEspeces || [];

  panel.innerHTML = `
    <button class="btn btn-ghost btn-sm" id="hb-back" style="margin-bottom:1.2em;">&larr; Retour</button>
    <h2>${existing ? 'Modifier' : 'Créer'} une espèce</h2>
    ${guideHTML('especes')}
    <div class="abil-grid" style="grid-template-columns:1fr 1fr;max-width:720px;gap:16px;margin-top:1.4em;">
      <div style="grid-column:1/-1;">
        <label class="field-label" for="hb-s-nom">Nom de l'espèce</label>
        <input type="text" class="field" id="hb-s-nom" value="${escapeHtml(state.espece)}" placeholder="Ex. Sylvin">
      </div>
      <div>
        <label class="field-label" for="hb-s-type">Type de créature</label>
        <input type="text" class="field" id="hb-s-type" value="${escapeHtml(state.typeCreature)}" placeholder="Ex. Humanoïde">
      </div>
      <div>
        <label class="field-label" for="hb-s-taille">Taille</label>
        <select class="field" id="hb-s-taille">
          ${['TP','P','M','G','TG'].map(t => `<option value="${t}" ${state.taille===t?'selected':''}>${SIZE_WORDS[t]}</option>`).join('')}
        </select>
      </div>
      <div style="grid-column:1/-1;">
        <label class="field-label" for="hb-s-vitesse">Vitesse</label>
        <input type="text" class="field" id="hb-s-vitesse" value="${escapeHtml(state.vitesse)}" placeholder="Ex. 9 m">
      </div>
    </div>
    <p class="field-label" style="margin-top:1.6em;">Traits raciaux</p>
    <div id="hb-s-capacites"></div>
    <button type="button" class="btn btn-sm btn-ghost" id="hb-s-cap-add">+ Ajouter un trait</button>
    <p class="field-label" style="margin-top:1.6em;">Lignées / sous-espèces (optionnel)</p>
    <div id="hb-s-sous"></div>
    <button type="button" class="btn btn-sm btn-ghost" id="hb-s-sous-add">+ Ajouter une lignée</button>
    <div class="flex-gap" style="margin-top:1.8em;">
      <button class="btn btn-primary" id="hb-s-save">${existing ? 'Enregistrer' : "Créer l'espèce"}</button>
    </div>
  `;
  wireCollapsibles(panel);

  const capEditor = renderCapaciteEditor(panel.querySelector('#hb-s-capacites'), state.capacites, { nomPlaceholder:'Nom du trait', descLabel:'Description du trait' });
  const sousEditor = renderCapaciteEditor(panel.querySelector('#hb-s-sous'), state.sousEspeces, { nomPlaceholder:'Nom de la lignée', descLabel:'Description de la lignée' });
  panel.querySelector('#hb-s-cap-add').addEventListener('click', () => capEditor.addRow());
  panel.querySelector('#hb-s-sous-add').addEventListener('click', () => sousEditor.addRow());
  panel.querySelector('#hb-s-nom').addEventListener('input', e => state.espece = e.target.value);
  panel.querySelector('#hb-s-type').addEventListener('input', e => state.typeCreature = e.target.value);
  panel.querySelector('#hb-s-taille').addEventListener('change', e => state.taille = e.target.value);
  panel.querySelector('#hb-s-vitesse').addEventListener('input', e => state.vitesse = e.target.value);
  panel.querySelector('#hb-back').addEventListener('click', () => { viewMode = 'grid'; renderPanel(panel); });
  panel.querySelector('#hb-s-save').addEventListener('click', () => {
    if(!state.espece.trim()){ toast("Donnez un nom à l'espèce.", { type:'error' }); return; }
    saveHomebrewEntry('species', state);
    refreshHomebrew();
    toast(existing ? 'Espèce mise à jour.' : 'Espèce créée !', { type:'success' });
    viewMode = 'grid'; editingId = null;
    renderPanel(panel);
  });
}

// ---------- Formulaire : Classe ----------

function renderClassForm(panel, existing){
  const state = existing ? JSON.parse(JSON.stringify(existing)) : {
    isSubclass:false, parentClassTitle:'', classeTitle:'', description:'',
    caracteristique:'Force', deVie:8, saves:[], armures:'', armes:'',
    skillCount:2, skillOptions:[], equipA:{items:[],gold:0}, equipB:{items:[],gold:0},
    capacites:[], casterModel:'',
  };
  state.saves = state.saves || [];
  state.skillOptions = state.skillOptions || [];
  state.equipA = state.equipA || { items:[], gold:0 };
  state.equipB = state.equipB || { items:[], gold:0 };
  state.capacites = state.capacites || [];

  function draw(){
    const parentOptions = DATA.classes.filter(c => c.classe_title !== state.classeTitle);

    panel.innerHTML = `
      <button class="btn btn-ghost btn-sm" id="hb-back" style="margin-bottom:1.2em;">&larr; Retour</button>
      <h2>${existing ? 'Modifier' : 'Créer'} une classe</h2>
      ${guideHTML('classes')}
      <div class="choice-toggle" id="hb-c-kind" style="max-width:420px;margin:1.4em 0;">
        <button type="button" class="btn btn-sm ${!state.isSubclass?'is-selected':''}" data-kind="base">Nouvelle classe</button>
        <button type="button" class="btn btn-sm ${state.isSubclass?'is-selected':''}" data-kind="sub">Sous-classe existante</button>
      </div>
      <div class="abil-grid" style="grid-template-columns:1fr;max-width:640px;gap:16px;">
        <div>
          <label class="field-label" for="hb-c-title">${state.isSubclass ? 'Nom de la sous-classe' : 'Nom de la classe'}</label>
          <input type="text" class="field" id="hb-c-title" value="${escapeHtml(state.classeTitle)}" placeholder="Ex. Chevalier-Runique">
        </div>
        ${state.isSubclass ? `
          <div>
            <label class="field-label" for="hb-c-parent">Classe parente</label>
            <select class="field" id="hb-c-parent">
              ${parentOptions.map(c => `<option value="${escapeHtml(c.classe_title)}" ${state.parentClassTitle===c.classe_title?'selected':''}>${c._homebrew?'✨ ':''}${escapeHtml(c.classe_title)}</option>`).join('')}
            </select>
          </div>
        ` : ''}
        <div>
          <label class="field-label" for="hb-c-desc">Description</label>
          <textarea class="field" id="hb-c-desc" rows="4">${escapeHtml(state.description)}</textarea>
        </div>
      </div>

      ${!state.isSubclass ? `
        <div class="abil-grid" style="grid-template-columns:1fr 1fr;max-width:640px;gap:16px;margin-top:1em;">
          <div>
            <label class="field-label" for="hb-c-carac">Caractéristique principale</label>
            <select class="field" id="hb-c-carac">
              ${ABILITIES.map(a => `<option value="${a.label}" ${state.caracteristique===a.label?'selected':''}>${a.label}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="field-label" for="hb-c-devie">Dé de vie</label>
            <select class="field" id="hb-c-devie">
              ${[6,8,10,12].map(d => `<option value="${d}" ${Number(state.deVie)===d?'selected':''}>D${d}</option>`).join('')}
            </select>
          </div>
          <div style="grid-column:1/-1;">
            <p class="field-label">Jets de sauvegarde (choisissez-en 2)</p>
            <div class="chip-group" id="hb-c-saves">
              ${ABILITIES.map(a => `<button type="button" class="chip ${state.saves.includes(a.label)?'is-selected':''}" data-save="${a.label}"><svg class="i"><use href="#i-check"/></svg>${a.label}</button>`).join('')}
            </div>
          </div>
          <div>
            <label class="field-label" for="hb-c-armures">Maîtrises d'armures</label>
            <input type="text" class="field" id="hb-c-armures" value="${escapeHtml(state.armures)}" placeholder="Ex. Armures légères, boucliers">
          </div>
          <div>
            <label class="field-label" for="hb-c-armes">Maîtrises d'armes</label>
            <input type="text" class="field" id="hb-c-armes" value="${escapeHtml(state.armes)}" placeholder="Ex. Armes courantes">
          </div>
          <div style="grid-column:1/-1;">
            <label class="field-label" for="hb-c-skillcount">Nombre de compétences au choix</label>
            <input type="number" class="field" id="hb-c-skillcount" style="width:90px;" min="1" max="6" value="${state.skillCount}">
          </div>
          <div style="grid-column:1/-1;">
            <p class="field-label">Compétences proposées (laisser vide = toutes)</p>
            <div class="chip-group" id="hb-c-skills">
              ${ALL_SKILLS.map(s => `<button type="button" class="chip ${state.skillOptions.includes(s)?'is-selected':''}" data-skill="${escapeHtml(s)}"><svg class="i"><use href="#i-check"/></svg>${escapeHtml(s)}</button>`).join('')}
            </div>
          </div>
          <div>
            <p class="field-label">Équipement de départ — option A</p>
            <div id="hb-c-equipA"></div>
          </div>
          <div>
            <p class="field-label">Équipement de départ — option B</p>
            <div id="hb-c-equipB"></div>
          </div>
          <div style="grid-column:1/-1;">
            <p class="field-label">Lanceur de sorts ?</p>
            <select class="field" id="hb-c-caster" style="max-width:320px;">
              <option value="">Non</option>
              ${CASTER_GROUPS.map(g => `<optgroup label="${g.label}">${g.options.map(t => `<option value="${t}" ${state.casterModel===t?'selected':''}>Comme ${t}</option>`).join('')}</optgroup>`).join('')}
            </select>
            <p class="page-lede" style="font-size:.85em;margin-top:.4em;">La classe réutilisera les emplacements de sorts et la liste de sorts de la classe choisie.</p>
          </div>
        </div>
      ` : ''}

      <p class="field-label" style="margin-top:1.8em;">Capacités par niveau</p>
      <div id="hb-c-capacites"></div>
      <button type="button" class="btn btn-sm btn-ghost" id="hb-c-cap-add">+ Ajouter une capacité</button>

      <div class="flex-gap" style="margin-top:1.8em;">
        <button class="btn btn-primary" id="hb-c-save">${existing ? 'Enregistrer' : 'Créer la classe'}</button>
      </div>
    `;
    wireCollapsibles(panel);

    panel.querySelectorAll('[data-kind]').forEach(btn => btn.addEventListener('click', () => {
      state.isSubclass = btn.dataset.kind === 'sub';
      if(state.isSubclass && !state.parentClassTitle) state.parentClassTitle = parentOptions[0]?.classe_title || '';
      draw();
    }));

    const capEditor = renderCapaciteEditor(panel.querySelector('#hb-c-capacites'), state.capacites, { withNiveau:true, nomPlaceholder:'Nom de la capacité', descLabel:'Effet de la capacité' });
    panel.querySelector('#hb-c-cap-add').addEventListener('click', () => capEditor.addRow());

    panel.querySelector('#hb-c-title').addEventListener('input', e => state.classeTitle = e.target.value);
    panel.querySelector('#hb-c-desc').addEventListener('input', e => state.description = e.target.value);
    panel.querySelector('#hb-c-parent')?.addEventListener('change', e => state.parentClassTitle = e.target.value);
    panel.querySelector('#hb-c-carac')?.addEventListener('change', e => state.caracteristique = e.target.value);
    panel.querySelector('#hb-c-devie')?.addEventListener('change', e => state.deVie = Number(e.target.value));
    panel.querySelectorAll('[data-save]').forEach(chip => chip.addEventListener('click', () => {
      const val = chip.dataset.save;
      const idx = state.saves.indexOf(val);
      if(idx >= 0) state.saves.splice(idx, 1);
      else {
        if(state.saves.length >= 2){ toast('Choisissez exactement 2 jets de sauvegarde.', { type:'error' }); return; }
        state.saves.push(val);
      }
      chip.classList.toggle('is-selected');
    }));
    panel.querySelector('#hb-c-armures')?.addEventListener('input', e => state.armures = e.target.value);
    panel.querySelector('#hb-c-armes')?.addEventListener('input', e => state.armes = e.target.value);
    panel.querySelector('#hb-c-skillcount')?.addEventListener('input', e => state.skillCount = Number(e.target.value)||1);
    panel.querySelectorAll('[data-skill]').forEach(chip => chip.addEventListener('click', () => {
      const val = chip.dataset.skill;
      const idx = state.skillOptions.indexOf(val);
      if(idx >= 0) state.skillOptions.splice(idx, 1); else state.skillOptions.push(val);
      chip.classList.toggle('is-selected');
    }));
    if(panel.querySelector('#hb-c-equipA')) renderEquipEditor(panel.querySelector('#hb-c-equipA'), state.equipA);
    if(panel.querySelector('#hb-c-equipB')) renderEquipEditor(panel.querySelector('#hb-c-equipB'), state.equipB);
    panel.querySelector('#hb-c-caster')?.addEventListener('change', e => state.casterModel = e.target.value);

    panel.querySelector('#hb-back').addEventListener('click', () => { viewMode = 'grid'; renderPanel(panel); });
    panel.querySelector('#hb-c-save').addEventListener('click', () => {
      if(!state.classeTitle.trim()){ toast('Donnez un nom à la classe.', { type:'error' }); return; }
      if(state.isSubclass && !state.parentClassTitle){ toast('Choisissez une classe parente.', { type:'error' }); return; }
      if(!state.isSubclass && state.saves.length !== 2){ toast('Choisissez exactement 2 jets de sauvegarde.', { type:'error' }); return; }
      if(!state.capacites.some(c => c.nom?.trim())){ toast('Ajoutez au moins une capacité (niveau 1 par exemple).', { type:'error' }); return; }
      saveHomebrewEntry('classes', state);
      refreshHomebrew();
      toast(existing ? 'Classe mise à jour.' : 'Classe créée !', { type:'success' });
      viewMode = 'grid'; editingId = null;
      renderPanel(panel);
    });
  }

  draw();
}

// ---------- Formulaire : Objet ----------

function renderItemForm(panel, existing){
  const state = existing ? JSON.parse(JSON.stringify(existing)) : { nom:'', type:'objet_magique', poids:'', prix:'', rarete:'commun', lien:'', description:'' };

  function draw(){
    panel.innerHTML = `
      <button class="btn btn-ghost btn-sm" id="hb-back" style="margin-bottom:1.2em;">&larr; Retour</button>
      <h2>${existing ? 'Modifier' : 'Créer'} un objet</h2>
      ${guideHTML('objets')}
      <div class="abil-grid" style="grid-template-columns:1fr 1fr;max-width:640px;gap:16px;margin-top:1.4em;">
        <div style="grid-column:1/-1;">
          <label class="field-label" for="hb-i-nom">Nom de l'objet</label>
          <input type="text" class="field" id="hb-i-nom" value="${escapeHtml(state.nom)}" placeholder="Ex. Amulette du Veilleur">
        </div>
        <div>
          <label class="field-label" for="hb-i-type">Type</label>
          <select class="field" id="hb-i-type">
            ${Object.entries(ITEM_TYPE_LABEL).map(([k,l]) => `<option value="${k}" ${state.type===k?'selected':''}>${l}</option>`).join('')}
          </select>
        </div>
        <div></div>
        <div>
          <label class="field-label" for="hb-i-poids">Poids (kg)</label>
          <input type="number" class="field" id="hb-i-poids" min="0" step="0.1" value="${escapeHtml(state.poids)}">
        </div>
        <div>
          <label class="field-label" for="hb-i-prix">Prix (po)</label>
          <input type="number" class="field" id="hb-i-prix" min="0" step="0.1" value="${escapeHtml(state.prix)}">
        </div>
        ${state.type === 'objet_magique' ? `
          <div>
            <label class="field-label" for="hb-i-rarete">Rareté</label>
            <select class="field" id="hb-i-rarete">
              ${['commun','peu commun','rare','très rare','légendaire'].map(r => `<option value="${r}" ${state.rarete===r?'selected':''}>${r}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="field-label" for="hb-i-lien">Lien (attunement)</label>
            <input type="text" class="field" id="hb-i-lien" value="${escapeHtml(state.lien)}" placeholder="Ex. nécessite un lien">
          </div>
        ` : ''}
        <div style="grid-column:1/-1;">
          <label class="field-label" for="hb-i-desc">Description</label>
          <textarea class="field" id="hb-i-desc" rows="5">${escapeHtml(state.description)}</textarea>
        </div>
      </div>
      <div class="flex-gap" style="margin-top:1.8em;">
        <button class="btn btn-primary" id="hb-i-save">${existing ? 'Enregistrer' : "Créer l'objet"}</button>
      </div>
    `;
    wireCollapsibles(panel);
    panel.querySelector('#hb-back').addEventListener('click', () => { viewMode = 'grid'; renderPanel(panel); });
    panel.querySelector('#hb-i-nom').addEventListener('input', e => state.nom = e.target.value);
    panel.querySelector('#hb-i-type').addEventListener('change', e => { state.type = e.target.value; draw(); });
    panel.querySelector('#hb-i-poids').addEventListener('input', e => state.poids = e.target.value);
    panel.querySelector('#hb-i-prix').addEventListener('input', e => state.prix = e.target.value);
    panel.querySelector('#hb-i-rarete')?.addEventListener('change', e => state.rarete = e.target.value);
    panel.querySelector('#hb-i-lien')?.addEventListener('input', e => state.lien = e.target.value);
    panel.querySelector('#hb-i-desc').addEventListener('input', e => state.description = e.target.value);
    panel.querySelector('#hb-i-save').addEventListener('click', () => {
      if(!state.nom.trim()){ toast("Donnez un nom à l'objet.", { type:'error' }); return; }
      saveHomebrewEntry('items', state);
      refreshHomebrew();
      toast(existing ? 'Objet mis à jour.' : 'Objet créé !', { type:'success' });
      viewMode = 'grid'; editingId = null;
      renderPanel(panel);
    });
  }

  draw();
}
