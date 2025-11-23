// ============================================
// LoginPage JavaScript
// ============================================

/**
 * Initialize the login page functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeCloseButton();
    initializeForm();
    initializeButtons();
    handleResponsiveUI();
});

/**
 * Close Button Functionality
 */
function initializeCloseButton() {
    const closeButton = document.querySelector('.close-btn');

    if (closeButton) {
        closeButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Close button clicked');
            // Add close functionality here (e.g., close modal, navigate back)
            // window.history.back();
            // or close parent modal/window
        });

        // Keyboard support (Escape key)
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeButton.click();
            }
        });
    }
}

/**
 * Form Functionality
 */
function initializeForm() {
    const form = document.querySelector('.login-form');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSignIn();
        });
    }

    // Real-time input validation
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('input', validateInput);
        input.addEventListener('blur', validateInput);
        input.addEventListener('focus', removeError);
    });
}

/**
 * Sign In Button Functionality
 */
function initializeButtons() {
    const signInButton = document.querySelector('.btn-signin');
    const signUpButton = document.querySelector('.btn-signup');

    if (signInButton) {
        signInButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Sign In clicked');
            handleSignIn();
        });
    }

    if (signUpButton) {
        signUpButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Sign Up clicked');
            handleSignUp();
        });
    }
}

/**
 * Handle Sign In Process
 */
function handleSignIn() {
    const idInput = document.querySelector('#user-id');
    const passwordInput = document.querySelector('#user-password');

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
    const signInButton = document.querySelector('.btn-signin');
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
        // Example: redirect to dashboard or show success message
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
    const errorDiv = input.parentElement.querySelector('.error-message');

    if (errorDiv) {
        errorDiv.remove();
    }

    input.removeAttribute('aria-invalid');
    input.classList.remove('input-error');
}

/**
 * Handle Responsive UI Changes
 */
function handleResponsiveUI() {
    let currentBreakpoint = getCurrentBreakpoint();

    window.addEventListener('resize', debounce(function() {
        const newBreakpoint = getCurrentBreakpoint();

        if (newBreakpoint !== currentBreakpoint) {
            currentBreakpoint = newBreakpoint;
            console.log('Breakpoint changed to:', currentBreakpoint);
            adjustUIForBreakpoint(currentBreakpoint);
        }
    }, 250));

    // Initial adjustment
    adjustUIForBreakpoint(currentBreakpoint);
}

/**
 * Get Current Breakpoint
 */
function getCurrentBreakpoint() {
    const width = window.innerWidth;

    if (width < 480) return 'xs';
    if (width < 768) return 'sm';
    if (width < 1024) return 'md';
    if (width < 1440) return 'lg';
    return 'xl';
}

/**
 * Adjust UI for Current Breakpoint
 */
function adjustUIForBreakpoint(breakpoint) {
    const container = document.querySelector('.login-container');

    switch(breakpoint) {
        case 'xs':
            // Extra small mobile devices
            break;
        case 'sm':
            // Small mobile devices
            break;
        case 'md':
            // Tablets
            break;
        case 'lg':
            // Desktops
            break;
        case 'xl':
            // Large desktops
            break;
    }
}

/**
 * Debounce Function
 * Prevents function from being called too frequently during resize
 */
function debounce(func, delay) {
    let timeoutId;

    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

/**
 * Accessibility: Focus Management
 */
document.addEventListener('keydown', function(e) {
    // Tab key navigation
    if (e.key === 'Tab') {
        console.log('Tab key pressed');
    }

    // Enter key for form submission
    if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.classList.contains('btn-signin')) {
            document.querySelector('.login-form').dispatchEvent(new Event('submit'));
        }
    }
});
