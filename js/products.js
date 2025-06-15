// Products Page Specifi            // Check if form has an action URL (Google Sheets setup)
            const formAction = notifyForm.getAttribute('action');
            if (!formAction || formAction.includes('YOUR_GOOGLE_SHEETS_SCRIPT_URL')) {
                // Fallback to mailto if no backend service is configured
                e.preventDefault();
                handleNotifyMailtoFallback(email);
            } else {
                // Google Sheets is configured - handle submission
                e.preventDefault();
                submitNotificationToGoogleSheets(notifyForm, { email: email });
            }ript (products.html)

// Products Page - Email Notification Form
document.addEventListener('DOMContentLoaded', function() {
    const notifyForm = document.getElementById('notify-form');
    
    if (notifyForm) {
        notifyForm.addEventListener('submit', function(e) {
            const emailInput = document.getElementById('email');
            const email = emailInput.value.trim();
            
            // Basic email validation
            if (!email) {
                e.preventDefault();
                showError('Please enter your email address.');
                return;
            }
            
            if (!isValidEmail(email)) {
                e.preventDefault();
                showError('Please enter a valid email address.');
                return;
            }
            
            // Check if form has an action URL (Formspree/EmailJS setup)
            const formAction = notifyForm.getAttribute('action');
            if (!formAction || formAction.includes('YOUR_FORM_ID')) {
                // Fallback to mailto if no backend service is configured
                e.preventDefault();
                handleNotificationMailto(email);
            }
            // Otherwise, let the form submit naturally to the configured service
        });
    }
});

function handleNotificationMailto(email) {
    const notifyForm = document.getElementById('notify-form');
    const submitButton = notifyForm.querySelector('button[type="submit"]');
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
        document.getElementById('email').value = '';
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showSuccess('Thank you! Your email client should open to send the notification request.');
    }, 1000);
}

function submitNotificationToGoogleSheets(form, data) {
    const formAction = form.getAttribute('action');
    
    fetch(formAction, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        // Google Sheets submission successful
        window.location.href = '/thank-you.html';
    })
    .catch((error) => {
        console.error('Error submitting to Google Sheets:', error);
        // Fallback to mailto
        handleNotifyMailtoFallback(data.email);
    });
}