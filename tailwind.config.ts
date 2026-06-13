import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "var(--accent)",
          soft: "var(--accent-soft)",
          deep: "var(--accent-deep)",
        },
        "on-accent": "var(--on-accent)",
        "bg-base": "var(--bg-base)",
        "bg-surface": "var(--bg-surface)",
        "bg-sunken": "var(--bg-sunken)",
        "fg-primary": "var(--fg-primary)",
        "fg-secondary": "var(--fg-secondary)",
        "fg-tertiary": "var(--fg-tertiary)",
        "border-soft": "var(--border-soft)",
        "border-default": "var(--border-default)",
        success: "#5E8C3C",
        crisis: "#C0512E",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        ui: ["var(--font-ui)"],
      },
      borderRadius: {
        sm: "10px",
        md: "16px",
        lg: "22px",
        xl: "28px",
        full: "9999px",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(40,48,24,0.05)",
        sm: "0 2px 8px rgba(40,48,24,0.06)",
        md: "0 6px 20px rgba(40,48,24,0.08)",
        lg: "0 14px 36px rgba(40,48,24,0.12)",
        accent: "0 8px 22px rgba(138,154,82,0.32)",
      },
      keyframes: {
        screenIn: {
          from: { transform: "translateY(12px)" },
          to: { transform: "translateY(0)" },
        },
        pop: {
          "0%": { transform: "scale(0.85)" },
          "55%": { transform: "scale(1.06)" },
          "100%": { transform: "scale(1)" },
        },
        blobFloat: {
          "0%": { transform: "translate(0px, 0px) rotate(0deg) scale(1)" },
          "50%": { transform: "translate(14px, -18px) rotate(10deg) scale(1.06)" },
          "100%": { transform: "translate(0px, 0px) rotate(0deg) scale(1)" },
        },
      },
      animation: {
        "screen-in": "screenIn 0.42s cubic-bezier(0.2,0.7,0.2,1) both",
        pop: "pop 0.5s cubic-bezier(0.2,0.8,0.2,1) both",
        blob: "blobFloat 16s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
