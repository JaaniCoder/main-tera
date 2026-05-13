// components/ui/button.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center",
    "font-[var(--font-cinzel)] text-xs tracking-widest uppercase",
    "rounded-full border border-rose-500/20 bg-rose-500/[0.055]",
    "text-rose-300 px-12 py-3 cursor-pointer select-none whitespace-nowrap",
    "transition-all duration-500 outline-none",
    "hover:border-rose-400/65 hover:text-white",
    "hover:shadow-[0_0_30px_rgba(244,80,120,0.3),0_0_65px_rgba(244,80,120,0.12)]",
    "hover:-translate-y-0.5",
    "active:translate-y-0",
    "focus-visible:ring-2 focus-visible:ring-rose-400/40",
    "disabled:pointer-events-none disabled:opacity-40",
  ],
  {
    variants: {
      variant: {
        default: "",
        ghost:
          "bg-transparent border-transparent hover:bg-rose-500/10 hover:border-transparent hover:shadow-none",
      },
      size: {
        default: "h-12 px-12",
        sm: "h-9 px-8 text-[8px]",
        lg: "h-14 px-16",
        icon: "h-10 w-10 rounded-full p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };