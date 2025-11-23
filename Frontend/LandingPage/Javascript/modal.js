/**
 * Modal Module
 * 공통 모달 관리 유틸리티
 */

/**
 * 모달 열기
 * @param {HTMLElement} modalElement - 모달 요소
 * @param {boolean} isMobile - 모바일 여부
 */
export function openModal(modalElement, isMobile = false) {
    if (modalElement) {
        modalElement.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (isMobile) {
            const modalContent = modalElement.querySelector('[class*="-content"]');
            if (modalContent) {
                modalContent.style.paddingTop = '1rem';
            }
        }
        console.log('Modal opened:', modalElement.id);
        return true;
    }
    console.error('Modal element not found');
    return false;
}

/**
 * 모달 닫기
 * @param {HTMLElement} modalElement - 모달 요소
 */
export function closeModal(modalElement) {
    if (modalElement) {
        modalElement.classList.remove('active');
        document.body.style.overflow = 'auto';
        console.log('Modal closed:', modalElement.id);
        return true;
    }
    return false;
}

/**
 * 모달 배경 클릭 핸들러
 * @param {Event} event - 클릭 이벤트
 * @param {HTMLElement} modalElement - 모달 요소
 * @param {Function} closeCallback - 닫기 콜백 함수
 */
export function handleModalBackgroundClick(event, modalElement, closeCallback) {
    const modalContent = modalElement.querySelector('[class*="-content"]');
    if (event.target === modalElement || (event.target !== modalContent && !modalContent.contains(event.target))) {
        closeCallback();
    }
}

/**
 * ESC 키로 모달 닫기
 * @param {Event} event - 키보드 이벤트
 * @param {HTMLElement} modalElement - 모달 요소
 * @param {Function} closeCallback - 닫기 콜백 함수
 */
export function handleModalEscapeKey(event, modalElement, closeCallback) {
    if (event.key === 'Escape' && modalElement?.classList.contains('active')) {
        closeCallback();
    }
}
