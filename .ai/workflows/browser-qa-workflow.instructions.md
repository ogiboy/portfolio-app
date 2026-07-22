# Browser QA Workflow

1. Identify the target: local, preview, or production. Do not treat one as evidence for another.
2. Record the URL, date, commit or deployment identifier, viewport, locale, and authenticated state if applicable. Public v1 should not require authentication.
3. Exercise the public EN and TR route shell, navigation, responsive layout, reduced-motion behavior, accessible controls, errors/empty states, and the isolated WASM route when it is in scope.
4. Capture screenshot, video, accessibility output, or a precise reproducible failure. Check rendered behavior, not only source or unit tests.
5. Record the result under the `browser` evidence class. A failed, unavailable, or unrun browser pass is a blocker/gap, never a pass.
