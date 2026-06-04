# Requirements Document: Portfolio Web Authoring Compliance Audit & Cleanup

**Date**: 2026-06-01
**Spec**: 005 - Portfolio Web Authoring Compliance Audit & Cleanup
**Status**: Requirements Phase
**Dependencies**: @3fn/core 11.8.0 (Web-Authoring-Standards.md, Product-Token-Governance.md)

---

## Introduction

The portfolio site was built before Web-Authoring-Standards.md was formalized. This spec brings the existing portfolio into full compliance across CSS, HTML, and TypeScript — fixing violations, creating product tokens for all hard-coded tokenizable values, resolving bugs discovered during audit, and producing a lessons-learned document that informs the Astro migration (Spec 006).

The governing standards are:
- **Web-Authoring-Standards.md** — Hard Rules for CSS (logical properties, token-only values, focus patterns, reduced motion, high contrast mode)
- **Product-Token-Governance.md** — Product token authoring rules (naming schema, discovery workflow, categories)
- **platform-implementation-guidelines.md** — Accessibility semantics and interaction patterns

---

## Requirements

### Requirement 1: CSS Logical Properties

**User Story**: As a user with a right-to-left language preference, I want the portfolio layout to respect writing direction, so that the site is usable regardless of text directionality.

#### Acceptance Criteria

1. WHEN portfolio.css is inspected THEN the system SHALL contain zero physical directional properties (`left`, `right`, `top`, `bottom`, `margin-left`, `margin-right`, `margin-top`, `margin-bottom`, `padding-left`, `padding-right`, `padding-top`, `padding-bottom`, `border-left`, `border-right`, `border-top`, `border-bottom`, `width`, `height`, `max-width`, `min-width`) used for directional concerns.
2. WHEN a physical property is replaced THEN the system SHALL use the correct CSS logical equivalent (`inset-inline-start`, `inset-inline-end`, `inset-block-start`, `inset-block-end`, `margin-inline-start`, `margin-block-start`, `padding-inline-start`, `padding-block-start`, `border-inline-start`, `border-block-start`, `inline-size`, `block-size`, `max-inline-size`, `min-inline-size`).
3. WHEN the inline `<style>` block in index.html contains physical directional properties THEN the system SHALL replace them with logical equivalents.
4. IF a physical property is retained THEN the system SHALL document the rationale as a CSS comment explaining why physical positioning is required regardless of writing direction.

---

### Requirement 2: Token-Only Values

**User Story**: As a developer maintaining the portfolio, I want all visual values to reference design tokens, so that the site stays consistent with the design system and can be themed.

#### Acceptance Criteria

1. WHEN portfolio.css contains a hard-coded spacing, color, typography, motion, radius, border, shadow, or z-index value THEN the system SHALL replace it with a system token reference or a product token reference.
2. WHEN no system token (semantic or primitive) exists for a needed value THEN the system SHALL create a product token following Product-Token-Governance.md naming schema.
3. WHEN a product token is created THEN the system SHALL include a `rationale` field explaining why no system token fits.
4. WHEN color values are used in decorative animations or content-specific visualizations THEN the system SHALL create product tokens for those values (no exceptions for decorative intent).
5. IF a structural layout declaration has no token equivalent (e.g., `flex: 1`, `grid-template-columns`, `display: grid`) THEN the system SHALL retain the value without tokenization.

---

### Requirement 3: Focus Patterns

**User Story**: As a keyboard user, I want focus indicators to appear only during keyboard navigation, so that mouse interactions don't produce distracting outlines.

#### Acceptance Criteria

1. WHEN an element has a `:focus` selector for visual styling THEN the system SHALL replace it with `:focus-visible`.
2. WHEN the `.skip-to-content` element receives keyboard focus THEN the system SHALL display it using `:focus-visible` (not bare `:focus`).
3. WHEN NavHeaderContent link elements receive keyboard focus THEN the system SHALL display a focus indicator using `:focus-visible`.

---

### Requirement 4: Reduced Motion

**User Story**: As a user with motion sensitivity, I want animations and transitions to be suppressed when I've indicated that preference, so that the site doesn't cause discomfort.

#### Acceptance Criteria

1. WHEN `prefers-reduced-motion: reduce` is active THEN the system SHALL suppress all CSS transitions and animations.
2. WHEN portfolio.css contains a `transition` or `animation` declaration THEN the system SHALL have a corresponding `@media (prefers-reduced-motion: reduce)` rule that disables it.

---

### Requirement 5: High Contrast Mode (Forced Colors)

**User Story**: As a user relying on Windows High Contrast Mode, I want interactive elements to remain visible and distinguishable, so that I can navigate and use the site.

#### Acceptance Criteria

1. WHEN `forced-colors: active` is detected THEN the system SHALL provide visible borders or outlines for all interactive elements that have `role="button"` or are natively interactive (`<a>`, `<button>`).
2. WHEN `forced-colors: active` is detected AND an interactive element receives focus THEN the system SHALL display a focus indicator using system color keywords (`Highlight`, `ButtonText`).
3. The following elements SHALL have `forced-colors` handling: `.ecosystem__system` (role="button"), `.skip-to-content`, NavHeaderContent `.nav-link` elements, NavAboutPopover trigger and panel items.
4. IF an element has hover-only visual enhancement without `role` or keyboard activation (e.g., `.why-build__card`) THEN the system SHALL NOT require `forced-colors` handling.

---

### Requirement 6: HTML Semantic Structure

**User Story**: As a screen reader user, I want the page to use correct semantic HTML, so that I can navigate by landmarks and headings efficiently.

#### Acceptance Criteria

1. WHEN the page is inspected THEN the system SHALL have correct heading hierarchy (h1 → h2 → h3 → h4) with no skipped levels.
2. WHEN the page is inspected THEN the system SHALL use appropriate landmark elements (`<main>`, `<nav>`, `<footer>`, `<section>`).
3. WHEN an interactive element exists THEN the system SHALL use semantic HTML (`<button>`, `<a>`) rather than `<div>` with click handlers, unless the element already has appropriate `role` and keyboard handling.
4. WHEN the favicon path contains a double-slash typo THEN the system SHALL fix it.
5. WHEN `<script type="module">` tags include redundant `defer` attributes THEN the system SHALL remove the redundant attribute.

---

### Requirement 7: TypeScript Bug Fixes

**User Story**: As a portfolio visitor, I want all interactive features to function correctly, so that the site demonstrates quality craftsmanship.

#### Acceptance Criteria

1. WHEN `stats.ts` queries DOM elements for the count-up animation THEN the system SHALL use the correct selector (`.stats__value`, matching the HTML class).
2. WHEN the stats section is scrolled into view THEN the system SHALL trigger the count-up animation.
3. WHEN `page.ts` exists as dead code (duplicate import of NavHeaderContent already in `components.ts`) THEN the system SHALL remove it.
4. WHEN `.how-built__easter` contains a CSS syntax error (trailing comma in `box-shadow`) THEN the system SHALL fix the syntax error.

---

### Requirement 8: TypeScript Robustness

**User Story**: As a developer preparing for Astro migration, I want the TypeScript to follow safe DOM patterns, so that scripts can be extracted into islands without runtime errors.

#### Acceptance Criteria

1. WHEN `ecosystem.ts` queries inner modal elements (`modalDesc`, `modalHighlights`, `modalStats`, `modalViz`) THEN the system SHALL include null guards or early-return patterns rather than non-null assertions.
2. WHEN `ecosystem.ts` builds SVG connector content THEN the system SHALL build the string once and assign, rather than using `innerHTML +=` in a loop.

---

### Requirement 9: Product Component Compliance

**User Story**: As a user in high contrast mode, I want product-level web components to remain visible and interactive, so that the navigation works regardless of display settings.

#### Acceptance Criteria

1. WHEN `forced-colors: active` is detected THEN NavAboutPopover SHALL provide visible borders for the trigger button and panel items.
2. WHEN `forced-colors: active` is detected THEN NavHeaderContent SHALL provide visible styling for `.nav-link` elements.
3. WHEN NavHeaderContent link elements receive keyboard focus THEN the system SHALL display a `:focus-visible` indicator.

---

### Requirement 10: Lessons Learned Document

**User Story**: As the team preparing for Astro migration (Spec 006), I want a document capturing patterns, bugs, and architectural observations from this audit, so that Spec 006 can be planned with full context.

#### Acceptance Criteria

1. WHEN the compliance audit is complete THEN the system SHALL produce a lessons-learned document.
2. The lessons-learned document SHALL include: script organization patterns that need restructuring for Astro islands (export init functions, return cleanup functions), event listener cleanup gaps, shared utility extraction candidates, and any other findings relevant to Spec 006.
3. The lessons-learned document SHALL be placed at `.kiro/specs/005-portfolio-css-authoring-cleanup/lessons-learned.md`.

---

### Requirement 11: Visual Regression Prevention

**User Story**: As the portfolio owner, I want compliance changes to not break the visual appearance in standard display modes, so that the site continues to look correct.

#### Acceptance Criteria

1. WHEN logical property replacements are applied THEN the system SHALL produce no visual changes in left-to-right display mode.
2. WHEN `forced-colors` handling is added THEN the system SHALL produce intentional visual improvements in forced-colors mode only.
3. WHEN the stats bug is fixed THEN the system SHALL produce an intentional visual improvement (count-up animation now functions).
4. WHEN all changes are complete THEN the site SHALL build without errors.
