'use client';

import { useState } from 'react';
import { ArrowSquareOut, GameController } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';

export function WasmGameFrame({
  title,
  intro,
  launchLabel,
  openLabel,
  idleTitle,
  idleBody,
}: Readonly<{
  title: string;
  intro: string;
  launchLabel: string;
  openLabel: string;
  idleTitle: string;
  idleBody: string;
}>) {
  const [booted, setBooted] = useState(false);
  const src = '/wasm/engine/index.html?game=doom-shareware';

  return (
    <div className="border-foreground bg-foreground text-background border-2 shadow-[10px_10px_0_0_var(--primary)]">
      <div className="border-background flex flex-wrap items-start justify-between gap-4 border-b-2 p-4 md:p-5">
        <div>
          <p className="font-mono text-xs font-bold tracking-[0.18em] uppercase opacity-75">
            {title}
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed opacity-75">{intro}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button size="sm" variant="secondary" onClick={() => setBooted(true)}>
            <GameController aria-hidden="true" weight="bold" />
            {launchLabel}
          </Button>
          <Button asChild size="sm" variant="ghost" className="border-background text-background">
            <a href={src} target="_blank" rel="noreferrer">
              {openLabel}
              <ArrowSquareOut aria-hidden="true" weight="bold" />
            </a>
          </Button>
        </div>
      </div>

      <div className="relative aspect-[4/3] min-h-[28rem] bg-black md:aspect-[16/10]">
        {booted ? (
          <iframe
            title={title}
            src={src}
            loading="lazy"
            referrerPolicy="no-referrer"
            allow="fullscreen; gamepad"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-downloads"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center p-6 text-center">
            <div className="max-w-md">
              <GameController aria-hidden="true" weight="bold" className="mx-auto h-12 w-12" />
              <h2 className="font-display mt-6 text-4xl leading-none tracking-[-0.06em]">
                {idleTitle}
              </h2>
              <p className="mt-5 text-sm leading-relaxed opacity-70">{idleBody}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
