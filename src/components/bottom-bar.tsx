import React from "react";

export function BottomBar({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] px-[22px] pt-[18px] pb-8 z-30"
      style={{ background: "linear-gradient(to top, var(--bg-base) 62%, transparent)" }}
    >
      {children}
    </div>
  );
}
