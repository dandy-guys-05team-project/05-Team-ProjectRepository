// TrendKor Menu Sidebar JavaScript

class MenuSidebar {
    constructor() {
        this.sidebar = null;
        this.closeButton = null;
        this.overlay = null;
        this.demoOpenButton = null;
        this.isOpen = false;
        this.animationDuration = 400;
        
        this.init();
    }

    init() {
        this.setupElements();
        this.setupEventListeners();
        this.setupAnimations();
        this.setupAccessibility();
    }

    setupElements() {
        this.sidebar = document.getElementById('menuSidebar');
        this.closeButton = document.getElementById('closeButton');
        this.overlay = document.getElementById('sidebarOverlay');
        this.demoOpenButton = document.getElementById('demoOpenButton');
        
        // Get all interactive elements
        this.navItems = document.querySelectorAll('.nav-item, .year-link, .section-title');
        this.yearLinks = document.querySelectorAll('.year-link');
        
        if (!this.sidebar) {
            console.error('Menu sidebar element not found');
            return;
        }
    }

    setupEventListeners() {
        // Close button click
        if (this.closeButton) {
            this.closeButton.addEventListener('click', this.closeSidebar.bind(this));
        }

        // Overlay click (close sidebar)
        if (this.overlay) {
            this.overlay.addEventListener('click', this.closeSidebar.bind(this));
        }

        // Demo open button (for testing)
        if (this.demoOpenButton) {
            this.demoOpenButton.addEventListener('click', this.openSidebar.bind(this));
        }

        // Navigation item clicks
        this.navItems.forEach(item => {
            item.addEventListener('click', this.handleNavClick.bind(this));
        });

        // Year link specific handlers
        this.yearLinks.forEach(link => {
            link.addEventListener('click', this.handleYearClick.bind(this));
        });

        // Keyboard events
        document.addEventListener('keydown', this.handleKeyDown.bind(this));

        // Window resize
        window.addEventListener('resize', this.handleResize.bind(this));

        // Prevent body scroll when sidebar is open
        document.addEventListener('touchmove', this.preventScroll.bind(this), { passive: false });
    }

    setupAnimations() {
        // Setup intersection observer for stagger animations
        this.setupIntersectionObserver();
    }

    setupAccessibility() {
        // Set ARIA attributes
        if (this.sidebar) {
            this.sidebar.setAttribute('role', 'navigation');
            this.sidebar.setAttribute('aria-label', 'Main menu');
            this.sidebar.setAttribute('aria-hidden', 'true');
        }

        if (this.closeButton) {
            this.closeButton.setAttribute('aria-label', 'Close menu');
        }

        // Set focus trap when sidebar is open
        this.setupFocusTrap();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1
        });

        // Observe navigation items for stagger animation
        this.navItems.forEach((item, index) => {
            // Add delay for stagger effect
            item.style.animationDelay = `${index * 0.1}s`;
            observer.observe(item);
        });
    }

    setupFocusTrap() {
        this.focusableElements = [
            this.closeButton,
            ...this.navItems
        ].filter(Boolean);
    }

    // Public Methods
    openSidebar() {
        if (this.isOpen) return;

        this.isOpen = true;
        this.sidebar.classList.add('active');
        this.sidebar.setAttribute('aria-hidden', 'false');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus management
        setTimeout(() => {
            if (this.closeButton) {
                this.closeButton.focus();
            }
        }, this.animationDuration);

        // Animate menu items in
        this.animateItemsIn();

        // Dispatch custom event
        this.dispatchEvent('sidebarOpen');

        console.log('Menu sidebar opened');
    }

    closeSidebar() {
        if (!this.isOpen) return;

        this.isOpen = false;
        this.sidebar.classList.remove('active');
        this.sidebar.setAttribute('aria-hidden', 'true');
        
        // Restore body scroll
        document.body.style.overflow = '';

        // Animate menu items out
        this.animateItemsOut();

        // Dispatch custom event
        this.dispatchEvent('sidebarClose');

        console.log('Menu sidebar closed');
    }

    toggleSidebar() {
        if (this.isOpen) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    }

    // Animation Methods
    animateItemsIn() {
        this.navItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0.4';
                item.style.transform = 'translateX(0)';
                item.style.animation = `slideInFromRight 0.6s ease ${index * 0.1}s forwards`;
            }, 100);
        });
    }

    animateItemsOut() {
        this.navItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.animation = `slideOutRight 0.3s ease ${index * 0.05}s forwards`;
            }, 50);
        });
    }

    // Event Handlers
    handleNavClick(event) {
        event.preventDefault();
        const target = event.currentTarget;
        const section = target.getAttribute('data-section');
        
        console.log(`Navigation clicked: ${section || target.textContent}`);
        
        // Add click animation
        this.animateClick(target);
        
        // Handle navigation logic here
        if (section === 'home') {
            this.navigateToHome();
        }
        
        // Close sidebar after navigation (optional)
        setTimeout(() => {
            this.closeSidebar();
        }, 300);
    }

    handleYearClick(event) {
        event.preventDefault();
        const year = event.currentTarget.getAttribute('data-year');
        
        console.log(`Year clicked: ${year}`);
        
        // Add click animation
        this.animateClick(event.currentTarget);
        
        // Handle year navigation
        this.navigateToYear(year);
        
        // Close sidebar after navigation
        setTimeout(() => {
            this.closeSidebar();
        }, 300);
    }

    handleKeyDown(event) {
        if (!this.isOpen) return;

        switch (event.key) {
            case 'Escape':
                this.closeSidebar();
                break;
            case 'Tab':
                this.handleTabNavigation(event);
                break;
        }
    }

    handleTabNavigation(event) {
        if (!this.focusableElements.length) return;

        const firstElement = this.focusableElements[0];
        const lastElement = this.focusableElements[this.focusableElements.length - 1];

        if (event.shiftKey) {
            // Shift + Tab (backward)
            if (document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
        } else {
            // Tab (forward)
            if (document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    }

    handleResize() {
        // Adjust sidebar behavior on resize
        const width = window.innerWidth;
        
        if (width <= 768 && this.isOpen) {
            // Mobile adjustments
            this.adjustMobileLayout();
        }
    }

    preventScroll(event) {
        if (this.isOpen && event.target.closest('.menu-sidebar')) {
            // Allow scrolling within sidebar if needed
            return;
        } else if (this.isOpen) {
            // Prevent scrolling on body
            event.preventDefault();
        }
    }

    // Navigation Methods
    navigateToHome() {
        console.log('Navigating to home...');
        // Add your home navigation logic here
        this.showNotification('Navigating to Home');
    }

    navigateToYear(year) {
        console.log(`Navigating to year ${year}...`);
        // Add your year navigation logic here
        this.showNotification(`Loading ${year} memes...`);
    }

    // Utility Methods
    animateClick(element) {
        element.style.transform = 'translateX(-15px) scale(0.95)';
        setTimeout(() => {
            element.style.transform = 'translateX(-15px) scale(1.05)';
        }, 150);
    }

    adjustMobileLayout() {
        // Mobile-specific adjustments
        if (window.innerWidth <= 768) {
            this.sidebar.style.width = '100vw';
        }
    }

    dispatchEvent(eventName, data = {}) {
        const event = new CustomEvent(eventName, {
            detail: { sidebar: this, ...data }
        });
        document.dispatchEvent(event);
    }

    showNotification(message) {
        // Create and show notification
        const notification = document.createElement('div');
        notification.className = 'sidebar-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #C60C30;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            font-weight: 500;
            z-index: 10001;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 2500);
    }

    // Public API Methods
    destroy() {
        // Remove event listeners and clean up
        if (this.closeButton) {
            this.closeButton.removeEventListener('click', this.closeSidebar);
        }
        if (this.overlay) {
            this.overlay.removeEventListener('click', this.closeSidebar);
        }
        if (this.demoOpenButton) {
            this.demoOpenButton.removeEventListener('click', this.openSidebar);
        }
        
        document.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('touchmove', this.preventScroll);
        
        console.log('Menu sidebar destroyed');
    }

    // Static method to create instance
    static create() {
        return new MenuSidebar();
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Create global instance
    window.menuSidebar = new MenuSidebar();
    
    // Add global methods for external control
    window.openMenuSidebar = () => window.menuSidebar.openSidebar();
    window.closeMenuSidebar = () => window.menuSidebar.closeSidebar();
    window.toggleMenuSidebar = () => window.menuSidebar.toggleSidebar();
    
    console.log('TrendKor Menu Sidebar initialized successfully!');
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MenuSidebar;
}

// CSS injection for additional animations
const additionalStyles = `
    .sidebar-notification {
        font-family: 'Haas Grot Text Trial', Arial, sans-serif;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(10px);
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .nav-item.clicked {
        animation: pulse 0.3s ease;
    }
`;

// Inject additional styles
const additionalStyleSheet = document.createElement('style');
additionalStyleSheet.textContent = additionalStyles;
document.head.appendChild(additionalStyleSheet);
