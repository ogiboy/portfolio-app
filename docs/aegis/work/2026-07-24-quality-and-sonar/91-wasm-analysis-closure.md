# Evidence: Legacy WASM Analysis and Modularity Closure

Status: Accepted for exact local implementation source; evidence-record tip, push, SonarQube Cloud,
hosted checks, preview/browser QA, review, merge, and production remain independent

Captured: 2026-07-24T07:41:03+03:00

Source commit: `d6b19ab3332c4e0ee1b116fdbca044379afa4c06`

Source fingerprint: clean exact implementation source before this evidence-only successor

Supersedes: none; this is a chronological successor to `90-evidence.md`

## Boundary

The Sonar scope excludes only the pinned legacy compatibility wrappers
`public/wasm/engine/script.js` and `public/wasm/engine/input_controller.js`. Generated Emscripten
artifacts retain their existing generated-source boundary. Authored `settings.js`,
`runtime-security.js`, both cloud-save adapters, tests, and every future extracted module remain in
local SonarQube and SonarQube Cloud analysis.

The excluded wrappers remain governed by JavaScript syntax checks, security-pattern tests, browser
tests, static-delivery tests, and no-growth modularity limits. Exclusion is not permission to add new
behavior to them. New behavior belongs in a typed or independently tested extracted module that
remains inside Sonar analysis.

## Captured Evidence

| Class                | Exact command, query, or URL                                                                                   | Timestamp with zone                   | Identifier / environment                                                     | Result  | Concrete artifact or response fact                                                                                                                                                                                               | Blocker or none                                        |
| -------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ---------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| predecessor gate     | `source "$HOME/.nvm/nvm.sh" && nvm use --silent 24.16.0 && pnpm run ci`                                        | completed `2026-07-24T07:29:28+03:00` | clean `7706378814c386bd9247d160d1ac03fae6a50500`; pnpm 11.17.0               | passed  | formatting, ESLint, dual TypeScript, 91.59% JSDoc, zero modularity findings, 32 Vitest files / 148 tests, coverage 88.98/81.35/86.97/90.31, 22 Chromium tests, 64 pages, bundle budgets, and no known production vulnerabilities | focused scanner fixes after this commit require rerun  |
| implementation Sonar | `source "$HOME/.nvm/nvm.sh" && nvm use --silent 24.16.0 && pnpm sonar`; local analysis and measures APIs       | completed `2026-07-24T07:38:38+03:00` | project `portfolio-app`; revision `d6b19ab3332c4e0ee1b116fdbca044379afa4c06` | passed  | `@sonar/scan` 5.0.0; 137 indexed files; Quality Gate passed; new coverage 86.5%; new violations 0; total open issues 0; new duplicated-lines density 0.0%; ignored token-redacted log at `.ai/qa/artifacts/sonar/sonar-npm.log`  | does not prove hosted SonarQube Cloud                  |
| scope contract       | parsed `sonar-project.properties`, `.sonarcloud.properties`, architecture owner map, ADR, and governance tests | captured `2026-07-24T07:41:03+03:00`  | commits `1d6a863`, `ebcb781`, `9c56dff`, `7706378`                           | passed  | only two legacy wrappers excluded; authored adapters and extracted modules analyzed; generated artifacts retain prior exclusion; tests prevent blanket WASM exclusion                                                            | none for repository contract                           |
| documentation        | `pnpm qa:docstrings`; `pnpm qa:modularity` within the predecessor full gate                                    | completed `2026-07-24T07:29:28+03:00` | commit `7706378`; 107 configured exports                                     | passed  | JSDoc coverage 91.59% (98/107); zero modularity findings; requested docstrings preserved while project content, bundle analysis, and WASM transport were split                                                                   | none for predecessor source                            |
| repository           | `git status --short --branch`; `git rev-parse HEAD`; `git rev-parse origin/chore/dependency-cooldown`          | captured `2026-07-24T07:41:03+03:00`  | worktree `dce4`; local `d6b19ab`; PR remote `4623479`                        | passed  | clean implementation source was 22 commits ahead before this evidence-only successor                                                                                                                                             | exact-tip gate and push pending                        |
| hosted               | `gh pr view 31 --json number,state,title,headRefOid,mergeStateStatus,statusCheckRollup,url`                    | captured `2026-07-24T07:41:03+03:00`  | PR #31; remote head `4623479d40758cee7a0107981b538d7c86d32f16`               | pending | Verify, CircleCI, and SonarCloud failed on the older head; CodeQL and Vercel passed only for that older source; no hosted state is inferred for `d6b19ab`                                                                        | push successor and reconcile providers without merging |

## Rollback

- Revert `1d6a863` and `ebcb781` together to restore the broader legacy-wrapper analysis scope and
  its governance contract.
- Revert `9c56dff` to return cloud transport behavior to the legacy wrapper; this increases the
  wrapper ratchet and must be accompanied by the prior modularity configuration.
- Revert the focused finding-closure commits from `0a44552` through `d6b19ab` independently if a
  regression is proven; do not lower coverage, JSDoc, or modularity gates as a rollback shortcut.
- Stop local containers with `pnpm sonar:stop`; deleting retained volumes still requires explicit
  owner authority.
