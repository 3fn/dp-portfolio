# Task 2.3 Completion: Add Behavioral Contracts

**Date**: 2026-05-10
**Task**: 2.3 Add behavioral contract
**Type**: Implementation
**Status**: Complete

---

## Artifacts Modified

- `src/components/core/Button-CTA/contracts.yaml` — Added 2 new contracts

## Implementation Details

### Contracts Added

| Contract | Category | Required | Description |
|----------|----------|----------|-------------|
| `content_renders_link` | content | false | Polymorphic rendering: `<a>` when href set, `<button>` otherwise |
| `layout_icon_position` | layout | false | Icon at leading or trailing position based on prop |

### Key Decisions

1. **`required: false` for both** — These are additive behaviors. Existing consumers without `href` or `iconPosition` are unaffected. The contracts document optional capabilities, not mandatory guarantees.
2. **`content_renders_link` not `content_renders`** — More specific name. The concept is specifically about rendering as a link element, not generic polymorphism.
3. **WCAG reference on `content_renders_link`** — "4.1.2 Name, Role, Value" because the rendered element determines the role announced to assistive technology (link vs button).
4. **No WCAG on `layout_icon_position`** — Icon position is a visual layout concern with no accessibility impact (icon is `aria-hidden`).

### New Concepts for Catalog

These are new concepts not in the existing 136-concept catalog:
- `content_renders_link` — component renders as link element based on props
- `layout_icon_position` — component positions icon at leading or trailing

Per my scaffolding workflow, new concepts should be proposed as a ballot measure. Both were approved through the spec feedback process (design-outline Decision 1, Peter confirmed).

## Validation (Tier 2: Standard)

### Syntax Validation
- ✅ YAML syntactically valid
- ✅ Build passes
- ✅ All 35 tests pass

### Functional Validation
- ✅ Contracts follow canonical format (category, description, behavior, wcag, platforms, validation, test_approach, required)
- ✅ Contract names follow `{category}_{concept}` naming convention
- ✅ Validation criteria are testable (will be implemented in Task 2.4)

### Requirements Compliance
- ✅ Requirement 2, AC6: Behavioral contract documents dual-render behavior
