// Résolution des chemins d'images locales à partir des données JSON.
// Aucune image distante n'est jamais chargée : tout pointe vers img/*.

import { slugify, stripAccents } from './utils.js';

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

// Table des slugs de sorts calculés qui ne correspondent pas au fichier réel.
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
  return String(name||'').split('|')[0].trim();
}
export function spellAltName(name){
  const parts = String(name||'').split('|');
  return parts.length > 1 ? parts[1].trim() : null;
}
export function spellSlug(name){
  const base = spellPrimaryName(name)
    .toLowerCase();
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
  return DAMAGE_TYPE_WORDS[stripAccents(String(word||'')).toLowerCase()] || null;
}
export function damageTypeImage(key){
  return `img/type_degats/${key}_damage.png`;
}

// <img> avec repli propre : jamais d'icône cassée visible, et aucune requête réseau
// inutile lorsqu'aucune source n'est disponible (ex. quelques sous-classes sans image).
export function imgWithFallback(src, alt, {className='', fallbackEmoji='📜', fallbackClass=''} = {}){
  const safeAlt = String(alt||'').replace(/"/g,'&quot;');
  if(!src){
    return `<span class="img-fallback-wrap is-broken ${fallbackClass}" data-fallback="1">`
      + `<span class="card-media-fallback fallback-glyph" aria-hidden="true" role="img" aria-label="${safeAlt}">${fallbackEmoji}</span>`
      + `</span>`;
  }
  return `<span class="img-fallback-wrap ${fallbackClass}" data-fallback="1">`
    + `<img src="${src}" alt="${safeAlt}" class="${className}" loading="lazy" `
    + `onerror="this.closest('[data-fallback]').classList.add('is-broken'); this.remove();">`
    + `<span class="card-media-fallback fallback-glyph" aria-hidden="true">${fallbackEmoji}</span>`
    + `</span>`;
}
