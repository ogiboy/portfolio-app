'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { Dialog as SheetPrimitive } from 'radix-ui';
import { cn } from '@/lib/utils';

const sheetVariants = cva(
  'border-foreground bg-background fixed z-50 flex flex-col border-2 p-6 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out',
  {
    variants: {
      side: {
        bottom:
          'inset-x-0 bottom-0 border-b-0 shadow-[0_-10px_0_0_var(--primary)] data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom',
        left: 'inset-y-0 left-0 w-[min(88vw,24rem)] border-l-0 shadow-[10px_0_0_0_var(--primary)] data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left',
        right:
          'inset-y-0 right-0 w-[min(88vw,24rem)] border-r-0 shadow-[-10px_0_0_0_var(--primary)] data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right',
        top: 'inset-x-0 top-0 border-t-0 shadow-[0_10px_0_0_var(--primary)] data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top',
      },
    },
    defaultVariants: { side: 'right' },
  },
);

/** Creates the controlled dialog root used by the sheet primitive. */
function Sheet(props: Readonly<React.ComponentProps<typeof SheetPrimitive.Root>>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

/** Exposes the accessible trigger that opens the associated sheet dialog. */
function SheetTrigger(props: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetPortal(props: Readonly<React.ComponentProps<typeof SheetPrimitive.Portal>>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        'bg-foreground/75 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 fixed inset-0 z-50 duration-200',
        className,
      )}
      {...props}
    />
  );
}

/** Renders modal sheet content with a visible, labeled close control. */
function SheetContent({
  children,
  className,
  closeLabel,
  side = 'right',
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> &
  VariantProps<typeof sheetVariants> & { closeLabel: string }) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        data-side={side}
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        {children}
        <SheetPrimitive.Close
          type="button"
          data-slot="sheet-close"
          className="border-foreground bg-background hover:bg-primary hover:text-primary-foreground focus-visible:ring-ring absolute top-4 right-4 inline-flex size-11 items-center justify-center border-2 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <X data-icon="inline-start" aria-hidden="true" strokeWidth={2.5} />
          <span className="sr-only">{closeLabel}</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

/** Groups sheet title and description content near the dialog start. */
function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="sheet-header" className={cn('flex flex-col gap-4', className)} {...props} />
  );
}

/** Supplies the dialog title announced by assistive technologies. */
function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn('font-display text-3xl leading-none tracking-tighter', className)}
      {...props}
    />
  );
}

/** Supplies the dialog description associated with the sheet content. */
function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn('text-muted-foreground text-sm leading-relaxed', className)}
      {...props}
    />
  );
}

export { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger };
