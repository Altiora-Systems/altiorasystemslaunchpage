// ================================
// MAIN JAVASCRIPT
// ================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize page animations
    initializeAnimations();
    
    // Set up smooth scrolling
    setupSmoothScrolling();
    
    // Initialize header effects
    initializeHeaderEffects();
    
    // Set up button interactions
    setupButtonInteractions();
    
    // Initialize scroll reveal animations
    initializeScrollReveal();
});

// Initialize page loading animations
function initializeAnimations() {
    // Set initial body opacity for loading effect
    document.body.style.opacity = '0';
    
    // Fade in page on load
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    });
}

// Set up smooth scrolling for anchor links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize header scroll effects
function initializeHeaderEffects() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScrollTop = 0;
    let ticking = false;

    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.backgroundColor = 'rgba(47, 57, 77, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.borderBottom = '1px solid rgba(133, 204, 255, 0.2)';
        } else {
            header.style.backgroundColor = '#2F394D';
            header.style.backdropFilter = 'none';
            header.style.borderBottom = '1px solid rgba(204, 204, 204, 0.2)';
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

// Set up button interactions
function setupButtonInteractions() {
    // Simple button hover effects - no floating animations
    const buttons = document.querySelectorAll('.cta-button, .cta-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'all 0.2s ease';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Handle CTA button clicks
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            
            if (buttonText === 'Partner With Us') {
                // Redirect to contact or partnership page
                window.location.href = 'contact.html';
            } else if (buttonText === 'Invest') {
                // Handle invest button click
                console.log('Invest button clicked');
                // You could open a modal, redirect to an investor page, etc.
                alert('Thank you for your interest in investing! Please contact us for more information.');
            }
        });
    });

    // Join network button click
    const joinButton = document.querySelector('.cta-button');
    if (joinButton) {
        joinButton.addEventListener('click', function() {
            // Scroll to contact section or redirect to signup
            window.location.href = 'contact.html';
        });
    }
}

// Initialize scroll reveal animations - simplified
function initializeScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                // Remove transform animations for static positioning
            }
        });
    }, observerOptions);

    // Only observe stat cards for minimal animation
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transition = `opacity 0.4s ease ${index * 0.1}s`;
        
        observer.observe(card);
    });
}

// Add CSS for ripple animation
function addRippleCSS() {
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Mobile menu handling
function initializeMobileMenu() {
    let isMobile = window.innerWidth <= 768;
    const header = document.querySelector('.header');

    window.addEventListener('resize', function() {
        const wasMobile = isMobile;
        isMobile = window.innerWidth <= 768;
        
        if (wasMobile !== isMobile && header) {
            // Reset header styles on resize
            header.style.height = '';
        }
    });
}

// Performance optimization for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    addRippleCSS();
    initializeMobileMenu();
});

// Preload critical images
function preloadImages() {
    const imagesToPreload = [
        'assets/images/logos/Altiora Systems.svg',
        'assets/images/mockups/BarrelLink MVP.png',
        'assets/images/logos/altiora connect_w:white.svg'
    ];
    
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Call preload on page load
window.addEventListener('load', preloadImages);