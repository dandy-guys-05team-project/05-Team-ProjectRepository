document.addEventListener('DOMContentLoaded', () => {
    const yearButtons = document.querySelectorAll('.year-button');

    // 초기: 첫 번째 버튼을 활성화
    if (yearButtons.length > 0) {
        yearButtons[0].classList.add('year-button--active');
    }

    // 버튼 클릭 이벤트
    yearButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 모든 버튼에서 year-button--active 클래스 제거
            yearButtons.forEach(btn => btn.classList.remove('year-button--active'));

            // 클릭한 버튼에 year-button--active 클래스 추가
            button.classList.add('year-button--active');
        });
    });
});
