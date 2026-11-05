// Page Espèces : galerie illustrée + fiche détaillée par espèce.

import { DATA } from '../data.js';
import { el, escapeHtml } from '../utils.js';
import { enrichHTML } from '../enrich.js';
import { speciesImage, speciesThumb, imgWithFallback } from '../images.js';

function capaciteHTML(cap){
  let html = `<details class="acc">
    <summary>${escapeHtml(cap.nom)}<svg class="icon acc-chevron"><use href="#i-chevron"/></svg></summary>
    <div class="acc-body prose">${enrichHTML(cap.description, { isPlainText: true })}`;
  for(const t of cap.tables || []){
    html += tableHTML(t);
  }
  html += `</div></details>`;
  return html;
}

// Les tables des données sont fournies en HTML brut ({titre, html}).
function tableHTML(t){
  if(!t?.html) return '';
  const titled = t.titre ? `<p><strong>${escapeHtml(t.titre)}</strong></p>` : '';
  return `${titled}<div class="table-scroll">${enrichHTML(t.html)}</div>`;
}

function renderDetail(view, sp){
  const infos = sp.infos || {};
  view.innerHTML = `
    <a class="back-link" href="#especes"><svg class="icon"><use href="#i-back"/></svg> Toutes les espèces</a>
    <div class="detail-head">
      <div class="detail-portrait">${imgWithFallback(speciesImage(sp.espece), sp.espece, { fallbackEmoji: '🧝' })}</div>
      <div class="detail-head-info">
        <div class="page-head">
          <p class="page-eyebrow">Espèce</p>
          <h1 class="page-title">${escapeHtml(sp.espece)}</h1>
        </div>
        <dl class="info-table">
          ${Object.entries(infos).map(([k, v]) => `<dt>${escapeHtml(k)}</dt><dd>${enrichHTML(String(v), { isPlainText: true })}</dd>`).join('')}
        </dl>
        ${sp.sous_especes?.length ? `<div class="detail-chips">${sp.sous_especes.map(s => `<span class="chip chip-arcane">${escapeHtml(s.nom || String(s))}</span>`).join('')}</div>` : ''}
      </div>
    </div>

    <h2 class="section-title"><svg class="icon"><use href="#i-dons"/></svg>Traits d'espèce</h2>
    ${(sp.capacites || []).map(capaciteHTML).join('')}
    ${(sp.tables || []).map(tableHTML).join('')}
    ${sp.sous_especes?.length ? `
      <h2 class="section-title"><svg class="icon"><use href="#i-especes"/></svg>Lignées</h2>
      ${sp.sous_especes.map(s => `<details class="acc"><summary>${escapeHtml(s.nom || String(s))}<svg class="icon acc-chevron"><use href="#i-chevron"/></svg></summary><div class="acc-body prose">${enrichHTML(s.description || '', { isPlainText: true })}</div></details>`).join('')}
    ` : ''}
  `;
}

export function renderEspeces(view, params){
  const [slug] = params;
  if(slug){
    const sp = DATA.speciesBySlug.get(slug);
    if(sp) return renderDetail(view, sp);
  }

  view.innerHTML = `
    <div class="page-head">
      <p class="page-eyebrow">Le Grimoire · Chapitre I</p>
      <h1 class="page-title">Les Espèces</h1>
      <p class="page-lede">Ton espèce raconte <em>d'où tu viens</em> : ton peuple, ton allure, et quelques dons naturels.
      Elle ne limite jamais ce que tu peux devenir — choisis celle dont l'histoire te parle.</p>
    </div>
    <div class="card-grid" id="species-grid"></div>
  `;

  const grid = view.querySelector('#species-grid');
  for(const sp of DATA.species){
    const card = el('a', { class: 'card is-clickable', href: `#especes/${sp.slug}` });
    card.innerHTML = `
      <div class="card-media card-media-square">${imgWithFallback(speciesThumb(sp.espece), sp.espece, { fallbackEmoji: '🧝' })}</div>
      <div class="card-body">
        <h2 class="card-title">${escapeHtml(sp.espece)}</h2>
        <p class="card-sub">${escapeHtml(sp.infos?.['Taille'] || '')}</p>
        <div class="card-foot">
          <span class="chip">${escapeHtml(sp.infos?.['Vitesse'] ? 'Vitesse ' + sp.infos['Vitesse'] : '')}</span>
          <span class="chip chip-arcane">${(sp.capacites || []).length} traits</span>
        </div>
      </div>`;
    grid.appendChild(card);
  }
}
