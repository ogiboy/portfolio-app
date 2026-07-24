const markdownMediaType = 'text/markdown';

/**
 * Determines the quality of a Markdown media range.
 *
 * @param mediaRange - The media range to evaluate.
 * @returns The quality value when the range is `text/markdown` with a valid positive quality, `1` when no quality is specified, or `0` otherwise.
 */
function qualityForMediaRange(mediaRange: string) {
  const [type, ...parameters] = mediaRange.trim().toLowerCase().split(';');
  if (type !== markdownMediaType) {
    return 0;
  }

  const qualityParameter = parameters.find((parameter) => parameter.trim().startsWith('q='));
  if (!qualityParameter) {
    return 1;
  }

  const quality = Number(qualityParameter.trim().slice(2));
  return Number.isFinite(quality) && quality > 0 && quality <= 1 ? quality : 0;
}

/**
 * Determines whether an `Accept` header allows Markdown content.
 *
 * @param acceptHeader - The `Accept` header value to inspect
 * @returns `true` if the header contains a positive-quality `text/markdown` media range, `false` otherwise
 */
export function acceptsMarkdown(acceptHeader: string | null) {
  if (!acceptHeader) {
    return false;
  }

  return acceptHeader.split(',').some((mediaRange) => qualityForMediaRange(mediaRange) > 0);
}

/**
 * Ensures a token appears exactly once in the `Vary` response header.
 *
 * @param value - The token to add, compared case-insensitively.
 */
export function appendVary(headers: Headers, value: string) {
  const existingValues =
    headers
      .get('Vary')
      ?.split(',')
      .map((item) => item.trim())
      .filter(Boolean) ?? [];
  const hasValue = existingValues.some((item) => item.toLowerCase() === value.toLowerCase());

  if (!hasValue) {
    existingValues.push(value);
  }

  headers.set('Vary', existingValues.join(', '));
}
