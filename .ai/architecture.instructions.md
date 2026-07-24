# Architecture Ownership Instructions

## Product Boundary

The portfolio is client-facing and server-first. Next.js App Router Server Components own public route rendering. Browser behavior is isolated to explicit leaf components. Public v1 does not include a separate or stateful backend, authentication, database, private dashboard, Auth0, or a database-backed guestbook. Thin, read-only Next.js Route Handlers are part of the server-first app.

## Canonical Owners

- `src/app`: Routes, layouts, metadata, and thin, read-only Route Handlers.
- `src/content`: Localized EN/TR `siteCopy` and shared source-language project records.
- `src/components/ui`: Shared accessible UI primitives.
- `src/components/client`: Browser-only interaction leaves, including reduced-motion-safe Motion behavior.
- `src/lib`: Agent-discovery payload builders and shared server-safe helpers.
- `public/wasm`, `next.config.mjs`, and the isolated lab route: pinned WASM assets, static delivery
  headers, and the explicit-intent browser boundary.
- `.github/workflows/ci.yml` and `package.json`: CI and local delivery-gate owners. Hosted check truth belongs to the provider, not to these files.
- `DESIGN.md` plus `.ai/design-system.instructions.md`: Canonical design contract and its
  implementation routing. The root contract wins on visual or interaction drift.
- `.ai/development-preferences.instructions.md` and `.ai/versioning.instructions.md`: Local
  toolchain/code preferences and the manual release contract beneath accepted decisions.
- `.codex/agents`, `.codex/prompts`, `.codex/skills`, and `skills-lock.json`: Reviewed
  development-time capability inputs. They are not imported by application source.
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
- Treat an alive interface as a UX contract: movement must reveal hierarchy, continuity, or causality; it must stay out of the critical render path and degrade to equivalent static content.
- Do not add a separate or stateful backend, authentication, database, dashboard, or private guestbook features to public v1 without an accepted decision and real prerequisites.
- WASM assets are delivered statically; `next.config.mjs` is the sole cache, MIME, CORS, CORP, and
  frame-CSP header owner for `/wasm/*`.
- Treat `main.js` and `main.wasm` as a digest-pinned generated pair, not hand-maintained modules.
  First-party runtime wrappers remain under a no-growth modularity ratchet until their behavior is
  moved behind typed Next-owned source boundaries.
- OMX, Ruflo, Claude-flow, AgentDB, RuVector, and other orchestration systems are development tools,
  not application services. Their databases, daemon state, hooks with machine paths, logs, metrics,
  and sessions cannot own product state, source truth, or release evidence.
- Application commands follow `.nvmrc`, `.node-version`, and `package.json`. A separately installed
  development tool may use another Node runtime without changing the application engine contract.
