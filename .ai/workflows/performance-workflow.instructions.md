# Performance Workflow

Optimize only after measuring the real affected path. A faster-looking animation or green unit test
does not prove route performance.

## Baseline Record

Before changing performance-sensitive code, record:

- route, locale, viewport, input mode, theme, reduced-motion/save-data state;
- exact commit, Node/pnpm version, production or preview target, and timestamp;
- build time, route/static output, relevant JS chunks and gzip size;
- LCP, INP, CLS, long tasks, request count, and cache state when applicable;
- WASM request timing and boot transition when the lab is in scope;
- command/trace/screenshot artifact and known environmental noise.

## Owners

- Server rendering/static generation: route and content owners under `src/app` and `src/content`.
- Client JavaScript: the narrow leaf that imports the behavior.
- Styling/render blocking: `src/app/globals.css`, fonts, and route-owned assets.
- Motion: isolated client leaves and the budgets in `DESIGN.md`.
- WASM: lab route, typed lifecycle/protocol code, `public/wasm`, and `next.config.mjs`.
- CI/install caching: workflow plus pnpm/Next cache configuration; do not infer provider cache hits
  from local output.

## Change Rules

- Fix the measured bottleneck in its canonical owner.
- Prefer deletion, server rendering, static generation, narrower serialization, lazy client leaves,
  and existing framework primitives before new caches or dependencies.
- Do not add skeletons or artificial loading to already static/prefetched routes.
- Do not cache volatile provider, privacy preference, or deployment claims as product truth.
- Keep animation to transform/opacity and remove low-value motion before raising a budget.
- Keep WASM and cinematic chunks out of unrelated routes and prevent pre-intent engine requests.

## Verification

1. Run the smallest focused unit/browser test for the changed behavior.
2. Run `pnpm typecheck`, `pnpm lint`, and `pnpm qa:modularity` when source shape changes.
3. Run `pnpm build` and `pnpm qa:bundle-budget` for client/build-impacting changes.
4. Re-run the same production-browser scenario and compare before/after measurements.
5. Verify reduced-motion, coarse-pointer, save-data, and JavaScript-failure fallbacks where relevant.
6. Run `pnpm run ci` before pushing a coherent performance slice.

Report measured improvement, unchanged budgets, regressions, environmental uncertainty, and the
rollback boundary. Do not claim production p75 improvement from a single local trace; use deployed
Speed Insights for production population evidence.
