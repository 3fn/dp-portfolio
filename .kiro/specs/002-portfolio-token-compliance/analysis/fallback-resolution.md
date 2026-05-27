# Fallback Value Resolution

**Spec**: 002 - Portfolio Token Compliance
**Task**: 2 - Fallback Value Resolution
**Agent**: Leonardo
**Date**: 2026-05-24

---

## Findings

12 `var()` declarations with fallback values identified. All referenced tokens exist in the system.

---

## Resolution Table

| # | Selector | Declaration | Token Referenced | Fallback Value | Token Actual Value | Resolution |
|---|----------|-------------|-----------------|----------------|-------------------|------------|
| 1 | .nav | min-height: var(--tap-area-recommended, 48px) | tapAreaRecommended | 48px | 48 | **Remove** — token exists, values match |
| 2 | .nav | border-bottom: var(--border-width-100, 1px) solid... | borderWidth100 | 1px | 1 | **Remove** — token exists, values match |
| 3 | .nav__links a | font-size: var(--typography-label-md-font-size, 16px) | typography-label-md-font-size | 16px | 16 | **Remove** — token exists, values match |
| 4 | .nav__links a | font-weight: var(--typography-label-md-font-weight, 500) | typography-label-md-font-weight | 500 | 500 | **Remove** — token exists, values match |
| 5 | .hero__description | font-size: var(--typography-body-md-font-size, 16px) | typography-body-md-font-size | 16px | 16 | **Remove** — token exists, values match |
| 6 | .hero__description | line-height: var(--typography-body-md-line-height, 1.5) | typography-body-md-line-height | 1.5 | 1.5 | **Remove** — token exists, values match |
| 7 | .btn | font-size: var(--typography-button-md-font-size, 16px) | typography-button-md-font-size | 16px | 16 | **Remove** — token exists, values match |
| 8 | .btn | border-radius: var(--radius-050,) | radius050 | (empty — trailing comma) | 4 | **Fix syntax** — remove trailing comma: `var(--radius-050)` |
| 9 | .btn--secondary | border: var(--border-width-100, 1px) solid... | borderWidth100 | 1px | 1 | **Remove** — token exists, values match |
| 10 | .ecosystem__system | border-radius: var(--radius-100, 4px) | radius100 | 4px | **8** | **⚠️ Mismatch** — token value is 8px, fallback says 4px. Design intent is 4px → should reference `--radius-050` (value=4) instead |
| 11 | .ecosystem__system::before | border-radius: var(--radius-100, 4px) | radius100 | 4px | **8** | **⚠️ Mismatch** — same as #10. Fix reference to `--radius-050` |
| 12 | .ecosystem__modal | border-radius: var(--radius-100, 4px) | radius100 | 4px | **8** | **⚠️ Mismatch** — same as #10. Fix reference to `--radius-050` |

---

## Summary

| Resolution Type | Count |
|----------------|-------|
| Remove fallback — token exists, values match | 8 |
| Fix syntax (trailing comma) | 1 |
| Fix reference — wrong token, design intent is 4px → use `radius-050` | 3 |
| **Total** | **12** |

---

## Actions Required

1. **Remove fallbacks** from entries #1-7 and #9 (8 declarations)
2. **Fix syntax** on entry #8: `var(--radius-050,)` → `var(--radius-050)`
3. **Fix token reference** on entries #10-12: `var(--radius-100, 4px)` → `var(--radius-050)` — the design intent is 4px radius (confirmed by the fallback value), but `radius-100` = 8px. The correct token for 4px is `radius-050`.

**Note**: Entry #10-12 is a significant finding. If the fallback weren't there, these elements would render with 8px radius instead of the intended 4px. The fallback was masking a wrong token reference — exactly the kind of issue this audit is designed to catch.

---

## Escalations

None. All tokens exist. No values need escalation to Phase 4.
