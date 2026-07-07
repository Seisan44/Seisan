import { DATA } from '../data.js';
import { speciesImage, speciesThumb, imgWithFallback } from '../images.js';
import { enrichHTML } from '../enrich.js';
import { escapeHtml } from '../utils.js';

const SIZE_WORDS = { 'TP':'Très petite', 'P':'Petite', 'M':'Moyenne', 'G':'Grande', 'TG':'Très grande' };

function tailleShort(str){
  if(!str) return '';
  const codes = str.replace(/\([^)]*\)/g, '').split(/\bou\b|,/).map(s => s.trim()).filter(Boolean);
  return codes.map(c => SIZE_WORDS[c] || c).join(' ou ');
}

export async function renderRaces(container, parts){
  if(parts && parts[0]){
    const species = DATA.species.find(s => s.slug === parts[0]);
    if(species){ renderDetail(container, species); return; }
  }
  renderGrid(container);
}

function renderGrid(container){
  container.innerHTML = `
    <header class="page-header">
      <p class="eyebrow">Races &amp; espèces</p>
      <h1 class="page-title">Peuples de l’aventure</h1>
      <p class="page-lede">Neuf origines jouables, chacune porteuse de traits, de dons naturels et d’un regard différent sur le monde.</p>
    </header>
    <div class="card-grid card-grid-wide" id="races-grid"></div>
  `;
  const grid = container.querySelector('#races-grid');
  grid.innerHTML = DATA.species.map(s => `
    <a class="card" href="#races/${s.slug}">
      <div class="card-media">
        ${imgWithFallback(s._homebrew ? null : speciesThumb(s.espece), s.espece, { fallbackEmoji:'🧬' })}
      </div>
      <div class="card-body">
        <h2 class="card-title">${escapeHtml(s.espece)}</h2>
        <div class="card-meta">
          <span class="pill pill-muted">${escapeHtml(tailleShort(s.infos?.['Taille']))}</span>
          <span class="pill pill-muted">${escapeHtml(s.infos?.['Vitesse'] || '')}</span>
          ${s._homebrew ? `<span class="pill">✨ Homebrew</span>` : ''}
        </div>
        <p class="card-desc">${s.sous_especes?.length ? `${s.sous_especes.length} lignées : ${escapeHtml(s.sous_especes.map(se => se.nom).join(', '))}` : escapeHtml(s.infos?.['Type de créature']||'')}</p>
      </div>
    </a>
  `).join('');
}

function renderDetail(container, s){
  container.innerHTML = `
    <a href="#races" class="btn btn-ghost btn-sm" style="margin-bottom:1.4rem;">&larr; Toutes les races</a>
    <div class="detail-hero">
      <div class="detail-portrait">${imgWithFallback(s._homebrew ? null : speciesImage(s.espece), s.espece, { fallbackEmoji:'🧬' })}</div>
      <div class="detail-heading">
        <p class="eyebrow">Espèce jouable</p>
        <h1 class="page-title" style="font-size:2.2rem;">${escapeHtml(s.espece)}</h1>
        <div class="detail-badges">
          ${s._homebrew ? `<span class="pill">✨ Homebrew</span>` : ''}
          <span class="pill">${escapeHtml(s.infos?.['Type de créature']||'')}</span>
          <span class="pill">${escapeHtml(tailleShort(s.infos?.['Taille']))}</span>
          <span class="pill">${escapeHtml(s.infos?.['Vitesse']||'')}</span>
        </div>
        <p class="page-lede" style="margin-top:.9em;font-size:.94em;">Gabarit&nbsp;: ${escapeHtml(s.infos?.['Taille']||'')}</p>
        ${s.sous_especes?.length ? `<p class="page-lede" style="margin-top:.4em;font-size:1em;">Lignées : ${s.sous_especes.map(se => escapeHtml(se.nom)).join(', ')}</p>` : ''}
      </div>
    </div>

    <div class="divider"></div>

    ${s.sous_especes?.length ? `
    <section class="prose reading" style="margin-bottom:2em;">
      <h2 class="eyebrow" style="font-size:.85rem;">Lignées</h2>
      <div class="capacite-list">
        ${s.sous_especes.map(se => `
          <article class="capacite-block">
            <h3>${escapeHtml(se.nom)}</h3>
            <div class="prose">${enrichHTML(se.description, { isPlainText:true })}</div>
          </article>
        `).join('')}
      </div>
    </section>` : ''}

    <section class="prose reading">
      <h2 class="eyebrow" style="font-size:.85rem;">Traits raciaux</h2>
      <div class="capacite-list">
        ${(s.capacites||[]).map(cap => `
          <article class="capacite-block is-collapsible">
            <button type="button" class="capacite-toggle" data-cap-toggle>
              <span class="capacite-toggle-title">${escapeHtml(cap.nom)}</span>
              <svg class="i chevron"><use href="#i-chevron"/></svg>
            </button>
            <div class="capacite-body">
              <div class="prose">${enrichHTML(cap.description, { isPlainText:true })}</div>
              ${(cap.tables||[]).map(t => `
                <div class="table-wrap">
                  <p class="table-title">${escapeHtml(t.titre)}</p>
                  ${t.html}
                </div>
              `).join('')}
            </div>
          </article>
        `).join('')}
      </div>
      ${renderExtraTables(s.tables)}
    </section>
  `;

  container.querySelectorAll('[data-cap-toggle]').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.is-collapsible').classList.toggle('is-expanded'));
  });
}

function renderExtraTables(tables){
  if(!tables || !tables.length) return '';
  return `<h2 class="eyebrow" style="font-size:.85rem;margin-top:2em;">Tables complémentaires</h2>` +
    tables.map(t => `<div class="table-wrap"><p class="table-title">${escapeHtml(t.titre||'')}</p>${t.html}</div>`).join('');
}
