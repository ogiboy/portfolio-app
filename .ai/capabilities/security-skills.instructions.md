# Security Capability Boundary

Security-related skills and tools can assist with inspection, threat modeling, dependency review, and evidence collection. They do not replace the security owner, `SECURITY.md`, provider controls, or explicit authority.

- Keep secrets, tokens, credentials, private reports, and personally identifying incident details out of prompts, logs, commits, and public artifacts.
- Treat findings as unverified until source, affected owner, impact, and reproduction or provider evidence are recorded.
- Use the security workflow for triage and disclosure boundaries. Do not publicize or externally report a vulnerability without the authorized process.
- Hosted security settings and DNS are external state; reconcile them as evidence and request explicit authority before mutation.
