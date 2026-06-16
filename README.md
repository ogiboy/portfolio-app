# Portfolio App

Public EN/TR portfolio for Oğuzcan Toptaş. The current direction is a client-first hybrid portfolio with Brutalist Dev Lab visuals, shadcn/Radix primitives, Tailwind v4 tokens, and isolated GSAP motion.

## Getting Started

Use Node `24.16.0` and pnpm `11.7.0`.

```bash
pnpm dev
```

Open [http://localhost:3000/en](http://localhost:3000/en).

## Scripts

- `pnpm lint`: ESLint with Next.js and Prettier compatibility.
- `pnpm typecheck`: TypeScript verification.
- `pnpm test`: Vitest content and unit checks.
- `pnpm test:e2e`: Playwright public-route smoke checks.
- `pnpm build`: Next.js production build.
- `pnpm audit`: production dependency audit at high severity.

## Architecture

- App Router Server Components by default.
- Client behavior isolated to leaf components under `src/components/client`.
- Public portfolio v1 has no private dashboard, Auth0, or database-backed guestbook.
- Content lives in typed modules under `src/content`.
- Governance records live under `.ai/` and `docs/aegis/`.

## Release Gates

Before preparing a release or push:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
pnpm audit --prod --audit-level high
```

## Deployment

The app is designed for Vercel previews and production deployments.
