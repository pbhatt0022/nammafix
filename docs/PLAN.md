# NammaFix AI — Execution Plan to Submission

> Roadmap to a submittable, working hackathon app. For current repo state see
> [PROJECT_STATE.md](PROJECT_STATE.md); for rationale see [DECISIONS.md](DECISIONS.md);
> the original product spec is [MVP_PLAN.md](MVP_PLAN.md).

Created 2026-06-24. Updated 2026-06-30. Deadline **29 June 2026, 2:00 PM**.

## Mandatory submission checklist

- [~] Deployed app link — first deploy live at
      `https://nammafix-ai-564629031889.asia-southeast1.run.app`. **Needs a re-deploy** with the
      latest code (duplicate merge + QA i18n pass + ponytail cleanup committed 2026-06-30).
      (ref: https://ai.google.dev/gemini-api/docs/aistudio-deploying)
- [x] Public **GitHub** repo — `https://github.com/pbhatt0022/nammafix` ✅ up to date
- [ ] **Google Doc**: Problem Statement / Solution Overview / Key Features / Technologies Used /
      Google Technologies Utilized — accessible to anyone with the link
- [ ] Submit on **BlockseBlock**; **Final Submit is irreversible** — deploy final version first

## Where the points are (evaluation weights)

| Criterion | Weight | Our lever |
|---|---:|---|
| Problem Solving & Impact | 20% | Full report→closure lifecycle ✅; auto-routing to dept/ward ✅; predictive forecast ✅ |
| Agentic Depth | 20% | 6 distinct Gemini calls (intake, copilot, closure, impact, forecast, translation) ✅ |
| Innovation & Creativity | 20% | Evidence Packet + Civic Karma + folk-tech identity + 7-language i18n + voice input + cluster merge ✅ |
| Usage of Google Technologies | 15% | Gemini 2.5 Flash multimodal + Gemini-generated translations + deployed on AI Studio ✅ |
| Product Experience & Design | 10% | Folk-tech landing + cohesive dashboard + mobile-responsive + notification bell ✅ |
| Technical Implementation | 10% | Clean, working flow; dead-code audited (ponytail) ✅ |
| Completeness & Usability | 5% | No-crash demo, error boundary, seeded data, 7-language UI ✅ |

The feature surface is strong across all criteria. **The only remaining risk is submission logistics.**

## What's been built (all committed as of 2026-06-30)

- Landing page (8-section folk-tech, full i18n)
- Citizen report form → Gemini multimodal → AI Evidence Packet
- Pre-flight duplicate detection (Haversine + category + keyword, zero Gemini quota)
- Duplicate cluster merge flow (evidence added to existing cluster)
- Auto-routing → Civic Dispatch Ticket (dept + ward + SLA + Gemini dispatch note)
- Resolver Copilot (Gemini routing note + SLA risk assessment)
- Before/after closure verification (Gemini multimodal comparison)
- Impact stats + on-demand Predictive Forecast
- Notification bell + resolution toast (citizen resolution loop)
- Civic Karma Passbook (rank, badges, contribution history)
- Leaflet map with heatmap toggle + markercluster
- App-wide i18n: 7 languages, 230 keys — all UI strings, errors, loading steps
- Voice input on report description, landmark, verification comment
- Live AI-content translation (TranslatePacket)
- Error boundary + mobile-responsive layout
- Full ponytail dead-code audit + cleanup
- Judge-facing README rewrite
- PROJECT_STATE + PLAN updated

## What still needs to happen

1. **Re-deploy to AI Studio** — build a ZIP and upload via AI Studio Publish so the live URL
   reflects the 2026-06-30 commits. (All of the above is committed to GitHub but not yet deployed.)
2. **Write the Google Doc** (5 required sections):
   Problem Statement / Solution Overview / Key Features / Technologies Used / Google Technologies Utilized
3. **Enable Gemini billing** — pay-as-you-go on the API key so judge click-throughs don't exhaust
   the 20/day free cap.
4. **BlockseBlock Final Submit** (irreversible — do this last, after deploy + re-test).

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
