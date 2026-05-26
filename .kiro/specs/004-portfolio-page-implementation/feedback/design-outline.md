# Spec 004 Feedback: Design Outline Review

**Date**: 2026-05-26
**Reviewers**: Leonardo (product architect), Thurgood (spec quality)

---

## Leonardo Review — Implementation Decisions

**Result**: All 6 decisions approved. No blocking issues.

**Notes**:
- Decision 5 (font delivery): Noted deviation from spec's 30-40KB target. Actual delivery ~315KB (full WOFF2, not Latin-subsetted). Accepted as v1 trade-off — document as tech debt.
- CSS architecture: Single-file approach approved with recommendation to maintain logical section separation internally via comments.

---

## Thurgood Review — Design Outline Quality

**Result**: Ready to formalize. No blockers.

**Items raised for formalization**:

| Item | Severity | Resolution |
|------|----------|------------|
| Font size deviation (315KB vs 30-40KB) | Low | Documented as Design Decision 5 with "future optimization" language |
| Task 7 scope bundling (4 scripts in 1 task) | Medium | Split into Tasks 2.1, 2.2, 3.1, 3.2 — one subtask per script |
| SVG `<object>` load timing risk | Low | Added as Risk #5 in design outline. Error handling in design.md. Graceful degradation in Tasks 3.1, 3.2 |
| Scroll-reveal class application | Low | Covered in Task 1.2 (add classes) + Task 4.4 (verify happy path + reduced-motion) |
| External link aria-labels | Low | Firmed from "consider" to SHALL in Req 9.4. Implemented in Task 4.1 |

---

## Thurgood Review — Formalization Quality

**Result**: Ready for implementation with 2 minor fixes applied.

**Fixes applied**:
1. Created this feedback document (governance requirement)
2. Added scroll-reveal happy-path verification to Task 4.4

**Nice-to-have noted** (not addressed): Font fallback stack documentation in design.md error handling. Implicit in CSS — low priority.
