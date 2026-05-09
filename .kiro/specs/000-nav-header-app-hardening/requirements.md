# Requirements Document: Nav-Header-App Hardening

**Date**: 2026-05-08
**Spec**: 000 - Nav-Header-App Hardening
**Status**: Requirements Phase
**Dependencies**: None (first spec)

---

## Introduction

Nav-Header-App is the first DesignerPunk component consumed by a real product (DP-Portfolio). It is currently scaffold-only: a thin slot relay to Nav-Header-Base with one contract (`accessibility_no_heading`) and no tests. This spec promotes it to production-ready with behavioral contracts, accessibility compliance, a background/glow override mechanism, a companion one-off popover component, and the font family primitives needed for the portfolio's typography.

Key architectural principles:
- The component provides override hooks; the product provides the intelligence
- CSS custom properties are the public API for product-controlled theming
- The popover is a product-level one-off, not a design system component
- Font family primitives are updated upfront to establish correct rendering for all downstream work

---

## Requirements

### Requirement 1: Font Family Primitive Updates

**User Story**: As a product developer, I want the body and mono font families updated to Figtree and Commit Mono, so that all typography renders in the correct typeface from the start of development.

#### Acceptance Criteria

1. WHEN the token pipeline generates platform output THEN the system SHALL resolve `fontFamilyBody` to "Figtree".
2. WHEN the token pipeline generates platform output THEN the system SHALL resolve `fontFamilyMono` to "Commit Mono".
3. WHEN the web platform renders text using `fontFamilyBody` THEN the system SHALL load the Figtree variable font from `primitive-assets/Figtree-VariableFont_wght.ttf` (and italic variant).
4. WHEN the web platform renders text using `fontFamilyMono` THEN the system SHALL load Commit Mono from `primitive-assets/CommitMono-*.otf` (400/700 weights, regular/italic).
5. The display font (`fontFamilyDisplay` / Rajdhani) SHALL remain unchanged.

---

### Requirement 2: Semantic Token Creation

**User Story**: As a component developer, I want semantic tokens for navigation surface color and display label typography, so that the nav component and popover share encoded design intent rather than duplicated primitives.

#### Acceptance Criteria

1. The system SHALL provide a semantic color token `color.action.navigation.surface` that resolves to green100. (Light-mode only; dark-mode behavior deferred to Phase 3.)
2. The system SHALL provide a semantic typography token `typography.displayLabelMd` composed of: displayFont, fontSize150, fontWeight700, lineHeight150, letterSpacing100.
3. The system SHALL provide a semantic typography token `typography.displayLabelLg` composed of: displayFont, fontSize200, fontWeight700, lineHeight200, letterSpacing100.
4. The system SHALL provide a component token `navButton.padding.vertical` that resolves to space250.
5. The system SHALL provide a component token `navHeader.padding.inline` that resolves to space500.

---

### Requirement 3: Background Override Mechanism

**User Story**: As a product developer, I want to override the nav background color via a CSS custom property, so that I can implement scroll-linked color transitions without modifying the component.

#### Acceptance Criteria

1. Nav-Header-App SHALL expose a CSS custom property `--nav-bg-override`.
2. WHEN `--nav-bg-override` is set THEN Nav-Header-App SHALL use its value as the background color instead of the default `color.structure.canvas`.
3. WHEN `--nav-bg-override` is not set THEN Nav-Header-App SHALL use `color.structure.canvas` as the background color.
4. The `--nav-bg-override` custom property SHALL be documented in the component README as part of the public API.
5. The component SHALL NOT manage contrast — the product is responsible for updating text/icon colors when the background changes.

---

### Requirement 4: Underglow Effect

**User Story**: As a product developer, I want the nav bar to always display a soft underglow beneath it, so that the nav has a distinctive visual presence and separation from page content.

#### Acceptance Criteria

1. Nav-Header-App SHALL render an underglow effect with zero x/y offset, `blur200` (32px) blur radius, and `glowOpacity300` (0.4) opacity.
2. The default glow color SHALL be `glow.neonGreen` (green500).
3. Nav-Header-App SHALL expose a CSS custom property `--nav-glow-color`.
4. WHEN `--nav-glow-color` is set THEN the underglow SHALL use its value as the glow color.
5. WHEN `--nav-glow-color` is not set THEN the underglow SHALL use `glow.neonGreen` as the default color.
6. The underglow SHALL always be present (it is intrinsic to the component, not optional).

---

### Requirement 5: Border Color Override

**User Story**: As a product developer, I want to override the nav border color via a CSS custom property, so that the border can change in sync with the background during scroll transitions.

#### Acceptance Criteria

1. Nav-Header-App SHALL expose a CSS custom property `--nav-border-color`.
2. WHEN `--nav-border-color` is set THEN the separator border SHALL use its value as the border color.
3. WHEN `--nav-border-color` is not set THEN the separator border SHALL use `green400` as the default color, overriding the inherited `color.structure.border.subtle` from Nav-Header-Base.
4. The README SHALL document that `--nav-bg-override`, `--nav-glow-color`, and `--nav-border-color` must be updated in coordination during scroll transitions.

---

### Requirement 6: Horizontal Padding

**User Story**: As a product developer, I want Nav-Header-App to have horizontal padding on its content regions, so that slotted content doesn't touch the viewport edges.

#### Acceptance Criteria

1. Nav-Header-App SHALL apply `padding-inline` using component token `navHeader.padding.inline` (resolves to `space500` / 40px).
2. The padding SHALL be applied at the Nav-Header-App level, not on Nav-Header-Base.
3. Nav-Header-Base SHALL remain a pure slot relay with no padding of its own.

---

### Requirement 7: NavAboutPopover — Toggle Interaction

**User Story**: As a site visitor, I want to click the "About" button to open a section navigation dropdown, so that I can quickly jump to different sections of the page.

#### Acceptance Criteria

1. WHEN the user clicks or taps the "About" trigger button THEN the popover panel SHALL open.
2. WHEN the popover is open AND the user clicks the trigger button again THEN the popover SHALL close.
3. WHEN the popover is open AND the user clicks outside the popover THEN the popover SHALL close.
4. WHEN the popover is open AND the user presses Escape THEN the popover SHALL close.
5. The popover SHALL be positioned absolutely relative to the trigger button, dropping downward.
6. The popover panel SHALL use `role="navigation"` with `aria-label="Page sections"`.
7. Each popover item SHALL be an anchor link to a page section.

---

### Requirement 8: NavAboutPopover — Accessibility

**User Story**: As a screen reader user, I want the popover to announce its state and manage focus correctly, so that I can navigate the section links without confusion.

#### Acceptance Criteria

1. The trigger button SHALL have `aria-expanded` reflecting the popover's open/closed state.
2. The trigger button SHALL have `aria-controls` pointing to the popover panel's ID.
3. WHEN the popover opens THEN focus SHALL move to the first anchor link in the popover.
4. WHEN the popover closes via Escape THEN focus SHALL return to the trigger button.
5. WHEN the popover closes via outside click THEN focus SHALL NOT be forcibly moved (browser default behavior).

---

### Requirement 9: NavAboutPopover — Animation

**User Story**: As a site visitor, I want the popover to animate open and closed smoothly, so that the interaction feels polished and intentional.

#### Acceptance Criteria

1. WHEN the popover opens THEN it SHALL animate with a fade-in and slight translateY (slide down from trigger).
2. WHEN the popover closes THEN it SHALL animate with a fade-out and slight translateY (slide up toward trigger).
3. WHEN the user has `prefers-reduced-motion: reduce` enabled THEN the popover SHALL show/hide instantly without animation.

---

### Requirement 10: NavAboutPopover — Visual Design

**User Story**: As a product developer, I want the popover to use design system tokens for consistent styling, so that it aligns with the nav's visual language.

#### Acceptance Criteria

1. The trigger button background SHALL use `color.action.navigation.surface` when the popover is open (not on hover).
2. The trigger button hover state SHALL use `blend.hoverDarker` (8% darker) as the hover feedback. Hover does not apply when the popover is open (button shows `color.action.navigation.surface` instead).
3. The trigger button typography SHALL use `typography.displayLabelMd`.
4. The popover panel background SHALL use `color.action.navigation.surface`.
5. The popover panel SHALL have `padding-block` of `inset.200` (16px).
6. Each anchor link item SHALL have `padding-inline` of `space300` (24px) and `padding-block` of `inset.100` (8px).
7. Each anchor link item typography SHALL use `typography.displayLabelLg`.
8. The popover SHALL stack above the nav using `zIndex.dropdown` (300).

---

### Requirement 11: Submenu Prefix Pattern

**User Story**: As a screen reader user, I want decorative prefixes (`//`, `!!`) on submenu items to be hidden from my reading experience, so that I hear clean link text without noise.

#### Acceptance Criteria

1. Each submenu item SHALL render its prefix (`//` or `!!`) as a separate element with `aria-hidden="true"`.
2. The prefix and label text SHALL be siblings with `grouped.tight` (4px) spacing between them.
3. Screen readers SHALL announce only the label text, not the prefix characters.
4. The prefix element SHALL have a fixed width so that label text aligns consistently regardless of prefix content.

---

### Requirement 12: Decorative Elements

**User Story**: As a product developer, I want platform icons and outbound link icons to be properly marked as decorative, so that they don't create screen reader noise.

#### Acceptance Criteria

1. Platform icons (web, Apple, Android) in the center slot SHALL have `aria-hidden="true"`.
2. Platform icons SHALL NOT be interactive.
3. The outbound link icon (external-link) SHALL be an Icon-Base instance using the SVG from `primitive-assets/external-link.svg`.
4. The outbound link icon SHALL have `aria-hidden="true"`.

---

### Requirement 13: Logo Lockup

**User Story**: As a site visitor, I want to see the DesignerPunk brand mark and attribution in the nav's leading region, so that I know whose portfolio this is.

#### Acceptance Criteria

1. The leading slot SHALL display the DesignerPunk logo from `primitive-assets/designerPunkLogo.svg`.
2. The leading slot SHALL display "by 3fn Design" credit text using `typography.caption`.
3. The credit text "by" SHALL use fontWeight400.
4. The credit text "3fn Design" SHALL use fontWeight500.

---

### Requirement 14: Nav-Header-App Accessibility

**User Story**: As a screen reader user, I want the nav to be a proper landmark with correct focus order, so that I can navigate to and within it efficiently.

#### Acceptance Criteria

1. Nav-Header-App SHALL render with banner landmark role (inherited from Nav-Header-Base).
2. Nav-Header-App SHALL NOT render a heading element (`accessibility_no_heading` contract).
3. The nav element SHALL have an `aria-label` providing discoverability without heading hierarchy side effects.
4. Focus order within the nav SHALL flow: leading → center → trailing (inherited `interaction_focus_order` contract).
5. All interactive elements within the nav SHALL meet minimum touch target size (`tapAreaRecommended` / 44px).

---

### Requirement 15: Behavioral Contract Tests

**User Story**: As a component maintainer, I want behavioral contract tests for all Nav-Header-App contracts, so that regressions are caught automatically.

#### Acceptance Criteria

1. The system SHALL have tests verifying the `visual_background_override` contract (custom property overrides background).
2. The system SHALL have tests verifying the `visual_glow` contract (underglow always present, color responds to custom property).
3. The system SHALL have tests verifying the `accessibility_no_heading` contract (no heading element in DOM).
4. The system SHALL have tests verifying NavAboutPopover's `interaction_pressable` contract (click toggles open/close).
5. The system SHALL have tests verifying NavAboutPopover's `interaction_dismiss` contract (outside click and Escape close).
6. The system SHALL have tests verifying NavAboutPopover's `interaction_focus_order` contract (focus to first link on open, return to trigger on close).
7. The system SHALL have tests verifying NavAboutPopover's `accessibility_aria_controls` contract (aria-expanded and aria-controls present and correct).
8. The system SHALL have tests verifying NavAboutPopover's `animation_coordination` contract (animation respects prefers-reduced-motion).
9. The system SHALL have tests verifying that `--nav-border-color` overrides the separator border color.

---

### Requirement 16: Component Documentation and MCP Updates

**User Story**: As a product developer consuming Nav-Header-App, I want comprehensive documentation of the component's public API and accurate MCP metadata, so that I can use it correctly and agents querying the Application MCP get current data.

#### Acceptance Criteria

1. The Nav-Header-App README SHALL document the three CSS custom property overrides (`--nav-bg-override`, `--nav-glow-color`, `--nav-border-color`) including their default values and coordination requirements.
2. The README SHALL include a warning that the three custom properties must be updated in coordination during scroll transitions.
3. The README SHALL document the `appearance` prop (opaque/translucent modes).
4. The README SHALL document the three slot regions (leading, center, trailing).
5. The `component-meta.yaml` SHALL include "navigation" in its contexts list.
6. The `component-meta.yaml` purpose SHALL be updated to reflect production-ready status.
7. The `contracts.yaml` SHALL define all 3 Nav-Header-App-level contracts: `accessibility_no_heading`, `visual_background_override`, `visual_glow`.
8. The `schema.yaml` SHALL document the CSS custom property API (`--nav-bg-override`, `--nav-glow-color`, `--nav-border-color`) as part of the component's public interface.
9. WHEN all implementation is complete THEN the Application MCP index SHALL be rebuilt and a health check SHALL confirm Nav-Header-App's contracts, tokens, and metadata are accurately served.
10. WHEN querying `get_component_full("Nav-Header-App")` THEN the response SHALL include the new contracts, component tokens (`navButton.padding.vertical`, `navHeader.padding.inline`), and updated metadata.

---
