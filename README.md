# NammaFix AI - Civic Resolution Layer (Vibe2Ship 2026 MVP)

NammaFix AI is a Gemini-powered civic resolution layer designed to streamline hyperlocal problem solving. By converting unstructured citizen reports (images + text) into prioritized, structured AI Evidence Packets, facilitating neighborhood validation, providing a Resolver Copilot for dispatchers, and auditing task completion via multimodal before-and-after photo comparisons, NammaFix AI demonstrates how AI can introduce efficiency, transparency, and accountability to community civic action.

> 📁 **Contributors / agents:** project state, plan, and decisions live in [`docs/`](docs/README.md) — start with [docs/PROJECT_STATE.md](docs/PROJECT_STATE.md).

---

## 🚀 Key Google Technologies Used
NammaFix AI integrates the latest **Google AI SDK** to power its multi-stage agentic workflow:
* **Google AI Studio**: Platform used to prototype, test, and optimize system instructions and JSON schemas.
* **Gemini API via `@google/genai` SDK**: Utilizes `gemini-2.5-flash` for high-speed, cost-effective, and highly capable text and multimodal processing.
* **Gemini Multimodal Intake**: Analyzes citizen photos and descriptions to automatically extract categories, subcategories, severity scores, and public safety risk bounds.
* **Gemini Resolver Copilot**: Generates step-by-step physical task recommendations, suggested departments, and structured communication updates.
* **Gemini Multimodal Closure Verification**: Compares "Before" reported issues with "After" contractor resolution photos to audit and confirm work quality.
* **Gemini Analytical Insights**: Aggregates community report data to generate localized, two-sentence executive safety briefs for municipal dashboards.
* **Gemini-Powered Multilingual UI**: The interface is available in **7 languages** (English + Hindi, Kannada, Tamil, Telugu, Bengali, Marathi). UI strings are pre-translated by Gemini and served statically (no runtime cost); AI Evidence Packets can also be translated live on demand.
* **Deployed on Google AI Studio → Cloud Run**: built and deployed through the Google AI Studio app pipeline.

---

## ✨ Product Features
* **Bharat Civic Folk-Tech identity**: a warm, Indian-first landing page + cohesive folk-tech dashboard (not a generic SaaS / Western-311 clone).
* **Real duplicate detection**: nearby similar issues are flagged on submit (category + geo proximity + keyword overlap) to cut noise.
* **Auto-routing & Civic Dispatch Ticket**: each issue is routed to the responsible department + ward with a target SLA and dispatch note (mock resolver directory — see honest disclosure).
* **Voice input**: dictate reports and verifications by voice (browser-native, language-aware).
* **Community verification, Civic Karma, badges & missions**: rewards verified contribution, not complaint volume.

---

## 🛠️ Architecture Decisions (Honest Disclosure)
1. **Lightweight In-Memory Simulation Storage**: For live judging and presentation reliability, the MVP utilizes a pre-seeded, high-fidelity in-memory database. This guarantees sub-millisecond query performance and protects against database connection timeouts. The backend interface is designed to be easily replaceable with Google Cloud Firestore or another persistent document store.
2. **Stylized Ward Operations Map**: To avoid reliance on brittle Google Maps API keys during hackathon presentations, NammaFix features a custom, interactive vector SVG-based map of Bangalore (North, Central, and South corridors) that maps citizen coordinate projections dynamically.
3. **Auto-Routing via a Mock Resolver Directory**: The system routes each issue to a responsible department (e.g., BESCOM, BWSSB, BBMP SWD/Roads) and ward based on Gemini classification + coordinates, generating a resolver-ready "Civic Dispatch Ticket" with a target SLA. This is a **mock directory for the demo** — a routing preview, not a live municipal dispatch. The production path is live Google Maps geocoding against a municipal jurisdiction database.
4. **Translation Engine**: Multilingual UI uses **Gemini** (no extra API key); strings are pre-generated and committed, so the running app makes no translation calls for chrome. The unofficial Google-Translate web proxy was deliberately avoided (unreliable / ToS issues); Bhashini (Govt. of India NLTM) is the intended production path.

---

## 📦 Directory Structure
* `server.ts` - Node.js Express server acting as the Gemini API proxy, database store, and Vite middleware coordinator.
* `src/App.tsx` - Main layout coordinating dashboard operations, navigation, and API action logging.
* `src/Root.tsx` - Top-level view switch between the landing page and the dashboard app; wraps both in the language provider.
* `src/components/` - Interactive React views:
  * `ReportIssueView.tsx` - Multimodal citizen reporting form with demo scenario presets and voice input.
  * `ActiveCaseView.tsx` - Active case inspector: AI Evidence, neighbor feed, Resolver Copilot, Closure verification, auto-routed Dispatch Ticket, live packet translation.
  * `CommunityMapView.tsx` - Stylized coordinate operations map.
  * `ImpactStats.tsx` - Metrics display with Gemini analytical summaries.
* `src/landing/` - The "Bharat Civic Folk-Tech" landing page and its reusable folk-doodle components.
* `src/i18n/` - Multilingual layer: `en.json` (source) + Gemini-generated `translations.json`, `useT()` provider, `LanguageSelector`, `TranslatePacket` (live), `MicButton` (voice).
* `scripts/gen-i18n.mjs` - One-off script to (re)generate translations from `en.json` via Gemini.
* `src/types.ts` - TypeScript interface definitions ensuring data-model consistency.
* `src/data/mockReports.ts` - Mock data seeding for reports, events, verifications, and user civic karma.

---

## 🛠️ Local Installation & Setup

### Prerequisites
* **Node.js** (v18 or higher recommended)
* A **Gemini API Key** from [Google AI Studio](https://aistudio.google.com/)

### Steps
1. **Clone the Repository** and navigate to the project directory.
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your Gemini API Key:
   ```env
   GEMINI_API_KEY="your-actual-api-key-here"
   NODE_ENV="development"
   ```
4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your web browser.

5. **Production Build & Run**:
   To compile and run the self-contained production bundle:
   ```bash
   npm run build
   ```
   This will output built client files to `dist/` and compile the backend to `dist/server.cjs` via `esbuild`. Start the production server using:
   ```bash
   npm run start
   ```

---

## 🔄 End-to-End Demo Journey (How to Present)
1. **Intake**: Navigate to the dashboard. Click **Report New Spot**. Select **Preset 1 (Pothole)** to auto-fill the forms, and click **Analyze and Review with Gemini**. Gemini will generate a structured AI Evidence Packet with a Severity Score, safety risks, and recommended actions.
2. **Community Check**: View the active report on the dashboard. Add a neighbor comment and click **Confirm Active**. Watch the verification score rise and the priority percentage update.
3. **Admin Routing**: Click **Inspect Dispatch** at the bottom of the page. Gemini's Resolver Copilot will formulate routing notes. Click **Approve Routing** to assign a suggested agency (e.g. BBMP Ward Engineering).
4. **Resolution Verification**: Under **Upload Closure Proof**, select **Scenario 1 (Pothole Filled)** and click **Verify Closure with Gemini**. Gemini compares the "Before" pothole with the "After" patch and updates the status to **Resolved**, awarding the citizen **40 Civic Karma points**.
5. **Impact Dashboard**: Check the stats cards and read the **Gemini Analytical Summary** summarizing the updated community impact.
