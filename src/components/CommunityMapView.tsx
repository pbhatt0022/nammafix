/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { Report } from "../types";
import { Eye, MapPin, Flame } from "lucide-react";
import { useT } from "../i18n";

interface CommunityMapViewProps {
  reports: Report[];
  selectedReport: Report | null;
  onSelectReport: (report: Report) => void;
}

const categoryHexMap: Record<string, string> = {
  "Road Damage": "#EF4444",
  "Waste": "#F59E0B",
  "Streetlight": "#F97316",
  "Water Leakage": "#3B82F6",
  "Drainage": "#D97706",
  "Public Safety": "#8B5CF6"
};

const radiusFor = (severity: string) => (severity === "Critical" ? 11 : severity === "High" ? 9 : 7);

type Mode = "pins" | "heat";

export default function CommunityMapView({ reports, selectedReport, onSelectReport }: CommunityMapViewProps) {
  const { t } = useT();
  const [hoveredReport, setHoveredReport] = useState<Report | null>(null);
  const [mode, setMode] = useState<Mode>("pins");

  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const activeLayerRef = useRef<L.Layer | null>(null);

  // Init the Leaflet map once (real OpenStreetMap tiles, no API key).
  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;
    const map = L.map(containerRef.current, { zoomControl: false }).setView([12.97, 77.62], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 19
    }).addTo(map);
    L.control.zoom({ position: "topright" }).addTo(map);
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; activeLayerRef.current = null; };
  }, []);

  // (Re)build the active layer whenever reports / selection / mode change.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (activeLayerRef.current) { map.removeLayer(activeLayerRef.current); activeLayerRef.current = null; }
    if (!reports.length) return;

    const points = reports.map((r) => [r.latitude, r.longitude] as L.LatLngTuple);

    if (mode === "heat") {
      // Intensity weighted by priority so genuine hotspots burn brightest.
      const heatPoints = reports.map((r) => [r.latitude, r.longitude, Math.max(0.3, (r.priorityScore || r.severityScore || 50) / 100)] as [number, number, number]);
      const heat = (L as any).heatLayer(heatPoints, {
        radius: 38, blur: 24, maxZoom: 14, minOpacity: 0.35,
        gradient: { 0.2: "#00A6A6", 0.5: "#FACC15", 0.8: "#F97316", 1.0: "#D72638" }
      });
      heat.addTo(map);
      activeLayerRef.current = heat;
    } else {
      // Cluster pins so dense corridors collapse into a count when zoomed out.
      const cluster = (L as any).markerClusterGroup({ maxClusterRadius: 48, showCoverageOnHover: false });
      reports.forEach((report) => {
        const color = categoryHexMap[report.category] || "#3B82F6";
        const selected = selectedReport?.id === report.id;
        const marker = L.circleMarker([report.latitude, report.longitude], {
          radius: radiusFor(report.severity) + (selected ? 4 : 0),
          color: selected ? "#243B73" : "#ffffff",
          weight: selected ? 3 : 2,
          fillColor: color,
          fillOpacity: report.status === "Resolved" ? 0.5 : 0.9
        });
        marker.on("click", () => onSelectReport(report));
        marker.on("mouseover", () => { setHoveredReport(report); marker.setStyle({ weight: 3, color: "#243B73" }); });
        marker.on("mouseout", () => { setHoveredReport(null); if (!selected) marker.setStyle({ weight: 2, color: "#ffffff" }); });
        cluster.addLayer(marker);
      });
      cluster.addTo(map);
      activeLayerRef.current = cluster;
    }

    map.fitBounds(L.latLngBounds(points).pad(0.25), { animate: false, maxZoom: 14 });
  }, [reports, selectedReport, onSelectReport, mode]);

  const tip = hoveredReport || selectedReport;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col flex-1 min-h-[690px] relative overflow-hidden">
      {/* Map Control Header */}
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100 shrink-0">
        <div>
          <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-1.5">
            🗺️ {t("map.title")}
          </h2>
          <p className="text-xs text-slate-500">{t("map.subtitle")}</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Pins / Heatmap toggle */}
          <div className="flex rounded-lg border border-slate-200 overflow-hidden text-[10px] font-black uppercase tracking-wider">
            <button
              onClick={() => setMode("pins")}
              className={`flex items-center gap-1 px-2.5 py-1.5 transition-colors ${mode === "pins" ? "bg-indigo-600 text-white" : "bg-white text-slate-500 hover:bg-slate-50"}`}
            >
              <MapPin className="w-3 h-3" /> {t("map.mode.pins")}
            </button>
            <button
              onClick={() => setMode("heat")}
              className={`flex items-center gap-1 px-2.5 py-1.5 transition-colors ${mode === "heat" ? "bg-orange-500 text-white" : "bg-white text-slate-500 hover:bg-slate-50"}`}
            >
              <Flame className="w-3 h-3" /> {t("map.mode.heat")}
            </button>
          </div>

          {/* Map Legend */}
          <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 text-[10px] font-mono">
            <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /><span>{t("map.legend.roads")}</span></div>
            <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" /><span>{t("map.legend.waste")}</span></div>
            <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /><span>{t("map.legend.water")}</span></div>
            <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block" /><span>{t("map.legend.safety")}</span></div>
          </div>
        </div>
      </div>

      {/* Main Map Container — Leaflet renders into containerRef */}
      <div className="flex-1 border border-slate-100 rounded-xl relative overflow-hidden">
        <div ref={containerRef} className="absolute inset-0 z-0" />

        {/* Map Overlay HUD Panel (above Leaflet panes) */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur border border-slate-200/80 p-3 rounded-lg shadow-sm max-w-[200px] z-[1100] space-y-1 pointer-events-none">
          <span className="block text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest">{t("map.detector")}</span>
          <span className="block text-xs font-bold text-slate-800">{t("map.ward")}</span>
          <p className="text-[10px] text-slate-500 leading-tight">{t("map.hint")}</p>
        </div>

        {/* Dynamic Tooltip on Hover / selection (pins mode) */}
        {tip && mode === "pins" && (
          <div className="absolute bottom-4 left-4 bg-white border border-slate-200 p-4 rounded-xl shadow-lg max-w-xs z-[1100] space-y-2 animate-fade-in">
            <div className="flex justify-between items-start gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">{t("map.case")} #{tip.id}</span>
              <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                tip.status === "Resolved" ? "bg-emerald-50 text-emerald-700" : "bg-indigo-50 text-indigo-700"
              }`}>
                {t("enum.status." + tip.status)}
              </span>
            </div>
            <h4 className="text-xs font-extrabold text-slate-800 leading-snug">{tip.title}</h4>
            <div className="flex gap-2 items-center text-[10px] text-slate-400 font-mono">
              <span>{t("enum.cat." + tip.category)}</span>
              <span>·</span>
              <span className="text-red-500 font-bold">{t("map.severity")}: {t("enum.sev." + tip.severity)}</span>
            </div>
            <button
              onClick={() => onSelectReport(tip)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-[9px] uppercase tracking-wider py-1.5 rounded flex items-center justify-center gap-1.5 mt-2"
            >
              <Eye className="w-3.5 h-3.5" />
              {t("map.load")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
