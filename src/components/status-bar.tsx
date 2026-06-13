export function StatusBar() {
  return (
    <div className="flex items-center justify-between px-[30px] h-[54px] text-sm text-[var(--fg-primary)] pointer-events-none">
      <span className="tracking-[0.02em]">9:41</span>
      <div className="flex gap-[6px] items-center">
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
          <rect x="0" y="7" width="3" height="4" rx="1" />
          <rect x="4.5" y="5" width="3" height="6" rx="1" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
          <rect x="13.5" y="0" width="3" height="11" rx="1" />
        </svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor">
          <path d="M8 2.2C10.3 2.2 12.4 3.1 14 4.6l1.2-1.3A10 10 0 0 0 8 .4 10 10 0 0 0 .8 3.3L2 4.6A8.2 8.2 0 0 1 8 2.2Z" />
          <path d="M8 5.6c1.3 0 2.6.5 3.5 1.4l1.2-1.2A6.6 6.6 0 0 0 8 3.9a6.6 6.6 0 0 0-4.7 1.9l1.2 1.2A5 5 0 0 1 8 5.6Z" opacity=".9" />
          <circle cx="8" cy="9.4" r="1.6" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.7" y="0.7" width="21" height="10.6" rx="3" stroke="currentColor" strokeOpacity="0.5" />
          <rect x="2.2" y="2.2" width="16" height="7.6" rx="1.6" fill="currentColor" />
          <rect x="23" y="4" width="1.6" height="4" rx="0.8" fill="currentColor" fillOpacity="0.5" />
        </svg>
      </div>
    </div>
  );
}
