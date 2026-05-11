# Task 2 Completion: Button-CTA Polymorphic Rendering

**Date**: 2026-05-10
**Task**: 2. Button-CTA Polymorphic Rendering (Prerequisite)
**Type**: Parent
**Status**: Complete

---

## Success Criteria Verification

- ✅ Button-CTA renders as `<a>` when `href` prop is set
- ✅ Button-CTA renders as `<button>` when `href` is absent (no regression)
- ✅ `rel="noopener noreferrer"` auto-applied when `target="_blank"`
- ✅ Behavioral contracts document dual-render behavior (`content_renders_link`, `layout_icon_position`)
- ✅ All existing tests pass unchanged (35 Spec 000 tests green)
- ✅ New tests cover `<a>` rendering path (15 tests, all passing)

## Subtask Summary

| Subtask | Deliverable | Status |
|---------|-------------|--------|
| 2.1 | `href`, `target`, `rel`, `iconPosition` in types.ts + schema.yaml | ✅ Complete |
| 2.2 | Polymorphic rendering + iconPosition in ButtonCTA.web.ts | ✅ Complete |
| 2.3 | `content_renders_link` + `layout_icon_position` contracts | ✅ Complete |
| 2.4 | 15 new tests (all passing) + bug fix (aria-disabled on links) | ✅ Complete |
| 2.5 | README updated with polymorphic docs | ✅ Complete |

## Primary Artifacts

| Artifact | Path |
|----------|------|
| Types (modified) | `src/components/core/Button-CTA/types.ts` |
| Schema (modified) | `src/components/core/Button-CTA/Button-CTA.schema.yaml` |
| Web implementation (modified) | `src/components/core/Button-CTA/platforms/web/ButtonCTA.web.ts` |
| Contracts (modified) | `src/components/core/Button-CTA/contracts.yaml` |
| New tests | `src/components/core/Button-CTA/__tests__/ButtonCTA.polymorphic.test.ts` |
| README (modified) | `src/components/core/Button-CTA/README.md` |

## Test Results

```
Test Suites: 4 passed, 4 total
Tests:       50 passed, 50 total
```

## Bug Found During Testing

`_updateDOM()` was unconditionally setting `aria-disabled` on all elements, including `<a>` links. Fixed by guarding with `if (!this.href)`. This validates the value of running tests — the bug would have shipped without them.
