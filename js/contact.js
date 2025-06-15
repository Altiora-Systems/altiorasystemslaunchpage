// Contact Page Specific JavaScript (contact.html)

// Contact Page - Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const subject = document.getElementById('subject')?.value.trim();
            const message = document.getElementById('message')?.value.trim();
            const agreeComms = document.getElementById('agreeComms')?.checked;
            
            // Validation
            if (!name || !email || !subject || !message) {
                e.preventDefault();
                showContactError('Please fill in all required fields.');
                return;
            }
            
            if (!agreeComms) {
                e.preventDefault();
                showContactError('Please agree to receive communications from Altiora Systems.');
                return;
            }
            
            if (!isValidEmail(email)) {
                e.preventDefault();
                showContactError('Please enter a valid email address.');
                return;
            }
            
            // Check if form has an action URL (Google Sheets setup)
            const formAction = contactForm.getAttribute('action');
            if (!formAction || formAction.includes('YOUR_GOOGLE_SHEETS_SCRIPT_URL')) {
                // Fallback to mailto if no backend service is configured
                e.preventDefault();
                handleMailtoFallback(name, email, subject, message);
            } else {
                // Google Sheets is configured - handle submission
                e.preventDefault();
                submitToGoogleSheets(contactForm, {
                    name: name,
                    email: email,
                    subject: subject,
                    message: message,
                    agreeComms: document.getElementById('agreeComms').checked
                });
            }
        });
    }
});

function handleMailtoFallback(name, email, subject, message) {
    const contactForm = document.getElementById('contact-form');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = 'Sending...';
    submitButton.disabled = true;
    
    // Create email content
    const emailSubject = encodeURIComponent(`Contact Form: ${subject}`);
    const emailBody = encodeURIComponent(`Hello,

I would like to get in touch with you.

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Thank you!`);
    
    const mailtoLink = `mailto:contact@altiorasystems.com?subject=${emailSubject}&body=${emailBody}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message and reset form
    setTimeout(() => {
        contactForm.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        showContactSuccess('Thank you! Your email client should open to send your message.');
    }, 1000);
}

function submitToGoogleSheets(form, data) {
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
        // Handle Google Sheets submission error gracefully
        // Fallback to mailto
        handleMailtoFallback(data.name, data.email, data.subject, data.message);
    });
}

// Clear form function for contact page
function clearForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.reset();
    }
}