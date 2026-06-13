export type ActivityStatus = "upcoming" | "done" | "partial" | "missed";

export interface Activity {
  id: string;
  value: string;
  name: string;
  date: "today" | "tomorrow" | "weekend";
  time: string;
  duration: number;
  difficulty: "Easy" | "Medium" | "Hard";
  reminder: string;
  calendar: string | null;
  status: ActivityStatus;
  pleasure?: number;
  mastery?: number;
  reflect?: string;
  journal?: string;
}

export interface Suggestion {
  text: string;
  minutes: number;
  energy: "low" | "medium" | "high";
}

export interface Category {
  id: string;
  label: string;
  values: string[];
}
