import { describe, expect, it } from 'vitest';
import { GET as getApiCatalog } from '@/app/.well-known/api-catalog/route';
import { GET as getApiDocs } from '@/app/api/docs/route';
import { GET as getHealth } from '@/app/api/health/route';
import { GET as getPortfolio } from '@/app/api/portfolio/route';
import { GET as getOpenApi } from '@/app/openapi.json/route';
import { projects } from '@/content/projects';
import { contact } from '@/content/site';
import { identity, seoCopy } from '@/lib/seo';
import { siteUrl } from '@/lib/site-url';

describe('public portfolio API discovery', () => {
  it('publishes the read-only portfolio and health resources', async () => {
    const portfolioResponse = getPortfolio();
    const portfolio = await portfolioResponse.json();
    const healthResponse = getHealth();

    expect(portfolioResponse.headers.get('content-type')).toContain('application/json');
    expect(portfolio.projects).toHaveLength(projects.length);
    expect(portfolio.projects[0]).not.toHaveProperty('image');
    expect(portfolio.identity).toEqual({
      fullName: identity.fullName,
      knownNames: [identity.knownAs, identity.brand],
      homeLocation: 'Istanbul',
      jobTitles: { en: seoCopy.en.role, tr: seoCopy.tr.role },
      sameAs: [contact.github, contact.linkedin],
    });
    await expect(healthResponse.json()).resolves.toMatchObject({
      status: 'ok',
      service: 'portfolio-api',
    });
  });

  it('links the API catalog to real description, documentation, and health endpoints', async () => {
    const catalogResponse = getApiCatalog();
    const catalog = await catalogResponse.json();
    const [entry] = catalog.linkset;

    expect(catalogResponse.headers.get('content-type')).toContain('application/linkset+json');
    expect(entry.anchor).toBe(siteUrl('/api/portfolio'));
    expect(entry['service-desc'][0].href).toBe(siteUrl('/openapi.json'));
    expect(entry['service-doc'][0].href).toBe(siteUrl('/api/docs'));
    expect(entry.status[0].href).toBe(siteUrl('/api/health'));
  });

  it('serves OpenAPI and human-readable documentation with exact media types', async () => {
    const openApiResponse = getOpenApi();
    const openApi = await openApiResponse.json();
    const docsResponse = getApiDocs();

    expect(openApiResponse.headers.get('content-type')).toBe(
      'application/vnd.oai.openapi+json;version=3.1',
    );
    expect(openApi.openapi).toBe('3.1.0');
    expect(openApi.paths).toHaveProperty('/api/portfolio');
    expect(openApi.components.schemas.Portfolio.required).toContain('identity');
    expect(openApi.components.schemas.Portfolio.properties.identity).toMatchObject({
      type: 'object',
      required: ['fullName', 'knownNames', 'homeLocation', 'jobTitles', 'sameAs'],
    });
    expect(docsResponse.headers.get('content-type')).toBe('text/markdown; charset=utf-8');
    await expect(docsResponse.text()).resolves.toContain('# Portfolio API');
  });
});
