import type { Metadata } from 'next';
import { ArrowLeft, Cpu, Gamepad2, HardDrive, ShieldCheck } from 'lucide-react';
import { WasmGameFrame } from '@/components/client/wasm-game-frame';
import { JsonLd } from '@/components/seo/json-ld';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { siteCopy, type Locale } from '@/content/site';
import { Link } from '@/i18n/navigation';
import { createRouteMetadata, seoCopy } from '@/lib/seo';
import { buildLabStructuredData } from '@/lib/structured-data';

const labSignalIcons = [HardDrive, Cpu, ShieldCheck];

/**
 * Builds localized metadata for the Retro Game Center route.
 *
 * @param params - Resolves to the locale used for the page metadata.
 * @returns Metadata for the Retro Game Center route
 */
export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: Locale }> }>): Promise<Metadata> {
  const { locale } = await params;
  return createRouteMetadata({
    locale,
    path: '/labs/retro-game-center',
    title: seoCopy[locale].labTitle,
    description: seoCopy[locale].labDescription,
  });
}

export default async function RetroGameCenterPage({
  params,
}: Readonly<{ params: Promise<{ locale: Locale }> }>) {
  const { locale } = await params;
  const copy = siteCopy[locale].lab;

  return (
    <main>
      <JsonLd data={buildLabStructuredData(locale)} />
      <section className="mx-auto grid min-h-[calc(100dvh-72px)] max-w-7xl content-center gap-10 px-4 py-14 md:grid-cols-[0.82fr_1.18fr] md:px-8 md:py-20">
        <div>
          <Link href="/" className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
            <ArrowLeft aria-hidden="true" strokeWidth={2.5} />
            {copy.back}
          </Link>
          <div className="mt-10">
            <Badge>{copy.eyebrow}</Badge>
            <h1 className="font-display mt-8 text-5xl leading-[0.9] tracking-[-0.08em] md:text-7xl">
              {copy.title}
            </h1>
            <p className="text-muted-foreground mt-8 max-w-2xl text-lg leading-relaxed">
              {copy.intro}
            </p>
          </div>
        </div>

        <WasmGameFrame
          title={copy.frameTitle}
          intro={copy.frameIntro}
          launchLabel={copy.launchLabel}
          openLabel={copy.openLabel}
          idleTitle={copy.idleTitle}
          idleBody={copy.idleBody}
          bootingTitle={copy.bootingTitle}
          bootingBody={copy.bootingBody}
          readyLabel={copy.readyLabel}
          errorTitle={copy.errorTitle}
          errorBody={copy.errorBody}
          timeoutTitle={copy.timeoutTitle}
          timeoutBody={copy.timeoutBody}
          retryLabel={copy.retryLabel}
        />
      </section>

      <section className="border-foreground bg-card border-y-2 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl leading-[0.95] tracking-[-0.06em] md:text-6xl">
              {copy.specsTitle}
            </h2>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed">{copy.specsIntro}</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {copy.specs.map((spec, index) => {
              const Icon = labSignalIcons[index] ?? Gamepad2;
              return (
                <Card key={spec.title} className={index === 1 ? 'bg-primary' : undefined}>
                  <CardContent>
                    <Icon aria-hidden="true" strokeWidth={2.5} className="h-9 w-9" />
                    <h3 className="font-display mt-8 text-3xl leading-none tracking-tighter">
                      {spec.title}
                    </h3>
                    <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
                      {spec.body}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="border-foreground bg-background border-2 p-6 shadow-[10px_10px_0_0_var(--shadow-hard)] md:p-8">
          <h2 className="font-display text-4xl leading-none tracking-[-0.06em]">{copy.qaTitle}</h2>
          <div className="mt-8 grid gap-4">
            {copy.qa.map((item) => (
              <p
                key={item}
                className="border-foreground bg-muted border-2 px-4 py-3 font-mono text-xs leading-relaxed font-bold tracking-[0.08em] uppercase"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
