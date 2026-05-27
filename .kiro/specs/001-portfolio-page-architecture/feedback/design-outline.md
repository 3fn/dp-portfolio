# Spec Feedback: Portfolio Page Architecture — Design Outline

**Spec**: 001-portfolio-page-architecture
**Phase**: Design Outline
**Created**: 2026-05-09
**Reviewers**: Leonardo, Ada, Lina

---

## Design Outline Feedback

### Context for Reviewers

- Spec 000 (Nav-Header-App Hardening) is complete — nav has `--nav-bg-override`, `--nav-glow-color`, `--nav-border-color` custom properties ready for scroll-linked theming
- Font family primitives already done in Spec 000 (Figtree body, Commit Mono mono, Rajdhani display unchanged)
- Original "Link Component" spec killed — Button-CTA `href` prop folded into this spec instead
- This spec builds the page scaffolding that Specs 002–004 (Hero, Ecosystem, Career Timeline) depend on
- Hero chord diagram, Ecosystem 3D cube, and Career timeline canvas are explicitly OUT of scope (separate specs)
- Source material: DraftFP08 full-page mock (top/middle/bottom in `primitive-assets/`), `product/specs/page-structure.md`, nav analysis

**Key decisions already settled (from Spec 000 and planning sessions):**
- Three coordinated nav custom properties (not a single theme prop) → Spec 000 Decision 2
- Nav underglow is intrinsic → Spec 000 Decision 7
- No standalone Link component needed → roadmap update 2026-05-09
- Button-CTA gets `href` prop for outbound links → Peter decision 2026-05-09

**Open questions needing Peter's input (7 items in design-outline.md § "Open Questions"):**
1. Section background exact color tokens
2. Stats bar: live or static numbers?
3. Hero CTA destinations
4. CTA section destinations
5. Code screenshot assets
6. Agent portrait assets
7. Content column max-width

**Focus your review on:**
- Is the page architecture sound for the product's needs?
- Are the section builds correctly scoped (simple enough for this spec vs needing their own)?
- Is the scroll-linked color system approach correct?
- Are there missing sections or behaviors from the mock?
- Token needs: can Ada identify which existing primitives map to section backgrounds?

---

## Leonardo — Architectural Review

**Date**: 2026-05-09

### Overall Assessment

The design outline is sound. It correctly scopes the "glue" work — shared behaviors and simple sections — while deferring complex canvas interactions to their own specs. The dependency on Spec 000 is clean and the custom property hooks are the right integration point for scroll-linked theming.

### Open Questions — Answers from Planning Sessions

| # | Question | Answer | Source |
|---|----------|--------|--------|
| 2 | Stats bar: live or static? | **Static.** Hardcoded values. Live stats is Phase 5+. | Peter, planning session 2026-05-07 |
| 3 | Hero CTA destinations | "View the GitHub" → github.com/3fn/DesignerPunkv2 (external). "Learn more" → smooth-scroll to Why Build section (internal). | Peter, planning session 2026-05-07 |
| 4 | CTA section destinations | "Peter on LinkedIn" → linkedin.com/in/petermichaelsallen (external). "DesignerPunk on GitHub" → github.com/3fn/DesignerPunkv2 (external). | Peter, planning session 2026-05-07 |
| 5 | Code screenshot assets | Peter has assets available. | Peter, planning session 2026-05-07 |
| 6 | Agent portrait assets | Peter has assets available. Blend-mode composited (multiply/screen depending on background). | Peter, planning session 2026-05-07 |
| 7 | Max-width value | **1100px.** Matches the career-arc-v3.html demo's max-width. | Inferred from primitive-assets/career-arc-v3.html |

### Open Questions — Still Need Input

All 7 open questions resolved. No outstanding items.

### Resolved After Initial Review

| # | Question | Resolution |
|---|----------|-----------|
| 1 | Section background exact colors | **Resolved via Figma analysis** (`analysis/analysis-desktop-110/token-audit-report.md`). All section backgrounds map to existing primitives: Hero/Why Build = `green100`, Stats = `pink100`, Ecosystem/Agents = `purple100`, Critical Features/Code = `orange300`, How Built/Thanks = `teal300`/`teal500`, Who Built/CTA = `black300`. No new color tokens needed for backgrounds. |

### Architectural Feedback

**Decision 1 (Button-CTA href)** — Agree. Additive prop, no breaking change, correct semantic distinction. The counter-argument about test surface is valid but manageable — Lina will handle.

**Decision 2 (Scroll-linked nav)** — Agree. One refinement: the text color swap (dark text ↔ light text) should be a snap, not a transition. Interpolating between dark and light text during a color transition creates an unreadable mid-state. Recommend a threshold: when nav background luminance drops below a defined point, snap text to light. CSS `color-scheme` or a class toggle (`.nav--dark-text` / `.nav--light-text`) handles this.

**Decision 3 (Scroll-reveal)** — Agree. One-shot is correct. The `prefers-reduced-motion` wiring in Phase 1 is good forward-thinking for Phase 4 WCAG.

**Decision 4 (Page layout)** — Agree. Full-bleed sections with constrained content is the standard pattern for this type of page. 1100px max-width confirmed.

**Decision 5 (Responsive)** — Agree. Desktop-first is correct for the audience. No concerns.

**Decision 6 (Easter eggs)** — Agree. Pure CSS, no JS, mobile-hidden. Correct scope.

**Decision 7 (Section prefix)** — Agree. Reusing the `//` / `!!` pattern from Spec 000 at heading scale is good visual consistency.

### Scope Feedback

The section builds listed as "in scope" are correctly categorized as simple enough for this spec:
- Stats Bar, Why Build, Agent Grid, Critical Features, Code Screenshots, How Built, Special Thanks, CTA, Footer — all are primarily layout + content + styling, no complex interactions.

**One question**: The "Who Built This" section includes Badge-Label-Base employer badges AND the career timeline. The badges and bio text are simple, but the career timeline is Spec 004. Is the section partially built here (badges, bio, heading) with the timeline area left as a placeholder? Or does the entire section wait for Spec 004? I'd recommend building the section shell here with a placeholder for the timeline canvas.

### Token Observations

Now that Spec 000 resolved font primitives, and the Figma analysis (`analysis/analysis-desktop-110`) confirms section backgrounds, the remaining token work is:

- **One new semantic needed**: `color.structure.text.secondary` — for de-emphasized body text (gray300/gray400 usage in the mock). Genuine gap.
- **Section backgrounds**: All map to existing primitives. No new tokens needed.
- **Decorative/illustration colors**: Stay on primitives — don't force semantics onto artistic choices (per Ada's audit recommendation).
- **Typography audit still needed**: Text styles weren't captured by Figma variable bindings. Separate audit via `figma_get_styles` needed to confirm type scale usage.
- **Spacing**: Only 6 spacing tokens used in the mock — most layout is Figma auto-layout, not variable-bound. Will need to define spacing during implementation.

### Risk I'd Add

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Section builds reveal missing design details (spacing, exact typography) not visible in flat mock | High | Low | Build iteratively, refine with Peter during implementation. Flat mocks always have gaps. |

---

### Thurgood — Spec Governance Review (2026-05-10)

#### [THURGOOD R1]

**Overall**: Strong design outline. Leonardo resolved all open questions, Ada confirmed token coverage, and the section visual profiles are comprehensive. The architecture is sound for formalization. A few governance items:

---

#### Issues

**[THURGOOD-R1-1] Decision 4 max-width contradiction**

Ada's correction is right — the design outline still says "~1100-1200px max-width" in Decision 4 but Ada's analysis shows `breakpointLg` (1440px) with `space500` inline padding. Leonardo updated the section visual profiles to reference `breakpointLg` but Decision 4's prose wasn't fully updated.

**Action needed**: Verify Decision 4 in the design outline uses `breakpointLg` consistently. Remove any remaining 1100px references.

**[THURGOOD-R1-2] Open Questions section is stale**

All 7 questions are resolved (Leonardo answered 2–7, Ada resolved 1 via Figma analysis). The Open Questions section should be updated to show resolutions, same pattern as Spec 000.

**Action needed**: Strike through and annotate each resolved question.

**[THURGOOD-R1-3] "Agent Grid" scope inconsistency**

The In Scope table lists "Agent Grid" as a section build, but Section Visual Profile #6 (Agent Grid) says "Build scope: Scaffold only — deferred to Spec 003 with the rest of the Ecosystem section." These contradict.

**Question for Peter/Leonardo**: Is the Agent Grid (the three-column directory listing with agent names/roles) built in this spec, or deferred with the Ecosystem section? The directory listing itself is simple (CSS Grid + text), but it's visually part of the Ecosystem section. If the Ecosystem section container is scaffold-only, does the agent directory inside it also defer?

**[THURGOOD-R1-4] `color.structure.text.secondary` — governance note**

Ada flagged a new semantic token need and correctly noted it requires Peter's approval. This should be tracked as a Peter deliverable for this spec (same pattern as Spec 000's token decisions). Not blocking formalization — can be resolved during requirements phase.

**[THURGOOD-R1-5] Nav glow/border assignments — confirmed or proposal?**

Leonardo's updated Decision 2 color map shows specific glow tokens (`glow.neonPink`, `glow.neonPurple`, `glow.neonCyan`) per section. Ada notes these are still "TBD" and offers three options. The design outline presents them as decided — is this confirmed by Peter, or still a proposal needing approval?

**[THURGOOD-R1-6] Missing: Button-CTA contract implications**

Decision 1 (polymorphic rendering) adds a new behavior to an existing Stemma component. This means:
- Button-CTA's `contracts.yaml` needs updating (new contract or extended behavior)
- Button-CTA's `schema.yaml` needs the `href` prop
- Existing Button-CTA tests need verification that they still pass
- New tests needed for `<a>` rendering path

This should be called out explicitly in the implementation sequence as a Lina task with contract traceability, not just "add href prop."

---

#### Confirmations

| Area | Status | Notes |
|------|--------|-------|
| Scope boundaries (in/out) | ✅ Correct | Hero/Ecosystem/Career correctly deferred |
| Dependency on Spec 000 | ✅ Clean | Custom property hooks are the integration point |
| Section visual profiles | ✅ Comprehensive | Leonardo's additions are detailed and actionable |
| Token assessment | ✅ Complete | Ada confirmed all backgrounds exist, one new semantic needed |
| Risk assessment | ✅ Reasonable | Leonardo's added risk (missing design details) is valid |
| Implementation sequence | ✅ Logical | Button-CTA first (unblocks CTAs), then scaffolding, then sections |

---

#### Readiness for Formalization

**Almost ready.** Resolve before writing requirements.md:
1. Fix Decision 4 max-width if still inconsistent (trivial text fix)
2. Resolve Agent Grid scope (Peter decision)
3. Confirm glow token assignments (Peter decision)
4. Acknowledge `color.structure.text.secondary` as a token deliverable (Peter approval)

Items 2–4 are Peter decisions that can happen during requirements feedback if preferred. Close enough to proceed if Peter wants to move forward.

---

### Peter Decisions (2026-05-10)

| # | Decision | Context |
|---|----------|---------|
| 1 | `color.structure.text.secondary` approved | Reference: `gray300` (not gray400 — gray400 is used on non-text elements) |
| 2 | Nav glow assignments confirmed | Leonardo's Option 2 picks (glow.neonPink, glow.neonPurple, glow.neonCyan per section) are approved |
| 3 | Agent Grid defers with Ecosystem | Scaffold only in this spec, full build in Spec 003 |
| 4 | Stats text shadow noted | Hard shadow: `pink500` @ 100%, 0 blur, x:2 y:2 on all stats text. Ada to assess tokenization. |
| 5 | Spec 005 (Visual Refinements) added to roadmap | Catches CTA button visual updates, spacing corrections, misalignments discovered during build |

---

### Lina — Component Architecture Review (2026-05-10)

#### Overall Assessment

My scope in this spec is narrow but important: Button-CTA `href` prop (Decision 1). The page architecture decisions (2–7) are Leonardo/Sparky's domain and look sound. I have one issue with the Button-CTA work and two observations.

---

#### Issues

**[LINA-R1] Decision 1 — Button-CTA `href` needs contract and concept catalog consideration**

Thurgood flagged this (THURGOOD-R1-6) and he's right. Adding `href` to Button-CTA isn't just "add a prop" — it changes the component's behavioral contract surface:

1. **New contract needed**: `interaction_pressable` currently guarantees a `<button>` element. With `href`, the component renders `<a>` — different keyboard behavior (Enter only, no Space), different role (link vs button). This needs either:
   - A new contract (`content_renders` or `layout_polymorphic`) documenting the dual-render behavior
   - Or an extension to `interaction_pressable` noting the element type depends on `href`

2. **Concept catalog**: Neither `polymorphic` nor `renders_as_link` exist as concepts. This is a new behavioral pattern for Stemma. I'd propose `content_renders` as the concept — "component renders different root elements based on props."

3. **Existing test impact**: Button-CTA has extensive tests in `@3fn/core`. The `href` addition must not break any existing test. All existing tests use Button-CTA without `href` (as `<button>`) — they should continue passing unchanged. New tests cover the `<a>` path.

4. **Schema update**: `href` prop needs to be added to `Button-CTA.schema.yaml` with type `string`, required `false`, and description noting the polymorphic behavior.

**Recommendation for implementation sequence**: The design outline's step 1 should be expanded:
```
1. Button-CTA href prop (Lina):
   a. Add href prop to types.ts
   b. Update schema.yaml
   c. Implement polymorphic rendering in web platform
   d. Add contract (propose concept to catalog)
   e. Verify existing tests still pass
   f. Write new tests for <a> rendering path
   g. Update README
```

**[LINA-R2] Decision 1 — External link icon composition pattern**

The outline says Button-CTA with `href` gets a trailing Icon-Base (external-link.svg) for outbound links. Question: is this automatic (component renders the icon when `target="_blank"`) or explicit (product passes an `icon` prop)?

Options:
- **Auto**: `href` + `target="_blank"` → component automatically renders trailing external-link icon. Simpler for consumers, but opinionated.
- **Explicit**: Product sets `icon="external-link"` + `iconPosition="trailing"`. More flexible, but every outbound CTA needs to remember the icon.

Button-CTA already has `icon` and `iconPosition` props. The explicit approach uses existing API. The auto approach adds new implicit behavior.

**My recommendation**: Explicit. Use existing `icon` + `iconPosition` props. The auto approach creates a hidden behavior that's hard to override if a product wants an outbound link without the icon.

**Peter decision (2026-05-10)**: Explicit. Product sets `icon="external-link" iconPosition="trailing"` on outbound CTAs. No automatic icon rendering based on `target="_blank"`.

**Counter-argument**: Every outbound CTA in this portfolio needs the icon. Explicit means repeating `icon="external-link" iconPosition="trailing"` on every instance. But that's 4 instances total — not a maintenance burden.

---

#### Observations

**[LINA-O1] Decision 7 — Section prefix: agree with Ada's Option 3**

Product CSS pattern is correct for now. The implementation is trivial (same `aria-hidden` span + fixed width from Spec 000). If it needs to become a component later, the promotion path is clear. No Stemma work needed from me for this.

**[LINA-O2] `color.action.primary` → `pink300` affects multiple components**

Ada noted this correctly — all components consuming `color.action.primary` will render pink. This includes Button-CTA, Button-Icon, Chips, and Inputs. For the portfolio this is fine (everything should be pink-branded). But I want to flag: if any component in the portfolio needs the *original* cyan action color (e.g., for a different interactive element), it won't be available via `color.action.primary` anymore. The `color.action.navigation` token (→ `cyan500`) is the remaining cyan semantic.

Not a problem — just noting the blast radius of the local override.

---

#### Confirmations

| Area | Status | Notes |
|------|--------|-------|
| Button-CTA href is additive (no breaking change) | ✅ | Existing usage without href unchanged |
| Button-CTA already has icon/iconPosition props | ✅ | External link icon uses existing API |
| No other Stemma components need modification | ✅ | All other page elements are product-level or existing components used as-is |
| Container-Card-Base usage (Why Build, Critical Features) | ✅ | Existing component, no modifications needed |
| Badge-Label-Base usage (Who Built This) | ✅ | Existing component, no modifications needed |
| Icon-Base usage (outbound icons, platform icons) | ✅ | Existing component, `external-link` already in icon map |

---

#### Ready to Proceed

My work is well-scoped: Button-CTA `href` prop implementation. I can begin as soon as the spec is formalized and the implementation sequence is confirmed. No blockers from my side.

---

### Thurgood — Directed Question for Ada

#### [THURGOOD R1 — Follow-Up]

- [@ADA] **Stats text shadow — token or product CSS?** Peter confirmed all stats text has a hard shadow: `pink500` @ 100% opacity, 0 blur, x:2 y:2. The same hard-shadow motif appears on cards throughout the page (purple300/pink300/cyan300/orange300, x:8 y:8, 0 blur). Two questions: (1) Does the text shadow (x:2 y:2) warrant a shadow token, or is it product CSS? (2) Does the broader hard-shadow pattern (multiple colors, multiple offsets, 0 blur, 100% opacity) warrant a token family or utility pattern? My instinct: product CSS for both — single-consumer art direction, not reusable system vocabulary. But you own the token architecture call. → design-outline.md § "Section Visual Profiles / 3. Stats Bar" -- [THURGOOD R1]

- [@ADA] **`color.structure.text.secondary` correction**: Peter confirmed the reference should be `gray300`, not `gray400`. The gray400 instances in the Figma audit are non-text elements (borders, fills). Please update your token creation plan accordingly.

### Ada — Token Assessment (2026-05-10)

**Source**: Token audit report (`analysis/analysis-desktop-110/token-audit-report.md`), design outline section visual profiles, existing token source verification, section analyses (`analysis/analysis-{accomplish,criticalfeatures,footer,howbuilt,whybuild,stats}`).

#### Section Background Primitives — All Exist

Every section background color maps to an existing primitive. No new color primitives needed.

| Section | Primitive | Verified |
|---------|-----------|----------|
| Hero / Why Build (base) | `green100` | ✅ |
| Stats Bar | `pink100` | ✅ |
| Ecosystem | `yellow300` | ✅ |
| Agent Grid | `green100` | ✅ |
| Critical Features | `orange100` | ✅ |
| Code Screenshots | `orange300` | ✅ |
| How Built | `teal200` → `yellow300` gradient | ✅ |
| Who Built This | `black300` | ✅ |
| CTA | `green100` | ✅ |
| Footer | `black500` | ✅ |

**Recommendation**: Use primitives directly for section backgrounds. Do NOT create semantic tokens. Rationale (same as Spec 000):
- Section backgrounds are compositions (gradients, noise, blend modes), not single color values
- Zero reusability — each section has exactly one consumer
- Product-level art direction, not design system vocabulary

#### ~~New Semantic Token: `color.structure.text.secondary`~~ — SCRAPPED

~~Peter approved this token with a correction to my original proposal.~~

**Peter decision (2026-05-10)**: Scrapped. The existing `color.text.muted` (→ `gray200`) already covers the secondary/de-emphasized text use case. The `gray300` value in the mock is actually `color.text.default` (primary body text) — it reads as "secondary" only because it's on colored backgrounds. No new token needed.

#### Spec 001 Token Deliverable: `color.action.primary` → `pink300`

**Peter decision (2026-05-10)**: Update `color.action.primary` from `cyan300` to `pink300` in local `src/tokens/semantic/ColorTokens.ts`. Local change via `tokenSource` — does not affect `@3fn/core` package default. All components consuming `color.action.primary` (Button-CTA, Button-Icon, Chips, Inputs) render pink in this product. Design outline should reference `color.action.primary` (semantic), not `pink300` (primitive).

#### [RE: THURGOOD R1] — Stats Text Shadow: Product CSS, Not Token

**Thurgood's instinct is correct. Product CSS for both.**

**(1) Stats text shadow (x:2, y:2, `pink500`, 0 blur, 100% opacity):**

Not a token. Reasons:
- Single consumer (stats text only)
- The offset (2/2) doesn't align with any shadow primitive (our shadow offsets start at `shadowOffset100` = 4)
- It's a decorative flourish specific to the stats section's visual identity
- No other text in the system uses this treatment

**(2) Broader hard-shadow pattern (multiple colors, x:8 y:8, 0 blur, 100% opacity):**

Also not tokens. Reasons:
- The "hard shadow" motif is an art direction choice for this portfolio — it's the visual signature of the page, not a reusable system pattern
- Each instance uses a different color (`purple300` on Why Build cards, `pink300` on Critical Features cards, `cyan300` on How Built cards, `orange300` on Agent Grid)
- The color choice is contextual (matches or complements the section's palette)
- Zero blur + 100% opacity + fixed offset is a CSS one-liner: `box-shadow: 8px 8px 0 var(--primitive-color)`
- If we tokenized this, we'd need a token per color variant — that's just wrapping primitives in unnecessary indirection

**Implementation recommendation**: Product-level CSS utility class or mixin:
```css
.hard-shadow--purple { box-shadow: var(--space-100) var(--space-100) 0 var(--purple-300); }
.hard-shadow--pink { box-shadow: var(--space-100) var(--space-100) 0 var(--pink-300); }
/* etc. */
```

Note: the offset (8) maps to `space100`. The pattern is consistent enough to use a token for the offset value, but the shadow itself isn't a token — it's a product-level composition of primitives.

**Counter-argument**: If this hard-shadow motif becomes a DesignerPunk brand pattern used across multiple products, it could warrant a semantic shadow token (`shadow.hard.{color}`). But right now: one product, one page, art direction. Product CSS.

#### Nav Glow Assignments — Confirmed

Peter approved Leonardo's Option 2 picks. Using existing `glow.neon*` tokens per section:

| Section Group | Glow Token | Confirmed |
|---------------|-----------|-----------|
| Hero / Why Build / CTA | `glow.neonGreen` | ✅ |
| Stats / Why Build cards | `glow.neonPink` | ✅ |
| Ecosystem / Agent Grid | `glow.neonPurple` | ✅ |
| Critical Features / Code | `glow.neonYellow` | ✅ |
| How Built / Thanks | `glow.neonCyan` | ✅ |
| Who Built / Footer | `glow.neonGreen` | ✅ |

All tokens already exist. No creation needed.

#### Decorative Colors — No Semantics

Agreed. Illustration primitives (`yellow100`, `cyan100`, `teal300`, etc.) stay on primitives. Not tokenizable as semantics.

#### Max-Width — Correction: `breakpointLg` (1440), Not 1100

Leo's inference from `career-arc-v3.html` was incorrect. All 6 section analyses confirm:

- **Frame width**: `breakpointLg` (1440)
- **Content padding**: `space500` per side (matches nav padding from Spec 000)
- **Effective content area**: `breakpointLg` minus 2× `space500`

Footer's apparent 64 padding is `space500` + `inset.300` (outer margin + inner padding). Same outer margin as all sections.

**Design outline corrections needed**:
- Decision 4: Replace "~1100-1200px" with `breakpointLg`
- Open Question 7: Mark resolved with `breakpointLg`

#### Typography Gaps — Surfaces During Implementation

- `fontSize700` (42px) exists for the "How Built" featured text
- Stats numbers and easter egg text scale TBD — will surface during section builds
- Not blocking formalization

---

#### [UPDATED 2026-05-10] Token Reference Errors in Design Outline

The updated design outline uses token names that don't exist. These need correction before formalization:

**Opacity tokens — wrong naming convention (RESOLVED):**

The outline uses `opacity200`, `opacity300`, `opacity350`, `opacity400`, `opacity500`. Our opacity tokens use percentage-based naming (`opacity008` through `opacity100`, in 8% increments). **Peter decision: align to nearest available token.**

| Used in Outline | Intended Value | Correct Token |
|-----------------|---------------|---------------|
| `opacity200` | ~20% | `opacity024` |
| `opacity300` | ~24% | `opacity024` |
| `opacity350` | ~60% | `opacity056` |
| `opacity400` | ~80% | `opacity080` |
| `opacity500` | 100% | `opacity100` |

**Corrections for visual profiles:**

| Section | Current | Corrected |
|---------|---------|-----------|
| Stats noise | `opacity300` | `opacity024` |
| Stats text shadow | `opacity500` | `opacity100` |
| Critical Features gradient | `opacity200` | `opacity024` |
| Critical Features cards | `opacity400` | `opacity080` |
| How Built circles | `opacity200` | `opacity024` |
| How Built containers | `opacity350` | `opacity056` |

**`radiusSmall` — doesn't exist:**

CTA section references `radiusSmall` for button radius. Our radius tokens are numeric: `radius000` through `radius400` + `radiusMax` + `radiusHalf`. Likely `radius100` (8) or `radius050` (4) — to be confirmed during implementation.

#### [UPDATED 2026-05-10] Decision 7 — Section Prefix Formalization

Leo asks whether the `//` prefix pattern should be a typography token, lightweight component, or product CSS.

**My answer: Option 3 (product CSS pattern) for now.**

Reasoning:
- A typography token can't encode structural behavior (rendering a separate decorative element). Leo is correct about this.
- A lightweight component is premature — we have one page with this pattern. If it appears in a second product, promote then.
- The implementation is trivial: a `<span aria-hidden="true">` with fixed width + `grouped.tight` gap. Same pattern Spec 000 already uses in the popover. Sparky can reuse the CSS class.

**Counter-argument**: There are ~10 section headings on this page all using the same pattern. That's enough repetition to justify a utility class or even a tiny web component. But "utility class" IS product CSS (Option 3) — it doesn't need to be a Stemma component.

#### [UPDATED 2026-05-10] Stats Text Shadow — Revised Assessment

The updated outline now uses token references for the stats shadow: `pink500` @ `opacity500`, `blur000`, offset `space025` x/y.

My assessment is unchanged: **product CSS, not a token.** But I'll note that the token references are now correct in spirit (using system primitives for the values), even though `opacity500` needs correction to `opacity100`. The composition itself (`box-shadow: var(--space-025) var(--space-025) var(--blur-000) var(--pink-500)`) is product CSS that references primitives — which is the correct pattern for one-off decorative effects.

#### [UPDATED 2026-05-10] Hard Shadow Pattern — Revised Assessment

Same conclusion: product CSS composing primitives. The updated outline correctly uses `space100` for offset and `blur000` for zero blur. The color varies per section. A utility class pattern works:

```css
.hard-shadow { box-shadow: var(--space-100) var(--space-100) var(--blur-000) var(--hard-shadow-color, var(--purple-300)); }
```

Each section sets `--hard-shadow-color` to its contextual color. Clean, no new tokens needed.

#### [UPDATED 2026-05-10] Typography Needs — Now Specific

The outline now lists specific typography needs. Assessment:

| Need | Size | Exists? | Recommendation |
|------|------|---------|----------------|
| Stats display "1" | 128px | ❌ Far exceeds `fontSize700` (42px) | Product CSS — single instance, decorative |
| Easter egg text | 72-74px | ❌ Exceeds scale | Product CSS — decorative, two instances |
| Section headings | 33px | ✅ `fontSize500` (33px) | Use existing — maps to `typography.h2` |
| Sub-headings | 29px | ✅ `fontSize400` (29px) | Use existing — maps to `typography.h3` |
| Value props | 37px | ✅ `fontSize600` (37px) | Use existing — maps to `typography.h1` |

The 128px and 72-74px values are decorative display text with 1-2 instances each. Not worth creating tokens for. The 33px, 29px, and 37px values already exist in our scale and map to existing heading semantics.

---

#### [CRITICAL] Primitives Used Where Semantics Exist

The design outline uses primitive tokens for text colors where semantic tokens already exist. This violates Core Goals ("MUST use semantic tokens first"). Several cases:

**1. Primary text on light backgrounds:**

The outline uses `black300` throughout (Stats numbers, card body, How Built, CTA heading). But we have TWO semantic options:
- `color.contrast.onLight` → `black500` (high contrast, headings)
- `color.text.default` → `gray300` (body text)

Neither maps to `black300`. This suggests either:
- The Figma uses `black300` as a design choice that sits between our semantics (darker than `color.text.default` but lighter than `color.contrast.onLight`)
- Or the outline should use `color.contrast.onLight` for headings and `color.text.default` for body

**Recommendation**: Use `color.contrast.onLight` for headings/primary text, `color.text.default` for body text. If `black300` is genuinely needed as a middle ground, that's a gap worth discussing — but I suspect it's a Figma binding issue, not intentional design.

**2. Text on dark backgrounds:**

The outline uses `white200` and `white300` for text on dark sections. But `color.contrast.onDark` → `white100`. The outline should use:
- `color.contrast.onDark` for primary text on dark backgrounds

If `white200`/`white300` are intentionally lower-contrast (de-emphasized text on dark), that's a gap — we'd need `color.text.default` equivalent for dark backgrounds. But more likely, the Figma just uses slightly different whites and the semantic intent is "readable text on dark."

**3. `color.structure.text.secondary` vs `color.text.muted`:**

Peter approved `color.structure.text.secondary` → `gray300`. But `color.text.default` ALREADY references `gray300`, and `color.text.muted` → `gray200` exists for secondary text. We have a potential collision:

| Token | Reference | Intended Use |
|-------|-----------|-------------|
| `color.text.default` | `gray300` | Primary body text |
| `color.text.muted` | `gray200` | Secondary/muted text |
| `color.text.subtle` | `gray100` | Tertiary/subtle text |
| `color.structure.text.secondary` (proposed) | `gray300` | De-emphasized body text |

**Problem**: `color.structure.text.secondary` at `gray300` is identical to `color.text.default`. These would be the same token with different names. Either:
- The proposed token should reference `gray200` (matching `color.text.muted`'s value) — making it a synonym
- Or the proposed token isn't needed because `color.text.muted` already serves this purpose
- Or the `color.text.*` family and `color.structure.text.*` family have different semantic scopes that justify both

**Question for Peter**: Do we need `color.structure.text.secondary` given that `color.text.muted` (→ `gray200`) already exists? What's the intended distinction? If the secondary text in the mock is `gray300`, that's already `color.text.default` — which means the "secondary" text in the mock is actually using the primary text token, just on colored backgrounds where it reads as lighter.

**Peter decision (2026-05-10)**: `color.structure.text.secondary` scrapped. Existing `color.text.muted` (→ `gray200`) covers the secondary text use case. No new token.

**4. `color.action.primary` mismatch:**

The system defines `color.action.primary` → `cyan300`. But the portfolio's CTA buttons use `pink300` fill. The outline references `pink300` directly for the primary CTA button. This is either:
- A product-level override (the portfolio's "primary" is pink, not cyan) — handled by theme overrides
- Or the outline should use `color.action.primary` and the token's value should be updated

**This is a significant architectural question.** If the portfolio's primary action color is pink (not cyan), that's a theme-level decision. The correct approach is a product theme override, not using primitives directly. But that's a larger discussion — flagging for Peter.

**Peter decision (2026-05-10)**: Update `color.action.primary` → `pink300` in local `src/tokens/semantic/ColorTokens.ts`. This is a local change (product's `tokenSource`), not a change to `@3fn/core`. The package default remains `cyan300` for other products. The design outline should reference `color.action.primary` (the semantic), not `pink300` (the primitive).

**5. `cyan300` as accent on dark:**

"Who Built This" uses `cyan300` for accent text. This maps to `color.action.primary` (which IS `cyan300`). The outline should reference the semantic: `color.action.primary` or `color.action.navigation`.

**Note**: After the `action.primary` → `pink300` change, `cyan300` on dark backgrounds is no longer `color.action.primary`. It's `color.action.navigation` (→ `cyan500`) or needs its own semantic. Most likely this accent text should use `color.action.navigation` — it's link-colored text on a dark background, which is a navigation affordance.

---

### Sparky — Web Implementation Review (2026-05-10)

#### Overall Assessment

The architecture is sound for web implementation. Full-bleed sections with constrained content, Intersection Observer for scroll-linking, CSS-first animations — all correct calls. The section visual profiles give me enough detail to build without guessing. No architectural objections.

---

#### Implementation Decisions (Confirmed by Peter)

| # | Topic | Decision |
|---|-------|----------|
| SPARKY-1 | Nav text color snap timing | Snap at transition start (when observer fires), not when background transition completes. Better to have readable text on a transitioning background than unreadable text at any point. |
| SPARKY-2 | Noise/texture implementation | SVG data URI as `background-image`. Single noise tile reused at different opacities per section. No `feTurbulence` (rendering inconsistencies across browsers). |
| SPARKY-5 | Stats count-up trigger | Simultaneous with reveal animation (fade-in + count-up together). `prefers-reduced-motion`: render final values immediately, no animation. |

---

#### Implementation Concerns

**[SPARKY-3] Asset dependencies — not blocking, needs coordination**

Several sections need assets from Peter:
- Halftone pattern tile (SVG or PNG) — Code Screenshots, CTA
- Diamond lattice tile (SVG) — Critical Features (or I attempt pure CSS `repeating-linear-gradient` at 45°)
- Code screenshot images
- CTA photo asset
- Agent portraits (blend-mode composited)

Peter confirms assets are available. Format/preparation may need iteration. I'll scaffold sections with placeholder containers and layer in assets as they arrive.

**[SPARKY-4] Diamond lattice — CSS-first attempt**

Will try pure CSS (`repeating-linear-gradient` at 45°) before requesting an SVG export. If CSS can't match the visual, fall back to asset.

**[SPARKY-8] Token consumption architecture — resolved**

Ada handles the `color.action.primary` → `pink300` source change. I consume whatever CSS custom properties land in the product stylesheet. No action needed from me on token source files.

---

#### Risks I'd Add

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Blend mode rendering differences across browsers | Medium | Low | Test Chrome/Firefox/Safari early. Fallback: pre-composited images. |
| Intersection Observer threshold tuning | High | Low | Will need iteration with Peter to get scroll-linked transitions feeling right. Budget time for this. |
| Responsive decisions made implicitly during section builds | High | Low | Document responsive choices as I make them. Phase 2 refines, doesn't start from scratch. |

---

#### [SPARKY-R1] Recommendation: Phase the Implementation Sequence

**Problem**: The spec bundles 8 full section builds + 3 scaffolds + scroll system + reveal system + easter eggs + responsive into one flat sequence. Each section has its own background treatment, texture, spacing, and layout. "Simple" × 8 is still significant volume. Without structure, feedback gets tangled across sections and there's no natural "done" checkpoint until everything lands at once.

**Recommendation**: Structure the implementation as one spec with named phases. Each phase gets its own completion checkpoint — implement, review with Peter, tune, move on. If one section needs more iteration (blend modes, asset tuning), it doesn't block others from being considered complete.

**Proposed phase breakdown:**

| Phase | Name | Deliverables | Done When |
|-------|------|-------------|-----------|
| A | Foundation | Page layout scaffolding, scroll-linked nav color system, contrast management (text snap), scroll-reveal animation system, `prefers-reduced-motion` wiring | Scrolling through empty sections triggers correct nav colors and text mode. Reveal classes toggle on intersection. |
| B | Stats Bar | Stats section full build — layout, count-up animation, text shadow, noise texture | Section renders correctly with animated numbers. |
| C | Why Build | Four Container-Card-Base cards, hard shadow, background gradient + exclusion texture, easter egg ("Because why not!?") | Cards render with correct styling. Easter egg flickers on hover. |
| D | Critical Features | 2×3 feature card grid, diamond lattice background, angular gradient, hard shadow | Cards render in grid with background pattern. |
| E | Code Screenshots | Blend-mode imagery, halftone overlay, asset composition | Images render with correct tint/blend treatment. |
| F | How Built + Special Thanks | Frosted glass cards, radial gradient background, halftone circles, featured text, credits grid, easter egg ("Hard $#@%ing work!") | Both sub-sections render. Frosted glass effect works. |
| G | Who Built This (partial) | Bio text, employer badges (Badge-Label-Base), section heading. Timeline placeholder for Spec 004. | Section shell renders with bio content. Placeholder area reserved for timeline. |
| H | CTA + Footer | CTA section (value props, two Button-CTA with `href`, photo), Footer (logo, name, email) | Both sections render. Outbound links work with external-link icon. |
| I | Polish | Section heading prefix pattern (`//` / `!!`), responsive breakpoints (column reduction), easter egg timing refinement | All sections respond to breakpoints. Prefixes render correctly. |

**Why this order**: Foundation first (everything depends on it). Then sections roughly top-to-bottom, grouped by complexity. CTA depends on Button-CTA `href` (Lina's prerequisite). Polish last because it touches everything.

**What this is NOT**: Sub-specs with their own formalization. Just named task groups in the implementation sequence with clear acceptance criteria. Lightweight process, not bureaucracy.

**Counter-argument**: If Peter and I are working synchronously and iterating fast, rigid phase gates could slow us down. Mitigation: phases are checkpoints, not blockers. If we're in flow and a section is obviously done, we move on without ceremony. The phases exist for when we need to pause, review, or context-switch — not to prevent momentum.

---

#### Confirmations

| Area | Status | Notes |
|------|--------|-------|
| Page layout architecture (Decision 4) | ✅ | Full-bleed + `breakpointLg` max-width is standard, no concerns |
| Scroll-linked nav (Decision 2) | ✅ | Intersection Observer is the right tool. Text snap (not transition) confirmed. |
| Scroll-reveal (Decision 3) | ✅ | CSS-first, one-shot, `prefers-reduced-motion` respected |
| Responsive strategy (Decision 5) | ✅ | Desktop-first correct for audience. Implicit responsive decisions documented as made. |
| Easter eggs (Decision 6) | ✅ | CSS keyframes, mobile-hidden, reduced-motion: instant show |
| Section prefix (Decision 7) | ✅ | Product CSS utility class. Agree with Ada's Option 3. |
| Token consumption | ✅ | Semantic tokens via CSS custom properties. Ada handles source changes. |
| Section visual profiles | ✅ | Sufficient detail to build. Spacing/feel will need iteration with Peter (expected). |

---

#### Ready to Proceed

No blockers from my side beyond the stated prerequisites (Lina: Button-CTA `href`, Ada: `color.action.primary` override). Phase A (Foundation) can begin as soon as those land. Asset-dependent phases (E, F, parts of H) can scaffold early and layer in assets when available.
