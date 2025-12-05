/**
 * TrendKor Landing Page - Consolidated Script
 * 모든 기능을 하나의 파일로 통합
 */

// ==================== VIEWPORT MODULE ====================
/**
 * Viewport Module
 * 반응형 뷰포트 관리
 */

const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024,
};

/**
 * 뷰포트 변화 감지 및 업데이트
 */
function initializeViewportListener() {
    let resizeTimeout = null;

    window.addEventListener("resize", () => {
        viewport.width = window.innerWidth;
        viewport.height = window.innerHeight;
        viewport.isMobile = window.innerWidth < 768;
        viewport.isTablet =
            window.innerWidth >= 768 && window.innerWidth < 1024;
        viewport.isDesktop = window.innerWidth >= 1024;

        // 창 크기 변경이 끝난 후에 애니메이션 재초기화
        // (빈번한 재초기화를 피하기 위해 debounce 처리)
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            initializeInfiniteScroll();
            // 타이틀 애니메이션 완전히 재초기화 (ScrollTrigger 인스턴스 제거 및 요소 초기화)
            initializeTitleGroupAnimation();
            console.log("Animations re-initialized due to window resize");
        }, 300);
    });
}

// ==================== MODAL MODULE ====================
/**
 * Modal Module
 * 공통 모달 관리 유틸리티
 */

/**
 * 모달 열기
 * @param {HTMLElement} modalElement - 모달 요소
 * @param {boolean} isMobile - 모바일 여부
 */
function openModal(modalElement, isMobile = false) {
    if (modalElement) {
        modalElement.classList.add("show");
        document.body.style.overflow = "hidden";

        if (isMobile) {
            const modalContent = modalElement.querySelector(
                '[class*="-content"]'
            );
            if (modalContent) {
                modalContent.style.paddingTop = "1rem";
            }
        }
        console.log("Modal opened:", modalElement.id);
        return true;
    }
    console.error("Modal element not found");
    return false;
}

/**
 * 모달 닫기
 * @param {HTMLElement} modalElement - 모달 요소
 */
function closeModal(modalElement) {
    if (modalElement) {
        modalElement.classList.remove("show");
        document.body.style.overflow = "auto";
        console.log("Modal closed:", modalElement.id);
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
function handleModalBackgroundClick(event, modalElement, closeCallback) {
    const modalContent = modalElement.querySelector('[class*="-content"]');
    if (
        event.target === modalElement ||
        (event.target !== modalContent && !modalContent.contains(event.target))
    ) {
        closeCallback();
    }
}

/**
 * ESC 키로 모달 닫기
 * @param {Event} event - 키보드 이벤트
 * @param {HTMLElement} modalElement - 모달 요소
 * @param {Function} closeCallback - 닫기 콜백 함수
 */
function handleModalEscapeKey(event, modalElement, closeCallback) {
    if (event.key === "Escape" && modalElement?.classList.contains("show")) {
        closeCallback();
    }
}

// ==================== ANIMATION MODULE ====================
/**
 * Animation Module
 * GSAP을 이용한 애니메이션 관리
 */

// ScrollTrigger 인스턴스 저장
let titleScrollTriggers = [];

/**
 * 타이틀 그룹 애니메이션 설정
 * 빨간색과 파란색 타이틀이 스크롤 시 동시에 위아래로 사라지는 효과
 */
function initializeTitleGroupAnimation() {
    // GSAP 라이브러리 확인
    if (typeof gsap === "undefined") {
        console.warn("GSAP library not loaded");
        return;
    }

    const titleGraphicGroup = document.querySelector(".title-graphic-group");
    const subtitleGraphicGroup = document.querySelector(
        ".subtitle-graphic-group"
    );
    const titleMaskContainer = document.querySelector(".title-mask-container");

    if (!titleGraphicGroup || !subtitleGraphicGroup || !titleMaskContainer) {
        console.warn("Animation elements not found");
        return;
    }

    // ScrollTrigger 플러그인 등록
    if (gsap.registerPlugin) {
        gsap.registerPlugin(ScrollTrigger);
    }

    // 기존 ScrollTrigger의 progress 저장 (창 크기 변경 후 상태 복원용)
    let savedProgress = 0;
    if (titleScrollTriggers.length > 0 && titleScrollTriggers[0].scrollTrigger) {
        savedProgress = titleScrollTriggers[0].scrollTrigger.progress;
    }

    // 기존 ScrollTrigger 인스턴스 제거
    titleScrollTriggers.forEach(trigger => {
        if (trigger && trigger.scrollTrigger) {
            trigger.scrollTrigger.kill();
        }
    });
    titleScrollTriggers = [];

    // 요소를 초기 상태로 리셋
    gsap.set([titleGraphicGroup, subtitleGraphicGroup], {
        y: 0,
        opacity: 1
    });

    // 타이틀 그룹 애니메이션 (위로 사라짐)
    const titleAnimation = gsap.to(titleGraphicGroup, {
        scrollTrigger: {
            trigger: titleMaskContainer,
            start: "top 10%",
            end: "top 10%",
            scrub: 1,
            markers: false,
        },
        y: -150,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
    });

    // 서브타이틀 그룹 애니메이션 (아래로 사라짐)
    const subtitleAnimation = gsap.to(subtitleGraphicGroup, {
        scrollTrigger: {
            trigger: titleMaskContainer,
            start: "top 10%",
            end: "top 10%",
            scrub: 1,
            markers: false,
        },
        y: 150,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
    });

    // 애니메이션 인스턴스 저장
    titleScrollTriggers.push(titleAnimation, subtitleAnimation);

    // 저장된 progress로 상태 복원 (창 크기 변경 후에도 애니메이션 상태 유지)
    if (savedProgress > 0) {
        titleScrollTriggers.forEach(trigger => {
            if (trigger && trigger.scrollTrigger) {
                const st = trigger.scrollTrigger;
                const scrollPos = st.start + (st.end - st.start) * savedProgress;
                st.scroll(scrollPos);
            }
        });
    }

    console.log("Title group animation initialized");
}

// ==================== INFINITE SCROLL MODULE ====================
/**
 * Infinite Scroll Module
 * 카드 무한 스크롤 관리
 */

let animationFrameId = null;

/**
 * 카드 Infinite Scroll 초기화
 */
function initializeInfiniteScroll() {
    const cardsWrapper = document.querySelector(".cards-wrapper");
    const cardsContainer = document.querySelector(".cards-container");

    if (!cardsWrapper || !cardsContainer) {
        console.warn("Cards container not found");
        return;
    }

    // 이전 애니메이션 중단
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }

    // 원본 카드들 저장
    const originalCards = Array.from(cardsWrapper.querySelectorAll(".card"));
    const totalCards = originalCards.length;

    if (totalCards === 0) {
        console.warn("No cards found");
        return;
    }

    let currentScroll = 0;
    let isPaused = false;
    const scrollSpeed = 2; // px per frame

    // 동적으로 카드 크기 계산 함수
    function getCardDimensions() {
        const firstCard = cardsWrapper.querySelector(".card");
        if (!firstCard) return { cardWidth: 0, cardGap: 0 };

        const cardWidth = firstCard.offsetWidth;
        const cardGap = parseFloat(window.getComputedStyle(cardsWrapper).gap) || 0;
        return { cardWidth, cardGap };
    }

    // CSS 애니메이션 제거
    cardsWrapper.style.animation = "none";
    cardsWrapper.style.transform = "translateX(0)";

    /**
     * 애니메이션 루프 - 부드러운 처리
     */
    function animate() {
        if (!isPaused) {
            currentScroll += scrollSpeed;

            // 트랜지션 제거하고 직접 transform 적용
            cardsWrapper.style.transform = `translateX(-${currentScroll}px)`;

            // 동적으로 카드 크기 재계산
            const { cardWidth, cardGap } = getCardDimensions();
            const oneCardDistance = cardWidth + cardGap;

            // 첫 번째 카드가 완전히 화면 밖으로 나갔는지 확인
            if (oneCardDistance > 0 && currentScroll >= oneCardDistance) {
                // 첫 번째 카드를 맨 뒤로 이동
                const firstCard = cardsWrapper.querySelector(".card");
                if (firstCard) {
                    cardsWrapper.appendChild(firstCard.cloneNode(true));
                    firstCard.remove();
                    currentScroll -= oneCardDistance;

                    // 부드러운 전환을 위해 즉시 업데이트
                    cardsWrapper.style.transition = "none";
                    cardsWrapper.style.transform = `translateX(-${currentScroll}px)`;

                    // 다음 프레임에 transition 복구
                    requestAnimationFrame(() => {
                        cardsWrapper.style.transition = "none";
                    });
                }
            }
        }
        animationFrameId = requestAnimationFrame(animate);
    }

    /**
     * 마우스 호버 시 일시 정지
     */
    cardsContainer.addEventListener("mouseenter", () => {
        isPaused = true;
    });

    /**
     * 마우스 이탈 시 재시작
     */
    cardsContainer.addEventListener("mouseleave", () => {
        isPaused = false;
    });

    // 터치 디바이스 지원
    cardsContainer.addEventListener("touchstart", () => {
        isPaused = true;
    });

    cardsContainer.addEventListener("touchend", () => {
        isPaused = false;
    });

    // 애니메이션 시작
    animate();

    console.log("Infinite scroll initialized with responsive card sizing");
}

// ==================== LOGIN FORM MODULE ====================
/**
 * Login Form Module
 * 로그인 폼 검증 및 처리
 */

// 로그인 상태 관리
let isLoggedIn = false;

/**
 * 로그인 폼 초기화
 */
function initializeLoginForm() {
    // 저장된 로그인 상태 복구
    restoreLoginState();

    // 입력 필드 검증
    setupInputValidation();

    // 버튼 이벤트
    setupFormButtons();

    // 로그인 버튼 이벤트
    setupLoginButtonEvent();
}

/**
 * 입력 필드 검증 설정
 */
function setupInputValidation() {
    const idInput = document.querySelector(".login-container #user-id");
    const passwordInput = document.querySelector(
        ".login-container #user-password"
    );

    [idInput, passwordInput].forEach((input) => {
        if (!input) return;
        input.addEventListener("input", validateInput);
        input.addEventListener("blur", validateInput);
        input.addEventListener("focus", removeError);

        // Enter 키로 로그인
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                handleSignIn();
            }
        });
    });
}

/**
 * 폼 버튼 설정
 */
function setupFormButtons() {
    const signInButton = document.querySelector(".login-container .btn-signin");

    signInButton?.addEventListener("click", (e) => {
        e.preventDefault();
        handleSignIn();
    });
}

/**
 * 네비게이션 바의 로그인 버튼 이벤트 설정
 */
function setupLoginButtonEvent() {
    const loginButton = document.querySelector(".login-button");

    if (!loginButton) {
        console.warn("Login button not found");
        return;
    }

    loginButton.addEventListener("click", () => {
        if (isLoggedIn) {
            handleLogout();
        }
    });
}

/**
 * 로그인 처리
 */
async function handleSignIn() {
    const idInput = document.querySelector(".login-container #user-id");
    const passwordInput = document.querySelector(
        ".login-container #user-password"
    );

    // 입력값 검증
    if (!idInput.value.trim()) {
        showError(idInput, "아이디를 입력해주세요");
        return;
    }

    if (!passwordInput.value) {
        showError(passwordInput, "비밀번호를 입력해주세요");
        return;
    }

    // 로딩 상태 표시
    const signInButton = document.querySelector(".login-container .btn-signin");
    const originalText = signInButton.textContent;
    signInButton.textContent = "Loading...";
    signInButton.disabled = true;

    try {
        // 백엔드 API 호출
        const response = await fetch("http://localhost:8080/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: idInput.value.trim(),
                password: passwordInput.value,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            // 로그인 성공
            console.log("Login successful:", data);

            // 로그인 상태 업데이트
            isLoggedIn = true;
            // 닉네임 저장
            localStorage.setItem("userNickname", data.nickname || idInput.value);
            saveLoginState();
            updateLoginButton();

            // 로그인 모달 닫기
            const loginModal = document.getElementById("login-modal");
            if (loginModal) {
                loginModal.classList.remove("show");
                document.body.style.overflow = "auto";
            }

            // 폼 초기화
            idInput.value = "";
            passwordInput.value = "";
            removeError(idInput);
            removeError(passwordInput);

            alert(`${data.nickname}님, 환영합니다!`);
        } else {
            // 로그인 실패
            console.error("Login failed:", data);
            if (typeof data === "string") {
                alert(data);
            } else {
                alert(data.message || "로그인에 실패했습니다.");
            }
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("로그인에 실패했습니다.");
    } finally {
        // 버튼 복구
        signInButton.textContent = originalText;
        signInButton.disabled = false;
    }
}

/**
 * 로그아웃 처리
 */
function handleLogout() {
    const confirmed = confirm("로그아웃 하시겠습니까?");

    if (confirmed) {
        isLoggedIn = false;
        localStorage.removeItem("userNickname");
        saveLoginState();
        updateLoginButton();
        alert("로그아웃 되었습니다.");
    }
}

/**
 * 네비게이션 바의 로그인 버튼 업데이트
 */
function updateLoginButton() {
    const loginButton = document.querySelector(".login-button");
    const nicknameElement = document.querySelector(".user-nickname");

    if (!loginButton) {
        console.warn("Login button not found");
        return;
    }

    if (isLoggedIn) {
        loginButton.textContent = "LOGOUT";
        loginButton.setAttribute("data-logged-in", "true");

        // 닉네임 표시
        if (nicknameElement) {
            const nickname = localStorage.getItem("userNickname") || "사용자";
            nicknameElement.textContent = nickname;
            nicknameElement.style.display = "block";
        }
    } else {
        loginButton.textContent = "LOGIN";
        loginButton.removeAttribute("data-logged-in");

        // 닉네임 숨기기
        if (nicknameElement) {
            nicknameElement.style.display = "none";
        }
    }
}

/**
 * 로그인 상태 로컬 스토리지에 저장
 */
function saveLoginState() {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
}

/**
 * 저장된 로그인 상태 복구
 */
function restoreLoginState() {
    const savedState = localStorage.getItem("isLoggedIn");

    if (savedState !== null) {
        isLoggedIn = JSON.parse(savedState);
        updateLoginButton();
    }
}

/**
 * 회원가입 처리
 */
function handleSignUp() {
    console.log("Sign Up clicked");
    // TODO: 회원가입 페이지로 이동 또는 회원가입 모달 표시
    alert("회원가입 페이지로 이동합니다.");
}

/**
 * 입력 필드 검증
 * @param {Event} event - 입력 이벤트
 */
function validateInput(event) {
    const input = event.target;
    const value = input.value.trim();

    if (input.id === "user-id") {
        if (!value) {
            showError(input, "아이디를 입력해주세요");
        } else if (value.length < 3) {
            showError(input, "아이디는 3자 이상이어야 합니다");
        } else {
            removeError(input);
        }
    } else if (input.id === "user-password") {
        if (!value) {
            showError(input, "비밀번호를 입력해주세요");
        } else if (value.length < 6) {
            showError(input, "비밀번호는 6자 이상이어야 합니다");
        } else {
            removeError(input);
        }
    }
}

/**
 * 에러 메시지 표시
 * @param {HTMLElement} input - 입력 필드
 * @param {string} message - 에러 메시지
 */
function showError(input, message) {
    removeError(input);

    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;
    errorDiv.setAttribute("role", "alert");
    errorDiv.setAttribute("aria-live", "polite");

    // 입력 필드의 위치와 크기를 가져옴
    const rect = input.getBoundingClientRect();
    const container = document.querySelector(".login-container");
    const containerRect = container.getBoundingClientRect();

    // 입력 필드 아래에 위치하도록 설정
    const topPosition = rect.bottom - containerRect.top + 0.3;
    const leftPosition = rect.left - containerRect.left;

    errorDiv.style.position = "absolute";
    errorDiv.style.top = topPosition + "px";
    errorDiv.style.left = leftPosition + "px";
    errorDiv.style.width = rect.width + "px";

    input.parentElement.insertBefore(errorDiv, input.nextElementSibling);
    input.setAttribute("aria-invalid", "true");
    input.classList.add("input-error");
}

/**
 * 에러 메시지 제거
 * @param {Event|HTMLElement} event - 이벤트 또는 입력 요소
 */
function removeError(event) {
    const input =
        typeof event === "object" && event.target ? event.target : event;
    const container = input.parentElement;
    const errorDiv = container.querySelector(".error-message");

    if (errorDiv) {
        errorDiv.remove();
    }

    input.removeAttribute("aria-invalid");
    input.classList.remove("input-error");
}

// ==================== LOGIN MODAL MODULE ====================
/**
 * Login Modal Module
 * 로그인 모달 관련 기능 관리
 */

let loginModalElement = null;
let signupModalElement = null;
let loginButtonElement = null;
let signupButtonElement = null;
let loginModalCloseButtonElement = null;
let signupModalCloseButtonElement = null;

/**
 * 로그인 모달 초기화
 */
function initializeLoginModal() {
    loginModalElement = document.getElementById("login-modal");
    signupModalElement = document.getElementById("signup-modal");
    loginButtonElement = document.querySelector(".login-button");
    signupButtonElement = document.querySelector(".btn-signup");
    loginModalCloseButtonElement = document.querySelector(
        ".login-container .close-btn"
    );
    signupModalCloseButtonElement = document.querySelector(
        "#signup-modal #closeButton"
    );

    console.log("DOMContentLoaded - loginModal:", loginModalElement);
    console.log("DOMContentLoaded - signupModal:", signupModalElement);
    console.log("DOMContentLoaded - loginButton:", loginButtonElement);
    console.log("DOMContentLoaded - signupButton:", signupButtonElement);
    console.log(
        "DOMContentLoaded - loginModalCloseBtn:",
        loginModalCloseButtonElement
    );
    console.log(
        "DOMContentLoaded - signupModalCloseBtn:",
        signupModalCloseButtonElement
    );

    if (
        !loginModalElement ||
        !signupModalElement ||
        !loginButtonElement ||
        !signupButtonElement
    ) {
        console.warn("Login/Signup modal elements not found");
        return;
    }

    setupLoginModalEventListeners();
    setupSignupModalEventListeners();
}

/**
 * 로그인 모달 이벤트 리스너 설정
 */
function setupLoginModalEventListeners() {
    // 로그인 버튼 클릭 - 로그인 상태가 아닐 때만 모달 열기
    loginButtonElement.addEventListener("click", () => {
        if (!isLoggedIn) {
            handleOpenLoginModal();
        }
    });

    // 닫기 버튼 클릭
    if (loginModalCloseButtonElement) {
        loginModalCloseButtonElement.addEventListener(
            "click",
            handleCloseLoginModal
        );
    }

    // Sign Up 버튼 클릭 - 로그인 모달 닫고 가입 모달 열기
    signupButtonElement.addEventListener("click", handleSignupButtonClick);

    // 배경 클릭
    loginModalElement.addEventListener("click", (e) => {
        handleModalBackgroundClick(e, loginModalElement, handleCloseLoginModal);
    });

    // ESC 키
    document.addEventListener("keydown", (e) => {
        handleModalEscapeKey(e, loginModalElement, handleCloseLoginModal);
    });
}

/**
 * 가입 모달 이벤트 리스너 설정
 */
function setupSignupModalEventListeners() {
    if (!signupModalElement) {
        console.warn("Signup modal element not found");
        return;
    }

    // 닫기 버튼 클릭
    if (signupModalCloseButtonElement) {
        signupModalCloseButtonElement.addEventListener(
            "click",
            handleCloseSignupModal
        );
    }

    // 배경 클릭
    signupModalElement.addEventListener("click", (e) => {
        handleModalBackgroundClick(
            e,
            signupModalElement,
            handleCloseSignupModal
        );
    });

    // ESC 키
    document.addEventListener("keydown", (e) => {
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
    openModal(loginModalElement, viewport.isMobile);
}

// ==================== SIGN UP MODAL MODULE ====================
/**
 * Sign Up Modal Module
 * 회원가입 모달 관련 기능 관리
 */

// State to store form data
const formData = {
    nickname: "",
    id: "",
    password: "",
};

/**
 * 가입 모달 초기화
 */
function initializeSignupModal() {
    signupModalElement = document.getElementById("signup-modal");

    if (!signupModalElement) {
        console.warn("Sign up modal element not found");
        return;
    }

    setupSignupInputListeners();
    setupSignupEventListeners();
}

/**
 * 입력 필드 리스너 설정 - SignupPage 버전
 */
function setupSignupInputListeners() {
    // 회원가입 모달 내부의 input만 선택 (index.html의 실제 ID 사용)
    const nicknameInput = document.querySelector('#signup-modal #signup-nickname');
    const idInput = document.querySelector('#signup-modal #signup-id');
    const pwInput = document.querySelector('#signup-modal #signup-password');

    if (nicknameInput) {
        nicknameInput.addEventListener('input', (e) => {
            formData.nickname = e.target.value;
        });
    }

    if (idInput) {
        idInput.addEventListener('input', (e) => {
            formData.id = e.target.value;
        });
    }

    if (pwInput) {
        pwInput.addEventListener('input', (e) => {
            formData.password = e.target.value;
        });
    }
}

/**
 * 닉네임 유효성 검사
 * 조건:
 * - 최소 2자 이상
 * - 최대 20자 이하
 */
function validateNickname(nickname) {
    if (nickname.length < 2) {
        return {
            valid: false,
            message: "닉네임은 최소 2자 이상이어야 합니다.",
        };
    }
    if (nickname.length > 20) {
        return { valid: false, message: "닉네임은 20자 이하여야 합니다." };
    }
    return { valid: true, message: "" };
}

/**
 * 아이디 유효성 검사
 * 조건:
 * - 최소 4자 이상
 * - 영문(a-z, A-Z), 숫자(0-9), 언더스코어(_)만 포함
 */
function validateId(id) {
    const idRegex = /^[a-zA-Z0-9_]{4,}$/;
    if (!idRegex.test(id)) {
        return {
            valid: false,
            message:
                "아이디는 4자 이상의 영문, 숫자, 언더스코어로 구성되어야 합니다.",
        };
    }
    return { valid: true, message: "" };
}

/**
 * 비밀번호 유효성 검사
 * 조건:
 * - 최소 8자 이상
 * - 영문 포함
 * - 숫자 포함
 * - 특수문자(!@#$%^&*) 포함
 */
function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
        return {
            valid: false,
            message:
                "비밀번호는 8자 이상이며 영문, 숫자, 특수문자를 포함해야 합니다.",
        };
    }
    return { valid: true, message: "" };
}


/**
 * 전체 폼 유효성 검사
 */
function validateForm() {
    const nicknameValidation = validateNickname(formData.nickname);
    const idValidation = validateId(formData.id);
    const passwordValidation = validatePassword(formData.password);

    if (!nicknameValidation.valid) {
        alert(nicknameValidation.message);
        return false;
    }
    if (!idValidation.valid) {
        alert(idValidation.message);
        return false;
    }
    if (!passwordValidation.valid) {
        alert(passwordValidation.message);
        return false;
    }
    return true;
}

/**
 * 회원가입 제출 처리
 */
async function handleSignup() {
    if (!validateForm()) {
        return;
    }

    try {
        // 백엔드 API 호출
        const response = await fetch("http://localhost:8080/api/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: formData.id,
                password: formData.password,
                nickname: formData.nickname,
            }),
        });

        const data = await response.text();

        if (response.ok) {
            // 회원가입 성공
            console.log("Signup successful:", data);
            alert(`환영합니다, ${formData.nickname}님!\n회원가입이 완료되었습니다.`);
            resetForm();
            handleCloseSignupModal();
        } else {
            // 회원가입 실패
            console.error("Signup failed:", data);
            alert(data || "회원가입에 실패했습니다.");
        }
    } catch (error) {
        console.error("Signup error:", error);
        alert("회원가입에 실패햇습니다");
    }
}

/**
 * 폼 리셋 - SignupPage 버전
 */
function resetForm() {
    formData.nickname = "";
    formData.id = "";
    formData.password = "";

    // 회원가입 모달 내부의 input만 선택 (index.html의 실제 ID 사용)
    const nicknameInput = document.querySelector('#signup-modal #signup-nickname');
    const idInput = document.querySelector('#signup-modal #signup-id');
    const pwInput = document.querySelector('#signup-modal #signup-password');

    if (nicknameInput) nicknameInput.value = "";
    if (idInput) idInput.value = "";
    if (pwInput) pwInput.value = "";
}

/**
 * 가입 이벤트 리스너 설정 - SignupPage 버전
 */
function setupSignupEventListeners() {
    // index.html의 실제 ID와 선택자 사용
    const submitButton = document.querySelector('#signup-modal #submitButton');
    const submitText = document.querySelector('#signup-modal #submitText');
    const closeButton = document.querySelector('#signup-modal #closeButton');
    const backButton = document.querySelector('#signup-modal .Frame');

    if (submitButton) {
        submitButton.addEventListener("click", (e) => {
            e.preventDefault();
            handleSignup();
        });
        submitButton.style.cursor = "pointer";
    }

    if (submitText) {
        submitText.addEventListener("click", (e) => {
            e.preventDefault();
            handleSignup();
        });
        submitText.style.cursor = "pointer";
    }

    if (closeButton) {
        closeButton.addEventListener("click", handleCloseSignupModal);
    }

    if (backButton) {
        backButton.addEventListener("click", handleCloseSignupModal);
        backButton.style.cursor = "pointer";
    }

    // 엔터키로 회원가입 - index.html의 실제 ID 사용
    const inputs = [
        document.querySelector('#signup-modal #signup-nickname'),
        document.querySelector('#signup-modal #signup-id'),
        document.querySelector('#signup-modal #signup-password')
    ];
    inputs.forEach(input => {
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    handleSignup();
                }
            });
        }
    });
}

// ==================== MENU MODAL MODULE ====================
/**
 * Menu Modal Module
 * 메뉴 모달 관련 기능 관리
 */

let menuModalElement = null;
let menuButtonElement = null;
let menuCloseButtonElement = null;

/**
 * 메뉴 모달 초기화
 */
function initializeMenuModal() {
    menuModalElement = document.getElementById("menu-modal");
    menuButtonElement = document.querySelector(".menu-text");
    // 메뉴 모달의 X 버튼을 올바르게 선택 (menu-modal 내의 Vector)
    menuCloseButtonElement = document.querySelector("#menu-modal .Vector");

    if (!menuModalElement || !menuButtonElement) {
        console.warn("Menu modal elements not found");
        return;
    }

    if (!menuCloseButtonElement) {
        console.warn("Menu close button not found");
    }

    setupMenuModalEventListeners();
}

/**
 * 메뉴 모달 이벤트 리스너 설정
 */
function setupMenuModalEventListeners() {
    // 메뉴 버튼 클릭
    menuButtonElement.addEventListener("click", handleOpenMenuModal);

    // 닫기 버튼 클릭 (존재하는 경우만)
    if (menuCloseButtonElement) {
        menuCloseButtonElement.addEventListener("click", handleCloseMenuModal);
    }

    // 배경 클릭
    menuModalElement.addEventListener("click", (e) => {
        handleModalBackgroundClick(e, menuModalElement, handleCloseMenuModal);
    });

    // ESC 키
    document.addEventListener("keydown", (e) => {
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

// ==================== MENU ITEMS MODULE ====================
/**
 * Menu Items Module
 * 메뉴 항목 관리
 */

const menuItems = {
    ".Home": "HOME",
    ".MemeOfTheYear": "MEME OF THE YEAR",
    ".Year2025": "2025",
    ".Year2024": "2024",
    ".Year2023": "2023",
    ".Year2022": "2022",
};

/**
 * 메뉴 항목 초기화
 */
function initializeMenuItems() {
    Object.keys(menuItems).forEach((selector) => {
        const element = document.querySelector(selector);
        if (element) {
            element.addEventListener("click", handleMenuItemClick);
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
    const selector = Object.keys(menuItems).find((key) =>
        event.target.matches(key)
    );
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
    console.log(`Navigating to: ${itemName}`);

    // 연도 버튼 클릭 시 DetailedOverviewPage로 이동
    if (itemName === "2022" || itemName === "2023" || itemName === "2024" || itemName === "2025") {
        // 연도를 쿼리 파라미터로 전달하여 페이지 이동
        window.location.href = `/detailed-overview?year=${itemName}`;
    }
    // HOME 클릭 시 페이지 상단으로 스크롤
    else if (itemName === "HOME") {
        handleCloseMenuModal();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    // MEME OF THE YEAR 클릭 시 해당 섹션으로 스크롤
    else if (itemName === "MEME OF THE YEAR") {
        handleCloseMenuModal();
        const memeSection = document.querySelector(".meme-section-title");
        if (memeSection) {
            memeSection.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
}

// ==================== MEME OF THE YEAR MODULE ====================
/**
 * Meme Of The Year Module
 * viewCount가 가장 높은 밈을 가져와서 표시
 */

/**
 * 모든 연도의 밈 데이터를 가져오는 함수
 * @returns {Promise<Array>} - 모든 밈 데이터 배열
 */
async function fetchAllMemes() {
    const years = ['2022', '2023', '2024', '2025'];
    const allMemes = [];

    try {
        // 모든 연도의 밈을 병렬로 가져오기
        const promises = years.map(year => 
            fetch(`http://localhost:8080/api/memes/${year}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .catch(error => {
                    console.error(`Failed to fetch memes for year ${year}:`, error);
                    return []; // 에러 발생 시 빈 배열 반환
                })
        );

        const results = await Promise.all(promises);
        
        // 모든 결과를 하나의 배열로 합치기
        results.forEach(memes => {
            allMemes.push(...memes);
        });

        console.log(`Fetched ${allMemes.length} total memes from all years`);
        return allMemes;
    } catch (error) {
        console.error('Failed to fetch all memes:', error);
        return [];
    }
}

/**
 * viewCount가 가장 높은 밈을 찾는 함수
 * @param {Array} memes - 밈 데이터 배열
 * @returns {Object|null} - viewCount가 가장 높은 밈 객체 또는 null
 */
function findMemeWithHighestViewCount(memes) {
    if (!memes || memes.length === 0) {
        return null;
    }

    // viewCount를 기준으로 내림차순 정렬
    const sortedMemes = [...memes].sort((a, b) => {
        const viewCountA = a.viewCount || 0;
        const viewCountB = b.viewCount || 0;
        return viewCountB - viewCountA;
    });

    return sortedMemes[0];
}

/**
 * viewCount가 가장 높은 밈을 페이지에 표시하는 함수
 */
async function loadMemeOfTheYear() {
    try {
        // 모든 밈 데이터 가져오기
        const allMemes = await fetchAllMemes();
        
        if (allMemes.length === 0) {
            console.warn('No memes found');
            return;
        }

        // viewCount가 가장 높은 밈 찾기
        const topMeme = findMemeWithHighestViewCount(allMemes);
        
        if (!topMeme) {
            console.warn('No meme with highest viewCount found');
            return;
        }

        console.log('Meme of the Year:', topMeme);

        // 이미지 표시
        const rectangle3 = document.querySelector('.rectangle-3');
        if (rectangle3 && topMeme.imagePath) {
            let imagePath = topMeme.imagePath;
            // 경로가 상대 경로인 경우 처리
            if (!imagePath.startsWith('/') && !imagePath.startsWith('http')) {
                imagePath = '/' + imagePath;
            }
            
            // 이미지가 로드된 후 비율에 맞춰 높이 조정
            const img = new Image();
            img.onload = function() {
                const containerWidth = rectangle3.offsetWidth || window.innerWidth * 0.72917;
                const imageAspectRatio = img.height / img.width;
                const calculatedHeight = containerWidth * imageAspectRatio;
                
                // 최소 높이와 최대 높이 설정
                // meme-title의 top 위치(168.614vw)를 침범하지 않도록 제한
                // rectangle-3의 top: 140.489vw, meme-title의 top: 168.614vw
                // 최대 높이 = 168.614vw - 140.489vw = 28.125vw (약간의 여유를 두어 27vw로 설정)
                const minHeight = window.innerWidth * 0.20833; // 20.833vw를 픽셀로 변환
                const maxHeight = window.innerWidth * 0.27; // 27vw를 픽셀로 변환 (meme-title 침범 방지)
                const finalHeight = Math.min(Math.max(calculatedHeight, minHeight), maxHeight);
                
                rectangle3.style.height = finalHeight + 'px';
                
                rectangle3.style.backgroundImage = `url(${imagePath})`;
                rectangle3.style.backgroundSize = 'contain';
                rectangle3.style.backgroundPosition = 'center';
                rectangle3.style.backgroundRepeat = 'no-repeat';
                rectangle3.style.backgroundColor = 'var(--color-light-blue)';
            };
            img.onerror = function() {
                // 이미지 로드 실패 시 기본 설정
                rectangle3.style.backgroundImage = `url(${imagePath})`;
                rectangle3.style.backgroundSize = 'contain';
                rectangle3.style.backgroundPosition = 'center';
                rectangle3.style.backgroundRepeat = 'no-repeat';
                rectangle3.style.backgroundColor = 'var(--color-light-blue)';
            };
            img.src = imagePath;
        }

        // 제목 표시
        const memeTitle = document.querySelector('.meme-title');
        if (memeTitle) {
            // 한국어 제목과 영어 제목을 모두 표시
            const titleParts = [];
            
            if (topMeme.title_kor) {
                titleParts.push(topMeme.title_kor);
            }
            
            if (topMeme.title_eng) {
                titleParts.push(topMeme.title_eng);
            }
            
            // 제목이 하나도 없으면 기본 메시지 표시
            if (titleParts.length === 0) {
                memeTitle.textContent = 'No Title';
            } else {
                // 두 제목을 줄바꿈으로 연결하여 표시
                memeTitle.innerHTML = titleParts.join('<br>');
            }
        }

        console.log('✓ Meme of the Year loaded successfully');
    } catch (error) {
        console.error('Failed to load Meme of the Year:', error);
    }
}

// ==================== MAIN INITIALIZATION ====================
/**
 * DOM이 로드되었을 때 모든 기능 초기화
 */
document.addEventListener("DOMContentLoaded", function () {
    console.log("TrendKor Landing Page - Initializing...");

    // 1. 뷰포트 관리
    initializeViewportListener();
    console.log("✓ Viewport listener initialized");

    // 2. 카드 무한 스크롤
    initializeInfiniteScroll();
    console.log("✓ Infinite scroll initialized");

    // 3. 타이틀 애니메이션
    initializeTitleGroupAnimation();
    console.log("✓ Title animation initialized");

    // 4. 로그인 모달
    initializeLoginModal();
    console.log("✓ Login modal initialized");

    // 4-1. 가입 모달
    initializeSignupModal();
    console.log("✓ Sign up modal initialized");

    // 5. 메뉴 모달
    initializeMenuModal();
    console.log("✓ Menu modal initialized");

    // 6. 메뉴 항목
    initializeMenuItems();
    console.log("✓ Menu items initialized");

    // 7. 로그인 폼
    initializeLoginForm();
    console.log("✓ Login form initialized");

    // 8. 푸터 초기화
    initializeFooter();
    console.log("✓ Footer initialized");

    // 9. Meme of the Year 로드
    loadMemeOfTheYear();
    console.log("✓ Meme of the Year loading...");

    // 10. 접근성: Tab 키 네비게이션 지원 (추후 구현 가능)
    document.addEventListener("keydown", (event) => {
        if (event.key === "Tab") {
            // 포커스 관리 로직 추가 가능
        }
    });

    console.log("TrendKor Landing Page loaded successfully!");
});

// ==================== FOOTER MODULE ====================
/**
 * Footer Module
 * 푸터 관련 기능 관리
 */

/**
 * 푸터 초기화
 */
function initializeFooter() {
    const footer = document.querySelector(".Footer");

    if (footer) {
        // Initialize footer functionality here
        console.log("Footer initialized");
    }
}
