(function initializeHotWasmSecurity(global) {
  'use strict';

  const approvedCloudRoutes = new Set([
    'GetSaveStates',
    'LoadStaveState',
    'Login',
    'SendStaveState',
  ]);
  const uint32Range = 0x1_0000_0000;

  /**
   * Generates a cryptographically secure random integer below an approved exclusive upper bound.
   * @param {number} maxExclusive - The exclusive upper bound, from 1 through 0x100000000.
   * @return {number} A uniformly distributed integer from 0 through maxExclusive - 1.
   */
  function secureRandomInteger(maxExclusive) {
    if (!Number.isSafeInteger(maxExclusive) || maxExclusive <= 0 || maxExclusive > uint32Range) {
      throw new RangeError('Random integer bound is not approved.');
    }

    const values = new Uint32Array(1);
    const unbiasedLimit = Math.floor(uint32Range / maxExclusive) * maxExclusive;
    do {
      global.crypto.getRandomValues(values);
    } while (values[0] >= unbiasedLimit);
    return values[0] % maxExclusive;
  }

  /**
   * Resolves a URL for an approved runtime asset under the `/wasm/` path.
   * @param {string} path - The asset path or URL to validate.
   * @return {URL} The approved runtime asset URL.
   */
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

  /**
   * Resolves an approved cloud route into a URL with the specified query parameters.
   * @param {string} baseUrl - The HTTPS base URL, or an HTTP loopback URL.
   * @param {string} route - An approved cloud route.
   * @param {Object} [params={}] - Query parameters to include in the resulting URL.
   * @returns {URL} The resolved cloud route URL.
   * @throws {Error} If the route or base URL is not approved.
   */
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

  /**
   * Schedules a response to a valid local sleep-sync message.
   * @param {MessageEvent} event - The message event to validate.
   * @return {boolean} `true` if a response was scheduled, `false` otherwise.
   */
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
