# QA Evidence Schema

## Non-Negotiable Ownership

The active `.ai/checkpoints/portfolio-overhaul.md` is the sole mutable status owner for this
workstream. This schema records observations; it does not create a QA summary, status board, or
parallel current-state file. Durable dated evidence belongs in `docs/aegis/` following its existing
record structure. Raw captures stay ignored in `artifacts/`.

## Record Format

Record one evidence item per claim using this template:

```text
class:
target:
timestamp:
source:
environment:
conditions:
expected:
actual:
result:
artifact:
blocker_or_risk:
```

Required field meaning:

- **class:** `local`, `pushed`, `hosted-check`, `preview`, `browser`, `review`, `merge`,
  `production`, or `external`.
- **target:** exact command, URL, provider query, scenario ID, or matrix row.
- **timestamp:** ISO 8601 timestamp with timezone.
- **source:** exact commit plus clean/dirty status, deployment identifier, check URL/name, merge
  commit, or external source identifier. Dirty local evidence also lists included/excluded files and
  a tracked/untracked source fingerprint.
- **environment:** Node/pnpm/browser version as applicable; target kind (local/preview/production).
- **conditions:** locale, viewport, theme, input mode, reduced-motion, Save-Data, JavaScript,
  cache state, and authentication state (public v1 should be unauthenticated) as applicable.
- **expected / actual:** observable contract, not an implementation guess.
- **result:** `passed`, `failed`, `blocked`, `pending`, `unavailable`, or `not run`.
- **artifact:** concise output fact, response header/body digest, screenshot/trace filename and
  checksum, or `none`. Do not put raw secrets, personal data, provider credentials, or unredacted
  logs in a durable record.
- **blocker_or_risk:** `none` or a concrete next boundary; do not call an unavailable check green.

## Example: Local Bundle Gate

```text
class: local
target: pnpm build && pnpm qa:bundle-budget
timestamp: 2026-07-24T12:00:00+03:00
source: 0123456789abcdef (clean)
environment: macOS; Node 24.16.0; pnpm 11.17.0; local
conditions: production build; cold .next output
expected: bundle script accepts fresh build; home and Motion budgets are within limits
actual: exit 0; gate reported the budget, Motion gzip size, and excluded-route rail isolation
result: passed
artifact: docs/aegis/.../90-evidence.md#bundle-budget; raw terminal capture omitted
blocker_or_risk: none
```

## Example: Preview Browser Failure

```text
class: browser
target: S08 /tr/labs/retro-game-center
timestamp: 2026-07-24T12:05:00+03:00
source: preview deployment <id> for commit 0123456789abcdef
environment: Chromium <version>; preview
conditions: 390x844; dark; coarse pointer; reduced motion; Save-Data on; JavaScript enabled
expected: no WASM request before Boot; Boot offers truthful recovery on failure
actual: /wasm/engine/main.wasm requested before the Boot control was activated
result: failed
artifact: artifacts/wasm-preboot-network.har sha256:<digest>
blocker_or_risk: release blocker; isolate pre-intent runtime import in the lab owner
```

## Evidence Class Boundaries

| Class        | It proves                                                   | It does not prove                         |
| ------------ | ----------------------------------------------------------- | ----------------------------------------- |
| local        | Exact command/browser observation on the named local source | Push, CI, preview, merge, production      |
| pushed       | Remote branch contains the named commit                     | Hosted checks or deployed behavior        |
| hosted-check | Named provider check result                                 | Preview browser behavior, approval, merge |
| preview      | Named deployment response/configuration                     | Production behavior                       |
| browser      | Named rendered journey and conditions                       | Field p75, other targets, merge           |
| review       | Required human/advisory review result                       | Hosted pass or merge                      |
| merge        | Provider-recorded merge into named base                     | Production deployment verification        |
| production   | Named post-merge public deployment observation              | Historical or preview state               |
| external     | Dated third-party/specification observation                 | Local implementation or provider state    |

## Artifact Retention

- Keep reproducible raw artifacts in `artifacts/`; its `.gitignore` prevents accidental commits.
- Put only concise, non-sensitive summaries, fingerprints, links, and conclusions in `docs/aegis/`.
- Do not create an `artifacts` index that tracks current QA state, and do not replace provider
  evidence with a screenshot alone.
