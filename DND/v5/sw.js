// Service worker du Codex D&D — permet un usage hors-ligne à la table de jeu.
// Stratégie : cache-first pour tout le code/données de l'application (versionné),
// cache-as-you-go pour les images (illustrations d'espèces/classes/sorts) rencontrées.

const VERSION = 'codex-dnd-v3';
const CORE_CACHE = `${VERSION}-core`;
const RUNTIME_CACHE = `${VERSION}-runtime`;

const CORE_ASSETS = [
  './',
  'index.html',
  'manifest.json',
  'css/style.css',
  'js/main.js',
  'js/router.js',
  'js/data.js',
  'js/utils.js',
  'js/images.js',
  'js/enrich.js',
  'js/equipment.js',
  'js/class-traits.js',
  'js/modal.js',
  'js/popover.js',
  'js/toast.js',
  'js/confirm.js',
  'js/search.js',
  'js/theme.js',
  'js/favorites.js',
  'js/pages/home.js',
  'js/pages/races.js',
  'js/pages/classes.js',
  'js/pages/class-tips.js',
  'js/pages/dons.js',
  'js/pages/glossaire.js',
  'js/pages/sorts.js',
  'js/pages/equipements.js',
  'js/pages/combat.js',
  'js/pages/combat-content.js',
  'js/pages/historiques.js',
  'js/pages/personnage.js',
  'js/character/rules.js',
  'js/character/storage.js',
  'js/character/wizard.js',
  'js/character/sheet.js',
  'js/character/list.js',
  'js/character/avatar.js',
  'data/species.json',
  'data/races.json',
  'data/classes.json',
  'data/dons.json',
  'data/glossaire.json',
  'data/sorts.json',
  'data/armes.json',
  'data/armures.json',
  'data/materiels_aventuriers.json',
  'data/outils.json',
  'data/objets_magiques.json',
  'data/historiques.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CORE_CACHE)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
      .catch(() => {}) // ne bloque pas l'installation si un asset manque
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((k) => k !== CORE_CACHE && k !== RUNTIME_CACHE).map((k) => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // laisse passer les polices Google Fonts, etc.

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response && response.ok) {
          const clone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, clone));
        }
        return response;
      }).catch(() => {
        if (request.mode === 'navigate') return caches.match('index.html');
        return new Response('', { status: 504, statusText: 'Hors-ligne' });
      });
    })
  );
});
