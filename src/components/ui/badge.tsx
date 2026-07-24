import * as React from 'react';
import { cn } from '@/lib/utils';

/** Displays compact inline metadata while forwarding standard span attributes. */
export function Badge({ className, ...props }: Readonly<React.ComponentProps<'span'>>) {
  return (
    <span
      data-slot="badge"
      className={cn(
        'border-foreground bg-muted text-foreground inline-flex items-center border-2 px-2.5 py-1 font-mono text-[0.68rem] font-bold tracking-[0.16em] uppercase',
        className,
      )}
      {...props}
    />
  );
}
