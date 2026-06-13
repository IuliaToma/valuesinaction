import { Icon } from "./icons";

interface IconBadgeProps {
  name: string;
  size?: number;
  iconSize?: number;
  tone?: "accent" | "muted";
}

export function IconBadge({ name, size = 48, iconSize = 24, tone = "accent" }: IconBadgeProps) {
  const bg = tone === "accent" ? "var(--accent-soft)" : "var(--bg-sunken)";
  const fg = tone === "accent" ? "var(--accent-deep)" : "var(--fg-secondary)";
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 14,
        background: bg,
        color: fg,
        display: "grid",
        placeItems: "center",
        flexShrink: 0,
      }}
    >
      <Icon name={name} size={iconSize} />
    </div>
  );
}
