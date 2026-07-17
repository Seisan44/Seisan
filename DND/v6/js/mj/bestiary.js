// Bestiaire global : chargement paresseux et mise en cache de data/monstres.json.
// Le fichier n'est fetché qu'à la première visite de l'onglet Monstres.

import { slugify } from '../utils.js';

let cache = null;

export async function loadBestiary(){
  if(cache) return cache;
  const res = await fetch('data/monstres.json');
  if(!res.ok) throw new Error(`Échec de chargement du bestiaire (${res.status})`);
  cache = (await res.json()).map(m => ({ ...m, slug: slugify(m.nom) }));
  return cache;
}

// image_fichier vaut « images/aarakocra.jpg » mais les fichiers réels
// sont dans img/monstres/ : on ne garde que le nom de fichier.
export function monsterImagePath(m){
  const file = m.image_fichier?.split('/').pop();
  return file ? `img/monstres/${file}` : null;
}
