# Agent Operating Guide

## Project Mode
- Development mode: full-auto within the current branch.
- Primary branch for this overhaul: `ui-update`.
- Do not rewrite history or reset user work unless explicitly requested.
- Keep local runtime artifacts out of commits: `.env.local`, `.vercel`, `.next`, `agentdb.rvf`, `agentdb.rvf.lock`, `ruvector.db`, `.DS_Store`.

## Delivery Rules
- Use `pnpm` as the package manager and keep `pnpm-lock.yaml` as the only package lockfile.
- Use conventional commit subjects for every visible commit.
- Prefer small, reviewable commit slices aligned to roadmap phases.
- Run verification before claiming completion or preparing a push.
- Keep changelog and release notes aligned with shipped behavior.

## Architecture Rules
- Default to Next.js App Router Server Components.
- Push client-only behavior into leaf components.
- Keep public portfolio v1 free of private dashboard, Auth0, and database-backed guestbook code.
- Use shadcn/Radix primitives for accessible UI foundations and customize them through project tokens.
- Use GSAP only in isolated client leaves with `prefers-reduced-motion` handling.

## Design Rules
- Direction: Brutalist Dev Lab.
- Avoid generic AI-purple gradients, glassmorphism defaults, and Inter as the primary font.
- Use strong typographic hierarchy, sharp grid structure, monochrome/acid accents, and deliberate motion.
- EN/TR copy must remain complete for public routes.

## Verification Gates
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:e2e`
- `pnpm build`
- `pnpm audit --prod --audit-level high`
