import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = "button", variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        className={cn(
          "rounded-full border-transparent px-5 py-2 font-semibold transition",
          
          variant === "default" && "bg-black text-white hover:opacity-75",
          variant === "outline" && "bg-transparent border border-black text-black hover:bg-black hover:text-white",

          size === "sm" && "text-sm px-3 py-1",
          size === "md" && "text-md px-4 py-2",
          size === "lg" && "text-lg px-6 py-3",

          disabled && "cursor-not-allowed opacity-50",

          className
        )}
        ref={ref}
        disabled={disabled}
        type={type}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
