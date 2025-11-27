/**
 * Sign Up Modal Module
 * 회원가입 모달 관련 기능 관리
 */

// State to store form data
const formData = {
    nickname: '',
    id: '',
    password: ''
};

let signupModalElement = null;

/**
 * 가입 모달 초기화
 */
export function initializeSignupModal() {
    signupModalElement = document.getElementById('signup-modal');
    
    if (!signupModalElement) {
        console.warn('Sign up modal element not found');
        return;
    }

    createInputElements();
    setupInputListeners();
    setupSignupEventListeners();
}

/**
 * 입력 필드 생성
 */
function createInputElements() {
    const nicknameInput = document.getElementById('nicknameInput');
    const idInput = document.getElementById('idInput');
    const pwInput = document.getElementById('pwInput');

    // Nickname input
    if (nicknameInput && !nicknameInput.querySelector('input')) {
        const nicknameField = document.createElement('input');
        nicknameField.type = 'text';
        nicknameField.placeholder = '닉네임을 입력하세요';
        nicknameField.id = 'nicknameField';
        nicknameField.style.cssText = `
            width: 100%;
            height: 100%;
            padding: 0.5vw;
            border: none;
            border-radius: 12px;
            font-size: 1.04vw;
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
            padding: 0.5vw;
            border: none;
            border-radius: 12px;
            font-size: 1.04vw;
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
            padding: 0.5vw;
            border: none;
            border-radius: 12px;
            font-size: 1.04vw;
            background: rgba(255, 255, 255, 0.9);
            color: black;
            box-sizing: border-box;
            outline: none;
        `;
        pwInput.appendChild(pwField);
    }
}

/**
 * 닉네임 유효성 검사
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
 * 입력 필드 리스너 설정
 */
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

/**
 * 회원가입 제출 처리
 */
function handleSignup() {
    if (!validateForm()) {
        return;
    }

    console.log('회원가입 시도:', formData);
    alert(`환영합니다, ${formData.nickname}님!\n회원가입이 완료되었습니다.`);

    resetForm();
    closeSignupModal();
}

/**
 * 폼 리셋
 */
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

/**
 * 가입 모달 닫기
 */
function closeSignupModal() {
    if (signupModalElement) {
        signupModalElement.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

/**
 * 가입 이벤트 리스너 설정
 */
function setupSignupEventListeners() {
    const submitButton = document.getElementById('submitButton');
    const submitText = document.getElementById('submitText');

    if (submitButton) {
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            handleSignup();
        });
        submitButton.style.cursor = 'pointer';
    }

    if (submitText) {
        submitText.addEventListener('click', (e) => {
            e.preventDefault();
            handleSignup();
        });
        submitText.style.cursor = 'pointer';
    }
}
