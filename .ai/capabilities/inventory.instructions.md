# Capability Inventory Policy

This file is a durable routing policy, not a snapshot that promises a particular plugin, version,
credential, or hosted connection is available. Verify volatile capability state in the active
environment before use.

## Primary Families

| Family                                                       | Portfolio use                                                                                             | Boundary                                                                                         |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Aegis                                                        | Goal framing, planning, debugging, ADRs, anti-entropy review, verification                                | Default governance family; repository records remain authoritative                               |
| Project-local OMX                                            | Role prompts, workflow skills, bounded multi-agent execution                                              | `.codex/agents`, `.codex/prompts`, and `.codex/skills` are development inputs, never app runtime |
| Codex native subagents                                       | Parallel repository lookup, implementation, review, and verification                                      | One leader integrates; agents receive bounded ownership and no external-write authority          |
| Ruflo                                                        | Advisory routing, local memory, explicit swarm experiments, diagnostics                                   | `.swarm`, `.claude-flow`, and local databases are disposable runtime state, not evidence         |
| Context7 and official docs                                   | Current Next.js, React, next-intl, Motion, Tailwind, shadcn, Vercel, Cloudflare, and browser API behavior | Record source/version/date and reconcile with installed code                                     |
| Browser and Computer                                         | Real desktop/mobile journeys, keyboard, reduced motion, save-data, screenshots, and provider UI reads     | Choose one browser owner; do not duplicate heavy browser runners                                 |
| Build Web Apps and shadcn                                    | Accessible primitives, Server/Client Component boundaries, React quality                                  | Preserve the accepted design system and current component owners                                 |
| Product/design/taste skills                                  | UX audit, interaction design, content hierarchy, visual direction                                         | `DESIGN.md` remains canonical; select at most one taste layer per task                           |
| Security skills and scanners                                 | Threat modeling, dependency, CI, route, browser, secret, and supply-chain review                          | Defensive and repository-scoped only; findings require local verification                        |
| GitHub, Vercel, Cloudflare, CircleCI, SonarCloud, CodeRabbit | Hosted checks, preview/deployment topology, DNS/edge, quality and review evidence                         | Reads are volatile evidence; writes require explicit authority                                   |
| Creative and content tools                                   | EN/TR portfolio writing, positioning, SEO/AEO content, visual assets                                      | Claims must be source-backed; generated content remains draft until reviewed                     |

## Workflow Selection

- Use one primary workflow family for a slice. Aegis is the normal default.
- Use OMX workflow skills when the current host exposes them and their structured execution adds
  value. In Codex App, prefer native subagents for bounded independent work unless an OMX CLI team
  session is deliberately active.
- Use Ruflo as an advisory or persistence layer by default. Do not run an OMX team, native swarm,
  and Ruflo swarm as competing owners of the same task.
- Use GSD only for explicit phase/milestone planning or when the user names it. Do not introduce a
  parallel `.planning/` source of truth.
- Use Superpowers only when explicitly invoked or selected by host routing.

## Portfolio Task Routes

| Need                              | Preferred capability                                     | Required evidence                                                                  |
| --------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Repo ownership or pattern lookup  | `explore` subagent or local `rg`                         | file/symbol references and uncertainty                                             |
| Architecture or boundary decision | Aegis plus `architect`/`critic`                          | accepted ADR or explicit no-change decision                                        |
| Next.js/library behavior          | Context7, then official docs if needed                   | version-aware source and local impact                                              |
| UI implementation                 | Build Web Apps/shadcn plus `designer` or `executor`      | real browser journey and accessibility checks                                      |
| Visual direction                  | root `DESIGN.md` plus one selected taste skill           | normal/reduced-motion and responsive evidence                                      |
| Copy, SEO, or AI discoverability  | content/SEO specialist plus official protocol sources    | localized metadata/HTML and crawler-facing output                                  |
| WASM lab                          | repository source plus browser/performance tools         | no pre-boot asset request, state-machine, and sandbox checks                       |
| Security                          | threat model plus one to three defensive security skills | reproducible finding, severity, fix or explicit deferral                           |
| Dependency change                 | `dependency-expert`, official package sources, audit     | lockfile diff, compatibility, license/security risk                                |
| PR/release                        | git/GitHub plus release workflow                         | local, pushed, hosted, preview, review, merge, and production states kept distinct |
| Cloudflare/Vercel                 | provider connector or browser plus official docs         | zone/project/deployment identifier and dated observation                           |

## Design Capability Boundary

- H.O.T. is a public portfolio and technology lab, not an operator dashboard.
- `DESIGN.md` defines the Signal-driven Brutalist Dev Lab direction, EN/TR parity, accessibility,
  and performance budgets.
- Motion is the accepted animation library. GSAP is superseded for the current implementation.
- CSS owns short hover/focus/press feedback; Motion is limited to isolated client leaves and
  purposeful measured choreography.
- shadcn/Radix primitives must be adapted through project tokens rather than copied as generic
  defaults.

## Current Setup Surfaces

- `skills-lock.json` is the committed reproducibility manifest for downloaded project skills.
- `.codex/agents`, `.codex/prompts`, and `.codex/skills` are the reviewed, project-local OMX
  capability surface.
- `AGENTS.md` contains an OMX-managed section between stable markers. Do not hand-edit inside those
  markers except through the setup tool.
- `.codex/config.toml`, `.codex/hooks.json`, `.codex/.omx`, `.omx`, `.swarm`, `.claude`, and
  `.claude-flow` contain machine paths or runtime state and remain local-only.
- Ruflo and OMX may use a different host Node runtime from the application. App commands remain
  governed by `.nvmrc`, `.node-version`, and `package.json`.

## Explicit Exclusions

Do not route ordinary portfolio work to:

- trading, broker, market-data, investment, finance-operations, or portfolio-management agents;
- Producer Studio, local operator dashboard, Python worker, model-provider, media-render, private
  upload, or publishing workflows copied from another repository;
- authentication, OAuth, database, Django, Docker, Kubernetes, or stateful backend work without a
  later accepted product decision;
- offensive security, malware, credential-access, phishing, exploitation, persistence, network
  scanning, or public-target probing skills;
- agent memory, swarm state, or generated catalogs as application input or release proof.

## Availability Rule

Capability names and versions drift. Discover only the family needed for the current task, load the
selected body, and record unavailable tooling as a gap rather than inventing output. A configured or
installed tool is not necessarily authenticated, healthy, or authorized for external writes.
