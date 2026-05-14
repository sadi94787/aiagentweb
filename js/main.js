// ==========================================
// NexusAI - Main JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavbar();
    initParticles();
    initCounters();
    initPricingToggle();
    initScrollAnimations();
    initContactForm();
    initMobileNav();
});

// ==========================================
// Navbar Scroll Effect
// ==========================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for nav links
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

// ==========================================
// Mobile Navigation
// ==========================================
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ==========================================
// Particle Animation
// ==========================================
function initParticles() {
    const particleContainer = document.getElementById('particles');
    if (!particleContainer) return;

    for (let i = 0; i < 50; i++) {
        const dot = document.createElement('div');
        dot.classList.add('particle-dot');
        dot.style.left = Math.random() * 100 + '%';
        dot.style.top = Math.random() * 100 + '%';
        dot.style.animationDelay = Math.random() * 6 + 's';
        dot.style.animationDuration = (4 + Math.random() * 4) + 's';
        dot.style.width = (2 + Math.random() * 4) + 'px';
        dot.style.height = dot.style.width;
        particleContainer.appendChild(dot);
    }
}

// ==========================================
// Counter Animation
// ==========================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const duration = 2000;
    const stepTime = duration / 60;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, stepTime);
}

// ==========================================
// Pricing Toggle
// ==========================================
function initPricingToggle() {
    const toggle = document.getElementById('pricingToggle');
    const monthlyLabel = document.getElementById('monthlyLabel');
    const yearlyLabel = document.getElementById('yearlyLabel');
    const prices = document.querySelectorAll('.price');

    if (!toggle) return;

    toggle.addEventListener('change', () => {
        const isYearly = toggle.checked;
        
        monthlyLabel.classList.toggle('active', !isYearly);
        yearlyLabel.classList.toggle('active', isYearly);

        prices.forEach(price => {
            const monthly = price.getAttribute('data-monthly');
            const yearly = price.getAttribute('data-yearly');
            
            // Animate price change
            price.style.opacity = '0';
            price.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                price.textContent = isYearly ? yearly : monthly;
                price.style.opacity = '1';
                price.style.transform = 'translateY(0)';
            }, 200);
        });
    });
}

// ==========================================
// Scroll Animations
// ==========================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.feature-card, .agent-card, .step-card, .pricing-card, .testimonial-card, .contact-item'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ==========================================
// Contact Form
// ==========================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        
        btn.textContent = 'Sending...';
        btn.disabled = true;
        btn.style.opacity = '0.7';

        setTimeout(() => {
            btn.textContent = 'Message Sent!';
            btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
            btn.style.opacity = '1';
            
            form.reset();

            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.background = '';
            }, 3000);
        }, 1500);
    });
}

// ==========================================
// Typing Effect for Hero (Optional Enhancement)
// ==========================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}
