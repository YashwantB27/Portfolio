// ===================================
// THEME MANAGEMENT
// ===================================

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ===================================
// MOBILE NAVIGATION
// ===================================

const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===================================
// ACTIVE NAVIGATION LINK
// ===================================

const sections = document.querySelectorAll('.section, .hero');
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    // Add shadow to navbar on scroll
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active navigation link
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===================================
// TYPING ANIMATION
// ===================================

const typingText = document.getElementById('typingText');
const phrases = [
    'Full Stack Developer',
    'UI/UX Enthusiast',
    'Problem Solver',
    'Creative Thinker'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at end of phrase
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeEffect, 1000);
});

// ===================================
// HERO NAME HOVER EFFECT
// ===================================

const nameParts = document.querySelectorAll('.name-part');
nameParts.forEach((part, index) => {
    part.setAttribute('data-text', part.textContent);
    
    // Add stagger effect on page load
    part.style.animationDelay = `${0.2 + index * 0.1}s`;
});

// ===================================
// PARTICLE ANIMATION
// ===================================

const particlesContainer = document.getElementById('particles');
const particleCount = 50;

function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation delay
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    
    particlesContainer.appendChild(particle);
}

// Create particles
for (let i = 0; i < particleCount; i++) {
    createParticle();
}

// ===================================
// DOWNLOAD CV FUNCTIONALITY
// ===================================

const downloadCVBtn = document.getElementById('downloadCV');

downloadCVBtn.addEventListener('click', () => {
    // Create a sample CV content
    const cvContent = `
BUDDALA YASHWANT
Full Stack Developer

CONTACT INFORMATION
Email: yashwant@example.com
Phone: +91 1234567890
Location: India

PROFESSIONAL SUMMARY
Passionate developer with expertise in modern web technologies. 
Skilled in creating beautiful and functional web experiences.

SKILLS
- Frontend: HTML, CSS, JavaScript, React
- Backend: Node.js, Python
- Database: MongoDB, MySQL
- Tools: Git, GitHub, VS Code

EXPERIENCE
Full Stack Developer
- Developed responsive web applications
- Implemented modern UI/UX designs
- Collaborated with cross-functional teams

EDUCATION
Bachelor's Degree in Computer Science

PROJECTS
- Portfolio Website
- E-commerce Platform
- Task Management App
    `.trim();
    
    // Create blob and download
    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Buddala_Yashwant_CV.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Show feedback
    const originalText = downloadCVBtn.innerHTML;
    downloadCVBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Downloaded!
    `;
    
    setTimeout(() => {
        downloadCVBtn.innerHTML = originalText;
    }, 2000);
});

// ===================================
// SKILL BARS ANIMATION
// ===================================

const skillBars = document.querySelectorAll('.skill-progress');

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
            skillObserver.unobserve(bar);
        }
    });
}, observerOptions);

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ===================================
// CONTACT FORM HANDLING
// ===================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Message Sent!
    `;
    submitBtn.disabled = true;
    
    // Reset form
    setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 3000);
});

// ===================================
// SMOOTH SCROLL ENHANCEMENT
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// PARALLAX EFFECT FOR GRADIENT ORBS
// ===================================

const orbs = document.querySelectorAll('.gradient-orb');

window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================

const animateOnScroll = document.querySelectorAll('.skill-category, .stat-card, .contact-method');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease-out';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            scrollObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px'
});

animateOnScroll.forEach(element => {
    scrollObserver.observe(element);
});

// ===================================
// CURSOR TRAIL EFFECT (OPTIONAL)
// ===================================

let cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    // Only on larger screens
    if (window.innerWidth > 968) {
        cursorTrail.push({ x: e.clientX, y: e.clientY });
        
        if (cursorTrail.length > trailLength) {
            cursorTrail.shift();
        }
    }
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll event
const optimizedScroll = debounce(() => {
    // Scroll-based animations can go here
}, 10);

window.addEventListener('scroll', optimizedScroll);

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%c👋 Welcome to my portfolio!', 'font-size: 20px; font-weight: bold; color: #7c3aed;');
console.log('%cBuilt with ❤️ by Buddala Yashwant', 'font-size: 14px; color: #6b7280;');
