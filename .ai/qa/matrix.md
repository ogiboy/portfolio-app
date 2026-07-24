# Browser, Accessibility, Performance, and WASM Matrix

Use this matrix to select coverage. A row is complete only when its stated observation is recorded
using the [evidence schema](evidence.md). Baseline required rows apply to every public UI change.

| Area           | Conditions                                      | Required observation                                                              | Risk trigger             |
| -------------- | ----------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------ |
| Route shell    | `/en`, `/tr`; desktop and 390 px                | Equivalent navigation, localized labels/recovery, no horizontal overflow          | Route, copy, navigation  |
| Theme          | Light and dark; persisted choice                | Legible surfaces; `html` class/dataset/color scheme agree                         | Theme, global CSS        |
| Keyboard       | Keyboard only                                   | Visible focus; order; Enter/Space; mobile dialog Escape/close/focus return        | Any control/dialog/nav   |
| Pointer        | Fine and coarse                                 | No hover-only information; coarse path is natural flow                            | Rail, hover, responsive  |
| Motion         | Normal and `prefers-reduced-motion: reduce`     | Purposeful normal motion; equivalent static order/content/recovery                | Motion/client leaf       |
| Save-Data      | `Save-Data: on`                                 | Optional cinematic behavior disabled; no WASM preload                             | Performance, rail, WASM  |
| JavaScript     | Disabled or initial HTML inspection             | Content and ordinary links work; optional behavior is honestly absent             | Server-first, route      |
| Errors         | Localized error and 404                         | Retry plus safe destinations; no false completion                                 | Boundary, routing        |
| SEO/static     | EN/TR representative routes                     | Initial HTML, metadata, canonical/hreflang, JSON-LD, robots/sitemap               | Content, metadata, route |
| Discovery      | API, catalog, agent-skills, Markdown            | Correct status/content type/cache/noindex and source-backed data                  | API, agent discovery     |
| Analytics      | Privacy route, enabled/disabled/storage failure | Opt-out persists; enable is explicit; failure visible                             | Preference, telemetry    |
| WASM idle      | Home, projects, lab before Boot                 | No `/wasm/*` request; no mounted runtime before intent                            | WASM, performance        |
| WASM lifecycle | Lab EN/TR; Boot, ready/error/timeout/retry      | Honest state and new retry attempt; separate-tab recovery                         | WASM protocol/frame      |
| WASM state     | Cleared/unavailable storage when changed        | No false persistence claim; actionable recovery                                   | Storage/runtime          |
| Bundle         | Fresh production build                          | Home growth <= baseline + 15 KiB gzip; Motion < 20 KiB gzip; rail isolation       | Client/build impact      |
| Runtime perf   | Same route/conditions before and after          | LCP, INP, CLS, long tasks, requests, cache state; noise declared                  | Performance claim        |
| CI/release     | Exact commit / provider target                  | Local, push, hosted checks, preview, browser, review, merge, production separated | Push/release             |

## Minimum Matrices by Change Shape

| Change shape               | Minimum rows                                                                                  |
| -------------------------- | --------------------------------------------------------------------------------------------- |
| Markdown/governance        | Route shell only if public content changes; format and link verification otherwise            |
| Server route/content/SEO   | Route shell, JavaScript, SEO/static, discovery as applicable, errors                          |
| Client UI/theme/navigation | Route shell, theme, keyboard, pointer, motion, errors, `pnpm test:e2e`                        |
| Motion/performance         | Client UI rows plus Save-Data, bundle, runtime perf, WASM idle if home/lab imports changed    |
| WASM                       | WASM idle/lifecycle/state, keyboard, reduced motion, Save-Data, bundle, error recovery        |
| Public API/agent discovery | Discovery, SEO/static when advertised, JavaScript/initial response, hosted preview after push |
| Release-sensitive          | All affected rows plus CI/release reconciliation                                              |

## Measurement Boundaries

- Use browser performance APIs or trace output only on the named target and conditions.
- A local trace can prove a local regression or local budget result; it cannot establish production
  p75 Core Web Vitals.
- Compare stable conditions and note cold/warm cache, devtools throttling, extensions, CPU pressure,
  browser version, and any unavailable measurement.
- The executable bundle gate is authoritative for its defined artifacts. Update its baseline only
  through the code owner with a measured, reviewed rationale; this QA guide does not authorize it.
