# Brag Plan: NammaFix AI

## What is this app?
NammaFix AI lets any citizen snap a phone photo of a broken civic thing — pothole, sparking cable, flooded drain — and Gemini AI instantly produces a government-grade Evidence Packet with severity score, routing recommendation, and duplicate detection, then tracks it to closure.

## The angle
The asymmetry play: a billion-rupee municipal bureaucracy vs. one citizen with a phone. The video treats NammaFix as what it actually is — a covert upgrade to the city's infrastructure layer. Documentary-civic energy, not startup hype.

## Hook (first 2–3 seconds)
Black/indigoc screen. Single line slams in, large:

> "Bengaluru has 6 lakh potholes."

Hold for 1s. Then one more line fades:

> "Now every citizen has a co-pilot."

Instant cut to the NammaFix badge.

## Key moments (the middle)
- **Snap → AI**: Show the Report form with the Gemini AI analysis panel — structured Evidence Packet emerging from a single photo. Text callout: "Evidence Packet. In seconds."
- **Priority 10/10**: Active case card — "Damaged high-voltage cable sparking on 100 Feet Road" — the severity badge slams to 10/10. Text: "Routed to BBMP. Automatically."
- **Closure + Karma**: Civic Karma passbook — 420 points, Ward Rank #2, earned badges (CIVIC HERO, DRAINAGE GURU). One stat counter ticks up. Text: "Community verified. You earned it."

## Outro / punchline
NammaFix AI logo on cream background. Below it:

> "Civic Resolution Layer."
> "Powered by Gemini."

Final beat: the saffron dot on the MapPin badge pulses once.

## User flow worth showing
1. **Entry**: Open app → Report form → upload photo
2. **Key action**: AI produces Evidence Packet (severity, routing, duplicate check)
3. **Result**: Case routed → community verifies → issue closed → Civic Karma earned

## Tone
- Preset: `cinematic`
- Creative direction: Documentary civic — the city's bureaucracy meets a Gemini-powered citizen layer. Not a startup demo. Not a product pitch. A civic infrastructure film in 20 seconds.
- Interpretation: Big type, deliberate pacing, dramatic reveals. Each scene makes one claim and holds it. Music swells on the logo. No winking.

## Format: landscape — 1280×720
## Duration: 20 seconds

## Visual identity (from the project)
- Background: `#FFF8E7` (cream)
- Accent / CTA: `#F97316` (saffron)
- Structural / indigo: `#243B73` (indigoc)
- Text: `#3A1F1B` (ink brown)
- Highlight: `#FACC15` (marigold)
- Verified green: `#2E7D32` (leaf)
- Display font: Anek Latin (heavy weight, civic feel — Google Fonts)
- Body font: Mukta (body)
- Strongest visual element: The indigo circular MapPin badge with saffron dot; the Evidence Packet card; the 10/10 priority badge

## Share copy (draft)
NammaFix AI turns a phone photo into a government-grade evidence packet — severity score, routing, duplicate check. Built for Bengaluru. Powered by Gemini.

## Audio direction
- Role: cinematic support — warm, steady bed with 2–3 purposeful SFX hits
- Music: `happy-beats-business-moves-vol-12-by-ende-dot-app.mp3` — steady and clean, 110 BPM
- Music treatment: Start at data-start=0, fade under full video, slight swell toward the logo scene; volume 0.35
- Music cue guidance:
  - Preset: `happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.json`
  - Strong cues available at: 8.74s, 13.11s, 17.47s, 22.93s
  - Lock Evidence Packet slam to strong cue ~8.74s (±0.15s)
  - Lock 10/10 severity badge to ~13.11s (±0.15s)  
  - Lock logo slam to ~17.47s (±0.15s)
  - Beat grid for 3 karma stats (reports / verifications / closures): consecutive beats near 14.20s, 14.73s, 15.29s
- Audio-reactive treatment: subtle; use music RMS/bass to make the indigo hero background and Evidence Packet card glow slightly breathe. No waveform visuals, no strobing.
- SFX posture: sparse, professional — 3 cues max. `cinematic` profile.
- Audio-coupled moments:
  - Hook text slam: `impact/impactSoft_medium_001` at word entrance
  - Evidence Packet card reveal: `impact/impactBell_heavy_000` at 8.74s
  - 10/10 badge slam: `impact/impactBell_heavy_003` at 13.11s
  - Logo slam: `impact/impactBell_heavy_004` at 17.47s
- Restraint rule: No stacked SFX. No glitch. Nothing that reads as "startup demo." Each SFX should feel earned.

---

## Storyboard

### Scene 1 — Hook — 4s
**Background:** deep indigoc (`#243B73`) with very faint folk-pattern texture overlay at 4% opacity.
**Copy:**
```
"Bengaluru has 6 lakh potholes."   ← fades in at 0.5s, holds 1.2s
"Now every citizen has a co-pilot."  ← fades in at 2.0s
```
Both lines centered, Anek Latin, white, large display size.
Sequential/interaction: yes — line 1 fades, then line 2 fades. Each holds before the cut.
Audio intent: tension, establishing weight of the problem
Audio-coupled idea: `impactSoft_medium_001` at the first line's entrance (~0.4s)
Music: steady warm bed, builds quietly
Transition mood: hard cut → Scene 2

---

### Scene 2 — Reveal — 2.5s
**Background:** cream (`#FFF8E7`)
**What appears:** NammaFix AI logo (indigo circular MapPin badge + wordmark "NammaFix" + saffron AI pill) slams in at center scale. Below it: "Civic Resolution Layer" in small tracked caps, indigoc.
Sequential/interaction: logo scales in 0.95→1.0 over 0.4s, tagline fades up 0.2s later.
Audio intent: announcement, arrival
Audio-coupled idea: `interface/drop_001` soft drop as logo settles
Music: music bed continues
Transition mood: clean crossfade → Scene 3

---

### Scene 3 — Evidence Packet — 4s
**Background:** cream, with a faint turmeric tint panel on the right.
**What appears:** Recreate the Report form / AI analysis panel moment from the actual UI. Left panel: a phone-style thumbnail placeholder (report photo). Right panel: the Evidence Packet card emerging — severity label, routing badge, duplicate check mark appearing one by one.
**Text overlay (bottom):** "Evidence Packet. In seconds." — Anek Latin, indigoc, large.
Sequential/interaction: yes — 3 items in the evidence card appear one by one (severity → routing → duplicate check). Each lands on a consecutive beat near 9.29s, 9.83s, 10.37s.
Audio intent: precision, intelligence emerging
Audio-coupled idea: `impactBell_heavy_000` at first card item landing (~8.74s beat-locked); `interface/drop_001` or `drop_002` at subsequent items (~9.3s, ~9.8s)
Music: warm bed, slight energy lift
Transition mood: crossfade → Scene 4

---

### Scene 4 — Priority 10/10 — 3.5s
**Background:** deep indigoc with the active case card recreated in the center.
**What appears:** Case card — "Damaged high-voltage cable sparking on 100 Feet Road" — with the 10/10 priority badge slamming in and glowing saffron. Below the card: "Routed to BBMP. Automatically." in white Anek Latin.
Sequential/interaction: case card fades in, then 10/10 badge scales 0→1 with a brief glow, then the routing label types or fades in.
Audio intent: urgency, authority, the system working
Audio-coupled idea: `impactBell_heavy_003` at the 10/10 badge slam (~13.11s beat-locked)
Music: bed continues, slight warmth
Transition mood: crossfade → Scene 5

---

### Scene 5 — Karma — 3s
**Background:** cream
**What appears:** Civic Karma passbook card — "Priyanka Bhatt / Indiranagar, Bengaluru / 420 CIVIC KARMA / Ward Rank #2". Below it, 3 small stat chips appear one by one: "8 Reports Filed" · "15 Verifications Given" · "5 Closures Confirmed". Earned badge row (CIVIC HERO, DRAINAGE GURU, MISSION FINISHER) fades in last.
**Text overlay:** none needed — the card copy is the story.
Sequential/interaction: yes — 3 stat chips appear on consecutive beats near 14.73s, 15.29s, 15.84s. Badge row fades after.
Audio intent: warmth, reward, civic pride
Audio-coupled idea: `casino/chip-lay-1.ogg` (×3) or `interface/drop_001–002` for each stat chip arrival; beat-grid snap
Music: warm, energy plateauing before fade
Transition mood: slow crossfade → Scene 6

---

### Scene 6 — Logo Outro — 3s
**Background:** cream
**What appears:** NammaFix AI logo (same as Scene 2, slightly larger). Below:
```
"Civic Resolution Layer."
"Powered by Gemini."
```
Anek Latin, indigoc, medium weight. The saffron dot on the MapPin badge pulses once gently after logo is settled.
Sequential/interaction: logo fades in, then tagline fades, then "Powered by Gemini." fades. Saffron dot pulse at ~19.5s.
Audio intent: confident, complete, earned
Audio-coupled idea: `impactBell_heavy_004` logo slam at ~17.47s (beat-locked); music fades gently under this scene
Music: fade to 0 by 20s
Transition mood: fade to black

---

**Total duration:** 4 + 2.5 + 4 + 3.5 + 3 + 3 = **20 seconds** ✓

**Music mood for this video:** warm cinematic bed, steady 110 BPM, swells naturally to the logo slam
**Audio summary:** Vol-12 plays at 0.35 from the start; 3 bell-family SFX hit the major reveals at beat-locked cue points (8.74s, 13.11s, 17.47s); stat chips get light drop/chip sounds on the beat grid; music fades out at ~19.5s; everything else is restraint.
