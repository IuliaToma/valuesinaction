import React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "ink" | "quiet";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "default" | "sm";
  children: React.ReactNode;
}

const variants: Record<Variant, string> = {
  primary: "bg-[var(--accent)] text-[var(--on-accent)] shadow-accent active:shadow-sm",
  ghost: "bg-[var(--bg-surface)] text-[var(--fg-primary)] border border-[var(--border-default)]",
  ink: "bg-[var(--fg-primary)] text-white shadow-md",
  quiet: "bg-transparent text-[var(--fg-secondary)] shadow-none w-auto px-4 py-3 text-[15px]",
};

export function Button({ variant = "primary", size = "default", children, className, disabled, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-[9px] w-full rounded-full text-base transition-all duration-150 select-none cursor-pointer active:translate-y-px active:scale-[0.992]",
        size === "default" ? "py-[17px] px-[22px]" : "py-3 px-[18px] text-sm w-auto",
        variants[variant],
        disabled && "opacity-45 pointer-events-none",
        className
      )}
    >
      {children}
    </button>
  );
}
