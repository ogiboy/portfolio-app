import { discoveryCacheControl, getApiDocumentation } from '@/lib/public-api';

export const dynamic = 'force-static';

export function GET() {
  return new Response(getApiDocumentation(), {
    headers: {
      'Cache-Control': discoveryCacheControl,
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}
