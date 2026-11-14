/* 편집 모드: 슬라이드 글자를 직접 클릭해 고치고, 원본 HTML 파일에 저장
   - 반드시 다른 스크립트보다 먼저 불러와야 합니다(원본 글자 위치를 먼저 기록).
   - E 키 또는 하단 ✎ 편집 버튼으로 켜고 끕니다.
   - 고친 내용은 브라우저에 임시 보관되고, [파일에 저장]을 누르면 원본 HTML에 반영됩니다. */
(function(){
'use strict';
const stage=document.querySelector('.stage');
if(!stage)return;

const FNAME=(decodeURIComponent(location.pathname.split('/').pop()||'')||'index.html');
const SKEY='seoulcg-edit:'+FNAME;
const LOCAL=location.protocol==='file:'||/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
const ENABLED=LOCAL||/[?&]edit(=|&|$)/.test(location.search);
const WS=/^[ \t\n\r\f]*$/;

/* ---------- 1. 원본 글자 기록 (다른 스크립트가 바꾸기 전) ---------- */
const nodes=[], orig=[], idxOf=new WeakMap();
(function collect(){
  const tw=document.createTreeWalker(stage,NodeFilter.SHOW_TEXT,{acceptNode:n=>{
    const p=n.parentNode;if(!p||p.closest&&p.closest('script,style,template'))return NodeFilter.FILTER_REJECT;
    return WS.test(n.data)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}});
  let n;while((n=tw.nextNode())){idxOf.set(n,nodes.length);nodes.push(n);orig.push(n.data)}
})();
/* 애니메이션용으로 글자를 단어 단위로 쪼개는 제목(.kinetic)은 요소 단위로 기억 */
const kin=new Map();
stage.querySelectorAll('.kinetic').forEach(k=>{const ids=[];const tw=document.createTreeWalker(k,NodeFilter.SHOW_TEXT);let n;while((n=tw.nextNode())){if(idxOf.has(n))ids.push(idxOf.get(n))}if(ids.length)kin.set(k,ids)});

/* ---------- 2. 저장해 둔 수정 내용 다시 적용 ---------- */
let E={};try{E=JSON.parse(localStorage.getItem(SKEY)||'{}')||{}}catch(e){E={}}
const persist=()=>{try{Object.keys(E).length?localStorage.setItem(SKEY,JSON.stringify(E)):localStorage.removeItem(SKEY)}catch(e){}};
Object.keys(E).forEach(k=>{const i=+k,r=E[k];if(nodes[i]&&orig[i]===r.o)nodes[i].data=r.n;else delete E[k]});
persist();
const curVal=i=>E[i]?E[i].n:orig[i];
function setVal(i,v){if(!orig[i].includes(' '))v=v.replace(/ /g,' ');
  if(v===orig[i])delete E[i];else E[i]={o:orig[i],n:v};persist();updPanel()}
/* kinetic 요소는 노드가 교체되므로 슬라이드 번호를 미리 저장 */
const noOf=nodes.map((n,i)=>{const s=n.parentNode.closest('.slide');return s?s.dataset.no||'':''});

/* ---------- 3. 화면 요소 ---------- */
const css=document.createElement('style');
css.textContent=`
.edit-mode .slide [data-eh]{outline:1px dashed rgba(230,120,30,.0);transition:outline-color .15s}
.edit-mode .slide .ed-hover{outline:2px dashed rgba(230,120,30,.85)!important;outline-offset:3px;cursor:text!important}
.edit-mode .slide .ed-on{outline:3px solid #e67e22!important;outline-offset:3px;background:rgba(255,236,200,.55)!important;cursor:text!important;user-select:text!important;-webkit-user-select:text!important}
.edit-mode .slide .ed-done{box-shadow:0 0 0 2px rgba(46,125,50,.55)!important}
.edit-mode .slide .step-item{opacity:1!important;filter:none!important;transform:none!important}
.edit-mode .slide,.edit-mode .slide *{-webkit-user-select:text;user-select:text}
.edit-mode .ctrl{opacity:1}
.ed-panel{position:fixed;left:16px;top:16px;z-index:9999;background:#fff;border:2px solid #e67e22;border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,.18);padding:10px 12px;font:14px/1.45 Pretendard,'Malgun Gothic',sans-serif;color:#222;width:300px;display:none}
.edit-mode .ed-panel{display:block}
.ed-panel h4{margin:0 0 4px;font-size:15px;color:#c0560f;display:flex;align-items:center;gap:6px}
.ed-panel h4 b{margin-left:auto;background:#e67e22;color:#fff;border-radius:999px;padding:1px 9px;font-size:13px}
.ed-panel p{margin:0 0 8px;font-size:12.5px;color:#666}
.ed-panel .row{display:flex;gap:6px;flex-wrap:wrap}
.ed-panel button{border:none;border-radius:8px;padding:7px 10px;font:700 13px/1 inherit;cursor:pointer;background:#f2f2f2;color:#333}
.ed-panel button.pri{background:#e67e22;color:#fff}
.ed-panel button:disabled{opacity:.45;cursor:default}
.ed-list{max-height:260px;overflow:auto;margin-top:8px;border-top:1px solid #eee;display:none}
.ed-list.open{display:block}
.ed-it{padding:6px 0;border-bottom:1px solid #f0f0f0;font-size:12.5px;display:flex;gap:6px;align-items:flex-start}
.ed-it span{flex:1;word-break:break-all}
.ed-it del{color:#b33;text-decoration:line-through}
.ed-it ins{color:#1b6e2a;text-decoration:none;font-weight:700}
.ed-it button{padding:3px 6px;font-size:11.5px}
.ed-pop{position:fixed;z-index:10000;background:#fff;border:2px solid #e67e22;border-radius:12px;padding:10px;box-shadow:0 10px 30px rgba(0,0,0,.2);display:flex;flex-direction:column;gap:6px;width:360px;font:14px Pretendard,'Malgun Gothic',sans-serif}
.ed-pop input{font:inherit;padding:7px 9px;border:1px solid #ccc;border-radius:8px}
.ed-pop .row{display:flex;gap:6px;justify-content:flex-end}
.ed-pop button{border:none;border-radius:8px;padding:6px 12px;font:700 13px inherit;cursor:pointer;background:#f2f2f2}
.ed-pop button.pri{background:#e67e22;color:#fff}
.ed-toast{position:fixed;left:50%;top:18px;transform:translateX(-50%);z-index:10001;background:#333;color:#fff;padding:9px 16px;border-radius:999px;font:600 14px Pretendard,'Malgun Gothic',sans-serif;opacity:0;transition:opacity .25s;pointer-events:none}
.ed-toast.on{opacity:1}
@media print{.ed-panel,.ed-pop,.ed-toast{display:none!important}}`;
document.head.appendChild(css);

const panel=document.createElement('div');panel.className='ed-panel';
panel.innerHTML=`<h4>✎ 편집 모드 <b data-n>0건</b></h4>
<p>글자를 클릭해 고친 뒤 <b>Enter</b>(또는 바깥 클릭)로 확정합니다. <b>Esc</b>는 취소, <b>Alt+클릭</b>은 원래 동작(정답 보기 등).</p>
<div class="row"><button class="pri" data-a="save">💾 파일에 저장</button><button data-a="list">수정 내역</button><button data-a="reset">전체 되돌리기</button><button data-a="off">편집 종료</button></div>
<div class="ed-list"></div>`;
let toastEl,tt;
function toast(m,ms){if(!toastEl){toastEl=document.createElement('div');toastEl.className='ed-toast';document.body.appendChild(toastEl)}toastEl.textContent=m;toastEl.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>toastEl.classList.remove('on'),ms||2600)}
const short=t=>{t=t.replace(/\s+/g,' ').trim();return t.length>60?t.slice(0,60)+'…':t};
const escT=t=>t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function updPanel(){const n=Object.keys(E).length;const b=panel.querySelector('[data-n]');if(b)b.textContent=n+'건';
  const sv=panel.querySelector('[data-a="save"]');if(sv)sv.disabled=!n;
  const L=panel.querySelector('.ed-list');if(L&&L.classList.contains('open'))L.innerHTML=n?Object.keys(E).sort((a,b)=>a-b).map(k=>{const r=E[k];
    return `<div class="ed-it"><span><b>${noOf[k]||''}</b> <del>${escT(short(r.o))}</del> → <ins>${escT(short(r.n))}</ins></span><button data-undo="${k}">되돌리기</button></div>`}).join(''):'<p style="margin:8px 0">아직 수정한 글자가 없습니다.</p>';
  if(btn)btn.innerHTML=n?`✎ 편집 <b style="background:#e67e22;color:#fff;border-radius:999px;padding:0 7px;font-size:12px">${n}</b>`:'✎ 편집';
  markDone()}
function markDone(){stage.querySelectorAll('.ed-done').forEach(x=>x.classList.remove('ed-done'));
  Object.keys(E).forEach(k=>{const n=nodes[k];let el=n&&n.isConnected?n.parentNode:null;if(!el){for(const [ke,ids] of kin)if(ids.includes(+k)){el=ke;break}}el&&el.classList&&el.classList.add('ed-done')})}

/* ---------- 4. 편집 켜기/끄기 ---------- */
let on=false,host=null,hostSnap=null,btn=null;
function toggle(f){on=typeof f==='boolean'?f:!on;if(!on)finish(true);document.body.classList.toggle('edit-mode',on);if(on){updPanel();toast('편집 모드: 고칠 글자를 클릭하세요')}else clearHover()}
window.editMode=toggle;

/* 편집 대상 고르기 */
const BLOCK='[data-count],[data-show],.s-top,.s-foot,[data-ill],canvas,svg,.example,.ed-panel';
function mappedIn(el){const tw=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let n;while((n=tw.nextNode()))if(idxOf.has(n))return true;return false}
function pickHost(t){if(!t||t.nodeType!==1)t=t&&t.parentNode;if(!t||!t.closest)return null;
  const sl=t.closest('.slide');if(!sl||!stage.contains(sl))return null;
  if(t.closest('textarea,input,select,[contenteditable="true"]:not(.ed-on)'))return null;
  if(t.closest(BLOCK))return {err:'이 부분은 자동으로 만들어지는 내용이라 여기서는 고칠 수 없습니다.'};
  const k=t.closest('.kinetic');if(k&&kin.has(k))return {el:k,kin:true};
  let el=t;for(let d=0;el&&el!==sl&&d<3;d++,el=el.parentElement){if(mappedIn(el))break}
  if(!el||el===sl||!mappedIn(el))return {err:'이 글자는 화면에서 자동으로 만든 내용이라 여기서는 고칠 수 없습니다(course.js 등 데이터 파일에 있음).'};
  const b=el.closest('button,a.btn,.btn');if(b&&b.tagName==='BUTTON')return {el:b,pop:true};
  return {el};
}
function clearHover(){stage.querySelectorAll('.ed-hover').forEach(x=>x.classList.remove('ed-hover'))}
document.addEventListener('mouseover',e=>{if(!on)return;clearHover();if(host&&host.contains(e.target))return;const h=pickHost(e.target);if(h&&h.el)h.el.classList.add('ed-hover')},true);

function snapshot(el){const m=[];const tw=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let n;while((n=tw.nextNode()))if(idxOf.has(n))m.push([n,n.data]);return m}

function begin(h,ev){finish(true);const el=h.el;
  if(h.pop)return popEdit(el);
  host=el;host.classList.add('ed-on');host.classList.remove('ed-hover');
  if(h.kin){hostSnap={kin:true,ids:kin.get(el),text:el.textContent,html:el.innerHTML}}
  else hostSnap={kin:false,map:snapshot(el),html:el.innerHTML};
  host.setAttribute('contenteditable','true');host.spellcheck=false;
  host.addEventListener('keydown',onKey);host.addEventListener('paste',onPaste);
  host.focus({preventScroll:true});
  // 클릭한 위치에 커서 두기
  try{const r=document.caretRangeFromPoint?document.caretRangeFromPoint(ev.clientX,ev.clientY):null;if(r&&host.contains(r.startContainer)){const s=getSelection();s.removeAllRanges();s.addRange(r)}}catch(e){}
}
function onKey(e){e.stopPropagation();if(e.key==='Enter'){e.preventDefault();finish(true)}else if(e.key==='Escape'){e.preventDefault();finish(false)}}
function onPaste(e){e.preventDefault();const t=(e.clipboardData||window.clipboardData).getData('text').replace(/\s*\n\s*/g,' ');document.execCommand('insertText',false,t)}

function finish(keep){if(!host)return;const el=host,sn=hostSnap;host=null;hostSnap=null;
  el.removeAttribute('contenteditable');el.classList.remove('ed-on');el.removeEventListener('keydown',onKey);el.removeEventListener('paste',onPaste);
  if(!keep){el.innerHTML=sn.html;if(!sn.kin)reattach(el,sn);return}
  if(sn.kin){const nt=el.textContent.replace(/\s+/g,' ').trim(),ot=sn.text.replace(/\s+/g,' ').trim();if(nt===ot)return;
    const ids=sn.ids;if(ids.length===1){const o=curVal(ids[0]),lead=o.match(/^\s*/)[0],trail=o.match(/\s*$/)[0];setVal(ids[0],lead+nt+trail)}
    else{ // 여러 조각으로 된 제목: 앞뒤 공통 부분을 기준으로 바뀐 조각만 반영
      distribute(ids,nt)}
    el.innerHTML=nt.split(' ').map((w,j)=>`<span class="w" style="animation-delay:${.12+j*.09}s;animation:none;opacity:1;transform:none;filter:none">${escT(w)}</span>`).join(' ');
    toast('수정 반영 · 저장하려면 [파일에 저장]');return}
  // 일반 요소: 텍스트 조각 단위로 비교
  const present=new Set();let last=null,pend='';const tw=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);const all=[];let n;while((n=tw.nextNode()))all.push(n);
  all.forEach(t=>{if(idxOf.has(t)){present.add(t);if(pend){t.data=pend+t.data;pend=''}last=t}else if(t.data){if(last){last.data+=t.data}else pend+=t.data;t.remove()}});
  let changed=false;
  sn.map.forEach(([t,old])=>{const i=idxOf.get(t);
    if(!present.has(t)){ // 조각이 통째로 지워진 경우
      if(pend&&!changed){t.data=pend;pend='';el.prepend(t);setVal(i,t.data)}else setVal(i,'');changed=true;return}
    if(t.data!==old){setVal(i,t.data);changed=true}});
  // 남은 줄바꿈(<br>/<div>)이 생겼으면 원래 구조로 정리하지 않고 그대로 둠(텍스트만 저장됨)
  if(changed)toast('수정 반영 · 저장하려면 [파일에 저장]');
}
function reattach(el,sn){/* 취소 시 innerHTML 복원으로 노드가 바뀌므로 다시 연결 */
  const tw=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);const fresh=[];let n;while((n=tw.nextNode()))if(!WS.test(n.data))fresh.push(n);
  const old=sn.map.map(x=>x[0]);if(fresh.length===old.length)fresh.forEach((f,j)=>{const i=idxOf.get(old[j]);idxOf.set(f,i);nodes[i]=f})}
function distribute(ids,nt){const parts=ids.map(curVal),joined=parts.map(p=>p.replace(/\s+/g,' ').trim());
  // 각 조각을 순서대로 찾아서, 찾지 못한(=고쳐진) 조각에 남은 글자를 넣음
  let rest=nt,res=[];let bad=-1;
  for(let j=0;j<joined.length;j++){const p=joined[j];const at=rest.indexOf(p);if(at===0){res.push(p);rest=rest.slice(p.length).replace(/^ /,'')}else{bad=j;break}}
  if(bad<0)return;
  const tail=[];let r2=rest;for(let j=joined.length-1;j>bad;j--){const p=joined[j];if(r2.endsWith(p)){tail.unshift(p);r2=r2.slice(0,r2.length-p.length).replace(/ $/,'')}else{toast('이 제목은 한 번에 한 부분만 고쳐 주세요.');return}}
  const o=parts[bad],lead=o.match(/^\s*/)[0],trail=o.match(/\s*$/)[0];setVal(ids[bad],lead+r2+trail)}

/* 버튼 글자는 작은 입력창으로 수정 */
let popEl=null;
function popEdit(el){closePopEd();const m=snapshot(el);if(!m.length)return;const r=el.getBoundingClientRect();
  popEl=document.createElement('div');popEl.className='ed-pop';
  popEl.innerHTML=`<b style="font-size:13px;color:#c0560f">버튼 글자 수정</b>${m.map((x,j)=>`<input data-j="${j}" value="${escT(x[1]).replace(/"/g,'&quot;')}">`).join('')}<div class="row"><button data-x>취소</button><button class="pri" data-ok>확인</button></div>`;
  popEl.style.left=Math.max(8,Math.min(innerWidth-376,r.left))+'px';popEl.style.top=Math.min(innerHeight-60-44*m.length,r.bottom+8)+'px';
  document.body.appendChild(popEl);const ins=[...popEl.querySelectorAll('input')];ins[0].focus();ins[0].select();
  const ok=()=>{ins.forEach((inp,j)=>{const [t,old]=m[j];const lead=old.match(/^\s*/)[0],trail=old.match(/\s*$/)[0];const v=lead+inp.value.trim()+trail;if(v!==t.data){t.data=v;setVal(idxOf.get(t),v)}});closePopEd()};
  popEl.addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Enter'){e.preventDefault();ok()}else if(e.key==='Escape')closePopEd()});
  popEl.querySelector('[data-ok]').onclick=ok;popEl.querySelector('[data-x]').onclick=closePopEd}
function closePopEd(){if(popEl){popEl.remove();popEl=null}}

/* 클릭 가로채기 (편집 모드에서 슬라이드 기능 대신 편집) */
function inUI(t){return t.closest&&t.closest('.ctrl,.ed-panel,.ed-pop,.overview,.modal-back,.ed-toast')}
document.addEventListener('mousedown',e=>{if(!on||e.button!==0||e.altKey)return;const t=e.target;if(inUI(t))return;
  if(popEl&&!popEl.contains(t))closePopEd();
  if(host&&host.contains(t))return; // 편집 중인 곳: 커서 이동 허용
  const h=pickHost(t);
  if(!h){finish(true);return}
  e.preventDefault();e.stopPropagation();
  if(h.err){finish(true);toast(h.err,3200);return}
  begin(h,e)},true);
['click','pointerdown','dblclick'].forEach(type=>document.addEventListener(type,e=>{if(!on||e.altKey)return;const t=e.target;if(inUI(t))return;if(host&&host.contains(t)&&type!=='click')return;
  if(t.closest&&t.closest('.slide')){if(type==='click')e.preventDefault();e.stopPropagation()}},true));
document.addEventListener('keydown',e=>{const a=document.activeElement;if(a&&(a.tagName==='INPUT'||a.tagName==='TEXTAREA'||a.isContentEditable))return;
  if(!ENABLED)return;if((e.key==='e'||e.key==='E')&&!e.ctrlKey&&!e.metaKey&&!e.altKey){e.preventDefault();toggle()}},true);

/* ---------- 5. 원본 HTML에 반영 ---------- */
function decode(s){const d=document.createElement('textarea');d.innerHTML=s;return d.value}
const RAW=new Set(['script','style','textarea','title','xmp','iframe','noembed','noframes','noscript','plaintext']);
function tokenize(src){
  const m=/<div\b[^>]*class=["'][^"']*\bstage\b[^"']*["'][^>]*>/i.exec(src);if(!m)throw new Error('원본에서 슬라이드 영역(stage)을 찾지 못했습니다.');
  let i=m.index+m[0].length;const runs=[];let ts=i;
  const push=(a,b,rcdata)=>{if(b>a){const raw=src.slice(a,b),txt=rcdata?decode(raw).replace(/^\n/,''):decode(raw);if(!WS.test(txt.replace(/\r\n?/g,'\n')))runs.push({a,b,raw})}};
  while(i<src.length){
    if(src[i]!=='<'){i++;continue}
    const nx=src[i+1]||'';
    if(src.startsWith('<!--',i)){push(ts,i);const e=src.indexOf('-->',i+4);i=e<0?src.length:e+3;ts=i;continue}
    if(nx==='!'||nx==='?'){push(ts,i);const e=src.indexOf('>',i);i=e<0?src.length:e+1;ts=i;continue}
    const close=nx==='/';const nm=/^[a-zA-Z][a-zA-Z0-9-]*/.exec(src.slice(i+(close?2:1),i+40));
    if(!nm){i++;continue}
    push(ts,i);
    // 태그 끝 찾기(속성 따옴표 고려)
    let j=i+1+(close?1:0)+nm[0].length;
    while(j<src.length&&src[j]!=='>'){const c=src[j];if((c==='"'||c==="'")){const e=src.indexOf(c,j+1);j=e<0?src.length:e+1;continue}j++}
    j++;const tag=nm[0].toLowerCase();
    if(!close&&tag==='script'){/* 슬라이드 영역 끝 */break}
    if(!close&&RAW.has(tag)){const re=new RegExp('</'+tag+'[\\s>/]','ig');re.lastIndex=j;const e=re.exec(src);const end=e?e.index:src.length;
      if(tag==='textarea'||tag==='title')push(j,end,true);
      const ce=src.indexOf('>',end);i=ce<0?src.length:ce+1;ts=i;continue}
    i=j;ts=i}
  push(ts,Math.min(i,src.length));
  return runs}
const norm=s=>s.replace(/\r\n?/g,'\n').replace(/[\s ]+/g,' ').trim();
function applyTo(src){
  const runs=tokenize(src);
  if(runs.length!==orig.length)throw new Error(`원본 파일 구조가 화면과 다릅니다(글자 조각 ${runs.length} vs ${orig.length}). 파일이 따로 수정되었을 수 있으니 새로고침 후 다시 시도하세요.`);
  const ks=Object.keys(E).map(Number).sort((a,b)=>b-a);
  for(const k of ks){const r=runs[k];if(norm(decode(r.raw))!==norm(E[k].o))throw new Error(`${noOf[k]}번 슬라이드의 “${short(E[k].o)}” 위치가 원본과 맞지 않습니다. 새로고침 후 다시 시도하세요.`)}
  let out=src;
  for(const k of ks){const r=runs[k];let v=E[k].n.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/ /g,'&nbsp;');
    if(r.raw.includes('\r\n'))v=v.replace(/\r?\n/g,'\r\n');
    out=out.slice(0,r.a)+v+out.slice(r.b)}
  return out}
window.__editTest={tokenize,applyTo,orig,E};

/* 폴더 연결(크롬·엣지): 한 번 고르면 기억 */
const IDB='seoulcg-edit-db';
function idb(mode,fn){return new Promise((res,rej)=>{const q=indexedDB.open(IDB,1);q.onupgradeneeded=()=>q.result.createObjectStore('h');q.onerror=()=>rej(q.error);
  q.onsuccess=()=>{const tx=q.result.transaction('h',mode);const st=tx.objectStore('h');const r=fn(st);tx.oncomplete=()=>res(r&&r.result);tx.onerror=()=>rej(tx.error)}})}
async function getDir(force){let d=null;if(!force){try{d=await idb('readonly',s=>s.get('dir'))}catch(e){}}
  if(d){let p=await d.queryPermission({mode:'readwrite'});if(p!=='granted')p=await d.requestPermission({mode:'readwrite'});if(p==='granted'&&await hasFile(d))return d}
  toast('강의사이트 폴더(index.html, m1.html… 이 있는 폴더)를 선택하세요',4000);
  d=await showDirectoryPicker({id:'seoulcg-site',mode:'readwrite'});
  if(!await hasFile(d))throw new Error(`선택한 폴더에 ${FNAME} 파일이 없습니다. ‘강의사이트’ 폴더를 선택해 주세요.`);
  try{await idb('readwrite',s=>s.put(d,'dir'))}catch(e){}
  return d}
async function hasFile(d){try{await d.getFileHandle(FNAME);return true}catch(e){return false}}
const stamp=()=>{const t=new Date(),p=n=>String(n).padStart(2,'0');return `${t.getFullYear()}${p(t.getMonth()+1)}${p(t.getDate())}_${p(t.getHours())}${p(t.getMinutes())}${p(t.getSeconds())}`};

async function saveFile(){finish(true);closePopEd();if(!Object.keys(E).length){toast('저장할 수정 내용이 없습니다.');return}
  try{
    if(window.showDirectoryPicker){
      const d=await getDir();const fh=await d.getFileHandle(FNAME);const src=await(await fh.getFile()).text();
      const out=applyTo(src);
      const bk=await d.getDirectoryHandle('_편집백업',{create:true});const bh=await bk.getFileHandle(FNAME.replace(/\.html?$/i,'')+'_'+stamp()+'.html',{create:true});
      let w=await bh.createWritable();await w.write(src);await w.close();
      w=await fh.createWritable();await w.write(out);await w.close();
      const n=Object.keys(E).length;E={};persist();toast(`${n}건을 ${FNAME}에 저장했습니다. 이전 파일은 _편집백업 폴더에 보관했습니다.`,3500);
      setTimeout(()=>location.reload(),1600);return}
    // 다른 브라우저: 원본을 읽어 수정본을 내려받기
    let src=null;try{const r=await fetch(location.href.split('#')[0],{cache:'no-store'});if(r.ok)src=await r.text()}catch(e){}
    if(src==null)src=await pickText();
    const out=applyTo(src);const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([out],{type:'text/html'}));a.download=FNAME;document.body.appendChild(a);a.click();a.remove();
    toast(`수정본 ${FNAME}을 내려받았습니다. 강의사이트 폴더의 같은 파일을 바꿔 넣으세요.`,5000);
  }catch(err){if(err&&err.name==='AbortError'){toast('저장을 취소했습니다.');return}console.error(err);toast('저장하지 못했습니다: '+(err&&err.message||err),6000)}}
function pickText(){return new Promise((res,rej)=>{const i=document.createElement('input');i.type='file';i.accept='.html,.htm';toast(`원본 ${FNAME} 파일을 선택하세요`,4000);
  i.onchange=()=>{const f=i.files[0];if(!f)return rej(Object.assign(new Error('취소'),{name:'AbortError'}));f.text().then(res,rej)};i.click()})}

panel.addEventListener('click',e=>{const u=e.target.closest('[data-undo]');if(u){const k=u.dataset.undo;delete E[k];persist();location.reload();return}
  const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a;
  if(a==='save')saveFile();
  else if(a==='list'){panel.querySelector('.ed-list').classList.toggle('open');updPanel()}
  else if(a==='reset'){if(!Object.keys(E).length)return;if(confirm('이 페이지에서 저장하지 않은 수정 내용을 모두 되돌릴까요?')){E={};persist();location.reload()}}
  else if(a==='off')toggle(false)});

addEventListener('beforeunload',e=>{if(host)finish(true)});
document.addEventListener('DOMContentLoaded',()=>{
  document.body.appendChild(panel);
  const ctrl=document.querySelector('.ctrl');
  if(ctrl&&ENABLED){btn=document.createElement('button');btn.title='편집 모드 (E)';btn.addEventListener('click',()=>toggle());ctrl.appendChild(btn)}
  updPanel();
  if(Object.keys(E).length&&ENABLED)setTimeout(()=>toast(`저장하지 않은 수정 ${Object.keys(E).length}건이 적용되어 있습니다(✎ 편집 → 파일에 저장).`,4000),800);
});
})();
