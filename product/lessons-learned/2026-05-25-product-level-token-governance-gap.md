# Lesson Learned: Product-Level Token Governance Gap

**Date**: 2026-05-25
**Spec**: 002 - Portfolio Token Compliance
**Classification**: Governance gap (with architectural implications)
**Discovered by**: Leonardo (product architect)
**Resolved by**: Ada, Thurgood, Sparky, Peter (consensus)

---

## What Happened

During the Spec 002 token compliance audit, 9 product-level CSS custom properties were identified that don't fit in the Rosetta token pipeline but need to be visible to agents and developers. These values (layout max-widths, content indents, prose measures) fall between the token system and the component system with no governance home.

## Why It Matters

- **Agent blindspot**: No MCP can serve these values; agents can't discover them
- **Drift risk**: Without a sanctioned location, each page/product invents ad-hoc solutions
- **Promotion failure**: Values that should graduate to semantic tokens never surface because they're invisible to the governance layer
- **Multi-product impact**: Any DesignerPunk consumer will generate product-level layout values — this isn't a one-page problem

## What Triggered Discovery

Spec 002's systematic audit of all CSS values against the token registry. The Phase 4 (Non-Aligning Value Evaluation) forced a disposition for every value — including those that are neither tokens nor one-offs. The "product CSS custom property" disposition category didn't exist before this audit created it.

## Resolution

| Aspect | Decision |
|--------|----------|
| Location (implementation) | `src/styles/layout-tokens.css` — dedicated file, loaded between system tokens and layout styles |
| Naming convention | `--layout-*` prefix — instant identification of product-level values |
| Token system boundary | NOT in Rosetta. Fails mathematical grounding, cross-platform, and multi-product reuse tests |
| Can reference tokens | Yes — `var(--space-300)` etc. |
| Agent discoverability (short-term) | Structured comments in the CSS file |
| Agent discoverability (medium-term) | `product/config/layout.yaml` when Product MCP materializes |
| Governance | Product team owns; lighter governance than tokens; Thurgood monitors existence |
| Promotion path | Multi-product reuse → candidate for Rosetta semantic token |

## What Prevents Recurrence

1. **Naming convention** (`--layout-*`) makes classification automatic — no ambiguity about what's a token vs what's a product value
2. **Dedicated file** prevents scattering across stylesheets
3. **Explicit promotion criteria** (multi-product reuse) creates a clear graduation path
4. **Audit process** (this spec) catches ungoverned values systematically

## Implications for Future Products

Any product consuming DesignerPunk should:
- Create a `layout-tokens.css` (or equivalent) for product-level layout constraints
- Use the `--layout-*` naming convention
- Reference system tokens via `var()` where values align
- Hard-code values where they don't align (with comments explaining why)
- Review product values periodically for promotion candidates

This should be documented in the DesignerPunk Integration Guide as consumer guidance.

## Related

- Spec 002 Coverage Assessment § "Finding 6"
- Ada consultation (2026-05-25): Rosetta boundary definition
- Thurgood consultation (2026-05-25): Governance infrastructure recommendation
- Sparky consultation (2026-05-25): Implementation file structure

---

## Addendum (2026-05-25, evening)

**Superseded by @3fn/core v11.7.0**: The interim resolution described above (`--layout-*` prefix, hand-authored CSS file at `src/styles/product-tokens.css`) has been superseded by the shipped product token pipeline in v11.7.0. The canonical naming convention is now `--product-{category}-{tokenName}` (e.g., `--product-layout-content-max-width`), generated from `product/tokens/*.yaml` source files into `dist/product/ProductTokens.web.css`. The `--product-` prefix replaces the `--layout-*` prefix. The hand-authored CSS file approach is no longer needed — the pipeline generates platform-native output.

The core findings and prevention mechanisms remain valid. The resolution section now reflects the interim state that was active for approximately 6 hours before the pipeline shipped.
