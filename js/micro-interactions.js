// ================================
// MICRO-INTERACTIONS ENHANCEMENT LIBRARY
// ================================

// Micro-Interactions Controller
class MicroInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollProgress();
        this.setupButtonRipples();
        this.setupStaggeredAnimations();
        this.setupFormEnhancements();
        this.setupCardInteractions();
        this.setupPageTransitions();
        this.setupLoadingStates();
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
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // ================================
    // BUTTON RIPPLE EFFECTS
    // ================================
    setupButtonRipples() {
        const buttons = document.querySelectorAll('.cta-button, .cta-btn, .btn-send, .products-notify-button, .about-cta-btn');
        
        buttons.forEach(button => {
            button.classList.add('btn-ripple');
            
            button.addEventListener('click', function(e) {
                // Remove existing ripple
                const existingRipple = this.querySelector('.ripple');
                if (existingRipple) {
                    existingRipple.remove();
                }

                // Create ripple element
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                
                // Calculate ripple position
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: rippleEffect 0.6s linear;
                    pointer-events: none;
                `;
                
                this.appendChild(ripple);
                
                // Remove ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rippleEffect {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ================================
    // STAGGERED ANIMATIONS
    // ================================
    setupStaggeredAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const elements = entry.target.querySelectorAll('.stagger-fade-in');
                    elements.forEach((element, index) => {
                        setTimeout(() => {
                            element.classList.add('animate');
                        }, index * 100);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Apply to sections with staggered content
        document.querySelectorAll('.products-grid-new, .stats-grid, .about-values-grid').forEach(section => {
            const children = section.children;
            Array.from(children).forEach(child => {
                child.classList.add('stagger-fade-in');
            });
            observer.observe(section);
        });
    }

    // ================================
    // FORM ENHANCEMENTS
    // ================================
    setupFormEnhancements() {
        // Real-time validation
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

        // Enhanced focus effects
        const formInputs = document.querySelectorAll('.form-input, .products-email-input');
        formInputs.forEach(input => {
            input.addEventListener('focus', (e) => {
                e.target.style.transform = 'scale(1.02)';
                e.target.style.transition = 'all 0.3s ease';
            });

            input.addEventListener('blur', (e) => {
                e.target.style.transform = 'scale(1)';
            });
        });
    }

    // ================================
    // CARD INTERACTIONS
    // ================================
    setupCardInteractions() {
        const cards = document.querySelectorAll('.product-card-new, .stat-card, .about-value-card, .about-team-card');
        
        cards.forEach(card => {
            card.classList.add('card-interactive');
            
            // Add hover sound effect (optional)
            card.addEventListener('mouseenter', () => {
                // Could add subtle audio feedback here
                card.style.willChange = 'transform, box-shadow';
            });

            card.addEventListener('mouseleave', () => {
                card.style.willChange = 'auto';
            });

            // Add click interaction for cards that should be clickable
            if (card.classList.contains('product-card-new')) {
                card.style.cursor = 'pointer';
                card.addEventListener('click', () => {
                    // Could navigate to product detail or show modal
                    this.showNotification('Product details coming soon!', 'info');
                });
            }
        });
    }

    // ================================
    // PAGE TRANSITIONS
    // ================================
    setupPageTransitions() {
        // Only for internal navigation links
        const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"], .nav-link, .mobile-nav-link');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Skip if external link or has special behavior
                if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) {
                    return;
                }

                e.preventDefault();
                this.animatePageTransition(href);
            });
        });
    }

    animatePageTransition(href) {
        // Create transition overlay
        const overlay = document.createElement('div');
        overlay.className = 'page-transition active';
        document.body.appendChild(overlay);

        // Navigate after animation starts
        setTimeout(() => {
            window.location.href = href;
        }, 250);
    }

    // ================================
    // LOADING STATES
    // ================================
    setupLoadingStates() {
        // Enhanced form submission loading
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
    // ENHANCED NOTIFICATIONS
    // ================================
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
// PERFORMANCE MONITORING
// ================================
class PerformanceMonitor {
    constructor() {
        this.initPerformanceObserver();
    }

    initPerformanceObserver() {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
            // Largest Contentful Paint
            new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime);
            }).observe({ entryTypes: ['largest-contentful-paint'] });

            // First Input Delay
            new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                entries.forEach(entry => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                });
            }).observe({ entryTypes: ['first-input'] });

            // Cumulative Layout Shift
            new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                entries.forEach(entry => {
                    if (!entry.hadRecentInput) {
                        console.log('CLS:', entry.value);
                    }
                });
            }).observe({ entryTypes: ['layout-shift'] });
        }
    }
}

// ================================
// INITIALIZATION
// ================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize micro-interactions
    const microInteractions = new MicroInteractions();
    
    // Initialize performance monitoring (only in development)
    if (window.location.hostname === 'localhost' || window.location.hostname.includes('dev')) {
        const perfMonitor = new PerformanceMonitor();
    }

    // Global micro-interaction event handlers
    window.microInteractions = microInteractions;

    // Enhanced mobile menu with micro-interactions
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuDropdown = document.querySelector('.mobile-menu-dropdown');
    
    if (mobileMenuBtn && mobileMenuDropdown) {
        mobileMenuBtn.addEventListener('click', function() {
            const isActive = mobileMenuDropdown.classList.contains('active');
            
            // Add micro-interaction feedback
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            if (!isActive) {
                // Stagger menu item animations
                const menuLinks = mobileMenuDropdown.querySelectorAll('.mobile-nav-link');
                menuLinks.forEach((link, index) => {
                    link.style.opacity = '0';
                    link.style.transform = 'translateX(-20px)';
                    setTimeout(() => {
                        link.style.opacity = '1';
                        link.style.transform = 'translateX(0)';
                    }, 100 + (index * 50));
                });
            }
        });
    }
});

// ================================
// EXPORT FOR EXTERNAL USE
// ================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MicroInteractions, PerformanceMonitor };
}
