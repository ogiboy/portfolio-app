import { projects } from '@/content/projects';
import { contact } from '@/content/site';
import { routing } from '@/i18n/routing';
import { identity, seoCopy } from '@/lib/seo';
import { siteUrl } from '@/lib/site-url';

/** Semantic version exposed by the public read-only portfolio API. */
export const publicApiVersion = '0.2.0';

/** Cache directive shared by public API discovery documents. */
export const discoveryCacheControl =
  'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400';

const publicIdentity = {
  fullName: identity.fullName,
  knownNames: [identity.knownAs, identity.brand],
  homeLocation: 'Istanbul',
  jobTitles: Object.fromEntries(routing.locales.map((locale) => [locale, seoCopy[locale].role])),
  sameAs: [contact.github, contact.linkedin],
};

/**
 * Builds the canonical payload for the public portfolio API.
 *
 * @returns The public portfolio metadata, identity, contact details, and project information.
 */
export function getPortfolioApiPayload() {
  return {
    name: `${identity.brand} - ${identity.fullName} Portfolio`,
    version: publicApiVersion,
    locales: [...routing.locales],
    identity: publicIdentity,
    contact,
    projects: projects.map(
      ({ id, slug, name, year, category, url, gitUrl, description, stack, featured }) => ({
        id,
        slug,
        name,
        year,
        category,
        url,
        gitUrl,
        description,
        stack,
        featured,
      }),
    ),
  };
}

/** Generates the OpenAPI 3.1 document for public service endpoints. */
export function getOpenApiDocument() {
  return {
    openapi: '3.1.0',
    info: {
      title: `${identity.brand} - ${identity.fullName} Portfolio API`,
      version: publicApiVersion,
      description: 'Read-only public portfolio and service-health endpoints.',
    },
    servers: [{ url: siteUrl('/') }],
    paths: {
      '/api/portfolio': {
        get: {
          operationId: 'getPortfolio',
          summary: 'Return public portfolio projects and contact channels.',
          responses: {
            '200': {
              description: 'Public portfolio data.',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Portfolio' },
                },
              },
            },
          },
        },
      },
      '/api/health': {
        get: {
          operationId: 'getHealth',
          summary: 'Return public API health.',
          responses: {
            '200': {
              description: 'Service is available.',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Health' },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Portfolio: {
          type: 'object',
          required: ['name', 'version', 'locales', 'identity', 'contact', 'projects'],
          properties: {
            name: { type: 'string' },
            version: { type: 'string' },
            locales: { type: 'array', items: { type: 'string', enum: [...routing.locales] } },
            identity: {
              type: 'object',
              required: ['fullName', 'knownNames', 'homeLocation', 'jobTitles', 'sameAs'],
              properties: {
                fullName: { type: 'string' },
                knownNames: { type: 'array', items: { type: 'string' } },
                homeLocation: { type: 'string', const: 'Istanbul' },
                jobTitles: {
                  type: 'object',
                  required: [...routing.locales],
                  properties: Object.fromEntries(
                    routing.locales.map((locale) => [locale, { type: 'string' }]),
                  ),
                },
                sameAs: { type: 'array', items: { type: 'string', format: 'uri' } },
              },
            },
            contact: {
              type: 'object',
              additionalProperties: { type: 'string' },
            },
            projects: {
              type: 'array',
              items: {
                type: 'object',
                required: [
                  'slug',
                  'name',
                  'year',
                  'category',
                  'url',
                  'gitUrl',
                  'description',
                  'stack',
                ],
                properties: {
                  id: { type: 'integer' },
                  slug: { type: 'string' },
                  name: { type: 'string' },
                  year: { type: 'string' },
                  category: { type: 'string' },
                  url: { type: 'string', format: 'uri' },
                  gitUrl: { type: 'string', format: 'uri' },
                  description: { type: 'string' },
                  stack: { type: 'array', items: { type: 'string' } },
                  featured: { type: 'boolean' },
                },
              },
            },
          },
        },
        Health: {
          type: 'object',
          required: ['status', 'service', 'version'],
          properties: {
            status: { type: 'string', const: 'ok' },
            service: { type: 'string', const: 'portfolio-api' },
            version: { type: 'string' },
          },
        },
      },
    },
  };
}

/** Creates the RFC 9727 link-set catalog for API discovery. */
export function getApiCatalog() {
  return {
    linkset: [
      {
        anchor: siteUrl('/api/portfolio'),
        'service-desc': [
          {
            href: siteUrl('/openapi.json'),
            type: 'application/vnd.oai.openapi+json;version=3.1',
          },
        ],
        'service-doc': [{ href: siteUrl('/api/docs'), type: 'text/markdown' }],
        status: [{ href: siteUrl('/api/health'), type: 'application/json' }],
      },
    ],
  };
}

/** Provides Markdown documentation for the portfolio's public API contract. */
export function getApiDocumentation() {
  return `# Portfolio API

The Portfolio API is public and read-only. It does not require authentication.

## Endpoints

- \`GET /api/portfolio\` returns public project and contact data.
- \`GET /api/health\` reports availability and API version.
- \`GET /openapi.json\` returns the OpenAPI 3.1 service description.
- \`GET /.well-known/api-catalog\` returns the RFC 9727 API catalog.

No endpoint accepts writes, credentials, or private data.
`;
}
