import React, { useState } from 'react';

const INTERVIEW_TOPICS = [
  {
    id: 'tax-audit-arch',
    category: 'Architecture & Databases',
    question: 'Why choose Spring Boot and PostgreSQL over MongoDB for the INSA Tax Audit System?',
    answer:
      'A Tax Audit System is fundamentally transactional and strictly bound by regulatory compliance. PostgreSQL was selected because of its rock-solid ACID guarantees, composite foreign key constraints, and deterministic transaction isolation levels (Read Committed / Serializable). In contrast to document stores where eventual consistency can cause subtle state discrepancies across multi-stage audits, PostgreSQL guarantees that tax liability calculations, penalty assessments, and auditor review approvals remain 100% consistent. Spring Boot provides enterprise-grade JPA transaction management (@Transactional), declarative security via Spring Security RBAC, and compile-time type safety.',
    keyTakeaway: 'Regulatory compliance requires ACID consistency over eventual consistency.',
    codeSnippet: `// Declarative transactional boundary ensuring all audit operations succeed or rollback
@Transactional(isolation = Isolation.READ_COMMITTED, rollbackFor = Exception.class)
public AuditReport finalizeTaxAudit(UUID auditId, AuditorDecision decision) {
    AuditRecord audit = auditRepository.findByIdForUpdate(auditId)
        .orElseThrow(() => new EntityNotFoundException("Audit record not found"));
    audit.applyResolution(decision);
    auditTrailLogger.logChange(audit, SecurityContext.getCurrentUser());
    return auditReportGenerator.generate(audit);
}`,
  },
  {
    id: 'db-connection-pool',
    category: 'Backend & Performance',
    question: 'How do you prevent database connection bottlenecks and deadlocks under heavy traffic?',
    answer:
      'Database connection starvation is usually caused by improperly sized connection pools or long-running transactions holding connections open. In my Spring Boot and Node.js architectures, I tune connection poolers (HikariCP / pg-pool) using the formula: Pool Size = (Core Count * 2) + Effective Spindle Count, with aggressive connection timeout thresholds (e.g., 250ms max checkout). Furthermore, transactions are kept strictly minimal by offloading heavy reporting, PDF compilation, and network calls outside of @Transactional boundaries. For deadlocks, we enforce a strict global ordering of table locking and create composite B-Tree indexes on queried foreign keys.',
    keyTakeaway: 'Never perform external HTTP calls or heavy computations inside a database transaction.',
    codeSnippet: `// HikariCP Production Tuned Configuration
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=20000
spring.datasource.hikari.idle-timeout=300000
spring.datasource.hikari.max-lifetime=1200000
spring.datasource.hikari.leak-detection-threshold=15000`,
  },
  {
    id: 'jwt-refresh-rotation',
    category: 'Security & Auth',
    question: 'What is your security strategy for JWT authentication and refresh token rotation?',
    answer:
      'Stateless JWTs should never be long-lived because they cannot be immediately invalidated without an expensive blacklist. My blueprint implements dual-token authentication: Short-lived Access Tokens (10-15 minutes) carrying the subject and role claims, and Single-Use Refresh Tokens (7 days) stored with hashed signatures in the database. When the client refreshes an access token, the used refresh token is immediately invalidated and a new one is issued (Refresh Token Rotation). If a previously used refresh token is presented, our system detects token reuse, triggers a security flag, and revokes the entire token family.',
    keyTakeaway: 'Refresh token rotation with reuse detection neutralizes token compromise risks.',
    codeSnippet: `// Node.js / Express Refresh Token Rotation Guard
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;
  const tokenRecord = await TokenStore.findOne({ tokenHash: hashToken(refreshToken) });
  
  if (!tokenRecord || tokenRecord.isRevoked) {
    // Suspected token reuse! Invalidate all sessions for this user
    await TokenStore.updateMany({ userId: decoded.id }, { isRevoked: true });
    return res.status(403).json({ error: "Security breach detected: Session invalidated" });
  }
  
  tokenRecord.isRevoked = true;
  await tokenRecord.save();
  const newTokens = generateTokenPair(tokenRecord.userId);
  res.json(newTokens);
};`,
  },
  {
    id: 'react-rendering',
    category: 'Frontend Architecture',
    question: 'How do you optimize React performance and eliminate unnecessary re-renders in complex dashboards?',
    answer:
      'In high-density data dashboards, premature global state management is the leading cause of laggy rendering. My optimization workflow: 1) State Colocation: Keep state as local as possible so updates only trigger render cycles on the subtrees that actually consume the state. 2) Component Composition: Passing JSX as children prevents child components from re-rendering when the parent wrapper re-renders. 3) Selective Memoization: Use React.memo, useMemo, and useCallback on high-frequency components that receive complex objects or array filters. 4) List Virtualization: For tables rendering 500+ records, windowing libraries like react-window render only the 15-20 visible rows.',
    keyTakeaway: 'State colocation and component composition solve 80% of unnecessary re-renders without memo overhead.',
    codeSnippet: `// Passing children as prop prevents ExpensiveChild from re-rendering on parent counter state changes
function ParentContainer({ children }) {
  const [ticker, setTicker] = useState(0);
  return (
    <div className="dashboard-wrapper">
      <LiveTicker count={ticker} />
      {/* children is NOT re-rendered when ticker changes! */}
      {children}
    </div>
  );
}`,
  },
  {
    id: 'scaling-architecture',
    category: 'System Design',
    question: 'How do you approach scaling a full-stack system from prototype to 100,000+ daily active users?',
    answer:
      'Scaling is an incremental discipline. Phase 1: Deploy a cleanly decoupled Modular Monolith with connection pooling and caching. Phase 2: Edge CDN caching for static assets (Vercel / Cloudflare) to absorb 90% of read traffic. Phase 3: Redis In-Memory Caching for heavy database query results with deterministic TTLs. Phase 4: Database read-replicas separating read queries from write-master transactions. Phase 5: Asynchronous event messaging (RabbitMQ / Kafka) to decouple synchronous request threads from background email delivery, PDF exports, and audit logging.',
    keyTakeaway: 'Optimize queries and caching before prematurely breaking applications into microservices.',
    codeSnippet: `Client Request
  -> Edge CDN (Static Assets & Edge Cache)
    -> API Gateway / Load Balancer
      -> Stateless Application Servers (Spring Boot / Node.js)
        -> Redis Cache (Hot Data Hits ~ 95%)
          -> Primary PostgreSQL DB (Writes) + Read Replicas (Heavy Queries)
            -> Background Worker Queue (Async Tasks)`,
  },
];

export default function InterviewQASection({ triggerToast = () => {}, playClickSound = () => {} }) {
  const [activeId, setActiveId] = useState(INTERVIEW_TOPICS[0].id);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copied, setCopied] = useState(false);

  const categories = ['All', 'Architecture & Databases', 'Backend & Performance', 'Security & Auth', 'Frontend Architecture', 'System Design'];

  const filteredTopics = selectedCategory === 'All'
    ? INTERVIEW_TOPICS
    : INTERVIEW_TOPICS.filter((t) => t.category === selectedCategory);

  const activeTopic = INTERVIEW_TOPICS.find((t) => t.id === activeId) || INTERVIEW_TOPICS[0];

  const handleCopySnippet = () => {
    playClickSound();
    navigator.clipboard.writeText(activeTopic.codeSnippet);
    setCopied(true);
    triggerToast('Code pattern snippet copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="qa" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-8">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-accent animate-ping" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
            Engineering Depth
          </span>
        </div>
        <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
          Technical Interview & Architecture Q&A
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
          How Borifan solves the hardest engineering trade-offs. Deep-dive explanations, production failure prevention,
          and architectural decision records.
        </p>
      </div>

      {/* Category Pills */}
      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              playClickSound();
              setSelectedCategory(cat);
            }}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              selectedCategory === cat
                ? 'bg-accent text-slate-950 font-bold shadow-glow'
                : 'border border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Container: Left = Question Accordion / Selector, Right = In-Depth Answer Panel */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        {/* Left: Questions List */}
        <div className="space-y-3">
          {filteredTopics.map((topic, index) => {
            const isActive = topic.id === activeId;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => {
                  playClickSound();
                  setActiveId(topic.id);
                }}
                className={`flex w-full flex-col justify-between rounded-2xl border p-5 text-left transition duration-200 ${
                  isActive
                    ? 'border-accent bg-accent/15 shadow-glow'
                    : 'border-white/10 bg-slate-900/60 hover:border-white/20 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-mono text-accent">
                    {topic.category}
                  </span>
                  <span className="font-mono text-xs text-slate-400">0{index + 1}</span>
                </div>

                <h3 className="mt-3 text-sm font-bold text-white leading-snug">
                  {topic.question}
                </h3>

                <p className="mt-2 text-xs text-slate-400 line-clamp-2">
                  {topic.keyTakeaway}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right: In-Depth Explanation & Code Pattern */}
        <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-slate-900/90 shadow-2xl backdrop-blur-2xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
              <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-mono font-bold text-accent">
                {activeTopic.category}
              </span>
              <span className="text-xs text-slate-400 font-mono">• Direct Architectural Answer</span>
            </div>

            <h3 className="mt-5 text-xl font-extrabold text-white sm:text-2xl leading-snug">
              {activeTopic.question}
            </h3>

            {/* Answer prose */}
            <div className="mt-4 text-sm leading-relaxed text-slate-300 space-y-3">
              <p>{activeTopic.answer}</p>
            </div>

            {/* Key takeaway callout */}
            <div className="mt-5 rounded-2xl border border-accent/30 bg-accent/10 p-4">
              <div className="text-[11px] font-mono font-bold uppercase text-accent">
                Architectural Principle:
              </div>
              <p className="mt-1 text-xs font-semibold text-white">
                "{activeTopic.keyTakeaway}"
              </p>
            </div>
          </div>

          {/* Code Pattern Implementation */}
          <div className="mt-6 border-t border-white/10 pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-semibold uppercase text-slate-400">
                Pattern Code Snippet
              </span>
              <button
                type="button"
                onClick={handleCopySnippet}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300 hover:text-white hover:bg-white/10 transition"
              >
                <i className={`bx ${copied ? 'bx-check text-accent' : 'bx-copy'}`} />
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950 p-4 font-mono text-xs leading-relaxed text-emerald-300 max-h-56">
              <code>{activeTopic.codeSnippet}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

