# Capability Inventory Policy

This file is an inventory policy, not a promise that any named tool is installed or authorized.

## Capability Families

| Family                                                                    | Intended use                                                                                                    | Required boundary                                                                                             |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Aegis                                                                     | Goal framing, ADRs, plan execution, first-principles review, anti-entropy governance, verification              | Repository records remain the authority; do not create parallel state owners                                  |
| Codex native subagents and GSD specialists                                | Bounded architecture, pattern mapping, implementation, review, and verification lanes                           | One leader integrates; disjoint write scopes; no delegated external-write authority                           |
| Context7 and official documentation                                       | Current Next.js, React, next-intl, shadcn, Cloudflare, Vercel, browser API, SDK, and CLI behavior               | Record version, source, retrieval date, and local impact                                                      |
| Browser and Computer                                                      | Rendered desktop/mobile, accessibility, reduced-motion, preview, production, and WASM QA                        | One QA owner; record target, viewport, locale, steps, artifact, and blocker                                   |
| Build-web-apps, shadcn, and design skills                                 | Accessible primitives, server/client boundaries, visual-system review, and anti-slop design critique            | Preserve the accepted Brutalist Dev Lab system and existing component ownership                               |
| GitHub, Vercel, Cloudflare, CircleCI, CodeRabbit, and security connectors | Read-only hosted-state reconciliation, provider documentation, checks, deployment topology, and security review | Provider reads are dated evidence; writes require explicit authority and independent verification             |
| Ruflo, AgentDB, WASM agents, and local orchestration plugins              | Optional development-time coordination, memory, experiments, and generated capability setup                     | Generated runtime state is disposable and ignored; `skills-lock.json` is the reproducible capability manifest |

- Project-local instructions, local shell commands, Git, and package scripts may support inspection and verification within the checked-out worktree.
- Context7, browser automation, skills, plugins, MCP servers, connectors, and subagents may be used only when the current environment exposes them.
- Record unavailable tooling as a verification gap or blocker; never invent output, availability, credentials, or external state.
- Capability output is evidence input. It does not supersede `AGENTS.md`, the owner map, source code, Git state, provider state, or an approved decision.
- No capability is shipped by this portfolio merely because it is available during development. Runtime dependencies require normal source/package review.
- Load only the one to three families needed for the current task. Do not invoke every installed plugin as ceremony.
