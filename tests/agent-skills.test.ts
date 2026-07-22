import { describe, expect, it } from 'vitest';
import {
  GET as getArtifact,
  HEAD as headArtifact,
} from '@/app/.well-known/agent-skills/portfolio-navigation/SKILL.md/route';
import {
  GET as getIndex,
  HEAD as headIndex,
} from '@/app/.well-known/agent-skills/index.json/route';
import { portfolioNavigationSkill, sha256Digest } from '@/lib/agent-skills';
import { siteUrl } from '@/lib/site-url';

describe('Agent Skills discovery', () => {
  it('publishes a schema-compatible index with the exact artifact digest', async () => {
    const indexResponse = await getIndex();
    const index = await indexResponse.json();
    const [skill] = index.skills;

    expect(index.$schema).toBe('https://schemas.agentskills.io/discovery/0.2.0/schema.json');
    expect(skill).toMatchObject({
      name: 'portfolio-navigation',
      type: 'skill-md',
      url: siteUrl('/.well-known/agent-skills/portfolio-navigation/SKILL.md'),
      digest: await sha256Digest(portfolioNavigationSkill),
    });
    expect(portfolioNavigationSkill).toMatch(
      /^---\nname: portfolio-navigation\ndescription: .+\n---\n\n# Portfolio navigation/,
    );
  });

  it('serves CORS-enabled GET and bodyless HEAD discovery responses', async () => {
    const artifact = getArtifact();
    const artifactHead = headArtifact();
    const indexHead = headIndex();

    expect(artifact.headers.get('content-type')).toBe('text/markdown; charset=utf-8');
    expect(artifact.headers.get('access-control-allow-origin')).toBe('*');
    await expect(artifact.text()).resolves.toBe(portfolioNavigationSkill);
    await expect(artifactHead.text()).resolves.toBe('');
    await expect(indexHead.text()).resolves.toBe('');
    expect(artifactHead.headers).toEqual(artifact.headers);
  });
});
