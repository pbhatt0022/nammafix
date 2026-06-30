# Hyperframes Composition Brief: NammaFix AI

## Objective
Create a short cinematic launch video for NammaFix AI — a Gemini-powered civic issue reporting platform built for Bengaluru, India.

## Output
- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4`
- Format: landscape — 1280×720
- Duration: 20 seconds

## Source Material
- Project root: `C:\Users\priya\OneDrive\Documents\nammafix-ai`
- Screenshots available at: `docs/screenshots/report-flow.png`, `docs/screenshots/active-case.png`, `docs/screenshots/impact-dashboard.png`
- Product name: NammaFix AI
- Tagline: "Civic Resolution Layer"
- Powered by: Gemini (Google AI)
- Copy that must appear verbatim:
  - "Bengaluru has 6 lakh potholes."
  - "Now every citizen has a co-pilot."
  - "Evidence Packet. In seconds."
  - "Routed to BBMP. Automatically."
  - "Civic Resolution Layer."
  - "Powered by Gemini."
  - "Damaged high-voltage cable sparking on 100 Feet Road" (case title from the active-case screenshot)
  - "420 Civic Karma · Ward Rank #2" (from the karma passbook)

## Creative Direction
- Tone preset: `cinematic`
- Creative direction: Documentary civic — not a startup demo, not a pitch deck. The city's broken infrastructure meets a Gemini-powered citizen layer. Treat it seriously.
- Interpretation: Big type, deliberate pacing, dramatic reveals per scene. Each scene makes one claim and holds long enough to land. Music swells on the logo slam. No winking, no jokes.
- Angle: The asymmetry of one citizen + one phone vs. a city's entire maintenance bureaucracy. NammaFix closes the gap.
- Hook: "Bengaluru has 6 lakh potholes." / "Now every citizen has a co-pilot." — hard-hitting, matter-of-fact.
- Outro: NammaFix AI logo slam → "Civic Resolution Layer." → "Powered by Gemini." — confident close.
- Avoid:
  - Generic SaaS language or startup clichés
  - Abstract filler motion graphics
  - Redesigning the visual identity — use the exact palette below
  - Any humor or winking at the camera

## Visual Identity
- Background: `#FFF8E7` (cream)
- Structural / brand indigo: `#243B73` (deep civic indigo)
- CTA / accent: `#F97316` (saffron orange)
- Text (primary): `#3A1F1B` (ink brown)
- Highlight: `#FACC15` (marigold yellow)
- Verified green: `#2E7D32` (leaf)
- Teal accent: `#00A6A6` (peacock)
- Display font: Anek Latin — load from Google Fonts. Use weight 800 for hero lines, 700 for secondary. Fallback: system-ui.
- Body font: Mukta — load from Google Fonts. Fallback: system-ui.
- NammaFix AI logo mark: deep indigo circular badge (`linear-gradient(145deg, #2e4fa3 0%, #162347 100%)`) with a MapPin icon (marigold) and a small saffron dot at bottom-right. Wordmark: "NammaFix" in Anek Latin black + small saffron rounded-pill "AI" label.
- Strongest visual elements to recreate: the Evidence Packet card, the 10/10 priority badge (saffron), the Civic Karma passbook, the indigo logo badge.

## Storyboard
Use `brag-output/brag-plan.md` as the creative contract.

Scene summary:
1. **Hook** — 4s — "Bengaluru has 6 lakh potholes." then "Now every citizen has a co-pilot." — indigoc background, white display type, two lines sequential
2. **Reveal** — 2.5s — NammaFix AI logo slam on cream, "Civic Resolution Layer" fades below
3. **Evidence Packet** — 4s — Report form recreation with AI analysis panel: 3 items arriving one-by-one (severity → routing → duplicate check); text overlay: "Evidence Packet. In seconds."
4. **Priority 10/10** — 3.5s — Active case card recreation on indigoc background: case title + 10/10 badge slamming in with saffron glow; "Routed to BBMP. Automatically."
5. **Karma** — 3s — Civic Karma passbook recreation on cream: user card with 420 points + Ward Rank #2, 3 stat chips arriving on beat-grid, badge row (CIVIC HERO, DRAINAGE GURU, MISSION FINISHER)
6. **Logo Outro** — 3s — NammaFix AI logo on cream, tagline + "Powered by Gemini." fade in, saffron dot pulses once, music fades

## Audio
- Audio role: cinematic support — warm steady bed with 3 purposeful bell-family SFX hits
- Audio arc: quiet tension in hook → announcement hit at logo reveal → precision hits at evidence and priority reveals → warmth + beat grid on karma → music fades under the logo outro
- Music: `assets/music/happy-beats-business-moves-vol-12-by-ende-dot-app.mp3`
- Music treatment: data-start=0, data-duration=20, data-volume=0.35; fade volume to 0 by ~19.5s
- Music cue guidance:
  - Preset JSON: `assets/music/cues/happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.json`
  - Strong cue locks (±0.15s): Evidence Packet first item → 8.74s; 10/10 badge slam → 13.11s; logo slam → 17.47s
  - Beat-grid windows: Evidence card items 2-3 near 9.29s, 9.83s; Karma stat chips near 14.73s, 15.29s, 15.84s (snap ±0.10s)
  - Use 3 strong-cue locks max; beat-grid for small sequential events only
- Audio-reactive treatment: subtle; use RMS/bass to make the indigoc scene background warmth and the Evidence Packet card glow breathe slightly. No waveform bars, no strobing.
- Audio-coupled moments:
  - Scene 1: `impact/impactSoft_medium_001` at hook line 1 entrance (~0.4s)
  - Scene 3: `impact/impactBell_heavy_000` at Evidence Packet first item (~8.74s, beat-locked)
  - Scene 3: `interface/drop_001` or `drop_002` at items 2 and 3 (~9.3s, ~9.8s)
  - Scene 4: `impact/impactBell_heavy_003` at 10/10 badge slam (~13.11s, beat-locked)
  - Scene 5: `interface/drop_001` (×3) or `casino/chip-lay-1` for 3 karma stat chips at beat-grid
  - Scene 6: `impact/impactBell_heavy_004` at logo slam (~17.47s, beat-locked)
- SFX selection guidance: bell family for major reveals, soft drops for sequential items, chip sound for karma stats. Keep it sparse — only 6-8 SFX cues total. Nothing sharp/glitchy.
- SFX analysis guidance: `~/.claude/plugins/cache/brag/brag/0.1.0/skills/brag/assets/sfx/sfx-analysis.md`
- Exact SFX choice: Hyperframes decides filenames, exact timestamps, and volume. Prefer low HF-risk files.
- Audio files: copy music + SFX into `brag-output/composition/assets/`

## Hyperframes Instructions
Use the current `hyperframes` skill and CLI workflow.

Requirements:
- Show at least one real UI element from the project (use `docs/screenshots/active-case.png` or `docs/screenshots/impact-dashboard.png` as reference art, or recreate key UI cards from the palette above)
- Keep all text readable — every line has adequate settled hold time
- Total duration: 20 seconds
- Include music + SFX layer as specified
- Honor beat-locked cue positions for the 3 major reveals
- The Evidence Packet, Priority badge, and Karma passbook must feel like the actual product, not generic mockups
- Run lint and validate before render
