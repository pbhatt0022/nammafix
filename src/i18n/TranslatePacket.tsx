/**
 * Live, on-demand Gemini translation of an AI Evidence Packet's content into the
 * currently-selected language. Hidden when the language is English (nothing to do).
 * UI chrome is handled by static strings (useT); this is only for dynamic AI text.
 */
import React, { useState } from "react";
import { Languages, Loader2, AlertCircle } from "lucide-react";
import { useT, LANGUAGES } from "./index";

export default function TranslatePacket({ fields }: { fields: Record<string, string> }) {
  const { lang, t } = useT();
  const [out, setOut] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const meta = LANGUAGES.find((l) => l.code === lang);
  if (lang === "en" || !meta) return null; // nothing to translate into

  const run = async () => {
    if (out) { setOut(null); return; } // toggle off
    setLoading(true);
    setErr("");
    try {
      const r = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields, language: meta.english }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Translation failed.");
      setOut(d.translations);
    } catch (e: any) {
      setErr(e.message || "Translation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border-2 border-dashed border-peacock/40 bg-peacock/5 p-3">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-peacock">
          <Languages className="h-3.5 w-3.5" />
          {meta.label}
        </span>
        <button
          onClick={run}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-lg bg-peacock px-3 py-1 text-[11px] font-bold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Languages className="h-3.5 w-3.5" />}
          {loading ? t("common.translating") : out ? t("common.showOriginal") : `${t("common.translate")} → ${meta.label}`}
        </button>
      </div>

      {err && (
        <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-sindoor">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {err}
        </div>
      )}

      {out && (
        <dl className="mt-3 space-y-2">
          {Object.entries(out).map(([k, v]) => (
            <div key={k}>
              <dt className="font-mono text-[9px] font-bold uppercase tracking-wider text-peacock/70">{k}</dt>
              <dd className="text-[13px] leading-snug text-ink/85">{v}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
