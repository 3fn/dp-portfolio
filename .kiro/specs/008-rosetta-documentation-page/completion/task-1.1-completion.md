# Task 1.1 Completion: Create Product Tokens

**Date**: 2026-06-12
**Task**: 1.1 Create product tokens
**Type**: Setup
**Status**: Complete

---

## Artifacts Modified

- `product/tokens/layout.yaml` — +5 tokens
- `product/tokens/motion.yaml` — +2 tokens
- `product/tokens/color.yaml` — +2 tokens
- `dist/tokens/product/ProductTokens.web.css` — regenerated (manual, pipeline blocked)
- `public/tokens/product/ProductTokens.web.css` — copied

---

## Tokens Created (9 total)

### Layout (5)

| Token | Value | Rationale |
|-------|-------|-----------|
| `docsNarrativeMaxWidth` | 680 | Reading-optimized column width within three-column layout |
| `docsNavRailCollapsed` | 80 | Min nav width for icon + truncated label. Beyond system scale (max 64). |
| `docsNavRailExpanded` | 260 | Full label width on hover/focus |
| `docsTooltipMaxWidth` | 300 | Wider than portfolio tooltips (270) for two-part format |
| `docsBeatSpacing` | 80 | Vertical beat separation. Beyond system scale (max 64). |

### Motion (2)

| Token | Value | Rationale |
|-------|-------|-----------|
| `docsVizNodeDuration` | 500ms | Deliberate decorative transition (>350ms system max). >300ms tolerance applies. |
| `docsVizPositionDuration` | 600ms | Slower position settle for staged reveal. Decorative. |

### Color (2)

| Token | Value | Rationale |
|-------|-------|-----------|
| `docsVizTooltipBg` | rgba(13,13,26,0.97) | Dark blue-tinted near-opaque tooltip. Distinct from portfolio white tooltips. |
| `docsVizNodeGlow` | rgba(128,246,255,0.4) | Cyan200 at 40% opacity for glow filter. Can't express as simple ref. |

---

## System-First Eliminations

| Value | System Token Used | Why No Product Token |
|-------|------------------|---------------------|
| Viz panel background | `black400` | Exact match (rgba(6,6,10,1)) |
| Nav rail transition | `duration150` | 150ms is appropriate for UI expand/collapse |
| Cyan accent | `cyan200` | System primitive, used directly |
| Body text | `typography.bodyMd` system semantic | Covers docs body copy |
| Beat title | `typography.h2` system semantic | Covers beat headings |

---

## Validation

- [x] All YAML files pass `yaml.safe_load`
- [x] All token names are camelCase
- [x] All hard-value tokens have `rationale` field
- [x] System-First workflow followed (queried system tokens before creating)
- [x] ProductTokens.web.css regenerated and copied to public/
