import type { JsonLdValue } from '@/lib/structured-data';

const escapedLessThan = String.raw`\u003c`;

export function serializeJsonLd(data: JsonLdValue) {
  return JSON.stringify(data).replaceAll('<', escapedLessThan);
}

export function JsonLd({ data }: Readonly<{ data: JsonLdValue }>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
