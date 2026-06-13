"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icons";
import { StatusBar } from "@/components/status-bar";
import { Button } from "@/components/ui/button";

const ONB = [
  {
    eyebrow: "Welcome",
    title: ["A small step,", "then the feeling."],
    body: "Depression often pulls us away from the things that matter. This app helps you reconnect — through small, meaningful actions.",
    icon: "leaf",
    iconRadius: "63% 37% 44% 56% / 49% 58% 42% 51%",
  },
  {
    eyebrow: "How it works",
    title: ["Action comes", "before motivation."],
    body: "You don't have to wait until you feel ready. We start with tiny actions tied to your values — the good feeling follows the doing.",
    icon: "spark",
    iconRadius: "42% 58% 63% 37% / 56% 44% 56% 44%",
  },
  {
    eyebrow: "Your pace",
    title: ["No streaks.", "No pressure."],
    body: "Missed a day? That's okay. There's nothing to break here. We focus on progress, never perfection — and you're always in control.",
    icon: "heart",
    iconRadius: "54% 46% 38% 62% / 45% 50% 50% 55%",
  },
];

const BLOBS = [
  { w: 280, h: 260, top: -70, right: -90, bg: "#ECF0CF", radius: "63% 37% 42% 58% / 53% 46% 54% 47%", dur: "17s", delay: "0s" },
  { w: 240, h: 220, bottom: 90, left: -95, bg: "#E4EFDC", radius: "40% 60% 64% 36% / 58% 42% 58% 42%", dur: "21s", delay: "-4s" },
  { w: 150, h: 150, top: 250, right: 28, bg: "#F2EFDA", radius: "50% 50% 36% 64% / 40% 56% 44% 60%", dur: "14s", delay: "-8s" },
  { w: 120, h: 120, top: 150, left: -40, bg: "#EFF1E0", radius: "55% 45% 50% 50% / 52% 48% 52% 48%", dur: "19s", delay: "-2s" },
];

export default function OnboardingPage() {
  const [i, setI] = useState(0);
  const router = useRouter();
  const slide = ONB[i];
  const last = i === ONB.length - 1;

  return (
    <div className="min-h-[100dvh] flex flex-col relative overflow-hidden" style={{ background: "var(--bg-base)" }}>
      {/* Blob backdrop */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {BLOBS.map((b, idx) => (
          <div
            key={idx}
            className="absolute blob-float"
            style={{
              width: b.w,
              height: b.h,
              top: b.top,
              bottom: b.bottom,
              left: b.left,
              right: b.right,
              background: b.bg,
              borderRadius: b.radius,
              opacity: 0.85,
              filter: "blur(8px)",
              animationDuration: b.dur,
              animationDelay: b.delay,
            }}
          />
        ))}
      </div>

      <StatusBar />

      <div className="relative z-10 flex flex-col flex-1 px-[22px] pb-[40px]">
        {/* Dots + Skip */}
        <div className="flex justify-between items-center mb-[38px]">
          <div className="flex gap-[7px] items-center">
            {ONB.map((_, idx) => (
              <span
                key={idx}
                className="h-[7px] rounded-full transition-all duration-300"
                style={{
                  width: idx === i ? 22 : 7,
                  background: idx === i ? "var(--accent)" : "var(--gray-300, #CCCFB8)",
                }}
              />
            ))}
          </div>
          {!last && (
            <button
              onClick={() => router.push("/values")}
              className="text-[var(--fg-secondary)] text-sm px-2 py-1"
            >
              Skip
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center" key={i}>
          {/* Icon blob */}
          <div className="relative w-[120px] h-[120px] grid place-items-center mb-8 anim-pop">
            <span
              className="absolute inset-0"
              style={{ background: "var(--accent-soft)", borderRadius: slide.iconRadius }}
            />
            <Icon name={slide.icon} size={50} style={{ color: "var(--accent-deep)", position: "relative", zIndex: 1 }} />
          </div>

          <div
            className="uppercase text-[11px] tracking-[0.18em] mb-[14px]"
            style={{ color: "var(--fg-tertiary)" }}
          >
            {slide.eyebrow}
          </div>
          <h1
            className="text-[46px] leading-[1.02] tracking-[-0.01em] mb-[18px]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            {slide.title[0]}
            <br />
            {slide.title[1]}
          </h1>
          <p className="text-[16.5px] leading-[1.6] tracking-[-0.01em] max-w-[320px]" style={{ color: "var(--fg-secondary)" }}>
            {slide.body}
          </p>
        </div>

        {/* CTA */}
        <div className="pt-5">
          <Button onClick={() => (last ? router.push("/values") : setI(i + 1))}>
            {last ? "Choose what matters to me" : "Continue"}
            <Icon name="arrowR" size={19} />
          </Button>
        </div>
      </div>
    </div>
  );
}
