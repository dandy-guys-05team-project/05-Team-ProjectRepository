// Close button functionality
const closeButton = document.getElementById('closeButton');
if (closeButton) {
    closeButton.addEventListener('click', () => {
        // Close the signup menu or modal
        console.log('Close button clicked');
        // Add your close logic here
    });
}

// Submit button functionality
const submitButton = document.getElementById('submitButton');
if (submitButton) {
    submitButton.addEventListener('click', () => {
        // Handle form submission
        console.log('Submit button clicked');
        // Add your submit logic here
    });
}

// Optional: Add input field functionality if needed
const nicknameInput = document.getElementById('nicknameInput');
const idInput = document.getElementById('idInput');
const pwInput = document.getElementById('pwInput');

if (nicknameInput) {
    nicknameInput.addEventListener('click', () => {
        console.log('Nickname input clicked');
    });
}

if (idInput) {
    idInput.addEventListener('click', () => {
        console.log('ID input clicked');
    });
}

if (pwInput) {
    pwInput.addEventListener('click', () => {
        console.log('Password input clicked');
    });
}
