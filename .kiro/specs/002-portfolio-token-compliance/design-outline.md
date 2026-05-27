# Design Outline: Portfolio Page Token Compliance

**Date**: 2026-05-24
**Spec**: 002-portfolio-token-compliance
**Owner**: Leonardo (architecture) → Ada (token decisions) → Sparky (implementation)
**Status**: Design Outline — pending Peter review
**Source material**: `docs/specs/staticReview/hero-exploration.html` (visual design prototype), Spec 001 completion

---

## Context

The portfolio page prototype (`hero-exploration.html`) was developed as a visual design exploration — prioritizing speed and aesthetic iteration over token compliance. It now contains a mix of:

- Correctly applied semantic tokens
- Primitive tokens used where semantics should apply
- Hard-coded values that align with existing token values but aren't referenced
- Hard-coded values that don't align with any existing token
- Fallback values in `var()` declarations that mask missing or misnamed tokens

Before implementation can begin, the CSS must be audited and every value mapped to its correct token — or a decision made about whether the system needs to expand to accommodate it.

**Prerequisite**: Spec 001 (Portfolio Page Architecture) ✅ Complete — provides page scaffolding, nav integration, and responsive strategy.

**What this spec does NOT include**: Semantic HTML restructuring, accessibility remediation, responsive behavior, interaction specifications, or asset pipeline. Those are subsequent specs.

---

## Phased Approach

This spec operates as a sequential audit. Each phase produces a mapping document that feeds the next phase.

### Phase 0: Value Inventory

**Objective**: Produce a complete, categorized inventory of every CSS value in the prototype.

**Categories**:
- Spacing (padding, margin, gap, width/height constraints)
- Typography (font-size, font-weight, line-height, letter-spacing)
- Color (background, color, border-color, box-shadow colors, gradient stops)
- Radius (border-radius)
- Border (border-width)
- Shadow (box-shadow)
- Motion (transition duration, easing, animation timing)
- Layout (max-width, grid definitions, aspect-ratio)

**Output**: A structured table per category listing: property, current value, location (selector), and current token reference (if any). Artifacts live in `.kiro/specs/002-portfolio-token-compliance/analysis/`.

**Decision criteria**: None — this is pure data collection.

---

### Phase 1: Remove Fallback Values

**Objective**: Identify every `var(--token-name, fallback)` pattern and determine whether the fallback is necessary or masking a problem.

**Scenarios**:
- Token exists and resolves correctly → remove fallback
- Token exists but is misnamed in the reference → fix reference, remove fallback
- Token does not exist → flag for Phase 3 or 4

**Output**: List of all fallback declarations with disposition (remove / fix reference / escalate).

**Decision criteria**: Fallbacks are acceptable ONLY for tokens that are conditionally defined (e.g., theme-varying tokens that may not be present in all contexts). For a single-page site with one theme, no fallbacks should be necessary.

---

### Phase 2: Map Hard Values to Existing Tokens

**Objective**: Every hard-coded value that has an equivalent token gets replaced with that token reference.

**Process**:
1. For each hard value in the inventory, query the token system for a match
2. Spacing values: check against the spacing scale (`space100` = 4, `space200` = 8, `space300` = 12, etc.)
3. Typography values: check against typography composite tokens
4. Color values: check against primitive and semantic color tokens
5. Radius values: check against radius scale
6. Border values: check against border-width scale

**Output**: Mapping table: current hard value → target token → confidence level (exact match / nearest match / no match).

**Decision criteria**:
- Exact match → replace with token
- For spacing and sizing values within 1-2px of a token → replace with nearest token (design intent likely targeted the token)
- For color, typography, radius, and motion values → only exact matches qualify
- No match → escalate to Phase 4

---

### Phase 3: Primitive → Semantic Promotion

**Objective**: Identify where primitive tokens are used but a semantic token exists (or should exist) for that use case.

**Examples of what this catches**:
- `--space-500` used for section padding → should be a semantic like `--section-padding` or `--content-inset`
- `--black-300` used for heading color → should be `--color-contrast-on-light` or `--color-text-heading`
- `--font-family-display` is already semantic ✓ (no action)

**Process**:
1. For each primitive token usage, assess the *intent* — what role does this value play?
2. Check if a semantic token already exists for that role
3. If yes → replace primitive with semantic
4. If no → evaluate whether a new semantic token is warranted (frequency of use, reusability beyond this page, design intent clarity)

**Output**: Mapping table: current primitive → semantic equivalent (existing or proposed) → rationale.

**Decision criteria for proposing new semantics**:
- Used 3+ times for the same purpose → strong candidate
- Encodes a design decision that would benefit from naming → candidate
- One-off usage with no reuse potential → keep as primitive

**Escalation**: Any proposed new semantic token requires Ada review and Peter approval per token governance. Phase 3 findings that require new semantic tokens feed into Phase 4's decision framework — a primitive promoted to a semantic that doesn't exist yet becomes a Phase 4 evaluation.

---

### Phase 4: Non-Aligning Value Evaluation

**Objective**: For hard values that don't match any existing token, decide: create a new token, adjust the design to use an existing token, or accept as a justified one-off.

**Categories of non-aligning values**:
- **Scale gaps**: Value falls between two existing tokens (e.g., 56px where scale has 48 and 64)
- **Novel values**: Value has no relationship to the existing scale (e.g., 1336px max-width)
- **Decorative values**: Values serving purely aesthetic purposes that may not need tokenization (e.g., specific shadow blur radii, noise texture opacity)

**Decision framework**:

| Situation | Action | Requires |
|-----------|--------|----------|
| Value fits the mathematical scale but token doesn't exist | Create primitive token | Ada review |
| Value is close to an existing token (≤2px) | Adjust design to use existing token | Peter approval |
| Value serves a semantic purpose used across the page | Create semantic token | Ada review + Peter approval |
| Value is decorative/one-off with no reuse | Document as intentional hard value | Peter acknowledgment |
| Value represents a layout constraint (max-width, breakpoint) | Evaluate as layout token or CSS custom property | Leonardo + Peter |

**Output**: Decision log per non-aligning value with disposition and rationale.

---

## Scope Boundaries

### In Scope
- All CSS values in `hero-exploration.html` `<style>` block
- Token references in inline styles (tooltip elements, etc.)
- Values in JavaScript-generated styles (chord diagram, career chart, connector lines)

### Out of Scope
- HTML structure changes (separate spec)
- Responsive behavior additions (separate spec)
- New component creation (separate spec, triggered by findings here)
- Interaction behavior changes (separate spec)
- Asset optimization (separate spec)

---

## Expected Outcomes

1. **A complete value→token mapping document** that Sparky can execute against mechanically
2. **A list of proposed new tokens** (if any) for Ada to evaluate
3. **A list of design adjustments** (if any) for Peter to approve
4. **A list of justified hard values** with documented rationale
5. **High-level pattern identification with recommendations** — recurring value patterns surfaced as named observations (e.g., "section padding pattern," "heading typography pattern," "content alignment pattern") with a recommendation for each: tokenize, create a semantic, define as a layout convention, or leave as-is. These are surfaced to Peter for review before any system changes are proposed.
6. **Clarity on whether the existing token system is sufficient** for product-level page development, or whether gaps exist that affect adoption
7. **A coverage philosophy assessment** — if the audit reveals categories of values that the token system intentionally doesn't cover (e.g., decorative one-offs, layout constraints), document this as a system-level finding for future token governance discussion

**Documentation requirements**: If this audit triggers token creation (Phase 4), those tokens will be governed by a downstream spec (or addendum to this spec) that includes documentation requirements per Process-Spec-Planning standards — including Token Quick Reference updates and token family documentation if a new family is introduced.

---

## Resolved Questions

Questions surfaced during design outline review, resolved via Ada consultation (2026-05-24):

### 1. Max-width (1336px)
**Resolution**: Product-level CSS custom property (`--layout-content-max-width`). Does not enter the token system — it's a layout design decision, not a mathematically-grounded reusable value. If multiple products share this constraint in the future, revisit as a semantic layout token.

### 2. Section padding (96px, 120px, 128px)
**Resolution**: Extend the spacing primitive scale and create a new "page" semantic tier.
- Add `space900` (72px), `space1200` (96px) as high-confidence primitives
- Evaluate `space1000` (80px), `space1600` (128px) as medium-confidence additions
- Audit 88px and 120px during Phase 2 — may snap to nearest clean multiple
- New semantic tier: `space.page.tight` / `space.page.normal` / `space.page.loose` for section-level vertical rhythm
- Token creation governed by standard process (Ada review + Peter approval)

### 3. Noise texture opacity
**Resolution**: Existing opacity tokens should be leveraged. Map current hard values (0.24, 0.56) to nearest opacity token during Phase 2.

### 4. Canvas/JS-rendered values
**Resolution**: Audited as self-contained sections within this spec, with the principle: "align where possible, preserve readability above all, document exceptions explicitly."

Specific sub-decisions:
- **Visualization colors**: Application-level values, not tokenized. Visualization palettes have different requirements (perceptual distinctness, colorblind safety) than UI palettes. Defined as product-level CSS custom properties or JS constants.
- **Canvas typography (9-10px)**: Documented exception to the type scale. These sizes are below WCAG readability thresholds but are legitimate in canvas contexts (not DOM text, not screen-reader-accessible, follow data visualization conventions).
- **Alignment approach**: Where prototype colors are near-misses to existing primitives (e.g., `#7a00cc` ≈ `purple400`), evaluate whether adapting to the primitive preserves the visualization's readability and distinctness. If yes, align. If no, document as application-level exception.

### 5. Spacing scale coverage (56px, 72px, 88px)
**Resolution**: 
- 56px → `space700` ✅ (already exists)
- 72px → Add `space900` (high confidence, natural progression)
- 88px → Audit usage first; may snap to 80px or 96px
- General principle: values that are clean base-8 multiples and fill obvious scale gaps get added as primitives. Odd multipliers (×11, ×15) require design justification.

---

## Noted System Gap (Non-Blocking)

Ada identified that no blue primitive color family exists. This is a genuine gap for data visualization but should not be driven by this spec. Flagged for future token governance discussion.

---

## Risks and Counter-Arguments

**Risk**: This audit may reveal that the spacing scale doesn't extend high enough for page-level layout (section padding, large gaps). This could trigger a scale extension discussion with Ada that delays implementation.

**Mitigation**: Phase 4 decisions can be made pragmatically — use CSS custom properties for page-level layout values without requiring them to enter the formal token system. The token system serves components and patterns; page-level layout may be a different concern.

**Counter-argument to the entire spec**: "Just ship it with hard values — it's a portfolio page, not a product." This is valid from a pragmatism standpoint. But the page's purpose is to *demonstrate* the system. If someone inspects the code and finds hard values everywhere, it undermines the credibility of the token system being showcased. The audit is as much about credibility as correctness.

---

## Dependencies

- **Ada**: Token existence verification, new token evaluation (Phases 2-4)
- **Peter**: Design adjustment approvals, one-off value acknowledgments (Phase 4)
- **Sparky**: Implementation of the final mapping (post-spec)

---

## Success Criteria

- Every CSS value in the prototype has a documented disposition (token reference, justified hard value, or pending token creation)
- Zero unexplained hard values remain
- The mapping document is structured enough for Sparky to execute without design interpretation
- Any proposed system changes have clear rationale and are routed through proper governance
