# Button-CTA Component

**Stemma System**: Buttons Family  
**Component Type**: Standalone (no behavioral variants)  
**Readiness**: 🟢 Production Ready  
**Version**: 1.1.0

---

## Overview

The Button-CTA (Call-to-Action Button) component is a cross-platform button following True Native Architecture with build-time platform separation. It provides three size variants, three visual variants (via `variant` prop), and comprehensive interaction states while maintaining WCAG 2.1 AA accessibility compliance.

**Stemma System Naming**: This component follows the `[Family]-[Type]` naming convention for standalone components:
- **Family**: Button
- **Type**: CTA (Call-to-Action)

**Why No Variant Suffix?**: Button-CTA has no behavioral variants - only styling variations handled via the `variant` prop (primary/secondary/tertiary). The `-Primary` suffix was removed as it implied other behavioral variants exist when they don't.

---

## Key Features

- ✅ Token-based styling (zero hard-coded values)
- ✅ Three size variants (small, medium, large)
- ✅ Three visual variants via `variant` prop (primary, secondary, tertiary)
- ✅ Optional leading icons with optical weight compensation
- ✅ Platform-specific interaction patterns
- ✅ WCAG 2.1 AA accessibility compliance
- ✅ True Native Architecture (separate implementations per platform)

---

## Polymorphic Rendering (`href` prop)

When `href` is set, Button-CTA renders as an `<a>` element instead of `<button>`. All visual styling remains identical — only semantics and keyboard behavior change.

```html
<!-- Renders as <button> -->
<button-cta label="Submit" variant="primary"></button-cta>

<!-- Renders as <a> — outbound link with trailing icon -->
<button-cta
  label="View on GitHub"
  variant="primary"
  href="https://github.com/3fn/DesignerPunkv2"
  target="_blank"
  icon="external-link"
  icon-position="trailing"
></button-cta>
```

### Behavior Differences

| Behavior | `<button>` (no href) | `<a>` (href set) |
|----------|---------------------|-------------------|
| Keyboard activation | Enter + Space | Enter only |
| Role | button | link |
| `disabled` prop | Respected | Ignored |
| `aria-disabled` | Set | Not rendered |
| `rel` attribute | N/A | Auto-set when `target="_blank"` |

### Security

When `target="_blank"` is set and no explicit `rel` is provided, `rel="noopener noreferrer"` is automatically applied.

### Icon Position

Use `icon-position="trailing"` for outbound link indicators:

```html
<!-- Leading icon (default) -->
<button-cta label="Next" icon="arrow-right"></button-cta>

<!-- Trailing icon (outbound links) -->
<button-cta label="GitHub" href="..." icon="external-link" icon-position="trailing"></button-cta>
```

---

## Behavioral Contracts

This component guarantees 9 behavioral contracts across all platforms:

| Contract | Description | Platforms | WCAG |
|----------|-------------|-----------|------|
| `interaction_focusable` | Can receive keyboard focus | web, ios, android | 2.1.1, 2.4.7 |
| `interaction_pressable` | Responds to press/click events | web, ios, android | 2.1.1 |
| `interaction_hover` | Visual feedback on hover | web | 1.4.13 |
| `interaction_pressed` | Visual feedback when pressed | web, ios, android | 2.4.7 |
| `state_disabled` | Prevents interaction when disabled | web, ios, android | 4.1.2 |
| `state_loading` | Shows loading indicator | web, ios, android | 4.1.3 |
| `interaction_focus_ring` | WCAG 2.4.7 focus visible indicator | web, ios, android | 2.4.7 |
| `content_renders_link` | Renders as `<a>` when href provided | web, ios, android | 4.1.2 |
| `layout_icon_position` | Icon at leading or trailing position | web, ios, android | — |

---

## Usage

### HTML Custom Element

```html
<!-- Basic usage -->
<button-cta label="Click me"></button-cta>

<!-- With all attributes -->
<button-cta
  label="Submit Form"
  size="large"
  variant="primary"
  icon="arrow-right"
  no-wrap="false"
  disabled="false"
  test-id="submit-button"
></button-cta>
```

### JavaScript/TypeScript

```typescript
import { ButtonCTA } from './platforms/web/ButtonCTA.web';

// Programmatic usage
const button = document.createElement('button-cta') as ButtonCTA;
button.label = 'Click me';
button.size = 'large';
button.addEventListener('press', () => console.log('Clicked'));
document.body.appendChild(button);
```

### iOS (SwiftUI)

```swift
import DesignerPunk

ButtonCTA(
    label: "Submit",
    size: .large,
    variant: .primary,
    icon: "arrow-right"
) {
    handleSubmit()
}
```

### Android (Jetpack Compose)

```kotlin
import com.designerpunk.components

ButtonCTA(
    label = "Submit",
    size = ButtonSize.Large,
    variant = ButtonVariant.Primary,
    icon = "arrow-right",
    onPress = { handleSubmit() }
)
```

---

## API Reference

### Properties

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `label` | `string` | ✅ Yes | - | Button text label |
| `size` | `'small' \| 'medium' \| 'large'` | No | `'medium'` | Button size variant |
| `variant` | `'primary' \| 'secondary' \| 'tertiary'` | No | `'primary'` | Button visual variant |
| `icon` | `IconName` | No | - | Optional icon |
| `iconPosition` | `'leading' \| 'trailing'` | No | `'leading'` | Icon position relative to label |
| `noWrap` | `boolean` | No | `false` | Prevent text wrapping |
| `disabled` | `boolean` | No | `false` | Disable interaction (ignored when `href` set) |
| `onPress` | `() => void` | ✅ Yes | - | Press/click handler |
| `testID` | `string` | No | - | Test identifier |
| `href` | `string` | No | - | URL — renders as `<a>` when set |
| `target` | `string` | No | - | Link target (e.g., `'_blank'`) |
| `rel` | `string` | No | auto | Link rel (auto-set to `'noopener noreferrer'` when `target="_blank"`) |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `press` | `{ originalEvent: Event }` | Fired when button is clicked or activated via keyboard |

---

## Size Variants

| Size | Height | Touch Target | Min Width | Typography | Icon Size |
|------|--------|--------------|-----------|------------|-----------|
| `small` | 40px | 44px | 56px | labelMd | 24px |
| `medium` | 48px | 48px | 72px | labelMd | 24px |
| `large` | 56px | 56px | 80px | labelLg | 32px |

---

## Visual Variants

| Variant | Background | Text | Border | Emphasis |
|---------|------------|------|--------|----------|
| `primary` | color.primary | color.contrast.onPrimary | none | Highest |
| `secondary` | color.background | color.primary | 1px color.primary | Medium |
| `tertiary` | transparent | color.primary | none | Lowest |

---

## Token Dependencies

### Typography
- `typography.labelMd` - Small/medium button text
- `typography.labelLg` - Large button text

### Color
- `color.primary` - Primary variant background, secondary/tertiary text
- `color.contrast.onPrimary` - Primary variant text/icons
- `color.background` - Secondary variant background
- `color.border` - Secondary variant border

### Spacing
- `space.inset.*` - Internal padding
- `space.inline.100` - Icon-to-label spacing

### Motion
- `motion.button.press` - Press animation timing
- `motion.button.hover` - Hover transition timing

### Blend
- `blend.hoverDarker` - Hover state (8% darker)
- `blend.pressedDarker` - Pressed state (12% darker)
- `blend.disabledDesaturate` - Disabled state (12% less saturated)
- `blend.iconLighter` - Icon optical balance (8% lighter)

### Accessibility
- `accessibility.tapArea.recommended` - 44px minimum touch target
- `accessibility.focus.width` - 2px focus ring width
- `accessibility.focus.offset` - 2px focus ring offset
- `accessibility.focus.color` - Focus ring color

### Component-Specific
- `buttonCTA.minWidth.small` - 56px
- `buttonCTA.minWidth.medium` - 72px
- `buttonCTA.minWidth.large` - 80px

---

## Accessibility

### WCAG 2.1 AA Compliance

| Criterion | Status | Implementation |
|-----------|--------|----------------|
| 1.4.1 Use of Color | ✅ | Visual variants use shape/border, not just color |
| 1.4.3 Contrast | ✅ | All text meets 4.5:1 contrast ratio |
| 1.4.11 Non-text Contrast | ✅ | Focus ring meets 3:1 contrast ratio |
| 2.1.1 Keyboard | ✅ | Fully keyboard accessible (Tab, Enter, Space) |
| 2.4.7 Focus Visible | ✅ | Clear focus indicator with :focus-visible |
| 2.5.5 Target Size | ✅ | Touch targets meet 44px minimum |
| 4.1.2 Name, Role, Value | ✅ | Proper ARIA attributes and disabled state |

### Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Move focus to/from button |
| Enter | Activate button |
| Space | Activate button |

### Screen Reader Support

- Semantic `<button>` element provides implicit role
- `aria-label` set from label prop
- `aria-disabled="true"` when disabled
- State changes announced to assistive technology

---

## Platform-Specific Behavior

### Web
- Hover state with color transition
- :focus-visible for keyboard-only focus ring
- Shadow DOM for style encapsulation

### iOS
- Scale animation on press (0.95 scale)
- Haptic feedback via UIImpactFeedbackGenerator
- Safe area handling for edge-to-edge layouts

### Android
- Ripple effect on press
- Haptic feedback via HapticFeedback
- Material Design integration

---

## File Structure

```
src/components/core/Button-CTA/
├── Button-CTA.schema.yaml        # Component schema definition
├── Button-CTA.tokens.ts          # Component-specific tokens
├── types.ts                      # Shared type definitions
├── index.ts                      # Module exports
├── README.md                     # This documentation
├── platforms/
│   ├── web/
│   │   ├── ButtonCTA.web.ts      # Web Component implementation
│   │   └── ButtonCTA.web.css     # Web styles
│   ├── ios/
│   │   └── ButtonCTA.ios.swift   # SwiftUI implementation
│   └── android/
│       └── ButtonCTA.android.kt  # Compose implementation
└── __tests__/
    ├── ButtonCTA.test.ts         # Unit tests
    └── test-utils.ts             # Test utilities
```

---

## Related Documentation

- [Stemma System Principles](/.kiro/steering/stemma-system-principles.md)
- [Component Quick Reference](/.kiro/steering/Component-Quick-Reference.md)
- [Component Schema Format](/.kiro/steering/Component-Schema-Format.md)

---

## Migration from Button-CTA-Primary

If migrating from the `Button-CTA-Primary` component:

1. **Update imports**: Change `ButtonCTAPrimary` to `ButtonCTA`
2. **Update HTML tags**: Change `<button-cta-primary>` to `<button-cta>`
3. **No API changes**: All props and events remain the same

```typescript
// Before
import { ButtonCTAPrimary } from './components/core/Button-CTA-Primary';

// After
import { ButtonCTA } from './components/core/Button-CTA';
```

---

*This component is part of the DesignerPunk Design System, following Stemma System principles for cross-platform consistency and AI-optimal discoverability.*
