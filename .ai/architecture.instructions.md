# Architecture Ownership Instructions

## Product Boundary

The portfolio is client-facing and server-first. Next.js App Router Server Components own public route rendering. Browser behavior is isolated to explicit leaf components. Public v1 does not include a separate or stateful backend, authentication, database, private dashboard, Auth0, or a database-backed guestbook. Thin, read-only Next.js Route Handlers are part of the server-first app.

## Canonical Owners

- `src/app`: Routes, layouts, metadata, and thin, read-only Route Handlers.
- `src/content`: Localized EN/TR `siteCopy` and shared source-language project records.
- `src/components/ui`: Shared accessible UI primitives.
- `src/components/client`: Browser-only interaction leaves, including GSAP behavior.
- `src/lib`: Agent-discovery payload builders and shared server-safe helpers.
- `public/wasm` and the isolated lab route: WASM vendor assets and their narrow delivery surface.
- `.github/workflows/ci.yml` and `package.json`: CI and local delivery-gate owners. Hosted check truth belongs to the provider, not to these files.
- `.ai/workflows/release-pr-workflow.instructions.md`: PR/release state-reconciliation owner; it separates local, pushed, hosted-check, preview, browser, review, merge, and production evidence.
- `.ai/checkpoints/portfolio-overhaul.md`: Sole mutable, resumable state owner for the active overhaul workstream. It cannot override source, Git, or hosted state.
- `docs/aegis/`: Dated initiative intent, plans, baseline snapshots, and evidence. These records are immutable after acceptance and are not live status dashboards.
- `.ai/workflows/browser-qa-workflow.instructions.md`: Browser QA procedure owner.
- `SECURITY.md` plus `.ai/workflows/security-workflow.instructions.md`: Vulnerability-reporting and security-review workflow owners.
- `src/content` with route owners: Localization and public-content ownership.
- `src/lib` with route owners: Agent and human discovery metadata ownership.

## Boundary Rules

- Route Handlers remain thin and read-only and delegate payload construction to `src/lib`.
- Agent-discovery payloads must report source-backed, current information and label unavailable or inferred data.
- Deployment topology and agent-discovery scope are governed by accepted decisions. Reconcile provider state before acting or making production claims.
- Branch-only behavior is not live until merge, deployment, and production verification prove it.
- Keep the EN/TR route shell and `siteCopy` localized. Project records currently remain shared source-language content.
- Never claim complete project-content parity until the data model is localized and browser-verified.
- Respect `prefers-reduced-motion` for motion and preserve accessible primitive behavior.
- Do not add a separate or stateful backend, authentication, database, dashboard, or private guestbook features to public v1 without an accepted decision and real prerequisites.
