// ================================
// BASE MICRO-INTERACTIONS CONTROLLER
// ================================

class BaseMicroInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollProgress();
        this.setupScrollReveal();
        this.setupNotifications();
        this.setupFormValidation();
        this.setupButtonEffects();
    }

    // ================================
    // SCROLL PROGRESS INDICATOR
    // ================================
    setupScrollProgress() {
        // Create scroll progress element
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        // Update progress on scroll
        window.addEventListener('scroll', this.throttle(() => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        }, 16));
    }

    // ================================
    // SCROLL REVEAL ANIMATIONS
    // ================================
    setupScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Trigger text reveal if it has the class
                    if (entry.target.classList.contains('text-reveal')) {
                        entry.target.classList.add('animate');
                    }
                    
                    // Trigger staggered animations
                    if (entry.target.classList.contains('scroll-reveal-grid')) {
                        const elements = entry.target.querySelectorAll('.stagger-fade-in');
                        elements.forEach((element, index) => {
                            setTimeout(() => {
                                element.classList.add('animate');
                            }, index * 100);
                        });
                    }
                }
            });
        }, observerOptions);

        // Observe all scroll-reveal elements
        document.querySelectorAll('.scroll-reveal, .text-reveal, .image-reveal, .scroll-reveal-grid').forEach(element => {
            observer.observe(element);
        });
    }

    // ================================
    // FORM VALIDATION
    // ================================
    setupFormValidation() {
        const emailInputs = document.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const email = e.target.value;
                const isValid = this.isValidEmail(email);
                
                if (email.length > 0) {
                    if (isValid) {
                        e.target.classList.remove('form-input-invalid');
                        e.target.classList.add('form-input-valid');
                    } else {
                        e.target.classList.remove('form-input-valid');
                        e.target.classList.add('form-input-invalid');
                    }
                } else {
                    e.target.classList.remove('form-input-valid', 'form-input-invalid');
                }
            });
        });
    }

    // ================================
    // BUTTON EFFECTS
    // ================================
    setupButtonEffects() {
        // Loading states for forms
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                const submitButton = form.querySelector('button[type="submit"]');
                if (submitButton) {
                    this.setButtonLoading(submitButton, true);
                    
                    // Reset after timeout (fallback)
                    setTimeout(() => {
                        this.setButtonLoading(submitButton, false);
                    }, 10000);
                }
            });
        });
    }

    setButtonLoading(button, isLoading) {
        if (isLoading) {
            button.classList.add('btn-loading');
            button.disabled = true;
            button.dataset.originalText = button.textContent;
        } else {
            button.classList.remove('btn-loading');
            button.disabled = false;
            if (button.dataset.originalText) {
                button.textContent = button.dataset.originalText;
            }
        }
    }

    // ================================
    // NOTIFICATIONS
    // ================================
    setupNotifications() {
        // Make showNotification globally accessible
        window.showNotification = this.showNotification;
    }

    showNotification(message, type = 'success', duration = 4000) {
        // Remove existing notifications
        const existing = document.querySelectorAll('.notification-enhanced');
        existing.forEach(notif => notif.remove());

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification-enhanced notification-${type}`;
        
        // Icon mapping
        const icons = {
            success: '✓',
            error: '✗',
            warning: '⚠',
            info: 'ℹ'
        };

        notification.innerHTML = `
            <span class="notification-icon">${icons[type] || icons.info}</span>
            <span class="notification-message">${message}</span>
        `;

        document.body.appendChild(notification);

        // Show with animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Hide after duration
        setTimeout(() => {
            notification.classList.add('hide');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 400);
        }, duration);

        return notification;
    }

    // ================================
    // UTILITY FUNCTIONS
    // ================================
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Throttle function for performance
    throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// ================================
// INITIALIZATION
// ================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize base micro-interactions
    window.baseMicroInteractions = new BaseMicroInteractions();
    
    console.log('Base micro-interactions initialized');
});

// ================================
// EXPORT FOR EXTERNAL USE
// ================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BaseMicroInteractions };
}
