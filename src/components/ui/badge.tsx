import * as React from 'react';
import { cn } from '@/lib/utils';

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center border-2 border-foreground bg-muted px-2.5 py-1 font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-foreground',
        className,
      )}
      {...props}
    />
  );
}
