# NammaFix AI — Execution Plan to Submission

> Roadmap to a submittable, working hackathon app. For current repo state see
> [PROJECT_STATE.md](PROJECT_STATE.md); for rationale see [DECISIONS.md](DECISIONS.md);
> the original product spec is [MVP_PLAN.md](MVP_PLAN.md).

Created 2026-06-24. Updated 2026-06-27. Deadline **29 June 2026, 2:00 PM**. No late entries.

## The one thing that matters most

The mandatory submission is a **public app deployed via Google AI Studio**. The deploy path is
**proven** — a first version is live on Cloud Run (re-sync via AI Studio's *Publish → GitHub* or by
uploading a source ZIP into the AI Studio editor, then **Publish/Deploy**). The remaining job is to
**re-deploy the latest build** and lock the three submission links. Don't let the live URL drift
behind the code again before Final Submit.

## Mandatory submission checklist

- [~] Deployed app link — deployed via **Google AI Studio** (first deploy live at
      `https://nammafix-ai-564629031889.asia-southeast1.run.app`). **Needs a re-sync + re-deploy**
      so the live URL reflects the latest build. (ref: https://ai.google.dev/gemini-api/docs/aistudio-deploying)
- [x] Public **GitHub** repo — `https://github.com/pbhatt0022/nammafix` (push remaining work)
- [ ] **Google Doc**: Problem Statement / Solution Overview / Key Features / Technologies Used /
      Google Technologies Utilized — accessible to anyone with the link
- [ ] Submit on **BlockseBlock**; **Final Submit is irreversible** — deploy final version first

## Where the points are (evaluation weights)

| Criterion | Weight | Our lever |
|---|---:|---|
| Problem Solving & Impact | 20% | Full report→closure lifecycle ✅; auto-routing to dept/ward ✅ |
| Agentic Depth | 20% | 4 Gemini functions + scoring + **real duplicate detection** ✅ + **auto-routing** ✅ |
| Innovation & Creativity | 20% | Evidence Packet + Civic Karma + folk-tech identity + **7-language i18n** + **voice input** |
| Usage of Google Technologies | 15% | Gemini multimodal + Gemini-powered translation; deploying on AI Studio counts |
| Product Experience & Design | 10% | Landing + cohesive folk-tech dashboard ✅ |
| Technical Implementation | 10% | Clean, working flow; dead-code audited ✅ |
| Completeness & Usability | 5% | No-crash demo, seeded data, multilingual ✅ |

60% is Problem-Solving + Agentic + Innovation. The feature surface is now strong; **the remaining
risk is entirely submission readiness (re-deploy + Google Doc) and the Gemini quota.**

## Priorities (updated 2026-06-27)

### Done this build cycle ✅
- Real `checkDuplicates()` on submit (category + geo + keyword).
- Auto-routing → Civic Dispatch Ticket (mock resolver directory + ward lookup + SLA).
- Folk-tech design pass — cohesive warm dashboard, AA contrast, PRODUCT.md + DESIGN.md.
- App-wide i18n: 7 languages across landing + every dashboard screen (static, Gemini-generated).
- Live Gemini translation of AI content; voice input (Web Speech) on text fields.
- Dead-code audit + cleanup (ponytail).
- GitHub repo created + initial push.

### P0 — to submit
1. **Commit the latest batch + push.** (design, duplicate, routing, i18n, voice, cleanup)
2. **Re-sync to AI Studio + re-deploy** so the live URL is current; verify end-to-end.
3. **Write the Google Doc** (5 required sections).
4. **Lift the Gemini quota** — enable pay-as-you-go billing and/or an `AIzaSy…` key, so judge
   click-throughs don't exhaust the 20/day free cap.

### P1 — if time
5. Gemini JSON-parse fallbacks on the AI endpoints (robustness).
6. README polish to match the now-richer feature set (honest wording).

### P2 — optional
7. Downloadable Evidence Packet JSON · demo video · privacy flag on faces/number plates ·
   Bhashini as the production translation story (talking point, not built).

## Remaining timeline (deadline 29 Jun, 2:00 PM)

- **Now → next:** commit + re-deploy + Google Doc + enable billing. These are the whole submission.
- **Then:** full-flow QA on the *deployed* URL in 1–2 languages; optional robustness/polish.
- **Before 2 PM on the 29th (buffer):** final re-deploy, re-test all 3 links, BlockseBlock Final Submit.

## Risks

| Risk | Mitigation |
|---|---|
| **Gemini free-tier 20/day quota** exhausts during judging | **Enable pay-as-you-go billing** and/or use an `AIzaSy…` key. UI translation is static (no quota), but evidence-packet / copilot / closure / live-translate all spend requests. *Top current risk.* |
| Live URL drifts behind code | Re-deploy after each meaningful batch; final re-deploy right before Final Submit |
| Gemini returns malformed JSON | Strict prompts + responseMimeType json; add parser fallback to default fields (P1) |
| Scope creep (e.g. Firebase) | Frozen out — in-memory + seed is demo-sufficient (see DECISIONS) |
| Irreversible Final Submit | Deploy final, re-test all 3 links, submit with buffer |

## Explicitly NOT doing (per MVP plan + our decisions)

Real municipal API integration · MCP / agent runtimes · Firebase (for now) · legal/crypto
evidence claims · advanced RAG · public ward shaming · the unofficial Google-Translate proxy
(unreliable; see DECISIONS). Don't add features — make what exists deployed, stable, and submitted.

> Note: "full multilingual interface" was originally on the *don't-build* list, but we shipped a
> scoped, reliable version (static Gemini-generated strings + live content translation). See DECISIONS D-009.
