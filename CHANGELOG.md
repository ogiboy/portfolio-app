# Changelog

## 0.2.0 - 2026-06-16

### Changed

- Reframed the app as a public EN/TR portfolio instead of a dashboard-first experiment.
- Standardized pnpm, Node 24.16.0, Tailwind v4, shadcn/Radix primitives, and App Router defaults.
- Rebuilt the visual direction around a Brutalist Dev Lab system with hard borders, monochrome structure, and acid-green accent tokens.

### Added

- Project governance records under `.ai/` and `docs/aegis/`.
- Public project archive and localized project detail routes.
- Isolated GSAP work rail with reduced-motion fallback.
- Vitest, Playwright, GitHub Actions CI, and release gate scripts.

### Removed

- Legacy dashboard/auth/database surface from the public v1 scope.
- npm lockfile drift in favor of `pnpm-lock.yaml`.
