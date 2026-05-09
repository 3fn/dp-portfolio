# Task 2.4 Completion: Implement Border Color Override

**Date**: 2026-05-09
**Task**: 2.4 Implement border color override
**Type**: Implementation
**Status**: Complete

---

## Artifacts Modified

- `src/components/core/Nav-Header-App/platforms/web/NavHeaderApp.styles.css` — Added `--nav-border-color` override mechanism

## Implementation Details

### Approach

Same `:host` token-redefinition pattern as Task 2.2 (background override). Redefines `--color-structure-border-subtle` on `:host` so it inherits into Base's shadow DOM where the separator consumes it.

### CSS Added

```css
:host {
  --color-structure-border-subtle: var(--nav-border-color, var(--green-400));
}
```

### Key Decisions

1. **App overrides Base's default** — Base uses `color.structure.border.subtle` (gray at 48% opacity). App intentionally overrides this to `green400` as its own default. This is documented in the design as an explicit override, not a bug.
2. **`green400` as App default, not the original token** — The fallback is `var(--green-400)`, not `var(--color-structure-border-subtle)`. This means even without `--nav-border-color` set, the border is green (matching the Figma design), not gray.
3. **Same `:host` pattern** — Consistent with background override. All three overrides (bg, glow, border) follow the same architectural pattern.

## Validation (Tier 2: Standard)

### Syntax Validation
- ✅ Token pipeline runs without errors
- ✅ All platforms mathematically consistent

### Functional Validation
- ✅ Token redefinition inherits into Base's shadow DOM (same proven pattern as Task 2.2)
- ✅ Fallback chain: `--nav-border-color` → `--green-400` (App default)

### Requirements Compliance
- ✅ Requirement 5, AC1: Exposes `--nav-border-color` CSS custom property
- ✅ Requirement 5, AC2: When set, separator uses override value
- ✅ Requirement 5, AC3: When not set, uses green400 as default
- ✅ Requirement 5, AC4: README coordination warning deferred to Task 5.1
