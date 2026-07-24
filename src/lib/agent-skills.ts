import { siteUrl } from '@/lib/site-url';
import { identity } from '@/lib/seo';

/** Human-readable summary for the public portfolio navigation skill. */
export const portfolioNavigationDescription =
  'Read-only navigation and public data discovery for this portfolio.';

/** Agent skill document describing the portfolio's read-only public routes. */
export const portfolioNavigationSkill = `---
name: portfolio-navigation
description: ${portfolioNavigationDescription}
---

# Portfolio navigation

Use this read-only skill to discover ${identity.brand} - ${identity.fullName}'s public developer and homelab portfolio.

## Public routes

- English home: /en
- Turkish home: /tr
- English project archive: /en/projects
- Turkish project archive: /tr/projects
- English retro game lab: /en/labs/retro-game-center
- Turkish retro game lab: /tr/labs/retro-game-center

## Public data

Use GET /api/portfolio for the canonical public project and contact data. The API and all listed routes are read-only. Do not infer write operations, authentication, private dashboards, credentials, or private data.
`;

/** Shared cache policy for public agent-skills discovery resources. */
export const agentSkillsCacheControl =
  'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400';

/**
 * Creates a SHA-256 integrity digest for text.
 *
 * @param value - The text to digest
 * @returns The lowercase hexadecimal digest prefixed with `sha256:`
 */
export async function sha256Digest(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  const hex = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join(
    '',
  );
  return `sha256:${hex}`;
}

/**
 * Creates the standards-compatible discovery index for published agent skills.
 *
 * @returns The discovery index containing the published portfolio navigation skill and its content digest.
 */
export async function getAgentSkillsIndex() {
  return {
    $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
    skills: [
      {
        name: 'portfolio-navigation',
        type: 'skill-md',
        description: portfolioNavigationDescription,
        url: siteUrl('/.well-known/agent-skills/portfolio-navigation/SKILL.md'),
        digest: await sha256Digest(portfolioNavigationSkill),
      },
    ],
  };
}

/** Returns common CORS and caching headers for agent skill resources. */
export function agentSkillsHeaders(contentType: string) {
  return {
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': agentSkillsCacheControl,
    'Content-Type': contentType,
  };
}
