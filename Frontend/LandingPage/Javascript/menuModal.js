/**
 * Menu Modal Module
 * 메뉴 모달 관련 기능 관리
 */

import { openModal, closeModal, handleModalBackgroundClick, handleModalEscapeKey } from './modal.js';
import { viewport } from './viewport.js';

let menuModalElement = null;
let menuButtonElement = null;
let menuCloseButtonElement = null;

/**
 * 메뉴 모달 초기화
 */
export function initializeMenuModal() {
    menuModalElement = document.getElementById('menu-modal');
    menuButtonElement = document.querySelector('.menu-text');
    menuCloseButtonElement = document.querySelector('.menu-close-btn');

    if (!menuModalElement || !menuButtonElement || !menuCloseButtonElement) {
        console.warn('Menu modal elements not found');
        return;
    }

    setupMenuModalEventListeners();
}

/**
 * 메뉴 모달 이벤트 리스너 설정
 */
function setupMenuModalEventListeners() {
    // 메뉴 버튼 클릭
    menuButtonElement.addEventListener('click', handleOpenMenuModal);

    // 닫기 버튼 클릭
    menuCloseButtonElement.addEventListener('click', handleCloseMenuModal);

    // 배경 클릭
    menuModalElement.addEventListener('click', (e) => {
        handleModalBackgroundClick(e, menuModalElement, handleCloseMenuModal);
    });

    // ESC 키
    document.addEventListener('keydown', (e) => {
        handleModalEscapeKey(e, menuModalElement, handleCloseMenuModal);
    });
}

/**
 * 메뉴 모달 열기
 */
function handleOpenMenuModal() {
    openModal(menuModalElement, viewport.isMobile);
}

/**
 * 메뉴 모달 닫기
 */
function handleCloseMenuModal() {
    closeModal(menuModalElement);
}
