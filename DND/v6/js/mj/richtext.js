// Mise en forme « markdown-lite » des textes libres de la section MJ.
// Le stockage reste du TEXTE BRUT (exports JSON, detectRefs() et liens wiki
// inchangés) : la syntaxe légère n'est interprétée qu'au rendu, et chaque
// segment de texte passe par wikify() — échappement + liens wiki, aucune
// injection possible.
//
// Syntaxe : # titre / ## / ###, **gras**, *italique*, __souligné__,
// ==surligné==, {rouge: texte} (rouge, ambre, vert, bleu, violet),
// - liste (aussi • et 1.), > encadré « à lire aux joueurs »,
// --- séparateur, | tableaux | façon markdown |.

import { el } from '../utils.js';
import { openModal } from '../ui.js';
import { wikify } from './wiki.js';

export const RT_COLORS = [
  { key: 'rouge',  label: 'Rouge' },
  { key: 'ambre',  label: 'Ambre' },
  { key: 'vert',   label: 'Vert' },
  { key: 'bleu',   label: 'Bleu' },
  { key: 'violet', label: 'Violet' },
];

/* ------------------------------ Rendu en ligne ----------------------------- */

// Un seul motif pour tous les jetons ; l'alternative ** avant * (gloutonnerie
// de gauche à droite). Groupes : 1-2 couleur+texte, 3 gras, 4 italique,
// 5 souligné, 6 surligné.
const INLINE_RE = new RegExp(
  `\\{(${RT_COLORS.map(c => c.key).join('|')})\\s*:\\s*([^{}]+)\\}`
  + '|\\*\\*([^*]+)\\*\\*'
  + '|\\*([^*]+)\\*'
  + '|__([^_]+)__'
  + '|==([^=]+)==',
  'i'
);

/**
 * Variante « en ligne » : styles de texte seulement, pas de blocs. Pour les
 * textes d'une ligne (journal, objectifs, actions de stat block) — s'utilise
 * exactement comme wikify().
 */
export function renderRichInline(text){
  let out = '';
  let rest = String(text ?? '');
  while(rest){
    const m = INLINE_RE.exec(rest);
    if(!m){ out += wikify(rest); break; }
    out += wikify(rest.slice(0, m.index));
    if(m[2] != null)      out += `<span class="rt-c rt-c-${m[1].toLowerCase()}">${renderRichInline(m[2])}</span>`;
    else if(m[3] != null) out += `<strong>${renderRichInline(m[3])}</strong>`;
    else if(m[4] != null) out += `<em>${renderRichInline(m[4])}</em>`;
    else if(m[5] != null) out += `<u>${renderRichInline(m[5])}</u>`;
    else                  out += `<mark class="rt-mark">${renderRichInline(m[6])}</mark>`;
    rest = rest.slice(m.index + m[0].length);
  }
  return out;
}

/* ------------------------------- Rendu en blocs ---------------------------- */

const isHr       = t => /^(-{3,}|\*{3,})$/.test(t);
const isTableRow = t => /^\|.*\|$/.test(t);
const isTableSep = t => /^\|?[\s:|-]+\|?$/.test(t) && t.includes('-');
const BULLET_RE  = /^[-*•]\s+/;
const ORDERED_RE = /^\d+[.)]\s+/;

function tableHTML(rows){
  const cells = r => r.replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
  let header = null;
  let body = rows;
  if(rows.length >= 2 && isTableSep(rows[1])){
    header = cells(rows[0]);
    body = rows.slice(2);
  }
  const thead = header
    ? `<thead><tr>${header.map(c => `<th>${renderRichInline(c)}</th>`).join('')}</tr></thead>`
    : '';
  const tbody = `<tbody>${body.filter(r => !isTableSep(r)).map(r =>
    `<tr>${cells(r).map(c => `<td>${renderRichInline(c)}</td>`).join('')}</tr>`).join('')}</tbody>`;
  // Le conteneur porte le défilement horizontal : un grand tableau ne
  // déborde jamais de sa carte ou de sa modale.
  return `<div class="rt-tablewrap"><table class="rt-table">${thead}${tbody}</table></div>`;
}

/**
 * Transforme un texte brut markdown-lite en HTML sûr (blocs + styles en
 * ligne + liens wiki). Remplace wikify() pour les textes longs de la section
 * MJ. Retourne '' si le texte est vide.
 */
export function renderRich(text){
  const src = String(text ?? '').replace(/\r\n?/g, '\n');
  if(!src.trim()) return '';
  const lines = src.split('\n');
  const out = [];
  const paragraph = [];
  const flushP = () => {
    if(!paragraph.length) return;
    out.push(`<p>${paragraph.map(renderRichInline).join('<br>')}</p>`);
    paragraph.length = 0;
  };

  let i = 0;
  while(i < lines.length){
    const t = lines[i].trim();

    if(!t){ flushP(); i++; continue; }
    if(isHr(t)){ flushP(); out.push('<hr class="rt-hr">'); i++; continue; }

    const h = t.match(/^(#{1,3})\s+(.*)$/);
    if(h){
      flushP();
      const lvl = h[1].length; // h3..h5 réels : jamais en concurrence avec les h1/h2 des vues
      out.push(`<h${lvl + 2} class="rt-h rt-h${lvl}">${renderRichInline(h[2])}</h${lvl + 2}>`);
      i++; continue;
    }

    if(t.startsWith('>')){
      flushP();
      const quote = [];
      while(i < lines.length && lines[i].trim().startsWith('>')){
        quote.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      out.push(`<aside class="rt-lecture">${quote.map(renderRichInline).join('<br>')}</aside>`);
      continue;
    }

    if(BULLET_RE.test(t) || ORDERED_RE.test(t)){
      flushP();
      const ordered = ORDERED_RE.test(t);
      const re = ordered ? ORDERED_RE : BULLET_RE;
      const items = [];
      while(i < lines.length && re.test(lines[i].trim())){
        items.push(lines[i].trim().replace(re, ''));
        i++;
      }
      const tag = ordered ? 'ol' : 'ul';
      out.push(`<${tag} class="rt-list">${items.map(x => `<li>${renderRichInline(x)}</li>`).join('')}</${tag}>`);
      continue;
    }

    if(isTableRow(t)){
      flushP();
      const rows = [];
      while(i < lines.length && isTableRow(lines[i].trim())){
        rows.push(lines[i].trim());
        i++;
      }
      out.push(tableHTML(rows));
      continue;
    }

    paragraph.push(lines[i]);
    i++;
  }
  flushP();
  return `<div class="rt">${out.join('')}</div>`;
}

/**
 * Texte débarrassé de toute syntaxe (jetons en ligne déballés, marqueurs de
 * bloc retirés, tableaux aplatis) — pour les extraits et les tooltips.
 */
export function stripMarks(text){
  let s = String(text ?? '');
  const re = new RegExp(INLINE_RE.source, 'gi');
  // Jetons imbriqués ({rouge: **gras**}) : quelques passes suffisent.
  for(let pass = 0; pass < 4; pass++){
    re.lastIndex = 0;
    if(!re.test(s)) break;
    s = s.replace(re, (_, c, colored, bold, italic, underline, marked) =>
      colored ?? bold ?? italic ?? underline ?? marked ?? '');
  }
  return s.split('\n').map(l => {
    const t = l.trim();
    if(isHr(t) || isTableSep(t)) return '';
    if(isTableRow(t)) return t.replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim()).join(' · ');
    return t.replace(/^#{1,3}\s+/, '').replace(/^>\s?/, '').replace(BULLET_RE, '').replace(ORDERED_RE, '');
  }).filter(Boolean).join(' ');
}

/* ------------------------- Barre d'outils d'édition ------------------------ */

const TABLE_TEMPLATE = '| Colonne | Colonne |\n| --- | --- |\n|  |  |\n|  |  |';

/**
 * Barre de mise en forme à poser au-dessus d'un textarea : insère la syntaxe
 * autour de la sélection, sans jamais lui voler le focus (pointerdown
 * neutralisé) — les gestionnaires blur/focusout des vues restent valables.
 */
export function richToolbar(ta){
  const apply = (fn) => {
    ta.focus();
    fn();
    ta.dispatchEvent(new Event('input', { bubbles: true }));
  };

  const wrapSel = (before, after = before) => apply(() => {
    const a = ta.selectionStart, b = ta.selectionEnd;
    const sel = ta.value.slice(a, b);
    ta.setRangeText(before + sel + after, a, b);
    if(sel) ta.setSelectionRange(a, b + before.length + after.length);
    else ta.setSelectionRange(a + before.length, a + before.length);
  });

  // Préfixe de ligne (titre, liste, encadré) : bascule sur toutes les lignes
  // de la sélection — recliquer l'enlève.
  const linePrefix = (prefix) => apply(() => {
    const v = ta.value;
    const start = v.lastIndexOf('\n', ta.selectionStart - 1) + 1;
    let end = v.indexOf('\n', ta.selectionEnd);
    if(end === -1) end = v.length;
    const rows = v.slice(start, end).split('\n');
    const on = rows.every(l => l.startsWith(prefix));
    const next = rows.map(l => on ? l.slice(prefix.length) : (l.startsWith(prefix) ? l : prefix + l)).join('\n');
    ta.setRangeText(next, start, end);
    ta.setSelectionRange(start, start + next.length);
  });

  const insertBlock = (snippet) => apply(() => {
    const a = ta.selectionStart;
    const lead = a > 0 && ta.value[a - 1] !== '\n' ? '\n' : '';
    const text = `${lead}${snippet}\n`;
    ta.setRangeText(text, a, ta.selectionEnd);
    ta.setSelectionRange(a + text.length, a + text.length);
  });

  const btn = (html, label, onclick, cls = '') => {
    const b = el('button', { class: `rt-tb-btn${cls ? ` ${cls}` : ''}`, type: 'button', 'aria-label': label, html, onclick });
    // Un clic sur la barre ne doit pas « blur » le textarea : les vues à
    // édition-au-clic (sessions, brainstorm) sauvent et referment au blur.
    b.addEventListener('pointerdown', (e) => e.preventDefault());
    return b;
  };

  const colorMenu = el('div', { class: 'rt-tb-menu hidden' }, RT_COLORS.map(c => {
    const s = el('button', {
      class: `rt-tb-swatch rt-swatch-${c.key}`, type: 'button', 'aria-label': c.label,
      onclick: () => { colorMenu.classList.add('hidden'); wrapSel(`{${c.key}: `, '}'); },
    });
    s.addEventListener('pointerdown', (e) => e.preventDefault());
    return s;
  }));
  const colorWrap = el('span', { class: 'rt-tb-colorwrap' }, [
    btn('🎨', 'Couleur du texte', () => colorMenu.classList.toggle('hidden')),
    colorMenu,
  ]);

  const sep = () => el('span', { class: 'rt-tb-sep', 'aria-hidden': 'true' });

  return el('div', { class: 'rt-toolbar', role: 'toolbar', 'aria-label': 'Mise en forme' }, [
    btn('<strong>B</strong>', 'Gras', () => wrapSel('**')),
    btn('<em>I</em>', 'Italique', () => wrapSel('*')),
    btn('<u>S</u>', 'Souligné', () => wrapSel('__')),
    btn('<span class="rt-tb-mark">ab</span>', 'Surligner', () => wrapSel('==')),
    colorWrap,
    sep(),
    btn('H1', 'Grand titre', () => linePrefix('# ')),
    btn('H2', 'Sous-titre', () => linePrefix('## ')),
    sep(),
    btn('•', 'Liste', () => linePrefix('- ')),
    btn('❝', 'Encadré « à lire aux joueurs »', () => linePrefix('> ')),
    btn('▦', 'Insérer un tableau', () => insertBlock(TABLE_TEMPLATE)),
    sep(),
    btn('?', 'Aide-mémoire de mise en forme', openCheatsheet, 'rt-tb-help'),
  ]);
}

/** Le textarea et sa barre, prêts à poser dans un formulaire ou une vue. */
export function richEditor(ta){
  return el('div', { class: 'rt-editor' }, [richToolbar(ta), ta]);
}

/* -------------------------------- Aide-mémoire ----------------------------- */

function openCheatsheet(){
  const row = (syntax, demo) => `<tr><td><code>${syntax}</code></td><td>${demo}</td></tr>`;
  const html = `<table class="rt-help-table"><tbody>
    ${row('**gras**', '<strong>gras</strong>')}
    ${row('*italique*', '<em>italique</em>')}
    ${row('__souligné__', '<u>souligné</u>')}
    ${row('==surligné==', '<mark class="rt-mark">surligné</mark>')}
    ${row('{rouge: texte}', `<span class="rt-c rt-c-rouge">texte</span> — ${RT_COLORS.map(c => `<span class="rt-c rt-c-${c.key}">${c.key}</span>`).join(', ')}`)}
    ${row('# Titre', '<span class="rt-h rt-h1">Grand titre</span> (## et ### pour les niveaux suivants)')}
    ${row('- élément', 'liste à puces (1. pour une liste numérotée)')}
    ${row('&gt; texte', 'encadré « à lire aux joueurs »')}
    ${row('---', 'séparateur horizontal')}
    ${row('| A | B |', 'tableau — 2ᵉ ligne <code>| --- | --- |</code> pour l’en-tête')}
  </tbody></table>
  <p class="mj-hint">La mise en forme apparaît à la sortie du champ. Les noms de vos PNJ, lieux et objets deviennent des liens automatiquement.</p>`;
  openModal({ title: '🖋️ Mise en forme', html, className: 'modal-rt-help' });
}
