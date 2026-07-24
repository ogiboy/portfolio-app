# Portfolio Security Guidance Reconciliation

> The legacy filename is retained to preserve the user-added artifact without a destructive rename.
> This document replaces the copied Producer Studio review with a portfolio-specific reconciliation.
> It is not a completed penetration test or production security attestation.

- Date: 2026-07-24
- Repository: `portfolio-app`
- Imported reference: security guidance copied from another local project
- Reconciled against: `AGENTS.md`, `.ai/architecture.instructions.md`, current ADRs, `DESIGN.md`,
  `package.json`, `next.config.mjs`, and current source owners
- Runtime dependency: none; `.ai` and skill catalogs are development-only

## Imported Claims Rejected

The copied report described a loopback Producer Studio with mutation routes, sessions, CSRF,
Node-to-Python workers, LLM providers, media artifacts, approval/cost gates, private upload, and
publish controls. None of those surfaces belongs to H.O.T. public v1, so their findings, hashes,
commands, localhost results, and remediation claims are not evidence for this repository.

## Current Review Scope

- public EN/TR pages, metadata, redirects, external links, error/recovery routes;
- read-only public API, OpenAPI, sitemap/robots, and agent-discovery responses;
- markdown negotiation and WebMCP progressive enhancement;
- security headers and deployment/proxy behavior;
- Vercel aggregate analytics, Speed Insights, privacy copy, and local opt-out;
- explicitly booted sandboxed WASM lab and generated asset integrity;
- dependency, GitHub Actions, release, Vercel, and Cloudflare supply chain;
- project-local OMX capability files and local-only Ruflo/agent runtime state.

## Source-Confirmed Controls

- Public v1 has no authentication, database, private dashboard, stateful backend, or mutation API.
- Public API and OpenAPI Route Handlers are static/read-only and delegate payload ownership to
  server-safe helpers.
- The WASM iframe uses a restricted sandbox and loads only after explicit user intent; generated
  `main.js`/`main.wasm` are digest-pinned as a pair by the modernization contract.
- `next.config.mjs` owns `/wasm/*` static headers and the frame-specific CSP.
- WebMCP registration is client-only progressive enhancement; ordinary links/navigation remain the
  fallback.
- Analytics preference is browser-local and public copy states the bounded aggregate measurement
  model; there is no public account system.
- CI, release, browser, and production evidence are separate states. Feature branches do not create
  releases or production truth.
- Development agent/runtime folders are not application imports and do not grant external-write
  authority.

## Required Negative Checks for Security-Sensitive Changes

1. Route/API: method, schema, content type, URL scheme, redirect, and truthful capability claims.
2. Headers: general public response plus WASM-specific CSP/CORS/CORP/cache behavior.
3. Browser: keyboard/reduced-motion fallback, WebMCP unavailable path, analytics opt-out, console
   errors, and no hidden mutation.
4. WASM: no request before Boot, sandbox attributes, timeout/error/retry, pinned asset drift.
5. Supply chain: lockfile and lifecycle scripts, production high-severity audit, action permissions
   and immutable refs, secret redaction.
6. Hosted: reconcile Vercel deployment and Cloudflare DNS/proxy state by dated provider/public
   observations; never infer one from the other.

## Deferred Gates

The following require a new accepted architecture and threat-model review before implementation:

- authentication, OAuth/OIDC, protected-resource metadata, sessions, or account data;
- stateful APIs, database, contact-form storage, user content, uploads, or ROM ingestion;
- public MCP/A2A server capabilities or autonomous agent actions;
- Cloudflare Worker application logic, new third-party analytics, or additional tracking;
- separate backend, container, or Kubernetes runtime.

## Evidence Rule

A future security review must name the exact commit/deployment, authorized target, command/request,
timestamp, result, artifact, blocker, and residual risk. This reconciliation only establishes the
correct portfolio scope and removes foreign-project claims.
