# 📈 미스터 크립 

![프로젝트 썸네일](./public/thumbnail.png)

## 📋 목차

- [🔗 접속 링크](#🔗-접속-링크)
- [✅ 스택](#✅-스택)
- [ℹ️ 페이지 소개](#ℹ️-페이지-소개)
- [😱 힘들었던 점과 해결 과정](#😱-힘들었던-점과-해결-과정)
- [🌱 개선 사항 업데이트](#🌱-개선-사항-업데이트)

### 👉 서비스 소개

미스터 크립은 업비트의 REST API를 사용하여 만든 여러분만의 크립토 비서입니다.
로그인 후 나의 업비트 계좌 잔고를 확인할 수 있고, 현재 트렌드 영상(유튜브)과 최신 뉴스(네이버)를 볼 수 있습니다. 그리고 현재 마켓들의 실시간 현재가, 거래내역, 체결 내역에 관한 정보도 확인할 수 있으며 시각화된 차트로 현재가 흐름도 쉽게 읽을 수 있습니다!
캐쥬얼한 나만의 크립토 비서가 필요하다면 미스터 크립을 추천드립니다:)

## 🔗 접속 링크
https://mr-cryp.vercel.app

## ✅ 스택
<div>
    <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white">
    <img src="https://img.shields.io/badge/React.js-61DAFB?style=flat-square&logo=react&logoColor=black">
    <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat-square&logo=javascript&logoColor=black">
</div><br/>
<div>
    <img src="https://img.shields.io/badge/React Query-FF4154?style=flat-square&logo=reactquery&logoColor=white">
    <img src="https://img.shields.io/badge/Redux Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white">
</div><br/>
<div>
    <img src="https://img.shields.io/badge/MUI-007FFF?style=flat-square&logo=mui&logoColor=white">
    <img src="https://img.shields.io/badge/highcharts-68BC71?style=flat-square&logo=highcharts&logoColor=white">
</div><br/>
<div>
    <img src="https://img.shields.io/badge/Upbit API-0052CC?style=flat-square&logo=upbit&logoColor=white">
    <img src="https://img.shields.io/badge/Youtube API-FF0000?style=flat-square&logo=youtube&logoColor=white">
    <img src="https://img.shields.io/badge/Naver API-03C75A?style=flat-square&logo=naver&logoColor=white">
    <img src="https://img.shields.io/badge/Kakao Oauth-FFCD00?style=flat-square&logo=kakao&logoColor=white">
    <img src="https://img.shields.io/badge/Google Oauth-4285F4?style=flat-square&logo=google&logoColor=white">
</div><br/>
<div>
    <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white">
</div><br/>
<div>
    <img src="https://img.shields.io/badge/axios-5A29E4?style=flat-square&logo=axios&logoColor=white">
    <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white">
    <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black">
</div><br/>

## ℹ️ 페이지 소개
### 초기 화면
![초기 화면](./public/images/readme/page_root.webp)
![ProtectedRoute](./public/images/readme/protected_route.gif)

로그인을 해야만 미스터 크립의 서비스를 이용할 수 있습니다.<br>
유저는 구글과 카카오 계정 중 원하는 것을 선택하여 로그인 후 서비스를 이용합니다.<br>
비로그인 상태에서 타 페이지의 접근을 막기 위한 **Protected Route** 처리도 적용했습니다.(액세스 토큰 조회)<br>

### 홈
![홈 화면](./public/images/readme/page_home.gif)

로그인 후 처음 접속하는 페이지입니다.<br>
홈에서는 내 계좌현황을 파이 차트로 비율에 따라 한 눈에 확인할 수 있고,<br>
원화(현금)와 마켓별 상세 잔고 현황을 리스트로 확인할 수 있습니다.<br>

### 비전
![비전](./public/images/readme/page_vision.gif)

가상화폐에 대한 기본적인 정보와 투자 방법에 대한 영상,<br>
유튜브에서 '코인'을 키워드로 검색한 최신 검색 결과 영상,<br>
그리고 최신 기사들을 바로 확인할 수 있는 비전 페이지 입니다.<br>
영상은 바로 재생이 가능하게 Iframe을 이용하였고, 기사는 링크 이동과 복사가 가능하게 구현했습니다.<br>

### 거래
![거래](./public/images/readme/page_trade.webp)

업비트 API를 이용한 하위 3개의 페이지를 둔 거래 페이지입니다.<br>
네비게이션바에서 거래를 클릭시 하위 메뉴탭이 활성화됩니다.<br>

### 실시간 오더북
![실시간 오더북](./public/images/readme/page_orderbook.webp)

REST API -> QUOTATION API의 오더북 데이터를 호출하여<br>
마켓별 실시간 오더북을 보여주는 페이지입니다.<br>
마켓 코드 셀렉터로 원하는 마켓 코드를 선택할 수 있습니다.<br>

### 실시간 거래 내역
![실시간 거래 내역](./public/images/readme/page_tradeHistory.webp)

REST API -> QUOTATION API의 실시간 체결 데이터를 호출하여<br>
마켓별 실시간 거래 내역을 보여주는 페이지입니다.<br>
마켓 코드 셀렉터로 원하는 마켓 코드를 선택할 수 있습니다.<br>

### 실시간 차트
![실시간 차트](./public/images/readme/page_trade_chart.gif)
![주문하기 모달](./public/images/readme/page_trade_chart_order.gif)

REST API -> QUOTATION API의 종목 중 KRW로 시작하는 종목들의 데이터로<br>
마켓 리스트를 구현했고 클릭으로 선택한 마켓의 상세 정보, 1분봉, 5분봉, 일봉, 주봉, 월봉 등<br>
시세 흐름과 현재 실시간 거래 내역 및 오더북을 보여주는 페이지입니다.<br>

주문하기 기능은 실제로 매수, 매도 기능을 하지는 않습니다.<br>
기본적으로 해당 마켓의 실시간 가격이 지정되어있고 매수와 매도 주문을 하면<br>
거래내역에서 주문한 내역을 모두 확인할 수 있게 상태로 저장됩니다.<br>

### 내 프로필
![프로필](./public/images/readme/navbar_user.webp)
![유저 정보](./public/images/readme/user_modal.webp)

유저 정보는 네비게이션 바의 '내 프로필' 텍스트를 클릭하면 하단에 툴팁이 활성화되고,<br>
그 중 '프로필 정보'를 클릭하면 현재 로그인된 계정의 프로필 사진과 닉네임, 플랫폼의 정보가 표시됩니다.<br>


## 😱 힘들었던 점과 해결 과정

## 🌱 개선 사항 업데이트
### 다음 업데이트시 추가될 사항
- 네이버 로그인 추가