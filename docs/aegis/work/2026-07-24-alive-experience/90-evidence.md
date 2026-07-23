# Evidence: H.O.T. Alive Experience P0

Status: Accepted for clean local P0 and component-closure source; evidence successor, push,
hosted checks, preview, review, merge, production, and field performance remain pending

Captured: 2026-07-24T01:31:36+03:00

Source commit: `be21e248bbcc9e0c3cfb66fc825120d3c8aa26be`

Source fingerprint: clean exact P0 source with current shadcn component boundaries on
`feat/alive-p0-foundation`

Accepted source commits: runtime/browser baseline
`3ad65547fbc4a960db82ce7721553eb96a10c43b`; current component closure
`be21e248bbcc9e0c3cfb66fc825120d3c8aa26be`

Supersedes: none; extends the dated start snapshot without rewriting its capture state

## Evidence Contract

Rows identify their exact source commit. The earlier local browser and performance probes remain
bound to `3ad6554`; the current component closure is proven by its complete unit, Chromium, build,
and audit gate. Neither class is preview, production, or field p75 evidence. The evidence-only
successor must pass the complete gate before push, and every hosted state must be refreshed against
its own exact head.

## Captured Evidence

| Class           | Exact command, query, or URL                                                                                                                                                      | Timestamp with zone                       | Identifier / environment                                                     | Result  | Concrete artifact or response fact                                                                                                                              | Blocker or none                                                          |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| local-current   | `source "$HOME/.nvm/nvm.sh" && nvm use --silent && corepack pnpm run ci`                                                                                                          | completed `2026-07-24T01:31:36+03:00`     | clean `be21e248bbcc9e0c3cfb66fc825120d3c8aa26be`; Node 24.16.0; pnpm 11.17.0 | passed  | Prettier, ESLint, dual TypeScript toolchains, release check, 18 Vitest files / 72 tests, 13 Chromium journeys, 61 generated pages, and no known vulnerabilities | push, hosted checks, and preview pending                                 |
| local           | `pnpm format:check && pnpm lint && pnpm qa:typescript && pnpm typecheck && pnpm typecheck:compat && pnpm release:check && pnpm test && pnpm test:e2e && pnpm build && pnpm audit` | completed `2026-07-24T01:08:40+03:00`     | clean `3ad65547fbc4a960db82ce7721553eb96a10c43b`; Node 24.16.0; pnpm 11.17.0 | passed  | dual TypeScript toolchains; 18 Vitest files / 72 tests; 13 Playwright journeys; 61 generated pages; no known vulnerabilities                                    | none for exact runtime source                                            |
| browser         | production `next start` plus Playwright viewport, screenshot, focus, route, and WASM probes                                                                                       | `2026-07-24T01:09+03:00` to `01:10+03:00` | local Next.js 16.2.11 production; Chromium; 1440x1000 and 390x844            | passed  | desktop hero and populated rail midpoint; settled mobile menu `left=46.8/right=390/width=343.2`; localized 404; ready WASM; no horizontal overflow              | screenshots are local `/tmp` artifacts, not durable preview evidence     |
| performance     | Playwright Resource Timing and PerformanceObserver probes for Home, Projects, Lab, and a 60-frame rail scroll                                                                     | `2026-07-24T01:10+03:00` to `01:11+03:00` | clean `3ad6554`; unthrottled local loopback                                  | passed  | Home-only async scripts `13,353` transfer bytes; rail scroll emitted no long task; measured CLS `0`; all three routes made zero pre-intent `/wasm/*` requests   | field LCP/INP/CLS and production Speed Insights remain independent       |
| hosted baseline | `gh pr view 29 --json number,state,isDraft,headRefName,headRefOid,baseRefName,mergeStateStatus,statusCheckRollup,url`                                                             | `2026-07-24T01:11:42+03:00`               | PR #29; `630a7bcaa6fcee0dd6403ab6fe53b2ea54fc8c7f`                           | passed  | dependency base open and `CLEAN`; GitHub Verify, CodeQL, SonarCloud, Vercel, and CircleCI successful                                                            | CodeRabbit rerun was rate-limited; owner approval and merge pending      |
| repository      | `git status --short --branch`; `git rev-parse HEAD`                                                                                                                               | `2026-07-24T01:31:36+03:00`               | worktree `dce4`; `feat/alive-p0-foundation`; `be21e24`                       | passed  | clean exact component-closure source before evidence successor                                                                                                  | complete gate required on evidence successor before push                 |
| pushed          | `git push origin feat/alive-p0-foundation`; remote OID query                                                                                                                      | captured `2026-07-24T01:12:12+03:00`      | no remote branch yet                                                         | pending | no pushed evidence inferred                                                                                                                                     | evidence successor and exact-tip gate required                           |
| hosted-check    | GitHub PR checks for the alive branch                                                                                                                                             | captured `2026-07-24T01:12:12+03:00`      | no alive PR yet                                                              | pending | dependency PR checks do not prove the stacked branch                                                                                                            | push and PR required                                                     |
| preview         | Vercel deployment for the alive branch                                                                                                                                            | captured `2026-07-24T01:12:12+03:00`      | none                                                                         | pending | local production screenshots do not prove a provider deployment                                                                                                 | push and ready preview required                                          |
| review          | required owner review                                                                                                                                                             | captured `2026-07-24T01:12:12+03:00`      | no alive PR yet                                                              | pending | no automated or human review inferred                                                                                                                           | PR and owner action required                                             |
| merge           | GitHub merge state                                                                                                                                                                | captured `2026-07-24T01:12:12+03:00`      | target base `chore/dependency-cooldown`                                      | pending | no merge authorized or inferred                                                                                                                                 | owner action required                                                    |
| production      | canonical site after owner-approved integration                                                                                                                                   | captured `2026-07-24T01:12:12+03:00`      | current older production                                                     | pending | older production is not evidence for this branch                                                                                                                | dependency merge, stacked integration, deployment ID, and post-deploy QA |

## Rollback

- Revert `3ad6554` to remove localized recovery without affecting mobile navigation.
- Revert `b3a4079` to remove the mobile Dialog leaf and restore the previous header.
- Revert `b7b9119` to restore the prior WASM shell and static-asset behavior.
- Revert `9df192c` to restore the prior cinematic eligibility behavior.
- Revert `be21e24` to restore the direct Dialog component boundary and pre-migration shadcn package graph.
- Revert `f69375c` only if the interaction contract itself is rejected; implementation commits
  remain independently reversible.
