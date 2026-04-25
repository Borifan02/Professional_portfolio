import { useEffect, useMemo, useRef, useState } from 'react';

const BASE_URL = import.meta.env.BASE_URL;

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#portfolio' },
  { label: 'Certificates', href: '#certifications' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

const skillGroups = [
  {
    title: 'Frontend',
    icon: 'bx-code-block',
    items: [
      ['React.js', 90],
      ['Next.js', 85],
      ['JavaScript/TypeScript', 88],
      ['HTML5/CSS3', 95],
      ['Tailwind CSS', 90],
    ],
  },
  {
    title: 'Backend',
    icon: 'bx-server',
    items: [
      ['Node.js', 87],
      ['Express.js', 85],
      ['MongoDB', 82],
      ['MySQL', 80],
      ['PHP', 75],
    ],
  },
  {
    title: 'Tools & Others',
    icon: 'bx-git-branch',
    items: [
      ['Git/GitHub', 88],
      ['REST APIs', 85],
      ['Responsive Design', 92],
      ['UI/UX Design', 80],
    ],
  },
  {
    title: 'Testing & DevOps',
    icon: 'bx-test-tube',
    items: [
      ['Jest/React Testing', 75],
      ['Docker', 70],
      ['Vercel/Netlify', 85],
      ['ESLint/Prettier', 80],
    ],
  },
];

const experience = [
  {
    title: 'Software Engineering Student',
    place: 'Haramaya University',
    date: '2023 - Present',
    text: "Pursuing a Bachelor's degree in Software Engineering with focus on full-stack development, algorithms, and software architecture.",
  },
  {
    title: 'Full Stack Developer',
    place: 'Self-Employed',
    date: '2024 - Present',
    text: 'Specialized in building scalable web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js). Successfully delivered multiple projects including e-commerce platforms, appointment management systems, and content management solutions. Focused on writing clean, maintainable code with emphasis on responsive design, API integration, and optimal user experience. Collaborated directly with clients to understand requirements, provide technical solutions, and ensure timely project delivery.',
  },
  {
    title: 'Software Development Intern (Full-Stack)',
    place: 'Information Network Security Administration (INSA)',
    date: 'Feb 2026 - Present',
    text: 'Worked as a Web Development Intern contributing to the development of a full-stack enterprise system. Project: Integrated Tax Administration System - a web-based platform designed to manage and streamline tax-related processes. Developed frontend interfaces using React and built backend services using Spring Boot. Designed and implemented RESTful APIs and integrated PostgreSQL for secure and efficient data storage. Participated in debugging, testing, and performance optimization while following clean code and best practices. Collaborated with team members in an agile environment to deliver scalable and reliable system features.',
  },
];

const services = [
  {
    title: 'Full Stack Development',
    icon: 'bx-code-alt',
    text: 'End-to-end web application development using MERN stack with clean code, RESTful APIs, authentication, and deployment.',
    features: ['Custom Web Applications', 'API Development & Integration', 'Database Design & Optimization', 'Cloud Deployment (Vercel, Netlify)'],
  },
  {
    title: 'UI/UX Design',
    icon: 'bx-palette',
    text: 'User-centered design solutions that combine aesthetics with functionality and improve engagement.',
    features: ['Responsive Web Design', 'Wireframing & Prototyping', 'Brand Identity Design', 'Figma Design'],
  },
];

const projects = [
  {
    id: 'ecommerce',
    name: 'E-Commerce Platform',
    category: ['react', 'fullstack'],
    image: `${BASE_URL}image/nubelson-fernandes--Xqckh_XVU4-unsplash.jpg`,
    description: 'Full-featured online shopping platform with cart management, payment integration, and admin dashboard.',
    meta: ['50+ Products', '5K+ Lines'],
    stack: ['React', 'Node.js', 'MongoDB', 'Express'],
    links: [
      { label: 'Code', href: 'https://github.com/Borifan02/E_commerce_website' },
      { label: 'Case Study', href: `${BASE_URL}case-study-ecommerce.html` },
    ],
  },
  {
    id: 'appointment',
    name: 'Appointment Management System',
    category: ['react', 'frontend'],
    image: `${BASE_URL}image/appointment.jpg`,
    description: 'Booking system with real-time availability, notifications, and calendar integration.',
    meta: ['React', 'Frontend'],
    stack: ['React', 'JSX', 'CSS'],
    links: [
      { label: 'Code', href: 'https://github.com/Borifan02/Appointment-Management-System.git' },
      { label: 'Live Demo', href: 'https://appointment-management-system-flame.vercel.app/' },
    ],
  },
  {
    id: 'blog',
    name: 'Blog Website',
    category: ['react', 'fullstack'],
    image: `${BASE_URL}image/blog.jpg`,
    description: 'Modern blog website built with Next.js, featuring a clean UI and responsive design.',
    meta: ['Fast Load', '100% Responsive'],
    stack: ['TypeScript', 'CSS3', 'React', 'Responsive'],
    links: [
      { label: 'Code', href: 'https://github.com/Borifan02/blog' },
      { label: 'Live Demo', href: 'https://borifan-blog.vercel.app/' },
    ],
  },
  {
    id: 'crypto',
    name: 'Crypto Tracker System',
    category: ['fullstack', 'frontend'],
    image: `${BASE_URL}image/crypto.jpg`,
    description: 'Real-time cryptocurrency tracker with Chart.js visualizations, search/filter, and historical price charts.',
    meta: ['Real-time API', 'Interactive Charts'],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Node.js'],
    links: [
      { label: 'Code', href: 'https://github.com/Borifan02/Crypto-tracker' },
      { label: 'Live Demo', href: 'https://crypto-tracker-system.vercel.app/' },
    ],
  },
  {
    id: 'food',
    name: 'Food Ordering Web Application',
    category: ['fullstack', 'frontend'],
    image: `${BASE_URL}image/order_food.png`,
    description: 'A full-stack food ordering platform with a modern UI, live tracking, secure auth, and payment integration.',
    meta: ['Live Tracking', 'Sales Insights'],
    stack: ['React', 'Tailwind CSS', 'MongoDB', 'Node.js / Express'],
    links: [
      { label: 'Code', href: 'https://github.com/Borifan02/Food-ordering-web-app' },
      { label: 'Live Demo', href: 'https://foodorderingweb-kappa.vercel.app/' },
    ],
  },
];

const blogs = [
  { title: 'Building Scalable React Applications', icon: 'bxl-react', href: `${BASE_URL}blog-react.html`, text: 'Best practices for structuring React apps with performance optimization and clean architecture patterns.' },
  { title: 'Node.js API Development Guide', icon: 'bxl-nodejs', href: `${BASE_URL}blog-nodejs.html`, text: 'Complete guide to building RESTful APIs with Express.js, MongoDB, and authentication best practices.' },
  { title: 'Full Stack Development Roadmap', icon: 'bx-code-curly', href: `${BASE_URL}blog-roadmap.html`, text: 'A comprehensive guide for aspiring developers to master the MERN stack and modern web technologies.' },
];

const certifications = [
  { title: 'Become a Fullstack Developer', issuer: 'Educative', date: 'October 14/2025', image: `${BASE_URL}image/image_1.jpg` },
  { title: 'Programming Fundamentals', issuer: 'Udacity', date: 'August-27/2024', image: `${BASE_URL}image/image_2.jpg` },
  { title: 'JavaScript Essentials', issuer: 'freeCodeCamp', date: 'December-22/2025', image: `${BASE_URL}image/image_3.jpg` },
];

const strengths = [
  ['Team Collaboration', 'Experienced in working with cross-functional teams using Agile methodologies and Git workflows.', 'bx-group'],
  ['Problem Solving', 'Strong analytical skills with a systematic approach to debugging and optimizing complex systems.', 'bx-bulb'],
  ['Communication', 'Clear technical communication with stakeholders, documentation, and code reviews.', 'bx-message-dots'],
  ['Time Management', 'Efficient project delivery with prioritization, deadline management, and quality assurance.', 'bx-time-five'],
  ['Continuous Learning', 'Passionate about staying updated with latest technologies and industry best practices.', 'bx-book-open'],
  ['Clean Code Advocate', 'Committed to writing maintainable, well-documented code following SOLID principles.', 'bx-code-block'],
];

const heroRoles = ['Full Stack Developer', 'React Specialist', 'MERN Builder'];
const scriptURL = 'https://script.google.com/macros/s/AKfycby0BSxcpnnHTKTy2rXwg9vVtO7PDaidp_zNOg1ILij4huGNz40fPdf4HC0jnvDX8xOx/exec';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState('all');
  const [roleIndex, setRoleIndex] = useState(0);
  const [contactStatus, setContactStatus] = useState('');
  const [contactStatusType, setContactStatusType] = useState('success');
  const [newsletterStatus, setNewsletterStatus] = useState('');
  const [newsletterStatusType, setNewsletterStatusType] = useState('success');
  const [theme, setTheme] = useState('dark');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const particlesRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorFollowerRef = useRef(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % heroRoles.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const loadingTimer = window.setTimeout(() => {
      setIsLoading(false);
    }, 1700);

    return () => window.clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return undefined;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId = 0;
    const particleCount = Math.min(70, Math.floor(width / 22));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      size: 1 + Math.random() * 2.5,
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

        if (particle.x < 0 || particle.x > width) {
          particle.vx *= -1;
        }

        if (particle.y < 0 || particle.y > height) {
          particle.vy *= -1;
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fillStyle = 'rgba(52, 211, 153, 0.55)';
        context.fill();

        for (let peer = index + 1; peer < particles.length; peer += 1) {
          const dx = particle.x - particles[peer].x;
          const dy = particle.y - particles[peer].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 110) {
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(particles[peer].x, particles[peer].y);
            context.strokeStyle = `rgba(45, 212, 191, ${0.18 * (1 - distance / 110)})`;
            context.lineWidth = 1;
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
  }, []);

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover)').matches;
    const cursor = cursorRef.current;
    const follower = cursorFollowerRef.current;

    if (!canHover || !cursor || !follower) {
      return undefined;
    }

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

    const hoverTargets = document.querySelectorAll('a, button, input, textarea');
    const onEnter = () => follower.classList.add('active');
    const onLeave = () => follower.classList.remove('active');

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.35;
      cursorY += (mouseY - cursorY) * 0.35;
      followerX += (mouseX - followerX) * 0.14;
      followerY += (mouseY - followerY) * 0.14;

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
      { threshold: 0.15 },
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const visibleProjects = useMemo(() => {
    if (projectFilter === 'all') {
      return projects;
    }

    return projects.filter((project) => project.category.includes(projectFilter));
  }, [projectFilter]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  }

  async function handleContactSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;

    try {
      await fetch(scriptURL, { method: 'POST', body: new FormData(form) });
      setContactStatusType('success');
      setContactStatus('Message sent successfully!');
      form.reset();
    } catch (error) {
      setContactStatusType('error');
      setContactStatus('Message failed to send. Please try again.');
      console.error(error);
    }

    window.setTimeout(() => setContactStatus(''), 5000);
  }

  async function handleNewsletterSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;

    try {
      await fetch(scriptURL, { method: 'POST', body: new FormData(form) });
      setNewsletterStatusType('success');
      setNewsletterStatus('Thanks for subscribing!');
      form.reset();
    } catch (error) {
      setNewsletterStatusType('error');
      setNewsletterStatus('Subscription failed. Please try again.');
      console.error(error);
    }

    window.setTimeout(() => setNewsletterStatus(''), 5000);
  }

  return (
    <div className="min-h-screen text-slate-100">
      <canvas ref={particlesRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 opacity-70" />
      <div ref={cursorRef} aria-hidden="true" className="custom-cursor" />
      <div ref={cursorFollowerRef} aria-hidden="true" className="custom-cursor-follower" />

      {isLoading ? (
        <div className="preloader fixed inset-0 z-[90] flex items-center justify-center bg-slate-950">
          <div className="preloader-core" />
          <p className="preloader-text">BORIFAN</p>
        </div>
      ) : null}

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-2 text-xl font-extrabold tracking-[0.3em] text-white">
            <span className="rounded-full border border-emerald-400/40 px-2 py-1 text-emerald-300">&lt;</span>
            <span>B</span>
            <span className="rounded-full border border-emerald-400/40 px-2 py-1 text-emerald-300">/&gt;</span>
          </a>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-emerald-300">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl text-white"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <i className={theme === 'light' ? 'bx bx-sun' : 'bx bx-moon'} />
            </button>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl text-white md:hidden"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
            >
              <i className={menuOpen ? 'bx bx-x' : 'bx bx-menu'} />
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="border-t border-white/10 bg-slate-950 md:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6 lg:px-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-emerald-300"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        ) : null}
      </header>

      <main>
        <section id="home" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.24),_transparent_30%),radial-gradient(circle_at_left,_rgba(14,165,233,0.16),_transparent_28%)]" />
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300">
                Available for hire
              </p>
              <p className="text-lg font-semibold text-slate-200">Hello, I'm</p>
              <h1 className="max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">Borifan Dabasa</h1>
              <p className="mt-4 text-2xl font-semibold text-slate-200 sm:text-3xl">
                A <span className="text-emerald-300">{heroRoles[roleIndex]}</span>
              </p>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                I'm a Full Stack Developer crafting scalable web solutions with modern technologies. Specialized in MERN Stack development with a keen eye for UI/UX design.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#contact" className="rounded-full bg-emerald-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300">
                  Hire Me
                </a>
                <a href={`${BASE_URL}assets/CV.pdf`} download className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                  Download CV
                </a>
              </div>

              <div className="mt-8 flex gap-4 text-2xl text-slate-300">
                <a href="https://github.com/Borifan02" target="_blank" rel="noreferrer" aria-label="GitHub" className="transition hover:text-emerald-300">
                  <i className="bx bxl-github" />
                </a>
                <a href="mailto:dabasaborifan@gmail.com" aria-label="Email" className="transition hover:text-emerald-300">
                  <i className="bx bxs-envelope" />
                </a>
                <a href="https://www.instagram.com/borifandabasa" target="_blank" rel="noreferrer" aria-label="Instagram" className="transition hover:text-emerald-300">
                  <i className="bx bxl-instagram" />
                </a>
                <a href="http://www.linkedin.com/in/borifan-dabasa-a5191036b" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition hover:text-emerald-300">
                  <i className="bx bxl-linkedin-square" />
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute inset-0 -z-10 rounded-[2rem] bg-emerald-400/10 blur-3xl" />
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-glow backdrop-blur">
                <img src={`${BASE_URL}image/computer_engineer-campare-page.png`} alt="Borifan Dabasa - Full Stack Developer" className="h-[520px] w-full rounded-[1.5rem] object-cover object-top" />
              </div>
            </div>
          </div>
        </section>

        <SectionTitle eyebrow="About" title="About Me" />
        <section id="about" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-glow">
              <img src="https://wallpaperaccess.com/full/1385382.jpg" alt="About Borifan Dabasa" className="h-full min-h-[360px] w-full rounded-[1.5rem] object-cover" />
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-glow">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Full Stack Developer & Software Engineering Student</h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                I’m a Software Engineering student at Haramaya University with a passion for building scalable, high-performance web applications.
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                My toolkit includes MERN, Next.js, TypeScript, Tailwind CSS, PHP, and MySQL, and I care about production-ready UI and maintainable code.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  ['10+', 'Projects Completed'],
                  ['2+', 'Years Coding'],
                  ['100%', 'Client Satisfaction'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
                    <div className="text-3xl font-black text-emerald-300">{value}</div>
                    <div className="mt-2 text-sm text-slate-300">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SectionTitle eyebrow="Skills" title="Technical Skills" />
        <section id="skills" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {skillGroups.map((group) => (
              <div key={group.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-glow">
                <h3 className="flex items-center gap-3 text-xl font-bold text-white">
                  <i className={`bx ${group.icon} text-2xl text-emerald-300`} />
                  {group.title}
                </h3>
                <div className="mt-6 space-y-4">
                  {group.items.map(([name, value]) => (
                    <div key={name}>
                      <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                        <span>{name}</span>
                        <span>{value}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10">
                        <div className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300" style={{ width: `${value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <SectionTitle eyebrow="Journey" title="Professional Journey" />
        <section id="experience" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="space-y-6 border-l border-emerald-400/30 pl-6">
            {experience.map((item) => (
              <article key={item.title} className="reveal-item relative rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-glow before:absolute before:-left-9 before:top-8 before:h-4 before:w-4 before:rounded-full before:border-4 before:border-slate-950 before:bg-emerald-300">
                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                <div className="mt-2 text-sm font-medium text-emerald-300">{item.place}</div>
                <div className="mt-2 text-sm text-slate-400">{item.date}</div>
                <p className="mt-4 leading-7 text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <SectionTitle eyebrow="Services" title="What I Offer" />
        <section id="services" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {services.map((service) => (
              <article key={service.title} className="reveal-item rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/7 to-white/3 p-8 shadow-glow">
                <i className={`bx ${service.icon} text-4xl text-emerald-300`} />
                <h3 className="mt-5 text-3xl font-bold text-white">{service.title}</h3>
                <p className="mt-4 leading-8 text-slate-300">{service.text}</p>
                <ul className="mt-6 grid gap-3 text-sm text-slate-200 sm:grid-cols-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <i className="bx bx-check text-emerald-300" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <SectionTitle eyebrow="Projects" title="Featured Projects" />
        <section id="portfolio" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {['all', 'react', 'fullstack', 'frontend'].map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setProjectFilter(filter)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  projectFilter === filter ? 'bg-emerald-400 text-slate-950' : 'border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'
                }`}
              >
                {filter === 'all' ? 'All' : filter[0].toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleProjects.map((project) => (
              <article key={project.id} className="reveal-item group overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/80 shadow-glow transition hover:-translate-y-1">
                <div className="relative overflow-hidden">
                  <img src={project.image} alt={project.name} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white">{project.name}</h3>
                  <p className="mt-3 leading-7 text-slate-300">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-emerald-300">
                    {project.meta.map((metric) => (
                      <span key={metric} className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1">
                        {metric}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-400 hover:text-slate-950"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8">
            <a href="https://github.com/Borifan02?tab=repositories" target="_blank" rel="noreferrer" className="inline-flex rounded-full bg-emerald-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300">
              View All Projects <i className="bx bxl-github ml-2 text-lg" />
            </a>
          </div>
        </section>

        <SectionTitle eyebrow="Blog" title="Technical Blog" />
        <section id="blog" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <p className="max-w-3xl text-lg leading-8 text-slate-300">Sharing knowledge and insights about web development, best practices, and technology trends.</p>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {blogs.map((post) => (
              <article key={post.title} className="reveal-item rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-glow">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/10 text-2xl text-emerald-300">
                  <i className={`bx ${post.icon}`} />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-white">{post.title}</h3>
                <p className="mt-4 leading-7 text-slate-300">{post.text}</p>
                <a href={post.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition hover:text-emerald-200">
                  Read More <i className="bx bx-right-arrow-alt text-lg" />
                </a>
              </article>
            ))}
          </div>
        </section>

        <SectionTitle eyebrow="Certificates" title="Certifications & Achievements" />
        <section id="certifications" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {certifications.map((cert) => (
              <button
                key={cert.title}
                type="button"
                onClick={() => setSelectedCertificate(cert)}
                className="reveal-item group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 text-left shadow-glow transition hover:-translate-y-1"
              >
                <img src={cert.image} alt={cert.title} className="h-56 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">{cert.title}</h3>
                  <p className="mt-2 text-slate-300">{cert.issuer}</p>
                  <p className="mt-2 text-sm text-emerald-300">{cert.date}</p>
                  <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition group-hover:text-emerald-200">
                    View certificate <i className="bx bx-zoom-in text-lg" />
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <SectionTitle eyebrow="Strengths" title="Professional Strengths" />
        <section id="soft-skills" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {strengths.map(([title, text, icon]) => (
              <article key={title} className="reveal-item rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-glow">
                <i className={`bx ${icon} text-4xl text-emerald-300`} />
                <h3 className="mt-5 text-2xl font-bold text-white">{title}</h3>
                <p className="mt-4 leading-7 text-slate-300">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="newsletter" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-8 shadow-glow">
            <h2 className="text-3xl font-black text-white sm:text-4xl">Stay Updated</h2>
            <p className="mt-4 max-w-3xl text-slate-200">Subscribe to get notified about new projects, blog posts, and opportunities.</p>
            <form className="mt-6 flex flex-col gap-4 sm:flex-row" name="newsletter-subscription" id="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input type="email" name="Email" placeholder="Enter your email" required className="min-w-0 flex-1 rounded-full border border-white/10 bg-slate-950/60 px-5 py-3 text-white outline-none placeholder:text-slate-500" />
              <button type="submit" className="rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200">
                Subscribe <i className="bx bx-send ml-2" />
              </button>
            </form>
            {newsletterStatus ? (
              <p id="newsletter-msg" className={`mt-3 text-sm ${newsletterStatusType === 'error' ? 'text-rose-300' : 'text-emerald-200'}`}>
                {newsletterStatus}
              </p>
            ) : (
              <p id="newsletter-msg" className="mt-3 text-sm" />
            )}
          </div>
        </section>

        <SectionTitle eyebrow="Contact" title="Get In Touch" />
        <section id="contact" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-4">
              {[
                ['Email', 'dabasaborifan@gmail.com', 'bxs-envelope'],
                ['Phone', '+251965844287', 'bxs-phone'],
                ['Location', 'Addis Ababa, Ethiopia (Remote)', 'bxs-map'],
                ['Availability', 'Open to opportunities', 'bx-time'],
              ].map(([label, value, icon]) => (
                <div key={label} className="flex items-center gap-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-5 shadow-glow">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-2xl text-emerald-300">
                    <i className={`bx ${icon}`} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">{label}</div>
                    <div className="text-lg font-semibold text-white">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <form name="submit-to-google-sheet" className="rounded-[1.75rem] border border-white/10 bg-white/5 p-8 shadow-glow" onSubmit={handleContactSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="Name" type="text" placeholder="Your Name" className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-500" required />
                <input name="Email" type="email" placeholder="Your Email" className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-500" required />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <input name="Subject" type="text" placeholder="Subject" className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-500" required />
                <input name="Mobile" type="tel" placeholder="Phone Number (Optional)" className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-500" />
              </div>
              <textarea name="Message" rows="6" placeholder="Your Message" className="mt-4 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-500" required />
              <button type="submit" className="mt-4 inline-flex rounded-full bg-emerald-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300">
                Send Message <i className="bx bx-send ml-2" />
              </button>
              {contactStatus ? (
                <p id="msg" className={`mt-4 text-sm ${contactStatusType === 'error' ? 'text-rose-300' : 'text-emerald-300'}`}>
                  {contactStatus}
                </p>
              ) : (
                <p id="msg" className="mt-4 text-sm" />
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p className="text-sm text-slate-400">&copy; 2025 Borifan Dabasa. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-4 text-sm text-slate-300">
            {navItems.slice(0, 5).map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-emerald-300">
                {item.label}
              </a>
            ))}
          </div>
          <a href="#home" aria-label="Back to top" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-white transition hover:bg-emerald-400 hover:text-slate-950">
            <i className="bx bx-up-arrow-alt" />
          </a>
        </div>
      </footer>

      {selectedCertificate ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-md"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-glow"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close certificate preview"
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-950/70 text-2xl text-white transition hover:bg-emerald-400 hover:text-slate-950"
              onClick={() => setSelectedCertificate(null)}
            >
              <i className="bx bx-x" />
            </button>

            <img src={selectedCertificate.image} alt={selectedCertificate.title} className="max-h-[70vh] w-full object-contain bg-black/20" />
            <div className="space-y-2 p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-white">{selectedCertificate.title}</h3>
              <p className="text-slate-300">{selectedCertificate.issuer}</p>
              <p className="text-sm text-emerald-300">{selectedCertificate.date}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SectionTitle({ eyebrow, title }) {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">{title}</h2>
      </div>
    </div>
  );
}

export default App;