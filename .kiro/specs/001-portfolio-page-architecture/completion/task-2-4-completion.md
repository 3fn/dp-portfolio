# Task 2.4 Completion: Verify Existing Tests + Write New Tests

**Date**: 2026-05-10
**Task**: 2.4 Verify existing tests + write new tests
**Type**: Implementation
**Status**: Complete

---

## Artifacts Created

- `src/components/core/Button-CTA/__tests__/ButtonCTA.polymorphic.test.ts` — 15 test cases

## Artifacts Modified

- `src/components/core/Button-CTA/platforms/web/ButtonCTA.web.ts` — Bug fix: guard `disabled`/`aria-disabled` in `_updateDOM` for links
- `jest.config.js` — Added `transformIgnorePatterns` to allow `@3fn/core/src/` transformation
- `tsconfig.test.json` — Added `paths` for `@3fn/core` subpath exports

## Implementation Details

### Test Coverage

| Contract | Tests | Validates |
|----------|-------|-----------|
| `content_renders_link` | 10 | `<a>` renders with href, correct href value, no `<button>` when href set, `<button>` without href, auto-rel on `target="_blank"`, explicit rel preserved, no rel without `_blank`, no `type`/`role` on `<a>`, disabled ignored on links (×2) |
| `layout_icon_position` | 3 | Default leading (icon before label), trailing (label before icon), trailing with href |
| Existing behavior | 2 | `<button>` renders without href, no `<a>` without href |

### Bug Found and Fixed

**`_updateDOM` was setting `aria-disabled` on `<a>` elements unconditionally.**

When `attributeChangedCallback` fired (e.g., from setting `disabled` attribute), `_updateDOM()` would call `this._button.setAttribute('aria-disabled', 'false')` regardless of whether the element was a `<button>` or `<a>`. This violated the contract that `disabled` is ignored on links.

**Fix**: Added guard `if (!this.href)` around the disabled state update block in `_updateDOM`.

### Infrastructure Changes

| File | Change | Reason |
|------|--------|--------|
| `jest.config.js` | Added `transformIgnorePatterns: ['node_modules/(?!@3fn/core/src/)']` | Preset maps `@3fn/core/blend` to source `.ts` files; Jest must transform them |
| `tsconfig.test.json` | Added `paths` for `@3fn/core/*` subpath exports | TypeScript needs to resolve `@3fn/core/blend` to source for type checking |
| `src/components/core/Button-CTA/platforms/web/ButtonCTA.web.ts` | Import changed to `@3fn/core/blend` | Package subpath export (11.5.0 fix) |
| `src/components/core/Icon-Base/platforms/web/IconBase.web.ts` | Import changed to `@3fn/core/blend` | Same |

### Existing Test Verification

All 35 Spec 000 tests continue passing. The `<button>` rendering path is unchanged — the polymorphic code is a separate branch that only activates when `href` is set.

## Validation (Tier 2: Standard)

### Test Results

```
Test Suites: 4 passed, 4 total
Tests:       50 passed, 50 total
```

### Requirements Compliance
- ✅ Requirement 2, AC4: Space does NOT activate `<a>` (verified via no `role="button"` — native `<a>` behavior)
- ✅ Requirement 2, AC7: All existing tests pass unchanged (35 Spec 000 tests green)
- ✅ Requirement 2, AC8: New tests verify `<a>` rendering path (15 tests)
