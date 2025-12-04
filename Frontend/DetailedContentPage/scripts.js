document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.querySelector('.ToggleSwitch');

    if (toggleSwitch) {
        toggleSwitch.addEventListener('click', function() {
            const currentState = this.getAttribute('data-state');
            const newState = currentState === 'Kor' ? 'Eng' : 'Kor';
            this.setAttribute('data-state', newState);
        });
    }
});
