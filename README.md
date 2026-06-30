# NammaFix AI

**Vibe2Ship 2026 Submission**  
**Problem Statement:** Community Hero - Hyperlocal Problem Solver

NammaFix AI is a Gemini-powered civic resolution platform for Indian neighborhoods. A citizen uploads a photo of a pothole, garbage pile, leaking pipe, or broken streetlight, and NammaFix turns that raw report into a structured **AI Evidence Packet**, checks for duplicates, routes it to the right civic department, gets neighbors to verify it, tracks it to closure, and rewards verified civic action with **Civic Karma**.

**Live demo:** https://nammafix-ai-564629031889.asia-southeast1.run.app  
**Repository:** https://github.com/pbhatt0022/nammafix

---

## Tech Highlights

- **6 Gemini-powered product flows** across intake, copilot, closure audit, translation, insights, and forecasting
- **7-language UI** for Indian users, plus live AI-content translation
- **Duplicate detection before filing** to reduce civic spam and cluster evidence
- **Map-first click-to-report flow** with place search, reverse geocoding, and prefilled report creation
- **Before/after closure verification** instead of trusting a manual "fixed" label
- **Voice input** for faster reporting in supported browsers
- **Predictive ward forecast** for hotspot and seasonal-risk detection

---

## Why This Stands Out

- **It solves for resolution, not just reporting.** NammaFix covers the full loop from citizen evidence to verified closure.
- **It shows real agentic depth.** Gemini is used across multiple stages of the product, not just as a chatbot add-on.
- **It is built for Indian civic realities.** Multilingual UI, voice input, ward-aware routing, and hyperlocal issue types make the product feel locally grounded.
- **It rewards signal over noise.** Duplicate detection, community verification, and Civic Karma push users toward useful civic action.

---

## Why This Matters

Most civic apps digitize the complaint. They do not improve the resolution loop.

In real neighborhoods, the same issue gets posted in WhatsApp groups, tweeted, and reported repeatedly with no shared evidence, no routing clarity, and no trustworthy closure proof. Citizens lose trust, authorities get noisy inputs, and urgent issues get buried.

NammaFix AI is built to solve that gap:

- Turn unstructured reports into structured, resolver-ready evidence
- Reduce duplicate noise before it reaches the system
- Add community verification instead of single-user claims
- Make closure provable with before/after AI review
- Reward useful civic participation, not complaint spam

---

## The Magic Moment

**Photo -> AI Evidence Packet -> Duplicate Check -> Community Verification -> Civic Dispatch Ticket -> Closure Proof -> Civic Karma**

The core product experience is simple:

1. A citizen uploads an image and a short description.
2. Gemini analyzes the issue and generates a structured packet with category, severity, confidence, risk, evidence observed, and recommended next action.
3. NammaFix checks whether the issue already exists nearby.
4. The issue gets routed into a ward-aware civic dispatch flow.
5. Neighbors can verify the issue and strengthen its priority.
6. A closure photo is audited against the original before the issue is truly marked resolved.

This turns a civic issue from a dead-end complaint into a living, trackable workflow.

---

## What We Built

### 1. AI Evidence Packet
Gemini 2.5 Flash converts a messy citizen submission into a structured municipal-quality docket:

- issue title
- category and sub-category
- severity and severity score
- AI confidence
- public risk summary
- evidence observed from the image
- suggested resolver
- recommended next action

### 2. Duplicate Detection Before Filing
Before creating a new report, NammaFix runs a low-cost rule-based duplicate gate using:

- category match
- geo proximity
- keyword overlap

If a similar issue already exists nearby, the citizen can merge into that case instead of creating more noise.

### 3. Auto-Routed Civic Dispatch Ticket
Every report gets a **routing ticket** with:

- department
- division
- ward
- channel
- SLA
- dispatch note

NammaFix makes an **agentic routing decision automatically** and produces a **resolver-ready dispatch ticket**. In this MVP, the final handoff into live municipal systems is simulated.

### 4. Community Verification Loop
Neighbors can confirm, flag, or add photo-based evidence. Verification raises the confidence and priority of real issues and helps move them toward action.

### 5. Resolver Copilot
Admins can run a Gemini copilot that produces:

- recommended action
- suggested department
- escalation signal
- citizen-facing update
- SLA risk

### 6. Closure Verification
NammaFix does not trust a manual "fixed" label. Gemini compares the **before** and **after** images and returns:

- `Verified Resolved`
- `Partially Resolved`
- `Unresolved`
- `Unclear`

### 7. Civic Karma Passbook
Users earn karma for:

- filing quality reports
- adding meaningful verification
- confirming real closures

This encourages civic contribution, not spammy reporting volume.

### 8. Impact Dashboard + Forecast
The dashboard shows open, verified, high-risk, and resolved issues, then uses Gemini to generate:

- ward-level insight summaries
- hotspot forecasts
- seasonal risk signals
- recommended community missions

### 9. Built for Indian Streets
NammaFix supports:

- 7-language UI
- live AI-content translation
- voice input for report fields
- map-first reporting by clicking a location and starting a prefilled issue from there
- mobile-first reporting flow
- an Indian folk-tech visual identity instead of generic SaaS styling

### 10. Map-First Report Creation
NammaFix now supports a more natural reporting flow directly from the map:

- floating place search over the live civic map
- India-focused location search results
- click anywhere on the map to drop a report pin
- reverse-geocoded landmark lookup
- one-click handoff into the report form with prefilled coordinates and place name

This makes the app feel much closer to how real citizens think: first identify the place, then file the issue.

---

## Screenshots

Add these 3 screenshots before final submission so judges can scan the product in seconds:

1. **Citizen reporting flow**  
   Upload image -> AI Evidence Packet -> duplicate warning
2. **Active case view**  
   Routing ticket, verification status, and closure audit result
3. **Impact + Karma dashboard**  
   Ward insights, hotspot forecast, and Civic Karma profile

Recommended paths once exported:

- `docs/screenshots/report-flow.png`
- `docs/screenshots/active-case.png`
- `docs/screenshots/impact-dashboard.png`

---

## Agentic Depth

This project is not a single prompt wrapped in a UI. It uses multiple AI-backed workflow steps across the issue lifecycle.

### Gemini-backed flows in the shipped app

1. **Issue intake analysis**  
   Image + text -> structured AI Evidence Packet
2. **Resolver Copilot**  
   Case context -> routing note, action, escalation, citizen update
3. **Closure audit**  
   Before + after images -> closure verdict
4. **Live translation**  
   AI-generated packet content -> selected language
5. **Impact summary**  
   Active reports -> ward-level operational insight
6. **Predictive forecast**  
   Report patterns -> hotspot and seasonal-risk forecast

### Non-AI workflow layers that make the system practical

- duplicate gate before filing
- ward lookup and dispatch ticket generation
- verification scoring
- status timeline
- notification loop
- karma and badges

That mix is intentional: AI where reasoning helps, deterministic logic where trust and cost control matter.

---

## Why NammaFix Stands Out

### Problem Solving & Impact
NammaFix improves the full civic lifecycle: report, verify, route, track, and close.

### Agentic Depth
The product uses Gemini across intake, admin assistance, closure audit, translation, analytics, and forecasting rather than a single chatbot surface.

### Innovation & Creativity
The combination of **AI Evidence Packets**, **community verification**, **closure proof**, and **Civic Karma** creates a stronger accountability loop than a standard issue-reporting app.

### Usage of Google Technologies
Google AI Studio and Gemini are central to both development and the core product workflow, not just added as a side feature.

### Product Experience & Design
The UI is multilingual, mobile-friendly, and visually tailored for Indian civic use cases rather than generic enterprise dashboards.

---

## Google Technologies Used

| Technology | Usage |
|---|---|
| **Gemini 2.5 Flash** | Multimodal issue analysis, resolver copilot, closure verification, translation, impact summary, predictive forecast |
| **Google AI Studio** | Core AI development workflow and deployment path |
| **Cloud Run** | Hosted deployed application |
| **Web Speech API** | Voice input in supported browsers for multilingual reporting |

---

## Architecture

```text
Citizen Photo + Description
  -> Gemini Intake Analysis
  -> AI Evidence Packet
  -> Duplicate Gate
  -> Routing Ticket
  -> Community Verification
  -> Resolver Copilot
  -> Closure Audit
  -> Impact Dashboard + Forecast
```

### Stack

- **Frontend:** React 19, Vite 6, Tailwind CSS v4
- **Backend:** Express + TypeScript
- **AI:** `@google/genai` with Gemini 2.5 Flash
- **Maps:** Leaflet + OpenStreetMap
- **Localization:** custom 7-language i18n layer
- **Data:** in-memory seeded demo store

---

## Demo Walkthrough

For a 3-4 minute hackathon demo:

1. Start on the landing page and switch the UI language.
2. Open the map, search a place or click a point on the map, and launch a report from that location.
3. Report a civic issue with an image.
4. Show the generated AI Evidence Packet.
5. Demonstrate duplicate detection by trying a nearby similar report.
6. Add a community verification.
7. Open the resolver copilot output.
8. Upload closure proof and show the before/after Gemini audit.
9. Open the Civic Karma profile and impact dashboard.
10. Run the hotspot forecast.

---

## Local Setup

```bash
git clone https://github.com/pbhatt0022/nammafix
cd nammafix
npm install
npm run dev
```

Create a `.env` file with:

```bash
GEMINI_API_KEY="YOUR_KEY_HERE"
```

The app runs at `http://localhost:3000`.

If no real Gemini key is present, NammaFix falls back to **Simulated AI Mode** so the full product flow still works for local exploration.

---

## Honest Boundaries

- **Routing is agentic, but handoff is simulated.** NammaFix makes an agentic routing decision automatically and produces a resolver-ready dispatch ticket, but does not yet submit into live BBMP/BWSSB/BESCOM systems.
- **Data is in-memory.** Reports reset on restart to keep the demo stable and setup-free.
- **Voice input depends on browser support.** Best on Chrome/Edge.
- **The live product is Bengaluru-shaped today.** The workflow is extensible, but current routing logic is optimized for the hackathon demo.

These are deliberate MVP boundaries, not hidden limitations.

---

## Future Scope

- **Real municipal system integration**  
  Connect routing tickets to live BBMP, BWSSB, BESCOM, or grievance-portal workflows and track official ticket IDs back into NammaFix.
- **Persistent city-scale data layer**  
  Move from in-memory demo data to durable storage so reports, karma, verifications, and closure history survive restarts and scale across wards.
- **Passive civic signals from public forums**  
  Not everyone thinks to open an app. Many residents first vent on city Reddit pages or public community forums. NammaFix can ingest those public signals, extract likely issue summaries such as "We heard about a waterlogging issue near X," and push them as confirmation prompts to nearby users: **"We heard about this issue here. Can you confirm?"**
- **Expanded multilingual access**  
  Grow from the current 7-language UI toward broader Indian language coverage, including stronger voice-first flows for low-literacy or on-the-move users.
- **City expansion beyond Bengaluru**  
  Generalize the routing layer from Bengaluru wards to other Indian cities using jurisdiction-aware resolver directories, geocoding, and local civic department mappings.
- **Preventive maintenance recommendations**  
  Use repeated issue clusters, seasonal patterns, and closure timelines to suggest pre-emptive ward actions such as monsoon drain clearing, school-zone pothole repair, or streetlight audits.
- **Public accountability and ward insights**  
  Add city and ward transparency views showing recurring issue categories, average time-to-resolution, verification participation, and closure quality trends.
- **Trust and evidence hardening**  
  Strengthen report authenticity with metadata checks, image provenance signals, optional privacy protections like face/plate blurring, and stronger audit trails for closure proof.
- **Community missions and neighborhood campaigns**  
  Extend Civic Karma into structured hyperlocal missions such as "Drain Watch Week" or "School Safety Route Audit" so residents can collaborate around preventive civic action, not only report isolated complaints.

---

## Acknowledgements

This project was built with help from open-source tools, MCPs, and design inspiration that shaped both the engineering process and the product experience:

- [Ponytail](https://github.com/DietrichGebert/ponytail) for pushing the build toward simpler, higher-signal decisions and avoiding unnecessary complexity.
- [Playwright](https://playwright.dev/) and [Playwright MCP](https://playwright.dev/) for browser automation, UI verification, and fast end-to-end iteration during development.
- [Impeccable](https://impeccable.style/) for product and design quality guidance across polish, structure, and usability.
- [Emil Kowalski](https://emilkowal.ski/) for UI and interaction inspiration, especially around taste, motion, and interface clarity.

---

## Submission Summary

**NammaFix AI** is a civic-resolution workflow, not just a reporting form. It combines multimodal Gemini analysis, structured evidence, community validation, resolver assistance, closure auditing, multilingual UX, and civic incentives into one end-to-end product designed for hyperlocal impact.

If existing civic apps help people complain, NammaFix helps communities actually get things fixed.
