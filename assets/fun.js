/* 쉬어가기 코너: 토마토 받기 게임 · 질문 수 세기 */
(function(){
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
let BEST=0;try{BEST=+(localStorage.getItem('seoulcg-fun-best')||0)}catch(e){}
const saveBest=v=>{try{localStorage.setItem('seoulcg-fun-best',String(v))}catch(e){}};

/* ---------- 토마토 받기 ---------- */
$$('.game[data-game="catch"]').forEach(box=>{
  const cv=$('canvas',box),cx=cv.getContext('2d'),ov=$('.ov',box),sl=box.closest('.slide');
  const hudS=$('[data-h=score]',box),hudT=$('[data-h=time]',box);
  const bestEl=sl?$('[data-best]',sl):null,lastEl=sl?$('[data-last]',sl):null;
  const ITEMS=[{e:'🍅',v:10,w:66},{e:'⭐',v:30,w:8},{e:'🐛',v:-20,w:26}];
  let W=0,H=0,bx=0,run=false,items=[],score=0,t0=0,last=0,spawn=0,pops=[],raf=0;
  const DUR=30;
  function size(){W=cv.width=box.offsetWidth;H=cv.height=box.offsetHeight;if(!bx)bx=W/2}
  function pick(){let r=Math.random()*100;for(const it of ITEMS){if((r-=it.w)<0)return it}return ITEMS[0]}
  function show(){if(bestEl)bestEl.textContent=BEST.toLocaleString('ko-KR')}
  function start(){size();items=[];pops=[];score=0;t0=performance.now();last=t0;spawn=0;run=true;ov.classList.add('hide');cancelAnimationFrame(raf);raf=requestAnimationFrame(loop)}
  function end(){run=false;if(score>BEST){BEST=score;saveBest(BEST)}show();if(lastEl)lastEl.textContent=score.toLocaleString('ko-KR');
    $('h3',ov).textContent=`${score.toLocaleString('ko-KR')}점!`;$('p',ov).innerHTML=score>=BEST&&score>0?'오늘의 최고 기록입니다 🎉<br>짝에게 도전장을 내밀어 보세요':'한 번 더 하면 더 잘할 수 있어요<br>⭐ 특품은 30점, 🐛 벌레는 −20점';
    $('button',ov).textContent='다시 하기';ov.classList.remove('hide');draw(performance.now())}
  function loop(now){
    if(sl&&!sl.classList.contains('active')){run=false;ov.classList.remove('hide');return}
    const dt=Math.min(.05,(now-last)/1000);last=now;const el=(now-t0)/1000,left=Math.max(0,DUR-el);
    const lv=1+el/DUR*1.6;spawn-=dt;
    if(spawn<=0){const it=pick();items.push({...it,x:40+Math.random()*(W-80),y:-40,vy:(150+Math.random()*90)*lv,r:(Math.random()-.5)*2});spawn=.55/lv}
    const by=H-70;
    items.forEach(o=>{o.y+=o.vy*dt;o.rot=(o.rot||0)+o.r*dt;
      if(!o.done&&o.y>by-30&&o.y<by+20&&Math.abs(o.x-bx)<70){o.done=1;score=Math.max(0,score+o.v);pops.push({x:o.x,y:by-50,t:now,v:o.v})}});
    items=items.filter(o=>!o.done&&o.y<H+50);pops=pops.filter(p=>now-p.t<700);
    hudS.textContent=`점수 ${score.toLocaleString('ko-KR')}`;hudT.textContent=`⏱ ${Math.ceil(left)}`;
    draw(now);if(left<=0){end();return}raf=requestAnimationFrame(loop)}
  function draw(now){
    cx.clearRect(0,0,W,H);
    cx.fillStyle='rgba(94,140,74,.25)';cx.fillRect(0,H-26,W,26);
    cx.textAlign='center';cx.textBaseline='middle';cx.fillStyle='#000';cx.globalAlpha=1;
    items.forEach(o=>{cx.save();cx.translate(o.x,o.y);cx.rotate(o.rot||0);cx.font=`${o.e==='⭐'?52:58}px "Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif`;cx.fillText(o.e,0,0);cx.restore()});
    cx.font='92px "Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif';cx.fillText('🧺',bx,H-70);
    pops.forEach(p=>{const k=(now-p.t)/700;cx.globalAlpha=1-k;cx.font='900 34px Paperozi,"Malgun Gothic",sans-serif';cx.fillStyle=p.v>0?'#1F5A36':'#D9483B';cx.fillText((p.v>0?'+':'')+p.v,p.x,p.y-k*50);cx.globalAlpha=1})}
  box.addEventListener('mousemove',e=>{const r=cv.getBoundingClientRect();bx=Math.max(50,Math.min(W-50,(e.clientX-r.left)/r.width*W))});
  box.addEventListener('touchmove',e=>{const r=cv.getBoundingClientRect(),t=e.touches[0];bx=Math.max(50,Math.min(W-50,(t.clientX-r.left)/r.width*W));e.preventDefault()},{passive:false});
  $('button',ov).addEventListener('click',e=>{e.stopPropagation();start()});
  if(sl)sl.addEventListener('enter',()=>{size();show();if(!run)draw(performance.now())});
  show();
});


/* ---------- AI 답변 속 틀린 곳 찾기 ---------- */
const SPOT=[
 {cat:'단위',q:'10/01 토마토 kg당 가격 알려줘.',a:['10/01 토마토(일반) 5kg 상자의 평균 가격은 ',['14,685원/kg',1],'입니다. ',['5kg 상자로 거래',0],'되었고, kg 가격은 ',['상자 가격을 5로 나눠',0],' 구합니다.'],
  why:'14,685는 <b>원/상자</b> 값입니다. 14,685 ÷ 5kg = <b>2,937원/kg</b>'},
 {cat:'날짜',q:'추석 연휴 뒤 첫 경매는 언제였어?',a:[['09/24는 추석 전 마지막 경매일',0],'이고, 연휴 뒤 첫 경매는 ',['09/26',1],'입니다. 이날 반입물량은 ',['76.8t',0],'이었습니다.'],
  why:'09/25~27 연휴에는 경매가 없었습니다. 연휴 뒤 첫 경매는 <b>09/28</b>'},
 {cat:'계산',q:'09/24와 09/28을 비교해줘.',a:['kg 가격은 ',['5,033원 → 3,046원',0],'으로 ',['약 39% 내렸고',0],', 반입물량은 25.8t → 76.8t으로 ',['약 2배',1],' 늘었습니다.'],
  why:'76.8 ÷ 25.8 = 약 <b>3배</b>입니다. 계산은 내가 한 번 더 해 봅니다'},
 {cat:'비교 조건',q:'A법인과 B법인 중 어디가 더 비싸게 팔았어?',a:[['A법인은 토마토 5kg 상자만',0],'으로 평균을 냈고, ',['B법인은 3kg 상자까지 섞어서',1],' 평균을 냈습니다. 그래서 ',['B법인 kg 가격이 더 높게',0],' 나왔습니다.'],
  why:'조건이 다르면 비교할 수 없습니다. <b>같은 포장·등급·기간</b>끼리 다시 계산합니다'},
 {cat:'단정',q:'다음 주에 값이 오를까?',a:[['09/28 반입물량이 76.8t으로 많았던 것',0],'은 원본에서 확인됩니다. ',['다음 주에는 반드시 값이 오릅니다',1],'. ',['다음 경매일 반입물량을 확인',0],'해 보세요.'],
  why:'앞일을 <b>“반드시”</b>로 말하면 안 됩니다. “이런 조건이면 오를 수 있다”로 말합니다'},
 {cat:'단위 비교',q:'소매가격이랑 경매가격 비교해줘.',a:['경매 ',['5kg 상자 15,230원',0],'과 ',['소매 1kg 가격을 그대로 나란히 놓으면',1],' 차이를 바로 알 수 있습니다. 소매가 더 비싼 데는 ',['유통비용이 들어 있습니다',0],'.'],
  why:'상자 가격과 1kg 가격은 단위가 다릅니다. 경매도 <b>원/kg</b>으로 바꾼 뒤 비교합니다'}
];
$$('.spot[data-game="spot"]').forEach(box=>{
  const sl=box.closest('.slide'),T=20,ov=$('.ov',box),tx=$('.tx',box),qq=$('.qq',box),fb=$('.fb',box),pts=$('.pts',box);
  const out=k=>sl?$(`[data-s="${k}"]`,sl):null;
  let best=0;try{best=+(localStorage.getItem('seoulcg-spot-best')||0)}catch(e){}
  let i=0,score=0,found=0,t0=0,raf=0,live=false,log=[];
  const setOut=()=>{const a=out('score'),b=out('found'),c=out('best');if(a)a.textContent=score;if(b)b.textContent=`${found} / ${SPOT.length}`;if(c)c.textContent=best};
  function pop(v){pts.textContent=(v>0?'+':'')+v;pts.classList.toggle('neg',v<0);pts.classList.remove('go');void pts.offsetWidth;pts.classList.add('go')}
  function round(){const r=SPOT[i];live=true;box.classList.remove('done');fb.className='fb';
    $('.rd',box).textContent=`${i+1} / ${SPOT.length}`;$('.cat',box).textContent=r.cat;qq.textContent=r.q;
    tx.innerHTML=r.a.map((x,j)=>Array.isArray(x)?`<span class="sp" data-j="${j}">${x[0]}</span>`:x).join('');
    t0=performance.now();cancelAnimationFrame(raf);raf=requestAnimationFrame(tick)}
  function tick(now){if(!live)return;if(sl&&!sl.classList.contains('active')){live=false;return}
    const left=Math.max(0,T-(now-t0)/1000);$('.tbar i',box).style.width=(left/T*100)+'%';$('.sec',box).textContent=Math.ceil(left)+'초';
    if(left<=0){finish(false,0);return}raf=requestAnimationFrame(tick)}
  function finish(ok,gain){live=false;box.classList.add('done');const r=SPOT[i];
    $$('.sp',tx).forEach(s=>{if(r.a[+s.dataset.j][1]&&!s.classList.contains('hit'))s.classList.add('show')});
    log.push(ok?'⭕':'❌');
    fb.innerHTML=`<b class="big">${ok?'찾았습니다! +'+gain:'아쉬워요'}</b><span>${r.why}</span><button class="btn orange">${i<SPOT.length-1?'다음 문제 →':'결과 보기'}</button>`;
    fb.className='fb on '+(ok?'good':'bad');
    $('button',fb).addEventListener('click',e=>{e.stopPropagation();i++;if(i<SPOT.length)round();else end()})}
  function end(){if(score>best){best=score;try{localStorage.setItem('seoulcg-spot-best',String(best))}catch(e){}}setOut();
    const msg=found===SPOT.length?'AI 검산왕! 원본 확인 습관이 완벽합니다':found>=4?'훌륭합니다. 놓친 문제의 설명을 다시 보세요':'AI 답도 틀릴 수 있다는 것, 이제 확실히 기억하시죠?';
    $('h3',ov).textContent=`${score}점 · ${found}개 찾음`;$('p',ov).textContent=msg;$('.rs',ov).innerHTML=SPOT.map((r,k)=>`<span>${log[k]||''} ${r.cat}</span>`).join('');
    $('button',ov).textContent='다시 도전';ov.classList.remove('hide')}
  tx.addEventListener('click',e=>{const s=e.target.closest('.sp');if(!s||!live)return;e.stopPropagation();
    const r=SPOT[i],wrong=r.a[+s.dataset.j][1];
    if(wrong){const left=Math.max(0,T-(performance.now()-t0)/1000),g=100+Math.round(left*5);score+=g;found++;s.classList.add('hit');pop(g);setOut();finish(true,g)}
    else{if(s.classList.contains('miss'))return;score=Math.max(0,score-30);s.classList.remove('miss');void s.offsetWidth;s.classList.add('miss');pop(-30);setOut()}});
  $('button',ov).addEventListener('click',e=>{e.stopPropagation();i=0;score=0;found=0;log=[];setOut();ov.classList.add('hide');round()});
  if(sl)sl.addEventListener('enter',()=>{setOut();if(!ov.classList.contains('hide'))return;if(!live&&!box.classList.contains('done')){t0=performance.now();live=true;raf=requestAnimationFrame(tick)}});
  setOut();
});

/* ---------- 질문 수 세기 (스무고개) ---------- */
$$('.qcount').forEach(q=>{const o=$('output',q);let n=0;
  $$('button',q).forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();n=Math.max(0,Math.min(20,n+(+b.dataset.d)));o.textContent=n}))});
})();
