"use client";

import { useApp } from "@/components/app-provider";
import { StatusBar } from "@/components/status-bar";
import { TabBar } from "@/components/tab-bar";
import { Fab } from "@/components/fab";
import { ActivityCard } from "@/components/activity-card";

export default function AgendaPage() {
  const { activities } = useApp();
  const pending = activities.filter((a) => a.status === "upcoming");
  const done = activities.filter((a) => a.status === "done" || a.status === "partial");

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: "var(--bg-base)" }}>
      <StatusBar />
      <div className="px-[22px] pt-[10px] pb-[180px]">
        <h1
          className="text-[34px] leading-[1.06] tracking-[-0.01em] mb-[6px]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
        >
          Your agenda
        </h1>
        <p className="text-sm leading-[1.6] mb-6" style={{ color: "var(--fg-secondary)" }}>
          Every action you&apos;ve planned, in one calm place.
        </p>

        <div
          className="uppercase text-[11px] tracking-[0.18em] mb-3"
          style={{ color: "var(--fg-tertiary)" }}
        >
          Upcoming
        </div>
        {pending.length === 0 ? (
          <div
            className="p-5 text-center rounded-lg border border-[var(--border-soft)] shadow-sm mb-[26px]"
            style={{ background: "var(--bg-surface)" }}
          >
            <p className="text-sm" style={{ color: "var(--fg-tertiary)" }}>
              Nothing planned yet. Tap + to add a small action.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 mb-[26px]">
            {pending.map((a) => (
              <ActivityCard key={a.id} activity={a} showCheckin />
            ))}
          </div>
        )}

        {done.length > 0 && (
          <>
            <div
              className="uppercase text-[11px] tracking-[0.18em] mb-3"
              style={{ color: "#5E8C3C" }}
            >
              Completed
            </div>
            <div className="flex flex-col gap-3">
              {done.map((a) => (
                <ActivityCard key={a.id} activity={a} />
              ))}
            </div>
          </>
        )}
      </div>

      <Fab />
      <TabBar />
    </div>
  );
}
