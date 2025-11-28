// ============================================
// Login Modal Handler
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeLoginModal();
});

/**
 * Initialize login modal functionality
 */
function initializeLoginModal() {
    const loginModal = document.getElementById('login-modal');
    const loginButton = document.querySelector('.LoginButton');
    const closeBtn = loginModal?.querySelector('.modal-close-btn');
    const form = loginModal?.querySelector('.login-form');

    if (!loginButton || !loginModal) return;

    // Open modal on login button click
    loginButton.addEventListener('click', function(e) {
        e.preventDefault();
        openModal(loginModal);
    });

    // Close modal on close button click
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal(loginModal);
        });
    }

    // Close modal on outside click
    loginModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal(loginModal);
        }
    });

    // Handle form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSignIn();
        });

        // Real-time input validation
        const inputs = form.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('input', validateInput);
            input.addEventListener('blur', validateInput);
            input.addEventListener('focus', removeError);
        });
    }

    // Handle sign in button
    const signInBtn = loginModal.querySelector('.btn-signin');
    if (signInBtn) {
        signInBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleSignIn();
        });
    }

    // Handle sign up button
    const signUpBtn = loginModal.querySelector('.btn-signup');
    if (signUpBtn) {
        signUpBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleSignUp();
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && loginModal.classList.contains('show')) {
            closeModal(loginModal);
        }
    });
}

/**
 * Open modal
 * @param {HTMLElement} modalElement - 모달 요소
 */
function openModal(modalElement) {
    if (modalElement) {
        modalElement.classList.add('show');
        document.body.style.overflow = 'hidden';
        console.log('Modal opened:', modalElement.id);
    }
}

/**
 * Close modal
 * @param {HTMLElement} modalElement - 모달 요소
 */
function closeModal(modalElement) {
    if (modalElement) {
        modalElement.classList.remove('show');
        document.body.style.overflow = 'auto';

        // Reset form if it exists
        const form = modalElement.querySelector('.login-form');
        if (form) {
            form.reset();
            form.querySelectorAll('.form-input').forEach(input => {
                removeError(input);
            });
        }
        console.log('Modal closed:', modalElement.id);
    }
}

/**
 * Handle Sign In Process
 */
function handleSignIn() {
    const loginModal = document.getElementById('login-modal');
    const idInput = loginModal?.querySelector('#user-id');
    const passwordInput = loginModal?.querySelector('#user-password');

    if (!idInput || !passwordInput) return;

    // Validate inputs
    if (!idInput.value.trim()) {
        showError(idInput, '아이디를 입력해주세요');
        return;
    }

    if (!passwordInput.value) {
        showError(passwordInput, '비밀번호를 입력해주세요');
        return;
    }

    // Show loading state
    const signInButton = loginModal.querySelector('.btn-signin');
    const originalText = signInButton.textContent;
    signInButton.textContent = 'Loading...';
    signInButton.disabled = true;

    // Simulate API call (replace with actual API call)
    setTimeout(() => {
        console.log('Sign In - ID:', idInput.value);
        console.log('Sign In - Password:', passwordInput.value);

        // Reset button
        signInButton.textContent = originalText;
        signInButton.disabled = false;

        // TODO: Replace with actual sign in logic
        alert('로그인 시도 중입니다.');
    }, 1000);
}

/**
 * Handle Sign Up Process
 */
function handleSignUp() {
    console.log('Sign Up clicked');
    // TODO: Navigate to sign up page or show sign up modal
    alert('회원가입 페이지로 이동합니다.');
}

/**
 * Validate Input Fields
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
 * Show Error Message
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
 * Remove Error Message
 */
function removeError(event) {
    const input = typeof event === 'object' && event.target ? event.target : event;
    const errorDiv = input.parentElement?.querySelector('.error-message');

    if (errorDiv) {
        errorDiv.remove();
    }

    input.removeAttribute('aria-invalid');
    input.classList.remove('input-error');
}
