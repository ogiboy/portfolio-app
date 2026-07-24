# Intent: Portfolio Quality and SonarQube Closure

Status: Accepted for implementation

Captured: 2026-07-24T06:06:53+03:00

Source commit: `9d8ca179234adbf8766d6b944471d16cc05f0456`

Source fingerprint: clean exact review, coverage, documentation, and scanner implementation on
`feat/alive-interactions` before this evidence-only successor

Supersedes: none

## Intent

Turn portfolio review and quality expectations into executable local and hosted gates while keeping
local SonarQube, SonarQube Cloud, CodeRabbit, Vitest, and JSDoc evidence explicit and independently
auditable.

## Scope

- Resolve only PR findings that remain valid against current code.
- Enforce 80% Vitest coverage in every metric and 80% JSDoc coverage across a meaningful export set.
- Preserve the complete repository-specific CodeRabbit v2 configuration surface.
- Provide local Docker SonarQube and hosted SonarQube Cloud analysis with separate identities.
- Record local, pushed, hosted, review, merge, and production states independently.

## Non-Goals

- No production runtime, public route, DNS, deployment, or credential mutation.
- No token in source, logs, evidence, or PR text.
- No claim that local SonarQube proves SonarQube Cloud or required hosted checks.

## TDD Route

Mode: focused regression. Configuration parsers and behavior checks were added before final gate
acceptance; no strict commit-by-commit RED/GREEN claim is made.
