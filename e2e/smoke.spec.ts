import { expect, test } from '@playwright/test';

test('renders localized public portfolio routes', async ({ page }) => {
  await page.goto('/en');
  await expect(page).toHaveTitle('H.O.T. | Halil Oğuzcan Toptaş - Developer & Homelab');
  await expect(
    page.getByRole('banner').getByRole('link', { name: /H\.O\.T.*Halil Oğuzcan Toptaş.*home/i }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: /public software, homelab systems/i }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: /see the archive/i })).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://www.oguzcantoptas.com/en',
  );
  await expect(page.locator('link[rel="alternate"][hreflang="tr"]')).toHaveAttribute(
    'href',
    'https://www.oguzcantoptas.com/tr',
  );
  expect(await page.locator('script[type="application/ld+json"]').textContent()).toContain(
    'Halil Oğuzcan Toptaş',
  );

  await page.goto('/tr');
  await expect(page).toHaveTitle('H.O.T. | Halil Oğuzcan Toptaş - Geliştirici & Homelab');
  await expect(
    page.getByRole('heading', { name: /public yazılımlar, homelab sistemleri/i }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: /arşivi gör/i })).toBeVisible();

  await page.goto('/en/projects');
  await expect(page.getByRole('heading', { name: /project archive/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /case/i }).first()).toBeVisible();
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    'https://www.oguzcantoptas.com/en/opengraph-image',
  );

  await page.goto('/en/labs/retro-game-center');
  await expect(page.getByRole('heading', { name: /retro game center boots/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /boot demo/i })).toBeVisible();
  await expect(page.locator('iframe')).toHaveCount(0);

  await page.getByRole('button', { name: /boot demo/i }).click();
  const gameFrame = page.locator('iframe').first();
  await expect(gameFrame).toHaveAttribute('sandbox', /allow-scripts/);
  await expect(gameFrame).not.toHaveAttribute('sandbox', /allow-same-origin/);
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
