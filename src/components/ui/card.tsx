import * as React from 'react';
import { cn } from '@/lib/utils';

/** Provides the bordered card container and forwards standard div attributes. */
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

/** Groups card heading content and reserves space for an optional action. */
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

/** Provides padded card body content with standard div attribute forwarding. */
export function CardContent({ className, ...props }: Readonly<React.ComponentProps<'div'>>) {
  return <div data-slot="card-content" className={cn('p-5', className)} {...props} />;
}

/** Styles a card title while leaving semantic element choice to consumers. */
export function CardTitle({ className, ...props }: Readonly<React.ComponentProps<'div'>>) {
  return (
    <div data-slot="card-title" className={cn('font-display text-xl', className)} {...props} />
  );
}

/** Styles supporting card text while forwarding standard div attributes. */
export function CardDescription({ className, ...props }: Readonly<React.ComponentProps<'div'>>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm leading-relaxed', className)}
      {...props}
    />
  );
}

/** Positions a supplementary card action beside the header content. */
export function CardAction({ className, ...props }: Readonly<React.ComponentProps<'div'>>) {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  );
}

/** Provides a bordered footer row for card controls or metadata. */
export function CardFooter({ className, ...props }: Readonly<React.ComponentProps<'div'>>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('border-foreground flex items-center border-t-2 p-5', className)}
      {...props}
    />
  );
}
