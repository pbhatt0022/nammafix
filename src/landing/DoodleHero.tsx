/**
 * Hero illustration: a stylized Bengaluru-neighbourhood map with glowing ward pins
 * and civic doodles (pothole, streetlight, leaking pipe, drain, auto, evidence card).
 *
 * SVG placeholder — handcrafted, on-palette, swap-ready. To use a generated raster
 * (e.g. Higgsfield) instead, pass `src`: it renders that image in the same frame and
 * the vector scene is skipped. Call sites never change.
 */
import React from "react";
import {
  PotholeIcon, StreetlightIcon, PipeLeakIcon, DrainIcon, AutoIcon, EvidencePacketIcon,
} from "./DoodleIcons";

export default function DoodleHero({ src, className = "" }: { src?: string; className?: string }) {
  if (src) {
    return (
      <img
        src={src}
        alt="Indian neighbourhood civic map with reported issues and an AI evidence packet"
        className={`w-full rounded-3xl border-2 border-ink/20 object-cover shadow-[8px_8px_0_0_rgba(58,31,27,0.12)] ${className}`}
      />
    );
  }

  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 520 400" className="w-full" role="img" aria-label="Stylized Indian neighbourhood map showing reported civic issues and an AI evidence packet">
        {/* map card */}
        <rect x="14" y="14" width="492" height="372" rx="26" fill="#FFF4C7" stroke="#3A1F1B" strokeWidth="3" />
        <rect x="14" y="14" width="492" height="372" rx="26" fill="none" stroke="#F97316" strokeWidth="1.5" strokeDasharray="2 6" opacity="0.5" />

        {/* roads */}
        <g stroke="#E5E1D8" strokeWidth="18" strokeLinecap="round" fill="none">
          <path d="M40 130 H470" />
          <path d="M150 40 V360" />
          <path d="M40 270 q120 40 430 -20" />
        </g>
        <g stroke="#3A1F1B" strokeWidth="1.4" strokeDasharray="6 10" fill="none" opacity="0.4">
          <path d="M40 130 H470" />
          <path d="M150 40 V360" />
        </g>

        {/* little buildings */}
        <g fill="#00A6A6" fillOpacity="0.18" stroke="#3A1F1B" strokeWidth="2.4" strokeLinejoin="round">
          <rect x="60" y="60" width="46" height="42" rx="5" />
          <rect x="200" y="56" width="40" height="48" rx="5" />
          <rect x="290" y="170" width="50" height="40" rx="5" />
        </g>
        <g fill="#E83E8C" fillOpacity="0.15" stroke="#3A1F1B" strokeWidth="2.4" strokeLinejoin="round">
          <rect x="380" y="300" width="56" height="44" rx="5" />
          <rect x="70" y="300" width="44" height="44" rx="5" />
        </g>

        {/* civic doodles placed on the map */}
        <g transform="translate(86 150) scale(0.9)"><PotholeIcon className="" /></g>
        <g transform="translate(330 60)"><StreetlightIcon className="" /></g>
        <g transform="translate(200 250)"><PipeLeakIcon className="" /></g>
        <g transform="translate(96 250)"><DrainIcon className="" /></g>
        <g transform="translate(360 230)"><AutoIcon className="" /></g>

        {/* glowing ward pins */}
        {[
          { x: 120, y: 120, c: "#F97316" },
          { x: 250, y: 150, c: "#00A6A6" },
          { x: 410, y: 130, c: "#E83E8C" },
          { x: 180, y: 300, c: "#2E7D32" },
        ].map((p, i) => (
          <g key={i} transform={`translate(${p.x} ${p.y})`} className="animate-pin-glow" style={{ animationDelay: `${i * 0.5}s` }}>
            <path d="M0 22 C-8 8 -11 2 -11 -4 a11 11 0 0 1 22 0 c0 6 -3 12 -11 26 Z" fill={p.c} stroke="#3A1F1B" strokeWidth="2.4" />
            <circle cx="0" cy="-4" r="4.5" fill="#FFF8E7" />
          </g>
        ))}

        {/* AI evidence docket card, floating, top-right */}
        <g className="animate-folk-float">
          <rect x="368" y="40" width="118" height="130" rx="10" fill="#FFF8E7" stroke="#3A1F1B" strokeWidth="2.6" />
          <rect x="368" y="40" width="118" height="130" rx="10" fill="none" stroke="#243B73" strokeWidth="1.4" strokeDasharray="3 4" />
          <g transform="translate(388 58) scale(0.55)"><EvidencePacketIcon className="" /></g>
          <text x="412" y="74" fontFamily="Anek Latin, sans-serif" fontWeight="800" fontSize="13" fill="#243B73">NF-102</text>
          <line x1="384" y1="98" x2="470" y2="98" stroke="#243B73" strokeWidth="2" />
          <line x1="384" y1="110" x2="470" y2="110" stroke="#243B73" strokeWidth="2" />
          <line x1="384" y1="122" x2="450" y2="122" stroke="#243B73" strokeWidth="2" />
          <circle cx="456" cy="148" r="13" fill="#2E7D32" />
          <path d="M450 148 l4 4 8 -9" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* corner rangoli flourishes */}
        <path d="M30 360 q24 -10 18 -30 M44 366 q30 -8 26 -34" stroke="#FACC15" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />
        <path d="M490 40 q-24 10 -18 30 M476 34 q-30 8 -26 34" stroke="#00A6A6" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
      </svg>
    </div>
  );
}
