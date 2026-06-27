/**
 * Language switcher. Native <select> for accessibility + no stacking-context
 * clipping. Each option shows its language in its own script.
 */
import React from "react";
import { Globe } from "lucide-react";
import { LANGUAGES, useT, LangCode } from "./index";

export default function LanguageSelector({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const { lang, setLang, t } = useT();
  const dark = tone === "dark";
  return (
    <label
      className={`inline-flex items-center gap-1.5 rounded-lg border px-2 py-1.5 ${
        dark ? "border-cream/30 bg-white/10 text-cream" : "border-ink/15 bg-white/70 text-ink"
      } ${className}`}
      title={t("common.language")}
    >
      <Globe className={`h-4 w-4 shrink-0 ${dark ? "text-cream/80" : "text-peacock"}`} />
      <span className="sr-only">{t("common.language")}</span>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as LangCode)}
        className={`cursor-pointer bg-transparent pr-1 text-sm font-semibold focus:outline-none ${dark ? "text-cream" : "text-ink"}`}
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code} className="text-ink">
            {l.label}
          </option>
        ))}
      </select>
    </label>
  );
}
