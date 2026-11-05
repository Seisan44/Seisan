// Page Historiques : les 16 origines 2024 (caractéristiques, don, compétences, équipement).

import { DATA } from '../data.js';
import { el, escapeHtml } from '../utils.js';
import { enrichHTML } from '../enrich.js';

export function historiqueDetailHTML(h){
  return `
    <div class="prose prose-dropcap">${enrichHTML(h.description || '', { isPlainText: true })}</div>
    <dl class="info-table" style="margin-top:16px">
      <dt>Caractéristiques</dt><dd>${escapeHtml((h.valeurs_caracteristique || []).join(', '))} <span style="color:var(--ink-faint)">(+2/+1 ou +1/+1/+1 à répartir)</span></dd>
      <dt>Don d'origine</dt><dd>${enrichHTML(h.don || '', { isPlainText: true })}</dd>
      <dt>Compétences</dt><dd>${escapeHtml((h.maitriser_competence || []).join(', '))}</dd>
      <dt>Outils</dt><dd>${escapeHtml(h.maitrise_outils || '—')}</dd>
      <dt>Équipement A</dt><dd>${escapeHtml(h.equipement?.choix_A || '—')}</dd>
      <dt>Équipement B</dt><dd>${escapeHtml(h.equipement?.choix_B || '—')}</dd>
    </dl>
  `;
}

export function renderHistoriques(view, params){
  const [openSlug] = params;

  view.innerHTML = `
    <div class="page-head">
      <p class="page-eyebrow">Le Grimoire · Chapitre V</p>
      <h1 class="page-title">Les Historiques</h1>
      <p class="page-lede">Ton historique raconte <em>qui tu étais avant l'aventure</em>. En 2024, c'est lui qui
      donne tes bonus de caractéristiques, un don d'origine, deux compétences et ton équipement
      de départ. Choisis une vie d'avant qui donne de l'épaisseur à ton héros.</p>
    </div>
    <div id="histo-list"></div>
  `;

  const zone = view.querySelector('#histo-list');
  for(const h of DATA.historiques){
    const details = el('details', { class: 'acc', id: `histo-${h.slug}` });
    if(h.slug === openSlug) details.open = true;
    details.innerHTML = `
      <summary>${escapeHtml(h.nom)}
        <span class="chip" style="font-weight:400">${escapeHtml((h.valeurs_caracteristique || []).map(v => v.slice(0, 3)).join(' / '))}</span>
        <span class="acc-level">${escapeHtml((h.don || '').split('(')[0].trim())}</span>
        <svg class="icon acc-chevron"><use href="#i-chevron"/></svg>
      </summary>
      <div class="acc-body">${historiqueDetailHTML(h)}</div>`;
    zone.appendChild(details);
  }

  if(openSlug){
    const target = view.querySelector(`#histo-${CSS.escape(openSlug)}`);
    if(target) target.scrollIntoView({ block: 'center' });
  }
}
