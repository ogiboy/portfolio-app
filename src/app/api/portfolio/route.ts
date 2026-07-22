import { discoveryCacheControl, getPortfolioApiPayload } from '@/lib/public-api';

export const dynamic = 'force-static';

export function GET() {
  return Response.json(getPortfolioApiPayload(), {
    headers: { 'Cache-Control': discoveryCacheControl },
  });
}
