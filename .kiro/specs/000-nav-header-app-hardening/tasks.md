# Implementation Plan: Nav-Header-App Hardening

**Date**: 2026-05-08
**Spec**: 000 - Nav-Header-App Hardening
**Status**: Implementation Planning
**Dependencies**: None (first spec)

---

## Implementation Plan

This spec is organized into 5 primary tasks covering: token foundation, component hardening, popover implementation, testing, and documentation/MCP updates. Token work (Ada) precedes component work (Lina) to ensure correct values are available during implementation.

---

## Task List

- [x] 1. Token Foundation

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  **Agent**: Ada

  **Success Criteria:**
  - Font family primitives updated (Figtree body, Commit Mono mono, Rajdhani unchanged)
  - Semantic tokens created and available in pipeline output
  - Component tokens created and available in pipeline output
  - All token references resolve correctly in generation

  **Primary Artifacts:**
  - Font primitive token definitions
  - `color.action.navigation.surface` semantic token
  - `typography.displayLabelMd` and `typography.displayLabelLg` semantic tokens
  - `navButton.padding.vertical` and `navHeader.padding.inline` component tokens

  **Completion Documentation:**
  - Detailed: `.kiro/specs/000-nav-header-app-hardening/completion/task-1-completion.md`
  - Summary: `docs/specs/000-nav-header-app-hardening/task-1-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 1 Complete: Token Foundation"`
  - Verify: Check GitHub for committed changes

  - [x] 1.1 Update font family primitives
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Update `fontFamilyBody` primitive value to "Figtree"
    - Update `fontFamilyMono` primitive value to "Commit Mono"
    - Move font files from `primitive-assets/` to `src/assets/fonts/figtree/` and `src/assets/fonts/commit-mono/`
    - Create `src/assets/fonts/figtree/figtree.css` with `@font-face` declarations (variable weight + italic)
    - Create `src/assets/fonts/commit-mono/commit-mono.css` with `@font-face` declarations (400/700, regular/italic)
    - Verify `fontFamilyDisplay` (Rajdhani) remains unchanged
    - Verify pipeline generates correct platform output for all three font families
    - _Requirements: 1_

  - [x] 1.2 Create semantic color token
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Create `color.action.navigation.surface` semantic token referencing green100
    - Mark as light-mode only (dark-mode behavior deferred to Phase 3)
    - Verify token resolves correctly in pipeline output
    - _Requirements: 2_

  - [x] 1.3 Create semantic typography tokens
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Create `typography.displayLabelMd`: displayFont, fontSize150, fontWeight700, lineHeight150, letterSpacing100
    - Create `typography.displayLabelLg`: displayFont, fontSize200, fontWeight700, lineHeight200, letterSpacing100
    - Verify both tokens resolve correctly with displayFont (Rajdhani)
    - _Requirements: 2_

  - [x] 1.4 Create component tokens
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada + Lina (token creation is Ada, consumption is Lina)
    - Create `src/components/core/Nav-Header-App/tokens.ts` using `defineComponentTokens()` pattern (new file)
    - Define `navButton.padding.vertical` referencing space250
    - Define `navHeader.padding.inline` referencing space500
    - Verify both tokens resolve to correct primitive values
    - _Requirements: 2_

---

- [x] 2. Nav-Header-App Component Hardening

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  **Agent**: Lina

  **Success Criteria:**
  - Nav-Header-App renders with horizontal padding, underglow, and border override
  - All three CSS custom properties function correctly with fallback defaults
  - Contracts authored and accurately describe component behavior
  - Component token consumed correctly

  **Primary Artifacts:**
  - Nav-Header-App web implementation (hardened)
  - `contracts.yaml` for Nav-Header-App
  - `schema.yaml` update with custom property API

  **Completion Documentation:**
  - Detailed: `.kiro/specs/000-nav-header-app-hardening/completion/task-2-completion.md`
  - Summary: `docs/specs/000-nav-header-app-hardening/task-2-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 2 Complete: Nav-Header-App Component Hardening"`
  - Verify: Check GitHub for committed changes

  - [x] 2.1 Add horizontal padding to Nav-Header-App
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Apply `padding-inline` using `navHeader.padding.inline` (space500 / 40px) to content regions
    - Verify padding applies at App level only (Base unchanged)
    - _Requirements: 6_
    - _Contracts: layout_three_regions (inherited, verified)_

  - [x] 2.2 Implement background override mechanism
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Expose `--nav-bg-override` CSS custom property
    - Implement fallback to `color.structure.canvas` when not set
    - Verify custom property pierces Shadow DOM correctly
    - _Requirements: 3_
    - _Contracts: visual_background_override_

  - [x] 2.3 Implement underglow effect
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Implement box-shadow with zero offset, `blur200`, pre-baked `rgba(0, 204, 110, 0.4)` default
    - Expose `--nav-glow-color` CSS custom property (expects rgba with opacity)
    - Verify glow is always present (intrinsic, not optional)
    - Verify glow color responds to custom property override
    - _Requirements: 4_
    - _Contracts: visual_glow_

  - [x] 2.4 Implement border color override
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Expose `--nav-border-color` CSS custom property
    - Set default to `green400` (overriding Base's `color.structure.border.subtle`)
    - Verify border color responds to custom property override
    - _Requirements: 5_
    - _Contracts: visual_separator (inherited, override behavior)_

  - [x] 2.5 Author Nav-Header-App contracts.yaml
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Add `visual_background_override` contract (new)
    - Add `visual_glow` contract (new)
    - Verify existing `accessibility_no_heading` contract is still accurate (no changes needed)
    - Verify contract definitions match behavioral guarantees
    - _Requirements: 16_
    - _Contracts: accessibility_no_heading, visual_background_override, visual_glow_

  - [x] 2.6 Update schema.yaml with custom property API
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Document `--nav-bg-override` (default: color.structure.canvas)
    - Document `--nav-glow-color` (default: rgba(0, 204, 110, 0.4), expects rgba with opacity)
    - Document `--nav-border-color` (default: green400)
    - _Requirements: 16_

---

- [x] 3. NavAboutPopover Implementation

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  **Agent**: Lina

  **Success Criteria:**
  - Popover toggles on click, dismisses on outside click and Escape
  - Focus management works correctly (first link on open, trigger on Escape close)
  - Animation plays with correct duration and respects prefers-reduced-motion
  - All ARIA attributes present and correct
  - Submenu items render with decorative prefixes hidden from screen readers

  **Primary Artifacts:**
  - NavAboutPopover web component
  - Submenu item prefix pattern implementation
  - Decorative elements (platform icons, outbound link icon, logo lockup)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/000-nav-header-app-hardening/completion/task-3-completion.md`
  - Summary: `docs/specs/000-nav-header-app-hardening/task-3-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 3 Complete: NavAboutPopover Implementation"`
  - Verify: Check GitHub for committed changes

  - [x] 3.1 Implement popover toggle and dismiss
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Implement click/tap toggle (open/close)
    - Implement outside click dismiss
    - Implement Escape key dismiss
    - Implement Tab-past-last-item dismiss (focusout with async check)
    - Position popover absolutely relative to trigger
    - _Requirements: 7_
    - _Contracts: interaction_pressable, interaction_dismiss_

  - [x] 3.2 Implement popover accessibility
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Add `aria-expanded` to trigger (reflects open/closed state)
    - Add `aria-controls` to trigger (points to panel ID)
    - Add `role="navigation"` and `aria-label="Page sections"` to panel
    - Implement focus to first anchor link on open
    - Implement focus return to trigger on Escape close
    - _Requirements: 8_
    - _Contracts: accessibility_aria_controls, interaction_focus_order_

  - [x] 3.3 Implement popover animation
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Implement fade + translateY(8px) animation on open/close
    - Use `duration150` (150ms), ease-out (open), ease-in (close)
    - Implement instant show/hide when `prefers-reduced-motion: reduce`
    - _Requirements: 9_
    - _Contracts: animation_coordination_

  - [x] 3.4 Implement popover visual design
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Trigger: `color.action.navigation.surface` background when open, `blend.hoverDarker` on hover (not when open), `typography.displayLabelMd`
    - Panel: `color.action.navigation.surface` background, `inset.200` padding-block, `zIndex.dropdown`
    - Items: `space300` padding-inline, `inset.100` padding-block, `typography.displayLabelLg`, `grouped.normal` gap
    - _Requirements: 10_

  - [x] 3.5 Implement submenu prefix pattern
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Render prefix (`//` or `!!`) as separate element with `aria-hidden="true"`
    - Apply `grouped.tight` (4px) gap between prefix and label
    - Give prefix fixed width for consistent label alignment
    - _Requirements: 11_

  - [x] 3.6 Implement decorative elements and logo lockup
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Platform icons (web, Apple, Android): `aria-hidden="true"`, non-interactive
    - Outbound link icon: Icon-Base instance from `primitive-assets/external-link.svg`, `aria-hidden="true"`
    - Logo: embed `primitive-assets/designerPunkLogo.svg` in leading slot
    - Credit text: "by 3fn Design" using `typography.caption`, fontWeight400/"by", fontWeight500/"3fn Design"
    - _Requirements: 12, 13_

  - [x] 3.7 Implement nav accessibility hardening
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Verify banner landmark role (inherited from Base)
    - Add `aria-label` to nav element for screen reader discoverability
    - Verify no heading element rendered (existing contract)
    - Verify focus order: leading → center → trailing (inherited)
    - Verify all interactive elements meet `tapAreaRecommended` (44px)
    - _Requirements: 14_
    - _Contracts: accessibility_no_heading, accessibility_aria_roles, interaction_focus_order, accessibility_touch_target_

---

- [x] 4. Behavioral Contract Tests

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  **Agent**: Lina

  **Success Criteria:**
  - All Nav-Header-App contracts have passing tests
  - All NavAboutPopover contracts have passing tests
  - Border override test passes
  - Integration tests pass
  - `npm test` passes with no failures

  **Primary Artifacts:**
  - Nav-Header-App contract test file(s)
  - NavAboutPopover contract test file(s)
  - Integration test file(s)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/000-nav-header-app-hardening/completion/task-4-completion.md`
  - Summary: `docs/specs/000-nav-header-app-hardening/task-4-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 4 Complete: Behavioral Contract Tests"`
  - Verify: Check GitHub for committed changes

  - [x] 4.1 Write Nav-Header-App contract tests
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Test `visual_background_override`: setting `--nav-bg-override` changes background
    - Test `visual_background_override`: without override, uses `color.structure.canvas`
    - Test `visual_glow`: underglow always present without custom property
    - Test `visual_glow`: setting `--nav-glow-color` changes glow color
    - Test `accessibility_no_heading`: no h1–h6 in component DOM
    - Test border override: setting `--nav-border-color` changes border color
    - Test border default: default is `green400`, not `color.structure.border.subtle`
    - _Requirements: 15_

  - [x] 4.2 Write NavAboutPopover contract tests
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Test `interaction_pressable`: click opens, second click closes
    - Test `interaction_dismiss`: outside click closes
    - Test `interaction_dismiss`: Escape closes
    - Test `interaction_focus_order`: focus moves to first anchor on open
    - Test `interaction_focus_order`: focus returns to trigger on Escape close
    - Test `accessibility_aria_controls`: aria-expanded reflects state
    - Test `accessibility_aria_controls`: aria-controls matches panel ID
    - Test `animation_coordination`: animation plays on open
    - Test `animation_coordination`: no animation with prefers-reduced-motion
    - _Requirements: 15_

  - [x] 4.3 Write integration tests
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Test three custom properties coordinate (all set produces correct visual)
    - Test popover z-index above nav content
    - Test prefix hidden from accessible name
    - Test logo + credit renders in leading slot
    - _Requirements: 15_

---

- [x] 5. Documentation and MCP Updates

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  **Agent**: Lina + Thurgood (docs are Lina, MCP health check is Thurgood)

  **Success Criteria:**
  - README documents full public API including custom property coordination warning
  - component-meta.yaml updated with navigation context and production-ready purpose
  - Application MCP index rebuilt and health check passes
  - `get_component_full("Nav-Header-App")` returns accurate contracts, tokens, and metadata

  **Primary Artifacts:**
  - Nav-Header-App README
  - Updated `component-meta.yaml`
  - MCP health check results

  **Completion Documentation:**
  - Detailed: `.kiro/specs/000-nav-header-app-hardening/completion/task-5-completion.md`
  - Summary: `docs/specs/000-nav-header-app-hardening/task-5-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 5 Complete: Documentation and MCP Updates"`
  - Verify: Check GitHub for committed changes

  - [x] 5.1 Write Nav-Header-App README
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Document three CSS custom property overrides with default values
    - Include coordination warning (all three must update together during scroll)
    - Include correct/incorrect usage examples for `--nav-glow-color` (rgba with opacity)
    - Document `appearance` prop (opaque/translucent)
    - Document three slot regions (leading, center, trailing)
    - Document underglow as intrinsic (always present)
    - _Requirements: 16_

  - [x] 5.2 Update component-meta.yaml
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Lina
    - Add "navigation" to contexts list
    - Update purpose to reflect production-ready status
    - _Requirements: 16_

  - [x] 5.3 Rebuild Application MCP index and health check
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Rebuild Application MCP index
    - Run health check to verify no warnings or gaps
    - Verify `get_component_full("Nav-Header-App")` returns: 3 App-level contracts, 2 component tokens, updated metadata
    - Verify token consumers show Nav-Header-App for `navButton.padding.vertical` and `navHeader.padding.inline`
    - _Requirements: 16_

---
