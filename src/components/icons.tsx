import React from "react";

const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const PATHS: Record<string, React.ReactNode> = {
  home: <path {...P} d="M3 10.5 12 3l9 7.5M5 9.5V20h14V9.5M9.5 20v-5h5v5" />,
  compass: <g {...P}><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></g>,
  calendar: <g {...P}><rect x="3.5" y="5" width="17" height="15" rx="2.5" /><path d="M3.5 9.5h17M8 3v4M16 3v4" /></g>,
  chart: <g {...P}><path d="M4 4v16h16" /><path d="M8 15v2M12 11v6M16 7v10" /></g>,
  plus: <path {...P} d="M12 5v14M5 12h14" />,
  check: <path {...P} d="m5 12.5 4.5 4.5L19 6.5" />,
  arrowR: <path {...P} d="M5 12h14M13 6l6 6-6 6" />,
  arrowL: <path {...P} d="M19 12H5M11 6l-6 6 6 6" />,
  close: <path {...P} d="M6 6l12 12M18 6 6 18" />,
  heart: <path {...P} d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.4-7 10-7 10Z" />,
  spark: <path {...P} d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />,
  clock: <g {...P}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></g>,
  leaf: <path {...P} d="M5 19c0-8 6-13 14-14 0 9-5 15-14 14Zm0 0c2-4 4.5-6.5 8-8" />,
  bolt: <path {...P} d="M13 3 5 13h6l-1 8 8-10h-6z" />,
  book: <path {...P} d="M4 5.5C4 4.7 4.7 4 5.5 4H11v15H5.5C4.7 19 4 18.3 4 17.5zM20 5.5C20 4.7 19.3 4 18.5 4H13v15h5.5c.8 0 1.5-.7 1.5-1.5z" />,
  download: <path {...P} d="M12 4v10m0 0 4-4m-4 4-4-4M5 19h14" />,
  google: (
    <g>
      <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.3-.2-1.9H12v3.7h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.9-.9 6.6-2.4l-3.2-2.5c-.9.6-2 .9-3.4.9-2.6 0-4.8-1.7-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z" />
      <path fill="#FBBC05" d="M6.4 13.9a6 6 0 0 1 0-3.8V7.5H3.1a10 10 0 0 0 0 9z" />
      <path fill="#EA4335" d="M12 6.1c1.5 0 2.8.5 3.8 1.5l2.8-2.8A10 10 0 0 0 3.1 7.5l3.3 2.6C7.2 7.8 9.4 6.1 12 6.1z" />
    </g>
  ),
  apple: <path fill="currentColor" d="M16 13c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-3 .9-3.7 2.3-1.6 2.8-.4 6.9 1.1 9.2.8 1.1 1.6 2.3 2.8 2.3 1.1 0 1.5-.7 2.9-.7s1.7.7 2.9.7 2-1 2.7-2.1c.9-1.2 1.2-2.4 1.2-2.5 0 0-2.4-.9-2-3.7zM14 6.3c.6-.8 1-1.8.9-2.8-.9 0-2 .6-2.6 1.3-.6.7-1.1 1.7-1 2.7 1 .1 2-.5 2.7-1.2z" />,
  shield: <g {...P}><path d="M12 3 5 6v5c0 4.2 2.9 8 7 9 4.1-1 7-4.8 7-9V6z" /><path d="m9 12 2 2 4-4" /></g>,
  phone: <path {...P} d="M7 3h3l1.5 5-2 1.5a12 12 0 0 0 5 5l1.5-2 5 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 5 5.2 2 2 0 0 1 7 3z" />,
  edit: <path {...P} d="M4 20h4L18.5 9.5a2 2 0 0 0-3-3L5 17z" />,
  bell: <path {...P} d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6M10 20a2 2 0 0 0 4 0" />,
};

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
}

export function Icon({ name, size = 22, className, style, color }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      style={{ color, display: "block", flexShrink: 0, ...style }}
    >
      {PATHS[name] || null}
    </svg>
  );
}
