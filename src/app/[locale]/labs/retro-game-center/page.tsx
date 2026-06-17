import type { Metadata } from 'next';
import {
  ArrowLeft,
  Cpu,
  GameController,
  HardDrives,
  ShieldCheck,
} from '@phosphor-icons/react/dist/ssr';
import { WasmGameFrame } from '@/components/client/wasm-game-frame';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { siteCopy, type Locale } from '@/content/site';
import { Link } from '@/i18n/navigation';

export const metadata: Metadata = {
  title: 'Retro Game Center',
  description:
    'A lazy-loaded WASM game center lab that boots DOOM Shareware inside an isolated portfolio route.',
};

export default async function RetroGameCenterPage({
  params,
}: Readonly<{ params: Promise<{ locale: Locale }> }>) {
  const { locale } = await params;
  const copy = siteCopy[locale].lab;
  const IconSet = [HardDrives, Cpu, ShieldCheck];

  return (
    <main>
      <section className="mx-auto grid min-h-[calc(100dvh-72px)] max-w-7xl content-center gap-10 px-4 py-14 md:grid-cols-[0.82fr_1.18fr] md:px-8 md:py-20">
        <div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/">
              <ArrowLeft aria-hidden="true" weight="bold" />
              {copy.back}
            </Link>
          </Button>
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
              const Icon = IconSet[index] ?? GameController;
              return (
                <Card key={spec.title} className={index === 1 ? 'bg-primary' : undefined}>
                  <CardContent>
                    <Icon aria-hidden="true" weight="bold" className="h-9 w-9" />
                    <h3 className="font-display mt-8 text-3xl leading-none tracking-[-0.05em]">
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
