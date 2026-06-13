"use client";

import { useRouter } from "next/navigation";
import { StatusBar } from "@/components/status-bar";
import { StepHeader } from "@/components/step-header";
import { TabBar } from "@/components/tab-bar";
import { Icon } from "@/components/icons";

const RESOURCES = [
  { big: "988", title: "988 Suicide & Crisis Lifeline", sub: "Call or text 988 (US), 24/7", icon: "phone" },
  { big: "Text HOME to 741741", title: "Crisis Text Line", sub: "Free, confidential support", icon: "phone" },
  { big: "Find local help", title: "International directory", sub: "findahelpline.com", icon: "compass" },
];

export default function SupportPage() {
  const router = useRouter();

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: "var(--bg-base)" }}>
      <StatusBar />
      <div className="px-[22px] pt-[10px] pb-[100px]">
        <StepHeader onBack={() => router.back()} />
        <div
          className="w-[60px] h-[60px] rounded-[18px] grid place-items-center mb-5"
          style={{ background: "#F4E5DD", color: "#C0512E" }}
        >
          <Icon name="shield" size={30} />
        </div>
        <h1
          className="text-[34px] leading-[1.06] tracking-[-0.01em] mb-3"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
        >
          You&apos;re not alone.
        </h1>
        <p className="text-sm leading-[1.6] mb-2" style={{ color: "var(--fg-secondary)" }}>
          If you&apos;re in crisis or thinking about harming yourself, please reach out now. Real
          people are ready to listen, any time.
        </p>
        <div className="flex flex-col gap-[11px] my-[22px]">
          {RESOURCES.map(({ big, title, sub, icon }) => (
            <a
              key={title}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="p-4 flex gap-[14px] items-center no-underline rounded-lg border border-[var(--border-soft)] shadow-sm"
              style={{ background: "var(--bg-surface)", color: "inherit" }}
            >
              <div
                className="w-[44px] h-[44px] rounded-[13px] grid place-items-center shrink-0"
                style={{ background: "#F4E5DD", color: "#C0512E" }}
              >
                <Icon name={icon} size={22} />
              </div>
              <div className="flex-1">
                <div className="text-[16px] mb-[2px]">{big}</div>
                <div className="text-xs" style={{ color: "var(--fg-tertiary)" }}>
                  {title} · {sub}
                </div>
              </div>
              <Icon name="arrowR" size={18} style={{ color: "var(--fg-tertiary)" }} />
            </a>
          ))}
        </div>
        <hr className="border-0 h-px my-5" style={{ background: "var(--border-soft)" }} />
        <p className="text-xs leading-[1.6]" style={{ color: "var(--fg-tertiary)" }}>
          <strong style={{ color: "var(--fg-secondary)" }}>
            Values in Action is a self-help tool, not a replacement for therapy or medical care.
          </strong>{" "}
          It does not diagnose or provide medical advice. If you&apos;re struggling, please consider
          talking to a doctor or licensed therapist.
        </p>
      </div>
      <TabBar />
    </div>
  );
}
