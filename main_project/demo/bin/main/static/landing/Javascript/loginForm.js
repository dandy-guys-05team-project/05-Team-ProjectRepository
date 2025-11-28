/**
 * Login Form Module
 * 로그인 폼 검증 및 처리
 */

// 로컬 스토리지에 로그인 상태를 기록할 때 사용되는 키 값
const LOGIN_STATE_KEY = 'trendkor-login-state';
// 백엔드 인증 API 엔드포인트를 한 곳에서 관리해 경로 변경 시 수정을 단순화
const API_ENDPOINTS = {
    login: '/api/users/login',
    signup: '/api/users/signup',
};

// 로그인 상태 및 현재 로그인한 사용자의 nickname을 프론트에서 캐시
let isLoggedIn = false;
let currentNickname = null;

/**
 * 로그인 폼 초기화
 */
export function initializeLoginForm() {
    const form = document.querySelector('.login-modal .login-form');

    if (!form) {
        console.warn('Login form not found');
        return;
    }

    // 저장된 로그인 상태 복구
    restoreLoginState();

    // 폼 제출 이벤트
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSignIn();
    });

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
    const inputs = document.querySelectorAll('.login-modal .form-input');
    inputs.forEach(input => {
        input.addEventListener('input', validateInput);
        input.addEventListener('blur', validateInput);
        input.addEventListener('focus', removeError);
    });
}

/**
 * 폼 버튼 설정
 */
function setupFormButtons() {
    const signInButton = document.querySelector('.login-modal .btn-signin');
    const signUpButton = document.querySelector('.login-modal .btn-signup');

    signInButton?.addEventListener('click', async (e) => {
        e.preventDefault();
        await handleSignIn();
    });

    signUpButton?.addEventListener('click', async (e) => {
        e.preventDefault();
        await handleSignUp();
    });
}

/**
 * 네비게이션 바의 로그인 버튼 이벤트 설정
 */
function setupLoginButtonEvent() {
    const loginButton = document.querySelector('.login-button');
    
    if (!loginButton) {
        console.warn('Login button not found');
        return;
    }

    loginButton.addEventListener('click', (event) => {
        if (isLoggedIn) {
            event.preventDefault();
            event.stopImmediatePropagation();
            handleLogout();
        }
    }, { capture: true });
}

/**
 * 로그인 처리
 */
async function handleSignIn() {
    const idInput = document.querySelector('.login-modal #user-id');
    const passwordInput = document.querySelector('.login-modal #user-password');

    // 입력값 검증
    if (!idInput.value.trim()) {
        showError(idInput, '아이디를 입력해주세요');
        return;
    }

    if (!passwordInput.value) {
        showError(passwordInput, '비밀번호를 입력해주세요');
        return;
    }

    // 백엔드 요청에 사용할 최종 입력값을 정리
    const username = idInput.value.trim();
    const password = passwordInput.value;

    const signInButton = document.querySelector('.login-modal .btn-signin');
    // 버튼을 비활성화하고 로딩 텍스트를 표시한 뒤, 완료되면 원래 상태로 돌리는 함수 수신
    const resetButtonState = setButtonLoadingState(signInButton, true, 'Loading...');

    try {
        // 실제 Spring Boot API로 로그인 요청을 전송
        const response = await fetch(API_ENDPOINTS.login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || '로그인에 실패했습니다.');
        }

        // 로그인 성공 시 nickname을 포함한 JSON 응답 파싱
        const data = await response.json();
        
        console.log('=== 로그인 응답 분석 ===');
        console.log('전체 응답:', JSON.stringify(data, null, 2));
        console.log('data.nickname 존재:', !!data.nickname);
        console.log('data.nickname 값:', data.nickname);
        console.log('data.nickname 타입:', typeof data.nickname);
        
        // 백엔드에서 nickname을 반환 (nickname은 필수 필드)
        // data.nickname이 명시적으로 존재하고 유효한 값인지 확인
        if (!data.nickname || typeof data.nickname !== 'string' || !data.nickname.trim()) {
            console.error('❌ Nickname not found in login response:', data);
            throw new Error('서버에서 사용자 정보를 가져오는 중 오류가 발생했습니다.');
        }
        
        const nickname = data.nickname.trim();
        console.log('✅ 추출된 nickname:', nickname);

        // 인증 성공 시 상태 정보와 UI를 모두 업데이트
        isLoggedIn = true;
        currentNickname = nickname;
        console.log('✅ currentNickname 설정됨:', currentNickname);
        saveLoginState();
        updateLoginButton();

        closeLoginModal();
        resetFormFields(idInput, passwordInput);

        alert(data.message || '로그인 되었습니다.');
    } catch (error) {
        alert(error.message || '로그인에 실패했습니다.');
    } finally {
        resetButtonState();
    }
}

/**
 * 로그아웃 처리
 */
function handleLogout() {
    const confirmed = confirm('로그아웃 하시겠습니까?');
    
    if (confirmed) {
        isLoggedIn = false;
        currentNickname = null;
        saveLoginState();
        updateLoginButton();
        alert('로그아웃 되었습니다.');
    }
}

/**
 * 네비게이션 바의 로그인 버튼 업데이트
 */
function updateLoginButton() {
    console.log('=== updateLoginButton 호출됨 ===');
    console.log('isLoggedIn:', isLoggedIn);
    console.log('currentNickname:', currentNickname);
    
    const loginButton = document.querySelector('.login-button');
    
    if (!loginButton) {
        console.warn('Login button not found');
        return;
    }

    if (isLoggedIn) {
        console.log('로그인 상태 - currentNickname:', currentNickname);
        loginButton.textContent = 'LOGOUT';
        loginButton.setAttribute('data-logged-in', 'true');
        if (currentNickname) {
            loginButton.setAttribute('data-nickname', currentNickname);
        }
        console.log('setUsernameDisplay 호출 전 - 전달할 값:', currentNickname);
        setUsernameDisplay(currentNickname);
    } else {
        loginButton.textContent = 'LOGIN';
        loginButton.removeAttribute('data-logged-in');
        loginButton.removeAttribute('data-nickname');
        setUsernameDisplay(null);
    }
}

/**
 * 로그인 상태 로컬 스토리지에 저장
 */
function saveLoginState() {
    const state = {
        isLoggedIn,
        nickname: currentNickname,
    };
    // 직렬화된 JSON 문자열로 저장해 새로고침 이후에도 상태를 복원
    localStorage.setItem(LOGIN_STATE_KEY, JSON.stringify(state));
}

/**
 * 저장된 로그인 상태 복구
 */
function restoreLoginState() {
    console.log('=== restoreLoginState 호출됨 ===');
    const savedState = localStorage.getItem(LOGIN_STATE_KEY);
    console.log('로컬 스토리지 저장된 값:', savedState);
    
    if (savedState !== null) {
        try {
            const parsedState = JSON.parse(savedState);
            console.log('파싱된 상태:', parsedState);
            // 저장된 값이 있다면 불린/문자열 형태로 다시 변환
            isLoggedIn = !!parsedState.isLoggedIn;
            // nickname만 사용 (이전 버전 호환성을 위해 username도 확인하되, nickname이 우선)
            // 단, username이 저장되어 있으면 서버에서 nickname을 다시 받아와야 함
            currentNickname = parsedState.nickname || null;
            console.log('복원된 isLoggedIn:', isLoggedIn);
            console.log('복원된 currentNickname:', currentNickname);
            console.log('parsedState.nickname:', parsedState.nickname);
        } catch (error) {
            console.error('Failed to parse login state', error);
            localStorage.removeItem(LOGIN_STATE_KEY);
            isLoggedIn = false;
            currentNickname = null;
        }

        updateLoginButton();
    } else {
        console.log('로컬 스토리지에 저장된 상태 없음');
    }
}

/**
 * 회원가입 처리
 */
async function handleSignUp() {
    const idInput = document.querySelector('.login-modal #user-id');
    const passwordInput = document.querySelector('.login-modal #user-password');

    const username = idInput?.value.trim();
    const password = passwordInput?.value;

    if (!username || !password) {
        alert('아이디와 비밀번호를 모두 입력해주세요.');
        return;
    }

    const signUpButton = document.querySelector('.login-modal .btn-signup');
    // 회원가입 버튼도 로그인과 동일한 UX를 제공하도록 로딩 상태를 적용
    const resetButtonState = setButtonLoadingState(signUpButton, true, 'Signing Up...');

    try {
        // 신규 계정 생성 요청 전송
        const message = await sendAuthRequest(API_ENDPOINTS.signup, { username, password });
        alert(message || '회원가입이 완료되었습니다. 로그인해주세요.');
    } catch (error) {
        alert(error.message || '회원가입에 실패했습니다.');
    } finally {
        resetButtonState();
    }
}

/**
 * 입력 필드 검증
 * @param {Event} event - 입력 이벤트
 */
function validateInput(event) {
    const input = event.target;
    const value = input.value.trim();

    if (input.id === 'user-id') {
        if (!value) {
            showError(input, '아이디를 입력해주세요');
        } else if (value.length < 3) {
            showError(input, '아이디는 3자 이상이어야 합니다');
        } else {
            removeError(input);
        }
    } else if (input.id === 'user-password') {
        if (!value) {
            showError(input, '비밀번호를 입력해주세요');
        } else if (value.length < 6) {
            showError(input, '비밀번호는 6자 이상이어야 합니다');
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

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.setAttribute('role', 'alert');
    errorDiv.setAttribute('aria-live', 'polite');

    input.parentElement.appendChild(errorDiv);
    input.setAttribute('aria-invalid', 'true');
    input.classList.add('input-error');
}

/**
 * 에러 메시지 제거
 * @param {Event|HTMLElement} event - 이벤트 또는 입력 요소
 */
function removeError(event) {
    const input = typeof event === 'object' && event.target ? event.target : event;
    const errorDiv = input.parentElement.querySelector('.error-message');

    if (errorDiv) {
        errorDiv.remove();
    }

    input.removeAttribute('aria-invalid');
    input.classList.remove('input-error');
}

/**
 * 공통 API 요청 함수
 * @param {string} url - 요청 URL
 * @param {object} payload - 전송 데이터
 * @returns {Promise<string>}
 */
async function sendAuthRequest(url, payload) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    const message = await response.text();

    if (!response.ok) {
        // 서버에서 내려준 메시지를 그대로 예외에 담아 상위 호출부에서 사용자에게 전달
        throw new Error(message || '요청 처리 중 오류가 발생했습니다.');
    }

    return message;
}

/**
 * 버튼 로딩 상태 관리
 * @param {HTMLButtonElement} button - 버튼 요소
 * @param {boolean} isLoading - 로딩 여부
 * @param {string} loadingText - 로딩 시 텍스트
 * @returns {Function} 상태 복원을 위한 함수
 */
function setButtonLoadingState(button, isLoading, loadingText) {
    if (!button) {
        return () => {};
    }

    const originalText = button.textContent;
    button.disabled = isLoading;
    button.textContent = isLoading ? loadingText : originalText;

    return () => {
        button.disabled = false;
        button.textContent = originalText;
    };
}

/**
 * 로그인 모달 닫기
 */
function closeLoginModal() {
    const loginModal = document.getElementById('login-modal');
    if (loginModal) {
        // 모달을 비활성화하고 body 스크롤을 다시 허용
        loginModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

/**
 * 로그인 폼 입력 초기화
 * @param  {...HTMLElement} inputs - 초기화할 입력 요소
 */
function resetFormFields(...inputs) {
    inputs.forEach(input => {
        if (!input) {
            return;
        }
        input.value = '';
        removeError(input);
    });
}

/**
 * 로그인한 사용자의 nickname을 네비게이션 바에 표시/제거
 * @param {string|null} nickname - 표시할 nickname
 */
function setUsernameDisplay(nickname) {
    // 함수 진입 확인
    console.log('>>> setUsernameDisplay 함수 실행됨 <<<');
    // nickname 변수 값 확인
    console.log('setUsernameDisplay - nickname 값:', nickname);
    console.log('setUsernameDisplay - nickname 타입:', typeof nickname);
    
    const navMenu = document.querySelector('.nav-menu');
    const loginButton = document.querySelector('.login-button');
    
    console.log('navMenu 찾음:', !!navMenu);
    console.log('loginButton 찾음:', !!loginButton);

    if (!navMenu || !loginButton) {
        return;
    }

    let usernameBadge = navMenu.querySelector('.login-username');

    // nickname이 유효한 값인지 확인 (null, undefined, 빈 문자열 체크)
    if (nickname && typeof nickname === 'string' && nickname.trim()) {
        if (!usernameBadge) {
            usernameBadge = document.createElement('span');
            usernameBadge.className = 'login-username';
            navMenu.insertBefore(usernameBadge, loginButton);
        }
        usernameBadge.textContent = nickname.trim();
        usernameBadge.setAttribute('aria-label', `현재 로그인한 사용자 ${nickname.trim()}`);
    } else if (usernameBadge) {
        // nickname이 없거나 유효하지 않으면 배지 제거
        usernameBadge.remove();
    }
}
