# Portfolio App Overhaul Roadmap

## Objective

Rebuild the portfolio as a public, client-first hybrid portfolio with EN/TR support, Brutalist Dev Lab design language, shadcn primitives, GSAP motion, pnpm tooling, CI gates, and changelog-based release hygiene.

## Commit Slices

1. `chore: add agent governance and roadmap records`
2. `chore: standardize pnpm and node tooling`
3. `fix: update dependencies and remove vulnerable surface`
4. `refactor: rebuild public app architecture`
5. `feat: establish brutalist shadcn design system`
6. `feat: rebuild portfolio content and project pages`
7. `feat: add cinematic portfolio motion`
8. `feat: add wasm game center live demo`
9. `test: add ci coverage and release gates`
10. `docs: prepare v0.2.0 release notes`

## Added Scope: WASM Game Center

- Source: `home-media-portal` WASM game center and retro engine.
- Target: isolated portfolio lab route with a live demo and case-study framing.
- First pass: static public assets, lazy iframe boot, reduced-motion safe shell, no database.
- Later pass: optional Django or service backend only if scores, authenticated saves, ROM catalog management, or telemetry become product requirements.
- Ops showcase: Docker/Kubernetes can be documented as an architecture expansion, but must not become a runtime dependency for the public portfolio launch.

## Quality Tooling Scope

- Add explicit `.prettierrc` and `.prettierignore`.
- Keep Tailwind v4 CSS-first tokens in `src/app/globals.css`.
- Keep shadcn configuration aligned with CSS variables, App Router RSC, and owned component code.
- Keep client components at route leaves and isolate GSAP/WASM browser APIs.
- Keep dev on Turbopack, but run production `pnpm build` through Webpack until the current Next.js 16 Turbopack production build stall is resolved upstream or by dependency upgrades.
- CI gates include formatting, lint, typecheck, unit tests, Playwright smoke, build, and production audit.

## Acceptance

- Public routes work in English and Turkish.
- Legacy dashboard/Auth0/Postgres guestbook code is retired without live data deletion.
- All existing projects remain available in the archive.
- CI validates lint, typecheck, unit tests, Playwright smoke, build, and production audit.
- WASM live demo is planned behind an isolated route and does not increase the home page initial JS or asset payload.
