document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor that's now visible
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('click', function() {
        cursor.classList.add('expand');
        setTimeout(() => {
            cursor.classList.remove('expand');
        }, 500);
    });
    
    // Add hover effect to all clickable elements
    const clickables = document.querySelectorAll('a, button, .logo, .post-card, .like-button');
    
    clickables.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.opacity = '0.8';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.opacity = '1';
        });
    });
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.post-card, .newsletter-content, h2');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
    
    // Add interactive hover effects to navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add interactive effect to the logo
    const logo = document.querySelector('.logo');
    
    logo.addEventListener('click', function() {
        this.classList.add('bounce');
        setTimeout(() => {
            this.classList.remove('bounce');
        }, 1000);
    });
    
    // Add interactive effect to the profile image
    const profileImage = document.querySelector('.profile-image');
    
    profileImage.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotate(5deg)';
    });
    
    profileImage.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
    
    // Mobile navigation toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    burger.addEventListener('click', function() {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
        
        // Animate links
        const navLinks = document.querySelectorAll('.nav-links li');
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });
    
});

// Global functions for about page
function flipCard() {
    const card = document.querySelector('.profile-card');
    card.classList.toggle('flipped');
    if (event) event.stopPropagation();
}

function showTab(tabName) {
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const targetPanel = document.getElementById(tabName);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
    
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

function highlightText(element) {
    element.classList.toggle('highlighted');
}

function animateSkill(card) {
    const skillFill = card.querySelector('.skill-fill');
    const skillLevel = skillFill.getAttribute('data-skill');
    
    skillFill.style.width = '0%';
    setTimeout(() => {
        skillFill.style.width = skillLevel + '%';
    }, 100);
    
    card.style.transform = 'scale(1.05)';
    setTimeout(() => {
        card.style.transform = 'scale(1)';
    }, 300);
}

function expandTimeline(item) {
    document.querySelectorAll('.timeline-item').forEach(timelineItem => {
        if (timelineItem !== item) {
            timelineItem.classList.remove('expanded');
        }
    });
    item.classList.toggle('expanded');
}

function rotateFact(card) {
    card.style.transform = 'rotateY(360deg)';
    setTimeout(() => {
        card.style.transform = '';
    }, 600);
};