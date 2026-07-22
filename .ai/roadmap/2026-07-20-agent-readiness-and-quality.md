# Roadmap: 2026-07-20 Agent Readiness and Quality

## Status

Current roadmap authority for governance and closeout work after the 2026-06-16 overhaul.

## Objectives

1. Establish an explicit governance authority order, owner map, evidence bundle, and portfolio-specific review policy.
2. Keep agent discovery truthful, source-backed, and owned by `src/lib` with thin route handlers; prove canonical output independently in local, preview, and production environments.
3. Run real-browser QA for public EN/TR routes, accessibility, reduced motion, and the isolated WASM journey.
4. Deliver the active overhaul PR only after separating local green, pushed commit, hosted checks, preview, browser QA, review approval, merge, and production verification.

## Sequence

1. `AR-1`: establish governance records, workflows, sole mutable checkpoint, ADR/snapshot lifecycle, evidence classes, and executable manual-release checks.
2. `AR-2`: deliver canonical origin, application-level Markdown negotiation, Agent Skills index/artifact, and progressive read-only WebMCP under their runtime owners.
3. `AR-3`: validate source truthfulness and run every local gate against an exact commit with durable evidence.
4. `AR-4`: run one owned desktop/mobile EN/TR, accessibility, reduced-motion, discovery, and WASM browser pass against the intended preview.
5. `AR-5`: reconcile pushed commit, hosted checks, preview, browser, required review, merge, and production from live provider truth.

Current completion state, commit, dirty files, provider observations, and next action live only in `.ai/checkpoints/portfolio-overhaul.md`.

## Deferred Until Prerequisites Exist

- Django, Docker, and Kubernetes.
- OAuth metadata.
- DNS-AID publication.
- `auth.md`.
- MCP card metadata.

## TDD Route

Mode: off. Decision: skipped. Test posture: proportional tests and verification for each runtime batch. No strict RED/GREEN cycle is implied by this roadmap.

These items require real product, identity, deployment, or protocol prerequisites. They are not placeholders for the public v1 portfolio.
