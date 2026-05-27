# Task 3 Completion: Hard Value → Token Mapping

**Spec**: 002 - Portfolio Token Compliance
**Task**: 3 - Hard Value → Token Mapping (Parent)
**Agent**: Ada
**Date**: 2026-05-24
**Status**: ✅ Complete

---

## What Was Done

Mapped every hard-coded value from the Task 1 inventory to existing tokens across four categories: spacing, typography, color, and radius/border/shadow/motion. Applied 1-2px tolerance for spacing/sizing and exact-match-only for all other categories.

## Primary Artifact

- `.kiro/specs/002-portfolio-token-compliance/analysis/token-mapping.md` (715 lines)

## Success Criteria Verification

| Criterion | Status |
|-----------|--------|
| Every hard-coded value from the inventory has a mapping entry | ✅ |
| Each entry includes target token and confidence level | ✅ |
| Pre-resolved values (opacity024, opacity056, space700=56px) confirmed | ✅ (with NOISE_ALPHA clarification flagged) |
| No-match values clearly marked for Phase 4 escalation | ✅ |

## Summary Statistics

| Category | Exact Match | Nearest (±1-2px) | No Match |
|----------|-------------|-------------------|----------|
| Spacing (padding, margin, gap) | ~95 values | 2 | 19 distinct values |
| Sizing (width, height, max-width) | 1 | 1 | 18 distinct values |
| Typography — font size | 14 | — | 32 |
| Typography — font weight | 34 (all) | — | 0 |
| Typography — line height | 2 | — | 10 distinct |
| Typography — letter spacing | 0 | — | 4 distinct |
| Typography — composite | 1 (bodyMd) | — | all others |
| Color — hard-coded | 6 exact | — | 5 distinct |
| Color — primitive by name | 55 (already mapped) | — | — |
| Radius | 5 | — | 1 |
| Border width | 12 | — | 1 |
| Box shadow (semantic) | 0 | — | 5 |
| Opacity (CSS property) | 3 | — | 3 |
| Duration | 6 uses | — | 4 uses |
| Easing | 1 | — | 7 |

## Key Findings for Downstream Tasks

### For Task 4 (Semantic Promotion)
- **55 primitive color usages** need semantic evaluation — particularly black-300 (14×), gray-300 (7×), gray-200 (7×), black-100 (8×), white-200 (5×)
- These likely map to existing semantics: `color.contrast.onLight`, `color.text.default`, `color.text.muted`, `color.print.default`, `color.structure.surface`

### For Task 5 (Non-Aligning Evaluation)
- **Section padding pattern** (96px×5, 128px×4, 120px×1) — pre-resolved as primitive candidates
- **34px font size** (7×) — strongest typography gap, needs scale decision
- **12px font size** (10×) — below scale minimum, needs disposition
- **CSS `ease` easing** (7×) — systemic mismatch with token curves
- **Box shadows** — all 5 differ from semantic composites
- **Half-step spacing** (14px×4, 28px, 36px×2) — don't align to base-8 grid
- **NOISE_ALPHA** — pre-resolved disposition may be based on wrong scale interpretation

### For Task 6 (Canvas Audits)
- Ecosystem connector colors confirmed: cyan200 ✅, green200 ✅, yellow200 ✅ (exact matches)
- Chord diagram colors: mostly no match (no blue family)
- Career chart colors: application-level (pre-resolved as exceptions)

## Pre-Resolved Confirmations

| Value | Design-Outline Resolution | Confirmed? |
|-------|--------------------------|------------|
| 56px = space700 | Existing token | ✅ Confirmed |
| 72px → space900 candidate | New primitive needed | ✅ size900=72 exists in sizing but not spacing |
| 96px → space1200 candidate | New primitive needed | ✅ No token at 96 in either family |
| 128px → space1600 candidate | New primitive needed | ✅ size1600=128 exists in sizing but not spacing |
| 1336px → product CSS custom property | Not a token | ✅ Correct disposition |
| Noise opacity 0.56 → opacity056 | Existing token | ✅ Confirmed |
| Noise opacity 0.24 → opacity024 | Existing token | ✅ Confirmed — NOISE_ALPHA=24 is Canvas 0-255 scale (≈9.4% actual), but Peter decided to align to opacity024 (0.24). Adjust later if too prominent. |

## Subtask Completion

| Subtask | Status | Completion Doc |
|---------|--------|----------------|
| 3.1 Map spacing values | ✅ | `completion/task-3-1-completion.md` |
| 3.2 Map typography values | ✅ | `completion/task-3-2-completion.md` |
| 3.3 Map color values | ✅ | `completion/task-3-3-completion.md` |
| 3.4 Map radius/border/shadow/motion | ✅ | `completion/task-3-4-completion.md` |
