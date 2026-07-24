# Defensive Security Skill Catalog for H.O.T.

This is a project-specific routing map for security skills available through project-local,
system-global, and plugin catalogs. It is not an installed-version lock, runtime configuration, or
security audit. Verify a selected skill in the active environment before loading it.

## Selection Rules

1. Start from the affected asset and trust boundary in `threat-model.instructions.md`.
2. Inspect skill metadata or `skills-lock.json`; load only one to three defensive bodies.
3. Prefer project-local `.codex/skills` when a matching workflow exists, then system/global/plugin
   catalogs for specialist depth.
4. Reproduce findings against current code or an authorized target.
5. Record selected skills, source/version/date, checks, findings, fixes, and residual risk.

Security skills remain development-only. Never import `.agents`, `.codex`, `.ai`, plugin caches, or
host skill directories from application source.

## Active Portfolio Routes

### Next.js routes, APIs, and headers

- API schema/input validation for public Route Handlers and WebMCP tool schemas.
- Security-header review for CSP, frame policy, MIME sniffing, referrer, permissions, and cache
  behavior.
- Host, origin, redirect, URL-scheme, and content-negotiation review where proxy behavior changes.
- SSRF review only if a future route starts fetching operator/user-provided URLs; current public APIs
  are static and read-only.

### Browser, WebMCP, and agent discovery

- Direct and indirect prompt/tool-injection review for agent-facing markdown, WebMCP tool
  descriptions, and discovery metadata.
- Capability-claim review so OAuth, MCP, A2A, authentication, mutation, or live-service metadata is
  not published without a real implementation.
- DOM/client security review for experimental browser APIs and graceful unsupported-browser fallback.

### WASM and static assets

- iframe sandbox and browser isolation review.
- generated-artifact integrity and hash/provenance review.
- CORS/CORP/CSP/cache-header review for `/wasm/*`.
- dependency and source-supply-chain review during engine migration.

### Privacy and telemetry

- data-minimization review for Vercel Web Analytics and Speed Insights.
- privacy-copy validation against actual collection and browser-local opt-out behavior.
- third-party script and content-security review when telemetry providers change.

### CI, release, and dependencies

- GitHub Actions hardening: immutable actions, explicit permissions, untrusted expression handling,
  artifact and secret exposure.
- malicious-package, dependency-confusion, typosquatting, lifecycle-script, lockfile, license, and
  advisory review.
- secret scanning with reviewed allowlists and redacted results.
- SBOM or artifact-signing review only when the release process actually adopts those outputs.

### Cloudflare and Vercel

- DNS/DNSSEC, TLS, cache, proxy, email-routing, origin, and deployment-topology review.
- provider configuration is volatile hosted state; inspect through authorized read-only APIs or UI
  and record identifiers/timestamps.
- Worker, WAF, Turnstile, or new edge logic requires a separate architecture/security decision before
  implementation.

### Development agents and local orchestration

- prompt/tool poisoning and MCP server review before adding a new development connector.
- secret/path/runtime-state review for `.codex`, OMX, Ruflo, Claude-flow, AgentDB, and RuVector.
- generated hooks with absolute machine paths remain local-only; committed role/prompt/skill bodies
  must contain no project secrets or foreign product assumptions.

## Conditional Future Routes

Load only after an accepted product decision introduces the boundary:

- OAuth scope and token handling;
- authentication/session/CSRF controls;
- database, stateful API, contact form, or user-generated content security;
- file/ROM upload, moderation, malware scanning, or storage isolation;
- Cloudflare Worker/Pages/Queues/D1/R2 application runtime;
- backend, container, Kubernetes, or service-to-service identity.

## Excluded Skill Families

- credential access, bypass, exploitation, persistence, privilege escalation;
- phishing, malware, ransomware, C2, packet injection, public reconnaissance;
- network/port scanning, unauthorised endpoint probing, or outbound secret validation;
- offensive payload generation or public namespace claiming;
- trading, broker, finance, Producer Studio, Python worker, media-render, private upload/publish, or
  provider controls from unrelated repositories;
- cloud/Kubernetes/Active Directory/OT skills with no accepted portfolio boundary.

## Review Output

Security review output belongs in focused tests/guards, a dated `docs/aegis` evidence record, the
active checkpoint, and a portfolio-specific report. Imported reports from another project are
reference material only and never evidence for H.O.T.
