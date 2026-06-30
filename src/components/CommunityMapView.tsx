/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Report } from "../types";
import { Eye, Search, Loader2, X, MapPin } from "lucide-react";
import { useT } from "../i18n";

interface CommunityMapViewProps {
  reports: Report[];
  selectedReport: Report | null;
  onSelectReport: (report: Report) => void;
  onStartReport?: (lat: number, lng: number, landmark: string) => void;
}

interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
}

interface ClickPin {
  lat: number;
  lng: number;
  landmark: string;
  loading: boolean;
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

// Saffron crosshair marker for click-to-report
const crosshairIcon = L.divIcon({
  className: "",
  html: `<div style="width:20px;height:20px;border:2.5px solid #F97316;border-radius:50%;background:rgba(249,115,22,0.18);box-shadow:0 0 0 2px white,0 0 8px rgba(249,115,22,0.4);"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

export default function CommunityMapView({ reports, selectedReport, onSelectReport, onStartReport }: CommunityMapViewProps) {
  const { t } = useT();
  const [hoveredReport, setHoveredReport] = useState<Report | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<NominatimResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [clickPin, setClickPin] = useState<ClickPin | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const activeLayerRef = useRef<L.Layer | null>(null);
  const clickMarkerRef = useRef<L.Marker | null>(null);
  const searchDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clickRequestRef = useRef(0);
  const hasAutoFittedRef = useRef(false);

  // Reverse geocode via Nominatim → short readable landmark
  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=en`
      );
      if (res.ok) {
        const data = await res.json();
        const a = data.address || {};
        const parts = [
          a.road,
          a.suburb || a.neighbourhood || a.city_district,
          a.city || a.town || a.village
        ].filter(Boolean);
        return parts.slice(0, 2).join(", ") || data.display_name?.split(",")[0] || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      }
    } catch { /* fall through to coordinate fallback */ }
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  };

  const placeClickPin = async (lat: number, lng: number) => {
    const map = mapRef.current;
    if (!map) return;
    const requestId = ++clickRequestRef.current;
    if (clickMarkerRef.current) map.removeLayer(clickMarkerRef.current);
    clickMarkerRef.current = L.marker([lat, lng], { icon: crosshairIcon }).addTo(map);
    setClickPin({ lat, lng, landmark: "", loading: true });
    const landmark = await reverseGeocode(lat, lng);
    if (requestId !== clickRequestRef.current) return;
    setClickPin({ lat, lng, landmark, loading: false });
  };

  const clearClickPin = () => {
    clickRequestRef.current += 1;
    if (clickMarkerRef.current && mapRef.current) mapRef.current.removeLayer(clickMarkerRef.current);
    clickMarkerRef.current = null;
    setClickPin(null);
  };

  // Forward geocode via Nominatim (debounced 500ms, India only)
  const searchPlaces = (query: string) => {
    if (!query.trim()) { setSearchResults([]); return; }
    if (searchDebounce.current) clearTimeout(searchDebounce.current);
    searchDebounce.current = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&countrycodes=in&accept-language=en`
        );
        if (res.ok) setSearchResults(await res.json());
      } catch { /* silently ignore network errors */ }
      finally { setSearchLoading(false); }
    }, 500);
  };

  const flyToResult = (result: NominatimResult) => {
    const map = mapRef.current;
    if (!map) return;
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    map.flyTo([lat, lng], 15, { animate: true, duration: 0.8 });
    placeClickPin(lat, lng);
    setSearchQuery(result.display_name.split(",")[0]);
    setSearchResults([]);
  };

  // Init the Leaflet map once (real OpenStreetMap tiles, no API key).
  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;
    const map = L.map(containerRef.current, { zoomControl: false }).setView([12.97, 77.62], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 19
    }).addTo(map);
    L.control.zoom({ position: "topright" }).addTo(map);

    // Map background click → place saffron crosshair + reverse geocode
    map.on("click", (e: L.LeafletMouseEvent) => {
      placeClickPin(e.latlng.lat, e.latlng.lng);
    });

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
      activeLayerRef.current = null;
      clickMarkerRef.current = null;
    };
  }, []);

  // Rebuild the pins whenever reports or selection change.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (activeLayerRef.current) { map.removeLayer(activeLayerRef.current); activeLayerRef.current = null; }
    if (!reports.length) return;

    const points = reports.map((r) => [r.latitude, r.longitude] as L.LatLngTuple);
    const pins = L.layerGroup();
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
      marker.on("click", (e: L.LeafletMouseEvent) => {
        L.DomEvent.stopPropagation(e); // prevent map click from also firing
        onSelectReport(report);
        clearClickPin();
      });
      marker.on("mouseover", () => {
        setHoveredReport(report);
        marker.setStyle({ weight: 3, color: "#243B73" });
      });
      marker.on("mouseout", () => {
        setHoveredReport(null);
        if (!selected) marker.setStyle({ weight: 2, color: "#ffffff" });
      });
      marker.addTo(pins);
    });
    pins.addTo(map);
    activeLayerRef.current = pins;

    // Auto-fit only once on first load. After the user starts searching or
    // click-pinning locations, preserve their chosen viewport.
    if (!hasAutoFittedRef.current && !searchQuery && !clickPin) {
      map.fitBounds(L.latLngBounds(points).pad(0.25), { animate: false, maxZoom: 14 });
      hasAutoFittedRef.current = true;
    }
  }, [reports, selectedReport, onSelectReport, searchQuery, clickPin]);

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

        {/* Floating Search Bar (Google Maps style) */}
        <div className="absolute top-3 left-3 z-[1200] w-[260px]">
          <div className="flex items-center bg-white border border-slate-200 rounded-xl shadow-md px-3 gap-2 h-10">
            {searchLoading
              ? <Loader2 className="w-3.5 h-3.5 text-slate-400 shrink-0 animate-spin" />
              : <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            }
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); searchPlaces(e.target.value); }}
              placeholder="Search a place…"
              className="flex-1 text-[12px] bg-transparent outline-none text-slate-800 placeholder-slate-400"
            />
            {searchQuery && (
              <button onClick={() => { setSearchQuery(""); setSearchResults([]); }} className="text-slate-300 hover:text-slate-500">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Nominatim results dropdown */}
          {searchResults.length > 0 && (
            <div className="mt-1 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
              {searchResults.map((r, i) => (
                <button
                  key={i}
                  onClick={() => flyToResult(r)}
                  className="w-full text-left px-3 py-2.5 flex items-start gap-2 hover:bg-slate-50 border-b border-slate-100 last:border-0"
                >
                  <MapPin className="w-3 h-3 text-saffron shrink-0 mt-0.5" />
                  <span className="text-[11px] text-slate-700 leading-snug">{r.display_name.split(",").slice(0, 3).join(", ")}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Ward HUD — hidden while search or click-pin are active */}
        {!searchQuery && !clickPin && (
          <div className="absolute top-[60px] left-3 bg-white/95 backdrop-blur border border-slate-200/80 p-3 rounded-lg shadow-sm max-w-[200px] z-[1100] space-y-1 pointer-events-none">
            <span className="block text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest">{t("map.detector")}</span>
            <span className="block text-xs font-bold text-slate-800">{t("map.ward")}</span>
            <p className="text-[10px] text-slate-500 leading-tight">{t("map.hint")}</p>
          </div>
        )}

        {/* Click-to-report tooltip (saffron) OR case tooltip — mutually exclusive */}
        {clickPin ? (
          <div className="absolute bottom-4 left-4 bg-white border border-saffron/30 p-4 rounded-xl shadow-lg max-w-[240px] z-[1100] space-y-2 animate-fade-in">
            <button onClick={clearClickPin} className="absolute top-2 right-2 text-slate-300 hover:text-slate-500">
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-saffron shrink-0" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Report from here</span>
            </div>
            {clickPin.loading ? (
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <Loader2 className="w-3 h-3 animate-spin text-saffron" />
                <span>Getting address…</span>
              </div>
            ) : (
              <p className="text-xs font-extrabold text-slate-800 leading-snug pr-4">{clickPin.landmark}</p>
            )}
            <p className="text-[9px] font-mono text-slate-400">{clickPin.lat.toFixed(5)}, {clickPin.lng.toFixed(5)}</p>
            {onStartReport && !clickPin.loading && (
              <button
                onClick={() => onStartReport(clickPin.lat, clickPin.lng, clickPin.landmark)}
                className="w-full bg-saffron hover:bg-orange-500 text-white font-black text-[9px] uppercase tracking-wider py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                Start Report Here →
              </button>
            )}
          </div>
        ) : tip ? (
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
        ) : null}
      </div>
    </div>
  );
}
