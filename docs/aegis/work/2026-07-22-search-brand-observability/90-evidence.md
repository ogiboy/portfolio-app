# Evidence: Search, H.O.T. Identity, and Privacy-First Observability

Status: Draft; final exact-commit and provider rows pending

Captured: 2026-07-23 Europe/Istanbul

Source commit: `7a186d7 feat: establish hot search and telemetry surfaces` plus owned closeout documentation

Supersedes: none

## Evidence Contract

Rows are independent observations. Dirty-tree evidence supports iteration only; the final local-green row must name one clean exact commit. Pushed, hosted-check, preview, review, merge, production, Search Console, and Sentry states require their own live identifiers.

## Captured Evidence

| Class    | Exact command, query, or URL                                                                                      | Timestamp                  | Identifier                  | Result | Concrete artifact or response fact                                                                                                                | Blocker or none                   |
| -------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------- | --------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| local    | `pnpm lint`; `pnpm typecheck`; `pnpm test`; `pnpm test:e2e`; `pnpm build`                                         | 2026-07-23 Europe/Istanbul | `7a186d7` plus owned docs   | passed | 40 Vitest tests, six Playwright tests, and 60 generated pages                                                                                     | final docs and full gates pending |
| local    | production `next start -p 3200` plus `curl` for `/en`, `/tr/projects`, `/en/dashboard`, `/robots.txt`, sitemap    | 2026-07-23 Europe/Istanbul | local production build      | passed | localized titles, canonical/hreflang, OG/Twitter images, 308 redirect, sitemap reference, and canonical sitemap entries                           | none for local iteration          |
| browser  | Playwright Chromium screenshots at 1440x1000 EN and 390x844 TR with `reducedMotion: reduce`, including `/privacy` | 2026-07-23 Europe/Istanbul | local production build      | passed | H.O.T. identity, responsive layout, reduced-motion content, privacy explanation, and opt-out rendered                                             | preview/production still pending  |
| browser  | `/en/opengraph-image`                                                                                             | 2026-07-23 Europe/Istanbul | `/tmp/hot-og-v2.png`        | passed | visually inspected 1200x630 H.O.T. card with full name, developer/homelab positioning, and signal-flame mark                                      | durable provider card pending     |
| review   | independent code-review agent after opt-out reload, hreflang rationale, and accessible-name corrections           | 2026-07-23 Europe/Istanbul | review `019f8ba0-57cc-70a3` | passed | no remaining findings; approval recommended; focused format, lint, typecheck, unit, and browser checks passed on project Node 24.16.0             | GitHub approval remains separate  |
| external | official Google Search, Next.js, Vercel Analytics, and Sentry documentation                                       | 2026-07-22 Europe/Istanbul | cited implementation plan   | used   | technical eligibility and privacy boundaries informed the implementation; no ranking, indexing, Search Console, or Sentry completion was inferred | none                              |

## Pending Evidence

- `local`: complete package gate chain against one exact clean commit.
- `pushed`: remote `ui-update` OID containing that commit.
- `hosted-check`: every current GitHub and provider check named and reconciled.
- `preview`: deployment identifier plus representative EN/TR, metadata, privacy, discovery, and WASM journeys.
- `review`: required GitHub approval, distinct from advisory agent/CodeRabbit review.
- `merge`: provider-recorded merge commit, base branch, and timestamp.
- `production`: deployment identifier plus post-merge route, browser, metadata, discovery, and WASM evidence.
- `external`: Search Console verification/submission and Sentry configuration only if their prerequisites are later authorized and proven.
