# Checkpoint: Portfolio Overhaul and Agent Readiness

Status: active; `AR-1` governance and `AR-2` runtime are committed, and the authorized `SEO-1` through `OBS-1` expansion is in progress before final delivery.

Updated: 2026-07-22

Objective (immutable until closure): deliver the approved public EN/TR developer and homelab portfolio overhaul, H.O.T. identity, isolated WASM lab, rigorous project governance, truthful search and agent discovery, privacy-first aggregate telemetry, and auditable PR-to-production verification without losing existing features.

Non-negotiable constraints (immutable): preserve compatible user work; pnpm only; server-first App Router with browser behavior in leaves; no stateful backend/auth/database in public v1; no secret, paid, destructive, DNS, deployment, or provider mutation without authority; never conflate local, pushed, hosted-check, preview, browser, review, merge, production, or external evidence.

Completion criteria (immutable): approved features remain present; full package gates pass for the final commit; EN/TR, reduced-motion, H.O.T. identity, metadata/schema, privacy controls, discovery, and WASM journeys are browser-verified; commits are focused and pushed; hosted checks/review are reconciled; merge and production are separately proven; Search Console/Sentry and deferred protocol surfaces are not called complete unless their prerequisites and external evidence exist.

Worktree / branch / commit: `/Users/ogiboy/.codex/worktrees/dce4/portfolio-app` / `ui-update` / `9eccd5e`; clean at the start of the search/brand slice and six commits ahead of `origin/ui-update`.

Last completed slice / commit: `9eccd5e docs: record agent readiness release notes`; the preceding runtime slice passed scoped format, lint, typecheck, release policy, 11 Vitest tests, 4 Playwright tests, and independent re-review.

Current task: execute `SEO-1` governance, then implement and verify localized technical SEO, H.O.T. brand surfaces, safe structured data, social metadata, and `OBS-1` privacy-first aggregate telemetry before returning to `AR-3` through `AR-5` delivery.

Completed: canonical fallback, accepted `AR-1` governance, `AR-2` Markdown negotiation/Agent Skills/WebMCP, unused legacy-data retirement, README/changelog closeout, and prior focused validation are committed.

Pending: complete `SEO-1` through `SEO-6` and `OBS-1`; execute `AR-3` full gates, `AR-4` preview/browser QA, and `AR-5` push/hosted-check/review/merge/production reconciliation; retain `SEO-7`, `SEO-8`, `OBS-2`, and `OBS-3` as post-launch or provider-gated follow-ups.

Owned dirty files: the search/brand/observability governance records and this active checkpoint; runtime ownership expands only after this governance slice is committed.

Unrelated changes: none known. The user-owned SonarLint setting was preserved in the committed tooling slice.

Decisions: see `2026-06-16-public-v1-scope.md`, `2026-06-16-wasm-game-center-demo.md`, `2026-07-20-governance-authority.md`, `2026-07-22-canonical-site-origin.md`, `2026-07-22-manual-release-workflow.md`, `2026-07-22-agent-readiness-delivery.md`, and `2026-07-22-search-brand-and-observability.md`.

Required gates / delivery expectations: focused checks per slice; before push run `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm release:check`, `pnpm test`, `pnpm test:e2e`, `pnpm build`, and `pnpm audit --prod --audit-level high`; then collect pushed, hosted-check, preview, browser, review, merge, and production evidence independently.

Evidence: `local | targeted governance/release/agent-readiness chain | 2026-07-22 | 3b72500 + f825cbc3… dirty fingerprint | passed | 18 Vitest + 4 Playwright | full gates pending`; durable fingerprint and evidence rows live in `docs/aegis/work/2026-07-20-governance-and-agent-readiness/90-evidence.md`.

Hosted state: last observed 2026-07-22, PR #14 was open and mergeable but `BLOCKED / REVIEW_REQUIRED`; JavaScript/TypeScript CodeQL passed while stale Python CodeQL failed; production remained `main` on Vercel behind Cloudflare. Refresh before acting.

Blockers: search/brand runtime work, full gates, preview, required review, hosted checks, merge, and production behavior are not yet proven for the final commit. Search Console domain verification/submission and Sentry remain external prerequisite-gated work. The stale Python CodeQL lane is hosted configuration debt until refreshed or corrected.

Drift: this file supersedes older mutable status statements. Dated Aegis snapshots remain truthful only for their capture time. Production and PR facts can drift and must be refreshed.

Compatibility boundary: preserve public EN/TR routes, project archive/detail pages, contact flow, Brutalist design system, reduced-motion behavior, public read-only API/catalog/sitemap/robots surfaces, agent discovery, and isolated WASM game center. Keep the retired dashboard URL as compatibility-only redirect behavior. Do not introduce OAuth, `auth.md`, MCP server card, DNS-AID, Django, Docker, Kubernetes, custom analytics events, or Sentry without accepted prerequisites.

Next action: commit `SEO-1` governance, implement the bounded metadata/identity/schema/privacy slices, run focused checks, then run every local gate and browser QA before one grouped push.

Closure / archive condition: archive only after the final commit is merged, the intended production deployment is identified, all required production journeys and discovery endpoints are verified, and the final evidence record links each independent state.
