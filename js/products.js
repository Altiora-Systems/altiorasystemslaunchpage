// Products Page Specific JavaScript (products.html)

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