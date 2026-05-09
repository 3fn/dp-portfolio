# Task 4.1 Completion: Write Nav-Header-App Contract Tests

**Date**: 2026-05-09
**Task**: 4.1 Write Nav-Header-App contract tests
**Type**: Implementation
**Status**: Complete

---

## Artifacts Created

- `src/components/core/Nav-Header-App/__tests__/NavHeaderApp.contracts.test.ts` — 11 contract test cases

## Implementation Details

### Approach

Tests verify behavioral contracts by inspecting the shadow DOM structure and CSS content. Uses the same pattern as existing `@3fn/core` component tests: jsdom environment, manual `connectedCallback()`, shadow DOM queries.

### Test Coverage

| Contract | Tests | Validation Strategy |
|----------|-------|-------------------|
| `visual_background_override` | 3 | Verify CSS contains `--nav-bg-override`, fallback chain, `:host` redefinition |
| `visual_glow` | 4 | Verify box-shadow present, blur-200 token, pre-baked rgba, `--nav-glow-color` exposed |
| `accessibility_no_heading` | 1 | Query shadow DOM for h1–h6 elements, expect none |
| Border color override | 3 | Verify `--nav-border-color`, green-400 default, `:host` redefinition |

### Test Strategy

Tests verify the *presence* of contract-fulfilling CSS declarations rather than computed styles. This is because:
1. jsdom doesn't compute CSS custom properties
2. The contract guarantee is "the mechanism exists" — runtime behavior is validated by the CSS spec itself
3. This matches the existing test pattern in `@3fn/core` (structural verification)

### Validation Limitation

Tests cannot be run from this product repo (no Jest configuration). They are written to be runnable when the test infrastructure is set up or when merged into `@3fn/core`.

## Validation (Tier 2: Standard)

### Requirements Compliance
- ✅ Requirement 15, AC1: Tests for `visual_background_override` (custom property overrides background)
- ✅ Requirement 15, AC2: Tests for `visual_glow` (underglow present, color responds to custom property)
- ✅ Requirement 15, AC3: Tests for `accessibility_no_heading` (no heading in DOM)
- ✅ Requirement 15 (LINA-R7): Tests for border override (`--nav-border-color` overrides separator)
