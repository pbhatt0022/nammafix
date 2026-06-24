/**
 * Ward civic-health bento. Cleaner / more dashboard-like than the rest of the page —
 * folk accents kept to header badges and the monsoon mission tile only.
 */
import React from "react";
import { CloudRain } from "lucide-react";

type Metric = { label: string; value: string; sub: string; tone: string };

const METRICS: Metric[] = [
  { label: "Open issues", value: "34", sub: "Ward 89 · live", tone: "#243B73" },
  { label: "Verified reports", value: "21", sub: "by neighbours", tone: "#00A6A6" },
  { label: "Resolved this week", value: "12", sub: "closure proof on file", tone: "#2E7D32" },
  { label: "High-risk issues", value: "5", sub: "needs routing", tone: "#D72638" },
  { label: "Avg. time to verification", value: "6h", sub: "down from 14h", tone: "#F97316" },
];

export default function ImpactPreview({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-3 sm:grid-cols-3 ${className}`}>
      {METRICS.map((m) => (
        <div key={m.label} className="rounded-2xl border border-concrete bg-white p-4">
          <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink/45">{m.label}</div>
          <div className="font-display text-3xl font-extrabold leading-tight" style={{ color: m.tone }}>{m.value}</div>
          <div className="font-body text-[11px] text-ink/55">{m.sub}</div>
        </div>
      ))}

      {/* Monsoon Watch mission — the one tile that keeps the folk warmth */}
      <div className="col-span-2 rounded-2xl border-2 border-dashed border-peacock/50 bg-peacock/10 p-4 sm:col-span-1">
        <div className="mb-1 flex items-center gap-1.5">
          <CloudRain className="h-4 w-4 text-peacock" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-peacock">Monsoon Watch</span>
        </div>
        <div className="font-display text-base font-extrabold text-ink">Active mission</div>
        <div className="font-body text-[11px] text-ink/60">Flag waterlogged drains before the next spell.</div>
      </div>
    </div>
  );
}
