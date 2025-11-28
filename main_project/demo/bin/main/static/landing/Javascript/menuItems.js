/**
 * Menu Items Module
 * 메뉴 항목 관리
 */

const menuItems = {
    '.menu-home': 'HOME',
    '.menu-meme-year': 'MEME OF THE YEAR',
    '.menu-year-2025': '2025',
    '.menu-year-2024': '2024',
    '.menu-year-2023': '2023',
    '.menu-year-2022': '2022'
};

/**
 * 메뉴 항목 초기화
 */
export function initializeMenuItems() {
    Object.keys(menuItems).forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.addEventListener('click', handleMenuItemClick);
        } else {
            console.warn(`Menu item not found: ${selector}`);
        }
    });
}

/**
 * 메뉴 항목 클릭 핸들러
 * @param {Event} event - 클릭 이벤트
 */
function handleMenuItemClick(event) {
    const selector = Object.keys(menuItems).find(key => event.target.matches(key));
    if (selector) {
        const itemName = menuItems[selector];
        console.log(`${itemName} clicked`);
        // TODO: 각 메뉴 항목별 기능 구현
        handleMenuNavigation(itemName);
    }
}

/**
 * 메뉴 네비게이션 처리
 * @param {string} itemName - 메뉴 항목명
 */
function handleMenuNavigation(itemName) {
    // TODO: 라우팅 또는 페이지 이동 로직 구현
    console.log(`Navigating to: ${itemName}`);
}
