# Requirements Document: Portfolio Page Architecture

**Date**: 2026-05-10
**Spec**: 001 - Portfolio Page Architecture
**Status**: Requirements Phase
**Dependencies**: Spec 000 (Nav-Header-App Hardening) ✅ Complete

---

## Introduction

This spec establishes the page architecture for the DP-Portfolio product — the first product consuming the DesignerPunk design system. It delivers shared behaviors (scroll-linked nav theming, reveal animations, responsive foundation), builds out simple page sections, and scaffolds sections whose complex content is deferred to later specs (Hero chord diagram → Spec 002, Ecosystem → Spec 003, Career Timeline → Spec 004).

Key architectural principles:
- Product-level JavaScript provides scroll intelligence; Nav-Header-App provides the theming hooks
- CSS-first animations with `prefers-reduced-motion` respect from day one
- Semantic tokens over primitives for all text colors and interactive elements
- Full-bleed section backgrounds with constrained content columns
- Phased implementation with named checkpoints for iterative review

---

## Requirements

### Requirement 1: `color.action.primary` Local Override

**User Story**: As a product developer, I want the portfolio's primary action color to be pink instead of the system default cyan, so that all interactive components render in the portfolio's brand color.

#### Acceptance Criteria

1. The local `src/tokens/semantic/ColorTokens.ts` SHALL define `color.action.primary` referencing `pink300`.
2. This change SHALL NOT affect the `@3fn/core` package default (remains `cyan300`).
3. All components consuming `color.action.primary` (Button-CTA, Button-Icon, Chips, Inputs) SHALL render with `pink300` in this product.

---

### Requirement 2: Button-CTA Polymorphic Rendering

**User Story**: As a product developer, I want Button-CTA to render as an `<a>` element when given an `href` prop, so that outbound links have correct semantics while maintaining button visual styling.

#### Acceptance Criteria

1. WHEN `href` prop is set THEN Button-CTA SHALL render as an `<a>` element with the provided URL.
2. WHEN `href` prop is not set THEN Button-CTA SHALL render as a `<button>` element (existing behavior unchanged).
3. WHEN rendering as `<a>` with `target="_blank"` THEN the element SHALL include `rel="noopener noreferrer"`.
4. WHEN rendering as `<a>` THEN keyboard activation SHALL respond to Enter only (not Space), matching native link behavior.
5. The `href` prop SHALL be documented in `Button-CTA.schema.yaml` as an optional string.
6. A behavioral contract SHALL document the dual-render behavior.
7. All existing Button-CTA tests SHALL continue passing without modification.
8. New tests SHALL verify the `<a>` rendering path (role, keyboard behavior, target/rel attributes).
9. The Button-CTA README SHALL document the `href` prop and polymorphic behavior.
10. The outbound icon pattern SHALL use existing `icon` and `iconPosition` props explicitly — no automatic icon rendering based on `target="_blank"`.

---

### Requirement 3: Page Layout Architecture

**User Story**: As a site visitor, I want the page to display as full-bleed colored sections with centered content, so that each section has a distinct visual identity while content remains readable.

#### Acceptance Criteria

1. Each page section SHALL render as a full-viewport-width container with its own background treatment.
2. Content within sections SHALL be constrained to `breakpointLg` (1440px) max-width, centered horizontally.
3. Section content padding SHALL vary per section as defined in the section visual profiles.
4. Sections SHALL stack vertically with no gap between them (backgrounds touch).
5. The page SHALL use semantic HTML: `<main>` wrapping sections, `<section>` for content areas, `<footer>` for the footer.
6. Nav-Header-App SHALL be positioned sticky at the top of the viewport above all section content.

---

### Requirement 4: Scroll-Linked Nav Color System

**User Story**: As a site visitor, I want the navigation bar to smoothly change color to match the section I'm viewing, so that the nav feels integrated with the page content.

#### Acceptance Criteria

1. The system SHALL use Intersection Observer to detect which section is currently in the viewport.
2. WHEN a new section enters the viewport THEN the system SHALL update `--nav-bg-override`, `--nav-glow-color`, and `--nav-border-color` on Nav-Header-App to match the section's defined color set.
3. Nav background color transitions SHALL use CSS `transition` at `duration150` for smooth interpolation.
4. Nav text color SHALL snap (not transition) between dark and light modes based on section background luminance.
5. The text mode snap SHALL occur at transition start (when observer fires), not when background transition completes.
6. Each section SHALL define its nav color set: background primitive, glow token, border primitive, and text mode (dark/light).

---

### Requirement 5: Scroll-Reveal Animation System

**User Story**: As a site visitor, I want page content to animate into view as I scroll, so that the experience feels polished and intentional.

#### Acceptance Criteria

1. Elements SHALL start hidden (opacity 0, translateY `space200`) and animate to visible on intersection.
2. The system SHALL use Intersection Observer with a threshold of ~0.15 (trigger when 15% visible).
3. Reveal animations SHALL be one-shot — elements reveal once and stay visible (no re-hide on scroll up).
4. Section reveal animation SHALL use fade-in + translateY, `duration250`, ease-out.
5. Card stagger animation SHALL use the same animation with 75ms delay between siblings.
6. WHEN `prefers-reduced-motion: reduce` is enabled THEN all animations SHALL be disabled and elements SHALL render immediately visible.
7. The reveal system SHALL use CSS class toggling (`.reveal-hidden` → `.reveal-visible`) driven by Intersection Observer.

---

### Requirement 6: Stats Bar Section

**User Story**: As a site visitor, I want to see impressive statistics about the DesignerPunk system with animated count-up numbers, so that I understand the scale of the project.

#### Acceptance Criteria

1. The section SHALL display static stat values with count-up animation from 0 to target on reveal.
2. Count-up animation SHALL use `duration500` with requestAnimationFrame.
3. WHEN `prefers-reduced-motion: reduce` is enabled THEN final values SHALL render immediately without count-up.
4. The section background SHALL use `pink100` with noise texture at `opacity024`.
5. All text SHALL have a hard shadow: `pink500` @ `opacity100`, `blur000`, offset `space025` x/y. Implemented as product CSS utility.
6. Display "1" SHALL use `pink300` color. Stat numbers SHALL use `color.contrast.onLight`. Labels SHALL use `pink500`.
7. Content spacing SHALL use `inset.300` block padding, `related.loose` (space300) item spacing, `grouped.normal` (space100) stat group spacing.

---

### Requirement 7: Why Build Section

**User Story**: As a site visitor, I want to understand the challenge, insight, approach, and goals behind DesignerPunk, presented in distinct cards on a vibrant background.

#### Acceptance Criteria

1. The section SHALL display four Container-Card-Base cards with `purple100` fill.
2. Cards SHALL have a hard shadow: `purple300` @ `opacity100`, offset `space100` x/y, `blur000`.
3. Card padding SHALL be asymmetric: `inset.200` block, `inset.300` inline.
4. Section heading SHALL use `color.contrast.onDark` (light text on gradient).
5. Card body text SHALL use `color.text.default` (dark text on light cards).
6. The background SHALL be a radial gradient (`pink300` center → `pink500` edge) with tiled square pattern composited using `exclusion` blend mode.
7. The easter egg ("Because why not!?") SHALL render in a `green100` zone above the section, revealed on hover with neon flicker keyframe animation.
8. WHEN `prefers-reduced-motion: reduce` is enabled THEN the easter egg SHALL show instantly at full opacity on hover (no flicker).

---

### Requirement 8: Critical Features Section

**User Story**: As a site visitor, I want to see the critical system features presented in a clean card grid, so that I understand what makes DesignerPunk distinctive.

#### Acceptance Criteria

1. The section SHALL display a 2×3 grid of feature cards.
2. Feature cards SHALL use `color.structure.surface` @ `opacity080` with hard shadow (`pink300`, offset `space100` x/y, `blur000`).
3. Feature titles SHALL use `color.contrast.onLight`. Feature descriptions SHALL use `color.text.muted`.
4. The background SHALL use `orange100` base with angular gradient (`black500` → `white100`) at `opacity024` and diamond lattice vector pattern overlay.
5. Content spacing SHALL use `sectioned.loose` (space600) item-spacing, `inset.300` card padding, `grouped.normal` feature item-spacing.

---

### Requirement 9: Code Screenshots Section

**User Story**: As a site visitor, I want to see code screenshots presented with artistic blend-mode treatment, so that the technical nature of the project is communicated visually.

#### Acceptance Criteria

1. Code screenshot images SHALL be composited with blend mode (red/orange tint) on the `orange300` background.
2. A halftone pattern overlay SHALL be applied to the section.
3. The section SHALL depend on image assets provided by Peter.

---

### Requirement 10: How Built + Special Thanks Section

**User Story**: As a site visitor, I want to understand how DesignerPunk was built and see credits for contributors, presented in frosted glass cards over a gradient background.

#### Acceptance Criteria

1. Content containers SHALL use `orange100` @ `opacity056` with background blur (`blur100`) and hard shadow (`cyan300`, offset `space100` x/y, `blur000`).
2. The background SHALL be a radial gradient (`teal200` center → `yellow300` edges) with tiled `pink200` circles at `opacity024`.
3. Featured text SHALL use `fontSize700` / `fontWeight700`.
4. The credits grid SHALL display names in a 4-column layout.
5. All text SHALL use `color.contrast.onLight`.
6. The easter egg ("Hard $#@%ing work!") SHALL use `purple100` fill + `orange300` stroke, revealed with neon flicker on hover in the transition zone above.
7. WHEN `prefers-reduced-motion: reduce` is enabled THEN the easter egg SHALL show instantly on hover.

---

### Requirement 11: CTA Section

**User Story**: As a site visitor, I want clear calls-to-action to connect with Peter on LinkedIn and view the project on GitHub, so that I can take the next step.

#### Acceptance Criteria

1. The section SHALL display two Button-CTA components with `href` props (outbound links).
2. Primary CTA ("Peter on LinkedIn") SHALL use `color.action.primary` fill with `color.contrast.onDark` text and trailing external-link Icon-Base.
3. Secondary CTA ("DesignerPunk on GitHub") SHALL use `color.structure.surface` fill with `color.contrast.onLight` stroke/text and trailing external-link Icon-Base.
4. Both CTAs SHALL use `radius050` border radius.
5. Both CTAs SHALL open in new tab (`target="_blank"`, `rel="noopener noreferrer"`).
6. The section background SHALL use `green100` base with halftone element and photo asset.
7. Value proposition text SHALL use display weight typography.

---

### Requirement 12: Hero Section (Scaffold)

**User Story**: As a site visitor, I want to see the headline, subtext, and action buttons for the portfolio immediately on page load.

#### Acceptance Criteria

1. The section SHALL display the headline, subtext, and two Button-CTA components.
2. "View the system" CTA SHALL link to github.com/3fn/DesignerPunkv2 (external, with outbound icon).
3. "Learn more" CTA SHALL smooth-scroll to the Why Build section (internal, no outbound icon).
4. The section background SHALL use `green100` base with angular gradient at `opacity008`.
5. A placeholder area SHALL be reserved for the chord diagram (Spec 002).

---

### Requirement 13: Ecosystem Section (Scaffold)

**User Story**: As a product developer, I want the Ecosystem section container ready so that Spec 003 can build its content into an existing shell.

#### Acceptance Criteria

1. The section container SHALL render with `yellow300` background.
2. The section heading SHALL display with the `//` prefix pattern.
3. The interior SHALL be an empty placeholder area for Spec 003 content (cube, descriptions, portraits, directory).

---

### Requirement 14: Who Built This Section (Partial)

**User Story**: As a site visitor, I want to see Peter's bio, title, and employer history, so that I understand his professional background.

#### Acceptance Criteria

1. The section SHALL display bio text, professional title, and employer badges using Badge-Label-Base.
2. The section background SHALL use `black300`.
3. Text SHALL use `color.contrast.onDark` for primary content and `color.action.navigation` for accent text.
4. A placeholder area SHALL be reserved for the career timeline canvas (Spec 004).

---

### Requirement 15: Footer

**User Story**: As a site visitor, I want to see contact information and branding in the footer.

#### Acceptance Criteria

1. The footer SHALL display the DesignerPunk logo, "Peter Michaels Allen", separator (◌), and email address.
2. All text and logo SHALL use `color.contrast.onDark`.
3. The background SHALL use `black500`.
4. Spacing SHALL use `inset.300` vertical padding, `related.normal` between contact items.

---

### Requirement 16: Section Heading Prefix Pattern

**User Story**: As a site visitor, I want section headings to have decorative `//` or `!!` prefixes that match the nav submenu style, so that the page has visual consistency.

#### Acceptance Criteria

1. Section headings SHALL render the prefix (`//` or `!!`) as a separate element with `aria-hidden="true"`.
2. The prefix and heading text SHALL be siblings with `grouped.tight` spacing.
3. Screen readers SHALL announce only the heading text, not the prefix characters.
4. The pattern SHALL be implemented as a product CSS utility class (not a Stemma component).
5. The heading element SHALL use appropriate semantic level (`<h2>` for section headings).

---

### Requirement 17: Easter Egg Neon Flicker Animation

**User Story**: As a site visitor, I want hidden text to flicker on like a neon sign when I hover over transition zones, so that the page has personality and surprise.

#### Acceptance Criteria

1. Easter egg text SHALL be hidden by default (opacity 0).
2. WHEN the user hovers over the transition zone container THEN the text SHALL animate with a neon flicker keyframe (irregular opacity: 0 → 0.4 → 0 → 0.7 → 0 → 1) over `duration500`, then hold at full opacity.
3. WHEN `prefers-reduced-motion: reduce` is enabled THEN the text SHALL show instantly at full opacity on hover (no flicker animation).
4. On mobile (no hover capability) the easter eggs SHALL remain hidden.
5. The animation SHALL be CSS-only (keyframes, no JavaScript).

---

### Requirement 18: Responsive Foundation

**User Story**: As a site visitor on a tablet or smaller screen, I want the page layout to adapt gracefully, so that content remains readable without horizontal scrolling.

#### Acceptance Criteria

1. The page SHALL be built desktop-first (1024px+ as primary target).
2. At `sm` breakpoint (768–1023px) multi-column layouts SHALL reduce columns (4→2, 2×3→2×2, side-by-side→stacked).
3. At `xs` breakpoint (<768px) all content SHALL stack in a single column.
4. The grid system SHALL use DesignerPunk responsive tokens (`gridGutterXs/Sm/Md/Lg`, `gridMarginXs/Sm/Md/Lg`).
5. Responsive decisions made during implementation SHALL be documented for Phase 2 (Mobile Refinement) reference.

---

### Requirement 19: `prefers-reduced-motion` Wiring

**User Story**: As a user who is sensitive to motion, I want all animations disabled when I've indicated that preference, so that I can use the site comfortably.

#### Acceptance Criteria

1. WHEN `prefers-reduced-motion: reduce` is active THEN scroll-reveal animations SHALL be disabled (elements render immediately visible).
2. WHEN `prefers-reduced-motion: reduce` is active THEN stats count-up SHALL be disabled (final values render immediately).
3. WHEN `prefers-reduced-motion: reduce` is active THEN easter egg flicker SHALL be disabled (instant show on hover).
4. WHEN `prefers-reduced-motion: reduce` is active THEN nav color transitions SHALL still occur (color change is informational, not decorative motion).
5. The media query SHALL be wired at the CSS level (not JavaScript detection).

---

### Requirement 20: Hard Shadow Utility Pattern

**User Story**: As a product developer, I want a consistent way to apply the hard shadow motif across sections, so that the visual signature is maintainable.

#### Acceptance Criteria

1. The hard shadow pattern SHALL be implemented as a product CSS utility with a `--hard-shadow-color` custom property.
2. The shadow offset SHALL use `space100` for both x and y.
3. The shadow blur SHALL be `blur000` (zero).
4. The shadow opacity SHALL be `opacity100` (full).
5. Each section SHALL set `--hard-shadow-color` to its contextual color (purple300, pink300, cyan300, orange300).
6. The stats text shadow (offset `space025`) SHALL be a separate utility from the card shadow (offset `space100`).

---
