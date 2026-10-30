import { useEffect, useMemo, useRef, useState } from 'react';

const BASE_URL = import.meta.env.BASE_URL;

const navItems = [
  { label: 'Home', href: '#home', icon: 'bx-home-alt' },
  { label: 'About', href: '#about', icon: 'bx-user' },
  { label: 'Skills', href: '#skills', icon: 'bx-code-alt' },
  { label: 'Experience', href: '#experience', icon: 'bx-briefcase-alt-2' },
  { label: 'Projects', href: '#portfolio', icon: 'bx-layer' },
  { label: 'Testimonials', href: '#testimonials', icon: 'bx-chat' },
  { label: 'Certificates', href: '#certifications', icon: 'bx-award' },
  { label: 'Blog', href: '#blog', icon: 'bx-news' },
  { label: 'Contact', href: '#contact', icon: 'bx-envelope' },
];

const ACCENT_COLORS = [
  { id: 'emerald', label: 'Emerald Neon', hex: '#10b981', ring: 'ring-emerald-500' },
  { id: 'cyan', label: 'Electric Cyan', hex: '#06b6d4', ring: 'ring-cyan-500' },
  { id: 'violet', label: 'Cyber Violet', hex: '#8b5cf6', ring: 'ring-violet-500' },
  { id: 'amber', label: 'Sunset Amber', hex: '#f59e0b', ring: 'ring-amber-500' },
];

const skillCategories = [
  { id: 'all', label: 'All Stack' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend & APIs' },
  { id: 'database', label: 'Databases' },
  { id: 'devops', label: 'DevOps & Tools' },
];

const allSkills = [
  { name: 'React.js', category: 'frontend', level: 'Advanced', exp: '2+ yrs', icon: 'bxl-react', featured: true },
  { name: 'Next.js', category: 'frontend', level: 'Advanced', exp: '1.5+ yrs', icon: 'bx-terminal', featured: true },
  { name: 'TypeScript', category: 'frontend', level: 'Proficient', exp: '1.5+ yrs', icon: 'bxl-typescript', featured: true },
  { name: 'JavaScript (ES6+)', category: 'frontend', level: 'Advanced', exp: '2+ yrs', icon: 'bxl-javascript', featured: true },
  { name: 'Tailwind CSS', category: 'frontend', level: 'Advanced', exp: '2+ yrs', icon: 'bxl-tailwind-css', featured: true },
  { name: 'HTML5 / Modern CSS', category: 'frontend', level: 'Advanced', exp: '2+ yrs', icon: 'bxl-html5', featured: false },
  { name: 'Redux / Zustand', category: 'frontend', level: 'Proficient', exp: '1+ yr', icon: 'bx-cube', featured: false },

  { name: 'Node.js', category: 'backend', level: 'Advanced', exp: '2+ yrs', icon: 'bxl-nodejs', featured: true },
  { name: 'Express.js', category: 'backend', level: 'Advanced', exp: '2+ yrs', icon: 'bx-server', featured: true },
  { name: 'Spring Boot (Java)', category: 'backend', level: 'Proficient', exp: '1+ yr', icon: 'bxl-spring-boot', featured: true },
  { name: 'RESTful API Architecture', category: 'backend', level: 'Advanced', exp: '2+ yrs', icon: 'bx-network-chart', featured: true },
  { name: 'Microservices Concept', category: 'backend', level: 'Proficient', exp: '1+ yr', icon: 'bx-grid-alt', featured: false },
  { name: 'Authentication (JWT / OAuth)', category: 'backend', level: 'Advanced', exp: '2+ yrs', icon: 'bx-shield-quarter', featured: false },

  { name: 'PostgreSQL', category: 'database', level: 'Proficient', exp: '1.5+ yrs', icon: 'bxl-postgresql', featured: true },
  { name: 'MongoDB & Mongoose', category: 'database', level: 'Advanced', exp: '2+ yrs', icon: 'bxl-mongodb', featured: true },
  { name: 'MySQL', category: 'database', level: 'Proficient', exp: '3+ yrs', icon: 'bx-data', featured: false },
  { name: 'Database Indexing & Queries', category: 'database', level: 'Proficient', exp: '1.5+ yrs', icon: 'bx-search-alt', featured: false },

  { name: 'Git & GitHub Workflows', category: 'devops', level: 'Advanced', exp: '2+ yrs', icon: 'bxl-git', featured: true },
  { name: 'Docker Containers', category: 'devops', level: 'Intermediate', exp: '1+ yr', icon: 'bxl-docker', featured: true },
  { name: 'Vercel / Netlify CI/CD', category: 'devops', level: 'Advanced', exp: '2+ yrs', icon: 'bx-cloud-upload', featured: false },
  { name: 'Postman API Testing', category: 'devops', level: 'Advanced', exp: '2+ yrs', icon: 'bx-check-double', featured: false },
];

const experience = [
  {
    role: 'Software Development Intern (Full-Stack)',
    company: 'Information Network Security Administration (INSA)',
    period: 'Feb 2026 - Sep 2026',
    location: 'Addis Ababa, Ethiopia',
    type: 'Enterprise Project',
    badge: 'Enterprise Impact',
    summary:
      'Engineered core modules for the Integrated Tax Administration System (Tax Audit Module) for the Ministry of Revenue, Ethiopia.',
    highlights: [
      'Developed responsive, mission-critical back-office dashboards using React, Tailwind CSS, and component-driven architecture.',
      'Constructed robust backend business logic and RESTful endpoints using Spring Boot, securing tax lifecycle workflows.',
      'Designed PostgreSQL schemas, complex queries, and transactional procedures ensuring zero data inconsistency across multi-stage tax audits.',
      'Implemented Role-Based Access Control (RBAC) ensuring strict separation between auditors, committee reviewers, and QA supervisors.',
    ],
    stack: ['React', 'Spring Boot', 'PostgreSQL', 'Tailwind CSS', 'REST APIs', 'RBAC'],
  },
  {
    role: 'Full Stack Developer',
    company: 'Self-Employed / Freelance',
    period: '2024 - Present',
    location: 'Remote',
    type: 'Freelance & SaaS',
    badge: 'Production Systems',
    summary:
      'Architected and delivered end-to-end commercial web applications, SaaS platforms, and custom digital portals for diverse clients.',
    highlights: [
      'Built TeamSync, a multi-tenant project management SaaS with Google OAuth, workspace segregation, and task board coordination.',
      'Delivered full-featured e-commerce and food ordering web applications with payment processing, live order tracking, and admin dashboards.',
      'Engineered an enterprise clinical appointment scheduling engine with real-time slot reservation and conflict resolution.',
      'Maintained 100% on-time project delivery with continuous integration and responsive mobile-first UI execution.',
    ],
    stack: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    role: 'B.Sc. in Software Engineering',
    company: 'Haramaya University',
    period: '2023 - 2027',
    location: 'Haramaya, Ethiopia',
    type: 'Education',
    badge: 'Academics',
    summary:
      'Rigorous academic training in algorithms, object-oriented software engineering, distributed systems, and modern database theory.',
    highlights: [
      'Focus areas: Data Structures & Algorithms, Object-Oriented Software Design (Java), Systems Analysis, Database Management.',
      'Active developer in university tech initiatives and open-source software clubs.',
      'Applied theoretical computer science directly into production full-stack client deliverables.',
    ],
    stack: ['Java', 'Algorithms', 'Software Architecture', 'Database Systems', 'OOP'],
  },
];

const projects = [
  {
    id: 'tax-audit',
    name: 'Integrated Tax Audit Administration System',
    tagline: 'Enterprise tax lifecycle platform for the Ministry of Revenue (Ethiopia)',
    category: ['fullstack', 'backend', 'featured'],
    image: `${BASE_URL}image/tax.png`,
    featured: true,
    description:
      'A full-stack enterprise web application built during my internship at INSA to streamline and automate the entire tax-audit lifecycle: annual audit planning, case generation, committee routing, audit execution (Comprehensive, Desk, Issue, Joint), QA, and analytical reporting.',
    challengesSolved:
      'Eliminated manual, paper-driven audit bottlenecks by enforcing strict RBAC workflows, audit trails, and transactional reliability across millions of Ethiopian Birr audit cases.',
    keyFeatures: [
      'Full lifecycle management: planning, assignment, execution, review, and QA closure',
      'Role-Based Access Control (RBAC) back-office dashboard',
      'Spring Boot transactional persistence with PostgreSQL optimization',
      'Audit log trail ensuring complete traceability and anti-fraud compliance',
    ],
    meta: ['Ministry of Revenue Project', 'Enterprise RBAC', 'Spring Boot + Postgres'],
    stack: ['React', 'Tailwind CSS', 'Spring Boot', 'PostgreSQL', 'RESTful APIs'],
    links: [
      { label: 'GitHub Repository', href: 'https://github.com/Borifan02/Tax_audit_system', icon: 'bxl-github' },
    ],
  },
  {
    id: 'teamsync',
    name: 'TeamSync: Project Management SaaS',
    tagline: 'Multi-tenant B2B project & task collaboration platform',
    category: ['fullstack', 'react', 'featured'],
    image: `${BASE_URL}image/management.jpg`,
    featured: true,
    description:
      'A powerful, scalable multi-tenant SaaS application designed for modern software and business teams. Offers workspace tenancy, Google OAuth authentication, customizable project boards, role-based member permissions, and live task status tracking.',
    challengesSolved:
      'Engineered complete tenant isolation at the database layer so organizations never leak workspace data, while keeping server operations fast and low-latency.',
    keyFeatures: [
      'Multi-tenant workspace isolation with role assignments (Owner, Admin, Member)',
      'Google OAuth and secure JWT session management',
      'Interactive Kanban boards with drag-and-drop task workflow',
      'Activity timeline and real-time collaboration telemetry',
    ],
    meta: ['Multi-Tenant SaaS', 'Google OAuth 2.0', 'Task Collaboration'],
    stack: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'JWT Auth'],
    links: [
      { label: 'Live Platform', href: 'https://advanced-team-project-management-sa.vercel.app/', icon: 'bx-link-external' },
      { label: 'Source Code', href: 'https://github.com/Borifan02/Advanced-Team-Project-Management-Saas', icon: 'bxl-github' },
    ],
  },
  {
    id: 'ecommerce',
    name: 'Next-Gen E-Commerce Platform',
    tagline: 'High-conversion online storefront with complete order & cart pipeline',
    category: ['react', 'fullstack'],
    image: `${BASE_URL}image/nubelson-fernandes--Xqckh_XVU4-unsplash.jpg`,
    featured: false,
    description:
      'Modern, high-performance online shopping platform featuring real-time product filtering, persistent shopping cart state, checkout integration, and an administrative inventory management portal.',
    challengesSolved:
      'Structured seamless client-side state caching with lightning-fast catalog search and pagination across 50+ product categories.',
    keyFeatures: [
      'Dynamic catalog search, price range filtering, and category sorting',
      'Persistent cart and wishlist across sessions',
      'Admin dashboard for inventory management and sales analytics',
      'Responsive checkout flow optimized for mobile conversion',
    ],
    meta: ['50+ Products', 'Production Ready', 'Cart Engine'],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Tailwind CSS'],
    links: [
      { label: 'Source Code', href: 'https://github.com/Borifan02/E_commerce_website', icon: 'bxl-github' },
      { label: 'Case Study', href: `${BASE_URL}case-study-ecommerce.html`, icon: 'bx-book-open' },
    ],
  },
  {
    id: 'appointment',
    name: 'Clinical Appointment Management System',
    tagline: 'Automated healthcare booking and schedule optimization engine',
    category: ['react', 'fullstack'],
    image: `${BASE_URL}image/appointment_clinic.png`,
    featured: false,
    description:
      'An enterprise healthcare booking web application facilitating doctor-patient appointment bookings, schedule visibility, instant confirmation, and doctor slot management.',
    challengesSolved:
      'Engineered conflict-free double-booking prevention through transactional time-slot verification algorithms.',
    keyFeatures: [
      'Interactive calendar with real-time doctor availability checking',
      'Automated patient appointment confirmation and status updates',
      'Doctor portal for managing work hours, vacations, and patient history',
      'Mobile-friendly responsive UI tailored for rapid patient check-in',
    ],
    meta: ['Conflict-free Slot Booking', 'Healthcare UX', 'Full Stack MERN'],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    links: [
      { label: 'Live Demo', href: 'https://appointment-management-system-flame.vercel.app/', icon: 'bx-link-external' },
      { label: 'Source Code', href: 'https://github.com/Borifan02/Appointment-Management-System.git', icon: 'bxl-github' },
    ],
  },
  {
    id: 'crypto',
    name: 'CryptoTrack: Real-Time Market Intelligence',
    tagline: 'Cryptocurrency portfolio manager with live streaming pricing APIs',
    category: ['frontend', 'fullstack'],
    image: `${BASE_URL}image/crypto.jpg`,
    featured: false,
    description:
      'Real-time financial dashboard tracking global cryptocurrency valuations, 24-hour volume changes, interactive sparkline charts, personal portfolio valuation, and personalized watchlists.',
    challengesSolved:
      'Implemented resilient third-party rate-limited API caching and web worker throttled chart updates without dropping browser frames.',
    keyFeatures: [
      'Live market feeds with coin search and multi-currency conversion',
      'Interactive price performance visualizers and percentage change metrics',
      'Personal watchlist stored with local and database persistence',
      'Sleek dark-mode financial terminal UI',
    ],
    meta: ['Real-Time APIs', 'Financial Charts', 'Portfolio Tracker'],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'CoinGecko API'],
    links: [
      { label: 'Live Demo', href: 'https://crypto-track-mauve-delta.vercel.app/', icon: 'bx-link-external' },
      { label: 'Source Code', href: 'https://github.com/Borifan02/cryptoTrack', icon: 'bxl-github' },
    ],
  },
  {
    id: 'food',
    name: 'Gourmet Food Ordering & Delivery App',
    tagline: 'Full-stack food ordering platform with live tracking & kitchen dashboard',
    category: ['fullstack', 'frontend'],
    image: `${BASE_URL}image/order_food.png`,
    featured: false,
    description:
      'Comprehensive food delivery application featuring interactive menus, dietary customization, order lifecycle tracking (Placed -> Preparing -> Out for Delivery), and owner order dispatch controls.',
    challengesSolved:
      'Optimized order lifecycle state transitions with live visual status updates and responsive mobile cart flow.',
    keyFeatures: [
      'Interactive categorized food menu with topping customizations',
      'Step-by-step live visual order tracking dashboard',
      'Kitchen order dispatch view for restaurant staff',
      'Secure customer authentication and order history',
    ],
    meta: ['Live Order Lifecycle', 'Interactive Cart', 'Full Stack'],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    links: [
      { label: 'Live Demo', href: 'https://foodorderingweb-kappa.vercel.app/', icon: 'bx-link-external' },
      { label: 'Source Code', href: 'https://github.com/Borifan02/Food-ordering-web-app', icon: 'bxl-github' },
    ],
  },
  {
    id: 'blog-platform',
    name: 'Modern Tech Engineering Blog',
    tagline: 'Next.js & TypeScript editorial platform for software engineers',
    category: ['react', 'frontend'],
    image: `${BASE_URL}image/blog.jpg`,
    featured: false,
    description:
      'A modern developer-focused publication platform built with Next.js and TypeScript, designed for fast page loads, readable typography, syntax highlighting, and clean responsive layouts.',
    challengesSolved:
      'Achieved 100/100 Lighthouse performance metrics with static generation and optimized font delivery.',
    keyFeatures: [
      'Static page generation for instant sub-second page loads',
      'Clean typography hierarchy with code syntax formatting',
      'Categorized tech guides on React, Node.js, and Full-Stack roadmaps',
      'Full SEO metadata and responsive mobile reading mode',
    ],
    meta: ['Next.js Architecture', '100% Responsive', 'Fast Static Delivery'],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Markdown'],
    links: [
      { label: 'Live Platform', href: 'https://borifan-blog.vercel.app/', icon: 'bx-link-external' },
      { label: 'Source Code', href: 'https://github.com/Borifan02/blog', icon: 'bxl-github' },
    ],
  },
];

const testimonials = [
  {
    name: 'Senior Engineering Mentor',
    role: 'Lead Systems Architect',
    organization: 'Enterprise Tax Administration Project (INSA)',
    quote:
      'Borifan demonstrated exceptional engineering maturity during the Integrated Tax Administration System build. His ability to connect complex Spring Boot backend APIs with responsive React frontends while adhering strictly to RBAC security standards made him an indispensable asset to our team.',
    rating: 5,
    tag: 'Enterprise Architecture',
  },
  {
    name: 'Commercial E-Commerce Client',
    role: 'Product Owner & Founder',
    organization: 'Retail Solutions East Africa',
    quote:
      'Borifan delivered our online store well ahead of schedule. The user interface is fluid, the cart and payment checkout work reliably, and he always suggested smart optimizations before we even thought of them. A true professional.',
    rating: 5,
    tag: 'Client Delivery',
  },
  {
    name: 'Peer Collaborator',
    role: 'Software Engineer',
    organization: 'Haramaya University Engineering Lab',
    quote:
      'Working alongside Borifan on full-stack projects is always inspiring. He has an uncompromising focus on clean architecture, writes thoroughly structured code, and easily navigates modern stacks from PostgreSQL queries to TypeScript interfaces.',
    rating: 5,
    tag: 'Code Quality',
  },
];

const blogs = [
  {
    title: 'Building Scalable React Applications',
    icon: 'bxl-react',
    href: `${BASE_URL}blog-react.html`,
    date: 'January 2025',
    readTime: '6 min read',
    tags: ['React', 'Architecture', 'State Management'],
    text: 'Best practices for structuring modern React applications: component modularity, state decoupling, memoization strategies, and production performance optimization.',
  },
  {
    title: 'Node.js API Development Guide',
    icon: 'bxl-nodejs',
    href: `${BASE_URL}blog-nodejs.html`,
    date: 'January 2025',
    readTime: '8 min read',
    tags: ['Node.js', 'Express', 'Security', 'REST'],
    text: 'A practical, end-to-end blueprint for architecting production-grade RESTful APIs with Express.js, MongoDB connection pooling, validation layers, and JWT authentication.',
  },
  {
    title: 'Full Stack Development Roadmap',
    icon: 'bx-code-curly',
    href: `${BASE_URL}blog-roadmap.html`,
    date: 'January 2025',
    readTime: '10 min read',
    tags: ['Career', 'MERN', 'Spring Boot', 'Roadmap'],
    text: 'The comprehensive roadmap I followed to master modern full-stack development, moving from fundamental JavaScript and Java to enterprise distributed systems.',
  },
];

const certifications = [
  {
    title: 'Become a Fullstack Developer',
    issuer: 'Educative',
    date: 'October 14, 2025',
    image: `${BASE_URL}image/image_1.jpg`,
    skills: ['Full Stack Architecture', 'System Design', 'Microservices', 'RESTful Services'],
    credentialId: 'EDU-FSD-2025-998',
  },
  {
    title: 'Programming Fundamentals',
    issuer: 'Udacity',
    date: 'August 27, 2024',
    image: `${BASE_URL}image/image_2.jpg`,
    skills: ['Data Structures', 'Algorithmic Thinking', 'Object-Oriented Design', 'Python'],
    credentialId: 'UD-PROG-2024-411',
  },
  {
    title: 'JavaScript Essentials',
    issuer: 'freeCodeCamp',
    date: 'December 22, 2025',
    image: `${BASE_URL}image/image_3.jpg`,
    skills: ['ES6+ Modern Syntax', 'Asynchronous Programming', 'DOM Manipulation', 'Functional JS'],
    credentialId: 'FCC-JS-2025-783',
  },
];

const strengths = [
  {
    title: 'Architectural Rigor',
    text: 'I architect software with modularity, separation of concerns, and clean boundaries—ensuring systems scale seamlessly as user requirements grow.',
    icon: 'bx-layer',
    highlight: 'Clean Architecture & SOLID',
  },
  {
    title: 'End-to-End Ownership',
    text: 'From database schema normalization and REST API design to micro-interactions and cloud deployment, I take complete responsibility for product delivery.',
    icon: 'bx-rocket',
    highlight: 'Concept to Production',
  },
  {
    title: 'Agile & Enterprise Collaboration',
    text: 'Proven experience collaborating in agile environments, participating in code reviews, technical documentation, and sprint deliverables with cross-functional teams.',
    icon: 'bx-group',
    highlight: 'Team & Stakeholder Synergy',
  },
  {
    title: 'High-Impact Problem Solving',
    text: 'Strong analytical foundation in data structures and algorithms, allowing systematic debugging and profiling of performance bottlenecks.',
    icon: 'bx-bulb',
    highlight: 'Root-Cause Resolution',
  },
  {
    title: 'Security & Access Control',
    text: 'Practical experience implementing secure authentication patterns, role-based authorizations (RBAC), and sanitization against OWASP top vulnerabilities.',
    icon: 'bx-shield-check',
    highlight: 'Security First Mindset',
  },
  {
    title: 'Continuous Innovation',
    text: 'Relentlessly researching industry breakthroughs, modern tooling, and design patterns to bring high-value solutions to engineering problems.',
    icon: 'bx-trending-up',
    highlight: 'Fast Learning Curve',
  },
];

const heroRoles = [
  'Full Stack Software Engineer',
  'MERN & Spring Boot Developer',
  'Scalable Web Systems Architect',
  'React & Next.js Specialist',
];

const scriptURL =
  'https://script.google.com/macros/s/AKfycby0BSxcpnnHTKTy2rXwg9vVtO7PDaidp_zNOg1ILij4huGNz40fPdf4HC0jnvDX8xOx/exec';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [accent, setAccent] = useState('emerald');
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Command Palette State
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [commandSearch, setCommandSearch] = useState('');

  // Hero Mode: Visual vs Terminal
  const [heroMode, setHeroMode] = useState('visual');
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'system', text: "Welcome to Borifan's Interactive CLI v2.4. Type 'help' to inspect commands." },
    { type: 'prompt', text: 'whoami' },
    {
      type: 'output',
      text: 'Borifan Dabasa | Full Stack Developer & Software Engineering Student (Haramaya University). Building scalable web applications with MERN & Spring Boot.',
    },
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const terminalEndRef = useRef(null);

  // Project Filtering & Layout
  const [projectCategory, setProjectCategory] = useState('all');
  const [projectSearch, setProjectSearch] = useState('');
  const [projectLayout, setProjectLayout] = useState('grid');
  const [selectedProject, setSelectedProject] = useState(null);

  // Skills
  const [activeSkillCategory, setActiveSkillCategory] = useState('all');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState('');

  // Certifications Modal
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Contact & Newsletter Status
  const [contactStatus, setContactStatus] = useState('');
  const [contactStatusType, setContactStatusType] = useState('success');
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  const [newsletterStatus, setNewsletterStatus] = useState('');
  const [newsletterStatusType, setNewsletterStatusType] = useState('success');
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState('');
  const [copiedKey, setCopiedKey] = useState('');

  const particlesRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorFollowerRef = useRef(null);

  // Audio feedback synthesizer
  function playClickSound() {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(640, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Ignore audio failure
    }
  }

  function triggerToast(message) {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(''), 3500);
  }

  function copyToClipboard(text, key, label) {
    playClickSound();
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedKey(key);
        triggerToast(`Copied ${label} to clipboard!`);
        window.setTimeout(() => setCopiedKey(''), 2500);
      })
      .catch(() => {
        triggerToast('Failed to copy to clipboard.');
      });
  }

  // Hero roles cycling
  useEffect(() => {
    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % heroRoles.length);
    }, 2500);
    return () => window.clearInterval(timer);
  }, []);

  // Theme & Accent restoration
  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme') || 'dark';
    const savedAccent = window.localStorage.getItem('accent') || 'emerald';
    setTheme(savedTheme);
    setAccent(savedAccent);
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.setAttribute('data-accent', savedAccent);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent);
    window.localStorage.setItem('accent', accent);
  }, [accent]);

  // Preloader removal
  useEffect(() => {
    const loadingTimer = window.setTimeout(() => {
      setIsLoading(false);
    }, 1300);
    return () => window.clearTimeout(loadingTimer);
  }, []);

  // Scroll Progress & Active Section Spy
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }

      // Check sections for active navigation link
      const sectionElements = navItems.map((item) => document.querySelector(item.href)).filter(Boolean);
      const scrollPos = window.scrollY + 220;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(el.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut listener (Cmd/Ctrl+K, Esc, T)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
        setSelectedProject(null);
        setSelectedCertificate(null);
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Particle Canvas Background
  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId = 0;
    const particleCount = Math.min(65, Math.floor(width / 24));

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: 1 + Math.random() * 2.2,
    }));

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fillStyle = 'rgba(var(--accent-rgb, 16, 185, 129), 0.45)';
        context.fill();

        for (let peer = index + 1; peer < particles.length; peer++) {
          const dx = particle.x - particles[peer].x;
          const dy = particle.y - particles[peer].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 115) {
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(particles[peer].x, particles[peer].y);
            context.strokeStyle = `rgba(var(--accent-rgb, 16, 185, 129), ${0.16 * (1 - distance / 115)})`;
            context.lineWidth = 0.8;
            context.stroke();
          }
        }
      });

      animationFrameId = window.requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [accent]);

  // Custom Cursor
  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover)').matches;
    const cursor = cursorRef.current;
    const follower = cursorFollowerRef.current;

    if (!canHover || !cursor || !follower) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let followerX = mouseX;
    let followerY = mouseY;
    let raf = 0;

    const onMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const hoverTargets = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    const onEnter = () => follower.classList.add('active');
    const onLeave = () => follower.classList.remove('active');

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.35;
      cursorY += (mouseY - cursorY) * 0.35;
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;

      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
      raf = window.requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    hoverTargets.forEach((item) => {
      item.addEventListener('mouseenter', onEnter);
      item.addEventListener('mouseleave', onLeave);
    });
    animate();

    return () => {
      document.removeEventListener('mousemove', onMove);
      hoverTargets.forEach((item) => {
        item.removeEventListener('mouseenter', onEnter);
        item.removeEventListener('mouseleave', onLeave);
      });
      window.cancelAnimationFrame(raf);
    };
  }, []);

  // Scroll Reveal Intersection Observer
  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal-item');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [projectCategory, projectSearch, activeSkillCategory, selectedSkillFilter]);

  // Terminal scroll to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory]);

  // Filtered Skills
  const visibleSkills = useMemo(() => {
    if (activeSkillCategory === 'all') return allSkills;
    return allSkills.filter((s) => s.category === activeSkillCategory);
  }, [activeSkillCategory]);

  // Filtered Projects
  const visibleProjects = useMemo(() => {
    let result = projects;

    if (projectCategory !== 'all') {
      result = result.filter((p) => p.category.includes(projectCategory));
    }

    if (selectedSkillFilter) {
      result = result.filter((p) =>
        p.stack.some((st) => st.toLowerCase().includes(selectedSkillFilter.toLowerCase())),
      );
    }

    if (projectSearch.trim()) {
      const q = projectSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.stack.some((tech) => tech.toLowerCase().includes(q)),
      );
    }

    return result;
  }, [projectCategory, projectSearch, selectedSkillFilter]);

  // Terminal Command Executor
  function handleTerminalSubmit(e) {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    playClickSound();
    const newHistory = [...terminalHistory, { type: 'prompt', text: terminalInput }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: 'Available Commands: whoami, skills, projects, experience, contact, resume, clear, accent [emerald|cyan|violet|amber]',
        });
        break;
      case 'whoami':
        newHistory.push({
          type: 'output',
          text: 'Borifan Dabasa: Full Stack Developer & Software Engineering Student at Haramaya University. Experienced in MERN Stack, Spring Boot, and PostgreSQL.',
        });
        break;
      case 'skills':
        newHistory.push({
          type: 'output',
          text: 'Frontend: React, Next.js, TypeScript, Tailwind | Backend: Node.js, Spring Boot, Express | Databases: PostgreSQL, MongoDB | DevOps: Docker, Git, CI/CD',
        });
        break;
      case 'projects':
        newHistory.push({
          type: 'output',
          text: 'Top Projects: 1. Tax Audit System (INSA / Ministry of Revenue) | 2. TeamSync Project SaaS | 3. E-Commerce Platform | 4. Clinical Appointment System',
        });
        break;
      case 'experience':
        newHistory.push({
          type: 'output',
          text: 'Experience: • Software Dev Intern @ INSA (Feb - Sep 2026) • Full Stack Developer @ Freelance (2024 - Present) • B.Sc. Software Engineering @ Haramaya University (2023 - 2027)',
        });
        break;
      case 'contact':
        newHistory.push({
          type: 'output',
          text: 'Email: dabasaborifan@gmail.com | Phone: +251965844287 | Location: Addis Ababa, Ethiopia (Open to Remote)',
        });
        break;
      case 'resume':
      case 'cv':
        window.open(`${BASE_URL}assets/last_last_professional_resume.pdf`, '_blank');
        newHistory.push({ type: 'output', text: 'Opening resume in a new tab...' });
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      case 'accent emerald':
      case 'theme emerald':
        setAccent('emerald');
        newHistory.push({ type: 'output', text: 'Theme accent set to Emerald Neon.' });
        break;
      case 'accent cyan':
      case 'theme cyan':
        setAccent('cyan');
        newHistory.push({ type: 'output', text: 'Theme accent set to Electric Cyan.' });
        break;
      case 'accent violet':
      case 'theme violet':
        setAccent('violet');
        newHistory.push({ type: 'output', text: 'Theme accent set to Cyber Violet.' });
        break;
      case 'accent amber':
      case 'theme amber':
        setAccent('amber');
        newHistory.push({ type: 'output', text: 'Theme accent set to Sunset Amber.' });
        break;
      default:
        newHistory.push({
          type: 'error',
          text: `Command not found: "${cmd}". Type 'help' to view all available commands.`,
        });
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  }

  // Quick Terminal Command Click
  function runTerminalCommand(cmd) {
    setTerminalInput(cmd);
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => { } };
      handleTerminalSubmit(fakeEvent);
    }, 50);
  }

  // Contact Form Submission
  async function handleContactSubmit(event) {
    event.preventDefault();
    playClickSound();
    setIsSubmittingContact(true);
    const form = event.currentTarget;

    try {
      await fetch(scriptURL, { method: 'POST', body: new FormData(form) });
      setContactStatusType('success');
      setContactStatus('Message delivered successfully! Borifan will reach back out promptly.');
      triggerToast('Message sent successfully! 🚀');
      form.reset();
    } catch (error) {
      setContactStatusType('error');
      setContactStatus('Failed to send message. Please reach out directly to dabasaborifan@gmail.com.');
      triggerToast('Submission failed. Check network.');
      console.error(error);
    } finally {
      setIsSubmittingContact(false);
    }

    window.setTimeout(() => setContactStatus(''), 6000);
  }

  // Newsletter Submission
  async function handleNewsletterSubmit(event) {
    event.preventDefault();
    playClickSound();
    setIsSubmittingNewsletter(true);
    const form = event.currentTarget;

    try {
      await fetch(scriptURL, { method: 'POST', body: new FormData(form) });
      setNewsletterStatusType('success');
      setNewsletterStatus('Thank you for subscribing! You are now subscribed to technical updates.');
      triggerToast('Subscribed to developer updates! 📬');
      form.reset();
    } catch (error) {
      setNewsletterStatusType('error');
      setNewsletterStatus('Subscription failed. Please verify your connection.');
      triggerToast('Subscription failed.');
      console.error(error);
    } finally {
      setIsSubmittingNewsletter(false);
    }

    window.setTimeout(() => setNewsletterStatus(''), 6000);
  }

  function toggleTheme() {
    playClickSound();
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  }

  function handleAccentChange(accId) {
    playClickSound();
    setAccent(accId);
    triggerToast(`Theme switched to ${accId.toUpperCase()}`);
  }

  // Command Palette Items
  const commandPaletteItems = useMemo(() => {
    const list = [
      { label: 'Jump to Home', category: 'Navigation', icon: 'bx-home-alt', action: () => (window.location.hash = '#home') },
      { label: 'Jump to About Me', category: 'Navigation', icon: 'bx-user', action: () => (window.location.hash = '#about') },
      { label: 'Jump to Technical Skills', category: 'Navigation', icon: 'bx-code-alt', action: () => (window.location.hash = '#skills') },
      { label: 'Jump to Work Experience', category: 'Navigation', icon: 'bx-briefcase-alt-2', action: () => (window.location.hash = '#experience') },
      { label: 'Jump to Projects & Portfolio', category: 'Navigation', icon: 'bx-layer', action: () => (window.location.hash = '#portfolio') },
      { label: 'Jump to Testimonials', category: 'Navigation', icon: 'bx-chat', action: () => (window.location.hash = '#testimonials') },
      { label: 'Jump to Certifications', category: 'Navigation', icon: 'bx-award', action: () => (window.location.hash = '#certifications') },
      { label: 'Jump to Technical Blog', category: 'Navigation', icon: 'bx-news', action: () => (window.location.hash = '#blog') },
      { label: 'Jump to Contact', category: 'Navigation', icon: 'bx-envelope', action: () => (window.location.hash = '#contact') },
      { label: 'Download Resume (PDF)', category: 'Actions', icon: 'bx-download', action: () => window.open(`${BASE_URL}assets/last_last_professional_resume.pdf`, '_blank') },
      { label: 'Copy Email Address (dabasaborifan@gmail.com)', category: 'Actions', icon: 'bx-copy', action: () => copyToClipboard('dabasaborifan@gmail.com', 'cmd-email', 'email') },
      { label: 'Toggle Light / Dark Mode', category: 'Settings', icon: 'bx-adjust', action: toggleTheme },
      { label: 'Set Accent: Emerald Neon', category: 'Theme', icon: 'bx-palette', action: () => handleAccentChange('emerald') },
      { label: 'Set Accent: Electric Cyan', category: 'Theme', icon: 'bx-palette', action: () => handleAccentChange('cyan') },
      { label: 'Set Accent: Cyber Violet', category: 'Theme', icon: 'bx-palette', action: () => handleAccentChange('violet') },
      { label: 'Set Accent: Sunset Amber', category: 'Theme', icon: 'bx-palette', action: () => handleAccentChange('amber') },
      { label: 'Visit GitHub Profile (@Borifan02)', category: 'Social', icon: 'bxl-github', action: () => window.open('https://github.com/Borifan02', '_blank') },
      { label: 'Visit LinkedIn Profile', category: 'Social', icon: 'bxl-linkedin', action: () => window.open('http://www.linkedin.com/in/borifan-dabasa-a5191036b', '_blank') },
    ];

    if (!commandSearch.trim()) return list;
    const q = commandSearch.toLowerCase();
    return list.filter((item) => item.label.toLowerCase().includes(q) || item.category.toLowerCase().includes(q));
  }, [commandSearch]);

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-accent/30 selection:text-white">
      {/* Scroll Progress Bar at the top of the browser */}
      <div id="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* Dynamic Background Canvas */}
      <canvas ref={particlesRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 opacity-60" />

      {/* Custom Mouse Cursor */}
      <div ref={cursorRef} aria-hidden="true" className="custom-cursor" />
      <div ref={cursorFollowerRef} aria-hidden="true" className="custom-cursor-follower" />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[120] flex items-center gap-3 rounded-2xl border border-white/15 bg-slate-900/90 px-5 py-3.5 text-sm font-medium text-white shadow-2xl backdrop-blur-xl animate-fade-in">
          <span className="flex h-2.5 w-2.5 rounded-full bg-accent animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Preloader */}
      {isLoading && (
        <div className="preloader fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950">
          <div className="preloader-core" />
          <p className="preloader-text">BORIFAN</p>
        </div>
      )}

      {/* Command Palette Modal (Ctrl+K / Cmd+K) */}
      {commandPaletteOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-start justify-center bg-slate-950/80 px-4 pt-20 backdrop-blur-md"
          onClick={() => setCommandPaletteOpen(false)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/15 bg-slate-900/95 shadow-2xl backdrop-blur-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <i className="bx bx-search text-2xl text-accent" />
              <input
                type="text"
                value={commandSearch}
                onChange={(e) => setCommandSearch(e.target.value)}
                placeholder="Type a command or search sections, actions, themes... (Esc to close)"
                autoFocus
                className="w-full bg-transparent text-base text-white outline-none placeholder:text-slate-400"
              />
              <span className="rounded-md border border-white/15 bg-white/5 px-2 py-1 text-xs font-mono text-slate-400">
                ESC
              </span>
            </div>

            <div className="max-h-96 overflow-y-auto p-3">
              {commandPaletteItems.length === 0 ? (
                <div className="py-8 text-center text-sm text-slate-400">No matching commands found.</div>
              ) : (
                <div className="space-y-1">
                  {commandPaletteItems.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        playClickSound();
                        item.action();
                        setCommandPaletteOpen(false);
                      }}
                      className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition hover:bg-white/10 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-lg text-accent transition group-hover:bg-accent group-hover:text-slate-950">
                          <i className={`bx ${item.icon}`} />
                        </div>
                        <span className="text-sm font-medium text-slate-200 group-hover:text-white">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-accent">
                        {item.category}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-white/10 bg-slate-950/40 px-5 py-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span>Navigate:</span>
                <kbd className="rounded border border-white/15 px-1.5 py-0.5">↑</kbd>
                <kbd className="rounded border border-white/15 px-1.5 py-0.5">↓</kbd>
                <span>Select:</span>
                <kbd className="rounded border border-white/15 px-1.5 py-0.5">↵</kbd>
              </div>
              <div>Press <span className="text-accent font-mono">⌘K</span> anytime</div>
            </div>
          </div>
        </div>
      )}

      {/* Header & Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Logo with live status indicator */}
          <a
            href="#home"
            className="group flex items-center gap-2.5 text-lg font-bold tracking-widest text-white transition"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 font-mono text-base font-extrabold text-accent transition group-hover:scale-105 group-hover:bg-accent group-hover:text-slate-950">
              &lt;B/&gt;
            </span>
            <span className="hidden sm:inline font-black tracking-tight text-white group-hover:text-accent transition">
              BORIFAN
            </span>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] p-1.5 text-xs font-medium text-slate-300 backdrop-blur-md lg:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={playClickSound}
                  className={`rounded-full px-3.5 py-1.5 transition ${isActive
                    ? 'bg-accent font-semibold text-slate-950 shadow-sm'
                    : 'hover:bg-white/10 hover:text-white'
                    }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Quick Action Controls */}
          <div className="flex items-center gap-2">
            {/* Quick Command Palette Button */}
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setCommandPaletteOpen(true);
              }}
              title="Command Palette (Ctrl+K)"
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 text-xs font-medium text-slate-300 transition hover:border-accent hover:text-white"
            >
              <i className="bx bx-search text-base text-accent" />
              <span className="hidden md:inline font-mono text-[11px] text-slate-400">⌘K</span>
            </button>

            {/* Accent Theme Color Dropdown / Switcher */}
            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
              {ACCENT_COLORS.map((acc) => (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => handleAccentChange(acc.id)}
                  title={`Switch to ${acc.label}`}
                  className={`h-5 w-5 rounded-full transition-transform hover:scale-125 ${accent === acc.id ? 'ring-2 ring-white scale-110' : 'opacity-70'
                    }`}
                  style={{ backgroundColor: acc.hex }}
                />
              ))}
            </div>

            {/* Dark / Light Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-white transition hover:bg-white/10 hover:text-accent"
              aria-label="Toggle theme"
            >
              <i className={theme === 'light' ? 'bx bx-sun' : 'bx bx-moon'} />
            </button>

            {/* Audio Toggle */}
            <button
              type="button"
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) triggerToast('Tactile audio enabled 🔊');
                else triggerToast('Audio muted 🔇');
              }}
              title={soundEnabled ? 'Tactile sounds enabled' : 'Tactile sounds muted'}
              className={`hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition ${soundEnabled ? 'bg-accent/20 text-accent border-accent/40' : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
            >
              <i className={`bx ${soundEnabled ? 'bx-volume-full' : 'bx-volume-mute'} text-lg`} />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl text-white lg:hidden"
              onClick={() => {
                playClickSound();
                setMenuOpen((value) => !value);
              }}
              aria-label="Toggle mobile menu"
            >
              <i className={menuOpen ? 'bx bx-x' : 'bx bx-menu'} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <div className="border-t border-white/10 bg-slate-950/95 px-4 py-4 backdrop-blur-2xl lg:hidden">
            <nav className="flex flex-col gap-1.5">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-accent"
                  onClick={() => {
                    playClickSound();
                    setMenuOpen(false);
                  }}
                >
                  <i className={`bx ${item.icon} text-lg text-accent`} />
                  <span>{item.label}</span>
                </a>
              ))}
              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                <span className="text-xs text-slate-400">Palette Theme:</span>
                <div className="flex gap-2">
                  {ACCENT_COLORS.map((acc) => (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => handleAccentChange(acc.id)}
                      className="h-6 w-6 rounded-full"
                      style={{ backgroundColor: acc.hex }}
                    />
                  ))}
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="relative z-10">
        {/* ================= HERO SECTION ================= */}
        <section id="home" className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left Hero Column */}
            <div>
              {/* Availability Badge */}
              <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span>Available for Full-Time Roles & Freelance</span>
                <span className="hidden sm:inline text-slate-400">• Addis Ababa / Remote</span>
              </div>

              <p className="text-lg font-medium text-slate-300">Hello, I'm</p>
              <h1 className="mt-1 text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                Borifan <span className="gradient-text">Dabasa</span>
              </h1>

              {/* Dynamic Animated Role Switcher */}
              <div className="mt-4 flex items-center gap-2 text-2xl font-bold text-slate-200 sm:text-3xl">
                <span>A</span>
                <span className="min-h-[40px] text-accent font-extrabold tracking-wide border-b-2 border-accent/40 pb-0.5">
                  {heroRoles[roleIndex]}
                </span>
              </div>

              {/* Professional Introduction Statement */}
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Dedicated to engineering scalable, high-performance web applications and resilient system architectures from concept to production. I bridge robust backend engineering (Spring Boot, Node.js, PostgreSQL) with intuitive, high-speed interfaces (React, Next.js, Tailwind)—building secure, maintainable software tailored for real-world impact.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  onClick={playClickSound}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-slate-950 shadow-glow transition hover:scale-105 hover:bg-accentSoft"
                >
                  <span>Hire Me / Get In Touch</span>
                  <i className="bx bx-right-arrow-alt text-lg" />
                </a>

                <a
                  href={`${BASE_URL}assets/last_last_professional_resume.pdf`}
                  download
                  onClick={playClickSound}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10 hover:border-accent"
                >
                  <i className="bx bx-download text-lg text-accent" />
                  <span>Download CV</span>
                </a>

                <button
                  type="button"
                  onClick={() => copyToClipboard('dabasaborifan@gmail.com', 'hero-email', 'email')}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-3.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                  title="Copy email to clipboard"
                >
                  <i className={copiedKey === 'hero-email' ? 'bx bx-check text-accent text-lg' : 'bx bx-copy text-lg'} />
                  <span>{copiedKey === 'hero-email' ? 'Copied!' : 'Copy Email'}</span>
                </button>
              </div>

              {/* Social Channels & Stats Quick Overview */}
              <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-white/10 pt-6">
                <div className="flex gap-3 text-2xl text-slate-300">
                  <a
                    href="https://github.com/Borifan02"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub Profile"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:bg-accent hover:text-slate-950"
                  >
                    <i className="bx bxl-github" />
                  </a>
                  <a
                    href="http://www.linkedin.com/in/borifan-dabasa-a5191036b"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn Profile"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:bg-accent hover:text-slate-950"
                  >
                    <i className="bx bxl-linkedin-square" />
                  </a>
                  <a
                    href="mailto:dabasaborifan@gmail.com"
                    aria-label="Send direct email"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:bg-accent hover:text-slate-950"
                  >
                    <i className="bx bxs-envelope" />
                  </a>
                  <a
                    href="https://www.instagram.com/borifandabasa"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram Profile"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:bg-accent hover:text-slate-950"
                  >
                    <i className="bx bxl-instagram" />
                  </a>
                </div>

                <div className="h-8 w-px bg-white/10 hidden sm:block" />

                <div className="flex items-center gap-6 text-xs text-slate-400">
                  <div>
                    <span className="block text-xl font-black text-white">7+</span>
                    <span>Production  Web Apps</span>
                  </div>
                  <div>
                    <span className="block text-xl font-black text-accent">3+</span>
                    <span>Years Experience</span>
                  </div>
                  <div>
                    <span className="block text-xl font-black text-white">100%</span>
                    <span>Client Satisfaction</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Column: Visual Studio Card OR Interactive CLI Mode */}
            <div className="relative mx-auto w-full max-w-lg">
              {/* Mode Toggle Header: Visual vs Terminal */}
              <div className="mb-3 flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 p-1.5 backdrop-blur-md">
                <div className="flex gap-1 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setHeroMode('visual');
                    }}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition ${heroMode === 'visual' ? 'bg-accent text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                  >
                    <i className="bx bx-image-alt" />
                    <span>Visual Showcase</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setHeroMode('terminal');
                    }}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition ${heroMode === 'terminal' ? 'bg-accent text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                  >
                    <i className="bx bx-terminal font-mono" />
                    <span>Interactive CLI</span>
                  </button>
                </div>
                <span className="pr-2 font-mono text-[11px] text-accent">
                  {heroMode === 'terminal' ? 'sh-v2.4' : 'HQ Portrait'}
                </span>
              </div>

              {heroMode === 'visual' ? (
                /* High-Res Professional Studio Presentation */
                <div className="group relative">
                  <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-accent via-cyan-500 to-accent opacity-30 blur-2xl transition duration-1000 group-hover:opacity-50" />
                  <div className="relative overflow-hidden rounded-[2.2rem] border border-white/15 bg-slate-900/80 p-3.5 shadow-2xl backdrop-blur-xl">
                    <div className="relative overflow-hidden rounded-[1.8rem]">
                      <img
                        src={`${BASE_URL}image/borifan_portrait.jpg`}
                        alt="Borifan Dabasa - Full Stack Developer"
                        className="h-[480px] w-full object-cover object-top transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                      {/* Floating Tech Stack Badges on top of image */}
                      <div className="absolute bottom-4 left-4 right-4 space-y-2">
                        <div className="flex items-center justify-between rounded-2xl border border-white/15 bg-slate-950/70 p-3 backdrop-blur-md">
                          <div className="flex items-center gap-2.5">
                            <span className="flex h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
                            <div>
                              <div className="text-xs font-bold text-white">Full Stack Engineer</div>
                              <div className="text-[11px] text-slate-400">MERN • Spring Boot • PostgreSQL</div>
                            </div>
                          </div>
                          <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent">
                            Verified
                          </span>
                        </div>

                        {/* Orbiting Stack Pills */}
                        <div className="flex flex-wrap gap-2 text-[11px] font-semibold">
                          <span className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-1 text-slate-200 backdrop-blur">
                            ⚡ React & Next.js
                          </span>
                          <span className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-1 text-slate-200 backdrop-blur">
                            ☕ Spring Boot (Java)
                          </span>
                          <span className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-1 text-slate-200 backdrop-blur">
                            🗄️ PostgreSQL & Mongo DB
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Interactive Terminal CLI */
                <div className="relative rounded-[2rem] border border-white/15 bg-slate-950/90 shadow-2xl backdrop-blur-xl overflow-hidden font-mono text-xs">
                  {/* Terminal Window Header */}
                  <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/80 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                      <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                      <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 text-slate-400 text-[11px]">borifan@dev-terminal:~</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setTerminalHistory([])}
                      className="text-slate-400 hover:text-white"
                      title="Clear terminal"
                    >
                      <i className="bx bx-trash" />
                    </button>
                  </div>

                  {/* Terminal Body */}
                  <div className="h-[390px] overflow-y-auto p-4 space-y-3">
                    {terminalHistory.map((item, i) => (
                      <div key={i} className="leading-relaxed">
                        {item.type === 'prompt' && (
                          <div className="flex items-center gap-2 text-accent">
                            <span>➜</span>
                            <span className="text-cyan-400">~</span>
                            <span className="text-white">{item.text}</span>
                          </div>
                        )}
                        {item.type === 'output' && (
                          <div className="text-slate-300 pl-4">{item.text}</div>
                        )}
                        {item.type === 'error' && (
                          <div className="text-rose-400 pl-4">{item.text}</div>
                        )}
                        {item.type === 'system' && (
                          <div className="text-slate-400 italic">{item.text}</div>
                        )}
                      </div>
                    ))}
                    <div ref={terminalEndRef} />
                  </div>

                  {/* Terminal Quick Command Chips */}
                  <div className="border-t border-white/10 bg-slate-900/60 p-2 flex flex-wrap gap-1.5">
                    {['help', 'whoami', 'skills', 'projects', 'experience', 'contact', 'resume'].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => runTerminalCommand(c)}
                        className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-accent hover:bg-accent hover:text-slate-950 transition"
                      >
                        ${c}
                      </button>
                    ))}
                  </div>

                  {/* Terminal Input Line */}
                  <form onSubmit={handleTerminalSubmit} className="flex items-center border-t border-white/10 px-3 py-2.5 bg-slate-950">
                    <span className="text-accent mr-2">➜</span>
                    <input
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      placeholder="Type 'help' or any command..."
                      className="flex-1 bg-transparent text-white outline-none placeholder:text-slate-600 text-xs font-mono"
                    />
                    <button type="submit" className="text-accent text-xs font-bold hover:text-white">
                      RUN
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ================= ABOUT SECTION ================= */}
        <SectionTitle eyebrow="Background & Philosophy" title="About Borifan" />
        <section id="about" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-center">
            {/* Visual Engineering Philosophy Card */}
            <div className="reveal-item overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-glow">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-accent" />
                  <span className="text-xs font-mono text-slate-300">Software Engineering Profile</span>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-accent">
                  Haramaya University
                </span>
              </div>

              <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-300">
                <p>
                  I help businesses, startups, and product teams transform ideas into scalable, high-converting, and production-ready web applications. Backed by strong Software Engineering foundations at Haramaya University and hands-on enterprise delivery, I build reliable digital solutions engineered for performance, security, and real business growth.
                </p>
                <p>
                  My engineering ethos revolves around <strong className="text-white">scalability</strong>, <strong className="text-white">performance</strong>, and <strong className="text-white">maintainable code</strong>. Whether structuring transactional database models with PostgreSQL, building modular microservices with Spring Boot, or crafting responsive React web apps, I treat every feature as a critical production component.
                </p>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs font-mono text-slate-300">
                  <span className="text-accent">const</span> coreValues = [<br />
                  &nbsp;&nbsp;<span className="text-cyan-300">"Production-grade Reliability"</span>,<br />
                  &nbsp;&nbsp;<span className="text-cyan-300">"Clean SOLID Code Architecture"</span>,<br />
                  &nbsp;&nbsp;<span className="text-cyan-300">"Frictionless User Experience"</span>,<br />
                  &nbsp;&nbsp;<span className="text-cyan-300">"Continuous Skill Expansion"</span><br />
                  ];
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 text-xs">
                {['Addis Ababa, ET', 'English & Amharic & Afaan Oromoo', 'Remote Friendly', 'Full-Stack Specialist'].map(
                  (badge) => (
                    <span key={badge} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-slate-300">
                      {badge}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* About Metrics & Core Competencies */}
            <div className="reveal-item rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-glow">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-accent">
                Executive Overview
              </span>
              <h3 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
                Full Stack Developer with Real Enterprise Delivery
              </h3>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                During my tenure as a Web Development Intern at the <strong>Information Network Security Administration (INSA)</strong>, I worked directly on the Integrated Tax Administration System (Tax Audit Module) for the Ministry of Revenue, Ethiopia—architecting Spring Boot APIs and PostgreSQL databases under enterprise security guidelines.
              </p>

              {/* Impact Stat Cards */}
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center transition hover:border-accent">
                  <div className="text-3xl font-black text-accent">7+</div>
                  <div className="mt-1 text-sm font-semibold text-white">Full-Stack Apps</div>
                  <div className="mt-1 text-[11px] text-slate-400">Deployed to production</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center transition hover:border-accent">
                  <div className="text-3xl font-black text-cyan-300">3+</div>
                  <div className="mt-1 text-sm font-semibold text-white">Years Experience</div>
                  <div className="mt-1 text-[11px] text-slate-400">Full-Stack engineering</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center transition hover:border-accent">
                  <div className="text-3xl font-black text-emerald-300">100%</div>
                  <div className="mt-1 text-sm font-semibold text-white">Client Rating</div>
                  <div className="mt-1 text-[11px] text-slate-400">Reliability & speed</div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#experience"
                  onClick={playClickSound}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                >
                  <span>Explore professional trajectory</span>
                  <i className="bx bx-right-arrow-alt text-lg" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ================= TECHNICAL SKILLS SECTION ================= */}
        <SectionTitle eyebrow="Proficiencies" title="Technical Skills" />
        <section id="skills" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="flex flex-wrap gap-2">
              {skillCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setActiveSkillCategory(cat.id);
                  }}
                  className={`rounded-full px-5 py-2 text-xs font-semibold transition ${activeSkillCategory === cat.id
                    ? 'bg-accent text-slate-950 font-bold'
                    : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {selectedSkillFilter && (
              <div className="flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs text-accent">
                <span>Filtering projects by: <strong>{selectedSkillFilter}</strong></span>
                <button
                  type="button"
                  onClick={() => setSelectedSkillFilter('')}
                  className="text-slate-400 hover:text-white"
                >
                  <i className="bx bx-x" />
                </button>
              </div>
            )}
          </div>

          {/* Interactive Skills Cards Grid */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {visibleSkills.map((skill) => {
              const isSelected = selectedSkillFilter === skill.name;
              return (
                <div
                  key={skill.name}
                  onClick={() => {
                    playClickSound();
                    const next = isSelected ? '' : skill.name;
                    setSelectedSkillFilter(next);
                    if (next) triggerToast(`Filtered projects matching "${skill.name}" 🔍`);
                  }}
                  className={`reveal-item group cursor-pointer rounded-2xl border p-5 transition duration-300 ${isSelected
                    ? 'border-accent bg-accent/10 shadow-glow'
                    : 'border-white/10 bg-slate-900/60 hover:-translate-y-1 hover:border-accent/40 hover:bg-white/5'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-2xl text-accent transition group-hover:bg-accent group-hover:text-slate-950">
                      <i className={`bx ${skill.icon}`} />
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-semibold text-slate-400">
                      {skill.level}
                    </span>
                  </div>

                  <h4 className="mt-4 text-base font-bold text-white group-hover:text-accent transition">
                    {skill.name}
                  </h4>
                  <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
                    <span>Exp: {skill.exp}</span>
                    <span className="text-[11px] text-accent/80 group-hover:underline">
                      Filter projects →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= WORK EXPERIENCE / TRAJECTORY ================= */}
        <SectionTitle eyebrow="Milestones" title="Professional Journey" />
        <section id="experience" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="relative space-y-8 before:absolute before:bottom-0 before:left-5 before:top-4 before:w-0.5 before:bg-gradient-to-b before:from-accent before:via-cyan-400 before:to-transparent">
            {experience.map((item, idx) => (
              <div key={idx} className="reveal-item relative pl-12 sm:pl-16">
                {/* Node icon marker */}
                <div className="absolute left-2.5 top-1.5 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-4 border-slate-950 bg-accent text-slate-950 shadow-glow" />

                {/* Experience Card */}
                <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-6 sm:p-8 shadow-glow transition hover:border-accent/40">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                        {item.badge}
                      </span>
                      <h3 className="mt-2 text-2xl font-bold text-white">{item.role}</h3>
                      <div className="mt-1 text-base font-semibold text-accent">{item.company}</div>
                    </div>

                    <div className="text-right text-xs text-slate-400">
                      <div className="flex items-center gap-1 font-mono text-sm text-slate-300">
                        <i className="bx bx-calendar" />
                        <span>{item.period}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-1 justify-end">
                        <i className="bx bx-map" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm font-medium text-slate-300">{item.summary}</p>

                  {/* Highlights Bullets */}
                  <ul className="mt-4 space-y-2 text-sm text-slate-300">
                    {item.highlights.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <i className="bx bx-check-circle mt-0.5 text-base text-accent flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Stack Badges */}
                  <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                    {item.stack.map((t) => (
                      <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= FEATURED PROJECTS SECTION ================= */}
        <SectionTitle eyebrow="Portfolio" title="Featured Projects" />
        <section id="portfolio" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          {/* Project Filtering, Search & View Controls */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-white/10 pb-6">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Projects' },
                { id: 'featured', label: '⭐ Featured' },
                { id: 'fullstack', label: 'Full Stack' },
                { id: 'react', label: 'React / Next' },
                { id: 'backend', label: 'Backend / Enterprise' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setProjectCategory(f.id);
                  }}
                  className={`rounded-full px-5 py-2 text-xs font-semibold transition ${projectCategory === f.id
                    ? 'bg-accent text-slate-950 font-bold'
                    : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Search Input & Layout Mode Toggle */}
            <div className="flex items-center gap-3">
              <div className="relative min-w-[220px]">
                <i className="bx bx-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  placeholder="Search project or stack..."
                  className="w-full rounded-full border border-white/10 bg-slate-900/80 py-2 pl-9 pr-4 text-xs text-white outline-none placeholder:text-slate-500 focus:border-accent"
                />
              </div>

              <div className="flex rounded-full border border-white/10 bg-white/5 p-1">
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setProjectLayout('grid');
                  }}
                  title="Grid View"
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-base transition ${projectLayout === 'grid' ? 'bg-accent text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                >
                  <i className="bx bx-grid-alt" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setProjectLayout('list');
                  }}
                  title="Detailed List View"
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-base transition ${projectLayout === 'list' ? 'bg-accent text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                >
                  <i className="bx bx-list-ul" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Status Reset Pill */}
          {(projectCategory !== 'all' || selectedSkillFilter || projectSearch) && (
            <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
              <span>Showing {visibleProjects.length} projects</span>
              <button
                type="button"
                onClick={() => {
                  setProjectCategory('all');
                  setSelectedSkillFilter('');
                  setProjectSearch('');
                }}
                className="text-accent underline hover:text-white"
              >
                Reset filters
              </button>
            </div>
          )}

          {/* Projects Display */}
          {visibleProjects.length === 0 ? (
            <div className="mt-12 rounded-3xl border border-white/10 bg-slate-900/40 p-12 text-center">
              <i className="bx bx-search-alt text-4xl text-accent" />
              <h4 className="mt-3 text-xl font-bold text-white">No projects found</h4>
              <p className="mt-1 text-sm text-slate-400">
                Try searching for a different keyword or reset filters to see all applications.
              </p>
              <button
                type="button"
                onClick={() => {
                  setProjectCategory('all');
                  setSelectedSkillFilter('');
                  setProjectSearch('');
                }}
                className="mt-4 rounded-full bg-accent px-6 py-2.5 text-xs font-bold text-slate-950"
              >
                Reset All Filters
              </button>
            </div>
          ) : projectLayout === 'grid' ? (
            <div className="mt-8 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {visibleProjects.map((project) => (
                <article
                  key={project.id}
                  className="reveal-item group flex flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/80 shadow-glow transition duration-300 hover:-translate-y-1.5 hover:border-accent/40"
                >
                  {/* Project Image Banner */}
                  <div className="relative h-60 w-full overflow-hidden bg-slate-950">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    {project.featured && (
                      <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/20 px-3 py-1 text-[11px] font-bold text-amber-300 backdrop-blur-md">
                        <i className="bx bxs-star" /> Featured
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setSelectedProject(project);
                      }}
                      className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 text-lg text-white backdrop-blur transition hover:bg-accent hover:text-slate-950"
                      title="View Architecture Details"
                    >
                      <i className="bx bx-expand" />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold text-white group-hover:text-accent transition">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-accent">{project.tagline}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Metric Pills */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.meta.map((m, mIdx) => (
                        <span
                          key={mIdx}
                          className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent"
                        >
                          {m}
                        </span>
                      ))}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.stack.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          playClickSound();
                          setSelectedProject(project);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
                      >
                        <i className="bx bx-info-circle text-sm" />
                        <span>View Details</span>
                      </button>

                      <div className="flex items-center gap-2">
                        {project.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            onClick={playClickSound}
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-accent hover:text-slate-950"
                          >
                            <i className={`bx ${link.icon || 'bx-link-external'} text-sm`} />
                            <span>{link.label}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Detailed List View */
            <div className="mt-8 space-y-5">
              {visibleProjects.map((project) => (
                <div
                  key={project.id}
                  className="reveal-item group flex flex-col md:flex-row gap-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-6 shadow-glow transition hover:border-accent/40"
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="h-48 md:h-auto md:w-72 rounded-2xl object-cover flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-white group-hover:text-accent transition">
                          {project.name}
                        </h3>
                        {project.featured && (
                          <span className="rounded-full border border-amber-400/30 bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-300">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="mt-1 text-xs font-semibold text-accent">{project.tagline}</div>
                      <p className="mt-3 text-sm leading-relaxed text-slate-300">{project.description}</p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.stack.map((t) => (
                          <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          playClickSound();
                          setSelectedProject(project);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
                      >
                        <i className="bx bx-expand-alt" />
                        <span>Case Study & Architecture Details</span>
                      </button>

                      <div className="flex gap-2">
                        {project.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            onClick={playClickSound}
                            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-accent hover:text-slate-950"
                          >
                            <i className={`bx ${link.icon}`} />
                            <span>{link.label}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* GitHub CTA */}
          <div className="mt-12 text-center">
            <a
              href="https://github.com/Borifan02?tab=repositories"
              target="_blank"
              rel="noreferrer"
              onClick={playClickSound}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-accent hover:text-slate-950"
            >
              <span>Explore All Repositories on GitHub</span>
              <i className="bx bxl-github text-xl" />
            </a>
          </div>
        </section>

        {/* ================= TESTIMONIALS & ENDORSEMENTS ================= */}
        <SectionTitle eyebrow="Endorsements" title="Client & Colleague Praise" />
        <section id="testimonials" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="reveal-item flex flex-col justify-between rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-7 shadow-glow transition hover:-translate-y-1 hover:border-accent/40"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400 text-lg">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <i key={i} className="bx bxs-star" />
                      ))}
                    </div>
                    <span className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent">
                      {t.tag}
                    </span>
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-slate-300 italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <div className="font-bold text-white text-base">{t.name}</div>
                  <div className="text-xs text-accent font-medium">{t.role}</div>
                  <div className="text-xs text-slate-400">{t.organization}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= CERTIFICATIONS & CREDENTIALS ================= */}
        <SectionTitle eyebrow="Validation" title="Certifications & Credentials" />
        <section id="certifications" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {certifications.map((cert) => (
              <button
                key={cert.title}
                type="button"
                onClick={() => {
                  playClickSound();
                  setSelectedCertificate(cert);
                }}
                className="reveal-item group overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/70 text-left shadow-glow transition hover:-translate-y-1.5 hover:border-accent/40"
              >
                <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <span className="absolute bottom-3 right-3 rounded-full border border-white/20 bg-slate-950/80 px-3 py-1 text-xs text-white backdrop-blur">
                    <i className="bx bx-zoom-in mr-1" /> View Proof
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-accent font-semibold">
                    <span>{cert.issuer}</span>
                    <span>{cert.date}</span>
                  </div>
                  <h3 className="mt-2 text-xl font-bold text-white group-hover:text-accent transition">
                    {cert.title}
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {cert.skills.map((s) => (
                      <span key={s} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ================= PROFESSIONAL STRENGTHS ================= */}
        <SectionTitle eyebrow="Capabilities" title="Core Engineering Strengths" />
        <section id="strengths" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {strengths.map((item) => (
              <article
                key={item.title}
                className="reveal-item rounded-[1.75rem] border border-white/10 bg-slate-900/60 p-7 shadow-glow transition duration-300 hover:-translate-y-1 hover:border-accent/40"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-2xl text-accent">
                    <i className={`bx ${item.icon}`} />
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-slate-400">
                    {item.highlight}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ================= TECHNICAL BLOG & GUIDES ================= */}
        <SectionTitle eyebrow="Writings" title="Technical Publications" />
        <section id="blog" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <p className="max-w-2xl text-base text-slate-300">
            Articles and practical engineering guides focused on scalable architectures, API hardening, and modern software workflows.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {blogs.map((post) => (
              <article
                key={post.title}
                className="reveal-item flex flex-col justify-between rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-7 shadow-glow transition hover:-translate-y-1.5 hover:border-accent/40 group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-2xl text-accent">
                      <i className={`bx ${post.icon}`} />
                    </div>
                    <span className="text-xs font-mono text-slate-400">{post.readTime}</span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-white group-hover:text-accent transition">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{post.text}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.map((t) => (
                      <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] text-accent">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-xs text-slate-400">{post.date}</span>
                  <a
                    href={post.href}
                    onClick={playClickSound}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-accent transition hover:translate-x-1"
                  >
                    <span>Read Article</span>
                    <i className="bx bx-right-arrow-alt text-base" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ================= NEWSLETTER SUBSCRIPTION ================= */}
        <section id="newsletter" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-accent/30 bg-gradient-to-r from-accent/15 via-slate-900/90 to-cyan-500/15 p-8 sm:p-12 shadow-glow">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                Developer Dispatch
              </span>
              <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                Stay in the Loop
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Subscribe to receive notification whenever I publish new full-stack architectures, technical case studies, and engineering roadmaps. Zero spam.
              </p>

              <form
                name="newsletter-subscription"
                id="newsletter-form"
                onSubmit={handleNewsletterSubmit}
                className="mt-6 flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  name="Email"
                  placeholder="Enter your work email address"
                  required
                  className="min-w-0 flex-1 rounded-full border border-white/15 bg-slate-950/80 px-5 py-3.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-accent"
                />
                <button
                  type="submit"
                  disabled={isSubmittingNewsletter}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-accentSoft disabled:opacity-50"
                >
                  {isSubmittingNewsletter ? (
                    <span>Subscribing...</span>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <i className="bx bx-send" />
                    </>
                  )}
                </button>
              </form>

              {newsletterStatus && (
                <p
                  className={`mt-3 text-xs font-semibold ${newsletterStatusType === 'error' ? 'text-rose-300' : 'text-accent'
                    }`}
                >
                  {newsletterStatus}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ================= CONTACT SECTION ================= */}
        <SectionTitle eyebrow="Connect" title="Get In Touch" />
        <section id="contact" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            {/* Direct Contact Cards */}
            <div className="space-y-4">
              <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-6 shadow-glow">
                <h3 className="text-xl font-bold text-white">Let's build something remarkable.</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Whether you have an enterprise project, contract inquiry, or full-time software engineering role, my inbox is always open.
                </p>
              </div>

              {[
                {
                  label: 'Email',
                  value: 'dabasaborifan@gmail.com',
                  icon: 'bxs-envelope',
                  action: () => copyToClipboard('dabasaborifan@gmail.com', 'contact-email', 'email'),
                  actionText: 'Copy Email',
                },
                {
                  label: 'Phone / Telegram',
                  value: '+251 965 844 287',
                  icon: 'bxs-phone',
                  action: () => copyToClipboard('+251965844287', 'contact-phone', 'phone'),
                  actionText: 'Copy Phone',
                },
                {
                  label: 'Location & Availability',
                  value: 'Addis Ababa, Ethiopia (Open to Remote Globally)',
                  icon: 'bxs-map',
                },
                {
                  label: 'Working Hours',
                  value: 'UTC+3 (Flexible overlap with US, EMEA, and APAC)',
                  icon: 'bx-time-five',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-glow transition hover:border-accent/40"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-2xl text-accent flex-shrink-0">
                      <i className={`bx ${item.icon}`} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-mono">{item.label}</div>
                      <div className="text-sm font-bold text-white break-all">{item.value}</div>
                    </div>
                  </div>

                  {item.action && (
                    <button
                      type="button"
                      onClick={item.action}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-accent hover:text-slate-950 transition flex-shrink-0"
                    >
                      {item.actionText}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Interactive Contact Form */}
            <form
              name="submit-to-google-sheet"
              className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-glow"
              onSubmit={handleContactSubmit}
            >
              <h3 className="text-2xl font-bold text-white">Send a Direct Message</h3>
              <p className="mt-1 text-xs text-slate-400">
                Messages route straight to my primary inbox and notify my device immediately.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block mb-1 text-xs font-semibold text-slate-300">Your Name *</label>
                  <input
                    name="Name"
                    type="text"
                    placeholder="e.g. Alex Morgan"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-accent"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-xs font-semibold text-slate-300">Your Email *</label>
                  <input
                    name="Email"
                    type="email"
                    placeholder="alex@company.com"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-accent"
                    required
                  />
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block mb-1 text-xs font-semibold text-slate-300">Subject *</label>
                  <input
                    name="Subject"
                    type="text"
                    placeholder="Project Inquiry / Job Opportunity"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-accent"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-xs font-semibold text-slate-300">Phone (Optional)</label>
                  <input
                    name="Mobile"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-accent"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block mb-1 text-xs font-semibold text-slate-300">Project Details or Message *</label>
                <textarea
                  name="Message"
                  rows="5"
                  placeholder="Tell me about your project goals, timelines, or role specifics..."
                  className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-accent"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingContact}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-accentSoft disabled:opacity-50"
              >
                {isSubmittingContact ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <i className="bx bx-send text-base" />
                  </>
                )}
              </button>

              {contactStatus && (
                <p
                  className={`mt-4 text-xs font-semibold ${contactStatusType === 'error' ? 'text-rose-300' : 'text-accent'
                    }`}
                >
                  {contactStatus}
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 bg-slate-950/90 py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <div className="flex items-center gap-2 font-bold tracking-tight text-white">
              <span className="text-accent">&lt;B/&gt;</span>
              <span>Borifan Dabasa</span>
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Full Stack Software Engineer &bull; Crafting scalable architectures with clean code.
            </p>
            <p className="mt-1 text-xs text-slate-500">
              &copy; {new Date().getFullYear()} Borifan Dabasa. All Rights Reserved.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 text-xs text-slate-400">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={playClickSound} className="transition hover:text-accent">
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#home"
              onClick={playClickSound}
              aria-label="Back to top"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-white transition hover:bg-accent hover:text-slate-950"
            >
              <i className="bx bx-up-arrow-alt" />
            </a>
          </div>
        </div>
      </footer>

      {/* ================= PROJECT DETAIL MODAL ================= */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/85 px-4 backdrop-blur-md"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/15 bg-slate-900 p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 text-xl text-white transition hover:bg-accent hover:text-slate-950"
            >
              <i className="bx bx-x" />
            </button>

            <img
              src={selectedProject.image}
              alt={selectedProject.name}
              className="h-64 w-full rounded-2xl object-cover"
            />

            <div className="mt-6">
              <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                {selectedProject.tagline}
              </span>
              <h3 className="mt-3 text-3xl font-extrabold text-white">{selectedProject.name}</h3>

              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                {selectedProject.description}
              </p>

              {/* Challenges solved */}
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-mono font-bold uppercase text-accent">
                  Architectural Challenge Solved
                </div>
                <p className="mt-1 text-sm text-slate-300">{selectedProject.challengesSolved}</p>
              </div>

              {/* Key Features */}
              <div className="mt-5">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                  Key Production Features
                </h4>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {selectedProject.keyFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <i className="bx bx-check-circle text-accent mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="mt-6 border-t border-white/10 pt-4">
                <span className="text-xs text-slate-400 font-mono">Technologies & Tools:</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedProject.stack.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap gap-3">
                {selectedProject.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-bold text-slate-950 hover:bg-accentSoft transition"
                  >
                    <i className={`bx ${link.icon}`} />
                    <span>{link.label}</span>
                  </a>
                ))}
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-xs font-semibold text-white hover:bg-white/10"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= CERTIFICATE LIGHTBOX MODAL ================= */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/85 px-4 backdrop-blur-md"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/15 bg-slate-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedCertificate(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 text-xl text-white transition hover:bg-accent hover:text-slate-950"
            >
              <i className="bx bx-x" />
            </button>

            <img
              src={selectedCertificate.image}
              alt={selectedCertificate.title}
              className="max-h-[65vh] w-full object-contain bg-black/40 p-2"
            />

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedCertificate.title}</h3>
                  <p className="text-sm font-semibold text-accent">{selectedCertificate.issuer}</p>
                </div>
                <div className="text-right text-xs text-slate-400">
                  <div>Issued: {selectedCertificate.date}</div>
                  <div className="font-mono text-slate-500">ID: {selectedCertificate.credentialId}</div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {selectedCertificate.skills.map((s) => (
                  <span key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionTitle({ eyebrow, title }) {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-16 pb-4 sm:px-6 lg:px-8">
      <div>
        <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-accent">
          {eyebrow}
        </span>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
      </div>
    </div>
  );
}

export default App;