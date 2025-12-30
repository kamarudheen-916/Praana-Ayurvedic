// ===================================
// Praana Ayurveda Chikitsalayam
// JavaScript Functionality
// ===================================

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.getElementById('header');
const revealElements = document.querySelectorAll('.reveal');

// ===================================
// Mobile Menu Toggle
// ===================================
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close menu when clicking nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===================================
// Smooth Scroll with Offset
// ===================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        if (targetId === '#home') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===================================
// Sticky Header on Scroll
// ===================================
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// Active Nav Link on Scroll
// ===================================
const sections = document.querySelectorAll('section[id]');

function highlightNavOnScroll() {
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);

// ===================================
// Scroll Reveal Animation
// ===================================
const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
};

// Intersection Observer for better performance (fallback to scroll listener)
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(element => {
        observer.observe(element);
    });
} else {
    // Fallback for browsers without IntersectionObserver
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}

// ===================================
// Initial Reveal on Page Load
// ===================================
window.addEventListener('load', () => {
    revealOnScroll();
});

// ===================================
// WhatsApp Click Tracking (Optional)
// ===================================
const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');

whatsappButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('WhatsApp button clicked');
        // You can add analytics tracking here
    });
});

// ===================================
// Phone Call Click Tracking (Optional)
// ===================================
const phoneButtons = document.querySelectorAll('a[href^="tel:"]');

phoneButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('Phone button clicked');
        // You can add analytics tracking here
    });
});

// ===================================
// Prevent Horizontal Scroll
// ===================================
function preventHorizontalScroll() {
    const body = document.body;
    const html = document.documentElement;
    
    if (body.scrollWidth > window.innerWidth) {
        console.warn('Horizontal scroll detected. Check for elements wider than viewport.');
    }
}

window.addEventListener('resize', preventHorizontalScroll);
preventHorizontalScroll();

// ===================================
// Accessibility: Focus Management
// ===================================
// Add focus-visible polyfill behavior
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// ===================================
// Performance: Lazy Loading Images
// ===================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===================================
// Console Message
// ===================================
console.log(`
%c🌿 Praana Ayurveda Chikitsalayam 🌿
%cആരോഗ്യം ആയുർവേദത്തിലൂടെ
%cWebsite by Premium Design Team
`, 
'color: #067360; font-size: 20px; font-weight: bold;',
'color: #8B7355; font-size: 16px;',
'color: #6C757D; font-size: 12px;'
);
