# Decision: Changelog Release Workflow

## Status

Accepted

## Context

The project needs professional delivery hygiene without the overhead of a full semantic-release setup.

## Decision

Use conventional commits, `CHANGELOG.md`, a release checklist, CI evidence, and Vercel preview verification for releases.

## Consequences

- v0.2.0 documents the overhaul.
- Release readiness is auditable through CI and changelog entries.
- Automated semantic release can be added later if release frequency increases.
