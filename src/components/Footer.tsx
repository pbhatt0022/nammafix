/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Database, Terminal, Cpu } from "lucide-react";

interface FooterProps {
  apiCount: number;
}

export default function Footer({ apiCount }: FooterProps) {
  return (
    <footer className="h-10 bg-indigoc px-6 flex items-center justify-between text-[10px] font-mono text-cream/60 shrink-0 uppercase tracking-widest border-t-2 border-ink/20">
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-marigold" />
          <span>Session: Vibe2Ship Hackathon 2026</span>
        </div>
        <div className="hidden md:flex items-center gap-2 border-l border-cream/20 pl-5">
          <span className="text-cream/50">API Calls Ingress:</span>
          <span className="text-marigold font-bold bg-white/10 px-1.5 py-0.5 rounded">
            {apiCount}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-5">
        {/* Connection status indicator */}
        <div className="flex items-center gap-1.5 text-cream/80">
          <Database className="w-3.5 h-3.5 text-peacock" />
          <span className="text-peacock font-bold">Simulated DB Connected</span>
        </div>

        {/* Gemini Active indicator */}
        <div className="flex items-center gap-1.5 text-marigold border-l border-cream/20 pl-5">
          <Cpu className="w-3.5 h-3.5 text-marigold" />
          <span className="font-bold text-marigold">Gemini 2.5 Flash Active</span>
        </div>
      </div>
    </footer>
  );
}
