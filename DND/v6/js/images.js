// Résolution des chemins d'images locales (img/*) à partir des données JSON.
// Aucune image distante n'est jamais chargée.

import { slugify, stripAccents, escapeHtml } from './utils.js';

const SPECIES_SLUGS = {
  'elfe': 'elf',
  'nain': 'dwarf',
  'humain': 'human',
  'halfelin': 'halfling',
  'gnome': 'gnome',
  'tieffelin': 'tiefling',
  'orc': 'orc',
  'drakeide': 'dragonborn',
  'goliath': 'goliath',
};

export function speciesSlug(name){
  const key = slugify(name);
  return SPECIES_SLUGS[key] || key;
}
export function speciesImage(name){
  return `img/species/${speciesSlug(name)}.png`;
}
export function speciesThumb(name){
  return `img/species/thunbmail_${speciesSlug(name)}.png`;
}

// Corrections des slugs de sorts dont le fichier réel diffère du nom calculé.
const SPELL_SLUG_FIX = {
  amis: 'faux_amis',
  lumieres_dansantes: 'lumiere_dansantes',
  main_de_mage: 'main_du_mage',
  armure_de_mage: 'armure_du_mage',
  charme_personne: 'charmepersonne',
  agrandissement_rapetissement: 'agrandissement__rapetissement',
  apaisement_des_emotions: 'apaisemment_des_emotions',
  cecite_surdite: 'cecitesurdite',
  localisation_danimaux_ou_de_plantes: 'localisation_danimaux_ou_de_plante',
  verrou_arcanique: 'verrou_magique',
  convocation_de_mort_vivant: 'convocation_de_mortvivant',
  invocation_de_projectiles: 'herissement_de_projectiles',
  marche_sur_leau: 'marche_sur_londe',
  peur: 'terreur',
  charme_monstre: 'charmemonstre',
  fontaine_de_lune: 'fontaine_de_la_lune',
  oeil_du_mage: 'il_du_mage',
  sphere_resiliente_dotiluke: 'sphere_resiliente_d_otiluke',
  communion_avec_la_nature: 'communion',
  passe_muraille: 'passemuraille',
  chaudron_bouillonnant_de_tasha: 'chaudron_bouillant_de_tasha',
  creation_de_mort_vivant: 'creation_de_mortvivant',
  mauvais_oeil: 'mauvais_il',
  protections_et_sceaux: 'protection_et_sceaux',
  urne_magique: 'possession',
  aversion_attirance: 'aversion__attirance',
  demi_plan: 'demiplan',
};

export function spellPrimaryName(name){
  return String(name || '').split('|')[0].trim();
}
export function spellAltName(name){
  const parts = String(name || '').split('|');
  return parts.length > 1 ? parts[1].trim() : null;
}
export function spellSlug(name){
  const base = spellPrimaryName(name).toLowerCase();
  let slug = stripAccents(base)
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
  return SPELL_SLUG_FIX[slug] || slug;
}
export function spellImage(name){
  return `img/sorts/${spellSlug(name)}.png`;
}

export function classImageLocal(remoteUrl){
  if(!remoteUrl) return null;
  const file = remoteUrl.split('/').pop();
  return `img/classes/${file}`;
}

const DAMAGE_TYPE_WORDS = {
  'acide': 'acid', 'acides': 'acid',
  'contondant': 'bludgeoning', 'contondants': 'bludgeoning', 'contondante': 'bludgeoning',
  'froid': 'cold',
  'feu': 'fire',
  'force': 'force',
  'foudre': 'lightning',
  'necrotique': 'necrotic', 'necrotiques': 'necrotic',
  'perforant': 'piercing', 'perforants': 'piercing', 'perforante': 'piercing',
  'poison': 'poison',
  'psychique': 'psychic', 'psychiques': 'psychic',
  'radiant': 'radiant', 'radiants': 'radiant', 'radiante': 'radiant',
  'tranchant': 'slashing', 'tranchants': 'slashing', 'tranchante': 'slashing',
  'tonnerre': 'thunder',
};
export const DAMAGE_TYPE_LIST = Object.keys(DAMAGE_TYPE_WORDS);
export function damageTypeKey(word){
  return DAMAGE_TYPE_WORDS[stripAccents(String(word || '')).toLowerCase()] || null;
}
export function damageTypeImage(key){
  return `img/type_degats/${key}_damage.png`;
}

// Libellé français de chaque type (la couleur vit en CSS : .dmg-<key>).
export const DAMAGE_TYPE_LABELS = {
  acid: 'acide', bludgeoning: 'contondant', cold: 'froid', fire: 'feu',
  force: 'force', lightning: 'foudre', necrotic: 'nécrotique', piercing: 'perforant',
  poison: 'poison', psychic: 'psychique', radiant: 'radiant', slashing: 'tranchant',
  thunder: 'tonnerre',
};

/** Badge coloré (icône + mot) pour un type de dégâts. `word` = mot d'origine du texte. */
export function damageBadgeHTML(key, word){
  return `<span class="dmg-badge dmg-${key}"><img src="${damageTypeImage(key)}" alt="" aria-hidden="true">${escapeHtml(word)}</span>`;
}

/** Met en couleur les types de dégâts d'une chaîne courte (ex. "1d8 perforants"). */
export function colorizeDamageString(str){
  return escapeHtml(String(str || '')).replace(/([a-zàâäéèêëîïôöùûüç]+)/gi, (m) => {
    const key = damageTypeKey(m);
    return key ? damageBadgeHTML(key, m) : m;
  });
}

/**
 * Lit un fichier image local, le réduit à `size` px max (grand côté) et renvoie
 * un dataURL JPEG compact via `cb` — assez petit pour vivre en localStorage.
 */
export function imageFileToDataURL(file, size, cb){
  if(!file || !String(file.type || '').startsWith('image/')) return;
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    const scale = Math.min(1, size / Math.max(img.width, img.height));
    const w = Math.max(1, Math.round(img.width * scale));
    const h = Math.max(1, Math.round(img.height * scale));
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#141019'; // fond sombre pour les PNG transparents
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);
    URL.revokeObjectURL(url);
    cb(canvas.toDataURL('image/jpeg', 0.85));
  };
  img.onerror = () => URL.revokeObjectURL(url);
  img.src = url;
}

// <img> avec repli élégant : jamais d'icône cassée visible.
export function imgWithFallback(src, alt, { className = '', fallbackEmoji = '✦', fallbackClass = '' } = {}){
  const safeAlt = escapeHtml(alt);
  if(!src){
    return `<span class="img-wrap is-broken ${fallbackClass}" data-fallback="1">`
      + `<span class="img-fallback" aria-hidden="true" role="img" aria-label="${safeAlt}">${fallbackEmoji}</span>`
      + `</span>`;
  }
  return `<span class="img-wrap ${fallbackClass}" data-fallback="1">`
    + `<img src="${src}" alt="${safeAlt}" class="${className}" loading="lazy" `
    + `onerror="this.closest('[data-fallback]').classList.add('is-broken'); this.remove();">`
    + `<span class="img-fallback" aria-hidden="true">${fallbackEmoji}</span>`
    + `</span>`;
}
