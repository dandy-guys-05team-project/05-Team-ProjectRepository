/**
 * Animation Module
 * GSAP을 이용한 애니메이션 관리
 */

/**
 * 타이틀 그룹 애니메이션 설정
 * 빨간색과 파란색 타이틀이 스크롤 시 동시에 위아래로 사라지는 효과
 */
export function initializeTitleGroupAnimation() {
    // GSAP 라이브러리 확인
    if (typeof gsap === 'undefined') {
        console.warn('GSAP library not loaded');
        return;
    }

    const titleGraphicGroup = document.querySelector('.title-graphic-group');
    const subtitleGraphicGroup = document.querySelector('.subtitle-graphic-group');
    const titleMaskContainer = document.querySelector('.title-mask-container');

    if (!titleGraphicGroup || !subtitleGraphicGroup || !titleMaskContainer) {
        console.warn('Animation elements not found');
        return;
    }

    // ScrollTrigger 플러그인 등록
    if (gsap.registerPlugin) {
        gsap.registerPlugin(ScrollTrigger);
    }

    // 타이틀 그룹 애니메이션 (위로 사라짐)
    gsap.to(titleGraphicGroup, {
        scrollTrigger: {
            trigger: titleMaskContainer,
            start: 'top 10%',
            end: 'top 10%',
            scrub: 1,
            markers: false
        },
        y: -150,
        opacity: 0,
        duration: 1,
        ease: 'power1.inOut'
    });

    // 서브타이틀 그룹 애니메이션 (아래로 사라짐)
    gsap.to(subtitleGraphicGroup, {
        scrollTrigger: {
            trigger: titleMaskContainer,
            start: 'top 10%',
            end: 'top 10%',
            scrub: 1,
            markers: false
        },
        y: 150,
        opacity: 0,
        duration: 1,
        ease: 'power1.inOut'
    });

    console.log('Title group animation initialized');
}
