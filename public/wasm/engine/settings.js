(function () {
  window.DOSWASMSETTINGS = {
    CLOUDSAVEURL: '',
    DEFAULTIMG: '',
  };

  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(script);
    });

  const updateProgress = (loaded, total) => {
    const bar = document.getElementById('myProgress');
    if (!bar) return;
    const percent = total > 0 ? Math.round((loaded / total) * 100) : 0;
    bar.style.width = `${percent}%`;
    bar.textContent = `${percent}%`;
  };

  const params = new URLSearchParams(window.location.search);
  const attempt = params.get('attempt') || 'unknown';
  const frameUrl = (() => {
    try {
      const candidate = new URL(window.location.href);
      return candidate.protocol === 'https:' || candidate.protocol === 'http:' ? candidate : null;
    } catch {
      return null;
    }
  })();

  const reportStatus = (status, message) => {
    if (!frameUrl || window.parent === window) return;

    window.parent.postMessage(
      {
        attempt,
        channel: 'hot-wasm',
        message,
        status,
        version: 1,
      },
      frameUrl.origin,
    );
  };

  const fetchManifest = async () => {
    try {
      const res = await fetch('/wasm/manifest.json', { cache: 'no-store' });
      if (!res.ok) return null;
      return await res.json();
    } catch (error) {
      console.warn('Manifest load failed', error);
      return null;
    }
  };

  const waitForAppReady = async () => {
    const start = Date.now();
    return new Promise((resolve, reject) => {
      const tick = () => {
        const app = window.myApp;
        const appState = app?.state;
        if (appState && !appState.moduleInitializing) {
          resolve(app);
          return;
        }
        if (Date.now() - start > 20000) {
          reject(new Error('WASM engine did not initialize in time.'));
          return;
        }
        setTimeout(tick, 120);
      };
      tick();
    });
  };

  const approvedGameAssets = Object.freeze(
    [
      'SETUP.EXE',
      'DWANGO.EXE',
      'DWANGO.STR',
      'DMFAQ66C.TXT',
      'DMFAQ66B.TXT',
      'DMFAQ66A.TXT',
      'SERSETUP.EXE',
      'MODEM.CFG',
      'DMFAQ66D.TXT',
      'MODEM.NUM',
      'DWANGO.DOC',
      'HELPME.TXT',
      'README.TXT',
      'DM.DOC',
      'DOOM.EXE',
      'ORDER.FRM',
      'DM.EXE',
      'IPXSETUP.EXE',
      'DEFAULT.CFG',
      'MODEM.STR',
      'DOOM1.WAD',
      'DOOMS_19.DAT',
    ].map((name) =>
      Object.freeze({
        manifestPath: `roms/doom/${name}`,
        name,
        url: `/wasm/roms/doom/${name}`,
      }),
    ),
  );

  const resolveGameAsset = (filePath) => {
    if (typeof filePath !== 'string') {
      throw new TypeError('Invalid game asset path.');
    }

    const approvedAsset = approvedGameAssets.find(
      (asset) => asset.manifestPath === filePath,
    );
    if (!approvedAsset) {
      throw new Error('Game assets must use an approved WASM ROM path.');
    }

    return approvedAsset;
  };

  const runtimeRevision = (manifest) => {
    const revision = manifest?.runtime?.revision;
    return typeof revision === 'string' && revision.length > 0 ? revision : 'doswasmx-v0.3';
  };

  const bootGame = async (game) => {
    const app = window.myApp;
    if (!app || !game) return;

    app.Run();

    if (game.startupScript) {
      const normalized = game.startupScript.replaceAll(';', '\n').trim();
      app.configuration.startupScript = normalized.endsWith('\n')
        ? normalized
        : `${normalized}\n`;
    }
    if (game.cpu) {
      app.state.cpu = game.cpu;
    }
    if (game.ram) {
      app.ram = Number(game.ram);
    }
    if (game.harddrive) {
      app.initialHardDrive = game.harddrive;
    }

    const files = Array.isArray(game.files) ? game.files : [];
    const total = files.length;
    let loaded = 0;

    app.multiFiles = await Promise.all(
      files.map(async (filePath) => {
        const asset = resolveGameAsset(filePath);
        const response = await fetch(asset.url, {
          credentials: 'same-origin',
          redirect: 'error',
        });
        if (!response.ok) {
          throw new Error(`Failed to load ${asset.url}`);
        }
        const buffer = await response.arrayBuffer();
        const file = {
          name: asset.name,
          data: new Uint8Array(buffer),
        };
        loaded += 1;
        updateProgress(loaded, total);
        return file;
      }),
    );

    updateProgress(total, total);
    await app.parseMultipleFiles();

    const panel = document.getElementById('topPanel');
    if (panel) {
      panel.classList.add('hidden');
    }
    document.body.classList.add('game-ready');
  };

  const run = async () => {
    try {
      const manifest = await fetchManifest();
      if (manifest?.games) {
        window.ROMLIST = manifest.games;
      } else {
        window.ROMLIST = window.ROMLIST || [];
      }
      window.PORTAL_MANIFEST = manifest || null;
      window.PORTAL_RUNTIME_REVISION = runtimeRevision(manifest);

      const revision = encodeURIComponent(window.PORTAL_RUNTIME_REVISION);
      await loadScript(`runtime-security.js?v=${revision}`);
      await loadScript(`script.js?v=${revision}`);
      await waitForAppReady();

      const gameId = params.get('game') || manifest?.defaultGame || null;
      const list = manifest?.games || window.ROMLIST || [];
      const selected = list.find((game) => game.id === gameId) || list[0];

      if (!selected) {
        throw new Error('No game found in manifest.');
      }

      await bootGame(selected);
      reportStatus('ready');
    } catch (error) {
      console.error('Game boot failed', error);
      const message = String(error?.message || error);
      const panel = document.getElementById('topPanel');
      if (panel) {
        panel.classList.remove('hidden');
        const heading = document.createElement('div');
        heading.style.cssText = 'font-weight:600;font-size:16px';
        heading.textContent = 'Failed to boot game';
        const detail = document.createElement('div');
        detail.style.cssText = 'font-size:13px;opacity:.7';
        detail.textContent = message;
        panel.replaceChildren(heading, detail);
      }
      reportStatus('error', message);
    }
  };

  run();
})();
