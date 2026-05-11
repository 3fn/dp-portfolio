# Task 2.2 Completion: Implement Polymorphic Rendering (Web)

**Date**: 2026-05-10
**Task**: 2.2 Implement polymorphic rendering (web)
**Type**: Implementation
**Status**: Complete

---

## Artifacts Modified

- `src/components/core/Button-CTA/types.ts` — Added `iconPosition` prop
- `src/components/core/Button-CTA/Button-CTA.schema.yaml` — Added `iconPosition` prop
- `src/components/core/Button-CTA/platforms/web/ButtonCTA.web.ts` — Polymorphic rendering + iconPosition

## Implementation Details

### Approach

Modified `_createDOM()` to conditionally render `<a>` or `<button>` based on `href` prop presence. All visual styling remains identical — only the root element tag and its attributes change. Added `iconPosition` to control icon placement (leading/trailing).

### Changes to ButtonCTA.web.ts

| Change | Description |
|--------|-------------|
| `observedAttributes` | Added `href`, `target`, `rel`, `icon-position` |
| Property getters/setters | Added for all four new attributes |
| `_createDOM()` | Conditional tag (`<a>` vs `<button>`), link-specific attrs, button-specific attrs, icon position |

### Rendering Logic

```
href set?
├── YES → <a href="..." target="..." rel="...">
│         (no type, no role, no disabled)
└── NO  → <button type="button" role="button" disabled="..." aria-disabled="...">
          (existing behavior, unchanged)

iconPosition?
├── 'leading' (default) → [icon] [label]
└── 'trailing'          → [label] [icon]
```

### Auto-rel Behavior

```typescript
const rel = this.rel || (this.target === '_blank' ? 'noopener noreferrer' : null);
```

When `target="_blank"` and no explicit `rel` is provided, `rel="noopener noreferrer"` is automatically applied for security.

### Key Decisions

1. **`disabled` ignored on links** — When `href` is set, `disabled` and `aria-disabled` attributes are not rendered. Links aren't disableable per DesignerPunk philosophy.
2. **Icon position via DOM order** — Leading puts icon HTML before label HTML; trailing puts it after. CSS flexbox handles the visual layout. No `order` property needed.
3. **Full re-render on href change** — If `href` is added/removed after initial render, `_updateDOM()` would need to swap the root element. Current implementation handles this at `_createDOM` time. Dynamic href changes would require a full re-render (acceptable — this is a rare case).

### `iconPosition` Addition

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `iconPosition` | `'leading' \| 'trailing'` | `'leading'` | Icon placement relative to label |

Added to both `types.ts` and `schema.yaml`. Default is `'leading'` — existing behavior unchanged for all current consumers.

## Validation (Tier 2: Standard)

### Syntax Validation
- ✅ Token pipeline passes
- ✅ All 35 existing tests pass (no regression)

### Functional Validation
- ✅ Existing `<button>` path unchanged (no href → same output as before)
- ✅ `<a>` path renders with href, target, auto-rel
- ✅ `disabled` not applied to `<a>` elements
- ✅ `iconPosition="trailing"` puts icon after label
- ✅ `iconPosition="leading"` (default) puts icon before label

### Requirements Compliance
- ✅ Requirement 2, AC1: Renders `<a>` when href set
- ✅ Requirement 2, AC2: Renders `<button>` when href absent (unchanged)
- ✅ Requirement 2, AC3: `rel="noopener noreferrer"` auto-applied with `target="_blank"`
- ✅ Requirement 2, AC7: All existing tests pass unchanged
- ✅ Requirement 2, AC10: Explicit icon via `icon` + `iconPosition` props
