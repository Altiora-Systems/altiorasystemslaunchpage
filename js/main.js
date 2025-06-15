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

// Contact Page - Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const companyName = document.getElementById('companyName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const message = document.getElementById('message').value.trim();
            const agreeComms = document.getElementById('agreeComms').checked;
            
            // Basic validation
            if (!firstName || !lastName || !companyName || !email || !message) {
                showContactError('Please fill in all required fields.');
                return;
            }
            
            if (!agreeComms) {
                showContactError('Please agree to receive communications from Altiora Systems.');
                return;
            }
            
            if (!isValidEmail(email)) {
                showContactError('Please enter a valid email address.');
                return;
            }
            
            // Send email to contact@altiorasystems.com
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
        });
    }
});

// Contact form functionality for simplified Figma design
function clearForm() {
  const form = document.getElementById('contact-form');
  if (form) {
    form.reset();
  }
}

// Form validation for new contact form
function validateContactForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  const agreeComms = document.getElementById('agreeComms').checked;
  
  if (!name || !email || !subject || !message || !agreeComms) {
    alert('Please fill in all required fields and agree to receive communications.');
    return false;
  }
  
  if (!isValidEmail(email)) {
    alert('Please enter a valid email address.');
    return false;
  }
  
  return true;
}

// Enhanced contact form handling for new design
document.addEventListener('DOMContentLoaded', function() {
  const newContactForm = document.getElementById('contact-form');
  
  if (newContactForm && !newContactForm.hasAttribute('data-old-form')) {
    newContactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (!validateContactForm()) {
        return;
      }
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();
      
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
      alert('Thank you! Your email client should open to send your message.');
      clearForm();
    });
  }
});

// Clear form function for contact page
function clearForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.reset();
    }
}

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

function showContactError(message) {
    // Remove existing error messages
    const existingError = document.querySelector('.contact-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and show error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'contact-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #ff6b6b;
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 12px;
        margin-top: 8px;
        text-align: left;
    `;
    
    const submitButton = document.querySelector('.contact-submit-btn');
    submitButton.parentNode.insertBefore(errorDiv, submitButton.nextSibling);
    
    // Remove error after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

function showContactSuccess(message) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.contact-success-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create and show success notification
    const notification = document.createElement('div');
    notification.className = 'contact-success-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: #4CAF50;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        font-family: 'Source Sans Pro', sans-serif;
        font-weight: 600;
        font-size: 16px;
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Trigger show animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Hide notification after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}