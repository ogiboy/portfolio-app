# Decision: WASM Game Center Demo Strategy

## Status

Accepted and implemented.

## Context

The portfolio should include the `home-media-portal` WASM game center as a live demo. The source project contains a DOSBox/WASM runtime under `public/wasm`, a games panel, an iframe focus overlay, and optional stats APIs. The WASM asset set is about 16 MB, so it should not affect the initial portfolio route.

## Decision

Add the WASM game center to the portfolio roadmap as an isolated live-demo lab. The first implementation should be static and lazy-loaded:

- Serve curated WASM assets from a dedicated public path after license and size review.
- Render the demo in a dedicated route, not on the home page initial payload.
- Use a client leaf for iframe controls and fullscreen state.
- Serve `/wasm/*` through a narrow route handler so WASM and ROM assets have explicit MIME, cache, and security headers.
- Do not copy the home-media-portal stats API, SQLite, or service dashboard code into portfolio v1.
- Keep backend expansion as a separate decision if scores, sessions, ROM management, or authenticated saves become real requirements.

## Consequences

- Portfolio performance remains protected.
- The demo can ship on Vercel without a separate backend.
- The current engine HTML still references CDN-hosted `jquery` and `rivets` scripts inside the sandboxed frame; self-hosting those vendor scripts is the next hardening step when package registry access is available.
- Django, Docker, and Kubernetes remain optional future architecture, not blockers for the first live demo.
- Browser QA hardened the iframe sandbox after implementation: `allow-same-origin` was removed, fullscreen is delegated through the iframe `allow` attribute, and Playwright smoke now asserts the sandbox does not include same-origin escape.

## Amendment

The delivery-detail bullet requiring a Route Handler was superseded on 2026-07-24 by
[`2026-07-24-wasm-runtime-modernization.md`](2026-07-24-wasm-runtime-modernization.md). The product
boundary remains unchanged; static Next.js/Vercel delivery now owns `/wasm/*`, with one effective
header policy in `next.config.mjs`. That modernization also retired the inherited jQuery and Rivets
wrapper dependencies after their live DOM ownership was proven unnecessary.
