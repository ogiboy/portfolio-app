import { describe, expect, it } from 'vitest';
import { GET as getMarkdown } from '@/app/api/agent/markdown/route';
import { getAgentMarkdown, markdownResponse } from '@/lib/agent-markdown';
import { acceptsMarkdown, appendVary } from '@/lib/markdown-negotiation';

describe('markdown negotiation', () => {
  it('only accepts an explicit positive text/markdown media range', () => {
    expect(acceptsMarkdown('text/markdown')).toBe(true);
    expect(acceptsMarkdown('text/html, text/markdown;q=0.4')).toBe(true);
    expect(acceptsMarkdown('text/markdown;q=0')).toBe(false);
    expect(acceptsMarkdown('text/markdown;q=2')).toBe(false);
    expect(acceptsMarkdown('text/markdown;q=invalid')).toBe(false);
    expect(acceptsMarkdown('text/*, */*')).toBe(false);
    expect(acceptsMarkdown(null)).toBe(false);
  });

  it('merges Accept into an existing Vary header', () => {
    const headers = new Headers({ Vary: 'RSC, Accept-Encoding' });
    appendVary(headers, 'Accept');
    appendVary(headers, 'Accept');

    expect(headers.get('Vary')).toBe('RSC, Accept-Encoding, Accept');
  });

  it('renders only the supported localized portfolio paths', async () => {
    expect(getAgentMarkdown('/en')?.locale).toBe('en');
    expect(getAgentMarkdown('/tr/projects')).toMatchObject({ locale: 'tr' });
    expect(getAgentMarkdown('/en/projects/graduation-project')?.body).toContain(
      'Graduation Project',
    );
    expect(getAgentMarkdown('/en/dashboard')).toBeUndefined();
    expect(getAgentMarkdown('/fr/projects')).toBeUndefined();
    expect(getAgentMarkdown('/en/projects/not-a-project')).toBeUndefined();

    const notFound = markdownResponse('/tr/not-a-public-page');
    expect(notFound.status).toBe(404);
    expect(notFound.headers.get('content-language')).toBe('tr');
    expect(notFound.headers.get('content-type')).toBe('text/markdown; charset=utf-8');
    expect(notFound.headers.get('cache-control')).toBe('private, no-store');
    await expect(notFound.text()).resolves.toContain('Not found');
  });

  it('returns equivalent headers and no body for markdown HEAD responses', async () => {
    const getResponse = markdownResponse('/en/projects', { includeBody: true });
    const headResponse = markdownResponse('/en/projects', { includeBody: false });

    expect(headResponse.status).toBe(getResponse.status);
    expect(headResponse.headers).toEqual(getResponse.headers);
    await expect(headResponse.text()).resolves.toBe('');
  });

  it('varies a negotiated root locale on every language selector', () => {
    const response = markdownResponse('/tr', { includeBody: true, varyLocale: true });

    expect(response.headers.get('vary')).toBe('Accept, Accept-Language, Cookie');
    expect(response.headers.get('cache-control')).toBe('private, no-store');
  });

  it('rejects direct markdown route requests without positive markdown consent', async () => {
    const rejected = getMarkdown(
      new Request('https://portfolio.test/api/agent/markdown?pathname=/en', {
        headers: { Accept: 'text/markdown;q=0' },
      }),
    );
    const accepted = getMarkdown(
      new Request('https://portfolio.test/api/agent/markdown?pathname=/en', {
        headers: { Accept: 'text/markdown' },
      }),
    );

    expect(rejected.status).toBe(406);
    expect(rejected.headers.get('x-robots-tag')).toBe('noindex');
    expect(accepted.status).toBe(200);
    expect(accepted.headers.get('x-robots-tag')).toBe('noindex');
    await expect(accepted.text()).resolves.toContain('Portfolio');
  });
});
