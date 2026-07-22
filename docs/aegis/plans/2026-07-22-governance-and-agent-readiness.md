# Plan: Governance and Agent Readiness

## Aegis Visibility

This plan makes owner, authority, checkpoint, and evidence boundaries explicit before the pending public discovery work crosses source, browser, and hosted surfaces.

## Plan Basis and Baseline Usage

- Required baseline refs: `baseline/2026-06-16-initial-baseline.md`, `baseline/2026-07-22-post-change-baseline.md`, and the 2026-07-20 governance work records.
- Cited authority: `AGENTS.md`, `.ai/architecture.instructions.md`, decisions, roadmap, package/CI, and `SECURITY.md` in that order.
- Decision: ready. The runtime scope is explicit; dated hosted observations are evidence only, so recheck volatile provider state before each release action.

## Scope and Non-Goals

Scope: governance documentation plus the approved runtime sequence of canonical origin, Markdown negotiation, Agent Skills index/artifact, and progressive read-only WebMCP.

Non-goals: a separate/stateful backend, auth, database, private dashboard, OAuth, `auth.md`, MCP server card, DNS-AID, a manual provider migration or DNS change, or treating optional development tools as runtime dependencies.

## TDD Route

- Mode: off
- Decision: skipped
- Strict authority: not applicable
- Test posture: proportional post-change tests and verification
- Reason: approved scope specifies proportional validation, not strict TDD.
- Verification: targeted source checks, relevant local gates, preview/browser QA, and production verification after merge.

## Execution Readiness View

- Intent Lock: make discovery behavior truthful without changing public-v1 architecture or hosted infrastructure.
- Scope Fence: use canonical source owners; no auth, stateful backend, DNS-AID, OAuth, or MCP server card additions.
- Baseline Lock: all dated snapshots stay historical. The active checkpoint owns resumable state, and provider/PR/production truth is queried again before action.
- Owners: `src/lib` owns discovery payload construction; `src/app` owns thin route handlers; `src/content` owns localized shell/content; client leaves own browser behavior; browser QA, CI/release, security, and WASM/vendor owners are named in the architecture instructions.

## Task Batches

1. **AR-1 Governance contract.** Establish authority, immutable ADR/snapshot lifecycle, one mutable checkpoint, evidence classes, and executable manual-release checks.
2. **AR-2 Portable discovery.** Correct canonical origin; add app-level read-only Markdown negotiation, Agent Skills index/artifact, and progressive read-only WebMCP through canonical owners.
3. **AR-3 Local verification.** Run focused checks during implementation and every package gate for the final exact commit. Retain command and browser artifacts.
4. **AR-4 Preview and browser QA.** Validate headers/content, EN/TR, desktop/mobile, accessibility, reduced motion, and isolated WASM behavior against the intended preview deployment.
5. **AR-5 Delivery reconciliation.** Record pushed commit, hosted checks, preview, browser QA, review approval, merge, and production verification separately. Resolve or explicitly retain a hosted setup failure; never call it green by implication.

## Compatibility and Retirement Boundaries

- Preserve public EN/TR route behavior and shared source-language project records until data-model localization is separately approved and browser-verified.
- Preserve current HTML behavior when Markdown negotiation is unavailable or not requested.
- Keep Cloudflare as proxy/DNS evidence only; do not create Pages, Worker custom domains, or DNS-AID records without prerequisites and explicit authority.
- Retire temporary compatibility behavior only after canonical origin, preview, and production evidence show no public dependency; record the retirement decision and evidence.

## Review Gates

- Source-owner review: canonical owner, read-only boundary, no auth/stateful backend expansion.
- Local gate: commands and exact commit recorded under the evidence-bundle schema.
- Hosted gate: active PR/provider checks reconciled individually; any hosted setup failure remains a blocker.
- Browser gate: preview journey plus reduced-motion/accessibility evidence; production rerun after merge.
- Security gate: no secrets, credentials, writes, or untrusted discovery content treated as truth.

## Drift and Rewind Rules

- If owner, branch, dirty state, provider state, or public contract drifts, stop the affected batch, update the checkpoint, and return to the last evidence-backed boundary.
- If a compatibility or browser result fails, revert only the scoped runtime batch; preserve unrelated work and historical baselines.
- If hosted state changes, update the active checkpoint and create a new dated evidence record rather than editing historical snapshots.
