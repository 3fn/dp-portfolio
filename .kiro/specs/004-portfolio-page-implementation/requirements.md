# Requirements Document: Portfolio Page Implementation

**Date**: 2026-05-26
**Spec**: 004-portfolio-page-implementation
**Status**: Requirements Phase
**Dependencies**: Spec 002 (token compliance audit), Spec 003 (screen specification + product tokens)

---

## Introduction

This spec implements the DesignerPunk portfolio page — a single-page marketing site showcasing the design system. The implementation consumes the screen specification (`portfolio.yaml`) as its source of truth, using DesignerPunk system and product tokens for all visual properties, and the prototype (`hero-exploration.html`) as the visual reference.

The page is web-only (iOS/Android: not applicable). It targets hiring managers, design system professionals, and engineering leaders.

---

## Requirements

### Requirement 1: Semantic HTML Structure

**User Story**: As a screen reader user, I want the page to have proper semantic structure, so that I can navigate efficiently using landmarks and headings.

#### Acceptance Criteria

1. WHEN the page loads THEN the document SHALL contain exactly 11 landmark regions: 1 nav, 1 main (wrapping all sections), 8 sections, and 1 footer.
2. WHEN the page loads THEN the document SHALL contain exactly 1 `<h1>` element with content "The design system built for AI-Human collaboration".
3. WHEN the page loads THEN the heading hierarchy SHALL follow h1 → h2 → h3 → h4 without skipping levels.
4. WHEN the page loads THEN a skip-to-content link SHALL be the first focusable element in the body, targeting `#hero`.
5. WHEN the skip-to-content link receives focus THEN it SHALL become visually visible.

---

### Requirement 2: Token Compliance

**User Story**: As a design system maintainer, I want all visual properties to use design tokens, so that the page remains consistent with the system and responds to theme changes.

#### Acceptance Criteria

1. The page SHALL use zero hard-coded color, spacing, typography, radius, border-width, shadow, opacity, or duration values except where documented as application-level exceptions.
2. WHEN system tokens are available for a visual property THEN the implementation SHALL use the system token CSS custom property.
3. WHEN a product token exists for a layout concern THEN the implementation SHALL use the product token CSS custom property.
4. The CSS load order SHALL be: DesignTokens.web.css → ProductTokens.web.css → font CSS → page stylesheet.
5. IF a value cannot be expressed as a token THEN it SHALL be documented as an accepted exception with rationale.

**Accepted Deviations**:
- Canvas rendering colors (chord diagram, career chart) use application-level palette objects — not tokenizable in canvas 2D context
- Footer muted text color (`rgba(255,255,255,0.6)`) — no semantic token for footer text on dark backgrounds
- Ecosystem connector colors (cyan-200, green-200, `#FCF680`) — application-level visualization colors
- Canvas font sizes (7-10px) — below type scale, documented exception for data visualization
- `line-height: 1.1`, `1.24`, `1.52`, etc. — unitless line-heights not in token system

---

### Requirement 3: Responsive Layout

**User Story**: As a user on any device, I want the page to adapt to my viewport, so that content is readable and usable at any screen size.

#### Acceptance Criteria

1. WHEN viewport width is ≥1024px (desktop) THEN the layout SHALL use a 12-column grid with `product-layout-content-max-width` max-width.
2. WHEN viewport width is 768px–1023px (tablet) THEN the layout SHALL adapt to an 8-column grid with appropriate column reductions.
3. WHEN viewport width is <768px (mobile) THEN the layout SHALL use a 4-column single-column stacked layout.
4. WHEN the viewport is resized THEN all sections SHALL reflow without horizontal overflow or content clipping.
5. The content column SHALL be centered with `product-layout-content-indent` inline padding.

---

### Requirement 4: Interactions — Ecosystem Modal

**User Story**: As a visitor, I want to click ecosystem cards to see detailed information about each system, so that I can understand the DesignerPunk architecture.

#### Acceptance Criteria

1. WHEN a user clicks an ecosystem system card THEN a modal SHALL open with a FLIP animation from the card's position to centered viewport position.
2. WHEN the modal is open THEN focus SHALL be trapped within the modal (background content set to `inert`).
3. WHEN the user presses Escape, clicks the backdrop, or clicks the close button THEN the modal SHALL close with a reverse FLIP animation back to the triggering card.
4. WHEN the modal closes THEN focus SHALL return to the triggering card element.
5. The modal SHALL have `role="dialog"` and `aria-modal="true"`.
6. WHEN `prefers-reduced-motion: reduce` is active THEN the modal SHALL open/close instantly (opacity only, no transform animation).
7. WHEN a user activates an ecosystem card via keyboard (Enter/Space) THEN the modal SHALL open identically to click activation.

---

### Requirement 5: Interactions — Chord Diagram

**User Story**: As a visitor, I want to explore the chord diagram to understand system relationships, so that I can see how DesignerPunk's components connect.

#### Acceptance Criteria

1. WHEN the chord diagram canvas is 10% visible in the viewport THEN the animation loop SHALL start via IntersectionObserver.
2. WHEN the canvas exits the viewport THEN the requestAnimationFrame loop SHALL be cancelled (paused).
3. WHEN the canvas re-enters the viewport THEN the animation loop SHALL resume.
4. WHEN a user hovers a node THEN connected chords SHALL increase opacity and a tooltip SHALL appear.
5. WHEN a user drags the center root node THEN the diagram SHALL rotate following the mouse angle.
6. WHEN `prefers-reduced-motion: reduce` is active THEN the diagram SHALL render statically (no spin, no pulse dots). Hover and drag SHALL remain functional.

---

### Requirement 6: Interactions — Career Chart

**User Story**: As a visitor, I want to see Peter's career timeline, so that I can understand his professional background.

#### Acceptance Criteria

1. WHEN the career chart canvas is 100% visible in the viewport THEN the grow animation SHALL begin.
2. WHEN the animation completes (animT reaches 1.0) AND no hover is active THEN the requestAnimationFrame loop SHALL stop.
3. WHEN a user hovers a career segment THEN a tooltip SHALL appear with employer details and the segment SHALL highlight.
4. WHEN `prefers-reduced-motion: reduce` is active THEN bars SHALL render at full height immediately (no grow animation).
5. A visually-hidden data table SHALL provide equivalent career information for screen reader users.

---

### Requirement 7: Interactions — Agent Portraits

**User Story**: As a visitor, I want to see which agent corresponds to which role, so that I can understand the team structure.

#### Acceptance Criteria

1. WHEN a user hovers an agent list item THEN the corresponding portrait element in the SVG SHALL highlight (opacity 1, others 0.3) and the portrait's `<object>` SHALL switch from `mix-blend-mode: luminosity` to `normal`.
2. WHEN the user stops hovering THEN all portraits SHALL reset to luminosity blend mode and full opacity.
3. IF any portrait `<object>` fails to load THEN the interaction SHALL be disabled gracefully (portraits remain in luminosity mode).
4. The interaction SHALL be hover-only (enhancement). No keyboard equivalent is required — agent information is fully accessible via the text list.

---

### Requirement 8: Interactions — Easter Eggs

**User Story**: As a visitor, I want to discover playful hidden messages, so that the page feels personal and engaging.

#### Acceptance Criteria

1. WHEN a user hovers the "Why build this system?" heading THEN the easter egg text "Because why not!?" SHALL appear with a neon-flicker animation.
2. WHEN a user hovers the "How was this system built?" heading THEN the easter egg text "Hard $#@%ing work!" SHALL appear with a pink neon-flicker animation.
3. The easter egg mechanism SHALL be CSS-only (adjacent sibling selector, no JavaScript).
4. WHEN `prefers-reduced-motion: reduce` is active THEN easter eggs SHALL appear instantly at full opacity with full glow (no flicker keyframe).
5. Easter egg text SHALL have `aria-hidden="true"`.

---

### Requirement 9: Accessibility

**User Story**: As a user with disabilities, I want the page to be fully accessible, so that I can consume all content regardless of my abilities.

#### Acceptance Criteria

1. All decorative elements (illustrations, canvases, section prefixes, separators) SHALL have `aria-hidden="true"`.
2. The chord diagram SHALL have an adjacent visually-hidden description summarizing its purpose.
3. The career chart SHALL have an adjacent visually-hidden data table with employer, period, design%, and engineering% columns.
4. All external links SHALL include "(opens in new tab)" in their accessible name via `aria-label`.
5. Ecosystem cards SHALL be keyboard-activatable (role="button" or `<button>` wrapper, Enter/Space triggers modal).
6. WHEN `prefers-reduced-motion: reduce` is active THEN all animations SHALL be disabled — elements render in final state immediately, transitions have zero duration.
7. The nav SHALL have `aria-label="Site navigation"`.

---

### Requirement 10: Performance

**User Story**: As a visitor on any connection speed, I want the page to load quickly, so that I don't abandon it before seeing the content.

#### Acceptance Criteria

1. Critical CSS (nav + hero styles) SHALL be inlined in a `<style>` block in `<head>` for fastest first paint.
2. The CTA background image SHALL be lazy-loaded via IntersectionObserver (class applied when section enters viewport).
3. All scripts SHALL use the `defer` attribute.
4. Canvas scripts (chord, career) SHALL initialize only when their container enters the viewport (IntersectionObserver).
5. All fonts SHALL use `font-display: swap` to prevent FOIT.
6. All SVG illustrations SHALL use `<object type="image/svg+xml">` (not `<img>`).

---

### Requirement 11: CSS Architecture

**User Story**: As a developer maintaining this page, I want a clear, single-file CSS architecture, so that styles are predictable and easy to update.

#### Acceptance Criteria

1. The page SHALL use a single combined stylesheet (`portfolio.css`) for all non-critical styles.
2. The stylesheet SHALL maintain logical separation via comments (layout, sections, interactions, responsive, utilities).
3. All layout spacing SHALL use CSS logical properties (`padding-inline`, `margin-block`, etc.).
4. The token cascade SHALL flow: system tokens → product tokens → font declarations → page styles.

---

### Requirement 12: Build System

**User Story**: As a developer, I want the build system to handle all scripts and produce optimized output, so that deployment is straightforward.

#### Acceptance Criteria

1. The esbuild configuration SHALL include entry points for: scroll-nav, reveal, stats, chord, career, ecosystem, agents, components.
2. Output SHALL be ES2022 modules in `dist/scripts/`.
3. The `dev` script SHALL serve the site locally with watch mode.
4. The `build:page` script SHALL produce production-ready bundles.

---

## Documentation Requirements

**Waiver**: This spec introduces no new tokens or components. All tokens exist from Spec 003. The only Stemma component consumed (`Button-CTA`) is already documented. Documentation requirements are waived per the "purely implementation with no API changes" condition.
