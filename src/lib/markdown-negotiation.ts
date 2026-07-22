const markdownMediaType = 'text/markdown';

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

export function acceptsMarkdown(acceptHeader: string | null) {
  if (!acceptHeader) {
    return false;
  }

  return acceptHeader.split(',').some((mediaRange) => qualityForMediaRange(mediaRange) > 0);
}

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
