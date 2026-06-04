# Product Token Audit: Opacity Alignment Findings

**Date**: 2026-06-01
**Source**: Spec 005 product token audit
**For**: Ada (Rosetta token evaluation)
**From**: Thurgood (audit) + Peter (direction)

---

## Finding: 5 Product Color Tokens Use Opacity Values Near System Primitives

During the Spec 005 compliance cleanup, Sparky created product color tokens with hand-tuned rgba opacity values. These values are strikingly close to existing system opacity primitives:

| Product Token | Original Value | Opacity Used | Nearest System Token | Delta |
|---|---|---|---|---|
| `vizArrowMuted` | `rgba(255, 255, 255, 0.55)` | 0.55 | `opacity056` (0.56) | 0.01 |
| `vizCommentMuted` | `rgba(255, 255, 255, 0.72)` | 0.72 | `opacity072` (0.72) | 0.00 (exact) |
| `tooltipBackground` | `rgba(255, 255, 255, 0.97)` | 0.97 | `opacity096` (0.96) | 0.01 |
| `footerTextMuted` | `rgba(255, 255, 255, 0.6)` | 0.60 | `opacity056` (0.56) / `opacity064` (0.64) | 0.04 |
| `backdropOverlay` | `rgba(10, 10, 15, 0.6)` | 0.60 | `opacity056` (0.56) / `opacity064` (0.64) | 0.04 |

---

## Questions for Ada

### 1. Should these product tokens snap to system opacity primitives?

Three tokens (vizArrowMuted, vizCommentMuted, tooltipBackground) are within 1% of a system value — visually indistinguishable. The other two use 0.60, which sits between `opacity056` and `opacity064`.

**Recommendation**: Snap all five to the nearest system opacity primitive. The visual difference is imperceptible, and it brings these tokens into the mathematical foundation.

### 2. Should any of these become semantic tokens?

Patterns that might generalize beyond this product:

- **`footerTextMuted`** = white + reduced opacity on dark background → Could this be `color.text.muted.onDark`? The system has `color.text.muted` (gray200 on light) but nothing for muted text on dark surfaces.
- **`backdropOverlay`** = near-black + 60% opacity → Modals are universal. Should there be a `color.surface.overlay` or `color.backdrop` semantic token?
- **`tooltipBackground`** = near-opaque white → Could this be `color.surface.tooltip`? The system has `shadow.tooltip` but no surface color for tooltips.

The viz-specific tokens (arrow, comment) are likely too content-specific to promote.

### 3. Observation: Original values vs. system scale

These opacity values were chosen by eye before the system existed. The fact that 3/5 land within 1% of system primitives suggests the opacity scale's step size (0.08) produces values that match human intuition well. The two at 0.60 may indicate that humans reach for "round" numbers (0.5, 0.6, 0.7) — the system's nearest steps are 0.56 and 0.64, which don't feel as "clean" but are mathematically consistent.

**Question**: Is the 0.56/0.64 gap around 0.60 a known ergonomic concern in the opacity scale, or is 0.60 just a human rounding habit that the system correctly doesn't cater to?

---

## Context

- Product tokens are in `product/tokens/color.yaml`
- System opacity primitives are in the opacity family (base 0.08, 14 steps from 0.00 to 1.00)
- System has `color.contrast.onDark` (white100) but no muted variant
- System has `color.text.muted` (gray200) but only for light backgrounds
