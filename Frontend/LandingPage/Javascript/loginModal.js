/**
 * Login Modal Module
 * 로그인 모달 관련 기능 관리
 */

import { openModal, closeModal, handleModalBackgroundClick, handleModalEscapeKey } from './modal.js';
import { viewport } from './viewport.js';

let loginModalElement = null;
let signupModalElement = null;
let loginButtonElement = null;
let signupButtonElement = null;
let loginModalCloseButtonElement = null;
let signupModalCloseButtonElement = null;

/**
 * 로그인 모달 초기화
 */
export function initializeLoginModal() {
    loginModalElement = document.getElementById('login-modal');
    signupModalElement = document.getElementById('signup-modal');
    loginButtonElement = document.querySelector('.login-button');
    signupButtonElement = document.querySelector('.btn-signup');
    loginModalCloseButtonElement = document.querySelector('.login-container .close-btn');
    signupModalCloseButtonElement = document.querySelector('#signup-modal #closeButton');

    console.log('DOMContentLoaded - loginModal:', loginModalElement);
    console.log('DOMContentLoaded - signupModal:', signupModalElement);
    console.log('DOMContentLoaded - loginButton:', loginButtonElement);
    console.log('DOMContentLoaded - signupButton:', signupButtonElement);
    console.log('DOMContentLoaded - loginModalCloseBtn:', loginModalCloseButtonElement);
    console.log('DOMContentLoaded - signupModalCloseBtn:', signupModalCloseButtonElement);

    if (!loginModalElement || !signupModalElement || !loginButtonElement || !signupButtonElement) {
        console.warn('Login/Signup modal elements not found');
        return;
    }

    setupLoginModalEventListeners();
    setupSignupModalEventListeners();
}

/**
 * 로그인 모달 이벤트 리스너 설정
 */
function setupLoginModalEventListeners() {
    // 로그인 버튼 클릭
    loginButtonElement.addEventListener('click', handleOpenLoginModal);

    // 닫기 버튼 클릭
    if (loginModalCloseButtonElement) {
        loginModalCloseButtonElement.addEventListener('click', handleCloseLoginModal);
    }

    // Sign Up 버튼 클릭 - 로그인 모달 닫고 가입 모달 열기
    signupButtonElement.addEventListener('click', handleSignupButtonClick);

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
 * 가입 모달 이벤트 리스너 설정
 */
function setupSignupModalEventListeners() {
    if (!signupModalElement) {
        console.warn('Signup modal element not found');
        return;
    }

    // 닫기 버튼 클릭
    if (signupModalCloseButtonElement) {
        signupModalCloseButtonElement.addEventListener('click', handleCloseSignupModal);
    }

    // 배경 클릭
    signupModalElement.addEventListener('click', (e) => {
        handleModalBackgroundClick(e, signupModalElement, handleCloseSignupModal);
    });

    // ESC 키
    document.addEventListener('keydown', (e) => {
        handleModalEscapeKey(e, signupModalElement, handleCloseSignupModal);
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

/**
 * Sign Up 버튼 클릭 - 로그인 모달 닫고 가입 모달 열기
 */
function handleSignupButtonClick() {
    closeModal(loginModalElement);
    setTimeout(() => {
        openModal(signupModalElement, viewport.isMobile);
    }, 400); // 로그인 모달 애니메이션 완료 후 가입 모달 열기
}

/**
 * 가입 모달 닫기
 */
function handleCloseSignupModal() {
    closeModal(signupModalElement);
}
