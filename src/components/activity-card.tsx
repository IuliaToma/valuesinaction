"use client";

import { useRouter } from "next/navigation";
import type { Activity } from "@/lib/types";
import { valueIcon, difficultyMeta } from "@/lib/data";
import { IconBadge } from "./icon-badge";
import { Icon } from "./icons";
import { Button } from "./ui/button";

interface ActivityCardProps {
  activity: Activity;
  showCheckin?: boolean;
}

export function ActivityCard({ activity: a, showCheckin }: ActivityCardProps) {
  const router = useRouter();
  const m = difficultyMeta(a.difficulty);
  const done = a.status === "done" || a.status === "partial";

  return (
    <div
      className="p-4 flex gap-[13px] items-start rounded-lg border border-[var(--border-soft)] shadow-sm"
      style={{ background: "var(--bg-surface)", opacity: a.status === "missed" ? 0.7 : 1 }}
    >
      <IconBadge name={valueIcon(a.value)} size={44} iconSize={22} tone={done ? "muted" : "accent"} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-[7px] mb-[5px]">
          <span className="uppercase tracking-[0.18em] text-[10px]" style={{ color: "var(--accent-deep)" }}>
            {a.value}
          </span>
          {done && (
            <span className="inline-flex items-center gap-[3px] text-[11px] text-[#5E8C3C]">
              <Icon name="check" size={13} /> {a.status === "partial" ? "Partly done" : "Done"}
            </span>
          )}
        </div>
        <div className="text-[15.5px] leading-[1.3] mb-2">{a.name}</div>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs flex items-center gap-1" style={{ color: "var(--fg-tertiary)" }}>
            <Icon name="clock" size={13} /> {a.time} · {a.duration}m
          </span>
          <span
            className="text-[11px] px-2 py-[2px] rounded-full"
            style={{ color: m.color, background: m.bg }}
          >
            {a.difficulty}
          </span>
        </div>
        {showCheckin && !done && a.status !== "missed" && (
          <Button
            variant="primary"
            size="sm"
            className="mt-3 w-full"
            onClick={() => router.push(`/checkin?id=${a.id}`)}
          >
            It&apos;s time — how did it go?
          </Button>
        )}
        {done && typeof a.pleasure === "number" && (
          <div className="flex gap-4 mt-[10px]">
            <span className="text-xs" style={{ color: "var(--fg-tertiary)" }}>
              Joy <strong style={{ color: "var(--fg-primary)" }}>{a.pleasure}</strong>/10
            </span>
            <span className="text-xs" style={{ color: "var(--fg-tertiary)" }}>
              Mastery <strong style={{ color: "var(--fg-primary)" }}>{a.mastery}</strong>/10
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
