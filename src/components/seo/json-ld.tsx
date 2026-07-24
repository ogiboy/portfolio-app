import type { JsonLdValue } from '@/lib/structured-data';

const escapedLessThan = String.raw`\u003c`;

/** Serializes structured data while escaping unsafe HTML tag delimiters. */
export function serializeJsonLd(data: JsonLdValue) {
  return JSON.stringify(data).replaceAll('<', escapedLessThan);
}

/** Emits safe JSON-LD markup for search engines and structured-data consumers. */
export function JsonLd({ data }: Readonly<{ data: JsonLdValue }>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
