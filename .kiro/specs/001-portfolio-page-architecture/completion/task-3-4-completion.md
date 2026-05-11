# Task 3.4 Completion: CSS Utilities

**Date**: 2026-05-10
**Task**: 3.4 CSS utilities (hard shadow, text shadow, prefix)
**Type**: Setup
**Status**: Complete

---

## Artifacts Created

- `src/styles/utilities.css` — Hard shadow, text shadow, and section heading prefix utilities
- `src/pages/index.html` (modified) — Added utilities.css reference

## Implementation Details

### Utilities Defined

| Utility | Purpose | Token References |
|---------|---------|-----------------|
| `.hard-shadow` | Card hard shadow (8px offset) | `--space-100`, `--blur-000`, `--hard-shadow-color` (custom prop, default `--purple-300`) |
| `.text-shadow-hard` | Text hard shadow (2px offset) | `--space-025`, `--blur-000`, `--text-shadow-color` (custom prop, default `--pink-500`) |
| `.section-heading` | Flex container for prefix + heading | `--space-grouped-tight` |
| `.section-prefix` | Non-shrinking prefix element | flex-shrink: 0 |

### Usage Pattern

Sections set `--hard-shadow-color` to their contextual color:
```css
#why-build { --hard-shadow-color: var(--purple-300); }
#critical-features { --hard-shadow-color: var(--pink-300); }
```

Section headings use:
```html
<h2 class="section-heading">
  <span class="section-prefix" aria-hidden="true">//</span>
  <span>Heading text</span>
</h2>
```

## Validation (Tier 1: Minimal)

- ✅ All token references verified against `dist/tokens/DesignTokens.web.css`
- ✅ `--space-grouped-tight` confirmed (→ `var(--space-050)` → 4px)
- ✅ Wired into index.html

### Requirements Compliance
- ✅ Req 16 AC1-4: Section prefix pattern with aria-hidden, grouped-tight spacing, utility class approach
- ✅ Req 20 AC1-5: Hard shadow utility with --hard-shadow-color, space100 offset, blur000, opacity100
- ✅ Req 20 AC6: Text shadow separate utility (space025 offset)
