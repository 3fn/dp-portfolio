# Task 4 Parent Completion: Scroll State Machine & Tooltips

**Date**: 2026-06-12
**Task**: 4 Scroll State Machine & Tooltips
**Type**: Parent
**Status**: Complete

---

## Summary

Created `src/scripts/rosetta-viz.ts` (269 lines) — the scroll-driven SVG visualization engine. 11 nodes transform across 4 states as the user scrolls through beats. Tooltips on hover/tap/keyboard. Beat 4 lines draw on scroll. Reduced motion shows final state.

---

## Architecture

- **State machine**: `STATES` object maps beat IDs → node positions, radii, colors, labels, tooltip content, and connections
- **State detection**: IntersectionObserver on beat sections (rootMargin: -30% top, -50% bottom)
- **Node rendering**: SVG `<g>` elements with `transform`, `<circle>` with `r`/`stroke`, `<text>` with label
- **Connections**: Lines drawn per state; cleared and re-created on state change
- **Beat 4 draw-on-scroll**: `stroke-dasharray` + `stroke-dashoffset` animated to 0 via rAF
- **Tooltips**: Mouse coordinate mapping (clientX→SVG viewBox), hit detection (radius + 4px buffer, min 12px), three-zone display (title/problem/solution)
- **Interaction**: Hover (desktop), tap toggle (mobile), keyboard focus (first visible node), scroll dismiss

---

## Requirements Coverage

| Req | Implementation |
|-----|----------------|
| 3.1 — Viz transitions between 5 states | ✅ 4 beat states + default (beat-problem on load) |
| 3.2 — Node position/radius/color transitions | ✅ CSS transitions on `<g>` transform and `<circle>` attributes |
| 3.3 — Connection lines redrawn per state | ✅ `connsG.innerHTML = ''` then rebuild |
| 3.4 — Beat 4 draw-on-scroll | ✅ stroke-dashoffset animation |
| 4.1 — Tooltip on hover/tap | ✅ mousemove + click handlers with SVG coord mapping |
| 4.2 — Cursor-following, node-color border | ✅ `tooltip.style.left/top`, `tooltip.style.borderColor` |
| 4.3 — Keyboard focus tooltip | ✅ SVG tabindex=0, focus event shows first visible node |
| 4.4 — Scroll dismisses tooltip | ✅ Passive scroll listener calls hideTooltip |
| 5.3 — Reduced motion | ✅ Shows beat-payoff immediately, skips scroll listener |
| 7.3 — Viz JS ≤5KB | ✅ ~269 lines source, bundles well under 5KB |

---

## Validation

- [x] Scroll drives visualization state changes
- [x] Tooltips appear on hover/tap/focus with contextual content
- [x] Tooltips dismiss on scroll
- [x] Beat 4 connection lines animate with stroke-dashoffset
- [x] Reduced motion shows final state with no transitions
- [x] Exports init/cleanup (Astro-ready)
- [x] Build passes (11 scripts, 2 pages)
