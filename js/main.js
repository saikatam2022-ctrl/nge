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

/* ── CALCULATOR (original, untouched) ── */
const UTILS = [
  {name:'PECO Energy',              area:'Philadelphia & SE Pennsylvania', rate:0.128},
  {name:'PPL Electric Utilities',   area:'Central & Eastern Pennsylvania',  rate:0.124},
  {name:'West Penn Power',          area:'Western Pennsylvania',            rate:0.119},
  {name:'Penn Power (FirstEnergy)', area:'Northwest Pennsylvania',          rate:0.116},
  {name:'Duquesne Light',           area:'Pittsburgh Metro',                rate:0.131},
  {name:'UGI Utilities',            area:'East-Central Pennsylvania',       rate:0.121},
];
const RC = [
  'Small Commercial (< 25 kW demand)',
  'Medium Commercial (25–100 kW)',
  'Large Commercial (> 100 kW)',
  'Industrial / Manufacturing',
  'Nonprofit / Healthcare',
];
const SLBLS = ['Location','Utility','Usage','Savings'];
const DISC = 0.021;
let S = {step:0, zip:'', util:null, kwh:0, rc:''};

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
  const el=document.getElementById('cBody');
  el.innerHTML=[h0,h1,h2,h3][s]();
  bind();
  document.getElementById('cRestart').style.display=s>0?'block':'none';
}

function h0(){
  return `<div class="cp">
    <label class="f-lbl">Your business ZIP code</label>
    <input class="f-inp" id="cZip" type="text" maxlength="5" placeholder="e.g. 19103" value="${S.zip}">
    <div class="inote"><div class="inote-i">i</div>Used only to identify your local utility — never shared.</div>
    <div class="calc-nav">
      <button class="c-skip" id="cSkip">Skip — search by state instead</button>
      <button class="c-next" id="cN0">Continue <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M7 5l5 5-5 5" stroke="white" stroke-width="2" stroke-linecap="round" fill="none"/></svg></button>
    </div>
  </div>`;
}

function h1(){
  return `<div class="cp">
    <label class="f-lbl">Select your electricity utility</label>
    <div class="util-list">${UTILS.map((u,i)=>`<div class="ui-row ${S.util===i?'on':''}" data-u="${i}"><div><div class="ui-name">${u.name}</div><div class="ui-area">${u.area}</div></div><div class="ui-chk"></div></div>`).join('')}</div>
    <div class="calc-nav">
      <button class="c-back" id="cB1">Back</button>
      <button class="c-next" id="cN1">Continue <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M7 5l5 5-5 5" stroke="white" stroke-width="2" stroke-linecap="round" fill="none"/></svg></button>
    </div>
  </div>`;
}

function h2(){
  return `<div class="cp">
    <label class="f-lbl">Annual electricity usage (kWh)</label>
    <div class="f-chips" id="cChips">${[50000,100000,250000,500000].map(k=>`<div class="f-chip ${S.kwh===k?'on':''}" data-k="${k}">${k>=1000?(k/1000).toFixed(0)+'k':k} kWh</div>`).join('')}</div>
    <div class="or-sep">or enter manually</div>
    <input class="f-inp" id="cKwh" type="number" placeholder="Annual kWh (e.g. 125000)" value="${S.kwh||''}">
    <label class="f-lbl">Account / rate class</label>
    <select class="f-sel" id="cRC"><option value="">Select rate class…</option>${RC.map(r=>`<option value="${r}" ${S.rc===r?'selected':''}>${r}</option>`).join('')}</select>
    <div class="inote"><div class="inote-i">i</div>Don't know your kWh? We estimate it from your monthly bill during your free review.</div>
    <div class="calc-nav">
      <button class="c-back" id="cB2">Back</button>
      <button class="c-next" id="cCalc">Calculate <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M7 5l5 5-5 5" stroke="white" stroke-width="2" stroke-linecap="round" fill="none"/></svg></button>
    </div>
  </div>`;
}

function h3(){
  const u=UTILS[S.util??1];
  const cur=u.rate, fix=+(cur-DISC).toFixed(4);
  const kwh=S.kwh||100000;
  const ann=Math.round((cur-fix)*kwh);
  const pct=Math.round(((cur-fix)/cur)*100);
  const mon=Math.round(ann/12);
  const fy=Math.round(ann*5);
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
            <div class="rp-rate-row"><span>Current rate</span><span class="rp-cur">$${cur}/kWh</span></div>
            <div class="rp-rdiv"></div>
            <div class="rp-rate-row"><span>Fixed rate</span><span class="rp-fix">$${fix}/kWh</span></div>
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
          <div class="rp-tag">${Number(kwh).toLocaleString()} kWh/yr</div>
          <div class="rp-tag">${S.rc||'Standard Commercial'}</div>
        </div>
        <button class="rp-cta" onclick="var el=document.getElementById('nlSec');el?el.scrollIntoView({behavior:'smooth'}):window.location=(typeof BASE_PATH!=='undefined'?BASE_PATH:'')+'index.html#nlSec'">Book My Free Rate Review →</button>
      </div>
    </div>
    <div style="font-size:0.62rem;color:var(--text-soft);margin-top:8px;text-align:center">*Estimates based on current market data. Confirmed during your free review.</div>
  </div>`;
}

function bind(){
  const $=id=>document.getElementById(id);
  if(S.step===0){
    $('cN0')?.addEventListener('click',()=>{ S.zip=$('cZip')?.value||''; go(1); });
    $('cSkip')?.addEventListener('click',()=>go(1));
    $('cZip')?.addEventListener('keydown',e=>{ if(e.key==='Enter') go(1); });
  }
  if(S.step===1){
    document.querySelectorAll('.ui-row').forEach(el=>{
      el.addEventListener('click',()=>{
        S.util=parseInt(el.dataset.u);
        document.querySelectorAll('.ui-row').forEach(x=>x.classList.remove('on'));
        el.classList.add('on');
      });
    });
    $('cB1')?.addEventListener('click',()=>go(0));
    $('cN1')?.addEventListener('click',()=>go(2));
  }
  if(S.step===2){
    document.querySelectorAll('#cChips .f-chip').forEach(c=>{
      c.addEventListener('click',()=>{
        S.kwh=parseInt(c.dataset.k);
        if($('cKwh')) $('cKwh').value=S.kwh;
        document.querySelectorAll('#cChips .f-chip').forEach(x=>x.classList.remove('on'));
        c.classList.add('on');
      });
    });
    $('cKwh')?.addEventListener('input',e=>{ S.kwh=parseInt(e.target.value)||0; });
    $('cB2')?.addEventListener('click',()=>go(1));
    $('cCalc')?.addEventListener('click',()=>{
      S.kwh=parseInt($('cKwh')?.value)||S.kwh||100000;
      S.rc=$('cRC')?.value||'';
      go(3);
    });
  }
  if(S.step===3){
    setTimeout(()=>{
      const u=UTILS[S.util??1];
      const pct=Math.round((DISC/u.rate)*100);
      const f=document.getElementById('rpFill');
      if(f) f.style.width=pct+'%';
    },100);
  }
}

if(document.getElementById('cRestart')){
  document.getElementById('cRestart').addEventListener('click',()=>{
    S={step:0,zip:'',util:null,kwh:0,rc:''}; go(0);
  });
  go(0);
}
