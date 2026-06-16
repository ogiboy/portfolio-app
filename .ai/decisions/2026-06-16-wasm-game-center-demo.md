# Decision: WASM Game Center Demo Strategy

## Status

Accepted

## Context

The portfolio should include the `home-media-portal` WASM game center as a live demo. The source project contains a DOSBox/WASM runtime under `public/wasm`, a games panel, an iframe focus overlay, and optional stats APIs. The WASM asset set is about 16 MB, so it should not affect the initial portfolio route.

## Decision

Add the WASM game center to the portfolio roadmap as an isolated live-demo lab. The first implementation should be static and lazy-loaded:

- Serve curated WASM assets from a dedicated public path after license and size review.
- Render the demo in a dedicated route, not on the home page initial payload.
- Use a client leaf for iframe controls and fullscreen state.
- Do not copy the home-media-portal stats API, SQLite, or service dashboard code into portfolio v1.
- Keep backend expansion as a separate decision if scores, sessions, ROM management, or authenticated saves become real requirements.

## Consequences

- Portfolio performance remains protected.
- The demo can ship on Vercel without a separate backend.
- If the runtime needs custom MIME or cache headers, add a narrow route handler for WASM assets.
- Django, Docker, and Kubernetes remain optional future architecture, not blockers for the first live demo.
