// Économie d'action : badges visuels — Action (rond vert), Action bonus (rond
// orange), Réaction (étoile violette) — et détection du type d'action d'un sort
// (champ `temps`) ou d'un trait (texte officiel). Aucune règle recodée : on lit
// les formulations des données ("Par une action Bonus…", "…prendre une Réaction…").

import { escapeHtml, stripAccents } from '../utils.js';

export const ACTION_KINDS = {
  action: {
    label: 'Action',
    title: 'Action — tu en as une par tour : Attaque, Magie, Pointe, Esquive…',
  },
  bonus: {
    label: 'Action bonus',
    title: 'Action bonus — une par tour, seulement si une capacité ou un sort te la donne.',
  },
  reaction: {
    label: 'Réaction',
    title: 'Réaction — une par round, souvent hors de ton tour (ex. attaque d\'Opportunité).',
  },
};

/** Badge d'économie d'action. `compact` = symbole seul (le libellé passe en title). */
export function actionBadge(kind, { compact = false } = {}){
  const meta = ACTION_KINDS[kind];
  if(!meta) return '';
  const sym = kind === 'reaction'
    ? '<span class="act-sym act-sym-star" aria-hidden="true">★</span>'
    : '<span class="act-sym act-sym-dot" aria-hidden="true"></span>';
  return `<span class="act-badge act-${kind}${compact ? ' is-compact' : ''}" title="${escapeHtml(meta.title)}">${sym}${compact ? '' : `<span>${meta.label}</span>`}</span>`;
}

/** Type d'action d'un sort, depuis son temps d'incantation ("Action", "Action bonus",
    "Réaction, que vous prenez…"). null pour les temps longs (1 minute, 8 heures…). */
export function spellActionKind(s){
  const t = stripAccents(String(s?.temps || '')).toLowerCase().trim();
  if(t.startsWith('action bonus')) return 'bonus';
  if(t.startsWith('reaction')) return 'reaction';
  if(t.startsWith('action')) return 'action';
  return null;
}

function normText(raw){
  return ' ' + stripAccents(String(raw || ''))
    .toLowerCase()
    .replace(/['’]/g, "'")
    .replace(/\s+/g, ' ') + ' ';
}

/** Détecte le type d'action décrit par un texte de capacité. null = trait passif. */
export function detectActionKind(rawText){
  const t = normText(rawText);
  if(t.includes('action bonus')) return 'bonus';
  if(/\breaction\b/.test(t)) return 'reaction';
  if(/(par une action\b|en utilisant une action\b|utiliser une action\b|en tant qu'action\b|prendre une action\b|l'action (attaque|magie|pointe|utilisation|influence|observation|etude|furtivite|esquive|soutien|intention|desengagement)\b)/.test(t)) return 'action';
  return null;
}

function normName(s){
  return stripAccents(String(s || '')).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

// Corrections ponctuelles quand le texte officiel induirait la détection en erreur.
// null = trait passif (la capacité reste dans l'onglet Traits, sans badge).
const FEATURE_KIND_OVERRIDES = new Map([
  ['incantation', null],          // expliqué dans l'onglet Sorts, pas une "capacité activable"
  ['magie de pacte', null],
  ['bottes d arme', null],        // les bottes apparaissent sur les cartes d'armes équipées
  ['retablissement ameliore', null],
]);

/** Type d'action d'une capacité de classe / sous-classe / espèce. */
export function featureActionKind(name, text){
  const key = normName(name);
  if(FEATURE_KIND_OVERRIDES.has(key)) return FEATURE_KIND_OVERRIDES.get(key);
  return detectActionKind(text);
}

function stripTags(html){
  return String(html || '').replace(/<[^>]+>/g, ' ');
}

/**
 * Rassemble les capacités du personnage utilisables comme Action / Action bonus /
 * Réaction : capacités de classe (niveau atteint), de sous-classe, traits d'espèce,
 * style de combat choisi. Chaque entrée : { name, kind, source, sourceKind, html,
 * isPlain, tables }. Les traits passifs (kind null) sont exclus.
 */
export function collectFeatureActions(ch, d){
  const feats = [];
  const skipCap = /am.{0,2}lioration de caract|sous-classe/i;

  for(const c of d.cls?.capacites || []){
    const lvl = parseInt(c.niveau, 10);
    if(!Number.isFinite(lvl) || lvl > ch.level) continue;
    if(skipCap.test(c.capacite_name)) continue;
    const kind = featureActionKind(c.capacite_name, stripTags(c.description_html));
    if(!kind) continue;
    feats.push({ name: c.capacite_name, kind, source: d.cls.classe_title, sourceKind: 'classe', html: c.description_html || '', isPlain: false });
  }

  for(const c of d.sub?.capacites || []){
    const lvl = parseInt(c.niveau, 10);
    if(!Number.isFinite(lvl) || lvl > ch.level) continue;
    const kind = featureActionKind(c.capacite_name, stripTags(c.description_html));
    if(!kind) continue;
    feats.push({ name: c.capacite_name, kind, source: d.sub.classe_title, sourceKind: 'sous-classe', html: c.description_html || '', isPlain: false });
  }

  for(const c of d.sp?.capacites || []){
    const kind = featureActionKind(c.nom, c.description || '');
    if(!kind) continue;
    feats.push({ name: c.nom, kind, source: d.sp.espece, sourceKind: 'espèce', html: c.description || '', isPlain: true, tables: c.tables || [] });
  }

  if(ch.fightingStyle && d.fightingStyle){
    const f = d.fightingStyle;
    const kind = detectActionKind(f.desc);
    if(kind) feats.push({ name: `Style de combat : ${f.nom}`, kind, source: 'Style de combat', sourceKind: 'style', html: f.desc, isPlain: true });
  }

  return feats;
}
