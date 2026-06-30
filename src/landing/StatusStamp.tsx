/**
 * Rubber-stamp status label — tilted, dashed ring, ink-on-cream. Used for docket
 * pipeline states and the "AI Docket Ready" closer.
 */

const TONES = {
  green: { ring: "#2E7D32", text: "#2E7D32" },
  saffron: { ring: "#F97316", text: "#C2410C" },
  indigo: { ring: "#243B73", text: "#243B73" },
  red: { ring: "#D72638", text: "#D72638" },
  teal: { ring: "#00A6A6", text: "#0E7490" },
} as const;

type Props = {
  label: string;
  tone?: keyof typeof TONES;
  className?: string;
  /** Play the stamp-down reveal animation. */
  animate?: boolean;
};

export default function StatusStamp({ label, tone = "green", className = "", animate = false }: Props) {
  const c = TONES[tone];
  return (
    <span
      className={`inline-flex select-none items-center justify-center rounded-md border-2 border-dashed px-3 py-1 font-display text-xs font-extrabold uppercase tracking-wider ${
        animate ? "animate-stamp" : "-rotate-3"
      } ${className}`}
      style={{ borderColor: c.ring, color: c.text, background: "rgba(255,248,231,0.7)" }}
    >
      {label}
    </span>
  );
}
