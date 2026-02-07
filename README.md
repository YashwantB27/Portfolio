# Portfolio Website - Buddala Yashwant

A modern, stunning portfolio website featuring light/dark mode toggle, animated hero section, and smooth user experience.

## ✨ Features

### 🎨 Design & Aesthetics
- **Premium Modern Design** with vibrant gradients and glassmorphism effects
- **Light/Dark Mode Toggle** with smooth transitions and persistent theme storage
- **Responsive Layout** that works perfectly on all devices
- **Smooth Animations** including fade-ins, hover effects, and micro-interactions
- **Custom Typography** using Google Fonts (Inter & Outfit)

### 🚀 Sections

1. **Hero Section**
   - Animated background with floating gradient orbs
   - Particle animation system
   - Your name "Buddala Yashwant" with stunning hover effects
   - Typing animation showing different roles
   - Download CV button with instant feedback
   - Smooth scroll indicator

2. **About Me Section**
   - Professional description
   - Animated statistics cards (Years Experience, Projects, Clients)
   - Hover effects on image placeholder

3. **Skills Section**
   - Three categories: Frontend, Backend, Tools & Others
   - Animated progress bars with shimmer effects
   - Percentage indicators
   - Scroll-triggered animations

4. **Contact Section**
   - Contact information with icons
   - Social media links (LinkedIn, GitHub, Twitter)
   - Working contact form with validation
   - Smooth hover animations

## 🎯 How to Use

### Opening the Website

1. **Double-click** `index.html` to open in your default browser
   
   OR

2. **Right-click** `index.html` → Open with → Choose your browser

### Customization Guide

#### Update Your Information

1. **Personal Details** (in `index.html`):
   - Line 88-89: Update your name if needed
   - Line 178-179: Update email address
   - Line 189-190: Update phone number
   - Line 200-201: Update location

2. **Social Media Links** (in `index.html`):
   - Lines 205-227: Update href attributes with your actual social media URLs

3. **Skills** (in `index.html`):
   - Lines 144-226: Modify skill names and percentages
   - Adjust the `style="width: X%"` attribute to match your skill level

4. **About Me Text** (in `index.html`):
   - Lines 127-134: Update with your personal description

5. **Typing Animation** (in `script.js`):
   - Lines 66-71: Modify the phrases array with your roles/titles

6. **CV Content** (in `script.js`):
   - Lines 143-172: Update the CV content with your actual information

#### Adding Your Photo

Replace the placeholder in the About section:
1. Add your image file to the portfolio folder
2. In `index.html`, find line 122 (the `.image-placeholder` div)
3. Replace it with: `<img src="your-image.jpg" alt="Buddala Yashwant">`

#### Color Customization

In `styles.css`, modify the CSS custom properties (lines 8-15):
```css
--color-primary: hsl(250, 84%, 54%);  /* Main brand color */
--color-secondary: hsl(340, 82%, 52%); /* Secondary accent */
--color-accent: hsl(180, 77%, 47%);    /* Additional accent */
```

## 🎨 Theme Toggle

- Click the sun/moon icon in the navigation bar
- Your preference is saved automatically
- Works seamlessly across all sections

## 📱 Responsive Design

The website automatically adapts to:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🔧 Technical Stack

- **HTML5** - Semantic markup with SEO optimization
- **CSS3** - Modern features including CSS Grid, Flexbox, Custom Properties
- **Vanilla JavaScript** - No dependencies, pure performance
- **Google Fonts** - Inter & Outfit font families

## 📦 File Structure

```
Portfolio/
├── index.html          # Main HTML file
├── styles.css          # All styles and design system
├── script.js           # Interactive functionality
└── README.md          # This file
```

## 🌟 Key Interactions

1. **Hero Name Hover**: Hover over your name to see 3D transform effects
2. **Theme Toggle**: Click to switch between light and dark modes
3. **Download CV**: Click to download your CV (currently generates a sample)
4. **Smooth Scroll**: Click navigation links for smooth scrolling
5. **Form Submit**: Fill and submit the contact form (console logs data)
6. **Skill Bars**: Scroll to skills section to trigger animations
7. **Parallax Orbs**: Move your mouse to see subtle parallax effects

## 🚀 Next Steps

1. **Add Your Content**: Replace placeholder text with your information
2. **Add Your Photo**: Upload and link your professional photo
3. **Update CV**: Modify the CV download content in `script.js`
4. **Connect Form**: Integrate with a backend service (EmailJS, Formspree, etc.)
5. **Deploy**: Host on GitHub Pages, Netlify, or Vercel

## 📝 Notes

- The CV download currently generates a text file. You can replace this with a PDF link
- The contact form logs to console. Integrate with a backend service for real functionality
- All animations are optimized for performance using CSS transforms and opacity
- Theme preference persists using localStorage

## 🎉 Enjoy Your Portfolio!

Your portfolio is ready to impress! Feel free to customize it further to match your personal brand.

---

**Built with ❤️ for Buddala Yashwant**
