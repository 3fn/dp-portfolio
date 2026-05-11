# Task 5 Completion: Phase C Why Build

**Date**: 2026-05-10
**Task**: 5. Phase C: Why Build
**Type**: Parent
**Status**: Complete

---

## Success Criteria Verification

- ✅ Four Container-Card-Base cards render with correct styling
- ✅ Background gradient + exclusion texture displays correctly
- ✅ Easter egg flickers on hover, respects reduced motion
- ✅ Hard shadow applies to cards

---

## Primary Artifacts

| File | Purpose |
|------|---------|
| `src/pages/index.html` (modified) | Why Build section HTML — heading, 4 cards, easter egg zone |
| `src/styles/why-build.css` | Section styling — gradient, texture, cards, easter egg animation |

## Implementation Details

### Background Treatment
- Radial gradient: `pink300` center → `pink500` edge
- Exclusion texture: `repeating-linear-gradient` grid (8px squares) with `mix-blend-mode: exclusion`
- CSS-first approach — no SVG asset needed

### Cards
- 4-column grid at desktop
- `purple100` fill, `purple300` hard shadow via `.hard-shadow` utility + `--hard-shadow-color`
- Asymmetric padding: `inset-200` block, `inset-300` inline
- Staggered reveal animation (75ms between cards)

### Easter Egg
- `green100` zone above section (transition area)
- "Because why not!?" at 72px display weight
- Neon flicker keyframe: irregular opacity (0→0.4→0→0.7→0→0.9→0.4→1) over 500ms
- `prefers-reduced-motion`: instant opacity 1, no animation
- `hover: none` (mobile): entire zone hidden

## Requirements Compliance

- ✅ Req 7 AC1: Four cards with purple100 fill
- ✅ Req 7 AC2: Hard shadow purple300, space100 offset, blur000
- ✅ Req 7 AC3: Asymmetric padding (inset-200 block, inset-300 inline)
- ✅ Req 7 AC4: Section heading uses color.contrast.onDark
- ✅ Req 7 AC5: Card body text uses color.text.default
- ✅ Req 7 AC6: Radial gradient + exclusion blend mode texture
- ✅ Req 7 AC7: Easter egg in green100 zone, neon flicker on hover
- ✅ Req 7 AC8: Reduced motion — instant show on hover
- ✅ Req 17 AC1-5: Easter egg hidden by default, flicker on hover, reduced motion, mobile hidden, CSS-only
