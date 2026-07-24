# Portfolio QA Runbook

## Purpose

Validate what a public visitor, search crawler, and compatible agent discover on the portfolio.
This runbook observes and records; it does not authorize code changes, deployments, merges, DNS
changes, analytics configuration, or provider mutations.

## 1. Establish the Test Boundary

1. Read `AGENTS.md`, `DESIGN.md`, `.ai/architecture.instructions.md`, the active checkpoint, and
   the relevant workflow/checklist.
2. Capture `git status --short --branch`, exact `HEAD`, Node and pnpm versions, target URL, date
   and timezone, locale, viewport, theme, input mode, motion setting, Save-Data setting, and test
   environment.
3. State whether the target is **local**, **preview**, or **production**. Never promote evidence
   between targets.
4. Select the affected rows in [matrix.md](matrix.md) and scenarios in
   [scenarios.md](scenarios.md). Record a skipped row with a reason and strongest fallback.

## 2. Focused Local Loop

Use the narrowest existing command first:

```bash
pnpm exec vitest run <path-or-pattern>
pnpm test:e2e
pnpm lint
pnpm qa:typescript
pnpm typecheck
pnpm typecheck:compat
pnpm build
pnpm qa:bundle-budget
```

`pnpm qa:bundle-budget` requires the immediately preceding fresh production build. Use
`pnpm qa:modularity` if module boundaries or generated WASM compatibility boundaries changed.

For a browser pass, use the app’s Playwright configuration through:

```bash
pnpm test:e2e
```

It owns its local Next dev server. Do not add a different test runner or browser dependency merely
to execute this guide.

## 3. Browser Observation Procedure

For each selected scenario:

1. Open the exact route in EN and TR when the route is localized.
2. Record viewport, color scheme, pointer capability, reduced-motion and Save-Data settings.
3. Observe semantic content and ordinary links before enabling or depending on JavaScript.
4. Use keyboard-only navigation before pointer testing. Check focus visibility, focus order, dialog
   escape/close behavior, and focus return.
5. Repeat the visual path in light and dark themes. Check 390 px mobile separately from desktop;
   natural document flow is the expected mobile and constrained-input behavior.
6. For a motion change, compare normal motion with reduced motion. Confirm server-rendered content
   remains visible if a Motion client leaf fails.
7. Capture the smallest useful screenshot, trace, accessibility report, console/network observation,
   or precise reproduction. Never copy secrets or raw personal data into artifacts.

## 4. JavaScript-Failure and Static Verification

When the changed surface claims server-first resilience, disable JavaScript using the browser’s
normal testing facility or inspect rendered initial HTML. Verify primary content and ordinary
navigation remain usable. Do not expect interactive theme, analytics-preference, mobile-dialog,
Motion, WebMCP, or WASM Boot behavior without JavaScript; record those as intentionally unavailable
rather than broken static links.

For route/discovery changes, inspect rendered output and endpoints for:

- EN/TR canonical and reciprocal language alternatives;
- title, description, Open Graph/Twitter metadata, JSON-LD, manifest, `robots.txt`, and
  `sitemap.xml`;
- the public API catalog, OpenAPI, health, agent-skills index, navigation skill, and agent Markdown
  negotiation responses;
- correct error/404 recovery, status, content type, cache, and noindex behavior where applicable.

## 5. WASM Lab Procedure

1. On home and project pages, inspect network activity and confirm no `/wasm/*` request.
2. Open `/en/labs/retro-game-center` and `/tr/labs/retro-game-center`; before Boot, confirm the
   iframe/runtime is absent and no engine request starts.
3. Activate Boot and observe idle -> booting -> ready or a truthful timeout/error state within the
   20-second contract.
4. For recovery changes, simulate the documented load failure or wait timeout only in a controlled
   local/test environment. Confirm retry makes a new attempt and separate-tab recovery is offered.
5. Confirm stale or unrelated frame messages cannot set ready state. Where browser storage is in
   scope, test unavailable or cleared local storage/IndexedDB and verify the runtime remains honest
   and recoverable rather than silently claiming persistence.

## 6. Full Gate and Delivery Reconciliation

Before push or release-sensitive handoff:

```bash
pnpm run ci
```

Then record independently:

1. **Local:** command output for the exact clean commit.
2. **Pushed:** remote branch contains that commit.
3. **Hosted check:** each provider check and its exact result.
4. **Preview:** named deployment, URL, route/API observations.
5. **Browser:** scenario/matrix observations at the preview target.
6. **Review:** required human approval and advisory reviewer result separately.
7. **Merge:** provider-recorded base branch, merge commit, and time.
8. **Production:** named post-merge deployment and repeated public observations.

Use [evidence.md](evidence.md) for every record. Update neither a parallel QA status file nor a
dated Aegis record to simulate current provider truth.

## 7. Handling Failures

- Preserve the smallest failing command, route, viewport, and condition.
- Classify result as `failed`, `blocked`, `pending`, `unavailable`, or `not run`; never retry until
  green without retaining the first failure context.
- Report expected versus actual behavior, source/route owner, artifact reference, and minimal safe
  repair boundary.
- Store raw output under `artifacts/` only when needed; write durable findings and evidence in
  `docs/aegis/` under the existing record structure. The active checkpoint remains the only mutable
  status owner.
