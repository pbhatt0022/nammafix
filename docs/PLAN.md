# NammaFix AI — Execution Plan to Submission

> Roadmap to a submittable, working hackathon app. For current repo state see
> [PROJECT_STATE.md](PROJECT_STATE.md); for rationale see [DECISIONS.md](DECISIONS.md);
> the original product spec is [MVP_PLAN.md](MVP_PLAN.md).

Created 2026-06-24. Deadline **29 June 2026, 2:00 PM** (~5 days). No late entries.

## The one thing that matters most

The mandatory submission is a **public app deployed via Google AI Studio**. Everything else is
secondary. **Test the AI Studio deploy as a throwaway on Day 1** — if the Express+Vite structure
doesn't deploy, we need to know immediately, not on the last day.

## Mandatory submission checklist

- [ ] Deployed app link — deployed via **Google AI Studio**, public, stays live through judging
      (ref: https://ai.google.dev/gemini-api/docs/aistudio-deploying)
- [ ] Public **GitHub** repo (repo is not git-initialized yet)
- [ ] **Google Doc**: Problem Statement / Solution Overview / Key Features / Technologies Used /
      Google Technologies Utilized — accessible to anyone with the link
- [ ] Submit on **BlockseBlock**; **Final Submit is irreversible** — deploy final version first

## Where the points are (evaluation weights)

| Criterion | Weight | Our lever |
|---|---:|---|
| Problem Solving & Impact | 20% | Full report→closure lifecycle (built) |
| Agentic Depth | 20% | 4 Gemini functions + scoring; **add real duplicate detection** |
| Innovation & Creativity | 20% | Evidence Packet + Civic Karma + folk-tech identity |
| Usage of Google Technologies | 15% | Gemini multimodal; deploying on AI Studio counts |
| Product Experience & Design | 10% | Landing page already strong |
| Technical Implementation | 10% | Clean, working flow |
| Completeness & Usability | 5% | No-crash demo, seeded data |

60% is Problem-Solving + Agentic + Innovation. Don't over-invest in design (10%). Invest in a
**stable working agentic flow + a guaranteed deployment**.

## Priorities

### P0 — can't submit / can't demo without these
1. Deploy on Google AI Studio and verify the live URL works end-to-end.
2. `git init` + push to public GitHub.
3. Write the Google Doc (5 required sections).
4. Confirm cold-start behavior is demo-safe (seed data always reappears — see DECISIONS).

### P1 — best score-per-hour, all cheap
5. **Real `checkDuplicates()` on submit** (category + landmark/geo proximity + keyword overlap)
   + duplicate-warning UI. Feeds the 20% Agentic Depth; named example feature. ~1–2 hrs.
6. **Gemini JSON-parse fallbacks** on all 4 Gemini endpoints (plan's #1 risk).
7. **README** rewrite to match deployed reality, honest wording (no "legal evidence" / "govt integration").

### P2 — only if P0+P1 are locked
8. Downloadable Evidence Packet JSON · Kannada/Hindi one-line summary · demo video ·
   privacy flag on faces/number plates.

## Day-by-day (5 days)

- **Day 1 — De-risk deploy.** Throwaway AI Studio deploy of current app; confirm build + key
  injection. `git init` + push to GitHub. *If deploy fails, stop and adapt structure first.*
- **Day 2 — Strengthen agentic core.** `checkDuplicates()` + duplicate UI; JSON fallbacks.
- **Day 3 — Full-flow QA on the deployed URL.** Walk the whole journey, fix breakage,
  enrich seed data to 12–15 reports if thin.
- **Day 4 — Submission assets.** Google Doc, README, demo script (+ optional video), final polish.
- **Day 5 (buffer) — Final re-deploy, re-test all 3 links, then BlockseBlock Final Submit.**
  Keep a comfortable buffer before 2 PM.

## Risks

| Risk | Mitigation |
|---|---|
| AI Studio can't deploy Express+Vite as-is | Test Day 1; `.env.example` hints it was scaffolded from an AI Studio template |
| Gemini returns malformed JSON | Strict prompts + parser fallback to default fields |
| Scope creep (e.g. Firebase) | Frozen out — in-memory + seed is demo-sufficient (see DECISIONS) |
| Irreversible Final Submit | Deploy final, re-test links, submit with buffer |

## Explicitly NOT doing (per MVP plan + our decisions)

Real municipal API integration · MCP / agent runtimes · Firebase (for now) · legal/crypto
evidence claims · full multilingual voice · advanced RAG · public ward shaming. Don't add
features — make what exists deployed, stable, and submitted.
