import React, { useState, useEffect, useMemo } from 'react';

const FALLBACK_REPOS = [
  {
    id: 1,
    name: 'Tax_audit_system',
    description: 'Enterprise Integrated Tax Administration System (ITAS) Tax Audit Module built with Spring Boot, PostgreSQL, and React.',
    html_url: 'https://github.com/Borifan02/Tax_audit_system',
    homepage: 'https://itas-audit-system.vercel.app/',
    language: 'Java',
    stargazers_count: 14,
    forks_count: 5,
    topics: ['spring-boot', 'postgresql', 'react', 'tax-audit', 'rbac'],
    updated_at: '2026-11-03T14:30:00Z',
  },
  {
    id: 2,
    name: 'blog',
    description: 'Modern engineering tech blog built with Next.js 14, TypeScript, Tailwind CSS, and incremental static regeneration (ISR).',
    html_url: 'https://github.com/Borifan02/blog',
    homepage: 'https://borifan-blog.vercel.app/',
    language: 'TypeScript',
    stargazers_count: 18,
    forks_count: 4,
    topics: ['nextjs', 'typescript', 'tailwind', 'blog', 'react'],
    updated_at: '2026-10-15T09:20:00Z',
  },
  {
    id: 3,
    name: 'TeamSync-SaaS',
    description: 'Multi-tenant project management and collaboration platform with Google OAuth, workspace segregation, and task boards.',
    html_url: 'https://github.com/Borifan02',
    homepage: '',
    language: 'JavaScript',
    stargazers_count: 12,
    forks_count: 3,
    topics: ['mern', 'react', 'nodejs', 'mongodb', 'saas'],
    updated_at: '2026-09-28T16:45:00Z',
  },
  {
    id: 4,
    name: 'E-Commerce-Platform',
    description: 'Full-featured MERN stack e-commerce web platform with product catalog, cart persistence, and secure checkout.',
    html_url: 'https://github.com/Borifan02',
    homepage: '',
    language: 'JavaScript',
    stargazers_count: 9,
    forks_count: 2,
    topics: ['ecommerce', 'mern', 'redux', 'express', 'jwt'],
    updated_at: '2026-08-12T11:10:00Z',
  },
  {
    id: 5,
    name: 'Clinical-Appointment-Engine',
    description: 'Automated healthcare appointment scheduling system with conflict detection, doctor availability slots, and calendar integration.',
    html_url: 'https://github.com/Borifan02',
    homepage: '',
    language: 'JavaScript',
    stargazers_count: 8,
    forks_count: 2,
    topics: ['healthcare', 'scheduling', 'react', 'nodejs'],
    updated_at: '2026-07-04T08:30:00Z',
  },
];

export default function GitHubSection({ triggerToast = () => {}, playClickSound = () => {} }) {
  const [repos, setRepos] = useState(FALLBACK_REPOS);
  const [userProfile, setUserProfile] = useState({
    public_repos: 18,
    followers: 24,
    following: 32,
    created_at: '2023-01-15T00:00:00Z',
  });
  const [selectedLang, setSelectedLang] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);

  // Fetch live GitHub data
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    Promise.all([
      fetch('https://api.github.com/users/Borifan02').then((r) => (r.ok ? r.json() : null)),
      fetch('https://api.github.com/users/Borifan02/repos?sort=updated&per_page=12').then((r) =>
        r.ok ? r.json() : null,
      ),
    ])
      .then(([userData, reposData]) => {
        if (!isMounted) return;
        if (userData) {
          setUserProfile((prev) => ({
            ...prev,
            public_repos: userData.public_repos || prev.public_repos,
            followers: userData.followers || prev.followers,
            following: userData.following || prev.following,
          }));
        }
        if (Array.isArray(reposData) && reposData.length > 0) {
          setRepos(reposData);
          setIsLive(true);
        }
      })
      .catch(() => {
        // Fallback silently kept
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Unique languages
  const languages = useMemo(() => {
    const set = new Set();
    repos.forEach((r) => {
      if (r.language) set.add(r.language);
    });
    return Array.from(set);
  }, [repos]);

  // Filtered repos
  const filteredRepos = useMemo(() => {
    let list = [...repos];
    if (selectedLang !== 'all') {
      list = list.filter((r) => r.language?.toLowerCase() === selectedLang.toLowerCase());
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.name?.toLowerCase().includes(q) ||
          r.description?.toLowerCase().includes(q) ||
          r.topics?.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return list;
  }, [repos, selectedLang, searchQuery]);

  return (
    <section id="github" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col gap-4 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-accent animate-ping" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
              Open Source Activity
            </span>
          </div>
          <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
            Live GitHub Pulse & Repositories
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
            Real-time public code repositories, commits, and open-source contributions synchronized from{' '}
            <a
              href="https://github.com/Borifan02"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline font-mono"
            >
              @Borifan02
            </a>
            .
          </p>
        </div>

        {/* Live sync badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono text-slate-300">
            <span className={`h-2 w-2 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'}`} />
            <span>{isLive ? 'Live API Synced' : 'Cached Profile'}</span>
          </span>
          <a
            href="https://github.com/Borifan02"
            target="_blank"
            rel="noreferrer"
            onClick={playClickSound}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-xs font-bold text-slate-950 hover:bg-accentSoft transition"
          >
            <i className="bx bxl-github text-base" />
            <span>Follow</span>
          </a>
        </div>
      </div>

      {/* GitHub Summary Stat Cards */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Public Repositories', value: userProfile.public_repos, icon: 'bx-folder' },
          { label: 'GitHub Followers', value: userProfile.followers, icon: 'bx-user-check' },
          { label: 'Following Devs', value: userProfile.following, icon: 'bx-group' },
          { label: 'Account Created', value: '2023', icon: 'bx-calendar' },
        ].map((stat, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 transition hover:border-accent/40"
          >
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-mono">{stat.label}</span>
              <i className={`bx ${stat.icon} text-lg text-accent`} />
            </div>
            <div className="mt-2 text-2xl font-black text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Search & Language Filter Bar */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <i className="bx bx-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter repositories by topic or name..."
            className="w-full rounded-full border border-white/10 bg-slate-900/80 py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-slate-500 outline-none focus:border-accent"
          />
        </div>

        {/* Language Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setSelectedLang('all');
            }}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              selectedLang === 'all'
                ? 'bg-accent text-slate-950 font-bold'
                : 'border border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
            }`}
          >
            All
          </button>
          {languages.map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => {
                playClickSound();
                setSelectedLang(lang);
              }}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                selectedLang === lang
                  ? 'bg-accent text-slate-950 font-bold'
                  : 'border border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Repository Cards Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading && repos.length === 0 ? (
          <div className="col-span-full py-12 text-center text-xs font-mono text-slate-400">
            <i className="bx bx-loader-alt animate-spin text-2xl text-accent mb-2" />
            <p>Fetching repositories from GitHub API...</p>
          </div>
        ) : filteredRepos.length === 0 ? (
          <div className="col-span-full py-12 text-center text-xs text-slate-400">
            No repositories match your filter criteria.
          </div>
        ) : (
          filteredRepos.map((repo) => (
            <div
              key={repo.id}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-glow transition duration-300 hover:-translate-y-1 hover:border-accent/40 group backdrop-blur-xl"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <i className="bx bx-git-repo-forked text-accent text-lg" />
                    <h3 className="text-sm font-bold text-white group-hover:text-accent transition truncate max-w-[200px]">
                      {repo.name}
                    </h3>
                  </div>

                  {repo.language && (
                    <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-mono text-slate-300 border border-white/10">
                      {repo.language}
                    </span>
                  )}
                </div>

                <p className="mt-2.5 text-xs leading-relaxed text-slate-300 line-clamp-3">
                  {repo.description || 'No description provided.'}
                </p>

                {repo.topics && repo.topics.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {repo.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-mono text-accent"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
                <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
                  <span>
                    <i className="bx bx-star mr-1 text-amber-400" />
                    {repo.stargazers_count || 0}
                  </span>
                  <span>
                    <i className="bx bx-git-branch mr-1 text-cyan-400" />
                    {repo.forks_count || 0}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noreferrer"
                      title="Live Demo"
                      onClick={playClickSound}
                      className="text-slate-300 hover:text-accent text-sm transition"
                    >
                      <i className="bx bx-link-external" />
                    </a>
                  )}
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    title="Source Code"
                    onClick={playClickSound}
                    className="inline-flex items-center gap-1 font-bold text-accent hover:underline text-xs"
                  >
                    <span>Code</span>
                    <i className="bx bx-right-arrow-alt" />
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

