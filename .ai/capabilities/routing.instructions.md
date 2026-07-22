# Capability Routing Matrix

Use the smallest available development-time capability that can produce the required evidence. Availability is optional and must be checked rather than assumed.

| Task                                                | Primary capability                 | Optional addition                            | Required evidence                                                        |
| --------------------------------------------------- | ---------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------ |
| Repository ownership or implementation lookup       | Local search and source inspection | Aegis records                                | Files, commit, and source references                                     |
| Next.js, browser API, SDK, CLI, or library question | Context7 or official documentation | Local usage lookup                           | Version/source link and local impact                                     |
| Public protocol or agent-discovery fact             | Official specification             | Web research                                 | Source URL, date, uncertainty                                            |
| Feature or bug implementation                       | Local editor and targeted commands | Bounded subagent                             | Diff, tests/checks, owner boundary                                       |
| Browser, accessibility, motion, or WASM QA          | Rendered browser journey           | Screenshot/video or accessibility inspection | URL/environment, steps, result, artifact or blocker                      |
| Security review or report handling                  | Security workflow                  | Official advisory source                     | Scope, severity basis, commands, no-secret confirmation                  |
| PR/release reconciliation                           | Git plus hosted provider status    | Preview browser QA                           | Local/pushed/check/preview/browser/review/merge/production kept separate |

Do not route an external write through a capability. The external-tooling policy remains the authority for deploys, DNS, publishing, credentials, messages, uploads, and hosted setting changes.
