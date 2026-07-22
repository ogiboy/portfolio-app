# Checkpoint: Portfolio Overhaul and Agent Readiness

Status: active; canonical-origin slice committed and agent-readiness runtime locally verified.

Updated: 2026-07-22

Objective (immutable until closure): deliver the approved public EN/TR portfolio overhaul, isolated WASM lab, rigorous project governance, portable agent discovery, and auditable PR-to-production verification without losing existing features.

Non-negotiable constraints (immutable): preserve compatible user work; pnpm only; server-first App Router with browser behavior in leaves; no stateful backend/auth/database in public v1; no secret, paid, destructive, DNS, deployment, or provider mutation without authority; never conflate local, pushed, hosted-check, preview, browser, review, merge, production, or external evidence.

Completion criteria (immutable): approved features remain present; full package gates pass for the final commit; EN/TR, reduced-motion, discovery, and WASM journeys are browser-verified; commits are focused and pushed; hosted checks/review are reconciled; merge and production are separately proven; deferred protocol surfaces remain absent unless prerequisites exist.

Worktree / branch / commit: `/Users/ogiboy/.codex/worktrees/dce4/portfolio-app` / `ui-update` / `3b72500` plus owned working-tree changes.

Last completed slice / commit: `3b72500 fix: correct canonical portfolio origin`; focused format, lint, typecheck, and unit verification passed before commit.

Current task: `AR-1` harden governance and executable release/evidence contracts before committing the already-verified `AR-2` runtime slice.

Completed: canonical fallback committed; `AR-2` Markdown negotiation, Agent Skills index/artifact, and progressive read-only WebMCP implemented; targeted Prettier, ESLint, TypeScript, release check, 18 Vitest tests, and 4 Playwright tests passed on 2026-07-22.

Pending: complete and seal `AR-1`; commit `AR-2`; execute `AR-3` full gates, `AR-4` preview/browser QA, and `AR-5` delivery reconciliation; then close the checkpoint.

Owned dirty files: governance/config under `.ai/`, `.github/`, `docs/aegis/`, `AGENTS.md`, `README.md`, `SECURITY.md`, `.coderabbit.yaml`; runtime/tests under `src/app/.well-known/agent-skills/`, `src/app/api/agent/`, `src/components/`, `src/lib/`, `src/proxy.ts`, `src/types/`, `tests/`, `e2e/`, and `playwright.config.ts`; unused `src/app/lib/data.ts` is intentionally deleted.

Unrelated changes: `.vscode/settings.json` is user-owned SonarLint project configuration; preserve it and include it only as an explicit tooling slice. No unexpected concurrent mutation is currently known.

Decisions: see `2026-06-16-public-v1-scope.md`, `2026-06-16-wasm-game-center-demo.md`, `2026-07-20-governance-authority.md`, `2026-07-22-canonical-site-origin.md`, `2026-07-22-manual-release-workflow.md`, and `2026-07-22-agent-readiness-delivery.md`.

Required gates / delivery expectations: focused checks per slice; before push run `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm release:check`, `pnpm test`, `pnpm test:e2e`, `pnpm build`, and `pnpm audit --prod --audit-level high`; then collect pushed, hosted-check, preview, browser, review, merge, and production evidence independently.

Evidence: `local | targeted governance/release/agent-readiness chain | 2026-07-22 | 3b72500 + f825cbc3… dirty fingerprint | passed | 18 Vitest + 4 Playwright | full gates pending`; durable fingerprint and evidence rows live in `docs/aegis/work/2026-07-20-governance-and-agent-readiness/90-evidence.md`.

Hosted state: last observed 2026-07-22, PR #14 was open and mergeable but `BLOCKED / REVIEW_REQUIRED`; JavaScript/TypeScript CodeQL passed while stale Python CodeQL failed; production remained `main` on Vercel behind Cloudflare. Refresh before acting.

Blockers: full gates, preview, required review, hosted checks, merge, and production behavior are not yet proven for the final commit. The stale Python CodeQL lane is hosted configuration debt until refreshed or corrected.

Drift: this file supersedes older mutable status statements. Dated Aegis snapshots remain truthful only for their capture time. Production and PR facts can drift and must be refreshed.

Compatibility boundary: preserve public EN/TR routes, project archive/detail pages, contact flow, Brutalist design system, reduced-motion behavior, public read-only API/catalog/sitemap/robots surfaces, and isolated WASM game center. Do not introduce OAuth, `auth.md`, MCP server card, DNS-AID, Django, Docker, or Kubernetes without accepted prerequisites.

Next action: finish governance corrections, obtain architecture/runtime review, commit focused slices, then run every local gate before push.

Closure / archive condition: archive only after the final commit is merged, the intended production deployment is identified, all required production journeys and discovery endpoints are verified, and the final evidence record links each independent state.
