# Design Document: Portfolio Token Compliance

**Date**: 2026-05-24
**Spec**: 002 - Portfolio Token Compliance
**Status**: Design Phase
**Dependencies**: Spec 001 (Portfolio Page Architecture) ✅ Complete

---

## Overview

This spec produces analysis documents — not code. The design describes the methodology for auditing the prototype's values, the output document formats, the decision frameworks applied at each phase, and the validation approach for confirming completeness.

The audit operates on a single source file: `docs/specs/staticReview/hero-exploration.html`.

### Cross-References to Design Outline

| Detail | Location |
|--------|----------|
| Phased approach with decision criteria | `design-outline.md` § "Phased Approach" |
| Resolved token system questions | `design-outline.md` § "Resolved Questions" |
| Scope boundaries | `design-outline.md` § "Scope Boundaries" |
| Expected outcomes | `design-outline.md` § "Expected Outcomes" |

---

## Methodology

### Audit Sequence

```
Phase 0 (Inventory) → Phase 1 (Fallbacks) → Phase 2 (Mapping) → Phase 3 (Promotion) → Phase 4 (Evaluation)
                                                                                              ↑
Phase 0 also feeds → Canvas Audits (Chord, Career, Connectors) ──────────────────────────────┘
                                                                                              
All phases feed → Pattern Identification → Coverage Assessment (last)
```

Phases 1–4 are strictly sequential. Canvas audits run from the Phase 0 inventory and produce independent outputs. However, non-aligning values discovered during canvas audits (colors, timing, or sizing values that don't match tokens and aren't documented exceptions) feed back into Phase 4's evaluation framework for disposition. The coverage assessment synthesizes all findings — including canvas audit results — and executes last.

### Source Parsing Strategy

The prototype is a single HTML file with:
- One `<style>` block (~1000 lines of CSS)
- Three `<script>` blocks (chord diagram, career chart, agent portraits)
- One ecosystem connector `<script>` block
- Inline styles on tooltip/tooltip-related elements

**CSS values** are extracted by parsing every declaration in the `<style>` block. Each declaration produces an inventory entry.

**JS values** are extracted by identifying:
- Color literals (hex, rgb, rgba)
- Numeric literals used for sizing, spacing, opacity, or timing
- Font size declarations in canvas context calls

---

## Output Document Formats

All outputs are stored in `.kiro/specs/002-portfolio-token-compliance/analysis/`.

### value-inventory.md

```markdown
## Spacing Values

| Selector | Property | Value | Token Reference | Status |
|----------|----------|-------|-----------------|--------|
| .hero__content | margin-top | 88px | — | Hard-coded |
| .hero__content | padding-top | var(--space-800) | space800 | Token ✓ |
| .why-build | padding | 120px 0 96px | — | Hard-coded |

## Typography Values
[same format]

## Color Values
[same format]

## Canvas: Chord Diagram
| Context | Property | Value | Token Reference | Status |
|---------|----------|-------|-----------------|--------|
| PAL.root | color | #ff2d8f | — | Hard-coded |
| drawNode | font-size | 9px | — | Hard-coded |
```

**Status values**: `Token ✓` (already references a token), `Hard-coded` (no token reference), `Fallback` (has var() with fallback).

### fallback-resolution.md

```markdown
| Selector | Declaration | Token Referenced | Fallback Value | Resolution |
|----------|-------------|-----------------|----------------|------------|
| .nav | min-height | tap-area-recommended | 48px | Remove — token exists |
| .btn | border-radius | radius-050 | (empty) | Fix — trailing comma in var() |
```

**Resolution values**: `Remove — token exists`, `Fix reference — correct name is [x]`, `Escalate — token does not exist`.

### token-mapping.md

```markdown
| Selector | Property | Current Value | Target Token | Confidence |
|----------|----------|---------------|--------------|------------|
| .hero__headline | font-size | 48px | [pending] | No match |
| .stats__items | row-gap | 12px | space150 | Exact |
| .why-build | padding-top | 120px | [pending] | No match |
| .why-build__card | padding | 36px 28px | [pending] | No match (36), space350 (28) |
```

**Confidence values**: `Exact` (value matches token), `Nearest` (within 1-2px for spacing/sizing), `No match` (escalate to Phase 4).

### semantic-promotion.md

```markdown
| Current Usage | Primitive Token | Occurrences | Semantic Equivalent | Recommendation |
|---------------|-----------------|-------------|--------------------|-----------------| 
| Section heading color | black-300 | 8× | color.contrast.onLight | Replace with semantic |
| Card body text color | black-100 | 6× | color.text.default | Replace with semantic |
| Section padding-top | [space1200 proposed] | 4× | space.page.normal | Propose new semantic |
```

**Recommendation values**: `Replace with semantic` (exists), `Propose new semantic` (doesn't exist → Phase 4), `Keep as primitive` (one-off usage).

### non-aligning-evaluation.md

```markdown
| Value | Usage Context | Occurrences | Disposition | Rationale | Approval Required |
|-------|---------------|-------------|-------------|-----------|-------------------|
| 1336px | max-width, all sections | 10× | Product CSS custom property | Layout constraint, not mathematically grounded | Leonardo + Peter |
| 88px | hero content margin-top | 1× | Snap to space1000 (80px) or space1200 (96px) | Odd multiplier, likely prototype approximation | Peter |
| 36px | card padding-block | 4× | Evaluate as space450 candidate | base × 4.5 — half-step | Ada + Peter |
```

### patterns.md

```markdown
## Pattern: Section Heading Typography

**Values**: font-family: display, font-size: 34px, font-weight: 700, color: black-300
**Occurrences**: 7 sections (why-build, ecosystem, how-built, enterprise, who-built, cta, agents)
**Current token coverage**: font-family ✓ (display), font-weight ✓ (700), color → should be semantic
**Recommendation**: This is a composite typography pattern. Evaluate whether a `typography.heading.section` composite token is warranted, or whether the individual tokens are sufficient.
**Impact**: Product-level convention (not system-level change)
```

### canvas-chord.md / canvas-career.md / canvas-connectors.md

```markdown
## Color Alignment

| Prototype Color | Nearest Primitive | Delta | Recommendation |
|----------------|-------------------|-------|----------------|
| #ff2d8f | pink300 (#ff2a6d) | Hue shift ~3° | Evaluate — adapt if visually equivalent |
| #1a5fff | [no blue family] | N/A | Application-level exception |

## Non-Color Values

| Value | Type | Context | Nearest Token | Recommendation |
|-------|------|---------|---------------|----------------|
| 2.5px | line-weight | connector stroke | border-width-200 | Evaluate alignment |
| 0.8 | opacity | noise density | opacity080 | Align |
| 24 | alpha (0-255) | noise spec opacity | opacity024 (as ratio) | Align |

## Typography Exception Documentation

| Size | Context | Rationale |
|------|---------|-----------|
| 9px | Node labels | Canvas context, not DOM text, data viz convention |

## Alignment Decision

[For each value: ALIGN (use token) or EXCEPTION (document rationale)]
```

### coverage-assessment.md

```markdown
## Summary Statistics
- Total values audited: [N]
- Mapped to existing tokens: [N] ([%])
- Mapped to proposed new tokens: [N]
- Justified hard values: [N]
- Application-level exceptions: [N]

## Coverage Gaps by Category
[Categories where 5+ values have no token coverage]

## System-Level Findings
[Observations about token system coverage philosophy]

## Recommendation
[Is the system sufficient? What structural extensions are needed?]
```

---

## Design Decisions

### Decision 1: Pre-Resolved Values

The following values have pre-resolved dispositions from the design outline (Ada consultation, Peter approval). They do not require re-evaluation during the audit — they are applied directly during their respective phases:

| Value | Disposition | Phase Applied |
|-------|-------------|---------------|
| 1336px (max-width) | Product-level CSS custom property: `--layout-content-max-width` | Phase 4 |
| 96px (section padding) | Primitive token candidate: `space1200` | Phase 4 |
| 72px (spacing) | Primitive token candidate: `space900` | Phase 4 |
| 128px (section padding) | Primitive token candidate: `space1600` | Phase 4 |
| Canvas font sizes (9-10px) | Documented exception — canvas context | Canvas audit |
| Visualization colors | Application-level values — not tokenized | Canvas audit |
| Noise texture opacity (0.24, 0.56) | Map to existing `opacity024`, `opacity056` | Phase 2 |

### Decision 2: Ambiguous Values Require Design Review

Values that could reasonably snap to multiple tokens (e.g., 88px → 80px or 96px?) are flagged for Peter's review rather than resolved autonomously. The audit presents options with trade-offs; Peter decides.

### Decision 3: Canvas Audit Scope

Canvas visualizations are audited for color and timing alignment only. Positional values (coordinates, radii, layout calculations) are runtime-computed and exempt from token mapping. The audit focuses on:
- Color palette values → primitive alignment
- Font sizes → exception documentation
- Opacity values → token mapping
- Animation timing → motion token comparison

---

## Validation Approach

### Completeness Validation

The audit is complete when:
1. Every CSS declaration in the `<style>` block has an inventory entry
2. Every inventory entry has a disposition (token reference, justified hard value, or pending creation)
3. Zero entries remain with status "unresolved"
4. All canvas script color/font/opacity values are cataloged
5. Pattern identification covers all values appearing 3+ times

### Quality Validation

Output documents are valid when:
1. Token mapping entries include exact selector + property (mechanically executable)
2. Non-aligning evaluations include rationale and approval routing
3. Pattern recommendations distinguish system-level vs. product-level impact
4. Canvas audit decisions include readability justification for exceptions

### Governance Validation

The spec complies with governance when:
1. Zero new tokens are created without Ada review + Peter approval
2. All design adjustments (snapping values to tokens) have Peter approval
3. Pattern recommendations are surfaced to Peter before system changes
4. Documentation requirements are acknowledged for any triggered token creation

---

## Risks

1. **Inventory scale**: The prototype has ~1000 lines of CSS. The inventory may produce 300+ entries. Mitigation: batch by category, process systematically.
2. **Ambiguity in "same purpose"**: Two selectors using the same value for visually different reasons (e.g., 24px as both card padding and heading margin-left). Mitigation: assess visual role, not just value.
3. **Prototype drift**: Peter may continue editing the prototype during the audit. Mitigation: snapshot the file at audit start; re-audit only changed sections if edits occur.

---

## Agent Responsibilities

| Agent | Role | Phases |
|-------|------|--------|
| Leonardo | Audit execution, pattern identification, document authoring | All |
| Ada | Token existence verification, new token evaluation, scale extension assessment | Phases 2–4 |
| Peter | Design adjustment approvals, pattern review, final sign-off | Phases 4–6, 10 |
| Thurgood | Spec quality review, completion documentation | Pre/post |
| Sparky | None during this spec (consumer of outputs in subsequent spec) | — |
