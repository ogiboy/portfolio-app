import { siteUrl } from '@/lib/site-url';

export const portfolioNavigationDescription =
  'Read-only navigation and public data discovery for this portfolio.';

export const portfolioNavigationSkill = `---
name: portfolio-navigation
description: ${portfolioNavigationDescription}
---

# Portfolio navigation

Use this read-only skill to discover Oğuzcan Toptaş's public portfolio.

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

export const agentSkillsCacheControl =
  'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400';

export async function sha256Digest(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  const hex = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join(
    '',
  );
  return `sha256:${hex}`;
}

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

export function agentSkillsHeaders(contentType: string) {
  return {
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': agentSkillsCacheControl,
    'Content-Type': contentType,
  };
}
