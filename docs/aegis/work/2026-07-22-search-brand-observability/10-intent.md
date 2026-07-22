# Intent: Search, H.O.T. Identity, and Privacy-First Observability

## Status

Accepted initiative intent. Mutable state lives only in `.ai/checkpoints/portfolio-overhaul.md`; provider truth must be re-queried before action.

## Intent

Make the portfolio truthfully discoverable as Halil Oğuzcan Toptaş's developer and homelab lab, establish H.O.T. as its visible identity, preserve source-backed agent discovery, and collect only coarse operational signals with a clear local opt-out.

## Scope

- Localized route titles, descriptions, canonical URLs, hreflang, sitemap entries, and social metadata.
- Visible-content-aligned structured data with safe serialization.
- H.O.T. mark, icon, manifest, generated social cards, and developer/homelab copy.
- Localized privacy notice and opt-out for aggregate Vercel Analytics and Speed Insights.
- Focused tests, browser QA, release gates, and independent evidence for local, remote, review, merge, production, and external states.

## Non-Goals

- Guaranteed indexing, ranking, rich results, traffic, or AI citations.
- `llms.txt` solely for Google Search, custom analytics events without a measurement question, or collection of personal/free-text data.
- Sentry or Session Replay before DSN ownership, masking, retention, sampling, cost, and privacy decisions are accepted.
- OAuth/OIDC metadata, Protected Resource Metadata, `auth.md`, MCP Server Card, DNS-AID, Django, Docker, Kubernetes, deployment, DNS mutation, Search Console mutation, or recrawl requests.

## Baseline References

- `e4c10f9 docs: plan search and observability expansion` accepted the governing decision and roadmap.
- Public EN/TR portfolio, project archive/detail routes, read-only API/discovery surfaces, reduced-motion behavior, and isolated WASM game center must remain compatible.
- Vercel remains the application origin behind Cloudflare DNS/proxy; provider and production state require live evidence.

## TDD Route

Mode: proportional verification. Runtime contracts use unit and browser regression tests plus full release gates; no strict RED/GREEN claim is made for pre-existing behavior.
