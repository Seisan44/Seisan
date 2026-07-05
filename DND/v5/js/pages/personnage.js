import { getActiveCharacter, getCharacter, listCharacters, setActiveId, createCharacterShell, saveCharacter } from '../character/storage.js';
import { renderWizard } from '../character/wizard.js';
import { renderSheet } from '../character/sheet.js';
import { renderCharacterList } from '../character/list.js';
import { renderStartHub } from '../character/start-hub.js';
import { isBeginnerMode } from '../beginner.js';
import { navigate } from '../router.js';

export async function renderPersonnage(container, parts){
  const sub = parts && parts[0];

  if(sub === 'personnages'){
    renderCharacterList(container);
    return;
  }
  if(sub === 'nouveau'){
    if(isBeginnerMode()){
      renderStartHub(container);
      return;
    }
    const draft = createCharacterShell();
    saveCharacter(draft);
    setActiveId(draft.id);
    renderWizard(container, draft);
    return;
  }
  if(sub){
    const c = getCharacter(sub);
    if(c){
      setActiveId(c.id);
      if(c.complete) renderSheet(container, c);
      else renderWizard(container, c);
      return;
    }
  }

  const active = getActiveCharacter();
  if(active){
    if(active.complete) renderSheet(container, active);
    else renderWizard(container, active);
    return;
  }

  const all = listCharacters();
  if(all.length){
    setActiveId(all[0].id);
    navigate('personnage');
    return;
  }

  if(isBeginnerMode()){
    renderStartHub(container);
    return;
  }
  renderWizard(container, createCharacterShell());
}
