# Initial Baseline: 2026-06-16

## Repo State

- Branch: `ui-update`.
- Framework: Next.js App Router with `src/app/[locale]` routes.
- Styling: Tailwind CSS v4 with legacy `tailwind.config.mjs` tokens and Google Font CSS import.
- i18n: `next-intl` with `en` and `tr` locales.
- Existing private surface: Auth0 provider, dashboard route, Vercel Postgres guestbook route handlers, Redux theme/modal state.
- Existing content: 18 project records with local images.

## Verification Before Implementation

- `npm run lint` passed.
- `npm run build` passed.
- `pnpm audit --prod` reported vulnerable dependency surface.

## Risks

- Mixed npm/pnpm lockfile state.
- Private feature dependencies not aligned with public portfolio v1.
- Client-heavy motion architecture.
- No CI workflows present.
