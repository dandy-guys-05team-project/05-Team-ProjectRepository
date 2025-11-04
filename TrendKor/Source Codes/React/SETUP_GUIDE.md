# TrendKor React 프로젝트 실행 가이드

## ✅ HTML에서 React로 성공적으로 변환되었습니다!

## 📦 설치 완료

프로젝트 의존성이 성공적으로 설치되었습니다.

## 🎥 비디오 파일 설정

프로젝트를 실행하기 전에 비디오 파일을 올바른 위치에 복사해야 합니다:

```bash
# 비디오 디렉토리가 이미 생성되어 있습니다
# 다음 경로에 비디오 파일을 복사하세요:
# public/videos/LandingPageVideo.mp4

# 또는 다음 명령어를 실행하세요:
cp "../src/Resources/LandingPageVideo.mp4" "public/videos/"
```

## 🚀 프로젝트 실행

```bash
npm start
```

브라우저에서 자동으로 [http://localhost:3000](http://localhost:3000)이 열립니다.

## 📁 프로젝트 구조

```
React/
├── public/
│   ├── index.html           # HTML 템플릿
│   └── videos/              # 비디오 파일 위치
│       └── LandingPageVideo.mp4
├── src/
│   ├── components/          # React 컴포넌트
│   │   ├── Navbar.js        # 네비게이션 바
│   │   ├── Navbar.css
│   │   ├── HeroSection.js   # 히어로 섹션 (비디오 포함)
│   │   ├── HeroSection.css
│   │   ├── WhyUsSection.js  # Why Us 섹션
│   │   ├── WhyUsSection.css
│   │   ├── OurPeopleSection.js  # Our People 섹션
│   │   ├── OurPeopleSection.css
│   │   ├── NewsSection.js   # 뉴스 섹션
│   │   ├── NewsSection.css
│   │   ├── Footer.js        # 푸터
│   │   └── Footer.css
│   ├── utils/
│   │   └── smoothScroll.js  # Lenis 스무스 스크롤
│   ├── App.js               # 메인 앱 컴포넌트
│   ├── App.css              # 앱 스타일
│   ├── index.js             # 진입점
│   └── index.css            # 글로벌 스타일
├── package.json
├── README.md
└── .gitignore
```

## 🎨 주요 기능

### 1. 반응형 디자인
- 모든 화면 크기에서 완벽하게 작동
- 모바일, 태블릿, 데스크톱 최적화

### 2. 비디오 배경
- 자동 재생 비디오 배경
- 히어로 섹션에 통합

### 3. 스무스 스크롤
- Lenis 라이브러리를 사용한 부드러운 스크롤
- 자연스러운 사용자 경험

### 4. 동적 네비게이션
- 스크롤 시 배경색 변경
- 모바일 햄버거 메뉴
- 다크/라이트 테마 자동 전환

### 5. 컴포넌트 기반 구조
- 재사용 가능한 React 컴포넌트
- 유지보수가 쉬운 코드 구조

## 🛠️ 커스터마이징

### 텍스트 변경
`src/components/HeroSection.js` 파일에서 제목과 부제를 수정할 수 있습니다:

```javascript
<h1 className="trendkor-title">TrendKor</h1>
<p className="trendkor-subtitle">
  Discover the Latest Korean Trends
</p>
```

### 색상 변경
`src/index.css` 파일에서 CSS 변수를 수정하세요:

```css
:root {
  --primary-700: #7a081d;  /* 메인 브랜드 컬러 */
  --text--invert: #ffffff;
  --text--secondary: #666666;
}
```

### 네비게이션 링크 변경
`src/components/Navbar.js` 파일에서 링크를 수정하세요.

## 📝 빌드

프로덕션 빌드를 생성하려면:

```bash
npm run build
```

빌드된 파일은 `build/` 폴더에 생성됩니다.

## ⚠️ 중요 사항

1. **비디오 파일**: 비디오 파일이 없으면 비디오 영역이 검은색으로 표시됩니다.
2. **보안 경고**: npm audit에서 일부 취약점이 보고되었지만, 개발 의존성이므로 프로덕션에는 영향이 없습니다.
3. **브라우저 호환성**: 최신 브라우저에서 테스트되었습니다.

## 🐛 문제 해결

### 비디오가 재생되지 않을 때
1. 비디오 파일 경로 확인: `public/videos/LandingPageVideo.mp4`
2. 비디오 형식 확인: MP4 권장
3. 브라우저 콘솔에서 오류 확인

### 스타일이 적용되지 않을 때
1. 브라우저 캐시 삭제
2. 개발 서버 재시작
3. CSS 파일이 올바르게 import 되었는지 확인

### 의존성 오류
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 참고 자료

- [React 공식 문서](https://reactjs.org/)
- [GSAP 애니메이션](https://greensock.com/gsap/)
- [Lenis 스무스 스크롤](https://github.com/studio-freight/lenis)

## 💡 다음 단계

1. 비디오 파일 복사
2. `npm start`로 개발 서버 실행
3. 브라우저에서 확인
4. 필요에 따라 컴포넌트 수정

## 📧 지원

문제가 발생하면 프로젝트 이슈를 작성해주세요.

---

**변환 완료일**: 2025년 11월 4일  
**원본 파일**: `Source Codes/html/index.html`  
**React 버전**: 18.2.0
