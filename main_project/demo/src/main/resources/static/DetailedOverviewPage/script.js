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

        // Enter 키로 로그인
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                handleSignIn();
            }
        });
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
        alert("서버와 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.");
    } finally {
        // 버튼 복구
        signInButton.textContent = originalText;
        signInButton.disabled = false;
    }
}

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

function updateLoginButton() {
    const loginButton = document.querySelector(".navbar__button--login");
    const nicknameElement = document.querySelector(".user-nickname");

    if (!loginButton) {
        console.warn("Login button not found");
        // 요소가 없을 때 약간의 지연 후 재시도
        setTimeout(updateLoginButton, 100);
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
        } else {
            // 닉네임 요소가 없을 때 재시도
            setTimeout(updateLoginButton, 100);
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
    // 로그인 버튼 클릭 - 로그인 상태가 아닐 때만 모달 열기
    loginButtonElement.addEventListener("click", () => {
        if (!isLoggedIn) {
            handleOpenLoginModal();
        }
    });

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
        alert("서버와 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.");
    }
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
 * 메뉴 네비게이션 처리
 * @param {string} itemName - 메뉴 항목명
 */
async function handleMenuNavigation(itemName) {
    console.log(`Menu navigation: ${itemName}`);

    // 연도 버튼 클릭 시 해당 연도의 밈 데이터 로드
    if (itemName === "2022" || itemName === "2023" || itemName === "2024" || itemName === "2025") {
        // 모달 닫기
        handleCloseMenuModal();

        // 기존 카드 fade-out
        await fadeOutCards();

        // 새 연도 카드 렌더링 (백엔드 API 호출)
        await renderCards(itemName);

        // 페이지의 연도 버튼 활성 상태 변경
        const yearButtons = document.querySelectorAll('.year-button');
        yearButtons.forEach(btn => {
            btn.classList.remove('year-button--active');
            if (btn.textContent.trim() === itemName) {
                btn.classList.add('year-button--active');
            }
        });
    }
    // HOME 클릭 시 LandingPage로 이동
    else if (itemName === "HOME") {
        window.location.href = "/";
    }
    // MEME OF THE YEAR 클릭 시
    else if (itemName === "MEME OF THE YEAR") {
        handleCloseMenuModal();
        // 추후 구현 가능
    }
}

// ==================== CARD DATA & RENDERING MODULE ====================

/**
 * 백엔드 API에서 연도별 밈 데이터를 가져오는 함수
 * 기능: REST API를 호출하여 특정 연도의 모든 밈 데이터를 가져옴
 * @param {string} year - 연도 (2022, 2023, 2024, 2025)
 * @returns {Promise<Array>} - 밈 데이터 배열
 */
async function fetchMemesByYear(year) {
    try {
        // 기능: GET 메서드로 해당 연도의 밈 데이터를 요청
        const response = await fetch(`http://localhost:8080/api/memes/${year}`);

        // 기능: HTTP 응답 상태 코드 확인 - 실패 시 에러 발생
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 기능: 응답 본문을 JSON 형식으로 파싱하여 밈 데이터 배열 추출
        const data = await response.json();
        console.log(`Fetched ${data.length} memes for year ${year}:`, data);

        // 기능: 성공적으로 가져온 밈 데이터 배열 반환
        return data;
    } catch (error) {
        // 기능: API 호출 실패 시 에러 로그 출력
        console.error(`Failed to fetch memes for year ${year}:`, error);
        // 기능: 에러 발생 시 빈 배열을 반환하여 애플리케이션 중단 방지
        return [];
    }
}

/**
 * 백엔드 데이터를 프론트엔드 카드 형식으로 매핑하는 함수
 * 기능: 백엔드 MemeData 객체를 프론트엔드에서 사용할 카드 데이터 형식으로 변환
 * @param {Object} memeData - 백엔드 MemeData 객체
 * @returns {Object} - 프론트엔드 카드 데이터 형식
 */
function mapMemeDataToCard(memeData) {
    // 기능: 한국어 제목과 영어 제목을 추출 (없을 경우 빈 문자열)
    const titleKor = memeData.title_kor || '';
    const titleEng = memeData.title_eng || '';
    // 기능: 한국어와 영어 제목을 <br> 태그로 연결하여 하나의 제목으로 결합
    const combinedTitle = titleKor && titleEng
        ? `${titleKor}<br>${titleEng}`
        : titleKor || titleEng || 'No Title';

    // 기능: 이미지 경로 추출 (기본값: assets/image0_108_70.png)
    let imagePath = memeData.imagePath || 'assets/image0_108_70.png';
    
    // 기능: 이미지 경로 정규화 - Spring Boot 정적 리소스 경로 처리
    // Spring Boot는 /static/을 기본 경로로 제공하므로 실제 접근 경로는 /DetailedOverviewPage/... 또는 /MemePicture/...
    if (imagePath && !imagePath.startsWith('http')) {
        // http로 시작하지 않는 경우에만 처리
        if (imagePath.startsWith('/MemePicture/')) {
            // MemePicture는 루트에 있으므로 그대로 유지
            imagePath = imagePath;
        } else if (imagePath.startsWith('/')) {
            // /로 시작하지만 DetailedOverviewPage가 없는 경우
            if (!imagePath.startsWith('/DetailedOverviewPage/') && !imagePath.startsWith('/MemePicture/')) {
                // assets로 시작하면 DetailedOverviewPage 추가
                if (imagePath.startsWith('/assets/')) {
                    imagePath = '/DetailedOverviewPage' + imagePath;
                } else {
                    imagePath = '/DetailedOverviewPage' + imagePath;
                }
            }
        } else {
            // 상대 경로인 경우
            if (imagePath.startsWith('MemePicture/')) {
                imagePath = '/' + imagePath;
            } else {
                imagePath = '/DetailedOverviewPage/' + imagePath;
            }
        }
    }

    // 기능: 아이콘 경로를 절대 경로로 설정
    let iconUrl = "watchdetail.png";
    if (!iconUrl.startsWith('/') && !iconUrl.startsWith('http')) {
        iconUrl = '/DetailedOverviewPage/' + iconUrl;
    }

    // 기능: 프론트엔드 카드 형식으로 데이터 매핑
    const mappedData = {
        id: memeData.id,                    // 기능: 밈 고유 ID
        title: combinedTitle,                // 기능: 결합된 제목 (한국어 + 영어)
        views: memeData.viewCount,          // 기능: 조회수
        imageUrl: imagePath,                // 기능: 처리된 이미지 경로
        iconUrl: iconUrl                    // 기능: 카드 아이콘 이미지 경로
    };

    console.log('🖼️ Image mapping:', memeData.imagePath, '→', mappedData.imageUrl);
    // 기능: 매핑된 카드 데이터 반환
    return mappedData;
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
 * 기능: 카드 데이터와 위치 정보를 받아서 HTML 문자열로 변환
 * @param {Object} cardData - 카드 데이터 (이미지 URL, 제목, 조회수 등)
 * @param {Object} position - 카드의 위치 정보 (left, top, viewsTop 등)
 * @param {number} index - 카드 인덱스
 * @returns {string} - 생성된 카드 HTML 문자열
 */
function createCardHTML(cardData, position, index) {
    console.log(`📝 Creating card #${index} with image:`, cardData.imageUrl);

    // 기능: 카드 이미지 컨테이너의 높이를 동적으로 계산 (조회수 위치와 카드 상단 위치 차이 기반)
    const heightStyle = `calc(${position.viewsTop} - ${position.top} - 3vw)`;

    return `
        <!-- 기능: 카드 이미지 컨테이너 - 절대 위치로 배치되고 이미지를 포함 -->
        <div class="card__image-container" 
             style="position: absolute; 
                    left: ${position.left}; 
                    top: ${position.top}; 
                    height: ${heightStyle}; 
                    overflow: hidden;" 
             data-card-id="${index}" 
             data-element="image">
            <img src="${cardData.imageUrl}" 
                 style="width: 100%; height: 100%; object-fit: contain; object-position: top center;" 
                 alt="${cardData.title}">
        </div>
        <!-- 기능: 카드 정보 컨테이너 - 추가 정보를 표시할 영역 -->
        <div class="card__info-container" style="left: ${position.left}; top: ${position.infoTop};" data-card-id="${index}" data-element="info"></div>
        <!-- 기능: 카드 제목 표시 영역 -->
        <div class="card__title" style="left: ${position.left}; top: ${position.titleTop}; font-size: 2.0vw;" data-card-id="${index}" data-element="title">${cardData.title}</div>
        <!-- 기능: 카드 조회수 표시 영역 -->
        <div class="card__views" style="left: ${position.viewsLeft}; top: ${position.viewsTop};" data-card-id="${index}" data-element="views">${cardData.views}</div>
        <!-- 기능: 카드 아이콘 버튼 - 클릭 시 상세 페이지로 이동하는 버튼 -->
        <button class="card__icon" 
                style="left: ${position.iconLeft}; top: ${position.iconTop}; cursor: pointer; border: none; background: transparent; padding: 0;" 
                data-card-id="${index}" 
                data-element="icon"
                data-meme-id="${cardData.id}"
                type="button"
                aria-label="카드 상세 보기">
            <img src="${cardData.iconUrl}" style="width: 100%; height: 100%; object-fit: cover;" alt="icon">
        </button>
    `;
}

/**
 * 연도에 따른 카드를 렌더링하는 함수 (백엔드 API 연동)
 * 기능: 특정 연도의 밈 데이터를 가져와서 카드 형태로 화면에 표시
 * @param {string} year - 연도 (2022, 2023, 2024, 2025)
 */
async function renderCards(year) {
    // 기능: 카드 컨테이너 요소 선택
    const container = document.getElementById('cards-container');

    // 기능: 백엔드 API에서 해당 연도의 밈 데이터를 비동기로 가져옴
    const backendData = await fetchMemesByYear(year);

    // 기능: 백엔드 데이터 형식을 프론트엔드 카드 형식으로 변환 (매핑)
    const cardsData = backendData.map(memeData => mapMemeDataToCard(memeData));

    console.log(`Rendering ${cardsData.length} cards for year ${year}`);

    // 기능: 각 카드 데이터를 HTML 문자열로 변환하여 하나의 문자열로 결합
    let htmlContent = '';
    cardsData.forEach((cardData, index) => {
        // 기능: 정의된 카드 위치 개수만큼만 카드 생성 (최대 5개)
        if (index < CARD_POSITIONS.length) {
            htmlContent += createCardHTML(cardData, CARD_POSITIONS[index], index);
        }
    });

    // 기능: 생성된 HTML을 컨테이너에 삽입하여 화면에 카드 표시
    container.innerHTML = htmlContent;

    // 기능: 새로 생성된 카드 아이콘 버튼들에 클릭 이벤트 리스너 추가
    setupCardIconButtons();

    // 기능: 새로 추가된 카드들에 fade-in 애니메이션 효과 적용
    setTimeout(() => {
        // 기능: 모든 카드 요소를 선택하여 fade-in 클래스 추가
        const cardElements = container.querySelectorAll('[data-card-id]');
        cardElements.forEach(el => {
            el.classList.add('fade-in');
            // 기능: 애니메이션 종료 후 fade-in 클래스를 제거하여 재사용 가능하도록 함
            el.addEventListener('animationend', () => {
                el.classList.remove('fade-in');
            }, { once: true });
        });
    }, 0);
}

/**
 * 카드 아이콘 버튼에 클릭 이벤트를 설정하는 함수
 * 기능: 모든 카드 아이콘 버튼에 클릭 이벤트와 호버 효과를 추가
 */
function setupCardIconButtons() {
    // 기능: 모든 카드 아이콘 버튼 요소 선택
    const cardIcons = document.querySelectorAll('.card__icon[data-meme-id]');
    
    // 기능: 각 카드 아이콘 버튼에 이벤트 리스너 추가
    cardIcons.forEach(iconButton => {
        // 기능: 클릭 이벤트 리스너 추가 - 카드 아이콘 클릭 시 상세 페이지로 이동
        iconButton.addEventListener('click', (e) => {
            // 기능: 기본 이벤트 동작 방지 및 이벤트 전파 중지
            e.preventDefault();
            e.stopPropagation();
            
            // 기능: 클릭된 버튼에서 memeId와 cardId 속성 값 추출
            const memeId = iconButton.getAttribute('data-meme-id');
            const cardId = iconButton.getAttribute('data-card-id');
            
            console.log(`Card icon clicked - Meme ID: ${memeId}, Card Index: ${cardId}`);
            
            // 기능: 카드 아이콘 클릭 핸들러 호출 (viewCount 증가 및 페이지 이동)
            handleCardIconClick(memeId, cardId);
        });
        
        // 기능: 마우스 호버 시 버튼 시각적 피드백 효과 추가
        iconButton.addEventListener('mouseenter', () => {
            // 기능: 호버 시 투명도 감소 및 크기 확대 효과
            iconButton.style.opacity = '0.8';
            iconButton.style.transform = 'scale(1.1)';
            iconButton.style.transition = 'opacity 0.2s, transform 0.2s';
        });
        
        // 기능: 마우스가 버튼을 벗어날 때 원래 상태로 복원
        iconButton.addEventListener('mouseleave', () => {
            // 기능: 호버 해제 시 원래 투명도와 크기로 복원
            iconButton.style.opacity = '1';
            iconButton.style.transform = 'scale(1)';
        });
    });
}

/**
 * viewCount를 증가시키는 API 호출 함수
 * 기능: 백엔드 API를 호출하여 특정 밈의 조회수를 1 증가시킴
 * @param {string} memeId - 밈 ID
 * @returns {Promise<Object>} - 업데이트된 MemeData 객체
 */
async function incrementViewCount(memeId) {
    try {
        // 기능: PUT 메서드로 viewCount 증가 API 호출
        const response = await fetch(`http://localhost:8080/api/memes/${memeId}/view`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // 기능: HTTP 응답 상태 코드 확인 - 실패 시 에러 발생
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 기능: 응답 데이터를 JSON 형식으로 파싱하여 반환
        const updatedData = await response.json();
        console.log(`ViewCount incremented for meme ${memeId}:`, updatedData.viewCount);
        return updatedData;
    } catch (error) {
        // 기능: API 호출 실패 시 에러 로그 출력 및 에러 전파
        console.error(`Failed to increment viewCount for meme ${memeId}:`, error);
        throw error;
    }
}

/**
 * 카드의 viewCount를 UI에 업데이트하는 함수
 * 기능: 특정 카드의 조회수 표시를 업데이트하고 애니메이션 효과를 적용
 * @param {string} cardId - 카드 인덱스
 * @param {number} newViewCount - 새로운 viewCount 값
 */
function updateCardViewCount(cardId, newViewCount) {
    // 기능: 해당 카드의 조회수 표시 요소 선택
    const viewsElement = document.querySelector(`[data-card-id="${cardId}"][data-element="views"]`);
    
    if (viewsElement) {
        // 기능: 조회수 텍스트를 새로운 값으로 업데이트
        viewsElement.textContent = newViewCount;
        
        // 기능: 업데이트 시각적 피드백을 위한 애니메이션 효과 추가
        viewsElement.style.transition = 'transform 0.2s';
        // 기능: 조회수 업데이트 시 일시적으로 크기를 확대하여 변경을 강조
        viewsElement.style.transform = 'scale(1.2)';
        // 기능: 200ms 후 원래 크기로 복원
        setTimeout(() => {
            viewsElement.style.transform = 'scale(1)';
        }, 200);
    } else {
        // 기능: 조회수 요소를 찾을 수 없을 경우 경고 로그 출력
        console.warn(`Views element not found for card ${cardId}`);
    }
}

/**
 * 카드 아이콘 클릭 핸들러
 * 기능: 카드 아이콘 클릭 시 조회수 증가 및 상세 페이지로 이동
 * @param {string} memeId - 밈 ID
 * @param {string} cardId - 카드 인덱스
 */
async function handleCardIconClick(memeId, cardId) {
    try {
        // 기능: 백엔드 API를 호출하여 해당 밈의 조회수를 1 증가시킴
        const updatedData = await incrementViewCount(memeId);
        
        // 기능: UI의 조회수 표시를 업데이트된 값으로 즉시 갱신
        updateCardViewCount(cardId, updatedData.viewCount);
        
        console.log(`카드 상세 보기 - Meme ID: ${memeId}, Updated ViewCount: ${updatedData.viewCount}`);
        
        // 기능: 조회수 증가 후 DetailedContentPage로 이동 (memeId를 쿼리 파라미터로 전달)
        // 기능: 상대 경로를 사용하여 DetailedContentPage의 index.html로 이동
        window.location.href = `../DetailedContentPage/index.html?id=${memeId}`;
        
    } catch (error) {
        // 기능: API 호출 실패 시 에러 로그 출력
        console.error('Failed to handle card icon click:', error);
        
        // 기능: 에러 발생 시에도 상세 페이지로 이동 (조회수 증가 실패해도 페이지 이동은 진행)
        // 사용자 경험을 위해 조회수 증가 실패해도 상세 페이지 이동은 허용
        window.location.href = `../DetailedContentPage/index.html?id=${memeId}`;
    }
}

/**
 * 카드들을 fade-out 애니메이션으로 사라지게 하는 함수
 * 기능: 모든 카드에 fade-out 애니메이션을 적용하고 완료될 때까지 대기하는 비동기 함수
 * @returns {Promise} - 모든 카드의 fade-out 애니메이션이 완료되면 resolve되는 Promise
 */
function fadeOutCards() {
    // 기능: Promise를 반환하여 애니메이션 완료를 비동기적으로 처리
    return new Promise((resolve) => {
        // 기능: 카드 컨테이너 요소 선택
        const container = document.getElementById('cards-container');
        // 기능: 컨테이너 내의 모든 카드 요소 선택
        const cardElements = container.querySelectorAll('[data-card-id]');

        // 기능: 카드가 없으면 즉시 Promise를 resolve하여 다음 단계로 진행
        if (cardElements.length === 0) {
            resolve();
            return;
        }

        // 기능: 애니메이션이 완료된 카드의 개수를 추적하는 카운터
        let completedCount = 0;

        // 기능: 각 카드 요소에 fade-out 애니메이션 적용
        cardElements.forEach((el) => {
            // 기능: fade-out CSS 클래스를 추가하여 사라지는 애니메이션 시작
            el.classList.add('fade-out');

            // 기능: 애니메이션이 끝나면 완료 카운터를 증가시키고, 모든 카드가 완료되면 Promise resolve
            el.addEventListener('animationend', () => {
                completedCount++;
                // 기능: 모든 카드의 애니메이션이 완료되면 Promise를 resolve하여 다음 작업 진행
                if (completedCount === cardElements.length) {
                    resolve();
                }
            }, { once: true }); // 기능: 이벤트 리스너를 한 번만 실행하도록 설정
        });
    });
}

// ==================== YEAR BUTTONS MODULE ====================
function initializeYearButtons() {
    const yearButtons = document.querySelectorAll('.year-button');

    // URL 파라미터에서 year 값 읽기
    const urlParams = new URLSearchParams(window.location.search);
    const yearFromUrl = urlParams.get('year');

    // 초기 연도 설정: URL 파라미터 > 기본값(2025)
    const initialYear = yearFromUrl || '2025';

    // 초기: 해당 연도 버튼을 활성화하고 카드 렌더링 (API 호출)
    if (yearButtons.length > 0) {
        // URL 파라미터에 맞는 버튼 찾기
        let activeButton = null;
        yearButtons.forEach(btn => {
            if (btn.textContent.trim() === initialYear) {
                activeButton = btn;
            }
        });

        // 활성 버튼이 없으면 첫 번째 버튼 사용
        if (!activeButton) {
            activeButton = yearButtons[0];
        }

        activeButton.classList.add('year-button--active');
        renderCards(initialYear); // async 함수지만 초기 로드는 await 불필요

        console.log(`Initialized with year: ${initialYear}`);
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

            // 2. 백엔드 API에서 새 데이터를 가져와 카드 렌더링
            await renderCards(year);

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

    // 페이지 로드 시 닉네임 표시 확인 (여러 시점에서 호출)
    updateLoginButton();
    
    // window.load 이벤트에서도 호출
    window.addEventListener('load', () => {
        updateLoginButton();
    });
    
    // 약간의 지연 후에도 호출 (VSCode 타이밍 이슈 대응)
    setTimeout(() => {
        updateLoginButton();
    }, 200);
    
    setTimeout(() => {
        updateLoginButton();
    }, 500);

    initializeYearButtons();
    console.log("✓ Year buttons initialized");

    initializeFooter();
    console.log("✓ Footer initialized");

    console.log("DetailedOverviewPage loaded successfully!");
});
