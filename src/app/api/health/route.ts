import { discoveryCacheControl, publicApiVersion } from '@/lib/public-api';

export const dynamic = 'force-static';

export function GET() {
  return Response.json(
    { status: 'ok', service: 'portfolio-api', version: publicApiVersion },
    { headers: { 'Cache-Control': discoveryCacheControl } },
  );
}
