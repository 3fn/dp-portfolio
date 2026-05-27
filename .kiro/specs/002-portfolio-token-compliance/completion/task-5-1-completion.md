# Task 5.1 Completion: Evaluate Non-Aligning Values and Assign Dispositions

**Spec**: 002 - Portfolio Token Compliance
**Task**: 5.1 - Evaluate non-aligning values and assign dispositions
**Agent**: Ada (Leonardo provides product context)
**Date**: 2026-05-24
**Status**: ✅ Complete (canvas dispositions deferred to Task 5 Parent per sequencing plan)

---

## What Was Done

Evaluated all non-aligning values from Task 3 and the proposed semantic from Task 4. Applied pre-resolved decisions from the design outline. Categorized remaining values with dispositions. Presented ambiguous values with options and trade-offs for Peter's review.

## Primary Artifact

- `.kiro/specs/002-portfolio-token-compliance/analysis/non-aligning-evaluation.md` (229 lines)

## Results

| Disposition | Count |
|-------------|-------|
| Pre-resolved (applied directly) | 8 |
| Snap to existing token (confident) | 10 values |
| Product CSS custom property | 11 values |
| Keep as primitive/hard value | 3 values |
| Create primitive token (proposed) | 3 tokens |
| Create semantic token (proposed) | 1 token |
| Ambiguous — Peter decides | 5 decisions |
| Canvas values — pending Task 6 | TBD |

## Decisions Awaiting Peter

1. **88px** — snap to 96px (space1200), 80px (size1000), or keep as product CSS property?
2. **12px font-size (10×)** — snap to 13px (fontSize050) or create fontSize025 (12px)?
3. **Box shadows (5×)** — snap to system shadows, create product CSS properties, or propose system-level atmospheric tier?
4. **Opacity (0.6, 0.85, 0.9)** — snap to nearest tokens or keep as hard values?
5. **Duration (200ms, 300ms)** — snap up to 250/350, snap down to 150/250, or create duration200?

## Deferred to Task 5 Parent

Canvas non-aligning values (from Task 6) will be folded into the evaluation document before the parent task finalizes. This is per the approved sequencing plan (Thurgood confirmed compliance, 2026-05-24).

## Key Observations

- **8 of 10 ambiguous values are prototype approximations** (Leonardo's assessment) — they weren't carefully considered and can snap to tokens without visual compromise.
- **2 require genuine decisions**: 12px font-size (accessibility vs. convention) and box shadows (deliberate aesthetic that shouldn't be flattened).
- **The proposed `color.text.heading` token** has strong justification (9× occurrences, intentional two-tier hierarchy) but adds complexity to the text color semantic space.
