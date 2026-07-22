# Evidence Bundle Checklist

Record each item as: `class | exact command, provider query, or URL | timestamp with zone | commit, deployment, check, or review identifier | result | concrete artifact or response fact | blocker or none`.

For dirty iteration evidence, also record a source fingerprint: `HEAD`, clean/dirty state, exact included/excluded file scope, tracked diff digest, and untracked tested-source manifest digest. A self-referential evidence file may be explicitly excluded. Dirty evidence can support iteration only; final local-green evidence must identify one clean exact commit.

- `local`: format, lint, type, test, build, or static command output.
- `pushed`: remote branch contains the intended reviewed commit.
- `hosted-check`: each GitHub/provider check is named and reconciled independently.
- `preview`: deployment-specific route, API, and configuration observation.
- `browser`: rendered journey, viewport, locale, accessibility, reduced motion, and artifact.
- `review`: required human approval and advisory review results, kept distinct.
- `merge`: provider-recorded merge commit, base branch, and timestamp.
- `production`: deployment identifier plus post-merge route/API/browser evidence.
- `external`: official specification, public protocol source, or third-party observation with provenance.

Use `not run`, `unavailable`, `pending`, or `failed` as results when applicable. For an aggregate command, record the complete command chain and exact failing phase. A URL without its observed response, a claim without an identifier, or a local pass without its commit is incomplete evidence. No class substitutes for another.
