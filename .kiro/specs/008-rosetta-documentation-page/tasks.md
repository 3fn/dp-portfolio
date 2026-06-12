# Implementation Plan: Rosetta Documentation Page

**Date**: 2026-06-12
**Spec**: 008 - Rosetta Documentation Page
**Status**: Implementation Planning
**Dependencies**: Spec 006 ✅
**Estimate**: ~40 hours

---

## Implementation Plan

Five parent tasks sequenced: foundation (page scaffold + tokens), layout (three-column + nav rail), content (narrative + viz), interaction (scroll state + tooltips), and polish (a11y, responsive, print, integration).

---

## Task List

- [x] 1. Page Foundation & Product Tokens

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Astro page exists at `/docs/rosetta` and renders
  - Product tokens created for all new values (per System-First Value Selection)
  - Experience map entry exists
  - Base layout renders three-column grid

  **Primary Artifacts:**
  - `src/pages/docs/rosetta.astro`
  - `product/tokens/layout.yaml` (extended)
  - `product/tokens/color.yaml` (extended if needed)
  - `product/tokens/motion.yaml` (extended)
  - `product/experience-map/pages/docs/rosetta.yaml`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/008-rosetta-documentation-page/completion/task-1-completion.md`
  - Summary: `docs/specs/008-rosetta-documentation-page/task-1-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool
  - Commit: `./.kiro/hooks/commit-task.sh "Task 1 Complete: Page Foundation & Product Tokens"`

  - [x] 1.1 Create product tokens
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Sparky
    - Author ~9 product tokens (layout: narrative max-width, nav rail widths, beat spacing, tooltip max-width; motion: viz transition durations; color: viz connection stroke, node glow, tooltip bg)
    - Eliminated via System-First: viz panel bg (use `black400`), nav rail duration (use `duration150`), body line-height (use `typography.bodyMd`), beat title size (use `typography.h2`), page title size (use `typography.h1`)
    - Query system tokens first per System-First Value Selection
    - Cyan accent confirmed as `cyan200` (system primitive, no product token needed)
    - Validate YAML, verify generate passes
    - _Requirements: 8.2, 8.3, 8.4_

  - [x] 1.2 Create Astro page scaffold
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Sparky
    - Create `src/pages/docs/rosetta.astro` using Base layout
    - Set up three-column grid structure (nav rail + narrative + viz)
    - Verify page renders at `/docs/rosetta` in dev server
    - _Requirements: 1.1_

  - [x] 1.3 Create experience map entry
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Leonardo
    - Create `product/experience-map/pages/docs/rosetta.yaml`
    - Add `/docs/rosetta` to `product/overview.yaml` active pages
    - _Requirements: 9.2, 9.3_

---

- [x] 2. Nav Rail & Layout

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Nav rail expands/collapses on hover
  - Nav rail is keyboard-navigable with aria-current tracking
  - Scroll position updates active nav item
  - Skip link bypasses nav rail
  - Visualization panel is sticky at 100vh

  **Primary Artifacts:**
  - Nav rail HTML/CSS in rosetta.astro
  - Scroll-tracking JS

  **Completion Documentation:**
  - Detailed: `.kiro/specs/008-rosetta-documentation-page/completion/task-2-completion.md`
  - Summary: `docs/specs/008-rosetta-documentation-page/task-2-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool
  - Commit: `./.kiro/hooks/commit-task.sh "Task 2 Complete: Nav Rail & Layout"`

  - [x] 2.1 Implement nav rail
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Semantic `<nav>` with links to beat anchors
    - Expand on hover/focus (80px → 260px), collapse on leave
    - Keyboard navigable (Tab through links, Enter/Space activates)
    - `aria-current="true"` on active beat link
    - Skip link to bypass nav
    - _Requirements: 1.2, 1.3, 1.4, 5.2, 5.6_

  - [x] 2.2 Implement scroll-tracked active state
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - IntersectionObserver on beat sections to detect current beat
    - Update nav rail active state on scroll
    - Handle URL hash on page load (scroll to beat + set state)
    - _Requirements: 1.3, 1.5_

---

- [x] 3. Narrative Content & Visualization

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - All 4 narrative beats render with correct content
  - SVG visualization has 11 nodes with 5 states
  - Connection lines drawn per state
  - Beat 4 includes data narrative stat
  - All token names, values, and platform outputs are accurate

  **Primary Artifacts:**
  - Narrative HTML content in rosetta.astro
  - Inline SVG visualization
  - Beat state configuration data

  **Completion Documentation:**
  - Detailed: `.kiro/specs/008-rosetta-documentation-page/completion/task-3-completion.md`
  - Summary: `docs/specs/008-rosetta-documentation-page/task-3-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool
  - Commit: `./.kiro/hooks/commit-task.sh "Task 3 Complete: Narrative Content & Visualization"`

  - [x] 3.1 Implement narrative content
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Write HTML for 4 beats from design outline narrative
    - Semantic structure: `<article>` with `<h1>` (page title, `typography.h1`) and `<section aria-labelledby>` per beat with `<h2>` (`typography.h2`)
    - Body text uses `typography.bodyMd`
    - Token-compliant typography throughout (system type tokens — no product type tokens needed)
    - Data narrative stat in Beat 4 opener
    - Beat anchors for nav rail + URL hash linking
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 5.5, 10.1, 10.2, 10.3_

  - [x] 3.2 Implement SVG visualization
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - 11-node SVG with `viewBox` and `preserveAspectRatio="xMidYMid meet"`
    - Define 5 states (node positions, radii, colors, labels per beat)
    - Connection lines per state
    - CSS transitions (position 0.6s, radius 0.5s, stroke color 0.5s)
    - `aria-hidden="true"` on visualization container
    - Use system color associations (cyan200 = Rosetta accent, black400 = viz panel background)
    - _Requirements: 3.1, 3.2, 3.3, 5.1, 8.4_

  - [x] 3.3 Implement Beat 4 draw-on-scroll lines
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Platform fan-out connection lines with `stroke-dashoffset` animation
    - Animate as user scrolls through Beat 4
    - _Requirements: 3.4_

---

- [x] 4. Scroll State Machine & Tooltips

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Scroll drives visualization state changes correctly
  - Label opacity interpolates based on scroll position
  - Tooltips appear on hover/tap/focus with contextual content
  - Tooltips dismiss on scroll
  - Reduced motion shows final state with no transitions

  **Primary Artifacts:**
  - `src/scripts/rosetta-viz.ts` (or inline script)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/008-rosetta-documentation-page/completion/task-4-completion.md`
  - Summary: `docs/specs/008-rosetta-documentation-page/task-4-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool
  - Commit: `./.kiro/hooks/commit-task.sh "Task 4 Complete: Scroll State Machine & Tooltips"`

  - [x] 4.1 Implement scroll-driven state machine
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - IntersectionObserver for beat detection → trigger state change
    - Scroll listener (passive) for label opacity interpolation
    - State change applies CSS classes/properties to SVG nodes + connections
    - Export init/cleanup pattern (Astro-ready)
    - _Requirements: 3.1, 3.5, 7.1_

  - [x] 4.2 Implement tooltip interaction
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Hover on node → tooltip appears (cursor-following, node-color border)
    - Tab to node → tooltip appears (keyboard focus)
    - Tap on node → tooltip appears (mobile)
    - Scroll → tooltip dismisses
    - Content updates per current beat + node identity
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [x] 4.3 Implement reduced motion
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Check `prefers-reduced-motion: reduce` at init
    - If active: set visualization to final state, disable all CSS transitions, skip scroll-driven state changes
    - Labels shown at full opacity (no interpolation)
    - _Requirements: 5.3_

---

- [x] 5. Polish, Responsive & Integration

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Mobile layout renders correctly (single-column, nav hidden)
  - Print produces readable single-column narrative
  - Forced colors mode passes
  - Ecosystem Rosetta card links to `/docs/rosetta`
  - Scroll performance ≥30 FPS on baseline device
  - All content verified accurate against system source

  **Primary Artifacts:**
  - Responsive CSS
  - Print styles
  - Updated ecosystem section link

  **Completion Documentation:**
  - Detailed: `.kiro/specs/008-rosetta-documentation-page/completion/task-5-completion.md`
  - Summary: `docs/specs/008-rosetta-documentation-page/task-5-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool
  - Commit: `./.kiro/hooks/commit-task.sh "Task 5 Complete: Polish, Responsive & Integration"`

  - [x] 5.1 Implement responsive collapse
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - ≤1023px: single-column, nav rail hidden, viz as static SVG (final state)
    - Verify content reads correctly without visualization
    - _Requirements: 6.1, 6.3_

  - [x] 5.2 Implement print styles
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - `@media print`: hide nav rail, hide viz panel, single-column narrative
    - Verify readability when printed
    - _Requirements: 6.2_

  - [x] 5.3 Implement forced colors + performance verification
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - `@media (forced-colors: active)`: nav links and focusable nodes remain visible
    - Test scroll performance on baseline device — degrade if needed
    - _Requirements: 5.4, 7.1, 7.2_

  - [x] 5.4 Ecosystem card link + final verification
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Update Rosetta card in ecosystem section to link to `/docs/rosetta`
    - Verify all content accuracy (token names, counts, platform formats match v12 source)
    - Full page walkthrough: all beats, all states, all tooltips, all breakpoints
    - _Requirements: 9.1, 10.1, 10.2, 10.3, 7.3_
