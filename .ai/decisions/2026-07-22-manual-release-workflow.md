# Decision: Manual Changelog Release Workflow

## Status

Accepted

Supersedes: `2026-06-16-release-workflow.md`

## Context

The original changelog workflow established the right evidence requirements but did not name the canonical version owner or the boundary between ordinary feature work and an intentional release.

## Decision

- `package.json` is the canonical version source.
- Ordinary feature-branch work does not bump the version.
- After merge, a maintainer creates a dedicated `chore(release): x.y.z` commit that updates `package.json` and `CHANGELOG.md`, reruns `release:check`, and tags that exact HEAD only after full local gates, checklist completion, hosted CI reconciliation, Vercel preview evidence, and completed production verification recorded as its own evidence class.
- Conventional commits, `CHANGELOG.md`, the release checklist, CI evidence, preview verification, and production verification remain required and distinct.
- Keep the release flow manual. Do not add semantic-release unless a later accepted decision supersedes this policy.

## Consequences

- Version changes remain intentional and reviewable.
- A feature merge does not implicitly become a release.
- A missing gate, review, preview, or production evidence blocks the corresponding state instead of being treated as a pass.
- Before the first stable tag, the committed bootstrap version and conventional-commit baseline make the release range explicit; the checker accepts a bumped version only at the matching HEAD release commit awaiting its tag.

## Compatibility and Rollback

This policy changes delivery records only. Reverting it requires a new accepted decision; it does not require application-code rollback.
