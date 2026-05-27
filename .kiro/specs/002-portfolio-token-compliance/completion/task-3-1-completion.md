# Task 3.1 Completion: Map Spacing Values to Tokens

**Spec**: 002 - Portfolio Token Compliance
**Task**: 3.1 - Map spacing values to tokens
**Agent**: Ada
**Date**: 2026-05-24
**Status**: ✅ Complete

---

## What Was Done

Mapped all hard-coded spacing values (padding, margin, gap, width/height/max-width) from the value inventory to existing spacing and sizing tokens. Applied 1-2px tolerance for spacing/sizing per design methodology.

## Token Scale Used

- **Spacing primitives**: space000(0) through space800(64) — 15 tokens
- **Sizing primitives**: size050(4) through size1600(128) — 14 tokens
- **Tap area**: tapAreaMinimum(44), tapAreaRecommended(48), tapAreaComfortable(56), tapAreaGenerous(64)

## Results

| Confidence | Count |
|------------|-------|
| Exact match | ~95 individual values |
| Nearest (±1-2px) | 2 |
| No match → Phase 4 | 19 distinct values |

## Key Findings

1. **Pre-resolved confirmations**: 56px=space700 ✅ confirmed. 72px, 96px, 128px confirmed as gaps in the spacing scale (sizing family has size900=72 and size1600=128, but spacing does not).

2. **Half-step values (14px, 28px, 36px)**: These are ×1.75, ×3.5, and ×4.5 multipliers — they don't align to the base-8 grid. 14px appears 4× across the prototype. Escalated to Phase 4.

3. **Section padding pattern**: 96px (5×), 128px (4×), 120px (1×) are the dominant no-match values. All are pre-resolved as primitive token candidates.

4. **Layout constraints**: 9 max-width values (1336px, 640px, 380px, etc.) are product-level layout decisions, not token candidates. 1336px is pre-resolved as `--layout-content-max-width`.

5. **Nearest-match recommendations**: footer padding 22px → snap to space250 (20px, ±2). Footer logo 13px → snap to size150 (12px, ±1).

## Escalations to Phase 4

- 88px (ambiguous — Peter decides snap direction)
- 36px, 28px, 14px (half-step values — evaluate as scale additions or design adjustments)
- 120px (section padding — evaluate as space1500 candidate)
- 224px (large decorative spacing — one-off)
- Layout constraints (640px, 380px, 180px, 1020px, 200px, 280px, 400px, 300px, 48ch)

## Primary Artifact

- `.kiro/specs/002-portfolio-token-compliance/analysis/token-mapping.md` § "3.1 Spacing Values"
