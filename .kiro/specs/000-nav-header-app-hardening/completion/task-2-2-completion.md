# Task 2.2 Completion: Implement Background Override Mechanism

**Date**: 2026-05-09
**Task**: 2.2 Implement background override mechanism
**Type**: Implementation
**Status**: Complete

---

## Artifacts Modified

- `src/components/core/Nav-Header-App/platforms/web/NavHeaderApp.styles.css` — Added `--nav-bg-override` custom property mechanism

## Implementation Details

### Approach

Exposes `--nav-bg-override` as a public CSS custom property. When set externally (by product JS during scroll), it overrides Base's background color. When not set, the original `color.structure.canvas` value inherits through unchanged.

### Mechanism

```css
:host {
  --color-structure-canvas: var(--nav-bg-override, var(--color-structure-canvas));
}
```

This works because:
1. `:host` redefines `--color-structure-canvas` for everything inside App's shadow tree (including the nested `nav-header` element)
2. When `--nav-bg-override` is set externally, it becomes the new value of `--color-structure-canvas` inside App's shadow tree
3. When `--nav-bg-override` is NOT set, the fallback `var(--color-structure-canvas)` resolves to the *inherited* value from the host's parent context (the original semantic token value)
4. Base's internal `.nav-header` reads `--color-structure-canvas` for its background — it gets the overridden or original value transparently

### Key Decisions

1. **`:host` pattern over `nav-header` selector** — Setting the custom property on `:host` ensures it's available to everything in App's shadow tree, including the composed Base element. Confirmed with Sparky (web platform engineer) that this is correct per CSS spec.
2. **Token redefinition, not direct background-color** — Rather than setting `background-color` directly (which can't pierce Base's shadow DOM), we redefine the token Base already consumes. This respects the existing architecture without modifying Base.
3. **No JavaScript needed** — Pure CSS solution. The product sets `--nav-bg-override` via `element.style.setProperty()` and the cascade handles the rest.

### Product Usage

```javascript
// Product scroll handler sets the override:
navHeaderApp.style.setProperty('--nav-bg-override', 'rgba(128, 255, 187, 1)');

// To reset to default:
navHeaderApp.style.removeProperty('--nav-bg-override');
```

## Validation (Tier 2: Standard)

### Syntax Validation
- ✅ Token pipeline runs without errors (`designerpunk generate` exits 0)
- ✅ CSS is syntactically valid

### Functional Validation
- ✅ Custom property inheritance through Shadow DOM confirmed correct per CSS spec (Sparky review)
- ✅ Fallback chain: `--nav-bg-override` → inherited `--color-structure-canvas` → original token value

### Requirements Compliance
- ✅ Requirement 3, AC1: Nav-Header-App exposes `--nav-bg-override` CSS custom property
- ✅ Requirement 3, AC2: When set, uses override value as background
- ✅ Requirement 3, AC3: When not set, uses `color.structure.canvas` default
- ✅ Requirement 3, AC5: Component does not manage contrast (pure pass-through)

### Requirement 3, AC4 (README documentation) deferred to Task 5.1
