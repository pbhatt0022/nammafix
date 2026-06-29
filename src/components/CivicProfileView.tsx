/**
 * Civic Karma profile — a "civic passbook" for the citizen: ward rank, karma,
 * contribution stats, earned badges (folk stamp seals), and report history.
 * Celebratory, never shaming. Read-only view over existing user + report data.
 */
import React from "react";
import { User, Report } from "../types";
import { useT } from "../i18n";
import KarmaBadge from "../landing/KarmaBadge";
import {
  PotholeIcon, StreetlightIcon, PipeLeakIcon, DrainIcon, EvidencePacketIcon,
  VerifiedStampIcon, WardPinIcon, HandsIcon,
} from "../landing/DoodleIcons";
import { ClipboardList, CheckCircle2, ShieldCheck, Trophy } from "lucide-react";

const BADGE_TONES = ["#F97316", "#243B73", "#00A6A6", "#E83E8C", "#2E7D32", "#FACC15", "#3A1F1B"];

// Pick a folk doodle that matches the badge's theme.
function badgeIcon(label: string) {
  const l = label.toLowerCase();
  if (/light|lumin/.test(l)) return <StreetlightIcon className="h-full w-full" />;
  if (/water/.test(l)) return <PipeLeakIcon className="h-full w-full" />;
  if (/drain/.test(l)) return <DrainIcon className="h-full w-full" />;
  if (/evidence|builder/.test(l)) return <EvidencePacketIcon className="h-full w-full" />;
  if (/verif|resolv|master/.test(l)) return <VerifiedStampIcon className="h-full w-full" />;
  if (/ward|champion|hero/.test(l)) return <WardPinIcon className="h-full w-full" />;
  if (/community|neighbour|hand/.test(l)) return <HandsIcon className="h-full w-full" />;
  return <PotholeIcon className="h-full w-full" />;
}

export default function CivicProfileView({ user, users, reports }: { user: User; users: User[]; reports: Report[] }) {
  const { t } = useT();

  // Ward rank by karma (celebrate position; total = active citizens).
  const ranked = [...users].sort((a, b) => b.karma - a.karma);
  const rank = Math.max(1, ranked.findIndex((u) => u.id === user.id) + 1);
  const totalCitizens = Math.max(users.length, 1);

  const myReports = reports.filter((r) => r.createdBy === user.id);

  const stats = [
    { label: t("profile.reports"), value: user.reportsSubmitted, icon: <ClipboardList className="w-5 h-5" />, tone: "#243B73" },
    { label: t("profile.verifications"), value: user.verificationsGiven, icon: <ShieldCheck className="w-5 h-5" />, tone: "#00A6A6" },
    { label: t("profile.closures"), value: user.closuresConfirmed, icon: <CheckCircle2 className="w-5 h-5" />, tone: "#2E7D32" },
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Passbook header */}
        <div className="rounded-2xl border-2 border-dashed border-ink/25 bg-turmeric/50 p-6 flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="h-20 w-20 shrink-0 rounded-2xl bg-indigoc text-marigold flex items-center justify-center font-display text-3xl font-extrabold shadow">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-mono text-[10px] uppercase tracking-widest text-ink/45">{t("profile.title")}</div>
            <h1 className="font-display text-2xl font-extrabold text-indigoc leading-tight">{user.name}</h1>
            <p className="text-sm text-ink/60">{user.locality}</p>
          </div>
          <div className="flex gap-6 sm:gap-8">
            <div className="text-center">
              <div className="font-display text-3xl font-black text-leaf leading-none">{user.karma.toLocaleString()}</div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-ink/45 mt-1">{t("profile.karma")}</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-black text-saffron leading-none flex items-center gap-1">
                <Trophy className="w-5 h-5" />#{rank}
              </div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-ink/45 mt-1">
                {t("profile.rank")} · {t("profile.of")} {totalCitizens}
              </div>
            </div>
          </div>
        </div>

        {/* Contribution stats */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-concrete bg-white p-4 text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${s.tone}1a`, color: s.tone }}>
                {s.icon}
              </div>
              <div className="font-display text-2xl font-black" style={{ color: s.tone }}>{s.value}</div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-ink/50 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Earned badges */}
        <div className="rounded-2xl border border-concrete bg-white p-6">
          <h2 className="font-display text-sm font-extrabold text-indigoc uppercase tracking-wide mb-5">{t("profile.badges")}</h2>
          {user.badges.length === 0 ? (
            <p className="text-xs text-ink/50 italic">{t("profile.noBadges")}</p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-y-6">
              {user.badges.map((b, i) => (
                <div key={b}>
                  <KarmaBadge label={b} tone={BADGE_TONES[i % BADGE_TONES.length]} icon={badgeIcon(b)} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contribution history */}
        <div className="rounded-2xl border border-concrete bg-white p-6">
          <h2 className="font-display text-sm font-extrabold text-indigoc uppercase tracking-wide mb-4">{t("profile.contributions")}</h2>
          {myReports.length === 0 ? (
            <p className="text-xs text-ink/50 italic">{t("profile.noContributions")}</p>
          ) : (
            <ul className="space-y-2">
              {myReports.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/60">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-[9px] font-extrabold text-ink/40">#{r.id}</span>
                    <span className="text-xs font-bold text-ink truncate">{r.title}</span>
                  </div>
                  <span className={`shrink-0 px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                    r.status === "Resolved" ? "bg-emerald-50 text-emerald-700" : "bg-indigo-50 text-indigo-700"
                  }`}>
                    {t("enum.status." + r.status)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
