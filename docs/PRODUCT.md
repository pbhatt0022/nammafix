# Product

## Register

product

> Dual-surface project: a **product** app (the civic resolution dashboard — the substance) fronted by a **brand** landing page (the Bharat Civic Folk-Tech marketing surface). Default register is `product`; the landing page is treated as `brand` when worked on directly.

## Users

- **Citizens** (primary): residents of an Indian neighbourhood reporting local civic issues (potholes, leaks, broken streetlights, garbage, blocked drains) from a phone, often outdoors, one-handed, in a hurry. They want to report once, see it taken seriously, and watch it get fixed.
- **Ward admins / resolvers** (secondary): municipal-side users triaging a prioritized queue, reading AI evidence packets, routing issues to departments, and confirming closure. They are in a focused triage workflow and need density and clarity over decoration.

## Product Purpose

NammaFix AI is a Gemini-powered civic resolution layer — not a complaint portal. It turns a messy citizen report (photo + text + location) into a structured **AI Evidence Packet**, checks for duplicates, gathers community verification, auto-routes to the right (mock) municipal department, tracks status to closure with before/after verification, and rewards verified civic contribution via Civic Karma. Success = a report that becomes visible, prioritized, routed, and provably resolved — with the community in the loop at every step. Built for Vibe2Ship 2026.

## Brand Personality

Warm, proud, civic, hyperlocal, optimistic, trustworthy, community-first. Indian civic pride **without** nationalism, religion, politics, or tourist kitsch. Voice is plain and action-oriented ("Report once. Verify together. Resolve transparently.", "Built for Indian streets", "Verified by neighbours"). Three words: **warm, trustworthy, civic-proud.**

## Anti-references

- Generic SaaS dashboards (cold slate/indigo, Inter-everywhere, identical card grids).
- Western 311 / municipal complaint clones (bureaucratic, gray, lifeless).
- Tourist-kitsch "India" (taj-mahal/peacock/flag overload, saffron-green nationalism).
- Religious or political imagery of any kind.
- Folk art used as loud wallpaper behind body text (decoration over legibility).

## Design Principles

1. **Resolution, not complaints.** Every surface should advance an issue toward a verified fix, not just log it. Show progress, evidence, and accountability.
2. **Indian-first, but legible-first.** The folk-tech identity is carried by color, warmth, and selective doodle *moments* — never at the cost of contrast or task clarity.
3. **Brand sings on the landing; the app gets out of the way.** Display fonts, stamps, and doodles are brand moments. In the working dashboard, one tuned UI sans + shared color tokens carry cohesion; the tool disappears into the task.
4. **Earned trust through evidence.** AI outputs are shown with confidence, sources, and honest "mock / simulated" labeling — never overclaimed.
5. **Reward contribution, not noise.** Karma and verification celebrate useful, verified civic action, not complaint volume.

## Accessibility & Inclusion

- Target WCAG 2.1 AA: body text ≥4.5:1, large/bold ≥3:1, including placeholder and on-tint text.
- Honor `prefers-reduced-motion` (already wired in index.css) — every animation has a reduced/none fallback.
- Touch-first targets for citizens on phones; keyboard-navigable controls for admins.
- Multilingual: UI ships in 7 languages (English + Hindi, Kannada, Tamil, Telugu, Bengali, Marathi) with Noto Sans rendering Indian scripts; plus voice dictation in those languages.
- Don't rely on color alone for status — pair with labels/icons (color-blind safe).
