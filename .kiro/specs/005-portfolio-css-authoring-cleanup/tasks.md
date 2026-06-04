# Implementation Plan: Portfolio Web Authoring Compliance Audit & Cleanup

**Date**: 2026-06-01
**Spec**: 005 - Portfolio Web Authoring Compliance Audit & Cleanup
**Status**: Implementation Planning
**Dependencies**: @3fn/core 11.8.0

---

## Implementation Plan

Five-phase approach: CSS compliance first (largest surface area), then HTML fixes, TypeScript fixes, product components, and finally lessons learned. Each phase is a parent task with focused subtasks.

---

## Task List

- [x] 1. CSS Compliance — Logical Properties & Token Audit

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Zero physical directional properties in portfolio.css (documented exceptions only)
  - Zero physical directional properties in index.html inline styles
  - All hard-coded tokenizable values replaced with token references
  - Product token YAML files created for new categories (color, border, shadow)
  - Layout.yaml extended with new tokens

  **Primary Artifacts:**
  - `src/styles/portfolio.css` (updated)
  - `src/pages/index.html` (inline styles updated)
  - `product/tokens/color.yaml` (new)
  - `product/tokens/border.yaml` (new)
  - `product/tokens/shadow.yaml` (new)
  - `product/tokens/layout.yaml` (extended)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/005-portfolio-css-authoring-cleanup/completion/task-1-completion.md`
  - Summary: `docs/specs/005-portfolio-css-authoring-cleanup/task-1-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 1 Complete: CSS Compliance — Logical Properties & Token Audit"`
  - Verify: Check GitHub for committed changes

  - [x] 1.1 Create product token YAML files
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Sparky
    - Create `product/tokens/color.yaml` with category header and all color tokens identified in design
    - Create `product/tokens/border.yaml` with tooltip tokens
    - Create `product/tokens/shadow.yaml` with card hover elevation token
    - Extend `product/tokens/layout.yaml` with tooltip and viz branch tokens
    - Validate YAML syntax and naming conventions (camelCase)
    - _Requirements: 2.2, 2.3, 2.4_

  - [x] 1.2 Replace physical properties with logical equivalents in portfolio.css
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Systematic top-to-bottom sweep of portfolio.css
    - Replace all `margin-top`/`margin-bottom` → `margin-block-start`/`margin-block-end`
    - Replace all `padding-top`/`padding-bottom` → `padding-block-start`/`padding-block-end`
    - Replace all `top`/`bottom`/`left`/`right` → `inset-block-start`/`inset-block-end`/`inset-inline-start`/`inset-inline-end`
    - Replace `max-width` → `max-inline-size`, `border-top` → `border-block-start`, etc.
    - Document any retained physical properties with rationale comments
    - _Requirements: 1.1, 1.2, 1.4_

  - [ ] 1.3 Replace hard-coded values with token references in portfolio.css
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Replace hex/rgba color values with `var(--product-color-*)` references
    - Replace hard-coded px values (gaps, margins, widths) with product token references
    - Replace hard-coded shadow with `var(--product-shadow-*)` reference
    - Replace hard-coded border values with `var(--product-border-*)` references
    - Fix `.how-built__easter` trailing comma syntax error
    - Verify all tokenizable value categories are covered
    - _Requirements: 2.1, 2.2, 2.4, 2.5, 7.4_

  - [x] 1.4 Fix inline styles in index.html
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Replace `max-width` → `max-inline-size` in critical CSS `<style>` block
    - Verify no other physical properties in inline styles
    - _Requirements: 1.3_

---

- [x] 2. CSS Compliance — Accessibility Media Queries

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - No bare `:focus` selectors in portfolio.css
  - All transitions/animations have `prefers-reduced-motion` coverage
  - All interactive elements with role or native interactivity have `forced-colors` handling
  - `.why-build__card` explicitly excluded from forced-colors (no role/keyboard)

  **Primary Artifacts:**
  - `src/styles/portfolio.css` (updated with accessibility media queries)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/005-portfolio-css-authoring-cleanup/completion/task-2-completion.md`
  - Summary: `docs/specs/005-portfolio-css-authoring-cleanup/task-2-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 2 Complete: CSS Compliance — Accessibility Media Queries"`
  - Verify: Check GitHub for committed changes

  - [x] 2.1 Fix focus patterns
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Replace `.skip-to-content:focus` with `.skip-to-content:focus-visible`
    - Verify no other bare `:focus` selectors exist
    - Add `:focus:not(:focus-visible) { outline: none; }` reset where needed
    - _Requirements: 3.1, 3.2_

  - [x] 2.2 Verify reduced motion coverage
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Audit all `transition` and `animation` declarations
    - Add `@media (prefers-reduced-motion: reduce)` blocks for any uncovered transitions
    - Verify existing reduced-motion handling is correct
    - _Requirements: 4.1, 4.2_

  - [x] 2.3 Add forced-colors handling
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Add `@media (forced-colors: active)` block for `.ecosystem__system` (role="button")
    - Add forced-colors block for `.skip-to-content`
    - Use system color keywords: `ButtonText`, `Highlight`, `Canvas`, `CanvasText`, `LinkText`
    - Verify `.why-build__card` is NOT included (no role/keyboard)
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

---

- [x] 3. HTML & TypeScript Fixes

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Favicon path typo fixed
  - Redundant `defer` attributes removed
  - Stats count-up animation functions correctly
  - Dead code (`page.ts`) removed
  - Ecosystem modal null guards in place
  - SVG innerHTML loop refactored

  **Primary Artifacts:**
  - `src/pages/index.html` (updated)
  - `src/scripts/stats.ts` (bug fix)
  - `src/scripts/ecosystem.ts` (robustness)
  - `src/scripts/page.ts` (deleted)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/005-portfolio-css-authoring-cleanup/completion/task-3-completion.md`
  - Summary: `docs/specs/005-portfolio-css-authoring-cleanup/task-3-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 3 Complete: HTML & TypeScript Fixes"`
  - Verify: Check GitHub for committed changes

  - [x] 3.1 Fix HTML issues in index.html
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Fix double-slash in favicon path (`/src//assets/` → `/src/assets/`)
    - Remove redundant `defer` attributes from `<script type="module">` tags
    - _Requirements: 6.4, 6.5_

  - [x] 3.2 Fix stats.ts selector bug
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Change `.stats-value` selector to `.stats__value`
    - Verify count-up animation triggers on scroll
    - _Requirements: 7.1, 7.2_

  - [x] 3.3 Remove dead code
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Sparky
    - Delete `src/scripts/page.ts`
    - Remove corresponding `<script>` tag from index.html (if present)
    - Verify no other files import from page.ts
    - _Requirements: 7.3_

  - [x] 3.4 Improve ecosystem.ts robustness
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Add null guards for `modalDesc`, `modalHighlights`, `modalStats`, `modalViz` queries
    - Use early-return pattern if elements are null
    - Refactor SVG innerHTML loop to build string then assign once
    - Verify modal still renders correctly
    - _Requirements: 8.1, 8.2_

---

- [x] 4. Product Component Compliance

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - NavAboutPopover has forced-colors handling
  - NavHeaderContent has forced-colors handling and :focus-visible for links
  - Both components render correctly in standard and forced-colors modes

  **Primary Artifacts:**
  - `src/components/product/NavAboutPopover/NavAboutPopover.web.ts` (updated)
  - `src/components/product/NavHeaderContent/NavHeaderContent.web.ts` (updated)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/005-portfolio-css-authoring-cleanup/completion/task-4-completion.md`
  - Summary: `docs/specs/005-portfolio-css-authoring-cleanup/task-4-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 4 Complete: Product Component Compliance"`
  - Verify: Check GitHub for committed changes

  - [x] 4.1 Add forced-colors and focus-visible to product components
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Add `@media (forced-colors: active)` to NavAboutPopover Shadow DOM styles (trigger button, panel items)
    - Add `@media (forced-colors: active)` to NavHeaderContent styles (`.nav-link` elements)
    - Add `:focus-visible` styles for NavHeaderContent links
    - Use appropriate system color keywords
    - _Requirements: 3.3, 5.1, 5.2, 5.3, 9.1, 9.2, 9.3_

---

- [x] 5. Lessons Learned & Verification

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Lessons learned document produced with Astro migration guidance
  - Site builds without errors
  - No unintended visual regressions in standard display mode
  - Forced-colors mode shows proper element visibility
  - Stats animation functions

  **Primary Artifacts:**
  - `.kiro/specs/005-portfolio-css-authoring-cleanup/lessons-learned.md`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/005-portfolio-css-authoring-cleanup/completion/task-5-completion.md`
  - Summary: `docs/specs/005-portfolio-css-authoring-cleanup/task-5-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 5 Complete: Lessons Learned & Verification"`
  - Verify: Check GitHub for committed changes

  - [x] 5.1 Write lessons learned document
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Document script patterns needing restructuring for Astro (export init, return cleanup)
    - Document event listener cleanup gaps (resize, portrait hover)
    - Document shared utility candidates (easeOut, prefersReducedMotion)Tha
    - Document product token decisions made during this spec
    - Document any other findings relevant to Spec 006
    - _Requirements: 10.1, 10.2, 10.3_

  - [x] 5.2 Final verification
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Run build to confirm no errors
    - Visual comparison in standard display mode
    - Verify forced-colors mode (browser emulation)
    - Verify stats count-up animation fires on scroll
    - Verify skip-to-content appears on Tab
    - Verify ecosystem modal still functions
    - Run through manual verification checklist from design.md
    - _Requirements: 11.1, 11.2, 11.3, 11.4_
