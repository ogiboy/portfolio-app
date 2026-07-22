import { afterEach, describe, expect, it, vi } from 'vitest';

const siteUrlEnv = 'NEXT_PUBLIC_SITE_URL';
const originalSiteUrl = process.env[siteUrlEnv];

async function loadSiteUrl() {
  vi.resetModules();
  return import('@/lib/site-url');
}

afterEach(() => {
  if (originalSiteUrl === undefined) {
    delete process.env[siteUrlEnv];
  } else {
    process.env[siteUrlEnv] = originalSiteUrl;
  }
  vi.resetModules();
});

describe('site URL resolution', () => {
  it('uses the canonical public origin by default', async () => {
    delete process.env[siteUrlEnv];

    const { siteOrigin, siteUrl } = await loadSiteUrl();

    expect(siteOrigin).toBe('https://www.oguzcantoptas.com');
    expect(siteUrl('/en')).toBe('https://www.oguzcantoptas.com/en');
  });

  it('uses and normalizes a valid configured origin', async () => {
    process.env[siteUrlEnv] = ' https://preview.example.com/some/path/ ';

    const { siteOrigin, siteUrl } = await loadSiteUrl();

    expect(siteOrigin).toBe('https://preview.example.com');
    expect(siteUrl('/tr')).toBe('https://preview.example.com/tr');
  });

  it('rejects insecure configured origins outside localhost', async () => {
    process.env[siteUrlEnv] = 'http://preview.example.com';

    await expect(loadSiteUrl()).rejects.toThrow(
      'NEXT_PUBLIC_SITE_URL must use HTTPS outside localhost.',
    );
  });
});
