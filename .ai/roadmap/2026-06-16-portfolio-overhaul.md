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
8. `test: add ci coverage and release gates`
9. `docs: prepare v0.2.0 release notes`

## Acceptance
- Public routes work in English and Turkish.
- Legacy dashboard/Auth0/Postgres guestbook code is retired without live data deletion.
- All existing projects remain available in the archive.
- CI validates lint, typecheck, unit tests, Playwright smoke, build, and production audit.
