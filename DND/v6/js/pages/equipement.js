// Page Équipement : armes, armures, outils, matériel d'aventurier, objets magiques.

import { DATA } from '../data.js';
import { el, escapeHtml, qs, qsa, debounce, stripAccents } from '../utils.js';
import { enrichHTML } from '../enrich.js';
import { navigate } from '../router.js';

const TABS = [
  { key: 'armes', label: 'Armes' },
  { key: 'armures', label: 'Armures' },
  { key: 'outils', label: 'Outils' },
  { key: 'materiel', label: 'Matériel' },
  { key: 'magiques', label: 'Objets magiques' },
];

function propChip(name){
  const base = name.split('(')[0].trim();
  const def = DATA.weaponPropertyDefs.get(base);
  return `<span class="chip" ${def ? `title="${escapeHtml(def)}"` : ''}>${escapeHtml(name)}</span>`;
}

function armesHTML(query){
  let html = `<div class="beginner-note"><b>Lire une arme.</b> « 1d8 tranchants » = lance un dé à 8 faces,
    le résultat est le nombre de dégâts. La <em>botte</em> est un effet bonus si ta classe maîtrise
    la botte de cette arme. Survole une propriété pour sa définition.</div>`;
  for(const grp of DATA.armes.armes){
    const items = grp.armes.filter(a => !query || stripAccents(a.nom).toLowerCase().includes(query));
    if(items.length === 0) continue;
    html += `<h2 class="spell-group-title">${escapeHtml(grp.categorie)}</h2>
    <div class="table-scroll"><table class="core">
      <tr><th>Arme</th><th>Dégâts</th><th>Propriétés</th><th>Botte</th><th>Poids</th><th>Prix</th></tr>
      ${items.map(a => `<tr>
        <td><strong>${escapeHtml(a.nom)}</strong></td>
        <td>${enrichHTML(a.degats || '—', { isPlainText: true })}</td>
        <td>${(a.proprietes || []).map(propChip).join(' ') || '—'}</td>
        <td>${escapeHtml(a.botte || '—')}</td>
        <td>${escapeHtml(a.poids || '—')}</td>
        <td>${escapeHtml(a.prix || '—')}</td>
      </tr>`).join('')}
    </table></div>`;
  }
  return html;
}

function armuresHTML(query){
  let html = `<div class="beginner-note"><b>Lire une armure.</b> La CA (Classe d'Armure) est le score
    qu'une attaque doit atteindre pour te toucher. « 11 + modificateur de Dex » : ajoute ton
    modificateur de Dextérité. Les armures lourdes demandent de la Force et gênent la discrétion.</div>`;
  for(const grp of DATA.armures.armures){
    const items = grp.armures.filter(a => !query || stripAccents(a.nom).toLowerCase().includes(query));
    if(items.length === 0) continue;
    html += `<h2 class="spell-group-title">${escapeHtml(grp.categorie)}</h2>
    <div class="table-scroll"><table class="core">
      <tr><th>Armure</th><th>CA</th><th>Force</th><th>Discrétion</th><th>Poids</th><th>Prix</th></tr>
      ${items.map(a => `<tr>
        <td><strong>${escapeHtml(a.nom)}</strong></td>
        <td>${escapeHtml(a.ca || '—')}</td>
        <td>${escapeHtml(a.force || '—')}</td>
        <td>${escapeHtml(a.discretion || '—')}</td>
        <td>${escapeHtml(a.poids || '—')}</td>
        <td>${escapeHtml(a.cout || '—')}</td>
      </tr>`).join('')}
    </table></div>`;
  }
  return html;
}

function outilsHTML(query){
  const items = DATA.outils.filter(o => !query || stripAccents(o.nom).toLowerCase().includes(query));
  return items.map(o => `<details class="acc">
    <summary>${escapeHtml(o.nom)}
      <span class="chip">${escapeHtml(o.caracteristique || '')}</span>
      <span class="acc-level">${escapeHtml(o.prix || '')}</span>
      <svg class="icon acc-chevron"><use href="#i-chevron"/></svg>
    </summary>
    <div class="acc-body prose">
      ${o.poids ? `<p><strong>Poids :</strong> ${escapeHtml(o.poids)}</p>` : ''}
      ${(o.utilisations || []).length ? `<p><strong>Utilisations :</strong></p><ul>${o.utilisations.map(u => `<li>${escapeHtml(u.action)} <span class="kw-dc">DD ${u.dd}</span></li>`).join('')}</ul>` : ''}
      ${(o.artisanat || []).length ? `<p><strong>Artisanat :</strong> ${escapeHtml(o.artisanat.join(', '))}</p>` : ''}
    </div>
  </details>`).join('') || '<p class="empty-note">Aucun outil trouvé.</p>';
}

function materielHTML(query){
  const items = DATA.materiels.filter(m => !query || stripAccents(m.nom).toLowerCase().includes(query));
  return `<div class="table-scroll"><table class="core">
    <tr><th>Objet</th><th>Prix</th><th>Poids</th><th>Description</th></tr>
    ${items.map(m => `<tr>
      <td><strong>${escapeHtml(m.nom)}</strong></td>
      <td>${escapeHtml(m.prix || '—')}</td>
      <td>${escapeHtml(m.poids || '—')}</td>
      <td>${enrichHTML(m.description || '', { isPlainText: true })}</td>
    </tr>`).join('')}
  </table></div>`;
}

function magiquesHTML(query){
  const items = DATA.objetsMagiques.filter(o => !query || stripAccents(o.nom).toLowerCase().includes(query));
  return `<div class="beginner-note"><b>Objets magiques.</b> Ils se trouvent en jeu, on ne les achète pas
    au départ. « Nécessite un lien » : il faut un repos court passé à s'harmoniser avec l'objet
    pour profiter de sa magie (3 liens maximum par personnage).</div>`
    + (items.map(o => `<details class="acc">
    <summary>${escapeHtml(o.nom)}
      <span class="chip chip-arcane">${escapeHtml(o.rarete || '')}</span>
      ${/lien/i.test(o.lien || '') ? '<span class="chip chip-gold">lien requis</span>' : ''}
      <svg class="icon acc-chevron"><use href="#i-chevron"/></svg>
    </summary>
    <div class="acc-body prose">
      <p style="color:var(--ink-faint)"><em>${escapeHtml(o.type || '')}</em></p>
      ${enrichHTML(o.description || '', { isPlainText: true })}
    </div>
  </details>`).join('') || '<p class="empty-note">Aucun objet trouvé.</p>');
}

const RENDERERS = { armes: armesHTML, armures: armuresHTML, outils: outilsHTML, materiel: materielHTML, magiques: magiquesHTML };

export function renderEquipement(view, params){
  const tab = TABS.some(t => t.key === params[0]) ? params[0] : 'armes';
  let query = '';

  view.innerHTML = `
    <div class="page-head">
      <p class="page-eyebrow">Le Grimoire · Chapitre VI</p>
      <h1 class="page-title">L'Équipement</h1>
      <p class="page-lede">Armes, armures et tout le nécessaire de l'aventurier. <em>1 po (pièce d'or)
      = 10 pa (argent) = 100 pc (cuivre).</em></p>
    </div>
    <div class="tabs">
      ${TABS.map(t => `<button type="button" class="tab ${t.key === tab ? 'is-active' : ''}" data-tab="${t.key}">${t.label}</button>`).join('')}
    </div>
    <div class="filter-bar">
      <input type="search" class="input search-input" id="eq-q" placeholder="Chercher dans cette catégorie…" aria-label="Chercher un équipement">
    </div>
    <div id="eq-zone"></div>
  `;

  const zone = qs('#eq-zone', view);
  const renderZone = () => { zone.innerHTML = RENDERERS[tab](query); };

  qsa('[data-tab]', view).forEach(b => {
    b.addEventListener('click', () => navigate('equipement', b.dataset.tab));
  });
  qs('#eq-q', view).addEventListener('input', debounce((e) => {
    query = stripAccents(e.target.value).toLowerCase().trim();
    renderZone();
  }, 140));

  renderZone();
}
