/**
 * Login Modal Module
 * 로그인 모달 관련 기능 관리
 */

import { openModal, closeModal, handleModalBackgroundClick, handleModalEscapeKey } from './modal.js';
import { viewport } from './viewport.js';

let loginModalElement = null;
let loginButtonElement = null;
let modalCloseButtonElement = null;

/**
 * 로그인 모달 초기화
 */
export function initializeLoginModal() {
    loginModalElement = document.getElementById('login-modal');
    loginButtonElement = document.querySelector('.login-button');
    modalCloseButtonElement = document.querySelector('.modal-close-btn');

    console.log('DOMContentLoaded - loginModal:', loginModalElement);
    console.log('DOMContentLoaded - loginButton:', loginButtonElement);
    console.log('DOMContentLoaded - modalCloseBtn:', modalCloseButtonElement);

    if (!loginModalElement || !loginButtonElement || !modalCloseButtonElement) {
        console.warn('Login modal elements not found');
        return;
    }

    setupLoginModalEventListeners();
}

/**
 * 로그인 모달 이벤트 리스너 설정
 */
function setupLoginModalEventListeners() {
    // 로그인 버튼 클릭
    loginButtonElement.addEventListener('click', handleOpenLoginModal);

    // 닫기 버튼 클릭
    modalCloseButtonElement.addEventListener('click', handleCloseLoginModal);

    // 배경 클릭
    loginModalElement.addEventListener('click', (e) => {
        handleModalBackgroundClick(e, loginModalElement, handleCloseLoginModal);
    });

    // ESC 키
    document.addEventListener('keydown', (e) => {
        handleModalEscapeKey(e, loginModalElement, handleCloseLoginModal);
    });
}

/**
 * 로그인 모달 열기
 */
function handleOpenLoginModal() {
    openModal(loginModalElement, viewport.isMobile);
}

/**
 * 로그인 모달 닫기
 */
function handleCloseLoginModal() {
    closeModal(loginModalElement);
}
