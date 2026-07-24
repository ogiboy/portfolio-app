import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type SeparatorProps = HTMLAttributes<HTMLDivElement> & {
  decorative?: boolean;
  orientation?: 'horizontal' | 'vertical';
};

/**
 * Renders a horizontal or vertical separator as decorative or semantic content.
 *
 * @param className - Additional CSS class names
 * @param orientation - The separator's orientation
 * @param decorative - Whether the separator is decorative rather than semantic
 */
export function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: SeparatorProps) {
  return (
    <div
      {...props}
      role={decorative ? 'none' : 'separator'}
      aria-orientation={!decorative && orientation === 'vertical' ? 'vertical' : undefined}
      data-orientation={orientation}
      className={cn(
        'bg-foreground shrink-0',
        orientation === 'horizontal' ? 'h-0.5 w-full' : 'h-full w-0.5',
        className,
      )}
    />
  );
}
