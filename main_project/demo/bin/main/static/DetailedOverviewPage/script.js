/**
 * DetailedOverviewPage - Modal Management Script
 * 로그인, 회원가입, 메뉴 모달 관리 및 년도별 밈 데이터 표시
 */

// ==================== URL PARAMETER MODULE ====================
/**
 * URL 파라미터에서 년도 정보를 추출하는 함수
 * @returns {string} 년도 문자열 (예: '2025', '2024') - 파라미터가 없으면 기본값 '2025'
 * @description URL 쿼리 스트링에서 'year' 파라미터를 읽어옴
 * 예: /DetailedOverviewPage/index.html?year=2024
 */
function getYearFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const year = urlParams.get('year');

    // 유효한 년도인지 확인 (2022~2025)
    if (year && ['2025', '2024', '2023', '2022'].includes(year)) {
        return year;
    }

    // 기본값: 2025
    return '2025';
}

/**
 * URL 파라미터를 변경하여 페이지를 새로고침하지 않고 URL만 업데이트
 * @param {string} year - 변경할 년도
 * @description 브라우저 히스토리를 업데이트하여 뒤로가기 지원
 */
function updateURLParameter(year) {
    const newURL = `${window.location.pathname}?year=${year}`;
    window.history.pushState({ year: year }, '', newURL);
    console.log(`URL updated to: ${newURL}`);
}

// ==================== VIEWPORT MODULE ====================
/**
 * 뷰포트 정보를 저장하는 객체
 * @description 화면 크기에 따라 모바일/태블릿/데스크톱을 구분
 */
const viewport = {
    width: window.innerWidth,         // 현재 뷰포트 너비
    height: window.innerHeight,       // 현재 뷰포트 높이
    isMobile: window.innerWidth < 768,                     // 모바일 여부 (768px 미만)
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,  // 태블릿 여부
    isDesktop: window.innerWidth >= 1024,                  // 데스크톱 여부 (1024px 이상)
};

/**
 * 뷰포트 크기 변경 감지 리스너 초기화 함수
 * @description 윈도우 크기 변경 시 viewport 객체를 업데이트
 */
function initializeViewportListener() {
    window.addEventListener("resize", () => {
        // 뷰포트 정보 업데이트
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
 * 모달을 여는 함수
 * @param {HTMLElement} modalElement - 열 모달 요소
 * @param {boolean} isMobile - 모바일 여부 (기본값: false)
 * @returns {boolean} 성공 여부
 * @description 모달을 표시하고 배경 스크롤을 비활성화
 */
function openModal(modalElement, isMobile = false) {
    if (modalElement) {
        // 모달 표시
        modalElement.classList.add("show");
        // 배경 스크롤 비활성화
        document.body.style.overflow = "hidden";

        // 모바일인 경우 상단 패딩 조정
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
 * 모달을 닫는 함수
 * @param {HTMLElement} modalElement - 닫을 모달 요소
 * @returns {boolean} 성공 여부
 * @description 모달을 숨기고 배경 스크롤을 활성화
 */
function closeModal(modalElement) {
    if (modalElement) {
        // 모달 숨김
        modalElement.classList.remove("show");
        // 배경 스크롤 활성화
        document.body.style.overflow = "auto";
        console.log("Modal closed:", modalElement.id);
        return true;
    }
    return false;
}

/**
 * 모달 배경 클릭 시 모달 닫기 처리 함수
 * @param {Event} event - 클릭 이벤트
 * @param {HTMLElement} modalElement - 모달 요소
 * @param {Function} closeCallback - 모달 닫기 콜백 함수
 * @description 모달 외부 클릭 시 모달을 닫음
 */
function handleModalBackgroundClick(event, modalElement, closeCallback) {
    const modalContent = modalElement.querySelector('[class*="-content"]');
    // 모달 외부 영역 클릭 시 모달 닫기
    if (
        event.target === modalElement ||
        (event.target !== modalContent && !modalContent.contains(event.target))
    ) {
        closeCallback();
    }
}

/**
 * ESC 키 입력 시 모달 닫기 처리 함수
 * @param {Event} event - 키보드 이벤트
 * @param {HTMLElement} modalElement - 모달 요소
 * @param {Function} closeCallback - 모달 닫기 콜백 함수
 * @description ESC 키 입력 시 열려있는 모달을 닫음
 */
function handleModalEscapeKey(event, modalElement, closeCallback) {
    if (event.key === "Escape" && modalElement?.classList.contains("show")) {
        closeCallback();
    }
}

// ==================== LOGIN FORM MODULE ====================
let isLoggedIn = false;

function initializeLoginForm() {
    restoreLoginState();
    setupInputValidation();
    setupFormButtons();
    setupLoginButtonEvent();
}

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

function setupFormButtons() {
    const signInButton = document.querySelector(".login-container .btn-signin");

    signInButton?.addEventListener("click", (e) => {
        e.preventDefault();
        handleSignIn();
    });
}

function setupLoginButtonEvent() {
    const loginButton = document.querySelector(".navbar__button--login");

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

function handleSignIn() {
    const idInput = document.querySelector(".login-container #user-id");
    const passwordInput = document.querySelector(
        ".login-container #user-password"
    );

    if (!idInput.value.trim()) {
        showError(idInput, "아이디를 입력해주세요");
        return;
    }

    if (!passwordInput.value) {
        showError(passwordInput, "비밀번호를 입력해주세요");
        return;
    }

    const signInButton = document.querySelector(".login-container .btn-signin");
    const originalText = signInButton.textContent;
    signInButton.textContent = "Loading...";
    signInButton.disabled = true;

    setTimeout(() => {
        console.log("Sign In - ID:", idInput.value);
        console.log("Sign In - Password:", passwordInput.value);

        isLoggedIn = true;
        saveLoginState();
        updateLoginButton();

        const loginModal = document.getElementById("login-modal");
        if (loginModal) {
            loginModal.classList.remove("show");
            document.body.style.overflow = "auto";
        }

        idInput.value = "";
        passwordInput.value = "";
        removeError(idInput);
        removeError(passwordInput);

        signInButton.textContent = originalText;
        signInButton.disabled = false;

        alert("로그인 되었습니다.");
    }, 1000);
}

function handleLogout() {
    const confirmed = confirm("로그아웃 하시겠습니까?");

    if (confirmed) {
        isLoggedIn = false;
        saveLoginState();
        updateLoginButton();
        alert("로그아웃 되었습니다.");
    }
}

function updateLoginButton() {
    const loginButton = document.querySelector(".navbar__button--login");

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

function saveLoginState() {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
}

function restoreLoginState() {
    const savedState = localStorage.getItem("isLoggedIn");

    if (savedState !== null) {
        isLoggedIn = JSON.parse(savedState);
        updateLoginButton();
    }
}

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

function showError(input, message) {
    removeError(input);

    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;
    errorDiv.setAttribute("role", "alert");
    errorDiv.setAttribute("aria-live", "polite");

    const rect = input.getBoundingClientRect();
    const container = document.querySelector(".login-container");
    const containerRect = container.getBoundingClientRect();

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
let loginModalElement = null;
let signupModalElement = null;
let loginButtonElement = null;
let signupButtonElement = null;
let loginModalCloseButtonElement = null;
let signupModalCloseButtonElement = null;

function initializeLoginModal() {
    loginModalElement = document.getElementById("login-modal");
    signupModalElement = document.getElementById("signup-modal");
    loginButtonElement = document.querySelector(".navbar__button--login");
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

function setupLoginModalEventListeners() {
    loginButtonElement.addEventListener("click", handleOpenLoginModal);

    if (loginModalCloseButtonElement) {
        loginModalCloseButtonElement.addEventListener(
            "click",
            handleCloseLoginModal
        );
    }

    signupButtonElement.addEventListener("click", handleSignupButtonClick);

    loginModalElement.addEventListener("click", (e) => {
        handleModalBackgroundClick(e, loginModalElement, handleCloseLoginModal);
    });

    document.addEventListener("keydown", (e) => {
        handleModalEscapeKey(e, loginModalElement, handleCloseLoginModal);
    });
}

function setupSignupModalEventListeners() {
    if (!signupModalElement) {
        console.warn("Signup modal element not found");
        return;
    }

    if (signupModalCloseButtonElement) {
        signupModalCloseButtonElement.addEventListener(
            "click",
            handleCloseSignupModal
        );
    }

    signupModalElement.addEventListener("click", (e) => {
        handleModalBackgroundClick(
            e,
            signupModalElement,
            handleCloseSignupModal
        );
    });

    document.addEventListener("keydown", (e) => {
        handleModalEscapeKey(e, signupModalElement, handleCloseSignupModal);
    });
}

function handleOpenLoginModal() {
    openModal(loginModalElement, viewport.isMobile);
}

function handleCloseLoginModal() {
    closeModal(loginModalElement);
}

function handleSignupButtonClick() {
    closeModal(loginModalElement);
    setTimeout(() => {
        openModal(signupModalElement, viewport.isMobile);
    }, 400);
}

function handleCloseSignupModal() {
    closeModal(signupModalElement);
    openModal(loginModalElement, viewport.isMobile);
}

// ==================== SIGN UP MODAL MODULE ====================
const formData = {
    nickname: "",
    id: "",
    password: "",
};

function initializeSignupModal() {
    signupModalElement = document.getElementById("signup-modal");

    if (!signupModalElement) {
        console.warn("Sign up modal element not found");
        return;
    }

    setupSignupInputListeners();
    setupSignupEventListeners();
}

function setupSignupInputListeners() {
    const nicknameInput = document.querySelector('#signup-nickname');
    const idInput = document.querySelector('#signup-id');
    const pwInput = document.querySelector('#signup-password');

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

function handleSignup() {
    if (!validateForm()) {
        return;
    }

    console.log("회원가입 시도:", formData);
    alert(`환영합니다, ${formData.nickname}님!\n회원가입이 완료되었습니다.`);

    resetForm();
    handleCloseSignupModal();
}

function resetForm() {
    formData.nickname = "";
    formData.id = "";
    formData.password = "";

    const nicknameInput = document.querySelector('#signup-nickname');
    const idInput = document.querySelector('#signup-id');
    const pwInput = document.querySelector('#signup-password');

    if (nicknameInput) nicknameInput.value = "";
    if (idInput) idInput.value = "";
    if (pwInput) pwInput.value = "";
}

function setupSignupEventListeners() {
    const submitButton = document.querySelector('.Rectangle4');
    const submitText = document.querySelector('.SignUp.ButtonText');
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
    }

    const inputs = [
        document.querySelector('#signup-nickname'),
        document.querySelector('#signup-id'),
        document.querySelector('#signup-password')
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
let menuModalElement = null;
let menuButtonElement = null;
let menuCloseButtonElement = null;

function initializeMenuModal() {
    menuModalElement = document.getElementById("menu-modal");
    menuButtonElement = document.querySelector(".navbar__button--menu");
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

function setupMenuModalEventListeners() {
    menuButtonElement.addEventListener("click", handleOpenMenuModal);

    // 닫기 버튼 클릭 (존재하는 경우만)
    if (menuCloseButtonElement) {
        menuCloseButtonElement.addEventListener("click", handleCloseMenuModal);
    }

    menuModalElement.addEventListener("click", (e) => {
        handleModalBackgroundClick(e, menuModalElement, handleCloseMenuModal);
    });

    document.addEventListener("keydown", (e) => {
        handleModalEscapeKey(e, menuModalElement, handleCloseMenuModal);
    });
}

function handleOpenMenuModal() {
    openModal(menuModalElement, viewport.isMobile);
}

function handleCloseMenuModal() {
    closeModal(menuModalElement);
}

// ==================== MENU ITEMS MODULE ====================
const menuItems = {
    ".Home": "HOME",
    ".MemeOfTheYear": "MEME OF THE YEAR",
    ".Year2025": "2025",
    ".Year2024": "2024",
    ".Year2023": "2023",
    ".Year2022": "2022",
};

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

function handleMenuItemClick(event) {
    const selector = Object.keys(menuItems).find((key) =>
        event.target.matches(key)
    );
    if (selector) {
        const itemName = menuItems[selector];
        console.log(`${itemName} clicked`);
        handleMenuNavigation(itemName);
    }
}

/**
 * 메뉴 항목 클릭 시 네비게이션 처리 함수
 * @param {string} itemName - 클릭된 메뉴 항목 이름 (예: '2025', 'HOME')
 * @description 년도 메뉴 클릭 시 해당 년도의 밈 카드를 표시
 */
async function handleMenuNavigation(itemName) {
    console.log(`Navigating to: ${itemName}`);

    // 년도 메뉴인 경우 (2022~2025)
    if (['2025', '2024', '2023', '2022'].includes(itemName)) {
        // 1. 메뉴 모달 닫기
        handleCloseMenuModal();

        // 2. URL 파라미터 업데이트 (히스토리에 추가)
        updateURLParameter(itemName);

        // 3. 기존 카드들을 fade-out 애니메이션으로 제거
        await fadeOutCards();

        // 4. 선택된 년도의 카드 렌더링
        renderCards(itemName);

        // 5. 년도 버튼 활성 상태 업데이트
        updateYearButtonsState(itemName);

        console.log(`Loaded ${itemName} meme data`);
    }
    // HOME 메뉴인 경우
    else if (itemName === 'HOME') {
        // LandingPage로 이동
        window.location.href = '/LandingPage/index.html';
    }
    // MEME OF THE YEAR 메뉴인 경우
    else if (itemName === 'MEME OF THE YEAR') {
        // 최신 년도(2025)로 스크롤 또는 이동
        console.log('Navigating to MEME OF THE YEAR section');
    }
}

// ==================== CARD DATA & RENDERING MODULE ====================
/**
 * 백엔드 API에서 밈 데이터를 가져오는 함수
 * @param {string} year - 조회할 년도 (예: '2025', '2024', '2023', '2022')
 * @returns {Promise<Array>} 밈 데이터 배열
 * @description Spring Boot API(/api/memes/{year})를 호출하여 해당 년도의 밈 데이터를 가져옴
 */
async function fetchMemesFromAPI(year) {
    try {
        console.log(`Fetching meme data for year: ${year}`);

        // API 엔드포인트 호출
        const response = await fetch(`/api/memes/${year}`);

        // HTTP 에러 체크
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // JSON 응답 파싱
        const data = await response.json();
        console.log(`Received ${data.length} memes for year ${year}`, data);

        return data;
    } catch (error) {
        console.error(`Error fetching memes for year ${year}:`, error);
        // 에러 발생 시 빈 배열 반환
        return [];
    }
}

/**
 * 백엔드 데이터를 프론트엔드 형식으로 변환하는 함수
 * @param {Object} memeData - 백엔드에서 받은 밈 데이터 객체
 * @returns {Object} 프론트엔드에서 사용할 카드 데이터 객체
 * @description 백엔드 MemeData 엔티티를 프론트엔드 카드 형식으로 변환
 */
function transformMemeData(memeData) {
    return {
        // 백엔드의 id를 그대로 사용
        id: memeData.id,

        // 한국어 제목 사용 (title_kor)
        title: memeData.title_kor || memeData.title_eng || '제목 없음',

        // 조회수는 백엔드에 없으므로 임시로 'n Views' 사용
        // 추후 백엔드에 viewCount 필드 추가 시 memeData.viewCount + ' Views'로 변경
        views: 'n Views',

        // 백엔드의 imagePath를 imageUrl로 사용
        imageUrl: memeData.imagePath || 'assets/default-image.png',

        // iconUrl도 동일한 이미지 사용
        iconUrl: memeData.imagePath || 'assets/default-image.png'
    };
}

// 카드 위치 설정 (원래 절대 위치)
const CARD_POSITIONS = [
    // Card 1 - Left Column, Row 1
    {
        left: '5.2%',
        top: '74.0vw',
        infoTop: '101.77vw',
        titleTop: '108.72vw',
        viewsLeft: '36.7%',
        viewsTop: '98.645vw',
        iconLeft: '42.7%',
        iconTop: '74.0vw'
    },
    // Card 2 - Right Column, Row 1
    {
        left: '51%',
        top: '74.0vw',
        infoTop: '101.77vw',
        titleTop: '108.72vw',
        viewsLeft: '82.5%',
        viewsTop: '98.645vw',
        iconLeft: '88.5%',
        iconTop: '74.0vw'
    },
    // Card 3 - Left Column, Row 2
    {
        left: '5.2%',
        top: '118.8vw',
        infoTop: '146.57000000000002vw',
        titleTop: '153.52vw',
        viewsLeft: '36.7%',
        viewsTop: '143.445vw',
        iconLeft: '42.7%',
        iconTop: '118.8vw'
    },
    // Card 4 - Right Column, Row 2
    {
        left: '51%',
        top: '118.8vw',
        infoTop: '146.57000000000002vw',
        titleTop: '153.52vw',
        viewsLeft: '82.5%',
        viewsTop: '143.445vw',
        iconLeft: '88.5%',
        iconTop: '118.8vw'
    },
    // Card 5 - Left Column, Row 3
    {
        left: '5.2%',
        top: '163.60000000000002vw',
        infoTop: '191.37vw',
        titleTop: '198.32vw',
        viewsLeft: '36.7%',
        viewsTop: '188.245vw',
        iconLeft: '42.7%',
        iconTop: '163.60000000000002vw'
    }
];

/**
 * 카드를 HTML로 생성하는 함수
 * @param {Object} cardData - 카드 데이터 (id, title, views, imageUrl, iconUrl)
 * @param {Object} position - 카드의 위치 정보 (left, top, infoTop, titleTop, viewsLeft, viewsTop, iconLeft, iconTop)
 * @param {number} index - 카드 인덱스 (0~4)
 * @returns {string} 카드 HTML 문자열
 * @description 밈 카드의 HTML 구조를 생성하여 반환
 */
function createCardHTML(cardData, position, index) {
    // SVG 패턴과 이미지를 위한 고유 ID 생성
    const uniqueId = `pattern_${cardData.id}_${Math.random().toString(36).substr(2, 9)}`;
    const iconId = `icon_${cardData.id}_${Math.random().toString(36).substr(2, 9)}`;

    // 카드 HTML 구조 생성
    return `
        <div class="card__image-container" style="left: ${position.left}; top: ${position.top};" data-card-id="${index}" data-element="image"></div>
        <div class="card__info-container" style="left: ${position.left}; top: ${position.infoTop};" data-card-id="${index}" data-element="info"></div>
        <div class="card__title" style="left: ${position.left}; top: ${position.titleTop};" data-card-id="${index}" data-element="title">${cardData.title}</div>
        <div class="card__views" style="left: ${position.viewsLeft}; top: ${position.viewsTop};" data-card-id="${index}" data-element="views">${cardData.views}</div>
        <div class="card__icon" style="left: ${position.iconLeft}; top: ${position.iconTop};" data-card-id="${index}" data-element="icon">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <path d="M120 0H0V120H120V0Z" fill="url(#${uniqueId})"/>
                <defs>
                    <pattern id="${uniqueId}" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlink:href="#${iconId}" transform="scale(0.00416667)"/>
                    </pattern>
                    <image id="${iconId}" xlink:href="${cardData.iconUrl}"/>
                </defs>
            </svg>
        </div>
    `;
}

/**
 * 연도에 따른 카드를 렌더링하는 함수 (비동기)
 * @param {string} year - 렌더링할 년도 (예: '2025', '2024')
 * @description 백엔드 API에서 해당 년도의 밈 데이터를 가져와 5개의 카드로 화면에 표시
 */
async function renderCards(year) {
    // 카드 컨테이너 요소 가져오기
    const container = document.getElementById('cards-container');

    // 로딩 상태 표시
    showLoadingState(container);

    try {
        // 백엔드 API에서 해당 년도의 밈 데이터 가져오기
        const apiData = await fetchMemesFromAPI(year);

        // 백엔드 데이터를 프론트엔드 형식으로 변환
        const cardsData = apiData.map(transformMemeData);

        // 데이터가 없는 경우 처리
        if (cardsData.length === 0) {
            showEmptyState(container, year);
            console.log(`No meme data found for year ${year}`);
            return;
        }

        // 모든 카드의 HTML을 생성
        let htmlContent = '';
        cardsData.forEach((cardData, index) => {
            // 최대 5개의 카드만 생성 (CARD_POSITIONS 배열의 길이만큼)
            if (index < CARD_POSITIONS.length) {
                htmlContent += createCardHTML(cardData, CARD_POSITIONS[index], index);
            }
        });

        // 컨테이너에 카드 HTML 삽입
        container.innerHTML = htmlContent;

        // 새로 추가된 카드들에 fade-in 애니메이션 적용
        setTimeout(() => {
            const cardElements = container.querySelectorAll('[data-card-id]');
            cardElements.forEach(el => {
                // fade-in 클래스 추가
                el.classList.add('fade-in');
                // 애니메이션 종료 후 클래스 제거
                el.addEventListener('animationend', () => {
                    el.classList.remove('fade-in');
                }, { once: true });
            });
        }, 0);

        console.log(`Rendered ${cardsData.length} cards for year ${year}`);
    } catch (error) {
        // 에러 발생 시 에러 상태 표시
        console.error('Error rendering cards:', error);
        showErrorState(container, year);
    }
}

/**
 * 카드들을 fade-out 애니메이션으로 사라지게 하는 함수
 * @returns {Promise} 모든 카드의 애니메이션이 완료되면 resolve되는 Promise
 * @description 현재 화면에 표시된 모든 카드를 fade-out 애니메이션으로 제거
 */
function fadeOutCards() {
    return new Promise((resolve) => {
        const container = document.getElementById('cards-container');
        const cardElements = container.querySelectorAll('[data-card-id]');

        // 카드가 없으면 즉시 resolve
        if (cardElements.length === 0) {
            resolve();
            return;
        }

        let completedCount = 0; // 애니메이션 완료된 카드 수

        // 각 카드 요소에 fade-out 애니메이션 적용
        cardElements.forEach((el) => {
            el.classList.add('fade-out');

            // 애니메이션 종료 이벤트 리스너
            el.addEventListener('animationend', () => {
                completedCount++;
                // 모든 카드의 애니메이션이 완료되면 resolve
                if (completedCount === cardElements.length) {
                    resolve();
                }
            }, { once: true });
        });
    });
}

// ==================== LOADING & ERROR STATE MODULE ====================
/**
 * 로딩 상태를 표시하는 함수
 * @param {HTMLElement} container - 카드 컨테이너 요소
 * @description API 호출 중 로딩 스피너 또는 메시지를 표시
 */
function showLoadingState(container) {
    container.innerHTML = `
        <div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); text-align: center;">
            <div style="font-size: 24px; color: #fff; margin-bottom: 10px;">Loading...</div>
            <div style="font-size: 16px; color: #aaa;">밈 데이터를 불러오는 중입니다...</div>
        </div>
    `;
}

/**
 * 데이터가 없을 때 빈 상태를 표시하는 함수
 * @param {HTMLElement} container - 카드 컨테이너 요소
 * @param {string} year - 조회한 년도
 * @description 해당 년도에 밈 데이터가 없을 때 메시지 표시
 */
function showEmptyState(container, year) {
    container.innerHTML = `
        <div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); text-align: center;">
            <div style="font-size: 24px; color: #fff; margin-bottom: 10px;">📭 데이터 없음</div>
            <div style="font-size: 16px; color: #aaa;">${year}년의 밈 데이터가 아직 등록되지 않았습니다.</div>
        </div>
    `;
}

/**
 * 에러 발생 시 에러 상태를 표시하는 함수
 * @param {HTMLElement} container - 카드 컨테이너 요소
 * @param {string} year - 조회한 년도
 * @description API 호출 실패 또는 기타 에러 발생 시 에러 메시지 표시
 */
function showErrorState(container, year) {
    container.innerHTML = `
        <div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); text-align: center;">
            <div style="font-size: 24px; color: #ff6b6b; margin-bottom: 10px;">⚠️ 오류 발생</div>
            <div style="font-size: 16px; color: #aaa;">
                ${year}년의 밈 데이터를 불러오는 중 문제가 발생했습니다.<br>
                잠시 후 다시 시도해주세요.
            </div>
        </div>
    `;
}

// ==================== YEAR BUTTONS MODULE ====================
/**
 * 년도 버튼의 활성 상태를 업데이트하는 함수
 * @param {string} year - 활성화할 년도
 * @description 선택된 년도 버튼에 'year-button--active' 클래스를 추가
 */
function updateYearButtonsState(year) {
    const yearButtons = document.querySelectorAll('.year-button');

    yearButtons.forEach(button => {
        const buttonYear = button.textContent.trim();

        // 해당 년도 버튼에만 활성 클래스 추가
        if (buttonYear === year) {
            button.classList.add('year-button--active');
        } else {
            button.classList.remove('year-button--active');
        }
    });

    console.log(`Year button state updated: ${year} is now active`);
}

/**
 * 년도 버튼 초기화 함수
 * @description 페이지 로드 시 URL 파라미터에서 년도를 읽어 해당 년도의 카드 렌더링
 */
function initializeYearButtons() {
    const yearButtons = document.querySelectorAll('.year-button');

    // URL 파라미터에서 년도 읽어오기
    const initialYear = getYearFromURL();

    // 초기 년도에 해당하는 버튼 활성화 및 카드 렌더링
    updateYearButtonsState(initialYear);
    renderCards(initialYear);

    console.log(`Initial year from URL: ${initialYear}`);

    // 각 년도 버튼에 클릭 이벤트 리스너 추가
    yearButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const year = button.textContent.trim();

            // 중복 클릭 방지 (이미 활성화된 버튼을 클릭한 경우)
            if (button.classList.contains('year-button--active')) {
                return;
            }

            console.log(`Year button clicked: ${year}`);

            // 1. URL 파라미터 업데이트
            updateURLParameter(year);

            // 2. 기존 카드들을 fade-out 애니메이션으로 사라지게 함
            await fadeOutCards();

            // 3. 선택된 년도의 새 데이터로 카드 렌더링
            renderCards(year);

            // 4. 활성 버튼 상태 변경
            updateYearButtonsState(year);
        });
    });
}

// ==================== FOOTER MODULE ====================
function initializeFooter() {
    const footer = document.querySelector(".Footer");

    if (footer) {
        console.log("Footer initialized");
    }
}

// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", function () {
    console.log("DetailedOverviewPage - Initializing...");

    initializeViewportListener();
    console.log("✓ Viewport listener initialized");

    initializeLoginModal();
    console.log("✓ Login modal initialized");

    initializeSignupModal();
    console.log("✓ Sign up modal initialized");

    initializeMenuModal();
    console.log("✓ Menu modal initialized");

    initializeMenuItems();
    console.log("✓ Menu items initialized");

    initializeLoginForm();
    console.log("✓ Login form initialized");

    initializeYearButtons();
    console.log("✓ Year buttons initialized");

    initializeFooter();
    console.log("✓ Footer initialized");

    console.log("DetailedOverviewPage loaded successfully!");
});
