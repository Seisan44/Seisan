// Data loader — fetches all JSON files and exposes them globally
window.DND_DATA = {};

async function loadAllData() {
  const files = [
    ['classes', 'data/classes.json'],
    ['races', 'data/races.json'],
    ['sorts', 'data/sorts.json'],
    ['dons', 'data/dons.json'],
    ['glossaire', 'data/glossaire.json'],
  ];
  const results = await Promise.all(
    files.map(([key, url]) =>
      fetch(url)
        .then(r => r.json())
        .then(data => [key, data])
        .catch(e => { console.warn(`Failed to load ${url}`, e); return [key, null]; })
    )
  );
  results.forEach(([key, data]) => { if (data) window.DND_DATA[key] = data; });
}
