/* 휴식·점심 카운트다운 타이머 */
document.querySelectorAll('.timer').forEach(t=>{
  const btn=t.parentElement.querySelector('.timer-btn');let left=(+t.dataset.min)*60,iv=null;
  const draw=()=>{const m=Math.floor(left/60),s=left%60;t.textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`};
  draw();
  btn&&btn.addEventListener('click',()=>{if(iv){clearInterval(iv);iv=null;btn.textContent='계속';return}
    if(left<=0)left=(+t.dataset.min)*60;btn.textContent='일시정지';
    iv=setInterval(()=>{left--;draw();if(left<=0){clearInterval(iv);iv=null;btn.textContent='다시 시작';t.style.color='var(--orange)';window.toast&&toast('휴식이 끝났습니다 · 자리로 돌아와 주세요')}},1000)});
});
