# Design Document: Portfolio System Readiness

**Date**: 2026-05-25
**Spec**: 003 - Portfolio System Readiness
**Status**: Design Phase
**Dependencies**: Spec 002 ✅ Complete, @3fn/core v11.7.1 installed

---

## Overview

This spec delivers three parallel workstreams that prepare the system for portfolio page implementation. The design is organized by layer, with each layer's methodology, interfaces, and validation approach documented independently.

### Cross-References

| Detail | Location |
|--------|----------|
| Token creation list (values, formulas) | `design-outline.md` § "Layer 1" |
| Product token format specification | `Product-Token-Governance.md` (package steering doc) |
| Spec 002 token mapping (source data for product tokens) | `.kiro/specs/002-portfolio-token-compliance/analysis/non-aligning-evaluation.md` |
| Screen spec YAML format | `DesignerPunk-Integration-Guide.md` § "Writing Screen Specs" |

---

## Layer 1: System Token Creation (Ada)

### Methodology

Ada creates tokens following standard Rosetta workflow:
1. Define token in the appropriate family source file
2. Verify mathematical relationship and formula
3. Run pipeline generation (`npx designerpunk generate`)
4. Verify platform output (CSS, Swift, Kotlin)
5. Run test suite to confirm no regressions
6. Update family documentation

### Token Specifications

#### Spacing Primitives

| Token | Value | Formula | Source File |
|-------|-------|---------|-------------|
| space900 | 72 | base × 9 = 8 × 9 | `src/tokens/SpacingTokens.ts` |
| space1200 | 96 | base × 12 = 8 × 12 | `src/tokens/SpacingTokens.ts` |
| space1600 | 128 | base × 16 = 8 × 16 | `src/tokens/SpacingTokens.ts` |

#### Shadow Primitives

| Token | Value | Formula | Source File |
|-------|-------|---------|-------------|
| shadowOffsetY.600 | 24 | base × 6 = 4 × 6 | `src/tokens/ShadowOffsetTokens.ts` |
| blur400 | 64 | base × 4 = 16 × 4 | `src/tokens/BlurTokens.ts` |

#### Semantic Tokens

| Token | Reference | Source File |
|-------|-----------|-------------|
| color.text.heading | black300 | `src/tokens/semantic/ColorTokens.ts` |
| space.sectioned.generous | space1200 | `src/tokens/semantic/SpacingTokens.ts` |
| space.sectioned.expansive | space1600 | `src/tokens/semantic/SpacingTokens.ts` |

#### Semantic Update

| Token | Change | Source File |
|-------|--------|-------------|
| shadow.modal | offsetY → shadowOffsetY.600, blur → blur400 | `src/tokens/semantic/ShadowTokens.ts` |

### Validation

- All tokens pass `npx designerpunk generate` without errors
- Mathematical relationship validation passes (≤5% tolerance)
- Token-index regenerated and includes new entries
- Semantic tokens resolve correctly (e.g., `space.sectioned.generous` → space1200 → 96)
- Existing test suite passes (no regressions from shadow.modal update)
- `shadow.modal` consumer impact: confirmed safe — Spec 002 audit found no existing consumers of shadow.modal in production. The portfolio page is the first consumer.
- Token Quick Reference, Shadow family doc, and color.text.* hierarchy doc all updated and accurate

---

## Layer 2: Product Token Authoring (Leonardo)

### Methodology

1. Add `productTokens: './product/tokens'` to `designerpunk.config.ts`
2. Author YAML files per `Product-Token-Governance.md` format
3. Run `npx designerpunk generate` (after Layer 1 merges)
4. Run `npx designerpunk validate --product-tokens`
5. Verify generated CSS output

### Source Files

#### product/tokens/layout.yaml

```yaml
category: layout
description: Structural layout constraints for the portfolio page

tokens:
  contentMaxWidth:
    value: 1336
    unitType: logical
    description: Maximum content column width
    rationale: "Optimized for 70-75 characters per line at body font size across common viewport widths. Not a base-8 multiple — product-specific layout decision."
    platforms: [web, ios, android]

  contentIndent:
    ref: space300
    description: Left indent for section content and headings
    platforms: [web, ios, android]

  proseMeasureMax:
    value: 48
    unitType: ch
    description: Maximum line length for body text
    rationale: "Typographic best practice for readability. Character-width unit — web-only concept."
    platforms: [web]

  quoteMaxWidth:
    value: 640
    unitType: logical
    description: Maximum width for blockquote elements
    rationale: "Narrower than content column for visual distinction. Not a base-8 multiple."
    platforms: [web, ios, android]

  modalMaxWidth:
    value: 1020
    unitType: logical
    description: Maximum width for ecosystem detail modals
    rationale: "Accommodates two-column layout (copy + visualization) at comfortable reading width."
    platforms: [web, ios, android]

  ctaActionsMaxWidth:
    value: 280
    unitType: logical
    description: Maximum width for CTA button group
    rationale: "Constrains button width for visual balance against adjacent featured text."
    platforms: [web, ios, android]

  illustrationMaxWidth:
    value: 380
    unitType: logical
    description: Maximum width for ecosystem system illustration
    rationale: "Balanced against flanking system cards in 3-column layout."
    platforms: [web, ios, android]

  cardHeaderMaxWidth:
    value: 180
    unitType: logical
    description: Maximum width for system card SVG headers
    rationale: "Proportional to card width — prevents header from dominating card content."
    platforms: [web, ios, android]

  ctaBottomPadding:
    value: 224
    unitType: logical
    description: Bottom padding for CTA section
    rationale: "Creates visual weight and space for background image reveal. Decorative — not derived from spacing scale."
    platforms: [web]
```

#### product/tokens/motion.yaml

```yaml
category: motion
description: Product-specific motion characteristics

tokens:
  flipDuration:
    ref: duration350
    description: Card-to-modal FLIP expansion timing
    platforms: [web, ios, android]

  flipEasing:
    value: "cubic-bezier(0.4, 0, 0.2, 1)"
    unitType: easing
    description: Card-to-modal FLIP expansion curve
    rationale: "Material deceleration curve — fast departure, gentle arrival. Standard for expand/reveal animations."
    platforms: [web]

  flickerDuration:
    value: 800
    unitType: duration
    description: Neon easter egg flicker animation cycle
    rationale: "Tuned to 24fps flicker perception threshold. Decorative — not a functional transition."
    platforms: [web]
```

### Expected Generated Output

`dist/product/ProductTokens.web.css`:
```css
:root {
  --product-layout-content-max-width: 1336px;
  --product-layout-content-indent: var(--space-300);
  --product-layout-prose-measure-max: 48ch;
  --product-layout-quote-max-width: 640px;
  --product-layout-modal-max-width: 1020px;
  --product-layout-cta-actions-max-width: 280px;
  --product-layout-illustration-max-width: 380px;
  --product-layout-card-header-max-width: 180px;
  --product-layout-cta-bottom-padding: 224px;
  --product-motion-flip-duration: var(--duration-350);
  --product-motion-flip-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --product-motion-flicker-duration: 800ms;
}
```

### Validation

- `npx designerpunk validate --product-tokens` exits with code 0
- All `ref` tokens resolve (space300, duration350 exist in token-index)
- Generated CSS contains all expected custom properties
- `get_product_tokens` MCP tool returns all tokens with descriptions

---

## Layer 3: Screen Specification (Leonardo)

### Methodology

The screen spec follows the Product MCP YAML format documented in `DesignerPunk-Integration-Guide.md` § "Writing Screen Specs." It will be authored section-by-section, with each section containing:

- Component/element tree with semantic HTML
- Token references (system + product) per node
- Interaction specification (where applicable)
- Accessibility annotations
- Visual reference to prototype section

### Screen Spec Structure

```yaml
name: portfolio
type: marketing-page
status:
  spec: in-progress
  web: not-started
  ios: not-started
  android: not-started

ux-direction: |
  Single-page portfolio showcasing DesignerPunk design system.
  Narrative arc: hook → credibility → problem/insight → ecosystem → methodology → value → social proof → CTA.

visual-reference: docs/specs/staticReview/hero-exploration.html

sections:
  - nav
  - hero
  - stats
  - why-build
  - ecosystem
  - how-built
  - enterprise
  - code-shots
  - who-built
  - agents
  - thanks
  - cta
  - footer
```

Each section gets a detailed `ui-tree` with:
- Semantic element (`section`, `nav`, `footer`, `h1`-`h4`, `p`, `ul`, `blockquote`)
- Token references in `tokens:` blocks
- Interaction specs in `interaction:` blocks
- Accessibility in `a11y:` blocks

### Interaction Specifications Format

Complex interactions get state-machine-style documentation:

```yaml
interaction:
  name: ecosystem-modal
  trigger: click on .ecosystem__system card
  states:
    closed:
      modal: hidden, opacity 0
      backdrop: hidden, opacity 0
    opening:
      capture: card bounding rect
      modal: positioned at card rect, scaled to card size
      transition: transform 300ms product-motion-flip-easing to center/full-size
      backdrop: fade in 200ms
    open:
      modal: centered, full size, opacity 1
      focus: trapped within modal
    closing:
      modal: reverse transform to card position/size, opacity 0
      backdrop: fade out 200ms
      on-complete: return focus to trigger card
  reduced-motion:
    opening: instant show (no transform animation)
    closing: instant hide
  close-triggers: [backdrop-click, escape-key, close-button]
```

### Responsive Strategy

The screen spec will define behavior at three breakpoints (from Spec 001's responsive foundation):
- `≥1024px` — desktop, primary design target (12-column grid)
- `768px–1023px` — tablet, column reductions and reordering (8-column grid)
- `<768px` — mobile, single column, stacked sections (4-column grid)

These align with the system's responsive tokens: `breakpointSm` (375px), `breakpointMd` (768px), `breakpointLg` (1024px), `breakpointXl` (1440px).

Each section documents what changes per breakpoint (column count, element visibility, stacking order).

### Accessibility Specification

Documented per-section with a page-level summary:
- Landmark structure (`nav`, `main` > `section`×N, `footer`)
- Heading hierarchy (one `h1`, section `h2`s, subsection `h3`/`h4`)
- Focus management (modal trap, skip-to-content)
- Decorative elements (`aria-hidden`)
- Reduced motion (every animated element)
- Interactive element naming (buttons, links, cards-as-buttons)

### Asset Enumeration

The spec will list all required assets with source paths:
- SVG illustrations (`src/assets/illustration/`)
- Background images (`src/assets/background/`)
- Font files (`src/assets/fonts/`)
- Logo (`primitive-assets/designerPunkLogo.svg`)

### CSS Load Order

The screen spec SHALL define this cascade:
1. `dist/tokens/DesignTokens.web.css` (system tokens)
2. `dist/product/ProductTokens.web.css` (product tokens)
3. `src/styles/layout.css` (page layout rules)
4. Section-specific styles (per-section CSS)

### Validation

- portfolio.yaml parses without errors
- All component references resolve (via Application MCP)
- All token references exist in token-index or product tokens
- Product MCP `get_product_health` reports no warnings for this page

---

## Agent Responsibilities

| Agent | Layer | Work |
|-------|-------|------|
| Ada | 1 | Create 5 primitives, 3 semantics, 1 update. Documentation. |
| Leonardo | 2 | Author product token YAML, configure pipeline, validate. |
| Leonardo | 3 | Write full screen specification (portfolio.yaml). |
| Leonardo | 3 | Update product overview and roadmap. |

---

## Risks

1. **Layer 1 → Layer 2 validation dependency**: Product tokens referencing new primitives (space1200, space1600) won't validate until Layer 1 merges. Mitigation: Author Layer 2 YAML in parallel, run validation after Layer 1 completes.
2. **Layer 3 scope**: Full screen spec for a 13-section page with 5 complex interactions is substantial. Mitigation: Author section-by-section, prioritize complex sections (ecosystem, chord, career) first.
3. **Prototype drift**: If Peter edits the prototype during spec authoring, the screen spec may not match. Mitigation: Prototype is frozen as of Spec 002 completion — visual reference only, not modified.
