// Extraction de données structurées depuis "html_traits_table" et "html_capacites_table"
// de classes.json (caractéristique principale, dé de vie, sauvegardes, compétences,
// équipement de départ, progression d'incantation). Ces informations existent déjà dans
// les données sous forme de tableaux HTML : on les lit plutôt que de les redéfinir à la main.

import { stripAccents } from './utils.js';

export const ALL_SKILLS = [
  'Acrobaties', 'Arcanes', 'Athlétisme', 'Discrétion', 'Dressage', 'Escamotage',
  'Histoire', 'Intimidation', 'Intuition', 'Investigation', 'Médecine', 'Nature',
  'Perception', 'Persuasion', 'Religion', 'Représentation', 'Survie', 'Tromperie',
];

function stripTags(s){ return String(s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(); }

function grabRow(html, labelPattern){
  const re = new RegExp(labelPattern + '.*?</td>\\s*<td>(.*?)</td>', 's');
  const m = html.match(re);
  return m ? stripTags(m[1]) : '';
}

export function parseClassTraits(html_traits_table){
  const html = html_traits_table || '';
  const carac = grabRow(html, "Caract[ée]ristique principale");
  const deVieRaw = grabRow(html, "D[ée] de vie");
  const saves = grabRow(html, "jets? de sauvegarde");
  const armures = grabRow(html, "(?:Ma[iî]trises? d.armures?|Formation aux armures)");
  const armes = grabRow(html, "Ma[iî]trises? d.armes?");
  const competencesRaw = grabRow(html, "Ma[iî]trises? de comp[ée]tence");

  const deFaces = parseInt((deVieRaw.match(/D(\d+)/i) || [])[1] || '8', 10);
  const sauvegardes = saves.split(/,|\bet\b/i).map(s => s.trim()).filter(Boolean);

  let competences = { count: 2, options: ALL_SKILLS.slice() };
  const parmiMatch = competencesRaw.match(/(\d+)[^:]*:\s*(.+)/i);
  if(parmiMatch){
    const count = parseInt(parmiMatch[1], 10);
    const options = parmiMatch[2].split(/,|\bet\b/i).map(s => s.trim()).filter(Boolean);
    competences = { count, options };
  } else {
    const countMatch = competencesRaw.match(/(\d+)/);
    competences = { count: countMatch ? parseInt(countMatch[1], 10) : 2, options: ALL_SKILLS.slice() };
  }

  return {
    caracteristique: carac,
    deVieFaces: deFaces,
    deVieLabel: deVieRaw,
    sauvegardes,
    armures,
    armes,
    competences,
  };
}

/** L'équipement de départ officiel ("(A) ... ; ou (B) ...") est déjà dans html_traits_table. */
export function parseStartingEquipmentChoices(html_traits_table){
  const raw = grabRow(html_traits_table || '', "quipement de d[ée]part");
  if(!raw) return [];
  const body = raw.includes(':') ? raw.slice(raw.indexOf(':') + 1) : raw;
  const chunks = body.split(';').map(c => c.trim()).filter(Boolean);
  const options = [];
  for(const rawChunk of chunks){
    const chunk = rawChunk.replace(/^ou\s+/i, '');
    const m = chunk.match(/^\(([A-C])\)\s*(.+)$/);
    if(!m) continue;
    const label = m[1];
    let rest = m[2];
    const lastEt = rest.lastIndexOf(' et ');
    if(lastEt !== -1) rest = rest.slice(0, lastEt) + ', ' + rest.slice(lastEt + 4);
    const tokens = rest.split(',').map(t => t.trim()).filter(Boolean);
    const items = [];
    let gold = 0;
    for(const t of tokens){
      const goldMatch = t.match(/^(\d+(?:[.,]\d+)?)\s*po$/i);
      if(goldMatch){ gold += parseFloat(goldMatch[1].replace(',', '.')); continue; }
      const qtyMatch = t.match(/^(\d+)\s+(.+)$/);
      let qty = 1, name = t;
      if(qtyMatch){ qty = parseInt(qtyMatch[1], 10); name = qtyMatch[2]; }
      name = name.charAt(0).toUpperCase() + name.slice(1);
      items.push({ name, qty });
    }
    options.push({ label, items, gold });
  }
  return options;
}

// Clé de colonne insensible aux espaces/accents/casse (les en-têtes du HTML source
// contiennent parfois des mots collés, séquelle d'un <br> d'origine).
function resourceColKey(s){
  return stripAccents(String(s || '')).toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Colonnes de ressource propres à une classe (Rages, Points de Credo, Sorcellerie...)
 * depuis html_capacites_table. Retourne un tableau indexé par niveau (index 0 = niveau 1),
 * chaque entrée = { [cléNormalisée]: valeurBrute }, ou null si absent.
 */
export function parseClassResourceColumns(html_capacites_table){
  const html = html_capacites_table || '';
  if(!html) return null;
  const table = document.createElement('table');
  table.innerHTML = html;
  const rows = Array.from(table.querySelectorAll('tr'));

  let headerRow = null, headerIdx = -1;
  rows.forEach((row, i) => {
    if(row.querySelector('th') && !row.querySelector('td')){ headerRow = row; headerIdx = i; }
  });
  if(!headerRow) return null;

  const headerKeys = Array.from(headerRow.children).map(c => resourceColKey(c.textContent));
  const byLevel = [];
  for(const row of rows.slice(headerIdx + 1)){
    if(!row.querySelector('td')) continue;
    const cells = Array.from(row.children).map(c => c.textContent.replace(/\s+/g, ' ').trim());
    const level = parseInt(cells[0], 10);
    if(!level) continue;
    const entry = {};
    headerKeys.forEach((key, i) => { if(i >= 3 && cells[i] != null) entry[key] = cells[i]; });
    byLevel[level - 1] = entry;
  }
  return byLevel;
}

export function readResourceColumn(byLevel, level, naturalLabel){
  const row = byLevel?.[Math.min(20, Math.max(1, parseInt(level, 10) || 1)) - 1];
  if(!row) return null;
  return row[resourceColKey(naturalLabel)] ?? null;
}

/**
 * Progression d'incantation extraite de html_capacites_table.
 * Retourne un tableau indexé par niveau de personnage, chaque entrée étant
 * { cantrips, known, slots:[niv1..niv9], pact:{n,lvl}|null }, ou null si la classe
 * n'est pas lanceuse de sorts.
 */
export function parseSpellcastingTable(html_capacites_table){
  const html = html_capacites_table || '';
  const table = document.createElement('table');
  table.innerHTML = html;
  const rows = Array.from(table.querySelectorAll('tr'));

  let headerRow = null, headerIdx = -1;
  rows.forEach((row, i) => {
    if(row.querySelector('th') && !row.querySelector('td')){ headerRow = row; headerIdx = i; }
  });
  if(!headerRow) return null;

  const headers = Array.from(headerRow.children).map(c => c.textContent.replace(/\s+/g, ' ').trim());
  let cantripsCol = -1, knownCol = -1, pactCountCol = -1, pactLevelCol = -1;
  const slotCols = {};
  headers.forEach((text, i) => {
    const norm = stripAccents(text).toLowerCase();
    if(/^[1-9]$/.test(text)) slotCols[text] = i;
    else if(norm.includes('mineurs')) cantripsCol = i;
    else if(norm.includes('emplacements') && norm.includes('niveau')) pactLevelCol = i;
    else if(norm.includes('emplacements')) pactCountCol = i;
    else if(norm.includes('prepares')) knownCol = i;
  });
  if(cantripsCol === -1 && knownCol === -1 && pactCountCol === -1 && Object.keys(slotCols).length === 0) return null;

  const num = (s) => { const n = parseInt(String(s ?? '').replace(/[^\d]/g, ''), 10); return Number.isFinite(n) ? n : 0; };

  const byLevel = [];
  for(const row of rows.slice(headerIdx + 1)){
    if(!row.querySelector('td')) continue;
    const cells = Array.from(row.children).map(c => c.textContent.replace(/\s+/g, ' ').trim());
    const level = num(cells[0]);
    if(!level) continue;
    const slots = Array.from({ length: 9 }, (_, i) => slotCols[String(i + 1)] != null ? num(cells[slotCols[String(i + 1)]]) : 0);
    byLevel[level - 1] = {
      cantrips: cantripsCol !== -1 ? num(cells[cantripsCol]) : 0,
      known: knownCol !== -1 ? num(cells[knownCol]) : 0,
      slots,
      pact: pactCountCol !== -1 ? { n: num(cells[pactCountCol]), lvl: num(cells[pactLevelCol]) } : null,
    };
  }
  return byLevel;
}
