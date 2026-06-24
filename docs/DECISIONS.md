# NammaFix AI — Decisions & Rationale

> Why the project is the way it is. Lightweight ADR log. Newest at top.
> If you're an agent about to "improve" something here, read the rationale first —
> several of these are deliberate and reversing them re-introduces known risk.

---

## D-007 · Docs live in `/docs`, README stays at root
**Decision:** All project markdown except `README.md` lives in `/docs`. README stays at repo root.
**Why:** GitHub renders the root README on the repo landing page; moving it breaks that convention
and the hackathon expects a discoverable README. Everything else (plan, decisions, state, MVP spec)
is reference material and belongs together in `/docs`.

## D-006 · Strengthen duplicate detection; keep it rule-based
**Decision:** Add a real `checkDuplicates()` that runs on report submit, using category match +
landmark/geo proximity + keyword overlap. Do NOT use a vector DB or an LLM-judge for it.
**Why:** Duplicate handling is a named example feature and feeds the 20% Agentic Depth score, but
it's currently only cosmetic (labels + types, no logic). Rule-based is cheap (~1–2 hrs), explainable,
and demo-stable. Vector/LLM approaches add cost and flakiness for no judging upside at this scale.
**Status:** Planned (P1), not yet built.

## D-005 · In-memory data store, seeded — no Firebase, no JSON/SQLite
**Decision:** Keep the in-memory `database` object in `server.ts`, seeded from
`src/data/mockReports.ts`. No external persistence.
**Why:** The original MVP plan suggested Firebase, but on a 5-day clock with a mandatory Google AI
Studio deployment, adding a database is multi-hour risk for little judging value. Seed data always
reappears on boot, so the demo is fully populated and stable. Trade-off: reports created during
judging don't survive a cold start — acceptable for a demo, and called out honestly.
**Reconsider if:** deployment requires persistence, OR judges are told data persists. On Cloud Run,
a JSON-file store may not survive the ephemeral filesystem anyway — verify before relying on it.

## D-004 · Hero illustration is SVG; raster (Higgsfield) is an additive swap
**Decision:** The hero is hand-drawn inline SVG (`DoodleHero.tsx`). A generated raster can be
dropped in by setting `heroImage` in `landing/assets.ts`; the SVG stays as the permanent fallback.
**Why:** SVG is on-palette, themeable, weightless, and unblocked. Higgsfield generation was blocked
(the OAuth account returns "User not found" — no provisioned Higgsfield user). User explicitly wants
the SVG kept even after trying Higgsfield, so the swap must never delete the SVG branch.

## D-003 · Landing page fronts the existing app via a view switch
**Decision:** `Root.tsx` toggles between the new `Landing` and the existing `App` dashboard.
Landing CTAs deep-link via an `onEnter(intent)` callback (report vs. map); the app's logo returns
home. `App.tsx` gained optional props (`initialTab`, `startReporting`, `onHome`) whose defaults
preserve the original behavior.
**Why:** Adds the landing page with zero changes to app/backend logic and no router dependency —
shortest, lowest-risk integration.

## D-002 · Visual identity: "Bharat Civic Folk-Tech"
**Decision:** Warm Indian civic palette (turmeric cream + civic indigo base; saffron/marigold/
peacock/lotus/leaf accents), Anek/Mukta/Honk type, hand-drawn ink-outline doodles, municipal
docket/stamp UI motifs. Folk art is an *accent layer*, never dense behind body text.
**Why:** Differentiates from generic SaaS / Western 311 clones; "Indian-first, civic-first" identity
that's memorable in 3 seconds. Tokens live in `index.css` `@theme`. Avoids religious/political/
nationalistic imagery by design.

## D-001 · Gemini model = `gemini-2.5-flash`, multimodal, JSON outputs
**Decision:** Single model `gemini-2.5-flash` for all four AI functions (issue analysis, resolver
copilot, closure verification, impact insight). Key from `GEMINI_API_KEY`; falls back to a
SIMULATED mode when absent.
**Why:** Flash is fast and cheap enough for live demo, multimodal (image+text), and supports the
1M-token context. Simulated fallback keeps UI work unblocked without burning quota and protects the
demo if the key/quota fails. **Open risk:** malformed JSON from the model — needs parser fallbacks
(see PLAN P1 #6).

---

### Things deliberately NOT done
Real municipal/government API integration · MCP servers / agent runtimes / Agent Gateway / Sandbox ·
Firebase (for now) · legal-admissibility or cryptographic evidence claims · full voice-first or
full multilingual UI · advanced RAG / vector DB · public ward shaming rankings.
Rationale: out of scope for a 5-day MVP and/or overclaiming; the MVP plan explicitly excludes them.
