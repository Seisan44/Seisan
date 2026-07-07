import { listCharacters, getActiveId, setActiveId, deleteCharacter } from './storage.js';
import { escapeHtml } from '../utils.js';
import { speciesImage, imgWithFallback } from '../images.js';
import { DATA } from '../data.js';
import { navigate } from '../router.js';
import { confirmAction } from '../confirm.js';
import { toast } from '../toast.js';

export function renderCharacterList(container){
  const chars = listCharacters();
  const activeId = getActiveId();

  container.innerHTML = `
    <header class="page-header">
      <p class="eyebrow">Compagnons de route</p>
      <h1 class="page-title">Mes personnages</h1>
      <p class="page-lede">${chars.length} personnage${chars.length>1?'s':''} sauvegardé${chars.length>1?'s':''} sur cet appareil.</p>
    </header>
    <div class="flex-gap" style="margin-bottom:1.6em;">
      <a href="#personnage/nouveau" class="btn btn-primary"><svg class="i"><use href="#i-plus"/></svg> Nouveau personnage</a>
    </div>
    <div class="card-grid card-grid-wide" id="char-list-grid"></div>
  `;

  const grid = container.querySelector('#char-list-grid');
  if(!chars.length){
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><span class="i-big">🐉</span><p>Aucun personnage pour l’instant.</p></div>`;
    return;
  }

  grid.innerHTML = chars.map(c => `
    <div class="card char-list-card ${c.id===activeId?'is-active-char':''}" style="cursor:default;padding:0;">
      <div class="card-body" style="padding-top:18px;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:.6em;">
          <div class="char-avatar" style="width:52px;height:52px;font-size:1.4rem;">
            ${c.species ? imgWithFallback(DATA.species.find(x => x.espece === c.species)?._homebrew ? null : speciesImage(c.species), c.species, { className:'', fallbackEmoji:'🐉' }) : '🐉'}
          </div>
          <div>
            <h2 class="card-title" style="margin-bottom:.1em;">${escapeHtml(c.profile?.name || 'Sans nom')}</h2>
            <p class="card-desc" style="margin:0;">${escapeHtml(c.species||'?')} · ${escapeHtml(c.className||'?')} niv. ${c.level||1}</p>
          </div>
        </div>
        ${!c.complete ? `<p class="pill pill-muted" style="margin-bottom:.8em;">Création en cours</p>` : ''}
        <div class="flex-gap">
          <button class="btn btn-sm btn-primary" data-select="${c.id}">${c.id===activeId?'Personnage actif':'Sélectionner'}</button>
          <button class="btn btn-sm btn-danger" data-del="${c.id}"><svg class="i"><use href="#i-trash"/></svg></button>
        </div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('[data-select]').forEach(btn => btn.addEventListener('click', () => {
    setActiveId(btn.dataset.select);
    navigate('personnage');
  }));
  grid.querySelectorAll('[data-del]').forEach(btn => btn.addEventListener('click', async () => {
    const c = chars.find(x => x.id === btn.dataset.del);
    const ok = await confirmAction({
      title:'Supprimer ce personnage',
      message:`Supprimer définitivement « ${c?.profile?.name || 'ce personnage'} » ? Cette action est irréversible.`,
      confirmLabel:'Supprimer',
    });
    if(!ok) return;
    deleteCharacter(btn.dataset.del);
    toast('Personnage supprimé.', { type:'success' });
    renderCharacterList(container);
  }));
}
