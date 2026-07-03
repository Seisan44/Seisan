// Portrait de personnage : import d'une image locale, réduite/recadrée en carré côté
// client (canvas) avant stockage en dataURL dans le personnage (localStorage) — on évite
// ainsi de saturer le quota de stockage avec des photos haute résolution.

import { openModal, closeModal } from '../modal.js';
import { toast } from '../toast.js';
import { confirmAction } from '../confirm.js';

const MAX_SIZE = 384;
const JPEG_QUALITY = 0.85;

function readFileAsImage(file){
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Lecture du fichier impossible.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Image illisible.'));
      img.onload = () => resolve(img);
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

/** Recadre en carré (crop centré) puis réduit à MAX_SIZE, pour un portrait compact et homogène. */
async function fileToAvatarDataURL(file){
  const img = await readFileAsImage(file);
  const side = Math.min(img.width, img.height);
  const sx = (img.width - side) / 2;
  const sy = (img.height - side) / 2;
  const out = Math.min(MAX_SIZE, side);
  const canvas = document.createElement('canvas');
  canvas.width = out; canvas.height = out;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, sx, sy, side, side, 0, 0, out, out);
  return canvas.toDataURL('image/jpeg', JPEG_QUALITY);
}

/**
 * Ouvre un sélecteur de portrait (import de fichier + aperçu + retrait) réutilisable
 * depuis l'assistant de création comme depuis la fiche de personnage.
 * @param {Object} opts
 * @param {string|null} opts.currentSrc - dataURL actuelle (ou null)
 * @param {string} opts.fallbackHTML - rendu de repli si aucune image (portrait d'espèce/emoji)
 * @param {(dataURL:string)=>void} opts.onSave
 * @param {()=>void} opts.onRemove
 * @param {HTMLElement} [opts.originEl]
 */
export function openAvatarPicker({ currentSrc = null, fallbackHTML = '🧝', onSave, onRemove, originEl } = {}){
  let pendingDataURL = null;
  openModal({
    eyebrow: 'Portrait',
    title: 'Choisir un avatar',
    originEl,
    build(body){
      body.innerHTML = `
        <p class="page-lede" style="font-size:.92em;margin-bottom:1.2em;">Importez une image depuis votre appareil — elle sera recadrée en carré et compressée pour rester légère.</p>
        <div class="avatar-picker">
          <div class="avatar-picker-preview" id="avatar-preview">${currentSrc ? `<img src="${currentSrc}" alt="Portrait actuel">` : fallbackHTML}</div>
          <div class="avatar-picker-actions">
            <label class="btn btn-primary" for="avatar-file-input" style="cursor:pointer;">
              <svg class="i"><use href="#i-plus"/></svg> Importer une image
            </label>
            <input type="file" id="avatar-file-input" accept="image/*" hidden>
            ${currentSrc ? `<button type="button" class="btn btn-ghost btn-danger" id="avatar-remove-btn">Retirer le portrait</button>` : ''}
          </div>
        </div>
        <div class="flex-gap" style="justify-content:flex-end;margin-top:1.4em;">
          <button type="button" class="btn btn-primary" id="avatar-save-btn" disabled>Enregistrer</button>
        </div>
      `;
      const preview = body.querySelector('#avatar-preview');
      const saveBtn = body.querySelector('#avatar-save-btn');
      body.querySelector('#avatar-file-input').addEventListener('change', async (e) => {
        const file = e.target.files?.[0];
        if(!file) return;
        if(!file.type.startsWith('image/')){ toast('Choisissez un fichier image.', { type:'error' }); return; }
        try {
          pendingDataURL = await fileToAvatarDataURL(file);
          preview.innerHTML = `<img src="${pendingDataURL}" alt="Nouveau portrait">`;
          saveBtn.disabled = false;
        } catch(err){
          toast(err.message || 'Impossible de charger cette image.', { type:'error' });
        }
      });
      saveBtn.addEventListener('click', () => {
        if(!pendingDataURL) return;
        onSave(pendingDataURL);
        closeModal();
        toast('Portrait mis à jour.', { type:'success' });
      });
      body.querySelector('#avatar-remove-btn')?.addEventListener('click', async () => {
        const ok = await confirmAction({
          title:'Retirer le portrait',
          message:'Le personnage reviendra à l’illustration par défaut de son espèce. Continuer ?',
          confirmLabel:'Retirer',
        });
        if(!ok) return;
        onRemove();
        closeModal();
        toast('Portrait retiré.', { type:'success' });
      });
    }
  });
}
