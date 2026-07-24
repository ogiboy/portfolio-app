# Decision: Harden the Pinned WASM Runtime Before Any Engine Migration

## Status

Accepted.

Amends: `2026-06-16-wasm-game-center-demo.md`

## Context

The lab ships a customized DosWasmX runtime inherited from `home-media-portal`. The local
`main.wasm` SHA-256 exactly matches DosWasmX `v0.3`, whose build recipe pins Emscripten 3.1.49 and a
custom Binaryen build for Wasm exceptions plus Asyncify. Current native DOSBox-X releases do not
provide a drop-in browser artifact, and replacing only the WASM or glue JavaScript would break the
matched build boundary.

The runtime was also being read into a Node Route Handler for every `/wasm/*` response, while the
same cache and security headers were duplicated in `next.config.mjs`. Unhashed assets were marked
immutable for one year, and timestamp/random query values prevented useful browser reuse.

## Decision

- Keep DosWasmX `v0.3` as the pinned engine for portfolio v1.
- Record exact upstream source, GPL-2.0 notice, toolchain constraints, and artifact digests beside
  the runtime.
- Serve `public/wasm` directly through Next.js/Vercel static delivery; keep MIME, CSP, CORS, CORP,
  and cache policy in `next.config.mjs` as the sole header owner.
- Use bounded revalidation for unhashed assets instead of a one-year browser-immutable policy.
- Replace timestamp/random cache busting with the manifest's explicit runtime revision.
- Remove jQuery and Rivets after confirming the stripped frame has no binding attributes and
  replacing every remaining DOM, event, modal, and cloud-read call with browser-native APIs.
- Replace the missing `toastr` global with the engine's own notice boundary, remove the unused
  `eval` formatters, and correct proven IndexedDB availability guards.
- Rename the first-party wrapper's retired Rivets state owner while retaining one compatibility
  alias for the pinned generated glue.
- Gate the generated engine pair by exact digest and ratchet oversized first-party wrappers
  downward without applying misleading source-module line limits to Emscripten output.
- Preserve explicit-intent loading, the opaque-origin sandbox without `allow-same-origin`, and the
  parent-owned boot/error/timeout/retry state machine.

## Consequences

- The large WASM and ROM files no longer consume a serverless function invocation or Node memory
  buffer on each request.
- Browsers can reuse runtime assets while a changed deployment becomes visible without a year-long
  stale URL.
- The engine remains legacy but its provenance, compatibility boundary, and rollback surface are
  explicit.
- The wrapper no longer executes legacy jQuery/Rivets code or relies on undeclared Bootstrap/toastr
  globals.
- New oversized modules fail locally and in CI; existing runtime-wrapper debt can only shrink.
- A future DOSBox-X rebuild or js-dos migration requires a separate ADR, reproducible build, paired
  engine/wrapper replacement, license review, and cross-browser performance baseline.

## Verification requirements

The Accepted status records the architectural decision, not completion of its release checks. A
release implementing this decision is acceptable only when all of the following requirements are
met; this list does not assert that a dated verification run passed:

- Unit tests must parse the effective Next.js header configuration and verify artifact digests.
- Browser tests must verify no pre-intent `/wasm/*` requests, successful boot, explicit failure
  recovery, `application/wasm`, sandbox headers, and non-immutable cache behavior.
- A production build/start smoke must prove static delivery before the change is released.

## Executed evidence

The pinned runtime hardening baseline was exercised on 2026-07-24 and recorded in
[`../../daily/2026-07-24.md`](../daily/2026-07-24.md) and
[`../../docs/aegis/work/2026-07-24-quality-and-sonar/90-evidence.md`](../../docs/aegis/work/2026-07-24-quality-and-sonar/90-evidence.md).
Those records identify the exact historical commits, commands, environments, results, unchanged
generated-artifact boundary, and remaining hosted-check limitation. They are baseline evidence only;
they do not prove a future source-shell migration or release.

Any later release evidence must be recorded chronologically in the active checkpoint, daily log, or
Aegis evidence record with its timestamp, exact commit, environment, command, result, and artifact.

## Rollback

Revert this decision's implementation as one coherent change to the last known-good static engine
tree, manifest revision, and header policy. Do not restore the retired Node Route Handler or a
vendor bundle, and do not partially revert the matched manifest, loader revisions, or runtime
delivery rules.
