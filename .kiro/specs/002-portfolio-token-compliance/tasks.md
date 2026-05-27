# Implementation Plan: Portfolio Token Compliance

**Date**: 2026-05-24
**Spec**: 002 - Portfolio Token Compliance
**Status**: Implementation Planning
**Dependencies**: Spec 001 (Portfolio Page Architecture) ✅ Complete

---

## Implementation Plan

This spec produces analysis documents — no code changes. Tasks follow the sequential audit phases (1→2→3→4→5) with parallel canvas audits branching from Task 1's output. Task 7 (patterns) runs incrementally during phases and is finalized after Task 5. Task 8 (coverage assessment) executes last as a synthesis of all findings.

Pre-resolved decisions from the design outline (Ada consultation, 2026-05-24) are applied directly during their respective phases — they do not require re-evaluation. See `design.md` § "Decision 1: Pre-Resolved Values."

**Post-Completion waiver**: This spec produces analysis documents only — no code is committed. Standard Post-Completion commit workflow is waived. Completion documentation is written per task but no git commits are triggered.

**Requirement → Task mapping**: Requirements 1-5 map to Tasks 1-5 (1:1). Requirement 6 (Patterns) → Task 7. Requirements 7-9 (Canvas audits) → Task 6 subtasks (6.1-6.3). Requirement 10 (Coverage) → Task 8.

---

## Task List

- [x] 1. Value Inventory

  **Type**: Parent
  **Validation**: Tier 2 - Standard
  **Agent**: Leonardo

  **Success Criteria:**
  - Every CSS declaration in the prototype's `<style>` block has an inventory entry
  - Every inline style value is cataloged
  - Every JS-defined color, font-size, opacity, and timing value is cataloged
  - Canvas values are categorized into Chord Diagram, Career Chart, and Ecosystem Connectors sections
  - Status column distinguishes Token ✓ / Hard-coded / Fallback

  **Primary Artifacts:**
  - `.kiro/specs/002-portfolio-token-compliance/analysis/value-inventory.md`

  **Completion Documentation:**
  - `.kiro/specs/002-portfolio-token-compliance/completion/task-1-completion.md`

  - [x] 1.1 Extract CSS spacing values
    **Type**: Implementation
    **Validation**: Tier 1 - Minimal
    **Agent**: Leonardo
    - Catalog all padding, margin, gap, width, height, max-width, min-height values
    - Record selector, property, value, existing token reference (if any), status
    - _Requirements: 1_

  - [x] 1.2 Extract CSS typography values
    **Type**: Implementation
    **Validation**: Tier 1 - Minimal
    **Agent**: Leonardo
    - Catalog all font-size, font-weight, line-height, letter-spacing, font-family values
    - _Requirements: 1_

  - [x] 1.3 Extract CSS color values
    **Type**: Implementation
    **Validation**: Tier 1 - Minimal
    **Agent**: Leonardo
    - Catalog all color, background, border-color, box-shadow color, gradient stop values
    - Include rgba() values in box-shadow and text-shadow declarations
    - _Requirements: 1_

  - [x] 1.4 Extract CSS radius, border, shadow, and motion values
    **Type**: Implementation
    **Validation**: Tier 1 - Minimal
    **Agent**: Leonardo
    - Catalog border-radius, border-width, box-shadow (full), transition, animation values
    - _Requirements: 1_

  - [x] 1.5 Extract JavaScript/Canvas values
    **Type**: Implementation
    **Validation**: Tier 1 - Minimal
    **Agent**: Leonardo
    - Catalog chord diagram PAL colors, node sizes, font sizes, animation timings
    - Catalog career chart gradient colors, line colors, font sizes, noise config
    - Catalog ecosystem connector colors, line weight, shadow filter values
    - Categorize into three sections: Chord Diagram, Career Chart, Ecosystem Connectors
    - _Requirements: 1_

  - [x] 1.6 Extract inline style values
    **Type**: Implementation
    **Validation**: Tier 1 - Minimal
    **Agent**: Leonardo
    - Catalog values in chord-tip, career-tooltip, and other inline-styled elements
    - _Requirements: 1_

---

- [x] 2. Fallback Value Resolution

  **Type**: Parent
  **Validation**: Tier 2 - Standard
  **Agent**: Leonardo

  **Success Criteria:**
  - Every `var(--token, fallback)` pattern identified
  - Each has a resolution: remove, fix reference, or escalate
  - Zero unresolved fallback entries

  **Primary Artifacts:**
  - `.kiro/specs/002-portfolio-token-compliance/analysis/fallback-resolution.md`

  **Completion Documentation:**
  - `.kiro/specs/002-portfolio-token-compliance/completion/task-2-completion.md`

  - [x] 2.1 Identify all fallback declarations
    **Type**: Implementation
    **Validation**: Tier 1 - Minimal
    **Agent**: Leonardo
    - Search for all `var(` patterns with a second argument (fallback)
    - Verify each referenced token exists in the system
    - Assign resolution per design.md format
    - _Requirements: 2_

---

- [x] 3. Hard Value → Token Mapping

  **Type**: Parent
  **Validation**: Tier 2 - Standard
  **Agent**: Ada (Leonardo provides design context)

  **Success Criteria:**
  - Every hard-coded value from the inventory has a mapping entry
  - Each entry includes target token and confidence level
  - Pre-resolved values (opacity024, opacity056, space700=56px) are confirmed
  - No-match values are clearly marked for Phase 4 escalation

  **Primary Artifacts:**
  - `.kiro/specs/002-portfolio-token-compliance/analysis/token-mapping.md`

  **Completion Documentation:**
  - `.kiro/specs/002-portfolio-token-compliance/completion/task-3-completion.md`

  - [x] 3.1 Map spacing values to tokens
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Query spacing token family for matches
    - Apply 1-2px tolerance for spacing/sizing only
    - Mark no-match values for Phase 4
    - Confirm pre-resolved: 56px=space700, opacity values
    - _Requirements: 3_

  - [x] 3.2 Map typography values to tokens
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Query typography composite tokens for exact matches
    - Exact match only — no tolerance
    - _Requirements: 3_

  - [x] 3.3 Map color values to tokens
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Query color token families for exact matches
    - Identify primitives vs semantics already in use
    - Exact match only
    - _Requirements: 3_

  - [x] 3.4 Map radius, border, shadow, and motion values to tokens
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Query radius, border-width, shadow, and motion token families
    - Exact match only for radius (per Ada guidance)
    - _Requirements: 3_

---

- [x] 4. Primitive → Semantic Promotion

  **Type**: Parent
  **Validation**: Tier 2 - Standard
  **Agent**: Ada (Leonardo provides design role annotations)

  **Success Criteria:**
  - Every primitive token usage assessed for semantic equivalent
  - Existing semantics identified and recommended
  - Proposed new semantics documented with occurrence count and rationale
  - Proposed semantics feed into Task 5

  **Primary Artifacts:**
  - `.kiro/specs/002-portfolio-token-compliance/analysis/semantic-promotion.md`

  **Completion Documentation:**
  - `.kiro/specs/002-portfolio-token-compliance/completion/task-4-completion.md`

  - [x] 4.1 Assess primitive usage and identify semantic equivalents
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - For each primitive token in the inventory, assess the visual/functional role (using Leonardo's design role annotations from Task 1)
    - Check if a semantic token exists for that role
    - Count occurrences of same-role usage across selectors
    - Apply 3+ threshold for new semantic proposals
    - Document keep-as-primitive decisions with rationale
    - _Requirements: 4_

---

- [x] 5. Non-Aligning Value Evaluation

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive
  **Agent**: Ada (Leonardo provides product context, Peter approves dispositions)

  **Success Criteria:**
  - Every no-match value from Task 3 has a disposition
  - Every proposed new semantic from Task 4 has a disposition
  - Every non-aligning canvas value (from Tasks 6.1-6.3) has a disposition
  - Each disposition includes rationale and approval routing
  - Pre-resolved values applied directly (1336px, 96px, 72px, 128px)
  - Ambiguous values (88px, 120px) presented to Peter with options

  **Primary Artifacts:**
  - `.kiro/specs/002-portfolio-token-compliance/analysis/non-aligning-evaluation.md`

  **Completion Documentation:**
  - `.kiro/specs/002-portfolio-token-compliance/completion/task-5-completion.md`

  - [x] 5.1 Evaluate non-aligning values and assign dispositions
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Ada (Leonardo provides product context)
    - Apply pre-resolved decisions from design outline
    - For ambiguous values, present options with trade-offs to Peter
    - Route token creation candidates to Ada for evaluation
    - Document each disposition with rationale per design.md format
    - _Requirements: 5_

---

- [x] 6. Canvas Visualization Audits

  **Type**: Parent
  **Validation**: Tier 2 - Standard
  **Agent**: Leonardo

  **Success Criteria:**
  - All three canvas visualizations audited for token alignment
  - Color values compared to primitives with alignment recommendations
  - Non-color values (line weight, opacity, noise config) evaluated
  - Typography exceptions documented with rationale
  - Non-aligning values fed back to Task 5

  **Primary Artifacts:**
  - `.kiro/specs/002-portfolio-token-compliance/analysis/canvas-chord.md`
  - `.kiro/specs/002-portfolio-token-compliance/analysis/canvas-career.md`
  - `.kiro/specs/002-portfolio-token-compliance/analysis/canvas-connectors.md`

  **Completion Documentation:**
  - `.kiro/specs/002-portfolio-token-compliance/completion/task-6-completion.md`

  - [x] 6.1 Audit chord diagram
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Leonardo
    - Catalog PAL colors, compare to primitives
    - Evaluate near-misses for visual equivalence
    - Document font size exceptions
    - Document animation timing comparison to motion tokens
    - Flag non-aligning values for Task 5
    - _Requirements: 7_

  - [x] 6.2 Audit career chart
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Leonardo
    - Catalog gradient colors, line colors, label colors
    - Evaluate semantic potential of design/engineering color coding
    - Document noise pattern config against opacity/sizing tokens
    - Document font size exceptions
    - Flag non-aligning values for Task 5
    - _Requirements: 8_

  - [x] 6.3 Audit ecosystem connectors
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Leonardo
    - Catalog connector colors, compare to primitives
    - Evaluate line weight against border-width tokens
    - Evaluate shadow filter values against shadow tokens
    - Flag non-aligning values for Task 5
    - _Requirements: 9_

---

- [x] 7. Pattern Identification

  **Type**: Parent
  **Validation**: Tier 2 - Standard
  **Agent**: Leonardo

  **Success Criteria:**
  - All recurring patterns (3+ occurrences, same visual role) identified and named
  - Each pattern has a recommendation (tokenize, semantic, convention, or leave)
  - System-level vs product-level impact distinguished
  - Document ready for Peter review

  **Primary Artifacts:**
  - `.kiro/specs/002-portfolio-token-compliance/analysis/patterns.md`

  **Completion Documentation:**
  - `.kiro/specs/002-portfolio-token-compliance/completion/task-7-completion.md`

  - [x] 7.1 Identify and document patterns
    **Type**: Architecture
    **Validation**: Tier 2 - Standard
    **Agent**: Leonardo
    - Review inventory and mapping outputs for recurring value combinations
    - Name each pattern descriptively
    - Assess system-level vs product-level impact
    - Write recommendations per design.md format
    - _Requirements: 6_

---

- [x] 8. Coverage Assessment

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive
  **Agent**: Leonardo

  **Success Criteria:**
  - Summary statistics compiled (total values, mapped, proposed, exceptions)
  - Coverage gaps categorized
  - System-level findings documented
  - Recommendation on token system sufficiency provided
  - Document ready for Peter review

  **Primary Artifacts:**
  - `.kiro/specs/002-portfolio-token-compliance/analysis/coverage-assessment.md`

  **Completion Documentation:**
  - `.kiro/specs/002-portfolio-token-compliance/completion/task-8-completion.md`

  - [x] 8.1 Synthesize findings and write assessment
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Leonardo
    - Compile statistics from all analysis documents
    - Identify coverage gap categories
    - Assess whether token system is sufficient for product page development
    - Document system-level findings for governance discussion
    - _Requirements: 10_

---

## Sequencing

```
Task 1 (Inventory) → Task 2 (Fallbacks) → Task 3 (Mapping) → Task 4 (Promotion) → Task 5 (Evaluation)
                  ↘                                                                        ↑
                   Task 6 (Canvas Audits — parallel) ─────────────────────────────────────┘
                                                                                           
Tasks 1-6 feed → Task 7 (Patterns — finalized after Task 5)
All tasks feed → Task 8 (Coverage Assessment — last)
```

- Tasks 1→2→3→4→5 are strictly sequential
- Task 6 (canvas audits) can begin after Task 1 completes, runs in parallel with Tasks 2-4
- Task 6 non-aligning findings feed into Task 5 (must complete before Task 5 finalizes)
- Task 7 accumulates observations during all phases, finalized after Task 5
- Task 8 executes after all other tasks complete

---

## Peter Review Gates

The following tasks require Peter's input before the spec can be marked complete:

1. **Task 5** — ambiguous value dispositions (88px, 120px snap decisions)
2. **Task 7** — pattern recommendations (system-level vs product-level)
3. **Task 8** — coverage assessment and system sufficiency recommendation
