/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Report } from "../types";
import { Eye } from "lucide-react";
import { useT } from "../i18n";

interface CommunityMapViewProps {
  reports: Report[];
  selectedReport: Report | null;
  onSelectReport: (report: Report) => void;
}

// Visual layout mappings to project real coordinates onto a simplified 1000x500 high-fidelity SVG grid
const mapWards = [
  { id: "W-N", name: "Yelahanka Zone (North)", path: "M 150,50 L 850,50 L 750,150 L 250,150 Z", color: "fill-slate-50/50 hover:fill-indigo-50/30" },
  { id: "W-C", name: "Central Bangalore (Indiranagar / Metro Corridor)", path: "M 250,150 L 750,150 L 700,300 L 300,300 Z", color: "fill-slate-100/40 hover:fill-indigo-50/40" },
  { id: "W-S", name: "South Corridor (Koramangala / JP Nagar)", path: "M 300,300 L 700,300 L 600,450 L 400,450 Z", color: "fill-slate-50/50 hover:fill-indigo-50/30" }
];

export default function CommunityMapView({ reports, selectedReport, onSelectReport }: CommunityMapViewProps) {
  const { t } = useT();
  const [hoveredReport, setHoveredReport] = useState<Report | null>(null);

  // Map latitude (12.90 to 13.12) to SVG coordinate Y (450 to 50)
  // Map longitude (77.55 to 77.66) to SVG coordinate X (150 to 850)
  const getCoordinates = (lat: number, lng: number) => {
    const latMin = 12.90;
    const latMax = 13.12;
    const lngMin = 77.55;
    const lngMax = 77.66;

    const y = 450 - ((lat - latMin) / (latMax - latMin)) * 400;
    const x = 150 + ((lng - lngMin) / (lngMax - lngMin)) * 700;

    return { x: isNaN(x) ? 500 : x, y: isNaN(y) ? 250 : y };
  };

  const categoryHexMap = {
    "Road Damage": "#EF4444",
    "Waste": "#F59E0B",
    "Streetlight": "#F97316",
    "Water Leakage": "#3B82F6",
    "Drainage": "#D97706",
    "Public Safety": "#8B5CF6"
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col flex-1 min-h-[690px] relative overflow-hidden">
      {/* Map Control Header */}
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100 shrink-0">
        <div>
          <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-1.5">
            🗺️ {t("map.title")}
          </h2>
          <p className="text-xs text-slate-500">
            {t("map.subtitle")}
          </p>
        </div>
        
        {/* Map Legend */}
        <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 text-[10px] font-mono">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
            <span>{t("map.legend.roads")}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" />
            <span>{t("map.legend.waste")}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
            <span>{t("map.legend.water")}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block" />
            <span>{t("map.legend.safety")}</span>
          </div>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="flex-1 bg-[#F8FAFC] border border-slate-100 rounded-xl relative overflow-hidden flex items-center justify-center">
        {/* Map Overlay HUD Panel */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur border border-slate-200/80 p-3 rounded-lg shadow-sm max-w-[200px] z-10 space-y-1">
          <span className="block text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest">
            {t("map.detector")}
          </span>
          <span className="block text-xs font-bold text-slate-800">
            {t("map.ward")}
          </span>
          <p className="text-[10px] text-slate-500 leading-tight">
            {t("map.hint")}
          </p>
        </div>

        {/* Vector SVG Canvas */}
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full max-h-[500px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base Wards Map Outlines */}
          <g>
            {mapWards.map((ward) => (
              <path
                key={ward.id}
                d={ward.path}
                className={`${ward.color} stroke-slate-300 stroke-[1.5] transition-all duration-300 cursor-pointer`}
              />
            ))}
          </g>

          {/* Grid lines for tech styling */}
          <g className="opacity-10 stroke-slate-400 stroke-[0.5]" strokeDasharray="5,5">
            <line x1="200" y1="0" x2="200" y2="500" />
            <line x1="400" y1="0" x2="400" y2="500" />
            <line x1="600" y1="0" x2="600" y2="500" />
            <line x1="800" y1="0" x2="800" y2="500" />
            <line x1="0" y1="125" x2="1000" y2="125" />
            <line x1="0" y1="250" x2="1000" y2="250" />
            <line x1="0" y1="375" x2="1000" y2="375" />
          </g>

          {/* Dynamic Glowing Hotspot Pins */}
          {reports.map((report) => {
            const { x, y } = getCoordinates(report.latitude, report.longitude);
            const isSelected = selectedReport?.id === report.id;
            const isHovered = hoveredReport?.id === report.id;
            const size = report.severity === "Critical" ? 12 : report.severity === "High" ? 10 : 8;
            const color = categoryHexMap[report.category] || "#3B82F6";

            return (
              <g
                key={report.id}
                className="cursor-pointer"
                onClick={() => onSelectReport(report)}
                onMouseEnter={() => setHoveredReport(report)}
                onMouseLeave={() => setHoveredReport(null)}
              >
                {/* Glowing Outer pulsation wave */}
                <circle
                  cx={x}
                  cy={y}
                  r={size + (isHovered || isSelected ? 12 : 6)}
                  fill={color}
                  className={`opacity-20 transition-all ${
                    report.status !== "Resolved" ? "animate-pulse" : "opacity-10"
                  }`}
                />

                {/* Inner Solid Core Pin */}
                <circle
                  cx={x}
                  cy={y}
                  r={size}
                  fill={color}
                  className="stroke-white stroke-[2]"
                />

                {/* Pin shadow center core */}
                <circle cx={x} cy={y} r="2.5" fill="white" />
              </g>
            );
          })}
        </svg>

        {/* Dynamic Tooltip on Hover */}
        {(hoveredReport || selectedReport) && (
          <div className="absolute bottom-4 right-4 bg-white border border-slate-200 p-4 rounded-xl shadow-lg max-w-xs z-10 space-y-2 animate-fade-in">
            {(() => {
              const r = hoveredReport || selectedReport;
              if (!r) return null;
              return (
                <>
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      {t("map.case")} #{r.id}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                      r.status === "Resolved" ? "bg-emerald-50 text-emerald-700" : "bg-indigo-50 text-indigo-700"
                    }`}>
                      {t("enum.status." + r.status)}
                    </span>
                  </div>
                  <h4 className="text-xs font-extrabold text-slate-800 leading-snug">
                    {r.title}
                  </h4>
                  <div className="flex gap-2 items-center text-[10px] text-slate-400 font-mono">
                    <span>{t("enum.cat." + r.category)}</span>
                    <span>·</span>
                    <span className="text-red-500 font-bold">{t("map.severity")}: {t("enum.sev." + r.severity)}</span>
                  </div>
                  <button
                    onClick={() => onSelectReport(r)}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-[9px] uppercase tracking-wider py-1.5 rounded flex items-center justify-center gap-1.5 mt-2"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    {t("map.load")}
                  </button>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
