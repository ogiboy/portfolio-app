# Decision: GSAP Cinematic Motion

## Status

Accepted

## Context

The portfolio should feel distinct and kinetic, but performance and accessibility matter.

## Decision

Use GSAP only in isolated client leaf components. Support `prefers-reduced-motion` and keep mobile motion simpler.

## Consequences

- No global scroll hijacking.
- Motion components stay easy to disable and test.
- GSAP dependency is justified by pinned/scrubbed portfolio storytelling.
