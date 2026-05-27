# Task 3.4 Completion: Map Radius, Border, Shadow, and Motion Values to Tokens

**Spec**: 002 - Portfolio Token Compliance
**Task**: 3.4 - Map radius, border, shadow, and motion values to tokens
**Agent**: Ada
**Date**: 2026-05-24
**Status**: ✅ Complete

---

## What Was Done

Mapped all hard-coded radius, border-width, box-shadow, opacity, transition, and animation values from the value inventory to existing tokens. Applied exact-match-only methodology for radius per Ada guidance. Decomposed box shadows into primitives for partial matching.

## Token Families Used

- **Radius**: radius000(0) through radius400(32), radiusMax(9999), radiusHalf(50%) — 13 tokens
- **Border width**: borderWidth000(0), borderWidth100(1), borderWidth200(2), borderWidth400(4) — 4 tokens
- **Shadow**: Compositional system — offsetX, offsetY, blur, opacity, color primitives + 13 semantic composites
- **Blur**: blur000(0) through blur250(40) — 9 tokens
- **Opacity**: opacity000(0) through opacity100(1.0) — 14 tokens on 0.08 increment
- **Duration**: duration150(150ms), duration250(250ms), duration350(350ms) — 3 tokens
- **Easing**: easingStandard, easingDecelerate, easingAccelerate, easingGlideDecelerate — 4 tokens

## Results

| Category | Exact Match | No Match |
|----------|-------------|----------|
| Radius | 5 values | 1 value (14px badge) |
| Border width | 12 values | 1 value (3px) |
| Box shadow (semantic) | 0 | 5 shadows |
| Opacity (CSS property) | 3 values | 3 values |
| Duration | 6 uses (150ms, 250ms) | 4 uses (200ms, 300ms, 800ms) |
| Easing | 1 (modal = easingStandard) | 7 (CSS `ease`) |

## Key Findings

1. **Radius scale is well-covered** — only the badge's 14px pill radius doesn't match. This is likely a `radiusMax` (pill) intent rather than a specific 14px need.

2. **Border width scale has one gap** — 3px for the quote accent border. The scale jumps from 2px to 4px. This is a single decorative use.

3. **Box shadows don't match ANY semantic composite** — the prototype uses larger blur radii (24px, 32px, 64px) than the token system's shadow composites (which max at blur150=24px for tooltip/toast). The prototype's shadows are more diffuse/dramatic than the system's component-oriented shadows.

4. **CSS `ease` vs token easing curves** — the prototype uses CSS `ease` (0.25, 0.1, 0.25, 1.0) for 7 transitions. The token system uses Material Design curves. Only the modal's cubic-bezier matches `easingStandard`. This is a systemic mismatch.

5. **NOISE_ALPHA clarification needed** — the design-outline pre-resolved NOISE_ALPHA=24 as mapping to opacity024, but 24 is on a 0-255 scale (24/255≈0.094), not 0-1. The actual opacity is closer to opacity008(0.08). This needs Peter's clarification.

6. **Duration scale gaps** — 200ms (2×) and 300ms (1×) fall between existing tokens. The scale has 150/250/350 — no 200 or 300.

## Escalations to Phase 4

- 14px radius (badge pill shape)
- 3px border-width (quote accent)
- All 5 box shadows (evaluate: use semantic tokens or document as product-level)
- CSS `ease` easing (7×) — systemic: add to token system or align to existing?
- 200ms, 300ms duration (evaluate as scale additions)
- 0.6, 0.85, 0.9 opacity (between scale steps)
- NOISE_ALPHA interpretation (0-255 vs 0-1 scale)

## Primary Artifact

- `.kiro/specs/002-portfolio-token-compliance/analysis/token-mapping.md` § "3.4 Radius, Border, Shadow, and Motion Values"
