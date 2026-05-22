console.log("%c🚀 NASA Space Explorer ", "color: #0057e7; font-size: 24px; font-weight: bold;");

document.addEventListener('DOMContentLoaded', function() {
    createStars();
    
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
        }, 1500);
    }
    
    setupScrollAnimations();
    setupHoverEffects();
});

function createStars() {
    let starsContainer = document.getElementById('stars-container');
    if (!starsContainer) {
        const container = document.createElement('div');
        container.id = 'stars-container';
        document.body.insertBefore(container, document.body.firstChild);
        starsContainer = container;
    }
    
    const numStars = 150;
    
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
        star.style.setProperty('--delay', Math.random() * 5 + 's');
        star.style.setProperty('--min-opacity', Math.random() * 0.3 + 0.2);
        
        starsContainer.appendChild(star);
    }
}

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.rin-card-part, .stat-item, .rin-card-article');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

function setupHoverEffects() {
    const cards = document.querySelectorAll('.rin-card-article');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderLeftColor = '#0099ff';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderLeftColor = '#0057e7';
        });
    });
    
    const buttons = document.querySelectorAll('.rin-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const stars = document.querySelectorAll('.star');
    
    stars.forEach((star, index) => {
        const speed = 0.5 + (index % 3) * 0.2;
        star.style.transform = `translateY(${scrolled * speed}px)`;
    });
});
