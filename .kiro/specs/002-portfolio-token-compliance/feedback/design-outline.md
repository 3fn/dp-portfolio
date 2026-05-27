# Spec Feedback: Portfolio Token Compliance

**Spec**: 002-portfolio-token-compliance
**Created**: 2026-05-24

---

## Design Outline Feedback

### Context for Reviewers

- Spec 001 (Portfolio Page Architecture) is complete — page scaffolding, nav integration, and responsive strategy are established
- The prototype (`docs/specs/staticReview/hero-exploration.html`) is the visual design source of truth — iterated extensively with Peter on 2026-05-23/24
- This spec is a compliance audit, not a build spec — it produces mapping documents that subsequent implementation specs consume
- Token governance applies: semantic tokens can be used freely, primitive tokens require context, component tokens require approval, new token creation requires human review
- The prototype contains a mix of: correctly applied tokens, primitives where semantics should apply, hard values matching tokens, hard values not matching tokens, and fallback values
- Scope is CSS values only — HTML structure, accessibility, responsive, interactions, and assets are separate specs

**Key decisions already settled:**
- Full spec process (not lightweight brief) — Peter decision 2026-05-24
- Phased approach (inventory → fallbacks → mapping → promotion → evaluation) — Peter + Leonardo
- Ship right, not ship fast — Peter decision 2026-05-24

**Focus your review on:**
- Is the phased approach sound and sequentially logical?
- Are the decision criteria clear enough for Ada to act on token questions?
- Are there missing categories of values that the inventory should capture?
- Is the scope appropriately bounded?

---

#### [THURGOOD R1]
- Create feedback document per Spec Feedback Protocol → procedural requirement
- Add documentation requirements acknowledgment for potential token creation → design-outline.md § "Expected Outcomes"
- Specify artifact output locations for mapping documents → design-outline.md § "Phased Approach"
- Make Phase 3→4 dependency explicit → design-outline.md § "Phase 3"
- Clarify "within 1-2px" applicability per token family (spacing/sizing only) → design-outline.md § "Phase 2"
- Add coverage philosophy assessment to expected outcomes → design-outline.md § "Expected Outcomes"

---

#### [LEONARDO R1]
- All six items addressed. See incorporation notes below.

#### [LEONARDO R2]
- Incorporated THURGOOD R1 items 1-6:
  - Item 1: Feedback document created (this file)
  - Item 2: Documentation requirements note added to § "Expected Outcomes"
  - Item 3: Artifact location specified in § "Phase 0" output description
  - Item 4: Phase 3→4 dependency made explicit in § "Phase 3"
  - Item 5: "Within 1-2px" clarified to spacing/sizing only in § "Phase 2"
  - Item 6: Coverage philosophy assessment added to § "Expected Outcomes"

---

## Requirements Feedback

### Context for Reviewers
- [Pending — populated when requirements.md is drafted]

---

## Design Feedback

### Context for Reviewers
- [Pending — populated when design.md is drafted]

---

## Tasks Feedback

### Context for Reviewers
- [Pending — populated when tasks.md is drafted]
