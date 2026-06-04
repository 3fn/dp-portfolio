# Task 1.3 Completion: Replace Hard-Coded Values with Token References

**Date**: 2026-06-01
**Task**: 1.3 Replace hard-coded values with token references in portfolio.css
**Type**: Implementation
**Status**: Complete

---

## Summary

Replaced all hard-coded tokenizable values in portfolio.css with product token references. Fixed CSS syntax error. Rewrote neon-flicker keyframes to use product token. Created additional product tokens discovered during verification pass.

---

## Changes Made

### Color Replacements (11)

| Original Value | Product Token | Context |
|---|---|---|
| `#80F6FF` | `--product-color-viz-syntax-cyan` | .viz-source |
| `rgba(255,255,255,0.55)` | `--product-color-viz-arrow-muted` | .viz-arrow |
| `#33FF99` | `--product-color-viz-syntax-green` | .viz-output |
| `rgba(255,255,255,0.72)` | `--product-color-viz-comment-muted` | .viz-comment |
| `#F9F002` | `--product-color-viz-syntax-yellow` | .viz-keyword |
| `#ff2d8f` | `--product-color-viz-syntax-pink` | .viz-value |
| `rgba(10, 10, 15, 0.6)` | `--product-color-backdrop-overlay` | .ecosystem__modal-backdrop |
| `rgba(255, 255, 255, 0.97)` ×2 | `--product-color-tooltip-background` | #career-tooltip, #chord-tip |
| `rgba(255, 255, 255, 0.6)` | `--product-color-footer-text-muted` | .footer__info |
| `rgba(0, 0, 0, 0.35)` (in shadow) | `--product-shadow-card-hover-elevation` | .ecosystem__system:hover |

### Layout Replacements (9)

| Original Value | Product Token | Context |
|---|---|---|
| `-36px` | `--product-layout-section-prefix-offset` | .section-prefix |
| `200px` | `--product-layout-modal-header-max-width` | .ecosystem__modal-header |
| `4px 12px` (gap) | `--product-layout-viz-branch-gap-row` / `gap-column` | .viz-branch |
| `8px` (margin) | `--product-layout-viz-branch-margin-top` | .viz-branch |
| `270px` | `--product-layout-tooltip-max-width` | #career-tooltip |
| `260px` | `--product-layout-chord-tip-max-width` | #chord-tip |
| `400px` | `--product-layout-hero-visual-max-tablet` | .hero__visual (tablet) |
| `300px` | `--product-layout-hero-visual-max-mobile` | .hero__visual (mobile) |
| `20px` | `--product-layout-viz-indent` | .viz-indent |

### Border Replacements (3)

| Original Value | Product Token | Context |
|---|---|---|
| `3px` (border-width) | `--product-border-quote-border-width` | .why-build__quote |
| `2px` (border-width) | `--product-border-tooltip-width` | #chord-tip |
| `2px` (border-radius) | `--product-border-tooltip-radius` | #chord-tip |

### Typography Replacements (8)

| Original Value | Product Token | Context |
|---|---|---|
| `8rem` | `--product-typography-stats-hero-size` | .stats__hero-number |
| `calc(var(--font-size-700) * 1.714)` | `--product-typography-easter-egg-display` | .how-built__easter |
| `var(--font-size-1200)` (broken ref) | `--product-typography-easter-egg-display` | .why-build__easter |
| `0.04em` | `--product-typography-letter-spacing-label` | .stats__hero-label |
| `0.08em` ×2 | `--product-typography-letter-spacing-wide` | .who-built__human-label, .agents__title |
| `0.02em` | `--product-typography-letter-spacing-subtle` | .agents__role-header |
| `0.01em` | `--product-typography-letter-spacing-minimal` | #chord-tip |

### Keyframe Rewrites

- `@keyframes neon-flicker`: All `rgba(51, 255, 153, 0.8/0.6/0.4)` → `var(--product-color-neon-glow)`
- `@keyframes neon-flicker-green`: All `var(--green-300)` → `var(--product-color-neon-glow)` (consistency)
- Reduced-motion fallback: `rgba(51, 255, 153, ...)` → `var(--product-color-neon-glow)`

### Bug Fix

- Fixed trailing comma in `.how-built__easter` `box-shadow` declaration (was invalidating the entire rule)

---

## Documented Exceptions (Not Tokenized)

| Value | Location | Rationale |
|---|---|---|
| `80px`, `155px` | .why-build__easter | Decorative coordinates — no semantic meaning |
| `80px`, `64px` | .how-built__easter | Decorative coordinates — no semantic meaning |
| `1px`, `-1px` | .sr-only | Standard clip-rect technique |
| `100%` | Replaced elements | Intrinsic dimensions |
| `80vh` | .ecosystem__modal | Viewport-relative constraint |
| `100vw` | #code-shots | Viewport full-bleed |
| `20px` (translateY) | .reveal-hidden | Animation physics constant |
| `-2px` (translateY) | .ecosystem__system:hover | Animation physics constant |
| `8px`–`48px` (text-shadow blur) | Keyframes | Animation tuning parameters |
| `1px` (box-shadow offsets) | .how-built__easter | Text-stroke simulation |
| `1023px`, `767px` | @media queries | Logical properties not supported |
| `11px` | font-size fallback | Token fallback value only |

---

## New Product Tokens Created

Added to `product/tokens/layout.yaml`:
- `heroVisualMaxTablet` (400)
- `heroVisualMaxMobile` (300)

Added to `product/tokens/typography.yaml`:
- `letterSpacingLabel` (0.04em)
- `letterSpacingWide` (0.08em)
- `letterSpacingSubtle` (0.02em)
- `letterSpacingMinimal` (0.01em)

---

## Validation

- [x] Zero hex color values remaining
- [x] Zero rgba() values remaining
- [x] Zero hard-coded rem values remaining
- [x] Zero hard-coded em values remaining
- [x] All remaining px values are documented exceptions
- [x] Trailing comma syntax error fixed
- [x] Both neon-flicker keyframes use product token
- [x] YAML files pass syntax validation
