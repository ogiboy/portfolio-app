'use client';

export default function ErrorPage() {
  return (
    <main className="grid min-h-[70dvh] place-items-center px-4 text-center">
      <div>
        <p className="text-muted-foreground font-mono text-xs font-bold tracking-[0.18em] uppercase">
          Runtime fault
        </p>
        <h1 className="font-display mt-4 text-5xl tracking-[-0.08em]">Something broke.</h1>
      </div>
    </main>
  );
}
