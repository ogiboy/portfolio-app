"use client";

export default function ErrorPage() {
  return (
    <main className="grid min-h-[70dvh] place-items-center px-4 text-center">
      <div>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
          Runtime fault
        </p>
        <h1 className="mt-4 font-display text-5xl tracking-[-0.08em]">
          Something broke.
        </h1>
      </div>
    </main>
  );
}
