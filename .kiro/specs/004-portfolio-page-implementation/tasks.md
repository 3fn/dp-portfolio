# Implementation Plan: Portfolio Page Implementation

**Date**: 2026-05-26
**Spec**: 004-portfolio-page-implementation
**Status**: Implementation Planning
**Dependencies**: Spec 002 (token compliance audit), Spec 003 (screen specification + product tokens)

---

## Implementation Plan

4 phases, 4 parent tasks, 16 subtasks. All work assigned to Sparky (web-only spec, no cross-platform concerns).

---

## Task List

- [x] 1. Foundation

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Build system produces all script bundles without errors
  - HTML document passes W3C validation with correct landmark structure
  - CSS loads in correct cascade order with token custom properties resolving
  - Fonts load with `font-display: swap` (no FOIT)

  **Primary Artifacts:**
  - `src/pages/index.html`
  - `src/styles/portfolio.css`
  - `package.json` (updated build config)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/004-portfolio-page-implementation/completion/task-1-parent-completion.md`
  - Summary: `docs/specs/004-portfolio-page-implementation/task-1-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 1 Complete: Foundation"`
  - Verify: Check GitHub for committed changes

  - [x] 1.1 Update build configuration
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Sparky
    - Add chord.ts, career.ts, ecosystem.ts, agents.ts entry points to esbuild config
    - Update both `build:page` and `dev` scripts in package.json
    - Verify build produces all expected output files in `dist/scripts/`
    - _Requirements: 12.1, 12.2, 12.3, 12.4_

  - [x] 1.2 Create HTML structure
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Create new `src/pages/index.html` from spec ui-tree
    - Implement all 11 landmarks (nav, main, 8 sections, footer)
    - Implement heading hierarchy (h1 → h2 × 6 → h3 → h4)
    - Add skip-to-content link as first focusable element
    - Add all script tags with `defer` attribute
    - Add stylesheet links in correct cascade order
    - Inline critical CSS (nav + hero) in `<style>` block in `<head>`
    - Add all section content from screen spec (text, images, objects, canvas elements)
    - Add scroll-reveal classes to appropriate elements per prototype behavior
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 10.1, 10.3, 10.6_

  - [x] 1.3 Create CSS stylesheet
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Create `src/styles/portfolio.css` with logical section organization
    - Implement all section styles using token CSS custom properties
    - Use CSS logical properties for all layout spacing
    - Implement responsive breakpoints (desktop ≥1024, tablet 768-1023, mobile <768)
    - Implement section pattern (full-bleed background, constrained content column)
    - Implement easter egg CSS (adjacent sibling selector, neon-flicker keyframes)
    - Implement reduced-motion media query (zero transitions, no animations, final states)
    - Implement utility classes (sr-only, reveal-hidden)
    - _Requirements: 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 3.4, 3.5, 8.3, 8.4, 9.6, 11.1, 11.2, 11.3, 11.4_

---

- [x] 2. Interactions — Canvas

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Chord diagram renders and animates matching prototype visual fidelity
  - Career chart renders with grow animation matching prototype
  - Both canvases pause when off-screen and resume when visible
  - Both canvases respect prefers-reduced-motion
  - Tooltips appear on hover with correct positioning

  **Primary Artifacts:**
  - `src/scripts/chord.ts`
  - `src/scripts/career.ts`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/004-portfolio-page-implementation/completion/task-2-parent-completion.md`
  - Summary: `docs/specs/004-portfolio-page-implementation/task-2-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 2 Complete: Canvas Interactions"`
  - Verify: Check GitHub for committed changes

  - [x] 2.1 Extract and implement chord diagram
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Extract chord diagram script from prototype into `src/scripts/chord.ts`
    - Add TypeScript types for nodes, connections, groups, pulse state
    - Add IntersectionObserver lifecycle (threshold 0.1): start/pause/resume
    - Add `prefers-reduced-motion` check at init (static render if reduced)
    - Verify visual fidelity matches prototype (node layout, chord curves, pulse dots, drag behavior)
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

  - [x] 2.2 Extract and implement career chart
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Extract career chart script from prototype into `src/scripts/career.ts`
    - Add TypeScript types for career segments, layout calculations
    - Add IntersectionObserver lifecycle (threshold 1.0): start on full visibility
    - Add `prefers-reduced-motion` check at init (skip to static state if reduced)
    - Add visually-hidden data table generation from ALL_ROLES array
    - Verify visual fidelity matches prototype (bar gradients, noise texture, grow animation)
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

---

- [x] 3. Interactions — DOM

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Ecosystem modal opens/closes with FLIP animation from/to triggering card
  - Focus is trapped in modal when open, returns to trigger on close
  - Ecosystem connector lines draw correctly between cards and illustration
  - Agent portrait hover highlights correct portrait in SVG
  - All interactions degrade gracefully on failure (SVG load failure, missing elements)

  **Primary Artifacts:**
  - `src/scripts/ecosystem.ts`
  - `src/scripts/agents.ts`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/004-portfolio-page-implementation/completion/task-3-parent-completion.md`
  - Summary: `docs/specs/004-portfolio-page-implementation/task-3-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 3 Complete: DOM Interactions"`
  - Verify: Check GitHub for committed changes

  - [x] 3.1 Extract and implement ecosystem modal + connectors
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Extract ecosystem modal FLIP logic from prototype into `src/scripts/ecosystem.ts`
    - Implement modal open: capture card rect, set modal content, calculate inverse transform, animate
    - Implement modal close: reverse FLIP back to card, fade backdrop
    - Implement focus trap via `inert` attribute on background content
    - Implement close triggers: backdrop click, Escape key, close button
    - Implement keyboard activation on cards (role="button", Enter/Space)
    - Add `prefers-reduced-motion` check (instant show/hide, no transform)
    - Extract connector line drawing logic (SVG lines from cards to illustration targets)
    - Implement connector redraw on window resize
    - Handle SVG load failure gracefully (no connectors drawn, no error)
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 9.5_

  - [x] 3.2 Extract and implement agent portrait interaction
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Extract agent portrait hover logic from prototype into `src/scripts/agents.ts`
    - Wait for all 3 portrait `<object>` elements to fire load event before initializing
    - Implement hover: match agent name → portrait ID, set blend mode + opacity
    - Implement leave: reset all portraits to luminosity + full opacity
    - Handle load failure: if any portrait fails, disable interaction entirely
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

---

- [x] 4. Accessibility & Performance Polish

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - All aria attributes present per screen spec accessibility section
  - All decorative elements have aria-hidden="true"
  - Keyboard navigation works for all interactive elements
  - Reduced-motion disables all animations (verified manually)
  - CTA background image lazy-loads via IntersectionObserver
  - No hard-coded values except documented exceptions (verified via grep)

  **Primary Artifacts:**
  - Updated `src/pages/index.html` (aria attributes)
  - Updated `src/styles/portfolio.css` (reduced-motion, lazy-load class)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/004-portfolio-page-implementation/completion/task-4-parent-completion.md`
  - Summary: `docs/specs/004-portfolio-page-implementation/task-4-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 4 Complete: Accessibility & Performance Polish"`
  - Verify: Check GitHub for committed changes

  - [x] 4.1 Accessibility audit and fixes
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Verify all decorative elements have `aria-hidden="true"` per spec list
    - Add `aria-label` to external links with "(opens in new tab)" suffix
    - Verify ecosystem cards have keyboard activation (role="button" or button wrapper)
    - Verify modal has `role="dialog"`, `aria-modal="true"`
    - Verify nav has `aria-label="Site navigation"`
    - Add visually-hidden chord diagram description (adjacent to canvas)
    - Verify career chart visually-hidden data table is populated correctly
    - Test keyboard navigation: Tab through all interactive elements, verify focus order
    - Test focus trap: verify Tab/Shift+Tab stays within modal when open
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.7_

  - [x] 4.2 Performance verification
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Implement CTA background image lazy-loading (IntersectionObserver applies class with background-image)
    - Verify critical CSS is inlined (nav + hero render without external stylesheet)
    - Verify all fonts use `font-display: swap`
    - Verify canvas scripts only initialize on IntersectionObserver trigger
    - Verify all SVGs use `<object>` not `<img>`
    - _Requirements: 10.1, 10.2, 10.4, 10.5, 10.6_

  - [x] 4.3 Token compliance validation
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Grep CSS for hard-coded color values (hex, rgb, hsl) — verify all are documented exceptions
    - Grep CSS for hard-coded spacing values (px, rem, em) — verify all are documented exceptions
    - Verify all token references resolve (no undefined custom properties)
    - Verify responsive breakpoints use correct token-derived values
    - Cross-reference against Spec 002 accepted deviations list
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [x] 4.4 Reduced-motion and scroll-reveal verification
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Verify scroll-reveal animations trigger correctly on scroll for all `.reveal-hidden` elements (happy path)
    - Toggle `prefers-reduced-motion: reduce` in OS/browser settings
    - Verify scroll-reveal elements are immediately visible (no transition)
    - Verify chord diagram renders statically (no spin, no pulse)
    - Verify career chart bars are at full height (no grow animation)
    - Verify ecosystem modal opens/closes instantly (no FLIP transform)
    - Verify easter eggs appear instantly at full opacity (no flicker)
    - Verify nav transitions are instant (no color fade)
    - _Requirements: 4.6, 5.6, 6.4, 8.4, 9.6_
