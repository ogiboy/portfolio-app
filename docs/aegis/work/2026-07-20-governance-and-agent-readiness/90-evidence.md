# Evidence: Governance and Agent Readiness

Status: Accepted

Captured: 2026-07-22 Europe/Istanbul

Source commit: `3b72500dc4ce82ba6ef22a86d51479f69da12e96`

Source fingerprint: `f825cbc31af30549ff71ec58766c82d33bec9dbc91c644bc257d8d5b39f9c7c8` dirty iteration; tracked diff `3ef8e9890af94f7d56db76bdc380aba7f35e01817e809065e1bca0983248cec0`; untracked 47-file manifest `c14997fde68c4a451b516a032ef44d3c959c99dc89f79f3e228883bfe3d6f640`; self-referential snapshot/evidence files and the active checkpoint excluded

Accepted source commit: `2f2e9d26414a2d0ffd3edd26e4100e782985e14b`

Supersedes: none

## Evidence Contract

Rows are dated observations, not a live dashboard. Each class is independent. Refresh mutable state in `.ai/checkpoints/portfolio-overhaul.md` and append a new dated evidence record after material delivery changes; do not rewrite these rows into later truth.

## Captured Evidence: 2026-07-22

| Class        | Exact command, query, or URL                                                                                                                    | Timestamp                  | Identifier                                 | Result                                                                   | Concrete artifact or response fact             | Blocker or none                                |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------------------------------------ | ------------------------------------------------------------------------ | ---------------------------------------------- | ---------------------------------------------- |
| external     | Cloudflare API queries for `zones?name=oguzcantoptas.com`, DNS records, DNSSEC, Pages projects, Workers, and custom domains                     | 2026-07-22 Europe/Istanbul | zone `oguzcantoptas.com`                   | observed                                                                 | Vercel-proxied apex/www; DNSSEC; no app Worker | read-only observation; refresh before mutation |
| hosted-check | `gh pr view 14 --json state,mergeable,mergeStateStatus,reviewDecision,statusCheckRollup,headRefOid`                                             | 2026-07-22 Europe/Istanbul | PR #14 / head `844ad3e`                    | open, mergeable, `BLOCKED / REVIEW_REQUIRED`; stale Python CodeQL failed | named PR/check states                          | not green                                      |
| preview      | Vercel project/deployment API for project `prj_vhOGgJkbyu5pctyZS6pQ1bAHVyNb` and branch deployment at `844ad3e`                                 | 2026-07-22 Europe/Istanbul | project ID and deployment commit `844ad3e` | deployment ready; preview protected by Vercel SSO                        | provider deployment state                      | public journey not yet verified                |
| production   | Vercel project/deployment API plus `https://oguzcantoptas.com`                                                                                  | 2026-07-22 Europe/Istanbul | production commit `1d4a0c7`                | production still reflected `main`; branch-only behavior not present      | provider commit and public origin              | post-merge behavior unavailable                |
| local        | scoped Prettier + ESLint; `pnpm typecheck`; `pnpm release:check`; five-file Vitest set; `pnpm exec playwright test e2e/agent-readiness.spec.ts` | 2026-07-22 Europe/Istanbul | `3b72500` + `f825cbc3…` dirty fingerprint  | passed                                                                   | 18 Vitest tests and 4 Playwright tests         | full repository gates still pending            |
| pushed       | `git rev-parse origin/ui-update`                                                                                                                | 2026-07-22 Europe/Istanbul | `844ad3e`                                  | pending new slices; remote did not contain local `3b72500`               | remote branch OID                              | push not yet performed                         |
| browser      | local Playwright Chromium against `e2e/agent-readiness.spec.ts`                                                                                 | 2026-07-22 Europe/Istanbul | `3b72500` plus working tree                | passed agent readiness journeys                                          | 4 browser tests                                | full desktop/mobile UI QA pending              |
| review       | required GitHub review state from PR #14                                                                                                        | 2026-07-22 Europe/Istanbul | PR #14                                     | required approval pending; CodeRabbit success remained advisory          | provider review decision                       | `REVIEW_REQUIRED`                              |
| merge        | `gh pr view 14 --json state,mergedAt,mergeCommit`                                                                                               | 2026-07-22 Europe/Istanbul | PR #14                                     | not merged at capture                                                    | provider merge fields                          | review/check reconciliation pending            |

## Closeout Requirement

Full local gates, the final pushed commit, current hosted checks, preview QA, complete browser QA, required review, merge, and post-merge production verification require new evidence tied to their final identifiers. No row above can substitute for those states.

## Iteration Fingerprint Scope

- HEAD: `3b72500dc4ce82ba6ef22a86d51479f69da12e96`.
- State: dirty iteration evidence only, never final local-green evidence.
- Tracked digest input: `git diff --binary` excluding this evidence record, the sibling baseline/checkpoint snapshot, and the active checkpoint.
- Untracked digest input: sorted `git ls-files --others --exclude-standard` entries with each file's SHA-256, using the same four exclusions.
- Combined digest input: the tracked and untracked digest values separated by newlines.
