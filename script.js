(function(){
"use strict";

/* ==========================================================================
   ICON LIBRARY (reusable inline SVG strings)
   ========================================================================== */
const ICONS = {
  web:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>',
  ai:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/><circle cx="12" cy="12" r="3.5"/></svg>',
  images:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5-11 11"/></svg>',
  videos:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="14" height="14" rx="2"/><path d="m21 8-4 3 4 3z"/></svg>',
  news:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h6M7 12h10M7 16h10"/></svg>',
  maps:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  shopping:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6h15l-1.5 9h-12z"/><path d="M6 6 5 3H2"/><circle cx="9.5" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/></svg>',
  academic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8l10-5 10 5-10 5-10-5z"/><path d="M6 10.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-5.5"/></svg>',
  social:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="9" r="3"/><circle cx="17" cy="7" r="2.3"/><path d="M2.5 19c.5-3 2.7-5 5.5-5s5 2 5.5 5M14.5 19c.3-2 1.7-3.6 3.4-4.2"/></svg>',
  files:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>',
  arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
  trend:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
  close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  bookmark:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12v18l-6-4-6 4z"/></svg>',
  copy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
  share:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4"/></svg>',
  external:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  warn:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4M12 17h.01"/></svg>',
  sparkle:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/></svg>',
  fast:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>',
  layers:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 9 5-9 5-9-5 9-5z"/><path d="m3 13 9 5 9-5"/></svg>',
  mic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
  shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3z"/><path d="m9 12 2 2 4-4"/></svg>',
  doc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>',
  camera:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8a2 2 0 0 1 2-2h1.5l1-1.5h7l1 1.5H18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z"/><circle cx="12" cy="13" r="3.5"/></svg>',
  refresh:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/></svg>'
};

/* ==========================================================================
   STORAGE HELPERS
   ========================================================================== */
const Store = {
  get(key, fallback){ try{ const v = localStorage.getItem(key); return v===null?fallback:JSON.parse(v);}catch(e){return fallback;} },
  set(key, val){ try{ localStorage.setItem(key, JSON.stringify(val)); }catch(e){} }
};

/* ==========================================================================
   STATE
   ========================================================================== */
const State = {
  theme: Store.get('rs_theme','system'),
  reducedMotion: Store.get('rs_reduced_motion', false),
  safeSearch: Store.get('rs_safe_search', true),
  suggestionsEnabled: Store.get('rs_suggestions', true),
  saveHistory: Store.get('rs_save_history', true),
  history: Store.get('rs_history', []),
  mode: 'web',
  filters: {},
  activeFilterCount: 0,
  imageFile: null,
  genericFile: null,
  dataMode: Store.get('rs_data_mode', null), // 'live' | 'demo' | null (null = auto: demo until URL configured)
  searxngUrl: localStorage.getItem('raiaspace-searxng-url') || '',
  searxngStatus: 'untested', // untested | testing | ok | json-unavailable | cors | network | invalid | timeout
  currentPage: 1,
  lastSearxngPayload: null
};
// Effective data source: explicit user choice wins; otherwise Live only if a URL has been saved.
function effectiveDataMode(){
  if(State.dataMode === 'live' || State.dataMode === 'demo') return State.dataMode;
  return State.searxngUrl ? 'live' : 'demo';
}

const MODES = [
  {id:'web', label:'Web', icon:'web', desc:'Search across the public web.'},
  {id:'ai', label:'AI Answer', icon:'ai', desc:'Ask a complex question and get a structured answer.'},
  {id:'images', label:'Images', icon:'images', desc:'Find visual results, products, and references.'},
  {id:'videos', label:'Videos', icon:'videos', desc:'Search tutorials, explainers, and video content.'},
  {id:'news', label:'News', icon:'news', desc:'Explore recent reports and current events.'},
  {id:'maps', label:'Maps', icon:'maps', desc:'Find places, directions, and local information.'},
  {id:'shopping', label:'Shopping', icon:'shopping', desc:'Compare products, prices, and reviews.'},
  {id:'academic', label:'Academic', icon:'academic', desc:'Find research papers, journals, and scholarly sources.'},
  {id:'social', label:'Social', icon:'social', desc:'Search public discussions and communities.'},
  {id:'files', label:'Files', icon:'files', desc:'Search uploaded documents and local project files.'}
];

const PLACEHOLDERS = {
  web:'Search the web, ask a question, or paste a link…',
  ai:'Ask a complex question…',
  images:'Describe an image to find…',
  videos:'Search for tutorials, explainers, videos…',
  news:'Search recent news and reports…',
  maps:'Search places, addresses, directions…',
  shopping:'Search products, brands, prices…',
  academic:'Search papers, journals, authors…',
  social:'Search discussions and communities…',
  files:'Search your uploaded documents…'
};

const TRENDING = [
  {title:'Latest space exploration missions', category:'Science'},
  {title:'Frontend performance techniques', category:'Technology'},
  {title:'Best lossless audio formats', category:'Audio'},
  {title:'New developments in artificial intelligence', category:'Technology'},
  {title:'Climate technology breakthroughs', category:'Environment'},
  {title:'Modern aerospace engineering', category:'Engineering'}
];

const FEATURES = [
  {icon:'fast', title:'Fast by default', desc:'Get to useful results with a focused, low-distraction interface.'},
  {icon:'layers', title:'Search your way', desc:'Switch between web, AI, image, video, news, academic, and shopping modes.'},
  {icon:'sparkle', title:'Multimodal input', desc:'Search using text, voice, images, camera input, URLs, and documents.'},
  {icon:'shield', title:'Privacy-focused', desc:'Keep your search experience clear, transparent, and under your control.'}
];

const SUGGESTION_POOL = [
  'artificial intelligence trends','space exploration news','best lossless audio formats',
  'frontend performance techniques','climate technology','aerospace engineering jobs',
  'how does search indexing work','privacy focused browsers','machine learning basics',
  'renewable energy breakthroughs'
];

/* ==========================================================================
   TOAST
   ========================================================================== */
function toast(msg){
  const stack = document.getElementById('toastStack');
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = ICONS.check + '<span>'+escapeHTML(msg)+'</span>';
  stack.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('show'));
  setTimeout(()=>{ el.classList.remove('show'); setTimeout(()=>el.remove(),200); }, 2600);
}

function escapeHTML(str){
  const d = document.createElement('div'); d.textContent = str; return d.innerHTML;
}

/* ==========================================================================
   THEME
   ========================================================================== */
function applyTheme(){
  let effective = State.theme;
  if(effective === 'system'){
    effective = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-theme', effective);
  document.getElementById('themeIconSun').style.display = effective === 'dark' ? 'none' : 'block';
  document.getElementById('themeIconMoon').style.display = effective === 'dark' ? 'block' : 'none';
  document.querySelectorAll('[data-theme-choice]').forEach(btn=>{
    btn.setAttribute('aria-pressed', btn.dataset.themeChoice === State.theme ? 'true' : 'false');
  });
  const mobileSeg = document.getElementById('mobileThemeSeg');
  if(mobileSeg){
    mobileSeg.querySelectorAll('[data-theme-choice]').forEach(btn=>{
      const val = State.theme === 'system' ? effective : State.theme;
      btn.setAttribute('aria-pressed', btn.dataset.themeChoice === val ? 'true':'false');
    });
  }
}
function setTheme(t){ State.theme = t; Store.set('rs_theme', t); applyTheme(); }
document.getElementById('themeToggle').addEventListener('click', ()=>{
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});
document.querySelectorAll('[data-theme-choice]').forEach(btn=>{
  btn.addEventListener('click', ()=> setTheme(btn.dataset.themeChoice));
});
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ()=>{ if(State.theme==='system') applyTheme(); });
applyTheme();

if(State.reducedMotion){ document.documentElement.style.setProperty('--dur-fast','0.001ms'); document.documentElement.style.setProperty('--dur-med','0.001ms'); }

/* ==========================================================================
   SETTINGS DRAWER
   ========================================================================== */
function openDrawer(overlayId, drawerId, triggerBtn){
  document.getElementById(overlayId).classList.add('open');
  const d = document.getElementById(drawerId);
  d.classList.add('open');
  if(triggerBtn) triggerBtn.setAttribute('aria-expanded','true');
  d._trigger = triggerBtn;
  const focusable = d.querySelector('button, input, select, a');
  if(focusable) focusable.focus();
}
function closeDrawer(overlayId, drawerId){
  document.getElementById(overlayId).classList.remove('open');
  const d = document.getElementById(drawerId);
  d.classList.remove('open');
  if(d._trigger){ d._trigger.setAttribute('aria-expanded','false'); d._trigger.focus(); }
}

const settingsBtn = document.getElementById('settingsBtn');
settingsBtn.addEventListener('click', ()=>openDrawer('settingsOverlay','settingsDrawer', settingsBtn));
document.getElementById('settingsClose').addEventListener('click', ()=>closeDrawer('settingsOverlay','settingsDrawer'));
document.getElementById('settingsOverlay').addEventListener('click', ()=>closeDrawer('settingsOverlay','settingsDrawer'));
document.getElementById('mobileSettingsLink').addEventListener('click', ()=>{ closeMobileDrawer(); openDrawer('settingsOverlay','settingsDrawer', settingsBtn); });

const historyBtn = document.getElementById('historyBtn');
historyBtn.addEventListener('click', ()=>{ renderHistory(); openDrawer('historyOverlay','historyDrawer', historyBtn); });
document.getElementById('historyClose').addEventListener('click', ()=>closeDrawer('historyOverlay','historyDrawer'));
document.getElementById('historyOverlay').addEventListener('click', ()=>closeDrawer('historyOverlay','historyDrawer'));

document.getElementById('toggleReducedMotion').checked = State.reducedMotion;
document.getElementById('toggleReducedMotion').addEventListener('change', e=>{
  State.reducedMotion = e.target.checked; Store.set('rs_reduced_motion', State.reducedMotion);
  document.documentElement.style.setProperty('--dur-fast', State.reducedMotion?'0.001ms':'120ms');
  document.documentElement.style.setProperty('--dur-med', State.reducedMotion?'0.001ms':'220ms');
});
document.getElementById('toggleSafeSearch').checked = State.safeSearch;
document.getElementById('toggleSafeSearch').addEventListener('change', e=>{ State.safeSearch=e.target.checked; Store.set('rs_safe_search', State.safeSearch); });
document.getElementById('toggleSuggestions').checked = State.suggestionsEnabled;
document.getElementById('toggleSuggestions').addEventListener('change', e=>{ State.suggestionsEnabled=e.target.checked; Store.set('rs_suggestions', State.suggestionsEnabled); });
document.getElementById('toggleSaveHistory').checked = State.saveHistory;
document.getElementById('toggleSaveHistory').addEventListener('change', e=>{ State.saveHistory=e.target.checked; Store.set('rs_save_history', State.saveHistory); });

function clearHistory(){
  State.history = []; Store.set('rs_history', []); renderHistory(); toast('Search history cleared');
}
document.getElementById('clearHistoryFromSettings').addEventListener('click', clearHistory);
document.getElementById('clearAllHistory').addEventListener('click', clearHistory);

/* ==========================================================================
   MOBILE NAV DRAWER
   ========================================================================== */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
function openMobileDrawer(){ openDrawer('mobileOverlay','mobileDrawer', mobileMenuBtn); applyTheme(); }
function closeMobileDrawer(){ closeDrawer('mobileOverlay','mobileDrawer'); }
mobileMenuBtn.addEventListener('click', openMobileDrawer);
document.getElementById('mobileDrawerClose').addEventListener('click', closeMobileDrawer);
document.getElementById('mobileOverlay').addEventListener('click', closeMobileDrawer);

/* ==========================================================================
   HISTORY RENDER
   ========================================================================== */
function renderHistory(){
  const list = document.getElementById('historyList');
  if(State.history.length === 0){
    list.innerHTML = '<div class="empty-state">'+ICONS.clock+'<div>Your recent searches will appear here.</div></div>';
    return;
  }
  list.innerHTML = State.history.slice().reverse().map((h,idx)=>{
    const realIdx = State.history.length-1-idx;
    return '<div class="history-item">'+
      '<div class="h-icon">'+ (ICONS[h.mode]||ICONS.web) +'</div>'+
      '<div class="h-main"><div class="h-query">'+escapeHTML(h.query)+'</div><div class="h-meta">'+capitalize(h.mode)+' · '+timeAgo(h.time)+'</div></div>'+
      '<button class="icon-btn h-remove" aria-label="Remove this search" data-remove-idx="'+realIdx+'">'+ICONS.close+'</button>'+
    '</div>';
  }).join('');
  list.querySelectorAll('[data-remove-idx]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const idx = parseInt(btn.dataset.removeIdx,10);
      State.history.splice(idx,1); Store.set('rs_history', State.history); renderHistory();
    });
  });
}
function capitalize(s){ return s.charAt(0).toUpperCase()+s.slice(1); }
function timeAgo(ts){
  const diff = Math.max(0, Date.now()-ts);
  const min = Math.floor(diff/60000);
  if(min < 1) return 'just now';
  if(min < 60) return min+'m ago';
  const hr = Math.floor(min/60);
  if(hr < 24) return hr+'h ago';
  return Math.floor(hr/24)+'d ago';
}

/* ==========================================================================
   SEARCH MODES RENDER
   ========================================================================== */
const modesRow = document.getElementById('modesRow');
modesRow.innerHTML = MODES.map(m=>
  '<button type="button" class="mode-btn" role="tab" id="mode-tab-'+m.id+'" aria-selected="'+(m.id===State.mode)+'" data-mode="'+m.id+'" data-tooltip="'+m.desc+'">'+ICONS[m.icon]+'<span>'+m.label+'</span></button>'
).join('');
document.getElementById('modeDesc').textContent = MODES.find(m=>m.id===State.mode).desc;
document.getElementById('searchInput').placeholder = PLACEHOLDERS[State.mode];

modesRow.addEventListener('click', e=>{
  const btn = e.target.closest('.mode-btn'); if(!btn) return;
  setMode(btn.dataset.mode);
});
modesRow.addEventListener('keydown', e=>{
  const tabs = Array.from(modesRow.querySelectorAll('.mode-btn'));
  const i = tabs.indexOf(document.activeElement);
  if(i<0) return;
  if(e.key==='ArrowRight'){ e.preventDefault(); tabs[(i+1)%tabs.length].focus(); }
  if(e.key==='ArrowLeft'){ e.preventDefault(); tabs[(i-1+tabs.length)%tabs.length].focus(); }
});

function setMode(modeId){
  State.mode = modeId;
  modesRow.querySelectorAll('.mode-btn').forEach(b=> b.setAttribute('aria-selected', b.dataset.mode===modeId ? 'true':'false'));
  document.getElementById('modeDesc').textContent = MODES.find(m=>m.id===modeId).desc;
  const input = document.getElementById('searchInput');
  input.placeholder = PLACEHOLDERS[modeId];
}

/* ==========================================================================
   TRENDING / FEATURES RENDER
   ========================================================================== */
document.getElementById('trendGrid').innerHTML = TRENDING.map((t,i)=>
  '<button type="button" class="trend-card glass" data-query="'+escapeHTML(t.title)+'">'+
    '<span class="trend-num">'+String(i+1).padStart(2,'0')+'</span>'+
    '<span class="trend-main"><span class="trend-title">'+escapeHTML(t.title)+'</span><span class="trend-cat">'+escapeHTML(t.category)+'</span></span>'+
    '<span class="trend-arrow">'+ICONS.trend+'</span>'+
  '</button>'
).join('');
document.getElementById('trendGrid').addEventListener('click', e=>{
  const card = e.target.closest('.trend-card'); if(!card) return;
  runSearch(card.dataset.query);
});

document.getElementById('featureGrid').innerHTML = FEATURES.map(f=>
  '<article class="feature-card glass"><div class="feature-icon">'+ICONS[f.icon]+'</div><h3>'+escapeHTML(f.title)+'</h3><p>'+escapeHTML(f.desc)+'</p></article>'
).join('');

/* ==========================================================================
   SEARCH INPUT BEHAVIOR
   ========================================================================== */
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchBox = document.querySelector('.search-box');
const clearBtn = document.getElementById('clearInputBtn');
const submitBtn = document.getElementById('submitBtn');
const validationMsg = document.getElementById('validationMsg');
const autocomplete = document.getElementById('autocomplete');

function autoResize(){
  searchInput.style.height = 'auto';
  searchInput.style.height = Math.min(searchInput.scrollHeight, 160) + 'px';
}
function updateSubmitState(){
  const has = searchInput.value.trim().length > 0;
  submitBtn.disabled = !has;
  clearBtn.classList.toggle('show', has);
}
searchInput.addEventListener('input', ()=>{
  autoResize(); updateSubmitState(); validationMsg.textContent='';
  if(State.suggestionsEnabled) renderAutocomplete(searchInput.value);
  else closeAutocomplete();
});
searchInput.addEventListener('focus', ()=>{
  searchBox.classList.add('focused');
  if(State.suggestionsEnabled) renderAutocomplete(searchInput.value);
});
searchInput.addEventListener('blur', ()=>{ searchBox.classList.remove('focused'); });
clearBtn.addEventListener('click', ()=>{
  searchInput.value=''; autoResize(); updateSubmitState(); closeAutocomplete(); searchInput.focus();
});
searchInput.addEventListener('keydown', e=>{
  if(e.key === 'Enter' && !e.shiftKey){
    e.preventDefault();
    const activeItem = autocomplete.querySelector('.ac-item.active');
    if(activeItem && autocomplete.classList.contains('open')){ activeItem.click(); return; }
    submitSearch();
  } else if(e.key === 'Escape'){
    if(autocomplete.classList.contains('open')) closeAutocomplete();
    else searchInput.blur();
  } else if(e.key === 'ArrowDown' || e.key === 'ArrowUp'){
    if(autocomplete.classList.contains('open')){
      e.preventDefault();
      navigateAutocomplete(e.key === 'ArrowDown' ? 1 : -1);
    }
  }
});
searchForm.addEventListener('submit', e=>{ e.preventDefault(); submitSearch(); });

function submitSearch(){
  const q = searchInput.value.trim();
  if(!q){ validationMsg.textContent = 'Please enter a search term before submitting.'; return; }
  runSearch(q);
}

document.addEventListener('click', e=>{
  if(!e.target.closest('.search-shell')) closeAutocomplete();
});

/* ==========================================================================
   AUTOCOMPLETE
   ========================================================================== */
let acItems = [];
function renderAutocomplete(query){
  const q = query.trim().toLowerCase();
  const groups = [];

  if(q.length > 0){
    const matches = SUGGESTION_POOL.filter(s=> s.toLowerCase().includes(q)).slice(0,5);
    if(matches.length){
      groups.push({label:'Suggestions', items: matches.map(m=>({text:m, icon:'search', type:'suggestion'}))});
    }
  }
  const recent = State.history.filter(h=> q.length===0 || h.query.toLowerCase().includes(q)).slice(-5).reverse();
  if(recent.length){
    groups.push({label:'Recent searches', items: recent.map(h=>({text:h.query, icon:'clock', type:'recent'}))});
  }
  const trending = TRENDING.filter(t=> q.length===0 || t.title.toLowerCase().includes(q)).slice(0,4);
  if(trending.length){
    groups.push({label:'Trending now', items: trending.map(t=>({text:t.title, icon:'trend', category:t.category, type:'trending'}))});
  }

  if(!groups.length){
    autocomplete.innerHTML = '<div class="empty-state" style="padding:20px;">No suggestions found.</div>';
    autocomplete.classList.add('glass','open');
    acItems = [];
    return;
  }

  let html = '';
  acItems = [];
  groups.forEach(g=>{
    html += '<div class="ac-group-label">'+g.label+'</div>';
    g.items.forEach(item=>{
      const idx = acItems.length;
      acItems.push(item);
      html += '<div class="ac-item" role="option" data-idx="'+idx+'">'+
        ICONS[item.icon] +
        '<span class="ac-text">'+highlightMatch(item.text, q)+'</span>'+
        (item.category ? '<span class="ac-category">'+escapeHTML(item.category)+'</span>' : '') +
        (item.type==='recent' ? '<button class="icon-btn ac-remove" aria-label="Remove from recent searches" data-remove-query="'+escapeHTML(item.text)+'">'+ICONS.close+'</button>' : '') +
      '</div>';
    });
  });
  autocomplete.innerHTML = html;
  autocomplete.classList.add('open');

  autocomplete.querySelectorAll('.ac-item').forEach(el=>{
    el.addEventListener('click', (ev)=>{
      if(ev.target.closest('.ac-remove')) return;
      const item = acItems[parseInt(el.dataset.idx,10)];
      searchInput.value = item.text;
      runSearch(item.text);
    });
  });
  autocomplete.querySelectorAll('.ac-remove').forEach(btn=>{
    btn.addEventListener('click', (ev)=>{
      ev.stopPropagation();
      const qtext = btn.dataset.removeQuery;
      State.history = State.history.filter(h=> h.query !== qtext);
      Store.set('rs_history', State.history);
      renderAutocomplete(searchInput.value);
    });
  });
}
function highlightMatch(text, q){
  if(!q) return escapeHTML(text);
  const idx = text.toLowerCase().indexOf(q);
  if(idx === -1) return escapeHTML(text);
  return escapeHTML(text.slice(0,idx)) + '<mark>' + escapeHTML(text.slice(idx,idx+q.length)) + '</mark>' + escapeHTML(text.slice(idx+q.length));
}
function navigateAutocomplete(dir){
  const items = Array.from(autocomplete.querySelectorAll('.ac-item'));
  if(!items.length) return;
  let cur = items.findIndex(i=>i.classList.contains('active'));
  items.forEach(i=>i.classList.remove('active'));
  cur = (cur + dir + items.length) % items.length;
  items[cur].classList.add('active');
  items[cur].scrollIntoView({block:'nearest'});
}
function closeAutocomplete(){ autocomplete.classList.remove('open'); }

/* ==========================================================================
   ADVANCED FILTERS
   ========================================================================== */
const filtersToggleBtn = document.getElementById('filtersToggleBtn');
const filtersPanel = document.getElementById('filtersPanel');
filtersToggleBtn.addEventListener('click', ()=>{
  const open = filtersPanel.classList.toggle('open');
  filtersToggleBtn.setAttribute('aria-expanded', open ? 'true':'false');
});
const filterFieldIds = ['fDate','fLang','fRegion','fSafe','fFileType','fDomain','fResultType','fSort','fExact','fExclude'];
document.getElementById('applyFiltersBtn').addEventListener('click', ()=>{
  let count = 0;
  const f = {};
  filterFieldIds.forEach(id=>{
    const el = document.getElementById(id);
    const val = el.value.trim();
    f[id] = val;
    const isDefault = (el.tagName==='SELECT' && el.selectedIndex===0) || (el.tagName==='INPUT' && val==='');
    if(!isDefault) count++;
  });
  State.filters = f; State.activeFilterCount = count;
  const badge = document.getElementById('filterCount');
  badge.hidden = count===0; badge.textContent = count;
  toast(count ? count+' filter'+(count>1?'s':'')+' applied' : 'Filters reset');
});
document.getElementById('resetFiltersBtn').addEventListener('click', ()=>{
  filterFieldIds.forEach(id=>{
    const el = document.getElementById(id);
    if(el.tagName==='SELECT') el.selectedIndex=0; else el.value='';
  });
  State.filters = {}; State.activeFilterCount = 0;
  document.getElementById('filterCount').hidden = true;
});

/* ==========================================================================
   MOCK SEARCH SERVICES (data layer)
   ========================================================================== */
const SearchServices = {
  searchWeb(query, filters){ return mockResults(query, 'web'); },
  searchAI(query, context){ return mockAIAnswer(query); },
  searchImages(query, filters){ return mockResults(query, 'images'); },
  searchVideos(query, filters){ return mockResults(query, 'videos'); },
  searchNews(query, filters){ return mockResults(query, 'news'); },
  searchMaps(query, filters){ return mockResults(query, 'maps'); },
  searchShopping(query, filters){ return mockResults(query, 'shopping'); },
  searchAcademic(query, filters){ return mockResults(query, 'academic'); },
  searchSocial(query, filters){ return mockResults(query, 'social'); },
  searchFiles(query, files){ return mockResults(query, 'files'); }
};

const SAMPLE_DOMAINS = ['example.org','reference.dev','notebook.io','sourcelib.net','fieldguide.co','openarchive.info'];
function mockResults(query, mode){
  const n = 6;
  const out = [];
  for(let i=0;i<n;i++){
    out.push({
      title: capitalize(query) + ' — ' + ['an overview','deep dive','practical guide','recent findings','field notes','key concepts'][i%6],
      domain: SAMPLE_DOMAINS[i%SAMPLE_DOMAINS.length],
      url: 'https://' + SAMPLE_DOMAINS[i%SAMPLE_DOMAINS.length] + '/' + query.toLowerCase().replace(/\s+/g,'-'),
      snippet: 'A concise, sample summary describing how this result relates to “'+query+'”, provided here as representative demo content for the '+mode+' mode.',
      date: ['2 days ago','1 week ago','3 weeks ago','1 month ago','2 months ago','6 months ago'][i%6]
    });
  }
  return out;
}
function mockAIAnswer(query){
  return {
    question: query,
    answer: 'Here is a structured, sample answer summarizing what is generally known about “'+query+'”. This demo response illustrates how RaiaSpace would present a synthesized answer once connected to a real AI backend, combining multiple sources into one coherent explanation.',
    keyPoints: [
      'Summarizes the core idea in plain language.',
      'Draws on multiple representative sample sources.',
      'Flags open questions worth exploring further.'
    ],
    sources: SAMPLE_DOMAINS.slice(0,3).map(d=>({title: capitalize(query)+' explained', domain:d})),
    followups: [
      'What are the main challenges with '+query+'?',
      'How has '+query+' changed recently?',
      'What are good resources to learn more about '+query+'?'
    ]
  };
}

/* ==========================================================================
   SEARXNG SERVICE MODULE
   ========================================================================== */
const SEARXNG_DEFAULT_URL = 'http://localhost:8080';
const SEARXNG_TIMEOUT_MS = 15000;

const CATEGORY_MAP = {
  web:'general', ai:'general', images:'images', videos:'videos', news:'news',
  academic:'science', maps:'general', shopping:'general', social:'general'
};
const FALLBACK_NOTICE_MODES = new Set(['maps','shopping','social']);
const LANGUAGE_CODE_MAP = {'English':'en','Bahasa Indonesia':'id','Spanish':'es','Japanese':'ja','Any language':''};
const SAFE_SEARCH_MAP = {'Moderate':'1','Strict':'2','Off':'0'};
const TIME_RANGE_MAP = {'Any time':'','Past hour':'day','Past day':'day','Past week':'week','Past month':'month','Past year':'year'};

let searxngAbortController = null;

function getSearxngBaseUrl(){
  return State.searxngUrl || SEARXNG_DEFAULT_URL;
}

function normalizeSearxngUrl(raw){
  if(!raw || !raw.trim()) return {valid:false, url:'', error:'Enter a valid HTTP or HTTPS SearXNG URL.'};
  let url = raw.trim();
  try{
    const parsed = new URL(url);
    if(parsed.protocol !== 'http:' && parsed.protocol !== 'https:'){
      return {valid:false, url:'', error:'Enter a valid HTTP or HTTPS SearXNG URL.'};
    }
    // strip trailing slashes and any accidental /search suffix
    let clean = parsed.origin + parsed.pathname.replace(/\/+$/,'').replace(/\/search$/,'');
    clean = clean.replace(/\/+$/,'');
    return {valid:true, url: clean, error:null};
  }catch(e){
    return {valid:false, url:'', error:'Enter a valid HTTP or HTTPS SearXNG URL.'};
  }
}

function buildEffectiveQuery(query, filters){
  let q = query;
  if(filters && filters.fExact) q = '"'+filters.fExact.replace(/"/g,'')+'"';
  if(filters && filters.fDomain) q += ' site:'+filters.fDomain.trim().replace(/^https?:\/\//,'');
  if(filters && filters.fExclude){
    const terms = filters.fExclude.split(/\s+/).filter(Boolean);
    terms.forEach(t=>{ q += ' ' + (t.startsWith('-') ? t : '-'+t); });
  }
  return q.trim() || query;
}

function buildSearxngUrl(query, filters, mode, page){
  const base = normalizeSearxngUrl(getSearxngBaseUrl());
  if(!base.valid) return {valid:false, error: base.error};
  const category = CATEGORY_MAP[mode] || 'general';
  const effectiveQuery = buildEffectiveQuery(query, filters || {});
  const params = new URLSearchParams({
    q: effectiveQuery,
    format: 'json',
    pageno: String(page || 1)
  });
  if(category) params.set('categories', category);
  const lang = LANGUAGE_CODE_MAP[(filters||{}).fLang] || '';
  if(lang) params.set('language', lang);
  const tr = TIME_RANGE_MAP[(filters||{}).fDate] || '';
  if(tr) params.set('time_range', tr);
  const safe = SAFE_SEARCH_MAP[(filters||{}).fSafe];
  if(safe !== undefined) params.set('safesearch', safe);
  return {valid:true, requestUrl: `${base.url}/search?${params.toString()}`, category, effectiveQuery};
}

function classifySearxngError(error, response){
  if(error && error.name === 'AbortError'){
    return {type:'timeout', message:'The search request took too long. Try again or use another instance.'};
  }
  if(response){
    if(response.status === 403){
      return {type:'json-disabled', message:'This SearXNG instance does not allow JSON output. Enable JSON in settings.yml.'};
    }
    if(response.status === 429){
      return {type:'rate-limited', message:'The SearXNG instance temporarily limited this request. Try again later.'};
    }
    if(!response.ok){
      return {type:'network', message:'RaiaSpace could not reach this SearXNG instance.'};
    }
  }
  if(error && error.message && /NetworkError|Failed to fetch|TypeError/i.test(error.message)){
    return {type:'cors', message:'The SearXNG instance may be blocking browser requests. Check its CORS configuration or use a same-origin deployment.'};
  }
  return {type:'network', message:'RaiaSpace could not reach this SearXNG instance.'};
}

async function searchWithSearXNG(query, filters, mode, page, options){
  options = options || {};
  if(searxngAbortController) searxngAbortController.abort();
  searxngAbortController = new AbortController();
  const timeoutId = setTimeout(()=>searxngAbortController.abort(), SEARXNG_TIMEOUT_MS);

  const built = buildSearxngUrl(query, filters, mode, page);
  if(!built.valid){
    clearTimeout(timeoutId);
    return {ok:false, errorType:'invalid-url', message: built.error};
  }

  const startTime = performance.now();
  let response;
  try{
    response = await fetch(built.requestUrl, {
      method:'GET',
      headers:{ 'Accept':'application/json' },
      signal: searxngAbortController.signal
    });
  } catch(err){
    clearTimeout(timeoutId);
    const c = classifySearxngError(err, null);
    return {ok:false, errorType:c.type, message:c.message, technical:String(err)};
  }
  clearTimeout(timeoutId);
  const elapsedMs = Math.round(performance.now() - startTime);

  if(!response.ok){
    const c = classifySearxngError(null, response);
    return {ok:false, errorType:c.type, message:c.message, technical:'HTTP '+response.status};
  }
  const contentType = response.headers.get('content-type') || '';
  if(!contentType.includes('application/json')){
    return {ok:false, errorType:'json-disabled', message:'This SearXNG instance does not allow JSON output. Enable JSON in settings.yml.', technical:'Content-Type: '+(contentType||'unknown')};
  }
  let data;
  try{
    data = await response.json();
  } catch(err){
    return {ok:false, errorType:'malformed', message:'RaiaSpace received an unreadable response from this SearXNG instance.', technical:String(err)};
  }

  return {ok:true, data, elapsedMs, category: built.category, effectiveQuery: built.effectiveQuery};
}

function mapSearxngResults(data, mode){
  if(!data || !Array.isArray(data.results)) return [];
  return data.results.map((r, i)=>{
    let domain = '';
    try{ domain = new URL(r.url).hostname.replace(/^www\./,''); }catch(e){ domain = r.pretty_url || ''; }
    return {
      id: 'sx-'+i+'-'+(r.url||''),
      title: r.title || domain || 'Untitled result',
      url: r.url || '',
      domain,
      snippet: r.content || '',
      content: r.content || '',
      engine: r.engine || '',
      engines: r.engines || (r.engine ? [r.engine] : []),
      category: r.category || mode,
      publishedDate: r.publishedDate || r.publishedAt || '',
      thumbnail: r.thumbnail || r.img_src || '',
      iframe: r.iframe_src || '',
      score: r.score || 0,
      source: 'SearXNG'
    };
  });
}

function getSearxngSuggestions(data){
  if(!data || !Array.isArray(data.suggestions)) return [];
  return data.suggestions.slice(0,8);
}

async function checkSearxngConnection(url){
  const norm = normalizeSearxngUrl(url);
  if(!norm.valid) return {status:'invalid', message: norm.error};
  const prevUrl = State.searxngUrl;
  State.searxngUrl = norm.url;
  const result = await searchWithSearXNG('connectivity test', {}, 'web', 1, {});
  State.searxngUrl = prevUrl;
  if(!result.ok){
    const statusMap = {'json-disabled':'json-unavailable','cors':'cors','timeout':'timeout','invalid-url':'invalid','rate-limited':'network','malformed':'network','network':'network'};
    return {status: statusMap[result.errorType] || 'network', message: result.message};
  }
  return {status:'ok', message:'SearXNG is reachable and returned valid JSON.'};
}

/* ==========================================================================
   RUN SEARCH / RESULTS VIEW
   ========================================================================== */
const homeView = document.getElementById('homeView');
const resultsView = document.getElementById('resultsView');
const resultsContent = document.getElementById('resultsContent');
let bookmarks = new Set(Store.get('rs_bookmarks', []));

let currentSearchQuery = '';
let lastSubmitTime = 0;

function runSearch(query){
  query = query.trim();
  if(!query) return;
  const now = Date.now();
  if(now - lastSubmitTime < 400) return; // prevent duplicate/double submissions
  lastSubmitTime = now;

  closeAutocomplete();
  searchInput.value = query;
  currentSearchQuery = query;
  State.currentPage = 1;

  if(State.saveHistory){
    State.history.push({query, mode: State.mode, time: Date.now()});
    if(State.history.length > 50) State.history.shift();
    Store.set('rs_history', State.history);
  }

  homeView.classList.add('home-hidden');
  resultsView.classList.add('active');
  window.scrollTo({top:0, behavior: State.reducedMotion ? 'auto':'smooth'});

  document.getElementById('resultsQueryText').textContent = query;
  document.getElementById('resultsModeTag').textContent = MODES.find(m=>m.id===State.mode).label;
  renderResultsFilterChips();
  renderResultTabs();

  loadResults(query, State.currentPage);
}

function loadResults(query, page){
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;
  resultsContent.innerHTML = skeletonHTML();

  const mode = effectiveDataMode();

  if(mode === 'demo'){
    setTimeout(()=>{
      submitBtn.classList.remove('loading');
      updateSubmitState();
      renderDemoResults(query, page);
    }, 550);
  } else {
    renderLiveResults(query, page).finally(()=>{
      submitBtn.classList.remove('loading');
      updateSubmitState();
    });
  }
}

function skeletonHTML(){
  let html = '';
  for(let i=0;i<4;i++){
    html += '<div class="skeleton-card glass"><div class="sk-line sk-w40"></div><div class="sk-line sk-w90"></div><div class="sk-line sk-w60"></div></div>';
  }
  return html;
}

function renderResultsFilterChips(){
  const wrap = document.getElementById('resultsFilterChips');
  const active = Object.entries(State.filters).filter(([k,v])=>v && v!=='Any time' && v!=='Any language' && v!=='Any region' && v!=='Moderate' && v!=='Any type' && v!=='All results' && v!=='Relevance');
  wrap.innerHTML = active.map(([k,v])=>
    '<span class="results-filter-chip'+(k==='fDomain'?' domain-chip':'')+'">'+escapeHTML(v)+'<button aria-label="Remove filter" data-filter-key="'+k+'">'+ICONS.close+'</button></span>'
  ).join('');
  wrap.querySelectorAll('button').forEach(b=>{
    b.addEventListener('click', ()=>{
      delete State.filters[b.dataset.filterKey];
      State.activeFilterCount = Math.max(0, State.activeFilterCount-1);
      renderResultsFilterChips();
      loadResults(currentSearchQuery, State.currentPage);
    });
  });
}

const RESULT_TABS = ['All','AI Overview','Images','Videos','News','Discussions'];
let activeTab = 'All';
function renderResultTabs(){
  const wrap = document.getElementById('resultTabs');
  wrap.innerHTML = RESULT_TABS.map(t=>
    '<button class="result-tab" role="tab" aria-selected="'+(t===activeTab)+'" data-tab="'+t+'">'+t+'</button>'
  ).join('');
  wrap.querySelectorAll('.result-tab').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      activeTab = btn.dataset.tab;
      wrap.querySelectorAll('.result-tab').forEach(b=>b.setAttribute('aria-selected', b===btn ? 'true':'false'));
      State.currentPage = 1;
      loadResults(currentSearchQuery, State.currentPage);
    });
  });
}

/* ---------- Shared render pieces ---------- */
function poweredByBadge(){
  return '<span class="powered-by">'+ICONS.shield+'<span>Powered by SearXNG</span></span>';
}
function metaStripHTML(count, elapsedMs){
  const parts = [];
  if(typeof count === 'number') parts.push('<span>'+count.toLocaleString()+' results</span>');
  if(typeof elapsedMs === 'number') parts.push('<span>'+(elapsedMs/1000).toFixed(2)+'s</span>');
  return parts.length ? '<div class="results-meta-strip">'+parts.join('')+'</div>' : '';
}
function noticeBannerHTML(text){
  return '<div class="notice-banner">'+ICONS.warn+'<span>'+escapeHTML(text)+'</span></div>';
}
function emptyStateHTML(){
  return '<div class="results-empty">'+ICONS.search+'<h3>No results</h3><p>No results were returned for this query.</p></div>';
}
function relatedSearchesHTML(suggestions){
  if(!suggestions || !suggestions.length) return '';
  return '<div class="related-searches"><h3>Related searches</h3><div class="related-chips">'+
    suggestions.map(s=>'<button class="followup-chip" data-followup="'+escapeHTML(s)+'">'+escapeHTML(s)+'</button>').join('')+
  '</div></div>';
}
const ICON_ARROW_LEFT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>';
function paginationHTML(page, hasResults, hasMore){
  return '<div class="pagination-row">'+
    '<button class="page-btn" id="pagePrevBtn" type="button" '+(page<=1?'disabled':'')+'>'+ICON_ARROW_LEFT+'<span>Previous</span></button>'+
    '<span class="page-indicator">Page '+page+'</span>'+
    '<button class="page-btn" id="pageNextBtn" type="button" '+(!hasResults||!hasMore?'disabled':'')+'><span>Next</span>'+ICONS.arrow+'</button>'+
  '</div>';
}
function errorScreenHTML(errorType, message, technical){
  return '<div class="error-screen glass">'+
    '<div class="err-icon">'+ICONS.warn+'</div>'+
    '<h3>We hit a snag</h3>'+
    '<p>'+escapeHTML(message)+'</p>'+
    '<div class="modal-btn-row">'+
      '<button class="btn btn-ghost" id="errSettingsBtn" type="button">Open settings</button>'+
      '<button class="btn btn-primary" id="errRetryBtn" type="button">Retry</button>'+
    '</div>'+
    (technical ? '<button class="error-tech-toggle" id="errTechToggle" type="button">Show technical detail</button><div class="error-tech-detail" id="errTechDetail">'+escapeHTML(technical)+'</div>' : '')+
  '</div>';
}
function localOnlyBannerHTML(){
  return '<div class="local-only-banner">'+ICONS.shield+'<span>Files mode is local-only in this frontend. Selected files are never sent to SearXNG or any remote service.</span></div>';
}

/* ---------- Demo mode rendering (mock data) ---------- */
function renderDemoResults(query, page){
  let html = '<span class="data-mode-badge" style="margin-bottom:16px;"><span class="dm-dot"></span>Local Demo data</span>';
  if(State.mode === 'files'){
    html += localOnlyBannerHTML();
  }
  if(State.mode === 'ai' || activeTab === 'AI Overview'){
    html += aiAnswerHTML(SearchServices.searchAI(query));
  }
  if(State.mode !== 'files'){
    html += resultsListHTML(query, page);
    html += relatedSearchesHTML(['related to '+query, query+' guide', query+' examples']);
    html += paginationHTML(page, true, page < 3);
  }
  resultsContent.innerHTML = html;
  wireResultActions(false);
}

function aiAnswerHTML(ans){
  return '<div class="ai-answer-box glass">'+
    '<h2>'+escapeHTML(ans.question)+'</h2>'+
    '<p class="ai-answer-text">'+escapeHTML(ans.answer)+'</p>'+
    '<ul class="ai-keypoints">'+ans.keyPoints.map(p=>'<li>'+ICONS.check+'<span>'+escapeHTML(p)+'</span></li>').join('')+'</ul>'+
    '<div class="ai-sources">'+ans.sources.map(s=>'<div class="ai-source-card"><div class="src-title">'+escapeHTML(s.title)+'</div><div class="src-domain">'+escapeHTML(s.domain)+'</div></div>').join('')+'</div>'+
    '<div class="ai-followups">'+ans.followups.map(f=>'<button class="followup-chip" data-followup="'+escapeHTML(f)+'">'+escapeHTML(f)+'</button>').join('')+'</div>'+
    '<div class="ai-answer-actions">'+
      '<button class="chip-btn" data-ai-action="copy">'+ICONS.copy+'<span>Copy answer</span></button>'+
      '<button class="chip-btn" data-ai-action="share">'+ICONS.share+'<span>Share</span></button>'+
      '<button class="chip-btn" data-ai-action="regenerate">'+ICONS.refresh+'<span>Regenerate</span></button>'+
      '<span class="spacer"></span>'+
      '<button class="chip-btn" data-ai-action="sources">'+ICONS.doc+'<span>View sources</span></button>'+
    '</div>'+
  '</div>';
}

function resultsListHTML(query, page){
  const svc = {web:'searchWeb',ai:'searchWeb',images:'searchImages',videos:'searchVideos',news:'searchNews',maps:'searchMaps',shopping:'searchShopping',academic:'searchAcademic',social:'searchSocial',files:'searchFiles'}[State.mode] || 'searchWeb';
  const results = SearchServices[svc](query, State.filters);
  return results.map((r)=> resultCardHTML({title:r.title, domain:r.domain, url:r.url, snippet:r.snippet, meta:r.date, sample:true, real:false}, query)).join('');
}

function resultCardHTML(r, query){
  const bmKey = query+'::'+r.url;
  const isBm = bookmarks.has(bmKey);
  return '<article class="result-card glass">'+
    '<div class="result-top">'+
      '<span class="result-favicon">'+ICONS.web+'</span>'+
      '<span class="result-domain">'+escapeHTML(r.domain||'')+'</span>'+
      (r.engine ? '<span class="result-domain" style="opacity:0.7;">· '+escapeHTML(r.engine)+'</span>' : '')+
      (r.sample ? '<span class="result-sample-tag">Sample result</span>' : '')+
    '</div>'+
    '<a class="result-title" href="'+escapeAttr(r.url)+'" target="_blank" rel="noopener noreferrer" data-action="titleopen" data-real="'+(r.real?'true':'false')+'">'+escapeHTML(r.title)+'</a>'+
    '<p class="result-snippet">'+escapeHTML(r.snippet||'')+'</p>'+
    '<div class="result-meta">'+escapeHTML(r.url||'')+(r.meta?' · '+escapeHTML(r.meta):'')+'</div>'+
    '<div class="result-actions">'+
      '<button class="icon-btn'+(isBm?' active':'')+'" data-action="bookmark" data-key="'+escapeAttr(bmKey)+'" aria-label="Bookmark this result" data-tooltip="Bookmark">'+ICONS.bookmark+'</button>'+
      '<button class="icon-btn" data-action="copy" data-url="'+escapeAttr(r.url)+'" aria-label="Copy link" data-tooltip="Copy link">'+ICONS.copy+'</button>'+
      '<button class="icon-btn" data-action="share" data-title="'+escapeAttr(r.title)+'" data-url="'+escapeAttr(r.url)+'" aria-label="Share" data-tooltip="Share">'+ICONS.share+'</button>'+
      '<button class="icon-btn" data-action="open" data-url="'+escapeAttr(r.url)+'" data-real="'+(r.real?'true':'false')+'" aria-label="Open in new tab" data-tooltip="Open in new tab">'+ICONS.external+'</button>'+
    '</div>'+
  '</article>';
}
function escapeAttr(str){ return escapeHTML(str||''); }

/* ---------- Live mode rendering (SearXNG) ---------- */
async function renderLiveResults(query, page){
  if(State.mode === 'files'){
    resultsContent.innerHTML = '<span class="data-mode-badge live" style="margin-bottom:16px;"><span class="dm-dot"></span>Live SearXNG</span>' + localOnlyBannerHTML();
    return;
  }

  const result = await searchWithSearXNG(query, State.filters, State.mode, page, {});

  if(!result.ok){
    const technical = result.technical || '';
    resultsContent.innerHTML = '<span class="data-mode-badge live" style="margin-bottom:16px;"><span class="dm-dot"></span>Live SearXNG</span>' +
      errorScreenHTML(result.errorType, result.message, technical);
    wireResultActions(true);
    return;
  }

  const data = result.data;
  const normalized = mapSearxngResults(data, State.mode);
  const suggestions = getSearxngSuggestions(data);
  let html = '<span class="data-mode-badge live" style="margin-bottom:16px;"><span class="dm-dot"></span>Live SearXNG</span>';
  html += poweredByBadge();
  html += metaStripHTML(typeof data.number_of_results === 'number' ? data.number_of_results : normalized.length, result.elapsedMs);

  if(FALLBACK_NOTICE_MODES.has(State.mode)){
    const labels = {maps:'native map search', shopping:'a dedicated shopping category', social:'a dedicated social category'};
    html += noticeBannerHTML('This SearXNG instance does not have '+(labels[State.mode]||'this category')+' configured — showing general web results instead, labeled as web-based discovery.');
  }

  if(!normalized.length){
    html += emptyStateHTML();
    resultsContent.innerHTML = html;
    wireResultActions(true);
    return;
  }

  if(State.mode === 'ai' || activeTab === 'AI Overview'){
    html += sourceBasedPreviewHTML(query, normalized);
  }

  if(State.mode === 'images'){
    html += mediaGridHTML(normalized);
  } else if(State.mode === 'videos'){
    html += videoGridHTML(normalized);
  } else {
    html += normalized.map(r=> resultCardHTML({
      title:r.title, domain:r.domain, url:r.url, snippet:r.snippet, meta:r.publishedDate, engine:r.engine, sample:false, real:true
    }, query)).join('');
  }

  html += relatedSearchesHTML(suggestions);
  html += paginationHTML(page, normalized.length>0, normalized.length>0);
  resultsContent.innerHTML = html;
  wireResultActions(true);
  wireMediaThumbs();
}

function sourceBasedPreviewHTML(query, results){
  const topSnippets = results.slice(0,4).map(r=>r.snippet).filter(Boolean);
  const summary = topSnippets.length
    ? topSnippets.join(' ').split(/(?<=[.!?])\s+/).slice(0,4).join(' ')
    : 'No extractable snippet content was available in the returned sources for this query.';
  return '<div class="ai-answer-box glass">'+
    '<span class="source-preview-label">'+ICONS.sparkle+'<span>Source-based preview</span></span>'+
    '<h2>'+escapeHTML(query)+'</h2>'+
    '<div class="ai-disclaimer">Generated locally from search snippets. This is not a live AI-generated answer — connect an AI provider for full synthesis.</div>'+
    '<p class="ai-answer-text">'+escapeHTML(summary)+'</p>'+
    '<div class="ai-sources">'+results.slice(0,4).map(r=>'<div class="ai-source-card"><div class="src-title">'+escapeHTML(r.title)+'</div><div class="src-domain">'+escapeHTML(r.domain)+'</div></div>').join('')+'</div>'+
  '</div>';
}

function mediaGridHTML(results){
  return '<div class="media-grid">'+results.map(r=>
    '<button class="media-card" type="button" data-action="open" data-url="'+escapeAttr(r.url)+'" data-real="true" aria-label="Open '+escapeAttr(r.title)+'">'+
      '<div class="media-thumb-wrap">'+
        '<span class="media-placeholder">'+ICONS.images+'</span>'+
        (r.thumbnail ? '<img class="media-thumb-img" src="'+escapeAttr(r.thumbnail)+'" alt="" loading="lazy" style="position:absolute;inset:0;">' : '')+
      '</div>'+
      '<div class="media-caption"><div class="m-title">'+escapeHTML(r.title)+'</div><div class="m-source">'+escapeHTML(r.domain)+'</div></div>'+
    '</button>'
  ).join('')+'</div>';
}
function wireMediaThumbs(){
  resultsContent.querySelectorAll('.media-thumb-img, .video-thumb-wrap img').forEach(img=>{
    img.addEventListener('error', ()=>{ img.style.display = 'none'; });
  });
}

function videoGridHTML(results){
  return '<div class="video-grid">'+results.map(r=>
    '<button class="video-card glass" type="button" data-action="open" data-url="'+escapeAttr(r.url)+'" data-real="true" aria-label="Open '+escapeAttr(r.title)+'">'+
      '<div class="video-thumb-wrap">'+
        (r.thumbnail ? '<img src="'+escapeAttr(r.thumbnail)+'" alt="" loading="lazy">' : '')+
        '<span class="video-play">'+ICONS.videos+'</span>'+
      '</div>'+
      '<div class="video-info"><div class="v-title">'+escapeHTML(r.title)+'</div><div class="v-meta">'+escapeHTML(r.domain)+(r.publishedDate?' · '+escapeHTML(r.publishedDate):'')+'</div></div>'+
    '</button>'
  ).join('')+'</div>';
}

function wireResultActions(isLive){
  resultsContent.querySelectorAll('[data-action="titleopen"]').forEach(a=>{
    if(a.dataset.real !== 'true'){
      a.addEventListener('click', e=>{ e.preventDefault(); toast('This is a sample result — no live link to open'); });
    }
  });
  resultsContent.querySelectorAll('[data-action="bookmark"]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const key = btn.dataset.key;
      if(bookmarks.has(key)){ bookmarks.delete(key); btn.classList.remove('active'); toast('Bookmark removed'); }
      else { bookmarks.add(key); btn.classList.add('active'); toast('Bookmarked'); }
      Store.set('rs_bookmarks', Array.from(bookmarks));
    });
  });
  resultsContent.querySelectorAll('[data-action="copy"]').forEach(btn=>{
    btn.addEventListener('click', ()=>{ copyToClipboard(btn.dataset.url); });
  });
  resultsContent.querySelectorAll('[data-action="share"]').forEach(btn=>{
    btn.addEventListener('click', ()=>{ doShare(btn.dataset.title, btn.dataset.url); });
  });
  resultsContent.querySelectorAll('[data-action="open"]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      if(btn.tagName==='A') return; // real anchor already navigates
      if(btn.dataset.real === 'true' && btn.dataset.url){
        window.open(btn.dataset.url, '_blank', 'noopener,noreferrer');
      } else {
        toast('This is a sample result — no live link to open');
      }
    });
  });
  resultsContent.querySelectorAll('[data-followup]').forEach(btn=>{
    btn.addEventListener('click', ()=>{ runSearch(btn.dataset.followup); });
  });
  resultsContent.querySelectorAll('[data-ai-action]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const action = btn.dataset.aiAction;
      if(action==='copy'){ copyToClipboard(document.querySelector('.ai-answer-text').textContent); }
      else if(action==='share'){ doShare('RaiaSpace AI answer', location.href); }
      else if(action==='regenerate'){ loadResults(currentSearchQuery, State.currentPage); }
      else if(action==='sources'){ toast('Sources shown below the answer'); }
    });
  });
  const prevBtn = document.getElementById('pagePrevBtn');
  const nextBtn = document.getElementById('pageNextBtn');
  if(prevBtn) prevBtn.addEventListener('click', ()=>{ if(State.currentPage>1){ State.currentPage--; loadResults(currentSearchQuery, State.currentPage); window.scrollTo({top:0,behavior:'auto'}); } });
  if(nextBtn) nextBtn.addEventListener('click', ()=>{ State.currentPage++; loadResults(currentSearchQuery, State.currentPage); window.scrollTo({top:0,behavior:'auto'}); });

  const errRetry = document.getElementById('errRetryBtn');
  const errSettings = document.getElementById('errSettingsBtn');
  const errTechToggle = document.getElementById('errTechToggle');
  if(errRetry) errRetry.addEventListener('click', ()=> loadResults(currentSearchQuery, State.currentPage));
  if(errSettings) errSettings.addEventListener('click', ()=> openDrawer('settingsOverlay','settingsDrawer', settingsBtn));
  if(errTechToggle) errTechToggle.addEventListener('click', ()=>{
    const d = document.getElementById('errTechDetail');
    const show = d.classList.toggle('show');
    errTechToggle.textContent = show ? 'Hide technical detail' : 'Show technical detail';
  });
}

function copyToClipboard(text){
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(()=>toast('Link copied')).catch(()=>toast('Could not copy link'));
  } else {
    toast('Copy is not supported in this browser');
  }
}
function doShare(title, url){
  if(navigator.share){
    navigator.share({title, url}).catch(()=>{});
  } else {
    copyToClipboard(url);
    toast('Share unavailable — link copied instead');
  }
}

document.getElementById('backHomeBtn').addEventListener('click', ()=>{
  resultsView.classList.remove('active');
  homeView.classList.remove('home-hidden');
  window.scrollTo({top:0, behavior: State.reducedMotion ? 'auto':'smooth'});
});
document.getElementById('logoHome').addEventListener('click', (e)=>{
  e.preventDefault();
  resultsView.classList.remove('active');
  homeView.classList.remove('home-hidden');
  window.scrollTo({top:0, behavior:'auto'});
});

/* ==========================================================================
   KEYBOARD SHORTCUTS MODAL
   ========================================================================== */
function openModal(id, triggerBtn){
  const overlay = document.getElementById(id);
  overlay.classList.add('open');
  overlay._trigger = triggerBtn;
  const focusable = overlay.querySelector('button, input, [tabindex]');
  if(focusable) focusable.focus();
  document.addEventListener('keydown', trapFocus);
}
function closeModal(id){
  const overlay = document.getElementById(id);
  overlay.classList.remove('open');
  if(overlay._trigger) overlay._trigger.focus();
  document.removeEventListener('keydown', trapFocus);
}
function trapFocus(e){
  if(e.key !== 'Tab') return;
  const openModalEl = document.querySelector('.modal-overlay.open .modal, .side-drawer.open, .mobile-drawer.open');
  if(!openModalEl) return;
  const focusables = openModalEl.querySelectorAll('button, input, select, a, [tabindex]:not([tabindex="-1"])');
  if(!focusables.length) return;
  const first = focusables[0], last = focusables[focusables.length-1];
  if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
  else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
}

const shortcutsFooterLink = document.getElementById('footerShortcuts');
shortcutsFooterLink.addEventListener('click', e=>{ e.preventDefault(); openModal('shortcutsOverlay', shortcutsFooterLink); });
document.getElementById('shortcutsClose').addEventListener('click', ()=>closeModal('shortcutsOverlay'));
document.getElementById('shortcutsOverlay').addEventListener('click', e=>{ if(e.target.id==='shortcutsOverlay') closeModal('shortcutsOverlay'); });

document.addEventListener('keydown', e=>{
  const mod = e.ctrlKey || e.metaKey;
  if(mod && e.key.toLowerCase()==='k'){ e.preventDefault(); searchInput.focus(); }
  else if(mod && e.key==='/'){ e.preventDefault(); openModal('shortcutsOverlay', document.activeElement); }
  else if(e.key === 'Escape'){
    ['shortcutsOverlay','voiceOverlay','imageModalOverlay','fileModalOverlay','cameraModalOverlay'].forEach(id=>{
      const ov = document.getElementById(id);
      if(ov.classList.contains('open')) closeModal(id);
    });
    if(document.getElementById('settingsDrawer').classList.contains('open')) closeDrawer('settingsOverlay','settingsDrawer');
    if(document.getElementById('historyDrawer').classList.contains('open')) closeDrawer('historyOverlay','historyDrawer');
    if(document.getElementById('mobileDrawer').classList.contains('open')) closeMobileDrawer();
  }
});

/* ==========================================================================
   VOICE SEARCH
   ========================================================================== */
const voiceBtn = document.getElementById('voiceBtn');
const voiceStatus = document.getElementById('voiceStatus');
const voiceTranscript = document.getElementById('voiceTranscript');
const voiceVisual = document.getElementById('voiceVisual');
const voiceStartBtn = document.getElementById('voiceStartBtn');
let recognition = null, listening = false, finalTranscript = '';

const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;

voiceBtn.addEventListener('click', ()=>{
  resetVoiceModal();
  openModal('voiceOverlay', voiceBtn);
  if(!SpeechRec){
    voiceStatus.textContent = 'Voice search is not supported in this browser. You can still type your query.';
    voiceStartBtn.disabled = true;
  }
});
document.getElementById('voiceClose').addEventListener('click', ()=>{ stopListening(); closeModal('voiceOverlay'); });
document.getElementById('voiceOverlay').addEventListener('click', e=>{ if(e.target.id==='voiceOverlay'){ stopListening(); closeModal('voiceOverlay'); } });
document.getElementById('voiceCancelBtn').addEventListener('click', ()=>{ stopListening(); closeModal('voiceOverlay'); });

function resetVoiceModal(){
  finalTranscript = '';
  voiceTranscript.textContent = 'Your recognized speech will appear here…';
  voiceStatus.textContent = 'Tap start and allow microphone access.';
  voiceVisual.classList.remove('listening');
  voiceStartBtn.textContent = 'Start listening';
  voiceStartBtn.disabled = !SpeechRec;
  voiceStartBtn.onclick = startListening;
}

function startListening(){
  if(!SpeechRec) return;
  recognition = new SpeechRec();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onstart = ()=>{
    listening = true;
    voiceVisual.classList.add('listening');
    voiceStatus.textContent = 'Listening…';
    voiceStartBtn.textContent = 'Stop listening';
    voiceStartBtn.onclick = stopListening;
  };
  recognition.onresult = (event)=>{
    let interim = '';
    for(let i=event.resultIndex; i<event.results.length; i++){
      if(event.results[i].isFinal) finalTranscript += event.results[i][0].transcript;
      else interim += event.results[i][0].transcript;
    }
    voiceTranscript.textContent = (finalTranscript + interim) || 'Your recognized speech will appear here…';
  };
  recognition.onerror = (event)=>{
    if(event.error === 'not-allowed' || event.error === 'permission-denied'){
      voiceStatus.textContent = 'Microphone permission was denied. Enable it in your browser settings to use voice search.';
    } else {
      voiceStatus.textContent = "We couldn't process that. Try again or type your query instead.";
    }
    stopListening();
  };
  recognition.onend = ()=>{
    if(listening){ listening = false; voiceVisual.classList.remove('listening'); voiceStatus.textContent = 'Stopped listening.'; voiceStartBtn.textContent='Start listening'; voiceStartBtn.onclick = startListening; }
  };
  try{ recognition.start(); } catch(e){ voiceStatus.textContent = 'Could not start voice recognition.'; }
}
function stopListening(){
  if(recognition && listening){ try{ recognition.stop(); }catch(e){} }
  listening = false;
  voiceVisual.classList.remove('listening');
}
document.getElementById('voiceModalBody').insertAdjacentHTML('beforeend','');
document.querySelector('.modal-btn-row #voiceStartBtn') && null;
document.getElementById('voiceStartBtn').addEventListener('click', function useHandler(){
  // placeholder replaced dynamically; real handling attached via onclick above
});
document.getElementById('voiceOverlay').querySelector('.modal').insertAdjacentHTML('beforeend', '');

// "Use this query" support: add a use-query button dynamically once transcript exists
const voiceBtnRow = document.querySelector('#voiceModalBody .modal-btn-row');
const useQueryBtn = document.createElement('button');
useQueryBtn.type='button'; useQueryBtn.className='btn btn-primary'; useQueryBtn.textContent='Use this query'; useQueryBtn.style.display='none';
useQueryBtn.addEventListener('click', ()=>{
  const text = finalTranscript.trim();
  if(text){ stopListening(); closeModal('voiceOverlay'); runSearch(text); }
});
voiceBtnRow.appendChild(useQueryBtn);
const obs = new MutationObserver(()=>{
  useQueryBtn.style.display = finalTranscript.trim() ? 'block' : 'none';
});
obs.observe(voiceTranscript, {childList:true, characterData:true, subtree:true});

/* ==========================================================================
   IMAGE SEARCH MODAL
   ========================================================================== */
const imageSearchBtn = document.getElementById('imageSearchBtn');
const imageDropzone = document.getElementById('imageDropzone');
const imageFileInput = document.getElementById('imageFileInput');
const imagePreviewArea = document.getElementById('imagePreviewArea');
const imageSearchSubmitBtn = document.getElementById('imageSearchSubmitBtn');
const MAX_IMAGE_MB = 10;

imageSearchBtn.addEventListener('click', ()=>{ resetImageModal(); openModal('imageModalOverlay', imageSearchBtn); });
document.getElementById('imageModalClose').addEventListener('click', ()=>closeModal('imageModalOverlay'));
document.getElementById('imageCancelBtn').addEventListener('click', ()=>closeModal('imageModalOverlay'));
document.getElementById('imageModalOverlay').addEventListener('click', e=>{ if(e.target.id==='imageModalOverlay') closeModal('imageModalOverlay'); });

function resetImageModal(){
  State.imageFile = null;
  imagePreviewArea.innerHTML='';
  document.getElementById('imagePromptField').value='';
  imageSearchSubmitBtn.disabled = true;
  imageDropzone.style.display='block';
}
imageDropzone.addEventListener('click', ()=> imageFileInput.click());
imageDropzone.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); imageFileInput.click(); } });
['dragenter','dragover'].forEach(evt=> imageDropzone.addEventListener(evt, e=>{ e.preventDefault(); imageDropzone.classList.add('drag-over'); }));
['dragleave','drop'].forEach(evt=> imageDropzone.addEventListener(evt, e=>{ e.preventDefault(); imageDropzone.classList.remove('drag-over'); }));
imageDropzone.addEventListener('drop', e=>{ const f = e.dataTransfer.files[0]; if(f) handleImageFile(f); });
imageFileInput.addEventListener('change', e=>{ const f = e.target.files[0]; if(f) handleImageFile(f); });

function handleImageFile(file){
  const validTypes = ['image/png','image/jpeg','image/webp'];
  if(!validTypes.includes(file.type)){
    imagePreviewArea.innerHTML = '<div class="err-msg">'+ICONS.warn+'<span>Please choose a supported file type.</span></div>';
    return;
  }
  if(file.size > MAX_IMAGE_MB*1024*1024){
    imagePreviewArea.innerHTML = '<div class="err-msg">'+ICONS.warn+'<span>This file exceeds the maximum allowed size.</span></div>';
    return;
  }
  State.imageFile = file;
  const url = URL.createObjectURL(file);
  imagePreviewArea.innerHTML = '<div class="preview-card">'+
    '<img class="preview-thumb" src="'+url+'" alt="">'+
    '<div class="preview-meta"><div class="preview-name">'+escapeHTML(file.name)+'</div><div class="preview-size">'+formatBytes(file.size)+'</div></div>'+
    '<button class="icon-btn" id="removeImageBtn" aria-label="Remove image">'+ICONS.close+'</button>'+
  '</div>';
  imageDropzone.style.display='none';
  imageSearchSubmitBtn.disabled = false;
  document.getElementById('removeImageBtn').addEventListener('click', resetImageModal);
}
imageSearchSubmitBtn.addEventListener('click', ()=>{
  if(!State.imageFile) return;
  closeModal('imageModalOverlay');
  const prompt = document.getElementById('imagePromptField').value.trim();
  setMode('images');
  runSearch(prompt || State.imageFile.name.replace(/\.[^.]+$/,''));
});
function formatBytes(b){
  if(b < 1024) return b+' B';
  if(b < 1024*1024) return (b/1024).toFixed(1)+' KB';
  return (b/(1024*1024)).toFixed(1)+' MB';
}

/* ==========================================================================
   FILE UPLOAD MODAL
   ========================================================================== */
const fileUploadBtn = document.getElementById('fileUploadBtn');
const fileDropzone = document.getElementById('fileDropzone');
const genericFileInput = document.getElementById('genericFileInput');
const filePreviewArea = document.getElementById('filePreviewArea');
const fileSearchSubmitBtn = document.getElementById('fileSearchSubmitBtn');
const MAX_FILE_MB = 20;
const ALLOWED_EXT = ['pdf','docx','txt','csv','md','png','jpg','jpeg','webp','gif'];

fileUploadBtn.addEventListener('click', ()=>{ resetFileModal(); openModal('fileModalOverlay', fileUploadBtn); });
document.getElementById('fileModalClose').addEventListener('click', ()=>closeModal('fileModalOverlay'));
document.getElementById('fileCancelBtn').addEventListener('click', ()=>closeModal('fileModalOverlay'));
document.getElementById('fileModalOverlay').addEventListener('click', e=>{ if(e.target.id==='fileModalOverlay') closeModal('fileModalOverlay'); });

function resetFileModal(){
  State.genericFile = null;
  filePreviewArea.innerHTML='';
  fileSearchSubmitBtn.disabled = true;
  fileDropzone.style.display='block';
}
fileDropzone.addEventListener('click', ()=> genericFileInput.click());
fileDropzone.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); genericFileInput.click(); } });
['dragenter','dragover'].forEach(evt=> fileDropzone.addEventListener(evt, e=>{ e.preventDefault(); fileDropzone.classList.add('drag-over'); }));
['dragleave','drop'].forEach(evt=> fileDropzone.addEventListener(evt, e=>{ e.preventDefault(); fileDropzone.classList.remove('drag-over'); }));
fileDropzone.addEventListener('drop', e=>{ const f = e.dataTransfer.files[0]; if(f) handleGenericFile(f); });
genericFileInput.addEventListener('change', e=>{ const f = e.target.files[0]; if(f) handleGenericFile(f); });

function handleGenericFile(file){
  const ext = file.name.split('.').pop().toLowerCase();
  if(!ALLOWED_EXT.includes(ext)){
    filePreviewArea.innerHTML = '<div class="err-msg">'+ICONS.warn+'<span>Please choose a supported file type.</span></div>';
    return;
  }
  if(file.size > MAX_FILE_MB*1024*1024){
    filePreviewArea.innerHTML = '<div class="err-msg">'+ICONS.warn+'<span>This file exceeds the maximum allowed size.</span></div>';
    return;
  }
  State.genericFile = file;
  filePreviewArea.innerHTML = '<div class="preview-card">'+
    '<div class="preview-file-icon">'+ICONS.doc+'</div>'+
    '<div class="preview-meta"><div class="preview-name">'+escapeHTML(file.name)+'</div><div class="preview-size">'+formatBytes(file.size)+' · '+ext.toUpperCase()+'</div></div>'+
    '<button class="icon-btn" id="removeFileBtn" aria-label="Remove file">'+ICONS.close+'</button>'+
  '</div><div class="progress-track"><div class="progress-fill" id="fileProgressFill" style="width:0%"></div></div>';
  fileDropzone.style.display='none';
  document.getElementById('removeFileBtn').addEventListener('click', resetFileModal);
  animateProgress();
}
function animateProgress(){
  let p = 0;
  const fill = document.getElementById('fileProgressFill');
  const iv = setInterval(()=>{
    p += Math.random()*22;
    if(p >= 100){ p = 100; clearInterval(iv); fileSearchSubmitBtn.disabled = false; }
    if(fill) fill.style.width = p+'%';
  }, 140);
}
fileSearchSubmitBtn.addEventListener('click', ()=>{
  if(!State.genericFile) return;
  closeModal('fileModalOverlay');
  setMode('files');
  runSearch(State.genericFile.name.replace(/\.[^.]+$/,''));
});

/* ==========================================================================
   CAMERA SEARCH MODAL
   ========================================================================== */
const cameraSearchBtn = document.getElementById('cameraSearchBtn');
const cameraContent = document.getElementById('cameraContent');
let cameraStream = null;

cameraSearchBtn.addEventListener('click', ()=>{ renderCameraPrompt(); openModal('cameraModalOverlay', cameraSearchBtn); });
document.getElementById('cameraModalClose').addEventListener('click', closeCameraModal);
document.getElementById('cameraModalOverlay').addEventListener('click', e=>{ if(e.target.id==='cameraModalOverlay') closeCameraModal(); });
function closeCameraModal(){ stopCamera(); closeModal('cameraModalOverlay'); }

function renderCameraPrompt(){
  cameraContent.innerHTML = '<p style="font-size:14px;color:var(--text-soft);margin:0 0 16px;">Allow camera access to capture a photo and search with it.</p>'+
    '<div class="modal-btn-row"><button class="btn btn-ghost" id="camUploadFallback" type="button">Upload image instead</button><button class="btn btn-primary" id="camRequestBtn" type="button">Enable camera</button></div>';
  document.getElementById('camRequestBtn').addEventListener('click', requestCamera);
  document.getElementById('camUploadFallback').addEventListener('click', ()=>{ closeCameraModal(); imageSearchBtn.click(); });
}
async function requestCamera(){
  if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
    cameraContent.innerHTML = '<div class="err-msg" style="margin-bottom:14px;">'+ICONS.warn+'<span>Camera access is unavailable. Try uploading an image instead.</span></div>'+
      '<div class="modal-btn-row"><button class="btn btn-primary" id="camUploadFallback2" type="button">Upload image instead</button></div>';
    document.getElementById('camUploadFallback2').addEventListener('click', ()=>{ closeCameraModal(); imageSearchBtn.click(); });
    return;
  }
  try{
    cameraStream = await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}});
    cameraContent.innerHTML = '<video id="cameraPreview" autoplay playsinline style="width:100%;border-radius:12px;background:#000;max-height:320px;object-fit:cover;"></video>'+
      '<canvas id="cameraCanvas" style="display:none;"></canvas>'+
      '<div class="modal-btn-row" style="margin-top:14px;"><button class="btn btn-ghost" id="camCancel" type="button">Cancel</button><button class="btn btn-primary" id="camCapture" type="button">Capture</button></div>';
    document.getElementById('cameraPreview').srcObject = cameraStream;
    document.getElementById('camCancel').addEventListener('click', closeCameraModal);
    document.getElementById('camCapture').addEventListener('click', capturePhoto);
  } catch(err){
    cameraContent.innerHTML = '<div class="err-msg" style="margin-bottom:14px;">'+ICONS.warn+'<span>Camera access is unavailable. Try uploading an image instead.</span></div>'+
      '<div class="modal-btn-row"><button class="btn btn-primary" id="camUploadFallback3" type="button">Upload image instead</button></div>';
    document.getElementById('camUploadFallback3').addEventListener('click', ()=>{ closeCameraModal(); imageSearchBtn.click(); });
  }
}
function capturePhoto(){
  const video = document.getElementById('cameraPreview');
  const canvas = document.getElementById('cameraCanvas');
  canvas.width = video.videoWidth; canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video,0,0);
  const dataUrl = canvas.toDataURL('image/png');
  stopCamera();
  cameraContent.innerHTML = '<img src="'+dataUrl+'" style="width:100%;border-radius:12px;max-height:320px;object-fit:cover;" alt="Captured photo">'+
    '<div class="modal-btn-row" style="margin-top:14px;"><button class="btn btn-ghost" id="camRetake" type="button">Retake</button><button class="btn btn-primary" id="camSearchThis" type="button">Search this photo</button></div>';
  document.getElementById('camRetake').addEventListener('click', requestCamera);
  document.getElementById('camSearchThis').addEventListener('click', ()=>{
    closeCameraModal(); setMode('images'); runSearch('photo capture');
  });
}
function stopCamera(){
  if(cameraStream){ cameraStream.getTracks().forEach(t=>t.stop()); cameraStream = null; }
}

/* ==========================================================================
   SEARXNG SETTINGS UI WIRING
   ========================================================================== */
const searxngUrlInput = document.getElementById('searxngUrlInput');
const toggleLiveSearxng = document.getElementById('toggleLiveSearxng');
const searxngStatusPill = document.getElementById('searxngStatusPill');
const searxngStatusText = document.getElementById('searxngStatusText');
const httpsWarnBanner = document.getElementById('httpsWarnBanner');
const dataSourceSub = document.getElementById('dataSourceSub');
const dataModeBadge = document.getElementById('dataModeBadge');
const dataModeBadgeText = document.getElementById('dataModeBadgeText');

searxngUrlInput.value = State.searxngUrl;
toggleLiveSearxng.checked = effectiveDataMode() === 'live';

function refreshDataModeUI(){
  const mode = effectiveDataMode();
  const isLive = mode === 'live';
  dataModeBadge.classList.toggle('live', isLive);
  dataModeBadgeText.textContent = isLive ? 'Live SearXNG' : 'Local Demo';
  dataSourceSub.textContent = isLive ? ('Using '+(State.searxngUrl || SEARXNG_DEFAULT_URL)) : 'Using Local Demo data';
  toggleLiveSearxng.checked = isLive;
  checkHttpsMismatch();
}
function checkHttpsMismatch(){
  const isPageHttps = location.protocol === 'https:';
  const urlIsHttp = State.searxngUrl && State.searxngUrl.startsWith('http://');
  httpsWarnBanner.hidden = !(isPageHttps && urlIsHttp && effectiveDataMode()==='live');
}

toggleLiveSearxng.addEventListener('change', e=>{
  if(e.target.checked){
    if(!State.searxngUrl){
      toast('Add a SearXNG instance URL first');
      e.target.checked = false;
      return;
    }
    State.dataMode = 'live';
  } else {
    State.dataMode = 'demo';
  }
  Store.set('rs_data_mode', State.dataMode);
  refreshDataModeUI();
});

function setStatusPill(state, text){
  searxngStatusPill.className = 'status-pill' + (state ? ' '+state : '');
  searxngStatusText.textContent = text;
}
const STATUS_LABELS = {
  untested:{cls:'', text:'Not tested'},
  testing:{cls:'testing', text:'Testing…'},
  ok:{cls:'ok', text:'SearXNG is reachable and returned valid JSON.'},
  'json-unavailable':{cls:'warn', text:'SearXNG responded, but JSON output is unavailable. Enable format=json in settings.yml.'},
  cors:{cls:'err', text:'The SearXNG instance may be blocking browser requests (CORS).'},
  network:{cls:'err', text:'RaiaSpace could not reach this SearXNG instance.'},
  invalid:{cls:'err', text:'Enter a valid HTTP or HTTPS SearXNG URL.'},
  timeout:{cls:'err', text:'The search request took too long.'}
};

document.getElementById('testSearxngBtn').addEventListener('click', async ()=>{
  setStatusPill('testing', 'Testing…');
  const result = await checkSearxngConnection(searxngUrlInput.value);
  const label = STATUS_LABELS[result.status] || STATUS_LABELS.network;
  setStatusPill(label.cls, result.message || label.text);
  State.searxngStatus = result.status;
});

document.getElementById('saveSearxngBtn').addEventListener('click', ()=>{
  const norm = normalizeSearxngUrl(searxngUrlInput.value);
  if(!norm.valid){
    setStatusPill('err', norm.error);
    return;
  }
  State.searxngUrl = norm.url;
  localStorage.setItem('raiaspace-searxng-url', norm.url);
  searxngUrlInput.value = norm.url;
  toast('SearXNG URL saved');
  refreshDataModeUI();
});

document.getElementById('resetSearxngBtn').addEventListener('click', ()=>{
  searxngUrlInput.value = SEARXNG_DEFAULT_URL;
  State.searxngUrl = '';
  localStorage.removeItem('raiaspace-searxng-url');
  setStatusPill('', 'Not tested');
  toast('Reset to default');
  refreshDataModeUI();
});

const setupAccordion = document.getElementById('setupAccordion');
const setupAccordionHead = document.getElementById('setupAccordionHead');
function toggleAccordion(){
  const open = setupAccordion.classList.toggle('open');
  setupAccordionHead.setAttribute('aria-expanded', open ? 'true':'false');
}
setupAccordionHead.addEventListener('click', toggleAccordion);
setupAccordionHead.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); toggleAccordion(); } });

/* Privacy dialog */
const privacyBtn = document.getElementById('openPrivacyDialogBtn');
privacyBtn.addEventListener('click', ()=> openModal('privacyOverlay', privacyBtn));
document.getElementById('privacyClose').addEventListener('click', ()=>closeModal('privacyOverlay'));
document.getElementById('privacyOverlay').addEventListener('click', e=>{ if(e.target.id==='privacyOverlay') closeModal('privacyOverlay'); });

refreshDataModeUI();

/* ==========================================================================
   INIT
   ========================================================================== */
autoResize(); updateSubmitState(); renderHistory();
document.getElementById('languageSelect').value = Store.get('rs_language','English');
document.getElementById('regionSelect').value = Store.get('rs_region','Automatic');
document.getElementById('languageSelect').addEventListener('change', e=> Store.set('rs_language', e.target.value));
document.getElementById('regionSelect').addEventListener('change', e=> Store.set('rs_region', e.target.value));

})();