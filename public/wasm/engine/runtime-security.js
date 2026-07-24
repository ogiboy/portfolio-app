(function initializeHotWasmSecurity(global) {
  'use strict';

  const approvedCloudRoutes = new Set([
    'GetSaveStates',
    'LoadStaveState',
    'Login',
    'SendStaveState',
  ]);

  function secureRandomInteger(maxExclusive) {
    if (!Number.isSafeInteger(maxExclusive) || maxExclusive <= 0 || maxExclusive > 0x100000000) {
      throw new RangeError('Random integer bound is not approved.');
    }

    const values = new Uint32Array(1);
    const unbiasedLimit = Math.floor(0x100000000 / maxExclusive) * maxExclusive;
    do {
      global.crypto.getRandomValues(values);
    } while (values[0] >= unbiasedLimit);
    return values[0] % maxExclusive;
  }

  function resolveApprovedAssetUrl(path) {
    const approvedRoot = new URL('/wasm/', global.location.href);
    const candidate = new URL(path, global.location.href);
    const isApproved =
      candidate.origin === approvedRoot.origin &&
      candidate.pathname.startsWith(approvedRoot.pathname) &&
      candidate.username === '' &&
      candidate.password === '';

    if (!isApproved) throw new Error('Runtime asset URL is not approved.');
    return candidate;
  }

  function resolveApprovedCloudUrl(baseUrl, route, params = {}) {
    if (!approvedCloudRoutes.has(route)) {
      throw new Error('Cloud route is not approved.');
    }

    const candidate = new URL(baseUrl);
    const isLoopback = ['localhost', '127.0.0.1', '[::1]'].includes(candidate.hostname);
    const hasApprovedProtocol =
      candidate.protocol === 'https:' || (candidate.protocol === 'http:' && isLoopback);

    if (
      !hasApprovedProtocol ||
      candidate.username !== '' ||
      candidate.password !== ''
    ) {
      throw new Error('Cloud save URL is not approved.');
    }

    candidate.search = '';
    candidate.hash = '';
    if (!candidate.pathname.endsWith('/')) candidate.pathname += '/';
    const target = new URL(route, candidate);
    for (const [key, value] of Object.entries(params)) {
      target.searchParams.set(key, String(value));
    }
    return target;
  }

  function replyToLocalSleepMessage(event) {
    const data = event.data;
    if (
      event.source !== global ||
      data?.name !== 'ws-sync-sleep' ||
      data.props?.sessionId !== '123'
    ) {
      return false;
    }

    const response = new MessageEvent('message', {
      data: { name: 'wc-sync-sleep', props: data.props },
      source: global,
    });
    global.setTimeout(() => global.dispatchEvent(response), 0);
    return true;
  }

  global.HotWasmSecurity = Object.freeze({
    replyToLocalSleepMessage,
    resolveApprovedAssetUrl,
    resolveApprovedCloudUrl,
    secureRandomInteger,
  });
})(window);
