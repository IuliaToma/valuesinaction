"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "@/components/app-provider";
import { difficultyMeta } from "@/lib/data";
import { StatusBar } from "@/components/status-bar";
import { StepHeader } from "@/components/step-header";
import { BottomBar } from "@/components/bottom-bar";
import { Chip } from "@/components/ui/chip";
import { Button } from "@/components/ui/button";
import { Segmented } from "@/components/ui/segmented";
import { Icon } from "@/components/icons";

function PlanForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const { values } = useApp();

  const [value, setValue] = useState(sp.get("value") || values[0] || "");
  const [name, setName] = useState(sp.get("name") || "");
  const [date, setDate] = useState<"today" | "tomorrow" | "weekend">("today");
  const [time, setTime] = useState("18:00");
  const [duration, setDuration] = useState(Number(sp.get("duration")) || 15);
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy");

  const DATE_OPTS: ["today" | "tomorrow" | "weekend", string][] = [
    ["today", "Today"],
    ["tomorrow", "Tomorrow"],
    ["weekend", "Weekend"],
  ];
  const DUR_OPTS = [5, 15, 30, 45, 60];
  const DIFF: ("Easy" | "Medium" | "Hard")[] = ["Easy", "Medium", "Hard"];
  const valid = name.trim().length > 0;

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: "var(--bg-base)" }}>
      <StatusBar />
      <div className="px-[22px] pb-[140px]">
        <StepHeader backHref="/suggest" closeHref="/home" />
        <div className="uppercase text-[11px] tracking-[0.18em] mb-[10px]" style={{ color: "var(--fg-tertiary)" }}>
          Make it a commitment
        </div>
        <h1
          className="text-[34px] leading-[1.06] tracking-[-0.01em] mb-[22px]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
        >
          Plan your action.
        </h1>

        <label className="uppercase text-[12.5px] tracking-[0.04em]" style={{ color: "var(--fg-secondary)" }}>
          Activity
        </label>
        <textarea
          className="field w-full p-[15px_16px] rounded-md border border-[var(--border-default)] text-[16px] mt-[10px] mb-5 block resize-none leading-[1.5]"
          style={{ background: "var(--bg-surface)", color: "var(--fg-primary)" }}
          rows={2}
          value={name}
          placeholder="e.g. Take a 10-minute walk outside"
          onChange={(e) => setName(e.target.value)}
        />

        <label className="uppercase text-[12.5px] tracking-[0.04em]" style={{ color: "var(--fg-secondary)" }}>
          Linked value
        </label>
        <div className="flex flex-wrap gap-2 mt-[10px] mb-5">
          {values.map((v) => (
            <Chip key={v} selected={value === v} onClick={() => setValue(v)}>
              {value === v && <Icon name="check" size={14} />}
              {v}
            </Chip>
          ))}
        </div>

        <label className="uppercase text-[12.5px] tracking-[0.04em]" style={{ color: "var(--fg-secondary)" }}>
          When
        </label>
        <Segmented className="mt-[10px] mb-[14px]" options={DATE_OPTS} value={date} onChange={setDate} />
        <div className="flex items-center gap-[10px] mb-5">
          <Icon name="clock" size={18} style={{ color: "var(--fg-tertiary)" }} />
          <input
            type="time"
            className="field flex-1 p-[15px_16px] rounded-md border border-[var(--border-default)] text-[16px]"
            style={{ background: "var(--bg-surface)", color: "var(--fg-primary)" }}
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <label className="uppercase text-[12.5px] tracking-[0.04em]" style={{ color: "var(--fg-secondary)" }}>
          Duration
        </label>
        <div className="flex flex-wrap gap-2 mt-[10px] mb-5">
          {DUR_OPTS.map((d) => (
            <Chip key={d} selected={duration === d} onClick={() => setDuration(d)}>
              {d} min
            </Chip>
          ))}
        </div>

        <label className="uppercase text-[12.5px] tracking-[0.04em]" style={{ color: "var(--fg-secondary)" }}>
          How hard does it feel?
        </label>
        <div
          className="flex gap-[6px] p-[5px] rounded-full mt-[10px]"
          style={{ background: "var(--bg-sunken)" }}
        >
          {DIFF.map((d) => {
            const m = difficultyMeta(d);
            return (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className="flex-1 py-[11px] px-2 rounded-full text-sm transition-all duration-150"
                style={
                  difficulty === d
                    ? { background: "var(--bg-surface)", color: m.color, boxShadow: "0 1px 2px rgba(40,48,24,0.05)" }
                    : { color: "var(--fg-secondary)" }
                }
              >
                {d}
              </button>
            );
          })}
        </div>
        <p className="text-xs mt-[10px]" style={{ color: "var(--fg-tertiary)" }}>
          Easier actions are wins too. Start small — you can always do more.
        </p>
      </div>

      <BottomBar>
        <Button
          disabled={!valid}
          onClick={() => {
            const params = new URLSearchParams({
              value,
              name: name.trim(),
              date,
              time,
              duration: String(duration),
              difficulty,
            });
            router.push(`/schedule?${params.toString()}`);
          }}
        >
          Add reminder & schedule <Icon name="arrowR" size={19} />
        </Button>
      </BottomBar>
    </div>
  );
}

export default function PlanPage() {
  return (
    <Suspense>
      <PlanForm />
    </Suspense>
  );
}
