"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { Activity } from "@/lib/types";
import { generateId } from "@/lib/utils";

interface AppState {
  values: string[];
  activities: Activity[];
  setValues: (v: string[]) => void;
  commitActivity: (params: Omit<Activity, "id" | "status">) => void;
  updateActivity: (id: string, patch: Partial<Activity>) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [values, setValuesState] = useState<string[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedValues = localStorage.getItem("via_values");
      const savedActivities = localStorage.getItem("via_activities");
      if (savedValues) setValuesState(JSON.parse(savedValues));
      if (savedActivities) setActivities(JSON.parse(savedActivities));
    } catch {}
    setHydrated(true);
  }, []);

  // Persist values
  const setValues = useCallback((v: string[]) => {
    setValuesState(v);
    localStorage.setItem("via_values", JSON.stringify(v));
  }, []);

  // Persist activities
  const saveActivities = useCallback((arr: Activity[]) => {
    setActivities(arr);
    localStorage.setItem("via_activities", JSON.stringify(arr));
  }, []);

  const commitActivity = useCallback(
    (params: Omit<Activity, "id" | "status">) => {
      const id = generateId();
      setActivities((prev) => {
        const next = [{ ...params, id, status: "upcoming" as const }, ...prev];
        localStorage.setItem("via_activities", JSON.stringify(next));
        return next;
      });
    },
    []
  );

  const updateActivity = useCallback(
    (id: string, patch: Partial<Activity>) => {
      setActivities((prev) => {
        const next = prev.map((a) => (a.id === id ? { ...a, ...patch } : a));
        localStorage.setItem("via_activities", JSON.stringify(next));
        return next;
      });
    },
    []
  );

  if (!hydrated) return null;

  return (
    <AppContext.Provider value={{ values, activities, setValues, commitActivity, updateActivity }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
