# H.O.T. Design System Instructions

Root `DESIGN.md` is the canonical design contract. This file routes implementation work; it does not
create a second visual authority.

## Product and Direction

H.O.T. is Halil Oguzcan Toptas's public developer and homelab portfolio, project archive, and
isolated browser-technology lab.

Direction: **Signal-driven Brutalist Dev Lab**.

- Geist Sans for display/body and Geist Mono for technical labels.
- Monochrome light/dark surfaces, hard two-pixel borders, square corners, and offset shadows.
- Acid green is the primary interaction signal; the warm flame is a bounded brand accent.
- Deliberate grids, scale, and negative space replace generic card walls, glassmorphism, and SaaS
  gradients.
- Lucide owns interface icons; visible text remains the primary label.

## Server-First UI

- Next.js App Router Server Components own route content, semantic order, metadata, and primary
  links.
- Browser behavior stays in narrow leaves under `src/components/client`.
- Client leaves receive small serializable view models, not route-owned domain objects.
- shadcn/Radix primitives own accessible behavior for real dialogs, menus, and controls; customize
  them through project tokens rather than importing default visual identity.
- Tailwind v4 remains CSS-first in `src/app/globals.css`.
- Static prefetched routes do not gain `loading.tsx`, shimmer, or skeletons without measured async
  blocking work. Loading UI must represent a real wait.

## Alive Interaction

Every movement must communicate intent, hierarchy, location, causality, progress, completion, or
recovery.

- **Signal (80-160 ms):** hover, focus, press, active route/section, link intent.
- **Scan (300-650 ms):** one primary hero/section/rail narrative per route.
- **Latch (160-280 ms):** menu, preference, boot, success, error, and retry completion.

CSS owns short color, border, shadow, opacity, and transform feedback. Motion owns only measured
layout/scroll choreography in isolated leaves, using `LazyMotion`, `m`, and Motion values. GSAP is
superseded and must not return.

## Theme and Responsive Rules

- Light and dark themes expose the same hierarchy, content, focus visibility, and acid-green signal.
- Mobile navigation uses an accessible dialog and exposes Home, Projects, Lab, Process, Contact, and
  locale controls.
- Mobile, coarse pointer, reduced motion, and save-data paths use natural document flow without
  pinning, tilt, spotlight, or parallax.
- Fine-pointer effects cannot hide links, labels, or actions from keyboard/touch users.
- Horizontal overflow is a defect unless the component is explicitly designed and keyboard-tested
  as a horizontal control.

## Truthful States

- Show pending, ready, success, error, timeout, retry, and disabled states only when those states
  really exist.
- Never display fake terminal output, build status, health, uptime, availability, progress, or
  telemetry.
- The WASM lab stays `idle` until explicit Boot intent and then reports
  `booting -> ready | timeout | error` with retry and open-separately recovery.
- Primary content and normal links remain usable when JavaScript or the Motion feature chunk fails.

## Accessibility and Performance

- Keyboard, pointer, and touch users receive equivalent information and actions.
- `prefers-reduced-motion` removes Scan and continuous movement while preserving immediate semantic,
  color, border, and focus feedback.
- Content never starts hidden solely for animation.
- Use compositor-friendly transform and opacity; motion must not create layout shift.
- Respect the budgets in `DESIGN.md` and `pnpm qa:bundle-budget`.
- Verify real desktop/mobile, keyboard, dark/light, reduced-motion, save-data, and WASM network
  behavior in the browser for affected surfaces.

## Avoid

- generic purple AI gradients, glass panels, decorative blobs/orbs;
- dashboard/control-room composition for this public portfolio;
- blocking intros, custom cursors, perpetual pulse/float/marquee effects, or artificial delays;
- card-inside-card nesting and dense fake technical decoration;
- route-wide Client Components or a global Motion provider;
- animation that survives only by violating accessibility or performance budgets.
