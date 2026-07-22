import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { acceptsMarkdown, appendVary } from './lib/markdown-negotiation';

const intlMiddleware = createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localePrefix: 'always',
  localeDetection: true,
});

export default function proxy(request: NextRequest) {
  const intlResponse = intlMiddleware(request);
  const acceptsMarkdownRepresentation =
    (request.method === 'GET' || request.method === 'HEAD') &&
    acceptsMarkdown(request.headers.get('accept'));
  const redirectLocation = intlResponse.headers.get('location');

  if (acceptsMarkdownRepresentation && (!redirectLocation || request.nextUrl.pathname === '/')) {
    const responseHeaders = new Headers(intlResponse.headers);
    const publicPathname = redirectLocation
      ? new URL(redirectLocation, request.url).pathname
      : request.nextUrl.pathname;
    const destination = new URL('/api/agent/markdown', request.url);
    destination.searchParams.set('pathname', publicPathname);
    if (request.nextUrl.pathname === '/') {
      destination.searchParams.set('varyLocale', '1');
    }
    responseHeaders.delete('location');
    responseHeaders.delete('set-cookie');
    appendVary(responseHeaders, 'Accept');

    return NextResponse.rewrite(destination, {
      headers: responseHeaders,
    });
  }

  appendVary(intlResponse.headers, 'Accept');
  return intlResponse;
}

export const config = {
  matcher: ['/', '/((?!api|trpc|_next|_vercel|.*[.].*).*)'],
};
