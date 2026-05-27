# Pattern Identification

**Spec**: 002 - Portfolio Token Compliance
**Task**: 7 - Pattern Identification
**Agent**: Leonardo
**Date**: 2026-05-24

---

## Pattern 1: Section Heading Typography

**Values**: font-family: display, font-size: 34px (→fontSize500=33px), font-weight: 700, color: black-300 (→color.text.heading proposed)
**Occurrences**: 7 sections (why-build, ecosystem, how-built, enterprise, who-built, cta, agents title uses same weight/family at 13px)
**Current token coverage**: font-family ✓ (display), font-weight partially (typography-display-font-weight), font-size ✗ (hard-coded), color ✗ (primitive)

**Recommendation**: This is a **composite typography pattern** that should be expressed as a typography composite token. The system already has composite patterns (`typography.body.md`, `typography.label.md`). A `typography.heading.section` composite referencing display/fontSize500/700/color.text.heading would encode this pattern once.

**Impact**: System-level — a typography composite token is reusable across any product page with section headings.

---

## Pattern 2: Content Alignment Inset (24px left)

**Values**: margin-left: 24px, padding: 0 24px, margin: 0 24px
**Occurrences**: 8× (section headings, grid padding, copy margin, CTA grid margin)
**Current token coverage**: The value 24px = space300 (exists as primitive)

**Recommendation**: This is a **product-level layout convention** — a consistent left indent that creates visual rhythm across sections. It's not a system-level semantic because it's specific to this page's layout grid (the `//` prefix sits at -36px, content starts at +24px from the section edge).

Define as a product-level CSS custom property: `--layout-content-indent: var(--space-300)`. This references the primitive but names the convention.

**Impact**: Product-level only. Other products would define their own content indent.

---

## Pattern 3: Section Vertical Padding

**Values**: padding-top/bottom: 96px, 120px, 128px (→space1200, space1600 after snap)
**Occurrences**: 6 sections (why-build, ecosystem, how-built, enterprise, who-built, agents)
**Current token coverage**: None — all hard-coded. Pre-resolved as new primitives (space1200, space1600).

**Recommendation**: After primitives are created, these should use a **new semantic tier** for page-level vertical rhythm. Ada flagged that the naming (`space.page.*` vs extending `space.sectioned.*`) needs evaluation during token creation.

The pattern is: sections alternate between "normal" (96px) and "generous" (128px) vertical padding, with 120px snapping to 128px.

**Impact**: System-level — the spacing scale extension and new semantic tier affect the token system broadly.

---

## Pattern 4: Section Heading Spacing (margin-bottom: 56px)

**Values**: margin-bottom: 56px (= space700)
**Occurrences**: 5× (why-build, ecosystem, how-built, enterprise, cta headings)
**Current token coverage**: space700 exists as primitive. Ada identified this as near `space.sectioned.loose` (48px) but exceeding it.

**Recommendation**: This is the gap between a section heading and its content. It's semantically distinct from "sectioned" spacing (between sections). Consider a semantic: `space.heading.gap` → space700. Alternatively, if the section heading composite token (Pattern 1) includes margin-bottom, this becomes part of that composite.

**Impact**: System-level — reusable across any page with section headings.

---

## Pattern 5: Heading Color Hierarchy

**Values**: black-300 for section headings (9×), color.contrast.onLight for hero/button text, black-100 for body text
**Occurrences**: 9× heading, 2× maximum contrast, 8× body
**Current token coverage**: Partially — hero uses semantic correctly. Section headings use primitive.

**Recommendation**: The prototype demonstrates a **three-tier text color hierarchy**:
1. Maximum contrast (`color.contrast.onLight` = black500) — hero headline, button text
2. Heading emphasis (`color.text.heading` proposed = black300) — section headings
3. Body text (`color.print.default` = black100) — paragraphs, descriptions

This is a deliberate design decision, not an accident. The proposed `color.text.heading` semantic (from Task 4) formalizes tier 2.

**Impact**: System-level — the three-tier hierarchy is a reusable pattern for any content-heavy page.

---

## Pattern 6: Muted Meta-Label Treatment

**Values**: font-size: 13px, font-weight: 700, text-transform: uppercase, letter-spacing: 0.08em, color: gray-200 (→color.text.muted)
**Occurrences**: 3× (who-built human-label, agents title, ecosystem modal-viz-label)
**Current token coverage**: color → color.text.muted ✓ (after promotion). Typography values all hard-coded.

**Recommendation**: This is a **composite typography pattern** for overline/category labels. Consider `typography.label.overline` composite referencing fontSize050/700/uppercase/0.08em/color.text.muted. The letter-spacing and text-transform are part of the pattern.

**Impact**: System-level — overline labels are common in product UI (settings screens, form sections, card categories).

---

## Pattern 7: Card Separator Borders

**Values**: border-left: 1px solid gray-100 (→color.structure.border), with transparent first/last child
**Occurrences**: 4× (why-build cards use this pattern; ecosystem highlights use similar 2px pink left-border)
**Current token coverage**: border-width → border-width-100 (exists). Color → color.structure.border (exists after promotion).

**Recommendation**: This is a **product-level layout convention** — vertical dividers between equal-weight cards. The pattern (border on all but first child) is a CSS technique, not a token concern. The values are already covered by existing tokens after promotion.

**Impact**: Product-level. No new tokens needed — just correct token usage.

---

## Pattern 8: Noise Texture Background

**Values**: SVG feTurbulence noise pattern with varying baseFrequency (0.32, 0.9) and opacity (0.24, 0.40, 0.56)
**Occurrences**: 3× (stats bar, ecosystem cards, career chart)
**Current token coverage**: Opacity values map to existing tokens (opacity024, opacity040, opacity056).

**Recommendation**: The noise texture itself is a **product-level decorative technique** — the SVG data URI pattern is not tokenizable. The opacity values that control its intensity ARE tokenizable and should reference opacity tokens. The baseFrequency values are texture parameters (not UI values) and should remain as product-level constants.

**Impact**: Product-level. Opacity tokens already exist; just need correct references.

---

## Pattern 9: Transition Timing Consistency

**Values**: 150ms (×3), 200ms→250ms (×2), 250ms (×2), 300ms→350ms (×2)
**Occurrences**: 8 total transition declarations
**Current token coverage**: None — all hard-coded. Ada resolved: 150ms→duration150, 200ms→duration250, 250ms→duration250, 300ms→duration350.

**Recommendation**: After token alignment, transitions should use **semantic motion tokens** where they exist (e.g., `motion.duration.fast`, `motion.duration.normal`). The easing values should all use `easingStandard` per Ada's resolution.

**Impact**: System-level — motion tokens are already defined; this is just correct usage.

---

## Summary

| # | Pattern | Impact Level | Action |
|---|---------|-------------|--------|
| 1 | Section Heading Typography | System | Propose `typography.heading.section` composite |
| 2 | Content Alignment Inset | Product | Define `--layout-content-indent` CSS custom property |
| 3 | Section Vertical Padding | System | New primitives (space1200, space1600) + semantic tier |
| 4 | Section Heading Spacing | System | Consider `space.heading.gap` → space700, or include in composite |
| 5 | Heading Color Hierarchy | System | Formalize with `color.text.heading` semantic |
| 6 | Muted Meta-Label Treatment | System | Propose `typography.label.overline` composite |
| 7 | Card Separator Borders | Product | No new tokens — correct usage of existing |
| 8 | Noise Texture Background | Product | Opacity tokens exist — just reference them |
| 9 | Transition Timing | System | Motion tokens exist — just reference them |

**System-level patterns requiring new tokens/composites**: 5 (Patterns 1, 3, 4, 5, 6)
**Product-level conventions requiring CSS custom properties**: 2 (Patterns 2, 8)
**Patterns requiring only correct token usage**: 2 (Patterns 7, 9)
