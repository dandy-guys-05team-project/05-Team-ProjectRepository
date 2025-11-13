// TrendKor Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 메뉴 버튼 클릭 이벤트
    document.querySelector('.login-button')?.addEventListener('click', () => {
        // 로그인 기능 추가 가능
        console.log('Login button clicked');
    });

    document.querySelector('.menu-text')?.addEventListener('click', () => {
        // 메뉴 기능 추가 가능
        console.log('Menu button clicked');
    });

    // 접근성: Tab 키 네비게이션 지원 (추후 구현 가능)
    document.addEventListener('keydown', event => {
        if (event.key === 'Tab') {
            // 포커스 관리 로직 추가 가능
        }
    });

    console.log('TrendKor Landing Page loaded successfully!');
});
