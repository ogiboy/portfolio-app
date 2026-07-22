# Evidence: Search, H.O.T. Identity, and Privacy-First Observability

Status: Local accepted; remote and provider rows pending

Captured: 2026-07-23 Europe/Istanbul

Source commit: `1b2e479bbaa6a2b1aa18118b8a0b3116f17170e5`

Supersedes: none

## Evidence Contract

Rows are independent observations. Dirty-tree evidence supports iteration only; the final local-green row must name one clean exact commit. Pushed, hosted-check, preview, review, merge, production, Search Console, and Sentry states require their own live identifiers.

## Captured Evidence

| Class    | Exact command, query, or URL                                                                                                                                 | Timestamp                  | Identifier                                       | Result | Concrete artifact or response fact                                                                                                                | Blocker or none                  |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- | ------------------------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| local    | `pnpm format:check`; `pnpm lint`; `pnpm typecheck`; `pnpm release:check`; `pnpm test`; `pnpm test:e2e`; `pnpm build`; `pnpm audit --prod --audit-level high` | 2026-07-23 Europe/Istanbul | clean `1b2e479bbaa6a2b1aa18118b8a0b3116f17170e5` | passed | Node 24.16.0 and pnpm 11.7.0; 12 Vitest files / 40 tests; six Playwright tests; 60 generated pages; no known vulnerabilities                      | none for exact local commit      |
| local    | `pnpm why sharp`; `pnpm audit --prod --audit-level high`; `pnpm build`                                                                                       | 2026-07-23 Europe/Istanbul | `1b2e479`                                        | passed | one resolved `sharp@0.35.1`; vulnerable `0.34.5` removed from lock resolution; production build compiled successfully                             | none                             |
| local    | production `next start -p 3200` plus `curl` for `/en`, `/tr/projects`, `/en/dashboard`, `/robots.txt`, sitemap                                               | 2026-07-23 Europe/Istanbul | local production build                           | passed | localized titles, canonical/hreflang, OG/Twitter images, 308 redirect, sitemap reference, and canonical sitemap entries                           | none for local iteration         |
| browser  | Playwright Chromium screenshots at 1440x1000 EN and 390x844 TR with `reducedMotion: reduce`, including `/privacy`                                            | 2026-07-23 Europe/Istanbul | local production build                           | passed | H.O.T. identity, responsive layout, reduced-motion content, privacy explanation, and opt-out rendered                                             | preview/production still pending |
| browser  | `/en/opengraph-image`                                                                                                                                        | 2026-07-23 Europe/Istanbul | `/tmp/hot-og-v2.png`                             | passed | visually inspected 1200x630 H.O.T. card with full name, developer/homelab positioning, and signal-flame mark                                      | durable provider card pending    |
| review   | independent code-review agent after opt-out reload, hreflang rationale, and accessible-name corrections                                                      | 2026-07-23 Europe/Istanbul | review `019f8ba0-57cc-70a3`                      | passed | no remaining findings; approval recommended; focused format, lint, typecheck, unit, and browser checks passed on project Node 24.16.0             | GitHub approval remains separate |
| external | official Google Search, Next.js, Vercel Analytics, and Sentry documentation                                                                                  | 2026-07-22 Europe/Istanbul | cited implementation plan                        | used   | technical eligibility and privacy boundaries informed the implementation; no ranking, indexing, Search Console, or Sentry completion was inferred | none                             |

## Pending Evidence

- `pushed`: remote `ui-update` OID containing that commit.
- `hosted-check`: every current GitHub and provider check named and reconciled.
- `preview`: deployment identifier plus representative EN/TR, metadata, privacy, discovery, and WASM journeys.
- `review`: required GitHub approval, distinct from advisory agent/CodeRabbit review.
- `merge`: provider-recorded merge commit, base branch, and timestamp.
- `production`: deployment identifier plus post-merge route, browser, metadata, discovery, and WASM evidence.
- `external`: Search Console verification/submission and Sentry configuration only if their prerequisites are later authorized and proven.

## Review Follow-up Evidence: 2026-07-23

| Class        | Exact command, query, or URL                                                                                                                                 | Timestamp                                   | Identifier                                       | Result                                                | Concrete artifact or response fact                                                                                | Blocker or none                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- | ------------------------------------------------ | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| local        | `pnpm format:check && pnpm lint && pnpm typecheck && pnpm release:check && pnpm test && pnpm test:e2e && pnpm build && pnpm audit --prod --audit-level high` | 2026-07-23T01:38:50+03:00 to 01:39:32+03:00 | clean `5a4bc8f3d35b2cb05b671bdfb6e798698f4b044b` | passed                                                | Node 24.16.0; pnpm 11.16.0; 12 Vitest files / 53 tests; six Playwright tests; 60 routes; no known vulnerabilities | none for the exact local commit                                                       |
| browser      | `pnpm test:e2e`                                                                                                                                              | within the full-gate interval above         | clean `5a4bc8f3d35b2cb05b671bdfb6e798698f4b044b` | passed                                                | Chromium asserted equal 390px client and scroll widths for the mobile TR WASM lab                                 | preview, reduced-motion production screenshot, and deployed production remain pending |
| hosted-check | `gh pr view 14 --json state,mergeable,mergeStateStatus,reviewDecision,statusCheckRollup,headRefOid,url`; `git rev-parse origin/ui-update`                    | 2026-07-23T01:32:06+03:00                   | PR #14; remote `b5d1bbd`                         | hosted checks successful; `BLOCKED / REVIEW_REQUIRED` | CI Verify, JavaScript/TypeScript CodeQL, CodeRabbit, SonarCloud, and Vercel succeeded for the older remote head   | local `306be01` not pushed; required review pending                                   |
