/**
 * Login Form Module
 * 로그인 폼 검증 및 처리
 */

// 로그인 상태 관리
let isLoggedIn = false;

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

    signInButton?.addEventListener('click', (e) => {
        e.preventDefault();
        handleSignIn();
    });

    signUpButton?.addEventListener('click', (e) => {
        e.preventDefault();
        handleSignUp();
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

    loginButton.addEventListener('click', () => {
        if (isLoggedIn) {
            handleLogout();
        }
    });
}

/**
 * 로그인 처리
 */
function handleSignIn() {
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

    // 로딩 상태 표시
    const signInButton = document.querySelector('.login-modal .btn-signin');
    const originalText = signInButton.textContent;
    signInButton.textContent = 'Loading...';
    signInButton.disabled = true;

    // API 호출 시뮬레이션 (실제 API 호출로 대체 필요)
    setTimeout(() => {
        console.log('Sign In - ID:', idInput.value);
        console.log('Sign In - Password:', passwordInput.value);

        // 로그인 상태 업데이트
        isLoggedIn = true;
        saveLoginState();
        updateLoginButton();

        // 로그인 모달 닫기
        const loginModal = document.getElementById('login-modal');
        if (loginModal) {
            loginModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // 폼 초기화
        idInput.value = '';
        passwordInput.value = '';
        removeError(idInput);
        removeError(passwordInput);

        // 버튼 복구
        signInButton.textContent = originalText;
        signInButton.disabled = false;

        alert('로그인 되었습니다.');
    }, 1000);
}

/**
 * 로그아웃 처리
 */
function handleLogout() {
    const confirmed = confirm('로그아웃 하시겠습니까?');
    
    if (confirmed) {
        isLoggedIn = false;
        saveLoginState();
        updateLoginButton();
        alert('로그아웃 되었습니다.');
    }
}

/**
 * 네비게이션 바의 로그인 버튼 업데이트
 */
function updateLoginButton() {
    const loginButton = document.querySelector('.login-button');
    
    if (!loginButton) {
        console.warn('Login button not found');
        return;
    }

    if (isLoggedIn) {
        loginButton.textContent = 'LOGOUT';
        loginButton.setAttribute('data-logged-in', 'true');
    } else {
        loginButton.textContent = 'LOGIN';
        loginButton.removeAttribute('data-logged-in');
    }
}

/**
 * 로그인 상태 로컬 스토리지에 저장
 */
function saveLoginState() {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
}

/**
 * 저장된 로그인 상태 복구
 */
function restoreLoginState() {
    const savedState = localStorage.getItem('isLoggedIn');
    
    if (savedState !== null) {
        isLoggedIn = JSON.parse(savedState);
        updateLoginButton();
    }
}

/**
 * 회원가입 처리
 */
function handleSignUp() {
    console.log('Sign Up clicked');
    // TODO: 회원가입 페이지로 이동 또는 회원가입 모달 표시
    alert('회원가입 페이지로 이동합니다.');
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
