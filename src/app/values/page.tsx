"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/components/app-provider";
import { CATEGORIES, CAT_ICON } from "@/lib/data";
import { StatusBar } from "@/components/status-bar";
import { StepHeader } from "@/components/step-header";
import { BottomBar } from "@/components/bottom-bar";
import { Chip } from "@/components/ui/chip";
import { Button } from "@/components/ui/button";
import { IconBadge } from "@/components/icon-badge";
import { Icon } from "@/components/icons";

export default function ValuesPage() {
  const router = useRouter();
  const { values: saved, setValues } = useApp();
  const [sel, setSel] = useState<string[]>(saved);

  const toggle = (v: string) =>
    setSel((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));

  const MIN = 3;
  const REC = 5;
  const enough = sel.length >= MIN;

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: "var(--bg-base)" }}>
      <StatusBar />
      <div className="px-[22px] pb-[150px]">
        <StepHeader onClose={saved.length > 0 ? () => router.push("/home") : undefined} />
        <div className="uppercase text-[11px] tracking-[0.18em] mb-3" style={{ color: "var(--fg-tertiary)" }}>
          Step 1 of 1 · Your values
        </div>
        <h1
          className="text-[34px] leading-[1.06] tracking-[-0.01em] mb-3"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
        >
          What do you want
          <br />
          to live by?
        </h1>
        <p className="text-sm leading-[1.6] tracking-[-0.01em] mb-3" style={{ color: "var(--fg-secondary)" }}>
          Pick the things that matter most to you right now. Choose at least{" "}
          <strong style={{ color: "var(--fg-primary)" }}>3</strong> — around{" "}
          <strong style={{ color: "var(--fg-primary)" }}>5</strong> feels just right.
        </p>

        <div className="flex flex-col gap-[26px] mt-[22px]">
          {CATEGORIES.map((cat) => (
            <div key={cat.id}>
              <div className="flex items-center gap-[9px] mb-[13px]">
                <IconBadge name={CAT_ICON[cat.label]} size={30} iconSize={17} tone="muted" />
                <span
                  className="uppercase text-[11px] tracking-[0.18em]"
                  style={{ color: "var(--fg-secondary)" }}
                >
                  {cat.label}
                </span>
              </div>
              <div className="flex flex-wrap gap-[9px]">
                {cat.values.map((v) => (
                  <Chip key={v} selected={sel.includes(v)} onClick={() => toggle(v)}>
                    {sel.includes(v) && <Icon name="check" size={15} />}
                    {v}
                  </Chip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomBar>
        <div className="flex items-center justify-between mb-3 px-1">
          <span
            className="text-xs"
            style={{ color: enough ? "#5E8C3C" : "var(--fg-secondary)" }}
          >
            {sel.length === 0
              ? "Tap the ones that resonate"
              : `${sel.length} chosen${enough ? " — looking good" : `, ${MIN - sel.length} more to go`}`}
          </span>
          <span className="text-xs" style={{ color: "var(--fg-tertiary)" }}>
            {sel.length}/{REC}
          </span>
        </div>
        <Button
          disabled={!enough}
          onClick={() => {
            setValues(sel);
            router.push("/home");
          }}
        >
          {saved.length > 0 ? "Save values" : "Continue"}
          <Icon name="arrowR" size={19} />
        </Button>
      </BottomBar>
    </div>
  );
}
