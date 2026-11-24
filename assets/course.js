/* 과정 데이터: 실습 파일, 팝업(D0~D10), 편집형 프롬프트(P1~P11) */
window.COURSE = (function(){
const FILES = {
  'zip':{nm:'서울청과_수강생용_실습데이터.zip',ds:'파일 01·02·05·06 묶음',href:'files/서울청과_수강생용_실습데이터.zip'},
  '01':{nm:'01_A법인_토마토경매.xlsx',ds:'11,639행 · A법인 2026-09-14~10-17 거래 1건 = 1행 · 토마토·대추빨강·방울토마토 · 상자당 가격·상자당 kg·거래무게·명절구분',href:'files/01_A법인_토마토경매.xlsx'},
  '02':{nm:'02_법인별_토마토경매.xlsx',ds:'15,764행 · A~E법인 2026년 9~10월 토마토 · 일자×산지×품종×등급×포장별 집계 · 최고·최저·평균가(원/상자)·총거래금액',href:'files/02_법인별_토마토경매.xlsx'},
  '03':{nm:'03_가상소매_서울_토마토.xlsx',ds:'서울 토마토 상품·중품 · 원/1kg · 2026-09-01~10-16 조사일 · 09/30 중품 공백 · 교육용 가상 자료',href:'files/03_가상소매_서울_토마토.xlsx',virt:1},
  '04':{nm:'04_가상날씨_인제.xlsx',ds:'인제(211) 예시 · 평균기온·일강수량 · 2026-09-01~10-17 매일 · 교육용 가상 자료',href:'files/04_가상날씨_인제.xlsx',virt:1},
  '05':{nm:'05_AI초안_오류찾기.xlsx',ds:'9행 · AI가 만든 것처럼 꾸민 시세표 초안 · 원본 01과 나란히 비교',href:'files/05_AI초안_오류찾기.xlsx'},
  '06':{nm:'06_M4_기준일까지.xlsx',ds:'A법인 토마토 5kg·대추빨강 3kg 일별 반입물량·가격 · 2024-01-03 ~ 2026-09-28까지만 · 명절일정',href:'files/06_M4_기준일까지.xlsx'}
};
const fileRow=(k,hot)=>{const f=FILES[k];return `<div class="file ${hot?'hot':''}"><span class="badge v">${f.virt?'교육용 가상 자료':'실제 자료 기반 · 수치 일부 변경'}</span><div><div class="nm">${f.nm}</div><div class="ds">${f.ds}</div></div><a class="btn sm ${hot?'orange':'ghost'}" href="${f.href}" download>파일 받기</a></div>`};
const need=(names,attach)=>`<div class="need"><div><div class="lb">지금 필요한 파일 · AI 채팅에 첨부할 파일명</div><div class="fn">${names}</div></div><div class="lb">${attach||'이미 받았다면 파일명만 확인하고 닫으세요'}</div></div>`;
const condBox=(t)=>`<div class="cond"><span>${t}</span><button class="btn sm orange" data-copy="${t.replace(/"/g,'&quot;')}">조회 조건 복사</button></div>`;
const steps4=`<div class="steps4"><div><b>1</b>조회 조건 복사</div><div><b>2</b>공식 사이트 열기</div><div><b>3</b>다운로드</div><div><b>4</b>파일 확인</div></div>`;

const D5 = `${condBox('서울 / 채소류 / 토마토 / 토마토 / 상품 / 2026-09-21~2026-10-02 / 일별 / 원래 조사 단위(1kg) 유지')}${steps4}
<ol><li><a href="https://www.kamis.or.kr/customer/info/retail/period.do" target="_blank" rel="noopener"><b>KAMIS 간편가격정보 소매가격</b></a>을 PC 브라우저에서 엽니다. 가격 구분이 <b>소매가격</b>인지 확인합니다.</li>
<li>기간을 2026-09-21~2026-10-02로 입력합니다. 부류 <b>채소류</b> → 품목 토마토 → 품종 토마토 → 등급 상품 → 지역 서울을 선택합니다.</li>
<li><b>검색하기</b>를 누르고 결과 위의 품목·품종·등급·지역·단위를 확인합니다. 토마토 소매 조사 단위는 <b>1kg</b>입니다.</li>
<li><b>엑셀다운로드</b>로 저장합니다. 필요하면 <a href="https://www.kamis.or.kr/customer/price/retail/period.do" target="_blank" rel="noopener">KAMIS 세부가격정보 소매가격 기간별</a>에서 같은 조건으로 <b>데이터저장</b>을 씁니다.</li>
<li>원본은 보존하고, 복사본에 조사일·지역·품목·품종·등급·가격 단위·가격을 남깁니다. 날짜가 열 방향이면 날짜 하나당 한 행으로 펼치고, 대시나 빈칸은 결측으로 둡니다. 예시 이름: <code>실제_KAMIS_서울_토마토_상품_20260921-20261002</code> · 이 파일을 경매 01과 함께 AI 채팅에 올립니다.</li>
<li>추석 연휴(09/24~26)와 주말은 조사가 없어 빈 날짜가 생깁니다. 결과가 비면 선택 조건부터 확인하고, 바로 수업을 이어갈 때는 가상 소매 파일 03을 씁니다.</li></ol>
<div class="warn"><b>단위가 같아도 같은 상품은 아닙니다.</b> 경매는 5kg 상자 가격 ÷ 5 = 원/kg, 소매는 처음부터 원/1kg입니다. 하지만 경매는 도매 단계·출하자 선별 등급이고, 소매는 마트 판매가·KAMIS 조사 등급이라 가격 수준 차이에는 유통비용이 들어 있습니다. 그래서 수준은 나란히 보되, <b>흐름</b>은 같은 날짜를 각각 100으로 놓아 비교합니다.</div>`;
const D6 = `${condBox('종관기상관측(ASOS) / 일 자료 / 인제(211) / 2026-09-21~2026-10-02 / 평균기온·일강수량')}${steps4}
<ol><li><a href="https://data.kma.go.kr/data/grnd/selectAsosRltmList.do?pgmNo=36" target="_blank" rel="noopener"><b>기상자료개방포털 종관기상관측(ASOS)</b></a>을 열고 <b>자료</b> 탭을 선택합니다. 경로: 데이터 → 기상관측 → 지상 → 종관기상관측(ASOS)</li>
<li>자료형태 <b>일</b>, 기간 2026-09-21~2026-10-02를 설정합니다.</li>
<li>지점에서 강원 영서의 <b>인제(211)</b>를 선택합니다. 산지가 다르면 춘천(101)·철원(95)·홍천(212) 중 가까운 곳을 고릅니다. <a href="https://data.kma.go.kr/tmeta/stn/selectStnDetail.do?isSelectStn=Y&pgmNo=82&stdStnNo=211" target="_blank" rel="noopener">인제 공식 지점정보</a></li>
<li>요소 선택이 가능하면 <b>평균기온·일강수량</b>을 고르고 <b>조회</b>를 누릅니다.</li>
<li><b>CSV</b> 또는 <b>Excel</b>로 저장합니다. 로그인 화면이 뜨면 로그인 후 다시 받습니다. 한글이 깨지면 Excel 형식으로 다시 받습니다.</li>
<li>복사본에 날짜·지점번호·지점명·평균기온(℃)·일강수량(mm)을 남기고, 날짜를 YYYY-MM-DD로 맞춥니다. 강수량 공백과 숫자 0을 구분합니다. 예시 이름: <code>실제_ASOS_인제_20260921-20261002</code> · 경매 01, KAMIS 소매 파일과 함께 올립니다.</li>
<li>접속이나 로그인이 막히면 가상 날씨 파일 04로 이어갑니다.</li></ol>
<div class="warn">날씨는 <b>매일</b>, 경매는 <b>경매일</b>에만 값이 있습니다. 추석 연휴 중에 온 비는 경매일 그래프에 바로 보이지 않으므로 날짜를 맞출 때 빠뜨리지 않습니다. 실습 경매 숫자는 교육용으로 일부 바꾼 값이므로 실제 시세의 원인을 단정하지 않습니다.</div>`;
const D4V = need('01 + 03_가상소매_서울_토마토.xlsx + 04_가상날씨_인제.xlsx','공공 사이트 접속·로그인이 막힐 때만 사용합니다')+`<div class="files">${fileRow('01')}${fileRow('03',1)}${fileRow('04',1)}</div><p>가상 파일로 바꿔도 질문은 그대로 씁니다. 첨부 파일명만 03·04로 바꿔 확인하세요.</p>`;

const K=(t)=>`<b style="color:#C0392B">${t}</b>`;
const fi=(lb,attr,w)=>`<label style="display:flex;flex-direction:column;gap:3px;font-size:13px;font-weight:700;color:var(--ink2)">${lb}<input ${attr} style="width:${w||'100%'};padding:7px 9px;border:1.5px solid var(--line);border-radius:8px;font-size:14.5px;font-family:inherit"></label>`;
const grid=(c)=>`<div style="display:grid;grid-template-columns:${c};gap:8px;margin:6px 0">`;
const outBox=(k)=>`<div class="cond" style="align-items:flex-start;margin-top:8px"><span data-apiout="${k}" style="font-size:13px;font-weight:600;word-break:break-all;line-height:1.5;color:var(--muted)">인증키를 넣으면 주소가 여기에 만들어집니다.</span><div style="display:flex;flex-direction:column;gap:6px"><button class="btn sm orange" data-apiopen="${k}">자료 가져오기 ↗</button><button class="btn sm ghost" data-apicopy="${k}">주소 복사</button></div></div>`;
const API_FORM=`<h4 style="margin:14px 0 6px">2·3 · 키·날짜·상품 넣고 [자료 가져오기]</h4>
<p style="font-size:15px">칸을 채우면 주소가 <b>자동으로</b> 만들어지고, <b>[자료 가져오기]</b>를 누르면 새 탭에 자료가 바로 나옵니다. 다음부터는 <b>날짜나 상품 코드만 바꾸고</b> 다시 누르면 됩니다.</p>
<div style="display:flex;gap:10px;align-items:center;background:var(--g50);border-radius:10px;padding:8px 12px;margin-top:6px"><span style="flex:1;font-size:14.5px">이 과정을 <b>내 PC 프로그램·엑셀 버튼</b>으로 만들거나 <b>AI에게 바로 가져오게</b> 하려면</span><button class="btn sm orange" data-pop="D7P">참고 · AI 프롬프트 보기</button></div>
<div data-apiform="k" style="border:1.5px solid var(--line);border-radius:12px;padding:10px 12px;margin-top:8px">
<b style="font-size:15px">① KAMIS 소매가격</b>
${grid('1fr 1fr')}${fi('인증키','data-f="key" placeholder="KAMIS 인증키" autocomplete="off"')}${fi('신청한 아이디','data-f="id" placeholder="KAMIS 아이디" autocomplete="off"')}</div>
${grid('1fr 1fr')}${fi('시작일','data-f="s" type="date" value="2026-09-21"')}${fi('종료일','data-f="e" type="date" value="2026-10-02"')}</div>
${grid('repeat(5,1fr)')}${fi('부류','data-f="cat" value="200"')}${fi('품목','data-f="item" value="225"')}${fi('품종','data-f="kind" value="00"')}${fi('등급','data-f="rank" value="04"')}${fi('지역','data-f="cty" value="1101"')}</div>
<p style="font-size:13px;color:var(--muted)">기본값 = 채소류(200) · 토마토(225) · 토마토(00) · 상품(04, 중품은 05) · 서울(1101). 다른 상품·지역 코드는 <a href="https://www.kamis.or.kr/customer/reference/openapi_list.do" target="_blank" rel="noopener">KAMIS Open API</a>의 <b>코드표</b>에서 찾아 바꿉니다.</p>
${outBox('k')}</div>
<div data-apiform="a" style="border:1.5px solid var(--line);border-radius:12px;padding:10px 12px;margin-top:10px">
<b style="font-size:15px">② 기상청 ASOS 일 자료</b>
${grid('2fr 1fr 1fr 1fr')}${fi('인증키 (Encoding·Decoding 모두 가능)','data-f="key" placeholder="공공데이터포털 인증키" autocomplete="off"')}${fi('시작일','data-f="s" type="date" value="2026-09-21"')}${fi('종료일','data-f="e" type="date" value="2026-10-02"')}${fi('지점 번호','data-f="stn" value="211"')}</div>
<p style="font-size:13px;color:var(--muted)">지점 예: 인제 211 · 춘천 101 · 철원 95 · 홍천 212. 종료일은 <b>어제</b>까지만 됩니다.</p>
${outBox('a')}</div>
`;
const D7 = `<p><b>수업 실습에는 필요 없습니다.</b> 같은 자료를 자주 받아야 할 때, 사이트에서 매번 조건을 고르지 않고 <b>원하는 날짜·상품을 넣고 버튼 한 번</b>으로 받는 방법입니다.</p>
<div class="steps4"><div><b>1</b>인증키 받기 (한 번만)</div><div><b>2</b>키·날짜·상품 넣기</div><div><b>3</b>[자료 가져오기]</div><div><b>4</b>AI에게 표로 정리</div></div>
<h4 style="margin:14px 0 6px">1 · 인증키 받기 (처음 한 번만)</h4>
<ul><li><b>KAMIS 소매가격</b>: <a href="https://www.kamis.or.kr/customer/reference/openapi_list.do" target="_blank" rel="noopener">KAMIS Open API</a> → 회원가입·로그인 → Open API 이용 신청 → <b>인증키</b>와 <b>신청한 아이디</b>를 메모합니다.</li>
<li><b>기상청 날씨</b>: <a href="https://www.data.go.kr/data/15059093/openapi.do" target="_blank" rel="noopener">공공데이터포털 · 기상청 ASOS 일자료 조회서비스</a> → 회원가입·로그인 → <b>활용신청</b> → 마이페이지의 <b>일반 인증키(Encoding)</b>를 메모합니다. 기상자료개방포털과는 다른 계정입니다.</li></ul>
${API_FORM}<h4 style="margin:14px 0 6px">4 · AI에게 표로 정리시키기</h4>
<p style="font-size:15px">화면에 글자가 가득 나오면 <b>Ctrl+A → Ctrl+C</b>로 복사해 AI 채팅에 붙여넣고 이렇게 요청합니다.</p>
${condBox('이 결과에서 날짜와 가격(날씨는 날짜·평균기온·일강수량)만 표로 정리해서 엑셀 파일로 만들어 줘. 빈 값은 비워 둬.')}
<div class="warn"><b>계속 쓰기</b> 매번 위 칸에서 날짜·코드만 바꾸고 [자료 가져오기]를 누릅니다. 자주 쓰는 조건은 [주소 복사]로 메모장에 모아 두면, 다음엔 주소창에 붙여넣기만 하면 됩니다(기간은 주소 속 날짜만 고치기).<br><b>오류가 나오면</b> 신청 직후에는 키가 아직 안 켜졌을 수 있습니다(몇 시간~하루). 키 앞뒤 공백도 확인합니다.<br><b>주의</b> 키가 들어간 주소는 다른 사람에게 보내거나 화면에 띄우지 않습니다. 이 화면은 키를 저장하지 않으니, 창을 닫으면 다시 넣습니다.</div>`;

const esc=(t)=>t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const pBox=(t)=>`<div class="cond" style="align-items:flex-start"><span style="white-space:pre-wrap;font-size:13.5px;font-weight:500;line-height:1.55">${esc(t)}</span><button class="btn sm orange" data-copy="${esc(t)}">프롬프트 복사</button></div>`;
const P_SYS=`나는 서울청과 경매담당자이고 코딩을 잘 모릅니다. 아래 두 공공 API로 자료를 받아 엑셀 파일로 저장하는 Windows용 프로그램을 만들어 주세요.
- KAMIS Open API · 일별 품목별 소매가격(기간 설정, action=periodProductList)
- 공공데이터포털 · 기상청 지상(종관, ASOS) 일자료 조회서비스(getWthrDataList)

[조건]
1. 실행하면 시작일·종료일, KAMIS 부류·품목·품종·등급·지역 코드, 기상 지점 번호를 물어보고, Enter만 누르면 기본값을 씁니다.
   기본값: 2026-09-21~2026-10-02 / 채소류 200 · 토마토 225 · 품종 00 · 상품 04 · 서울 1101 / 인제 211
2. 인증키는 코드에 적지 말고, 처음 한 번만 입력받아 내 PC에만 저장합니다.
3. 결과는 시트 두 개로 저장합니다. 소매: 날짜·지역·품목·품종·등급·단위·가격 / 날씨: 날짜·지점·평균기온·일강수량. 빈 값은 0으로 채우지 말고 비워 둡니다.
4. 파일 이름은 "공공자료_시작일-종료일.xlsx"로 합니다.
5. 설치부터 더블클릭 실행까지 처음 하는 사람도 따라 할 수 있게 단계별로 알려 주세요.
6. 매일 아침 8시에 자동으로 실행되도록 Windows 작업 스케줄러 설정 방법도 알려 주세요.`;
const P_XL=`엑셀만 써서 공공 API 자료를 받아 오고 싶습니다. 엑셀 "데이터 → 웹에서"(파워 쿼리)로 아래 주소의 JSON 결과를 표로 불러오는 방법을 클릭 순서대로 알려 주세요.

[주소] (여기에 [주소 복사]로 복사한 주소를 붙여넣기)

[조건]
1. KAMIS는 날짜·지역·품목·품종·등급·가격, 기상청은 날짜·지점·평균기온·일강수량 열만 남깁니다.
2. 시작일·종료일·품목 코드·지점 번호를 시트의 칸에 적어 두고, 그 칸만 바꾼 뒤 [모두 새로 고침]을 누르면 새 자료가 오도록 만들어 주세요.
3. 인증키도 시트의 한 칸에 따로 두어, 파일을 남에게 보낼 때 지울 수 있게 해 주세요.`;
const P_AI=`아래 조건으로 공공 자료를 직접 조회해서 표로 정리해 주세요.
- 출처: KAMIS 소매가격(kamis.or.kr) / 기상청 기상자료개방포털 종관기상관측(ASOS)
- 기간: 2026-09-21 ~ 2026-10-02
- 상품: 서울 · 채소류 · 토마토 · 토마토 · 상품 (원/1kg, 원래 조사 단위 유지)
- 날씨: 인제(211) · 일 자료 · 평균기온 · 일강수량

[규칙]
1. 실제로 열어 본 화면이나 자료의 숫자만 쓰고, 찾지 못한 날짜는 "확인 못 함"으로 둡니다. 추정하거나 앞뒤 값으로 채우지 않습니다.
2. 표 아래에 숫자를 가져온 출처 주소와 조회 조건을 적어 주세요.
3. 직접 조회할 수 없다면 그렇다고 말하고, 내가 사이트에서 받는 방법을 알려 주세요.`;
const D7P = `<p>2·3단계의 [자료 가져오기]를 <b>내 방식대로 고정</b>해 두는 세 가지 방법입니다. 프롬프트를 복사해 AI 채팅에 붙여넣고, 날짜·상품만 바꿔 쓰세요.</p>
<h4 style="margin:14px 0 6px">A · 내 PC 프로그램으로 만들기 <span style="font-size:13px;color:var(--muted);font-weight:600">매일 자동 실행까지</span></h4>
${pBox(P_SYS)}
<h4 style="margin:14px 0 6px">B · 엑셀 [새로 고침] 버튼으로 만들기 <span style="font-size:13px;color:var(--muted);font-weight:600">프로그램 설치 없이</span></h4>
${pBox(P_XL)}
<h4 style="margin:14px 0 6px">C · AI에게 바로 가져오게 하기 <span style="font-size:13px;color:var(--muted);font-weight:600">웹 검색·사이트 열기가 되는 AI</span></h4>
${pBox(P_AI)}
<div class="warn"><b>A·B</b>는 AI가 만든 코드·순서를 따라 하는 방법이라 인증키(1단계)가 필요합니다. 키는 프롬프트에 직접 쓰지 말고, 실행할 때 내 PC에서만 넣습니다.<br><b>C</b>는 키 없이 되지만 AI가 숫자를 잘못 읽거나 지어낼 수 있습니다. 결과의 날짜 두세 개를 KAMIS·기상청 화면과 꼭 대조합니다.</div>
<div style="margin-top:12px"><button class="btn sm ghost" data-pop="D7">← API로 자동 받기로 돌아가기</button></div>`;

const POPUPS = {
 D0:{t:'실습 자료 모음',b:'v',h:()=>need('01_A법인_토마토경매.xlsx','지금은 파일 01만 있으면 됩니다')+`<div class="files">${fileRow('zip')}${fileRow('01',1)}${['02','05','06','03','04'].map(k=>fileRow(k)).join('')}</div><div class="warn">01·02·05·06은 <b>실제 경매 자료에 근거한 교육용 데이터</b>입니다. 법인명은 A~E법인으로 바꾸고 가격·물량 일부를 변경했으므로 실제 시세로 쓰지 않습니다. 03·04는 M3에서 공공 사이트가 막힐 때 쓰는 가상 파일입니다. 이후 가격(07)과 강사용 확인표(08)는 강사가 따로 보관합니다.</div>`},
 D1:{t:'경매 파일 받기',b:'v',h:()=>need('01_A법인_토마토경매.xlsx')+`<div class="files">${fileRow('01',1)}</div><p>예시: 품목 <b>토마토</b>, 품종 <b>토마토(일반)·5kg 상자</b>. 실습에서는 <b>대추빨강(3kg)</b>이나 <b>방울토마토(5kg)</b>로 바꿔 봅니다. AI 채팅의 첨부 목록에 위 파일명이 그대로 보이는지 확인합니다.</p><div class="warn"><b>등급</b> 열은 출하자가 정한 선별·크기 코드(1~6, S·M·L 등)입니다. 같은 코드라도 출하자가 다르면 같은 상품이라고 보지 않습니다. 완전히 같은 행은 별도 거래이므로 지우지 않습니다.</div>`},
 D2:{t:'오류 찾기 자료',b:'v',h:()=>need('01_A법인_토마토경매.xlsx + 05_AI초안_오류찾기.xlsx')+`<div class="files">${fileRow('01',1)}${fileRow('05',1)}</div><p>원본에서는 <b>토마토(일반)·5kg</b>, <b>09/23~10/10</b>만 대조합니다. 오류 위치와 계산 답은 강사 확인 때 공개합니다.</p>`},
 D3:{t:'법인 비교 파일',b:'v',h:()=>need('02_법인별_토마토경매.xlsx (실습 2) · 01_A법인_토마토경매.xlsx (실습 3)')+`<div class="files">${fileRow('02',1)}${fileRow('01',1)}</div><ul><li>02로 2026년 9~10월 토마토 <b>전체</b>와 <b>강원·5kg·특·상자</b> 조건을 각각 비교합니다.</li><li>02의 <b>평균가_원상자</b>는 물량을 반영하지 않은 값입니다. 물량가중 평균은 총거래금액 ÷ 거래무게로 계산합니다.</li><li>01로 A법인 토마토 5kg의 09/24·09/28 두 날짜 물량가중 평균을 계산합니다.</li></ul>`},
 D4:{t:'소매·날씨 자료',b:'o',tabs:[['KAMIS 소매가격 받기',()=>D5],['기상청 인제 관측자료 받기',()=>D6],['막히면 · 가상 파일',()=>D4V]]},
 D4V:{t:'막히면 · 가상 소매·날씨 파일',b:'x',h:()=>D4V},
 D4P:{t:'M3 실습 파일 · 경매·소매·날씨',b:'v',h:()=>need('01_A법인_토마토경매.xlsx + 03_가상소매_서울_토마토.xlsx + 04_가상날씨_인제.xlsx','세 파일을 한 채팅에 함께 첨부합니다')+`<div class="files">${fileRow('01',1)}${fileRow('03',1)}${fileRow('04',1)}</div><div class="warn">03·04는 이 과정을 위해 미리 준비한 <b>교육용 가상 자료</b>입니다. 실제 KAMIS·기상청 자료를 직접 내려받는 방법은 부록 A6에 있습니다.</div>`},
 D5:{t:'KAMIS 서울 소매가격 받기',b:'o',h:()=>D5},
 D6:{t:'기상청 인제 일 관측자료 받기',b:'o',h:()=>D6},
 D7:{t:'참고 · API로 자동 받기',b:'o',h:()=>D7},
 D7P:{t:'참고 · AI로 만들기·가져오기 프롬프트',b:'o',h:()=>D7P},
 D8:{t:'기준일까지의 자료',b:'v',h:()=>need('06_M4_기준일까지.xlsx','반드시 새 AI 채팅에서 이 파일만 올립니다')+`<div class="files">${fileRow('06',1)}</div><ul><li>기준일은 <b>2026-09-28</b>(추석 연휴 뒤 첫 경매일)로 고정합니다.</li><li>M1~M3에서 쓴 01·02(09/29 이후 거래 포함)는 다시 올리지 않습니다. 이후 가격이 섞이면 당시의 판단을 연습할 수 없습니다.</li><li>날짜를 바꾸는 연습은 과거 사례를 찾는 범위에만 적용합니다.</li></ul>`},
 D9:{t:'이후 가격 보기',b:'d',h:()=>`<div style="text-align:center;padding:4px 0"><div data-ill="rewind" style="height:140px"></div><h3 style="color:var(--g900);margin:6px 0">답을 먼저 적은 뒤에 공개합니다</h3></div><p style="font-size:15px">A법인 토마토(일반) 5kg 상자 · 원/kg = 거래금액 ÷ 반입물량 (07 이후가격 공개용 파일 기준)</p><table class="tb"><tr><th>날짜</th><th>원/kg</th><th>반입 t</th><th>09/28(3,046원) 대비</th></tr><tr><td>09/29(화)</td><td class="r"><b>3,462</b></td><td class="r">47.0</td><td class="r">+13.7%</td></tr><tr><td>09/30(수)</td><td class="r"><b>2,539</b></td><td class="r">33.6</td><td class="r">−16.6%</td></tr><tr><td>10/01(목)</td><td class="r"><b>2,937</b></td><td class="r">39.5</td><td class="r">−3.6%</td></tr><tr><td>10/02(금)</td><td class="r"><b>2,825</b></td><td class="r">39.6</td><td class="r">−7.3%</td></tr></table><div style="display:flex;gap:10px;align-items:center;margin-top:12px"><button class="btn orange" data-fill27>정답 입력하고 그래프에 반영</button><span class="src">27번 입력 칸 네 개에 숫자가 들어가고 주황 점선이 이어집니다.</span></div><div class="warn">09/29에 반짝 올랐다가(+13.7%) 다음 날 다시 내렸고, 10/02까지 09/28보다 낮은 2,500~2,900원대에 머물렀습니다. 반입물량은 76.8t에서 30~40t대로 줄었습니다. 26-1에서 예상한 값과 비교해 보세요. 교육용으로 일부 바꾼 숫자입니다.</div>`},
 D10:{t:'근거 파일과 점검표',b:'v',h:()=>need('06_M4_기준일까지.xlsx + 내가 만든 결과')+`<div class="files">${fileRow('06',1)}</div><ul class="check" style="margin-top:12px"><li>원본 수치: 브리핑의 숫자를 06에서 날짜·열로 다시 찾았나요?</li><li>비교 조건: 품종·상자당 kg·등급·산지를 적었나요?</li><li>사실과 예상: 확인한 사실과 앞으로 볼 조건을 나눠 썼나요?</li><li>추가 확인: 다음에 확인할 자료를 적었나요?</li><li>전화·문자에는 <b>09/28까지의 사실만</b> 썼나요?</li></ul>`}
};

const C={o:'#EE7A2B',g:'#1F5A36',b:'#3C7DB8',p:'#8A5BB8',r:'#D9483B',y:'#B8860B'};
const T = {
 P1:'첨부한 경매 자료에서 {item}의 {period} 날짜별 시세표와 그래프를 만들어 주세요. kg당 가격은 거래금액 합계 ÷ 거래무게 합계로 계산해 주세요. 가격과 물량의 단위를 적고 자료가 없는 날짜는 표시해 주세요.',
 P2:'{date}의 {val}을 원본과 대조해 주세요. {unit}이 맞는지 확인하고 원본 값과 계산을 보여 주세요.',
 P3:'첨부한 법인별 자료에서 {item}의 {period} 거래를 찾아 {corp}별 가격·물량을 표와 그래프로 보여 주세요. kg당 가격은 거래금액 합계 ÷ 거래무게 합계로 계산하고, 가격과 물량 단위를 표시해 주세요.',
 P4:'{date} 거래 중 {kind}·{grade}·{origin}·{box}가 같은 거래만 골라 {corp}를 비교해 주세요. 적용한 조건과 법인별 거래 건수·물량을 표시해 주세요.',
 P5:'{item}의 {date} 자료에서 거래금액과 거래무게 단위를 확인해 주세요. 총 거래금액을 총 거래무게로 나눠 평균가격을 계산하고 사용한 값과 계산식을 보여 주세요. 필요한 값이 빠져 있으면 알려 주세요.',
 P6:'경매와 소매 자료의 {kind}·{grade}·{size}를 비교해 주세요. 무게가 확인되는 항목만 {unit}로 바꾸고 확인이 어려운 항목은 표시해 주세요.',
 P7:'{period} 중 두 가격이 있는 {start}을 각각 100으로 맞춰 가격 흐름을 보여 주세요. 가격 단위는 각각 표시하고, {origin} 날씨를 날짜별로 정리해 주세요. 빠진 값은 공백으로 두세요.',
 P8:'{base}까지의 자료에서 {cond}이 비슷한 과거 사례를 찾아 주세요. 날짜와 원본 숫자를 적고 확인된 사실과 가능한 설명을 나눠 주세요.',
 P9:'{fact}과 {more}를 토대로 오를 때·비슷할 때·내릴 때의 조건을 한 줄씩 적어 주세요. 각 조건을 어디에서 확인할지도 적어 주세요.',
 P10:'출하자에게 설명할 한 장 브리핑을 써 주세요. {fact}, {cond}, {more}을 이 순서로 쓰고 숫자와 조건을 유지해 주세요.',
 P11:'아래 내용을 {fmt}로 바꿔 주세요. {len} 안에서 확인한 사실과 앞으로 볼 조건을 구분해 주세요.\n\n{paste}',
 'P1+P2':'첨부한 경매 자료에서 {item}의 {period} 날짜별 시세표와 그래프를 만들어 주세요. kg당 가격은 거래금액 합계 ÷ 거래무게 합계로 계산하고 단위를 적어 주세요. 자료가 없는 날짜와 명절 전 거래는 표시하고, {date} 값은 원본 값과 계산식도 함께 보여 주세요.',
 'P3+P4':'첨부한 법인별 자료에서 {date} 거래 중 {kind}·{grade}·{origin}·{box}가 같은 거래만 골라 {corp}의 가격·물량을 표와 그래프로 비교해 주세요. kg당 가격은 거래금액 합계 ÷ 거래무게 합계로 계산하고, 적용한 조건과 법인별 거래 건수를 함께 보여 주세요.',
 'P6+P7':'첨부한 경매·소매·날씨 자료로 {period} 흐름을 한 화면에 보여 주세요. 경매 가격은 {unit}로 바꾸고, 두 가격이 모두 있는 {start}을 각각 100으로 맞춰 주세요. {origin} 날씨(평균기온·강수량)를 함께 표시하고, 빠진 값은 공백으로 두세요.',
 'P8+':'{base}까지의 자료에서 {cond}이 비슷한 과거 사례를 찾고, 그 뒤 일주일 동안 가격과 반입물량이 어떻게 움직였는지 날짜와 원본 숫자로 보여 주세요. 확인된 사실과 가능한 설명을 나눠 주세요.',
 'P11+':'아래 브리핑을 두 가지로 바꿔 주세요. ① {len}로 말할 전화 설명 ② {len2} 문자 메시지. 두 글의 숫자와 조건은 같게 하고, 확인한 사실과 앞으로 볼 조건을 구분해 주세요.\n\n{paste}'
};
const GENERIC = {item:'[품목·품종]',period:'[기간]',date:'[날짜]',val:'[의심되는 값]',unit:'[확인할 단위]',corp:'[법인]',kind:'[품종]',grade:'[등급]',size:'[크기]',box:'[상자당 무게]',start:'[공통 시작일]',origin:'[산지]',base:'[기준일]',cond:'[볼 조건]',fact:'[확인한 사실]',more:'[더 확인할 내용]',fmt:'[전화 설명 또는 문자]',len:'[분량]',len2:'[문자 분량]',paste:'[검토한 브리핑 붙여넣기]'};

const BRIEF = `[확인한 사실] A법인 토마토 5kg 기준, 추석 연휴 뒤 첫 경매(9/28) 가격은 3,046원/kg으로 추석 직전(9/24) 5,033원/kg보다 39% 낮았습니다. 같은 기간 반입물량은 25.8t에서 76.8t으로 약 3배 늘었습니다.\n[앞으로 볼 조건] 연휴 동안 쌓인 물량이 빠지면 회복할 수 있고(지난 2년은 연휴 뒤 1주 안에 회복), 반입이 계속 많으면 약세가 이어질 수 있습니다.\n[더 확인할 내용] 다음 경매일의 반입물량과 같은 5kg 상자의 경매가격을 확인한 뒤 출하 시점을 다시 상의드리겠습니다.`;

const PRACTICE = {
 s04:{p:'P1',demo:true,file:'01_A법인_토마토경매.xlsx',pop:'D1',popLabel:'경매 파일 받기',
   fields:[['item','품목·품종','토마토(일반) 5kg 상자','o'],['period','기간','2026-09-21~10-10','g']],
   checks:['날짜 열이 거래일과 같은가? (추석 연휴 09/25~27은 경매 없음)','가격 단위가 원/상자인지 원/kg인지?'],fu:'이 숫자가 나온 날짜와 원본 열을 보여 주세요.',ex:'ex04'},
 s05:{p:'P1',file:'01_A법인_토마토경매.xlsx',pop:'D1',popLabel:'경매 파일 받기',
   fields:[['item','① 품목·품종 (먼저 바꾸기)','대추빨강 3kg 상자','o'],['period','기간','2026-09-21~10-10','g']],
   checks:['시세표의 첫 날짜와 마지막 날짜','가격 단위: 원/상자 → 원/kg 표시 여부'],fu:'이 숫자가 나온 날짜와 원본 열을 보여 주세요.',ex:'ex04'},
 s07:{p:'P2',file:'01_A법인_토마토경매.xlsx + 05_AI초안_오류찾기.xlsx',pop:'D2',popLabel:'오류 찾기 자료',
   fields:[['date','날짜','2026-10-01','o'],['val','의심되는 값','14,685원/kg','r'],['unit','확인할 단위','원/상자와 원/kg 중 어떤 단위','g']],
   checks:['상자당 가격 ÷ 상자당 kg(5kg) = kg당 가격','09/29 누락 날짜의 원본 값'],fu:'토마토(일반) 5kg 상자만 남겨 다시 계산해 주세요.',ex:'ex07'},
 s11:{p:'P3',file:'02_법인별_토마토경매.xlsx',pop:'D3',popLabel:'법인 비교 파일',
   fields:[['item','품목','토마토(일반)','o'],['period','기간','2026년 9~10월','g'],['corp','법인','A~E법인','b']],
   checks:['법인별 거래무게 합계','등급(특·상·그 외)별 물량 구성'],fu:'같은 등급만 남겨 다시 비교해 주세요.',ex:'ex11'},
 s12:{p:'P4',file:'02_법인별_토마토경매.xlsx',pop:'D3',popLabel:'법인 비교 파일',
   fields:[['date','기간','2026-09-01~10-31','o'],['kind','품종','토마토','g'],['grade','등급','특','b'],['origin','산지','강원','p'],['box','상자당 무게·포장','5kg 상자','r'],['corp','비교할 법인','A법인과 C법인','b']],
   checks:['적용한 조건이 모두 표시되었나?','법인별 비교 건수와 물량 (건수가 적은 쪽은 없나?)'],fu:'같은 등급만 남겨 다시 비교해 주세요.',ex:'ex12'},
 s16:{p:'P5',file:'01_A법인_토마토경매.xlsx',pop:'D3',popLabel:'법인 비교 파일',
   fields:[['item','품목','A법인 토마토(일반) 5kg 상자','o'],['date','날짜','2026-09-24와 2026-09-28','g']],
   checks:['09/24 거래무게·거래금액 합계','09/28 거래무게·거래금액 합계'],fu:'이 숫자가 나온 날짜와 원본 열을 보여 주세요.',ex:'ex16'},
 s20:{p:'P6',file:'01_A법인_토마토경매.xlsx + 실제_KAMIS_서울_토마토_상품 (19번에서 받은 파일)',pop:'D5',popLabel:'KAMIS 소매 받기',pop2:'D4V',pop2Label:'막히면 · 가상 파일',
   fields:[['kind','품종','토마토(일반)','o'],['grade','등급','경매는 5kg 상자 전체, 소매는 상품','g'],['size','포장·규격','경매 5kg 상자 / 소매 1kg','b'],['unit','비교 단위','원/kg','r']],
   checks:['경매 5kg 상자 15,000원 → 3,000원/kg','KAMIS 결과의 단위(1kg)·등급·지역 · 도매와 소매 단계 차이'],fu:'이 숫자가 나온 날짜와 원본 열을 보여 주세요.',ex:'ex20'},
 s22:{p:'P7',file:'01 + 실제 KAMIS 소매 + 실제 ASOS 인제 날씨 (19번에서 받은 파일)',pop:'D6',popLabel:'기상청 날씨 받기',pop2:'D4V',pop2Label:'막히면 · 가상 파일',
   fields:[['period','기간','2026-09-21~10-02','o'],['start','공통 시작일','2026-09-21','g'],['origin','산지','강원 인제','b']],
   checks:['공통 시작일이 두 가격 모두 100인가? (값이 없으면 다음 공통 날짜)','연휴(09/25~27) 날씨도 빠뜨리지 않았나? 강수 0과 공백은 구분했나?'],fu:'이 숫자가 나온 날짜와 원본 열을 보여 주세요.',ex:'ex22'},
 s26:{p:'P8',file:'06_M4_기준일까지.xlsx (새 채팅)',pop:'D8',popLabel:'기준일까지의 자료',
   fields:[['base','기준일','2026-09-28','o'],['cond','볼 조건 (반입물량·명절·요일)','명절 연휴 뒤 첫 경매의 반입물량 급증','g']],
   checks:['찾은 과거 날짜의 반입물량·가격 (06 일별 시트)','그 뒤 며칠 동안 가격이 어떻게 움직였나?'],fu:'이 숫자가 나온 날짜와 원본 열을 보여 주세요.',ex:'ex26'},
 s30:{p:'P9',file:'06_M4_기준일까지.xlsx (같은 채팅)',pop:'D8',popLabel:'기준일까지의 자료',
   fields:[['fact','검증한 사실','추석 직전(09/24) 대비 연휴 뒤 첫 경매(09/28) 가격 39% 하락(5,033→3,046원/kg), 반입물량 약 3배(25.8→76.8t)','o'],['more','더 볼 정보','다음 경매일 반입물량, 2024·2025년 추석 뒤 회복 속도, 같은 등급 경매가격','g']],
   checks:['세 시나리오에 조건이 하나씩 있나?','각 조건을 확인할 자료가 적혔나?'],fu:'이 문장에 가격이 달라질 수 있는 조건을 넣어 주세요.',ex:'ex30'},
 s34:{p:'P10',file:'06_M4_기준일까지.xlsx + 내 결과',pop:'D10',popLabel:'근거 파일과 점검표',
   fields:[['fact','확인한 사실','추석 직전(09/24) 5,033원/kg → 연휴 뒤 첫 경매(09/28) 3,046원/kg(39% 하락), 반입물량 25.8t → 76.8t(약 3배)','o'],['cond','앞으로 볼 조건','연휴 동안 쌓인 물량이 빠지면 회복 가능(2024·2025년은 1주 안에 회복), 반입이 계속 많으면 약세 지속','g'],['more','더 확인할 내용','다음 경매일 반입물량과 같은 5kg 상자 경매가격','b']],
   checks:['숫자 두 개를 06 원본에서 찾았나?','결과에 표나 그래프 하나를 붙였나?'],fu:'이 문장에 가격이 달라질 수 있는 조건을 넣어 주세요.',ex:'ex34'},
 s36:{p:'P11',file:'검토한 브리핑',pop:'D10',popLabel:'근거 파일과 점검표',
   fields:[['fmt','형식','전화 설명','o'],['len','분량','1분 이내로 말할 분량','g'],['paste','검토한 브리핑 붙여넣기',BRIEF.replace(/\n/g,' '),'b']],
   checks:['말로 읽었을 때 1분 이내인가?','사실과 조건이 구분되는가?'],fu:'이 문장에 가격이 달라질 수 있는 조건을 넣어 주세요.',ex:'ex36'},
 s37:{p:'P11',file:'검토한 브리핑',pop:'D10',popLabel:'근거 파일과 점검표',
   fields:[['fmt','형식','문자 메시지','o'],['len','분량','5줄 이내','g'],['paste','검토한 브리핑 붙여넣기',BRIEF.replace(/\n/g,' '),'b']],
   checks:['전화 설명과 숫자가 같은가?','전화 설명과 조건이 같은가?'],fu:'이 문장에 가격이 달라질 수 있는 조건을 넣어 주세요.',ex:'ex37'},
 c04:{p:'P1+P2',file:'01_A법인_토마토경매.xlsx',pop:'D1',popLabel:'경매 파일 받기',
   fields:[['item','품목·품종','토마토(일반) 5kg 상자','o'],['period','기간','2026-09-21~10-10','g'],['date','원본과 맞춰 볼 날짜','2026-10-01','r']],
   checks:['날짜 열이 거래일과 같은가? (추석 연휴 09/25~27은 경매 없음)','10/01 · 상자 가격 14,685 ÷ 5kg = 2,937원/kg인가?'],fu:'이 숫자가 나온 날짜와 원본 열을 보여 주세요.',ex:'ex04'},
 c11:{p:'P3+P4',file:'02_법인별_토마토경매.xlsx',pop:'D3',popLabel:'법인 비교 파일',
   fields:[['date','기간','2026-09-01~10-31','o'],['kind','품종','토마토','g'],['grade','등급','특','b'],['origin','산지','강원','p'],['box','상자당 무게·포장','5kg 상자','r'],['corp','비교할 법인','A법인과 C법인','b']],
   checks:['적용한 조건이 모두 표시되었나?','법인별 비교 건수와 물량 (건수가 적은 쪽은 없나?)'],fu:'같은 등급만 남겨 다시 비교해 주세요.',ex:'ex12'},
 c22:{p:'P6+P7',file:'01 + 03_가상소매_서울_토마토.xlsx + 04_가상날씨_인제.xlsx',pop:'D4P',popLabel:'M3 실습 파일 받기',
   fields:[['period','기간','2026-09-21~10-02','o'],['unit','경매 가격 단위','원/kg(5kg 상자 가격 ÷ 5)','r'],['start','공통 시작일','2026-09-21','g'],['origin','산지','강원 인제','b']],
   checks:['경매는 5kg 상자 가격 ÷ 5 = 원/kg, 소매는 처음부터 원/1kg','두 가격 모두 시작일이 100인가? 강수 0과 공백을 구분했나?'],fu:'이 숫자가 나온 날짜와 원본 열을 보여 주세요.',ex:'ex22'},
 c26:{p:'P8+',file:'06_M4_기준일까지.xlsx (새 채팅)',pop:'D8',popLabel:'기준일까지의 자료',
   fields:[['base','기준일','2026-09-28','o'],['cond','볼 조건 (반입물량·명절·요일)','명절 연휴 뒤 첫 경매의 반입물량 급증','g']],
   checks:['찾은 과거 날짜의 반입물량·가격 (06 일별 시트)','그 뒤 일주일 동안 가격이 어떻게 움직였나?'],fu:'이 숫자가 나온 날짜와 원본 열을 보여 주세요.',ex:'ex26'},
 c36:{p:'P11+',file:'검토한 브리핑',pop:'D10',popLabel:'근거 파일과 점검표',
   fields:[['len','전화 분량','1분 이내','o'],['len2','문자 분량','5줄 이내','g'],['paste','검토한 브리핑 붙여넣기',BRIEF.replace(/\n/g,' '),'b']],
   checks:['전화 설명을 짝에게 읽어 주면 1분 이내인가?','전화와 문자의 숫자·조건이 같은가? “반드시·무조건” 같은 말은 없나?'],fu:'이 문장에 가격이 달라질 수 있는 조건을 넣어 주세요.',ex:'ex36'}
};
const GROUPS=[['자료 확인',['c04']],['분석',['c11','s16','c22','c26','s30']],['브리핑',['s34','c36']]];
return {FILES,POPUPS,T,PRACTICE,GENERIC,C,BRIEF,GROUPS};
})();

/* 참고 팝업 D7 · API 주소 자동 만들기 */
(function(){
  const v=(f,n)=>{const el=f.querySelector(`[data-f="${n}"]`);return el?el.value.trim():''};
  const build=(f)=>{
    if(f.dataset.apiform==='k'){if(!v(f,'key')||!v(f,'id'))return '';
      const q={action:'periodProductList',p_productclscode:'01',p_startday:v(f,'s'),p_endday:v(f,'e'),p_itemcategorycode:v(f,'cat'),p_itemcode:v(f,'item'),p_kindcode:v(f,'kind'),p_productrankcode:v(f,'rank'),p_countrycode:v(f,'cty'),p_convert_kg_yn:'N',p_returntype:'json',p_cert_key:v(f,'key'),p_cert_id:v(f,'id')};
      return 'https://www.kamis.or.kr/service/price/xml.do?'+Object.entries(q).map(([k,x])=>k+'='+encodeURIComponent(x)).join('&')}
    const key=v(f,'key');if(!key)return '';
    const s=v(f,'s'),e=v(f,'e');const days=Math.min(999,Math.max(1,Math.round((new Date(e)-new Date(s))/864e5)+1||31));
    return 'https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey='+(key.includes('%')?key:encodeURIComponent(key))+`&dataType=JSON&dataCd=ASOS&dateCd=DAY&startDt=${s.replace(/-/g,'')}&endDt=${e.replace(/-/g,'')}&stnIds=${encodeURIComponent(v(f,'stn'))}&numOfRows=${days}&pageNo=1`};
  const show=(f)=>{const o=f.querySelector('[data-apiout]'),u=build(f);o.textContent=u||'인증키(KAMIS는 아이디도)를 넣으면 주소가 여기에 만들어집니다.';o.style.color=u?'var(--ink2)':'var(--muted)';return u};
  document.addEventListener('input',e=>{const f=e.target.closest('[data-apiform]');if(f)show(f)});
  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-apiopen],[data-apicopy]');if(!b)return;
    const f=b.closest('[data-apiform]');const u=show(f);if(!u){f.querySelector('[data-f="key"]').focus();return}
    if(b.dataset.apiopen){window.open(u,'_blank','noopener')}
    else{const done=()=>{const t=b.textContent;b.textContent='복사됨 ✓';setTimeout(()=>b.textContent=t,1500)};
      try{navigator.clipboard.writeText(u).then(done,()=>{prompt('주소를 복사하세요',u)})}catch(_){prompt('주소를 복사하세요',u)}}
  });
})();
