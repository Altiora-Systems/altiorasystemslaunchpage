// About Page Specific JavaScript (about.html)

document.addEventListener('DOMContentLoaded', function() {
    // Example: Add fade-in animations for team members or sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should fade in
    const elementsToObserve = document.querySelectorAll('.team-member, .about-section, .value-card');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
    
    // Add any about page specific interactions here
    // About page loaded - ready for production
});