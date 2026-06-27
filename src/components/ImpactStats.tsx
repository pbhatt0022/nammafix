/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Mission } from "../types";
import { Sparkles, Trophy, Target, Activity } from "lucide-react";
import { useT } from "../i18n";

interface ImpactStatsProps {
  apiCount: number;
}

export default function ImpactStats({ apiCount }: ImpactStatsProps) {
  const { t } = useT();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch aggregate database statistics and Gemini local summaries
  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error("Failed to load statistics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [apiCount]); // re-fetch when api counter updates (e.g., on reports / validation additions)

  if (loading || !stats) {
    return (
      <div className="bg-indigo-950 rounded-2xl p-6 text-white min-h-[220px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-6 rounded-full border-2 border-indigo-300 border-t-white animate-spin" />
          <span className="text-[10px] font-mono tracking-wider uppercase text-indigo-200">
            {t("impact.compiling")}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 shrink-0">
      {/* Bento Grid Stats */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white overflow-hidden relative border border-slate-800 shrink-0">
        <div className="absolute -top-3 -right-3 opacity-5 pointer-events-none">
          <Activity className="w-24 h-24 text-white" />
        </div>

        <h3 className="text-[9px] font-extrabold text-indigo-300 uppercase tracking-widest mb-4 flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5" />
          {t("impact.metrics")}
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-black text-white tracking-tight">
              {stats.resolved}
            </p>
            <p className="text-[9px] text-slate-400 uppercase font-black tracking-wider mt-0.5">
              {t("impact.resolved")}
            </p>
          </div>
          <div>
            <p className="text-2xl font-black text-white tracking-tight">
              {stats.total}
            </p>
            <p className="text-[9px] text-slate-400 uppercase font-black tracking-wider mt-0.5">
              {t("impact.active")}
            </p>
          </div>
          <div className="border-t border-slate-800 pt-3">
            <p className="text-2xl font-black text-emerald-400 tracking-tight">
              {stats.verified}
            </p>
            <p className="text-[9px] text-slate-400 uppercase font-black tracking-wider mt-0.5">
              {t("impact.verified")}
            </p>
          </div>
          <div className="border-t border-slate-800 pt-3">
            <p className="text-2xl font-black text-rose-500 tracking-tight">
              {stats.highRisk}
            </p>
            <p className="text-[9px] text-slate-400 uppercase font-black tracking-wider mt-0.5">
              {t("impact.highRisk")}
            </p>
          </div>
        </div>
      </div>

      {/* Gemini localized insights summary card */}
      <div className="bg-indigo-900 rounded-2xl p-5 text-white border border-indigo-800 space-y-3 shrink-0">
        <div className="flex justify-between items-center">
          <span className="text-[9px] font-extrabold text-indigo-300 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300 animate-pulse fill-indigo-300" />
            {t("impact.summary")}
          </span>
          <span className="text-[8px] font-mono text-indigo-400 bg-indigo-950 px-1.5 py-0.5 rounded border border-indigo-950 font-bold uppercase">
            {t("common.live")}
          </span>
        </div>
        
        <p className="text-xs italic leading-relaxed text-indigo-100 font-medium font-sans">
          "{stats.aiSummary}"
        </p>
      </div>

      {/* Community Missions tracker */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shrink-0">
        <h3 className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
          <Trophy className="w-3.5 h-3.5 text-orange-500" />
          {t("impact.activeMissions")}
        </h3>

        <div className="space-y-4">
          {stats.missions.map((mission: Mission) => (
            <div key={mission.id} className="space-y-1.5">
              <div className="flex justify-between items-start gap-3">
                <div>
                  <h4 className="text-[11px] font-black text-slate-800 leading-tight flex items-center gap-1.5">
                    {mission.active ? (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-300 inline-block" />
                    )}
                    {mission.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                    {mission.description}
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
                  +{mission.bonusPoints} {t("impact.karma")}
                </span>
              </div>
              
              {/* Mission Progress bar */}
              <div className="space-y-1">
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all"
                    style={{ width: `${mission.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                  <span>{t("common.progress")}</span>
                  <span className="font-extrabold text-indigo-600">{mission.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
