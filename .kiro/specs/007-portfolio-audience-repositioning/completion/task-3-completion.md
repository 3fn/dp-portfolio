# Task 3 Parent Completion: Token Animation Script

**Date**: 2026-06-04
**Task**: 3 Token Animation Script
**Type**: Parent
**Status**: Complete

---

## Summary

Created `src/scripts/token-evolution.ts` — a scroll-driven split-flap animation that transitions 16 token pills through 4 phases as the user scrolls through the Why Build section. Exports `init()`/`cleanup()` for Astro island compatibility.

---

## Architecture

- **Phase calculation**: Based on `.why-build__beat:nth-child(2)` (Insight & Thesis) position relative to viewport
- **Scroll timing**: Phase 0 when anchor below viewport → Phase 3 when anchor above viewport, with even phase distribution across the travel
- **Split-flap effect**: `rotateX(90deg)` + opacity 0 → swap text → `rotateX(0deg)` + opacity 1 (150ms timing)
- **Phase 1 chaos**: Random ±4° rotation via `--flap-rotation` CSS custom property
- **Phase 2+ resolved**: `.resolved` class flattens rotation to 0
- **Reversible**: Fully reverses on scroll-up (phase recalculated on every scroll event)

---

## Requirements Coverage

| Requirement | Implementation |
|-------------|----------------|
| 7.1 — Export init() and cleanup() | ✅ Both exported; init returns cleanup function |
| 7.2 — cleanup() removes listeners | ✅ Removes scroll listener |
| 7.3 — passive: true on scroll | ✅ `{ passive: true }` |
| 7.4 — Structured phase data | ✅ Parsed from `data-states` into typed array |
| 3.1 — Reduced motion: Phase 4 immediately | ✅ Checks matchMedia, applies Phase 4, skips scroll listener |
| 3.2 — No rotation in reduced motion | ✅ No `--flap-rotation` set; CSS handles via `transform: none` |
| 2.2 — Transitions through 4 phases | ✅ Phase 0→3 mapped to scroll position |
| 2.4 — Reverses on scroll-up | ✅ Phase recalculated on every scroll |
| 2.5 — Primitive→semantic accuracy | ✅ Data in HTML `data-states` attributes (verified in Task 1.4) |

---

## Build Verification

- `npm run build:page` passes — 9 scripts bundled, 0 errors
- `token-evolution.js`: 2.3kb bundled

---

## Validation

- [x] `init()` exported and returns cleanup function
- [x] `cleanup()` removes scroll event listener
- [x] Scroll listener uses `{ passive: true }`
- [x] Reduced motion users see Phase 4 immediately with no scroll listener
- [x] Phase data parsed from `data-states` into structured array
- [x] Split-flap rotateX animation on text swap
- [x] `.resolved` class toggled for rotation flatten
- [x] Random initial rotations for Phase 1
- [x] Build passes cleanly
