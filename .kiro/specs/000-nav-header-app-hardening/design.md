# Design Document: Nav-Header-App Hardening

**Date**: 2026-05-08
**Spec**: 000 - Nav-Header-App Hardening
**Status**: Design Phase
**Dependencies**: None (first spec)

---

## Overview

This spec promotes Nav-Header-App from scaffold to production-ready by adding behavioral contracts, accessibility compliance, a CSS custom property override mechanism for product-controlled theming, an intrinsic underglow effect, and a companion one-off popover component (NavAboutPopover). It also updates font family primitives to establish correct typography rendering for the portfolio product.

The design follows three principles:
1. **Component provides hooks, product provides intelligence** — Nav-Header-App exposes CSS custom properties; the product's scroll JS decides what values to set.
2. **Contracts encode guarantees** — Every behavioral expectation is a named contract with a corresponding test.
3. **One-off stays one-off** — NavAboutPopover is product-level code, not a Stemma family component.

---

## Architecture

### Component Hierarchy

```
Nav-Header-Base (primitive, internal-only)
└── Nav-Header-App (semantic, product-facing)
    ├── Inherits: 8 contracts from Base
    ├── Adds: 3 own contracts (accessibility_no_heading, visual_background_override, visual_glow)
    └── Consumes: NavAboutPopover (one-off, slotted into trailing region)
```

### Override Mechanism Architecture

Nav-Header-App uses CSS custom properties as its public theming API. The product sets these properties on or above the component element; the component reads them with fallback defaults.

```
Product scroll handler
    │
    ├── sets --nav-bg-override    → Nav-Header-App background
    ├── sets --nav-glow-color     → Nav-Header-App underglow color
    └── sets --nav-border-color   → Nav-Header-App separator color
```

**Data flow**: Unidirectional. Product → Component. The component never writes back to these properties.

**Coordination contract**: All three properties must be updated together in a single scroll handler call. The component does not auto-derive glow or border from the background — they are independent values that the product coordinates.

### Shadow DOM Boundary

CSS custom properties pierce Shadow DOM by design. The override mechanism works regardless of whether the product sets the properties on:
- The `<nav-header-app>` element directly
- A parent element (e.g., `:root` or a wrapper)
- Via JavaScript (`element.style.setProperty(...)`)

---

## Components and Interfaces

### Nav-Header-App

```typescript
interface NavHeaderAppProps {
  /** Visual appearance mode */
  appearance: 'opaque' | 'translucent';
  /** Whether to show the bottom separator border. Default: true */
  showSeparator?: boolean;
}

interface NavHeaderAppSlots {
  /** Left-aligned content (logo, brand) */
  leading: HTMLElement;
  /** Center-aligned content (decorative icons, title) */
  center: HTMLElement;
  /** Right-aligned content (nav links, actions) */
  trailing: HTMLElement;
}

interface NavHeaderAppCustomProperties {
  /** Overrides background color. Default: color.structure.canvas */
  '--nav-bg-override'?: string;
  /** Overrides underglow color. Default: glow.neonGreen (green500) */
  '--nav-glow-color'?: string;
  /** Overrides separator border color. Default: green400 */
  '--nav-border-color'?: string;
}
```

### NavAboutPopover (One-Off)

```typescript
interface NavAboutPopoverState {
  /** Whether the popover panel is currently visible */
  isOpen: boolean;
}

interface NavAboutPopoverElements {
  /** Trigger button with aria-expanded and aria-controls */
  trigger: HTMLButtonElement;
  /** Popover panel with role="navigation" and aria-label */
  panel: HTMLElement;
  /** Anchor links within the panel */
  items: HTMLAnchorElement[];
}

interface NavAboutPopoverItem {
  /** Decorative prefix (e.g., '//' or '!!'), aria-hidden */
  prefix: string;
  /** Link text (visible to screen readers) */
  label: string;
  /** Target section anchor — kebab-case slug derived from section heading (e.g., '#why-build-this-system') */
  href: string;
}
```

### Component Tokens

```typescript
interface NavHeaderAppTokens {
  /** Vertical padding for nav buttons. Resolves to space250 (20px). */
  'navButton.padding.vertical': 'space250';
  /** Horizontal padding for nav content regions. Resolves to space500 (40px). */
  'navHeader.padding.inline': 'space500';
}
```

---

## Behavioral Contracts

### Nav-Header-App Contracts

#### Inherited from Nav-Header-Base (8 contracts, all exist)

| Contract | Category | Guarantee |
|----------|----------|-----------|
| `accessibility_aria_roles` | accessibility | Banner landmark role on header element |
| `accessibility_touch_target` | accessibility | All interactive elements ≥ 44px touch target |
| `layout_three_regions` | layout | Leading, center, trailing slot regions rendered |
| `layout_safe_area` | layout | Header extends into platform safe area |
| `visual_background` | visual | Opaque/translucent appearance modes function |
| `visual_translucent` | visual | Translucent appearance uses backdrop blur |
| `visual_separator` | visual | Bottom border separator renders when enabled |
| `interaction_focus_order` | interaction | Focus flows leading → center → trailing |

#### Nav-Header-App's Own Contracts (3 contracts)

| Contract | Category | Guarantee |
|----------|----------|-----------|
| `accessibility_no_heading` | accessibility | No heading element (h1–h6) rendered in component DOM |
| `visual_background_override` | visual | `--nav-bg-override` custom property overrides background when set |
| `visual_glow` | visual | Underglow always present; color responds to `--nav-glow-color` |

### NavAboutPopover Contracts (5 contracts)

| Contract | Category | Guarantee |
|----------|----------|-----------|
| `interaction_pressable` | interaction | Click/tap toggles popover open/closed |
| `interaction_dismiss` | interaction | Closes on outside click or Escape key |
| `interaction_focus_order` | interaction | Focus moves to first anchor link on open; returns to trigger on close |
| `accessibility_aria_controls` | accessibility | Trigger has aria-expanded + aria-controls reflecting state |
| `animation_coordination` | animation | Fade + translateY on open/close; instant when prefers-reduced-motion |

---

## Visual Specifications

### Underglow Effect

```
Property        Token/Value              Notes
─────────────────────────────────────────────────────────
x-offset        0                        True radial glow
y-offset        0                        Viewport clips upward bleed
blur-radius     blur200 (32px)           Wide symmetric spread
opacity         glowOpacity300 (0.4)     Subtle presence
color           glow.neonGreen (green500) Default; overridable via --nav-glow-color
spread          0                        No spread
```

**Platform implementations**:
- Web: `box-shadow: 0 0 32px rgba(0, 204, 110, 0.4)`
- iOS: `layer.shadowOffset = .zero`, `layer.shadowRadius = 16` (points), `layer.shadowOpacity = 0.4`
- Android: Custom shadow drawable or `elevation` with tinted shadow

### Separator Border

```
Property        Token/Value              Notes
─────────────────────────────────────────────────────────
width           borderWidth100 (1px)     Standard separator thickness
color           green400                 Overrides Base's color.structure.border.subtle
override        --nav-border-color       Product can change during scroll
```

### NavAboutPopover Visual

```
Property        Token/Value              Notes
─────────────────────────────────────────────────────────
Trigger bg      color.action.navigation.surface  Only when popover is open
Trigger hover   blend.hoverDarker (8%)   Standard hover; not applied when open
Trigger type    typography.displayLabelMd Rajdhani, 16px, bold
Panel bg        color.action.navigation.surface  Matches trigger open state
Panel padding   inset.200 (16px)         Block padding only
Item padding    space300 (24px) inline, inset.100 (8px) block
Item type       typography.displayLabelLg Rajdhani, 18px, bold
Item gap        grouped.normal (8px)     Between items
Prefix gap      grouped.tight (4px)      Between prefix and label
Panel z-index   zIndex.dropdown (300)    Above nav (zIndex.navigation: 200)
```

### Animation

```
Property        Value                    Notes
─────────────────────────────────────────────────────────
Open            fade-in + translateY(8px → 0)  Slide down from trigger
Close           fade-out + translateY(0 → 8px) Slide up toward trigger
Duration        duration150 (150ms)      Snappy micro-interaction (Peter decision)
Easing          ease-out (open), ease-in (close)
Reduced motion  Instant show/hide        No animation when prefers-reduced-motion
```

---

## Font Family Updates

### Primitive Token Changes

| Token | Current Value | New Value | Asset |
|-------|--------------|-----------|-------|
| `fontFamilyBody` | (current) | Figtree | `primitive-assets/Figtree-VariableFont_wght.ttf`, `Figtree-Italic-VariableFont_wght.ttf` |
| `fontFamilyMono` | (current) | Commit Mono | `primitive-assets/CommitMono-{400,700}-{Regular,Italic}.otf` |
| `fontFamilyDisplay` | Rajdhani | **Unchanged** | — |

### Web @font-face Registration

```css
@font-face {
  font-family: 'Figtree';
  src: url('./primitive-assets/Figtree-VariableFont_wght.ttf') format('truetype');
  font-weight: 100 900;
  font-style: normal;
}

@font-face {
  font-family: 'Figtree';
  src: url('./primitive-assets/Figtree-Italic-VariableFont_wght.ttf') format('truetype');
  font-weight: 100 900;
  font-style: italic;
}

@font-face {
  font-family: 'Commit Mono';
  src: url('./primitive-assets/CommitMono-400-Regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Commit Mono';
  src: url('./primitive-assets/CommitMono-400-Italic.otf') format('opentype');
  font-weight: 400;
  font-style: italic;
}

@font-face {
  font-family: 'Commit Mono';
  src: url('./primitive-assets/CommitMono-700-Regular.otf') format('opentype');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'Commit Mono';
  src: url('./primitive-assets/CommitMono-700-Italic.otf') format('opentype');
  font-weight: 700;
  font-style: italic;
}
```

---

## Error Handling

### Custom Property Fallbacks

All CSS custom properties use fallback values to ensure the component renders correctly even if the product never sets them:

```css
/* Background */
background-color: var(--nav-bg-override, var(--color-structure-canvas));

/* Underglow — --nav-glow-color expects rgba with opacity pre-baked */
box-shadow: 0 0 var(--blur200) var(--nav-glow-color, rgba(0, 204, 110, 0.4));

/* Border */
border-bottom-color: var(--nav-border-color, var(--green400));
```

If a product sets an invalid value (e.g., `--nav-bg-override: banana`), the browser ignores it and falls back to the default. No JavaScript error handling needed.

**Important**: `--nav-glow-color` must be an rgba value with opacity included. Setting a fully opaque color (e.g., `rgb(255, 0, 0)`) produces an overly intense glow. The product's scroll handler should construct values like `rgba(r, g, b, 0.4)`.

### Popover Edge Cases

| Scenario | Behavior |
|----------|----------|
| User clicks trigger rapidly | Toggle state is synchronous; no race condition |
| User scrolls while popover is open | Popover stays open (positioned relative to trigger) |
| User resizes viewport while open | Popover repositions with trigger (absolute positioning) |
| Focus leaves popover via Tab past last item | Popover closes, focus continues to next element in DOM. Implementation note: requires `focusout` listener with async check (`requestAnimationFrame`) to verify new focus target is outside panel before closing. |
| Multiple popovers open simultaneously | Not applicable — only one NavAboutPopover exists |

---

## Testing Strategy

### Behavioral Contract Tests (Nav-Header-App)

| Test | Contract | Validates |
|------|----------|-----------|
| Background override applies | `visual_background_override` | Setting `--nav-bg-override` changes rendered background |
| Background fallback works | `visual_background_override` | Without override, uses `color.structure.canvas` |
| Underglow always present | `visual_glow` | Component renders glow effect without any custom property set |
| Underglow color responds | `visual_glow` | Setting `--nav-glow-color` changes glow color |
| No heading in DOM | `accessibility_no_heading` | No h1–h6 elements in component shadow DOM |
| Border color override | (separator) | Setting `--nav-border-color` changes border color |
| Border default overrides Base | (separator) | Default border is `green400`, not `color.structure.border.subtle` |

### Behavioral Contract Tests (NavAboutPopover)

| Test | Contract | Validates |
|------|----------|-----------|
| Click opens popover | `interaction_pressable` | Trigger click sets isOpen=true, panel visible |
| Click closes popover | `interaction_pressable` | Second trigger click sets isOpen=false, panel hidden |
| Outside click closes | `interaction_dismiss` | Click outside panel closes popover |
| Escape closes | `interaction_dismiss` | Escape key closes popover |
| Focus moves to first link | `interaction_focus_order` | On open, document.activeElement is first anchor |
| Focus returns to trigger | `interaction_focus_order` | On Escape close, focus returns to trigger button |
| aria-expanded reflects state | `accessibility_aria_controls` | true when open, false when closed |
| aria-controls points to panel | `accessibility_aria_controls` | Attribute value matches panel ID |
| Animation plays on open | `animation_coordination` | Panel animates fade+translateY on open |
| No animation when reduced motion | `animation_coordination` | With prefers-reduced-motion, panel shows instantly |

### Integration Tests

| Test | Validates |
|------|-----------|
| Three properties coordinate | Setting all three custom properties produces correct visual state |
| Popover z-index above nav | Popover renders above nav content |
| Prefix hidden from screen reader | aria-hidden prefix not in accessible name |
| Logo + credit renders in leading slot | Slotted content appears in correct region |

---

## Design Decisions

### Decision 1: CSS Custom Properties Over HTML Attributes

**Options Considered**:
1. HTML attributes (`bg-color="green200"`) — discoverable but breaks token-first philosophy
2. CSS custom properties (`--nav-bg-override`) — invisible but semantically correct
3. JavaScript API (`element.setBackground(color)`) — imperative, non-standard

**Decision**: CSS custom properties (Option 2)

**Rationale**: Arbitrary color values don't belong in HTML attributes. Custom properties pierce Shadow DOM naturally, work with CSS cascade, and keep the component generic. The product owns the intelligence; the component owns the hook.

**Trade-offs**:
- ✅ Gained: Token-first philosophy preserved, Shadow DOM compatible, CSS cascade works
- ❌ Lost: Discoverability — developers must read docs to find the API
- ⚠️ Risk: Coordination burden of three properties (mitigated by README warning)

### Decision 2: Distinct Contract Name (`visual_background_override`)

**Options Considered**:
1. Single `visual_background` on App that supersedes Base's
2. Distinct `visual_background_override` alongside inherited `visual_background`

**Decision**: Distinct name (Option 2)

**Rationale**: App inherits Base's `visual_background` (opaque/translucent modes still work) AND adds the override mechanism. These are additive guarantees, not replacement. Distinct names enable independent testing and clear audit trails.

**Trade-offs**:
- ✅ Gained: Clear auditability, independent test targeting, no ambiguity
- ❌ Lost: Slightly more verbose contract list
- ⚠️ Risk: None identified

### Decision 3: Underglow as Intrinsic (Not Optional)

**Options Considered**:
1. Underglow as opt-in prop (`show-glow="true"`)
2. Underglow as always-present intrinsic effect
3. Underglow as product-level CSS (not component responsibility)

**Decision**: Always-present intrinsic (Option 2)

**Rationale**: The glow is a defining visual characteristic of Nav-Header-App, not optional styling. It reinforces the nav's presence and separation from content. Making it optional would mean most consumers need to remember to enable it.

**Trade-offs**:
- ✅ Gained: Consistent visual identity, no configuration needed
- ❌ Lost: Products that don't want glow can't disable it (they'd use Nav-Header-Base directly, but that's internal-only)
- ⚠️ Risk: If a future product needs Nav-Header-App without glow, we'd need a prop. Acceptable — YAGNI for now.

### Decision 4: NavAboutPopover as One-Off

**Options Considered**:
1. Generic `Popover` component in Stemma
2. Product-level one-off component
3. Nav-Header-App built-in submenu feature

**Decision**: Product-level one-off (Option 2)

**Rationale**: The popover content is product-specific (section anchor links for this portfolio). Other products won't need this exact interaction. Building a generic Popover is future work if the pattern recurs. Building it into Nav-Header-App would pollute the component with product-specific logic.

**Trade-offs**:
- ✅ Gained: Nav-Header-App stays generic, no scope creep
- ❌ Lost: If another product needs a similar popover, they'd build their own (or we'd extract a generic one later)
- ⚠️ Risk: Code duplication if pattern recurs. Acceptable — extract when there are 2+ consumers.

### Decision 5: First Anchor Link as Focus Target

**Options Considered**:
1. Focus the popover container (`tabindex="-1"`)
2. Focus the first anchor link
3. Focus nothing (let user Tab into popover)

**Decision**: First anchor link (Option 2)

**Rationale**: Per WAI-ARIA Authoring Practices for disclosure navigation menus. The container isn't interactive — focusing it requires an extra Tab press to reach content. First link is the expected target and provides immediate keyboard access to navigation.

**Trade-offs**:
- ✅ Gained: Immediate keyboard access, follows WAI-ARIA practices
- ❌ Lost: Screen reader announces link text immediately (could be disorienting if unexpected)
- ⚠️ Risk: Minimal — this is the established pattern for navigation disclosure widgets

---

## Platform Considerations

### Web
- Shadow DOM encapsulation for Nav-Header-App
- CSS custom properties for override mechanism
- `box-shadow` for underglow
- CSS transitions for popover animation
- `@font-face` for font registration

### iOS (Future)
- SwiftUI overlay for popover
- `layer.shadow*` properties for underglow
- **Note**: iOS `layer.shadowRadius` is half the CSS `blur-radius` value (CSS 32px → iOS 16pt). This is a platform difference in how blur is measured, not a design deviation.
- Font registration via Info.plist or asset catalog
- `withAnimation` / `matchedGeometryEffect` for popover transitions
- `@Environment(\.accessibilityReduceMotion)` for motion preference

### Android (Future)
- Jetpack Compose `DropdownMenu` or custom popup for popover
- Custom shadow drawable or `Modifier.shadow()` for underglow
- Font registration via `res/font/` directory
- `AnimatedVisibility` for popover transitions
- `LocalReduceMotion` for motion preference

---
