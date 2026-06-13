import type { Category, Suggestion } from "./types";

export const CATEGORIES: Category[] = [
  { id: "relationships", label: "Relationships", values: ["Love", "Family", "Partnership", "Friendship", "Parenting"] },
  { id: "health", label: "Health", values: ["Physical Health", "Mental Wellbeing", "Sleep", "Fitness", "Self-Care"] },
  { id: "growth", label: "Growth", values: ["Learning", "Curiosity", "Personal Development", "Creativity"] },
  { id: "career", label: "Career", values: ["Career", "Achievement", "Responsibility", "Leadership"] },
  { id: "community", label: "Community", values: ["Helping Others", "Volunteering", "Citizenship", "Environment"] },
  { id: "spirituality", label: "Spirituality", values: ["Faith", "Spiritual Growth", "Mindfulness"] },
  { id: "leisure", label: "Leisure", values: ["Fun", "Adventure", "Recreation", "Playfulness"] },
  { id: "character", label: "Character", values: ["Compassion", "Honesty", "Courage", "Gratitude", "Kindness"] },
];

export const VALUE_CATEGORY: Record<string, string> = {};
CATEGORIES.forEach((c) => c.values.forEach((v) => (VALUE_CATEGORY[v] = c.label)));

export const CAT_ICON: Record<string, string> = {
  Relationships: "heart",
  Health: "bolt",
  Growth: "spark",
  Career: "chart",
  Community: "leaf",
  Spirituality: "leaf",
  Leisure: "spark",
  Character: "shield",
};

export function valueIcon(value: string): string {
  const cat = VALUE_CATEGORY[value];
  return CAT_ICON[cat] || "heart";
}

const SUGGESTIONS: Record<string, Suggestion[]> = {
  Love: [
    { text: "Send a thoughtful text to someone you love", minutes: 5, energy: "low" },
    { text: "Cook dinner for your partner tonight", minutes: 45, energy: "high" },
    { text: "Write down three things you appreciate about them", minutes: 10, energy: "low" },
    { text: "Plan a small surprise for this weekend", minutes: 15, energy: "medium" },
  ],
  Family: [
    { text: "Call a family member just to say hi", minutes: 10, energy: "low" },
    { text: "Share an old photo with a sibling or parent", minutes: 5, energy: "low" },
    { text: "Plan a 30-minute family activity", minutes: 30, energy: "medium" },
  ],
  Partnership: [
    { text: "Ask your partner one question about their day", minutes: 5, energy: "low" },
    { text: "Make tea and sit together for 10 minutes", minutes: 10, energy: "low" },
  ],
  Friendship: [
    { text: "Message a friend you miss", minutes: 5, energy: "low" },
    { text: "Invite a friend for a short walk", minutes: 30, energy: "medium" },
  ],
  Parenting: [
    { text: "Read one short story with your child", minutes: 10, energy: "low" },
    { text: "Play their favourite game for 15 minutes", minutes: 15, energy: "medium" },
  ],
  "Physical Health": [
    { text: "Take a 10-minute walk outside", minutes: 10, energy: "medium" },
    { text: "Drink a glass of water right now", minutes: 1, energy: "low" },
    { text: "Prepare one healthy meal", minutes: 30, energy: "high" },
  ],
  "Mental Wellbeing": [
    { text: "Sit quietly and take 5 slow breaths", minutes: 3, energy: "low" },
    { text: "Step outside for fresh air", minutes: 5, energy: "low" },
  ],
  Sleep: [
    { text: "Put your phone away 30 minutes before bed", minutes: 1, energy: "low" },
    { text: "Go to bed before 11 PM tonight", minutes: 5, energy: "low" },
  ],
  Fitness: [
    { text: "Put on your workout clothes", minutes: 2, energy: "low" },
    { text: "Stretch for 5 minutes", minutes: 5, energy: "low" },
    { text: "Do a 20-minute home workout", minutes: 20, energy: "high" },
  ],
  "Self-Care": [
    { text: "Take a warm shower without rushing", minutes: 15, energy: "low" },
    { text: "Make yourself a proper cup of coffee or tea", minutes: 8, energy: "low" },
  ],
  Learning: [
    { text: "Read 10 pages of a book", minutes: 15, energy: "low" },
    { text: "Watch one short educational video", minutes: 12, energy: "low" },
    { text: "Complete one lesson of a course", minutes: 30, energy: "high" },
  ],
  Curiosity: [{ text: "Look up one thing you've wondered about", minutes: 10, energy: "low" }],
  "Personal Development": [{ text: "Write one sentence about a goal", minutes: 5, energy: "low" }],
  Creativity: [
    { text: "Doodle or sketch for 10 minutes", minutes: 10, energy: "low" },
    { text: "Write a few lines in a journal", minutes: 10, energy: "low" },
  ],
  Career: [
    { text: "Clear your inbox for 15 minutes", minutes: 15, energy: "medium" },
    { text: "Write tomorrow's top 3 tasks", minutes: 8, energy: "low" },
  ],
  Achievement: [{ text: "Finish one small task you've put off", minutes: 20, energy: "medium" }],
  Responsibility: [{ text: "Pay one bill or handle one errand", minutes: 15, energy: "medium" }],
  Leadership: [{ text: "Send encouragement to a teammate", minutes: 5, energy: "low" }],
  "Helping Others": [
    { text: "Check in on someone who might need it", minutes: 8, energy: "low" },
    { text: "Offer help with one small thing", minutes: 20, energy: "medium" },
  ],
  Volunteering: [{ text: "Look up one local volunteering option", minutes: 15, energy: "low" }],
  Citizenship: [{ text: "Read about one local issue", minutes: 12, energy: "low" }],
  Environment: [
    { text: "Sort recycling for 10 minutes", minutes: 10, energy: "low" },
    { text: "Take a litter-free walk in nature", minutes: 25, energy: "medium" },
  ],
  Faith: [{ text: "Spend 5 quiet minutes in reflection", minutes: 5, energy: "low" }],
  "Spiritual Growth": [{ text: "Read a passage that grounds you", minutes: 10, energy: "low" }],
  Mindfulness: [
    { text: "Do a 5-minute breathing exercise", minutes: 5, energy: "low" },
    { text: "Notice five things you can see right now", minutes: 3, energy: "low" },
  ],
  Fun: [
    { text: "Play your favourite song and listen fully", minutes: 4, energy: "low" },
    { text: "Watch one episode of something you enjoy", minutes: 25, energy: "low" },
  ],
  Adventure: [{ text: "Walk a route you've never taken", minutes: 25, energy: "medium" }],
  Recreation: [{ text: "Do a hobby for 15 minutes", minutes: 15, energy: "medium" }],
  Playfulness: [{ text: "Do something silly just for joy", minutes: 5, energy: "low" }],
  Compassion: [{ text: "Write a kind note to yourself", minutes: 6, energy: "low" }],
  Honesty: [{ text: "Share one honest feeling with someone safe", minutes: 10, energy: "medium" }],
  Courage: [{ text: "Take one tiny step toward something you avoid", minutes: 10, energy: "medium" }],
  Gratitude: [{ text: "Write down three good things from today", minutes: 6, energy: "low" }],
  Kindness: [
    { text: "Do one small kind act for a stranger", minutes: 8, energy: "low" },
    { text: "Give someone a genuine compliment", minutes: 2, energy: "low" },
  ],
};

const GENERIC: Suggestion[] = [
  { text: "Take one small step toward this value", minutes: 10, energy: "low" },
  { text: "Spend 15 focused minutes on what matters here", minutes: 15, energy: "medium" },
];

const ENERGY_RANK: Record<string, number> = { low: 1, medium: 2, high: 3 };

export function generate(value: string, minutes: number, energy: string): Suggestion[] {
  const pool = (SUGGESTIONS[value] || []).concat(GENERIC);
  const cap = ENERGY_RANK[energy] || 2;
  let matches = pool.filter((s) => s.minutes <= minutes + 0.001 && ENERGY_RANK[s.energy] <= cap);
  if (matches.length === 0) matches = pool.filter((s) => s.minutes <= minutes + 0.001);
  if (matches.length === 0) matches = pool.slice(0, 2);
  const seen = new Set<string>();
  const out: Suggestion[] = [];
  matches
    .sort((a, b) => Math.abs(a.minutes - minutes) - Math.abs(b.minutes - minutes))
    .forEach((s) => {
      if (!seen.has(s.text) && out.length < 3) {
        seen.add(s.text);
        out.push(s);
      }
    });
  return out;
}

export function resize(text: string): string {
  const lower = text.toLowerCase();
  const RULES: [RegExp, string][] = [
    [/clean (the |your )?(entire |whole )?(apartment|house|home)/, "Clean one shelf"],
    [/go to the gym.*/, "Put on your gym clothes"],
    [/(do a |a )?\d+-?minute (home )?workout/, "Stretch for 2 minutes"],
    [/cook dinner.*/, "Make a simple snack together"],
    [/read \d+ pages.*/, "Read one page"],
    [/run .*/, "Walk for 5 minutes"],
    [/(20|30|45)-?\s?minute walk/, "Walk to the end of the street"],
    [/walk .*/, "Step outside for 2 minutes"],
    [/complete one lesson.*/, "Watch the first 5 minutes of a lesson"],
  ];
  for (const [re, smaller] of RULES) {
    if (re.test(lower)) return smaller;
  }
  return "Do just the first 2 minutes of this";
}

export function difficultyMeta(d: string): { color: string; bg: string } {
  const map: Record<string, { color: string; bg: string }> = {
    Easy: { color: "#5E8C3C", bg: "#E8EFD8" },
    Medium: { color: "var(--accent-deep)", bg: "var(--accent-soft)" },
    Hard: { color: "#C0512E", bg: "#F4E5DD" },
  };
  return map[d] || { color: "var(--fg-secondary)", bg: "var(--bg-sunken)" };
}
