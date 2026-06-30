/**
 * Low-contrast seamless folk-doodle backdrop. Accent layer only — kept faint
 * (default opacity 0.06) so it never sits behind body text at full strength.
 * Tiles via an SVG <pattern>, so it's resolution-independent and one element.
 */

type Props = {
  className?: string;
  /** 0–1. Keep low behind text-heavy sections. */
  opacity?: number;
  /** Ink line color for the doodles. */
  color?: string;
};

export default function FolkPatternBackground({
  className = "",
  opacity = 0.06,
  color = "#3A1F1B",
}: Props) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <svg className="h-full w-full" style={{ opacity }}>
        <defs>
          <pattern id="folk-civic" width="120" height="120" patternUnits="userSpaceOnUse" patternTransform="rotate(2)">
            <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
              {/* ward pin */}
              <path d="M20 34 C14 26 12 22 12 18 a8 8 0 0 1 16 0 c0 4-2 8-8 16 Z" />
              <circle cx="20" cy="18" r="3" />
              {/* dotted rangoli curve */}
              <path d="M52 20 q12-14 24 0 t24 0" strokeDasharray="1 5" />
              {/* streetlight */}
              <path d="M44 70 v-18 q0-5 6-5" />
              <circle cx="52" cy="47" r="4" />
              {/* paisley curl */}
              <path d="M86 64 q10-2 8-12 q-2-8-10-4 q-5 3 0 8 q4 3 2 8 Z" />
              {/* pipe + drips */}
              <path d="M8 92 h22 a4 4 0 0 1 4 4 v8" />
              <path d="M16 98 q-2 3 0 5 M24 100 q-2 3 0 5" />
              {/* stamp ring */}
              <circle cx="92" cy="100" r="11" strokeDasharray="2 4" />
              {/* small auto */}
              <path d="M58 104 q2-8 9-8 q7 0 8 8" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#folk-civic)" />
      </svg>
    </div>
  );
}
