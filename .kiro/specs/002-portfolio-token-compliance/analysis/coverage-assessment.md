# Coverage Assessment

**Spec**: 002 - Portfolio Token Compliance
**Task**: 8 - Coverage Assessment
**Agent**: Leonardo
**Date**: 2026-05-25

---

## Summary Statistics

| Metric | Count | Percentage |
|--------|-------|-----------|
| Total values audited | ~565 | 100% |
| Already reference semantic tokens | 85 | 15% |
| Already reference primitive tokens (via var) | 68 | 12% |
| Mapped to existing tokens (Task 3) | ~180 | 32% |
| Promoted to existing semantics (Task 4) | ~45 | 8% |
| Snapped to nearest token (Task 5) | ~25 | 4% |
| New primitives proposed (space900, space1200, space1600) | 3 tokens | — |
| New semantic proposed (color.text.heading) | 1 token | — |
| Shadow primitives proposed (shadowOffsetY.600, blur400) | 2 tokens | — |
| Product-level CSS custom properties | 9 | — |
| Application-level exceptions (canvas) | 47 | 8% |
| Justified hard values (decorative, one-off) | ~15 | 3% |
| Exempt (resets, centering, layout %) | 21 | 4% |

**Post-audit projected token coverage: ~85%** (up from 27% pre-audit)

---

## Coverage Gaps by Category

### Well-Covered (existing tokens sufficient)
- **Color**: Semantic layer covers all text, surface, border, and action color needs. Only gap was `color.text.heading` (now proposed).
- **Font family**: 93% already tokenized. Only gap: monospace viz font → `font-family-mono` exists.
- **Spacing (small/medium)**: space050 through space800 covers all component-level spacing needs.
- **Border width**: borderWidth100 and borderWidth200 cover all structural borders.

### Gaps Requiring System Extension
- **Spacing (large)**: Scale tops at space800 (64px). Page-level layout needs 72px, 96px, 128px. → 3 new primitives + 2 new semantic modifiers (`space.sectioned.generous`, `space.sectioned.expansive`).
- **Shadow**: `shadow.modal` needs updated primitives for the dramatic elevation the prototype uses. → 2 new primitives (shadowOffsetY.600, blur400).
- **Typography font-size**: The prototype uses sizes (34px, 42px, 48px, 64px, 72px) that map to existing fontSize tokens — but these are referenced as hard values, not tokens. The tokens exist; the prototype just doesn't use them.

### Intentionally Not Covered (by design)
- **Canvas visualization colors**: Categorical palettes with perceptual distinctness requirements. Not tokenizable without compromising visualization quality.
- **Canvas font sizes (7-10px)**: Below WCAG readability threshold. Legitimate only in canvas context.
- **Physics-based animation constants**: Continuous animation speeds and interpolation factors. Fundamentally different from CSS transition durations.
- **Layout max-widths**: Product-level constraints (1336px, 640px, etc.) that are design decisions, not mathematical scale values.
- **Noise texture parameters**: SVG filter configuration (baseFrequency, numOctaves) — rendering parameters, not design tokens.

---

## System-Level Findings

### Finding 1: The Token System IS Sufficient for Product Pages

The audit reveals that the existing token system covers the vast majority of product page needs. The gaps are:
- 3 spacing primitives (natural scale extension)
- 1 color semantic (natural hierarchy completion)
- 2 shadow primitives (scale extension for modal elevation)

These are **incremental extensions**, not architectural gaps. The system's mathematical foundation, semantic layer, and family structure all work correctly for product consumption. No structural changes needed.

### Finding 2: Primitive-Over-Semantic is the Primary Compliance Issue

The biggest problem isn't missing tokens — it's **using primitives where semantics exist**. 62 color declarations use primitives via `var()` when exact semantic equivalents are available. This is a developer education issue, not a system gap.

### Finding 3: Typography Composites Exist But Aren't Referenced

The prototype hard-codes font sizes that exactly match existing typography tokens (fontSize500=33px for headings, typography.body.md for body text). The tokens exist — they just weren't used during rapid prototyping. No system gap; just implementation compliance.

### Finding 4: Visualization Values Are a Separate Concern

58 canvas values were audited. Only 11 (19%) can align to tokens. This confirms Ada's pre-resolved recommendation: visualization palettes are application-level. The token system should NOT try to cover data visualization — it's a different domain with different requirements (perceptual uniformity, colorblind safety, categorical distinctness).

### Finding 5: Product-Level Layout Conventions Need a Home

9 values became product-level CSS custom properties (max-widths, content indent, etc.). These aren't tokens, but they need to be defined somewhere consistent. The implementation spec should establish a `src/styles/layout-tokens.css` file for product-level custom properties that reference tokens where possible.

### Finding 6: Product-Level Custom Properties Are a Governance Blindspot

**The gap**: The system has clear infrastructure for tokens (Rosetta pipeline, MCP queryable, generated, tested) and components (Stemma contracts, schemas, tests). But product-level CSS custom properties live in no-man's-land — not generated, not validated, not queryable, no naming governance.

**Consensus (Ada + Thurgood + Sparky, 2026-05-25)**:
- These do NOT belong in the Rosetta pipeline (fail mathematical grounding, cross-platform, and multi-product reuse tests)
- They SHOULD live in a dedicated `src/styles/layout-tokens.css` with `--layout-*` naming convention and structured comments
- They CAN reference system tokens via `var()` (e.g., `--layout-content-indent: var(--space-300)`)
- They NEED agent discoverability — short-term via structured CSS comments, medium-term via `product/config/layout.yaml` when Product MCP materializes
- Promotion path: if a value is reused across multiple products, it graduates to a Rosetta semantic token

**Boundary definition**: Token = mathematically grounded, cross-platform, multi-product reusable. Product layout value = product-specific constraint, potentially single-platform, not mathematically derived.

**Action for implementation spec**: Create `src/styles/layout-tokens.css` loaded between `DesignTokens.web.css` and `layout.css`. Include header comment declaring these are not Rosetta tokens and explaining the naming convention.

---

## Resolved Questions

| Question | Resolution | Source |
|----------|-----------|--------|
| Section heading `//` prefix — component? | No. Product-level CSS pattern. Insufficient behavioral contract surface. | Lina consultation (2026-05-25) |
| Typography composites for heading/overline? | No new composites. `typography.h2` already covers section headings. Overline deferred until pattern proves across products. | Ada assessment (2026-05-24) |
| Semantic tier naming (page vs sectioned) | Extend `space.sectioned.*` with `generous` and `expansive` modifiers. | Ada assessment (2026-05-24) |
| Heading gap semantic? | No. Use primitive `space700` directly. Too specific for a semantic. | Ada assessment (2026-05-24) |

---

## Token System Changes Required (Downstream Spec)

### New Primitives (Ada to create)
| Token | Value | Formula | Family |
|-------|-------|---------|--------|
| space900 | 72 | base × 9 = 8 × 9 | spacing |
| space1200 | 96 | base × 12 = 8 × 12 | spacing |
| space1600 | 128 | base × 16 = 8 × 16 | spacing |
| shadowOffsetY.600 | 24 | base × 6 = 4 × 6 | shadow |
| blur400 | 64 | base × 4 = 16 × 4 | shadow |

### New Semantics (Ada to create)
| Token | Reference | Category |
|-------|-----------|----------|
| color.text.heading | black300 | color |
| space.sectioned.generous | space1200 | spacing |
| space.sectioned.expansive | space1600 | spacing |

### Updated Semantics (Ada to modify)
| Token | Change | Rationale |
|-------|--------|-----------|
| shadow.modal | Update to use shadowOffsetY.600 + blur400 | Dramatic modal elevation per prototype |

---

## Recommendation

**The DesignerPunk token system is sufficient for product-level page development.** The audit identified 6 new tokens needed (5 primitives + 1 semantic) plus 2 semantic tier extensions — all of which are natural, mathematically-grounded scale extensions rather than architectural changes.

The primary action for the implementation spec is not token creation — it's **correct token usage**. The vast majority of the work is replacing hard-coded values and primitives with existing tokens that already cover the use case.

**Suggested next steps:**
1. Ada creates the 5 new primitives and 3 new/updated semantics (downstream token spec)
2. Implementation spec (Sparky) applies the complete mapping document mechanically
3. Product-level CSS custom properties defined in a layout file
4. Canvas visualizations reference aligned tokens where identified (11 values)
