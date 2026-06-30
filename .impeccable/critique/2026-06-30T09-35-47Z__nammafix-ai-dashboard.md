---
target: nammafix-ai dashboard
total_score: 21
p0_count: 0
p1_count: 3
p2_count: 2
timestamp: 2026-06-30T09-35-47Z
slug: nammafix-ai-dashboard
---
## NammaFix AI Dashboard — Design Critique

### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Timeline + AI badges solid. No feedback during form submission; no skeleton in report form |
| 2 | Match System / Real World | 2 | 9+ unexplained AI terms: "Resolver Copilot", "Multimodal Pipeline", "AI Reviewed" |
| 3 | User Control and Freedom | 3 | Cancel/filter exist. No draft saving; no undo after merge |
| 4 | Consistency and Standards | 2 | Raw Tailwind category colors bypass warm remap; font-mono leaks into labels |
| 5 | Error Prevention | 2 | Presets/duplicate detection exist but lat/lng spinners allow invalid input; no field validation before Gemini |
| 6 | Recognition Rather Than Recall | 3 | Queue shows all attributes; presets help. Status terminology requires recall |
| 7 | Flexibility and Efficiency | 2 | Voice dictation + presets excellent. No keyboard shortcuts; no batch ops; no priority sort |
| 8 | Aesthetic and Minimalist Design | 2 | ~30 sections with identical eyebrow labels; right column stacks 6 components with no hierarchy |
| 9 | Error Recovery | 1 | setError exists but UI is invisible; file-too-large referenced but never rendered |
| 10 | Help and Documentation | 1 | No tooltips, no walkthrough; only Community Signal has an inline explainer |
| **Total** | | **21/40** | **Acceptable — significant improvements needed** |

### Anti-Patterns Verdict

Partially looks AI-generated, specifically in the dashboard surface. ~30 sections use identical `text-[9px] font-extrabold uppercase tracking-widest` eyebrow labels (banned pattern). Cold dark panels (`bg-slate-900`, `bg-indigo-950`) break brand warmth. Detect confirmed: gray-on-color ×3, ai-color-palette (indigo-300 on dark), animate-bounce, Inter redundant load.

### Priority Issues

**[P1] Eyebrow forest** — ~30 sections identical `text-[9px] font-extrabold uppercase tracking-widest`. No visual hierarchy. → `/impeccable typeset`

**[P1] Right column cognitive overload** — 6 components stacked with equal weight, no hierarchy. → `/impeccable layout`

**[P1] Cold dark panels break brand warmth** — bg-slate-900/indigo-950 inconsistent with cream/turmeric shell. → `/impeccable colorize`

**[P2] JetBrains Mono leaking into section labels** — App.tsx:273,280 + others. Should be IDs/codes only. → `/impeccable typeset`

**[P2] Gray text on colored backgrounds ×3** — text-slate-500 on violet-50/emerald-50; text-slate-600 on red-100. → `/impeccable polish`

**[P3] animate-bounce** — ReportIssueView:355. Replace with expo easing. → `/impeccable polish`

### Persona Red Flags

Casey: 9px touch target on FILE REPORT link; no upload confirmation; silent double-report on resubmit.
Jordan: Lat/lng spinners editable with no validation; wrong coordinates → silent wrong routing.
Ravi: Admin triage workflow dead-ends — no assignment UI after "Inspect Dispatch".

### Minor Observations

- "LIVE" badge misleads — data fetched once, not streamed. Change to "CURRENT" or timestamp.
- Mission karma badges (`+30 Karma`) styled as metadata tags, not rewards. Needs saffron.
- Inter in index.css is unused dead weight (~30KB). Mukta is the product font.
- Mission progress bars at h-1.5 (6px) too thin for mobile sunlight.
- animate-bounce confirmed by detect at ReportIssueView:355.

### Questions

- If evidence packet is the hero feature, why does it share equal space with 6 other right-column components?
- What would a ward admin layout look like distinct from the citizen layout?
- Does the UI feel communal ("Namma" = ours) or like a case management tool?
