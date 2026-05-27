# Spec Feedback: Portfolio Page Architecture — Requirements

**Spec**: 001-portfolio-page-architecture
**Phase**: Requirements
**Created**: 2026-05-10
**Reviewers**: Ada, Lina, Sparky

---

## Requirements Feedback

### Context for Reviewers

- Design outline approved with all feedback incorporated (Ada token corrections, Lina Button-CTA expansion, Sparky phased structure)
- 20 requirements covering: token override, Button-CTA href, page layout, scroll systems, 8 full section builds, 3 scaffolds, prefix pattern, easter eggs, responsive, reduced motion, hard shadow utility
- All opacity tokens corrected to actual naming (`opacity024`, `opacity056`, `opacity080`, `opacity100`)
- All text colors use semantics (`color.contrast.onLight`, `color.contrast.onDark`, `color.text.default`, `color.text.muted`, `color.action.navigation`) — no primitive text colors
- `color.structure.text.secondary` scrapped — `color.text.muted` covers the use case
- `color.action.primary` → `pink300` is a local override (Req 1), not a system change
- Button-CTA icon approach: explicit (`icon` + `iconPosition` props), not automatic
- Hard shadow: product CSS utility, not tokens (Ada confirmed)
- Section prefix: product CSS utility class (Ada/Lina/Sparky all agreed Option 3)

**Key decisions already settled (do not re-litigate):**
- Polymorphic rendering over separate Link component → design-outline.md § "Decision 1"
- Intersection Observer for scroll-linking → design-outline.md § "Decision 2"
- CSS-first reveal with one-shot → design-outline.md § "Decision 3"
- Nav text snap (not transition) → Sparky SPARKY-1
- Explicit icon (not auto) → Lina LINA-R2, Peter confirmed
- Hard shadow = product CSS → Ada assessment
- Section prefix = product CSS → Ada/Lina/Sparky consensus

**Focus your review on:**
- **Ada**: Are token references correct throughout? Any semantic/primitive misuse? Is Req 1 (local override) correctly scoped?
- **Lina**: Is Req 2 (Button-CTA href) complete? Missing acceptance criteria for the contract/schema/test work?
- **Sparky**: Are section requirements (Reqs 6–15) implementable as written? Missing details that would block you? Does the phased structure map cleanly to these requirements?

---

[Agent feedback rounds here]

### Lina — Component Implementation Review (2026-05-10)

#### Overall Assessment

Requirement 2 (Button-CTA href) is well-specified. All 10 acceptance criteria from my design-outline feedback are present — contract, schema, tests, README, explicit icon approach. No missing criteria. One clarification needed, one minor issue.

---

#### Issues

**[LINA-R1] Requirement 2, AC6 — Contract name unspecified**

> "A behavioral contract SHALL document the dual-render behavior."

This is correct but doesn't specify the contract name. Per my design-outline feedback, I proposed `content_renders` as the concept. The AC should either:
- Name the contract explicitly (e.g., `content_renders_link`)
- Or leave it to implementation (which is fine — I'll propose the name during Task execution and document it in the completion doc)

**Recommendation**: Leave as-is. I'll propose the contract name during implementation and document the rationale. The requirement correctly mandates the contract exists without over-constraining the naming.

**[LINA-R2] Requirement 2, AC4 — Keyboard behavior nuance**

> "WHEN rendering as `<a>` THEN keyboard activation SHALL respond to Enter only (not Space), matching native link behavior."

This is correct for native `<a>` elements — browsers handle this automatically. The AC is verifiable but the implementation is "do nothing" (don't add a Space keydown handler on the `<a>` path). Just noting: this is a verification criterion, not an implementation task. The test should confirm Space does NOT activate the link.

---

#### Confirmations

| Requirement | Status | Notes |
|-------------|--------|-------|
| Req 2, AC1 | ✅ Clear | Render `<a>` when href set |
| Req 2, AC2 | ✅ Clear | Existing `<button>` behavior unchanged |
| Req 2, AC3 | ✅ Clear | `rel="noopener noreferrer"` on `target="_blank"` |
| Req 2, AC4 | ✅ Clear | Native link keyboard behavior (Enter only) |
| Req 2, AC5 | ✅ Clear | Schema update |
| Req 2, AC6 | ✅ Clear | Contract documentation (name TBD at implementation) |
| Req 2, AC7 | ✅ Critical | Existing tests must not break |
| Req 2, AC8 | ✅ Clear | New tests for `<a>` path |
| Req 2, AC9 | ✅ Clear | README update |
| Req 2, AC10 | ✅ Clear | Explicit icon, no auto behavior |

#### Other Requirements (Lina's components used correctly)

| Requirement | Component | Usage | ✅ Correct |
|-------------|-----------|-------|-----------|
| Req 7 | Container-Card-Base | Why Build cards | ✅ No modifications needed |
| Req 11 | Button-CTA (with href) | CTA section outbound links | ✅ Depends on Req 2 |
| Req 12 | Button-CTA (with href) | Hero CTAs | ✅ Depends on Req 2 |
| Req 14 | Badge-Label-Base | Employer badges | ✅ No modifications needed |
| Req 11/12 | Icon-Base | External-link trailing icon | ✅ Existing icon, explicit props |

---

#### Agrees with Ada

**[RE: ADA-R1]** — Agree that Req 11 AC3 should use `color.structure.surface` instead of `white200`. Same value, better semantic intent. Minor fix.

---

#### No Issues (Clean)

All other requirements are outside my domain (page layout, scroll systems, section builds — Sparky's work). They look well-specified from a component consumption perspective. No concerns about how DesignerPunk components are being used.

### Ada — Token & Architecture Review (2026-05-10)

#### Overall Assessment

Clean requirements. All token references verified correct — semantics, primitives, and spacing tokens all exist. The `color.action.primary` override (Req 1) is correctly scoped as a local change. One issue, one observation.

---

#### Issues

**[ADA-R1] Requirement 11, AC3 — Secondary CTA uses primitive for fill**

> "Secondary CTA ('DesignerPunk on GitHub') SHALL use `white200` fill with `color.contrast.onLight` stroke/text"

`white200` is a primitive used directly for the button fill. Should this be a semantic? We have `color.structure.surface` (→ `white200`). Using the semantic would be more correct:

> "Secondary CTA SHALL use `color.structure.surface` fill..."

Same value, but encodes intent ("this is a surface") rather than a color choice. Minor — but the context doc says "All text colors use semantics" and this principle should extend to interactive element fills where a semantic exists.

**Counter-argument**: Button-CTA's secondary variant might already define its fill via a prop/contract, in which case the requirement shouldn't specify the color at all — just "secondary variant." But since this is product-level usage (not component internals), specifying the semantic is appropriate.

---

#### Observation

**[ADA-R2] Requirement 12, AC4 — `opacity008` for Hero gradient**

> "The section background SHALL use `green100` base with angular gradient at `opacity008`."

This is correct (`opacity008` = 0.08 = 8%). Just noting it's at the very bottom of our opacity scale — the subtlest possible effect. If it's imperceptible in implementation, Sparky may need to bump to `opacity016`. Not a requirements issue — just flagging for implementation awareness.

---

#### Confirmations (Token Accuracy)

All token references verified against the live token source:

| Requirement | Tokens Referenced | ✅ Verified |
|-------------|-------------------|------------|
| Req 1 | `color.action.primary`, `pink300` | ✅ |
| Req 3 | `breakpointLg` | ✅ |
| Req 4 | `duration150` | ✅ |
| Req 5 | `space200`, `duration250` | ✅ |
| Req 6 | `pink100`, `pink300`, `pink500`, `opacity024`, `opacity100`, `blur000`, `space025`, `color.contrast.onLight`, `inset.300`, `related.loose`, `grouped.normal` | ✅ |
| Req 7 | `purple100`, `purple300`, `opacity100`, `space100`, `blur000`, `green100`, `pink300`, `pink500`, `color.contrast.onDark`, `color.text.default`, `inset.200`, `inset.300` | ✅ |
| Req 8 | `color.structure.surface`, `opacity080`, `pink300`, `space100`, `blur000`, `orange100`, `opacity024`, `color.contrast.onLight`, `color.text.muted`, `sectioned.loose`, `inset.300`, `grouped.normal` | ✅ |
| Req 9 | `orange300` | ✅ |
| Req 10 | `orange100`, `opacity056`, `blur100`, `cyan300`, `space100`, `blur000`, `teal200`, `yellow300`, `pink200`, `opacity024`, `fontSize700`, `fontWeight700`, `color.contrast.onLight`, `purple100`, `orange300` | ✅ |
| Req 11 | `color.action.primary`, `color.contrast.onDark`, `color.contrast.onLight`, `radius050`, `green100` | ✅ |
| Req 12 | `green100`, `opacity008` | ✅ |
| Req 13 | `yellow300` | ✅ |
| Req 14 | `black300`, `color.contrast.onDark`, `color.action.navigation` | ✅ |
| Req 15 | `black500`, `color.contrast.onDark`, `inset.300`, `related.normal` | ✅ |
| Req 16 | `grouped.tight` | ✅ |
| Req 17 | `duration500` | ✅ |
| Req 18 | `gridGutter*`, `gridMargin*` | ✅ |
| Req 20 | `space100`, `space025`, `blur000`, `opacity100` | ✅ |

---

#### No Issues (Clean)

Requirements 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13, 14, 15, 16, 17, 18, 19, 20 — no token concerns.

---

### Sparky — Web Implementation Review (2026-05-10)

#### Overall Assessment

These are implementable. The acceptance criteria are specific enough to build against and verify, without over-constraining the CSS/HTML approach. Token references are correct (Ada confirmed). Component usage is correct (Lina confirmed). I can map every requirement cleanly to my phased implementation plan.

One issue, two minor clarifications, one agreement with Ada.

---

#### Issues

**[SPARKY-R1] Requirement 4, AC1 — Intersection Observer threshold unspecified**

> "The system SHALL use Intersection Observer to detect which section is currently in the viewport."

This doesn't specify the threshold or rootMargin for the nav color observer. Req 5 (reveal system) specifies ~0.15 threshold, but the nav color system has different needs — it should fire when a section's *top edge* crosses the nav bar's bottom edge, not when 15% is visible.

The nav observer likely needs `rootMargin: "-64px 0px 0px 0px"` (negative top margin equal to nav height) with `threshold: 0` — meaning "fire when the section crosses behind the nav." This is an implementation detail, but the requirement as written could be interpreted as "whichever section has the most viewport coverage wins" (which would be a different, more complex algorithm).

**Recommendation**: Add an AC or clarify AC1:

> "The active section SHALL be determined by which section's top edge has most recently crossed the nav bar's bottom boundary (scroll-down) or which section's bottom edge is below the nav (scroll-up)."

Or: leave as-is and I'll implement the "top edge crosses nav" approach, documenting the algorithm in the implementation report. The current wording doesn't *prevent* the correct implementation — it's just ambiguous.

**My preference**: Leave as-is. I'll implement correctly and document. Over-specifying observer algorithms in requirements creates brittleness — the exact threshold/rootMargin will need tuning with Peter anyway (per my risk assessment).

---

#### Clarifications (Non-blocking)

**[SPARKY-C1] Requirement 5, AC2 — Threshold is approximate**

> "The system SHALL use Intersection Observer with a threshold of ~0.15"

The `~` is good — this will need tuning. Some sections are very tall (How Built + Special Thanks) and 15% of a tall section is a lot of pixels. I may need per-section thresholds or a fixed rootMargin approach instead. Flagging that the implementation may deviate from 0.15 if testing reveals it doesn't feel right for all sections.

Not a requirements issue — just setting expectations that this number is a starting point.

**[SPARKY-C2] Requirement 10, AC4 — Credits grid "4-column layout"**

> "The credits grid SHALL display names in a 4-column layout."

At desktop. At `sm` this becomes 2-column, at `xs` single-column (per Req 18's general responsive rules). The requirement doesn't say "always 4 columns" so I'll implement responsively. Just confirming that's the intent.

---

#### Agrees with Ada

**[RE: ADA-R1]** — Agree. Req 11 AC3 should reference `color.structure.surface` instead of `white200`. Same rendered value, correct semantic usage. Consistent with the doc's own principle ("All text colors use semantics" — should extend to interactive fills where semantics exist).

---

#### Phase Mapping

Confirming the requirements map cleanly to my proposed phases:

| Phase | Requirements Covered |
|-------|---------------------|
| A (Foundation) | Req 3, Req 4, Req 5, Req 19 |
| B (Stats Bar) | Req 6 |
| C (Why Build) | Req 7, Req 17 (first easter egg) |
| D (Critical Features) | Req 8 |
| E (Code Screenshots) | Req 9 |
| F (How Built + Thanks) | Req 10, Req 17 (second easter egg) |
| G (Who Built This) | Req 14 |
| H (CTA + Footer) | Req 11, Req 15 |
| I (Polish) | Req 16, Req 18, Req 20 |
| Prerequisites (Ada/Lina) | Req 1, Req 2 |
| Scaffolds (in Phase A) | Req 12, Req 13 |

One adjustment from my original phase plan: Hero scaffold (Req 12) moves into Phase A since it's just a container + background + two CTAs. The CTAs depend on Req 2 (Button-CTA href), so Phase A can't fully complete until Lina delivers. I'll build the container/background first and add CTAs when the component is ready.

---

#### Confirmations

| Requirement | Implementable | Notes |
|-------------|:---:|-------|
| Req 3 (Page Layout) | ✅ | Standard pattern. No concerns. |
| Req 4 (Scroll Nav) | ✅ | Algorithm needs tuning but approach is sound. |
| Req 5 (Reveal) | ✅ | CSS class toggle + observer. Clean. |
| Req 6 (Stats) | ✅ | Count-up + noise + shadow utilities. Straightforward. |
| Req 7 (Why Build) | ✅ | Cards + gradient + blend mode. May need asset for exclusion pattern if CSS can't match. |
| Req 8 (Critical Features) | ✅ | Card grid + lattice pattern. Will try CSS-first for lattice. |
| Req 9 (Code Screenshots) | ✅ | Asset-dependent. CSS composition layer is simple. |
| Req 10 (How Built) | ✅ | Frosted glass (backdrop-filter) + gradient. Most complex section visually. |
| Req 11 (CTA) | ✅ | Depends on Req 2. Otherwise straightforward. |
| Req 12 (Hero scaffold) | ✅ | Container + CTAs. Depends on Req 2 for CTA buttons. |
| Req 13 (Ecosystem scaffold) | ✅ | Empty container with heading. Trivial. |
| Req 14 (Who Built partial) | ✅ | Bio + badges. Badge-Label-Base is existing component. |
| Req 15 (Footer) | ✅ | Minimal. No concerns. |
| Req 16 (Prefix) | ✅ | Utility class, `aria-hidden` span. Same as Spec 000 pattern. |
| Req 17 (Easter eggs) | ✅ | CSS keyframes + `:hover`. Fun to build. |
| Req 18 (Responsive) | ✅ | CSS Grid + media queries. Decisions documented as made. |
| Req 19 (Reduced motion) | ✅ | Single media query block disabling transitions/animations. |
| Req 20 (Hard shadow) | ✅ | Utility class with custom property. One-liner. |

---

#### Ready to Proceed

All 20 requirements are implementable as written. The one issue (SPARKY-R1) is non-blocking — I'll implement the correct algorithm regardless. No missing information that would prevent me from starting Phase A once prerequisites land.
