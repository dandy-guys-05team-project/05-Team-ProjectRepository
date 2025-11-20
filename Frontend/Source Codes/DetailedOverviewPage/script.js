/**
 * DetailedOverviewPage - Main Script
 * Handles all interactive functionality for the Memes detail page
 */

document.addEventListener('DOMContentLoaded', function() {
    initializePageEvents();
    initializeYearButtons();
    initializeNavigationButtons();
});

/**
 * Initialize all page events
 */
function initializePageEvents() {
    console.log('DetailedOverviewPage initialized');
}

/**
 * Initialize year button functionality
 */
function initializeYearButtons() {
    const yearButtons = document.querySelectorAll('.YearButton');

    yearButtons.forEach(button => {
        button.addEventListener('click', function() {
            const yearText = this.nextElementSibling.textContent;
            console.log('Year selected: ' + yearText);

            // Remove active state from all buttons
            yearButtons.forEach(btn => btn.classList.remove('active'));

            // Add active state to clicked button
            this.classList.add('active');

            // Handle year filter logic here
            handleYearFilter(yearText);
        });

        // Add hover effect
        button.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
        });

        button.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });
}

/**
 * Handle year filter logic
 * @param {string} year - Selected year
 */
function handleYearFilter(year) {
    const memeCards = document.querySelectorAll('.MemeCard');

    // Example filter logic - can be extended based on data attributes
    memeCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transition = 'opacity 0.3s ease-in-out';
    });

    console.log('Filtering memes by year: ' + year);
}

/**
 * Initialize navigation buttons
 */
function initializeNavigationButtons() {
    const menuButton = document.querySelector('.MenuText');
    const loginButton = document.querySelector('.LoginButton');

    if (menuButton) {
        menuButton.addEventListener('click', function() {
            console.log('Menu clicked');
            handleMenuClick();
        });
    }

    if (loginButton) {
        loginButton.addEventListener('click', function() {
            console.log('Login clicked');
            handleLoginClick();
        });
    }
}

/**
 * Handle menu button click
 */
function handleMenuClick() {
    // Add menu functionality here
    console.log('Opening menu...');
    // Example: Show/hide menu
}

/**
 * Handle login button click
 */
function handleLoginClick() {
    // Add login functionality here
    console.log('Opening login...');
    // Example: Redirect to login page or show login modal
}

/**
 * Add event listeners to meme cards
 */
function initializeMemeCardEvents() {
    const memeCards = document.querySelectorAll('.MemeCard');

    memeCards.forEach(card => {
        card.addEventListener('click', function() {
            console.log('Meme card clicked');
            handleMemeCardClick(this);
        });

        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            this.style.transition = 'all 0.3s ease-in-out';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

/**
 * Handle meme card click event
 * @param {HTMLElement} card - The clicked card element
 */
function handleMemeCardClick(card) {
    const cardTitle = card.querySelector('.CardTitle').textContent;
    const cardViews = card.querySelector('.CardViews').textContent;

    console.log('Card Title: ' + cardTitle);
    console.log('Card Views: ' + cardViews);

    // Add logic to navigate to detailed view or other actions
}

/**
 * Utility function to add active state to year buttons
 * @param {number} year - The year to set as active
 */
function setActiveYear(year) {
    const yearButtons = document.querySelectorAll('.YearButton');

    yearButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Find and activate the button with the matching year
    yearButtons.forEach(button => {
        if (button.nextElementSibling.textContent == year) {
            button.classList.add('active');
        }
    });
}

/**
 * Utility function to scroll to section
 * @param {string} sectionClass - The class of the section to scroll to
 */
function scrollToSection(sectionClass) {
    const section = document.querySelector('.' + sectionClass);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize meme card events when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMemeCardEvents();
});
