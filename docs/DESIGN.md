# Design

Visual system for NammaFix AI — **Bharat Civic Folk-Tech**. Tokens live in `src/index.css` (`@theme`). Two registers share one palette: the **landing** (brand) sings; the **dashboard** (product) stays restrained and legible.

> **Implementation status (2026-06-27):** this system is now applied across the whole app. The
> dashboard was authored in cold `slate/indigo/emerald`; rather than hand-edit ~300 usages, those
> Tailwind ramps are **remapped to warm civic tones in `@theme`** (see DECISIONS D-011), so landing
> and dashboard now read as one product. The UI also renders in **7 languages** (Latin + 6 Indian
> scripts via the Noto Sans fallback).

## Theme

Warm Indian civic daylight: turmeric-cream paper, civic-indigo structure, ink-brown linework, with controlled festival accents (saffron, marigold, peacock, lotus, leaf). Light theme only. Folk doodles are an **accent layer**, never dense behind body text.

## Color palette

| Token | Hex | Role |
|---|---|---|
| `--color-cream` | `#FFF8E7` | Primary background (paper) |
| `--color-turmeric` | `#FFF4C7` | Warmer panel / second surface |
| `--color-concrete` | `#E5E1D8` | Borders, neutral UI, dividers |
| `--color-ink` | `#3A1F1B` | Primary text + hand-drawn outlines |
| `--color-indigoc` | `#243B73` | Structure, secondary actions, headings on brand |
| `--color-saffron` | `#F97316` | **Primary action** + current selection + urgent accent |
| `--color-marigold` | `#FACC15` | Highlight (use on dark only; fails contrast on cream) |
| `--color-peacock` | `#00A6A6` | Map pins, community validation, info |
| `--color-lotus` | `#E83E8C` | Badge / mission accent |
| `--color-leaf` | `#2E7D32` | Verified / resolved / success |
| `--color-sindoor` | `#D72638` | Critical alert / error |

### Semantic state vocabulary (product)
- **Primary action:** saffron bg, white text, ink shadow. **Hover:** translate-y -1, deepen. **Focus:** 2px saffron ring. **Disabled:** 45% opacity.
- **Selected / current:** saffron border + faint saffron tint (`saffron/8`), not full fill.
- **Status:** Submitted/AI-Reviewed = indigo · Verified/Resolved = leaf · Routed/active = saffron · Critical = sindoor · Info/community = peacock.
- **Surfaces:** content cards = white on cream; panels/toolbars = turmeric (warmer second layer); footer/“focus” = indigoc.

### Contrast rules (AA)
- Body text = `ink` (≥4.5:1 on cream/white). Never use `ink/45` for body — that's metadata only.
- `marigold` and `leaf` are **too light/dark respectively on cream** — marigold only on indigo/ink; leaf passes on cream for ≥bold large, use `#256528`-equivalent weight or pair with icon.
- On `indigoc` surfaces use `cream`, `marigold`, `peacock` — never `ink`.

## Typography

Pair on a contrast axis; one family carries the product UI.

- **Honk** (`--font-honk`) — display **brand moment only**: the hero wordmark, a Civic Karma badge flourish. Never for UI or runs of text.
- **Anek Latin** (`--font-display`) — **landing/brand headings** and the persistent **NammaFix AI logo wordmark** (the one app brand moment). Not for dashboard nav/labels/data.
- **Mukta** (`--font-body`) — **the single product UI family**: dashboard headings, labels, buttons, body. Humanist sans; multilingual-ready. This is what carries the app.
- **Noto Sans** — multilingual fallback (Kannada/Hindi future).
- **JetBrains Mono** (`--font-mono`) — IDs, codes, ticket refs, metadata tags, kicker labels.

Product scale: fixed rem, ratio ~1.2. Brand (landing) may use clamp() display sizes (≤6rem). Body prose capped 65–75ch; dense tables/data may run denser.

## Components

- **Cards:** white on cream, `1px concrete` (or `ink/15`) border, `rounded-2xl`. Brand docket cards add a dashed `ink/40` border + perforation + rubber-stamp. No nested cards.
- **Buttons:** saffron primary, indigo-outline secondary, ghost tertiary. One shape across the app (`rounded-xl`). All states defined (default/hover/focus/active/disabled/loading).
- **Status stamps / Karma badges:** rubber-stamp + scalloped-seal — **brand moments**, used on landing + sparingly in-app (a single status chip), not as every label.
- **Inputs:** white, concrete border, saffron focus ring, `rounded-lg`. Placeholder ≥4.5:1.
- **Loading:** skeletons for content; the existing multi-step Gemini analysis loader is a legitimate branded progress moment. Avoid bare centered spinners inside content.
- **Doodle icons** (`src/landing/DoodleIcons.tsx`): ink-outline civic motifs; consistent stroke style; swap-ready for raster.

## Layout

- Landing: scrolling sections, max-w-6xl, generous rhythm.
- Dashboard: fixed full-height app shell (header + main grid + status footer). Left = active case / queue; right = timeline / impact / actions. Responsive behavior is **structural** (collapse columns at breakpoints), not fluid type.
- Semantic z-scale: dropdown → sticky → modal-backdrop → modal → toast → tooltip.

## Motion

- **Landing (brand):** orchestrated in-view reveals, floating chips, stamp-down, line-draw — choreography is part of the story.
- **Dashboard (product):** 150–250ms, state-conveying only (hover, focus, selection, status change, reveal). No page-load choreography.
- Every animation respects `prefers-reduced-motion` (fallback already in `index.css`).
