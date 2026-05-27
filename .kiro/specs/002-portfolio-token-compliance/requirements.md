# Requirements Document: Portfolio Token Compliance

**Date**: 2026-05-24
**Spec**: 002 - Portfolio Token Compliance
**Status**: Requirements Phase
**Dependencies**: Spec 001 (Portfolio Page Architecture) ✅ Complete

---

## Introduction

This spec audits the portfolio page prototype (`docs/specs/staticReview/hero-exploration.html`) and produces a complete value→token mapping that enables compliant implementation. The prototype was developed as a visual design exploration — it contains a mix of correctly applied tokens, primitives where semantics should apply, hard-coded values, and fallback values. This audit resolves every CSS and JS value to its correct token reference (or documents it as a justified exception).

Key principles:
- Every value gets a disposition: token reference, justified hard value, or pending token creation
- Patterns are surfaced as named observations with recommendations for Peter's review
- Canvas visualizations are audited separately with "align where possible, preserve readability above all"
- Token governance applies throughout — no autonomous token creation

---

## Requirements

### Requirement 1: Value Inventory

**User Story**: As the product architect, I want a complete categorized inventory of every CSS and JS value in the prototype, so that subsequent audit phases have a structured data source to work from.

#### Acceptance Criteria

1. The inventory SHALL catalog every value in the prototype's `<style>` block, categorized by: spacing, typography, color, radius, border, shadow, motion, and layout.
2. Each inventory entry SHALL include: CSS property, current value, selector location, and current token reference (if any).
3. The inventory SHALL include values defined in inline styles (tooltip elements, chord-tip, career-tooltip).
4. The inventory SHALL include values defined in JavaScript (chord diagram palette, career chart colors, connector line colors, canvas font sizes, animation timings).
5. JavaScript values SHALL be categorized separately as "Canvas: Chord Diagram," "Canvas: Career Chart," and "Canvas: Ecosystem Connectors."
6. The inventory SHALL be stored in `.kiro/specs/002-portfolio-token-compliance/analysis/value-inventory.md`.
7. The inventory SHALL distinguish between values that already reference tokens and values that are hard-coded.

---

### Requirement 2: Fallback Value Resolution

**User Story**: As the product architect, I want every `var(--token, fallback)` pattern identified and resolved, so that fallbacks don't mask missing or misnamed tokens.

#### Acceptance Criteria

1. The audit SHALL identify every `var()` declaration that includes a fallback value.
2. WHEN the referenced token exists and resolves correctly THEN the fallback SHALL be marked for removal.
3. WHEN the referenced token exists but is misnamed in the declaration THEN the reference SHALL be corrected and the fallback marked for removal.
4. WHEN the referenced token does not exist THEN the declaration SHALL be escalated to Requirement 5 (primitive→semantic promotion) or Requirement 6 (non-aligning value evaluation).
5. The resolution document SHALL be stored in `.kiro/specs/002-portfolio-token-compliance/analysis/fallback-resolution.md`.
6. For a single-page site with one theme, zero fallback values SHALL remain in the final implementation unless explicitly justified.

---

### Requirement 3: Hard Value → Token Mapping

**User Story**: As the product architect, I want every hard-coded value that has a token equivalent mapped to that token, so that the implementation uses the design system consistently.

#### Acceptance Criteria

1. For each hard-coded value in the inventory, the audit SHALL query the token system for a match.
2. Each mapping entry SHALL include: current hard value, target token, and confidence level (exact match / nearest match / no match).
3. For spacing and sizing values within 1-2px of a token, the audit SHALL recommend the nearest token (design intent likely targeted the token).
4. For color, typography, radius, and motion values, only exact matches SHALL qualify as mappings.
5. Values with no token match SHALL be escalated to Requirement 6.
6. The mapping document SHALL be stored in `.kiro/specs/002-portfolio-token-compliance/analysis/token-mapping.md`.
7. Each mapping entry SHALL include the exact CSS property, selector, current value, and target token reference such that replacement requires no design judgment.

---

### Requirement 4: Primitive → Semantic Promotion

**User Story**: As the product architect, I want primitive token usage evaluated for semantic promotion, so that design intent is encoded in token names rather than requiring contextual knowledge.

#### Acceptance Criteria

1. For each primitive token usage, the audit SHALL assess the design intent — what role does this value play?
2. WHEN a semantic token already exists for that role THEN the audit SHALL recommend replacing the primitive with the semantic.
3. WHEN no semantic token exists but the usage occurs 3+ times for the same visual/functional role (e.g., section padding, heading color, content alignment — regardless of selector) THEN the audit SHALL propose a new semantic token (subject to Ada review and Peter approval).
4. WHEN a primitive is used once for a unique purpose with no reuse potential THEN the primitive usage SHALL be documented as acceptable.
5. Proposed new semantic tokens that don't yet exist SHALL feed into Requirement 6's decision framework.
6. The promotion analysis SHALL be stored in `.kiro/specs/002-portfolio-token-compliance/analysis/semantic-promotion.md`.

---

### Requirement 5: Non-Aligning Value Evaluation

**User Story**: As the product architect, I want every hard value that doesn't match an existing token evaluated with a clear decision, so that nothing is left ambiguous.

#### Acceptance Criteria

1. Each non-aligning value SHALL receive one of the following dispositions:
   - Create primitive token (requires Ada review)
   - Create semantic token (requires Ada review + Peter approval)
   - Adjust design to use existing token (requires Peter approval)
   - Document as justified hard value (requires Peter acknowledgment)
   - Define as product-level CSS custom property (requires Leonardo + Peter)
2. Values that fit the mathematical scale (base-8 multiples) but lack a token SHALL be flagged as primitive token candidates.
3. Values that serve a named purpose used across the page SHALL be flagged as semantic token candidates.
4. Decorative/one-off values with no reuse potential SHALL be documented with rationale.
5. Layout constraint values (max-width, breakpoints) SHALL be evaluated as product-level CSS custom properties.
6. The evaluation document SHALL be stored in `.kiro/specs/002-portfolio-token-compliance/analysis/non-aligning-evaluation.md`.
7. Each decision SHALL include rationale sufficient for Peter to approve or reject without additional context.

---

### Requirement 6: Pattern Identification and Recommendations

**User Story**: As the human lead, I want recurring value patterns surfaced as named observations with recommendations, so that I can make informed decisions about system-level changes rather than reviewing individual values in isolation.

#### Acceptance Criteria

1. The audit SHALL identify recurring patterns — values or value combinations that appear 3+ times serving the same design purpose.
2. Each pattern SHALL be named descriptively (e.g., "section padding pattern," "heading typography pattern," "content alignment pattern").
3. Each pattern SHALL include: the values involved, where they appear, and a recommendation (tokenize, create semantic, define as layout convention, or leave as-is).
4. Patterns SHALL be surfaced to Peter for review BEFORE any system changes are proposed.
5. The pattern document SHALL be stored in `.kiro/specs/002-portfolio-token-compliance/analysis/patterns.md`.
6. Pattern recommendations SHALL distinguish between "system-level change" (affects DesignerPunk broadly) and "product-level convention" (affects this page only).

---

### Requirement 7: Canvas Visualization Audit — Chord Diagram

**User Story**: As the product architect, I want the chord diagram's JavaScript values audited for token alignment, so that the visualization is consistent with the system where possible without compromising readability.

#### Acceptance Criteria

1. The audit SHALL catalog all color values in the chord diagram's `PAL` object and compare to existing primitive color tokens.
2. WHEN a prototype color is a near-miss to an existing primitive THEN the audit SHALL evaluate whether adapting to the primitive preserves the visualization's readability and categorical distinctness.
3. WHEN adapting would compromise readability or distinctness THEN the value SHALL be documented as an application-level exception.
4. Canvas font sizes (9px, 10px) SHALL be documented as legitimate exceptions to the typography scale with rationale (canvas context, not DOM text, data visualization convention).
5. Animation timing values SHALL be compared to existing motion tokens.
6. The chord diagram audit SHALL be stored in `.kiro/specs/002-portfolio-token-compliance/analysis/canvas-chord.md`.

---

### Requirement 8: Canvas Visualization Audit — Career Chart

**User Story**: As the product architect, I want the career chart's JavaScript values audited for token alignment, so that the visualization is consistent with the system where possible without compromising readability.

#### Acceptance Criteria

1. The audit SHALL catalog all color values in the career chart (gradient stops, line colors, label colors, tooltip colors).
2. WHEN a color value maps to an existing primitive THEN the audit SHALL recommend alignment.
3. WHEN gradient colors serve a semantic purpose (design = pink/purple, engineering = gray/dark) THEN the audit SHALL evaluate whether semantic tokens are warranted or whether these are application-level visualization values.
4. Canvas font sizes SHALL be documented as legitimate exceptions per Requirement 7 AC 4.
5. The noise pattern configuration (NOISE_SIZE, NOISE_DENSITY, NOISE_ALPHA) SHALL be evaluated against existing opacity and sizing tokens.
6. The career chart audit SHALL be stored in `.kiro/specs/002-portfolio-token-compliance/analysis/canvas-career.md`.

---

### Requirement 9: Canvas Visualization Audit — Ecosystem Connectors

**User Story**: As the product architect, I want the ecosystem connector lines' JavaScript values audited for token alignment, so that the connecting lines use system-consistent colors.

#### Acceptance Criteria

1. The audit SHALL catalog the connector color values (`#0088A0`, `#009955`, `#B8A000`) and compare to existing primitive color tokens.
2. The audit SHALL evaluate whether these colors should align with the same primitives used in the system illustration's pointer-location circles.
3. Line weight (2.5px) SHALL be compared to existing border-width tokens.
4. Drop shadow filter values SHALL be compared to existing shadow tokens.
5. The connector audit SHALL be stored in `.kiro/specs/002-portfolio-token-compliance/analysis/canvas-connectors.md`.

---

### Requirement 10: Coverage Philosophy Assessment

**User Story**: As the human lead, I want a system-level assessment of token coverage gaps, so that I understand whether the token system is sufficient for product-level page development.

#### Acceptance Criteria

1. WHEN the audit identifies 10+ justified hard values THEN the assessment SHALL categorize them by type and evaluate whether a new token family or tier is warranted.
2. The assessment SHALL identify categories of values the token system intentionally doesn't cover (e.g., decorative one-offs, layout constraints, visualization-specific values).
3. The assessment SHALL provide a recommendation: is the current token system sufficient for product page development, or are structural extensions needed?
4. The assessment SHALL be stored in `.kiro/specs/002-portfolio-token-compliance/analysis/coverage-assessment.md`.
5. The assessment SHALL be surfaced to Peter as a system-level finding for future token governance discussion.

---

## Documentation Requirements

If this audit triggers token creation (Requirement 5 dispositions that create new tokens), those tokens SHALL be governed by a downstream spec or addendum that includes:
- Token Quick Reference updates
- Token family documentation (if new family introduced)
- Mathematical relationship documentation
- Platform output verification

---

## Constraints

1. This spec produces analysis documents only — no code changes are made during this spec's execution.
2. Token governance applies throughout: no autonomous token creation. All proposed tokens require Ada review and Peter approval.
3. Canvas visualization values follow the principle: "align where possible, preserve readability above all."
4. The mapping document must be structured for mechanical execution by Sparky in a subsequent implementation spec.

---

## Sequencing

Requirements 1–5 are sequential — each phase's output feeds the next. Requirements 6–9 (pattern identification and canvas audits) execute in parallel with or after Requirements 1–5, as they draw from the same inventory but produce independent analysis. Requirement 10 (coverage assessment) executes last, after all other requirements are complete, as it synthesizes findings across all phases.

---

## Out of Scope

- HTML semantic restructuring
- Accessibility remediation
- Responsive behavior additions
- Interaction specification
- Asset pipeline optimization
- Actual token creation (deferred to downstream spec)
- Actual CSS/JS value replacement (deferred to implementation spec)
