import React, { useState, useMemo } from 'react';

const RADAR_ITEMS = [
  // Languages
  {
    id: 'java',
    name: 'Java 17',
    quadrant: 'Languages',
    ring: 'ADOPT',
    exp: '2+ yrs',
    project: 'INSA Ministry of Revenue Tax Audit System',
    description:
      'Primary backend enterprise language utilized for building strictly typed, high-concurrency microservices, robust exception hierarchies, and transactional business logic.',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    quadrant: 'Languages',
    ring: 'ADOPT',
    exp: '1.5+ yrs',
    project: 'Engineering Tech Blog & SaaS Dashboards',
    description:
      'End-to-end type safety eliminating runtime bugs. Shared API contract interfaces across client and server tiers.',
  },
  {
    id: 'javascript',
    name: 'JavaScript (ES6+)',
    quadrant: 'Languages',
    ring: 'ADOPT',
    exp: '2+ yrs',
    project: 'MERN Stack Applications & Node APIs',
    description:
      'Asynchronous event loop mastery, functional programming patterns, Promises, async/await, and modern ECMAScript idioms.',
  },
  {
    id: 'sql',
    name: 'SQL (PostgreSQL)',
    quadrant: 'Languages',
    ring: 'ADOPT',
    exp: '2+ yrs',
    project: 'Enterprise ITAS Tax Schema',
    description:
      'Normalized schema modeling, composite B-tree indexing, recursive CTEs, and transactional isolation guarantees.',
  },

  // Frameworks & Runtimes
  {
    id: 'springboot',
    name: 'Spring Boot 3',
    quadrant: 'Frameworks',
    ring: 'ADOPT',
    exp: '1+ yr',
    project: 'INSA Tax Audit Backend Microservices',
    description:
      'Enterprise web MVC controllers, Spring Data JPA repositories, Spring Security RBAC filters, and Actuator health monitors.',
  },
  {
    id: 'react',
    name: 'React 18',
    quadrant: 'Frameworks',
    ring: 'ADOPT',
    exp: '2+ yrs',
    project: 'Ministry of Revenue Back-Office & Client SPAs',
    description:
      'Concurrent mode rendering, custom reusable hooks, performance memoization, and strict modular component hierarchy.',
  },
  {
    id: 'nextjs',
    name: 'Next.js 14',
    quadrant: 'Frameworks',
    ring: 'TRIAL',
    exp: '1.5+ yrs',
    project: 'Modern Engineering Tech Blog (Vercel)',
    description:
      'App Router architecture, Incremental Static Regeneration (ISR), Server-Side Rendering (SSR), and automated image optimization.',
  },
  {
    id: 'nodejs',
    name: 'Node.js & Express',
    quadrant: 'Frameworks',
    ring: 'ADOPT',
    exp: '2+ yrs',
    project: 'TeamSync SaaS & E-Commerce APIs',
    description:
      'Non-blocking RESTful routing, centralized middleware validation, JWT signing, and error handling layers.',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    quadrant: 'Frameworks',
    ring: 'ADOPT',
    exp: '2+ yrs',
    project: 'All Modern Frontend Applications',
    description:
      'Utility-first maintainable CSS architecture, responsive design tokens, and dark cyber glassmorphism systems.',
  },

  // Data & Storage
  {
    id: 'postgres',
    name: 'PostgreSQL',
    quadrant: 'Storage',
    ring: 'ADOPT',
    exp: '2+ yrs',
    project: 'Tax Audit Enterprise Database',
    description:
      'ACID transactional guarantees, foreign key constraints, connection pool management via HikariCP, and index tuning.',
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    quadrant: 'Storage',
    ring: 'ADOPT',
    exp: '2+ yrs',
    project: 'TeamSync Project Collaboration SaaS',
    description:
      'Flexible document schema design, Mongoose ODM modeling, aggregation pipelines, and session transactions.',
  },
  {
    id: 'redis',
    name: 'Redis Cache',
    quadrant: 'Storage',
    ring: 'TRIAL',
    exp: '1+ yr',
    project: 'High-Throughput API Caching Layer',
    description:
      'In-memory key-value caching, TTL invalidation, session token blacklisting, and rate limiting counters.',
  },

  // DevOps & Architecture
  {
    id: 'docker',
    name: 'Docker Containers',
    quadrant: 'DevOps',
    ring: 'ADOPT',
    exp: '1+ yr',
    project: 'Microservice Environment Isolation',
    description:
      'Multi-stage Dockerfiles optimizing image sizes to < 140MB, reproducible dev environments, and container networking.',
  },
  {
    id: 'git',
    name: 'Git & GitHub Workflows',
    quadrant: 'DevOps',
    ring: 'ADOPT',
    exp: '2+ yrs',
    project: 'Version Control on All Projects',
    description:
      'Semantic commits, feature-branch workflows, pull request reviews, and GitHub Actions automated testing pipelines.',
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    quadrant: 'DevOps',
    ring: 'ASSESS',
    exp: 'Benchmarking',
    project: 'Future Client Query Aggregator',
    description:
      'Benchmarking single-roundtrip query composition over REST over-fetching for mobile network optimization.',
  },
  {
    id: 'kafka',
    name: 'Apache Kafka / RabbitMQ',
    quadrant: 'DevOps',
    ring: 'ASSESS',
    exp: 'Benchmarking',
    project: 'Event-Driven Audit Notification Fanout',
    description:
      'Studying distributed event streaming for decoupling tax audit recalculation events from synchronous user HTTP requests.',
  },
];

const RINGS = [
  { id: 'ADOPT', label: 'Adopt (Core Production)', badgeColor: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' },
  { id: 'TRIAL', label: 'Trial (Active SaaS / Web)', badgeColor: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400' },
  { id: 'ASSESS', label: 'Assess (Benchmarking)', badgeColor: 'border-amber-500/40 bg-amber-500/10 text-amber-400' },
];

const QUADRANTS = ['All', 'Languages', 'Frameworks', 'Storage', 'DevOps'];

export default function TechRadarSection({ triggerToast = () => {}, playClickSound = () => {} }) {
  const [selectedRing, setSelectedRing] = useState('All');
  const [selectedQuadrant, setSelectedQuadrant] = useState('All');
  const [selectedItem, setSelectedItem] = useState(RADAR_ITEMS[0]);

  const filteredItems = useMemo(() => {
    return RADAR_ITEMS.filter((item) => {
      const matchRing = selectedRing === 'All' || item.ring === selectedRing;
      const matchQuad = selectedQuadrant === 'All' || item.quadrant === selectedQuadrant;
      return matchRing && matchQuad;
    });
  }, [selectedRing, selectedQuadrant]);

  return (
    <section id="tech-radar" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-8">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-accent animate-ping" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
            Technology Radar
          </span>
        </div>
        <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
          Production Tech Radar & Mastery Matrix
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
          How Borifan adopts, evaluates, and deploys technology into production environments. Organized by
          engineering maturity rings and technical quadrants.
        </p>
      </div>

      {/* Ring & Quadrant Filter Bar */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Ring Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setSelectedRing('All');
            }}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              selectedRing === 'All'
                ? 'bg-accent text-slate-950 font-bold shadow-glow'
                : 'border border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
            }`}
          >
            All Rings ({RADAR_ITEMS.length})
          </button>
          {RINGS.map((ring) => (
            <button
              key={ring.id}
              type="button"
              onClick={() => {
                playClickSound();
                setSelectedRing(ring.id);
              }}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                selectedRing === ring.id
                  ? 'border-accent bg-accent text-slate-950 font-bold shadow-glow'
                  : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
              }`}
            >
              {ring.id}
            </button>
          ))}
        </div>

        {/* Quadrant Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {QUADRANTS.map((quad) => (
            <button
              key={quad}
              type="button"
              onClick={() => {
                playClickSound();
                setSelectedQuadrant(quad);
              }}
              className={`rounded-xl px-3 py-1 text-xs font-mono transition ${
                selectedQuadrant === quad
                  ? 'bg-white/15 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {quad}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left = Interactive Radar Items Grid, Right = Detail Inspector Card */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Left: Matrix Grid */}
        <div className="grid gap-3 sm:grid-cols-2">
          {filteredItems.map((item) => {
            const isSelected = selectedItem.id === item.id;
            const ringInfo = RINGS.find((r) => r.id === item.ring);

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  playClickSound();
                  setSelectedItem(item);
                }}
                className={`flex flex-col justify-between rounded-2xl border p-4 text-left transition duration-200 ${
                  isSelected
                    ? 'border-accent bg-accent/15 shadow-glow scale-[1.01]'
                    : 'border-white/10 bg-slate-900/60 hover:border-white/20 hover:bg-slate-900/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase text-slate-400">
                      {item.quadrant}
                    </span>
                    <span className={`rounded-full border px-2 py-0.5 text-[9px] font-mono font-bold ${ringInfo?.badgeColor}`}>
                      {item.ring}
                    </span>
                  </div>

                  <h3 className="mt-2 text-sm font-bold text-white">{item.name}</h3>
                  <p className="mt-1 text-xs text-slate-300 line-clamp-2">{item.description}</p>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2 text-[11px] font-mono text-slate-400">
                  <span>{item.exp}</span>
                  <span className="text-accent truncate max-w-[140px]">{item.project.split(' ')[0]}...</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Selected Technology Detail Card */}
        <div>
          <div className="sticky top-24 rounded-[2rem] border border-accent/30 bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 sm:p-8 shadow-glow backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="rounded bg-accent/20 px-2.5 py-0.5 text-xs font-mono font-bold text-accent">
                {selectedItem.quadrant}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Ring: <strong className="text-white">{selectedItem.ring}</strong>
              </span>
            </div>

            <div className="mt-5 space-y-4">
              <h3 className="text-2xl font-black text-white">{selectedItem.name}</h3>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <span className="text-[11px] font-mono uppercase text-accent font-bold">
                  Production Application Reference
                </span>
                <p className="mt-1 text-xs sm:text-sm font-semibold text-white">
                  {selectedItem.project}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400">
                  Architectural Evaluation & Rationale
                </span>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-300">
                  {selectedItem.description}
                </p>
              </div>

              <div className="space-y-2 border-t border-white/10 pt-4 text-xs font-mono text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Production Experience:</span>
                  <span className="font-bold text-white">{selectedItem.exp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Adoption Strategy:</span>
                  <span className="font-bold text-accent">
                    {selectedItem.ring === 'ADOPT'
                      ? 'Daily Production Default'
                      : selectedItem.ring === 'TRIAL'
                      ? 'Production SaaS Proven'
                      : 'Active Benchmarking'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

