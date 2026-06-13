"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SegmentedProps<T extends string> {
  options: [T, string][];
  value: T;
  onChange: (v: T) => void;
  className?: string;
}

export function Segmented<T extends string>({ options, value, onChange, className }: SegmentedProps<T>) {
  return (
    <div
      className={cn(
        "flex gap-[6px] p-[5px] rounded-full",
        className
      )}
      style={{ background: "var(--bg-sunken)" }}
    >
      {options.map(([k, l]) => (
        <button
          key={k}
          onClick={() => onChange(k)}
          className={cn(
            "flex-1 py-[11px] px-2 rounded-full text-sm transition-all duration-150",
            value === k
              ? "bg-[var(--bg-surface)] text-[var(--fg-primary)] shadow-xs"
              : "text-[var(--fg-secondary)]"
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
