/**
 * DetailedOverviewPage - Modal Management Script
 * 로그인, 회원가입, 메뉴 모달 관리
 */

// ==================== VIEWPORT MODULE ====================
const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024,
};

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

function closeModal(modalElement) {
    if (modalElement) {
        modalElement.classList.remove("show");
        document.body.style.overflow = "auto";
        console.log("Modal closed:", modalElement.id);
        return true;
    }
    return false;
}

function handleModalBackgroundClick(event, modalElement, closeCallback) {
    const modalContent = modalElement.querySelector('[class*="-content"]');
    if (
        event.target === modalElement ||
        (event.target !== modalContent && !modalContent.contains(event.target))
    ) {
        closeCallback();
    }
}

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

function handleMenuNavigation(itemName) {
    console.log(`Navigating to: ${itemName}`);
}

// ==================== CARD DATA & RENDERING MODULE ====================
/**
 * 백엔드 연동 가이드:
 *
 * 1. MOCK_DATA를 API 호출로 대체하세요:
 *    const data = await fetch(`/api/memes/${year}`).then(r => r.json());
 *
 * 2. 데이터 형식:
 *    [{
 *        id: number,
 *        title: string,
 *        views: string,
 *        imageUrl: string (선택사항, 기본값: assets/image0_108_70.png),
 *        iconUrl: string (선택사항, 기본값: assets/image0_108_70.png)
 *    }]
 *
 * 3. renderCards() 함수가 자동으로 데이터를 HTML로 변환합니다.
 */
const MOCK_DATA = {
    '2025': [
        { id: 1, title: '2025 Title 1', views: 'n Views', imageUrl: 'assets/image0_108_70.png', iconUrl: 'assets/image0_108_70.png' },
        { id: 2, title: '2025 Title 2', views: 'n Views', imageUrl: 'assets/image0_108_79.png', iconUrl: 'assets/image0_108_79.png' },
        { id: 3, title: '2025 Title 3', views: 'n Views', imageUrl: 'assets/image0_108_86.png', iconUrl: 'assets/image0_108_86.png' },
        { id: 4, title: '2025 Title 4', views: 'n Views', imageUrl: 'assets/image0_108_93.png', iconUrl: 'assets/image0_108_93.png' },
        { id: 5, title: '2025 Title 5', views: 'n Views', imageUrl: 'assets/image0_108_100.png', iconUrl: 'assets/image0_108_100.png' },
    ],
    '2024': [
        { id: 1, title: '2024 Title 1', views: 'n Views', imageUrl: 'assets/image0_108_70.png', iconUrl: 'assets/image0_108_70.png' },
        { id: 2, title: '2024 Title 2', views: 'n Views', imageUrl: 'assets/image0_108_79.png', iconUrl: 'assets/image0_108_79.png' },
        { id: 3, title: '2024 Title 3', views: 'n Views', imageUrl: 'assets/image0_108_86.png', iconUrl: 'assets/image0_108_86.png' },
        { id: 4, title: '2024 Title 4', views: 'n Views', imageUrl: 'assets/image0_108_93.png', iconUrl: 'assets/image0_108_93.png' },
        { id: 5, title: '2024 Title 5', views: 'n Views', imageUrl: 'assets/image0_108_100.png', iconUrl: 'assets/image0_108_100.png' },
    ],
    '2023': [
        { id: 1, title: '2023 Title 1', views: 'n Views', imageUrl: 'assets/image0_108_70.png', iconUrl: 'assets/image0_108_70.png' },
        { id: 2, title: '2023 Title 2', views: 'n Views', imageUrl: 'assets/image0_108_79.png', iconUrl: 'assets/image0_108_79.png' },
        { id: 3, title: '2023 Title 3', views: 'n Views', imageUrl: 'assets/image0_108_86.png', iconUrl: 'assets/image0_108_86.png' },
        { id: 4, title: '2023 Title 4', views: 'n Views', imageUrl: 'assets/image0_108_93.png', iconUrl: 'assets/image0_108_93.png' },
        { id: 5, title: '2023 Title 5', views: 'n Views', imageUrl: 'assets/image0_108_100.png', iconUrl: 'assets/image0_108_100.png' },
    ],
    '2022': [
        { id: 1, title: '2022 Title 1', views: 'n Views', imageUrl: 'assets/image0_108_70.png', iconUrl: 'assets/image0_108_70.png' },
        { id: 2, title: '2022 Title 2', views: 'n Views', imageUrl: 'assets/image0_108_79.png', iconUrl: 'assets/image0_108_79.png' },
        { id: 3, title: '2022 Title 3', views: 'n Views', imageUrl: 'assets/image0_108_86.png', iconUrl: 'assets/image0_108_86.png' },
        { id: 4, title: '2022 Title 4', views: 'n Views', imageUrl: 'assets/image0_108_93.png', iconUrl: 'assets/image0_108_93.png' },
        { id: 5, title: '2022 Title 5', views: 'n Views', imageUrl: 'assets/image0_108_100.png', iconUrl: 'assets/image0_108_100.png' },
    ],
};

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
 */
function createCardHTML(cardData, position, index) {
    const uniqueId = `pattern_${cardData.id}_${Math.random().toString(36).substr(2, 9)}`;
    const iconId = `icon_${cardData.id}_${Math.random().toString(36).substr(2, 9)}`;

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
 * 연도에 따른 카드를 렌더링하는 함수
 */
function renderCards(year) {
    const container = document.getElementById('cards-container');
    const cardsData = MOCK_DATA[year] || [];

    let htmlContent = '';
    cardsData.forEach((cardData, index) => {
        if (index < CARD_POSITIONS.length) {
            htmlContent += createCardHTML(cardData, CARD_POSITIONS[index], index);
        }
    });

    container.innerHTML = htmlContent;

    // 새로 추가된 카드들에 fade-in 애니메이션 적용
    setTimeout(() => {
        const cardElements = container.querySelectorAll('[data-card-id]');
        cardElements.forEach(el => {
            el.classList.add('fade-in');
            // 애니메이션 후 클래스 제거
            el.addEventListener('animationend', () => {
                el.classList.remove('fade-in');
            }, { once: true });
        });
    }, 0);
}

/**
 * 카드들을 fade-out 애니메이션으로 사라지게 하는 함수
 */
function fadeOutCards() {
    return new Promise((resolve) => {
        const container = document.getElementById('cards-container');
        const cardElements = container.querySelectorAll('[data-card-id]');

        if (cardElements.length === 0) {
            resolve();
            return;
        }

        let completedCount = 0;

        cardElements.forEach((el) => {
            el.classList.add('fade-out');

            el.addEventListener('animationend', () => {
                completedCount++;
                if (completedCount === cardElements.length) {
                    resolve();
                }
            }, { once: true });
        });
    });
}

// ==================== YEAR BUTTONS MODULE ====================
function initializeYearButtons() {
    const yearButtons = document.querySelectorAll('.year-button');

    // 초기: 첫 번째 버튼을 활성화하고 2025 카드 렌더링
    if (yearButtons.length > 0) {
        yearButtons[0].classList.add('year-button--active');
        renderCards('2025');
    }

    // 버튼 클릭 이벤트
    yearButtons.forEach(button => {
        button.addEventListener('click', async () => {
            // 중복 클릭 방지
            if (button.classList.contains('year-button--active')) {
                return;
            }

            const year = button.textContent.trim();

            // 1. 기존 카드들을 fade-out 애니메이션으로 사라지게 함
            await fadeOutCards();

            // 2. 새 데이터로 카드 렌더링
            renderCards(year);

            // 3. 활성 버튼 변경
            yearButtons.forEach(btn => btn.classList.remove('year-button--active'));
            button.classList.add('year-button--active');
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
