// Contact Page Specific JavaScript (contact.html)

// Clear form function for contact page
function clearForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.reset();
    }
}

// Function to validate email format
function validateEmail(email) {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

// Function to submit email to Google Sheets API (from products.html script)
async function submitEmailToGoogleSheets(email) {
  const endpoint = "https://script.google.com/macros/s/AKfycbxMtHQ5h6LNtIZmR9zPQuf3DQuGGBImS7Wll5GfK8Ox4kYg9C3VYj2U24WExBdUj0z-/exec"; 

  if (!email || !validateEmail(email)) {
    window.showNotification("Please enter a valid email for the newsletter.", "error");
    return;
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: new URLSearchParams({ email: email }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const text = await response.text();
    if (text === "Success") {
        window.showNotification("Thanks for signing up for the newsletter!", "success");
    } else {
        window.showNotification("Error signing up for newsletter: " + text, "error");
    }
  } catch (err) {
    console.error(err);
    window.showNotification("Something went wrong with the newsletter signup.", "error");
  }
}

// Contact Page - Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const clearButton = document.getElementById('clear-form-btn');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const agreeCommsCheckbox = document.getElementById('agreeComms');
    
    if (contactForm && nameInput && emailInput && subjectInput && messageInput && agreeCommsCheckbox) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const subject = subjectInput.value.trim();
            const message = messageInput.value.trim();
            const agreeComms = agreeCommsCheckbox.checked;
            
            // Basic validation for mailto fields
            if (!name || !email || !subject || !message) {
                window.showNotification('Please fill in all required fields for the contact form.', 'error');
                return;
            }

            if (!validateEmail(email)) {
                window.showNotification('Please enter a valid email address for the contact form.', 'error');
                return;
            }
            
            // Construct mailto link
            const mailtoAddress = "contact@altiorasystems.com";
            const mailtoSubject = encodeURIComponent(`Contact Form: ${subject}`);
            const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            const mailtoLink = `mailto:${mailtoAddress}?subject=${mailtoSubject}&body=${mailtoBody}`;

            // Open mail app
            window.location.href = mailtoLink;

            // If checkbox is checked, submit email to Google Sheets API
            if (agreeComms) {
                submitEmailToGoogleSheets(email);
            }

            // Optionally, clear the form after submission attempt
            // This happens after mailto link is triggered
            // clearForm(); // Uncomment if you want to clear the form automatically
        });
    }

    if (clearButton) {
        clearButton.addEventListener('click', clearForm);
    }
}); 