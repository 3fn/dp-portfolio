# Requirements Document: Rosetta Documentation Page

**Date**: 2026-06-12
**Spec**: 008 - Rosetta Documentation Page
**Status**: Requirements Phase
**Dependencies**: Spec 006 ✅

---

## Introduction

A deep-dive documentation page for Rosetta — the token system — that tells the story of why the architecture exists, what problems it solves, and what it enables. The page serves both design systems practitioners evaluating the architecture and technical evaluators assessing Peter's systems thinking. It lives at `/docs/rosetta`, linked from the ecosystem Rosetta card on the portfolio index.

---

## Requirements

### Requirement 1: Page Structure & Layout

**User Story**: As a visitor, I want to navigate the Rosetta documentation with clear orientation, so that I can find the section relevant to my interest without reading sequentially.

#### Acceptance Criteria

1. WHEN `/docs/rosetta` is loaded THEN the system SHALL render a three-column layout: nav rail (left), narrative content (center), sticky visualization (right).
2. WHEN the nav rail is hovered/focused THEN it SHALL expand from collapsed state (80px) to full width (260px) revealing beat labels.
3. WHEN the user scrolls through the narrative THEN the nav rail SHALL highlight the current beat.
4. WHEN a nav rail item is clicked or activated via keyboard THEN the page SHALL scroll to that beat.
5. WHEN the page is loaded with a URL hash (e.g., `/docs/rosetta#beat-architecture`) THEN it SHALL scroll to that beat AND set the visualization to the corresponding state.

---

### Requirement 2: Narrative Content

**User Story**: As a design systems practitioner, I want to understand what makes Rosetta architecturally distinct, so that I can evaluate whether this approach solves problems I've experienced.

#### Acceptance Criteria

1. WHEN the narrative is read THEN it SHALL progress through four beats: Problem → Principle → Architecture → Payoff.
2. WHEN Beat 1 is read THEN it SHALL describe four specific failure modes (drift, arbitrariness, platform divergence, missing audit trail).
3. WHEN Beat 2 is read THEN it SHALL explain "explicit, traceable origin" as the unifying principle across token types (formula-based, categorical, compositional, referential).
4. WHEN Beat 3 is read THEN it SHALL describe the six-stage pipeline with each stage mapped to the failure mode it addresses.
5. WHEN Beat 4 is read THEN it SHALL describe capabilities the architecture enables (portable pipeline, themes, governance, AI queryability) AND include the data narrative: "768 source tokens produce 3,000+ platform-ready outputs for web, iOS, Android, and canvas-based tools."

---

### Requirement 3: Scroll-Driven Visualization

**User Story**: As a visitor, I want the architecture to be visually reinforced as I read, so that I can understand relationships and structure without parsing text alone.

#### Acceptance Criteria

1. WHEN the user scrolls through beats THEN the visualization panel SHALL transition between 5 states (intro + 4 beats) via CSS transitions.
2. WHEN a beat transition occurs THEN SVG nodes SHALL animate position, radius, and stroke color (0.5–0.6s transitions).
3. WHEN a beat transition occurs THEN connection lines SHALL be redrawn to show the relationships relevant to that beat.
4. WHEN Beat 4 is reached THEN connection lines SHALL animate with a draw-on-scroll effect (CSS `stroke-dashoffset`).
5. WHEN labels are in their active beat THEN they SHALL fade in at 20% scroll progress, remain full opacity 20–80%, and fade out at 80–100%.

---

### Requirement 4: Tooltip Interaction

**User Story**: As a visitor wanting deeper detail, I want to explore individual elements without the base view being cluttered, so that I get depth on demand.

#### Acceptance Criteria

1. WHEN a node is hovered or tapped THEN a tooltip SHALL appear with contextual content specific to that node and current beat.
2. WHEN the tooltip is displayed THEN it SHALL follow the cursor position and use the node's color as its border accent.
3. WHEN a node receives keyboard focus (Tab) THEN the tooltip SHALL appear (sighted keyboard users).
4. WHEN the user scrolls THEN any open tooltip SHALL dismiss.

---

### Requirement 5: Accessibility

**User Story**: As a user with assistive technology or accessibility needs, I want the page to be navigable and understandable, so that I'm not excluded from the documentation.

#### Acceptance Criteria

1. WHEN the page is rendered THEN the visualization panel SHALL have `aria-hidden="true"` (decorative reinforcement — narrative stands alone).
2. WHEN the nav rail is inspected THEN it SHALL use `<nav>` with keyboard-navigable links and `aria-current` tracking.
3. WHEN `prefers-reduced-motion: reduce` is active THEN all transitions SHALL be disabled and the visualization SHALL show its final state immediately.
4. WHEN forced-colors mode is active THEN interactive elements (nav links, tooltip triggers) SHALL remain visible.
5. WHEN the page structure is inspected THEN it SHALL use semantic HTML (`<main>`, `<article>`, `<section aria-labelledby>` per beat).
6. WHEN a skip link is activated THEN it SHALL bypass the nav rail to main content.

---

### Requirement 6: Responsive & Print

**User Story**: As a visitor on a mobile device or printing the page, I want content to remain accessible and readable.

#### Acceptance Criteria

1. WHEN viewport is ≤1023px THEN the layout SHALL collapse to single-column (nav rail hidden, visualization as static SVG or hidden).
2. WHEN the page is printed THEN the nav rail and visualization SHALL be hidden and the narrative SHALL render as a single readable column.
3. WHEN the SVG is rendered at wide viewports (>2000px) THEN it SHALL maintain aspect ratio via `preserveAspectRatio="xMidYMid meet"`.

---

### Requirement 7: Performance

**User Story**: As a visitor on a lower-end device, I want the page to remain smooth during scrolling.

#### Acceptance Criteria

1. WHEN scroll-driven effects are active THEN the page SHALL maintain ≥30 FPS on baseline devices.
2. IF FPS drops below threshold THEN the system SHALL degrade gracefully (reduce transitions or skip label opacity interpolation).
3. WHEN page weight is measured THEN the visualization JS SHALL be ≤5KB minified (no D3 or heavy dependencies).

---

### Requirement 8: Web Authoring Compliance

**User Story**: As a developer maintaining this page, I want it compliant with DesignerPunk standards from day one.

#### Acceptance Criteria

1. WHEN CSS is inspected THEN it SHALL use logical properties, system/product tokens, and follow Web-Authoring-Standards.
2. WHEN new values are introduced THEN they SHALL follow System-First Value Selection (query system tokens before creating product tokens).
3. WHEN product tokens are created THEN they SHALL include rationale and follow Product-Token-Governance naming conventions.
4. WHEN the page's color palette is inspected THEN Rosetta's cyan (`cyan200` system primitive) SHALL be the dominant accent, and the visualization panel SHALL use `black400` for its background.

---

### Requirement 9: Integration

**User Story**: As a portfolio visitor, I want to discover the Rosetta documentation naturally, so that the deep dive is accessible from the overview.

#### Acceptance Criteria

1. WHEN the ecosystem section's Rosetta card is clicked THEN it SHALL navigate to `/docs/rosetta`.
2. WHEN `product/experience-map/pages/docs/rosetta.yaml` is inspected THEN it SHALL define the page (sections, audience, visual reference).
3. WHEN `product/overview.yaml` is inspected THEN `/docs/rosetta` SHALL be listed as an active page.

---

### Requirement 10: Content Accuracy

**User Story**: As a practitioner, I want claims on this page to be verifiable, so that I trust the documentation.

#### Acceptance Criteria

1. WHEN the narrative references token counts, pipeline stages, or validation thresholds THEN they SHALL match actual system data (verified against source).
2. WHEN token names are shown in visualizations or tooltips THEN they SHALL be real token names from the system (curated for clarity, not invented).
3. WHEN platform output formats are shown THEN they SHALL be accurate (OKLCH format for CSS, Swift, Kotlin as of v12).
