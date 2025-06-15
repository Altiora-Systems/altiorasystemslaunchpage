// Contact Page Specific JavaScript (contact.html)

// Contact Page - Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName')?.value.trim();
            const lastName = document.getElementById('lastName')?.value.trim();
            const companyName = document.getElementById('companyName')?.value.trim();
            const contactEmail = document.getElementById('contactEmail')?.value.trim();
            const message = document.getElementById('message')?.value.trim();
            const agreeComms = document.getElementById('agreeComms')?.checked;
            
            // Check for new contact form format
            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const subject = document.getElementById('subject')?.value.trim();
            
            // Handle different form formats
            if (firstName && lastName && companyName && contactEmail && message) {
                // Old form format
                if (!agreeComms) {
                    showContactError('Please agree to receive communications from Altiora Systems.');
                    return;
                }
                
                if (!isValidEmail(contactEmail)) {
                    showContactError('Please enter a valid email address.');
                    return;
                }
                
                handleOldContactForm(firstName, lastName, companyName, contactEmail, message);
            } else if (name && email && subject && message) {
                // New form format
                const newAgreeComms = document.getElementById('agreeComms')?.checked;
                
                if (!newAgreeComms) {
                    showContactError('Please agree to receive communications from Altiora Systems.');
                    return;
                }
                
                if (!isValidEmail(email)) {
                    showContactError('Please enter a valid email address.');
                    return;
                }
                
                handleNewContactForm(name, email, subject, message);
            } else {
                showContactError('Please fill in all required fields.');
                return;
            }
        });
    }
});

function handleOldContactForm(firstName, lastName, companyName, email, message) {
    const contactForm = document.getElementById('contact-form');
    const submitButton = contactForm.querySelector('.contact-submit-btn');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = 'Sending...';
    submitButton.disabled = true;
    
    // Create email content
    const subject = encodeURIComponent('Contact Form Submission');
    const body = encodeURIComponent(`Hello,

I would like to get in touch with you.

Name: ${firstName} ${lastName}
Company: ${companyName}
Email: ${email}

Message:
${message}

Thank you!`);
    
    const mailtoLink = `mailto:contact@altiorasystems.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Reset form after a brief delay
    setTimeout(() => {
        contactForm.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showContactSuccess('Thank you! Your email client should open to send your message.');
    }, 1000);
}

function handleNewContactForm(name, email, subject, message) {
    const contactForm = document.getElementById('contact-form');
    const submitButton = contactForm.querySelector('button[type="submit"]') || contactForm.querySelector('.contact-submit-btn');
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

// Clear form function for contact page
function clearForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.reset();
    }
}