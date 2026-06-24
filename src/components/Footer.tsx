/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Database, Terminal, Cpu } from "lucide-react";

interface FooterProps {
  apiCount: number;
}

export default function Footer({ apiCount }: FooterProps) {
  return (
    <footer className="h-10 bg-slate-900 px-6 flex items-center justify-between text-[10px] font-mono text-slate-400 shrink-0 uppercase tracking-widest border-t border-slate-800">
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-indigo-400" />
          <span>Session: Vibe2Ship Hackathon 2026</span>
        </div>
        <div className="hidden md:flex items-center gap-2 border-l border-slate-800 pl-5">
          <span className="text-slate-500">API Calls Ingress:</span>
          <span className="text-indigo-400 font-bold bg-slate-800 px-1.5 py-0.5 rounded">
            {apiCount}
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-5">
        {/* Connection status indicator */}
        <div className="flex items-center gap-1.5 text-slate-300">
          <Database className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-emerald-500 font-bold">Simulated DB Connected</span>
        </div>
        
        {/* Gemini Active indicator */}
        <div className="flex items-center gap-1.5 text-indigo-400 border-l border-slate-800 pl-5">
          <Cpu className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-bold text-indigo-400">Gemini 2.5 Flash Active</span>
        </div>
      </div>
    </footer>
  );
}
