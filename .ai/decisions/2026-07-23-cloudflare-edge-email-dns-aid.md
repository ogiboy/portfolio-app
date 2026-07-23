# Decision: Cloudflare Edge, Email Routing, and DNS-AID Boundary

## Status

Accepted; supersedes only the DNS-AID deferral in `2026-07-22-agent-readiness-delivery.md`.

## Context

The production portfolio uses Vercel as its application origin behind Cloudflare DNS and proxy services. Evidence captured on 2026-07-23 records a DNSSEC-signed DNS-AID answer and a working inbound Email Routing alias; see `docs/aegis/work/2026-07-23-cloudflare-contact-performance/90-evidence.md`. These provider surfaces need an explicit boundary so they do not become an invented Worker platform, outbound mailbox, authentication service, or stateful agent backend.

## Decision

- Keep Vercel as the application origin. No Worker, Pages migration, or additional backend is required for the public portfolio, Markdown negotiation, discovery routes, or Email Routing.
- Publish only `_index._agents.oguzcantoptas.com` as the DNS-AID ServiceMode entrypoint for the canonical public HTTPS index. Keep `_a2a` and `_mcp` absent because the site operates neither service.
- Keep the public zone DNSSEC-signed and verify DNS-AID through authenticated resolver output rather than inferring it from dashboard UI.
- Use `ogi@oguzcantoptas.com` as the public inbound contact alias. Email Routing forwards to a private destination; it is not an outbound mailbox and the destination must not enter source, logs, or evidence.
- Require MX and SPF records plus an enforcement DMARC policy for the domain. Treat a user-operated delivery test as separate evidence from DNS presence.
- Keep OAuth/OIDC discovery, Protected Resource Metadata, `auth.md`, and an MCP Server Card absent because public v1 has no protected API, authorization server, registration flow, or MCP server.
- Keep Cloudflare HTTP/3, HTTPS redirection, DNSSEC, and default compression where public observations prove them. Do not enable broad HTML/RSC “Cache Everything” rules: the same Next.js URL can serve HTML and RSC variants, while header-aware cache keys are not available on the Free plan.
- Keep Rocket Loader and other response-transforming optimizers off unless measured browser evidence justifies them. They can force recompression and interfere with a modern Next.js runtime.
- Use AI Crawl Control for observation and selective allow decisions. Do not enable blanket AI blocking or AI Labyrinth while search and agent discoverability are explicit product goals.

## Consequences

- DNS, email, and application responsibilities remain separately auditable.
- The contact alias can be rotated without exposing its private forwarding destination or changing application architecture.
- The site gains authenticated DNS index discovery without claiming unsupported agent protocols.
- Cloudflare's free edge features complement Vercel, but do not override framework caching semantics or duplicate Vercel Analytics.

## Compatibility and Rollback

Removing the DNS-AID record or Email Routing alias does not change public application routes. A future Worker, outbound mailbox, OAuth server, A2A endpoint, MCP server, Turnstile-protected form, or custom cache policy requires a separate accepted decision and provider-specific verification.
