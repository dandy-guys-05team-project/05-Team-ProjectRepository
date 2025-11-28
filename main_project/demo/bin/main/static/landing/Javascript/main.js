/**
 * Main Module
 * 모든 기능을 초기화하는 메인 스크립트
 */

import { initializeViewportListener } from './viewport.js';
import { initializeLoginModal } from './loginModal.js';
import { initializeMenuModal } from './menuModal.js';
import { initializeLoginForm } from './loginForm.js';
import { initializeMenuItems } from './menuItems.js';
import { initializeInfiniteScroll } from './infiniteScroll.js';
import { initializeTitleGroupAnimation } from './animation.js';

/**
 * DOM이 로드되었을 때 모든 기능 초기화
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('TrendKor Landing Page - Initializing...');

    // 1. 뷰포트 관리
    initializeViewportListener();
    console.log('✓ Viewport listener initialized');

    // 2. 카드 무한 스크롤
    initializeInfiniteScroll();
    console.log('✓ Infinite scroll initialized');

    // 3. 타이틀 애니메이션
    initializeTitleGroupAnimation();
    console.log('✓ Title animation initialized');

    // 4. 로그인 모달
    initializeLoginModal();
    console.log('✓ Login modal initialized');

    // 5. 메뉴 모달
    initializeMenuModal();
    console.log('✓ Menu modal initialized');

    // 6. 메뉴 항목
    initializeMenuItems();
    console.log('✓ Menu items initialized');

    // 7. 로그인 폼
    initializeLoginForm();
    console.log('✓ Login form initialized');

    // 8. 접근성: Tab 키 네비게이션 지원 (추후 구현 가능)
    document.addEventListener('keydown', event => {
        if (event.key === 'Tab') {
            // 포커스 관리 로직 추가 가능
        }
    });

    console.log('TrendKor Landing Page loaded successfully!');
});
