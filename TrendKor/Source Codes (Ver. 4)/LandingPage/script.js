// TrendKor Landing Page JavaScript
// 브라우저 크기 변경 시 스케일링 업데이트

document.addEventListener('DOMContentLoaded', function() {
    // 스케일 팩터 업데이트 함수 - 가로 폭 기준으로만 스케일링
    function updateScale() {
        const designWidth = 1920;
        
        // 가로 폭만을 기준으로 스케일 계산 (화면 꽉 채우기)
        const scaleX = window.innerWidth / designWidth;
        
        // CSS 변수 업데이트 - 가로 폭 기준
        document.documentElement.style.setProperty('--final-scale', Math.max(0.1, Math.min(3.0, scaleX)));
        document.documentElement.style.setProperty('--scale-factor', scaleX);
    }

    // 초기 스케일 설정
    updateScale();

    // 윈도우 리사이즈 시 스케일 업데이트
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateScale, 100);
    });

    // 메뉴 버튼 클릭 이벤트
    const loginButton = document.querySelector('.login-button');
    const menuText = document.querySelector('.menu-text');

    if (loginButton) {
        loginButton.addEventListener('click', function() {
            console.log('Login button clicked');
            // 여기에 로그인 기능 추가 가능
        });
    }

    if (menuText) {
        menuText.addEventListener('click', function() {
            console.log('Menu button clicked');
            // 여기에 메뉴 기능 추가 가능
        });
    }

    // 카드 호버 효과 강화
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 스크롤 시 부드러운 애니메이션
    let ticking = false;

    function updateScrollEffects() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollProgress = scrollTop / (document.body.scrollHeight - window.innerHeight);
        
        // 여기에 스크롤 기반 애니메이션 추가 가능
        
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });

    // 빨간색/파란색 타이틀 그룹 스크롤 애니메이션
    const redGroup = document.querySelector('.title-graphic-group');
    const blueGroup = document.querySelector('.subtitle-graphic-group');

    // 빨간색 제목 레이어(타이틀 그룹) 항상 보이게 강제
    if (redGroup) {
        redGroup.style.display = 'block';
        redGroup.classList.remove('hide');
        redGroup.style.opacity = '1';
    }

    function getScale() {
        // CSS 변수에서 스케일 값 가져오기
        const scale = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--final-scale'));
        return isNaN(scale) ? 1 : scale;
    }

    function updateTitleGroupScroll() {
        const scrollY = window.scrollY || window.pageYOffset;
        const hideThreshold = 400;
        const scale = getScale();
        if (redGroup) {
            if (scrollY > hideThreshold) {
                redGroup.classList.add('hide');
            } else {
                redGroup.classList.remove('hide');
                // 부모가 scale을 갖고 있으므로 이동량에 scale을 곱해서 보정
                const moveY = Math.min(scrollY / hideThreshold * 300, 300) * scale;
                redGroup.style.top = `${100 - moveY}px`;
                redGroup.style.opacity = `${1 - scrollY / hideThreshold}`;
            }
        }
        if (blueGroup) {
            if (scrollY > hideThreshold) {
                blueGroup.classList.add('hide');
            } else {
                blueGroup.classList.remove('hide');
                const moveY = Math.min(scrollY / hideThreshold * 300, 300) * scale;
                blueGroup.style.top = `${428 + moveY}px`;
                blueGroup.style.opacity = `${1 - scrollY / hideThreshold}`;
            }
        }
    }

    window.addEventListener('scroll', updateTitleGroupScroll);
    updateTitleGroupScroll();

    // 테스트용 빨간색 직사각형 완전 제거
    let testRect = document.querySelector('.test-rect');
    if (testRect) {
        testRect.remove();
    }

    // .test-rect DOM에서 완전 제거 (혹시 남아있을 경우)
    document.querySelectorAll('.test-rect').forEach(el => el.remove());

    // 테스트용 직사각형 생성 및 스크롤 애니메이션
    testRect = document.querySelector('.test-rect');
    if (!testRect) {
        testRect = document.createElement('div');
        testRect.className = 'test-rect';
        document.body.appendChild(testRect);
    }

    function updateTestRectScroll() {
        const scrollY = window.scrollY || window.pageYOffset;
        const hideThreshold = 400;
        if (testRect) {
            if (scrollY > hideThreshold) {
                testRect.classList.add('hide');
            } else {
                testRect.classList.remove('hide');
                const moveY = Math.min(scrollY / hideThreshold * 300, 300);
                testRect.style.transform = `translateX(-50%) translateY(-${moveY}px)`;
                testRect.style.opacity = `${1 - scrollY / hideThreshold}`;
            }
        }
    }

    window.addEventListener('scroll', updateTestRectScroll);
    updateTestRectScroll();

    // 키보드 네비게이션 지원
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Tab') {
            // 포커스 가능한 요소들에 대한 키보드 네비게이션
            const focusableElements = document.querySelectorAll('.login-button, .menu-text, .card');
            // 포커스 관리 로직 추가 가능
        }
    });

    function updateVideoClipToSubtitleBottom() {
        const video = document.querySelector('.video');
        const subtitleGroup = document.querySelector('.subtitle-graphic-group');
        if (!video || !subtitleGroup) return;

        // 파란색 그룹의 하단 위치 계산 (부모 기준)
        const mainPage = document.querySelector('.main-page');
        const subtitleRect = subtitleGroup.getBoundingClientRect();
        const mainRect = mainPage.getBoundingClientRect();
        // 파란색 그룹의 하단이 mainPage 내부에서 몇 px인지 계산
        const subtitleBottom = subtitleRect.bottom - mainRect.top;
        // 영상의 top 기준에서 하단까지의 clip-path inset 계산
        // 영상의 top은 100px, 영상의 전체 height는 1245px
        // clip-path: inset(0px 0px (1245px - subtitleBottom) 0px)
        let clipBottom = Math.max(0, 1245 - subtitleBottom);
        video.style.clipPath = `inset(0px 0px ${clipBottom}px 0px)`;
    }
    window.addEventListener('resize', updateVideoClipToSubtitleBottom);
    window.addEventListener('scroll', updateVideoClipToSubtitleBottom);
    document.addEventListener('DOMContentLoaded', updateVideoClipToSubtitleBottom);
    // DOMContentLoaded에서 바로 updateVideoClipToSubtitleBottom()을 호출하면, subtitle-graphic-group의 위치가 아직 제대로 잡히지 않아 잘못된 clip-path가 적용될 수 있음.
    // window.onload에서 한 번 더 호출하여 모든 이미지, SVG, 폰트 등이 로드된 후 정확한 위치로 clip-path를 재적용
    window.addEventListener('load', updateVideoClipToSubtitleBottom);

    function updateVideoMask() {
        const video = document.querySelector('.video');
        const redGroup = document.querySelector('.title-graphic-group');
        const blueGroup = document.querySelector('.subtitle-graphic-group');
        if (!video || !redGroup || !blueGroup) return;
        // 두 그룹의 하단 위치 계산
        const mainPage = document.querySelector('.main-page');
        const redRect = redGroup.getBoundingClientRect();
        const blueRect = blueGroup.getBoundingClientRect();
        const mainRect = mainPage.getBoundingClientRect();
        // 마스킹 영역: 빨간 그룹의 하단 ~ 파란 그룹의 상단 사이만 보이게
        const maskTop = redRect.bottom - mainRect.top;
        const maskBottom = blueRect.top - mainRect.top;
        // 영상 전체 높이 기준으로 clip-path 적용
        // 영상의 top은 100px, height는 1245px
        // 실제 보여야 할 영역: maskTop ~ maskBottom
        // clip-path: inset(maskTop px 0px (1245 - maskBottom) px 0px)
        let clipTop = Math.max(0, maskTop);
        let clipBottom = Math.max(0, 1245 - maskBottom);
        video.style.clipPath = `inset(${clipTop}px 0px ${clipBottom}px 0px)`;
    }
    window.addEventListener('resize', updateVideoMask);
    window.addEventListener('scroll', updateVideoMask);
    document.addEventListener('DOMContentLoaded', updateVideoMask);
    window.addEventListener('load', updateVideoMask);

    console.log('TrendKor Landing Page loaded successfully!');
});
