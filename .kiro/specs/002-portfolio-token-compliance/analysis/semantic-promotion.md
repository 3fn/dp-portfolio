# Semantic Promotion Analysis

**Spec**: 002 - Portfolio Token Compliance
**Task**: 4 - Primitive → Semantic Promotion
**Agent**: Ada (design role annotations by Leonardo)
**Date**: 2026-05-24

---

## Methodology

For each primitive token usage in the inventory:
1. Assess the visual/functional role (using Leonardo's design role annotations)
2. Check if a semantic token already exists for that role
3. Count occurrences of same-role usage across selectors
4. Apply 3+ threshold for new semantic proposals
5. Document keep-as-primitive decisions with rationale

---

## COLOR: Existing Semantic Equivalents Found

### black-300 → SPLIT: color.contrast.onLight (text) + existing primitives (surface)

| Usage Context | Occurrences | Design Role | Existing Semantic | Recommendation |
|---------------|-------------|-------------|-------------------|----------------|
| Heading text (why-build, ecosystem, how-built, enterprise, who-built, cta, thanks) | 7 | Primary heading text | **color.contrast.onLight** (references black500, not black300) | ⚠️ See analysis below |
| .stats__value text | 1 | Emphasized data value | color.contrast.onLight | Same as headings |
| .agents__agent-name text | 1 | Name emphasis | color.contrast.onLight | Same as headings |
| .ecosystem__modal-close:hover | 1 | Interactive hover state | No semantic (interactive state) | Keep as primitive |
| .nav background | 1 | Dark navigation surface | No exact semantic | Keep as primitive — nav is a unique dark surface |
| .why-build__card h3 border-bottom | 1 | Heading underline accent | No semantic | Keep as primitive — decorative accent |
| .badge--dark background | 1 | Badge surface | No semantic | Keep as primitive — component-specific |
| .thanks__title border-bottom | 1 | Heading underline accent | No semantic | Keep as primitive — decorative accent |

**⚠️ Critical finding**: `color.contrast.onLight` references `black500` (rgba(0,0,0,1) — pure black), but the prototype uses `black-300` (rgba(10,10,15,1) — near-black) for headings. These are different values. The prototype's heading color is NOT pure black — it's the system's near-black. This means either:
- A) The headings should use `color.contrast.onLight` (pure black) — design adjustment
- B) A new semantic is needed for "primary heading text" that references black-300 instead of black500

**Recommendation**: The prototype already uses `color.contrast.onLight` correctly for `.hero__headline` and `.btn--secondary`. The section headings using `black-300` appear to be a deliberate choice for slightly softer contrast. Propose new semantic: **`color.text.heading`** → references `black300`. This distinguishes "maximum contrast text" (onLight=black500) from "primary heading text" (heading=black300, slightly softer).

---

### black-100 → color.print.default ✅

| Usage Context | Occurrences | Design Role | Existing Semantic | Recommendation |
|---------------|-------------|-------------|-------------------|----------------|
| Body/description text (quote, card p, system-desc, modal-desc, modal-highlights, featured, title, cta body, thanks grid) | 8 | Secondary body text | **color.print.default** (references black100) | **Replace with semantic** ✅ |

**Match confirmed**: `color.print.default` references `black100` — exact match. All 8 uses serve the same "readable paragraph text" role.

---

### gray-300 → color.text.default ✅

| Usage Context | Occurrences | Design Role | Existing Semantic | Recommendation |
|---------------|-------------|-------------|-------------------|----------------|
| Tertiary/muted labels (stats label, system-highlights, modal-close, modal-stat-label, enterprise item p, agent-desc, tooltip labels) | 7 | Supporting text, low emphasis | **color.text.default** (references gray300) | **Replace with semantic** ✅ |

**Match confirmed**: `color.text.default` references `gray300` — exact match. All 7 uses serve "supporting text that doesn't compete with primary/secondary."

---

### gray-200 → color.text.muted ✅

| Usage Context | Occurrences | Design Role | Existing Semantic | Recommendation |
|---------------|-------------|-------------|-------------------|----------------|
| Section prefixes, meta-labels (section-prefix ×6, human-label, employers-label, agents__title) | 7 | Overline/prefix/categorical text | **color.text.muted** (references gray200) | **Replace with semantic** ✅ |

**Match confirmed**: `color.text.muted` references `gray200` — exact match. All 7 uses serve "meta-labels and categorical text."

---

### gray-100 → color.structure.border ✅

| Usage Context | Occurrences | Design Role | Existing Semantic | Recommendation |
|---------------|-------------|-------------|-------------------|----------------|
| Subtle dividers/borders (stats hero border, card border-left, modal-stats border, tooltip border) | 4 | Visual separation without attention | **color.structure.border** (references gray100) | **Replace with semantic** ✅ |

**Match confirmed**: `color.structure.border` references `gray100` — exact match. All 4 uses serve "subtle structural divider."

---

### white-100 → color.structure.canvas ✅

| Usage Context | Occurrences | Design Role | Existing Semantic | Recommendation |
|---------------|-------------|-------------|-------------------|----------------|
| Page background, modal background | 2 | Base canvas layer | **color.structure.canvas** (references white100) | **Replace with semantic** ✅ |

**Match confirmed**: `color.structure.canvas` references `white100` — exact match.

---

### white-200 → color.structure.surface ✅

| Usage Context | Occurrences | Design Role | Existing Semantic | Recommendation |
|---------------|-------------|-------------|-------------------|----------------|
| Elevated surfaces (btn-secondary bg, ecosystem system, how-built bg, agents directory) | 5 | Cards/containers above canvas | **color.structure.surface** (references white200) | **Replace with semantic** ✅ |

**Match confirmed**: `color.structure.surface` references `white200` — exact match. All 5 uses serve "elevated surface above canvas."

**Note**: `color.structure.surface.primary` also references white200. Either semantic works; `color.structure.surface` is the simpler reference.

---

## COLOR: Keep as Primitive (no semantic exists, <3 occurrences or unique role)

| Primitive | Occurrences | Design Role | Rationale for Keeping |
|-----------|-------------|-------------|----------------------|
| black-500 | 2 | Deep anchoring surface (footer, modal viz) | Only 2 uses. Could map to a "surface.deep" semantic but below threshold. Revisit if pattern grows. |
| white-300 | 1 | Light text on dark/accent background | Single use. Could be `color.contrast.onDark` but white-300 ≠ white100 (which onDark references). Different value — keep as primitive. |
| pink-500 | 1 | Brand accent highlight label | Single decorative use. No semantic warranted. |
| pink-100 | 1 | Neon easter egg text | Decorative one-off. |
| green-100 | 1 | Neon easter egg text | Decorative one-off. |
| green-300 | 1 | Card hover background | Interactive state — single component. |
| green-500 | 2 | Card hover border accent | Interactive state — single component. |

---

## COLOR: Proposed New Semantic Token

### Proposal: `color.text.heading`

| Criterion | Assessment |
|-----------|-----------|
| Occurrences | 9× (7 section headings + stats value + agent name) |
| Primitive reference | black300 |
| Design role | Primary heading text — high emphasis but not maximum contrast |
| Distinction from existing | `color.contrast.onLight` = black500 (pure black, maximum contrast). `color.text.heading` = black300 (near-black, slightly softer) |
| Reuse potential | High — any product page with section headings would use this |
| Fits concept-first model | Yes: `color.text.{role}` pattern matches existing `color.text.default` and `color.text.muted` |

**Counter-argument**: The prototype might be "wrong" — maybe headings *should* use `color.contrast.onLight` (pure black) and the use of black-300 is a prototype shortcut. HOWEVER, the prototype deliberately uses `color.contrast.onLight` for the hero headline and button text while using `black-300` for section headings — this appears to be an intentional two-tier contrast hierarchy.

**Recommendation**: Propose `color.text.heading` → black300. Feeds into Task 5 for Peter + Ada approval.

---

## SPACING: Existing Semantic Equivalents Found

### space700 (56px) as section heading gap — space.sectioned.loose? 

| Usage Context | Occurrences | Design Role | Existing Semantic | Assessment |
|---------------|-------------|-------------|-------------------|------------|
| Section heading margin-bottom | 5 | Gap between section heading and content | **space.sectioned.loose** (references space600=48px) | ⚠️ Near miss — sectioned.loose=48px, prototype uses 56px |
| Section terminal padding | 2 | Bottom padding of sections | Same pattern | Same assessment |

**Assessment**: `space.sectioned.loose` (48px) is the closest semantic but the prototype uses 56px (space700). This is a **value mismatch** — the semantic concept exists but the value doesn't align. Options:
- A) Snap to space.sectioned.loose (48px) — design adjustment
- B) Propose new tier: `space.sectioned.generous` → space700 (56px)

**Recommendation**: This feeds into Task 5. The pattern is clear (7× same role) but the value exceeds the current semantic scale.

---

### space300 (24px) as section heading indent — No existing semantic

| Usage Context | Occurrences | Design Role | Existing Semantic | Assessment |
|---------------|-------------|-------------|-------------------|------------|
| Section heading margin-left | 6 | Consistent left indent for section headings | None | Strong candidate for new semantic |
| Inline padding / gaps | 8+ | General medium spacing | space.inset.300, space.separated.normal, space.related.loose | Already covered by existing semantics |

**Assessment**: The 6× heading indent usage is a distinct pattern — it's not "inset" (padding) or "separated" (between items). It's a deliberate left offset for visual rhythm. However, this may be a **product-level layout convention** rather than a system-level semantic.

**Recommendation**: Document as product-level pattern. The value (space300=24px) already exists as a primitive. Whether it needs a semantic name like `space.page.headingIndent` depends on whether other products would share this convention. Feeds into Task 7 (patterns) rather than Task 5.

---

### space150 (12px) as list/content item gap — space.grouped.loose ✅

| Usage Context | Occurrences | Design Role | Existing Semantic | Assessment |
|---------------|-------------|-------------|-------------------|------------|
| List item margins, body text margins, gaps between sibling content | 8+ | Spacing between related items in a group | **space.grouped.loose** (references space150=12px) | **Replace with semantic** ✅ |

**Match confirmed**: `space.grouped.loose` references `space150` (12px) — exact match. The "list/content item gap" role aligns with "grouped loose" semantics.

---

### space250 (20px) as container internal padding — space.inset.200? 

| Usage Context | Occurrences | Design Role | Existing Semantic | Assessment |
|---------------|-------------|-------------|-------------------|------------|
| Container padding, content block margins | 5 | Internal padding of cards/containers | **space.inset.200** (references space200=16px) | ⚠️ Near miss — inset.200=16px, prototype uses 20px |

**Assessment**: `space.inset.200` (16px) is close but the prototype uses 20px. `space.inset.300` (24px) is too large. No inset at 20px exists. Options:
- A) Snap to space.inset.200 (16px) — design adjustment
- B) Propose `space.inset.250` → space250 (20px)

**Recommendation**: Feeds into Task 5. The 20px value is used in varied contexts (not all are "inset") so this may not warrant a new semantic inset tier.

---

## SPACING: Keep as Primitive

| Primitive | Occurrences | Design Role | Rationale |
|-----------|-------------|-------------|-----------|
| space100 (8px) | 5+ | Small gaps (list items, viz branches) | Already covered by `space.grouped.normal` (8px) where applicable. Mixed roles. |
| space200 (16px) | 6+ | Medium margins, card h3 margin | Already covered by `space.related.normal` (16px) and `space.inset.200` (16px). Context-dependent. |
| space050 (4px) | 3 | Micro spacing (title margin, viz gap) | Already covered by `space.grouped.tight` (4px). |
| space075 (6px) | 3 | Optical micro-spacing (title padding, item margin) | Already covered by `space.inset.075` (6px). |

---

## SUMMARY TABLE

| Current Primitive | Occurrences | Semantic Equivalent | Recommendation |
|-------------------|-------------|--------------------|-----------------| 
| black-100 (text) | 8× | color.print.default | **Replace with semantic** ✅ |
| gray-300 (text) | 7× | color.text.default | **Replace with semantic** ✅ |
| gray-200 (text) | 7× | color.text.muted | **Replace with semantic** ✅ |
| gray-100 (border) | 4× | color.structure.border | **Replace with semantic** ✅ |
| white-100 (background) | 2× | color.structure.canvas | **Replace with semantic** ✅ |
| white-200 (surface) | 5× | color.structure.surface | **Replace with semantic** ✅ |
| space150 (item gap) | 8+× | space.grouped.loose | **Replace with semantic** ✅ |
| black-300 (heading text) | 9× | — (proposed: color.text.heading) | **Propose new semantic** → Task 5 |
| space700 (section gap) | 7× | — (near: space.sectioned.loose=48px) | **Evaluate in Task 5** — value exceeds current scale |
| space300 (heading indent) | 6× | — (no semantic for indent pattern) | **Document as pattern** → Task 7 |
| space250 (container padding) | 5× | — (near: space.inset.200=16px) | **Evaluate in Task 5** — value between inset tiers |
| black-500 (deep surface) | 2× | — | Keep as primitive (below threshold) |
| white-300 (inverted text) | 1× | — | Keep as primitive (single use, value ≠ onDark) |
| pink-500, pink-100, green-100 | 1× each | — | Keep as primitive (decorative) |
| green-300, green-500 | 1-2× | — | Keep as primitive (interactive state, single component) |

---

## Proposed New Semantics for Task 5

| Proposed Token | Primitive Reference | Occurrences | Rationale |
|----------------|--------------------:|-------------|-----------|
| color.text.heading | black300 | 9× | Primary heading text — intentional two-tier contrast hierarchy (heading=near-black vs onLight=pure-black) |

## Values Requiring Task 5 Evaluation

| Value | Issue | Decision Needed |
|-------|-------|-----------------|
| space700 (56px) as section heading gap | Exceeds space.sectioned.loose (48px) | Snap to 48px, or add new tier? |
| space250 (20px) as container padding | Between space.inset.200 (16px) and space.inset.300 (24px) | Snap to 16px/24px, or add inset.250? |
