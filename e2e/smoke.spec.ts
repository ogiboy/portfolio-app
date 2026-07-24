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
  const appleIcon = page.locator('link[rel="apple-touch-icon"]');
  await expect(appleIcon).toHaveAttribute('href', /\/apple-icon\.png(?:\?.*)?$/);
  const appleIconHref = await appleIcon.getAttribute('href');
  const appleIconResponse = await page.request.get(
    new URL(appleIconHref ?? '/', page.url()).toString(),
  );
  expect(appleIconResponse.ok()).toBe(true);
  expect(appleIconResponse.headers()['content-type']).toContain('image/png');
  expect(await page.locator('script[type="application/ld+json"]').textContent()).toContain(
    'Halil Oğuzcan Toptaş',
  );
}

async function expectUniqueHeadingText(page: Page) {
  const headings = await page.locator('h1, h2, h3, h4, h5, h6').allInnerTexts();
  const normalized = headings.map((heading) => heading.replace(/\s+/g, ' ').trim());

  expect(new Set(normalized).size).toBe(normalized.length);
}

test('renders localized public portfolio routes', async ({ page }) => {
  await page.goto('/en');
  await expectLocalizedHomeMetadata({
    page,
    locale: 'en',
    title: 'H.O.T. | Halil Oğuzcan Toptaş - Developer & Homelab',
    description:
      'H.O.T. is Halil Oğuzcan Toptaş’s developer and homelab portfolio: frontend projects, automation, self-hosting experiments, a project archive, and an isolated WebAssembly lab.',
  });
  await expect(
    page.getByRole('banner').getByRole('link', { name: /H\.O\.T.*Halil Oğuzcan Toptaş.*home/i }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: /Halil Oğuzcan Toptaş.*web interfaces, homelab systems/i }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: /see the archive/i })).toBeVisible();
  await expectUniqueHeadingText(page);
  await page.goto('/tr');
  await expectLocalizedHomeMetadata({
    page,
    locale: 'tr',
    title: 'H.O.T. | Halil Oğuzcan Toptaş - Geliştirici & Homelab',
    description:
      'H.O.T., Halil Oğuzcan Toptaş’ın geliştirici ve homelab portföyüdür: frontend projeleri, otomasyon, self-hosting denemeleri, proje arşivi ve izole WebAssembly labı.',
  });
  await expect(
    page
      .getByRole('banner')
      .getByRole('link', { name: /H\.O\.T.*Halil Oğuzcan Toptaş.*ana sayfa/i }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', {
      name: /Halil Oğuzcan Toptaş.*web arayüzleri, homelab sistemleri/i,
    }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: /arşivi gör/i })).toBeVisible();
  await expectUniqueHeadingText(page);

  await page.goto('/en/about');
  await expect(page).toHaveTitle('About Halil Oğuzcan Toptaş | H.O.T.');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    'Meet Halil Oğuzcan Toptaş, an Istanbul-based software developer and homelab hobbyist building web interfaces, automation systems, and browser experiments.',
  );
  await expect(page.getByRole('heading', { name: 'Halil Oğuzcan Toptaş' })).toBeVisible();
  await expect(page.getByRole('banner').getByRole('link', { name: 'About' })).toHaveAttribute(
    'aria-current',
    'page',
  );
  await expect(page.getByRole('link', { name: 'Open LinkedIn' })).toHaveAttribute(
    'href',
    'https://www.linkedin.com/in/hoguzcantoptas/',
  );
  expect(await page.locator('script[type="application/ld+json"]').textContent()).toContain(
    '"@type":"ProfilePage"',
  );
  expect(await page.locator('script[type="application/ld+json"]').textContent()).toContain(
    '"homeLocation":{"@type":"City","name":"Istanbul, Türkiye"}',
  );

  await page.goto('/tr/about');
  await expect(page).toHaveTitle('Halil Oğuzcan Toptaş hakkında | H.O.T.');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    'Halil Oğuzcan Toptaş, İstanbul’da web arayüzleri, otomasyon sistemleri ve browser deneyleri geliştiren bir yazılım geliştirici ve homelab meraklısıdır.',
  );
  await expect(page.getByRole('heading', { name: 'Halil Oğuzcan Toptaş' })).toBeVisible();
  await expect(page.getByRole('banner').getByRole('link', { name: 'Hakkında' })).toHaveAttribute(
    'aria-current',
    'page',
  );
  await expect(page.getByRole('link', { name: 'Labı aç' })).toHaveAttribute(
    'href',
    '/tr/labs/retro-game-center',
  );
  expect(await page.locator('script[type="application/ld+json"]').textContent()).toContain(
    '"jobTitle":"Yazılım geliştirici ve homelab meraklısı"',
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Navigasyonu aç' }).click();
  await expect(page.getByRole('dialog', { name: 'Ana gezinme' })).toBeVisible();
  await expect(page.getByRole('dialog').getByRole('link', { name: 'Hakkında' })).toHaveAttribute(
    'href',
    '/tr/about',
  );
  await page.keyboard.press('Escape');
  await page.setViewportSize({ width: 1280, height: 720 });

  await page.goto('/en/projects');
  await expect(page.getByRole('heading', { name: /project archive/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /case/i }).first()).toBeVisible();
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    /\/en\/opengraph-image(?:\?.*)?$/,
  );
  await expect(page.getByRole('banner').getByRole('link', { name: 'Projects' })).toHaveAttribute(
    'aria-current',
    'page',
  );

  await page.goto('/tr/projects');
  const turkishProject = page.locator('[data-project-card="isletmecii-idler-game"]');
  await expect(turkishProject.getByText('Oyun Arayüzü', { exact: true })).toBeVisible();
  await expect(
    turkishProject.getByText(/Oyuncuların para kazanıp çalışan işe alarak/i),
  ).toBeVisible();
  await turkishProject.getByRole('link', { name: 'Detay: İşletmecii - Idler Game' }).click();
  await expect(page).toHaveURL(/\/tr\/projects\/isletmecii-idler-game$/);
  await expect(page.getByText(/Oyuncuların para kazanıp çalışan işe alarak/i)).toBeVisible();
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    /Oyuncuların para kazanıp çalışan işe alarak/i,
  );
  expect(await page.locator('script[type="application/ld+json"]').textContent()).toContain(
    'Oyuncuların para kazanıp çalışan işe alarak',
  );
  await expect(page.getByRole('banner').getByRole('link', { name: 'Projeler' })).toHaveAttribute(
    'aria-current',
    'page',
  );

  const wasmRequests: string[] = [];
  page.on('request', (request) => {
    const path = new URL(request.url()).pathname;
    if (path.startsWith('/wasm/')) wasmRequests.push(path);
  });

  await page.goto('/en/labs/retro-game-center');
  await expect(page).toHaveTitle('Retro Game Center: DOOM in WebAssembly | H.O.T.');
  await expect(
    page.getByRole('heading', { name: /retro game center.*doom shareware.*webassembly/i }),
  ).toBeVisible();
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
  await expect(page).toHaveTitle('Retro Game Center: WebAssembly ile DOOM | H.O.T.');
  const mobileLayout = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(mobileLayout.scrollWidth).toBeLessThanOrEqual(mobileLayout.clientWidth);
});

test('keeps the hero Signal arrival finite and removes it for reduced motion', async ({ page }) => {
  await page.goto('/en');

  const heroCopy = page.locator('.hero-signal__copy');
  await expect(heroCopy).toBeVisible();
  await expect(heroCopy).toHaveCSS('animation-name', 'hero-signal-arrival');
  await expect(heroCopy).toHaveCSS('animation-duration', '0.52s');
  await expect(heroCopy).toHaveCSS('animation-iteration-count', '1');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/en');

  await expect(heroCopy).toBeVisible();
  await expect(heroCopy).toHaveCSS('animation-name', 'none');
  await expect(heroCopy).toHaveCSS('transform', 'none');
});

test('turns a WASM runtime asset 404 into an explicit retry state', async ({ page }) => {
  await page.route('**/wasm/engine/main.ttf', (route) =>
    route.fulfill({ body: 'missing', contentType: 'text/plain', status: 404 }),
  );
  await page.goto('/en/labs/retro-game-center');

  await page.getByRole('button', { name: /boot demo/i }).click();

  await expect(page.getByRole('heading', { name: /the dos machine did not boot/i })).toBeVisible({
    timeout: 20_000,
  });
  await expect(page.getByRole('button', { name: /retry boot/i })).toBeVisible();
  await expect(page.locator('iframe')).toHaveCount(0);
});

test('finishes WASM initialization when IndexedDB cannot be read', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'indexedDB', {
      configurable: true,
      value: {
        open() {
          const request: {
            onsuccess?: (event: { target: { result: { transaction(): never } } }) => void;
          } = {};
          window.setTimeout(() => {
            request.onsuccess?.({
              target: {
                result: {
                  transaction() {
                    throw new Error('IndexedDB transaction unavailable');
                  },
                },
              },
            });
          }, 0);
          return request;
        },
      },
    });
  });
  await page.goto('/en/labs/retro-game-center');

  await page.getByRole('button', { name: /boot demo/i }).click();

  await expect(page.getByText('DOS machine ready', { exact: true })).toBeVisible({
    timeout: 20_000,
  });
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

test('publishes a truthful ads.txt declaration', async ({ request }) => {
  const response = await request.get('/ads.txt');

  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('text/plain');
  expect(await response.text()).toContain(
    'placeholder.example.com, placeholder, DIRECT, placeholder',
  );
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
  await expect(page.getByRole('heading', { name: /what this site measures/i })).toBeVisible();
  await expect(page.getByText(/Sentry and Session Replay are not active/i)).toBeVisible();
  await expect(page.getByText(/aggregate analytics are enabled/i)).toBeVisible();
  expect(await page.locator('script[type="application/ld+json"]').textContent()).toContain(
    '"@type":"WebPage"',
  );

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
  await track.locator('article').last().scrollIntoViewIfNeeded();
  await expect(track.locator('article').last()).toBeVisible();
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
  await coarseRail.locator('article').last().scrollIntoViewIfNeeded();
  await expect(coarseRail.locator('article').last()).toBeVisible();
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
  await saveDataRail.locator('article').last().scrollIntoViewIfNeeded();
  await expect(saveDataRail.locator('article').last()).toBeVisible();
  await saveDataContext.close();
});

test('alive interactions: preserves archive continuity through the next project route', async ({
  page,
}) => {
  await page.goto('/en/projects');

  const firstProject = page.locator('[data-project-card="isletmecii-idler-game"]');
  await expect(
    firstProject.getByRole('link', { name: 'Case: İşletmecii - Idler Game' }),
  ).toBeVisible();
  await expect(firstProject.locator('[data-project-position]')).toHaveText('Archive 01 / 18');

  await firstProject.getByRole('link', { name: 'Case: İşletmecii - Idler Game' }).click();
  await expect(page.getByRole('heading', { name: 'İşletmecii - Idler Game' })).toBeVisible();
  await expect(page.locator('[data-project-continuity]')).toHaveText('Archive 01 / 18');
  await expect(page.getByRole('heading', { name: 'Graduation Project', level: 2 })).toBeVisible();

  await page.getByRole('link', { name: 'Next project: Graduation Project' }).click();
  await expect(page).toHaveURL(/\/en\/projects\/graduation-project$/);
  await expect(page.getByRole('heading', { name: 'Graduation Project' })).toBeVisible();
  await expect(page.locator('[data-project-continuity]')).toHaveText('Archive 02 / 18');

  await page.getByRole('link', { name: 'Back to projects' }).click();
  await expect(page).toHaveURL(/\/en\/projects$/);
  await expect(
    page.locator('[data-project-card="graduation-project"] [data-project-position]'),
  ).toHaveText('Archive 02 / 18');
});

test('alive interactions: keeps the project archive within a 390px viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/en/projects');

  await expect
    .poll(() =>
      page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      })),
    )
    .toEqual({ clientWidth: 390, scrollWidth: 390 });
});

test('alive interactions: keeps project-card focus feedback static with reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/en/projects');

  const card = page.locator('[data-project-card="isletmecii-idler-game"]');
  const image = card.locator('.project-card__image');
  const beforeFocus = await card.evaluate((element) => ({
    boxShadow: getComputedStyle(element).boxShadow,
    transitionDuration: getComputedStyle(element).transitionDuration,
    transform: getComputedStyle(element).transform,
  }));

  await card.getByRole('link', { name: 'Case: İşletmecii - Idler Game' }).focus();
  await expect(card.getByRole('link', { name: 'Case: İşletmecii - Idler Game' })).toBeFocused();
  const focusedCard = await card.evaluate((element) => ({
    boxShadow: getComputedStyle(element).boxShadow,
    transitionDuration: getComputedStyle(element).transitionDuration,
    transform: getComputedStyle(element).transform,
  }));
  expect(focusedCard.boxShadow).not.toBe(beforeFocus.boxShadow);
  expect(Number.parseFloat(focusedCard.transitionDuration)).toBeLessThanOrEqual(0.01);
  expect(focusedCard.transform).toBe('none');
  await expect
    .poll(() =>
      image.evaluate((element) => Number.parseFloat(getComputedStyle(element).transitionDuration)),
    )
    .toBeLessThanOrEqual(0.01);
  await expect(image).toHaveCSS('transform', 'none');
});

test('alive interactions: serves usable home, archive, and detail semantics without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  await page.goto('/en');
  await expect(
    page.getByRole('heading', {
      name: /Halil Oğuzcan Toptaş.*web interfaces, homelab systems, and browser experiments/i,
    }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'See the archive' })).toHaveAttribute(
    'href',
    '/en/projects',
  );

  await page.goto('/en/projects');
  await expect(page.getByRole('heading', { name: 'Project archive' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Case: İşletmecii - Idler Game' })).toHaveAttribute(
    'href',
    '/en/projects/isletmecii-idler-game',
  );

  await page.goto('/en/projects/isletmecii-idler-game');
  await expect(page.getByRole('heading', { name: 'İşletmecii - Idler Game' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Back to projects' })).toHaveAttribute(
    'href',
    '/en/projects',
  );
  await expect(
    page.getByRole('link', { name: 'Next project: Graduation Project' }),
  ).toHaveAttribute('href', '/en/projects/graduation-project');

  await context.close();
});
