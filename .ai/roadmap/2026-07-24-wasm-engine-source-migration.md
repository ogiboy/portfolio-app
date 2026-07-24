# Roadmap: WASM Engine Source Migration

## Status

Proposed implementation roadmap. The active overhaul checkpoint remains the mutable execution
state owner; this document defines the migration boundary and its acceptance contract.

## Outcome

Move first-party DOS runtime shell behavior out of `public/wasm/engine` and into modular,
Next/React-owned source while preserving the current public game-center contract. The browser
must continue to load the matched generated Emscripten glue/WASM pair and the selected game files
from static public URLs. The migration changes ownership and testability, not the DOS emulator
build.

## Current pinned runtime and evidence

- Distribution: [DosWasmX `v0.3`](https://github.com/nbarkhina/DosWasmX/tree/v0.3).
- Emulator core: DOSBox-X revision `59744fe`.
- Recorded toolchain: Emscripten `3.1.49` and the upstream custom Binaryen build required for
  Wasm exceptions plus Asyncify.
- Matched runtime artifact: `public/wasm/engine/main.js` + `public/wasm/engine/main.wasm`.
- Current `main.js` SHA-256: `d6dd83fa43d37b3510ae5ee09307a46fbf4c4ae1afba6d64ca0e7cac64d3f0c2`.
- Current `main.wasm` SHA-256:
  `8c10572678e46fd1fd97d0b23eca8589c8b55aa82e4e9df9fb58160c2bd4631a`.
- Current manifest runtime revision: `doswasmx-v0.3-hot.1`.
- The existing third-party notice at `public/wasm/engine/THIRD_PARTY_NOTICES.md` and
  `public/wasm/engine/licenses/GPL-2.0.txt` remain the provenance and license records.

Do not replace, regenerate, optimize, or hand-edit `main.js` or `main.wasm` in this migration.
The glue JavaScript and WASM binary are a matched build pair. Any digest change requires a
separate reviewed artifact update, manifest revision, license review, and browser baseline.

Compatibility decision: `/wasm/engine/index.html` remains the stable sandbox and open-separately
entrypoint. After cutover it must be a deterministic generated compatibility artifact emitted from
the React-owned runtime source, not a hand-maintained shell, redirect, or second implementation. It
may contain only the document root and bootstrap wiring needed to mount that source-owned runtime;
state, protocol, asset selection, and recovery behavior remain owned by typed source modules.

## Non-goals

- No DOSBox-X, DosWasmX, js-dos, Emscripten, or Binaryen upgrade.
- No reproducible upstream engine rebuild in this roadmap. That is a later phase with a separate
  ADR, source checkout, pinned toolchain/container or equivalent recipe, license evidence, digest
  review, and cross-browser performance baseline.
- No hand-splitting, formatting, or refactoring of generated Emscripten glue (`main.js`).
- No change to ROM/game selection, DOS files, game payload licensing, or emulator behavior.
- No new backend, API, database, authentication, persistence, score service, or ROM management.
- No change to the static `/wasm/*` delivery owner, cache policy, CSP, CORP, MIME policy, or
  explicit-intent loading contract except where a migration test proves the existing contract.

## Source/public ownership map

| Responsibility                                                         | Canonical owner after migration                                                                            | Public artifact rule                                                                                         |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Lab route, localized copy, SEO                                         | `src/app/[locale]/labs/retro-game-center/page.tsx` and existing content/SEO owners                         | Server-rendered route; no runtime boot on initial render                                                     |
| Parent boot lifecycle (`idle`, `booting`, `ready`, `error`, `timeout`) | `src/components/client/wasm-runtime/` and `wasm-game-frame.tsx`                                            | Client leaf owns state and cleanup; explicit boot remains required                                           |
| Parent/engine message protocol                                         | Typed modules in `src/components/client/wasm-runtime/`                                                     | Versioned `hot-wasm` protocol; reject unknown source, attempt, channel, or version                           |
| Runtime shell DOM and engine mount                                     | React-owned client leaf in `src/components/client/wasm-runtime/`                                           | No hand-authored runtime shell HTML/JS remains under `public/wasm/engine`                                    |
| Compatibility frame entrypoint                                         | Runtime entry source in `src/components/client/wasm-runtime/` and deterministic emitter in `scripts/wasm/` | `/wasm/engine/index.html` remains a generated bootstrap artifact with no independent state or protocol owner |
| Asset URLs, manifest validation, revision, and game selection          | Server-safe `src/lib/wasm/` plus typed source data                                                         | Public manifest may be emitted/copied as a generated delivery artifact                                       |
| Static headers and `/wasm/*` delivery                                  | `next.config.mjs`                                                                                          | One effective header owner; no serverless passthrough route                                                  |
| Emscripten glue and compiled emulator                                  | `public/wasm/engine/main.js` and `main.wasm`                                                               | Generated, immutable as source inputs, served as a matched pair                                              |
| Runtime font and other engine-generated support assets                 | `public/wasm/engine/`                                                                                      | Keep as generated public artifacts unless an ownership decision proves otherwise                             |
| DOS/game payloads                                                      | `public/wasm/roms/**`                                                                                      | Generated/copied public artifacts; preserve notices and exact file names                                     |
| Artifact inventory and digests                                         | Checked-in provenance/manifest records                                                                     | Update only with paired artifact evidence and revision bump                                                  |

The migration must not make React import the binary, bundle the ROMs, or depend on Node filesystem
access at runtime. React source may construct public URLs and mount the generated engine; it may
not become a second emulator loader with a different asset contract.

## Modularity budgets and gates

These budgets apply to authored source only. Generated `main.js`, `main.wasm`, fonts, and game
payloads are excluded from source-line budgets but remain covered by artifact and browser tests.

- A runtime leaf or protocol module: at most 240 physical source lines.
- The runtime composition/orchestration leaf: at most 180 physical source lines.
- No authored WASM migration module: more than 460 physical source lines, even temporarily at a phase
  boundary.
- One responsibility per module: lifecycle, protocol, asset selection, DOM adapter, and notice/
  recovery logic must be separable and independently testable.
- No module may own both public asset generation and browser state.
- No untyped `window` protocol payloads, `eval`, jQuery, Rivets, toastr, or hidden retry. The only
  allowed global singleton is the typed compatibility facade required by the pinned generated
  `myApp` ABI; no product state may escape through a second global owner.

Gates:

1. Add a focused Vitest modularity test that enumerates the migration source directory, ignores
   declarations/comments, enforces the budgets, and fails with the owning path and count.
2. Keep `pnpm test` green with the focused WASM suites and the modularity test included.
3. Keep `pnpm format:check`, `pnpm lint`, `pnpm qa:typescript`, `pnpm typecheck`,
   `pnpm typecheck:compat`, `pnpm release:check`, `pnpm test`, `pnpm test:e2e`, `pnpm build`,
   `pnpm qa:bundle-budget`, and `pnpm audit --prod --audit-level high` green before a pushed
   migration tip. These are the repository's current delivery commands; an unavailable gate is
   a blocker, not a pass.
4. The generated public tree must contain no hand-authored runtime shell implementation after the
   cutover. A static inventory test must require `/wasm/engine/index.html` as the generated
   compatibility bootstrap, allow the other named generated artifacts, and reject stale wrapper
   files, duplicate protocol implementations, and legacy vendor dependencies.

## Delivery phases

### WASM-0 — Baseline and inventory

- Record the current dirty-worktree state before edits; do not overwrite concurrent work.
- Inventory every current public shell responsibility in `index.html`, `input_controller.js`,
  `script.js`, `settings.js`, and `romlist.js`, including DOM nodes, event listeners, globals,
  IndexedDB reads, canvas setup, engine callbacks, notices, asset URLs, and `postMessage` paths.
- Classify `index.html` separately as the compatibility URL to retain: inventory its current shell
  behavior for migration, then reduce it to the generated document-root/bootstrap contract rather
  than deleting or redirecting it.
- Freeze the current manifest revision and both artifact digests above. Record a browser request
  trace for no-pre-intent, successful boot, 404 recovery, timeout, retry, and open-separately.
- Add characterization tests before moving behavior. The baseline must pass the existing
  `tests/wasm-delivery.test.ts`, `tests/wasm-game-frame.test.tsx`, and the WASM journeys in
  `e2e/smoke.spec.ts`.

### WASM-1 — Typed source boundary

- Create a small `src/lib/wasm/` boundary for manifest/runtime revision parsing, safe public URL
  construction, game-file selection, and immutable runtime constants.
- Create `src/components/client/wasm-runtime/` modules for the message schema, state reducer,
  boot attempt identity, timeout/retry policy, and DOM/engine adapter interface.
- Keep `WasmGameFrame` as the public composition boundary while moving logic behind it. Preserve
  the existing iframe protocol first; do not combine the ownership migration with a transport
  rewrite.
- Test malformed messages, stale attempts, wrong source windows, duplicate terminal signals,
  unmount during boot, retry after failure, and timeout cleanup.

### WASM-2 — React-owned runtime shell

- Replace the authored public shell with a React-owned client leaf that renders the runtime
  surface and owns listeners, status notices, focus, cleanup, and explicit boot.
- Add a deterministic emitter for `/wasm/engine/index.html`; its input must be the same React-owned
  runtime entry and its output must contain no independent lifecycle, protocol, asset-selection, or
  recovery implementation.
- Load generated `main.js` and `main.wasm` only from their stable `/wasm/engine/*` URLs. Keep the
  game payload list and startup configuration externally addressed under `/wasm/roms/*` and the
  manifest revision.
- Preserve the opaque-origin iframe/sandbox boundary unless a separate security review proves a
  narrower equivalent. Do not add `allow-same-origin` merely to simplify integration.
- Keep parent-owned `idle -> booting -> ready | error | timeout`, 20-second timeout behavior,
  retry, and open-separately recovery. A failed boot must remove the active runtime surface and
  expose a truthful recovery action.

### WASM-3 — Cutover and artifact guard

- Remove only the now-unused authored shell files from `public/wasm/engine`; retain the generated
  compatibility `index.html`, `main.js`, `main.wasm`, support artifacts, manifest/delivery records,
  and all game payloads.
- Add the static inventory and provenance assertions. Ensure a production build copies/serves
  the same generated public artifact paths without bundling them into the route's initial JS.
- Run the focused unit/component tests, then the WASM browser journeys, then the complete package
  gate. Compare request paths, response headers, console errors, boot timing, and mobile layout
  against the WASM-0 baseline.
- Keep the migration reversible until the cutover has passed the production-start smoke and the
  owner has reconciled local, hosted, preview, browser, and production evidence separately.

### WASM-4 — Separate future engine rebuild (deferred)

Open only after WASM-3 is complete and a new ADR is accepted. Reproduce DosWasmX or select a
replacement from pinned source and toolchains, build `main.js`/`main.wasm` as a matched pair,
record provenance/licenses/digests, run the full compatibility and performance matrix, and
release with an explicit artifact revision. This phase must not be smuggled into the source-shell
migration.

## Exact verification contract

The migration is accepted only when these existing suites are extended and pass:

- `tests/wasm-delivery.test.ts`: static ownership, no route handler/vendor tree, exact manifest
  revision, `main.wasm` digest, security/cache/MIME headers, no legacy wrapper dependencies,
  required generated compatibility `index.html`, and generated-artifact inventory.
- `tests/wasm-game-frame.test.tsx`: explicit boot, state transitions, stale-message rejection,
  timeout, retry, unmount cleanup, keyboard/focus behavior, and no duplicate listeners.
- `tests/wasm-runtime-source.test.ts`: source ownership, typed protocol validation, reducer and
  asset-boundary behavior, modularity budgets, and absence of authored shell code in public.
- WASM cases in `e2e/smoke.spec.ts`: zero `/wasm/*` requests before intent; successful boot loads
  `main.wasm` and `DOOM1.WAD`; direct `/wasm/engine/index.html` access remains the generated
  open-separately entrypoint without redirecting; `application/wasm`, CSP, sandbox, timeout/404
  recovery, retry, IndexedDB-unavailable boot, localized EN/TR routes, mobile no-overflow, and no
  page/console errors.
- Production smoke: after `pnpm build`, serve the production output with `pnpm start` and repeat
  the same public asset requests and browser journey. Do not infer this from unit tests.

Before implementation changes, run the current focused suites and capture their output. After each
phase, rerun the focused suites; before release, run the repository delivery commands listed in
the gate section at the exact source tip. Artifact digests must be recalculated only when an
artifact is intentionally changed; an unexpected digest change fails the migration.

## Compatibility and rollback rules

- Preserve `/en/labs/retro-game-center`, `/tr/labs/retro-game-center`, the generated
  `/wasm/engine/index.html` sandbox/open-separately entrypoint without redirect, and every
  `/wasm/roms/**` payload URL.
- Preserve the `hot-wasm` version-1 message shape, attempt correlation, ready/error statuses,
  timeout/retry semantics, opaque-origin sandbox, and no-pre-intent request boundary.
- Roll back by switching the route/component to the last known-good iframe shell and restoring
  the authored public shell files as one matched commit. Never roll back only `main.js`, only
  `main.wasm`, only the manifest revision, or only the wrapper.
- If the source shell boots but a generated artifact fails, stop the cutover and restore the
  previous shell; do not retry a potentially changed paid/external effect, mutate public assets,
  or silently fall back to a different engine.
- Keep the old and new shell paths available only during a bounded local/preview compatibility
  window. Remove the old path after all gates pass; do not maintain two permanently divergent
  implementations.

## Done criteria

- First-party DOS shell behavior is owned by small, typed Next/React modules with no duplicate
  public implementation.
- `/wasm/engine/index.html` remains a deterministic generated compatibility bootstrap whose
  inventory and direct-open browser checks prove it has no independent state or protocol owner.
- `public/wasm/engine/main.js` and `main.wasm` remain the unchanged, matched DosWasmX v0.3
  generated artifacts unless a separately approved artifact change is recorded.
- Game payloads remain static public artifacts with unchanged names, notices, and manifest
  selection semantics.
- No hand-split generated Emscripten glue exists, and no upstream engine rebuild is implied.
- All modularity, source-inventory, unit/component, browser, production-start, package, and
  artifact-digest gates pass at one exact source tip.
- EN/TR explicit boot, ready, error, timeout, retry, open-separately, reduced-motion-equivalent,
  mobile, and failure-recovery journeys are browser-verified.
- Rollback is documented, tested against the previous shell path, and does not require changing
  the generated engine pair independently.
