"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "@/components/app-provider";
import { valueIcon, resize } from "@/lib/data";
import { StatusBar } from "@/components/status-bar";
import { StepHeader } from "@/components/step-header";
import { BottomBar } from "@/components/bottom-bar";
import { Button } from "@/components/ui/button";
import { IconBadge } from "@/components/icon-badge";
import { Icon } from "@/components/icons";

type Phase = "did" | "rate" | "reflect" | "smaller" | "celebrate";

function CheckInForm() {
  const sp = useSearchParams();
  const id = sp.get("id") || "";
  const router = useRouter();
  const { activities, updateActivity } = useApp();
  const a = activities.find((x) => x.id === id);

  const [phase, setPhase] = useState<Phase>("did");
  const [outcome, setOutcome] = useState<"done" | "partial" | "no" | null>(null);
  const [pleasure, setPleasure] = useState(5);
  const [mastery, setMastery] = useState(5);
  const [reflect, setReflect] = useState<string | null>(null);
  const [journal, setJournal] = useState("");

  if (!a) {
    router.replace("/home");
    return null;
  }

  function finish() {
    updateActivity(a!.id, {
      status: outcome as "done" | "partial",
      pleasure: outcome === "no" ? undefined : pleasure,
      mastery: outcome === "no" ? undefined : mastery,
      reflect: reflect ?? undefined,
      journal,
    });
    setPhase("celebrate");
  }

  /* ── Phase: Did you do it? ── */
  if (phase === "did") {
    const OPTS: [string, string, string, string][] = [
      ["done", "Yes, I did it", "check", "var(--fg-primary)"],
      ["partial", "Partly — I started", "spark", "var(--accent-deep)"],
      ["no", "Not this time", "heart", "var(--fg-secondary)"],
    ];
    return (
      <div className="min-h-[100dvh] flex flex-col" style={{ background: "var(--bg-base)" }}>
        <StatusBar />
        <div className="px-[22px] pb-10 anim-in">
          <StepHeader closeHref="/home" />
          <div className="uppercase text-[11px] tracking-[0.18em] mb-3" style={{ color: "var(--fg-tertiary)" }}>
            {a.value} · check-in
          </div>
          <h1
            className="text-[27px] leading-[1.18] tracking-[-0.01em] mb-5"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            &ldquo;{a.name}&rdquo;
          </h1>
          <p className="text-sm leading-[1.6] mb-7" style={{ color: "var(--fg-secondary)" }}>
            However it went is okay. Showing up to check in is itself a step.
          </p>
          <div className="flex flex-col gap-3">
            {OPTS.map(([k, l, ic, c]) => (
              <button
                key={k}
                onClick={() => {
                  setOutcome(k as "done" | "partial" | "no");
                  setPhase(k === "no" ? "smaller" : "rate");
                }}
                className="p-[18px] flex items-center gap-[14px] text-left rounded-lg border border-[var(--border-soft)] shadow-sm w-full"
                style={{ background: "var(--bg-surface)" }}
              >
                <div
                  className="w-[42px] h-[42px] rounded-[13px] grid place-items-center shrink-0"
                  style={{ background: "var(--bg-sunken)", color: c }}
                >
                  <Icon name={ic} size={22} />
                </div>
                <span className="text-[16.5px]">{l}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Phase: Rate (pleasure + mastery) ── */
  if (phase === "rate") {
    return (
      <div className="min-h-[100dvh] flex flex-col" style={{ background: "var(--bg-base)" }}>
        <StatusBar />
        <div className="px-[22px] pb-[130px] anim-in">
          <StepHeader onBack={() => setPhase("did")} />
          <div className="uppercase text-[11px] tracking-[0.18em] mb-3" style={{ color: "var(--fg-tertiary)" }}>
            How was it?
          </div>
          <h1
            className="text-[34px] leading-[1.06] tracking-[-0.01em] mb-[26px]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            Two quick
            <br />
            reflections.
          </h1>

          {[
            { label: "Pleasure", q: "How enjoyable was this activity?", val: pleasure, set: setPleasure, icon: "heart" },
            { label: "Mastery", q: "How accomplished or effective did you feel?", val: mastery, set: setMastery, icon: "bolt" },
          ].map(({ label, q, val, set, icon }) => (
            <div key={label} className="mb-[30px]">
              <div className="flex items-center gap-2 mb-1">
                <Icon name={icon} size={18} style={{ color: "var(--accent-deep)" }} />
                <span className="uppercase text-[12.5px] tracking-[0.04em]" style={{ color: "var(--fg-secondary)" }}>
                  {label}
                </span>
              </div>
              <p className="text-[14.5px] leading-[1.6] mb-4" style={{ color: "var(--fg-secondary)" }}>{q}</p>
              <div className="flex items-center gap-[14px]">
                <input
                  type="range"
                  className="slider flex-1"
                  min="0"
                  max="10"
                  value={val}
                  onChange={(e) => set(Number(e.target.value))}
                />
                <div
                  className="w-[52px] h-[52px] rounded-[16px] grid place-items-center shrink-0 text-[24px]"
                  style={{
                    background: "var(--accent-soft)",
                    color: "var(--accent-deep)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {val}
                </div>
              </div>
            </div>
          ))}
        </div>
        <BottomBar>
          <Button onClick={() => setPhase("reflect")}>
            Continue <Icon name="arrowR" size={19} />
          </Button>
        </BottomBar>
      </div>
    );
  }

  /* ── Phase: Reflection ── */
  if (phase === "reflect") {
    const OPTS = ["Strongly agree", "Agree", "Neutral", "Disagree"];
    return (
      <div className="min-h-[100dvh] flex flex-col" style={{ background: "var(--bg-base)" }}>
        <StatusBar />
        <div className="px-[22px] pb-[130px] anim-in">
          <StepHeader onBack={() => setPhase("rate")} />
          <div className="uppercase text-[11px] tracking-[0.18em] mb-3" style={{ color: "var(--fg-tertiary)" }}>
            Reflection
          </div>
          <h1
            className="text-[28px] leading-[1.16] tracking-[-0.01em] mb-6"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            Did this move you toward the life you want to live?
          </h1>
          <div className="flex flex-col gap-[10px] mb-6">
            {OPTS.map((o) => (
              <button
                key={o}
                onClick={() => setReflect(o)}
                className="p-[16px_18px] flex items-center justify-between text-left rounded-lg border w-full"
                style={{
                  background: "var(--bg-surface)",
                  borderColor: reflect === o ? "var(--accent)" : "var(--border-soft)",
                  boxShadow: reflect === o ? "0 0 0 3px var(--accent-soft)" : "0 1px 2px rgba(40,48,24,0.05)",
                }}
              >
                <span className="text-[16px]">{o}</span>
                {reflect === o && <Icon name="check" size={20} style={{ color: "#5E8C3C" }} />}
              </button>
            ))}
          </div>
          <label className="uppercase text-[12.5px] tracking-[0.04em]" style={{ color: "var(--fg-secondary)" }}>
            A note to yourself (optional)
          </label>
          <textarea
            className="field w-full p-[15px_16px] rounded-md border border-[var(--border-default)] text-base mt-[10px] block resize-none leading-[1.5]"
            style={{ background: "var(--bg-surface)", color: "var(--fg-primary)" }}
            rows={3}
            value={journal}
            placeholder="Anything you noticed, however small…"
            onChange={(e) => setJournal(e.target.value)}
          />
        </div>
        <BottomBar>
          <Button disabled={!reflect} onClick={finish}>
            <Icon name="check" size={19} /> Save check-in
          </Button>
        </BottomBar>
      </div>
    );
  }

  /* ── Phase: Smaller version (graded task) ── */
  if (phase === "smaller") {
    const smaller = resize(a.name);
    return (
      <div className="min-h-[100dvh] flex flex-col" style={{ background: "var(--bg-base)" }}>
        <StatusBar />
        <div className="px-[22px] flex-1 flex flex-col anim-in">
          <StepHeader
            onClose={() => {
              updateActivity(a.id, { status: "missed" });
              router.push("/home");
            }}
          />
          <div className="flex-1 flex flex-col justify-center">
            <div
              className="w-[76px] h-[76px] rounded-[22px] grid place-items-center mb-6 anim-pop"
              style={{ background: "var(--accent-soft)", color: "var(--accent-deep)" }}
            >
              <Icon name="heart" size={36} />
            </div>
            <h1
              className="text-[34px] leading-[1.06] tracking-[-0.01em] mb-[14px]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              That&apos;s completely okay.
            </h1>
            <p className="text-[16px] leading-[1.6] mb-6" style={{ color: "var(--fg-secondary)" }}>
              Some days are heavier than others. There&apos;s no streak to lose here. Want to try a
              smaller version instead?
            </p>
            <div
              className="p-[18px] flex gap-[13px] items-center rounded-lg border"
              style={{ background: "var(--bg-surface)", borderColor: "var(--accent)" }}
            >
              <IconBadge name={valueIcon(a.value)} size={44} iconSize={22} />
              <div>
                <div className="text-xs mb-1" style={{ color: "var(--fg-tertiary)" }}>Try instead</div>
                <div className="text-[16px] leading-[1.3]">{smaller}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[11px] py-5">
            <Button
              onClick={() => {
                updateActivity(a.id, { name: smaller, status: "upcoming", difficulty: "Easy" });
                router.push("/home");
              }}
            >
              Reschedule the smaller version
            </Button>
            <Button
              variant="quiet"
              className="w-full"
              onClick={() => {
                updateActivity(a.id, { status: "missed" });
                router.push("/home");
              }}
            >
              Not today — back to home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Phase: Celebrate ── */
  const aligned = reflect === "Strongly agree" || reflect === "Agree";
  return (
    <div className="min-h-[100dvh] flex flex-col justify-center items-center text-center px-[22px] anim-in" style={{ background: "var(--bg-base)" }}>
      <StatusBar />
      <div
        className="w-24 h-24 rounded-[30px] grid place-items-center mb-[26px] anim-pop"
        style={{
          background: "var(--accent)",
          color: "var(--on-accent)",
          boxShadow: "0 8px 22px rgba(138,154,82,0.32)",
        }}
      >
        <Icon name="check" size={48} />
      </div>
      <h1
        className="text-[46px] leading-[1.02] tracking-[-0.01em] mb-4"
        style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
      >
        {outcome === "partial" ? "You started.\nThat's real." : "You did it."}
      </h1>
      <p className="text-[16.5px] leading-[1.6] max-w-[300px] mb-10" style={{ color: "var(--fg-secondary)" }}>
        One action toward{" "}
        <strong style={{ color: "var(--accent-deep)" }}>{a.value}</strong>
        {aligned ? " — and it moved you closer to the life you want." : "."} Be proud of that.
      </p>
      <Button onClick={() => router.push("/home")}>Back to today</Button>
    </div>
  );
}

export default function CheckInPage() {
  return (
    <Suspense>
      <CheckInForm />
    </Suspense>
  );
}
