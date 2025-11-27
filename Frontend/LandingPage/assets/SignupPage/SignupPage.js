// State to store form data
const formData = {
    nickname: '',
    id: '',
    password: ''
};

// Validation functions
/**
 * 닉네임 유효성 검사
 * @param {string} nickname - 검사할 닉네임
 * @returns {object} { valid: boolean, message: string }
 * 조건:
 * - 최소 2자 이상
 * - 최대 20자 이하
 */
function validateNickname(nickname) {
    if (nickname.length < 2) {
        return { valid: false, message: '닉네임은 최소 2자 이상이어야 합니다.' };
    }
    if (nickname.length > 20) {
        return { valid: false, message: '닉네임은 20자 이하여야 합니다.' };
    }
    return { valid: true, message: '' };
}

/**
 * 아이디 유효성 검사
 * @param {string} id - 검사할 아이디
 * @returns {object} { valid: boolean, message: string }
 * 조건:
 * - 최소 4자 이상
 * - 영문(a-z, A-Z), 숫자(0-9), 언더스코어(_)만 포함
 */
function validateId(id) {
    const idRegex = /^[a-zA-Z0-9_]{4,}$/;
    if (!idRegex.test(id)) {
        return { valid: false, message: '아이디는 4자 이상의 영문, 숫자, 언더스코어로 구성되어야 합니다.' };
    }
    return { valid: true, message: '' };
}

/**
 * 비밀번호 유효성 검사
 * @param {string} password - 검사할 비밀번호
 * @returns {object} { valid: boolean, message: string }
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
            message: '비밀번호는 8자 이상이며 영문, 숫자, 특수문자를 포함해야 합니다.'
        };
    }
    return { valid: true, message: '' };
}

/**
 * 전체 폼 유효성 검사
 * @returns {boolean} 모든 필드가 유효하면 true, 하나라도 유효하지 않으면 false
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

// Update form data when user types
function setupInputListeners(nicknameInput, idInput, pwInput) {
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

// Reset form
function resetForm() {
    formData.nickname = '';
    formData.id = '';
    formData.password = '';

    const nicknameInput = document.querySelector('#user-nickname');
    const idInput = document.querySelector('#user-id');
    const pwInput = document.querySelector('#user-password');

    if (nicknameInput) nicknameInput.value = '';
    if (idInput) idInput.value = '';
    if (pwInput) pwInput.value = '';
}

// Close modal
function closeModal() {
    const signUpMenu = document.querySelector('.SignUpMenu');
    if (signUpMenu) {
        signUpMenu.style.display = 'none';
    }
}

// Handle signup submission
function handleSignUp() {
    if (!validateForm()) {
        return;
    }

    console.log('회원가입 시도:', formData);
    alert(`환영합니다, ${formData.nickname}님!\n회원가입이 완료되었습니다.`);

    resetForm();
    closeModal();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get input elements
    const closeButton = document.querySelector('.Vector');
    const signUpButton = document.querySelector('.Rectangle4');
    const signUpText = document.querySelector('.SignUpButton');
    const nicknameInput = document.querySelector('#user-nickname');
    const idInput = document.querySelector('#user-id');
    const pwInput = document.querySelector('#user-password');

    setupInputListeners(nicknameInput, idInput, pwInput);

    // 닫기 버튼 이벤트
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            closeModal();
        });
    }

    // 회원가입 버튼 이벤트
    if (signUpButton) {
        signUpButton.addEventListener('click', function(e) {
            e.preventDefault();
            handleSignUp();
        });
    }

    // 회원가입 텍스트 이벤트
    if (signUpText) {
        signUpText.addEventListener('click', function(e) {
            e.preventDefault();
            handleSignUp();
        });
    }

    // 엔터키로 회원가입
    const inputs = [nicknameInput, idInput, pwInput];
    inputs.forEach(input => {
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    handleSignUp();
                }
            });
        }
    });
});
