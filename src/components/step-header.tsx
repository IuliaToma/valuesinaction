"use client";

import { useRouter } from "next/navigation";
import { Icon } from "./icons";

interface StepHeaderProps {
  onBack?: () => void;
  step?: number;
  total?: number;
  onClose?: () => void;
  backHref?: string;
  closeHref?: string;
}

export function StepHeader({ onBack, step, total, onClose, backHref, closeHref }: StepHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) onBack();
    else if (backHref) router.push(backHref);
    else router.back();
  };

  const handleClose = () => {
    if (onClose) onClose();
    else if (closeHref) router.push(closeHref);
    else router.push("/home");
  };

  return (
    <div className="flex items-center gap-[14px] mb-[22px]">
      {(onBack !== undefined || backHref !== undefined) && (
        <button
          onClick={handleBack}
          aria-label="Back"
          className="w-[42px] h-[42px] rounded-full grid place-items-center border border-[var(--border-soft)] shrink-0 active:scale-95 transition-transform"
          style={{ background: "var(--bg-surface)", color: "var(--fg-primary)" }}
        >
          <Icon name="arrowL" size={20} />
        </button>
      )}
      {typeof step === "number" && typeof total === "number" && (
        <div className="flex-1 h-[6px] rounded-full overflow-hidden" style={{ background: "var(--bg-sunken)" }}>
          <span
            className="block h-full rounded-full transition-all duration-500"
            style={{ width: `${(step / total) * 100}%`, background: "var(--accent)" }}
          />
        </div>
      )}
      {(onClose !== undefined || closeHref !== undefined) && (
        <button
          onClick={handleClose}
          aria-label="Close"
          className="w-[42px] h-[42px] rounded-full grid place-items-center border border-[var(--border-soft)] shrink-0 ml-auto active:scale-95 transition-transform"
          style={{ background: "var(--bg-surface)", color: "var(--fg-secondary)" }}
        >
          <Icon name="close" size={19} />
        </button>
      )}
    </div>
  );
}
