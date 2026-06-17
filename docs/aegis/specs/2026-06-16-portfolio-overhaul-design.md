# Design Spec: Portfolio App Overhaul

## Goal

Rebuild the app as a public, client-first hybrid portfolio with EN/TR support, Brutalist Dev Lab design, shadcn primitives, GSAP motion, pnpm tooling, CI gates, and changelog release hygiene.

## Scope

- Public home, project archive, project detail, contact path, and localized copy.
- All existing projects remain available.
- WASM game center live demo is included as an isolated lab route after asset size review.
- Legacy Auth0/dashboard/Postgres guestbook app code is retired.
- No live database deletion.

## Architecture

- Next.js App Router with Server Components by default.
- Client components only for interactive navigation, theme affordances if retained, GSAP scenes, and project filtering.
- Typed project content model drives archive and detail pages.
- shadcn/Radix primitives provide UI foundation.
- WASM demo runs as a lazy client leaf with static assets and a narrow asset route for MIME/cache control.

## Backend Position

- v0.2.x does not need Django, Kubernetes, or a separate backend for the WASM demo.
- Reconsider Django only for durable scores, authenticated saves, ROM catalog administration, or cross-project API reuse.
- Docker/Kubernetes can be an ops case study, not a launch dependency.

## Design Direction

- Brutalist Dev Lab: strong grid, sharp borders, monochrome base, one acid accent, technical typography, intentional kinetic sections.
- No AI-purple/glass default treatment.
- No Inter primary font.
- Fonts are self-hosted through the `geist` package, not fetched from Google during builds.
- Production builds use `next build --webpack` until the current Turbopack production build stall is resolved; local development remains Turbopack.
- Motion must respect reduced-motion preferences.

## Delivery

- pnpm is the package manager.
- Node LTS is pinned for CI.
- Formatting is explicit through Prettier and Tailwind-aware class sorting.
- Commit slices follow the roadmap.
- Release uses `CHANGELOG.md`, CI evidence, and Vercel preview validation.

## Acceptance Criteria

- `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm test:e2e`, `pnpm build`, and production audit pass or documented residual risk is explicit.
- `pnpm format:check` passes before CI completion.
- EN/TR public routes render correctly.
- Removed legacy feature imports are not referenced from the public app.
