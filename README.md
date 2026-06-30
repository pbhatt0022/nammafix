# NammaFix AI

**Vibe2Ship 2026 · Community Hero – Hyperlocal Problem Solver**

> A Gemini-powered civic resolution platform that turns a citizen photo into a structured AI Evidence Packet, auto-routes it to the right municipal authority, mobilises neighbours to verify it, and tracks it to a proven fix — rewarding real civic contribution at every step.

**Live demo:** https://nammafix-ai-564629031889.asia-southeast1.run.app  
**GitHub:** https://github.com/pbhatt0022/nammafix

---

## The Problem

Bengaluru's civic issues don't disappear. They accumulate — the same pothole reported ten times across ten WhatsApp groups, with no single authority owning resolution, no before/after proof, and no feedback to the citizen who filed it.

Existing platforms digitise the *complaint*. They don't resolve it. NammaFix AI resolves it.

---

## The Agentic Pipeline

A single photo triggers a multi-step Gemini workflow — not a form submission:

```
Photo  →  AI Evidence Packet  →  Duplicate Gate  →  Auto-Routing  →
Community Verification  →  Resolver Copilot  →  Closure Proof  →
Civic Karma  →  Ward Impact Dashboard
```

Each arrow is a distinct Gemini agent action. The pipeline demonstrates a full `Plan → Act → Reflect` loop: Gemini *plans* what evidence is needed, *acts* to classify and route, and *reflects* at closure by comparing before/after photos to verify the fix is real — not self-reported.

### The Six Gemini Agent Calls

| Agent | Gemini's Role | When It Fires |
|---|---|---|
| **Multimodal Intake** | Image + text → category, severity score, public risk, evidence observed, missing info, recommended action (structured JSON) | Citizen submits a photo |
| **Duplicate Gate** | Haversine geo proximity + keyword overlap against live reports → merge recommendation (no Gemini quota spent here — runs first) | Pre-flight on every submission |
| **Auto-Router** | Classifies category → BBMP / BWSSB / BESCOM department + ward + SLA + Gemini-generated dispatch note | Immediately after intake |
| **Resolver Copilot** | Reads the evidence packet → routing note, escalation flag, SLA risk, citizen update draft | Admin reviews a case |
| **Closure Verifier** | Before + after photo comparison → `Verified Resolved / Partially Resolved / Unresolved` with confidence score | Citizen uploads closure proof |
| **Impact Analyst + Forecast** | Aggregates all report data → ward health summary and on-demand hotspot forecast with seasonal risk flags | Dashboard load + on-demand |

This is not six isolated prompts. Each agent's output feeds the next stage — the evidence packet drives routing; routing shapes the copilot note; the copilot note sets the SLA against which closure is verified.

---

## What Makes It Different

**vs. FixMyStreet / SeeClickFix:** They email councils and wait. NammaFix generates a structured evidence packet and a routing decision in seconds, with AI-verified closure.

**vs. Swachhata App (India's dominant platform):** Swachhata relies on manual classification by human inspectors. NammaFix uses multimodal AI to classify, detect risk proximity, and route autonomously — removing the administrative bottleneck.

**vs. generic civic apps:** NammaFix treats a civic issue as a *stateful workflow*, not a database row. It has an active duplicate detection gate, a community verification loop, AI-audited closure, and a Civic Karma system that rewards verified impact — not complaint volume.

---

## Key Features

### AI Evidence Packet
Gemini reads the photo + description and issues a structured municipal docket: category, severity score, AI confidence, public risk bound, observed evidence, missing details, and recommended next action. This is the centrepiece — a resolver-ready docket generated in seconds, not a free-text complaint.

### Automatic Municipal Routing + Civic Dispatch Ticket
Every report is auto-routed to the correct BBMP/BWSSB/BESCOM department + ward + SLA. The Dispatch Ticket surfaces immediately in the case view with a Gemini-generated dispatch note — ready for the resolver the moment the report lands.

### Duplicate Cluster Merging
A cheap pre-flight duplicate check (no Gemini call) runs before every submission. If a matching nearby report exists, citizens can add their evidence to the cluster instead of filing a new report — boosting its verification score rather than adding noise.

### Community Verification Loop
Neighbours submit witness slips: "I saw this too / still active / looks fixed / needs recheck." At 60% verification score the status auto-advances. Closure is verified by Gemini comparing before/after photos — not self-reported by the fixer.

### Civic Karma Passbook
Karma is earned for reports filed, verifications given, and closures confirmed — not raw complaint volume. Folk-stamp badge seals are earned for contributions (First Fix Reporter, Evidence Builder, Ward Champion). A ward rank tracks a citizen's standing among neighbours.

### Predictive Ward Forecast
On-demand Gemini forecast identifies likely hotspot areas and seasonal risk patterns from the existing cluster, so authorities can act preventively — flagging drain risk before the monsoon, not after.

### 7-Language UI + Voice Input
Every label, error message, and loading step across the full UI is available in English, Hindi, Kannada, Tamil, Telugu, Bengali, and Marathi (230 translation keys, pre-generated by Gemini at zero runtime cost). AI-generated packet content can be live-translated on demand. Voice input works on description, landmark, and verification fields — supporting on-the-go reporting in Indian languages.

---

## Google Technologies

| Technology | How It's Used |
|---|---|
| **Gemini 2.5 Flash** | Six distinct agent calls: multimodal intake, auto-routing dispatch note, resolver copilot, before/after closure verification, impact summary, ward forecast, live content translation |
| **Google AI Studio** | Development environment and deployment platform (deployed to Cloud Run, asia-southeast1) |
| **Web Speech API** | Voice-to-text on report and verification fields in 7 Indian language locales (Chrome uses Google's own recognition engine under the hood) |

Gemini 2.5 Flash was chosen for its multimodal reasoning at speed — the "magic moment" of the demo needs to resolve in under 10 seconds — and for its structured JSON output that drives the evidence packet format cleanly.

---

## Design: Bharat Civic Folk-Tech

NammaFix looks like a civic tool built *for* Indian streets, not a municipal form ported to a browser.

The design system — **Bharat Civic Folk-Tech** — uses a turmeric-cream + civic-indigo base with saffron/marigold/peacock/lotus/leaf accents, handcrafted folk-doodle SVG illustrations (ward pins, autos, potholes, leaking pipes, evidence packet dockets), and rubber-stamp status labels. Display fonts (Anek Latin, Honk) appear only at brand moments; data is rendered in clean body typography (Mukta).

The landing page and the dashboard share the same palette through a single Tailwind v4 `@theme` remap — one change retones the entire app.

---

## Stack

```
Frontend    React 19 + Vite 6 + Tailwind CSS v4 (@theme tokens, no config file)
Backend     Express + Vite middleware in one process (server.ts)
AI          Gemini 2.5 Flash via @google/genai — multimodal structured JSON
Map         Leaflet + OpenStreetMap + leaflet.heat + leaflet.markercluster (no API key)
i18n        Custom lightweight provider — 230 keys × 7 languages (static, Gemini-generated)
Voice       Browser-native Web Speech API (zero quota cost, language-aware)
Deployment  Google AI Studio → Cloud Run (asia-southeast1)
Data        In-memory, seeded on boot — demo-stable, no database setup required
```

---

## Local Setup

```bash
git clone https://github.com/pbhatt0022/nammafix
cd nammafix
npm install

# Create .env with your Gemini key from Google AI Studio:
# GEMINI_API_KEY="AIza..."

npm run dev   # → http://localhost:3000
```

Without a `GEMINI_API_KEY`, the server runs in **Simulated AI Mode** — all Gemini responses are deterministic mocks, so the full pipeline and UI is explorable with no API key.

```bash
npm run build   # vite build + esbuild bundles server.cjs → dist/
npm run start   # production bundle
```

---

## Demo Flow (4 minutes)

1. **Landing** — Folk-tech landing page. Switch language selector to Hindi or Kannada to see full i18n in action. Click "Report a Local Issue."
2. **Report** — Upload any civic photo. Watch the 6-step Gemini intake run in real time.
3. **Evidence Packet** — Read the structured docket: category, severity, public risk, Dispatch Ticket with department + SLA.
4. **Duplicate gate** — Submit a second nearby report. The system offers to merge evidence into the existing cluster.
5. **Verification** — Add a neighbour verification by voice. Watch the score advance past the routing threshold.
6. **Resolver Copilot** — Run the copilot for a Gemini routing note and SLA risk flag.
7. **Closure** — Upload a "fixed" photo. Watch Gemini compare before/after and issue its verdict.
8. **Civic Karma** — Open the Passbook. See karma, earned badge seals, and ward rank.
9. **Map** — Switch to heatmap mode. See the severity-weighted density layer across the ward.
10. **Forecast** — Hit "Forecast hotspots" on the Impact screen for Gemini's preventive hotspot prediction.

---

## Honest Disclosures

- **Routing is a mock** — The Civic Dispatch Ticket is generated from a hardcoded resolver directory (BBMP/BWSSB/BESCOM ward bounding boxes), not a live municipal API. The dispatch note and SLA are real Gemini output; the delivery channel is simulated. This is labelled clearly in the UI.
- **In-memory data** — Reports reset on server restart (by design for demo stability; production path is a persistent store).
- **Gemini free tier** — The API key runs on the free plan (20 calls/day). Enable pay-as-you-go before heavy judging use.
- **Voice input** — Chrome/Edge best; partial Safari; absent in Firefox (button hides itself when unsupported).

---

> Internal project docs (agent onboarding, architecture decisions, vision): [`docs/`](docs/README.md)

*Built for Vibe2Ship 2026 · Problem Statement: Community Hero – Hyperlocal Problem Solver*  
*Stack: React 19 + Express + Gemini 2.5 Flash · Deployed via Google AI Studio / Cloud Run*
