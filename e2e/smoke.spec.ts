import { expect, test } from '@playwright/test';

test('renders localized public portfolio routes', async ({ page }) => {
  await page.goto('/en');
  await expect(page.getByRole('heading', { name: /sharp web interfaces/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /see the archive/i })).toBeVisible();

  await page.goto('/tr');
  await expect(page.getByRole('heading', { name: /ham ürün fikirlerini/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /arşivi gör/i })).toBeVisible();

  await page.goto('/en/projects');
  await expect(page.getByRole('heading', { name: /project archive/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /case/i }).first()).toBeVisible();

  await page.goto('/en/labs/retro-game-center');
  await expect(page.getByRole('heading', { name: /retro game center boots/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /boot demo/i })).toBeVisible();
  await expect(page.locator('iframe')).toHaveCount(0);

  await page.getByRole('button', { name: /boot demo/i }).click();
  const gameFrame = page.locator('iframe').first();
  await expect(gameFrame).toHaveAttribute('sandbox', /allow-scripts/);
  await expect(gameFrame).not.toHaveAttribute('sandbox', /allow-same-origin/);
});
