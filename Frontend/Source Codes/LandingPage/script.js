// TrendKor Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 로그인 모달 관련 함수들
    const loginModal = document.getElementById('login-modal');
    const loginButton = document.querySelector('.login-button');
    const modalCloseBtn = document.querySelector('.modal-close-btn');

    console.log('DOMContentLoaded - loginModal:', loginModal);
    console.log('DOMContentLoaded - loginButton:', loginButton);
    console.log('DOMContentLoaded - modalCloseBtn:', modalCloseBtn);

    // 로그인 모달 열기
    function openLoginModal() {
        if (loginModal) {
            loginModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // 스크롤 방지
            console.log('Login modal opened', loginModal.classList);
        } else {
            console.error('loginModal element not found');
        }
    }

    // 로그인 모달 닫기
    function closeLoginModal() {
        if (loginModal) {
            loginModal.classList.remove('active');
            document.body.style.overflow = 'auto'; // 스크롤 복구
            console.log('Login modal closed');
        }
    }

    // 로그인 버튼 클릭 이벤트
    loginButton?.addEventListener('click', openLoginModal);

    // 모달 닫기 버튼 클릭 이벤트
    modalCloseBtn?.addEventListener('click', closeLoginModal);

    // 배경 클릭 시 닫기
    loginModal?.addEventListener('click', function(e) {
        const modalContent = document.querySelector('.login-modal-content');
        if (e.target === loginModal || (e.target !== modalContent && !modalContent.contains(e.target))) {
            closeLoginModal();
        }
    });

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && loginModal?.classList.contains('active')) {
            closeLoginModal();
        }
    });

    // 메뉴 버튼 클릭 이벤트
    document.querySelector('.menu-text')?.addEventListener('click', () => {
        // 메뉴 기능 추가 가능
        console.log('Menu button clicked');
    });

    // 로그인 모달 내 폼 기능
    initializeLoginForm();

    // 접근성: Tab 키 네비게이션 지원 (추후 구현 가능)
    document.addEventListener('keydown', event => {
        if (event.key === 'Tab') {
            // 포커스 관리 로직 추가 가능
        }
    });

    console.log('TrendKor Landing Page loaded successfully!');
});

/**
 * 로그인 폼 초기화
 */
function initializeLoginForm() {
    const form = document.querySelector('.login-modal .login-form');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSignIn();
        });
    }

    // 실시간 입력 검증
    const inputs = document.querySelectorAll('.login-modal .form-input');
    inputs.forEach(input => {
        input.addEventListener('input', validateInput);
        input.addEventListener('blur', validateInput);
        input.addEventListener('focus', removeError);
    });

    // 로그인 및 회원가입 버튼 기능
    const signInButton = document.querySelector('.login-modal .btn-signin');
    const signUpButton = document.querySelector('.login-modal .btn-signup');

    signInButton?.addEventListener('click', function(e) {
        e.preventDefault();
        handleSignIn();
    });

    signUpButton?.addEventListener('click', function(e) {
        e.preventDefault();
        handleSignUp();
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

        // 버튼 복구
        signInButton.textContent = originalText;
        signInButton.disabled = false;

        // TODO: 실제 로그인 로직으로 대체
        alert('로그인 시도 중입니다.');
    }, 1000);
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
