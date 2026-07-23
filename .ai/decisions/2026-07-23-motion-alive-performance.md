# Decision: Alive Motion Within the Performance Budget

## Status

Accepted; supersedes `2026-06-16-gsap-motion.md` for current implementation.

## Context

The Brutalist Dev Lab should feel alive rather than static, but the previous GSAP rail eagerly shipped animation code and the localized route shell was not proving static generation. The portfolio needs cinematic continuity without moving browser behavior toward the server-component root, delaying first paint, or excluding reduced-motion and mobile users.

## Decision

- Treat “alive” as a UX criterion: motion must communicate hierarchy, spatial continuity, system response, or interaction causality. Decorative perpetual motion is not sufficient.
- Replace GSAP with Motion and keep it in isolated client leaves. Load Motion DOM features asynchronously through `LazyMotion`; use motion values for scroll progress instead of React render-state loops.
- Keep the cinematic work rail below the initial viewport. Desktop may use scroll-linked horizontal progression; mobile uses natural vertical flow.
- Preserve identical content, order, and navigation under `prefers-reduced-motion`; remove pinned transforms rather than merely shortening them.
- Call `setRequestLocale` before localized message access so public locale routes can be statically generated. Disable the locale cookie because canonical `/en` and `/tr` URLs own locale state while root `Accept-Language` detection remains available.
- Do not add global route skeletons where static generation and prefetching leave no genuine blocking wait. Keep shape-matched placeholders for real delayed media and the explicit lazy boot for the WASM runtime.
- Keep first-paint work server-rendered. A new animation must prove that it does not enter the critical render path and must have a browser assertion for its intended and reduced-motion states.

## Consequences

- The interface has deliberate scroll and reveal behavior without global scroll hijacking.
- Static locale routes and cookie-free prefixed responses can use framework and edge caching without locale persistence variance.
- Motion remains removable as one leaf-level dependency; normal content and routing continue if the feature bundle fails or the browser requests less motion.
- “More animation” is not automatically “more alive”; added motion requires a communicative job and a measured performance boundary.

## Compatibility and Rollback

The route, content, and project-card contracts do not change. Rolling back the cinematic layer means rendering the same rail as a natural vertical or horizontal layout; it must not require restoring GSAP or locale cookies.
