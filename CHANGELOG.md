# Changelog

## Unreleased

### Added

- Portable Markdown negotiation for public EN/TR portfolio routes.
- Agent Skills discovery index and digest-bound navigation skill artifact.
- Progressive read-only WebMCP tools with unsupported-browser and reduced-capability fallbacks.
- Project-local ADR lifecycle, sole mutable checkpoint contract, delivery evidence classes, and stricter PR/release templates.
- Localized canonical metadata, reciprocal hreflang links, safe JSON-LD, sitemap alternates, and optional Google verification metadata.
- H.O.T. icon, web app manifest, and generated Open Graph/Twitter cards for consistent browser and social identity.
- Localized privacy pages and a durable opt-out for aggregate Vercel Analytics and Speed Insights.
- Explicit SonarQube Cloud Automatic Analysis scope for maintained source, configuration, workflow, and test files.

### Changed

- Corrected the canonical site origin used by sitemap, API catalog, OpenAPI, and agent discovery.
- Hardened CI, dependency update, CodeRabbit, security, browser QA, and release governance around evidence-backed states.
- Repositioned the site as Halil Oğuzcan Toptaş's developer and homelab portfolio under the H.O.T. identity.
- Converted the retired dashboard route into a permanent compatibility redirect instead of an indexable dead surface.
- Forced Next.js transitive image processing onto patched `sharp@0.35.1` to remove the vulnerable `0.34.x` branch from production resolution.
- Hardened CI installation by disabling package lifecycle scripts by default and rebuilding only the native dependencies approved in the pnpm policy.
- Aligned Vercel install and build commands with the repository's Corepack-managed pnpm pin.
- Raised the stale PostCSS workspace override and removed the duplicate CI pnpm pin that conflicted with current lockfile validation.

### Removed

- Unused legacy data helper left over from the retired dashboard/database surface.

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
- Home-media-portal WASM game center live demo under an isolated localized lab route.
- Explicit Prettier config, ignore rules, and Tailwind-aware class sorting.
- React Compiler package wiring and a PostCSS override that clears the production audit.
- Narrow `/wasm/*` asset route with MIME, cache, and security headers for the retro runtime.

### Removed

- Legacy dashboard/auth/database surface from the public v1 scope.
- npm lockfile drift in favor of `pnpm-lock.yaml`.
