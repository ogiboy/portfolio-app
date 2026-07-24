# Decision: Separate Local and Cloud SonarQube Analysis

## Status

Accepted

## Context

The workstation exposes a host command named `sonar` for a separate SonarQube CLI and MCP surface.
That command does not accept scanner `-D` properties. The npm scanner now exposes
`sonar-scanner-npm`, while local SonarQube Community Build and SonarQube Cloud require different
project identities and credentials. Mixing any of these owners produces rejected parameters,
misdirected tokens, duplicate cloud analyses, or evidence attached to the wrong project.

## Decision

- Install `@sonar/scan` as a pinned project dev dependency and invoke it through
  `pnpm exec sonar-scanner-npm`; do not depend on a global scanner installation.
- Keep local analysis in `sonar-project.properties` with project key and name `portfolio-app`.
- Keep cloud analysis in `.sonarcloud.properties` with project key `ogiboy_portfolio-app`,
  organization `ogiboy`, and project name `portfolio-app`.
- Keep authored source, test, LCOV, exclusion, duplication, and quality-gate settings equal across
  both property files while preserving the separate identities.
- Exclude only the pinned legacy runtime wrappers `public/wasm/engine/script.js` and
  `public/wasm/engine/input_controller.js` from static analysis. Continue analyzing authored
  adapters such as `settings.js`, `runtime-security.js`, and every newly extracted wrapper
  module. Generated `main.js` and binary/font/ROM artifacts remain excluded separately.
- Keep the excluded wrappers behind syntax, security-pattern, static-delivery, browser, and
  no-growth modularity gates. Exclusion does not authorize new behavior in those files; new or
  security-sensitive behavior belongs in analyzed adapters.
- Run local SonarQube Community Build through the shared Docker Compose owner under
  `scripts/sonarqube`, bind it only to `127.0.0.1:9000`, retain named data volumes on stop, and reject
  non-local host URLs before lifecycle or scan work.
- Resolve the local token only from `SONAR_TOKEN` or macOS Keychain service
  `codex-sonarqube-token`. Never commit or print it; redact scanner logs and keep raw artifacts
  ignored.
- Run SonarQube Cloud only from `.github/workflows/sonar.yml` with the repository `SONAR_TOKEN`
  secret. Keep Automatic Analysis disabled so the LCOV-backed CI analysis is the sole cloud owner.
- Fail visibly when a PR cannot access the cloud token instead of producing a skipped green-looking
  analysis context. Fork or Dependabot changes must be reproduced on a trusted maintainer branch
  before merge.
- Pin the cloud action by immutable commit SHA and validate effective YAML/properties behavior in
  tests.

## Consequences

- `pnpm sonar:start`, `pnpm sonar:status`, `pnpm sonar:local`, and `pnpm sonar:stop` provide a
  repeatable local workflow without colliding with the host `sonar` CLI.
- Local Quality Gate results cannot be presented as SonarQube Cloud, hosted PR, merge, or production
  evidence.
- Cloud analysis consumes the same LCOV boundary enforced by Vitest but keeps provider credentials
  outside repository content.
- External PRs without repository secrets are intentionally blocked rather than silently accepted.
- Legacy-wrapper findings no longer dominate the new-code Quality Gate, while first-party adapters
  and extracted modules remain visible to both local SonarQube and SonarQube Cloud.

## Compatibility and Rollback

The decision affects development and hosted analysis only; it adds no browser bundle or production
service. Rollback removes the local scripts/workflow and `@sonar/scan` dependency together, preserves
Docker volumes unless the owner explicitly authorizes their deletion, and does not replace the
scanner with the unrelated host `sonar` command.
