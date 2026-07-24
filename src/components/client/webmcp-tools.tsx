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
const projectSearchInputSchema: JsonSchema = {
  additionalProperties: false,
  properties: { query: { minLength: 1, type: 'string' } },
  required: ['query'],
  type: 'object',
};

function projectMatchesQuery(project: PublicProject, query: string) {
  const searchableValues = [
    project.name,
    project.category,
    project.description,
    project.year,
    ...project.stack,
  ];

  return searchableValues.some((value) => value.toLocaleLowerCase().includes(query));
}

async function portfolioOverview() {
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
}

async function searchPortfolioProjects(input: Record<string, unknown>) {
  try {
    const query = typeof input.query === 'string' ? input.query.trim().toLocaleLowerCase() : '';
    if (!query) {
      return failure(new Error('A non-empty query is required.'));
    }

    const portfolio = await getPortfolio();
    const matchingProjects = portfolio.projects.filter((project) =>
      projectMatchesQuery(project, query),
    );

    return result({ query, count: matchingProjects.length, projects: matchingProjects });
  } catch (error) {
    return failure(error);
  }
}

const portfolioTools: ModelContextTool[] = [
  {
    name: 'portfolio_overview',
    description:
      'Read the public portfolio overview, contact channels, and available project count.',
    inputSchema: emptyInputSchema,
    annotations: { readOnlyHint: true },
    execute: portfolioOverview,
  },
  {
    name: 'search_public_portfolio_projects',
    description:
      'Search public portfolio projects by name, category, description, year, or technology.',
    inputSchema: projectSearchInputSchema,
    annotations: { readOnlyHint: true },
    execute: searchPortfolioProjects,
  },
];

function registerPortfolioTools(modelContext: ModelContext, signal: AbortSignal) {
  if (modelContext.registerTool) {
    const registerTool = modelContext.registerTool;
    return Promise.all(
      portfolioTools.map((tool) => Promise.resolve(registerTool(tool, { signal }))),
    );
  }

  if (modelContext.provideContext) {
    return Promise.resolve(modelContext.provideContext({ tools: portfolioTools }));
  }

  return Promise.resolve();
}

function clearProvidedTools(modelContext: ModelContext) {
  if (modelContext.provideContext && !modelContext.registerTool) {
    void Promise.resolve(modelContext.provideContext({ tools: [] })).catch(() => undefined);
  }
}

/**
 * Reports a WebMCP tool registration failure unless the operation was aborted.
 *
 * @param error - The registration error to report
 * @param signal - The signal indicating whether registration was aborted
 */
function reportRegistrationFailure(error: unknown, signal: AbortSignal) {
  if (!signal.aborted) {
    console.error('WebMCP tool registration failed.', error);
  }
}

/** Registers read-only portfolio tools when a browser model context is available. */
export function WebMcpTools() {
  useEffect(() => {
    const modelContext = document.modelContext ?? navigator.modelContext;
    if (!modelContext) {
      return;
    }

    const controller = new AbortController();
    void registerPortfolioTools(modelContext, controller.signal).catch((error: unknown) =>
      reportRegistrationFailure(error, controller.signal),
    );

    return () => {
      controller.abort();
      clearProvidedTools(modelContext);
    };
  }, []);

  return null;
}
