# Post-Change Baseline Snapshot: 2026-07-22

Status: Draft

Captured: 2026-07-22 Europe/Istanbul

Source commit: `3b72500dc4ce82ba6ef22a86d51479f69da12e96`

Source fingerprint: `f825cbc31af30549ff71ec58766c82d33bec9dbc91c644bc257d8d5b39f9c7c8` dirty iteration; tracked diff `3ef8e9890af94f7d56db76bdc380aba7f35e01817e809065e1bca0983248cec0`; untracked 47-file manifest `c14997fde68c4a451b516a032ef44d3c959c99dc89f79f3e228883bfe3d6f640`; self-referential snapshot/evidence files and the active checkpoint excluded

Accepted in commit: pending

Supersedes: none

## Snapshot Contract

Captured against `ui-update` at `3b72500` plus owned working-tree changes. This dated baseline supplements, and does not rewrite, `2026-06-16-initial-baseline.md`. It is not a live dashboard. Current workstream state belongs only to `.ai/checkpoints/portfolio-overhaul.md`; provider facts must be refreshed before use.

## Observed Product Boundary

The public portfolio was EN/TR, client-facing, and server-first on Next.js App Router. Server Components owned public routes, browser behavior remained in leaves, and public v1 had no separate/stateful backend, authentication, database, private dashboard, or database-backed guestbook. Thin read-only route handlers were permitted.

## Hosted and Production Observations

- Cloudflare read-only API and public DNS observations on 2026-07-22 found an active `oguzcantoptas.com` zone, proxied apex and `www` CNAMEs to Vercel, externally validating DNSSEC, and no portfolio Pages project, Worker custom domain, or DNS-AID record.
- Vercel API and public HTTP observations on 2026-07-22 identified Vercel as application origin behind Cloudflare and production as the then-current `main` deployment.
- GitHub CLI/API observations on 2026-07-22 found PR #14 open and mergeable but `BLOCKED / REVIEW_REQUIRED`; JavaScript/TypeScript CodeQL passed while stale Python CodeQL failed.
- Branch-only sitemap, API catalog, and later discovery work were not production evidence.

## Local Runtime Observation

Commit `3b72500` corrected the canonical fallback to the owned origin. The working tree additionally contained application-level Markdown negotiation, Agent Skills discovery, and progressive read-only WebMCP with targeted tests passing. None was yet pushed, preview-verified, merged, or production-verified at capture.

## Governance Baseline

Authority was `AGENTS.md` -> `.ai/architecture.instructions.md` -> accepted decisions -> roadmaps -> dated Aegis records -> package scripts/CI -> `SECURITY.md`; CodeRabbit remained advisory. Development-time skills/plugins/MCPs were capabilities, never runtime dependencies or external-write authority.

## Deliberate Absences

OAuth/OIDC metadata, Protected Resource Metadata, `auth.md`, MCP Server Card, and DNS-AID remained absent because their product/service prerequisites did not exist. Django, Docker, Kubernetes, Pages, Workers, and OpenNext were not runtime requirements.
