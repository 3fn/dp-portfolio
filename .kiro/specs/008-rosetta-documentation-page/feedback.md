# Spec Feedback: Rosetta Documentation Page

**Spec**: 008-rosetta-documentation-page
**Created**: 2026-06-05

---

## Feedback Sequencing

1. **Leonardo** (first) — Visual direction, story form, scene design, D3 vs alternatives
2. **Sparky** (second) — Implementation feasibility, D3 + Astro compatibility, effort estimate, technical concerns

Sparky reviews after Leo so that scope and visual direction are defined before she assesses implementation effort.

---

## Design Outline Feedback

### Context for Reviewers
- Ada + Peter defined the narrative structure (4 beats: Why → Principle → Architecture → Payoff)
- Narrative claims have been source-verified (see "Verified Claims" table in outline)
- D3.js is proposed but not confirmed — Leo should validate visual approach, Sparky should validate technical feasibility
- This is documentation designed as an experience — not marketing, not internal reference
- Audience assumes design systems literacy
- The page links FROM the ecosystem Rosetta card on the index — it's a deep dive, not a replacement

### Stakeholders
- **Leonardo** — Visual direction, scene design, scroll pacing, URL/navigation decisions
- **Sparky** — Implementation, D3 + Astro integration, reduced motion, mobile, effort estimate
- **Ada** — Narrative accuracy (already contributed to outline)
- **Thurgood** — Spec formalization (after feedback incorporated)

---

#### [THURGOOD R1]

**Incorporation notes:**

- LEONARDO R2: Prototype-outline alignment confirmed. Styling decisions (dark panel, cyan, nav rail dims) are intentional. Data narrative in Beat 4. Champions OKLCH + graduated validation for next prototype pass. Draw-on-scroll for Beat 4 lines.
- SPARKY R1: Drop D3 entirely (confirmed). ~40 hours estimate. ~14 new product tokens. Tooltip a11y clarification: keyboard focus for sighted users, no aria-describedby (viz is aria-hidden). Astro: static page, no islands, zero concerns.
- **Resolved**: D3 dropped. Print styles in scope. URL hash deep links in scope. Tooltip a11y approach = keyboard focus only (no ARIA wiring on hidden container). Beat 4 draw-on-scroll = CSS stroke-dashoffset. SVG preserveAspectRatio specified. Scroll perf budget added.
- **Deferred**: OKLCH narrative and graduated validation → prototype exploration (not committed scope).

---

## Requirements Feedback

### Context for Reviewers
- [Populated after requirements.md is written]

---

## Design Feedback

### Context for Reviewers
- [Populated after design.md is written]

---

## Tasks Feedback

### Context for Reviewers
- [Populated after tasks.md is written]
