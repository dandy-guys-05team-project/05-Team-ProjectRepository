/**
 * MenuSidebar.js
 * 랜딩 페이지의 메뉴 사이드바 기능 관리
 * - 닫기 버튼 처리
 * - 홈 및 MEME OF THE YEAR 메뉴 항목 처리
 * - 년도 선택 버튼 클릭 시 상세 페이지로 이동
 */

// ==================== 메뉴 닫기 버튼 처리 ====================
// 닫기 버튼(Vector) 클릭 이벤트 리스너
document.querySelector('.Vector').addEventListener('click', function() {
    // 메뉴 모달을 닫는 기능 구현
    console.log('Close button clicked');
});

// ==================== HOME 메뉴 항목 처리 ====================
// HOME 메뉴 항목 클릭 이벤트 리스너
document.querySelector('.Home').addEventListener('click', function() {
    // HOME 섹션으로 이동하는 기능 구현
    console.log('HOME clicked');
});

// ==================== MEME OF THE YEAR 메뉴 항목 처리 ====================
// MEME OF THE YEAR 메뉴 항목 클릭 이벤트 리스너
document.querySelector('.MemeOfTheYear').addEventListener('click', function() {
    // MEME OF THE YEAR 섹션으로 이동하는 기능 구현
    console.log('MEME OF THE YEAR clicked');
});

// ==================== 년도 선택 버튼 처리 ====================
/**
 * 년도 버튼 클릭 핸들러 함수
 * @param {string} year - 선택된 년도 (예: '2025', '2024')
 * @description 선택된 년도에 해당하는 밈 데이터를 보여주기 위해 DetailedOverviewPage로 이동
 */
function handleYearSelection(year) {
    console.log(`${year} year selected - Navigating to DetailedOverviewPage`);

    // URL 파라미터를 사용하여 선택된 년도 정보를 전달하며 DetailedOverviewPage로 이동
    // 예: /DetailedOverviewPage/index.html?year=2025
    window.location.href = `/DetailedOverviewPage/index.html?year=${year}`;
}

// 2025년 버튼 클릭 이벤트 리스너
document.querySelector('.Year2025').addEventListener('click', function() {
    handleYearSelection('2025');
});

// 2024년 버튼 클릭 이벤트 리스너
document.querySelector('.Year2024').addEventListener('click', function() {
    handleYearSelection('2024');
});

// 2023년 버튼 클릭 이벤트 리스너
document.querySelector('.Year2023').addEventListener('click', function() {
    handleYearSelection('2023');
});

// 2022년 버튼 클릭 이벤트 리스너
document.querySelector('.Year2022').addEventListener('click', function() {
    handleYearSelection('2022');
});
