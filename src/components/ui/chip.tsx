"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  children: React.ReactNode;
}

export function Chip({ selected, children, className, ...props }: ChipProps) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center gap-[7px] px-[15px] py-[10px] rounded-full border text-sm transition-all duration-150 select-none cursor-pointer",
        selected
          ? "bg-[var(--accent)] border-[var(--accent)] text-[var(--on-accent)]"
          : "bg-[var(--bg-surface)] border-[var(--border-default)] text-[var(--fg-primary)]",
        className
      )}
    >
      {children}
    </button>
  );
}
