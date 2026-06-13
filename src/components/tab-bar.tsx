"use client";

import { useRouter, usePathname } from "next/navigation";
import { Icon } from "./icons";

const TABS = [
  { label: "Today", icon: "home", path: "/home" },
  { label: "Agenda", icon: "calendar", path: "/agenda" },
  { label: "Support", icon: "shield", path: "/support" },
];

export function TabBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] flex justify-around items-start pt-3 pb-8 border-t border-[var(--border-soft)] z-40"
      style={{ background: "rgba(251,249,244,0.86)", backdropFilter: "blur(18px)" }}
    >
      {TABS.map((tab) => {
        const active = pathname === tab.path || (tab.path === "/home" && pathname === "/");
        return (
          <button
            key={tab.path}
            onClick={() => router.push(tab.path)}
            className="flex flex-col items-center gap-1 flex-1 text-[10.5px] tracking-[0.04em]"
            style={{ color: active ? "var(--fg-primary)" : "var(--fg-tertiary)" }}
          >
            <Icon name={tab.icon} size={24} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
