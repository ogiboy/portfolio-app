# H.O.T. Portfolio Threat Model

## Protected Properties

- Integrity and availability of public EN/TR content, metadata, and canonical URLs.
- Truthfulness of project, experience, status, analytics, and agent-capability claims.
- Visitor privacy and the browser-local analytics opt-out.
- Isolation of the WASM runtime and integrity of its pinned generated assets.
- Read-only behavior and schema integrity of public API/discovery endpoints.
- Cloudflare DNS/DNSSEC/email-routing and Vercel origin/deployment boundaries.
- Source, dependency, CI, release, and deployment supply-chain integrity.
- Local developer secrets, machine paths, hooks, agent memory, and orchestration state.

## Trust-Boundary Matrix

| Asset                       | Entry point                                               | Trust boundary                                   | Current control                                                              | Residual concern / negative test                                                |
| --------------------------- | --------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Public content and metadata | `/en`, `/tr`, project and privacy routes                  | visitor/crawler to server-rendered output        | static generation, localized metadata, canonical/hreflang, source-owned copy | rendered HTML must not drift across locales or expose stale claims              |
| Discovery/API payloads      | `/api/*`, `/.well-known/*`, OpenAPI, markdown negotiation | agent request to read-only server output         | thin GET/HEAD handlers, server-safe builders, explicit content types         | unsupported methods/schemes/claims must fail or remain absent honestly          |
| WebMCP tools                | browser `modelContext`                                    | experimental browser agent to navigation actions | progressive enhancement, narrow schemas, client-only registration            | no capability escalation, hidden mutation, or failure of normal navigation      |
| Analytics                   | Vercel scripts and local preference                       | browser to third-party aggregate measurement     | no account system, disclosed aggregate analytics, local opt-out              | preference changes must latch and no advertising-profile claim may appear       |
| WASM lab                    | Boot action and sandboxed iframe                          | portfolio shell to generated engine assets       | explicit boot, sandbox, timeout/retry, pinned hashes, static headers         | no pre-boot request, sandbox escape, asset drift, or silent indefinite loading  |
| External links/contact      | project/source/social/mail links                          | visitor to third-party destination               | explicit URLs and visible labels                                             | broken, deceptive, unsafe-scheme, or wrong-locale destinations                  |
| DNS and edge                | Cloudflare zone to Vercel origin/email routing            | provider control planes and public resolvers     | DNSSEC, scoped records, provider separation, dated verification              | dashboard, resolver, and deployed origin state may drift independently          |
| CI/release                  | PR/workflows/package scripts                              | untrusted changes to trusted build/release       | minimal permissions, conventional commits, full gate, manual release         | secret exposure, mutable action refs, skipped checks, wrong tag commit          |
| Development agents          | skills/hooks/runtime memory                               | local tool output to repository edits            | `AGENTS.md` authority, bounded roles, ignored runtime state                  | prompt/tool injection, stale memory, absolute paths, accidental runtime commits |

## Current Non-Goals

Public v1 has no authentication, OAuth/OIDC issuer, protected resource, private dashboard, database,
payment flow, user-upload pipeline, stateful contact form, public MCP server, or backend agent service.
Do not publish discovery metadata that falsely implies one of these capabilities exists.

## Review Rules

- Scope each review to an authorized local, preview, production, or provider target.
- Use defensive static analysis and negative tests. Do not run offensive scans against public targets.
- Separate repository configuration, local runtime output, hosted provider state, and public resolver
  observations.
- Redact secrets and personal data; never validate candidate credentials outbound.
- Record exact command/request, timestamp, commit/deployment, result, artifact, blocker, and residual
  risk.
- Revisit this model before adding authentication, mutation, a backend, uploads, user content,
  Workers, or new third-party data collection.
