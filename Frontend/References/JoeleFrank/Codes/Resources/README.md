# JoeleFrank Resources

이 폴더에는 JoeleFrank 웹사이트의 모든 에셋들이 포함되어 있습니다.

## 이미지 파일

### 아이콘 및 파비콘
- `favicon-32x32.png` - 웹사이트 파비콘 (32x32px)
- `webclip-256x256.png` - Apple 터치 아이콘 (256x256px)

### 메인 섹션 이미지
- `home-who-we-are-fullWidth.avif` - "Who We Are" 섹션 메인 이미지 (여성이 사무실 건물을 걷는 모습)
- `home-ourPeople-img-1.avif` - "Our People" 섹션 이미지 1 (옥상에서 대화하는 두 파트너)
- `home-ourPeople-img-2.avif` - "Our People" 섹션 이미지 2 (뉴욕 오피스에서 함께 걷는 동료들)

### 뉴스 커버 이미지
- `Cover-sep-17-5.jpg` - 뉴스 아티클 커버 (Barrett Golden 13D Monitor 컨퍼런스)
- `Cover-sep-17-4.jpg` - 뉴스 아티클 커버 (Jamie Moser Eastern Regional Conference)
- `Cover-sep-17-3.jpg` - 뉴스 아티클 커버 (Sharon Stern, Barrett Golden NACD Summit 2025)
- `Cover-5.avif` - 인사이트 아티클 커버 (Private Capital 관련)

## CSS 파일
- `jf-staging.shared.css` - 외부 공유 스타일시트 (원본: Webflow CDN)

## 폰트 정보

### 사용된 폰트
1. **Geist Mono** (로컬 파일)
   - 파일 위치: `fonts/` 폴더
   - 가중치: regular (400), medium (500), semibold (600), bold (700), extrabold (800), black (900)
   - 용도: 로고 텍스트 및 모노스페이스 요소
   - 파일명:
     - `GeistMono-Regular.ttf` (400)
     - `GeistMono-Medium.ttf` (500)
     - `GeistMono-SemiBold.ttf` (600)
     - `GeistMono-Bold.ttf` (700)
     - `GeistMono-ExtraBold.ttf` (800)
     - `GeistMono-Black.ttf` (900)

2. **Adobe Typekit 폰트** (로컬 JavaScript)
   - 파일: `fonts/typekit-eti5boy.js`
   - 프리미엄 타이포그래피 사용

### 폰트 로딩
- Geist Mono: `fonts/geist-mono.css`에서 로컬 TTF 파일 참조
- Adobe Typekit: `fonts/typekit-eti5boy.js`에서 로컬 스크립트 로드

## 사용법

### HTML에서 리소스 참조
```html
<!-- 이미지 -->
<img src="./Resources/home-who-we-are-fullWidth.avif" alt="Description">

<!-- 파비콘 -->
<link href="./Resources/favicon-32x32.png" rel="shortcut icon" type="image/x-icon">

<!-- CSS -->
<link href="./Resources/jf-staging.shared.css" rel="stylesheet" type="text/css">

<!-- 폰트 -->
<link href="./Resources/fonts/geist-mono.css" rel="stylesheet" type="text/css">
<script src="./Resources/fonts/typekit-eti5boy.js" type="text/javascript"></script>
```

### CSS에서 폰트 사용
```css
/* Geist Mono 폰트 사용 */
.logo-text {
  font-family: 'Geist Mono', monospace;
  font-weight: 900; /* Black */
}

.code-text {
  font-family: 'Geist Mono', monospace;
  font-weight: 400; /* Regular */
}
```

## 파일 크기 정보
- 총 이미지 크기: 약 1.5MB
- CSS 파일: 약 208KB
- 폰트 파일: 약 435KB (Geist Mono TTF 파일들 + Typekit JS)
- 전체 리소스: 약 4.2MB

## 최적화 참고사항
- AVIF 형식 이미지는 우수한 압축률과 품질을 제공
- 반응형 이미지를 위해 여러 해상도의 이미지 버전이 있었으나 로컬 저장을 위해 최고 품질 버전만 보관
- 모든 이미지는 lazy loading을 지원

## 라이선스
이 리소스들은 JoeleFrank의 원본 웹사이트에서 가져온 것으로, 학습 및 참조 목적으로만 사용해야 합니다.
