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

---

## 🛠️ Architecture Decisions (Honest Disclosure)
1. **Lightweight In-Memory Simulation Storage**: For live judging and presentation reliability, the MVP utilizes a pre-seeded, high-fidelity in-memory database. This guarantees sub-millisecond query performance and protects against database connection timeouts. The backend interface is designed to be easily replaceable with Google Cloud Firestore or another persistent document store.
2. **Stylized Ward Operations Map**: To avoid reliance on brittle Google Maps API keys during hackathon presentations, NammaFix features a custom, interactive vector SVG-based map of Bangalore (North, Central, and South corridors) that maps citizen coordinate projections dynamically.
3. **Suggested Resolver Routing**: The system calculates a suggested resolver department (e.g., BESCOM, BWSSB, or BBMP SWD) based on Gemini classification and coordinates, providing a realistic routing preview without executing actual live municipal dispatches.

---

## 📦 Directory Structure
* `server.ts` - Node.js Express server acting as the Gemini API proxy, database store, and Vite middleware coordinator.
* `src/App.tsx` - Main layout coordinating dashboard operations, navigation, and API action logging.
* `src/components/` - Interactive React views:
  * `ReportIssueView.tsx` - Multimodal citizen reporting form with demo scenario presets.
  * `ActiveCaseView.tsx` - Active case inspector displaying AI Evidence, neighbor comments feed, Resolver Copilot, and Closure verification.
  * `CommunityMapView.tsx` - Stylized coordinate operations map.
  * `ImpactStats.tsx` - Metrics display with Gemini analytical summaries.
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
