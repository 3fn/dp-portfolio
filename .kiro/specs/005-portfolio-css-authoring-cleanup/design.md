# Design Document: Portfolio Web Authoring Compliance Audit & Cleanup

**Date**: 2026-06-01
**Spec**: 005 - Portfolio Web Authoring Compliance Audit & Cleanup
**Status**: Design Phase
**Dependencies**: @3fn/core 11.8.0 (Web-Authoring-Standards.md, Product-Token-Governance.md)

---

## Overview

This spec is a compliance cleanup — not an architectural change. The design is straightforward: systematically apply Web-Authoring-Standards Hard Rules to existing portfolio files, create product tokens for hard-coded values, fix discovered bugs, and document findings for Spec 006.

The work is mechanical and low-risk. No new abstractions, no structural changes, no behavioral modifications (except bug fixes).

---

## Architecture

No architectural changes. The portfolio's file structure remains:

```
src/pages/index.html          — Page markup + inline critical CSS
src/styles/portfolio.css      — Main stylesheet
src/scripts/*.ts              — Page behavior (9 files)
src/components/product/       — Product-level web components (2)
product/tokens/               — Product token definitions (YAML)
```

---

## Implementation Strategy

### Phase 1: CSS Compliance (portfolio.css + inline styles)

**Logical properties sweep:**
- Find-and-replace physical → logical for all directional properties
- Properties like `overflow: hidden` (non-directional) are left unchanged
- Properties like `width: 100%` on non-directional contexts (flex children, replaced elements) are evaluated case-by-case; retain with comment if physical is correct

**Token audit:**
- Every hard-coded px/rem/hex/rgba value is classified:
  - System token exists → replace with `var(--token-name)`
  - No system token → create product token in `product/tokens/{category}.yaml`, then reference
- New product token categories needed: `color.yaml`, `border.yaml`, `shadow.yaml`
- Existing categories extended: `layout.yaml` (tooltip widths)

**Focus, motion, forced-colors:**
- Replace bare `:focus` with `:focus-visible` pattern
- Verify all transitions have `prefers-reduced-motion` coverage (most already do)
- Add `@media (forced-colors: active)` blocks for interactive elements

### Phase 2: HTML Fixes (index.html)

Minimal changes:
- Fix double-slash in favicon path
- Remove redundant `defer` on module scripts
- No structural changes needed (landmarks and headings are already correct)

### Phase 3: TypeScript Fixes (src/scripts/)

**Bug fixes:**
- `stats.ts`: Change `.stats-value` → `.stats__value`
- `page.ts`: Delete file (dead code)
- `.how-built__easter` in CSS: Fix trailing comma syntax error

**Robustness improvements:**
- `ecosystem.ts`: Add null guards for inner modal element queries
- `ecosystem.ts`: Refactor SVG innerHTML loop to single assignment

### Phase 4: Product Components

- NavAboutPopover: Add `@media (forced-colors: active)` block
- NavHeaderContent: Add `forced-colors` block + `:focus-visible` for links

### Phase 5: Lessons Learned

Document produced after implementation capturing:
- Script patterns needing restructuring for Astro islands
- Event listener cleanup gaps
- Shared utility candidates
- Product token decisions made

---

## Product Token Design

### New Category: `color.yaml`

Product color tokens for values with no system token equivalent:

```yaml
category: color
description: Product-specific color values for decorative and content elements

tokens:
  vizSyntaxCyan:
    value: "#80F6FF"
    unitType: color
    description: Code visualization syntax color — cyan
    rationale: "Content-specific syntax highlighting. No system color maps to this decorative use case."
    platforms: [web]

  vizSyntaxGreen:
    value: "#33FF99"
    unitType: color
    description: Code visualization syntax color — green
    rationale: "Content-specific syntax highlighting. No system color maps to this decorative use case."
    platforms: [web]

  vizSyntaxYellow:
    value: "#F9F002"
    unitType: color
    description: Code visualization syntax color — yellow
    rationale: "Content-specific syntax highlighting. No system color maps to this decorative use case."
    platforms: [web]

  vizSyntaxPink:
    value: "#ff2d8f"
    unitType: color
    description: Code visualization syntax color — pink
    rationale: "Content-specific syntax highlighting. No system color maps to this decorative use case."
    platforms: [web]

  neonGlowGreen:
    value: "rgba(51, 255, 153, 0.8)"
    unitType: color
    description: Neon easter egg glow color — primary green
    rationale: "Decorative animation effect. Specific to neon flicker aesthetic — no system equivalent."
    platforms: [web]

  # Additional neon keyframe colors TBD during implementation audit

  backdropOverlay:
    value: "rgba(10, 10, 15, 0.6)"
    unitType: color
    description: Modal backdrop overlay color
    rationale: "Dark semi-transparent overlay for modal focus. Opacity tuned to portfolio's dark theme."
    platforms: [web]

  footerTextMuted:
    value: "rgba(255, 255, 255, 0.6)"
    unitType: color
    description: Footer secondary text color
    rationale: "Muted white for de-emphasized footer content. No system muted-on-dark token exists."
    platforms: [web]
```

### New Category: `border.yaml`

```yaml
category: border
description: Product-specific border values

tokens:
  tooltipRadius:
    value: 2
    unitType: logical
    description: Border radius for tooltip elements
    rationale: "Minimal radius for tooltip containers. Smaller than system radius-100 (4px)."
    platforms: [web]

  tooltipWidth:
    value: 2
    unitType: logical
    description: Border width for tooltip containers
    rationale: "Visible border for tooltip definition. No system border-width token at 2px."
    platforms: [web]
```

### New Category: `shadow.yaml`

```yaml
category: shadow
description: Product-specific shadow values

tokens:
  cardHoverElevation:
    value: "0 6px 32px rgba(0, 0, 0, 0.35)"
    unitType: shadow
    description: Elevated shadow for ecosystem card hover state
    rationale: "Dramatic elevation for interactive card hover. Deeper than system shadow tokens."
    platforms: [web]
```

### Extended: `layout.yaml`

```yaml
  tooltipMaxWidth:
    value: 270
    unitType: logical
    description: Maximum width for career tooltip
    rationale: "Constrained for readability at tooltip font size. Content-specific."
    platforms: [web]

  chordTipMaxWidth:
    value: 260
    unitType: logical
    description: Maximum width for chord diagram tooltip
    rationale: "Slightly narrower than career tooltip — less content density."
    platforms: [web]

  vizBranchGapColumn:
    value: 12
    unitType: logical
    description: Column gap for visualization branch layout
    rationale: "Tight spacing for code-like visualization. Not a system spacing scale value."
    platforms: [web]

  vizBranchGapRow:
    value: 4
    unitType: logical
    description: Row gap for visualization branch layout
    rationale: "Minimal row spacing for dense code visualization."
    platforms: [web]

  vizBranchMarginTop:
    value: 8
    unitType: logical
    description: Top margin for visualization branch container
    rationale: "Optical spacing between branch label and branch content."
    platforms: [web]
```

---

## Forced Colors Implementation

### Pattern

Each interactive element group gets a `@media (forced-colors: active)` block:

```css
@media (forced-colors: active) {
  .ecosystem__system {
    border: 1px solid ButtonText;
  }

  .ecosystem__system:focus-visible {
    outline: 2px solid Highlight;
  }

  .skip-to-content:focus-visible {
    outline: 2px solid Highlight;
    background: Canvas;
    color: CanvasText;
  }
}
```

### System Color Keywords Used

| Keyword | Usage |
|---------|-------|
| `ButtonText` | Borders on interactive elements |
| `Highlight` | Focus indicators |
| `Canvas` | Background for skip-link visibility |
| `CanvasText` | Text on Canvas backgrounds |
| `LinkText` | Navigation link text (NavHeaderContent) |

Full system color keyword set is available per CSS spec — not limited to the two mentioned in requirements AC.

---

## Error Handling

Not applicable — this is a compliance cleanup with no runtime error handling changes. The ecosystem.ts null guard additions prevent potential runtime errors but don't introduce error handling strategy.

---

## Testing Strategy

### Visual Verification

- Dev server comparison before/after for standard display mode
- Forced-colors mode verification (Windows High Contrast or browser emulation)
- Stats section verification (count-up animation now fires)

### Automated Checks

- Build passes (`npm run build` or equivalent)
- No TypeScript compilation errors
- CSS linting (if configured) passes

### Manual Verification Checklist

- [ ] All sections render identically in standard mode
- [ ] Skip-to-content appears on keyboard focus (Tab from page load)
- [ ] Ecosystem cards show borders in forced-colors mode
- [ ] Stats numbers animate on scroll
- [ ] Neon easter egg still animates (with product token colors)
- [ ] Modal backdrop appears correctly
- [ ] Chord and career tooltips display correctly

---

## Design Decisions

### Decision 1: Product Tokens for All Colors (Including Decorative)

**Options Considered**:
1. Document decorative colors as exceptions with CSS comments
2. Create product tokens for all color values

**Decision**: Option 2 — product tokens for everything.

**Rationale**: Peter's explicit decision. Web-Authoring-Standards states "There is no 'hard-code and move on' path for tokenizable value categories." Color is tokenizable. Decorative intent doesn't change the governance rule. Product tokens also make these values discoverable via Product MCP and queryable during future audits.

**Trade-offs**: More tokens to maintain (~12-15 color tokens), but they're stable (decorative values rarely change) and self-documenting.

### Decision 2: Don't Restructure Scripts for Astro

**Options Considered**:
1. Restructure scripts now (export init functions, add cleanup)
2. Document patterns in lessons-learned, restructure in Spec 006

**Decision**: Option 2 — document only.

**Rationale**: Restructuring scripts is Spec 006's job. Doing it here creates scope creep and risks introducing bugs in working code. The lessons-learned document gives Spec 006 a clear roadmap.

**Trade-offs**: Event listener leaks remain until Spec 006, but they're harmless in the current single-page architecture.

### Decision 3: Null Guards Over Non-Null Assertions

**Options Considered**:
1. Keep non-null assertions (current pattern)
2. Add null guards with early returns
3. Add null guards with error logging

**Decision**: Option 2 — null guards with early returns.

**Rationale**: Silent early return is appropriate for DOM elements that might not exist. If an element is missing, the feature gracefully degrades rather than throwing. No need for error logging in a portfolio site.

**Trade-offs**: Slightly more verbose code, but safer for Astro island extraction where DOM state is less predictable.
