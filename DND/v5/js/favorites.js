// Favoris/marque-pages génériques (sorts, dons, objets magiques...) pour un accès rapide.

const KEY = 'codex_favorites_v1';

function readAll(){
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch(e){ return {}; }
}
function writeAll(obj){ localStorage.setItem(KEY, JSON.stringify(obj)); }

export function isFavorite(kind, id){
  const all = readAll();
  return !!(all[kind] && all[kind][id]);
}
export function toggleFavorite(kind, id){
  const all = readAll();
  if(!all[kind]) all[kind] = {};
  if(all[kind][id]) delete all[kind][id];
  else all[kind][id] = true;
  writeAll(all);
  return !!all[kind][id];
}
export function listFavoriteIds(kind){
  const all = readAll();
  return Object.keys(all[kind] || {});
}
export function countFavorites(kind){
  return listFavoriteIds(kind).length;
}
