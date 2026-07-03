import { openModal, closeModal } from './modal.js';

/** Boîte de confirmation avant toute action destructive. Retourne une Promise<boolean>. */
export function confirmAction({ title='Confirmer', message='', confirmLabel='Confirmer', danger=true } = {}){
  return new Promise((resolve) => {
    let settled = false;
    const finish = (val) => { if(settled) return; settled = true; resolve(val); closeModal(); };
    openModal({
      eyebrow: 'Attention',
      title,
      build(body){
        body.innerHTML = `
          <p>${message}</p>
          <div class="flex-gap" style="margin-top:1.4em;justify-content:flex-end;">
            <button class="btn btn-ghost" data-act="cancel">Annuler</button>
            <button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" data-act="ok">${confirmLabel}</button>
          </div>
        `;
        body.querySelector('[data-act="cancel"]').addEventListener('click', () => finish(false));
        body.querySelector('[data-act="ok"]').addEventListener('click', () => finish(true));
      }
    });
    // Si l'utilisateur ferme via Échap/backdrop sans passer par nos boutons, on considère "annulé".
    const obs = new MutationObserver(() => {
      if(!document.querySelector('.overlay-backdrop')){ finish(false); obs.disconnect(); }
    });
    obs.observe(document.querySelector('#overlay-root'), { childList:true });
  });
}
