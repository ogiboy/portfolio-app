# Decision: Search Visibility, H.O.T. Identity, and Privacy-First Observability

## Status

Accepted

## Context

The public portfolio needs a more accurate identity and a stronger discovery surface. The current metadata describes only a frontend portfolio, the visible mark is `OGT.`, no structured data or social card exists, and aggregate analytics are mounted without a public privacy explanation or opt-out control. The intended product is Halil Oğuzcan Toptaş's personal developer and homelab hobby portfolio while remaining a credible client-facing surface.

Search and AI visibility cannot be guaranteed by metadata, schema, or agent-only files. Current Google guidance treats crawlable, useful, first-hand content and standard technical SEO as the foundation for both classic and generative Search. Existing agent discovery remains useful for systems that explicitly consume it, but it must not be presented as a ranking shortcut.

## Decision

- Use `H.O.T.` as the visible initialism for Halil Oğuzcan Toptaş. Keep the full name in metadata and structured data so the playful mark never obscures identity.
- Position the site as a personal developer, homelab, automation, and browser-lab portfolio with a client-facing contact path. Do not invent infrastructure, employment, traffic, ranking, or project-outcome claims.
- Centralize localized metadata, canonical URLs, reciprocal EN/TR alternates, Open Graph/Twitter fields, and JSON-LD serialization under an explicit SEO owner. Keep sitemap and robots output derived from the canonical site origin.
- Publish only structured data that matches visible content: `WebSite`, `ProfilePage`, `Person`, `CollectionPage`, `ItemList`, `SoftwareSourceCode`, `CreativeWork`, and breadcrumbs where applicable. Escape JSON-LD before rendering and validate deployed output separately.
- Add a generated H.O.T. social card and icon with a restrained ember/flame motif. Preserve the existing Brutalist Dev Lab tokens, acid accent, accessible contrast, and reduced-motion fallback.
- Keep Vercel Web Analytics and Speed Insights as the initial telemetry surface. Explain the aggregate, cookieless provider behavior, expose a local opt-out, and send no personal data, free text, email addresses, tokens, or stable user identifiers.
- Defer custom analytics events until a small event taxonomy and provider-plan support are both proven. Page and route views are sufficient for the first measurement slice.
- Defer Sentry and Session Replay until a Sentry project, DSN, retention/data-region choice, masking policy, sampling budget, privacy update, and explicit enablement decision exist. A future replay setup must mask text and inputs, block media, avoid network bodies/headers by default, and prefer error-triggered sampling.
- Support Google site verification through an environment variable without committing a token. Domain verification, sitemap submission, URL Inspection, and production recrawl requests remain external Search Console actions with separate evidence.
- Do not add `llms.txt` or non-standard markup solely to influence Google Search. Preserve the source-backed Agent Skills, Markdown negotiation, public API catalog, and WebMCP surfaces for agents that support those protocols.

## Consequences

- Browser titles, search snippets, social previews, machine-readable identity, and visible brand language share one truthful source.
- The first telemetry release answers aggregate traffic and route-interest questions while avoiding session reconstruction and invasive replay.
- Search Console and Sentry cannot be called complete from repository changes alone; provider credentials and post-deploy evidence are explicit follow-ups.
- Homelab authority must grow through first-hand project pages, lab notes, diagrams, and measured case studies rather than keyword stuffing.

## Compatibility and Rollback

The change preserves public EN/TR routes, project URLs, contact links, agent discovery, and the isolated WASM lab. Metadata, structured data, social assets, privacy controls, and the H.O.T. mark can be reverted independently. Disabling telemetry removes the provider components without affecting page rendering. Enabling Sentry or changing external search/provider state requires a new accepted decision or an explicit amendment to this record.
