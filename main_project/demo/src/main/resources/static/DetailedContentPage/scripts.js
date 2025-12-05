/**
 * DetailedContentPage - Modal Management Script
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
    const submitButton = document.querySelector('.signup-submit-btn');
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
    menuCloseButtonElement = document.querySelector("#menu-modal .menu-close");

    if (!menuModalElement || !menuButtonElement) {
        console.warn("Menu modal elements not found");
        return;
    }

    setupMenuModalEventListeners();
}

function setupMenuModalEventListeners() {
    menuButtonElement.addEventListener("click", handleOpenMenuModal);

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

// ==================== MEME DATA MODULE ====================

/**
 * URL 쿼리 파라미터에서 밈 ID를 추출하는 함수
 * @returns {string|null} - 밈 ID 또는 null
 */
function getMemeIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

/**
 * 백엔드 API에서 개별 밈 데이터를 가져오는 함수
 * @param {string} memeId - 밈 ID
 * @returns {Promise<Object>} - 밈 데이터 객체
 */
async function fetchMemeById(memeId) {
    try {
        const response = await fetch(`http://localhost:8080/api/memes/id/${memeId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(`Fetched meme data for ID ${memeId}:`, data);
        return data;
    } catch (error) {
        console.error(`Failed to fetch meme data for ID ${memeId}:`, error);
        throw error;
    }
}

/**
 * 한국어 밈 데이터를 HTML 형식으로 포맷팅하는 함수
 * @param {Object} memeData - 밈 데이터 객체
 * @returns {string} - 포맷팅된 HTML 문자열
 */
function formatKoreanContent(memeData) {
    const parts = [];
    
    if (memeData.meaning_kor) {
        parts.push(memeData.meaning_kor);
    }
    
    if (memeData.derivedFrom_kor) {
        parts.push(memeData.derivedFrom_kor);
    }
    
    if (memeData.example_kor) {
        parts.push(memeData.example_kor);
    }
    
    // 각 부분을 <br><br>로 구분하여 연결
    return parts.join('<br><br>');
}

/**
 * 영어 밈 데이터를 HTML 형식으로 포맷팅하는 함수
 * @param {Object} memeData - 밈 데이터 객체
 * @returns {string} - 포맷팅된 HTML 문자열
 */
function formatEnglishContent(memeData) {
    const parts = [];
    
    if (memeData.meaning_eng) {
        parts.push(memeData.meaning_eng);
    }
    
    if (memeData.derivedFrom_eng) {
        parts.push(memeData.derivedFrom_eng);
    }
    
    if (memeData.example_eng) {
        parts.push(memeData.example_eng);
    }
    
    // 각 부분을 <br><br>로 구분하여 연결
    return parts.join('<br><br>');
}

/**
 * 백엔드 데이터로 페이지 내용을 업데이트하는 함수
 * @param {Object} memeData - 밈 데이터 객체
 */
function updatePageContent(memeData) {
    // 제목 업데이트
    const titleElement = document.querySelector('.ThisIsTheTitle');
    if (titleElement && memeData.title_kor && memeData.title_eng) {
        titleElement.textContent = `${memeData.title_kor} / ${memeData.title_eng}`;
    } else if (titleElement && memeData.title_kor) {
        titleElement.textContent = memeData.title_kor;
    } else if (titleElement && memeData.title_eng) {
        titleElement.textContent = memeData.title_eng;
    }
    
    // 한국어 콘텐츠 업데이트
    const korContentElement = document.querySelector('.ContentSection__text--kor');
    if (korContentElement) {
        const korContent = formatKoreanContent(memeData);
        if (korContent) {
            korContentElement.innerHTML = korContent;
        } else {
            korContentElement.innerHTML = '한국어 데이터가 없습니다.';
        }
    }
    
    // 영어 콘텐츠 업데이트
    const engContentElement = document.querySelector('.ContentSection__text--eng');
    if (engContentElement) {
        const engContent = formatEnglishContent(memeData);
        if (engContent) {
            engContentElement.innerHTML = engContent;
        } else {
            engContentElement.innerHTML = 'English data is not available.';
        }
    }
    
    // 이미지 업데이트 (있는 경우)
    if (memeData.imagePath) {
        const sampleImage = document.querySelector('.SampleImage image');
        if (sampleImage) {
            let imagePath = memeData.imagePath;
            if (!imagePath.startsWith('/') && !imagePath.startsWith('http')) {
                imagePath = '/' + imagePath;
            }
            sampleImage.setAttribute('xlink:href', imagePath);
        }
    }
}

/**
 * 밈 데이터를 로드하고 페이지를 업데이트하는 함수
 */
async function loadMemeData() {
    const memeId = getMemeIdFromURL();
    
    if (!memeId) {
        console.warn('Meme ID not found in URL parameters');
        return;
    }
    
    try {
        const memeData = await fetchMemeById(memeId);
        updatePageContent(memeData);
        console.log('✓ Meme data loaded and page updated');
    } catch (error) {
        console.error('Failed to load meme data:', error);
        // 에러 발생 시 기본 메시지 표시
        const korContentElement = document.querySelector('.ContentSection__text--kor');
        const engContentElement = document.querySelector('.ContentSection__text--eng');
        if (korContentElement) {
            korContentElement.innerHTML = '데이터를 불러오는 중 오류가 발생했습니다.';
        }
        if (engContentElement) {
            engContentElement.innerHTML = 'An error occurred while loading data.';
        }
    }
}

// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", function () {
    console.log("DetailedContentPage - Initializing...");

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

    // Toggle switch initialization
    const toggleSwitch = document.querySelector('.ToggleSwitch');
    const detailPageDetail = document.querySelector('.DetailPageDetail');
    if (toggleSwitch) {
        toggleSwitch.addEventListener('click', function() {
            const currentState = this.getAttribute('data-state');
            const newState = currentState === 'Kor' ? 'Eng' : 'Kor';
            this.setAttribute('data-state', newState);

            // DetailPageDetail에 kor-mode 클래스 추가/제거
            if (newState === 'Kor') {
                detailPageDetail.classList.add('kor-mode');
            } else {
                detailPageDetail.classList.remove('kor-mode');
            }
        });

        // 초기 상태 설정 (Kor가 초기값이면 kor-mode 클래스 추가)
        const initialState = toggleSwitch.getAttribute('data-state');
        if (initialState === 'Kor') {
            detailPageDetail.classList.add('kor-mode');
        }
    }
    console.log("✓ Toggle switch initialized");

    // 밈 데이터 로드
    loadMemeData();

    console.log("DetailedContentPage loaded successfully!");
});
