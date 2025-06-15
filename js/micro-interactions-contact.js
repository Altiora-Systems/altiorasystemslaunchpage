// ================================
// CONTACT PAGE MICRO-INTERACTIONS
// ================================

class ContactMicroInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.setupTitleAnimation();
        this.setupFormLayout();
        this.setupFormInputs();
        this.setupCustomCheckbox();
        this.setupFormButtons();
        this.cleanupOldCheckbox();
    }

    // ================================
    // TITLE ANIMATION
    // ================================
    setupTitleAnimation() {
        const title = document.querySelector('.contact-title');
        if (title) {
            title.classList.add('contact-title-reveal');
        }
    }

    // ================================
    // FORM LAYOUT
    // ================================
    setupFormLayout() {
        const layout = document.querySelector('.contact-layout');
        if (layout) {
            layout.classList.add('contact-layout-reveal');
        }
    }

    // ================================
    // FORM INPUTS
    // ================================
    setupFormInputs() {
        const inputs = document.querySelectorAll('.form-input, .form-textarea');
        inputs.forEach(input => {
            input.classList.add('contact-input-enhanced');
        });
    }

    // ================================
    // CUSTOM CHECKBOX
    // ================================
    setupCustomCheckbox() {
        const checkboxGroup = document.querySelector('.checkbox-group');
        if (!checkboxGroup) return;

        const checkbox = checkboxGroup.querySelector('#agreeComms');
        const label = checkboxGroup.querySelector('label[for="agreeComms"]');
        
        if (checkbox && label) {
            // Clear existing label content
            label.innerHTML = '';
            
            // Create new structure
            const checkmark = document.createElement('span');
            checkmark.className = 'checkmark';
            
            const text = document.createElement('span');
            text.className = 'checkbox-text';
            text.textContent = 'I agree to receive communications from Altiora Systems';
            
            label.appendChild(checkmark);
            label.appendChild(text);
            label.classList.add('checkbox-custom');
            
            // Ensure proper positioning
            checkboxGroup.style.display = 'flex';
            checkboxGroup.style.alignItems = 'flex-start';
            checkboxGroup.style.gap = '0';
            checkboxGroup.style.marginBottom = '1.5rem';
        }
    }

    // ================================
    // FORM BUTTONS
    // ================================
    setupFormButtons() {
        const buttons = document.querySelectorAll('.btn-send, .btn-clear');
        buttons.forEach(button => {
            button.classList.add('form-button-enhanced', 'btn-hover-up');
            if (button.classList.contains('btn-send')) {
                button.classList.add('cta-button-enhanced');
            }
        });
    }

    // ================================
    // CLEANUP OLD CHECKBOX
    // ================================
    cleanupOldCheckbox() {
        // Remove any duplicate checkboxes or old styling
        const checkboxGroups = document.querySelectorAll('.checkbox-group');
        if (checkboxGroups.length > 1) {
            // Keep only the first one
            for (let i = 1; i < checkboxGroups.length; i++) {
                checkboxGroups[i].remove();
            }
        }
    }
}

// ================================
// INITIALIZATION
// ================================
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if we're on the contact page
    if (window.location.pathname.includes('contact.html')) {
        const contactMicroInteractions = new ContactMicroInteractions();
        console.log('Contact page micro-interactions initialized');
    }
});

// ================================
// EXPORT FOR EXTERNAL USE
// ================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ContactMicroInteractions };
}
