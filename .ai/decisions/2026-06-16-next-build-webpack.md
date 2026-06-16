# Decision: Use Webpack for Production Builds

## Status

Accepted.

## Context

Next.js 16 development mode runs successfully with Turbopack after adding
`babel-plugin-react-compiler` and setting `turbopack.root` in `next.config.mjs`.
Production `next build` with Turbopack consistently stalled at
`Creating an optimized production build ...` with no CPU activity, while
`next build --webpack` completed successfully.

## Decision

- Keep `pnpm dev` on Turbopack for fast local iteration.
- Use `next build --webpack` for `pnpm build` and CI release gates.
- Keep `pnpm build:turbopack` as an explicit follow-up check when upgrading
  Next.js, Turbopack, or `next-intl`.

## Consequences

- CI and release builds are deterministic and no longer hang on the current
  Next.js 16.2.9 stack.
- The project still tracks the Turbopack path without blocking the public v1
  release.
