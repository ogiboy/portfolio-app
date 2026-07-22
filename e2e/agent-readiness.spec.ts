import { expect, test } from '@playwright/test';

test('negotiates markdown only for an explicit positive markdown Accept header', async ({
  request,
}) => {
  const rootMarkdown = await request.get('/', {
    headers: { Accept: 'text/markdown', 'Accept-Language': 'en' },
    maxRedirects: 0,
  });
  expect(rootMarkdown.status()).toBe(200);
  expect(rootMarkdown.headers()['content-type']).toContain('text/markdown');
  expect(rootMarkdown.headers()['content-language']).toBe('en');
  expect(rootMarkdown.headers()['cache-control']).toContain('no-store');
  expect(rootMarkdown.headers().vary).toContain('Accept-Language');
  expect(rootMarkdown.headers().vary).toContain('Cookie');
  expect(rootMarkdown.headers()['set-cookie']).toBeUndefined();
  await expect(rootMarkdown.text()).resolves.toContain('# Oğuzcan Toptaş Portfolio');

  const rootTurkishMarkdown = await request.get('/', {
    headers: { Accept: 'text/markdown', 'Accept-Language': 'tr' },
    maxRedirects: 0,
  });
  expect(rootTurkishMarkdown.status()).toBe(200);
  expect(rootTurkishMarkdown.headers()['content-language']).toBe('tr');
  expect(rootTurkishMarkdown.headers()['cache-control']).toContain('no-store');
  expect(rootTurkishMarkdown.headers()['set-cookie']).toBeUndefined();
  await expect(rootTurkishMarkdown.text()).resolves.toContain('Template grid değil');

  const html = await request.get('/en/projects', { headers: { Accept: 'text/markdown;q=0' } });
  expect(html.status()).toBe(200);
  expect(html.headers()['content-type']).toContain('text/html');

  const markdown = await request.get('/en/projects', { headers: { Accept: 'text/markdown' } });
  expect(markdown.status()).toBe(200);
  expect(markdown.headers()['content-type']).toContain('text/markdown');
  expect(markdown.headers()['cache-control']).toContain('no-store');
  expect(markdown.headers().vary).toContain('Accept');
  await expect(markdown.text()).resolves.toContain('# Project archive');
});

test('keeps Agent Skills artifact and discovery digest in sync', async ({ request }) => {
  const index = await (await request.get('/.well-known/agent-skills/index.json')).json();
  const artifactUrl = new URL(index.skills[0].url);
  const artifact = await (await request.get(`${artifactUrl.pathname}${artifactUrl.search}`)).text();
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(artifact));
  const hex = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join(
    '',
  );

  expect(index.skills[0].digest).toBe(`sha256:${hex}`);
  expect(artifact).toMatch(
    /^---\nname: portfolio-navigation\ndescription: .+\n---\n\n# Portfolio navigation/,
  );
});

test('serves localized detail, lab, unknown, and HEAD markdown variants', async ({ request }) => {
  const detail = await request.get('/tr/projects/weather-simplified', {
    headers: { Accept: 'text/markdown' },
  });
  expect(detail.status()).toBe(200);
  expect(detail.headers()['content-language']).toBe('tr');
  await expect(detail.text()).resolves.toContain('# Weather Simplified');

  const lab = await request.get('/en/labs/retro-game-center', {
    headers: { Accept: 'text/markdown' },
  });
  expect(lab.status()).toBe(200);
  await expect(lab.text()).resolves.toContain('# Retro Game Center');

  const missing = await request.get('/tr/not-a-public-page', {
    headers: { Accept: 'text/markdown' },
  });
  expect(missing.status()).toBe(404);
  expect(missing.headers()['content-type']).toContain('text/markdown');
  expect(missing.headers()['content-language']).toBe('tr');

  const head = await request.head('/tr/projects', {
    headers: { Accept: 'text/markdown' },
  });
  expect(head.status()).toBe(200);
  expect(head.headers()['content-language']).toBe('tr');
  expect((await head.body()).byteLength).toBe(0);
});

test('registers the public read-only WebMCP tools on the English home page', async ({ page }) => {
  await page.addInitScript(() => {
    const registrations: Array<{ name: string; signal: AbortSignal }> = [];
    document.modelContext = {
      async registerTool(tool, options) {
        registrations.push({ name: tool.name, signal: options.signal });
      },
    };
    Object.defineProperty(window, '__webMcpRegistrations', { value: registrations });
  });

  await page.goto('/en');
  await expect
    .poll(() =>
      page.evaluate(() => window.__webMcpRegistrations.filter(({ signal }) => !signal.aborted)),
    )
    .toHaveLength(2);
  await expect(
    page.evaluate(() => window.__webMcpRegistrations.map(({ name }) => name)),
  ).resolves.toEqual(['portfolio_overview', 'search_public_portfolio_projects']);
});
