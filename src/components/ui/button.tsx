import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap border-2 border-foreground font-mono text-sm font-bold uppercase tracking-[0.14em] transition-[transform,box-shadow,background,color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-x-1 active:translate-y-1 active:shadow-none",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background shadow-[6px_6px_0_0_var(--shadow-hard)] hover:bg-primary hover:text-primary-foreground",
        secondary:
          "bg-background text-foreground shadow-[6px_6px_0_0_var(--shadow-hard)] hover:bg-muted",
        ghost:
          "border-transparent bg-transparent text-foreground hover:border-foreground hover:bg-muted",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[6px_6px_0_0_var(--shadow-hard)]",
      },
      size: {
        default: "h-12 px-5 py-3",
        sm: "h-10 px-4 py-2 text-xs",
        lg: "h-14 px-7 py-4",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
