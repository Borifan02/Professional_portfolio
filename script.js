const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
const navBackdrop = document.getElementById("nav-backdrop");

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
  html.setAttribute('data-theme', 'light');
  themeIcon.classList.replace('bx-moon', 'bx-sun');
}

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  if (newTheme === 'light') {
    themeIcon.classList.replace('bx-moon', 'bx-sun');
  } else {
    themeIcon.classList.replace('bx-sun', 'bx-moon');
  }
});

// Defensive: if elements don't exist yet, skip attaching handlers
if (!menuIcon || !navbar) {
  console.warn("Navbar or menu button not found in DOM.");
}

// Toggle function for menu open/close
function toggleMenu() {
  if (!navbar || !menuIcon) return;

  const isOpen = navbar.classList.toggle("active");
  menuIcon.classList.toggle("bx-x");

  // Update ARIA attributes for accessibility
  menuIcon.setAttribute("aria-expanded", isOpen ? "true" : "false");
  menuIcon.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

  // Backdrop show/hide
  if (navBackdrop) {
    navBackdrop.hidden = !isOpen;
    navBackdrop.setAttribute("aria-hidden", (!isOpen).toString());
  }

  // Focus management: when open, move focus to first link
  if (isOpen) {
    const firstLink = navbar.querySelector("a");
    firstLink && firstLink.focus();
  } else {
    menuIcon.focus();
  }
}

// Event listeners for menu icon
if (menuIcon) {
  menuIcon.addEventListener("click", (e) => {
    console.debug("menuIcon clicked");
    toggleMenu();
  });

  // Allow keyboard activation (Enter/Space)
  menuIcon.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu();
    }
  });
} else {
  console.warn("menuIcon not found; menu toggle unavailable");
}

// Close menu when clicking outside (backdrop)
if (navBackdrop) {
  navBackdrop.addEventListener("click", () => {
    if (navbar.classList.contains("active")) toggleMenu();
  });
}

// Close when a navigation link is clicked (helpful on mobile)
if (navbar) {
  navbar.addEventListener("click", (e) => {
    const target = e.target;
    if (
      target &&
      target.tagName === "A" &&
      navbar.classList.contains("active")
    ) {
      // allow normal link behavior (navigation) then close
      setTimeout(() => toggleMenu(), 50);
    }
  });
}

// Close on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "Esc") {
    if (navbar.classList.contains("active")) {
      toggleMenu();
    }
  }
});

// Sticky header
window.addEventListener('scroll', () => {
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  // If the navbar is open when the user scrolls, close it
  if (navbar && navbar.classList.contains("active")) {
    navbar.classList.remove("active");
    if (menuIcon) {
      menuIcon.classList.remove("bx-x");
      menuIcon.setAttribute("aria-expanded", "false");
      menuIcon.setAttribute("aria-label", "Open menu");
    }
  }
});

// ========================================
// LOADING SCREEN
// ========================================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }, 2000);
});

// ========================================
// PARTICLES.JS BACKGROUND
// ========================================
if (typeof particlesJS !== 'undefined') {
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: '#0ef' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#0ef',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'repulse' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        push: { particles_nb: 4 }
      }
    },
    retina_detect: true
  });
}

// ========================================
// 3D PARALLAX MOUSE TRACKING
// ========================================
const homeSection = document.querySelector('.home');
const homeContent = document.querySelector('.home-content');
const homeImg = document.querySelector('.home-img');

if (homeSection && homeContent && homeImg) {
  homeSection.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { offsetWidth, offsetHeight } = homeSection;
    
    const xPos = (clientX / offsetWidth - 0.5) * 20;
    const yPos = (clientY / offsetHeight - 0.5) * 20;
    
    homeContent.style.transform = `translate(${-xPos}px, ${-yPos}px)`;
    homeImg.style.transform = `translate(${xPos}px, ${yPos}px) rotateY(${xPos * 0.5}deg) rotateX(${-yPos * 0.5}deg)`;
  });
  
  homeSection.addEventListener('mouseleave', () => {
    homeContent.style.transform = 'translate(0, 0)';
    homeImg.style.transform = 'translate(0, 0) rotateY(0) rotateX(0)';
  });
}

// ========================================
// MAGNETIC BUTTON EFFECT
// ========================================
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
  });
  
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0) scale(1)';
  });
});

// ========================================
// CUSTOM CURSOR
// ========================================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor hover effects
  const hoverElements = document.querySelectorAll('a, button, .btn, .portfolio-box, .cert-card');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursorFollower.classList.add('active'));
    el.addEventListener('mouseleave', () => cursorFollower.classList.remove('active'));
  });
}

// ========================================
// GSAP ANIMATIONS (Replacing ScrollReveal)
// ========================================
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Home section animations
  gsap.from('.home-content h3', { opacity: 0, y: -50, duration: 1, delay: 0.3 });
  gsap.from('.home-content h1', { opacity: 0, x: -100, duration: 1, delay: 0.5 });
  gsap.from('.home-description', { opacity: 0, y: 50, duration: 1, delay: 0.7 });
  gsap.from('.availability-badge', { opacity: 0, scale: 0, duration: 0.5, delay: 0.9, clearProps: 'all' });
  gsap.from('.social-media a', { opacity: 0, y: 50, duration: 0.5, stagger: 0.1, delay: 1.1 });
  gsap.from('.btn-group .btn', { opacity: 0, y: 50, duration: 0.5, stagger: 0.2, delay: 1.3 });
  gsap.from('.home-img', { opacity: 0, x: 100, duration: 1, delay: 0.5 });

  // Scroll-triggered animations
  gsap.utils.toArray('.heading').forEach(heading => {
    gsap.from(heading, {
      scrollTrigger: { trigger: heading, start: 'top 80%' },
      opacity: 0, y: -50, duration: 0.8
    });
  });

  gsap.utils.toArray('.stat-box').forEach((box, i) => {
    gsap.from(box, {
      scrollTrigger: { trigger: box, start: 'top 85%' },
      opacity: 0, y: 50, duration: 0.6, delay: i * 0.1
    });
  });

  gsap.utils.toArray('.skill-category').forEach((skill, i) => {
    gsap.from(skill, {
      scrollTrigger: { trigger: skill, start: 'top 85%' },
      opacity: 0, y: 50, duration: 0.8, delay: i * 0.15
    });
  });

  gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    const direction = i % 2 === 0 ? -100 : 100;
    gsap.from(item, {
      scrollTrigger: { trigger: item, start: 'top 85%' },
      opacity: 0, x: direction, duration: 0.8
    });
  });

  gsap.utils.toArray('.services-box').forEach((box, i) => {
    gsap.from(box, {
      scrollTrigger: { trigger: box, start: 'top 85%' },
      opacity: 0, scale: 0.8, duration: 0.6, delay: i * 0.1
    });
  });

  gsap.utils.toArray('.portfolio-box').forEach((box, i) => {
    gsap.from(box, {
      scrollTrigger: { trigger: box, start: 'top 85%' },
      opacity: 0, y: 50, duration: 0.6, delay: i * 0.1
    });
  });

  gsap.utils.toArray('.cert-card, .blog-card, .soft-skill-box').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 85%' },
      opacity: 0, y: 50, duration: 0.6, delay: i * 0.1
    });
  });

  gsap.from('.about-img', {
    scrollTrigger: { trigger: '.about-img', start: 'top 80%' },
    opacity: 0, x: -100, duration: 1
  });

  gsap.from('.about-content', {
    scrollTrigger: { trigger: '.about-content', start: 'top 80%' },
    opacity: 0, x: 100, duration: 1
  });
}

// ========================================
// VANILLA TILT (3D Card Effects)
// ========================================
if (typeof VanillaTilt !== 'undefined') {
  VanillaTilt.init(document.querySelectorAll('.portfolio-box'), {
    max: 15,
    speed: 400,
    glare: true,
    'max-glare': 0.3
  });

  VanillaTilt.init(document.querySelectorAll('.cert-card'), {
    max: 10,
    speed: 400,
    glare: true,
    'max-glare': 0.2
  });

  VanillaTilt.init(document.querySelectorAll('.stat-box'), {
    max: 8,
    speed: 400
  });

  VanillaTilt.init(document.querySelectorAll('.skill-category'), {
    max: 8,
    speed: 400
  });
}

// Typed.js effect
if (document.querySelector(".multiple-text")) {
  const typed = new Typed(".multiple-text", {
    strings: [
      "Full Stack Developer",
      "MERN Stack Specialist",
      "React.js Expert",
      "Node.js Developer",
      "UI/UX Designer",
    ],
    typeSpeed: 70,
    backSpeed: 50,
    backDelay: 1500,
    loop: true,
    showCursor: true,
    cursorChar: '|',
  });
}

// Skill bar animation on scroll
const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

const animateSkills = () => {
  const skillsSection = document.querySelector('.skills');
  if (!skillsSection || skillsAnimated) return;
  
  const sectionPosition = skillsSection.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.3;
  
  if (sectionPosition < screenPosition) {
    skillBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });
    skillsAnimated = true;
  }
};

window.addEventListener('scroll', animateSkills);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Add hover effect to project boxes
const portfolioBoxes = document.querySelectorAll('.portfolio-box');
portfolioBoxes.forEach(box => {
  box.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px)';
  });
  box.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projectBoxes = document.querySelectorAll('.portfolio-box');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    projectBoxes.forEach(box => {
      if (filter === 'all' || box.getAttribute('data-category').includes(filter)) {
        box.classList.remove('hide');
      } else {
        box.classList.add('hide');
      }
    });
  });
});

// Newsletter form submission with Google Sheets
const newsletterForm = document.forms['newsletter-subscription'];
const newsletterMsg = document.getElementById('newsletter-msg');
const newsletterScriptURL = 'https://script.google.com/macros/s/AKfycby0BSxcpnnHTKTy2rXwg9vVtO7PDaidp_zNOg1ILij4huGNz40fPdf4HC0jnvDX8xOx/exec';

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    fetch(newsletterScriptURL, { method: 'POST', body: new FormData(newsletterForm)})
      .then(response => {
        newsletterMsg.style.color = 'var(--main-color)';
        newsletterMsg.textContent = '✅ Thanks for subscribing!';
        newsletterForm.reset();
        setTimeout(() => newsletterMsg.textContent = '', 5000);
      })
      .catch(error => {
        newsletterMsg.style.color = 'red';
        newsletterMsg.textContent = '❌ Subscription failed!';
        setTimeout(() => newsletterMsg.textContent = '', 5000);
        console.error('Error!', error.message);
      });
  });
}

// Update active nav on scroll for new sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      const activeLink = document.querySelector('header nav a[href*=' + id + ']');
      if (activeLink) activeLink.classList.add('active');
    }
  });
});
