# Versioning and Release Instructions

`package.json` is the canonical application version owner. The current line is `0.2.x`, covering the
public EN/TR H.O.T. portfolio, project archive/detail routes, agent discovery, observability, alive
interaction foundation, and isolated WASM lab.

## Release Policy

- Ordinary feature branches and PRs do not bump `package.json`.
- Use Conventional Commits so `pnpm release:plan` can derive the pending SemVer transition from the
  latest exact stable `vX.Y.Z` tag or configured baseline.
- `pnpm release:check` validates the release range and commit subjects; it does not modify files,
  create tags, publish, or deploy.
- A maintainer creates a dedicated `chore(release): x.y.z` commit after the intended feature work is
  merged. That commit updates `package.json` and `CHANGELOG.md` together.
- Tag only the exact release commit after the manual release prerequisites are complete.
- Do not add semantic-release or an automated version writer unless a later accepted ADR supersedes
  the manual workflow.

## Change Buckets

- Public routes and localized content.
- Design system, interaction, accessibility, and theme.
- SEO, structured data, agent discovery, and public APIs.
- WASM lab and generated runtime assets.
- Privacy, analytics, security, and provider configuration.
- Tests, performance budgets, CI, and release tooling.
- Governance, `.ai`, skills, OMX/Ruflo development tooling, and documentation.

## Stable Release Prerequisites

Keep each evidence class distinct:

1. full local gate on the exact release commit;
2. release checklist and changelog/version reconciliation;
3. pushed commit and hosted CI reconciliation;
4. Vercel preview identity and browser evidence;
5. required review approval;
6. merge state;
7. completed production verification recorded separately from preview evidence;
8. exact stable tag on the verified release commit.

A missing, unavailable, pending, or interrupted gate blocks that state. It is never recorded as a
pass.

## Compatibility

- Preserve canonical EN/TR routes, sitemap/robots, discovery endpoints, project URLs, and public API
  shapes unless a release note and compatibility decision explicitly change them.
- Feature work may extend internal implementation without a version bump, but public breaking changes
  require a deliberate release plan and migration/redirect story.
- OMX/Ruflo/plugin/skill versions are development-tool state and do not change the portfolio version
  unless their committed project configuration changes shipped behavior.

See `.ai/decisions/2026-07-22-manual-release-workflow.md` and
`.ai/workflows/release-pr-workflow.instructions.md` for the authoritative process.
