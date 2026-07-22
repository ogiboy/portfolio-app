const DEFAULT_SITE_ORIGIN = 'https://www.oguzcantoptas.com';

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

export const siteOrigin = resolveSiteOrigin();

export function siteUrl(path = '/') {
  return new URL(path, `${siteOrigin}/`).toString();
}
