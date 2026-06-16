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
});
