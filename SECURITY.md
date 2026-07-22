# Security Policy

## Supported Versions

Security fixes are supported for `main` only. Feature branches, archived branches, and released historical snapshots are not maintained security targets.

## Reporting a Vulnerability

Use GitHub private vulnerability reporting for this repository as the primary reporting path. Include a clear impact summary, affected path or component, reproduction steps, and any safe proof of concept.

If private reporting is unavailable, use a safe public fallback: open a minimal GitHub issue requesting a private contact channel without including exploit details, credentials, tokens, personal data, or proof of concept payloads. Do not report secrets in any channel. Rotate or revoke exposed credentials through their owning provider instead of placing them in a report.

## Scope

Report security issues involving:

- Public route and API input handling.
- Secrets, environment-variable boundaries, Vercel configuration, and analytics integrations.
- Dependency and supply-chain risk.
- Client and server boundaries, including browser-only leaves.
- Truthfulness and provenance of agent-discovery metadata.
- WASM sandbox settings and vendor-supplied static assets.

## Response Principles

- Maintain default security controls unless an explicit decision records why a change is necessary.
- Do not weaken sandboxing, secret handling, CI checks, or client boundaries as an incidental fix.
- Maintainers validate reports privately, coordinate a fix, and acknowledge receipt when contact details are available.
