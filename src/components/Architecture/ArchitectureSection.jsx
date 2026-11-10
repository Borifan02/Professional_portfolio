import React, { useState } from 'react';

const ARCHITECTURE_TIERS = [
  {
    id: 'client',
    number: '01',
    name: 'Client & Presentation Tier',
    icon: 'bx-devices',
    badge: 'Front-End Layer',
    tech: ['React 18', 'Next.js 14', 'Tailwind CSS', 'TypeScript'],
    tagline: 'Modern, component-driven reactive user interfaces with sub-second perceived latency.',
    details: [
      {
        title: 'Component Decoupling',
        desc: 'Organized by features rather than file types to ensure high cohesion and loose coupling across screens.',
      },
      {
        title: 'State Decoupling',
        desc: 'React Context API for cross-cutting session data; custom hooks for business logic and remote data synchronization.',
      },
      {
        title: 'Performance & Optimization',
        desc: 'Code splitting via React.lazy, memoized selectors, virtualized rendering for 1,000+ dataset rows.',
      },
    ],
    codeSnippet: `// Composed, decoupled architecture
export function AuditDashboard() {
  const { user } = useAuth();
  const { auditRecords, isLoading } = useTaxAuditQuery();
  
  return (
    <DashboardLayout user={user}>
      <AuditMetricsBar data={auditRecords} />
      <AuditDiscrepancyGrid items={auditRecords} loading={isLoading} />
    </DashboardLayout>
  );
}`,
    benchmark: 'P95 Render: < 16ms • Lighthouse: 95+',
  },
  {
    id: 'gateway',
    number: '02',
    name: 'Security & API Gateway Tier',
    icon: 'bx-shield-quarter',
    badge: 'Security Layer',
    tech: ['JWT Bearer', 'RBAC Guard', 'Spring Security', 'CORS / Helmet'],
    tagline: 'Zero-trust perimeter defending against unauthorized access, query tampering, and data leakage.',
    details: [
      {
        title: 'Stateless Cryptographic Authentication',
        desc: 'Digitally signed JSON Web Tokens (HMAC-SHA256) carrying user claims, tenant IDs, and expiration lifetimes.',
      },
      {
        title: 'Role-Based Access Control (RBAC)',
        desc: 'Granular permissions restricting sensitive endpoints between Auditors, Supervisors, and System Administrators.',
      },
      {
        title: 'Rate Limiting & Threat Shielding',
        desc: 'Token-bucket rate limiters safeguarding API throughput and preventing credential brute-forcing.',
      },
    ],
    codeSnippet: `// RBAC Security Filter Guard
@PreAuthorize("hasAnyRole('ROLE_LEAD_AUDITOR', 'ROLE_SUPERVISOR')")
@PostMapping("/tax-audit/{id}/override")
public ResponseEntity<AuditResolution> overrideAuditFlag(
    @PathVariable UUID id,
    @Valid @RequestBody AuditOverrideRequest req
) {
    return ResponseEntity.ok(auditService.applySupervisorOverride(id, req));
}`,
    benchmark: 'Auth Overhead: < 3ms • Zero Leakage',
  },
  {
    id: 'services',
    number: '03',
    name: 'Business Logic & Services Tier',
    icon: 'bx-server',
    badge: 'Application Core',
    tech: ['Spring Boot 3', 'Java 17', 'Node.js', 'Express.js'],
    tagline: 'High-throughput transactional microservices built on Clean Layered Architecture.',
    details: [
      {
        title: 'Clean Layered Architecture',
        desc: 'Strict separation of concerns: Web Controllers -> Domain Services -> Persistence Repositories.',
      },
      {
        title: 'Transactional Integrity',
        desc: 'Spring @Transactional decorators and Mongoose session locks safeguarding multi-entity state updates.',
      },
      {
        title: 'Centralized Exception Handling',
        desc: 'RFC 7807 ProblemDetails specification returning structured, predictable error payloads.',
      },
    ],
    codeSnippet: `@Service
@Transactional
public class TaxAuditEngineService {
  public AuditEvaluationResult evaluateRisk(TaxpayerRecord record) {
    BigDecimal deductionRatio = calculateRatio(record.getDeductions(), record.getRevenue());
    AnomalyProfile profile = anomalyDetector.scan(record);
    return new AuditEvaluationResult(deductionRatio, profile.getRiskTier());
  }
}`,
    benchmark: 'Throughput: 4,500 req/sec • P95: 38ms',
  },
  {
    id: 'data',
    number: '04',
    name: 'Persistence & Distributed Cache',
    icon: 'bx-data',
    badge: 'Storage Layer',
    tech: ['PostgreSQL', 'MongoDB', 'Redis', 'HikariCP'],
    tagline: 'ACID-compliant relational integrity joined with high-speed in-memory caching.',
    details: [
      {
        title: 'Normalized Schema Design',
        desc: 'PostgreSQL relational schemas with B-tree indexing on foreign keys and compound timestamp queries.',
      },
      {
        title: 'In-Memory Caching (Redis)',
        desc: 'Caching frequently accessed taxpayer benchmark metrics with TTL invalidation, reducing DB pressure by 70%.',
      },
      {
        title: 'Connection Pool Headroom',
        desc: 'Optimized HikariCP and pg-pool configurations with active health check probes and leak detection.',
      },
    ],
    codeSnippet: `-- Highly optimized compound indexing for audit tracking
CREATE INDEX idx_tax_audit_taxpayer_created 
ON tax_audit_records (taxpayer_tin, audit_status, created_at DESC);

-- Automated audit log trigger
CREATE TRIGGER trg_tax_audit_change_log
AFTER UPDATE ON tax_audit_records
FOR EACH ROW EXECUTE FUNCTION log_audit_trail();`,
    benchmark: 'DB Query Latency: < 4ms • 99.98% Pool Uptime',
  },
  {
    id: 'devops',
    number: '05',
    name: 'DevOps & Cloud Delivery',
    icon: 'bx-cloud-upload',
    badge: 'Operations Layer',
    tech: ['Docker Containers', 'GitHub Actions', 'Vercel / Railway', 'CI/CD'],
    tagline: 'Containerized reproducible deployments and automated multi-stage testing pipelines.',
    details: [
      {
        title: 'Multi-Stage Docker Builds',
        desc: 'Minimal image footprint using Alpine Linux and slim JRE distros, reducing image size by up to 80%.',
      },
      {
        title: 'Continuous Integration',
        desc: 'Automated GitHub Actions running linting, unit tests, and production vulnerability scans on every pull request.',
      },
      {
        title: 'Zero-Downtime Rollouts',
        desc: 'Blue-green and rolling deployment strategies ensuring zero interruption during production releases.',
      },
    ],
    codeSnippet: `# Multi-stage lightweight production Dockerfile
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]`,
    benchmark: 'Build Time: < 90s • Image: < 140MB',
  },
];

export default function ArchitectureSection({ triggerToast = () => {}, playClickSound = () => {} }) {
  const [selectedTier, setSelectedTier] = useState(ARCHITECTURE_TIERS[0]);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    playClickSound();
    navigator.clipboard.writeText(selectedTier.codeSnippet);
    setCopied(true);
    triggerToast('Architecture pattern snippet copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="architecture" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-8">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-accent animate-ping" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
            System Design
          </span>
        </div>
        <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
          Enterprise System Architecture Blueprint
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
          How Borifan architects resilient, mission-critical full-stack applications. Click any tier in the flow
          to inspect design patterns, failover strategies, and production code snippets.
        </p>
      </div>

      {/* Interactive Architecture Flow Diagram (Horizontal Pipeline) */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {ARCHITECTURE_TIERS.map((tier) => {
          const isSelected = selectedTier.id === tier.id;
          return (
            <button
              key={tier.id}
              type="button"
              onClick={() => {
                playClickSound();
                setSelectedTier(tier);
              }}
              className={`relative flex flex-col justify-between rounded-2xl border p-4 text-left transition duration-300 ${
                isSelected
                  ? 'border-accent bg-accent/15 shadow-glow scale-[1.02]'
                  : 'border-white/10 bg-slate-900/60 hover:border-white/25 hover:bg-slate-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-accent">
                    TIER {tier.number}
                  </span>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-xl text-lg ${
                      isSelected ? 'bg-accent text-slate-950 font-bold' : 'bg-white/5 text-slate-300'
                    }`}
                  >
                    <i className={`bx ${tier.icon}`} />
                  </div>
                </div>

                <h3 className="mt-3 text-xs sm:text-sm font-bold text-white line-clamp-1">
                  {tier.name}
                </h3>
                <p className="mt-1 text-[11px] text-slate-400 font-mono line-clamp-1">
                  {tier.badge}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-1">
                {tier.tech.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="rounded bg-white/5 px-1.5 py-0.5 text-[9px] font-mono text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {isSelected && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-8 rounded-full bg-accent" />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Tier Deep-Dive Panel */}
      <div className="mt-6 overflow-hidden rounded-[2rem] border border-white/15 bg-slate-900/90 shadow-2xl backdrop-blur-2xl">
        {/* Tier Header */}
        <div className="flex flex-col gap-4 border-b border-white/10 bg-slate-950/70 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/20 text-2xl text-accent">
              <i className={`bx ${selectedTier.icon}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-accent/15 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase text-accent border border-accent/20">
                  Tier {selectedTier.number} • {selectedTier.badge}
                </span>
                <span className="text-xs font-mono text-slate-400 hidden sm:inline">•</span>
                <span className="text-xs font-mono text-emerald-400 hidden sm:inline">
                  {selectedTier.benchmark}
                </span>
              </div>
              <h3 className="mt-1 text-xl sm:text-2xl font-black text-white">{selectedTier.name}</h3>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {selectedTier.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Content Grid: Left = Design Strategy, Right = Code Snippet */}
        <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {/* Left: Design Pillars */}
          <div className="p-6 sm:p-8 space-y-6">
            <p className="text-sm leading-relaxed text-slate-300 font-medium">
              {selectedTier.tagline}
            </p>

            <div className="space-y-4">
              {selectedTier.details.map((item, idx) => (
                <div key={idx} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <i className="bx bx-check-circle text-accent text-base" />
                    <span>{item.title}</span>
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-400">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-accent/20 bg-accent/5 p-4 flex items-center justify-between text-xs font-mono text-accent">
              <span>Production Benchmark Target</span>
              <strong className="text-white">{selectedTier.benchmark}</strong>
            </div>
          </div>

          {/* Right: Code Pattern Preview */}
          <div className="flex flex-col bg-slate-950/70 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold uppercase text-slate-400">
                Architectural Pattern Implementation
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300 hover:bg-accent/15 hover:text-white transition"
              >
                <i className={`bx ${copied ? 'bx-check text-accent' : 'bx-copy'}`} />
                <span>{copied ? 'Copied' : 'Copy Pattern'}</span>
              </button>
            </div>

            <div className="mt-4 flex-1 overflow-hidden rounded-xl border border-white/10 bg-slate-950 p-4">
              <pre className="h-full overflow-x-auto font-mono text-xs leading-relaxed text-cyan-200">
                <code>{selectedTier.codeSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

