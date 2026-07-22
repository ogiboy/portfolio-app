# Pull Request

<!-- Use a Conventional Commit-style title, for example: feat(discovery): add markdown negotiation -->

## Scope and owner

- Scope:
- Canonical owner files:
- Public behavior / non-goals:
- Risk and rollback boundary:

## Evidence

- Local green (command, date, commit):
- Pushed commit:
- Hosted checks (each status, including failures):
- Preview QA (URL, browser steps, artifact):
- Browser QA (target, viewport, locale, reduced motion, artifact):
- Review evidence (required approval and advisory reviews separately):
- Merge evidence (merge commit, base, provider timestamp):
- Production verification after merge:

## Hosted-state reconciliation

- Current PR state and mergeability:
- Required checks and review state:
- Hosted setup failures or unavailable checks:
- Active checkpoint and fresh provider-query reference:

## Checklist

- [ ] Title follows the Conventional Commit expectation.
- [ ] Scope stays within the named owner and public-v1 boundary.
- [ ] No secrets, credentials, external writes, deployment, DNS, publish, or hosted-setting changes were made without explicit authority.
- [ ] Local, pushed, hosted-check, preview, browser, review, merge, and production evidence are not conflated.
- [ ] Browser QA is recorded when public UI or browser behavior is in scope.
- [ ] CodeRabbit feedback is considered advisory; required human/provider review state is recorded separately.
- [ ] Canonical origin and branch-only behavior are not claimed production-live without merge/deploy verification.
