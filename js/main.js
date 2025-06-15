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
            
            // Send email to contact@altiorasystems.com
            const submitButton = notifyForm.querySelector('.notify-button');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = 'Submitting...';
            submitButton.disabled = true;
            
            // Send email using mailto (will open user's email client)
            const subject = encodeURIComponent('Product Launch Notification Request');
            const body = encodeURIComponent(`Hello,

I would like to be notified when Barrel Link and AltioraConnect products are available.

Email: ${email}

Thank you!`);
            
            const mailtoLink = `mailto:contact@altiorasystems.com?subject=${subject}&body=${body}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Reset form after a brief delay
            setTimeout(() => {
                emailInput.value = '';
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Show success message
                showSuccess('Thank you! Your email client should open to send the notification request.');
            }, 1000);
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