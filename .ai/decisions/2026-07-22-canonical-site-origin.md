# Decision: Canonical Public Site Origin

## Context

Public metadata and discovery endpoints derive absolute URLs from `src/lib/site-url.ts`. Its fallback pointed at a Vercel preview-style hostname, which is not the portfolio's canonical public origin.

## Decision

Use `https://www.oguzcantoptas.com` as the fallback origin. Preserve the intentional `NEXT_PUBLIC_SITE_URL` override, URL-origin normalization, and HTTPS requirement outside localhost.

## Consequences

- Unconfigured builds produce canonical public URLs.
- Preview and other controlled environments can continue to override the origin explicitly.
- This changes source configuration only; it does not alter DNS, provider settings, deployments, or production state.

## Verification

- Focused Vitest coverage verifies the default, a valid normalized override, and rejection of an insecure non-localhost override.
- Focused formatting, lint, and type checks are run with the repository's Node 24/pnpm toolchain.
