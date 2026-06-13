import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export function dateLabel(d: string): string {
  return { today: "Today", tomorrow: "Tomorrow", weekend: "Weekend" }[d] || d;
}

export function generateId(): string {
  return "a" + Date.now() + Math.random().toString(36).slice(2, 6);
}
