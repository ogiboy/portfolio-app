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
  const reportStatus = (status, message) => {
    window.parent.postMessage(
      {
        attempt,
        channel: 'hot-wasm',
        message,
        status,
        version: 1,
      },
      '*',
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
        if (window.myApp && window.myApp.rivetsData) {
          if (!window.myApp.rivetsData.moduleInitializing) {
            resolve(window.myApp);
            return;
          }
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

  const normalizePath = (path) =>
    path.startsWith('/') ? path.slice(1) : path;

  const basename = (path) => path.split('/').pop() || path;

  const bootGame = async (game) => {
    const app = window.myApp;
    if (!app || !game) return;

    app.Run();

    if (game.startupScript) {
      const normalized = game.startupScript.replace(/;/g, '\n').trim();
      app.configuration.startupScript = normalized.endsWith('\n')
        ? normalized
        : `${normalized}\n`;
    }
    if (game.cpu) {
      app.rivetsData.cpu = game.cpu;
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

    app.multiFiles = [];

    for (const filePath of files) {
      const target = `/wasm/${normalizePath(filePath)}`;
      const response = await fetch(target);
      if (!response.ok) {
        throw new Error(`Failed to load ${target}`);
      }
      const buffer = await response.arrayBuffer();
      app.multiFiles.push({
        name: basename(filePath),
        data: new Uint8Array(buffer),
      });
      loaded += 1;
      updateProgress(loaded, total);
    }

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

      await loadScript(`script.js?v=${Date.now()}`);
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
