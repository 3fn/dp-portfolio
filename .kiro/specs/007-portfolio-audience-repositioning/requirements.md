# Requirements Document: Portfolio Audience Repositioning

**Date**: 2026-06-04
**Spec**: 007 - Portfolio Audience Repositioning
**Status**: Requirements Phase
**Dependencies**: Spec 005 ✅; before Spec 006

---

## Introduction

The portfolio is being repositioned from "enterprise-grade" to "built for 0-to-1 teams." This involves replacing the enterprise section with a new audience section, enhancing the "Why Build" section with scroll-driven visual storytelling, expanding the stats bar to full-bleed, removing all residual enterprise language, and updating the Product MCP to reflect the new positioning.

Governing standards: Web-Authoring-Standards.md, Product-Token-Governance.md (System-First Value Selection), platform-implementation-guidelines.md.

---

## Requirements

### Requirement 1: Audience Section Content

**User Story**: As a portfolio visitor (small team founder, solo developer), I want to immediately understand that DesignerPunk is built for me, so that I can assess fit without wading through enterprise-oriented messaging.

#### Acceptance Criteria

1. WHEN the portfolio page loads THEN the system SHALL display a section titled "Who is this system built for?" in place of the former "What makes this system enterprise-grade?" section.
2. WHEN the audience section is displayed THEN the system SHALL show the hook "Headcount isn't destiny." using `typography.display` system semantic.
3. WHEN the audience section is displayed THEN the system SHALL show a 2×3 grid of benefit cards with the following items: Accessibility from Day One, Three platforms one source, Consistency without the overhead, Governance that enforces itself, AI that ships quality, Code-Design sync.
4. WHEN the audience section is displayed THEN the system SHALL show persona statements below the grid.
5. WHEN the audience section is displayed THEN the system SHALL show the closer: "A small team builds great things. DesignerPunk makes sure they scale."

---

### Requirement 2: Why Build Section Enhancement

**User Story**: As a portfolio visitor, I want to experience the evolution of token naming visually as I scroll, so that I understand *why* a structured system matters without reading dense explanatory text.

#### Acceptance Criteria

1. WHEN the "Why build this system?" section is displayed THEN the system SHALL use a two-column layout with copy on the left and a sticky token animation cluster on the right.
2. WHEN the user scrolls through the section THEN the token cluster SHALL transition through four phases: Chaos (rotated, mixed conventions) → Straightened (aligned, still chaotic names) → Primitive (mathematical scale) → Semantic (intent-driven names).
3. WHEN Phase 1 is displayed THEN all 16 tokens SHALL have unique values — no duplicates. Phase 1 values SHALL represent diverse, inconsistent naming conventions (mixed prefixes, cases, and categories).
4. WHEN the user scrolls back up THEN the animation SHALL reverse through the phases.
5. WHEN Phase 3→4 transitions occur THEN each primitive token SHALL correctly resolve to its actual semantic reference in the system.
6. WHEN the left column copy is displayed THEN it SHALL contain three subsections: Challenge, Insight & Thesis, and Goals.

---

### Requirement 3: Reduced Motion Accessibility

**User Story**: As a user with motion sensitivity, I want the token animation to respect my preferences, so that the page doesn't cause discomfort.

#### Acceptance Criteria

1. WHEN `prefers-reduced-motion: reduce` is active THEN the token cluster SHALL display Phase 4 (semantic names) immediately with no transitions or scroll-driven changes.
2. WHEN `prefers-reduced-motion: reduce` is active THEN the flap token pills SHALL render without rotation (no `transform: rotate()`).

---

### Requirement 4: Stats Bar Full-Bleed

**User Story**: As a portfolio visitor, I want the stats bar to span the full viewport width, so that it creates a strong visual break between page sections.

#### Acceptance Criteria

1. WHEN the stats section is rendered THEN its background and borders SHALL extend to the full viewport width.
2. WHEN the stats section is rendered THEN its content (`.stats__grid`) SHALL remain constrained at `contentMaxWidth` (1336px) with auto margins.

---

### Requirement 5: Enterprise Language Removal

**User Story**: As a portfolio visitor, I want consistent messaging throughout the page, so that I'm not confused by mixed positioning (enterprise vs. small teams).

#### Acceptance Criteria

1. WHEN the page is inspected THEN the system SHALL contain zero instances of "enterprise-grade", "enterprise-tier", or "enterprise-ready" in visible content.
2. WHEN the hero description is displayed THEN it SHALL not reference "enterprise."
3. WHEN the CTA section is displayed THEN it SHALL not reference "enterprise."
4. WHEN Goal #1 in the Why Build section is displayed THEN it SHALL not reference "enterprise-tier."
5. WHEN CSS classes are inspected THEN `.enterprise__*` class names SHALL be replaced with `.audience__*` equivalents.

---

### Requirement 6: Web Authoring Standards Compliance

**User Story**: As a developer maintaining the portfolio, I want all new code to comply with Web-Authoring-Standards from the start, so that no cleanup pass is needed later.

#### Acceptance Criteria

1. WHEN new CSS is written for the audience section THEN it SHALL use logical properties exclusively for directional concerns.
2. WHEN new values are introduced THEN they SHALL reference system tokens (semantic first, then primitive) or existing product tokens. Product tokens created only when no system token covers the need per System-First Value Selection.
3. WHEN interactive elements exist in new sections THEN they SHALL have `forced-colors` handling.
4. WHEN the token animation script is created THEN it SHALL include `aria-labelledby` on the section and use semantic HTML.

---

### Requirement 7: Token Animation Script

**User Story**: As a developer preparing for Astro migration, I want the token animation script to be modular and cleanable, so that Spec 006 can wrap it as an island without rewriting.

#### Acceptance Criteria

1. WHEN the token animation script is created THEN it SHALL export an `init()` function and a `cleanup()` function.
2. WHEN `cleanup()` is called THEN it SHALL remove all event listeners (scroll, resize) and cancel any pending operations.
3. WHEN the script is loaded THEN it SHALL use `{ passive: true }` on scroll listeners.
4. WHEN the script references token phase data THEN it SHALL store `data-states` configuration in a separate data structure (not inline HTML attributes only).

---

### Requirement 8: Product MCP Update

**User Story**: As an AI agent consuming the Product MCP, I want to receive accurate positioning context, so that I produce content aligned with the 0-to-1 framing rather than enterprise framing.

#### Acceptance Criteria

1. WHEN `product/overview.yaml` is read THEN its description, domain, and principles SHALL reflect 0-to-1 positioning (not enterprise).
2. WHEN the experience map references the portfolio page THEN it SHALL use 0-to-1 language.
3. WHEN any agent queries the Product MCP for product context THEN the returned framing SHALL be consistent with "small teams competing with enterprise infrastructure."

---

### Requirement 9: GitHub README Update

**User Story**: As a developer browsing the GitHub repository, I want to quickly understand who DesignerPunk is for, so that I can assess if it's relevant to my project.

#### Acceptance Criteria

1. WHEN the README is read THEN it SHALL include a "Who is this for?" section with the four persona statements.
2. WHEN the README positioning is read THEN it SHALL complement (not duplicate) the portfolio page content.
3. WHEN the README references DesignerPunk's audience THEN it SHALL not use "enterprise" framing.

---

### Requirement 10: Visual Consistency

**User Story**: As a portfolio visitor, I want the new sections to feel visually integrated with the rest of the page, so that the site reads as a cohesive whole.

#### Acceptance Criteria

1. WHEN the audience section grid is rendered THEN it SHALL use the same grid gaps (`space500` × `space900`) as the existing page pattern.
2. WHEN section headings are rendered THEN they SHALL use the existing `.section-prefix` pattern.
3. WHEN the audience grid cards are rendered THEN they SHALL be flat text items (no noise texture, no box-shadow) — intentionally simpler than ecosystem cards.
4. WHEN persona border-left treatment is rendered THEN it SHALL reuse the existing `quoteBorderWidth` product token.
