# Nav-Header-App

**Family**: Navigation | **Type**: Semantic | **Inherits**: Nav-Header-Base | **Readiness**: Production

App-level header for root destination screens. Provides three slot regions, an intrinsic underglow effect, and three CSS custom properties for product-controlled theming during scroll transitions.

## Usage

```html
<nav-header-app>
  <div slot="leading"><!-- Logo, brand --></div>
  <div slot="center"><!-- Decorative content --></div>
  <div slot="trailing"><!-- Actions, links --></div>
</nav-header-app>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `'opaque' \| 'translucent'` | `'opaque'` | Background mode. Opaque uses solid color; translucent uses backdrop blur. |
| `show-separator` | `boolean` | `true` | Whether to show the bottom border separator. |

## Slots

| Slot | Purpose |
|------|---------|
| `leading` | Left-aligned content (logo, brand mark) |
| `center` | Center-aligned content (decorative icons, title) |
| `trailing` | Right-aligned content (nav links, actions, popovers) |

## CSS Custom Properties (Public API)

Nav-Header-App exposes three CSS custom properties for product-controlled theming. These are the mechanism for scroll-linked color transitions.

| Property | Default | Description |
|----------|---------|-------------|
| `--nav-bg-override` | `color.structure.canvas` | Overrides the nav background color |
| `--nav-glow-color` | `rgba(0, 204, 110, 0.4)` | Overrides the underglow color |
| `--nav-border-color` | `green400` | Overrides the separator border color |

### ⚠️ Coordination Warning

**All three properties must be updated together during scroll transitions.** The component does not auto-derive glow or border colors from the background — they are independent values that the product coordinates.

```javascript
// ✅ Correct — update all three together
function updateNavTheme(bg, glow, border) {
  const nav = document.querySelector('nav-header-app');
  nav.style.setProperty('--nav-bg-override', bg);
  nav.style.setProperty('--nav-glow-color', glow);
  nav.style.setProperty('--nav-border-color', border);
}

// ❌ Wrong — updating only one creates visual mismatch
nav.style.setProperty('--nav-bg-override', 'pink');
// Glow is still green, border is still green — looks broken
```

### `--nav-glow-color` Format

This property expects an **rgba value with opacity pre-baked**:

```css
/* ✅ Correct — opacity included */
--nav-glow-color: rgba(255, 42, 109, 0.4);

/* ❌ Wrong — fully opaque, too intense */
--nav-glow-color: rgb(255, 42, 109);
--nav-glow-color: hotpink;
```

### Resetting to Defaults

```javascript
// Remove all overrides — component reverts to defaults
nav.style.removeProperty('--nav-bg-override');
nav.style.removeProperty('--nav-glow-color');
nav.style.removeProperty('--nav-border-color');
```

## Underglow

Nav-Header-App always renders a soft underglow beneath the nav bar. This is intrinsic — it cannot be disabled.

- **Blur**: `blur200` (32px)
- **Opacity**: `glowOpacity300` (0.4) — baked into the default color
- **Default color**: `glow.neonGreen` (green500) → `rgba(0, 204, 110, 0.4)`
- **Override**: Set `--nav-glow-color` with a pre-baked rgba value

The nav's sticky-at-top position means the viewport edge clips the symmetric glow into an effectively downward underglow.

## Accessibility

- **Landmark**: Banner role (inherited from Nav-Header-Base)
- **Label**: `aria-label="Site navigation"` for screen reader discoverability
- **No heading**: Does not render h1–h6 elements (`accessibility_no_heading` contract)
- **Focus order**: Leading → center → trailing (inherited)
- **Touch targets**: All interactive elements ≥ 44px (inherited)

## Contracts

| Contract | Category | Guarantee |
|----------|----------|-----------|
| `accessibility_no_heading` | accessibility | No heading element rendered |
| `visual_background_override` | visual | `--nav-bg-override` overrides background when set |
| `visual_glow` | visual | Underglow always present; color responds to `--nav-glow-color` |

Plus 8 inherited contracts from Nav-Header-Base (aria_roles, touch_target, background, translucent, separator, three_regions, safe_area, focus_order).

## Component Tokens

| Token | Value | Purpose |
|-------|-------|---------|
| `navButton.padding.vertical` | space250 (20px) | Vertical padding for nav buttons |
| `navHeader.padding.inline` | space500 (40px) | Horizontal padding for content regions |

## Spec

- Design outline: `.kiro/specs/000-nav-header-app-hardening/design-outline.md`
- Requirements: `.kiro/specs/000-nav-header-app-hardening/requirements.md`
- Design: `.kiro/specs/000-nav-header-app-hardening/design.md`
