# Changelog

## 0.2.0 - 2026-06-16

### Changed

- Reframed the app as a public EN/TR portfolio instead of a dashboard-first experiment.
- Standardized pnpm, Node 24.16.0, Tailwind v4, shadcn/Radix primitives, and App Router defaults.
- Rebuilt the visual direction around a Brutalist Dev Lab system with hard borders, monochrome structure, and acid-green accent tokens.
- Moved Tailwind configuration to CSS-first v4 tokens and removed the parallel Tailwind config file.
- Replaced Google font build fetches with local Geist font package usage.
- Pinned production builds to `next build --webpack` while retaining Turbopack for development and explicit follow-up checks.

### Added

- Project governance records under `.ai/` and `docs/aegis/`.
- Public project archive and localized project detail routes.
- Isolated GSAP work rail with reduced-motion fallback.
- Vitest, Playwright, GitHub Actions CI, and release gate scripts.
- Roadmap scope for a home-media-portal WASM game center live demo.
- Explicit Prettier config, ignore rules, and Tailwind-aware class sorting.
- React Compiler package wiring and a PostCSS override that clears the production audit.

### Removed

- Legacy dashboard/auth/database surface from the public v1 scope.
- npm lockfile drift in favor of `pnpm-lock.yaml`.
