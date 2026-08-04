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
// HERO NAME SCROLL ROTATION
// ===================================

const heroName = document.getElementById('heroName');
const heroSection = document.getElementById('home');

let ticking = false;

function updateNameRotation() {
    if (!heroName || !heroSection) return;

    const heroHeight = heroSection.offsetHeight;
    const scrollY = window.scrollY;

    // Only rotate while the hero is still in view
    const progress = Math.min(scrollY / heroHeight, 1);

    // Rotate up to 360 degrees as user scrolls through the hero section
    const rotation = progress * 360;
    const scale = 1 - progress * 0.3;   // shrinks slightly while spinning
    const opacity = 1 - progress * 0.6;   // fades out gracefully

    heroName.style.transform = `perspective(600px) rotateY(${rotation}deg) scale(${scale})`;
    heroName.style.opacity = opacity;

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNameRotation);
        ticking = true;
    }
});

// Ensure name is visible on load
updateNameRotation();

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

const cvButtons = document.querySelectorAll('#downloadCV, .download-cv-btn');

cvButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
        const originalText = btn.innerHTML;

        const showFeedback = () => {
            btn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Downloaded!
            `;
            setTimeout(() => {
                btn.innerHTML = originalText;
            }, 2000);
        };

        const triggerDownload = (fileUrl, fileName) => {
            const a = document.createElement('a');
            a.href = fileUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };

        const resumePdf = 'Yashwant_Resume.pdf';

        try {
            const pdfResponse = await fetch(resumePdf, { method: 'HEAD' });
            if (pdfResponse.ok) {
                triggerDownload(resumePdf, 'Yashwant_Resume.pdf');
                showFeedback();
                return;
            }
        } catch (e) {
            // PDF file fetch check ignored
        }

        // Fallback: Generate full CV directly
        const cvContent = `
================================================================================
BUDDALA YASHWANT
Software Engineer | Full Stack & AI Enthusiast
Email: yashwantbudhala27@gmail.com | Phone: +91 8019270425
Location: Vijayawada, India | GitHub: https://github.com/YashwantB27
================================================================================

PROFESSIONAL SUMMARY
--------------------
Passionate Software Engineer with a strong interest in Artificial Intelligence and modern web technologies. Specialized in building scalable, user-centric applications and intelligent systems that solve real-world problems. Experienced in full-stack web development and AI-driven platforms, combining technical expertise with analytical thinking to create impactful digital experiences.

TECHNICAL SKILLS
----------------
- Programming Languages: JavaScript, Python, C++
- Frontend Development: HTML5, CSS3, JavaScript (ES6+), React.js, Responsive UI/UX Design
- Backend Development: Node.js, Django, Python, RESTful APIs
- Databases & Storage: SQLite, MySQL, Database Management
- Tools & Platforms: Git, GitHub, Three.js, VS Code, Render, Vercel

WORK EXPERIENCE & INTERNSHIPS
-----------------------------
Full Stack Development Intern
Digital Blinc | July 2025 – September 2025
- Developed and integrated responsive frontend interfaces and robust backend APIs.
- Designed database schemas and managed database operations for web applications.
- Engineered an Online Booking Engine project delivering seamless booking workflows.
- Collaborated on API integrations and performance optimizations.

KEY PROJECTS
------------
1. Kisan Sahayak — Smart Agriculture & Crop Disease Detection
Technologies: Python, FastAPI, TensorFlow, OpenCV, Chart.js, SQLite
GitHub: https://github.com/YashwantB27/Kisan-Sahayak
- Scans crop leaf images to detect plant diseases using computer vision & deep learning.
- Integrates real-time market price analytics, historical trend charts, and crop recommendations.

2. FeedForward — Health & Sustainable Food Web Application
Technologies: Django, Python, SQLite, JavaScript, HTML5, CSS3
Live Demo: https://feedforward-61pa.onrender.com
GitHub: https://github.com/YashwantB27/FeedForward
- Built a full-stack web application enabling users to track daily calorie intake and monitor nutrition goals.
- Designed a surplus food donation portal connecting donors with food distribution initiatives.
- Implemented user engagement features including dynamic progress tracking and achievement badges.

3. Problem Solving — LeetCode Solutions & Data Structures
Technologies: C++, Python, Java, Data Structures, Algorithms
GitHub: https://github.com/YashwantB27/LeetCode-solutions
- Collection of clean, optimized solutions to Data Structures & Algorithms problems on LeetCode.
- Focused on optimal time/space complexity, algorithmic patterns, and problem-solving techniques.

CERTIFICATIONS & ACHIEVEMENTS
-----------------------------
- AI for Business Professionals — HP LIFE (Feb 2026)
  Serial No: c9206473-b14d-42cf-ab58-f0249b8947cf
- Internship in Full Stack Development — Digital Blinc (Sep 2025)
  Cert ID: CERT-BL-2025-FS-394
- Ignite India: Program Completion & Content Completion — Wadhwani Foundation (Oct-Nov 2025)
- Programming in Modern C++ (Elite Certification) — NPTEL / IIT Kharagpur (Jul-Oct 2025)
  Roll No: NPTEL25CS144S1272102377
- Internet of Things (IoT) 30-Hour Training — ExcelR (Mar-Apr 2025)
  Cert No: 113921/EXCELR/EDL/25042025
- Design Thinking - A Primer (Elite Certification) — NPTEL / IIT Madras (Jan-Feb 2025)
  Roll No: NPTEL25MG18S532600245
- Design Thinking | From Zero to HERO — Udemy (Jan 2025)
- User Orientation on IEEEXplore & DELNET — NDLI Club (Mar 2025)
- The Joy of Computing Using Python (Elite Certification) — NPTEL / IIT Madras (Jul-Oct 2024)
  Roll No: NPTEL24CS113S755700944
- AI for Students: Build Your Own Generative AI Model — NxtWave (Aug 2024)
- NDLI User Awareness Program — NDLI Club (Aug 2024)
- National Librarians' Day Essay Writing Competition — NDLI Club (Aug 2024)

EDUCATION
---------
Bachelor of Technology / Degree in Computer Science & Engineering
Andhra Loyola Institute of Engineering & Technology, Vijayawada, India
================================================================================
        `.trim();

        const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        triggerDownload(url, 'Buddala_Yashwant_CV.txt');
        window.URL.revokeObjectURL(url);
        showFeedback();
    });
});

// ===================================
// SKILL BARS ANIMATION (legacy - kept for compatibility)
// ===================================

const skillBars = document.querySelectorAll('.skill-progress');

if (skillBars.length > 0) {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => { bar.style.width = width; }, 100);
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));
}

// ===================================
// CONTACT FORM HANDLING
// ===================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        console.log('Form submitted:', { name, email, message });

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Message Sent!
        `;
        submitBtn.disabled = true;

        setTimeout(() => {
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 3000);
    });
}

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

const animateOnScroll = document.querySelectorAll('.skill-category, .stat-card, .contact-method, .achievement-card, .subachievement-card, .coding-card');

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

// ===================================
// PROJECT FILTER
// ===================================

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category') || '';
            const matches = filter === 'all' || categories.includes(filter);

            if (matches) {
                card.classList.remove('hidden');
                // Re-trigger entrance animation
                card.style.animation = 'none';
                card.offsetHeight; // reflow
                card.style.animation = '';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ===================================
// CERTIFICATE SECTION MODAL POPUP
// ===================================

const certificatesData = {
    nptel: {
        title: "NPTEL (IIT) Certifications",
        badge: "3 Certificates",
        subtitle: "Elite certifications from IIT Madras & IIT Kharagpur",
        items: [
            {
                title: "Design Thinking - A Primer",
                issuer: "NPTEL (IIT Madras)",
                date: "Issued: Jan-Feb 2025",
                details: "4-week Elite certification course with a consolidated score of 61%. Roll No: NPTEL25MG18S532600245",
                pdf: "Certificates/Design Thinking - A Primer.pdf",
                tag: "Roll No: NPTEL25MG18S532600245"
            },
            {
                title: "Programming in Modern C++",
                issuer: "NPTEL (IIT Kharagpur)",
                date: "Issued: Jul-Oct 2025",
                details: "12-week Elite certification course with a consolidated score of 62%. Roll No: NPTEL25CS144S1272102377",
                pdf: "Certificates/Programming in Modern C++.pdf",
                tag: "Roll No: NPTEL25CS144S1272102377"
            },
            {
                title: "The Joy of Computing Using Python",
                issuer: "NPTEL (IIT Madras)",
                date: "Issued: Jul-Oct 2024",
                details: "12-week Elite certification course with a consolidated score of 65%. Roll No: NPTEL24CS113S755700944",
                pdf: "Certificates/The Joy of Computing using Python.pdf",
                tag: "Roll No: NPTEL24CS113S755700944"
            }
        ]
    },
    wadhwani: {
        title: "Wadhwani Foundation",
        badge: "2 Certificates",
        subtitle: "Ignite India Entrepreneurship training and Practice Venture programs",
        items: [
            {
                title: "Ignite India - Program Completion",
                issuer: "Wadhwani Foundation",
                date: "Issued: November 09, 2025",
                details: "Hands-on entrepreneurial skills training including a 'Practice Venture' project.",
                pdf: "Certificates/Wadhwani Foundation Certificate - 6910ba5a75befa3ac2e7b3e5.pdf",
                tag: "Program Completion"
            },
            {
                title: "Ignite India - Content Completion",
                issuer: "Wadhwani Foundation",
                date: "Issued: October 24, 2025",
                details: "Coursework on key entrepreneurial skills in ideation, business modeling, and financial planning.",
                pdf: "Certificates/Wadhwani Foundation Certificate - 68fb7650340b394e18eee0fd.pdf",
                tag: "Content Completion"
            }
        ]
    },
    ndli: {
        title: "NDLI Club & Academic Events",
        badge: "3 Certificates",
        subtitle: "National Digital Library of India (NDLI) Club workshops and academic competitions",
        items: [
            {
                title: "User Orientation on IEEEXplore & DELNET",
                issuer: "NDLI Club",
                date: "Issued: March 3, 2025",
                details: "Participation in user orientation organized by Andhra Loyola Institute of Engineering & Technology.",
                pdf: "Certificates/Event-certificate-20438--1727846605.338936.pdf",
                tag: "IEEE & DELNET"
            },
            {
                title: "NDLI User Awareness Program",
                issuer: "NDLI Club",
                date: "Issued: August 14, 2024",
                details: "Participation in user awareness session organized by Andhra Loyola Institute of Engineering & Technology.",
                pdf: "Certificates/Event-certificate-20255--1727846647.053074.pdf",
                tag: "User Awareness"
            },
            {
                title: "National Librarians' Day 2024 - Essay Writing",
                issuer: "NDLI Club",
                date: "Issued: August 9, 2024",
                details: "Participation in essay writing competition organized by Andhra Loyola Institute of Engineering & Technology.",
                pdf: "Certificates/Event-certificate-24999--1749395673.890095.pdf",
                tag: "Essay Writing"
            }
        ]
    },
    industry: {
        title: "Professional & Internship Certifications",
        badge: "3 Certificates",
        subtitle: "Full stack web development internship, AI for business, and IoT industry training",
        items: [
            {
                title: "Internship in Full Stack Development",
                issuer: "Digital Blinc",
                date: "Issued: September 25, 2025",
                details: "2-month internship covering Frontend, Backend, APIs, Database Management, and an Online Booking Engine project. Cert ID: CERT-BL-2025-FS-394",
                pdf: "Certificates/Certificate_Buddala Yashwant_CERT-BL-2025-FS-394.pdf",
                tag: "Cert ID: CERT-BL-2025-FS-394"
            },
            {
                title: "AI for Business Professionals",
                issuer: "HP LIFE",
                date: "Issued: February 12, 2026",
                details: "Course covering AI's role in business, effective prompting, ethical use, and integrated vs. standalone tools. Serial No: c9206473-b14d-42cf-ab58-f0249b8947cf",
                pdf: "Certificates/AI for Business Professionals.pdf",
                tag: "Serial: c9206473-b14d-42cf..."
            },
            {
                title: "Internet of Things (IoT)",
                issuer: "ExcelR",
                date: "Issued: March 24 - April 14, 2025",
                details: "30-hour Live Training Program covering IoT fundamentals and applications. Cert No: 113921/EXCELR/EDL/25042025",
                pdf: "Certificates/EXCELR-113921-Buddala Yashwant.pdf",
                tag: "Cert No: 113921/EXCELR..."
            }
        ]
    },
    workshops: {
        title: "AI Workshops & Online Courses",
        badge: "2 Certificates",
        subtitle: "Generative AI model building workshops and specialized Design Thinking credentials",
        items: [
            {
                title: "AI for Students: Build Your Own Generative AI Model",
                issuer: "NxtWave",
                date: "Issued: August 17, 2024",
                details: "Workshop designed to equip students with essential Generative AI era skills.",
                pdf: "Certificates/AI for Students.pdf",
                tag: "Generative AI"
            },
            {
                title: "Design Thinking | From Zero to HERO",
                issuer: "Udemy",
                date: "Issued: January 18, 2025",
                details: "Comprehensive Design Thinking course taught by instructor Ivan Pinar Domínguez.",
                pdf: "Certificates/Design Thinking - Udemy.pdf",
                tag: "Credential UC-17729efe..."
            }
        ]
    }
};

const certModalBackdrop = document.getElementById('certModalBackdrop');
const certModalClose = document.getElementById('certModalClose');
const modalCategoryTitle = document.getElementById('modalCategoryTitle');
const modalCategoryBadge = document.getElementById('modalCategoryBadge');
const modalCategorySubtitle = document.getElementById('modalCategorySubtitle');
const modalCertList = document.getElementById('modalCertList');

function openCertModal(categoryKey) {
    const data = certificatesData[categoryKey];
    if (!data) return;

    modalCategoryTitle.textContent = data.title;
    modalCategoryBadge.textContent = data.badge;
    modalCategorySubtitle.textContent = data.subtitle;

    modalCertList.innerHTML = data.items.map(item => `
        <div class="cert-modal-item">
            <div class="cert-item-top">
                <h4 class="cert-item-title">${item.title}</h4>
                <span class="cert-item-tag">${item.tag}</span>
            </div>
            <p class="cert-item-issuer">${item.issuer} &bull; <span class="cert-item-date">${item.date}</span></p>
            <p class="cert-item-details">${item.details}</p>
            <div class="cert-item-actions">
                <a href="${encodeURI(item.pdf)}" target="_blank" rel="noopener noreferrer" class="btn-cert-pdf">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    View PDF Certificate
                </a>
            </div>
        </div>
    `).join('');

    certModalBackdrop.classList.add('active');
    certModalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeCertModal() {
    if (!certModalBackdrop) return;
    certModalBackdrop.classList.remove('active');
    certModalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// Category Cards Click Handlers
document.querySelectorAll('.certificate-category-card').forEach(card => {
    card.addEventListener('click', () => {
        const categoryKey = card.getAttribute('data-category');
        openCertModal(categoryKey);
    });
});

if (certModalClose) {
    certModalClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeCertModal();
    });
}

if (certModalBackdrop) {
    certModalBackdrop.addEventListener('click', (e) => {
        if (e.target === certModalBackdrop) {
            closeCertModal();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModalBackdrop && certModalBackdrop.classList.contains('active')) {
        closeCertModal();
    }
});

// ===================================
// DYNAMIC CODING STATS FETCH (LEETCODE & HACKEREARTH)
// ===================================

async function fetchLeetCodeStats() {
    const username = 'Yashwant27';
    const rankEl = document.getElementById('leetcodeRank');
    const totalEl = document.getElementById('leetcodeTotalSolved');
    const easyEl = document.getElementById('leetcodeEasy');
    const mediumEl = document.getElementById('leetcodeMedium');
    const hardEl = document.getElementById('leetcodeHard');

    if (!rankEl) return;

    const profileUrl = `https://alfa-leetcode-api.onrender.com/${username}`;
    const solvedUrl = `https://alfa-leetcode-api.onrender.com/${username}/solved`;

    try {
        const [profileRes, solvedRes] = await Promise.all([
            fetch(profileUrl).then(r => r.ok ? r.json() : null).catch(() => null),
            fetch(solvedUrl).then(r => r.ok ? r.json() : null).catch(() => null)
        ]);

        if (profileRes && profileRes.ranking) {
            rankEl.textContent = `#${profileRes.ranking.toLocaleString()}`;
        } else {
            rankEl.textContent = '#2,038,284';
        }

        if (solvedRes) {
            if (solvedRes.solvedProblem !== undefined) totalEl.textContent = solvedRes.solvedProblem;
            if (solvedRes.easySolved !== undefined) easyEl.textContent = solvedRes.easySolved;
            if (solvedRes.mediumSolved !== undefined) mediumEl.textContent = solvedRes.mediumSolved;
            if (solvedRes.hardSolved !== undefined) hardEl.textContent = solvedRes.hardSolved;
        } else {
            totalEl.textContent = '75';
            easyEl.textContent = '51';
            mediumEl.textContent = '24';
            hardEl.textContent = '0';
        }
    } catch (err) {
        console.warn('Failed to fetch live LeetCode stats, using fallback stats:', err);
        rankEl.textContent = '#2,038,284';
        totalEl.textContent = '75';
        easyEl.textContent = '51';
        mediumEl.textContent = '24';
        hardEl.textContent = '0';
    }
}

// Fetch stats on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fetchLeetCodeStats);
} else {
    fetchLeetCodeStats();
}

