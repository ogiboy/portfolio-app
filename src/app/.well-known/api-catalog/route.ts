import { discoveryCacheControl, getApiCatalog } from '@/lib/public-api';

export const dynamic = 'force-static';

export function GET() {
  return new Response(JSON.stringify(getApiCatalog()), {
    headers: {
      'Cache-Control': discoveryCacheControl,
      'Content-Type': 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
    },
  });
}
