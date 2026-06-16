# Design Spec: Portfolio App Overhaul

## Goal
Rebuild the app as a public, client-first hybrid portfolio with EN/TR support, Brutalist Dev Lab design, shadcn primitives, GSAP motion, pnpm tooling, CI gates, and changelog release hygiene.

## Scope
- Public home, project archive, project detail, contact path, and localized copy.
- All existing projects remain available.
- Legacy Auth0/dashboard/Postgres guestbook app code is retired.
- No live database deletion.

## Architecture
- Next.js App Router with Server Components by default.
- Client components only for interactive navigation, theme affordances if retained, GSAP scenes, and project filtering.
- Typed project content model drives archive and detail pages.
- shadcn/Radix primitives provide UI foundation.

## Design Direction
- Brutalist Dev Lab: strong grid, sharp borders, monochrome base, one acid accent, technical typography, intentional kinetic sections.
- No AI-purple/glass default treatment.
- No Inter primary font.
- Motion must respect reduced-motion preferences.

## Delivery
- pnpm is the package manager.
- Node LTS is pinned for CI.
- Commit slices follow the roadmap.
- Release uses `CHANGELOG.md`, CI evidence, and Vercel preview validation.

## Acceptance Criteria
- `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm test:e2e`, `pnpm build`, and production audit pass or documented residual risk is explicit.
- EN/TR public routes render correctly.
- Removed legacy feature imports are not referenced from the public app.
