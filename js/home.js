// Home Page Specific JavaScript (index.html)

document.addEventListener('DOMContentLoaded', function() {
    // Example: Smooth scroll for CTA buttons
    const ctaButtons = document.querySelectorAll('.hero-cta, .cta-btn');
    
    ctaButtons.forEach(button => {
        if (button.getAttribute('href') && button.getAttribute('href').startsWith('#')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });
    
    // Add any home page specific animations or interactions here
    console.log('Home page loaded');
});