// Portabilité : export/import de campagne en JSON, encodage des images en Base64.

import { el, slugify } from '../utils.js';
import { SCHEMA_VERSION, migrateCampaign } from './schema.js';

export function exportCampaign(campaign){
  const blob = new Blob([JSON.stringify(campaign, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = el('a', { href: url, download: `campagne-${slugify(campaign.nom) || 'sans-nom'}.json` });
  document.body.append(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/** Ouvre le sélecteur de fichier et résout avec la campagne validée (ou null si annulé). */
export function importCampaign(){
  return new Promise((resolve, reject) => {
    const input = el('input', { type: 'file', accept: '.json,application/json' });
    input.addEventListener('change', async () => {
      const file = input.files[0];
      if(!file) return resolve(null);
      try { resolve(validate(JSON.parse(await file.text()))); }
      catch(err){ reject(new Error(`Import impossible : ${err.message}`)); }
    });
    input.click();
  });
}

function validate(data){
  if(!data || typeof data !== 'object' || !data.id || !data.nom)
    throw new Error('ce fichier ne ressemble pas à une campagne du Grimoire');
  if((data.schemaVersion ?? 0) > SCHEMA_VERSION)
    throw new Error('cette campagne vient d’une version plus récente du site');
  // Un Atelier exporté redevient une campagne ordinaire : il ne doit y avoir
  // qu'un seul Atelier (celui, local, de ce navigateur).
  delete data.builtin;
  return migrateCampaign(data);
}

/**
 * Fichier image -> dataURL Base64, redimensionné côté client.
 * Indispensable pour les cartes : une photo brute (4000 px) exploserait le
 * quota localStorage (~5 Mo). À 1600 px / JPEG 0.8, une carte pèse 150–400 Ko.
 */
export function fileToDataURL(file, maxDim = 1600, quality = 0.8){
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
      const canvas = el('canvas', {
        width: Math.max(1, Math.round(img.width * scale)),
        height: Math.max(1, Math.round(img.height * scale)),
      });
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('image illisible')); };
    img.src = url;
  });
}
