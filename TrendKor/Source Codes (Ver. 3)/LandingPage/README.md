# Design System Documentation

이 폴더에는 "Take Control" 랜딩 페이지에서 추출한 디자인 시스템이 포함되어 있습니다.

## 파일 구조

### 1. `design-system.css`
- CSS 변수로 정의된 디자인 토큰
- 색상 시스템 (기본, 브랜드, 시스템 색상)
- 아이콘 및 스트로크 스타일

### 2. `typography.css`
- 타이포그래피 시스템
- Neue Haas Grotesk 폰트 패밀리 설정
- 헤딩 및 텍스트 스타일
- 유틸리티 클래스

### 3. `layout.css`
- 레이아웃 시스템
- 반응형 그리드 및 플렉스박스 유틸리티
- 스페이싱 및 포지셔닝 클래스
- 컨테이너 시스템

### 4. `components.css`
- 컴포넌트별 스타일
- 히어로 섹션 스타일
- 애니메이션 효과
- 반응형 미디어 쿼리

### 5. `styles.css`
- 메인 스타일 파일 (모든 CSS 파일을 import)
- 글로벌 스타일
- 접근성 관련 스타일

## 사용 방법

HTML 파일에서 메인 스타일 파일만 링크하면 됩니다:

```html
<link rel="stylesheet" href="./styles.css">
```

## 주요 특징

1. **CSS 변수 기반 디자인 시스템**
2. **Neue Haas Grotesk 폰트 사용**
3. **반응형 디자인 지원**
4. **모듈러 CSS 구조**
5. **접근성 고려**

## 색상 시스템

- Primary: `--background--primary`, `--text--primary`
- Secondary: `--background--secondary`, `--text--secondary`
- Brand: `--background--brand`, `--text--brand`
- System: Success, Warning, Error 색상

## 타이포그래피

- Title Font: `neue-haas-grotesk-display, sans-serif`
- Body Font: `neue-haas-grotesk-text, sans-serif`
- Responsive font sizing with clamp()
