// NASA · 极简太空探索

document.addEventListener('DOMContentLoaded', () => {
    // 隐藏加载动画
    setTimeout(() => {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 1500);

    // 数字滚动动画
    initStatsAnimation();
    
    // 滚动观察器
    initScrollAnimations();
    
    // 平滑滚动
    initSmoothScroll();
    
    // 添加更多星星
    createMoreStars();
});

function initStatsAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.getAttribute('data-target'));
                animateNumber(stat, target);
                observer.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

function animateNumber(element, target) {
    let current = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const format = target > 1000 ? n => n.toLocaleString() : n => n;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = format(target);
            clearInterval(timer);
        } else {
            element.textContent = format(Math.floor(current));
        }
    }, 16);
}

function initScrollAnimations() {
    const elements = document.querySelectorAll('.mission-card, .timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function createMoreStars() {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;
    
    const numStars = 80;
    
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.style.cssText = `
            position: absolute;
            width: ${Math.random() * 2 + 1}px;
            height: ${Math.random() * 2 + 1}px;
            background: white;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.3};
            animation: twinkle ${Math.random() * 4 + 3}s ease-in-out infinite;
            animation-delay: ${Math.random() * 3}s;
        `;
        starsContainer.appendChild(star);
    }
    
    // 添加闪烁动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// 视差滚动效果
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const delta = scrollY - lastScroll;
    lastScroll = scrollY;
    
    const stars = document.querySelectorAll('.stars > div');
    stars.forEach((star, index) => {
        const speed = (index % 3 + 1) * 0.1;
        const currentTransform = star.style.transform || 'translateY(0px)';
        const currentY = parseFloat(currentTransform.replace('translateY(', '')) || 0;
        star.style.transform = `translateY(${currentY + delta * speed}px)`;
    });
});
