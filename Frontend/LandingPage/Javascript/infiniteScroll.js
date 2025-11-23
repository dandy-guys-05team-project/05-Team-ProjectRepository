/**
 * Infinite Scroll Module
 * 카드 무한 스크롤 관리
 */

/**
 * 카드 Infinite Scroll 초기화
 */
export function initializeInfiniteScroll() {
    const cardsWrapper = document.querySelector('.cards-wrapper');
    const cardsContainer = document.querySelector('.cards-container');

    if (!cardsWrapper || !cardsContainer) {
        console.warn('Cards container not found');
        return;
    }

    // 원본 카드들 저장
    const originalCards = Array.from(cardsWrapper.querySelectorAll('.card'));
    const totalCards = originalCards.length;

    if (totalCards === 0) {
        console.warn('No cards found');
        return;
    }

    const cardWidth = originalCards[0].offsetWidth;
    const cardGap = parseFloat(window.getComputedStyle(cardsWrapper).gap) || 0;
    const containerWidth = cardsContainer.offsetWidth;

    let currentScroll = 0;
    let animationId = null;
    let isPaused = false;

    const scrollSpeed = 2; // px per frame

    // CSS 애니메이션 제거
    cardsWrapper.style.animation = 'none';
    cardsWrapper.style.transform = 'translateX(0)';

    /**
     * 애니메이션 루프
     */
    function animate() {
        if (!isPaused) {
            currentScroll += scrollSpeed;
            cardsWrapper.style.transform = `translateX(-${currentScroll}px)`;

            // 첫 번째 카드가 완전히 화면 밖으로 나갔는지 확인
            if (currentScroll >= cardWidth + cardGap) {
                // 첫 번째 카드를 맨 뒤로 이동
                const firstCard = cardsWrapper.querySelector('.card');
                if (firstCard) {
                    cardsWrapper.appendChild(firstCard.cloneNode(true));
                    firstCard.remove();
                    currentScroll -= (cardWidth + cardGap);
                    cardsWrapper.style.transform = `translateX(-${currentScroll}px)`;
                }
            }
        }
        animationId = requestAnimationFrame(animate);
    }

    /**
     * 애니메이션 시작
     */
    function startAnimation() {
        animate();
    }

    /**
     * 마우스 호버 시 일시 정지
     */
    cardsContainer.addEventListener('mouseenter', () => {
        isPaused = true;
    });

    /**
     * 마우스 이탈 시 재시작
     */
    cardsContainer.addEventListener('mouseleave', () => {
        isPaused = false;
    });

    // 터치 디바이스 지원
    cardsContainer.addEventListener('touchstart', () => {
        isPaused = true;
    });

    cardsContainer.addEventListener('touchend', () => {
        isPaused = false;
    });

    // 애니메이션 시작
    startAnimation();

    console.log('Infinite scroll initialized with smooth card repositioning');
}
