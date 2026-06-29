/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { User } from "../types";
import { ShieldAlert, Award, Compass, MapPin, UserCheck } from "lucide-react";
import { useT } from "../i18n";
import LanguageSelector from "../i18n/LanguageSelector";
import NotificationBell from "./NotificationBell";

interface HeaderProps {
  currentUser: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onHome?: () => void; // return to the landing page
  notifUserId?: string;
  apiCount?: number;
  onOpenReport?: (reportId: string) => void;
}

export default function Header({ currentUser, activeTab, setActiveTab, onHome, notifUserId, apiCount, onOpenReport }: HeaderProps) {
  const { t } = useT();
  return (
    <header className="h-16 flex items-center justify-between gap-2 px-4 sm:px-6 bg-cream border-b-2 border-ink/10 shrink-0">
      {/* Branding Logo — click to return to the landing page */}
      <button onClick={onHome} title="Back to home" className="flex items-center gap-3 text-left shrink-0">

        <div className="w-9 h-9 bg-indigoc rounded-lg flex items-center justify-center text-marigold font-display font-extrabold shadow-sm">
          NF
        </div>
        <div className="hidden sm:flex flex-col">
          <span className="text-lg font-display font-extrabold tracking-tight text-indigoc leading-none">
            NammaFix <span className="text-saffron">AI</span>
          </span>
          <span className="text-[10px] font-mono tracking-wider text-ink/45 uppercase mt-0.5">
            Civic Resolution Layer
          </span>
        </div>
      </button>

      {/* Navigation Links */}
      <nav className="flex items-center gap-2 sm:gap-6 text-sm font-medium h-full overflow-x-auto">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`h-full flex items-center px-2 border-b-2 font-semibold transition-all ${
            activeTab === "dashboard"
              ? "text-saffron border-saffron"
              : "text-ink/55 border-transparent hover:text-ink"
          }`}
        >
          <Compass className="w-4 h-4 mr-1.5" />
          {t("nav.dashboard")}
        </button>
        <button
          onClick={() => setActiveTab("map")}
          className={`h-full flex items-center px-2 border-b-2 font-semibold transition-all ${
            activeTab === "map"
              ? "text-saffron border-saffron"
              : "text-ink/55 border-transparent hover:text-ink"
          }`}
        >
          <MapPin className="w-4 h-4 mr-1.5" />
          {t("nav.map")}
        </button>
        <button
          onClick={() => setActiveTab("missions")}
          className={`h-full flex items-center px-2 border-b-2 font-semibold transition-all ${
            activeTab === "missions"
              ? "text-saffron border-saffron"
              : "text-ink/55 border-transparent hover:text-ink"
          }`}
        >
          <Award className="w-4 h-4 mr-1.5" />
          {t("nav.missions")}
        </button>
      </nav>

      {/* Karma Score and User Profile */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {notifUserId && onOpenReport && (
          <NotificationBell userId={notifUserId} apiCount={apiCount ?? 0} onOpenReport={onOpenReport} />
        )}
        <LanguageSelector />
        {/* Karma counter */}
        <div className="hidden md:flex flex-col items-end">
          <span className="text-[9px] font-bold text-ink/45 uppercase tracking-widest">
            {t("nav.karma")}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-black text-leaf">
              {currentUser.karma.toLocaleString()} Points
            </span>
            <div className="w-2 h-2 rounded-full bg-leaf animate-pulse" />
          </div>
        </div>

        {/* User Card — opens the Civic Karma passbook */}
        <button
          onClick={() => setActiveTab("profile")}
          title={t("nav.profile")}
          className={`hidden sm:flex items-center gap-2 border-l border-ink/15 pl-4 transition-opacity hover:opacity-80 ${activeTab === "profile" ? "opacity-100" : ""}`}
        >
          <div className="w-9 h-9 rounded-full bg-turmeric border-2 border-ink/15 flex items-center justify-center text-ink font-bold overflow-hidden">
            <UserCheck className="w-4 h-4 text-indigoc" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-ink leading-none">{currentUser.name}</span>
            <span className="text-[9px] font-mono text-ink/45 mt-1 uppercase tracking-tight">
              {currentUser.badges[0] || "Active Citizen"}
            </span>
          </div>
        </button>
      </div>
    </header>
  );
}
