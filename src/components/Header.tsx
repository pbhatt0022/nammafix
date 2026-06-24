/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { User } from "../types";
import { ShieldAlert, Award, Compass, MapPin, UserCheck } from "lucide-react";

interface HeaderProps {
  currentUser: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onHome?: () => void; // return to the landing page
}

export default function Header({ currentUser, activeTab, setActiveTab, onHome }: HeaderProps) {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-slate-200 shrink-0">
      {/* Branding Logo — click to return to the landing page */}
      <button onClick={onHome} title="Back to home" className="flex items-center gap-3 text-left">

        <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-extrabold shadow-sm shadow-indigo-200">
          NF
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-extrabold tracking-tight text-slate-800 leading-none">
            NammaFix <span className="text-indigo-600">AI</span>
          </span>
          <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase mt-0.5">
            Civic Resolution Layer
          </span>
        </div>
      </button>

      {/* Navigation Links */}
      <nav className="flex items-center gap-6 text-sm font-medium h-full">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`h-full flex items-center px-2 border-b-2 font-semibold transition-all ${
            activeTab === "dashboard"
              ? "text-indigo-600 border-indigo-600"
              : "text-slate-500 border-transparent hover:text-slate-800"
          }`}
        >
          <Compass className="w-4 h-4 mr-1.5" />
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab("map")}
          className={`h-full flex items-center px-2 border-b-2 font-semibold transition-all ${
            activeTab === "map"
              ? "text-indigo-600 border-indigo-600"
              : "text-slate-500 border-transparent hover:text-slate-800"
          }`}
        >
          <MapPin className="w-4 h-4 mr-1.5" />
          Community Map
        </button>
        <button
          onClick={() => setActiveTab("missions")}
          className={`h-full flex items-center px-2 border-b-2 font-semibold transition-all ${
            activeTab === "missions"
              ? "text-indigo-600 border-indigo-600"
              : "text-slate-500 border-transparent hover:text-slate-800"
          }`}
        >
          <Award className="w-4 h-4 mr-1.5" />
          Civic Missions
        </button>
      </nav>

      {/* Karma Score and User Profile */}
      <div className="flex items-center gap-4">
        {/* Karma counter */}
        <div className="flex flex-col items-end">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            Civic Karma
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-black text-emerald-600">
              {currentUser.karma.toLocaleString()} Points
            </span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
          <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold overflow-hidden shadow-inner">
            <UserCheck className="w-4 h-4 text-slate-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-800 leading-none">{currentUser.name}</span>
            <span className="text-[9px] font-mono text-slate-400 mt-1 uppercase tracking-tight">
              {currentUser.badges[0] || "Active Citizen"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
