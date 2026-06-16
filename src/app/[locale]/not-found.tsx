import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="grid min-h-[70dvh] place-items-center px-4 text-center">
      <div>
        <p className="text-muted-foreground font-mono text-xs font-bold tracking-[0.18em] uppercase">
          404
        </p>
        <h1 className="font-display mt-4 text-5xl tracking-[-0.08em]">Not found.</h1>
        <Button asChild className="mt-8">
          <Link href="/">Return home</Link>
        </Button>
      </div>
    </main>
  );
}
