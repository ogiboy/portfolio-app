# Roadmap: H.O.T. Alive Experience

## Status

Active implementation roadmap. Mutable execution state remains in
`.ai/checkpoints/portfolio-overhaul.md`.

## Outcome

Turn the public EN/TR portfolio into a Signal-driven Brutalist Dev Lab whose motion and
state feedback improve orientation, confidence, recovery, and project discovery while
preserving server-first rendering, static routes, and measured performance.

## Delivery Sequence

1. `ALIVE-0`: establish `DESIGN.md`, reconcile Motion authority, and record route, bundle,
   browser, reduced-motion, pointer, save-data, and WASM-request baselines.
2. `ALIVE-1`: make cinematic rail eligibility explicit for desktop fine-pointer users without
   reduced motion or save-data; keep every fallback in natural flow.
3. `ALIVE-2`: replace the WASM boolean with `idle -> booting -> ready | error | timeout`, real
   readiness evidence, retry, and open-separately recovery.
4. `ALIVE-3`: add an isolated Radix Dialog mobile navigation leaf with localized links, focus
   trap, Escape, focus return, scroll lock, and short Latch feedback.
5. `ALIVE-4`: add localized error retry/safe navigation and localized 404 project/home recovery.
6. `ALIVE-5`: extend CSS-first Signal/Latch feedback to route state, hero, cards, locale, CTA,
   and analytics preference without adding perpetual motion.
7. `ALIVE-6`: strengthen archive-detail-next continuity and project storytelling while keeping
   content and SEO in Server Components.
8. `ALIVE-7`: rewrite EN/TR public copy with a human technical voice and source-backed claims;
   remove vague phrases such as "public software".
9. `ALIVE-8`: run unit/component/browser/production-preview/performance/accessibility gates,
   capture screenshots and request traces, then remove any motion that misses its budget.
10. `ALIVE-9`: reconcile hosted checks, review, preview, owner approval, merge, production,
    changelog, release notes, and provider evidence as separate classes.
11. `ALIVE-10`: modernize the isolated DOS/WASM engine behind behavior-parity tests: inventory
    the inherited API and browser matrix, replace callback/promise gaps with one explicit boot
    boundary, remove jQuery and Rivets only after DOM/state ownership is mapped, modularize global
    runtime state where the engine permits it, and retain pinned local assets plus a no-pre-intent
    request boundary. Treat an upstream engine replacement as a separate ADR and migration rather
    than an in-place dependency bump.

## Atomic Task Contract

Each implementation item records:

- user value and current evidence;
- canonical owner and minimum file boundary;
- responsive, reduced-motion, coarse-pointer, save-data, and JavaScript compatibility;
- exact focused and browser verification;
- rollback to equivalent static behavior;
- done criteria tied to observable behavior rather than animation presence.

## Verification Contract

- TDD mode is off; use focused regression tests and real browser verification proportional to
  behavior risk. Do not claim a strict RED/GREEN cycle.
- Run the complete package gate on each pushed source tip.
- Validate production builds with real request timing, no horizontal overflow, console/page
  errors, route chunk isolation, and screenshots at the states listed in `DESIGN.md`.
- Hosted and production states are never inferred from local success.

## Rollback

Every motion slice must roll back to the same semantic content in natural document flow.
WASM recovery can roll back to explicit open-separately behavior. Mobile navigation can roll
back to an always-visible compact link list, not to inaccessible hidden navigation.
