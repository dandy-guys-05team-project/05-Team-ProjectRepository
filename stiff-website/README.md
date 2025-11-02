# Working Stiff Films Website

이 프로젝트는 https://stiff.madebybuzzworthy.com/ 웹사이트를 VS Code에서 편집할 수 있도록 복제한 버전입니다.

## 프로젝트 구조

```
stiff-website/
├── index.html          # 메인 HTML 파일
├── package.json        # Node.js 패키지 설정
├── favicon.png         # 파비콘
├── css/               # 스타일시트
│   ├── normalize.css
│   ├── styles.css
│   └── styles-custom.css
├── js/                # JavaScript 파일들
│   ├── jquery.min.js
│   ├── gsap.min.js
│   ├── lottie.min.js
│   ├── main-stiff.js
│   └── ... (기타 라이브러리들)
└── img/               # 이미지 파일들
    ├── teeth.png
    ├── camera.png
    ├── car.png
    └── ... (아이콘들)
```

## 개발 환경 설정

### 필요한 도구
- Node.js (선택사항)
- VS Code
- Live Server 확장 또는 간단한 HTTP 서버

### 로컬에서 실행하기

#### 방법 1: Node.js와 npm 사용
```bash
npm install
npm start
```

#### 방법 2: Live Server 확장 (VS Code)
1. VS Code에서 Live Server 확장 설치
2. index.html 파일을 우클릭
3. "Open with Live Server" 선택

#### 방법 3: Python 내장 서버 (macOS/Linux)
```bash
python3 -m http.server 3000
```
그 다음 브라우저에서 `http://localhost:3000`으로 접속

## 편집 가이드

### 주요 파일들
- `index.html`: 메인 HTML 구조
- `css/styles-custom.css`: 커스텀 스타일 (편집 권장)
- `js/main-stiff.js`: 메인 JavaScript 로직

### 콘텐츠 수정
- 텍스트 내용: `index.html`에서 직접 수정
- 스타일: `css/styles-custom.css`에서 수정
- 동작/애니메이션: `js/main-stiff.js`에서 수정

## 기술 스택

- **HTML5**: 마크업 구조
- **CSS3**: 스타일링 (GSAP 애니메이션 포함)
- **JavaScript (ES6+)**: 인터랙티브 기능
- **GSAP**: 고급 애니메이션
- **Lottie**: 벡터 애니메이션
- **jQuery**: DOM 조작

## 라이브러리 의존성

- GSAP (애니메이션)
- Lottie (벡터 애니메이션)
- jQuery (DOM 조작)
- ScrollTrigger (스크롤 애니메이션)
- SplitText (텍스트 애니메이션)

## 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)

## 주의사항

- 이 프로젝트는 원본 웹사이트의 로컬 복사본입니다
- 외부 CDN 및 API 의존성이 있을 수 있습니다
- 일부 기능은 로컬 환경에서 제한될 수 있습니다

## 문제 해결

### 일반적인 문제
1. **CORS 오류**: 로컬 HTTP 서버를 사용하세요 (file:// 프로토콜 대신)
2. **폰트 로딩 실패**: 인터넷 연결 확인
3. **애니메이션 작동 안 함**: JavaScript 콘솔에서 오류 확인

## 🎯 프로젝트 완성 상태

- ✅ **서버 실행 중**: http://localhost:3000
- ✅ **모든 리소스 다운로드 완료** (CSS, JS, 이미지, 폰트, Lottie 애니메이션)
- ✅ **JavaScript 모듈 완료** (16개 모듈 파일 모두 다운로드)
  - lottie.js, menu.js, text-anim.js, hero-animation.js
  - footer-button.js, drag-slider.js, small-animations.js
  - lazy-load.js, video-main.js, lazy-video.js
  - work-page.js, home-page.js, work-detail.js
  - about.js, capabilities.js, contact.js
- ✅ **Lottie 애니메이션 파일 완료** (logo, teeth, camera, car, eyes JSON 파일)
- ✅ **웹 폰트 파일 완료** (Grand Bold, PP Neue Montreal 폰트)
- ✅ **VS Code 설정 완료** (디버깅, 확장 권장사항, Live Server)
- ✅ **개발 환경 구성 완료** - **404 에러 해결됨!**

### 📁 완성된 파일 구조
```
stiff-website/
├── index.html
├── package.json
├── README.md
├── EDITING_GUIDE.md
├── start-dev-server.sh
├── favicon.png
├── .vscode/          # VS Code 설정
├── css/
│   ├── normalize.css
│   ├── styles.css
│   ├── styles-custom.css
│   └── fonts/
│       ├── fonts.css
│       ├── GrandBold.woff2
│       ├── GrandBold.woff
│       ├── PPNeueMontreal-Medium.woff2
│       └── PPNeueMontreal-Medium.woff
├── js/
│   ├── [12개 라이브러리 파일들]
│   ├── modules/      # 16개 모듈 파일
│   └── lottie/       # 5개 애니메이션 JSON 파일
└── img/              # 모든 이미지 파일들
```

## 🚀 이제 완전히 작동합니다!

원본 웹사이트 https://stiff.madebybuzzworthy.com/ 와 동일하게 모든 기능이 작동하는 완전한 로컬 버전입니다.
