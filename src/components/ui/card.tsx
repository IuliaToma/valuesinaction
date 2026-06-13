import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  as?: "button" | "div" | "a";
}

export function Card({ children, className, as = "div", ...props }: CardProps) {
  const Tag = as as React.ElementType;
  return (
    <Tag
      {...props}
      className={cn(
        "bg-[var(--bg-surface)] border border-[var(--border-soft)] rounded-lg shadow-sm",
        as === "button" && "cursor-pointer text-left w-full",
        className
      )}
    >
      {children}
    </Tag>
  );
}
