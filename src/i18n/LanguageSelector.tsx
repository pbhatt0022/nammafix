/**
 * Language switcher. Native <select> for accessibility + no stacking-context
 * clipping. Each option shows its language in its own script.
 */
import { Globe } from "lucide-react";
import { LANGUAGES, useT, LangCode } from "./index";

export default function LanguageSelector({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useT();
  return (
    <label
      className={`inline-flex items-center gap-1.5 rounded-lg border border-ink/15 bg-white/70 px-2 py-1.5 text-ink ${className}`}
      title={t("common.language")}
    >
      <Globe className="h-4 w-4 shrink-0 text-peacock" />
      <span className="sr-only">{t("common.language")}</span>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as LangCode)}
        className="cursor-pointer bg-transparent pr-1 text-sm font-semibold focus:outline-none text-ink"
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
