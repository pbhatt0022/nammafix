/**
 * Bharat Civic Folk-Tech doodle icon set — inline SVG, thick ink outlines, warm accents.
 * Drawn as vectors so they stay crisp and on-palette. To swap in generated raster
 * assets later, replace any icon body with <image href={asset} .../> — call sites are unchanged.
 */
import React from "react";

const INK = "#3A1F1B";

type IconProps = { className?: string; title?: string };

// Shared <svg> wrapper: square viewBox, round joins, ink stroke by default.
function Svg({ className, title, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      stroke={INK}
      strokeWidth={3.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
}

export function PotholeIcon(p: IconProps) {
  return (
    <Svg {...p} title={p.title ?? "Pothole"}>
      <path d="M6 40 H58" />
      <path d="M20 40 c2-7 6-10 12-10 s10 3 12 10 c-2 6-7 8-12 8 s-10-2-12-8 Z" fill="#3A1F1B" stroke="none" opacity="0.85" />
      <path d="M26 30 l-3-8 M34 29 l1-9 M40 31 l4-7" stroke="#FACC15" />
    </Svg>
  );
}

export function StreetlightIcon(p: IconProps) {
  return (
    <Svg {...p} title={p.title ?? "Streetlight"}>
      <path d="M24 56 H40 M32 56 V24" />
      <path d="M32 24 q0-8 9-8" />
      <circle cx="44" cy="17" r="6" fill="#FACC15" />
      <path d="M44 26 l-2 6 M51 21 l5 3 M37 21 l-5 3" stroke="#F97316" />
    </Svg>
  );
}

export function PipeLeakIcon(p: IconProps) {
  return (
    <Svg {...p} title={p.title ?? "Leaking pipe"}>
      <path d="M8 22 H40 a8 8 0 0 1 8 8 V46" />
      <path d="M40 30 h12 M28 22 v-6" />
      <path d="M26 30 q-3 5 0 9 q3-4 0-9 Z M34 34 q-3 5 0 9 q3-4 0-9 Z" fill="#00A6A6" stroke="#243B73" strokeWidth="2" />
    </Svg>
  );
}

export function DrainIcon(p: IconProps) {
  return (
    <Svg {...p} title={p.title ?? "Blocked drain"}>
      <rect x="12" y="30" width="40" height="22" rx="3" />
      <path d="M20 30 V52 M28 30 V52 M36 30 V52 M44 30 V52" />
      {/* monsoon cloud above */}
      <path d="M18 20 a6 6 0 0 1 11-3 a7 7 0 0 1 11 4" fill="#E5E1D8" stroke="#243B73" />
      <path d="M24 24 v5 M32 25 v6 M40 24 v5" stroke="#00A6A6" />
    </Svg>
  );
}

export function BinIcon(p: IconProps) {
  return (
    <Svg {...p} title={p.title ?? "Garbage bin"}>
      <path d="M18 22 H46 L43 54 a2 2 0 0 1-2 2 H23 a2 2 0 0 1-2-2 Z" fill="#2E7D32" fillOpacity="0.18" />
      <path d="M14 22 H50 M26 22 v-5 h12 v5" />
      <path d="M28 30 v18 M36 30 v18" />
    </Svg>
  );
}

export function WardPinIcon(p: IconProps) {
  return (
    <Svg {...p} title={p.title ?? "Ward pin"}>
      <path d="M32 56 C20 40 16 32 16 24 a16 16 0 0 1 32 0 c0 8-4 16-16 32 Z" fill="#00A6A6" fillOpacity="0.22" />
      <circle cx="32" cy="24" r="7" fill="#FFF8E7" />
      <path d="M29 24 l2.5 2.5 L37 21" stroke="#2E7D32" />
    </Svg>
  );
}

export function VerifiedStampIcon(p: IconProps) {
  return (
    <Svg {...p} title={p.title ?? "Verified stamp"}>
      <circle cx="32" cy="32" r="22" stroke="#2E7D32" strokeWidth="3" strokeDasharray="3 4" />
      <circle cx="32" cy="32" r="15" stroke="#2E7D32" strokeWidth="2.5" />
      <path d="M25 32 l5 5 L41 26" stroke="#2E7D32" />
    </Svg>
  );
}

export function HandsIcon(p: IconProps) {
  return (
    <Svg {...p} title={p.title ?? "Community hands"}>
      <path d="M20 52 V36 q0-4 4-4 t4 4 v-3 q0-4 4-4 t4 4 q0-4 4-4 t4 4 V46 q0 8-10 8 H28 q-8 0-8-2 Z" fill="#E83E8C" fillOpacity="0.18" />
      <path d="M28 33 v9 M36 30 v12 M44 33 v9" />
    </Svg>
  );
}

export function EvidencePacketIcon(p: IconProps) {
  return (
    <Svg {...p} title={p.title ?? "AI evidence packet"}>
      <rect x="14" y="12" width="36" height="44" rx="3" fill="#FFF8E7" />
      <rect x="14" y="12" width="36" height="44" rx="3" strokeDasharray="3 3" />
      <path d="M22 24 H42 M22 32 H42 M22 40 H36" stroke="#243B73" strokeWidth="2.6" />
      <circle cx="42" cy="46" r="7" fill="#F97316" />
      <path d="M39 46 l2.5 2.5 L46 43" stroke="#fff" strokeWidth="2.4" />
    </Svg>
  );
}

export function AutoIcon(p: IconProps) {
  return (
    <Svg {...p} title={p.title ?? "Auto rickshaw"}>
      <path d="M10 44 h6 q2-16 16-16 q12 0 14 16 h6" fill="#FACC15" fillOpacity="0.4" />
      <path d="M16 44 a4 4 0 1 0 0.1 0 M44 44 a4 4 0 1 0 0.1 0" fill="#3A1F1B" />
      <path d="M24 30 v12 M34 28 v14" />
    </Svg>
  );
}

/** Looping paisley/mehendi curl — used as a section divider flourish. */
export function PaisleyDivider({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 24" className={className} fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M2 12 q14-12 28 0 t28 0 t28 0 t28 0 t28 0 t28 0 t28 0" opacity="0.5" />
      <circle cx="30" cy="12" r="2" fill="#F97316" stroke="none" />
      <circle cx="86" cy="12" r="2" fill="#00A6A6" stroke="none" />
      <circle cx="142" cy="12" r="2" fill="#E83E8C" stroke="none" />
      <circle cx="198" cy="12" r="2" fill="#FACC15" stroke="none" />
    </svg>
  );
}
