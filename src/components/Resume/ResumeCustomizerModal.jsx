import React, { useState } from 'react';

const RESUME_PRESETS = [
  {
    id: 'fullstack',
    title: 'Full Stack Software Engineer',
    summary:
      'Full Stack Software Engineer & Software Engineering student at Haramaya University with experience architecting production web applications across MERN Stack and Spring Boot. Proven track record delivering enterprise tax modules at INSA and commercial SaaS applications.',
    primarySkills: ['React', 'Next.js', 'Spring Boot', 'Node.js', 'PostgreSQL', 'MongoDB', 'Tailwind CSS', 'Docker'],
    focusBadge: 'Full Stack Focus',
  },
  {
    id: 'backend',
    title: 'Backend & Systems Engineer',
    summary:
      'Backend Software Engineer specializing in scalable RESTful APIs, transactional data consistency, and enterprise security. Engineered the Ministry of Revenue Tax Audit module at INSA utilizing Spring Boot, PostgreSQL, and strict RBAC authorization.',
    primarySkills: ['Spring Boot', 'Java 17', 'PostgreSQL', 'Node.js', 'REST APIs', 'RBAC & JWT', 'Docker', 'HikariCP'],
    focusBadge: 'Backend Focus',
  },
  {
    id: 'frontend',
    title: 'Frontend & UI Architect',
    summary:
      'Frontend Software Engineer crafting high-performance, responsive web interfaces with React, Next.js, and TypeScript. Experienced in state decoupling, custom hooks, atomic design systems, and sub-second Lighthouse web performance.',
    primarySkills: ['React 18', 'Next.js 14', 'TypeScript', 'Tailwind CSS', 'State Management', 'Web Performance', 'REST Integration'],
    focusBadge: 'Frontend Focus',
  },
];

export default function ResumeCustomizerModal({
  isOpen,
  onClose,
  triggerToast = () => {},
  playClickSound = () => {},
}) {
  const [selectedPreset, setSelectedPreset] = useState(RESUME_PRESETS[0]);
  const [includeProjects, setIncludeProjects] = useState(true);
  const [includeExperience, setIncludeExperience] = useState(true);
  const [includeEducation, setIncludeEducation] = useState(true);
  const [copiedText, setCopiedText] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  const handleCopyTextResume = () => {
    playClickSound();
    const text = `BORIFAN DABASA ERKISA
Full Stack Software Engineer | Addis Ababa, Ethiopia
Email: dabasaborifan@gmail.com | Phone: +251 965 844 287
GitHub: github.com/Borifan02 | Portfolio: Live Demo
Role Target: ${selectedPreset.title}

PROFESSIONAL SUMMARY
${selectedPreset.summary}

CORE TECHNICAL SKILLS
${selectedPreset.primarySkills.join(' • ')}

WORK EXPERIENCE
• Software Development Intern (Full-Stack) | INSA (Information Network Security Administration) | Feb 2026 - Sep 2026
  - Engineered core modules for the Integrated Tax Administration System (Tax Audit Module) for the Ministry of Revenue.
  - Constructed backend RESTful endpoints in Spring Boot and responsive dashboards in React.
  - Modeled PostgreSQL schemas with strict ACID transactional guarantees and RBAC authorization.

• Full Stack Developer | Freelance / SaaS | 2024 - Present
  - Architected TeamSync, a multi-tenant project management SaaS with OAuth.
  - Delivered commercial e-commerce platforms and clinical appointment booking engines.

EDUCATION
• B.Sc. in Software Engineering | Haramaya University (2023 - 2027)`;

    navigator.clipboard.writeText(text);
    setCopiedText(true);
    triggerToast('Plain-text ATS resume copied to clipboard!');
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-[125] flex items-center justify-center bg-slate-950/85 p-2 sm:p-4 md:p-6 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative flex h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-[2rem] border border-white/15 bg-slate-900/95 shadow-2xl backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/90 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20 text-accent text-xl">
              <i className="bx bx-file-blank" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Interactive Resume Customizer</h3>
              <p className="text-xs text-slate-400">Tailor Borifan's CV for your specific engineering opening</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-xs font-bold text-slate-950 hover:bg-accentSoft transition"
            >
              <i className="bx bx-printer text-sm" />
              <span>Print / PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-white"
            >
              <i className="bx bx-x text-lg" />
            </button>
          </div>
        </div>

        {/* Toolbar: Role Presets & Section Toggles */}
        <div className="border-b border-white/10 bg-slate-950/60 p-4 px-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-mono text-slate-400 mr-1">Focus:</span>
            {RESUME_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  playClickSound();
                  setSelectedPreset(preset);
                }}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  selectedPreset.id === preset.id
                    ? 'bg-accent text-slate-950 font-bold shadow-glow'
                    : 'border border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                }`}
              >
                {preset.title.split(' ')[0]}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 font-mono">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={includeExperience}
                onChange={(e) => setIncludeExperience(e.target.checked)}
                className="rounded accent-emerald-500"
              />
              <span>Experience</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={includeProjects}
                onChange={(e) => setIncludeProjects(e.target.checked)}
                className="rounded accent-emerald-500"
              />
              <span>Projects</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={includeEducation}
                onChange={(e) => setIncludeEducation(e.target.checked)}
                className="rounded accent-emerald-500"
              />
              <span>Education</span>
            </label>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-slate-950/80">
          <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-slate-900 p-8 sm:p-10 shadow-2xl text-slate-200 print:bg-white print:text-black">
            {/* Resume Header */}
            <div className="border-b border-white/15 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white">Borifan Dabasa Erkisa</h1>
                  <p className="text-sm font-bold text-accent mt-0.5">{selectedPreset.title}</p>
                </div>
                <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-mono font-bold text-accent border border-accent/20 self-start sm:self-auto">
                  {selectedPreset.focusBadge}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400 font-mono">
                <span>📧 dabasaborifan@gmail.com</span>
                <span>📱 +251 965 844 287</span>
                <span>📍 Addis Ababa, Ethiopia (Open to Remote)</span>
                <span>🔗 github.com/Borifan02</span>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-6">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-accent mb-2">
                Professional Profile
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                {selectedPreset.summary}
              </p>
            </div>

            {/* Technical Skills */}
            <div className="mt-6">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-accent mb-2">
                Technical Proficiencies
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {selectedPreset.primarySkills.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-mono text-slate-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience */}
            {includeExperience && (
              <div className="mt-6 border-t border-white/10 pt-6">
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-accent mb-3">
                  Engineering Experience
                </h2>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-bold text-white">
                        Software Development Intern (Full-Stack) • INSA
                      </h3>
                      <span className="text-xs font-mono text-slate-400">Feb 2026 - Sep 2026</span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono">Ministry of Revenue Tax Audit Automation Project</p>
                    <ul className="mt-2 list-disc list-inside text-xs text-slate-300 space-y-1">
                      <li>Constructed backend business logic and RESTful endpoints using Spring Boot.</li>
                      <li>Engineered mission-critical back-office dashboards using React and Tailwind CSS.</li>
                      <li>Designed PostgreSQL schemas and complex queries with transactional consistency.</li>
                      <li>Implemented Role-Based Access Control (RBAC) across multi-stage review workflows.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-bold text-white">Full Stack Software Developer • Freelance / SaaS</h3>
                      <span className="text-xs font-mono text-slate-400">2024 - Present</span>
                    </div>
                    <ul className="mt-2 list-disc list-inside text-xs text-slate-300 space-y-1">
                      <li>Architected TeamSync, a multi-tenant project management SaaS with Google OAuth.</li>
                      <li>Engineered clinical appointment booking engine with live conflict detection.</li>
                      <li>Delivered full MERN stack commercial e-commerce systems with checkout workflows.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Projects */}
            {includeProjects && (
              <div className="mt-6 border-t border-white/10 pt-6">
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-accent mb-3">
                  Featured Production Projects
                </h2>
                <div className="space-y-2 text-xs">
                  <div>
                    <strong className="text-white">Tax Audit Management System:</strong> Spring Boot, PostgreSQL, React, Tailwind (INSA / Ministry of Revenue).
                  </div>
                  <div>
                    <strong className="text-white">Modern Tech Engineering Blog:</strong> Next.js 14, TypeScript, ISR, Vercel Edge.
                  </div>
                  <div>
                    <strong className="text-white">TeamSync Collaboration Platform:</strong> React, Node.js, Express, MongoDB.
                  </div>
                </div>
              </div>
            )}

            {/* Education */}
            {includeEducation && (
              <div className="mt-6 border-t border-white/10 pt-6">
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-accent mb-2">
                  Education
                </h2>
                <div className="flex justify-between items-baseline text-xs">
                  <div>
                    <strong className="text-white">B.Sc. in Software Engineering</strong> — Haramaya University
                    <p className="text-slate-400">Relevant Coursework: Data Structures & Algorithms, Database Systems, Distributed Computing</p>
                  </div>
                  <span className="font-mono text-slate-400">2023 - 2027</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between border-t border-white/10 bg-slate-900/90 px-6 py-4">
          <button
            type="button"
            onClick={handleCopyTextResume}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition"
          >
            <i className={`bx ${copiedText ? 'bx-check text-accent' : 'bx-copy'}`} />
            <span>{copiedText ? 'Copied ATS Text!' : 'Copy ATS Plain Text'}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-6 py-2 text-xs font-bold text-slate-950 hover:bg-accentSoft transition shadow-lg"
            >
              <i className="bx bx-printer text-base" />
              <span>Print Customized PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

