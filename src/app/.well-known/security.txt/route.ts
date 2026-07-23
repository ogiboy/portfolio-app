import { discoveryCacheControl } from '@/lib/public-api';
import { siteUrl } from '@/lib/site-url';

export const dynamic = 'force-static';

export function GET() {
  const body = [
    'Contact: mailto:ogi@oguzcantoptas.com',
    'Expires: 2027-07-22T23:59:59.000Z',
    'Preferred-Languages: en, tr',
    `Canonical: ${siteUrl('/.well-known/security.txt')}`,
    'Policy: https://github.com/ogiboy/portfolio-app/security/policy',
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Cache-Control': discoveryCacheControl,
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
