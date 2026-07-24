# Evidence: Portfolio Quality and SonarQube Closure

Status: Accepted for clean local source; evidence successor, push, hosted checks, preview, review,
merge, and production remain pending

Captured: 2026-07-24T06:06:53+03:00

Source commit: `9d8ca179234adbf8766d6b944471d16cc05f0456`

Source fingerprint: clean exact implementation source before this evidence-only successor

Accepted source commit: `9d8ca179234adbf8766d6b944471d16cc05f0456`

Supersedes: none

## Evidence Contract

Every row is bound to its exact identifier and environment. The ignored scanner log is locally
reproducible evidence, not a committed artifact. Tokens are intentionally absent. Local SonarQube,
SonarQube Cloud, GitHub checks, preview, merge, and production are independent evidence classes.

## Captured Evidence

| Class        | Exact command, query, or URL                                                                                                   | Timestamp with zone                                        | Identifier / environment                                                             | Result  | Concrete artifact or response fact                                                                                                                                                                                     | Blocker or none                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| local gate   | `source "$HOME/.nvm/nvm.sh" && nvm use --silent 24.16.0 && pnpm run ci`                                                        | `2026-07-24T06:05:50+03:00` to `2026-07-24T06:06:53+03:00` | clean `9d8ca179234adbf8766d6b944471d16cc05f0456`; pnpm 11.17.0                       | passed  | formatting, ESLint, dual TypeScript, JSDoc 86.92%, modularity/release, 27 Vitest files / 120 tests, coverage 88.70/80.93/86.97/90.00, 22 Chromium tests, 64 pages, bundle budgets, no known production vulnerabilities | none for exact source                                |
| local Sonar  | `source "$HOME/.nvm/nvm.sh" && nvm use --silent 24.16.0 && SONAR_SKIP_COVERAGE=1 pnpm sonar:local`                             | completed `2026-07-24T06:03:16+03:00`                      | project `portfolio-app`; revision `9d8ca179234adbf8766d6b944471d16cc05f0456`         | passed  | `@sonar/scan` 5.0.0; 128 indexed files; `QUALITY GATE STATUS: PASSED`; token-redacted ignored log under `.ai/qa/artifacts/sonar/sonar-npm.log`                                                                         | does not prove SonarQube Cloud                       |
| local Docker | `pnpm sonar:start && pnpm sonar:status && docker port sonarqube 9000`                                                          | completed `2026-07-24T06:02+03:00`                         | SonarQube Community Build 26.7.0; PostgreSQL 17; `127.0.0.1:9000`                    | passed  | server status `UP`; Docker published no LAN-facing port; named volumes retained                                                                                                                                        | none                                                 |
| review       | current-code verification of ten PR #31 comments plus focused Vitest                                                           | completed before `2026-07-24T06:01:29+03:00`               | commits `5346bd5`, `66903a0`, `9d8ca17`; 18 focused Sonar/governance/quality tests   | passed  | nine still-valid findings fixed; sitemap-count finding skipped because the current test already included the five required routes; independent reviewer findings were closed                                           | hosted CodeRabbit and owner review remain separate   |
| repository   | `git status --short --branch`; `git rev-parse HEAD`; `gh pr list --state all`; `gh pr view 31 --json ...`                      | captured `2026-07-24T06:03:34+03:00`                       | worktree `dce4`; local `9d8ca17`; PR #31 remote `ecd6779`; base `main`               | passed  | clean local source; PR #29 and #30 merged; PR #31 open and mergeable on its older remote head                                                                                                                          | evidence successor and push pending                  |
| cloud config | parsed `.sonarcloud.properties` and `.github/workflows/sonar.yml`; immutable action tag verification through GitHub repository | captured `2026-07-24T06:01+03:00`                          | project `ogiboy_portfolio-app`; organization `ogiboy`; scan action v8.2.1 commit pin | passed  | LCOV-backed CI owner, Automatic Analysis disabled, no custom host URL, secret-required and untrusted-PR failure policy                                                                                                 | hosted workflow has not executed for local source    |
| pushed       | `git push origin HEAD:chore/dependency-cooldown`; remote OID query                                                             | captured `2026-07-24T06:06:53+03:00`                       | no successor pushed yet                                                              | pending | no remote evidence inferred                                                                                                                                                                                            | evidence successor and exact-tip gate required       |
| hosted-check | GitHub PR #31 checks for the final pushed head                                                                                 | captured `2026-07-24T06:06:53+03:00`                       | historical remote head only                                                          | pending | historical SonarCloud failure does not describe local source                                                                                                                                                           | push and provider execution required                 |
| preview      | Vercel deployment and browser QA for the final pushed head                                                                     | captured `2026-07-24T06:06:53+03:00`                       | none for current local source                                                        | pending | no preview or production behavior inferred                                                                                                                                                                             | push and ready deployment required                   |
| merge        | GitHub merge state and owner approval                                                                                          | captured `2026-07-24T06:06:53+03:00`                       | PR #31 to `main`                                                                     | pending | merge authority remains with the owner                                                                                                                                                                                 | required checks and owner action                     |
| production   | canonical site after owner-approved merge                                                                                      | captured `2026-07-24T06:06:53+03:00`                       | current older deployment                                                             | pending | current production cannot prove this source                                                                                                                                                                            | merge, deployment identification, and post-deploy QA |

## Rollback

- Revert `9d8ca17` to remove the coverage, docstring, CodeRabbit, local SonarQube, and cloud analysis
  gates together without changing earlier portfolio behavior.
- Revert `66903a0` and `5346bd5` independently only if their verified review fixes regress behavior.
- Stop local containers with `pnpm sonar:stop`; retained volumes require separate explicit owner
  authority before deletion.
