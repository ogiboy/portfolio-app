import * as React from 'react';
import { cn } from '@/lib/utils';

export function Card({ className, ...props }: Readonly<React.ComponentProps<'div'>>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'border-foreground bg-card text-card-foreground border-2 shadow-[8px_8px_0_0_var(--shadow-hard)]',
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: Readonly<React.ComponentProps<'div'>>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'border-foreground grid gap-3 border-b-2 p-5 has-data-[slot=card-action]:grid-cols-[1fr_auto]',
        className,
      )}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: Readonly<React.ComponentProps<'div'>>) {
  return <div data-slot="card-content" className={cn('p-5', className)} {...props} />;
}

export function CardTitle({ className, ...props }: Readonly<React.ComponentProps<'div'>>) {
  return (
    <div data-slot="card-title" className={cn('font-display text-xl', className)} {...props} />
  );
}

export function CardDescription({ className, ...props }: Readonly<React.ComponentProps<'div'>>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm leading-relaxed', className)}
      {...props}
    />
  );
}

export function CardAction({ className, ...props }: Readonly<React.ComponentProps<'div'>>) {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  );
}

export function CardFooter({ className, ...props }: Readonly<React.ComponentProps<'div'>>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('border-foreground flex items-center border-t-2 p-5', className)}
      {...props}
    />
  );
}
