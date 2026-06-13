"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/components/app-provider";
import { valueIcon } from "@/lib/data";
import { greeting } from "@/lib/utils";
import { StatusBar } from "@/components/status-bar";
import { TabBar } from "@/components/tab-bar";
import { Fab } from "@/components/fab";
import { ActivityCard } from "@/components/activity-card";
import { Icon } from "@/components/icons";

export default function HomePage() {
  const router = useRouter();
  const { values, activities } = useApp();

  useEffect(() => {
    if (values.length === 0) router.replace("/onboarding");
  }, [values, router]);

  const pending = activities.filter((a) => a.status === "upcoming");
  const done = activities.filter((a) => a.status === "done" || a.status === "partial");

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: "var(--bg-base)" }}>
      <StatusBar />
      <div className="px-[22px] pt-[10px] pb-[180px]">
        {/* Header */}
        <div className="flex justify-between items-start mb-[18px]">
          <div>
            <div className="text-xs mb-1" style={{ color: "var(--fg-tertiary)" }}>{today}</div>
            <h1
              className="text-[34px] leading-[1.06] tracking-[-0.01em]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              {greeting()}.
            </h1>
          </div>
          <button
            onClick={() => router.push("/support")}
            aria-label="Get support"
            className="w-[44px] h-[44px] rounded-full grid place-items-center border border-[var(--border-soft)] mt-1"
            style={{ background: "var(--bg-surface)", color: "var(--fg-secondary)" }}
          >
            <Icon name="shield" size={21} />
          </button>
        </div>

        {/* Guest banner */}
        <div
          className="flex items-start gap-[11px] p-[12px_14px] rounded-[14px] border border-[var(--border-soft)] mb-6"
          style={{ background: "var(--accent-soft)" }}
        >
          <Icon name="leaf" size={17} style={{ color: "var(--accent-deep)", flexShrink: 0, marginTop: 1 }} />
          <p className="text-xs flex-1 leading-[1.5]" style={{ color: "var(--fg-secondary)" }}>
            You&apos;re exploring as a guest — try everything freely, no commitment.{" "}
            <button
              onClick={() => {}}
              className="underline underline-offset-2 p-0 text-inherit text-xs inline"
              style={{ color: "var(--accent-deep)" }}
            >
              Create a free account
            </button>{" "}
            whenever you&apos;d like to save your progress.
          </p>
        </div>

        {/* Values strip */}
        <div
          className="flex gap-2 overflow-x-auto pb-[6px] mb-[26px]"
          style={{ scrollbarWidth: "none" }}
        >
          {values.map((v) => (
            <button
              key={v}
              onClick={() => router.push("/suggest")}
              className="flex items-center gap-[7px] px-[15px] py-[10px] rounded-full border border-[var(--border-default)] text-sm shrink-0"
              style={{ background: "var(--bg-surface)", color: "var(--fg-primary)" }}
            >
              <Icon name={valueIcon(v)} size={15} style={{ color: "var(--accent-deep)" }} />
              {v}
            </button>
          ))}
          <button
            onClick={() => router.push("/values")}
            className="flex items-center gap-[7px] px-[15px] py-[10px] rounded-full border border-[var(--border-default)] text-sm shrink-0"
            style={{ background: "var(--bg-surface)", color: "var(--fg-tertiary)" }}
          >
            <Icon name="edit" size={14} /> Edit
          </button>
        </div>

        {/* Today's plan */}
        <div className="flex items-baseline justify-between mb-[14px]">
          <h3
            className="text-[25px] leading-[1.12]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            Today&apos;s plan
          </h3>
          {pending.length > 0 && (
            <span className="text-xs" style={{ color: "var(--fg-tertiary)" }}>
              {pending.length} planned
            </span>
          )}
        </div>

        {activities.length === 0 ? (
          <div className="p-[26px] text-center rounded-lg border border-[var(--border-soft)] shadow-sm" style={{ background: "var(--bg-surface)" }}>
            <div
              className="w-16 h-16 rounded-[20px] grid place-items-center mx-auto mb-4"
              style={{ background: "var(--accent-soft)", color: "var(--accent-deep)" }}
            >
              <Icon name="leaf" size={30} />
            </div>
            <div
              className="text-[25px] leading-[1.12] mb-2"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              Start with one small thing
            </div>
            <p className="text-[14.5px] leading-[1.6] mb-5" style={{ color: "var(--fg-secondary)" }}>
              You don&apos;t need to feel ready. A tiny action toward something you value is enough for today.
            </p>
            <button
              onClick={() => router.push("/suggest")}
              className="inline-flex items-center justify-center gap-[9px] w-full rounded-full py-[17px] px-[22px] text-base"
              style={{ background: "var(--accent)", color: "var(--on-accent)", boxShadow: "0 8px 22px rgba(138,154,82,0.32)" }}
            >
              <Icon name="spark" size={18} /> Plan my first action
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {pending.map((a) => (
              <ActivityCard key={a.id} activity={a} showCheckin />
            ))}
            {done.length > 0 && (
              <>
                <div
                  className="uppercase text-[11px] tracking-[0.18em] mt-[14px] mb-[2px]"
                  style={{ color: "#5E8C3C" }}
                >
                  Completed
                </div>
                {done.map((a) => (
                  <ActivityCard key={a.id} activity={a} />
                ))}
              </>
            )}
          </div>
        )}

        {done.length > 0 && (
          <div
            className="mt-[22px] p-[18px_20px] rounded-[18px] flex gap-[13px] items-center"
            style={{ background: "var(--accent-soft)" }}
          >
            <Icon name="heart" size={24} style={{ color: "var(--accent-deep)" }} />
            <p className="text-[14.5px] leading-[1.4]" style={{ color: "var(--fg-primary)" }}>
              You showed up for what matters today. That counts.
            </p>
          </div>
        )}
      </div>

      <Fab />
      <TabBar />
    </div>
  );
}
