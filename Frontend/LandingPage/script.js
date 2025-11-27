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
    window.addEventListener("resize", () => {
        viewport.width = window.innerWidth;
        viewport.height = window.innerHeight;
        viewport.isMobile = window.innerWidth < 768;
        viewport.isTablet =
            window.innerWidth >= 768 && window.innerWidth < 1024;
        viewport.isDesktop = window.innerWidth >= 1024;
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

    // 타이틀 그룹 애니메이션 (위로 사라짐)
    gsap.to(titleGraphicGroup, {
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
    gsap.to(subtitleGraphicGroup, {
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

    console.log("Title group animation initialized");
}

// ==================== INFINITE SCROLL MODULE ====================
/**
 * Infinite Scroll Module
 * 카드 무한 스크롤 관리
 */

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

    // 원본 카드들 저장
    const originalCards = Array.from(cardsWrapper.querySelectorAll(".card"));
    const totalCards = originalCards.length;

    if (totalCards === 0) {
        console.warn("No cards found");
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
    cardsWrapper.style.animation = "none";
    cardsWrapper.style.transform = "translateX(0)";

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
                const firstCard = cardsWrapper.querySelector(".card");
                if (firstCard) {
                    cardsWrapper.appendChild(firstCard.cloneNode(true));
                    firstCard.remove();
                    currentScroll -= cardWidth + cardGap;
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
    startAnimation();

    console.log("Infinite scroll initialized with smooth card repositioning");
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
    });
}

/**
 * 폼 버튼 설정
 */
function setupFormButtons() {
    const signInButton = document.querySelector(".login-container .btn-signin");
    const signUpButton = document.querySelector(".login-container .btn-signup");

    signInButton?.addEventListener("click", (e) => {
        e.preventDefault();
        handleSignIn();
    });

    signUpButton?.addEventListener("click", (e) => {
        e.preventDefault();
        handleSignUp();
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
function handleSignIn() {
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

    // API 호출 시뮬레이션 (실제 API 호출로 대체 필요)
    setTimeout(() => {
        console.log("Sign In - ID:", idInput.value);
        console.log("Sign In - Password:", passwordInput.value);

        // 로그인 상태 업데이트
        isLoggedIn = true;
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

        // 버튼 복구
        signInButton.textContent = originalText;
        signInButton.disabled = false;

        alert("로그인 되었습니다.");
    }, 1000);
}

/**
 * 로그아웃 처리
 */
function handleLogout() {
    const confirmed = confirm("로그아웃 하시겠습니까?");

    if (confirmed) {
        isLoggedIn = false;
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

    if (!loginButton) {
        console.warn("Login button not found");
        return;
    }

    if (isLoggedIn) {
        loginButton.textContent = "LOGOUT";
        loginButton.setAttribute("data-logged-in", "true");
    } else {
        loginButton.textContent = "LOGIN";
        loginButton.removeAttribute("data-logged-in");
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
    // 로그인 버튼 클릭
    loginButtonElement.addEventListener("click", handleOpenLoginModal);

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

    createInputElements();
    setupInputListeners();
    setupSignupEventListeners();
}

/**
 * 입력 필드 생성
 */
function createInputElements() {
    const nicknameInput = document.getElementById("nicknameInput");
    const idInput = document.getElementById("idInput");
    const pwInput = document.getElementById("pwInput");

    // Nickname input
    if (nicknameInput && !nicknameInput.querySelector("input")) {
        const nicknameField = document.createElement("input");
        nicknameField.type = "text";
        nicknameField.id = "nicknameField";
        nicknameField.style.cssText = `
            width: 100%;
            height: 100%;
            padding: 0.5vw;
            border: none;
            border-radius: 12px;
            font-size: 1.04vw;
            background: rgba(255, 255, 255, 0.9);
            color: black;
            box-sizing: border-box;
            outline: none;
        `;
        nicknameInput.appendChild(nicknameField);
    }

    // ID input
    if (idInput && !idInput.querySelector("input")) {
        const idField = document.createElement("input");
        idField.type = "text";
        idField.id = "idField";
        idField.style.cssText = `
            width: 100%;
            height: 100%;
            padding: 0.5vw;
            border: none;
            border-radius: 12px;
            font-size: 1.04vw;
            background: rgba(255, 255, 255, 0.9);
            color: black;
            box-sizing: border-box;
            outline: none;
        `;
        idInput.appendChild(idField);
    }

    // Password input
    if (pwInput && !pwInput.querySelector("input")) {
        const pwField = document.createElement("input");
        pwField.type = "password";
        pwField.id = "pwField";
        pwField.style.cssText = `
            width: 100%;
            height: 100%;
            padding: 0.5vw;
            border: none;
            border-radius: 12px;
            font-size: 1.04vw;
            background: rgba(255, 255, 255, 0.9);
            color: black;
            box-sizing: border-box;
            outline: none;
        `;
        pwInput.appendChild(pwField);
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
 * 입력 필드 리스너 설정
 */
function setupInputListeners() {
    const nicknameField = document.getElementById("nicknameField");
    const idField = document.getElementById("idField");
    const pwField = document.getElementById("pwField");

    if (nicknameField) {
        nicknameField.addEventListener("input", (e) => {
            formData.nickname = e.target.value;
        });
    }

    if (idField) {
        idField.addEventListener("input", (e) => {
            formData.id = e.target.value;
        });
    }

    if (pwField) {
        pwField.addEventListener("input", (e) => {
            formData.password = e.target.value;
        });
    }
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
function handleSignup() {
    if (!validateForm()) {
        return;
    }

    console.log("회원가입 시도:", formData);
    alert(`환영합니다, ${formData.nickname}님!\n회원가입이 완료되었습니다.`);

    resetForm();
    closeSignupModal();
}

/**
 * 폼 리셋
 */
function resetForm() {
    formData.nickname = "";
    formData.id = "";
    formData.password = "";

    const nicknameField = document.getElementById("nicknameField");
    const idField = document.getElementById("idField");
    const pwField = document.getElementById("pwField");

    if (nicknameField) nicknameField.value = "";
    if (idField) idField.value = "";
    if (pwField) pwField.value = "";
}

/**
 * 가입 이벤트 리스너 설정
 */
function setupSignupEventListeners() {
    const submitButton = document.getElementById("submitButton");
    const submitText = document.getElementById("submitText");

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
    menuCloseButtonElement = document.querySelector(".Vector");

    if (!menuModalElement || !menuButtonElement || !menuCloseButtonElement) {
        console.warn("Menu modal elements not found");
        return;
    }

    setupMenuModalEventListeners();
}

/**
 * 메뉴 모달 이벤트 리스너 설정
 */
function setupMenuModalEventListeners() {
    // 메뉴 버튼 클릭
    menuButtonElement.addEventListener("click", handleOpenMenuModal);

    // 닫기 버튼 클릭
    menuCloseButtonElement.addEventListener("click", handleCloseMenuModal);

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
    // TODO: 라우팅 또는 페이지 이동 로직 구현
    console.log(`Navigating to: ${itemName}`);
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

    // 8. 접근성: Tab 키 네비게이션 지원 (추후 구현 가능)
    document.addEventListener("keydown", (event) => {
        if (event.key === "Tab") {
            // 포커스 관리 로직 추가 가능
        }
    });

    console.log("TrendKor Landing Page loaded successfully!");
});
