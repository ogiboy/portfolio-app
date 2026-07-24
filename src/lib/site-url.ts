const DEFAULT_SITE_ORIGIN = 'https://www.oguzcantoptas.com';

/**
 * Resolves and validates the canonical site origin.
 *
 * @returns The validated site origin.
 * @throws Error if the configured origin does not use HTTPS or HTTP on localhost.
 */
function resolveSiteOrigin() {
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const url = new URL(configuredOrigin || DEFAULT_SITE_ORIGIN);

  const isHttps = url.protocol === 'https:';
  const isLocalHttp = url.protocol === 'http:' && url.hostname === 'localhost';

  if (!isHttps && !isLocalHttp) {
    throw new Error('NEXT_PUBLIC_SITE_URL must use HTTPS, except HTTP on localhost.');
  }

  return url.origin;
}

/** Validated canonical origin used to construct absolute public URLs. */
export const siteOrigin = resolveSiteOrigin();

/**
 * Resolves a path against the validated canonical site origin.
 *
 * @param path - The path to resolve, defaulting to `/`
 * @returns The resulting absolute URL as a string
 */
export function siteUrl(path = '/') {
  return new URL(path, `${siteOrigin}/`).toString();
}
