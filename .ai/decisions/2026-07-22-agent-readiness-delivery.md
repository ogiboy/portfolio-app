# Decision: Portable Agent Readiness on the Existing Edge Topology

## Status

Accepted

## Context

The portfolio needs truthful machine discovery without inventing authentication, an MCP server, a DNS-discoverable agent service, or an additional deployment platform. The current product is a public, read-only Next.js app. Provider observations dated 2026-07-22 place the Vercel origin behind Cloudflare DNS/proxy with DNSSEC enabled; provider truth must still be refreshed before production actions.

## Decision

- Publish canonical sitemap and robots references, RFC 9727 API catalog, read-only OpenAPI/docs/health routes, application-level Markdown content negotiation, an Agent Skills index/artifact, and progressive read-only WebMCP tools.
- Keep negotiation in the Next.js application so behavior is portable across local, preview, Vercel, and Cloudflare-proxied production requests. Do not require a Cloudflare Worker or a plan-specific platform feature.
- Keep Vercel as the application origin and Cloudflare as DNS/proxy infrastructure. Do not migrate to Pages, Workers, OpenNext, Django, containers, or Kubernetes for this scope.
- Defer OAuth/OIDC discovery, OAuth Protected Resource Metadata, and `auth.md` because public v1 has no protected API, authorization server, or agent-registration flow.
- Defer an MCP Server Card because the portfolio does not operate an MCP server.
- Defer DNS-AID because no stable agent service endpoint exists. DNSSEC alone does not create that prerequisite.
- Use the current imperative WebMCP API in an isolated client leaf and degrade to a no-op when the browser does not expose it.
- Serve Markdown from a dedicated read-only handler selected by explicit `Accept: text/markdown`; keep HTML as the browser default. Markdown responses are `private, no-store` until production proves safe shared-cache behavior. The root representation varies on `Accept`, `Accept-Language`, and `Cookie`, and strips locale `Set-Cookie` from the rewrite. Next.js App Page rendering overwrites the proxy-provided HTML `Vary` header with its framework RSC list, so the HTML response must not be claimed to carry `Vary: Accept` without evidence.
- Treat every branch implementation as non-production until pushed, reviewed, merged, deployed, and production-verified.

## Consequences

- Human and agent access share source-backed portfolio data without a second backend.
- Unsupported discovery surfaces fail closed by remaining absent rather than publishing fabricated endpoints or credentials.
- Cloudflare DNS/Worker changes are not required for this implementation; DNS-AID remains a deliberate prerequisite-gated follow-up.
- Framework/header behavior and deployment topology are documented honestly instead of being hidden behind a generic readiness claim; Markdown intentionally trades shared-cache speed for representation safety.

## Compatibility and Rollback

All new surfaces are read-only and additive. They can be removed independently without changing the public EN/TR pages or WASM lab. A future auth, MCP, DNS-AID, or edge-runtime implementation requires its own accepted decision and operational prerequisites.
