# H.O.T. Portfolio Design System

## Product Read

H.O.T. is Halil Oguzcan Toptas's public developer and homelab portfolio: a client-facing
body of work, a practical engineering notebook, and an isolated browser-technology lab.
The interface should feel like a live instrument without pretending that static data is a
real-time service.

Direction: **Signal-driven Brutalist Dev Lab**

- Design variance: 7/10
- Motion intensity: 7/10
- Visual density: 4/10
- Languages: EN and TR with equivalent routes, actions, and recovery

## Visual Grammar

- Geist Sans owns display and body typography; Geist Mono owns labels and technical data.
- Monochrome surfaces, hard two-pixel borders, square corners, and offset hard shadows form
  the structural language.
- Acid green is the primary interaction signal. The warm H.O.T. flame is a brand accent,
  not a second primary color.
- Layouts should expose hierarchy through grids, scale changes, and deliberate negative
  space rather than generic cards, glass effects, or decorative gradients.
- Every icon comes from Lucide and is decorative unless it communicates information that
  is not already present in visible text.

## Alive Contract

An alive interface notices intent, explains state, and preserves continuity. Motion is
accepted only when it communicates hierarchy, location, causality, progress, completion,
or recovery.

An alive interface does not use blocking intros, fake terminals, fake health data, custom
cursors, perpetual pulse/float/marquee effects, artificial delays, or skeletons for routes
that are already static and prefetched.

### Signal

Purpose: acknowledge hover, focus, press, route state, section state, and link intent.

- Duration: 80-160 ms
- Default easing: `steps(2, end)` for hard mechanical accents or a short ease-out
- Preferred properties: color, opacity, transform, border color, and hard-shadow offset
- Pointer, keyboard, and touch users receive equivalent information

### Scan

Purpose: reveal hierarchy and carry the visitor through one primary scene per route.

- Duration: 300-650 ms
- Home may own one desktop cinematic work rail
- Scroll-linked values use Motion values, never frame-by-frame React state
- Server-rendered content starts visible and remains usable if Motion fails
- Mobile, reduced-motion, coarse-pointer, and save-data paths use natural document flow

### Latch

Purpose: make a state transition visibly settle.

- Duration: 160-280 ms
- Used for menus, pending-to-ready transitions, success, error, retry, and preferences
- Completion is never shown before the underlying operation completes
- Status changes use semantic text and `aria-live` where visual change alone is insufficient

## Interaction Tokens

CSS owns short state feedback. Motion owns measured layout and scroll choreography only.

| Token              | Value                            | Owner                           |
| ------------------ | -------------------------------- | ------------------------------- |
| `--motion-signal`  | `140ms`                          | hover, focus, press             |
| `--motion-scan`    | `520ms`                          | section and hero arrival        |
| `--motion-latch`   | `220ms`                          | menu and async state completion |
| `--ease-signal`    | `steps(2, end)`                  | mechanical response             |
| `--ease-scan`      | `cubic-bezier(0.22, 1, 0.36, 1)` | spatial continuity              |
| `--shadow-pressed` | `3px 3px 0 var(--shadow-hard)`   | active controls                 |

Reduced motion removes Scan and continuous Signal movement. It may retain immediate color,
border, and semantic state changes. No content may depend on animation to become visible.

## Responsive Behavior

- Below 768 px, navigation uses an accessible modal menu and document content stays in
  natural vertical flow.
- Coarse-pointer devices do not receive hover-only tilt, spotlight, parallax, or pinned rail
  behavior regardless of viewport width.
- `Save-Data: on` disables optional cinematic behavior and does not preload the WASM runtime.
- Fine-pointer enhancements must not be required to discover a link, label, or action.
- Horizontal overflow is a defect unless it belongs to an explicitly keyboard-accessible
  horizontal control.

## Architecture Contract

- Next.js App Router Server Components own routes, content, metadata, semantic order, and
  primary links.
- Browser behavior lives in narrow leaves under `src/components/client`.
- CSS is the first owner for hover, focus, press, color, and short opacity/transform changes.
- Motion uses `LazyMotion` and `m` in isolated leaves. There is no global Motion provider and
  GSAP does not return.
- Client leaves receive narrow serializable view models rather than route-owned domain data.
- Radix primitives own focus management only where a real dialog/menu need exists.
- Static routes do not gain `loading.tsx` or skeletons without measured blocking work.
- The WASM runtime is requested only after explicit user intent and reports honest idle,
  booting, ready, timeout, and error states with retry and open-separately recovery.

## Accessibility Contract

- Keyboard and pointer users can reach the same content and actions.
- `:focus-visible` remains obvious against every surface.
- State is not conveyed by color alone.
- Mobile dialog navigation supports focus trap, Escape, close controls, and focus return.
- Reduced-motion content order and navigation are identical to the animated experience.
- With JavaScript unavailable, primary content and ordinary links remain usable.
- Error and not-found surfaces explain recovery without blaming the visitor.

## Performance Budget

- Production p75 targets: LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1.
- Home initial JavaScript may grow no more than 15 KB gzip from the recorded baseline.
- The optional Motion feature chunk should remain below 20 KB gzip.
- Motion must not create a long task above 50 ms in the tested scroll trace.
- `/projects` and lab routes must not load the cinematic rail chunk.
- Home and project routes must not request `/wasm/*`; the lab must not request it before Boot.
- Animation uses compositor-friendly transform and opacity and must not create layout shift.

## P0 Acceptance

- The desktop rail shows meaningful content at entry, midpoint, and exit without a blank frame.
- Reduced-motion, coarse-pointer, save-data, and mobile paths show every project in source order.
- Mobile navigation exposes Home, Projects, Lab, Process, and Contact in EN/TR.
- WASM boot reaches ready or an actionable recovery state within 20 seconds.
- Error boundaries offer retry and safe navigation; 404 offers localized recovery routes.
- Browser evidence covers desktop, 390 px mobile, keyboard, reduced motion, and request timing.

## Non-Goals

- No separate backend, authentication, database, Django, Docker, or Kubernetes for public v1.
- No stateful agent service, OAuth surface, MCP server card, or fabricated live telemetry.
- No global skeleton system, route-wide client conversion, or motion dependency expansion.
- No visual effect survives if it breaks accessibility, content truth, or the performance budget.

## Authority and Drift

This file is the current design contract. The accepted Motion ADR and architecture guidance
govern implementation detail. Historical 2026-06-16 GSAP references remain unchanged as
dated records and are superseded by the accepted 2026-07-23 Motion decision and this file.
