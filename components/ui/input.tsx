// components/ui/input.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      data-slot="input"
      ref={ref}
      className={cn(
        // Base
        "w-full bg-transparent outline-none",
        // Typography
        "font-(--font-cormorant) text-xl tracking-[2px] text-center text-[#f8e8ee]",
        // Border — underline only
        "border-0 border-b border-rose-400/20",
        // Padding
        "px-2 py-3",
        // Placeholder
        "placeholder:text-rose-200/25 placeholder:italic placeholder:tracking-[1px]",
        // Focus
        "focus:border-rose-400/65",
        // Transition
        "transition-colors duration-400",
        // Disabled
        "disabled:pointer-events-none disabled:opacity-40",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };