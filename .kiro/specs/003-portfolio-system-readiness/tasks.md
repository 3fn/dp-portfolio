# Implementation Plan: Portfolio System Readiness

**Date**: 2026-05-25
**Spec**: 003 - Portfolio System Readiness
**Status**: Implementation Planning
**Dependencies**: Spec 002 ✅ Complete, @3fn/core v11.7.1 installed

---

## Implementation Plan

Three parallel layers with one soft dependency: Layer 2 validation must follow Layer 1 merge. Layer 3 is the largest workstream (full screen specification).

**Requirement → Task mapping**: Reqs 1-4 → Tasks 1-4 (Layer 1, Ada). Reqs 5-7 → Tasks 5-6 (Layer 2, Leonardo). Reqs 8-11 → Tasks 7-10 (Layer 3, Leonardo). Req 12 → Task 11 (Leonardo).

---

## Task List

- [x] 1. Spacing Primitive Creation

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive
  **Agent**: Ada

  **Success Criteria:**
  - space900 (72), space1200 (96), space1600 (128) exist and generate correctly
  - Mathematical validation passes
  - Token-index includes new entries
  - Token Quick Reference updated

  **Primary Artifacts:**
  - `src/tokens/SpacingTokens.ts` (modified)
  - Token Quick Reference (modified)

  **Completion Documentation:**
  - `.kiro/specs/003-portfolio-system-readiness/completion/task-1-completion.md`

  - [x] 1.1 Add space900, space1200, space1600 to SpacingTokens.ts
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Define tokens with values and formulas
    - Run `npx designerpunk generate`
    - Verify CSS/Swift/Kotlin output
    - _Requirements: 1_

  - [x] 1.2 Update Token Quick Reference
    **Type**: Documentation
    **Validation**: Tier 1 - Minimal
    **Agent**: Ada
    - Add space900, space1200, space1600 entries
    - _Requirements: 1_

---

- [x] 2. Shadow Primitive Creation

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive
  **Agent**: Ada

  **Success Criteria:**
  - shadowOffsetY.600 (24) and blur400 (64) exist and generate correctly
  - Mathematical validation passes
  - Shadow family documentation updated

  **Primary Artifacts:**
  - `src/tokens/ShadowOffsetTokens.ts` (modified)
  - `src/tokens/BlurTokens.ts` (modified)

  **Completion Documentation:**
  - `.kiro/specs/003-portfolio-system-readiness/completion/task-2-completion.md`

  - [x] 2.1 Add shadowOffsetY.600 and blur400
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Define tokens with values and formulas
    - Run `npx designerpunk generate`
    - Verify output
    - _Requirements: 2_

  - [x] 2.2 Update Shadow family documentation
    **Type**: Documentation
    **Validation**: Tier 1 - Minimal
    **Agent**: Ada
    - Document new scale entries and the shadowOffsetY.500 gap acknowledgment
    - _Requirements: 2_

---

- [x] 3. Semantic Token Creation

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive
  **Agent**: Ada

  **Success Criteria:**
  - color.text.heading, space.sectioned.generous, space.sectioned.expansive exist
  - All resolve correctly to their primitive references
  - color.text.* hierarchy documentation updated

  **Primary Artifacts:**
  - `src/tokens/semantic/ColorTokens.ts` (modified)
  - `src/tokens/semantic/SpacingTokens.ts` (modified)

  **Completion Documentation:**
  - `.kiro/specs/003-portfolio-system-readiness/completion/task-3-completion.md`

  - [x] 3.1 Add color.text.heading → black300
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Define semantic token referencing black300
    - Verify resolution: color.text.heading → black300 → rgba(10,10,15,1)
    - Update color.text.* hierarchy documentation
    - _Requirements: 3_

  - [x] 3.2 Add space.sectioned.generous and space.sectioned.expansive
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Define semantics referencing space1200 and space1600 (must exist from Task 1)
    - Verify resolution
    - _Requirements: 3_

---

- [ ] 4. Shadow.modal Semantic Update

  **Type**: Parent
  **Validation**: Tier 2 - Standard
  **Agent**: Ada

  **Success Criteria:**
  - shadow.modal references shadowOffsetY.600 and blur400
  - No existing consumers affected (confirmed by Spec 002 — no production consumers)
  - Test suite passes

  **Primary Artifacts:**
  - `src/tokens/semantic/ShadowTokens.ts` (modified)

  **Completion Documentation:**
  - `.kiro/specs/003-portfolio-system-readiness/completion/task-4-completion.md`

  - [ ] 4.1 Update shadow.modal composition
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Change offsetY reference to shadowOffsetY.600
    - Change blur reference to blur400
    - Run test suite — confirm no regressions
    - _Requirements: 4_

---

- [ ] 5. Product Token Pipeline Configuration

  **Type**: Parent
  **Validation**: Tier 2 - Standard
  **Agent**: Leonardo

  **Success Criteria:**
  - `designerpunk.config.ts` includes `productTokens` path
  - `npx designerpunk generate` produces `dist/product/ProductTokens.web.css`
  - Product-Token-Governance.md accessible via MCP

  **Primary Artifacts:**
  - `designerpunk.config.ts` (modified)

  **Completion Documentation:**
  - `.kiro/specs/003-portfolio-system-readiness/completion/task-5-completion.md`

  - [ ] 5.1 Add productTokens config and verify generation
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Leonardo
    - Add `productTokens: './product/tokens'` to designerpunk.config.ts
    - Create `product/tokens/` directory
    - Run `npx designerpunk generate` — confirm product token output directory created
    - _Requirements: 5_

---

- [ ] 6. Product Token Authoring

  **Type**: Parent
  **Validation**: Tier 2 - Standard
  **Agent**: Leonardo

  **Success Criteria:**
  - layout.yaml and motion.yaml authored per Product-Token-Governance.md
  - `npx designerpunk validate --product-tokens` passes with zero errors
  - Generated CSS contains all expected custom properties
  - `get_product_tokens` returns all tokens with descriptions

  **Primary Artifacts:**
  - `product/tokens/layout.yaml` (new)
  - `product/tokens/motion.yaml` (new)
  - `dist/product/ProductTokens.web.css` (generated)

  **Completion Documentation:**
  - `.kiro/specs/003-portfolio-system-readiness/completion/task-6-completion.md`

  - [ ] 6.1 Author layout.yaml
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Leonardo
    - Create product/tokens/layout.yaml with 9 layout tokens per design.md
    - Include rationale on all hard values
    - _Requirements: 6_

  - [ ] 6.2 Author motion.yaml
    **Type**: Implementation
    **Validation**: Tier 1 - Minimal
    **Agent**: Leonardo
    - Create product/tokens/motion.yaml with 3 motion tokens per design.md
    - Include rationale on hard values
    - _Requirements: 7_

  - [ ] 6.3 Validate and generate
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Leonardo
    - Run `npx designerpunk validate --product-tokens` (must follow Task 1 merge for ref resolution)
    - Run `npx designerpunk generate`
    - Verify dist/product/ProductTokens.web.css output matches expected
    - _Requirements: 5, 6, 7_

---

- [ ] 7. Screen Spec — Page Structure and Layout

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive
  **Agent**: Leonardo

  **Success Criteria:**
  - portfolio.yaml contains complete ui-tree with all 13 sections
  - Semantic HTML elements specified (landmarks, heading hierarchy)
  - Token references per section node
  - Responsive strategy documented per breakpoint
  - CSS load order specified
  - Visual reference annotation present

  **Primary Artifacts:**
  - `product/experience-map/pages/portfolio/portfolio.yaml` (rewritten)

  **Completion Documentation:**
  - `.kiro/specs/003-portfolio-system-readiness/completion/task-7-completion.md`

  - [ ] 7.1 Page-level scaffold
    **Type**: Architecture
    **Validation**: Tier 2 - Standard
    **Agent**: Leonardo
    - Define page metadata, ux-direction, visual-reference, section list
    - Define responsive strategy (breakpoints, grid columns per breakpoint)
    - Define CSS load order
    - Define page-level accessibility (skip-to-content, landmark structure, heading hierarchy)
    - _Requirements: 8, 10, 11_

  - [ ] 7.2 Simple sections ui-tree (hero, stats, enterprise, code-shots, thanks, footer)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Leonardo
    - Author ui-tree for straightforward sections
    - Include tokens: blocks with system + product token references
    - **Note**: Heading text uses `color.text.strong` (not `color.text.heading` as in design-outline). See `.kiro/specs/003-portfolio-system-readiness/completion/task-3-1-completion.md` for rename rationale.
    - Include responsive behavior per section
    - _Requirements: 8_

  - [ ] 7.3 Content sections ui-tree (why-build, how-built, who-built, cta, agents)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Leonardo
    - Author ui-tree for content-heavy sections
    - Include tokens: blocks
    - Include responsive behavior
    - _Requirements: 8_

---

- [ ] 8. Screen Spec — Complex Interactions

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive
  **Agent**: Leonardo

  **Success Criteria:**
  - All 5 interactions documented with state-machine format
  - Each includes trigger, states, transitions, timing tokens, reduced-motion fallback
  - Canvas interactions note `technology: canvas-2d`
  - FLIP animation specifies implementation approach (JS measurement + CSS transition)

  **Primary Artifacts:**
  - `product/experience-map/pages/portfolio/portfolio.yaml` (continued)

  **Completion Documentation:**
  - `.kiro/specs/003-portfolio-system-readiness/completion/task-8-completion.md`

  - [ ] 8.1 Ecosystem modal interaction spec
    **Type**: Architecture
    **Validation**: Tier 2 - Standard
    **Agent**: Leonardo
    - Document FLIP animation: trigger, states (closed/opening/open/closing), timing, easing
    - Specify JS measurement + CSS transition approach
    - Document focus trap, close triggers, reduced-motion fallback
    - _Requirements: 9_

  - [ ] 8.2 Chord diagram interaction spec
    **Type**: Architecture
    **Validation**: Tier 2 - Standard
    **Agent**: Leonardo
    - Document technology (Canvas 2D), hover/drag model, idle animation, pulse dots
    - Note: canvas states are render-loop states, not DOM states
    - Document reduced-motion (stop idle spin, disable pulse)
    - _Requirements: 9_

  - [ ] 8.3 Career chart interaction spec
    **Type**: Architecture
    **Validation**: Tier 2 - Standard
    **Agent**: Leonardo
    - Document technology (Canvas 2D), IntersectionObserver trigger, grow animation
    - Document hover tooltip behavior, noise pattern rendering
    - Document reduced-motion (instant render, no grow animation)
    - _Requirements: 9_

  - [ ] 8.4 Agent portrait and easter egg interaction specs
    **Type**: Implementation
    **Validation**: Tier 1 - Minimal
    **Agent**: Leonardo
    - Document agent portrait: list item hover → SVG contentDocument manipulation
    - Document easter eggs: heading hover trigger → neon flicker keyframe
    - Document reduced-motion fallbacks for both
    - _Requirements: 9_

---

- [ ] 9. Screen Spec — Accessibility

  **Type**: Parent
  **Validation**: Tier 2 - Standard
  **Agent**: Leonardo

  **Success Criteria:**
  - Skip-to-content link specified
  - Heading hierarchy documented (h1→h2→h3→h4)
  - Modal focus management specified
  - All decorative elements marked aria-hidden
  - Reduced-motion behavior for every animated element
  - Accessible names for all interactive elements

  **Primary Artifacts:**
  - `product/experience-map/pages/portfolio/portfolio.yaml` (continued)

  **Completion Documentation:**
  - `.kiro/specs/003-portfolio-system-readiness/completion/task-9-completion.md`

  - [ ] 9.1 Page-level accessibility specification
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Leonardo
    - Document skip-to-content, landmark structure, heading hierarchy
    - Document modal focus trap and return-focus behavior
    - Enumerate all aria-hidden decorative elements
    - Enumerate all interactive element accessible names
    - Compile reduced-motion behavior summary (all animated elements)
    - _Requirements: 10_

---

- [ ] 10. Screen Spec — Assets and Performance

  **Type**: Parent
  **Validation**: Tier 2 - Standard
  **Agent**: Leonardo

  **Success Criteria:**
  - All assets enumerated with source paths
  - Script architecture defined
  - Critical rendering path identified
  - Lazy-loading strategy specified
  - CSS load order documented

  **Primary Artifacts:**
  - `product/experience-map/pages/portfolio/portfolio.yaml` (continued)

  **Completion Documentation:**
  - `.kiro/specs/003-portfolio-system-readiness/completion/task-10-completion.md`

  - [ ] 10.1 Asset enumeration and performance specification
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Leonardo
    - List all SVG illustrations, background images, font files with paths
    - Define script architecture (ES2022 modules, per-section splitting)
    - Identify above-the-fold content and critical rendering priorities
    - Specify IntersectionObserver lazy-loading for below-fold canvas elements
    - _Requirements: 11_

---

- [ ] 11. Product Context Updates

  **Type**: Parent
  **Validation**: Tier 1 - Minimal
  **Agent**: Leonardo

  **Success Criteria:**
  - overview.yaml reflects current scope and status
  - roadmap.md reflects Spec 002 complete, 003 in progress, 004 planned, v11.7.1 adoption

  **Primary Artifacts:**
  - `product/overview.yaml` (modified)
  - `product/roadmap.md` (modified)

  **Completion Documentation:**
  - `.kiro/specs/003-portfolio-system-readiness/completion/task-11-completion.md`

  - [ ] 11.1 Update overview.yaml and roadmap.md
    **Type**: Documentation
    **Validation**: Tier 1 - Minimal
    **Agent**: Leonardo
    - Update product scope, status, and version references
    - Update roadmap with current spec status and v11.7.1 adoption
    - _Requirements: 12_

---

## Sequencing

```
Tasks 1-4 (Ada: system tokens) ─────────────────────────────→ Done
Tasks 5-6 (Leonardo: product tokens) ── authoring parallel ──→ validation after Tasks 1-4 merge
Tasks 7-10 (Leonardo: screen spec) ──── fully parallel ──────→ Done
Task 11 (Leonardo: product context) ─── parallel ────────────→ Done
```

- Tasks 1-4: Ada executes independently. Task 3.2 depends on Task 1 (space1200/1600 must exist). Task 4 depends on Task 2 (shadow primitives must exist).
- Tasks 5-6: Leonardo authors YAML in parallel with Ada. Task 6.3 (validation) waits for Tasks 1-4 to merge.
- Tasks 7-10: Leonardo executes independently — no dependency on Layers 1-2.
- Task 11: Lightweight, can execute anytime.

---

## Post-Completion

This spec produces artifacts only — no page implementation code. Standard commit workflow applies for token creation (Ada) and product token authoring (Leonardo). Screen spec authoring does not require commits per subtask — commit at parent task completion.

**Post-Spec 003**: Spec 004 (Portfolio Page Implementation) can begin. Sparky's implementation source is `product/experience-map/pages/portfolio/portfolio.yaml`.
