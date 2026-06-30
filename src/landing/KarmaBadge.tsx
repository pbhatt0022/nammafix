/**
 * Civic Karma passbook badge — a scalloped stamp seal with a doodle icon.
 * Renders like a rubber-stamp earned in a contribution passbook, not a social like.
 */

import type { ReactNode } from "react";

type Props = {
  label: string;
  icon: ReactNode;
  tone?: string;
  className?: string;
};

export default function KarmaBadge({ label, icon, tone = "#F97316", className = "" }: Props) {
  return (
    <div className={`flex flex-col items-center gap-2 text-center ${className}`}>
      <div className="relative h-20 w-20">
        {/* scalloped seal */}
        <svg viewBox="0 0 80 80" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path
            d="M40 4 l6 5 7-3 4 6 8 0 1 8 7 4-3 7 5 6-6 5 3 7-7 4-1 8-8 0-4 6-7-3-6 5-6-5-7 3-4-6-8 0-1-8-7-4 3-7-5-6 6-5-3-7 7-4 1-8 8 0 4-6 7 3 Z"
            fill="rgba(255,248,231,0.95)"
            stroke={tone}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="40" cy="40" r="26" fill="none" stroke={tone} strokeWidth="1.4" strokeDasharray="2 3" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-9 w-9" style={{ color: tone }}>{icon}</div>
        </div>
      </div>
      <span className="font-display text-[11px] font-extrabold uppercase leading-tight tracking-wide text-ink">
        {label}
      </span>
    </div>
  );
}
