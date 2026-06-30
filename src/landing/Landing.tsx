/**
 * NammaFix AI landing page — "Bharat Civic Folk-Tech" aesthetic.
 * Scroll page that fronts the existing dashboard app. CTAs call onEnter to deep-link
 * into the app (report flow or community map). No app logic lives here.
 */
import { motion } from "motion/react";
import type { ReactNode } from "react";
import {
  ArrowRight, MapPin, Camera, Copy, Layers, ShieldCheck, Sparkles, Eye, Plus, RefreshCw,
} from "lucide-react";
import FolkPatternBackground from "./FolkPatternBackground";
import DoodleHero from "./DoodleHero";
import EvidencePacketPreview from "./EvidencePacketPreview";
import CivicFlow from "./CivicFlow";
import KarmaBadge from "./KarmaBadge";
import StatusStamp from "./StatusStamp";
import ImpactPreview from "./ImpactPreview";
import { PaisleyDivider, PotholeIcon, StreetlightIcon, PipeLeakIcon, HandsIcon, EvidencePacketIcon, VerifiedStampIcon, WardPinIcon } from "./DoodleIcons";
import { heroImage } from "./assets";
import { useT } from "../i18n";
import LanguageSelector from "../i18n/LanguageSelector";

type Intent = "report" | "map";

// Reusable entrance animation — light, once, respects reduced-motion via CSS fallback.
const rise = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
};

export default function Landing({ onEnter }: { onEnter: (intent: Intent) => void }) {
  const { t } = useT();
  return (
    <div className="min-h-screen bg-cream font-body text-ink">
      {/* ---- top bar ---- */}
      <header className="sticky top-0 z-30 border-b-2 border-ink/10 bg-cream/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigoc font-display text-sm font-extrabold text-marigold shadow-sm">NF</div>
            <div className="leading-none">
              <div className="font-display text-lg font-extrabold tracking-tight text-indigoc">
                NammaFix <span className="text-saffron">AI</span>
              </div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-ink/45">Civic Resolution Layer</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <button
              onClick={() => onEnter("report")}
              className="rounded-xl bg-saffron px-4 py-2 font-display text-sm font-bold text-white shadow-[3px_3px_0_0_rgba(58,31,27,0.25)] transition-transform hover:-translate-y-0.5"
            >
              {t("nav.openApp")}
            </button>
          </div>
        </div>
      </header>

      {/* ================= 1. HERO ================= */}
      <section className="relative overflow-hidden">
        <FolkPatternBackground opacity={0.05} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 lg:grid-cols-2 lg:py-20">
          <motion.div {...rise}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-dashed border-peacock/50 bg-peacock/10 px-3 py-1">
              <MapPin className="h-3.5 w-3.5 text-peacock" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-peacock">{t("hero.badge")}</span>
            </div>
            <h1 className="font-honk text-6xl leading-none text-indigoc sm:text-7xl" style={{ fontWeight: 400 }}>
              NammaFix AI
            </h1>
            <p className="mt-4 font-display text-2xl font-extrabold leading-tight text-ink sm:text-3xl text-balance">
              {t("hero.tagline")}
            </p>
            <p className="mt-4 max-w-md font-body text-base leading-relaxed text-ink/70 text-pretty">
              {t("hero.supporting")}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={() => onEnter("report")}
                className="group inline-flex items-center gap-2 rounded-xl bg-saffron px-6 py-3 font-display text-base font-bold text-white shadow-[4px_4px_0_0_rgba(58,31,27,0.3)] transition-transform hover:-translate-y-0.5"
              >
                {t("hero.cta.report")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => onEnter("map")}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-indigoc bg-cream px-6 py-3 font-display text-base font-bold text-indigoc transition-transform hover:-translate-y-0.5"
              >
                <Eye className="h-4 w-4" />
                {t("hero.cta.pulse")}
              </button>
            </div>
          </motion.div>

          <motion.div {...rise} transition={{ ...rise.transition, delay: 0.1 }} className="relative">
            <DoodleHero src={heroImage} />
            {/* floating chips around the hero */}
            <FloatingChip className="-left-2 top-6" label={t("chip.evidence")} tone="#243B73" delay={0} />
            <FloatingChip className="right-0 top-0" label={t("chip.verified")} tone="#2E7D32" delay={0.4} />
            <FloatingChip className="-left-3 bottom-16" label={t("chip.copilot")} tone="#F97316" delay={0.8} />
            <FloatingChip className="bottom-2 right-4" label={t("chip.closure")} tone="#00A6A6" delay={1.2} />
            <FloatingChip className="bottom-24 -right-3" label={t("chip.karma")} tone="#E83E8C" delay={1.6} />
          </motion.div>
        </div>
        <PaisleyDivider className="mx-auto h-5 w-full max-w-3xl px-5 pb-4" />
      </section>

      {/* ================= 2. PROBLEM ================= */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeading kicker={t("problem.kicker")} title={t("problem.title")} />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          <PainCard icon={<Layers className="h-7 w-7" />} tone="#F97316" title={t("problem.fragmented.title")} body={t("problem.fragmented.body")} />
          <PainCard icon={<Copy className="h-7 w-7" />} tone="#E83E8C" title={t("problem.duplicate.title")} body={t("problem.duplicate.body")} />
          <PainCard icon={<ShieldCheck className="h-7 w-7" />} tone="#D72638" title={t("problem.proof.title")} body={t("problem.proof.body")} />
        </div>
      </section>

      {/* ================= 3. SOLUTION FLOW ================= */}
      <section className="relative overflow-hidden bg-turmeric/60 py-16">
        <FolkPatternBackground opacity={0.04} />
        <div className="relative mx-auto max-w-6xl px-5">
          <SectionHeading kicker={t("flow.kicker")} title={t("flow.title")} center />
          <motion.div {...rise} className="mt-10">
            <CivicFlow />
          </motion.div>
        </div>
      </section>

      {/* ================= 4. EVIDENCE PACKET SHOWCASE ================= */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div {...rise}>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border-2 border-dashed border-lotus/50 bg-lotus/10 px-3 py-1">
              <Sparkles className="h-3.5 w-3.5 text-lotus" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-lotus">{t("evidence.kicker")}</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold leading-tight text-indigoc sm:text-4xl text-balance">
              {t("evidence.title")}
            </h2>
            <p className="mt-4 max-w-md font-body text-base leading-relaxed text-ink/70 text-pretty">
              {t("evidence.body")}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <StatusStamp label="Submitted" tone="indigo" />
              <StatusStamp label="AI Reviewed" tone="saffron" />
              <StatusStamp label="Verified" tone="green" />
            </div>
          </motion.div>
          <motion.div {...rise} transition={{ ...rise.transition, delay: 0.1 }}>
            <EvidencePacketPreview />
          </motion.div>
        </div>
      </section>

      {/* ================= 5. COMMUNITY VERIFICATION ================= */}
      <section className="relative overflow-hidden bg-indigoc py-16 text-cream">
        <FolkPatternBackground opacity={0.06} color="#FFF8E7" />
        <div className="relative mx-auto max-w-6xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border-2 border-dashed border-marigold/50 px-3 py-1">
              <HandsIcon className="h-4 w-4" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-marigold">{t("community.kicker")}</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl text-balance">
              {t("community.title")}
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { label: t("community.slip.saw"), tone: "#00A6A6", icon: <Eye className="h-5 w-5" /> },
              { label: t("community.slip.evidence"), tone: "#FACC15", icon: <Plus className="h-5 w-5" /> },
              { label: t("community.slip.active"), tone: "#F97316", icon: <RefreshCw className="h-5 w-5" /> },
              { label: t("community.slip.fixed"), tone: "#2E7D32", icon: <VerifiedStampIcon className="h-5 w-5" /> },
              { label: t("community.slip.recheck"), tone: "#E83E8C", icon: <Camera className="h-5 w-5" /> },
            ].map((w) => (
              <div key={w.label} className="rounded-xl border-2 border-dashed border-cream/30 bg-cream/5 p-4 text-center">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: w.tone, color: "#3A1F1B" }}>
                  {w.icon}
                </div>
                <div className="font-display text-sm font-extrabold">{w.label}</div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-wider text-cream/50">{t("community.slip.label")}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 6. CIVIC KARMA ================= */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeading kicker={t("karma.kicker")} title={t("karma.title")} center />
        <motion.div {...rise} className="mt-10 rounded-3xl border-2 border-dashed border-ink/25 bg-turmeric/50 p-8">
          <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 lg:grid-cols-7">
            <KarmaBadge label="First Fix Reporter" tone="#F97316" icon={<PotholeIcon className="h-full w-full" />} />
            <KarmaBadge label="Evidence Builder" tone="#243B73" icon={<EvidencePacketIcon className="h-full w-full" />} />
            <KarmaBadge label="Pothole Patrol" tone="#3A1F1B" icon={<PotholeIcon className="h-full w-full" />} />
            <KarmaBadge label="Light Guardian" tone="#FACC15" icon={<StreetlightIcon className="h-full w-full" />} />
            <KarmaBadge label="Water Watcher" tone="#00A6A6" icon={<PipeLeakIcon className="h-full w-full" />} />
            <KarmaBadge label="Resolution Verifier" tone="#2E7D32" icon={<VerifiedStampIcon className="h-full w-full" />} />
            <KarmaBadge label="Ward Champion" tone="#E83E8C" icon={<WardPinIcon className="h-full w-full" />} />
          </div>
        </motion.div>
      </section>

      {/* ================= 7. IMPACT DASHBOARD ================= */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeading kicker={t("impact.kicker")} title={t("impact.title")} />
        <motion.div {...rise} className="mt-10">
          <ImpactPreview />
        </motion.div>
      </section>

      {/* ================= 8. FINAL CTA ================= */}
      <section className="relative overflow-hidden bg-indigoc py-20 text-cream">
        <FolkPatternBackground opacity={0.07} color="#FFF8E7" />
        <div className="relative mx-auto max-w-3xl px-5 text-center">
          <motion.h2 {...rise} className="font-display text-4xl font-extrabold leading-tight sm:text-5xl text-balance">
            {t("final.title")}
          </motion.h2>
          <p className="mx-auto mt-4 max-w-md font-body text-base text-cream/75 text-pretty">
            {t("final.body")}
          </p>
          <div className="mt-8 flex flex-col items-center gap-6">
            <button
              onClick={() => onEnter("report")}
              className="group inline-flex items-center gap-2 rounded-2xl bg-saffron px-8 py-4 font-display text-lg font-bold text-white shadow-[5px_5px_0_0_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-1"
            >
              {t("final.cta")}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <StatusStamp label={t("final.stamp")} tone="green" animate className="bg-cream/95 text-base" />
          </div>
        </div>
      </section>

      <footer className="bg-cream px-5 py-8 text-center font-mono text-[11px] uppercase tracking-wider text-ink/45">
        NammaFix AI · {t("footer.tagline")}
      </footer>
    </div>
  );
}

/* ---------------- local presentational helpers ---------------- */

function SectionHeading({ kicker, title, center = false }: { kicker: string; title: string; center?: boolean }) {
  return (
    <motion.div {...rise} className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div className={`mb-3 inline-flex items-center gap-2 ${center ? "" : ""}`}>
        <span className="h-px w-6 bg-saffron" />
        <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-saffron">{kicker}</span>
      </div>
      <h2 className="font-display text-3xl font-extrabold leading-tight text-indigoc sm:text-4xl">{title}</h2>
    </motion.div>
  );
}

function PainCard({ icon, title, body, tone }: { icon: ReactNode; title: string; body: string; tone: string }) {
  return (
    <motion.div {...rise} className="rounded-2xl border-2 border-ink/15 bg-white p-6 shadow-[4px_4px_0_0_rgba(58,31,27,0.08)]">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: `${tone}1a`, color: tone }}>
        {icon}
      </div>
      <h3 className="font-display text-lg font-extrabold text-ink">{title}</h3>
      <p className="mt-2 font-body text-sm leading-relaxed text-ink/65">{body}</p>
    </motion.div>
  );
}

function FloatingChip({ label, tone, className = "", delay = 0 }: { label: string; tone: string; className?: string; delay?: number }) {
  return (
    <div
      className={`absolute z-10 hidden animate-folk-float items-center gap-1.5 rounded-full border-2 bg-cream px-3 py-1.5 shadow-md sm:flex ${className}`}
      style={{ borderColor: tone, animationDelay: `${delay}s` }}
    >
      <span className="h-2 w-2 rounded-full" style={{ background: tone }} />
      <span className="font-display text-xs font-bold text-ink">{label}</span>
    </div>
  );
}
