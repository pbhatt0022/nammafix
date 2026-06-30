/**
 * The complaint→resolution pipeline as a municipal docket conveyor.
 * Each stage is a stamp-labelled slip; arrows connect them. Wraps on mobile.
 */
import { Fragment } from "react";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import {
  EvidencePacketIcon, VerifiedStampIcon, HandsIcon, WardPinIcon, BinIcon, StreetlightIcon,
} from "./DoodleIcons";

const STAGES: { label: string; stamp: string; tone: string; icon: ReactNode }[] = [
  { label: "Photo", stamp: "Submitted", tone: "#243B73", icon: <StreetlightIcon className="h-7 w-7" /> },
  { label: "AI Evidence Packet", stamp: "AI Reviewed", tone: "#243B73", icon: <EvidencePacketIcon className="h-7 w-7" /> },
  { label: "Duplicate Check", stamp: "De-duped", tone: "#00A6A6", icon: <BinIcon className="h-7 w-7" /> },
  { label: "Community Verification", stamp: "Verified", tone: "#2E7D32", icon: <HandsIcon className="h-7 w-7" /> },
  { label: "Resolver Copilot", stamp: "Routed", tone: "#F97316", icon: <WardPinIcon className="h-7 w-7" /> },
  { label: "Closure Proof", stamp: "Closed", tone: "#2E7D32", icon: <VerifiedStampIcon className="h-7 w-7" /> },
  { label: "Impact Dashboard", stamp: "Logged", tone: "#E83E8C", icon: <WardPinIcon className="h-7 w-7" /> },
];

export default function CivicFlow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-stretch justify-center gap-3 ${className}`}>
      {STAGES.map((s, i) => (
        <Fragment key={s.label}>
          <div className="flex w-32 flex-col items-center gap-2 rounded-xl border border-ink/15 bg-white/70 px-3 py-3 text-center shadow-sm">
            <div className="h-8 w-8" style={{ color: s.tone }}>{s.icon}</div>
            <div className="font-display text-[12px] font-extrabold leading-tight text-ink">{s.label}</div>
            <span
              className="-rotate-2 rounded border border-dashed px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wider"
              style={{ borderColor: s.tone, color: s.tone }}
            >
              {s.stamp}
            </span>
          </div>
          {i < STAGES.length - 1 && (
            <ArrowRight className="hidden h-5 w-5 shrink-0 self-center text-ink/35 sm:block" aria-hidden="true" />
          )}
        </Fragment>
      ))}
    </div>
  );
}
