"use client";

import { useRouter } from "next/navigation";
import { Icon } from "./icons";

export function Fab() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/suggest")}
      aria-label="Plan an action"
      className="fixed bottom-[96px] z-40 w-[60px] h-[60px] rounded-full flex items-center justify-center active:scale-[0.93] transition-transform duration-150"
      style={{
        background: "var(--accent)",
        color: "var(--on-accent)",
        boxShadow: "0 8px 22px rgba(138,154,82,0.32)",
        /* Keep FAB 20px from the right edge of the centered 480px column */
        right: "max(1.25rem, calc(50vw - 240px + 1.25rem))",
      }}
    >
      <Icon name="plus" size={28} />
    </button>
  );
}
