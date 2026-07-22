# Plan: Search, H.O.T. Brand, and Privacy-First Observability

## Aegis Visibility

This plan keeps the expanded search and telemetry work tied to the approved overhaul, prevents branding from drifting away from real identity, and makes provider-gated observability fail closed.

## Plan Basis

- Authority: `AGENTS.md`, `.ai/architecture.instructions.md`, accepted decisions, roadmap, active checkpoint, package/CI, then advisory tools.
- Inputs: the user's H.O.T. direction, developer/homelab positioning, current repository metadata, and official Google, Next.js, Vercel, and Sentry guidance retrieved on 2026-07-22.
- Decision: ready for local, reversible implementation. Search Console, Sentry, DNS, deployment, and recrawl mutations remain outside local authority until their prerequisites are available.

## Execution Readiness View

- Intent lock: improve truthful human/search/agent discovery and aggregate operational visibility without inventing claims or adding a stateful backend.
- Scope fence: metadata, structured data, brand surfaces, localized public copy, privacy controls, tests, and documentation.
- Baseline lock: preserve public EN/TR routes, project URLs, API/discovery endpoints, reduced-motion behavior, and isolated WASM loading.
- Owners: `src/content` owns localized copy; `src/lib` owns SEO/schema construction; `src/app` owns route metadata and metadata files; `src/components/site` owns the mark; isolated client leaves own telemetry preference behavior.
- Compatibility boundary: no route or project loss; the retired dashboard compatibility URL remains a redirect but must not be promoted as an indexable page.
- Retirement boundary: no custom events or Sentry runtime until the recorded prerequisites exist.

## Change Necessity

- User-visible need: correct the title and identity, make developer/homelab work discoverable, and measure aggregate visits without opaque tracking.
- No-change option: keep generic frontend metadata and provider defaults; rejected because it misstates the portfolio and leaves discovery/privacy gaps.
- Why code is necessary: route metadata, social cards, schema, visible mark, and opt-out behavior are runtime outputs.
- Minimum boundary: central metadata/schema helpers, route-level wiring, one brand component, one telemetry leaf, one privacy route, metadata assets, and focused tests.
- Decision: code-change.

## Complexity Budget

- Artifact class: bounded cross-route public contract.
- Target owners: `src/lib/seo.ts`, `src/lib/structured-data.ts`, route metadata exports, `src/components/site/hot-mark.tsx`, isolated telemetry leaves, localized content, tests, and governance records.
- Current pressure: metadata is duplicated but small; `siteCopy` is large but remains the canonical localized owner.
- Projected pressure: moderate and within budget if builders stay data-only and client behavior remains isolated.
- Planned governance: no dependency additions, no generic SEO framework, no analytics abstraction beyond current providers, and no provider mutation in the implementation commit.

## Task Batches

1. `SEO-1 Governance`: record identity, scope, privacy, external prerequisites, roadmap, and checkpoint state.
2. `SEO-2 Metadata`: implement localized canonical metadata, hreflang, social fields, manifest/icon/social image, and permanent legacy redirect behavior.
3. `SEO-3 Semantics`: implement escaped JSON-LD builders and render truthful schemas on indexable public routes.
4. `SEO-4 Identity`: replace OGT with H.O.T., add the restrained flame motif, and update visible developer/homelab copy.
5. `OBS-1 Privacy telemetry`: retain aggregate provider telemetry behind a local opt-out and publish a localized privacy explanation; do not add Sentry or custom events.
6. `SEO-5 Verification`: run focused tests, full gates, browser and reduced-motion QA, preview checks, hosted review, and production checks with separate evidence.

## Review Gates

- Content: full name and claims match visible, source-backed content in both locales.
- Search: canonical and alternate URLs are absolute and reciprocal; non-indexable assets stay out of the sitemap.
- Security: JSON-LD escapes `<`; metadata cannot ingest untrusted runtime input; no token or DSN is committed.
- Privacy: telemetry emits no PII; opt-out is durable; Sentry and replay remain absent.
- Performance: social generation is server-side; the H.O.T. mark is server-rendered; telemetry and WebMCP remain isolated client leaves; WASM remains lazy.
- Delivery: local, pushed, hosted, preview, review, merge, production, Search Console, and Sentry evidence are never conflated.

## Drift and Rewind

- If H.O.T. identity conflicts with source content, keep the full legal/display name explicit and pause only the disputed expansion, not the technical SEO fixes.
- If a metadata or schema change produces invalid output, revert the owning helper or route wiring without removing existing discovery endpoints.
- If telemetry behavior cannot be proven anonymous or opt-out-safe, remove the telemetry component and preserve the privacy page as an accurate no-telemetry notice.
- Any provider mutation or credential requirement returns to the active checkpoint as an external blocker rather than being guessed.

## TDD Route

- Mode: off
- Decision: skipped
- Strict authority: not applicable
- Test posture: focused unit and browser regression tests plus full release gates
- Verification: rendered metadata/schema, browser behavior, build output, hosted checks, and post-deploy provider evidence
