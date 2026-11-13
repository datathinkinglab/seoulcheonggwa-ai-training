/* 직접 그린 SVG 일러스트 모음 — data-ill="이름" 으로 삽입 */
(function(){
const G9='#173F27',G8='#1F5A36',G5='#5E8C4A',G3='#A9C48A',G1='#DDE8D3',G0='#EEF4E9',O='#EE7A2B',O2='#F6A25E',OB='#FDEBDD',R='#D9483B',R2='#E8695B',Y='#F2C14E',W='#FFFFFF',INK='#1D2A22',B='#3C7DB8',BR='#C8925A',BR2='#A8743F';
const apple=(x,y,s=1,c=R)=>`<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="4" rx="38" ry="32" fill="${c}"/><path d="M-26-2c-3 9-1 18 5 24" stroke="#fff" stroke-opacity=".35" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M0-30L6-19 18-23 11-13 22-6 9-6 4 5 0-6-4 5-9-6-22-6-11-13-18-23-6-19z" fill="${G5}"/><path d="M0-30c0-6 2-11 6-14" stroke="${G8}" stroke-width="4" stroke-linecap="round" fill="none"/></g>`; /* 토마토 */
const leaf=(x,y,r,s=1,c=G5)=>`<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><path d="M0 0C20-30 70-34 100-10 70 18 24 22 0 0z" fill="${c}"/><path d="M0 0C30-6 60-10 98-10" stroke="#fff" stroke-opacity=".45" stroke-width="2.5" fill="none"/></g>`;
const ILL={
leaves:`<svg viewBox="0 0 260 220" width="260" height="220">${leaf(10,190,-60,1.2,G8)}${leaf(30,170,-25,1,G5)}${leaf(20,140,-80,.8,G3)}${apple(150,150,1.1)}${leaf(90,200,-10,.7,G3)}</svg>`,
leaves2:`<svg viewBox="0 0 260 220" width="260" height="220">${leaf(250,30,150,1.2,G8)}${leaf(240,60,175,1,G5)}${leaf(240,10,125,.8,G3)}${apple(110,70,.9,R2)}</svg>`,
phone:`<svg viewBox="0 0 420 380" width="100%" height="100%">
<circle cx="200" cy="190" r="170" fill="${G0}"/>
<g class="float"><rect x="130" y="40" width="150" height="290" rx="26" fill="${G9}"/><rect x="140" y="58" width="130" height="250" rx="16" fill="${W}"/>
<circle cx="205" cy="125" r="34" fill="${G1}"/>${apple(205,132,.55)}
<rect x="160" y="175" width="90" height="12" rx="6" fill="${G8}"/><rect x="172" y="195" width="66" height="9" rx="4.5" fill="${G3}"/>
<circle cx="172" cy="265" r="20" fill="${R}"/><circle cx="238" cy="265" r="20" fill="${G5}"/>
<path d="M164 263c4-5 12-5 16 0" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" transform="rotate(180 172 263)"/><path d="M230 267c4-5 12-5 16 0" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/></g>
<g stroke="${O}" stroke-width="7" fill="none" stroke-linecap="round"><path d="M300 90c18 14 18 44 0 58"><animate attributeName="opacity" values="0;1;0" dur="1.6s" repeatCount="indefinite"/></path><path d="M322 70c30 24 30 74 0 98"><animate attributeName="opacity" values="0;1;0" dur="1.6s" begin=".3s" repeatCount="indefinite"/></path></g>
<g><rect x="16" y="56" width="120" height="58" rx="18" fill="${O}"/><path d="M110 112l16 18 2-22z" fill="${O}"/><text x="76" y="94" font-size="30" font-weight="900" fill="#fff" text-anchor="middle">왜?</text></g>
<g><rect x="10" y="240" width="118" height="54" rx="18" fill="${G8}"/><path d="M108 290l20 14-4-20z" fill="${G8}"/><text x="69" y="275" font-size="24" font-weight="800" fill="#fff" text-anchor="middle">언제?</text></g>
</svg>`,
briefing:`<svg viewBox="0 0 420 400" width="100%" height="100%">
<rect x="60" y="30" width="300" height="350" rx="20" fill="${W}" stroke="${G1}" stroke-width="3"/>
<rect x="60" y="30" width="300" height="56" rx="20" fill="${G8}"/><rect x="60" y="66" width="300" height="20" fill="${G8}"/>
<text x="210" y="66" font-size="21" font-weight="800" fill="#fff" text-anchor="middle">출하자 브리핑 · 09/28 기준</text>
<rect x="84" y="108" width="252" height="74" rx="12" fill="${G0}"/><rect x="84" y="108" width="8" height="74" rx="4" fill="${G8}"/>
<text x="104" y="134" font-size="16" font-weight="800" fill="${G8}">① 확인한 사실</text><rect x="104" y="146" width="150" height="9" rx="4" fill="${G3}"/><rect x="104" y="162" width="110" height="9" rx="4" fill="${G3}"/>
<g transform="translate(272 128)"><rect x="0" y="22" width="14" height="26" fill="${G5}"/><rect x="20" y="8" width="14" height="40" fill="${O}"/></g>
<rect x="84" y="196" width="252" height="74" rx="12" fill="${OB}"/><rect x="84" y="196" width="8" height="74" rx="4" fill="${O}"/>
<text x="104" y="222" font-size="16" font-weight="800" fill="#9A4F12">② 앞으로 볼 조건</text><rect x="104" y="234" width="170" height="9" rx="4" fill="${O2}"/><rect x="104" y="250" width="130" height="9" rx="4" fill="${O2}"/>
<rect x="84" y="284" width="252" height="74" rx="12" fill="#EEF2F7"/><rect x="84" y="284" width="8" height="74" rx="4" fill="${B}"/>
<text x="104" y="310" font-size="16" font-weight="800" fill="#1E5A8C">③ 더 확인할 내용</text><rect x="104" y="322" width="160" height="9" rx="4" fill="#B9CCE0"/><rect x="104" y="338" width="100" height="9" rx="4" fill="#B9CCE0"/>
${apple(355,360,.7)}${leaf(20,370,-40,.8,G5)}
</svg>`,
chat3:`<svg viewBox="0 0 520 360" width="100%" height="100%">
<rect x="20" y="20" width="480" height="320" rx="22" fill="${W}" stroke="${G1}" stroke-width="3"/>
<rect x="20" y="20" width="480" height="46" rx="22" fill="${G0}"/><rect x="20" y="50" width="480" height="16" fill="${G0}"/>
<circle cx="50" cy="43" r="7" fill="${R2}"/><circle cx="72" cy="43" r="7" fill="${Y}"/><circle cx="94" cy="43" r="7" fill="${G5}"/><text x="260" y="49" font-size="17" font-weight="800" fill="${G8}" text-anchor="middle">AI 채팅</text>
<rect x="250" y="90" width="220" height="44" rx="16" fill="${G8}"/><rect x="266" y="106" width="150" height="10" rx="5" fill="#fff" opacity=".7"/>
<rect x="48" y="150" width="250" height="70" rx="16" fill="${G0}"/><rect x="64" y="166" width="190" height="10" rx="5" fill="${G3}"/><rect x="64" y="186" width="140" height="10" rx="5" fill="${G3}"/>
<rect x="44" y="262" width="432" height="56" rx="18" fill="#F7FAF5" stroke="${G3}" stroke-width="2"/>
<g transform="translate(72 290)"><path d="M6-10l-14 14c-6 6 2 14 8 8l16-16c4-4-2-10-6-6L-4 4" stroke="${G8}" stroke-width="3.5" fill="none" stroke-linecap="round"/></g>
<rect x="104" y="282" width="270" height="16" rx="8" fill="${G1}"/>
<circle cx="440" cy="290" r="20" fill="${O}"/><path d="M432 290h16m-6-7l7 7-7 7" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<g font-size="20" font-weight="900" fill="#fff" text-anchor="middle"><circle cx="72" cy="240" r="17" fill="${O}"/><text x="72" y="247">1</text><circle cx="240" cy="240" r="17" fill="${O}"/><text x="240" y="247">2</text><circle cx="440" cy="240" r="17" fill="${O}"/><text x="440" y="247">3</text></g>
<g font-size="15" font-weight="800" fill="${G8}"><text x="96" y="246">첨부</text><text x="264" y="246">붙여넣기</text><text x="380" y="246">실행</text></g>
</svg>`,
crate:`<svg viewBox="0 0 420 320" width="100%" height="100%">
<ellipse cx="210" cy="290" rx="170" ry="16" fill="${G1}"/>
${apple(140,120,1)}${apple(210,108,1.05,R2)}${apple(280,122,1)}${apple(175,140,.95,R2)}${apple(248,142,.95)}
<path d="M60 150h300l-22 130H82z" fill="${BR}"/><path d="M60 150h300v20H60z" fill="${BR2}"/>
<g stroke="${BR2}" stroke-width="4"><path d="M76 200h268M72 240h276"/></g>
<rect x="150" y="186" width="120" height="58" rx="10" fill="#fff"/><text x="210" y="212" font-size="18" font-weight="900" fill="${G8}" text-anchor="middle">토마토 · 특</text><text x="210" y="234" font-size="16" font-weight="700" fill="${O}" text-anchor="middle">5kg 상자</text>
<g transform="translate(330 40) rotate(12)"><rect x="0" y="0" width="80" height="44" rx="8" fill="${O}"/><circle cx="12" cy="22" r="5" fill="#fff"/><text x="46" y="29" font-size="17" font-weight="900" fill="#fff" text-anchor="middle">원/kg</text></g>
</svg>`,
magnifier:`<svg viewBox="0 0 420 320" width="100%" height="100%">
<rect x="30" y="30" width="300" height="250" rx="16" fill="${W}" stroke="${G1}" stroke-width="3"/>
<rect x="30" y="30" width="300" height="40" rx="16" fill="${G8}"/><rect x="30" y="56" width="300" height="14" fill="${G8}"/>
${[0,1,2,3,4].map(i=>`<rect x="50" y="${88+i*36}" width="80" height="14" rx="7" fill="${G1}"/><rect x="150" y="${88+i*36}" width="${i==3?120:90}" height="14" rx="7" fill="${i==3?R2:G3}"/>`).join('')}
<g class="float"><circle cx="300" cy="200" r="62" fill="#fff" fill-opacity=".55" stroke="${O}" stroke-width="12"/><path d="M344 246l52 52" stroke="${O}" stroke-width="18" stroke-linecap="round"/><text x="300" y="214" font-size="38" font-weight="900" fill="${R}" text-anchor="middle">?!</text></g>
</svg>`,
calc:`<svg viewBox="0 0 520 260" width="100%" height="100%">
<g transform="translate(20 50)"><path d="M10 40h150l-14 120H24z" fill="${BR}"/><rect x="10" y="30" width="150" height="16" fill="${BR2}"/>${apple(55,30,.6)}${apple(105,26,.62,R2)}<text x="85" y="110" font-size="22" font-weight="900" fill="#fff" text-anchor="middle">5kg</text><text x="85" y="200" font-size="22" font-weight="900" fill="${G8}" text-anchor="middle">14,685원/상자</text></g>
<text x="220" y="148" font-size="56" font-weight="900" fill="${O}" text-anchor="middle">÷</text>
<g transform="translate(260 70)"><rect x="0" y="40" width="90" height="70" rx="12" fill="${G8}"/><rect x="18" y="20" width="54" height="26" rx="6" fill="${G5}"/><text x="45" y="86" font-size="26" font-weight="900" fill="#fff" text-anchor="middle">10</text><text x="45" y="150" font-size="18" font-weight="800" fill="${G8}" text-anchor="middle">kg</text></g>
<text x="390" y="148" font-size="56" font-weight="900" fill="${O}" text-anchor="middle">=</text>
<g transform="translate(420 92)"><rect x="0" y="0" width="92" height="74" rx="14" fill="${OB}" stroke="${O}" stroke-width="3"/><text x="46" y="36" font-size="22" font-weight="900" fill="${R}" text-anchor="middle">2,900</text><text x="46" y="60" font-size="15" font-weight="800" fill="#9A4F12" text-anchor="middle">원/kg</text></g>
</svg>`,
clipboard:`<svg viewBox="0 0 320 360" width="100%" height="100%">
<rect x="40" y="40" width="240" height="300" rx="20" fill="${BR}"/><rect x="58" y="62" width="204" height="262" rx="10" fill="#fff"/>
<rect x="110" y="24" width="100" height="40" rx="10" fill="${G8}"/>
${['숫자','조건','다른 설명'].map((t,i)=>`<g transform="translate(78 ${100+i*70})"><rect width="30" height="30" rx="8" fill="${i<2?G8:G0}" stroke="${G8}" stroke-width="2.5"/>${i<2?`<path d="M7 15l6 6 11-12" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/>`:''}<text x="46" y="22" font-size="22" font-weight="800" fill="${INK}">${t}</text></g>`).join('')}
</svg>`,
scale:`<svg viewBox="0 0 460 330" width="100%" height="100%">
<rect x="222" y="86" width="16" height="200" rx="8" fill="${G8}"/><path d="M150 292h160" stroke="${G8}" stroke-width="16" stroke-linecap="round"/>
<path d="M65 49L395 131" stroke="${G9}" stroke-width="13" stroke-linecap="round"/>
<path d="M65 49L25 135M65 49L105 135" stroke="${G5}" stroke-width="3"/><path d="M15 135h100a50 18 0 0 1-100 0z" fill="${G3}"/>
<rect x="44" y="105" width="42" height="30" rx="6" fill="${BR}"/><text x="65" y="126" font-size="14" font-weight="900" fill="#fff" text-anchor="middle">10kg</text>
<path d="M395 131L345 225M395 131L445 225" stroke="${G5}" stroke-width="3"/><path d="M335 225h120a60 20 0 0 1-120 0z" fill="${G3}"/>
<rect x="350" y="140" width="90" height="85" rx="8" fill="${BR}"/><text x="395" y="190" font-size="22" font-weight="900" fill="#fff" text-anchor="middle">90kg</text>
<circle cx="230" cy="90" r="15" fill="${O}"/>
<text x="20" y="30" font-size="21" font-weight="900" fill="${G8}">2,000원/kg</text><text x="330" y="290" font-size="21" font-weight="900" fill="${O}">3,000원/kg</text>
</svg>`,
sources:`<svg viewBox="0 0 560 220" width="100%" height="100%">
${[['경매',G8],['소매',O],['날씨',B]].map((s,i)=>`<g transform="translate(${30+i*180} 20)"><circle cx="70" cy="80" r="70" fill="${i==0?G0:i==1?OB:'#E6EFF8'}"/>`+
(i==0?`<g transform="translate(70 80)"><rect x="-34" y="-30" width="50" height="22" rx="6" fill="${BR2}" transform="rotate(-30)"/><rect x="-4" y="-14" width="10" height="56" rx="5" fill="${BR}" transform="rotate(-30)"/><rect x="-36" y="30" width="72" height="12" rx="6" fill="${G8}"/></g>`:
i==1?`<g transform="translate(70 84)"><path d="M-40-30h10l12 46h44l10-32H-22" stroke="${O}" stroke-width="7" fill="none" stroke-linejoin="round" stroke-linecap="round"/><circle cx="-12" cy="28" r="7" fill="${O}"/><circle cx="22" cy="28" r="7" fill="${O}"/>${apple(6,-16,.35)}</g>`:
`<g transform="translate(70 80)"><circle cx="16" cy="-16" r="18" fill="${Y}"/><path d="M-40 14a20 20 0 0 1 14-30 26 26 0 0 1 48 6 16 16 0 0 1 4 30h-56a12 12 0 0 1-10-6z" fill="#fff" stroke="${B}" stroke-width="4"/><path d="M-20 34l-6 12M0 34l-6 12M20 34l-6 12" stroke="${B}" stroke-width="4" stroke-linecap="round"/></g>`)+
`<text x="70" y="190" font-size="24" font-weight="900" fill="${s[1]}" text-anchor="middle">${s[0]}</text></g>`).join('')}
</svg>`,
rewind:`<svg viewBox="0 0 400 320" width="100%" height="100%">
<rect x="70" y="50" width="230" height="230" rx="20" fill="#fff" stroke="${G1}" stroke-width="3"/><rect x="70" y="50" width="230" height="56" rx="20" fill="${G8}"/><rect x="70" y="86" width="230" height="20" fill="${G8}"/>
<rect x="110" y="32" width="12" height="36" rx="6" fill="${G9}"/><rect x="248" y="32" width="12" height="36" rx="6" fill="${G9}"/>
<text x="185" y="88" font-size="22" font-weight="900" fill="#fff" text-anchor="middle">2026. 9</text>
<text x="185" y="210" font-size="88" font-weight="900" fill="${O}" text-anchor="middle">28</text><text x="185" y="252" font-size="18" font-weight="800" fill="${G8}" text-anchor="middle">기준일 · 여기까지만</text>
<g transform="translate(320 120)"><path d="M0 60a50 50 0 1 0-12-60" stroke="${O}" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M-30 -10l18 12 4-22z" fill="${O}"/></g>
</svg>`,
scenario:`<svg viewBox="0 0 440 300" width="100%" height="100%">
<circle cx="70" cy="150" r="30" fill="${G8}"/><text x="70" y="157" font-size="18" font-weight="900" fill="#fff" text-anchor="middle">09/28</text>
<path d="M100 150C180 150 220 60 340 50" stroke="${R2}" stroke-width="10" fill="none" stroke-linecap="round" stroke-dasharray="14 10"/><path d="M100 150H340" stroke="${G5}" stroke-width="10" stroke-linecap="round" stroke-dasharray="14 10"/><path d="M100 150C180 150 220 240 340 250" stroke="${B}" stroke-width="10" fill="none" stroke-linecap="round" stroke-dasharray="14 10"/>
<g font-size="20" font-weight="900"><rect x="346" y="30" width="82" height="40" rx="12" fill="${R2}"/><text x="387" y="57" fill="#fff" text-anchor="middle">상승</text><rect x="346" y="130" width="82" height="40" rx="12" fill="${G5}"/><text x="387" y="157" fill="#fff" text-anchor="middle">보합</text><rect x="346" y="230" width="82" height="40" rx="12" fill="${B}"/><text x="387" y="257" fill="#fff" text-anchor="middle">하락</text></g>
</svg>`,
pair:`<svg viewBox="0 0 420 300" width="100%" height="100%">
<circle cx="110" cy="130" r="40" fill="${BR}"/><path d="M50 260c0-50 30-80 60-80s60 30 60 80z" fill="${G8}"/>
<circle cx="310" cy="130" r="40" fill="#E2B48A"/><path d="M250 260c0-50 30-80 60-80s60 30 60 80z" fill="${O}"/>
<rect x="40" y="20" width="140" height="56" rx="18" fill="#fff" stroke="${G8}" stroke-width="3"/><text x="110" y="55" font-size="18" font-weight="800" fill="${G8}" text-anchor="middle">근거는…</text>
<rect x="240" y="20" width="140" height="56" rx="18" fill="#fff" stroke="${O}" stroke-width="3"/><text x="310" y="55" font-size="18" font-weight="800" fill="${O}" text-anchor="middle">어디서 확인?</text>
</svg>`,
coffee:`<svg viewBox="0 0 300 260" width="100%" height="100%">
<g stroke="${G3}" stroke-width="6" fill="none" stroke-linecap="round"><path d="M110 40c-14 16 14 26 0 44"><animate attributeName="opacity" values=".2;1;.2" dur="2s" repeatCount="indefinite"/></path><path d="M150 30c-14 16 14 26 0 44"><animate attributeName="opacity" values="1;.2;1" dur="2s" repeatCount="indefinite"/></path></g>
<path d="M60 100h160l-18 120H78z" fill="#fff" stroke="${G8}" stroke-width="5"/><path d="M220 120c40 0 40 60-6 60" stroke="${G8}" stroke-width="10" fill="none"/>
<rect x="72" y="120" width="140" height="12" fill="${O}"/><ellipse cx="140" cy="236" rx="100" ry="12" fill="${G1}"/>
</svg>`,
lunch:`<svg viewBox="0 0 300 260" width="100%" height="100%">
<ellipse cx="150" cy="230" rx="120" ry="14" fill="${G1}"/>
<path d="M40 120h220c0 70-50 100-110 100S40 190 40 120z" fill="${G8}"/><ellipse cx="150" cy="120" rx="110" ry="24" fill="#FFF7E8"/>
${apple(110,104,.45)}${apple(160,100,.45,R2)}${leaf(180,110,-160,.4,G5)}
<path d="M210 30l40 90M230 26l36 86" stroke="${BR2}" stroke-width="7" stroke-linecap="round"/>
</svg>`,
sms:`<svg viewBox="0 0 320 380" width="100%" height="100%">
<rect x="70" y="20" width="180" height="340" rx="28" fill="${G9}"/><rect x="82" y="40" width="156" height="300" rx="18" fill="#F4F7F2"/>
<rect x="96" y="70" width="110" height="40" rx="14" fill="#fff"/><rect x="108" y="84" width="80" height="9" rx="4" fill="${G3}"/>
<rect x="120" y="130" width="106" height="84" rx="14" fill="${G8}"/><g fill="#fff" opacity=".8"><rect x="132" y="146" width="80" height="8" rx="4"/><rect x="132" y="164" width="70" height="8" rx="4"/><rect x="132" y="182" width="56" height="8" rx="4"/></g>
<rect x="96" y="232" width="96" height="36" rx="14" fill="#fff"/><rect x="108" y="246" width="60" height="8" rx="4" fill="${G3}"/>
<circle cx="250" cy="70" r="26" fill="${O}"/><text x="250" y="78" font-size="22" font-weight="900" fill="#fff" text-anchor="middle">1</text>
</svg>`,
api:`<svg viewBox="0 0 520 240" width="100%" height="100%">
<rect x="20" y="40" width="180" height="150" rx="16" fill="${G9}"/><text x="40" y="80" font-size="15" fill="${G3}" font-family="monospace">GET /retail</text><text x="40" y="106" font-size="15" fill="${O2}" font-family="monospace">region=서울</text><text x="40" y="132" font-size="15" fill="${O2}" font-family="monospace">item=토마토</text><text x="40" y="158" font-size="15" fill="#fff" font-family="monospace">▌</text>
<path d="M214 115h70" stroke="${O}" stroke-width="8" stroke-dasharray="12 8" stroke-linecap="round"><animate attributeName="stroke-dashoffset" from="40" to="0" dur="1s" repeatCount="indefinite"/></path><path d="M276 100l20 15-20 15z" fill="${O}"/>
<rect x="306" y="50" width="120" height="140" rx="12" fill="#fff" stroke="${G8}" stroke-width="4"/><path d="M396 50v30h30" fill="${G1}" stroke="${G8}" stroke-width="4"/><rect x="326" y="100" width="80" height="10" rx="5" fill="${G3}"/><rect x="326" y="120" width="60" height="10" rx="5" fill="${G3}"/><rect x="326" y="140" width="70" height="10" rx="5" fill="${G3}"/>
<text x="366" y="220" font-size="17" font-weight="800" fill="${G8}" text-anchor="middle">파일 저장</text><text x="110" y="220" font-size="17" font-weight="800" fill="${G8}" text-anchor="middle">조회 조건</text>
</svg>`,
folder:`<svg viewBox="0 0 360 280" width="100%" height="100%">
<path d="M40 70h100l20 24h160v150H40z" fill="${G5}"/>
<rect x="80" y="40" width="130" height="160" rx="10" fill="#fff" stroke="${G1}" stroke-width="3" transform="rotate(-8 145 120)"/>
<rect x="150" y="34" width="130" height="160" rx="10" fill="#fff" stroke="${G1}" stroke-width="3" transform="rotate(6 215 114)"/>
<g transform="rotate(6 215 114)" font-size="15" font-weight="800"><text x="166" y="70" fill="${O}">질문 양식</text><rect x="166" y="84" width="90" height="8" rx="4" fill="${G3}"/><rect x="166" y="100" width="70" height="8" rx="4" fill="${O2}"/><rect x="166" y="116" width="84" height="8" rx="4" fill="${G3}"/></g>
<path d="M30 120h300l-20 130H50z" fill="${G8}"/><text x="180" y="200" font-size="22" font-weight="900" fill="#fff" text-anchor="middle">다음 업무에서 다시 쓰기</text>
</svg>`,
grade:`<svg viewBox="0 0 440 260" width="100%" height="100%">
<g transform="translate(30 60)"><rect width="170" height="140" rx="16" fill="#fff" stroke="${G8}" stroke-width="4"/><rect width="170" height="40" rx="16" fill="${G8}"/><rect y="24" width="170" height="16" fill="${G8}"/><text x="85" y="28" font-size="20" font-weight="900" fill="#fff" text-anchor="middle">상품</text>${apple(55,92,.7)}${apple(115,92,.7)}</g>
<g transform="translate(240 60)"><rect width="170" height="140" rx="16" fill="#fff" stroke="${O2}" stroke-width="4"/><rect width="170" height="40" rx="16" fill="${O2}"/><rect y="24" width="170" height="16" fill="${O2}"/><text x="85" y="28" font-size="20" font-weight="900" fill="#fff" text-anchor="middle">중품</text>${apple(55,96,.55,'#C9786C')}${apple(115,96,.55,'#C9786C')}</g>
</svg>`,
index100:`<svg viewBox="0 0 460 260" width="100%" height="100%">
<path d="M40 210H430" stroke="${G1}" stroke-width="3"/><path d="M40 150H430" stroke="${G1}" stroke-width="2" stroke-dasharray="6 6"/>
<text x="20" y="156" font-size="16" font-weight="800" fill="${G8}" text-anchor="middle">100</text>
<path d="M60 150L160 140 260 120 380 84" stroke="${O}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="60" cy="150" r="10" fill="${G8}"/><circle cx="380" cy="84" r="12" fill="${O}"/>
<rect x="320" y="20" width="110" height="44" rx="12" fill="${O}"/><text x="375" y="49" font-size="20" font-weight="900" fill="#fff" text-anchor="middle">110 = +10%</text>
<text x="60" y="240" font-size="15" font-weight="800" fill="${G8}" text-anchor="middle">첫날</text>
</svg>`
};
window.ILL=ILL;
function mount(root){(root||document).querySelectorAll('[data-ill]').forEach(el=>{if(!el.dataset.done){el.innerHTML=ILL[el.dataset.ill]||'';el.dataset.done=1}})}
window.mountIll=mount;
document.addEventListener('DOMContentLoaded',()=>mount());
})();
