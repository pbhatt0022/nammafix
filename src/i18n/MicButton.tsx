/**
 * Voice-to-text button using the browser-native Web Speech API. Free, no key, no
 * server, no Gemini quota. Recognition language follows the selected UI language
 * (so a citizen can dictate in Kannada/Hindi/etc.). Hidden when unsupported.
 */
import { useEffect, useRef, useState } from "react";
import { Mic } from "lucide-react";
import { useT, LangCode } from "./index";

// UI language -> BCP-47 speech locale (India variants).
const SPEECH_LOCALE: Record<LangCode, string> = {
  en: "en-IN", hi: "hi-IN", kn: "kn-IN", ta: "ta-IN", te: "te-IN", bn: "bn-IN", mr: "mr-IN",
};

// Vendor-prefixed in most browsers; undefined where unsupported (e.g. Firefox).
const SpeechRecognition: any =
  typeof window !== "undefined" ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition : undefined;

const speechSupported = !!SpeechRecognition;

export default function MicButton({
  onTranscript,
  className = "",
}: {
  onTranscript: (text: string) => void;
  className?: string;
}) {
  const { lang } = useT();
  const [listening, setListening] = useState(false);
  const recRef = useRef<any>(null);

  // Stop recognition if the component unmounts mid-listen.
  useEffect(() => () => { try { recRef.current?.stop(); } catch {} }, []);

  if (!speechSupported) return null;

  const toggle = () => {
    if (listening) {
      try { recRef.current?.stop(); } catch {}
      setListening(false);
      return;
    }
    const rec = new SpeechRecognition();
    rec.lang = SPEECH_LOCALE[lang] || "en-IN";
    rec.interimResults = false;
    rec.continuous = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e: any) => {
      const text = Array.from(e.results).map((r: any) => r[0].transcript).join(" ").trim();
      if (text) onTranscript(text);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recRef.current = rec;
    try { rec.start(); setListening(true); } catch { setListening(false); }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      title={listening ? "Stop dictation" : "Dictate by voice"}
      aria-pressed={listening}
      className={`inline-flex h-7 w-7 items-center justify-center rounded-lg border transition-colors ${
        listening
          ? "border-sindoor bg-sindoor/10 text-sindoor"
          : "border-ink/15 bg-white text-peacock hover:border-peacock/50"
      } ${className}`}
    >
      <Mic className={`h-4 w-4 ${listening ? "animate-pulse" : ""}`} />
    </button>
  );
}
