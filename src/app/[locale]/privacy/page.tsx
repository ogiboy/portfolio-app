import type { Metadata } from 'next';
import { AnalyticsPreference } from '@/components/client/analytics-preference';
import { JsonLd } from '@/components/seo/json-ld';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { siteCopy, type Locale } from '@/content/site';
import { createRouteMetadata, seoCopy } from '@/lib/seo';
import { buildPrivacyStructuredData } from '@/lib/structured-data';

/**
 * Creates localized SEO metadata for the privacy page.
 *
 * @param params - Route parameters containing the page locale
 * @returns Metadata configured for the privacy page
 */
export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: Locale }> }>): Promise<Metadata> {
  const { locale } = await params;
  return createRouteMetadata({
    locale,
    path: '/privacy',
    title: siteCopy[locale].privacy.eyebrow,
    description: seoCopy[locale].privacyDescription,
  });
}

/**
 * Renders the localized privacy information page with privacy structured data and analytics preferences.
 *
 * @param params - A promise resolving to the page locale.
 */
export default async function PrivacyPage({
  params,
}: Readonly<{ params: Promise<{ locale: Locale }> }>) {
  const { locale } = await params;
  const copy = siteCopy[locale].privacy;

  const boundaries = [
    { title: copy.aggregateTitle, body: copy.aggregateBody },
    { title: copy.boundariesTitle, body: copy.boundariesBody },
    { title: copy.sentryTitle, body: copy.sentryBody },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-8 md:py-24">
      <JsonLd data={buildPrivacyStructuredData(locale)} />
      <Badge>{copy.eyebrow}</Badge>
      <h1 className="font-display mt-8 max-w-4xl text-5xl leading-[0.9] tracking-[-0.08em] md:text-8xl">
        {copy.title}
      </h1>
      <p className="text-muted-foreground mt-8 max-w-3xl text-xl leading-relaxed">{copy.intro}</p>

      <Separator className="my-12" />

      <div className="grid gap-5 md:grid-cols-3">
        {boundaries.map((boundary, index) => (
          <Card key={boundary.title} className={index === 1 ? 'bg-primary' : undefined}>
            <CardContent>
              <h2 className="font-display text-3xl leading-none tracking-tighter">
                {boundary.title}
              </h2>
              <p
                className={
                  index === 1
                    ? 'text-primary-foreground mt-5 text-sm leading-relaxed'
                    : 'text-muted-foreground mt-5 text-sm leading-relaxed'
                }
              >
                {boundary.body}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="font-display text-4xl tracking-[-0.06em]">{copy.controlTitle}</h2>
        <p className="text-muted-foreground mt-4 max-w-3xl leading-relaxed">{copy.controlBody}</p>
        <div className="mt-6">
          <AnalyticsPreference
            enabledLabel={copy.enabledLabel}
            disabledLabel={copy.disabledLabel}
            enableAction={copy.enableAction}
            disableAction={copy.disableAction}
            savedLabel={copy.savedLabel}
            errorLabel={copy.errorLabel}
          />
        </div>
      </section>
    </main>
  );
}
