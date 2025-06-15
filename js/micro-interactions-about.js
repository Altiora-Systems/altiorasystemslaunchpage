// ================================
// ABOUT PAGE MICRO-INTERACTIONS
// ================================

class AboutMicroInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.setupTeamCards();
        this.setupMissionSection();
        this.setupValuesSection();
        this.setupCtaSection();
    }

    // ================================
    // TEAM CARDS
    // ================================
    setupTeamCards() {
        const teamCards = document.querySelectorAll('.about-team-card');
        
        teamCards.forEach(card => {
            card.classList.add('team-card-hover');
            
            // Setup LinkedIn icon hover
            const linkedinIcon = card.querySelector('.about-team-linkedin');
            if (linkedinIcon) {
                linkedinIcon.classList.add('linkedin-icon-hover');
            }
        });
    }

    // ================================
    // MISSION SECTION
    // ================================
    setupMissionSection() {
        const missionContent = document.querySelector('.about-mission-content');
        if (missionContent) {
            missionContent.classList.add('mission-content-reveal');
        }
    }

    // ================================
    // VALUES SECTION
    // ================================
    setupValuesSection() {
        // Remove micro-interactions from values cards to prevent disappearing
        // Values cards will now use their natural styling without animations
        console.log('Values section initialized without micro-interactions');
    }

    // ================================
    // CTA SECTION
    // ================================
    setupCtaSection() {
        // Ensure CTA buttons have hover-up effect
        const ctaButtons = document.querySelectorAll('.about-cta-btn');
        ctaButtons.forEach(button => {
            button.classList.add('btn-hover-up', 'cta-button-enhanced');
        });
    }
}

// ================================
// INITIALIZATION
// ================================
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if we're on the about page
    if (window.location.pathname.includes('about.html')) {
        const aboutMicroInteractions = new AboutMicroInteractions();
        console.log('About page micro-interactions initialized');
    }
});

// ================================
// EXPORT FOR EXTERNAL USE
// ================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AboutMicroInteractions };
}
