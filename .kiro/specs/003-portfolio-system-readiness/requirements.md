# Requirements Document: Portfolio System Readiness

**Date**: 2026-05-25
**Spec**: 003 - Portfolio System Readiness
**Status**: Requirements Phase
**Dependencies**: Spec 002 (Portfolio Token Compliance) ✅ Complete, @3fn/core v11.7.0 installed

---

## Introduction

This spec makes the DesignerPunk system ready for portfolio page implementation (Spec 004). It delivers three parallel workstreams: system token extensions (Ada), product token authoring (Leonardo), and a full screen specification (Leonardo). Upon completion, Sparky has everything needed to implement the portfolio page without ambiguity.

Key principles:
- System tokens are created with full mathematical validation and documentation
- Product tokens use the v11.7.0 pipeline (YAML source → generated platform output)
- The screen spec is the implementation source of truth; the prototype is the visual reference only
- All three layers can execute in parallel (with Layer 2 validation following Layer 1)

---

## Requirements

### Requirement 1: Spacing Primitive Token Creation

**User Story**: As a platform agent, I want spacing primitives at 72px, 96px, and 128px to exist in the system, so that page-level vertical rhythm can be expressed with tokens rather than hard values.

#### Acceptance Criteria

1. `space900` SHALL exist with value 72, formula `base × 9 = 8 × 9 = 72`.
2. `space1200` SHALL exist with value 96, formula `base × 12 = 8 × 12 = 96`.
3. `space1600` SHALL exist with value 128, formula `base × 16 = 8 × 16 = 128`.
4. All three tokens SHALL generate correct platform output (CSS: `--space-900: 4.5rem`, Swift: `space900: CGFloat = 72`, Kotlin: `val Space900 = 72.dp`).
5. All three tokens SHALL pass mathematical relationship validation in the pipeline.
6. Token Quick Reference SHALL be updated to include the new spacing entries.

---

### Requirement 2: Shadow Primitive Token Creation

**User Story**: As a platform agent, I want shadow primitives for dramatic modal elevation, so that the portfolio's modal shadow can be expressed with tokens.

#### Acceptance Criteria

1. `shadowOffsetY.600` SHALL exist with value 24, formula `base × 6 = 4 × 6 = 24`.
2. `blur400` SHALL exist with value 64, formula `base × 4 = 16 × 4 = 64`.
3. Both tokens SHALL generate correct platform output.
4. Both tokens SHALL pass mathematical relationship validation.
5. Shadow family documentation SHALL be updated.

---

### Requirement 3: Semantic Token Creation

**User Story**: As a platform agent, I want semantic tokens for heading color and page-level section spacing, so that design intent is encoded in token names.

#### Acceptance Criteria

1. `color.text.heading` SHALL exist referencing `black300`, with description documenting its role in the three-tier text hierarchy.
2. `space.sectioned.generous` SHALL exist referencing `space1200`.
3. `space.sectioned.expansive` SHALL exist referencing `space1600`.
4. All three tokens SHALL generate correct platform output.
5. The `color.text.*` hierarchy documentation SHALL be updated to include `heading` alongside `default`, `muted`, and `subtle`.

---

### Requirement 4: Shadow Semantic Token Update

**User Story**: As a platform agent, I want `shadow.modal` updated to use dramatic elevation values, so that modal shadows match the portfolio's visual design.

#### Acceptance Criteria

1. `shadow.modal` SHALL be updated to reference `shadowOffsetY.600` and `blur400`.
2. The update SHALL NOT break existing consumers (no other product currently uses `shadow.modal`).
3. Shadow family documentation SHALL reflect the updated composition.

---

### Requirement 5: Product Token Configuration

**User Story**: As a product developer, I want the product token pipeline configured, so that product-level values are generated into platform-native output.

#### Acceptance Criteria

1. `designerpunk.config.ts` SHALL include `productTokens: './product/tokens'`.
2. Running `npx designerpunk generate` SHALL produce `dist/product/ProductTokens.web.css`.
3. The generated CSS SHALL contain `--product-layout-*` and `--product-motion-*` custom properties.
4. Product token authoring workflow SHALL be governed by `Product-Token-Governance.md` (shipped in @3fn/core v11.7.1, accessible via MCP from the package path).

---

### Requirement 6: Product Token Authoring — Layout

**User Story**: As a platform agent, I want product layout constraints defined as structured tokens, so that layout values are discoverable, governed, and generated into platform-native output.

#### Acceptance Criteria

1. `product/tokens/layout.yaml` SHALL define tokens for all layout values identified in Spec 002's non-aligning evaluation.
2. Each hard-value token SHALL include `unitType` and `rationale`.
3. Each ref token SHALL reference a valid system token by canonical name.
4. Running `npx designerpunk validate --product-tokens` SHALL pass with zero errors.
5. The following tokens SHALL be defined (minimum):
   - `contentMaxWidth` (value: 1336, unitType: logical)
   - `contentIndent` (ref: space300)
   - `proseMeasureMax` (value: 48, unitType: ch, platforms: [web])
   - `quoteMaxWidth` (value: 640, unitType: logical)
   - `modalMaxWidth` (value: 1020, unitType: logical)
   - `ctaActionsMaxWidth` (value: 280, unitType: logical)
   - `illustrationMaxWidth` (value: 380, unitType: logical)
   - `cardHeaderMaxWidth` (value: 180, unitType: logical)
   - `ctaBottomPadding` (value: 224, unitType: logical)

---

### Requirement 7: Product Token Authoring — Motion

**User Story**: As a platform agent, I want product motion characteristics defined as structured tokens, so that animation values are discoverable and governed.

#### Acceptance Criteria

1. `product/tokens/motion.yaml` SHALL define tokens for product-specific motion values.
2. Each hard-value token SHALL include `unitType` and `rationale`.
3. Running `npx designerpunk validate --product-tokens` SHALL pass with zero errors.
4. The following tokens SHALL be defined (minimum):
   - `flipDuration` (ref: duration350)
   - `flipEasing` (value: "cubic-bezier(0.4, 0, 0.2, 1)", unitType: easing, rationale: "Material deceleration curve for card-to-modal expansion")
   - `flickerDuration` (value: 800, unitType: duration, rationale: "Tuned to 24fps flicker perception threshold; decorative easter egg")

---

### Requirement 8: Screen Specification — Structure and Layout

**User Story**: As the implementation agent, I want a complete screen specification documenting the page's component tree, semantic structure, and layout system, so that I can implement without ambiguity.

#### Acceptance Criteria

1. `product/experience-map/pages/portfolio/portfolio.yaml` SHALL contain a complete `ui-tree` with all page sections.
2. The ui-tree SHALL specify semantic HTML elements (landmarks, heading hierarchy h1→h2→h3→h4).
3. Each section node SHALL include a `tokens:` block with system token and product token references.
4. The spec SHALL define the responsive layout strategy: breakpoints, column behavior, and section stacking rules.
5. The spec SHALL include a `visual-reference` annotation pointing to `docs/specs/staticReview/hero-exploration.html`.

---

### Requirement 9: Screen Specification — Interactions

**User Story**: As the implementation agent, I want interaction specifications for all dynamic behaviors, so that I can implement animations, hover states, and user-triggered behaviors correctly.

#### Acceptance Criteria

1. The screen spec SHALL document the ecosystem modal interaction: trigger (card click), FLIP animation (origin from card, scale/translate to center, 300ms cubic-bezier), close behavior (backdrop click, Escape key, close button), reverse animation, and `prefers-reduced-motion` fallback.
2. The screen spec SHALL document the chord diagram: technology (Canvas 2D), interaction model (hover nodes for tooltip, drag center for rotation), animation (continuous idle spin, pulse dots), and reduced-motion behavior.
3. The screen spec SHALL document the career chart: technology (Canvas 2D), trigger (IntersectionObserver, threshold 1.0), animation (easeOut grow from baseline), hover behavior (tooltip, bar highlight), and reduced-motion behavior.
4. The screen spec SHALL document the agent portrait interaction: trigger (list item hover), behavior (per-agent highlight via SVG contentDocument manipulation), and graceful degradation (if SVG fails to load).
5. The screen spec SHALL document easter eggs: trigger (heading hover), behavior (neon flicker keyframe), and `prefers-reduced-motion` fallback (instant reveal, no flicker).

---

### Requirement 10: Screen Specification — Accessibility

**User Story**: As the implementation agent, I want accessibility requirements documented, so that the page meets WCAG 2.1 AA compliance.

#### Acceptance Criteria

1. The screen spec SHALL specify a skip-to-content link as the first focusable element.
2. The screen spec SHALL define the heading hierarchy (one h1, section h2s, subsection h3s/h4s).
3. The screen spec SHALL specify focus management for the ecosystem modal (trap focus when open, return focus on close).
4. The screen spec SHALL specify `aria-hidden="true"` for all decorative elements (illustrations, section prefixes, chord diagram canvas).
5. The screen spec SHALL specify `prefers-reduced-motion` behavior for every animated element.
6. The screen spec SHALL specify accessible names for interactive elements (nav links, CTA buttons, modal close button, card click targets).

---

### Requirement 11: Screen Specification — Assets and Performance

**User Story**: As the implementation agent, I want asset pipeline and performance requirements documented, so that I can optimize loading and rendering.

#### Acceptance Criteria

1. The screen spec SHALL enumerate all required assets (SVG illustrations, background images, font files) with their source paths.
2. The screen spec SHALL specify the script architecture (module-based ES2022, per-section script splitting where appropriate).
3. The screen spec SHALL identify above-the-fold content (hero + nav) and specify critical rendering path priorities.
4. The screen spec SHALL specify lazy-loading strategy for below-fold canvas elements (IntersectionObserver trigger).
5. The screen spec SHALL specify the CSS load order: system tokens → product tokens → layout → section styles.

---

### Requirement 12: Product Context Updates

**User Story**: As a product agent, I want the product overview and roadmap current, so that agents querying product context get accurate information.

#### Acceptance Criteria

1. `product/overview.yaml` SHALL reflect the current product scope and status.
2. `product/roadmap.md` SHALL reflect Spec 002 completion, Spec 003 in progress, Spec 004 planned, and v11.7.0 adoption.

---

## Sequencing

- Requirements 1-4 (Layer 1: system tokens) execute first — Ada's work
- Requirements 5-7 (Layer 2: product tokens) can begin in parallel with Layer 1 authoring, but validation (Req 5 AC 2, Req 6 AC 4) must run after Layer 1 merges
- Requirements 8-11 (Layer 3: screen spec) execute in parallel with Layers 1-2 — Leonardo's work
- Requirement 12 (product context) executes alongside Layer 3

---

## Constraints

1. The prototype (`hero-exploration.html`) is the visual reference only — it is NOT modified during this spec.
2. Token governance applies: Ada creates system tokens with full mathematical validation.
3. Product tokens follow v11.7.0 format: YAML source with rationale on hard values, refs to system tokens where applicable.
4. The screen spec is the implementation source of truth for Spec 004 — not the prototype.

---

## Out of Scope

- Actual page implementation (Spec 004)
- Responsive design decisions (documented in screen spec but not implemented)
- New component creation (Lina confirmed SectionHeading is not a component)
- Token generation pipeline changes (v11.7.0 is consumed as-is)
