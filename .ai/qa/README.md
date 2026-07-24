# Portfolio QA Suite

This directory defines how to verify the public H.O.T. portfolio as a rendered,
server-first EN/TR site. It is an operational guide, not a source of product,
release, or provider state.

## Authority and Evidence

- Read `.ai/checkpoints/portfolio-overhaul.md` for the active workstream's only mutable status.
  Do not create a QA summary, current-state file, status board, or parallel task tracker here.
- `DESIGN.md` owns visual, interaction, accessibility, and performance acceptance criteria.
- `.ai/architecture.instructions.md` owns code and product boundaries; package scripts and CI own
  executable delivery gates.
- Record durable, dated evidence and accepted conclusions in `docs/aegis/`; update the active
  checkpoint only when its owner records a real workstream transition. Do not rewrite historical
  Aegis evidence as current provider status.
- Keep raw screenshots, traces, HAR files, Playwright output, and browser exports in
  `artifacts/`. They are intentionally ignored. Reference a retained artifact by fingerprint or
  secure external location from a durable evidence record when needed.

## Contents

- [Risk-tiered checklist](checklist.md): selects the smallest adequate QA gate for a change.
- [Runbook](runbook.md): repeatable local, preview, and production verification procedure.
- [Scenario catalog](scenarios.md): product journeys with expected observable outcomes.
- [Coverage matrix](matrix.md): browser, accessibility, performance, and WASM combinations.
- [Evidence schema](evidence.md): required fields and truthful result vocabulary.

## Scope

The suite covers public routes, EN/TR route parity, static generation and search discovery,
privacy-first analytics preference, agent discovery, normal/reduced motion, responsive navigation,
and the explicit-intent WASM lab. It excludes private/stateful product assumptions and any
assumption that a deployed environment can be mutated during QA.

## Working Rule

Use the smallest relevant focused command while iterating. Before a push or release, use the
complete package gate:

```bash
pnpm run ci
```

An unavailable browser, provider, or command is `unavailable`, not a pass. Local success does not
prove preview, hosted checks, merge, or production; record those as separate evidence classes.
