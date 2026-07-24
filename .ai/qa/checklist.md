# Risk-Tiered QA Checklist

Select every tier touched by the change. Tiers add evidence; they never replace the required
pre-push `pnpm run ci` gate.

## Tier 1: Documentation, Governance, or Copy

- [ ] Verify changed Markdown is formatted with `pnpm format:check`.
- [ ] Check every referenced path and command exists; use only `package.json` commands.
- [ ] Confirm guidance preserves the active checkpoint as the sole mutable status owner.
- [ ] Confirm no raw QA output, credentials, local runtime state, or screenshots are staged.
- [ ] Verify EN/TR copy changes do not claim project-record localization unless browser evidence
      proves the data model change.

## Tier 2: Server Rendering, Content, and Route Logic

- [ ] Run the smallest relevant Vitest file with `pnpm exec vitest run <path-or-pattern>`.
- [ ] Run `pnpm lint`, `pnpm qa:typescript`, `pnpm typecheck`, and `pnpm typecheck:compat` when
      TypeScript or route ownership changes.
- [ ] Verify EN and TR routes render the same shell, destinations, and recovery actions.
- [ ] Verify static route output, canonical origin, localized canonical URLs, reciprocal
      `hreflang`, Open Graph/Twitter metadata, JSON-LD, `robots.txt`, and `sitemap.xml` when
      routes, content, or SEO changes.
- [ ] Verify public Route Handlers remain thin and read-only; unavailable source facts are labeled
      rather than fabricated.

## Tier 3: Discovery, Privacy, and Agent-Facing Surfaces

- [ ] Exercise `/api/portfolio`, `/api/health`, `/openapi.json`, `/api/docs`, and
      `/.well-known/api-catalog` when their source or contract changes.
- [ ] Exercise `/.well-known/agent-skills/index.json` and the navigation `SKILL.md`;
      verify URLs, media types, cache controls, and source-backed claims.
- [ ] Exercise `/api/agent/markdown` with an allowed public pathname and a rejected unsupported
      pathname; confirm the response is not indexable and does not invent content.
- [ ] Verify analytics starts disabled when a stored opt-out exists, can be explicitly re-enabled,
      and surfaces storage failures honestly. Do not infer field telemetry from a local preference.

## Tier 4: UI, Responsive, and Accessibility

- [ ] Run `pnpm test:e2e` for route or user-journey changes.
- [ ] Test desktop and 390 px mobile layouts in light and dark themes.
- [ ] Complete the affected journey with keyboard only: visible focus, logical tab order, Enter/
      Space activation, Escape and focus return for the mobile dialog.
- [ ] Verify normal-motion desktop behavior communicates Signal, Scan, or Latch purpose; it must
      not hide server-rendered content or trap scrolling.
- [ ] Verify reduced-motion, coarse-pointer, Save-Data, and mobile paths retain source order,
      labels, actions, and recovery without hover-only or pinned-rail requirements.
- [ ] Check visible text, icons, semantic labels, `aria-live` state changes, contrast, zoom, and
      horizontal overflow. Color alone cannot be the only state cue.
- [ ] Exercise localized `error.tsx` and `not-found.tsx` recovery links.

## Tier 5: Performance and WASM

- [ ] Run `pnpm build` followed immediately by `pnpm qa:bundle-budget` for client or build-impacting
      work. The budget gate rejects stale output.
- [ ] Compare the same route, locale, viewport, input mode, theme, reduced-motion, and Save-Data
      conditions before/after a performance change.
- [ ] Record LCP, INP, CLS, long tasks, request count, cache state, and environmental noise when a
      real browser trace is available; do not call one local trace production p75.
- [ ] Confirm home and project routes make no `/wasm/*` requests and the lab makes none before
      explicit Boot.
- [ ] In the lab, verify idle, booting, ready, timeout, error, retry, separate-tab recovery, stale
      message rejection, and storage/state-recovery behavior appropriate to the changed boundary.
- [ ] Confirm `/projects` and lab routes do not receive the cinematic rail chunk, and the Motion
      feature stays inside the enforced gzip budget.

## Tier 6: CI, Preview, Release, and Production

- [ ] Run `pnpm run ci` on the exact intended commit before pushing.
- [ ] Record push, hosted checks, preview, browser QA, review, merge, and production as distinct
      evidence classes; no class substitutes for another.
- [ ] Reconcile each named hosted check independently. Pending, cancelled, infrastructure-failed,
      and unavailable checks are not green.
- [ ] Identify the preview deployment and exercise required EN/TR routes, discovery endpoints, and
      browser matrix against that exact target.
- [ ] After an authorized merge, identify the production deployment and repeat the production route,
      discovery, browser, and relevant performance checks. Do not make external changes as part of
      this checklist.
