'use client';

import { useEffect } from 'react';

type PublicProject = {
  category: string;
  description: string;
  name: string;
  slug: string;
  stack: string[];
  year: string;
};

type PortfolioPayload = {
  contact: Record<string, string>;
  name: string;
  projects: PublicProject[];
  version: string;
};

async function getPortfolio() {
  const response = await fetch('/api/portfolio', { headers: { Accept: 'application/json' } });
  if (!response.ok) {
    throw new Error(`Portfolio API returned ${response.status}.`);
  }

  return (await response.json()) as PortfolioPayload;
}

function result(value: unknown) {
  return {
    content: [{ type: 'text' as const, text: JSON.stringify(value, null, 2) }],
    structuredContent: value,
  };
}

function failure(error: unknown) {
  const message = error instanceof Error ? error.message : 'Unknown portfolio API failure.';
  return {
    content: [{ type: 'text' as const, text: `Portfolio API request failed: ${message}` }],
    isError: true,
  };
}

const emptyInputSchema = { additionalProperties: false, properties: {}, type: 'object' } as const;

export function WebMcpTools() {
  useEffect(() => {
    const modelContext = document.modelContext;
    if (!modelContext) {
      return;
    }

    const controller = new AbortController();

    const tools: ModelContextTool[] = [
      {
        name: 'portfolio_overview',
        description:
          'Read the public portfolio overview, contact channels, and available project count.',
        inputSchema: emptyInputSchema,
        annotations: { readOnlyHint: true },
        async execute() {
          try {
            const portfolio = await getPortfolio();
            return result({
              name: portfolio.name,
              version: portfolio.version,
              contact: portfolio.contact,
              projectCount: portfolio.projects.length,
              projectsUrl: '/en/projects',
            });
          } catch (error) {
            return failure(error);
          }
        },
      },
      {
        name: 'search_public_portfolio_projects',
        description:
          'Search public portfolio projects by name, category, description, year, or technology.',
        inputSchema: {
          additionalProperties: false,
          properties: { query: { minLength: 1, type: 'string' } },
          required: ['query'],
          type: 'object',
        },
        annotations: { readOnlyHint: true },
        async execute(input) {
          try {
            const query =
              typeof input.query === 'string' ? input.query.trim().toLocaleLowerCase() : '';
            if (!query) {
              return failure(new Error('A non-empty query is required.'));
            }

            const portfolio = await getPortfolio();
            const projects = portfolio.projects.filter((project) =>
              [
                project.name,
                project.category,
                project.description,
                project.year,
                ...project.stack,
              ].some((value) => value.toLocaleLowerCase().includes(query)),
            );

            return result({ query, count: projects.length, projects });
          } catch (error) {
            return failure(error);
          }
        },
      },
    ];

    const registration = Promise.all(
      tools.map((tool) =>
        Promise.resolve().then(() => {
          if (controller.signal.aborted) return;
          return modelContext.registerTool(tool, { signal: controller.signal });
        }),
      ),
    );

    void registration.catch((error: unknown) => {
      if (!controller.signal.aborted) {
        console.error('WebMCP tool registration failed.', error);
      }
    });

    return () => controller.abort();
  }, []);

  return null;
}
