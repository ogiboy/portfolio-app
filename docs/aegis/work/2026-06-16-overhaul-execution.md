# Work Record: Portfolio Overhaul Execution

## Active Plan

Implement the accepted portfolio overhaul roadmap in commit slices on `ui-update`.

## Checkpoints

- Governance records added first.
- Tooling and dependency cleanup follows.
- Public architecture rebuild follows dependency cleanup.
- Verification evidence is recorded before final completion.
- Prettier, Tailwind, shadcn, and WASM game center scope were added after roadmap expansion.
- `pnpm dev` remains Turbopack-based; `pnpm build` uses Webpack because the current Turbopack production build stalls on Next.js 16.2.9.
- PostCSS is overridden to `8.5.15` in `pnpm-workspace.yaml` to remove the production audit finding.
- WASM game center first pass is implemented as `/[locale]/labs/retro-game-center` with copied static assets, lazy iframe boot, and `/wasm/*` route-handler asset serving.
- Remote CI typecheck requires tracked static image module declarations because `next-env.d.ts` remains ignored as a generated local file.
- Release checklist added at `docs/aegis/release/2026-06-16-v0.2.0-checklist.md` with local gates, remote CI, browser QA, and known follow-ups.
- WASM iframe sandbox was hardened to `allow-scripts allow-pointer-lock allow-downloads`, removing `allow-same-origin` to avoid sandbox escape warnings.
- Vercel preview deploy error was traced to pnpm 9 selection. Repo-level `vercel.json` now enables corepack, activates pnpm 11.7.0, and runs `pnpm build`.
- Vercel Node compatibility was aligned by relaxing package engines to `>=24.15.0 <25`; `.node-version` remains the stricter local/CI runtime pin at `24.16.0`.
- Vercel commands now use `corepack pnpm@11.7.0 install --frozen-lockfile` and `corepack pnpm@11.7.0 build` directly.
