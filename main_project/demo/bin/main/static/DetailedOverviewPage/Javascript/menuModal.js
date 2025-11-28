// ============================================
// Menu Modal Handler
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeMenuModal();
});

/**
 * Initialize menu modal functionality
 */
function initializeMenuModal() {
    const menuModal = document.getElementById('menu-modal');
    const menuButton = document.querySelector('.MenuText');
    const closeBtn = menuModal?.querySelector('.menu-close-btn');

    if (!menuButton || !menuModal) return;

    // Open modal on menu button click
    menuButton.addEventListener('click', function(e) {
        e.preventDefault();
        openModal(menuModal);
    });

    // Close modal on close button click
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal(menuModal);
        });
    }

    // Close modal on outside click
    menuModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal(menuModal);
        }
    });

    // Handle menu item clicks
    const homeItem = menuModal.querySelector('.menu-home');
    if (homeItem) {
        homeItem.addEventListener('click', function() {
            console.log('HOME clicked');
            // TODO: Implement navigation to HOME section
            closeModal(menuModal);
        });
    }

    const memeYearItem = menuModal.querySelector('.menu-meme-year');
    if (memeYearItem) {
        memeYearItem.addEventListener('click', function() {
            console.log('MEME OF THE YEAR clicked');
            // TODO: Implement navigation to MEME OF THE YEAR section
            closeModal(menuModal);
        });
    }

    // Handle year selection clicks
    const years = ['2025', '2024', '2023', '2022'];
    years.forEach(year => {
        const yearItem = menuModal.querySelector(`.menu-year-${year}`);
        if (yearItem) {
            yearItem.addEventListener('click', function() {
                console.log(`${year} clicked`);
                // TODO: Implement year selection
                closeModal(menuModal);
            });
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuModal.classList.contains('show')) {
            closeModal(menuModal);
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
        console.log('Modal closed:', modalElement.id);
    }
}
