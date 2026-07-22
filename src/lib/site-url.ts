const DEFAULT_SITE_ORIGIN = 'https://www.oguzcantoptas.com';

function resolveSiteOrigin() {
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const url = new URL(configuredOrigin || DEFAULT_SITE_ORIGIN);

  if (url.protocol !== 'https:' && url.hostname !== 'localhost') {
    throw new Error('NEXT_PUBLIC_SITE_URL must use HTTPS outside localhost.');
  }

  return url.origin;
}

export const siteOrigin = resolveSiteOrigin();

export function siteUrl(path = '/') {
  return new URL(path, `${siteOrigin}/`).toString();
}
