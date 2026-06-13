"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "@/components/app-provider";
import { valueIcon, difficultyMeta } from "@/lib/data";
import { StatusBar } from "@/components/status-bar";
import { StepHeader } from "@/components/step-header";
import { BottomBar } from "@/components/bottom-bar";
import { Button } from "@/components/ui/button";
import { Segmented } from "@/components/ui/segmented";
import { IconBadge } from "@/components/icon-badge";
import { Icon } from "@/components/icons";

function ScheduleForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const { commitActivity } = useApp();

  const value = sp.get("value") || "";
  const name = sp.get("name") || "";
  const date = (sp.get("date") || "today") as "today" | "tomorrow" | "weekend";
  const time = sp.get("time") || "18:00";
  const duration = Number(sp.get("duration") || 15);
  const difficulty = (sp.get("difficulty") || "Easy") as "Easy" | "Medium" | "Hard";

  const [reminder, setReminder] = useState<"1d" | "1h" | "at">("1h");
  const [method, setMethod] = useState<string | null>(null);

  const REM_OPTS: ["1d" | "1h" | "at", string][] = [
    ["1d", "1 day before"],
    ["1h", "1 hour before"],
    ["at", "At the time"],
  ];

  const dateLabel = { today: "Today", tomorrow: "Tomorrow", weekend: "This weekend" }[date];
  const m = difficultyMeta(difficulty);

  function downloadICS() {
    const dt = new Date();
    if (date === "tomorrow") dt.setDate(dt.getDate() + 1);
    if (date === "weekend") dt.setDate(dt.getDate() + ((6 - dt.getDay() + 7) % 7 || 6));
    const [hh, mm] = time.split(":");
    dt.setHours(+hh, +mm, 0, 0);
    const end = new Date(dt.getTime() + duration * 60000);
    const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Values in Action//EN", "BEGIN:VEVENT",
      "UID:" + Date.now() + "@valuesinaction",
      "DTSTAMP:" + fmt(new Date()), "DTSTART:" + fmt(dt), "DTEND:" + fmt(end),
      "SUMMARY:" + name, "DESCRIPTION:A small action toward " + value + ".",
      "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "values-in-action.ics";
    a.click();
    setMethod("ics");
  }

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: "var(--bg-base)" }}>
      <StatusBar />
      <div className="px-[22px] pb-[150px]">
        <StepHeader backHref="/plan" closeHref="/home" />
        <div className="uppercase text-[11px] tracking-[0.18em] mb-[10px]" style={{ color: "var(--fg-tertiary)" }}>
          Almost there
        </div>
        <h1
          className="text-[34px] leading-[1.06] tracking-[-0.01em] mb-5"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
        >
          Set a reminder.
        </h1>

        {/* Summary card */}
        <div
          className="p-[18px] flex gap-[14px] items-start rounded-lg border border-[var(--border-soft)] shadow-sm mb-[26px]"
          style={{ background: "var(--bg-surface)" }}
        >
          <IconBadge name={valueIcon(value)} size={46} iconSize={23} />
          <div className="flex-1">
            <div className="text-[16.5px] leading-[1.3] mb-2">{name}</div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs flex items-center gap-1" style={{ color: "var(--fg-tertiary)" }}>
                <Icon name="calendar" size={13} /> {dateLabel}, {time}
              </span>
              <span className="text-xs flex items-center gap-1" style={{ color: "var(--fg-tertiary)" }}>
                <Icon name="clock" size={13} /> {duration} min
              </span>
              <span
                className="text-[11px] px-[9px] py-[2px] rounded-full"
                style={{ color: m.color, background: m.bg }}
              >
                {difficulty}
              </span>
            </div>
          </div>
        </div>

        <label className="uppercase text-[12.5px] tracking-[0.04em] flex items-center gap-[7px]" style={{ color: "var(--fg-secondary)" }}>
          <Icon name="bell" size={15} /> Remind me
        </label>
        <Segmented className="mt-[11px] mb-7" options={REM_OPTS} value={reminder} onChange={setReminder} />

        <label className="uppercase text-[12.5px] tracking-[0.04em]" style={{ color: "var(--fg-secondary)" }}>
          Add to calendar
        </label>
        <div className="flex flex-col gap-[11px] mt-[11px]">
          {[
            { key: "google", icon: "google", label: "Google Calendar" },
            { key: "apple", icon: "apple", label: "Apple Calendar" },
          ].map(({ key, icon, label }) => (
            <button
              key={key}
              onClick={() => setMethod(key)}
              className="p-4 flex items-center gap-[13px] text-left rounded-lg border shadow-sm w-full"
              style={{
                background: "var(--bg-surface)",
                borderColor: method === key ? "var(--accent)" : "var(--border-soft)",
                boxShadow: method === key ? "0 0 0 3px var(--accent-soft)" : "0 1px 2px rgba(40,48,24,0.05)",
              }}
            >
              <Icon name={icon} size={24} />
              <span className="flex-1 text-[15px]">{label}</span>
              {method === key ? (
                <Icon name="check" size={20} style={{ color: "#5E8C3C" }} />
              ) : (
                <Icon name="arrowR" size={18} style={{ color: "var(--fg-tertiary)" }} />
              )}
            </button>
          ))}
          <button
            onClick={downloadICS}
            className="p-4 flex items-center gap-[13px] text-left rounded-lg border shadow-sm w-full"
            style={{
              background: "var(--bg-surface)",
              borderColor: method === "ics" ? "var(--accent)" : "var(--border-soft)",
              boxShadow: method === "ics" ? "0 0 0 3px var(--accent-soft)" : "0 1px 2px rgba(40,48,24,0.05)",
            }}
          >
            <Icon name="download" size={22} style={{ color: "var(--fg-secondary)" }} />
            <span className="flex-1 text-[15px]">Download .ics file</span>
            {method === "ics" ? (
              <Icon name="check" size={20} style={{ color: "#5E8C3C" }} />
            ) : (
              <span className="text-xs" style={{ color: "var(--fg-tertiary)" }}>any app</span>
            )}
          </button>
        </div>
        {method === "google" && (
          <p className="text-xs mt-[14px]" style={{ color: "var(--fg-tertiary)" }}>
            You&apos;ll be asked to connect your Google account once.
          </p>
        )}
      </div>

      <BottomBar>
        <Button
          onClick={() => {
            commitActivity({ value, name, date, time, duration, difficulty, reminder, calendar: method });
            router.push("/home");
          }}
        >
          <Icon name="check" size={19} /> Commit to this action
        </Button>
      </BottomBar>
    </div>
  );
}

export default function SchedulePage() {
  return (
    <Suspense>
      <ScheduleForm />
    </Suspense>
  );
}
