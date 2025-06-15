// Products Page - Email Notification Form
document.addEventListener('DOMContentLoaded', function() {
    const notifyForm = document.getElementById('notify-form');
    
    if (notifyForm) {
        notifyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('email');
            const email = emailInput.value.trim();
            
            // Basic email validation
            if (!email) {
                showError('Please enter your email address.');
                return;
            }
            
            if (!isValidEmail(email)) {
                showError('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            const submitButton = notifyForm.querySelector('.notify-button');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = 'Submitting...';
            submitButton.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                // Reset form
                emailInput.value = '';
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Show success message
                showSuccess('Thank you! We\'ll notify you when our products launch.');
            }, 1500);
        });
    }
});

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
    emailContainer.parentNode.insertBefore(errorDiv, emailContainer.nextSibling);
    
    // Remove error after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
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