# Token Audit: Desktop-110 Mock

**Date**: 2026-05-08
**Source**: Figma file `yU7908VXR1khQN5hZXC6Cy`, node `3435:72397`
**Method**: Plugin API extraction via Console MCP (`figma_execute`)

---

## Executive Summary

| Metric | Value |
|--------|-------|
| Nodes in mock | 12,542 |
| Nodes with token bindings | 11,998 (95.7%) |
| Total binding entries | 23,970 |
| Unique variables used | 49 |
| Primitives used | 49 (100%) |
| Semantics used | 0 (0%) |
| Color primitives | 43 |
| Spacing primitives | 6 |

**Key finding**: The mock is thoroughly tokenized at the primitive level but uses zero semantic tokens. All 49 variables are from the "Primitives" collection. This means the design intent is encoded (values aren't arbitrary) but the semantic layer hasn't been applied.

---

## Semantic Mapping Recommendations

Based on usage context (node names, property types, frequency), here are the recommended semantic token mappings:

### Structure Tokens (Page Architecture)

| Primitive | Usage | Context | Recommended Semantic |
|-----------|-------|---------|---------------------|
| `color/white/100` | 8x | Page background, CTA text | `color.structure.canvas` |
| `color/yellow/100` | 5,929x | Vector fills (illustrations, decorative) | Illustration fill — no semantic needed |
| `color/green/100` | 484x | Hero Container, Easter Egg, Agents Directory | Section background (accent) — **needs new semantic** |
| `color/black/100` | 22x | Body copy text | `color.structure.text` or `color.contrast.onLight` |
| `color/black/300` | 187x | Nav links, icons, secondary CTA | `color.contrast.onLight` |
| `color/black/500` | 198x | Headings ("The design system built for...") | `color.contrast.onLight` (heading weight) |

### Action Tokens (Interactive Elements)

| Primitive | Usage | Context | Recommended Semantic |
|-----------|-------|---------|---------------------|
| `color/pink/300` | 4,842x | Primary CTA, section backgrounds | `color.action.primary` |
| `color/pink/500` | 28x | Stats container, stat labels | `color.action.primary` (emphasis variant) |
| `color/green/200` | 16x | NavBar fill/stroke | `color.action.navigation` or **new: `color.structure.nav`** |
| `color/green/400` | 4x | NavBar stroke | `color.structure.border` (nav context) |

### Content Tokens (Typography & Body)

| Primitive | Usage | Context | Recommended Semantic |
|-----------|-------|---------|---------------------|
| `color/black/200` | 226x | Credits, body paragraphs | `color.contrast.onLight` (secondary) |
| `color/black/400` | 6x | Long-form body text | `color.contrast.onLight` |
| `color/gray/300` | 23x | Agent descriptions, subsystem labels | `color.structure.text.secondary` — **needs new semantic** |
| `color/gray/400` | 44x | Feature descriptions | `color.structure.text.secondary` — **needs new semantic** |
| `color/white/200` | 34x | Section headings on dark backgrounds | `color.contrast.onDark` |
| `color/white/300` | 13x | Taglines, contact info | `color.contrast.onDark` |
| `color/white/400` | 26x | Logo marks, brand labels | `color.contrast.onDark` (emphasis) |

### Decorative/Illustration Tokens (No Semantic Needed)

These are used exclusively in vector illustrations and decorative elements. They don't represent semantic intent — they're artistic choices.

| Primitive | Usage | Context |
|-----------|-------|---------|
| `color/yellow/100` | 5,929x | Illustration vectors |
| `color/cyan/100` | 2,973x | Illustration vectors |
| `color/yellow/300` | 1,517x | Section containers, illustration |
| `color/pink/100` | 1,415x | Stats container, illustration |
| `color/teal/300` | 1,205x | Illustration vectors |
| `color/teal/500` | 400x | Vectors |
| `color/teal/100` | 388x | Vectors |
| `color/purple/200` | 106x | Vectors |
| `color/purple/100` | 13x | Copy containers, vectors |

### Brand/Identity Tokens

| Primitive | Usage | Context | Recommended Semantic |
|-----------|-------|---------|---------------------|
| `color/purple/300` | 2,469x | Rosetta/Stemma/Civitas connectors, decorative | Brand accent — **consider `color.identity.brand`** |
| `color/orange/300` | 864x | Agent portraits, "Hard work" section | `color.identity.human` (already exists) |
| `color/cyan/300` | 23x | "18 years of human context" | `color.action.navigation` |

### Border/Divider Tokens

| Primitive | Usage | Context | Recommended Semantic |
|-----------|-------|---------|---------------------|
| `color/gray/100` | 26x | Divider lines, agent container borders | `color.structure.border.subtle` |
| `color/purple/400` | 30x | Section borders/lines | `color.structure.border` (accent) — **needs new semantic** |
| `color/pink/400` | 20x | Section borders/lines | `color.structure.border` (accent) |
| `color/cyan/400` | 22x | Section borders/lines | `color.structure.border` (accent) |
| `color/yellow/400` | 230x | Section borders, illustration | `color.structure.border` (accent) |

### Spacing Tokens

| Primitive | Usage | Context | Recommended Semantic |
|-----------|-------|---------|---------------------|
| `space/025` | 20x | Feature containers (border-radius?) | Likely `radius` usage, not spacing |
| `space/050` | 36x | Small frames (gaps) | `space.inline.tight` |
| `space/100` | 32x | Agent containers | `space.stack.normal` |
| `space/150` | 23x | Feature frames | `space.stack.comfortable` |
| `space/200` | 13x | Content containers | `space.stack.spacious` |
| `space/250` | 5x | Icon sizing (height) | `icon.size` — not spacing |
| `space/300` | 50x | Content/header containers | `space.inset.comfortable` or `space.stack.loose` |

---

## Gap Analysis: New Tokens Needed

Based on this audit, the following semantic tokens don't exist and would need to be created:

### High Priority (clear semantic intent, multiple uses)

1. **`color.structure.text.secondary`** — For de-emphasized body text (gray/300, gray/400 usage). Currently no semantic for "secondary text that isn't feedback or action."

2. **Section accent backgrounds** — The mock uses colored section backgrounds (green/100, pink/100, yellow/300) to create visual rhythm. No existing semantic covers "section accent background." Options:
   - `color.structure.surface.accent` (generic)
   - Product-level component tokens (per-section)
   - Leave as primitives (artistic choice, not semantic)

### Low Priority (may not generalize)

3. **`color.structure.border.accent`** — Colored borders (purple/400, pink/400, cyan/400) used as section dividers. Could be product-specific.

4. **`color.identity.brand`** — Purple/300 used as the DesignerPunk brand color in connectors and decorative elements. Might be too product-specific for the core system.

---

## Observations

1. **The mock is a portfolio site, not a product UI.** Most of the color usage is decorative/illustrative, not functional UI. The semantic token system is designed for functional UI (buttons, forms, feedback). Forcing semantic tokens onto illustration fills would be misuse.

2. **~80% of binding entries are illustration vectors.** The top 5 colors (yellow/100, pink/300, cyan/100, purple/300, yellow/300) account for 16,730 of 23,970 entries and are almost entirely decorative.

3. **The functional UI elements DO map cleanly to existing semantics.** Nav links → `color.contrast.onLight`, CTAs → `color.action.primary`, page background → `color.structure.canvas`. The gap is small.

4. **Spacing usage is minimal.** Only 6 spacing tokens used, suggesting most layout is done with Figma auto-layout values that aren't bound to variables.

5. **No typography variables.** Text styles are likely applied as Figma text styles (not variables), which is why they don't appear in `boundVariables`. A separate audit of applied text styles would be needed.

---

## Recommended Next Steps

1. **Don't create semantic tokens for illustrations.** The decorative vectors should stay on primitives — they're artistic, not semantic.

2. **Create `color.structure.text.secondary`** — This is a genuine gap. Multiple contexts need "de-emphasized text" that isn't feedback.

3. **Apply existing semantics to functional elements** — The nav, CTAs, headings, and body text can use existing semantic tokens. This is a Figma-side task (rebind variables from primitives to semantics).

4. **Audit text styles separately** — Typography tokens aren't captured by `boundVariables`. Need to check applied text styles via `figma_get_styles` or the official MCP's `get_variable_defs`.

5. **Fix the `@3fn/core` extractor** — So future audits can run automatically without this manual Plugin API workaround.

---

*Generated by Ada from Plugin API extraction data.*
