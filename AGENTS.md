# Agent Operating Guide

## Authority Order

Apply project guidance in this order:

1. This `AGENTS.md` defines operational rules.
2. `.ai/architecture.instructions.md` defines the current owner map.
3. `.ai/decisions/` records accepted rationale.
4. `.ai/roadmap/` records future sequence.
5. `.ai/checkpoints/portfolio-overhaul.md` records the sole mutable state of the active overhaul.
6. `docs/aegis/` records dated initiative intent, plans, snapshots, and evidence.
7. `package.json` defines local commands.
8. CI enforces the remote verification contract.
9. `SECURITY.md` defines vulnerability reporting.
10. CodeRabbit is advisory review guidance only and does not override any item above.

## Working Rules

- Work within the current branch and preserve unrelated user changes.
- Use pnpm and keep `pnpm-lock.yaml` as the only package lockfile.
- Do not rewrite history, reset user work, deploy, publish, change DNS, or use credentials without explicit authority.
- Keep local runtime artifacts out of commits: `.env.local`, `.vercel`, `.next`, `agentdb.rvf`, `agentdb.rvf.lock`, `ruvector.db`, `.DS_Store`.
- Use conventional commit subjects for visible commits.
- Keep diffs focused, reversible, and aligned to the current owner map.
- Use project-local capabilities progressively: load one to three relevant skill bodies, then stop unless more context is required.

## Architecture and Product Boundaries

- This is a client-facing, server-first public EN/TR portfolio.
- Default to Next.js App Router Server Components. Push browser-only behavior into leaf components.
- Public portfolio v1 has no separate or stateful backend, authentication, database, private dashboard, Auth0, or database-backed guestbook.
- Thin, read-only Next.js Route Handlers are part of the server-first app.
- Keep shadcn/Radix primitives accessible and customized through project tokens.
- Use GSAP only in isolated client leaves with `prefers-reduced-motion` support.
- Keep Tailwind v4 CSS-first configuration in `src/app/globals.css`.
- Keep the WASM game center behind its isolated lab route with lazy loading and no home-page payload impact.

## Design and Content Rules

- Direction: Brutalist Dev Lab with sharp grid structure, monochrome base, acid accents, and deliberate motion.
- Avoid generic AI-purple gradients, glassmorphism defaults, and Inter as the primary font.
- The EN/TR route shell and `siteCopy` are localized. Project records currently remain shared source-language content.
- Never claim complete project-content parity until the data model is localized and browser-verified.

## Verification

- During a focused slice, run the smallest relevant checks for the touched surface.
- Before any push or release, run every gate in `package.json`: `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm release:check`, `pnpm test`, `pnpm test:e2e`, `pnpm build`, and `pnpm audit --prod --audit-level high`.
- An unavailable required check is a blocker, not a pass. Record the reason and next action without fabricating success.
- For UI work, verify the real browser journey and relevant failure behavior, not only static checks.
