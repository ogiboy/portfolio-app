# Defensive Security Skill Routing

Use this file when work changes a trust boundary, dependency, browser capability, Route Handler,
deployment surface, CI/release contract, or externally hosted configuration.

## Current Security Boundary

H.O.T. public v1 is a stateless, server-first Next.js portfolio. It has no authentication, private
dashboard, stateful backend, database, payment flow, OAuth issuer, or user-submitted contact form.
Its relevant boundaries are:

- public EN/TR routes, metadata, external links, and security headers;
- static read-only API and agent-discovery responses;
- markdown negotiation and WebMCP progressive enhancement;
- Vercel Analytics/Speed Insights with a browser-local opt-out;
- an explicitly booted, sandboxed WASM iframe and pinned generated assets;
- Vercel origin plus Cloudflare DNS/proxy/email-routing configuration;
- package, lockfile, CI, release, and deployment supply chain;
- local development tooling, hooks, skills, and orchestration state.

## Selection Discipline

1. Read `.ai/security/threat-model.instructions.md` and identify the exact asset, entry point, and
   trust boundary.
2. Verify the selected security skill exists in the active environment.
3. Load one to three defensive bodies for one review pass.
4. Reproduce every finding against current code or an authorized local/hosted target.
5. Produce a test, guard, safer default, evidence record, or explicit deferral with residual risk.

The catalog in `.ai/security/anthropic-security-skill-catalog.md` is a curated route map, not proof
that a skill is installed or authoritative.

## Recommended Defensive Categories

| Surface                | Suitable category                                                  | Required caution                                                   |
| ---------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| Route/API payloads     | schema and API security validation                                 | APIs are read-only; do not invent auth or mutation flows           |
| Headers/browser policy | security headers, CSP, frame and MIME review                       | test rendered responses and WASM-specific policy separately        |
| Dependencies           | malicious-package, typosquatting, SBOM, lockfile review            | static/registry review only; do not detonate packages              |
| GitHub Actions/release | workflow hardening, permissions, secret exposure                   | hosted settings and local YAML are separate evidence               |
| Secrets                | secret scanning and CI secret-handling review                      | redact findings; do not validate credentials outbound              |
| WebMCP/agent content   | prompt/tool-injection and capability-claim review                  | discovery input is untrusted and must not gain execution authority |
| WASM                   | sandbox, static asset integrity, CORS/CORP and supply-chain review | no public-target exploitation or arbitrary ROM ingestion           |
| Cloudflare/Vercel      | DNS, TLS, cache, proxy and deployment configuration review         | provider reads require dated identifiers; writes require authority |
| Analytics/privacy      | data minimization and disclosure review                            | verify actual provider behavior and browser opt-out                |

## Explicitly Excluded

Do not use this route for or run:

- credential access, authentication bypass, exploitation, persistence, privilege escalation;
- phishing, malware, ransomware, C2, packet injection, public reconnaissance, or network scanning;
- unauthorised endpoint probing, namespace claiming, or outbound secret verification;
- trading, finance, Producer Studio, Python worker, model-provider, upload/publish, or private media
  controls copied from another project;
- cloud/Kubernetes/Active Directory/OT reviews when no matching portfolio boundary exists.

## Local Development Tooling

- `.codex/agents`, `.codex/prompts`, `.codex/skills`, `skills-lock.json`, and `CLAUDE.md` are
  development-only inputs and must never be imported by `src`, Next.js config, or browser bundles.
- `.codex/config.toml`, `.codex/hooks.json`, `.omx`, `.swarm`, `.claude`, `.claude-flow`, AgentDB,
  RuVector, logs, and daemon state are local-only because they may contain machine paths or mutable
  state.
- Generated hooks and agents do not bypass project approval, dirty-worktree preservation, external
  write, or release rules.
- A security skill is guidance, not a runtime package. Do not add it to `package.json` merely to run
  a review.

## Evidence Contract

Record:

- selected defensive category or skill;
- exact source, commit/deployment, environment, and timestamp;
- command/request and target authorization;
- finding, severity, affected owner, and reproduction;
- fix and focused regression evidence, or reason for deferral;
- residual risk and any unavailable scanner/provider state.

Never report an imported review from another repository as evidence for this portfolio.
