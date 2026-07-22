import type { JsonLdValue } from '@/lib/structured-data';

export function serializeJsonLd(data: JsonLdValue) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function JsonLd({ data }: Readonly<{ data: JsonLdValue }>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
