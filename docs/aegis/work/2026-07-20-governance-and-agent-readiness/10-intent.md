# Intent: Governance and Agent Readiness

## Status

Historical initiative intent, retained as recorded on 2026-07-20. Mutable status lives only in `.ai/checkpoints/portfolio-overhaul.md`; provider truth must be re-queried before action.

## Intent

Make portfolio governance strict, domain-correct, and internally consistent while preserving the existing client-facing, server-first public v1 architecture.

## Scope

- Define authority order and current ownership.
- Add portfolio-specific security, CI, Dependabot, CodeRabbit-advisory, workflow, checkpoint, and evidence policy.
- Record truthful agent-discovery and browser QA expectations.
- Mark historical 2026-06-16 records correctly and define PR closeout sequence.

## Non-Goals

- Runtime source, tests, E2E, dependencies, lockfiles, WASM assets, or hosted GitHub settings.
- Django, Docker, Kubernetes, OAuth metadata, DNS-AID publication, `auth.md`, or MCP card metadata.
- Deployment, publishing, DNS, credential access, or external writes.

## Baseline References

- Branch `ui-update`; PR #14 exists.
- `AGENTS.md`, `README.md`, `SECURITY.md`, `.coderabbit.yaml`, and `.github/workflows/ci.yml`.
- `.ai/` and `docs/aegis/` records listed in the governance slice.

## TDD Route

Mode: off. Decision: skipped. Test posture: configuration and document validation only.
