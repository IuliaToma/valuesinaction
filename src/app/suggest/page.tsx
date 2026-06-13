"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/components/app-provider";
import { generate, valueIcon } from "@/lib/data";
import { StatusBar } from "@/components/status-bar";
import { StepHeader } from "@/components/step-header";
import { Chip } from "@/components/ui/chip";
import { Button } from "@/components/ui/button";
import { Segmented } from "@/components/ui/segmented";
import { IconBadge } from "@/components/icon-badge";
import { Icon } from "@/components/icons";
import type { Suggestion } from "@/lib/types";

type Phase = "setup" | "loading" | "results";

async function generateFromClaude(
  value: string,
  minutes: number,
  energy: string
): Promise<Suggestion[]> {
  const apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("No API key");

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      messages: [
        {
          role: "user",
          content: `You are a values-based action coach. The user wants to live the value of "${value}". They have ${minutes} minutes available and ${energy} energy.

Suggest exactly 3 concrete, warm, immediately doable actions. Return ONLY a valid JSON array, no explanation or markdown:
[{"text":"...","minutes":N,"energy":"low|medium|high"},...]

Rules:
- Each action takes at most ${minutes} minutes (use realistic durations)
- Energy level is "${energy}" or lower
- Text is specific and encouraging, under 65 characters`,
        },
      ],
    }),
  });

  if (!response.ok) throw new Error(`API ${response.status}`);

  const data = await response.json();
  const raw: string = data.content?.[0]?.text ?? "";
  const match = raw.match(/\[[\s\S]*\]/);
  if (!match) throw new Error("No JSON in response");
  const parsed: Suggestion[] = JSON.parse(match[0]);
  if (!Array.isArray(parsed) || parsed.length === 0) throw new Error("Invalid array");
  return parsed.slice(0, 3);
}

export default function SuggestPage() {
  const router = useRouter();
  const { values } = useApp();
  const [phase, setPhase] = useState<Phase>("setup");
  const [value, setValue] = useState(values[0] || "Love");
  const [minutes, setMinutes] = useState(10);
  const [energy, setEnergy] = useState<"low" | "medium" | "high">("low");
  const [results, setResults] = useState<Suggestion[]>([]);

  const TIME_OPTS: [string, string][] = [
    ["5", "5 min"],
    ["10", "10 min"],
    ["20", "20 min"],
    ["45", "45 min"],
  ];
  const ENERGY_OPTS: ["low" | "medium" | "high", string][] = [
    ["low", "Low"],
    ["medium", "Medium"],
    ["high", "High"],
  ];

  async function handleGenerate() {
    setPhase("loading");
    try {
      setResults(await generateFromClaude(value, minutes, energy));
    } catch {
      setResults(generate(value, minutes, energy));
    }
    setPhase("results");
  }

  if (phase === "setup") {
    return (
      <div className="min-h-[100dvh] flex flex-col" style={{ background: "var(--bg-base)" }}>
        <StatusBar />
        <div className="px-[22px] pb-10 anim-in">
          <StepHeader backHref="/home" closeHref="/home" />
          <div
            className="inline-flex items-center gap-2 px-[13px] py-[7px] rounded-full text-[13px] mb-[18px]"
            style={{ background: "var(--accent-soft)", color: "var(--accent-deep)" }}
          >
            <Icon name="spark" size={16} /> Suggested for you
          </div>
          <h1
            className="text-[34px] leading-[1.06] tracking-[-0.01em] mb-3"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            Let&apos;s find one
            <br />
            small action.
          </h1>
          <p className="text-sm leading-[1.6] mb-[26px]" style={{ color: "var(--fg-secondary)" }}>
            Tell us a little about right now. We&apos;ll suggest something concrete and doable.
          </p>

          <label className="uppercase text-[12.5px] tracking-[0.04em]" style={{ color: "var(--fg-secondary)" }}>
            Which value?
          </label>
          <div className="flex flex-wrap gap-2 mt-[11px] mb-6">
            {values.map((v) => (
              <Chip key={v} selected={value === v} onClick={() => setValue(v)}>
                {value === v && <Icon name="check" size={14} />}
                {v}
              </Chip>
            ))}
          </div>

          <label className="uppercase text-[12.5px] tracking-[0.04em]" style={{ color: "var(--fg-secondary)" }}>
            Time available
          </label>
          <Segmented
            className="mt-[11px] mb-6"
            options={TIME_OPTS}
            value={String(minutes)}
            onChange={(v) => setMinutes(Number(v))}
          />

          <label className="uppercase text-[12.5px] tracking-[0.04em]" style={{ color: "var(--fg-secondary)" }}>
            Energy level
          </label>
          <Segmented
            className="mt-[11px] mb-7"
            options={ENERGY_OPTS}
            value={energy}
            onChange={setEnergy}
          />

          <Button onClick={handleGenerate}>
            <Icon name="spark" size={18} /> Suggest an action
          </Button>
        </div>
      </div>
    );
  }

  if (phase === "loading") {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center" style={{ background: "var(--bg-base)" }}>
        <StatusBar />
        <div className="flex flex-col items-center gap-4 anim-in">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center animate-pulse"
            style={{ background: "var(--accent-soft)" }}
          >
            <Icon name="spark" size={24} style={{ color: "var(--accent-deep)" }} />
          </div>
          <p className="text-sm" style={{ color: "var(--fg-secondary)" }}>Finding the right actions…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: "var(--bg-base)" }}>
      <StatusBar />
      <div className="px-[22px] pb-10 anim-in">
        <StepHeader onBack={() => setPhase("setup")} closeHref="/home" />
        <div className="uppercase text-[11px] tracking-[0.18em] mb-[10px]" style={{ color: "var(--fg-tertiary)" }}>
          {value} · {minutes} min · {energy} energy
        </div>
        <h1
          className="text-[34px] leading-[1.06] tracking-[-0.01em] mb-2"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
        >
          Here are a few
          <br />
          gentle options.
        </h1>
        <p className="text-sm leading-[1.6] mb-[22px]" style={{ color: "var(--fg-secondary)" }}>
          Pick one that feels possible. You can tweak the words too.
        </p>

        <div className="flex flex-col gap-[13px]">
          {results.map((s, idx) => (
            <button
              key={idx}
              className="p-[18px] flex gap-[14px] items-start text-left rounded-lg border border-[var(--border-soft)] shadow-sm w-full"
              style={{ background: "var(--bg-surface)" }}
              onClick={() =>
                router.push(
                  `/plan?value=${encodeURIComponent(value)}&name=${encodeURIComponent(s.text)}&duration=${s.minutes}`
                )
              }
            >
              <IconBadge name={valueIcon(value)} size={44} iconSize={22} />
              <div className="flex-1">
                <div className="text-[16px] leading-[1.35] mb-[6px]">{s.text}</div>
                <div className="flex gap-3 text-xs" style={{ color: "var(--fg-tertiary)" }}>
                  <span className="inline-flex items-center gap-1">
                    <Icon name="clock" size={13} /> ~{s.minutes} min
                  </span>
                </div>
              </div>
              <Icon name="arrowR" size={19} style={{ color: "var(--fg-tertiary)", marginTop: 12 }} />
            </button>
          ))}
        </div>

        <Button className="mt-5" onClick={handleGenerate}>
          <Icon name="spark" size={17} /> Suggest different ones
        </Button>
        <Button
          variant="ghost"
          className="mt-3"
          onClick={() =>
            router.push(`/plan?value=${encodeURIComponent(value)}&name=&duration=${minutes}`)
          }
        >
          <Icon name="edit" size={17} /> Write my own instead
        </Button>
      </div>
    </div>
  );
}
