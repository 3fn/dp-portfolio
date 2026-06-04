# Task 1.4 Completion: Enhance Why Build Section Layout

**Date**: 2026-06-04
**Task**: 1.4 Enhance Why Build section layout
**Type**: Implementation
**Status**: Complete

---

## Summary

Replaced the 4-column card grid with a two-column narrative layout: copy subsections on the left (5fr), sticky token cluster on the right (4fr). Added 16 flap-token pill elements with `data-states` attributes for the scroll-driven animation (Task 3).

---

## HTML Changes

### Left Column (`.why-build__copy`)
Three `.why-build__beat` subsections:
1. **Challenge** — Two paragraphs on AI speed vs unpredictability
2. **Insight & Thesis** — Thesis statement ("Design systems are shared working agreements...") + 3 numbered principles
3. **Goals** — 3 ordered goals (#1 updated: "production-grade" replaces "enterprise-tier")

### Right Column (`.why-build__evolution`)
- 16 `.flap-token` divs with `data-states` pipe-separated phase values
- All Phase 1 values unique (no duplicates)
- Phase 3→4 mappings verified against real system primitive→semantic relationships
- `aria-label` on container for accessibility

---

## CSS Changes

| Selector | Purpose |
|----------|---------|
| `.why-build__narrative` | 5fr/4fr grid, `space900` gap |
| `.why-build__beat` | Subsection spacing (`space700` margin) |
| `.why-build__thesis-statement` | Bold, default color |
| `.why-build__principles`, `.why-build__goals` | Ordered lists |
| `.why-build__evolution` | Sticky positioning, flex-wrap |
| `.flap-token` | Pill: border, mono font, rotation via `--flap-rotation` custom property |
| `.flap-token.resolved` | Flattens rotation to 0 |
| `.flap-text` | Inline-block for transform transitions |
| `@media (prefers-reduced-motion)` | No transform/transition on flap elements |

### Responsive Updates
- **Tablet**: Narrative collapses to single column, sticky removed (`position: static`)
- **Mobile**: Tighter gap (`space500`)
- **Reduced motion**: `.why-build__card` removed from transition:none list (element no longer exists)

---

## Validation

- [x] All new CSS uses logical properties
- [x] All values reference system/product tokens (no hard-coded values)
- [x] 16 unique Phase 1 token values (no duplicates)
- [x] Phase 3→4 mappings are real system relationships
- [x] Sticky uses `--product-layout-token-evolution-sticky-offset`
- [x] `prefers-reduced-motion` disables transform and transition on flap elements
- [x] Responsive rules updated for new structure
- [x] Zero remaining `.why-build__card` references in CSS
