/* 슬라이드 엔진: 이동·효과·실습 편집기·팝업·저장 */
(function(){
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const KEY='seoulcg-ai-course-v2-tomato';
let S={p:{},n:{}};
try{S=Object.assign(S,JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
window.COURSE_STATE=S;
const CO=window.COURSE, MOD=document.body.dataset.module||'';
const TAGS={demo:['t-demo','강사 시연'],follow:['t-follow','따라 하기'],check:['t-check','직접 확인'],pair:['t-pair','짝 활동'],brk:['t-break','휴식'],wrap:['t-wrap','Wrap-up'],fun:['t-fun','☕ 쉬어가기 코너']};

const stage=$('.stage'), slides=$$('.slide',stage);
let cur=0, modalOpen=false, charts={};

/* ---------- 스케일 ---------- */
function fit(){const s=Math.min((innerWidth-32)/1600,(innerHeight-70)/900);stage.style.transform=`translate(-50%,-50%) translateY(-18px) scale(${s})`;stage.dataset.s=s}
addEventListener('resize',fit);

/* ---------- 상단 헤더 자동 구성 ---------- */
slides.forEach((sl,i)=>{
  const top=document.createElement('div');top.className='s-top';
  const tags=(sl.dataset.tags||'').split(',').filter(Boolean).map(t=>`<span class="tag ${TAGS[t][0]}">${TAGS[t][1]}</span>`).join('');
  top.innerHTML=`<span class="s-no">${sl.dataset.no}</span><span class="s-mod">${sl.dataset.mod||document.body.dataset.modtitle||''}</span>${tags}${sl.dataset.result?`<span class="s-result">이번에 만들 결과 · <b>${sl.dataset.result}</b></span>`:''}`;
  sl.prepend(top);
  const ft=document.createElement('div');ft.className='s-foot';ft.innerHTML='<img src="assets/logo-dtl.png" alt="Data Thinking Lab"><span>© 2026 Data Thinking Lab. All rights reserved. 무단 복제·배포를 금합니다.</span>';sl.appendChild(ft);
  $$('.kinetic',sl).forEach(k=>{k.innerHTML=k.textContent.trim().split(/\s+/).map((w,j)=>`<span class="w" style="animation-delay:${.12+j*.09}s">${w}</span>`).join(' ')});
  $$('.pop',sl).forEach((p,j)=>{if(!p.style.animationDelay)p.style.animationDelay=(.15+j*.12)+'s'});
  if(sl.dataset.practice) buildPractice(sl,sl.dataset.practice);
});

/* ---------- 실습 편집기 ---------- */
function esc(t){return t.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'})[c])}
function pState(key){const c=CO.PRACTICE[key];if(!S.p[key])S.p[key]={f:{},e:null};c.fields.forEach(f=>{if(S.p[key].f[f[0]]==null)S.p[key].f[f[0]]=f[2]});return S.p[key]}
/* 조사 자동 맞춤: 끼워 넣은 값의 마지막 글자 받침에 따라 이/가·을/를·은/는·과/와·으로/로 선택 */
function batchim(v){v=String(v==null?'':v).trim();let pv;do{pv=v;v=v.replace(/\s*\([^()]*\)$/,'').replace(/[\s\]}'"”’.…·,]+$/,'')}while(v!==pv);if(!v)return null;const ch=v[v.length-1],o=ch.charCodeAt(0)-0xAC00;
  if(o>=0&&o<11172){const j=o%28;return {has:j>0,l:j===8}}
  if(/[0-9]/.test(ch))return {has:'0136780'.includes(ch),l:'178'.includes(ch)};
  const lw=v.toLowerCase();if(/kg$|g$/.test(lw))return {has:true,l:false};if(/t$|m$|n$/.test(lw))return {has:true,l:false};if(/l$/.test(lw))return {has:true,l:true};
  if(/[a-z%]$/.test(lw))return {has:false,l:false};return null}
function josa(v,p){if(!p)return '';const r=batchim(v);if(!r)return p;for(const [a,b] of [['이','가'],['을','를'],['은','는'],['과','와'],['으로','로']]){if(p===a||p===b){if(a==='으로')return r.has&&!r.l?a:b;return r.has?a:b}}return p}
function fillT(t,val,fmt){return t.replace(/\{(\w+)\}((?:으로|이|가|을|를|은|는|과|와|로)(?![가-힣]))?/g,(m,k,p)=>{const v=val(k);if(v==null)return m;return (fmt?fmt(k,v):v)+josa(v,p)})}
window.josa=josa;
function promptText(key,generic){const c=CO.PRACTICE[key],st=pState(key);if(!generic&&st.e!=null)return st.e;return fillT(CO.T[c.p],k=>generic?CO.GENERIC[k]:st.f[k])}
window.promptText=promptText;
function buildPractice(sl,key){
  const c=CO.PRACTICE[key];if(!c)return;const st=pState(key);
  const wrap=document.createElement('div');wrap.className='pw';
  wrap.innerHTML=`
  <div class="pw-left">
    <h5>이번에 바꿀 항목 · 예시값</h5>
    ${c.fields.map(f=>`<div class="fld"><label style="color:${CO.C[f[3]]}"><i style="background:${CO.C[f[3]]}"></i>${f[1]}</label><input data-k="${f[0]}" value="${esc(String(st.f[f[0]]))}" style="border-color:${CO.C[f[3]]}55"></div>`).join('')}
    <h5 style="margin-top:4px">첨부 파일</h5>
    <div class="attach"><svg width="20" height="20" viewBox="0 0 24 24"><path d="M15 7l-7 7c-1.5 1.5.5 3.5 2 2l8-8c2.5-2.5-1.5-6.5-4-4l-8 8c-3.5 3.5 2 9 5.5 5.5l6-6" fill="none" stroke="#1F5A36" stroke-width="2" stroke-linecap="round"/></svg>${c.file}</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:auto"><button class="btn orange sm" data-pop="${c.pop}">⬇ ${c.popLabel}</button>${c.pop2?`<button class="btn ghost sm" data-pop="${c.pop2}">${c.pop2Label}</button>`:''}</div>
  </div>
  <div class="pw-right">
    <h5>내가 보낼 질문 미리보기 · ${c.p}<span class="edit-state"></span></h5>
    <div class="preview" spellcheck="false"></div>
    <div class="pw-actions">
      <button class="btn ghost sm" data-act="edit">✎ 질문 직접 수정</button>
      <button class="btn sm" data-act="copy">⧉ 수정한 질문 복사</button>
      <button class="btn ghost sm hidden" data-act="rebuild">↻ 입력값으로 다시 만들기</button>
      <button class="btn ghost sm" data-act="reset" style="margin-left:auto">예시 질문으로 되돌리기</button>
    </div>
  </div>
  <div class="pw-bottom">
    <div class="bx"><h6>▶ AI 채팅에서 실행</h6><div class="run-steps"><span><b>1</b>파일 첨부</span>→<span><b>2</b>질문 붙여넣기</span>→<span><b>3</b>실행</span></div></div>
    <div class="bx"><h6>✓ 원본에서 확인할 것</h6><ol>${c.checks.map(x=>`<li>${x}</li>`).join('')}</ol></div>
    <div class="bx"><h6>↺ 다시 요청하는 질문</h6><div class="fu"><span>“${c.fu}”</span><button class="btn sm ghost" data-copy="${c.fu}">복사</button></div><div style="margin-top:8px;text-align:right"><button class="btn sm orange" data-ex="${c.ex}">예시 결과 보기</button></div></div>
  </div>`;
  sl.appendChild(wrap);
  const pv=$('.preview',wrap),state=$('.edit-state',wrap),rb=$('[data-act=rebuild]',wrap),eb=$('[data-act=edit]',wrap);
  function render(){
    if(st.e!=null){pv.textContent=st.e;state.textContent='직접 수정한 질문';rb.classList.remove('hidden')}
    else{pv.innerHTML=fillT(esc(CO.T[c.p]),k=>st.f[k]==null?null:String(st.f[k]),(k,v)=>{const f=c.fields.find(x=>x[0]===k);const col=f?CO.C[f[3]]:'#333';return `<span class="tk" style="color:${col};background:${col}1a">${esc(v)}</span>`});state.textContent='';rb.classList.add('hidden')}
  }
  render();
  $$('input',wrap).forEach(inp=>inp.addEventListener('input',()=>{st.f[inp.dataset.k]=inp.value;save();if(st.e==null)render();else{state.textContent='직접 수정 중 · 입력값을 반영하려면 [입력값으로 다시 만들기]';}}));
  eb.addEventListener('click',()=>{const on=pv.getAttribute('contenteditable')==='true';if(on){pv.setAttribute('contenteditable','false');eb.textContent='✎ 질문 직접 수정'}else{if(st.e==null){st.e=pv.innerText;save();render()}pv.setAttribute('contenteditable','true');pv.focus();eb.textContent='✓ 수정 마치기'}});
  pv.addEventListener('input',()=>{st.e=pv.innerText;save();state.textContent='직접 수정한 질문'});
  rb.addEventListener('click',()=>{st.e=null;save();pv.setAttribute('contenteditable','false');eb.textContent='✎ 질문 직접 수정';render()});
  $('[data-act=reset]',wrap).addEventListener('click',()=>{c.fields.forEach(f=>{st.f[f[0]]=f[2]});st.e=null;save();$$('input',wrap).forEach(i=>i.value=st.f[i.dataset.k]);pv.setAttribute('contenteditable','false');eb.textContent='✎ 질문 직접 수정';render();toast('이 실습의 질문을 예시로 되돌렸습니다')});
  $('[data-act=copy]',wrap).addEventListener('click',e=>copyText(pv.innerText,e.currentTarget,pv));
}

/* ---------- 복사 ---------- */
function copyText(t,btn,selEl){
  const ok=()=>{toast('복사 완료 · AI 채팅에 붙여넣으세요');if(btn){btn.classList.add('copied');setTimeout(()=>btn.classList.remove('copied'),1400)}};
  const fail=()=>{if(selEl){const r=document.createRange();r.selectNodeContents(selEl);const s=getSelection();s.removeAllRanges();s.addRange(r)}toast('복사가 막혀 있습니다 · 선택된 문장을 Ctrl+C로 복사하세요')};
  if(navigator.clipboard&&isSecureContext)navigator.clipboard.writeText(t).then(ok,()=>{legacy()?ok():fail()});else legacy()?ok():fail();
  function legacy(){try{const ta=document.createElement('textarea');ta.value=t;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();const r=document.execCommand('copy');ta.remove();return r}catch(e){return false}}
}
window.copyText=copyText;
let tt;function toast(m){let el=$('.toast');if(!el){el=document.createElement('div');el.className='toast';document.body.appendChild(el)}el.textContent=m;el.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>el.classList.remove('on'),2200)}
window.toast=toast;

/* ---------- 메모 입력 저장 ---------- */
$$('[data-note]').forEach(t=>{const k=t.dataset.note;if(S.n[k])t.value=S.n[k];t.addEventListener('input',()=>{S.n[k]=t.value;save();$$(`[data-note="${k}"]`).forEach(o=>{if(o!==t)o.value=t.value});$$(`[data-show="${k}"]`).forEach(o=>o.textContent=t.value||o.dataset.empty)})});
$$('[data-show]').forEach(o=>{o.textContent=S.n[o.dataset.show]||o.dataset.empty||''});

/* ---------- 팝업 ---------- */
const back=document.createElement('div');back.className='modal-back';document.body.appendChild(back);
function openPop(id){const d=CO.POPUPS[id];if(!d)return;const badge={v:['v','실제 자료 기반 교육용 데이터'],x:['v','교육용 가상 자료'],o:['o','공식 사이트'],d:['d','강사 시연']}[d.b];
  back.innerHTML=`<div class="modal" role="dialog"><div class="modal-hd"><span class="badge ${badge[0]}">${badge[1]}</span><h3>${id} · ${d.t}</h3><button class="x" aria-label="닫기">×</button></div><div class="modal-bd">${d.tabs?`<div class="tabs">${d.tabs.map((t,i)=>`<button class="${i?'':'on'}" data-tab="${i}">${t[0]}</button>`).join('')}</div><div class="tab-body">${d.tabs[0][1]()}</div>`:d.h()}</div></div>`;
  back.classList.add('open');modalOpen=true;window.mountIll&&mountIll(back);
  $$('[data-tab]',back).forEach(b=>b.addEventListener('click',()=>{$$('[data-tab]',back).forEach(x=>x.classList.remove('on'));b.classList.add('on');$('.tab-body',back).innerHTML=d.tabs[+b.dataset.tab][1]();mountIll&&mountIll(back)}));
  $('.x',back).addEventListener('click',closePop);}
function closePop(){back.classList.remove('open');back.innerHTML='';modalOpen=false}
back.addEventListener('click',e=>{if(e.target===back)closePop()});
window.openPop=openPop;

/* ---------- 예시 결과 ---------- */
const escH=t=>String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const prBox=E=>`<div class="card soft" style="margin-top:4px"><h4 style="margin-bottom:6px">이 예시처럼 받으려면 · 참고 프롬프트</h4><p style="font-size:14px;color:var(--muted)">실습 질문은 짧게 묻는 연습용이라 결과 모양이 매번 다릅니다. 예시와 같은 표·그래프를 받으려면 계산 방법과 결과 모양까지 정해 줍니다.</p><div class="cond" style="align-items:flex-start"><span style="white-space:pre-wrap;font-size:13px;font-weight:500;line-height:1.55">${escH(E.pr)}</span><button class="btn sm orange" data-copy="${escH(E.pr)}">프롬프트 복사</button></div>${E.prn?`<p style="font-size:13.5px;color:var(--muted)">${E.prn}</p>`:''}</div>`;
function openEx(id,sl){const E=window.EXAMPLES[id];if(!E)return;let ex=$('.example',sl);if(!ex){ex=document.createElement('div');ex.className='example';sl.appendChild(ex)}
  ex.innerHTML=`<div style="display:flex;align-items:center;gap:12px"><span class="pill">예시 결과</span><h3>${E.t}</h3><button class="btn ghost sm" style="margin-left:auto" data-close>← 닫고 실습으로 돌아가기</button></div><div style="flex:1;display:flex;gap:22px;min-height:0">${E.chart?`<div class="chart-box" style="flex:1.3"><canvas></canvas></div>`:''}<div style="flex:1;display:flex;flex-direction:column;gap:10px;overflow:auto">${E.side||''}${E.pr?prBox(E):''}</div></div><p class="src">실제 경매 자료에 근거한 교육용 데이터(일부 수치 변경)로 만든 예시입니다. 내 결과의 숫자는 반드시 원본 파일에서 다시 확인하세요.</p>`;
  ex.classList.add('open');mountIll&&mountIll(ex);
  if(E.chart){const cv=$('canvas',ex);charts['ex'+sl.dataset.no]&&charts['ex'+sl.dataset.no].destroy();charts['ex'+sl.dataset.no]=CH[E.chart](cv)}
  $('[data-close]',ex).addEventListener('click',()=>ex.classList.remove('open'));}

/* ---------- 클릭 위임 ---------- */
document.addEventListener('click',e=>{
  const p=e.target.closest('[data-pop]');if(p){openPop(p.dataset.pop);return}
  const c=e.target.closest('[data-copy]');if(c){copyText(c.dataset.copy,c);return}
  const x=e.target.closest('[data-ex]');if(x){openEx(x.dataset.ex,x.closest('.slide'));return}
  const r=e.target.closest('[data-reveal]');if(r){const sl=r.closest('.slide'),t=$(r.dataset.reveal,sl);if(!t)return;const f=r.dataset.focus;if(!r.dataset.orig)r.dataset.orig=r.innerHTML;
    if(t.classList.contains('hidden')){t.classList.remove('hidden');r.innerHTML='↺ 다시 숨기기';r.classList.add('ghost');if(f&&charts[f]&&charts[f].$focus)charts[f].$focus()}
    else{t.classList.add('hidden');r.innerHTML=r.dataset.orig;if(f){const cv=$(`canvas[data-chart="${f}"]`,sl);if(cv&&CH[f]){charts[f]&&charts[f].destroy();charts[f]=CH[f](cv)}}}return}
});

/* ---------- 이동 ---------- */
function enter(sl){
  $$('.mark',sl).forEach(m=>m.classList.remove('on'));setTimeout(()=>$$('.mark',sl).forEach(m=>m.classList.add('on')),60);
  $$('[data-count]',sl).forEach(el=>{const to=+el.dataset.count,dec=+(el.dataset.dec||0),t0=performance.now(),d=1300;const f=t=>{const k=Math.min(1,(t-t0)/d),v=to*(1-Math.pow(1-k,3));el.textContent=v.toLocaleString('ko-KR',{minimumFractionDigits:dec,maximumFractionDigits:dec});if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)});
  $$('canvas[data-chart]',sl).forEach(cv=>{const id=cv.dataset.chart;if(charts[id])charts[id].destroy();if(window.CH&&CH[id])charts[id]=CH[id](cv)});
  $$('.waffle',sl).forEach(w=>{const cells=$$('i',w);cells.forEach(c=>c.classList.remove('on'));cells.forEach((c,i)=>setTimeout(()=>c.classList.add('on'),200+i*14))});
  $$('.ring .fg',sl).forEach(r=>{const C=2*Math.PI*r.r.baseVal.value;r.style.strokeDasharray=C;r.style.strokeDashoffset=C;setTimeout(()=>r.style.strokeDashoffset=C*(1-(+r.dataset.v)/100),120)});
  $$('.step-item',sl).forEach(s=>s.classList.remove('shown'));
  $$('.ba',sl).forEach(b=>setBA(b,50));
  $$('.kinetic .w,.pop',sl).forEach(w=>{w.style.animation='none';w.offsetHeight;w.style.animation=''});
  sl.dispatchEvent(new CustomEvent('enter'));
}
function go(i,force){i=Math.max(0,Math.min(slides.length-1,i));if(i===cur&&!force)return;
  slides.forEach((s,j)=>{s.classList.toggle('active',j===i);s.classList.toggle('prev',j<i)});cur=i;enter(slides[i]);
  $('.cnt').textContent=`${slides[i].dataset.no} · ${i+1}/${slides.length}`;$('.progress').style.width=((i+1)/slides.length*100)+'%';
  history.replaceState(null,'','#'+slides[i].dataset.no);$$('.ov-card').forEach((c,j)=>c.classList.toggle('cur',j===i))}
function next(){const hid=$$('.step-item:not(.shown)',slides[cur]);if(hid.length){hid[0].classList.add('shown');return}if(cur<slides.length-1)go(cur+1);else if(document.body.dataset.next)location.href=document.body.dataset.next}
function prev(){const sl=slides[cur],ex=$('.example.open',sl);if(ex){ex.classList.remove('open');return}
  const sh=$$('.step-item.shown',sl);if(sh.length){sh[sh.length-1].classList.remove('shown');return}
  if(cur>0)go(cur-1);else if(document.body.dataset.prev)location.href=document.body.dataset.prev+'#last'}
window.deckGo=go;

/* ---------- 컨트롤/개요 ---------- */
const bar=document.createElement('div');bar.className='progress';document.body.appendChild(bar);
const ctrl=document.createElement('div');ctrl.className='ctrl';
ctrl.innerHTML=`${MOD==='HOME'?'':'<a href="index.html#modules" title="메인으로">⌂ 메인</a>'}<button data-c="prev" title="이전 (←)">◀</button><span class="cnt"></span><button data-c="next" title="다음 (→)">▶</button><button data-c="ov" title="전체 보기 (O)">▦ 목록</button><button data-c="re" title="효과 다시 보기 (R)">↻</button><button data-c="fs" title="전체 화면 (F)">⛶</button>`;
document.body.appendChild(ctrl);
ctrl.addEventListener('click',e=>{const b=e.target.closest('[data-c]');if(!b)return;({prev,next,ov:toggleOv,re:()=>enter(slides[cur]),fs})[b.dataset.c]()});
function fs(){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>{})}
const ov=document.createElement('div');ov.className='overview';
ov.innerHTML=`<h3>${document.body.dataset.modtitle||''} · 슬라이드 목록 <span style="font-size:14px;opacity:.7">(Esc 닫기)</span></h3><div class="ov-grid">${slides.map((s,i)=>`<div class="ov-card" data-i="${i}"><b>${s.dataset.no}</b><span>${s.dataset.title||($('.s-title',s)||{}).textContent||''}</span></div>`).join('')}</div>`;
document.body.appendChild(ov);
ov.addEventListener('click',e=>{const c=e.target.closest('.ov-card');if(c){go(+c.dataset.i);toggleOv(false)}});
function toggleOv(f){ov.classList.toggle('open',typeof f==='boolean'?f:undefined)}

document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){if(modalOpen)closePop();else{toggleOv(false);$$('.example.open').forEach(x=>x.classList.remove('open'))}return}
  if(modalOpen){const f=document.activeElement;if(f&&['INPUT','TEXTAREA','SELECT'].includes(f.tagName))return;if(e.key==='ArrowLeft'||e.key==='Backspace'){e.preventDefault();closePop()}return}
  const a=document.activeElement;if(a&&(a.tagName==='INPUT'||a.tagName==='TEXTAREA'||a.isContentEditable))return;
  if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();next()}
  else if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();prev()}
  else if(e.key==='Home')go(0);else if(e.key==='End')go(slides.length-1);
  else if(e.key==='o'||e.key==='O')toggleOv();else if(e.key==='r'||e.key==='R')enter(slides[cur]);else if(e.key==='f'||e.key==='F')fs();
});
let mt;document.addEventListener('mousemove',e=>{ctrl.classList.add('show');clearTimeout(mt);mt=setTimeout(()=>ctrl.classList.remove('show'),1800);
  const sl=slides[cur];if(!sl)return;const nx=e.clientX/innerWidth-.5,ny=e.clientY/innerHeight-.5;
  $$('.deco',sl).forEach(d=>{const k=+(d.dataset.depth||20);d.style.transform=`translate(${-nx*k}px,${-ny*k}px)`});
});
/* 카드 기울기 */
document.addEventListener('mousemove',e=>{const t=e.target.closest('.tilt');$$('.tilt.tilting').forEach(x=>{if(x!==t){x.style.transform='';x.classList.remove('tilting')}});if(!t)return;const r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;t.classList.add('tilting');t.style.transform=`perspective(900px) rotateX(${-y*7}deg) rotateY(${x*9}deg) translateY(-4px)`});

/* 비포/애프터 */
function setBA(b,p){$('.after',b).style.clipPath=`inset(0 0 0 ${p}%)`;$('.handle',b).style.left=p+'%'}
$$('.ba').forEach(b=>{let d=false;const mv=e=>{if(!d)return;const r=b.getBoundingClientRect();setBA(b,Math.max(0,Math.min(100,((e.touches?e.touches[0].clientX:e.clientX)-r.left)/r.width*100)))};$('.handle',b).addEventListener('pointerdown',e=>{d=true;e.preventDefault()});addEventListener('pointerup',()=>d=false);addEventListener('pointermove',mv)});

/* 시작 */
fit();
let start=0;const h=decodeURIComponent(location.hash.slice(1));if(h==='last')start=slides.length-1;else{const k=slides.findIndex(s=>s.dataset.no===h||s.dataset.id===h);if(k>=0)start=k}
slides[start].classList.add('active');cur=-1;go(start,true);
window.addEventListener('load',()=>{window.mountIll&&mountIll();enter(slides[cur])});
})();
