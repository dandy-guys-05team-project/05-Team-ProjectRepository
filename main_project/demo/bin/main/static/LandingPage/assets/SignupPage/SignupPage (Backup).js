// State to store form data
const formData = {
    nickname: '',
    id: '',
    password: ''
};

// Get input elements
const nicknameInput = document.getElementById('nicknameInput');
const idInput = document.getElementById('idInput');
const pwInput = document.getElementById('pwInput');
const submitButton = document.getElementById('submitButton');
const closeButton = document.getElementById('closeButton');

// Create actual input elements for user interaction
function createInputElements() {
    // Nickname input
    if (nicknameInput && !nicknameInput.querySelector('input')) {
        const nicknameField = document.createElement('input');
        nicknameField.type = 'text';
        nicknameField.placeholder = '닉네임을 입력하세요';
        nicknameField.id = 'nicknameField';
        nicknameField.style.cssText = `
            width: 100%;
            height: 100%;
            padding: 10px;
            border: none;
            border-radius: 12px;
            font-size: clamp(14px, 2.5vw, 18px);
            background: rgba(255, 255, 255, 0.9);
            color: black;
            box-sizing: border-box;
            outline: none;
        `;
        nicknameInput.appendChild(nicknameField);
    }

    // ID input
    if (idInput && !idInput.querySelector('input')) {
        const idField = document.createElement('input');
        idField.type = 'text';
        idField.placeholder = '아이디를 입력하세요';
        idField.id = 'idField';
        idField.style.cssText = `
            width: 100%;
            height: 100%;
            padding: 10px;
            border: none;
            border-radius: 12px;
            font-size: clamp(14px, 2.5vw, 18px);
            background: rgba(255, 255, 255, 0.9);
            color: black;
            box-sizing: border-box;
            outline: none;
        `;
        idInput.appendChild(idField);
    }

    // Password input
    if (pwInput && !pwInput.querySelector('input')) {
        const pwField = document.createElement('input');
        pwField.type = 'password';
        pwField.placeholder = '비밀번호를 입력하세요';
        pwField.id = 'pwField';
        pwField.style.cssText = `
            width: 100%;
            height: 100%;
            padding: 10px;
            border: none;
            border-radius: 12px;
            font-size: clamp(14px, 2.5vw, 18px);
            background: rgba(255, 255, 255, 0.9);
            color: black;
            box-sizing: border-box;
            outline: none;
        `;
        pwInput.appendChild(pwField);
    }
}

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
    // 닉네임이 2자 미만인 경우 검사
    if (nickname.length < 2) {
        return { valid: false, message: '닉네임은 최소 2자 이상이어야 합니다.' };
    }
    // 닉네임이 20자를 초과하는 경우 검사
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
    // 정규표현식: ^[a-zA-Z0-9_]{4,}$
    // ^ : 시작
    // [a-zA-Z0-9_] : 영문, 숫자, 언더스코어만 허용
    // {4,} : 4자 이상
    // $ : 끝
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
    // 정규표현식: ^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$
    // (?=.*[a-zA-Z]) : 영문이 최소 1개 이상 포함 (긍정 선행 단언)
    // (?=.*[0-9]) : 숫자가 최소 1개 이상 포함 (긍정 선행 단언)
    // (?=.*[!@#$%^&*]) : 특수문자가 최소 1개 이상 포함 (긍정 선행 단언)
    // .{8,} : 최소 8자 이상의 모든 문자
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
        return {
            valid: false,
            message: '비밀번호는 8자 이상이며 영문, 숫자, 특수문자를 포함해야 합니다.'
        };
    }
    return { valid: true, message: '' };
}

// Update form data when user types
function setupInputListeners() {
    const nicknameField = document.getElementById('nicknameField');
    const idField = document.getElementById('idField');
    const pwField = document.getElementById('pwField');

    if (nicknameField) {
        nicknameField.addEventListener('input', (e) => {
            formData.nickname = e.target.value;
        });
    }

    if (idField) {
        idField.addEventListener('input', (e) => {
            formData.id = e.target.value;
        });
    }

    if (pwField) {
        pwField.addEventListener('input', (e) => {
            formData.password = e.target.value;
        });
    }
}

/**
 * 전체 폼 유효성 검사
 * 모든 입력 필드(닉네임, 아이디, 비밀번호)를 검사하고
 * 하나라도 유효하지 않으면 false를 반환
 * @returns {boolean} 모든 필드가 유효하면 true, 하나라도 유효하지 않으면 false
 */
function validateForm() {
    // 각 필드에 대해 개별 유효성 검사 함수 실행
    const nicknameValidation = validateNickname(formData.nickname);
    const idValidation = validateId(formData.id);
    const passwordValidation = validatePassword(formData.password);

    // 닉네임 유효성 검사 결과 확인
    if (!nicknameValidation.valid) {
        alert(nicknameValidation.message);
        return false;
    }
    // 아이디 유효성 검사 결과 확인
    if (!idValidation.valid) {
        alert(idValidation.message);
        return false;
    }
    // 비밀번호 유효성 검사 결과 확인
    if (!passwordValidation.valid) {
        alert(passwordValidation.message);
        return false;
    }
    // 모든 검사를 통과한 경우 true 반환
    return true;
}

// Handle signup submission
function handleSignup() {
    if (!validateForm()) {
        return;
    }

    // Simulate API call
    console.log('회원가입 시도:', formData);

    // Success message
    alert(`환영합니다, ${formData.nickname}님!\n회원가입이 완료되었습니다.`);

    // Reset form
    resetForm();

    // Close modal (if using modal)
    closeModal();
}

// Reset form
function resetForm() {
    formData.nickname = '';
    formData.id = '';
    formData.password = '';

    const nicknameField = document.getElementById('nicknameField');
    const idField = document.getElementById('idField');
    const pwField = document.getElementById('pwField');

    if (nicknameField) nicknameField.value = '';
    if (idField) idField.value = '';
    if (pwField) pwField.value = '';
}

// Close modal
function closeModal() {
    const signUpMenu = document.querySelector('.SignUpMenu');
    if (signUpMenu) {
        signUpMenu.style.display = 'none';
    }
}

// Close button functionality
if (closeButton) {
    closeButton.addEventListener('click', () => {
        closeModal();
    });
}

// Submit button functionality
if (submitButton) {
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        handleSignup();
    });
    // Add cursor pointer style
    submitButton.style.cursor = 'pointer';
}

// Submit text functionality
const submitText = document.getElementById('submitText');
if (submitText) {
    submitText.addEventListener('click', (e) => {
        e.preventDefault();
        handleSignup();
    });
    submitText.style.cursor = 'pointer';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createInputElements();
    setupInputListeners();
});
