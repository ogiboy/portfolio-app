import { discoveryCacheControl, getOpenApiDocument } from '@/lib/public-api';

export const dynamic = 'force-static';

export function GET() {
  return new Response(JSON.stringify(getOpenApiDocument()), {
    headers: {
      'Cache-Control': discoveryCacheControl,
      'Content-Type': 'application/vnd.oai.openapi+json;version=3.1',
    },
  });
}
