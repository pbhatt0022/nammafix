# NammaFix AI — Ideal Final State (North Star)

> The full vision for NammaFix AI, beyond the hackathon MVP. Everything we've discussed lives here —
> including the parts flagged as hard, out-of-scope, or "production-only." This is the destination;
> [PLAN.md](PLAN.md) is the next few steps, [PROJECT_STATE.md](PROJECT_STATE.md) is where we are today.
>
> Legend: ✅ shipped · 🟡 partial / mock · 🔭 aspirational (not built) · ⚠️ honest-disclosure boundary.

## The one-line dream

A citizen anywhere in India notices a civic problem, reports it in seconds (by photo, text, or voice
in their own language), and NammaFix turns it into structured AI evidence, routes it to the *actual*
responsible authority, mobilises neighbours to verify it, tracks it transparently to a *proven* fix,
and tells the reporter the moment it's resolved — rewarding real civic contribution along the way.

---

## 1. Intake — report from anywhere, in any language

- ✅ Photo + description + location → **AI Evidence Packet** (Gemini multimodal).
- ✅ **Voice input** (Web Speech) on text fields, language-aware.
- ✅ **7-language UI** (English + Hindi, Kannada, Tamil, Telugu, Bengali, Marathi).
- 🔭 **Cross-browser, robust voice** via Gemini audio transcription (handles accents/dialects where
  Web Speech is weak); voice-first flow for low-literacy users. *Difficulty: moderate; cost: spends Gemini quota.*
- 🔭 **All 22 official languages** + dialects, ideally via **Bhashini** (Govt. of India National
  Language Translation Mission) for production-grade civic coverage. *Difficulty: moderate; needs ULCA/Bhashini registration.*
- 🔭 **Privacy guard**: auto-detect and blur faces / number plates in uploaded photos before storage. *Difficulty: moderate.*

## 2. Understanding — structured, honest AI evidence

- ✅ Category, sub-category, severity, confidence, public-risk, evidence-observed, missing-info,
  recommended next action.
- ✅ **Live translation** of the packet into the user's language on demand.
- 🔭 Gemini **JSON-parse fallbacks** everywhere so a malformed response never breaks the flow. *Difficulty: low; should-do.*
- 🔭 **Downloadable / shareable evidence packet** (JSON + a public report link). *Difficulty: low.*

## 3. De-duplication — cut the noise

- ✅ **Real `checkDuplicates()`** on submit (category + Haversine geo proximity + keyword overlap),
  with a "similar issue(s) nearby" warning.
- 🔭 **Cluster merging**: fold duplicates into one issue cluster with combined evidence and a single
  authority thread (the `Cluster` type already exists). *Difficulty: moderate.*

## 4. Routing — get it to the right authority, for real

- 🟡 ⚠️ **Auto-routing → Civic Dispatch Ticket**: maps category → department (BBMP/BWSSB/BESCOM…) +
  ward, with target SLA and dispatch note. **Today this is a mock resolver directory** with
  hardcoded Bangalore ward bounding boxes — a routing *preview*, not a live dispatch.
- 🔭 **Real geocoding**: live **Google Maps Geocoding API** → an actual **municipal jurisdiction /
  ward-boundary database** covering many cities, so any address routes correctly (not just Bangalore). *Difficulty: 4–6h + data sourcing.*
- 🔭 ⚠️ **Actual ticket submission**: file the issue into the real municipal system (e.g. BBMP
  Sahaaya, BWSSB, state grievance portals) via their APIs, and **track the official ticket back**.
  *This is the big one — real government integration. Out of scope for the MVP; the honest boundary
  is "resolver-ready routing note," never "integrated with municipal systems" until it truly is.*

## 5. Community — verified by neighbours, not one uploader

- ✅ Witness-slip verification ("I saw this too / still active / looks fixed / needs recheck"),
  verification score, threshold-driven status auto-milestones.
- 🔭 **Forum/Reddit ingestion**: not everyone opens an app — many people just *vent* on city
  subreddits and local groups. Scrape/listen to those public posts, NLP-extract candidate issues,
  and surface them to nearby users as **"We heard about XYZ near here — can you confirm?"** prompts,
  turning passive complaints into verified, located reports. *Difficulty: high (API auth, NLP,
  matching, ToS care); strong differentiator — a v2 headline feature, demo as a talking point now.*

## 6. Resolution & closure — prove it's actually fixed

- ✅ Status timeline (Submitted → AI Reviewed → Community Verified → Routed → In Progress → Resolved).
- ✅ **Resolver Copilot** (Gemini) suggests the next action / routing note.
- ✅ **Before/after closure verification** (Gemini multimodal): Resolved / Partial / Unresolved / Unclear.
- 🔭 **Close the loop to the citizen**: notify the original reporter (and verifiers) the moment their
  issue is marked resolved — "your pothole near the school gate was fixed; here's the proof."
  *Difficulty: low–moderate (needs a notification channel + real persistence).*

## 7. Transparency & impact

- ✅ Ward impact dashboard (open / verified / resolved / high-risk, avg time-to-verification),
  Gemini analytical summary, missions.
- 🔭 **Real Google Maps visualization**: replace the stylized SVG map with live Google Maps pins /
  heatmap of report density. *Difficulty: 2–3h; adds Google-tech weight; needs a Maps key.*
- 🔭 **Predictive insights**: Gemini-generated hotspot / "monsoon risk" forecasts ("these 3 drains
  near you flood every June — flag them now"). *Difficulty: low–moderate.*

## 8. Engagement — reward contribution, not noise

- ✅ Civic Karma, badges, local missions; rewards verified evidence/closure, not complaint volume.
- 🔭 Ward leaderboards done *responsibly* (celebrate fixers, never shame areas — explicitly avoided
  as ward-shaming). *Difficulty: low; design-sensitive.*

## 9. Platform & reliability (the unglamorous foundation)

- 🟡 **Data**: in-memory + seed today (resets on restart — deliberate for the demo, see D-005).
  🔭 Real persistence (Firestore + Storage) so reports, karma, and tickets survive. *Difficulty: moderate.*
- 🟡 **AI quota**: Gemini free tier = 20 req/day on the current key. 🔭 **Pay-as-you-go billing** (and
  an `AIzaSy…` key) for judging-proof, then scale. *Difficulty: low; ⚠️ needed before judging.*
- ✅ **Deployed via Google AI Studio → Cloud Run** (first version live; keep the URL current).
- 🔭 **Mobile / PWA**, offline-capable reporting (capture now, sync later). *Difficulty: moderate.*

## 10. Brand & polish

- ✅ "Bharat Civic Folk-Tech" identity across landing + dashboard; hand-drawn SVG hero.
- 🔭 **Higgsfield painterly hero art** swapped in (one-line via `heroImage` in `landing/assets.ts`;
  the SVG stays as the permanent fallback — see D-004). *Blocked earlier on Higgsfield account/credits.*
- 🔭 **3–5 min demo video** walkthrough for the submission. *Difficulty: low.*

---

## How this maps to "now"

The MVP deliberately ships **honest, mock, or scoped** versions of the hard items (routing, multilingual,
voice, persistence) so the demo is reliable and nothing is overclaimed. The line we hold: **"resolver-ready
routing note," "mock resolver directory," "simulated database"** — never "integrated with municipal
systems" or "autonomous government action" until those are real. Everything marked 🔭 above is a genuine,
discussed next step, not vapor — most are achievable; the two genuinely hard ones are **real municipal API
dispatch** (§4) and **forum ingestion** (§5), which are the v2 headline bets.
