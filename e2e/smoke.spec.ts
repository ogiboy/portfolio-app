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

  const wasmRequests: string[] = [];
  page.on('request', (request) => {
    const path = new URL(request.url()).pathname;
    if (path.startsWith('/wasm/')) wasmRequests.push(path);
  });

  await page.goto('/en/labs/retro-game-center');
  await expect(page.getByRole('heading', { name: /retro game center boots/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /boot demo/i })).toBeVisible();
  await expect(page.locator('iframe')).toHaveCount(0);
  expect(wasmRequests).toEqual([]);

  await page.getByRole('button', { name: /boot demo/i }).click();
  const gameFrame = page.locator('iframe').first();
  await expect(gameFrame).toHaveAttribute('sandbox', /allow-scripts/);
  await expect(gameFrame).not.toHaveAttribute('sandbox', /allow-same-origin/);
  await expect(page.getByText('DOS machine ready', { exact: true })).toBeVisible({
    timeout: 20_000,
  });
  expect(wasmRequests).toContain('/wasm/engine/main.wasm');
  expect(wasmRequests).toContain('/wasm/roms/doom/DOOM1.WAD');

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
  expect(detectedRoot.headers().vary).toContain('Accept-Language');
  expect(detectedRoot.headers()['cache-control']).toContain('private');
  expect(detectedRoot.headers()['cache-control']).toContain('no-store');
});

test('serves sandbox-compatible WASM asset headers', async ({ request }) => {
  const manifest = await request.get('/wasm/manifest.json');
  expect(manifest.status()).toBe(200);
  expect(manifest.headers()['access-control-allow-origin']).toBe('*');
  expect(manifest.headers()['cross-origin-resource-policy']).toBe('cross-origin');
  expect(manifest.headers()['cache-control']).toContain('max-age=60');

  const runtime = await request.get('/wasm/engine/main.wasm');
  expect(runtime.status()).toBe(200);
  expect(runtime.headers()['content-type']).toContain('application/wasm');
  expect(runtime.headers()['cache-control']).toContain('immutable');

  const frame = await request.get('/wasm/engine/index.html');
  expect(frame.headers()['content-security-policy']).toContain('wasm-unsafe-eval');
  expect(frame.headers()['content-security-policy']).toContain('http://127.0.0.1:*');
});

test('provides localized mobile navigation with focus recovery', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/en');

  const englishTrigger = page.getByRole('button', { name: 'Open navigation' });
  await expect(englishTrigger).toBeVisible();
  await englishTrigger.click();

  const englishDialog = page.getByRole('dialog', { name: 'Primary navigation' });
  await expect(englishDialog).toBeVisible();
  for (const name of ['Home', 'Projects', 'Lab', 'Process', 'Contact']) {
    await expect(englishDialog.getByRole('link', { name })).toBeVisible();
  }

  await page.keyboard.press('Escape');
  await expect(englishDialog).toBeHidden();
  await expect(englishTrigger).toBeFocused();

  await englishTrigger.click();
  await englishDialog.getByRole('link', { name: 'Projects' }).click();
  await expect(page).toHaveURL(/\/en\/projects$/);
  await expect(englishDialog).toBeHidden();

  await page.goto('/tr');
  const turkishTrigger = page.getByRole('button', { name: 'Navigasyonu aç' });
  await turkishTrigger.click();
  const turkishDialog = page.getByRole('dialog', { name: 'Ana gezinme' });
  await expect(turkishDialog).toBeVisible();
  for (const name of ['Ana sayfa', 'Projeler', 'Lab', 'Süreç', 'İletişim']) {
    await expect(turkishDialog.getByRole('link', { name })).toBeVisible();
  }
});

test('offers localized recovery from missing routes', async ({ page }) => {
  await page.goto('/en/route-that-does-not-exist');
  await expect(page.getByRole('heading', { name: 'This path left the map.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Return home' })).toHaveAttribute('href', '/en');
  await expect(page.getByRole('link', { name: 'Browse projects' })).toHaveAttribute(
    'href',
    '/en/projects',
  );

  await page.goto('/tr/olmayan-bir-rota');
  await expect(page.getByRole('heading', { name: 'Bu yol haritadan çıkmış.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Ana sayfaya dön' })).toHaveAttribute('href', '/tr');
  await expect(page.getByRole('link', { name: 'Projeleri incele' })).toHaveAttribute(
    'href',
    '/tr/projects',
  );
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
  await expect
    .poll(() =>
      track.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return rect.top >= -1 && rect.bottom <= window.innerHeight + 1;
      }),
    )
    .toBe(true);
  await expect
    .poll(() =>
      track.locator('article').evaluateAll((articles) =>
        articles.some((article) => {
          const rect = article.getBoundingClientRect();
          const visible = rect.right > 0 && rect.left < window.innerWidth;
          return visible && Number.parseFloat(getComputedStyle(article).opacity) > 0.9;
        }),
      ),
    )
    .toBe(true);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await expect.poll(() => rail.evaluate((element) => element.style.height)).toBe('');
  await expect
    .poll(() =>
      rail.locator(':scope > div').evaluate((element) => getComputedStyle(element).position),
    )
    .not.toBe('sticky');
  await expect(track.locator('article').first()).toBeVisible();
  await expect
    .poll(() =>
      track.evaluate((element) => ({
        cardsVisible: [...element.querySelectorAll('article')].every(
          (article) =>
            getComputedStyle(article).visibility === 'visible' &&
            Number.parseFloat(getComputedStyle(article).opacity) > 0.99,
        ),
        translateX: new DOMMatrix(getComputedStyle(element).transform).m41,
      })),
    )
    .toEqual({ cardsVisible: true, translateX: 0 });

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await expect.poll(() => rail.evaluate((element) => element.style.height)).toBe('');
  await expect
    .poll(() =>
      rail.locator(':scope > div').evaluate((element) => getComputedStyle(element).position),
    )
    .not.toBe('sticky');
  const firstMobileProject = track.locator('article').first();
  await firstMobileProject.scrollIntoViewIfNeeded();
  await expect(firstMobileProject).toBeVisible();
  await expect
    .poll(() =>
      track.evaluate((element) => ({
        firstCardOpacity: Number.parseFloat(
          getComputedStyle(element.querySelector('article') as HTMLElement).opacity,
        ),
        translateX: new DOMMatrix(getComputedStyle(element).transform).m41,
      })),
    )
    .toEqual({ firstCardOpacity: 1, translateX: 0 });
});

test('keeps the cinematic rail static for coarse pointers and data saver', async ({ browser }) => {
  const coarseContext = await browser.newContext({
    hasTouch: true,
    viewport: { width: 1280, height: 800 },
  });
  const coarsePage = await coarseContext.newPage();
  await coarsePage.goto('/en');

  const coarseRail = coarsePage.locator('[data-cinematic-rail]');
  await expect
    .poll(() => coarsePage.evaluate(() => window.matchMedia('(pointer: coarse)').matches))
    .toBe(true);
  await expect(coarseRail).toHaveAttribute('data-motion-mode', 'static');
  await expect.poll(() => coarseRail.evaluate((element) => element.style.height)).toBe('');
  await expect(coarseRail.locator('article').first()).toBeVisible();
  await coarseContext.close();

  const saveDataContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  await saveDataContext.addInitScript(() => {
    Object.defineProperty(window.navigator, 'connection', {
      configurable: true,
      value: {
        addEventListener() {},
        removeEventListener() {},
        saveData: true,
      },
    });
  });
  const saveDataPage = await saveDataContext.newPage();
  await saveDataPage.goto('/en');

  const saveDataRail = saveDataPage.locator('[data-cinematic-rail]');
  await expect(saveDataRail).toHaveAttribute('data-motion-mode', 'static');
  await expect.poll(() => saveDataRail.evaluate((element) => element.style.height)).toBe('');
  await expect(saveDataRail.locator('article').first()).toBeVisible();
  await saveDataContext.close();
});
