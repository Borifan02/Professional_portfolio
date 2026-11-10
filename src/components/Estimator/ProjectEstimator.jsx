import React, { useState, useMemo } from 'react';

const PROJECT_TYPES = [
  { id: 'fullstack', label: 'Full Stack Web App', icon: 'bx-layer', baseWeeks: 4, desc: 'End-to-end client SPA + scalable backend' },
  { id: 'backend', label: 'RESTful API / Backend', icon: 'bx-server', baseWeeks: 3, desc: 'Spring Boot or Node.js microservices' },
  { id: 'enterprise', label: 'Enterprise RBAC Dashboard', icon: 'bx-shield-quarter', baseWeeks: 5, desc: 'Tax, Clinical, or Audit systems with roles' },
  { id: 'mvp', label: 'MVP / Fast Prototype', icon: 'bx-rocket', baseWeeks: 2, desc: 'Rapid market validation with core features' },
];

const STACK_PREFERENCES = [
  { id: 'spring-postgres', label: 'Spring Boot + PostgreSQL', tag: 'Enterprise Grade' },
  { id: 'mern', label: 'React + Node.js + MongoDB', tag: 'High Velocity' },
  { id: 'next-ts', label: 'Next.js + TypeScript + Tailwind', tag: 'Modern Fullstack' },
  { id: 'hybrid', label: 'React + Spring Boot + Postgres', tag: 'Best of Both' },
];

const FEATURE_MODULES = [
  { id: 'auth', label: 'JWT Auth & Role-Based Access (RBAC)', addedWeeks: 0.5 },
  { id: 'payment', label: 'Payment Gateway (Chapa, Stripe, PayPal)', addedWeeks: 0.5 },
  { id: 'realtime', label: 'Real-time WebSockets / Notifications', addedWeeks: 0.5 },
  { id: 'reports', label: 'PDF / Audit Report Export Engine', addedWeeks: 0.5 },
  { id: 'docker', label: 'Docker Containerization & CI/CD Pipeline', addedWeeks: 0.5 },
];

export default function ProjectEstimator({ onTransferToContact, triggerToast = () => {}, playClickSound = () => {} }) {
  const [selectedType, setSelectedType] = useState(PROJECT_TYPES[0].id);
  const [selectedStack, setSelectedStack] = useState(STACK_PREFERENCES[0].id);
  const [selectedFeatures, setSelectedFeatures] = useState(['auth', 'docker']);
  const [timelineUrgency, setTimelineUrgency] = useState('standard'); // 'urgent' | 'standard' | 'relaxed'

  const toggleFeature = (fid) => {
    playClickSound();
    setSelectedFeatures((prev) =>
      prev.includes(fid) ? prev.filter((id) => id !== fid) : [...prev, fid],
    );
  };

  const calculation = useMemo(() => {
    const pType = PROJECT_TYPES.find((p) => p.id === selectedType) || PROJECT_TYPES[0];
    const stack = STACK_PREFERENCES.find((s) => s.id === selectedStack) || STACK_PREFERENCES[0];

    let totalWeeks = pType.baseWeeks;
    FEATURE_MODULES.forEach((m) => {
      if (selectedFeatures.includes(m.id)) {
        totalWeeks += m.addedWeeks;
      }
    });

    if (timelineUrgency === 'urgent') totalWeeks = Math.max(1.5, totalWeeks * 0.7);
    if (timelineUrgency === 'relaxed') totalWeeks = totalWeeks * 1.2;

    const roundedWeeks = Math.ceil(totalWeeks);

    return {
      typeLabel: pType.label,
      stackLabel: stack.label,
      estimatedWeeks: `${roundedWeeks} - ${roundedWeeks + 1} Weeks`,
      sprints: Math.ceil(roundedWeeks / 2),
      recommendedArchitecture:
        selectedType === 'enterprise' || selectedStack.includes('spring')
          ? 'Layered Clean Architecture with Spring Boot REST controllers, JPA services, and PostgreSQL connection pooling.'
          : 'Modular component-driven React architecture coupled with decoupled Express.js or Next.js serverless handlers.',
    };
  }, [selectedType, selectedStack, selectedFeatures, timelineUrgency]);

  const handleApplyToContact = () => {
    playClickSound();
    const summaryText = `[Project Scope Estimation]
• Project Scope: ${calculation.typeLabel}
• Preferred Tech Stack: ${calculation.stackLabel}
• Estimated Timeline: ${calculation.estimatedWeeks}
• Selected Modules: ${selectedFeatures.join(', ')}
• Urgency: ${timelineUrgency}

Hi Borifan, I used your portfolio project calculator and would like to discuss engineering this project with you.`;

    if (onTransferToContact) {
      onTransferToContact(summaryText);
    }
    triggerToast('Project scope transferred to contact form below!');
    window.location.hash = '#contact';
  };

  return (
    <section id="estimator" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-8">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-accent animate-ping" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
            Planning & Scoping
          </span>
        </div>
        <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
          Project Scope & Architecture Estimator
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
          Planning a new software product or enterprise system? Configure your requirements below to receive
          an instant architecture recommendation and delivery timeline estimation.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Left: Interactive Configurator */}
        <div className="space-y-6">
          {/* Step 1: Project Type */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-3">
              1. Select Project Archetype
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              {PROJECT_TYPES.map((pt) => (
                <button
                  key={pt.id}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setSelectedType(pt.id);
                  }}
                  className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
                    selectedType === pt.id
                      ? 'border-accent bg-accent/15 text-white shadow-glow'
                      : 'border-white/10 bg-slate-900/60 text-slate-300 hover:border-white/20'
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent text-xl">
                    <i className={`bx ${pt.icon}`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{pt.label}</h4>
                    <p className="mt-0.5 text-xs text-slate-400">{pt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Preferred Tech Stack */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-3">
              2. Target Technology Stack
            </label>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {STACK_PREFERENCES.map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setSelectedStack(st.id);
                  }}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 text-xs font-semibold transition ${
                    selectedStack === st.id
                      ? 'border-accent bg-accent/15 text-white shadow-glow'
                      : 'border-white/10 bg-slate-900/60 text-slate-300 hover:border-white/20'
                  }`}
                >
                  <span>{st.label}</span>
                  <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-mono text-accent">
                    {st.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Modules Needed */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-3">
              3. Specialized Modules & Infrastructure
            </label>
            <div className="space-y-2">
              {FEATURE_MODULES.map((fm) => {
                const isChecked = selectedFeatures.includes(fm.id);
                return (
                  <button
                    key={fm.id}
                    type="button"
                    onClick={() => toggleFeature(fm.id)}
                    className={`flex w-full items-center justify-between rounded-xl border px-4 py-2.5 text-xs font-medium transition ${
                      isChecked
                        ? 'border-accent/60 bg-accent/10 text-white'
                        : 'border-white/10 bg-slate-900/40 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <i className={`bx ${isChecked ? 'bxs-check-square text-accent' : 'bx-square text-slate-500'} text-base`} />
                      <span>{fm.label}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">+{fm.addedWeeks} wk</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Urgency */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-2">
              4. Delivery Timeline Expectation
            </label>
            <div className="flex gap-2">
              {[
                { id: 'urgent', label: 'Accelerated Sprint (< 3 wks)' },
                { id: 'standard', label: 'Standard Delivery' },
                { id: 'relaxed', label: 'Phased Enterprise Rollout' },
              ].map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setTimelineUrgency(u.id);
                  }}
                  className={`flex-1 rounded-xl border py-2 text-center text-xs font-semibold transition ${
                    timelineUrgency === u.id
                      ? 'border-accent bg-accent text-slate-950 font-bold'
                      : 'border-white/10 bg-slate-900/60 text-slate-400 hover:text-white'
                  }`}
                >
                  {u.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Dynamic Architecture Summary Card */}
        <div>
          <div className="sticky top-24 rounded-[2rem] border border-accent/30 bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 sm:p-7 shadow-glow backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-mono font-bold uppercase text-accent">Estimation Blueprint</span>
              <span className="rounded-full bg-accent/20 px-2.5 py-0.5 text-[10px] font-mono text-accent">
                {calculation.sprints} Development Sprints
              </span>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <span className="text-[11px] font-mono text-slate-400">Estimated Turnaround</span>
                <div className="mt-1 text-2xl sm:text-3xl font-black text-white">
                  {calculation.estimatedWeeks}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3.5">
                <span className="text-[11px] font-mono text-accent font-bold uppercase">
                  Architectural Recommendation
                </span>
                <p className="mt-1 text-xs leading-relaxed text-slate-300">
                  {calculation.recommendedArchitecture}
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Architecture Archetype:</span>
                  <span className="font-bold text-white">{calculation.typeLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Core Stack:</span>
                  <span className="font-bold text-white">{calculation.stackLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Features Selected:</span>
                  <span className="font-bold text-white">{selectedFeatures.length} Modules</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleApplyToContact}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3 text-xs font-bold text-slate-950 transition hover:bg-accentSoft shadow-lg"
            >
              <span>Apply to Contact Inquiry</span>
              <i className="bx bx-right-arrow-alt text-base" />
            </button>
            <p className="mt-2 text-center text-[10px] text-slate-500 font-mono">
              Pre-fills your project specs into the contact form below.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

