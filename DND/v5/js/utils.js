// Utilitaires génériques réutilisés dans tout le site.

export function stripAccents(str){
  return String(str ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '');
}

export function slugify(str){
  return stripAccents(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

export function normKey(str){
  return stripAccents(String(str ?? '')).toLowerCase().trim().replace(/\s+/g,' ');
}

export function escapeHtml(str){
  return String(str ?? '')
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

export function debounce(fn, delay=180){
  let t;
  return function(...args){
    clearTimeout(t);
    t = setTimeout(()=>fn.apply(this,args), delay);
  };
}

export function uid(prefix='id'){
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`;
}

export function clamp(n, min, max){
  return Math.max(min, Math.min(max, n));
}

// Petit helper de création DOM (pas de framework, juste du sucre).
export function el(tag, attrs={}, children=[]){
  const node = document.createElement(tag);
  for(const [k,v] of Object.entries(attrs||{})){
    if(v == null || v === false) continue;
    if(k === 'class') node.className = v;
    else if(k === 'html') node.innerHTML = v;
    else if(k === 'text') node.textContent = v;
    else if(k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
    else if(k === 'dataset'){ for(const [dk,dv] of Object.entries(v)) node.dataset[dk]=dv; }
    else node.setAttribute(k, v);
  }
  for(const c of [].concat(children)){
    if(c == null || c === false) continue;
    node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  return node;
}

export function qs(sel, ctx=document){ return ctx.querySelector(sel); }
export function qsa(sel, ctx=document){ return Array.from(ctx.querySelectorAll(sel)); }

export function abilityMod(score){
  return Math.floor((score - 10) / 2);
}
export function fmtMod(n){
  return n >= 0 ? `+${n}` : `${n}`;
}

export function formatList(arr, conj='et'){
  const a = (arr||[]).filter(Boolean);
  if(a.length === 0) return '';
  if(a.length === 1) return a[0];
  return `${a.slice(0,-1).join(', ')} ${conj} ${a[a.length-1]}`;
}

// Bloque le scroll du body (pour overlays plein écran mobile) sans perdre la position.
let _scrollLockCount = 0;
let _scrollY = 0;
export function lockBodyScroll(){
  if(_scrollLockCount === 0){
    _scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${_scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
  }
  _scrollLockCount++;
}
export function unlockBodyScroll(){
  _scrollLockCount = Math.max(0, _scrollLockCount - 1);
  if(_scrollLockCount === 0){
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    window.scrollTo(0, _scrollY);
  }
}

export function trapFocus(container, evt){
  if(evt.key !== 'Tab') return;
  const focusables = qsa('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])', container)
    .filter(n => n.offsetParent !== null || n === document.activeElement);
  if(focusables.length === 0) return;
  const first = focusables[0];
  const last = focusables[focusables.length-1];
  if(evt.shiftKey && document.activeElement === first){
    evt.preventDefault(); last.focus();
  } else if(!evt.shiftKey && document.activeElement === last){
    evt.preventDefault(); first.focus();
  }
}
