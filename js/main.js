// Shared JavaScript functionality across all pages

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuDropdown = document.querySelector('.mobile-menu-dropdown');
    
    console.log('Mobile menu elements found:', {
        button: !!mobileMenuBtn,
        dropdown: !!mobileMenuDropdown
    });
    
    if (mobileMenuBtn && mobileMenuDropdown) {
        console.log('Mobile menu: Adding event listeners');
        
        mobileMenuBtn.addEventListener('click', function(e) {
            console.log('Mobile menu button clicked');
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = mobileMenuDropdown.classList.contains('active');
            console.log('Menu currently active:', isActive);
            
            if (isActive) {
                // Close menu
                mobileMenuDropdown.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                console.log('Menu closed');
            } else {
                // Open menu
                mobileMenuDropdown.classList.add('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
                console.log('Menu opened');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !mobileMenuDropdown.contains(event.target)) {
                mobileMenuDropdown.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu when pressing escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mobileMenuDropdown.classList.contains('active')) {
                mobileMenuDropdown.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu when clicking on mobile nav links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                setTimeout(() => {
                    mobileMenuDropdown.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }, 100);
            });
        });
    } else {
        console.error('Mobile menu elements not found:', {
            button: !!mobileMenuBtn,
            dropdown: !!mobileMenuDropdown
        });
    }
    
    console.log('Main.js: Mobile menu initialization complete');
});

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