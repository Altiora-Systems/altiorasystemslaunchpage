// ================================
// PRODUCTS PAGE MICRO-INTERACTIONS
// ================================

class ProductsMicroInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.setupTitleAnimation();
        this.setupFormContainer();
        this.setupEmailInput();
        this.setupNotifyButton();
    }

    // ================================
    // TITLE ANIMATION
    // ================================
    setupTitleAnimation() {
        const title = document.querySelector('.products-figma-title');
        if (title) {
            title.classList.add('products-title-reveal');
        }
    }

    // ================================
    // FORM CONTAINER
    // ================================
    setupFormContainer() {
        const formContainer = document.querySelector('.products-figma-form-container');
        if (formContainer) {
            formContainer.classList.add('form-container-reveal');
        }
    }

    // ================================
    // EMAIL INPUT
    // ================================
    setupEmailInput() {
        const emailInput = document.querySelector('.products-email-input');
        if (emailInput) {
            emailInput.classList.add('email-input-enhanced');
        }
    }

    // ================================
    // NOTIFY BUTTON
    // ================================
    setupNotifyButton() {
        const notifyButton = document.querySelector('.products-notify-button');
        if (notifyButton) {
            notifyButton.classList.add('notify-button-enhanced', 'btn-hover-up', 'cta-button-enhanced');
        }
    }
}

// ================================
// INITIALIZATION
// ================================
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if we're on the products page
    if (window.location.pathname.includes('products.html')) {
        const productsMicroInteractions = new ProductsMicroInteractions();
        console.log('Products page micro-interactions initialized');
    }
});

// ================================
// EXPORT FOR EXTERNAL USE
// ================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProductsMicroInteractions };
}
