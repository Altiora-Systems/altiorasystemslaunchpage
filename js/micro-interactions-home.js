// ================================
// HOME PAGE MICRO-INTERACTIONS
// ================================

class HomeMicroInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.setupProductCards();
        this.setupStatisticsCards();
        this.setupCounterAnimations();
        this.setupCtaSection();
    }

    // ================================
    // PRODUCT CARDS
    // ================================
    setupProductCards() {
        const productCards = document.querySelectorAll('.product-card-new');
        
        productCards.forEach(card => {
            card.classList.add('product-card-hover');
            
            // Add click interaction for cards
            card.addEventListener('click', () => {
                if (window.baseMicroInteractions) {
                    window.baseMicroInteractions.showNotification('Product details coming soon!', 'info');
                }
            });
        });
    }

    // ================================
    // STATISTICS CARDS
    // ================================
    setupStatisticsCards() {
        const statCards = document.querySelectorAll('.stat-card');
        
        statCards.forEach(card => {
            card.classList.add('stat-card-hover');
        });
    }

    // ================================
    // COUNTER ANIMATIONS
    // ================================
    setupCounterAnimations() {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    this.animateCounter(entry.target);
                    entry.target.dataset.animated = 'true';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.stat-card').forEach(card => {
            observer.observe(card);
        });
    }

    animateCounter(statCard) {
        const valueElement = statCard.querySelector('.stat-value');
        if (!valueElement) return;

        const text = valueElement.textContent;
        const number = parseFloat(text.replace(/[^\d.]/g, ''));
        const suffix = text.replace(/[\d.,]/g, '');
        
        if (isNaN(number)) return;
        
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

    // ================================
    // CTA SECTION
    // ================================
    setupCtaSection() {
        // Only add hover effect to the button, not the entire card
        const ctaButtons = document.querySelectorAll('.cta-btn');
        ctaButtons.forEach(button => {
            button.classList.add('btn-hover-up', 'cta-button-enhanced');
        });
    }
}

// ================================
// INITIALIZATION
// ================================
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if we're on the home page
    if (document.body.classList.contains('home-page') || window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
        const homeMicroInteractions = new HomeMicroInteractions();
        console.log('Home page micro-interactions initialized');
    }
});

// ================================
// EXPORT FOR EXTERNAL USE
// ================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HomeMicroInteractions };
}
