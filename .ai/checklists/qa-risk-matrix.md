# QA Risk Matrix

This matrix selects additional evidence; it never weakens the full pre-push `pnpm run ci` gate.

| Tier | Change surface            | Minimum focused evidence                                                            |
| ---- | ------------------------- | ----------------------------------------------------------------------------------- |
| 1    | Docs, copy, governance    | format, links/paths/commands, truthful owner and chronology                         |
| 2    | TypeScript/source logic   | lint, both type lanes, focused Vitest, modularity when shape changes                |
| 3    | Route/content/SEO         | rendered EN/TR HTML, metadata/canonical/hreflang/JSON-LD, navigation                |
| 4    | UI/motion/theme           | desktop/mobile, keyboard, light/dark, reduced motion, coarse pointer, no overflow   |
| 5    | Performance/WASM          | production build, bundle budget, request timing, boot/error/retry, trace/screenshot |
| 6    | Security/provider/release | threat-model negative checks, audit, hosted-state reconciliation, residual risk     |

For each scenario record the exact command/request, environment, timestamp, commit/deployment,
expected result, actual result, artifact, and blocker. Preserve the smallest failing boundary and fix
its owner rather than masking the symptom in presentation code.
