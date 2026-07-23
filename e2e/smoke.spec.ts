import { expect, test, type Page } from '@playwright/test';

async function expectLocalizedHomeMetadata({
  page,
  locale,
  title,
  description,
}: {
  page: Page;
  locale: 'en' | 'tr';
  title: string;
  description: string;
}) {
  const canonical = `https://www.oguzcantoptas.com/${locale}`;

  await expect(page).toHaveTitle(title);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', description);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical);
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
    'href',
    'https://www.oguzcantoptas.com/en',
  );
  await expect(page.locator('link[rel="alternate"][hreflang="tr"]')).toHaveAttribute(
    'href',
    'https://www.oguzcantoptas.com/tr',
  );
  await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute(
    'href',
    'https://www.oguzcantoptas.com/en',
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index.*follow/);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', title);
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    'content',
    description,
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', canonical);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    new RegExp(`/${locale}/opengraph-image(?:\\?.*)?$`),
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    'content',
    'summary_large_image',
  );
  await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', title);
  await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute(
    'content',
    description,
  );
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
    'content',
    new RegExp(`/${locale}/twitter-image(?:\\?.*)?$`),
  );
  expect(await page.locator('script[type="application/ld+json"]').textContent()).toContain(
    'Halil Oğuzcan Toptaş',
  );
}

test('renders localized public portfolio routes', async ({ page }) => {
  await page.goto('/en');
  await expectLocalizedHomeMetadata({
    page,
    locale: 'en',
    title: 'H.O.T. | Halil Oğuzcan Toptaş - Developer & Homelab',
    description:
      'Developer and homelab portfolio of Halil Oğuzcan Toptaş: production web software, automation, project archives, and a live WebAssembly lab.',
  });
  await expect(
    page.getByRole('banner').getByRole('link', { name: /H\.O\.T.*Halil Oğuzcan Toptaş.*home/i }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: /public software, homelab systems/i }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: /see the archive/i })).toBeVisible();
  await page.goto('/tr');
  await expectLocalizedHomeMetadata({
    page,
    locale: 'tr',
    title: 'H.O.T. | Halil Oğuzcan Toptaş - Geliştirici & Homelab',
    description:
      'Halil Oğuzcan Toptaş geliştirme ve homelab portföyü: production web yazılımları, otomasyon, proje arşivi ve canlı WebAssembly laboratuvarı.',
  });
  await expect(
    page
      .getByRole('banner')
      .getByRole('link', { name: /H\.O\.T.*Halil Oğuzcan Toptaş.*ana sayfa/i }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: /public yazılımlar, homelab sistemleri/i }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: /arşivi gör/i })).toBeVisible();

  await page.goto('/en/projects');
  await expect(page.getByRole('heading', { name: /project archive/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /case/i }).first()).toBeVisible();
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    /\/en\/opengraph-image(?:\?.*)?$/,
  );

  await page.goto('/en/labs/retro-game-center');
  await expect(page.getByRole('heading', { name: /retro game center boots/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /boot demo/i })).toBeVisible();
  await expect(page.locator('iframe')).toHaveCount(0);

  await page.getByRole('button', { name: /boot demo/i }).click();
  const gameFrame = page.locator('iframe').first();
  await expect(gameFrame).toHaveAttribute('sandbox', /allow-scripts/);
  await expect(gameFrame).not.toHaveAttribute('sandbox', /allow-same-origin/);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/tr/labs/retro-game-center');
  const mobileLayout = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(mobileLayout.scrollWidth).toBeLessThanOrEqual(mobileLayout.clientWidth);
});

test('keeps canonical locale routes free of locale-cookie cache variance', async ({ request }) => {
  const english = await request.get('/en');
  expect(english.status()).toBe(200);
  expect(english.headers()['set-cookie']).toBeUndefined();

  const detectedRoot = await request.get('/', {
    headers: { 'Accept-Language': 'tr' },
    maxRedirects: 0,
  });
  expect([307, 308]).toContain(detectedRoot.status());
  expect(detectedRoot.headers().location).toContain('/tr');
  expect(detectedRoot.headers()['set-cookie']).toBeUndefined();
});

test('keeps aggregate telemetry transparent and locally optional', async ({ page }) => {
  await page.goto('/en/privacy');
  await expect(page.getByRole('heading', { name: /useful signals/i })).toBeVisible();
  await expect(page.getByText(/Sentry and Session Replay are not active/i)).toBeVisible();
  await expect(page.getByText(/aggregate analytics are enabled/i)).toBeVisible();

  await page.getByRole('button', { name: /disable analytics/i }).click();
  await expect(page.getByText(/aggregate analytics are disabled/i)).toBeVisible();
  await expect(page.locator('script[src*="/_vercel/"]')).toHaveCount(0);
  await expect
    .poll(() => page.evaluate(() => window.localStorage.getItem('hot:analytics-disabled')))
    .toBe('1');

  await page.reload();
  await expect(page.getByText(/aggregate analytics are disabled/i)).toBeVisible();
});

test('keeps cinematic motion alive without trapping reduced-motion or mobile layouts', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/en');

  const rail = page.locator('[data-cinematic-rail]');
  const track = page.locator('[data-cinematic-track]');
  await expect(rail).toBeVisible();
  await expect.poll(() => rail.evaluate((element) => element.style.height)).toContain('calc(');
  const initialTrackLeft = await track.evaluate((element) => element.getBoundingClientRect().left);

  await rail.evaluate((element) => {
    const railElement = element as HTMLElement;
    const railTop = railElement.getBoundingClientRect().top + window.scrollY;
    const travel = Math.max(railElement.scrollHeight - window.innerHeight, 0);
    window.scrollTo({
      top: railTop + travel / 2,
      behavior: 'instant',
    });
  });
  await expect
    .poll(() => track.evaluate((element) => element.getBoundingClientRect().left))
    .toBeLessThan(initialTrackLeft - 20);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await expect.poll(() => rail.evaluate((element) => element.style.height)).toBe('');
  await expect
    .poll(() =>
      rail.locator(':scope > div').evaluate((element) => getComputedStyle(element).position),
    )
    .not.toBe('sticky');

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await expect.poll(() => rail.evaluate((element) => element.style.height)).toBe('');
});
