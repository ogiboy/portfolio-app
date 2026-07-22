# H.O.T. Developer + Homelab Portfolio

Public EN/TR developer and homelab portfolio for Halil Oğuzcan Toptaş. H.O.T. is the visible identity; the full name remains explicit in page content, metadata, and structured data. The app is client-facing and server-first: Next.js App Router Server Components own route rendering, while browser interactions stay in isolated client leaves. The visual direction is Brutalist Dev Lab with shadcn/Radix primitives, Tailwind v4 tokens, and reduced-motion-safe GSAP motion.

## Getting Started

Use Node `24.16.0` and the Corepack-managed pnpm version declared in `package.json`.

```bash
pnpm dev
```

Open [http://localhost:3000/en](http://localhost:3000/en).

## Scripts

- `pnpm format:check`: Prettier plus Tailwind class sorting.
- `pnpm lint`: ESLint with Next.js and Prettier compatibility.
- `pnpm typecheck`: TypeScript verification.
- `pnpm test`: Vitest content and unit checks.
- `pnpm test:e2e`: Playwright public-route smoke checks.
- `pnpm build`: Next.js production build through Webpack.
- `pnpm build:turbopack`: Explicit follow-up check for the Turbopack production build path.
- `pnpm audit`: Production dependency audit at high severity.
- `pnpm release:plan`: Read-only JSON release plan from the exact Git range.
- `pnpm release:check`: Validate package/changelog alignment and Conventional Commits without publishing.

## Architecture

- Routes and layouts live in `src/app`.
- Localized EN/TR `siteCopy` and shared source-language project records live in `src/content`.
- Shared UI primitives live in `src/components/ui`.
- Browser-only leaves live in `src/components/client`.
- Agent-discovery payload builders live in `src/lib`, with thin, read-only Next.js Route Handlers in `src/app`.
- WASM assets and their isolated lab route stay separate from the public home-page payload.
- Public portfolio v1 has no separate or stateful backend, authentication, database, private dashboard, Auth0, or database-backed guestbook.
- Governance and delivery records live under `.ai/` and `docs/aegis/`.

Start governance work from the [operating guide](AGENTS.md), [owner map](.ai/architecture.instructions.md), [active checkpoint](.ai/checkpoints/portfolio-overhaul.md), [current roadmap](.ai/roadmap/2026-07-22-search-and-observability.md), and [Aegis index](docs/aegis/INDEX.md). Dated Aegis records are evidence, not live provider state.

## WASM Game Center

The live WASM game center is available at `/en/labs/retro-game-center` and `/tr/labs/retro-game-center`. It has no separate or stateful backend: it uses static assets, lazy iframe boot, and a thin, read-only `/wasm/*` Next.js Route Handler for MIME and cache headers. Django, Docker, and Kubernetes remain deferred unless durable scores, authenticated saves, ROM administration, or a broader operations showcase becomes a real product requirement.

## Agent Discovery

The public machine-readable surface is read-only and source-backed:

- `/robots.txt` references the canonical `/sitemap.xml`.
- `/.well-known/api-catalog` links the public API, `/openapi.json`, `/api/docs`, and `/api/health`.
- Requests for public portfolio pages with `Accept: text/markdown` receive localized Markdown; HTML remains the browser default.
- `/.well-known/agent-skills/index.json` publishes the Agent Skills index, and `/.well-known/agent-skills/portfolio-navigation/SKILL.md` serves the digest-bound skill artifact.
- Progressive WebMCP exposes read-only portfolio navigation and project discovery when the browser implements the API; unsupported browsers keep normal site behavior.

OAuth/OIDC metadata, Protected Resource Metadata, `auth.md`, an MCP Server Card, and DNS-AID are deliberately absent because this public v1 has no protected API, authorization server, MCP server, agent registration flow, or stable agent service endpoint. Vercel remains the application origin behind Cloudflare DNS/proxy; no Worker migration is required for these routes.

## Search and Social Discovery

- Localized route metadata owns unique titles, descriptions, absolute canonical URLs, reciprocal EN/TR alternates, and `x-default` links.
- `/sitemap.xml` lists canonical public routes and localized alternates; `/robots.txt` references it.
- Visible-content-aligned JSON-LD describes the site, profile, project archive, project details, and WASM lab without inventing credentials or outcomes.
- Generated Open Graph and Twitter cards, `icon.svg`, and `manifest.webmanifest` keep the H.O.T. identity consistent across tabs, installs, and shares.
- `GOOGLE_SITE_VERIFICATION` can supply a Search Console verification token at deploy time. Verification, sitemap submission, indexing, ranking, and AI citations remain external outcomes and are never inferred from local metadata.

## Privacy and Telemetry

Vercel Web Analytics and Speed Insights provide aggregate route and performance signals. `/en/privacy` and `/tr/privacy` explain the boundary and include a durable browser-local opt-out that reloads without mounting either provider. No custom events, advertising profile, Sentry SDK, or Session Replay is active. Sentry remains deferred until DSN ownership, masking, retention, sampling, cost, and privacy decisions are accepted.

## Release Gates

Before a push or release, run:

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm release:check
pnpm test
pnpm test:e2e
pnpm build
pnpm audit --prod --audit-level high
```

## Deployment

The app is designed for Vercel previews and production deployments behind Cloudflare DNS/proxy. Deployment, publishing, DNS, Search Console, Sentry, credential, and other external-write actions require explicit authority and independent provider evidence.
