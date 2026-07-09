// Page Dons : les 63 dons 2024, groupés par type (origine, général, style de combat),
// avec prérequis lisibles et recherche.

import { DATA } from '../data.js';
import { escapeHtml, qs, debounce, stripAccents } from '../utils.js';
import { enrichHTML } from '../enrich.js';

const TYPE_LABELS = {
  'origine': 'Dons d’origine (niveau 1, via l’historique)',
  'general': 'Dons généraux (niveau 4+)',
  'style_combat': 'Styles de combat (via une capacité de classe)',
};
const TYPE_ORDER = ['origine', 'general', 'style_combat'];

function prereqText(d){
  const parts = [];
  for(const p of d.prerequis?.prerequis || []){
    if(p.type === 'niveau') parts.push(`Niveau ${p.minimum}+`);
    else if(p.type === 'capacite') parts.push(p.nom);
    else if(p.type === 'caracteristique') parts.push(`${p.nom} ${p.minimum}+`);
    else if(p.nom) parts.push(p.nom);
  }
  return parts.join(' · ');
}

function donAccordion(d, open = false){
  const pre = prereqText(d);
  return `<details class="acc" ${open ? 'open' : ''} id="don-${d.slug}">
    <summary>${escapeHtml(d._primaryName)}
      ${d._altName ? `<span class="chip" style="font-weight:400">${escapeHtml(d._altName)}</span>` : ''}
      ${pre ? `<span class="acc-level">${escapeHtml(pre)}</span>` : ''}
      <svg class="icon acc-chevron"><use href="#i-chevron"/></svg>
    </summary>
    <div class="acc-body prose">${enrichHTML(d.html_description || '')}</div>
  </details>`;
}

export function renderDons(view, params){
  const [openSlug] = params;

  view.innerHTML = `
    <div class="page-head">
      <p class="page-eyebrow">Le Grimoire · Chapitre IV</p>
      <h1 class="page-title">Les Dons</h1>
      <p class="page-lede">Un don est un <em>talent spécial</em> qui personnalise ton héros. Au niveau 1, ton
      historique t'en offre un (don d'origine). À partir du niveau 4, tu peux en gagner d'autres
      à la place d'une augmentation de caractéristiques.</p>
    </div>
    <div class="filter-bar">
      <input type="search" class="input search-input" id="don-q" placeholder="Chercher un don…" aria-label="Chercher un don">
      <span class="filter-count" id="don-count"></span>
    </div>
    <div id="don-results"></div>
  `;

  const results = qs('#don-results', view);
  const count = qs('#don-count', view);
  let query = '';

  function renderList(){
    const found = DATA.dons.filter(d => {
      if(!query) return true;
      const hay = stripAccents(d.name + ' ' + (d.html_description || '')).toLowerCase();
      return query.split(/\s+/).every(w => hay.includes(w));
    });
    count.textContent = `${found.length} don${found.length > 1 ? 's' : ''}`;
    let html = '';
    for(const type of TYPE_ORDER){
      const group = found.filter(d => (d.prerequis?.type_don || 'general') === type);
      if(group.length === 0) continue;
      html += `<h2 class="spell-group-title">${TYPE_LABELS[type] || type}</h2>`;
      html += group.sort((a, b) => a._primaryName.localeCompare(b._primaryName))
        .map(d => donAccordion(d, d.slug === openSlug)).join('');
    }
    results.innerHTML = html || '<p class="empty-note">Aucun don trouvé.</p>';
  }

  qs('#don-q', view).addEventListener('input', debounce((e) => {
    query = stripAccents(e.target.value).toLowerCase().trim();
    renderList();
  }, 140));

  renderList();

  if(openSlug){
    const target = qs(`#don-${CSS.escape(openSlug)}`, view);
    if(target){
      target.scrollIntoView({ block: 'center' });
    }
  }
}
