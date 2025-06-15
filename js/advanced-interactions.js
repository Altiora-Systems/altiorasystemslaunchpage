// ================================
// ADVANCED SCROLL-BASED INTERACTIONS
// ================================

class AdvancedScrollInteractions {
    constructor() {
        this.init();
        this.setupScrollObserver();
        this.setupParallax();
        this.setupMagneticButtons();
        this.setupCounters();
        this.setupTextReveal();
    }

    init() {
        // Add scroll-based reveal to elements
        this.addScrollRevealClasses();
        this.setupStickyNavigation();
    }

    addScrollRevealClasses() {
        // Add scroll reveal to key elements
        const elementsToReveal = [
            '.product-card-new',
            '.stat-card',
            '.about-value-card',
            '.about-team-card',
            '.hero-content',
            '.statistics-title',
            '.products-title'
        ];

        elementsToReveal.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.classList.add('scroll-reveal');
            });
        });

        // Add grid reveal to container elements
        document.querySelectorAll('.products-grid-new, .stats-grid, .about-values-grid').forEach(grid => {
            grid.classList.add('scroll-reveal-grid');
        });
    }

    setupScrollObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Trigger counter animation if it's a stat card
                    if (entry.target.classList.contains('stat-card')) {
                        this.animateCounter(entry.target);
                    }
                    
                    // Trigger text reveal if it has the class
                    if (entry.target.classList.contains('text-reveal')) {
                        entry.target.classList.add('animate');
                    }
                }
            });
        }, options);

        // Observe all scroll-reveal elements
        document.querySelectorAll('.scroll-reveal, .text-reveal, .image-reveal').forEach(element => {
            observer.observe(element);
        });
    }

    setupParallax() {
        const parallaxElements = document.querySelectorAll('.hero-parallax, .float-on-scroll');
        
        window.addEventListener('scroll', this.throttle(() => {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                if (element.classList.contains('hero-parallax')) {
                    const speed = 0.5;
                    element.style.transform = `translateY(${scrollTop * speed}px)`;
                } else if (element.classList.contains('float-on-scroll')) {
                    const speed = 0.1;
                    const yPos = -(scrollTop * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                }
            });
        }, 16));
    }

    setupMagneticButtons() {
        const magneticButtons = document.querySelectorAll('.cta-button, .cta-btn, .btn-send, .about-cta-btn');
        
        magneticButtons.forEach(button => {
            button.classList.add('btn-magnetic');
            
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const strength = 0.3;
                button.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }

    setupCounters() {
        this.counters = new Map();
    }

    animateCounter(statCard) {
        const valueElement = statCard.querySelector('.stat-value');
        if (!valueElement || this.counters.has(valueElement)) return;

        const text = valueElement.textContent;
        const number = parseFloat(text.replace(/[^\d.]/g, ''));
        const suffix = text.replace(/[\d.,]/g, '');
        
        if (isNaN(number)) return;

        this.counters.set(valueElement, true);
        
        let current = 0;
        const increment = number / 60; // 60 frames for 1 second at 60fps
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            
            valueElement.textContent = this.formatNumber(current) + suffix;
        }, 16);
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1);
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1);
        }
        return Math.floor(num).toString();
    }

    setupTextReveal() {
        // Add text reveal to headings
        const headings = document.querySelectorAll('h1, h2, .hero-title, .products-title, .statistics-title');
        headings.forEach(heading => {
            heading.classList.add('text-reveal');
        });
    }

    setupStickyNavigation() {
        const header = document.querySelector('.header');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', this.throttle(() => {
            const scrollTop = window.pageYOffset;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        }, 16));
    }

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
// FORM INTERACTION ENHANCEMENTS
// ================================

class FormInteractionEnhancer {
    constructor() {
        this.setupFloatingLabels();
        this.setupProgressiveValidation();
        this.setupCustomCheckboxes();
        this.setupFormSteps();
    }

    setupFloatingLabels() {
        const formGroups = document.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const label = group.querySelector('label');
            
            if (input && label) {
                // Convert to floating label
                group.classList.add('form-group-floating');
                input.classList.add('form-input-floating');
                label.classList.add('form-label-floating');
                
                // Add placeholder for floating effect
                if (!input.placeholder) {
                    input.placeholder = ' ';
                }
                
                // Handle pre-filled inputs
                if (input.value) {
                    input.classList.add('has-value');
                }
                
                input.addEventListener('blur', () => {
                    if (input.value) {
                        input.classList.add('has-value');
                    } else {
                        input.classList.remove('has-value');
                    }
                });
            }
        });
    }

    setupProgressiveValidation() {
        const inputs = document.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                // Clear validation state on input
                if (input.classList.contains('form-input-invalid')) {
                    this.validateField(input);
                }
            });
        });
    }

    validateField(input) {
        const isValid = input.checkValidity();
        
        input.classList.remove('form-input-valid', 'form-input-invalid');
        
        if (input.value.trim() !== '') {
            if (isValid) {
                input.classList.add('form-input-valid');
                this.hideFieldError(input);
            } else {
                input.classList.add('form-input-invalid');
                this.showFieldError(input, input.validationMessage);
            }
        }
    }

    showFieldError(input, message) {
        this.hideFieldError(input);
        
        const error = document.createElement('div');
        error.className = 'field-error';
        error.textContent = message;
        error.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
        `;
        
        input.parentNode.appendChild(error);
        
        setTimeout(() => {
            error.style.opacity = '1';
            error.style.transform = 'translateY(0)';
        }, 10);
    }

    hideFieldError(input) {
        const error = input.parentNode.querySelector('.field-error');
        if (error) {
            error.style.opacity = '0';
            error.style.transform = 'translateY(-10px)';
            setTimeout(() => error.remove(), 300);
        }
    }

    setupCustomCheckboxes() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        
        checkboxes.forEach(checkbox => {
            const label = document.querySelector(`label[for="${checkbox.id}"]`);
            if (label) {
                label.classList.add('checkbox-custom');
                
                const checkmark = document.createElement('span');
                checkmark.className = 'checkmark';
                label.appendChild(checkmark);
            }
        });
    }

    setupFormSteps() {
        // For future multi-step forms
        const formSteps = document.querySelectorAll('.form-step');
        if (formSteps.length > 1) {
            this.initMultiStepForm(formSteps);
        }
    }

    initMultiStepForm(steps) {
        let currentStep = 0;
        
        const showStep = (stepIndex) => {
            steps.forEach((step, index) => {
                step.classList.remove('active', 'previous');
                if (index === stepIndex) {
                    step.classList.add('active');
                } else if (index < stepIndex) {
                    step.classList.add('previous');
                }
            });
        };
        
        showStep(0);
        
        // Add navigation logic here
    }
}

// ================================
// CARD INTERACTION ENHANCEMENTS
// ================================

class CardInteractionEnhancer {
    constructor() {
        this.setupHoverReveals();
        this.setupCardTilts();
    }

    setupHoverReveals() {
        const cards = document.querySelectorAll('.product-card-new, .about-team-card');
        
        cards.forEach(card => {
            // Add hover reveal content
            const hoverContent = document.createElement('div');
            hoverContent.className = 'card-hover-content';
            
            let hoverText = 'Learn More';
            if (card.classList.contains('product-card-new')) {
                hoverText = 'Coming Soon - Get Notified';
            } else if (card.classList.contains('about-team-card')) {
                hoverText = 'View Profile';
            }
            
            hoverContent.innerHTML = `
                <h3 style="margin-bottom: 1rem; font-size: 1.25rem;">
                    ${hoverText}
                </h3>
                <p style="opacity: 0.9; margin-bottom: 1.5rem;">
                    Click to learn more about this item
                </p>
                <button class="btn-expand-bg" style="
                    background: var(--primary-brand-accent);
                    color: #2F394D;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                ">
                    Explore
                </button>
            `;
            
            card.classList.add('card-hover-reveal');
            card.appendChild(hoverContent);
        });
    }

    setupCardTilts() {
        const cards = document.querySelectorAll('.card-interactive');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * -10;
                const rotateY = (x - centerX) / centerX * 10;
                
                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateZ(20px)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }
}

// ================================
// NAVIGATION ENHANCEMENTS
// ================================

class NavigationEnhancer {
    constructor() {
        this.setupBreadcrumbs();
        this.setupSmoothScrolling();
        this.addNavigationIndicators();
    }

    setupBreadcrumbs() {
        const currentPage = this.getCurrentPageName();
        const breadcrumbContainer = document.createElement('div');
        breadcrumbContainer.className = 'breadcrumb';
        
        const breadcrumbHTML = `
            <span class="breadcrumb-item">
                <a href="index.html">Home</a>
            </span>
            <span class="breadcrumb-separator">›</span>
            <span class="breadcrumb-item current">
                ${currentPage}
            </span>
        `;
        
        breadcrumbContainer.innerHTML = breadcrumbHTML;
        
        // Insert after header
        const mainContent = document.querySelector('.main-content');
        if (mainContent && currentPage !== 'Home') {
            mainContent.insertBefore(breadcrumbContainer, mainContent.firstChild);
        }
    }

    getCurrentPageName() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        
        const pageNames = {
            'index.html': 'Home',
            'about.html': 'About',
            'products.html': 'Products',
            'contact.html': 'Contact',
            'thank-you.html': 'Thank You'
        };
        
        return pageNames[page] || 'Home';
    }

    setupSmoothScrolling() {
        // Enhanced smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 100;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    addNavigationIndicators() {
        // Add visual indicators for current page
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        const currentPage = this.getCurrentPageName().toLowerCase();
        
        navLinks.forEach(link => {
            const linkText = link.textContent.toLowerCase();
            if (linkText === currentPage) {
                link.classList.add('active');
            }
        });
    }
}

// ================================
// INITIALIZATION
// ================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize advanced interactions
    const scrollInteractions = new AdvancedScrollInteractions();
    const formEnhancer = new FormInteractionEnhancer();
    const cardEnhancer = new CardInteractionEnhancer();
    const navEnhancer = new NavigationEnhancer();
    
    console.log('Advanced micro-interactions initialized');
});

// ================================
// EXPORT FOR EXTERNAL USE
// ================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AdvancedScrollInteractions,
        FormInteractionEnhancer,
        CardInteractionEnhancer,
        NavigationEnhancer
    };
}
