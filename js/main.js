// Shared JavaScript functionality across all pages

// Mobile Menu Functionality
let mobileMenuInitialized = false;
let mobileMenuBtn = null;
let mobileMenuDropdown = null;

// Mobile menu toggle function
function toggleMobileMenu() {
    if (!mobileMenuBtn || !mobileMenuDropdown) {
        console.error('Mobile menu elements not available for toggle');
        return false;
    }
    
    const isActive = mobileMenuDropdown.classList.contains('active');
    console.log('Toggle mobile menu - currently active:', isActive);
    
    if (isActive) {
        // Close menu
        mobileMenuDropdown.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        console.log('Menu closed');
        return false; // Menu is now closed
    } else {
        // Open menu
        mobileMenuDropdown.classList.add('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        console.log('Menu opened');
        return true; // Menu is now open
    }
}

// Close mobile menu function
function closeMobileMenu() {
    if (!mobileMenuDropdown) {
        console.error('Mobile menu dropdown not available for close');
        return;
    }
    
    if (mobileMenuDropdown.classList.contains('active')) {
        mobileMenuDropdown.classList.remove('active');
        if (mobileMenuBtn) {
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
        console.log('Menu closed via function');
        return true;
    }
    return false;
}

// Enhanced touch handling
function handleTouch(e) {
    console.log('Touch event detected:', e.type);
    e.preventDefault();
    e.stopPropagation();
    
    // Only handle touchend to avoid double-firing with click
    if (e.type === 'touchend') {
        toggleMobileMenu();
    }
}

// Enhanced click handling
function handleClick(e) {
    console.log('Click event detected');
    e.preventDefault();
    e.stopPropagation();
    toggleMobileMenu();
}

// Initialize mobile menu with enhanced touch support
function initializeMobileMenu() {
    mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    mobileMenuDropdown = document.querySelector('.mobile-menu-dropdown');
    
    console.log('Mobile menu elements found:', {
        button: !!mobileMenuBtn,
        dropdown: !!mobileMenuDropdown,
        buttonVisible: mobileMenuBtn ? window.getComputedStyle(mobileMenuBtn).display !== 'none' : false
    });
    
    if (mobileMenuBtn && mobileMenuDropdown) {
        console.log('Mobile menu: Adding event listeners');
        
        // Remove any existing listeners first
        mobileMenuBtn.removeEventListener('click', handleClick);
        mobileMenuBtn.removeEventListener('touchstart', handleTouch);
        mobileMenuBtn.removeEventListener('touchend', handleTouch);
        
        // Add click handler
        mobileMenuBtn.addEventListener('click', handleClick);
        
        // Add touch handlers for better mobile support
        mobileMenuBtn.addEventListener('touchstart', handleTouch, { passive: false });
        mobileMenuBtn.addEventListener('touchend', handleTouch, { passive: false });
        
        // Enhanced outside click handler
        document.addEventListener('click', function(event) {
            if (mobileMenuDropdown.classList.contains('active')) {
                const clickedInsideButton = mobileMenuBtn.contains(event.target);
                const clickedInsideDropdown = mobileMenuDropdown.contains(event.target);
                
                if (!clickedInsideButton && !clickedInsideDropdown) {
                    console.log('Outside click detected - closing menu');
                    closeMobileMenu();
                }
            }
        });
        
        // Enhanced escape key handler
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' || event.keyCode === 27) {
                if (mobileMenuDropdown.classList.contains('active')) {
                    console.log('Escape key pressed - closing menu');
                    closeMobileMenu();
                }
            }
        });
        
        // Close menu when clicking on mobile nav links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('Mobile nav link clicked - closing menu');
                setTimeout(() => {
                    closeMobileMenu();
                }, 150);
            });
        });
        
        mobileMenuInitialized = true;
        console.log('Mobile menu initialization complete with touch support');
        
        // Test touch support
        const touchSupported = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        console.log('Touch support detected:', touchSupported);
        
    } else {
        console.error('Mobile menu elements not found:', {
            button: !!mobileMenuBtn,
            dropdown: !!mobileMenuDropdown
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure CSS is loaded
    setTimeout(initializeMobileMenu, 100);
});

// Make functions available globally for testing
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;
window.getMobileMenuState = function() {
    return {
        initialized: mobileMenuInitialized,
        buttonExists: !!mobileMenuBtn,
        dropdownExists: !!mobileMenuDropdown,
        isActive: mobileMenuDropdown ? mobileMenuDropdown.classList.contains('active') : false,
        buttonVisible: mobileMenuBtn ? window.getComputedStyle(mobileMenuBtn).display !== 'none' : false,
        touchSupported: 'ontouchstart' in window || navigator.maxTouchPoints > 0
    };
};

// Debug function for testing
window.debugMobileMenu = function() {
    const state = window.getMobileMenuState();
    console.log('Mobile Menu Debug Info:', state);
    
    if (mobileMenuBtn) {
        const styles = window.getComputedStyle(mobileMenuBtn);
        console.log('Button styles:', {
            display: styles.display,
            visibility: styles.visibility,
            opacity: styles.opacity,
            position: styles.position,
            zIndex: styles.zIndex
        });
    }
    
    return state;
};

console.log('Main.js: Mobile menu functions loaded with enhanced touch support');

// Shared Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(message) {
    // Remove existing error messages
    const existingError = document.querySelector('.email-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and show error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'email-error show';
    errorDiv.textContent = message;
    
    const emailContainer = document.querySelector('.email-input-container');
    if (emailContainer) {
        emailContainer.parentNode.insertBefore(errorDiv, emailContainer.nextSibling);
        
        // Remove error after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }
}

function showSuccess(message) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.success-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create and show success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger show animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 4 seconds
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

function showContactError(message) {
    // Remove existing error messages
    const existingError = document.querySelector('.contact-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and show error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'contact-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #ff6b6b;
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 12px;
        margin-top: 8px;
        text-align: left;
    `;
    
    const submitButton = document.querySelector('.contact-submit-btn');
    if (submitButton) {
        submitButton.parentNode.insertBefore(errorDiv, submitButton.nextSibling);
        
        // Remove error after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }
}

function showContactSuccess(message) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.contact-success-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create and show success notification
    const notification = document.createElement('div');
    notification.className = 'contact-success-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: #4CAF50;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        font-family: 'Source Sans Pro', sans-serif;
        font-weight: 600;
        font-size: 16px;
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Trigger show animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Hide notification after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}