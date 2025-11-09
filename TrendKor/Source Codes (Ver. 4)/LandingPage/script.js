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

    // 키보드 네비게이션 지원
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Tab') {
            // 포커스 가능한 요소들에 대한 키보드 네비게이션
            const focusableElements = document.querySelectorAll('.login-button, .menu-text, .card');
            // 포커스 관리 로직 추가 가능
        }
    });

    console.log('TrendKor Landing Page loaded successfully!');
});
