/* ── Reveal ── */
const ro = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); }), {threshold:0.07});
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

/* ── FAQ ── */
function toggleFaq(item) {
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

/* ── Lead Form ── */
function submitLead() {
  const name  = document.getElementById('nlName').value.trim();
  const email = document.getElementById('nlEmail').value.trim();
  const state = document.getElementById('nlState').value;
  const sector= document.getElementById('nlSector').value;
  if (!name || !email || !state || !sector) {
    alert('Please fill in your name, email, state and business type to continue.');
    return;
  }
  document.getElementById('nlForm').style.display = 'none';
  document.getElementById('nlSuccess').style.display = 'block';
}

/* ═══════════════════════════════════════════════════════════════════════════
   CALCULATOR — UTILS
   ───────────────────────────────────────────────────────────────────────────
   • id       → matches TerritoryId in zip_data.js (ZIP_TERRITORY_MAP)
   • state    → drives the state-dropdown filter on Step 2
   • type     → 'electric' | 'gas' — drives the energy-type filter on Step 1
   • rate     → $/kWh (electric) or $/therm (gas) baseline (update as needed)

   Sources: USPS ZIP data (Excel), state PSC / SCC / PURA filings, EIA data
   ═══════════════════════════════════════════════════════════════════════════ */
const UTILS = [

  // ════════════════════════════════════════════════════════
  // CONNECTICUT  — 5 utilities (2 electric · 3 gas)
  // Source: CT PURA; Eversource, Avangrid/UIL filings
  // ════════════════════════════════════════════════════════
  {id:'CLP',    name:'Eversource Energy (Electric)',         area:'Statewide Connecticut — 149 cities & towns',          state:'Connecticut',   rate:0.235, type:'electric'},
  {id:'UI',     name:'United Illuminating (Avangrid)',       area:'Greater New Haven & Bridgeport area',                 state:'Connecticut',   rate:0.245, type:'electric'},
  {id:'CNG',    name:'Connecticut Natural Gas (Avangrid)',   area:'Greater Hartford, New Britain & Greenwich (gas)',     state:'Connecticut',   rate:0.132, type:'gas'},
  {id:'SCG',    name:'Southern Connecticut Gas (Avangrid)',  area:'Southwestern Connecticut shoreline (gas)',            state:'Connecticut',   rate:0.128, type:'gas'},
  {id:'YANKG',  name:'Eversource Energy (Gas — Yankee Gas)',area:'Northern & Eastern Connecticut (gas)',                 state:'Connecticut',   rate:0.130, type:'gas'},

  // ════════════════════════════════════════════════════════
  // DELAWARE  — 3 utilities (1 electric · 2 gas)
  // Source: Delaware PSC; Exelon / Chesapeake Utilities filings
  // ════════════════════════════════════════════════════════
  {id:'DPEDE',  name:'Delmarva Power Electric (Exelon)',     area:'Statewide Delaware (electric)',                       state:'Delaware',      rate:0.138, type:'electric'},
  {id:'DPEMDG', name:'Delmarva Power Gas (Exelon)',          area:'New Castle County Delaware (gas)',                    state:'Delaware',      rate:0.118, type:'gas'},
  {id:'CHPKDE', name:'Chesapeake Utilities (Gas)',           area:'Central & Southern Delaware (gas)',                   state:'Delaware',      rate:0.122, type:'gas'},

  // ════════════════════════════════════════════════════════
  // ILLINOIS  — 9 utilities (2 electric · 7 gas)
  // Source: Illinois Commerce Commission (ICC); regulated utility list
  // ════════════════════════════════════════════════════════
  {id:'COMED',       name:'ComEd (Commonwealth Edison)',          area:'Northern Illinois incl. Chicago metro (electric)',  state:'Illinois',      rate:0.125, type:'electric'},
  {id:'Ameren Illinois', name:'Ameren Illinois (Electric)',       area:'Central & Southern Illinois (electric)',            state:'Illinois',      rate:0.118, type:'electric'},
  {id:'NICORG',      name:'Nicor Gas (Southern Company)',         area:'Northern Illinois suburbs — 2.3 million customers', state:'Illinois',      rate:0.114, type:'gas'},
  {id:'PPLGAS',      name:'Peoples Gas (WEC Energy Group)',       area:'City of Chicago (gas)',                             state:'Illinois',      rate:0.116, type:'gas'},
  {id:'NSHORG',      name:'North Shore Gas (WEC Energy Group)',   area:'North Chicago suburbs (gas)',                       state:'Illinois',      rate:0.115, type:'gas'},
  {id:'AMRNIL',      name:'Ameren Illinois (Gas)',                area:'Central & Southern Illinois (gas)',                 state:'Illinois',      rate:0.112, type:'gas'},
  {id:'LIBUTIL',     name:'Liberty Utilities (Algonquin)',        area:'Far Southern Illinois (gas)',                       state:'Illinois',      rate:0.119, type:'gas'},
  {id:'MIDAMG',      name:'MidAmerican Energy (Gas)',             area:'Western Illinois border area (gas)',                state:'Illinois',      rate:0.113, type:'gas'},
  {id:'CONSPG',      name:'Consumers Gas Company',               area:'Small territory — Southern Illinois (gas)',         state:'Illinois',      rate:0.115, type:'gas'},

  // ════════════════════════════════════════════════════════
  // MARYLAND  — 8 utilities (4 electric · 4 gas)
  // Source: Maryland PSC; BGE, Pepco, FirstEnergy, Exelon filings
  // ════════════════════════════════════════════════════════
  {id:'BGEE',     name:'BGE Electric (Baltimore Gas & Electric)',   area:'Baltimore City & County, Anne Arundel, Carroll, Howard (electric)', state:'Maryland', rate:0.128, type:'electric'},
  {id:'PEPCOMDE', name:'Pepco Maryland Electric',                   area:'Montgomery & Prince George\'s Counties (electric)',                  state:'Maryland', rate:0.130, type:'electric'},
  {id:'DPEMD',    name:'Delmarva Power Maryland (Exelon)',          area:'Eastern Shore of Maryland (electric)',                              state:'Maryland', rate:0.122, type:'electric'},
  {id:'POTEDE',   name:'Potomac Edison (FirstEnergy)',              area:'Frederick, Washington, Allegany, Garrett Counties — western MD',    state:'Maryland', rate:0.119, type:'electric'},
  {id:'BGEG',     name:'BGE Gas (Baltimore Gas & Electric)',        area:'Baltimore City & County, Central Maryland (gas)',                   state:'Maryland', rate:0.118, type:'gas'},
  {id:'WGLMDG',   name:'Washington Gas Maryland',                  area:'Montgomery & Prince George\'s Counties (gas)',                      state:'Maryland', rate:0.116, type:'gas'},
  {id:'COLMDG',   name:'Columbia Gas of Maryland (NiSource)',       area:'Western & Central Maryland (gas)',                                  state:'Maryland', rate:0.115, type:'gas'},
  {id:'ALLGMD',   name:'Allegheny Energy / FirstEnergy Maryland',  area:'Western Maryland (gas)',                                            state:'Maryland', rate:0.114, type:'gas'},

  // ════════════════════════════════════════════════════════
  // MASSACHUSETTS  — 9 utilities (7 electric · 2 gas)
  // Source: MA DPU; Eversource, National Grid, Unitil filings
  // ════════════════════════════════════════════════════════
  {id:'BECO',    name:'Eversource Energy (Boston Electric)',          area:'Boston metro & North Shore',                  state:'Massachusetts', rate:0.230, type:'electric'},
  {id:'MECO',    name:'Eversource Energy (Eastern MA Electric)',      area:'Eastern Massachusetts',                       state:'Massachusetts', rate:0.228, type:'electric'},
  {id:'COME',    name:'Eversource Energy (Worcester / Central MA)',   area:'Worcester County & Central Massachusetts',    state:'Massachusetts', rate:0.225, type:'electric'},
  {id:'WMECO',   name:'Eversource Energy (Western MA Electric)',      area:'Berkshire, Franklin, Hampden, Hampshire Counties', state:'Massachusetts', rate:0.220, type:'electric'},
  {id:'CAMB',    name:'Eversource Energy (Cambridge Electric)',       area:'Cambridge & surrounding communities',         state:'Massachusetts', rate:0.232, type:'electric'},
  {id:'NATGME',  name:'National Grid Electric (MA)',                  area:'Central MA, Berkshires, North of Boston, Nantucket', state:'Massachusetts', rate:0.240, type:'electric'},
  {id:'UNITILE', name:'Unitil Electric',                              area:'Fitchburg area — 7 communities',              state:'Massachusetts', rate:0.235, type:'electric'},
  {id:'NATGMG',  name:'National Grid Gas (MA)',                       area:'Eastern & Central Massachusetts (gas)',        state:'Massachusetts', rate:0.128, type:'gas'},
  {id:'UNITILG', name:'Unitil Gas',                                   area:'Fitchburg area Massachusetts (gas)',           state:'Massachusetts', rate:0.130, type:'gas'},

  // ════════════════════════════════════════════════════════
  // MISSOURI  — 1 utility (gas)
  // ════════════════════════════════════════════════════════
  {id:'UIMO',    name:'Unitil Gas Territory (MO/KS/NE)',              area:'Missouri / Kansas / Nebraska (gas)',           state:'Missouri',      rate:0.115, type:'gas'},

  // ════════════════════════════════════════════════════════
  // NEW JERSEY  — 8 utilities (4 electric · 4 gas)
  // Source: NJ BPU; PSE&G, JCP&L, ACE, Elizabethtown, NJNG, SJG filings
  // ════════════════════════════════════════════════════════
  {id:'PSEGE',  name:'PSE&G Electric (PSEG)',                  area:'Northern & Central New Jersey (electric)',            state:'New Jersey',    rate:0.130, type:'electric'},
  {id:'JCPLE',  name:'JCP&L Electric (FirstEnergy)',           area:'Northern, Central & Western New Jersey (electric)',   state:'New Jersey',    rate:0.127, type:'electric'},
  {id:'ACE',    name:'Atlantic City Electric (Pepco Holdings)',area:'Southern New Jersey (electric)',                      state:'New Jersey',    rate:0.128, type:'electric'},
  {id:'RECO',   name:'Rockland Electric (Orange & Rockland)',  area:'Northern New Jersey — Bergen County (electric)',      state:'New Jersey',    rate:0.125, type:'electric'},
  {id:'PSEGG',  name:'PSE&G Gas (PSEG)',                       area:'Northern & Central New Jersey (gas)',                 state:'New Jersey',    rate:0.121, type:'gas'},
  {id:'NJNG',   name:'New Jersey Natural Gas',                 area:'Central New Jersey (gas)',                           state:'New Jersey',    rate:0.119, type:'gas'},
  {id:'SJG',    name:'South Jersey Gas',                       area:'Southern New Jersey (gas)',                          state:'New Jersey',    rate:0.118, type:'gas'},
  {id:'ETWNG',  name:'Elizabethtown Gas (Southern Company)',   area:'Central New Jersey (gas)',                           state:'New Jersey',    rate:0.119, type:'gas'},

  // ════════════════════════════════════════════════════════
  // NEW YORK  — 15 utilities (6 electric · 9 gas)
  // Source: NY PSC; Con Edison, National Grid, NYSEG, RG&E, Central Hudson filings
  // ════════════════════════════════════════════════════════
  {id:'CONEDE', name:'Con Edison Electric',                         area:'New York City & Westchester County (electric)',         state:'New York',      rate:0.220, type:'electric'},
  {id:'NIMOE',  name:'National Grid Electric (NIMO)',               area:'Upstate New York (electric)',                           state:'New York',      rate:0.195, type:'electric'},
  {id:'NYSEGE', name:'NYSEG Electric (Avangrid)',                   area:'Central & Western New York (electric)',                 state:'New York',      rate:0.188, type:'electric'},
  {id:'RGEE',   name:'RG&E Electric (Rochester Gas & Electric)',    area:'Rochester & Finger Lakes region (electric)',            state:'New York',      rate:0.185, type:'electric'},
  {id:'CHE',    name:'Central Hudson Electric',                     area:'Mid-Hudson Valley (electric)',                          state:'New York',      rate:0.195, type:'electric'},
  {id:'ORE',    name:'Orange & Rockland Electric',                  area:'Rockland & Orange Counties (electric)',                 state:'New York',      rate:0.192, type:'electric'},
  {id:'CONEDG', name:'Con Edison Gas',                              area:'New York City & Westchester County (gas)',              state:'New York',      rate:0.128, type:'gas'},
  {id:'NIMOG',  name:'National Grid Gas (NIMO)',                    area:'Upstate New York (gas)',                                state:'New York',      rate:0.122, type:'gas'},
  {id:'NYSEGG', name:'NYSEG Gas (Avangrid)',                        area:'Central & Western New York (gas)',                      state:'New York',      rate:0.119, type:'gas'},
  {id:'RGEG',   name:'RG&E Gas (Rochester Gas & Electric)',         area:'Rochester & Finger Lakes region (gas)',                 state:'New York',      rate:0.118, type:'gas'},
  {id:'CHG',    name:'Central Hudson Gas',                          area:'Mid-Hudson Valley (gas)',                               state:'New York',      rate:0.120, type:'gas'},
  {id:'ORG',    name:'Orange & Rockland Gas',                       area:'Rockland & Orange Counties (gas)',                      state:'New York',      rate:0.118, type:'gas'},
  {id:'KEDG',   name:'National Grid Gas (KeySpan NYC)',             area:'Brooklyn, Queens & Staten Island (gas)',                state:'New York',      rate:0.122, type:'gas'},
  {id:'KEDLIG', name:'National Grid Gas (KeySpan Long Island)',     area:'Long Island (gas)',                                     state:'New York',      rate:0.121, type:'gas'},
  {id:'NATFUEL',name:'National Fuel Gas',                           area:'Western New York — Buffalo / Erie County (gas)',        state:'New York',      rate:0.117, type:'gas'},

  // ════════════════════════════════════════════════════════
  // OHIO  — 11 utilities (7 electric · 4 gas)
  // Source: PUCO; AEP, FirstEnergy, Duke, AES, Columbia Gas filings
  // ════════════════════════════════════════════════════════
  {id:'AEP-CSP',  name:'AEP Ohio (Columbus Southern Power)',        area:'Central & Southern Ohio (electric)',                    state:'Ohio',          rate:0.122, type:'electric'},
  {id:'AEP-OHPC', name:'AEP Ohio (Ohio Power Company)',             area:'Southern & Eastern Ohio (electric)',                    state:'Ohio',          rate:0.120, type:'electric'},
  {id:'OHED',     name:'Ohio Edison (FirstEnergy)',                  area:'Northeastern Ohio (electric)',                          state:'Ohio',          rate:0.123, type:'electric'},
  {id:'CEIL',     name:'Cleveland Electric Illuminating (FirstEnergy)', area:'Cleveland Metro (electric)',                        state:'Ohio',          rate:0.124, type:'electric'},
  {id:'TOLED',    name:'Toledo Edison (FirstEnergy)',                area:'Northwestern Ohio / Toledo Metro (electric)',           state:'Ohio',          rate:0.118, type:'electric'},
  {id:'DUKEOH',   name:'Duke Energy Ohio Electric',                  area:'Southwestern Ohio — Cincinnati Metro (electric)',       state:'Ohio',          rate:0.126, type:'electric'},
  {id:'DPL',      name:'Dayton Power & Light (AES Ohio)',           area:'West-Central Ohio / Dayton Metro (electric)',           state:'Ohio',          rate:0.121, type:'electric'},
  {id:'COLOHG',   name:'Columbia Gas of Ohio (NiSource)',            area:'Statewide Ohio (gas)',                                  state:'Ohio',          rate:0.116, type:'gas'},
  {id:'DEOHG',    name:'Dominion Energy Ohio Gas',                   area:'Northeastern Ohio (gas)',                               state:'Ohio',          rate:0.117, type:'gas'},
  {id:'DUKEOHG',  name:'Duke Energy Ohio Gas',                       area:'Southwestern Ohio (gas)',                               state:'Ohio',          rate:0.115, type:'gas'},
  {id:'VEDO',     name:'Vectren Energy Delivery Ohio Gas',           area:'Western Ohio (gas)',                                    state:'Ohio',          rate:0.116, type:'gas'},

  // ════════════════════════════════════════════════════════
  // PENNSYLVANIA  — 14 utilities (6 electric · 8 gas)
  // Source: PA PUC; PECO, PPL, FirstEnergy, Duquesne, Columbia Gas, Peoples, UGI filings
  // ════════════════════════════════════════════════════════
  {id:'PECO',   name:'PECO Energy Electric (Exelon)',              area:'Philadelphia & Southeastern Pennsylvania (electric)',    state:'Pennsylvania',  rate:0.128, type:'electric'},
  {id:'PPLE',   name:'PPL Electric Utilities',                     area:'Central & Eastern Pennsylvania (electric)',              state:'Pennsylvania',  rate:0.124, type:'electric'},
  {id:'ALLEG',  name:'West Penn Power / Allegheny Power (FirstEnergy)', area:'Western Pennsylvania (electric)',                   state:'Pennsylvania',  rate:0.119, type:'electric'},
  {id:'METED',  name:'Met-Ed (FirstEnergy)',                       area:'Eastern Pennsylvania — Reading / Lehigh (electric)',     state:'Pennsylvania',  rate:0.116, type:'electric'},
  {id:'PNLC',   name:'Penn Power (FirstEnergy)',                   area:'Northwestern Pennsylvania (electric)',                   state:'Pennsylvania',  rate:0.116, type:'electric'},
  {id:'DUQE',   name:'Duquesne Light',                             area:'Pittsburgh Metro (electric)',                            state:'Pennsylvania',  rate:0.131, type:'electric'},
  {id:'PECOG',  name:'PECO Energy Gas (Exelon)',                   area:'Philadelphia & Southeastern Pennsylvania (gas)',         state:'Pennsylvania',  rate:0.119, type:'gas'},
  {id:'PGW',    name:'Philadelphia Gas Works',                     area:'City of Philadelphia (gas)',                             state:'Pennsylvania',  rate:0.124, type:'gas'},
  {id:'COLPAG', name:'Columbia Gas of Pennsylvania (NiSource)',    area:'Central & Western Pennsylvania (gas)',                   state:'Pennsylvania',  rate:0.118, type:'gas'},
  {id:'PNGPA',  name:'Peoples Natural Gas',                        area:'Western Pennsylvania (gas)',                             state:'Pennsylvania',  rate:0.117, type:'gas'},
  {id:'EQTG',   name:'Equitable Gas / Peoples Natural Gas',        area:'Southwestern Pennsylvania (gas)',                        state:'Pennsylvania',  rate:0.117, type:'gas'},
  {id:'UGICPG', name:'UGI Central Penn Gas',                       area:'Central Pennsylvania (gas)',                             state:'Pennsylvania',  rate:0.119, type:'gas'},
  {id:'UGIG',   name:'UGI Gas',                                    area:'East-Central Pennsylvania (gas)',                        state:'Pennsylvania',  rate:0.119, type:'gas'},
  {id:'UGIPNG', name:'UGI Penn Natural Gas',                       area:'Northeastern Pennsylvania (gas)',                        state:'Pennsylvania',  rate:0.119, type:'gas'},

  // ════════════════════════════════════════════════════════
  // VIRGINIA  — 5 utilities (2 electric · 3 gas)
  // Source: VA SCC; Dominion, AEP, Washington Gas, Columbia Gas, VNG filings
  // ════════════════════════════════════════════════════════
  {id:'DOMVA',  name:'Dominion Energy Virginia (Electric)',        area:'Central & Eastern Virginia — Richmond, Hampton Roads, Northern VA (electric)', state:'Virginia', rate:0.164, type:'electric'},
  {id:'APCOVA', name:'Appalachian Power / AEP Virginia (Electric)',area:'Western Virginia — Roanoke, Lynchburg, Blacksburg (electric)',                 state:'Virginia', rate:0.158, type:'electric'},
  {id:'WGLVAG', name:'Washington Gas Virginia',                   area:'Northern Virginia — DC suburbs (gas)',                   state:'Virginia',      rate:0.117, type:'gas'},
  {id:'COLVAG', name:'Columbia Gas of Virginia (NiSource)',        area:'Statewide Virginia (gas)',                               state:'Virginia',      rate:0.116, type:'gas'},
  {id:'VAPOVA', name:'Virginia Natural Gas (Southern Company)',    area:'Hampton Roads & Southeastern Virginia (gas)',            state:'Virginia',      rate:0.118, type:'gas'},

  // ════════════════════════════════════════════════════════
  // WASHINGTON DC  — 2 utilities (1 electric · 1 gas)
  // Source: DC PSC; Pepco, Washington Gas filings
  // ════════════════════════════════════════════════════════
  {id:'PEPCODCE', name:'Pepco DC Electric (Exelon)',              area:'Washington DC (electric)',                               state:'Washington DC', rate:0.135, type:'electric'},
  {id:'WGLDCG',   name:'Washington Gas DC',                       area:'Washington DC (gas)',                                   state:'Washington DC', rate:0.118, type:'gas'},
];

/* All states derived dynamically from UTILS — no hardcoded list */
const ALL_STATES = [...new Set(UTILS.map(u => u.state))].sort();

const RC = [
  'Small Commercial (< 25 kW demand)',
  'Medium Commercial (25–100 kW)',
  'Large Commercial (> 100 kW)',
  'Industrial / Manufacturing',
  'Nonprofit / Healthcare',
];

/* Helper: filter utilities for a state + optional type */
function utilitiesForStateAndType(state, type) {
  return UTILS.map((u,i) => ({...u, idx:i})).filter(u => u.state === state && (!type || u.type === type));
}

const SLBLS = ['Location','Energy Type','Utility','Usage','Savings'];
const DISC = 0.021;
let S = {step:0, zip:'', state:'', energyType:'', util:null, kwh:0, rc:''};

/* ── ZIP lookup ── */
function resolveByZip(zip) {
  if (typeof ZIP_TERRITORY_MAP === 'undefined') return {util:null, state:null};
  const entry = ZIP_TERRITORY_MAP[String(zip).trim().padStart(5,'0')];
  if (!entry) return {util:null, state:null};

  /* Support dual-entry format: {"e": electricId, "g": gasId} */
  let tid;
  if (typeof entry === 'object') {
    const want = S.energyType === 'gas' ? entry.g : entry.e;
    tid = want || entry.e || entry.g;
  } else {
    tid = entry;
  }

  if (!tid) return {util:null, state:null};
  const idx = UTILS.findIndex(u => u.id === tid);
  const state = idx >= 0 ? UTILS[idx].state
    : (typeof TERRITORY_STATE_MAP !== 'undefined' ? TERRITORY_STATE_MAP[tid] : null);
  return {util: idx >= 0 ? idx : null, state: state || null};
}

/* ── Trail ── */
function trail(){
  const t=document.getElementById('cTrail'); t.innerHTML='';
  SLBLS.forEach((l,i)=>{
    const c=i<S.step?'done':i===S.step?'act':'';
    const ic=i<S.step?'✓':i+1;
    t.innerHTML+=`<div class="ct-node ${c}"><div class="ct-num">${ic}</div>${l}</div>`;
    if(i<SLBLS.length-1) t.innerHTML+=`<div class="ct-line ${i<S.step?'done':''}"></div>`;
  });
}

function go(s){
  S.step=s; trail();
  document.getElementById('cBody').innerHTML=[h0,h1,h2,h3,h4][s]();
  bind();
  document.getElementById('cRestart').style.display=s>0?'block':'none';
}

/* ── Step 0: ZIP entry ── */
function h0(){
  return `<div class="cp">
    <label class="f-lbl">Your business ZIP code</label>
    <input class="f-inp" id="cZip" type="text" maxlength="5" placeholder="e.g. 19103" value="${S.zip}">
    <div class="inote"><div class="inote-i">i</div>Used only to identify your local utility — never shared.</div>
    <div class="calc-nav">
      <button class="c-skip" id="cSkip">Skip — select your state instead</button>
      <button class="c-next" id="cN0">Continue <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M7 5l5 5-5 5" stroke="white" stroke-width="2" stroke-linecap="round" fill="none"/></svg></button>
    </div>
  </div>`;
}

/* ── Step 1: Energy Type selection ── */
function h1(){
  return `<div class="cp">
    <label class="f-lbl">What type of energy do you want to save on?</label>
    <div class="f-chips" id="eTypeChips">
      <div class="f-chip${S.energyType==='electric'?' on':''}" data-type="electric">⚡ Electric</div>
      <div class="f-chip${S.energyType==='gas'?' on':''}" data-type="gas">🔥 Natural Gas</div>
    </div>
    <div class="calc-nav">
      <button class="c-back" id="cB1">Back</button>
      <button class="c-next" id="cN1">Continue <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M7 5l5 5-5 5" stroke="white" stroke-width="2" stroke-linecap="round" fill="none"/></svg></button>
    </div>
  </div>`;
}

/* ── Step 2: State dropdown + utility dropdown (filtered by energy type) ── */
function h2(){
  const stateOpts = ALL_STATES.map(s =>
    `<option value="${s}" ${S.state===s?'selected':''}>${s}</option>`
  ).join('');

  const utils = S.state ? utilitiesForStateAndType(S.state, S.energyType) : [];
  const utilOpts = utils.map(u =>
    `<option value="${u.idx}" ${S.util===u.idx?'selected':''}>${u.name}${u.area?' — '+u.area:''}</option>`
  ).join('');

  const utilSection = S.state ? `
    <div id="cUtilWrap" style="${utils.length?'':'display:none'}">
      <label class="f-lbl" style="margin-top:14px">Select your utility</label>
      <select class="f-sel" id="cUtilSel">
        <option value="">Select your utility…</option>
        ${utilOpts}
      </select>
    </div>
    <div id="cUtilNote" class="inote" style="margin-top:8px;${utils.length?'display:none':''}">
      <div class="inote-i">i</div>Your advisor will confirm your utility during the free review.
    </div>` : `
    <div id="cUtilWrap" style="display:none">
      <label class="f-lbl" style="margin-top:14px">Select your utility</label>
      <select class="f-sel" id="cUtilSel"><option value="">Select your utility…</option></select>
    </div>
    <div id="cUtilNote" class="inote" style="margin-top:8px;display:none"><div class="inote-i">i</div>Your advisor will confirm your utility during the free review.</div>`;

  return `<div class="cp">
    <div class="inote"><div class="inote-i">i</div>Showing ${S.energyType==='gas'?'natural gas':'electric'} utilities only.</div>
    <label class="f-lbl" style="margin-top:12px">Select your state</label>
    <select class="f-sel" id="cState">
      <option value="">Choose a state…</option>
      ${stateOpts}
    </select>
    ${utilSection}
    <div class="calc-nav">
      <button class="c-back" id="cB2">Back</button>
      <button class="c-next" id="cN2">Continue <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M7 5l5 5-5 5" stroke="white" stroke-width="2" stroke-linecap="round" fill="none"/></svg></button>
    </div>
  </div>`;
}

/* ── Step 3: Usage ── */
function h3(){
  const isGas = S.energyType === 'gas';
  const unit  = isGas ? 'therms' : 'kWh';
  return `<div class="cp">
    <label class="f-lbl">Annual ${isGas?'gas usage (therms)':'electricity usage (kWh)'}</label>
    <div class="f-chips" id="cChips">${[50000,100000,250000,500000].map(k=>`<div class="f-chip ${S.kwh===k?'on':''}" data-k="${k}">${k>=1000?(k/1000).toFixed(0)+'k':k} ${unit}</div>`).join('')}</div>
    <div class="or-sep">or enter manually</div>
    <input class="f-inp" id="cKwh" type="number" placeholder="Annual ${unit} (e.g. 125000)" value="${S.kwh||''}">
    <label class="f-lbl">Account / rate class</label>
    <select class="f-sel" id="cRC"><option value="">Select rate class…</option>${RC.map(r=>`<option value="${r}" ${S.rc===r?'selected':''}>${r}</option>`).join('')}</select>
    <div class="inote"><div class="inote-i">i</div>Don't know your usage? We estimate it from your monthly bill during your free review.</div>
    <div class="calc-nav">
      <button class="c-back" id="cB3">Back</button>
      <button class="c-next" id="cCalc">Calculate <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M7 5l5 5-5 5" stroke="white" stroke-width="2" stroke-linecap="round" fill="none"/></svg></button>
    </div>
  </div>`;
}

/* ── Step 4: Results — original savings logic untouched ── */
function h4(){
  const u=UTILS[S.util??0];
  const cur=u.rate, fix=+(cur-DISC).toFixed(4);
  const kwh=S.kwh||100000;
  const ann=Math.round((cur-fix)*kwh);
  const pct=Math.round(((cur-fix)/cur)*100);
  const mon=Math.round(ann/12);
  const fy=Math.round(ann*5);
  const unit = S.energyType==='gas' ? 'therm' : 'kWh';
  return `<div class="cp">
    <div class="rp">
      <div class="rp-z">
        <div class="rp-top">
          <div>
            <div class="rp-lbl">Estimated annual savings</div>
            <div class="rp-big">$${ann.toLocaleString()}</div>
            <div class="rp-sub">${u.name}</div>
          </div>
          <div class="rp-rates">
            <div class="rp-rate-row"><span>Current rate</span><span class="rp-cur">$${cur}/${unit}</span></div>
            <div class="rp-rdiv"></div>
            <div class="rp-rate-row"><span>Fixed rate</span><span class="rp-fix">$${fix}/${unit}</span></div>
          </div>
        </div>
        <div class="rp-meter">
          <div class="rp-mhead"><span>Savings rate</span><span>${pct}%</span></div>
          <div class="rp-track"><div class="rp-fill" id="rpFill" style="width:0%"></div></div>
        </div>
        <div class="rp-grid">
          <div class="rp-stat"><div class="rp-sn">$${mon.toLocaleString()}</div><div class="rp-sl">Per month</div></div>
          <div class="rp-stat"><div class="rp-sn">$${fy.toLocaleString()}</div><div class="rp-sl">5-year total</div></div>
        </div>
        <div class="rp-tags">
          <div class="rp-tag">${u.name}</div>
          <div class="rp-tag">${Number(kwh).toLocaleString()} ${unit}/yr</div>
          <div class="rp-tag">${S.rc||'Standard Commercial'}</div>
        </div>
        <button class="rp-cta" onclick="var el=document.getElementById('nlSec');el?el.scrollIntoView({behavior:'smooth'}):window.location=(typeof BASE_PATH!=='undefined'?BASE_PATH:'')+'index.html#nlSec'">Book My Free Rate Review →</button>
      </div>
    </div>
    <div style="font-size:0.62rem;color:var(--text-soft);margin-top:8px;text-align:center">*Estimates based on current market data. Confirmed during your free review.</div>
  </div>`;
}

/* ── Bind ── */
function bind(){
  /* Step 0 */
  if(S.step===0){
    document.getElementById('cN0')?.addEventListener('click',()=>{
      S.zip=(document.getElementById('cZip')?.value||'').trim();
      if(S.zip.length===5){
        const {util, state}=resolveByZip(S.zip);
        if(state) S.state=state;
        if(util!==null) S._resolvedUtil=util; // hold until energy type is chosen
      }
      go(1); // always go to energy type step next
    });
    document.getElementById('cSkip')?.addEventListener('click',()=>{ S.zip=''; go(1); });
    document.getElementById('cZip')?.addEventListener('keydown',e=>{ if(e.key==='Enter') document.getElementById('cN0')?.click(); });
  }

  /* Step 1 — Energy Type */
  if(S.step===1){
    document.querySelectorAll('#eTypeChips .f-chip').forEach(chip=>{
      chip.addEventListener('click',()=>{
        S.energyType=chip.dataset.type;
        S.util=null;
        document.querySelectorAll('#eTypeChips .f-chip').forEach(x=>x.classList.remove('on'));
        chip.classList.add('on');
      });
    });
    document.getElementById('cB1')?.addEventListener('click',()=>go(0));
    document.getElementById('cN1')?.addEventListener('click',()=>{
      if(!S.energyType){ alert('Please select Electric or Natural Gas to continue.'); return; }
      go(2);
    });
  }

  /* Step 2 — State + Utility */
  if(S.step===2){
    const stateEl=document.getElementById('cState');
    const utilSel=document.getElementById('cUtilSel');

    const populateUtilDropdown=(state)=>{
      if(!utilSel) return;
      const utils=utilitiesForStateAndType(state, S.energyType);
      utilSel.innerHTML='<option value="">Select your utility…</option>';
      utils.forEach(u=>{
        const opt=document.createElement('option');
        opt.value=u.idx;
        opt.textContent=u.name+(u.area?' — '+u.area:'');
        if(S.util===u.idx) opt.selected=true;
        utilSel.appendChild(opt);
      });
      const wrap=document.getElementById('cUtilWrap');
      const note=document.getElementById('cUtilNote');
      if(wrap) wrap.style.display=utils.length?'block':'none';
      if(note) note.style.display=utils.length?'none':'block';
    };

    /* If ZIP pre-filled state, populate immediately */
    if(S.state) populateUtilDropdown(S.state);

    stateEl?.addEventListener('change',()=>{ S.state=stateEl.value; S.util=null; populateUtilDropdown(S.state); });
    utilSel?.addEventListener('change',()=>{ S.util=utilSel.value!==''?parseInt(utilSel.value):null; });

    /* Apply ZIP-resolved util if it matches the chosen energy type */
    if(S._resolvedUtil!==undefined && S.state){
      const resolvedU=UTILS[S._resolvedUtil];
      if(resolvedU && resolvedU.type===S.energyType){
        S.util=S._resolvedUtil;
        if(utilSel) [...utilSel.options].forEach(o=>{ if(parseInt(o.value)===S.util) o.selected=true; });
      }
      delete S._resolvedUtil;
    }

    document.getElementById('cB2')?.addEventListener('click',()=>go(1));
    document.getElementById('cN2')?.addEventListener('click',()=>{
      if(!S.state){ alert('Please select your state to continue.'); return; }
      const utils=utilitiesForStateAndType(S.state, S.energyType);
      if(utils.length>0&&S.util===null){ alert('Please select your utility to continue.'); return; }
      if(S.util===null) S.util=0;
      go(3);
    });
  }

  /* Step 3 — Usage */
  if(S.step===3){
    document.querySelectorAll('#cChips .f-chip').forEach(c=>{
      c.addEventListener('click',()=>{
        S.kwh=parseInt(c.dataset.k);
        const kEl=document.getElementById('cKwh');
        if(kEl) kEl.value=S.kwh;
        document.querySelectorAll('#cChips .f-chip').forEach(x=>x.classList.remove('on'));
        c.classList.add('on');
      });
    });
    document.getElementById('cKwh')?.addEventListener('input',e=>{ S.kwh=parseInt(e.target.value)||0; });
    document.getElementById('cB3')?.addEventListener('click',()=>go(2));
    document.getElementById('cCalc')?.addEventListener('click',()=>{
      S.kwh=parseInt(document.getElementById('cKwh')?.value)||S.kwh||100000;
      S.rc=document.getElementById('cRC')?.value||'';
      go(4);
    });
  }

  /* Step 4 — Results */
  if(S.step===4){
    setTimeout(()=>{
      const u=UTILS[S.util??0];
      const pct=Math.round((DISC/u.rate)*100);
      const f=document.getElementById('rpFill');
      if(f) f.style.width=pct+'%';
    },100);
  }
}

if(document.getElementById('cRestart')){
  document.getElementById('cRestart').addEventListener('click',()=>{
    S={step:0,zip:'',state:'',energyType:'',util:null,kwh:0,rc:''}; go(0);
  });
  go(0);
}