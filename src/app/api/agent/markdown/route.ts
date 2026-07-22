import { markdownResponse } from '@/lib/agent-markdown';
import { acceptsMarkdown } from '@/lib/markdown-negotiation';

function requestPathname(request: Request) {
  return new URL(request.url).searchParams.get('pathname') ?? '';
}

function variesByNegotiatedLocale(request: Request) {
  return new URL(request.url).searchParams.get('varyLocale') === '1';
}

function withInternalHeaders(response: Response) {
  response.headers.set('X-Robots-Tag', 'noindex');
  return response;
}

function notAcceptableResponse() {
  return withInternalHeaders(
    new Response(null, {
      status: 406,
      headers: {
        'Cache-Control': 'no-store',
        Vary: 'Accept',
      },
    }),
  );
}

function respond(request: Request, includeBody: boolean) {
  if (!acceptsMarkdown(request.headers.get('accept'))) {
    return notAcceptableResponse();
  }

  return withInternalHeaders(
    markdownResponse(requestPathname(request), {
      includeBody,
      varyLocale: variesByNegotiatedLocale(request),
    }),
  );
}

export function GET(request: Request) {
  return respond(request, true);
}

export function HEAD(request: Request) {
  return respond(request, false);
}
