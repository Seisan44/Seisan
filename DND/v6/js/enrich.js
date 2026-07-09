// Moteur d'enrichissement de texte : liens de glossaire (#id# et détection libre),
// abréviations, notation de dés, DD et types de dégâts mis en valeur.
// N'opère que sur les nœuds texte — jamais sur le HTML brut — pour rester sûr
// quelle que soit la structure des descriptions sources.

import { escapeHtml, stripAccents } from './utils.js';
import { damageTypeKey, damageBadgeHTML } from './images.js';

const SPELL_HREF_RE = /aidedd\.org\/spell\//i;
const SINGLE_WORD_MAX_CHARS = 11; // termes courts => exigent la casse capitalisée du texte source
const MARK_RE = /CHUNK(\d+)/g;

let ENRICH_CTX = null;
let SPELL_INDEX = null; // Map<nom normalisé, slug>

function normalizeSpellName(s){
  return stripAccents(String(s || ''))
    .replace(/[œŒ]/g, 'oe').replace(/[æÆ]/g, 'ae')
    .replace(/[’‘]/g, "'")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

export function buildSpellIndex(sorts){
  const index = new Map();
  for(const s of sorts || []){
    const key = normalizeSpellName(s._primaryName);
    if(key && !index.has(key)) index.set(key, s._slug);
  }
  SPELL_INDEX = index;
  return index;
}

export function buildGlossaryIndex(glossaireRaw){
  const index = new Map();
  const addAll = (list, categorie) => {
    for(const entry of list || []){
      index.set(entry.id, { ...entry, categorie: entry.categorie || categorie });
    }
  };
  addAll(glossaireRaw.glossaire, 'mécanique');
  addAll(glossaireRaw.actions, 'action');
  addAll(glossaireRaw.etats, 'etat');

  const terms = Array.from(index.values()).map(entry => {
    const isMulti = /[\s'’-]/.test(entry.terme.trim());
    return { id: entry.id, terme: entry.terme, multiWord: isMulti || entry.terme.length > SINGLE_WORD_MAX_CHARS };
  });
  terms.sort((a, b) => b.terme.length - a.terme.length);

  const abbrevEntries = Object.entries(glossaireRaw.abreviations || {})
    .filter(([code]) => code.length >= 2);
  abbrevEntries.sort((a, b) => b[0].length - a[0].length);

  ENRICH_CTX = { index, terms, abbrevEntries };
  return ENRICH_CTX;
}

export function getGlossaryEntry(id){
  return ENRICH_CTX?.index.get(id) || null;
}
export function getGlossaryIndex(){
  return ENRICH_CTX?.index || new Map();
}

function escRe(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function buildTermRegex(terme){
  const pattern = escRe(terme).replace(/['’]/g, "['’]");
  return new RegExp(`\\b${pattern}(?:s|es|e)?\\b`, 'g');
}

// Enrichit un fragment de texte ; `used` (Set) est partagé sur tout un bloc pour
// ne créer qu'un seul lien par identifiant de glossaire dans une même description.
function enrichSegment(text, used){
  if(!ENRICH_CTX || !text) return escapeHtml(text || '');
  const { index, terms, abbrevEntries } = ENRICH_CTX;
  const chunks = [];
  const protect = (html) => { chunks.push(html); return `CHUNK${chunks.length - 1}`; };

  let s = text;

  // 1) motif explicite #identifiant#
  s = s.replace(/#([a-z0-9-]+)#/gi, (m, id) => {
    const key = id.toLowerCase();
    const entry = index.get(key);
    if(entry){
      used.add(key);
      return protect(`<span class="term-link" data-glossary-id="${key}" tabindex="0" role="button" aria-haspopup="true">${escapeHtml(entry.terme)}</span>`);
    }
    return protect(`<strong class="term-fallback">${escapeHtml(id.replace(/-/g, ' '))}</strong>`);
  });

  // 2) termes du glossaire détectés en texte libre (première occurrence)
  for(const term of terms){
    if(used.has(term.id)) continue;
    const re = buildTermRegex(term.terme);
    let matched = false;
    s = s.replace(re, (m) => {
      if(matched || used.has(term.id)) return m;
      if(!term.multiWord && m[0] !== m[0].toUpperCase()) return m;
      matched = true; used.add(term.id);
      return protect(`<span class="term-link" data-glossary-id="${term.id}" tabindex="0" role="button" aria-haspopup="true">${m}</span>`);
    });
  }

  // 3) abréviations connues (tooltip de définition)
  for(const [code, def] of abbrevEntries){
    const flagKey = 'abbr:' + code;
    if(used.has(flagKey)) continue;
    const re = new RegExp(`\\b${escRe(code)}\\b`, 'g');
    let matched = false;
    s = s.replace(re, (m) => {
      if(matched) return m;
      matched = true; used.add(flagKey);
      return protect(`<span class="term-link" data-abbr-def="${escapeHtml(def)}" data-abbr-code="${escapeHtml(code)}" tabindex="0" role="button" aria-haspopup="true">${m}</span>`);
    });
  }

  // 4) DD suivi d'un nombre
  s = s.replace(/\bDD\s?(\d{1,2})\b/g, (m, n) => protect(`<span class="kw-dc">DD&nbsp;${n}</span>`));

  // 5) notation de dés (1d6, 2d10...)
  s = s.replace(/\b(\d{1,3}\s?[dD]\s?\d{1,3})\b/g, (m) => protect(`<span class="kw-dice">${m.replace(/\s/g, '')}</span>`));

  // 6) types de dégâts dans leur contexte ("dégâts de feu", "1d8 perforants",
  //    "résistance aux dégâts contondants"…) — badge coloré par type.
  s = s.replace(/(d[ée]g[âa]ts?\s+(?:de\s+|d[’']\s?)?)([a-zàâäéèêëîïôöùûüç]+)/gi, (m, prefix, word) => {
    const key = damageTypeKey(word);
    if(!key) return m;
    return prefix + protect(damageBadgeHTML(key, word));
  });
  s = s.replace(/(CHUNK\d+\s+)([a-zàâäéèêëîïôöùûüç]+)/gi, (m, dice, word) => {
    const key = damageTypeKey(word);
    if(!key) return m;
    return dice + protect(damageBadgeHTML(key, word));
  });

  let out = escapeHtml(s);
  MARK_RE.lastIndex = 0;
  out = out.replace(MARK_RE, (m, i) => chunks[Number(i)]);
  return out;
}

/**
 * Enrichit du texte brut (isPlainText) ou un fragment HTML existant.
 * Les liens <a> hérités de la source (aidedd.org) sont désamorcés ; ceux qui
 * pointent vers un sort connu deviennent des déclencheurs locaux (.spell-link).
 */
export function enrichHTML(input, { isPlainText = false } = {}){
  if(input == null || input === '') return '';
  const container = document.createElement('div');
  if(isPlainText){
    const paragraphs = String(input).split(/\n{2,}/).map(p => p.trim()).filter(Boolean);
    const list = paragraphs.length ? paragraphs : [String(input)];
    container.innerHTML = list.map(() => `<p></p>`).join('');
    const ps = container.querySelectorAll('p');
    list.forEach((p, i) => { ps[i].textContent = p; });
  } else {
    container.innerHTML = String(input);
  }

  container.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href') || '';
    const slug = SPELL_INDEX && SPELL_HREF_RE.test(href) ? SPELL_INDEX.get(normalizeSpellName(a.textContent)) : null;
    if(slug){
      const span = document.createElement('span');
      span.className = 'spell-link';
      span.dataset.spellSlug = slug;
      span.tabIndex = 0;
      span.setAttribute('role', 'button');
      span.setAttribute('aria-haspopup', 'dialog');
      span.append(...Array.from(a.childNodes));
      a.replaceWith(span);
    } else {
      a.replaceWith(...Array.from(a.childNodes));
    }
  });

  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
    acceptNode(node){
      if(!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      const parentEl = node.parentElement;
      const tag = parentEl?.tagName;
      if(tag === 'SCRIPT' || tag === 'STYLE') return NodeFilter.FILTER_REJECT;
      if(parentEl?.closest('.spell-link')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const nodes = [];
  let n;
  while((n = walker.nextNode())) nodes.push(n);

  const used = new Set();
  for(const node of nodes){
    const html = enrichSegment(node.nodeValue, used);
    const tpl = document.createElement('template');
    tpl.innerHTML = html;
    node.replaceWith(tpl.content);
  }
  return container.innerHTML;
}
