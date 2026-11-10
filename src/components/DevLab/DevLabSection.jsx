import React, { useState } from 'react';

const API_PRESETS = [
  {
    id: 'tax-audit',
    name: 'Tax Audit Risk Engine',
    method: 'POST',
    endpoint: '/api/v1/tax-audit/analyze',
    stack: 'Spring Boot • PostgreSQL',
    description: 'Simulates revenue tax audit calculation, detecting discrepancies, anomalies, and risk score tiers.',
    defaultBody: JSON.stringify(
      {
        businessId: 'ET-REV-88492',
        annualRevenueETB: 12500000,
        declaredDeductionsETB: 4200000,
        transactionVolume: 3420,
        vatFilingStatus: 'ON_TIME',
        industrySector: 'Manufacturing & Import',
      },
      null,
      2,
    ),
    generateResponse: (bodyStr) => {
      try {
        const b = JSON.parse(bodyStr);
        const rev = Number(b.annualRevenueETB) || 10000000;
        const ded = Number(b.declaredDeductionsETB) || 3000000;
        const deductionRatio = ((ded / rev) * 100).toFixed(1);
        const riskLevel = deductionRatio > 40 ? 'ELEVATED' : 'LOW';

        return {
          status: 200,
          statusText: 'OK',
          latency: 42,
          data: {
            auditId: `AUD-${Date.now().toString().slice(-6)}`,
            businessId: b.businessId || 'ET-REV-88492',
            analyzedAt: new Date().toISOString(),
            riskAssessment: {
              overallRisk: riskLevel,
              deductionRatio: `${deductionRatio}%`,
              benchmarkAverage: '26.4%',
              discrepancyScore: riskLevel === 'ELEVATED' ? 78 : 14,
              auditRecommended: riskLevel === 'ELEVATED',
              flaggedAnomalyRules:
                riskLevel === 'ELEVATED'
                  ? ['RULE_SEC_04: High Deduction to Revenue Ratio', 'RULE_VOL_12: Quarterly Variance Spikes']
                  : [],
            },
            taxCalculation: {
              taxableIncomeETB: rev - ded,
              estimatedBaseTaxETB: (rev - ded) * 0.3,
              currency: 'ETB',
            },
            engineVersion: 'Spring-Boot-v3.2 / ITAS-Enterprise',
          },
        };
      } catch {
        return {
          status: 400,
          statusText: 'Bad Request',
          latency: 18,
          data: { error: 'Invalid JSON payload format in request body' },
        };
      }
    },
  },
  {
    id: 'jwt-auth',
    name: 'JWT & RBAC Security Guard',
    method: 'POST',
    endpoint: '/api/v1/auth/verify-token',
    stack: 'Node.js • Express • JWT',
    description: 'Validates cryptographic bearer token signatures, parses claims, and checks RBAC access privileges.',
    defaultBody: JSON.stringify(
      {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.borifan-auth-session-demo',
        requiredRoles: ['ROLE_LEAD_DEVELOPER', 'ROLE_AUDITOR'],
      },
      null,
      2,
    ),
    generateResponse: () => {
      return {
        status: 200,
        statusText: 'OK',
        latency: 28,
        data: {
          authenticated: true,
          subject: 'borifan.dabasa@haramaya.edu.et',
          userId: 'usr_94821a3f',
          claims: {
            name: 'Borifan Dabasa',
            role: 'FULL_STACK_ARCHITECT',
            authorities: ['ROLE_ADMIN', 'ROLE_LEAD_DEVELOPER', 'ROLE_AUDITOR', 'SCOPE_WRITE'],
            issuer: 'https://auth.borifan-portfolio.dev',
            tokenType: 'Bearer',
            issuedAt: new Date(Date.now() - 3600000).toISOString(),
            expiresAt: new Date(Date.now() + 86400000).toISOString(),
          },
          rbacCheck: {
            hasRequiredPrivileges: true,
            grantedScopes: ['api:all', 'audit:read', 'audit:write'],
          },
        },
      };
    },
  },
  {
    id: 'projects-filter',
    name: 'Portfolio Data Query API',
    method: 'GET',
    endpoint: '/api/v1/projects?tech=spring-boot&status=production',
    stack: 'RESTful API • MongoDB / Postgres',
    description: 'Dynamic JSON querying endpoint filtering portfolio production projects by technology stack.',
    defaultBody: '',
    generateResponse: () => {
      return {
        status: 200,
        statusText: 'OK',
        latency: 35,
        data: {
          count: 2,
          page: 1,
          filtersApplied: { tech: 'spring-boot', status: 'production' },
          results: [
            {
              id: 'tax-audit-system',
              title: 'Ministry of Revenue Tax Audit Automation',
              client: 'INSA / Ministry of Revenue',
              architecture: 'Spring Boot 3 + PostgreSQL + React',
              uptime: '99.94%',
              status: 'PRODUCTION',
            },
            {
              id: 'teamsync-saas',
              title: 'TeamSync Project Collaboration Platform',
              architecture: 'React + Node.js + Express + MongoDB',
              status: 'PRODUCTION',
            },
          ],
        },
      };
    },
  },
  {
    id: 'system-metrics',
    name: 'Database & Connection Health',
    method: 'GET',
    endpoint: '/api/v1/health/system-metrics',
    stack: 'PostgreSQL • Redis Cache • Docker',
    description: 'Simulates microservice cluster metrics, connection pool headroom, and cache hit ratios.',
    defaultBody: '',
    generateResponse: () => {
      return {
        status: 200,
        statusText: 'OK',
        latency: 16,
        data: {
          status: 'HEALTHY',
          timestamp: new Date().toISOString(),
          postgresPool: {
            activeConnections: 14,
            idleConnections: 36,
            maxPoolSize: 50,
            queryLatencyP95Ms: 4.8,
          },
          redisCache: {
            memoryUsedMB: 124.6,
            hitRate: '96.2%',
            evictionPolicy: 'volatile-lru',
          },
          runtime: {
            nodeEnv: 'production',
            uptimeSeconds: 742190,
            cpuUsagePercent: 8.4,
          },
        },
      };
    },
  },
];

export default function DevLabSection({ triggerToast = () => {}, playClickSound = () => {} }) {
  const [selectedPreset, setSelectedPreset] = useState(API_PRESETS[0]);
  const [requestBody, setRequestBody] = useState(API_PRESETS[0].defaultBody);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(() => API_PRESETS[0].generateResponse(API_PRESETS[0].defaultBody));
  const [activeTab, setActiveTab] = useState('body'); // 'body' | 'headers'
  const [copied, setCopied] = useState(false);

  const handleSelectPreset = (preset) => {
    playClickSound();
    setSelectedPreset(preset);
    setRequestBody(preset.defaultBody);
    setIsLoading(true);
    setTimeout(() => {
      setResponse(preset.generateResponse(preset.defaultBody));
      setIsLoading(false);
    }, 280);
  };

  const handleSendRequest = () => {
    playClickSound();
    setIsLoading(true);
    setTimeout(() => {
      const res = selectedPreset.generateResponse(requestBody);
      setResponse(res);
      setIsLoading(false);
      triggerToast(`Response received in ${res.latency}ms`);
    }, 450);
  };

  const handleCopyJson = () => {
    if (!response) return;
    playClickSound();
    navigator.clipboard.writeText(JSON.stringify(response.data, null, 2));
    setCopied(true);
    triggerToast('JSON Response copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="devlab" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-8">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
            Interactive Architecture
          </span>
        </div>
        <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
          Dev Lab & Live API Console
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
          Test real architectural endpoints built by Borifan. Inspect request payloads, HTTP status codes,
          latency benchmarks, and live JSON data models.
        </p>
      </div>

      {/* Preset Selector Chips */}
      <div className="mt-8 flex flex-wrap gap-2.5">
        {API_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => handleSelectPreset(preset)}
            className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-xs font-semibold transition ${
              selectedPreset.id === preset.id
                ? 'border-cyan-400 bg-cyan-500/15 text-white shadow-glow'
                : 'border-white/10 bg-slate-900/60 text-slate-300 hover:border-white/20 hover:text-white'
            }`}
          >
            <span
              className={`rounded px-1.5 py-0.5 text-[10px] font-mono font-bold ${
                preset.method === 'GET' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-cyan-500/20 text-cyan-400'
              }`}
            >
              {preset.method}
            </span>
            <span>{preset.name}</span>
          </button>
        ))}
      </div>

      {/* Main Console Box */}
      <div className="mt-6 overflow-hidden rounded-[2rem] border border-white/15 bg-slate-900/90 shadow-2xl backdrop-blur-2xl">
        {/* URL Bar */}
        <div className="flex flex-col gap-3 border-b border-white/10 bg-slate-950/80 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-2.5 overflow-hidden rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2">
            <span
              className={`rounded-md px-2 py-0.5 text-xs font-mono font-bold uppercase ${
                selectedPreset.method === 'GET' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-cyan-500/20 text-cyan-400'
              }`}
            >
              {selectedPreset.method}
            </span>
            <span className="font-mono text-xs text-slate-400 select-none">https://api.borifan.dev</span>
            <input
              type="text"
              readOnly
              value={selectedPreset.endpoint}
              className="flex-1 bg-transparent font-mono text-xs text-white outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-[11px] font-mono text-slate-400">
              {selectedPreset.stack}
            </span>
            <button
              type="button"
              onClick={handleSendRequest}
              disabled={isLoading}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2 text-xs font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50 shadow-md"
            >
              {isLoading ? (
                <>
                  <i className="bx bx-loader-alt animate-spin text-base" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <i className="bx bx-send text-base" />
                  <span>Send Request</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Console Grid: Left = Request, Right = Response */}
        <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10 min-h-[380px]">
          {/* Left: Request Configuration */}
          <div className="flex flex-col p-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('body')}
                  className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                    activeTab === 'body'
                      ? 'bg-white/10 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Request Body {selectedPreset.method === 'POST' ? '(JSON)' : '(None)'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('headers')}
                  className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                    activeTab === 'headers'
                      ? 'bg-white/10 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Headers (3)
                </button>
              </div>

              <span className="text-[11px] font-mono text-slate-500">
                {selectedPreset.method === 'POST' ? 'Editable Payload' : 'Read Only'}
              </span>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              {selectedPreset.description}
            </p>

            <div className="mt-3 flex-1">
              {activeTab === 'body' ? (
                selectedPreset.method === 'POST' ? (
                  <textarea
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    rows={10}
                    className="h-full w-full rounded-xl border border-white/10 bg-slate-950/70 p-3.5 font-mono text-xs text-cyan-200 outline-none focus:border-cyan-400 resize-none leading-relaxed"
                  />
                ) : (
                  <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-white/10 bg-slate-950/40 text-xs font-mono text-slate-500">
                    GET requests have no payload body. Query params applied in URL.
                  </div>
                )
              ) : (
                <div className="space-y-2 rounded-xl border border-white/10 bg-slate-950/70 p-3.5 font-mono text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-cyan-400">Content-Type:</span>
                    <span>application/json</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-cyan-400">Authorization:</span>
                    <span>Bearer borifan-jwt-session-token</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-cyan-400">X-App-Client:</span>
                    <span>Haramaya-SE-Core/2026</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Live Response Viewer */}
          <div className="flex flex-col bg-slate-950/50 p-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-white uppercase">Response</span>
                {response && (
                  <>
                    <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-mono font-bold text-emerald-400 border border-emerald-500/30">
                      {response.status} {response.statusText}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      <i className="bx bx-time mr-1 text-cyan-400" />
                      {response.latency} ms
                    </span>
                  </>
                )}
              </div>

              <button
                type="button"
                onClick={handleCopyJson}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <i className={`bx ${copied ? 'bx-check text-cyan-400' : 'bx-copy'}`} />
                <span>{copied ? 'Copied' : 'Copy JSON'}</span>
              </button>
            </div>

            <div className="relative mt-3 flex-1 overflow-hidden rounded-xl border border-white/10 bg-slate-950 p-4">
              {isLoading ? (
                <div className="flex h-56 flex-col items-center justify-center gap-3 text-cyan-400 font-mono text-xs">
                  <i className="bx bx-loader-alt animate-spin text-2xl" />
                  <span>Awaiting microservice response...</span>
                </div>
              ) : response ? (
                <pre className="h-full max-h-72 overflow-y-auto font-mono text-xs leading-relaxed text-emerald-300">
                  <code>{JSON.stringify(response.data, null, 2)}</code>
                </pre>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

