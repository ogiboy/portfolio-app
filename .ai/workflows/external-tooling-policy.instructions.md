# External Tooling and Hosted-State Policy

Read-only inspection of GitHub, Vercel, Cloudflare, browser previews, and public protocol sources may produce evidence. It cannot silently change the corresponding system.

External writes include deployment, publish, merge, DNS changes, hosted settings, credentials, messages, uploads, and creation/deletion of provider resources. They require explicit authority and must be observable, bounded, and recorded.

Hosted-state reconciliation records provider, query/command or URL, date, observed result, affected commit/deployment, and uncertainty. Do not infer hosted truth from local configuration or vice versa.

Dated provider observations belong in `docs/aegis/` evidence records and the active checkpoint. Re-query the provider before acting; this policy never embeds a mutable provider fact or grants mutation authority.

Project-local OMX roles/prompts/skills and `skills-lock.json` are reviewed development inputs. Ruflo,
OMX, Claude-flow, plugins, MCPs, global skill catalogs, and agent memory remain advisory; their local
databases, hooks, credentials, machine paths, and daemon state stay ignored and never become
application runtime or hosted-state evidence. Follow
`.ai/workflows/development-tooling-workflow.instructions.md` when those surfaces change.
