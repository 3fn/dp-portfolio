# Implementation Plan: Portfolio Audience Repositioning

**Date**: 2026-06-04
**Spec**: 007 - Portfolio Audience Repositioning
**Status**: Implementation Planning
**Dependencies**: Spec 005 ✅; before Spec 006

---

## Implementation Plan

Four parent tasks: content/structure changes, enterprise language sweep, token animation script, and Product MCP + README updates. Sequenced to minimize merge conflicts: HTML/CSS first, then script, then external docs.

---

## Task List

- [x] 1. Audience Section & Why Build Enhancement

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - "Who is this system built for?" section renders with correct content and layout
  - Why Build section has two-column layout with subsections and token cluster HTML
  - Stats bar extends full viewport width with content constrained at max-width
  - All new CSS uses logical properties and system/product tokens
  - No new hard-coded values without token reference

  **Primary Artifacts:**
  - `src/pages/index.html` (updated)
  - `src/styles/portfolio.css` (updated)
  - `product/tokens/layout.yaml` (extended with sticky offset token)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/007-portfolio-audience-repositioning/completion/task-1-completion.md`
  - Summary: `docs/specs/007-portfolio-audience-repositioning/task-1-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 1 Complete: Audience Section & Why Build Enhancement"`
  - Verify: Check GitHub for committed changes

  - [x] 1.1 Create product token for sticky offset
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Sparky
    - Add `tokenEvolutionStickyOffset` to `product/tokens/layout.yaml` with value 120, rationale documenting nav height + clearance
    - Validate YAML syntax
    - _Requirements: 6.2_

  - [x] 1.2 Rename enterprise section to audience section
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Rename `#enterprise` → `#audience` in HTML (update anchor)
    - Rename all `.enterprise__*` CSS classes → `.audience__*` in HTML and CSS
    - Update any nav links pointing to `#enterprise`
    - Verify no JS queries reference `.enterprise` selectors
    - _Requirements: 5.5_

  - [x] 1.3 Implement audience section content
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Replace enterprise section HTML with: hook, sub, 2×3 grid cards, personas, closer
    - Hook uses `--typography-display-font-size`
    - Sub and personas use `--typography-body-lg-font-size`
    - Grid uses existing `space500` / `space900` gap pattern
    - Add `aria-labelledby` pointing to section heading
    - Persona border-left reuses `--product-border-quote-border-width`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 6.1, 6.2, 6.4, 10.1, 10.2, 10.3, 10.4_

  - [x] 1.4 Enhance Why Build section layout
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Restructure left column into Challenge, Insight & Thesis, Goals subsections
    - Add sticky right column with 16 flap-token pill elements
    - Each token has `data-states` attribute with 4 pipe-separated phase values (all Phase 1 values unique)
    - Sticky column uses `inset-block-start: var(--product-layout-token-evolution-sticky-offset)`
    - CSS for flap tokens: logical properties, system token references for spacing/radius
    - Add `@media (prefers-reduced-motion: reduce)` to disable rotation and transitions
    - _Requirements: 2.1, 2.3, 2.6, 3.2, 6.1, 6.2_

  - [x] 1.5 Stats bar full-bleed
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Remove `max-inline-size` constraint from `.stats` parent
    - Ensure `.stats__grid` retains `max-inline-size: var(--product-layout-content-max-width)` + `margin-inline: auto`
    - Verify background and borders extend to viewport edges
    - Verify content remains centered and constrained
    - _Requirements: 4.1, 4.2_

---

- [x] 2. Enterprise Language Sweep

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Zero instances of "enterprise-grade", "enterprise-tier", or "enterprise-ready" in visible page content
  - Hero, CTA, and Why Build Goal #1 all updated
  - Grep confirms no "enterprise" in user-facing HTML text

  **Primary Artifacts:**
  - `src/pages/index.html` (updated)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/007-portfolio-audience-repositioning/completion/task-2-completion.md`
  - Summary: `docs/specs/007-portfolio-audience-repositioning/task-2-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 2 Complete: Enterprise Language Sweep"`
  - Verify: Check GitHub for committed changes

  - [x] 2.1 Remove enterprise language from page content
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Update hero `<p>` description to remove "enterprise-ready"
    - Update CTA body copy to remove "enterprise-grade design system"
    - Update Why Build Goal #1 to remove "enterprise-tier"
    - Grep entire index.html for remaining "enterprise" — fix any found
    - Verify replacements maintain coherent messaging aligned with 0-to-1 positioning
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

---

- [x] 3. Token Animation Script

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Token cluster transitions through 4 phases on scroll
  - Animation reverses on scroll-up
  - Reduced motion users see final state immediately
  - Script exports init() and cleanup() functions
  - All listeners cleaned up on cleanup() call

  **Primary Artifacts:**
  - `src/scripts/token-evolution.ts` (new)
  - `src/pages/index.html` (script tag added)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/007-portfolio-audience-repositioning/completion/task-3-completion.md`
  - Summary: `docs/specs/007-portfolio-audience-repositioning/task-3-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 3 Complete: Token Animation Script"`
  - Verify: Check GitHub for committed changes

  - [x] 3.1 Implement token-evolution.ts
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Create `src/scripts/token-evolution.ts` with exported `init()` and `cleanup()` functions
    - Implement scroll-position-based phase calculation anchored to Insight & Thesis beat
    - Implement rotateX text transition (split-flap effect) on phase change
    - Implement `.resolved` class toggle for rotation flatten (Phase 1→2)
    - Use `{ passive: true }` on scroll listener
    - Store phase data in structured format (not only inline HTML attributes)
    - cleanup() removes scroll listener and any observers
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 2.2, 2.4, 2.5_

  - [x] 3.2 Implement reduced motion path
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Check `prefers-reduced-motion: reduce` at init
    - If active: set all tokens to Phase 4 text, add `.resolved` class, skip scroll listener registration
    - Verify no motion occurs for reduced-motion users
    - _Requirements: 3.1, 3.2_

---

- [x] 4. Product MCP, README & Verification

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - product/overview.yaml reflects 0-to-1 positioning
  - README has "Who is this for?" section
  - No "enterprise" framing in Product MCP context
  - Full page visual verification passes
  - All manual checklist items confirmed

  **Primary Artifacts:**
  - `product/overview.yaml` (updated)
  - `README.md` (updated)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/007-portfolio-audience-repositioning/completion/task-4-completion.md`
  - Summary: `docs/specs/007-portfolio-audience-repositioning/task-4-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 4 Complete: Product MCP, README & Verification"`
  - Verify: Check GitHub for committed changes

  - [x] 4.1 Update Product MCP context
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Leonardo
    - Update `product/overview.yaml` description, domain, and principles to reflect 0-to-1 positioning
    - Review experience map entries for "enterprise" language
    - Verify Product MCP serves updated framing
    - _Requirements: 8.1, 8.2, 8.3_

  - [x] 4.2 Update GitHub README
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Leonardo
    - Add "Who is this for?" section with 4 persona statements
    - Remove any "enterprise" framing if present
    - Keep concise — link to portfolio for full context
    - _Requirements: 9.1, 9.2, 9.3_

  - [x] 4.3 Final verification
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Run build to confirm no errors
    - Visual comparison: all sections render correctly
    - Scroll test: token animation transitions 4 phases
    - Scroll-up test: animation reverses
    - Reduced motion test: final state shown immediately
    - Full-bleed test: stats bar extends to viewport edges
    - Grep test: no "enterprise" in visible HTML content
    - Forced-colors: audience section remains legible
    - Responsive: new sections work at tablet/mobile breakpoints
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 4.1, 4.2, 5.1_
