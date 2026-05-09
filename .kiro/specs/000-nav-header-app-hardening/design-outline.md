# Design Outline: Nav-Header-App Hardening

**Date**: 2026-05-08
**Spec**: 000-nav-header-app-hardening
**Owner**: Lina (component), Ada (tokens)
**Status**: Design Outline — pending Peter review
**Updated**: 2026-05-08 (incorporated Ada token feedback, Figma analysis, design session decisions, follow-up session clarifications)

---

## Context

Nav-Header-App is the first DesignerPunk component consumed by a real product (DP-Portfolio). It's currently scaffold-only: a thin slot relay to Nav-Header-Base with one contract (`accessibility_no_heading`) and no tests. This spec promotes it to production-ready with the behavioral contracts, accessibility, and tests required for the portfolio's sticky navigation bar.

**Current state**: Three platform implementations (~10-15 lines each) that forward slots and props to Nav-Header-Base. No padding, no internal structure, no tests.

**Target state**: A production-ready app-level header with documented contracts, accessibility compliance, background override mechanism, and a companion one-off popover component for the "About" submenu.

**Source material**: Figma extraction (node 3439:89084), design session 2026-05-08, Ada token assessment.

---

## Design Decisions

### Decision 1: Use Nav-Header-App (not Nav-Header-Base)

**Decision**: The portfolio consumes Nav-Header-App.

**Rationale**: This is a root destination screen. Nav-Header-App's purpose is "root destination screens needing a top bar." Nav-Header-Base is internal-only. The three-slot architecture (leading, center, trailing) maps directly to the portfolio's nav layout.

### Decision 2: Background Override via Documented CSS Custom Property

**Decision**: Nav-Header-App exposes `--nav-bg-override` as a public CSS custom property. When set, it overrides the default `color.structure.canvas` background. The product sets this via JS during scroll.

**Rationale**: 
- Avoids adding an HTML attribute for arbitrary color values (breaks token-first philosophy)
- CSS custom properties pierce Shadow DOM naturally
- Product owns the scroll-linked logic; component stays generic
- Documented in schema/README as part of the component's public API

**What the component does NOT own**: Contrast management. The product is responsible for also updating text/icon colors when it changes the background. The component provides the override hook; the product provides the intelligence.

**Counter-argument**: This creates an "invisible" API that isn't in the HTML attribute surface. Developers need to read docs to discover it. Acceptable trade-off for a documented custom property vs polluting the attribute API with arbitrary color values.

**Coordination note**: The product must update three custom properties in sync during scroll: `--nav-bg-override`, `--nav-glow-color`, and `--nav-border-color`. This is a single function call in the scroll handler, but the coordination burden is on the product. A single `--nav-theme` property was considered but rejected — it would push product-specific color knowledge into the component.

### Decision 3: About Submenu as One-Off Composition (Not a Nav-Header-App Feature)

**Decision**: The "About" dropdown is a product-level one-off component (e.g., `NavAboutPopover`) slotted into the trailing region. It is NOT a Nav-Header-App contract.

**Rationale**: The dropdown is product-specific content (section anchor links for this portfolio). Other products using Nav-Header-App won't need this exact interaction. The nav component provides the slot; the product fills it.

**Scope**: This spec delivers the popover as a working one-off. It does not become a Stemma family component.

### Decision 4: Submenu Interaction Model

**Decision**: Click/tap to open. Close on: click outside submenu, click "About" button again, or Escape key.

**Rationale**: Simpler than dual hover/click model. Works identically on pointer and touch devices. No input modality detection needed. Standard popover pattern.

**Accessibility requirements**:
- `aria-expanded` on trigger button
- `aria-controls` pointing to popover ID
- Focus moves into popover on open
- Escape returns focus to trigger
- Popover uses `role="navigation"` (items are anchor links, not actions)

**Popover positioning**: `position: absolute` relative to trigger button. Nav is sticky at viewport top, so the popover drops downward with no overflow risk.

**Popover animation**: Fade + slight translateY (slide down from trigger). Respects `prefers-reduced-motion` — instant show/hide when motion is reduced.

### Decision 5: Platform Icons Are Decorative

**Decision**: The web/Apple/Android icons in the center region are purely decorative (`aria-hidden="true"`).

**Rationale**: They communicate "we support these platforms" visually but are not interactive and don't convey information that isn't available elsewhere on the page.

### Decision 6: Submenu Item Prefix Pattern (`//`, `!!`)

**Decision**: Prefixes are rendered as separate decorative elements alongside the label text, hidden from screen readers via `aria-hidden="true"`. The prefix and label are siblings with `grouped.tight` (4px) spacing between them.

**Rationale**:
- Screen readers get clean link text without "slash slash" noise
- Consistent alignment — prefix has fixed width, label text aligns regardless of prefix content
- Matches Figma structure: prefix and label are separate text nodes within each subnav button

**In scope for this spec**: The prefix pattern as used in submenu items.
**Reused in Spec 3**: Same pattern at larger scale for section headings on the page.

### Decision 7: Nav Bar Underglow Is Intrinsic

**Decision**: Nav-Header-App always renders a soft underglow beneath the nav bar. The glow color changes in sync with the nav background during scroll transitions.

**Rationale**:
- The glow is a defining visual characteristic of the nav, not optional product styling
- It reinforces the nav's presence and separation from page content
- Color coordination with the background creates visual cohesion during scroll transitions

**Implementation**:
- Component renders `box-shadow` with zero x/y offset, `blur200` (32px), `glowOpacity300` (0.4)
- Default glow color: `glow.neonGreen` (green500)
- Product scroll JS updates `--nav-glow-color` alongside `--nav-bg-override` to keep glow in sync
- The border (separator) color also changes with the nav background via `--nav-border-color` (default: green400)

### Decision 8: Outbound Link Icon Uses Icon-Base

**Decision**: The external-link icon next to "GitHub" and "LinkedIn" is an Icon-Base instance, decorative (`aria-hidden="true"`). SVG asset provided by Peter.

**Rationale**: The link text already communicates the destination. The icon is a visual affordance indicating "opens in new tab/window" but carries no unique information for screen readers.

### Decision 9: Logo Is a Provided Asset

**Decision**: The DesignerPunk logo is a static asset provided by Peter. The "by 3fn Design" credit text uses `typography.caption` with component-level weight overrides (fontWeight400 for "by", fontWeight500 for "3fn Design").

**Rationale**: The logo is a brand mark, not a component. The credit text uses `typography.caption` (fontSize050/13px, lineHeight050/~20px). Component overrides weight: fontWeight400 for "by", fontWeight500 for "3fn Design".

---

## Scope

### In Scope

| Deliverable | Description |
|-------------|-------------|
| Nav-Header-App contracts | Full behavioral contracts (accessibility, layout, visual, interaction) |
| Background override mechanism | `--nav-bg-override` custom property, documented as public API |
| Glow override mechanism | `--nav-glow-color` custom property for scroll-linked glow color sync |
| Border color override | `--nav-border-color` custom property for scroll-linked border color sync |
| Underglow effect | Always-present underglow beneath nav bar (visual contract) |
| Horizontal padding | Add `padding-inline` to Nav-Header-App (App only, not Base — per Peter Decision 8) |
| Accessibility hardening | Landmark role, focus order, keyboard navigation within nav content |
| Behavioral contract tests | Contract tests for all new contracts |
| NavAboutPopover (one-off) | Click-toggle popover with section anchor links, Escape/outside-click dismiss, animated open/close |
| Submenu prefix pattern | `//` and `!!` decorative prefixes on subnav items, `aria-hidden` |
| Outbound link icon | Icon-Base instance for external links, decorative, SVG from Peter |
| Logo lockup | DesignerPunk logo asset (from Peter) + "by 3fn Design" credit text (existing tokens) |
| Component token | `navButton.padding.vertical = space250` |
| component-meta.yaml update | Add "navigation" to contexts, update purpose for production usage |
| README update | Document public API including custom property overrides |
| Font family primitives | Update `fontFamilyBody` → Figtree, `fontFamilyMono` → Commit Mono. Register `@font-face`. Assets in `primitive-assets/`. Display font (Rajdhani) unchanged. |

### Out of Scope

| Item | Reason | Where It Lives |
|------|--------|----------------|
| Scroll-linked color JS | Product-level behavior | Spec 3 (Page Architecture) |
| Contrast auto-switching | Product-level intelligence | Spec 3 (Page Architecture) |
| Section heading `//` prefix (page-level) | Product-level pattern at larger scale | Spec 3 (Page Architecture) |
| Link component | Separate spec | Spec 2 (Link Component) |
| Mobile responsive nav | Phase 1 is desktop-first | Future spec |
| Section background compositions | Product-level art direction, not tokenizable | Spec 3 (Page Architecture) |

---

## Component Architecture

### Nav-Header-App (Hardened)

```
<nav-header-app appearance="opaque">
  <div slot="leading">
    <!-- Logo lockup: "←DesignerPunk" + "by 3fn Design" -->
  </div>
  <div slot="center">
    <!-- Platform icons (decorative, aria-hidden): web, Apple, Android -->
  </div>
  <div slot="trailing">
    <!-- NavAboutPopover trigger + GitHub link + LinkedIn link -->
  </div>
</nav-header-app>
```

### NavAboutPopover (One-Off)

```
NavAboutPopover
├── Trigger button ("About")
│   ├── aria-expanded="true|false"
│   ├── aria-controls="about-menu"
│   ├── Background: color.action.navigation.surface (when popover is open — NOT hover)
│   ├── Hover: standard interaction_hover contract
│   └── Typography: typography.displayLabelMd
└── Popover panel (id="about-menu")
    ├── role="navigation"
    ├── aria-label="Page sections"
    ├── Background: color.action.navigation.surface
    ├── padding-block: inset.200 (16px)
    ├── Animation: fade + translateY, respects prefers-reduced-motion
    └── Anchor links (section navigation)
        ├── Each item: prefix (aria-hidden) + label
        ├── Prefix–label gap: grouped.tight (4px)
        ├── Item padding-inline: space300 (24px)
        ├── Item padding-block: inset.100 (8px)
        ├── Typography: typography.displayLabelLg
        ├── // Why build this system?
        ├── // What is this ecosystem?
        ├── !! Critical system features
        ├── // How was this built?
        ├── // Who built this system?
        └── // What can I accomplish with your team?
```

---

## Token Usage

### Existing Tokens (No Changes Needed)

| Token | Usage | Value |
|-------|-------|-------|
| `color.structure.canvas` | Default nav background (opaque mode) | white100 |
| `color.structure.border.subtle` | Separator line | gray100 @ 48% opacity |
| `color.contrast.onLight` | Text on light backgrounds | black500 |
| `color.contrast.onDark` | Text on dark backgrounds | white100 |
| `color.action.navigation` | Nav link color (if needed) | cyan500 |
| `zIndex.navigation` | Sticky stacking order | 200 |
| `zIndex.dropdown` | About popover stacking | 300 |
| `blur100` | Translucent backdrop blur | 16px |
| `borderWidth100` | Separator thickness | 1px |
| `tapAreaRecommended` | Min nav height | 44px |
| `inset.100` | Subnav item vertical padding | 8px (space100) |
| `inset.200` | Popover panel vertical padding | 16px (space200) |
| `space200` | Nav button horizontal padding | 16px |
| `space300` | Subnav item horizontal padding | 24px |
| `grouped.tight` | Prefix–label gap | 4px (space050) |
| `grouped.normal` | Item spacing between subnav buttons | 8px (space100) |
| `glow.neonGreen` | Nav underglow color | green500 / rgba(0, 204, 110, 1) |
| `blur200` | Nav underglow blur radius | 32px |
| `glowOpacity300` | Nav underglow opacity | 0.4 |

### New Tokens (Ada-Approved, 2026-05-08)

| Token | Type | Owner | Definition | Rationale |
|-------|------|-------|-----------|-----------|
| `color.action.navigation.surface` | Semantic color | Ada | green100 | Popover-open state on nav button + subnav background share this value — encodes the relationship. NOT used for hover (hover uses standard interaction contract). |
| `typography.displayLabelMd` | Semantic typography | Ada | displayFont, fontSize150, fontWeight700, lineHeight150, letterSpacing100 | Display-font interactive labels (nav buttons) |
| `typography.displayLabelLg` | Semantic typography | Ada | displayFont, fontSize200, fontWeight700, lineHeight200, letterSpacing100 | Larger display-font labels (subnav buttons) |
| `navButton.padding.vertical` | Component token | Lina | space250 | Optical decision — nav buttons taller than standard. Single consumer. |

### Glow Tokens (Resolved 2026-05-08 — Ada Follow-Up)

All glow tokens exist. No new primitives needed. No blocking dependency.

| Property | Token | Value | Notes |
|----------|-------|-------|-------|
| Blur radius | `blur200` | 32px | Wider symmetric blur; viewport-top clipping makes it read as downward glow |
| Opacity | `glowOpacity300` | 0.4 | Closest system value to Figma's 0.48; visual difference negligible |
| Color | `glow.neonGreen` | green500 / rgba(0, 204, 110, 1) | Exact match to Figma #00CC6E |

**Modeling**: Zero x/y offset, zero spread. True radial glow per glow token family definition. Nav's sticky-at-top position means viewport edge clips upward bleed naturally into an effectively downward glow.

### Tokens Pending

None — all token decisions resolved (2026-05-08).

### Token Decisions (Not Needed)

| Considered | Decision | Rationale |
|-----------|----------|-----------|
| Section background tokens | Not created | Compositions (gradients, noise) aren't tokenizable. Product CSS composes primitives. |
| `inset.250` | Not created | Only used as icon height, not as inset padding elsewhere |
| `typography.displayLabelSm` | Deferred | No current use case |

---

## Contracts to Add

### Nav-Header-App Contracts

**Inherited from Nav-Header-Base** (all exist today in Base's contracts.yaml):

| Contract | Category | Description |
|----------|----------|-------------|
| `accessibility_aria_roles` | accessibility | Banner landmark role on header element |
| `accessibility_touch_target` | accessibility | All interactive elements meet minimum touch target |
| `layout_three_regions` | layout | Leading, center, trailing slot regions |
| `layout_safe_area` | layout | Header extends into platform safe area |
| `visual_background` | visual | Opaque/translucent appearance modes |
| `visual_translucent` | visual | Translucent appearance uses backdrop blur |
| `visual_separator` | visual | Optional bottom border separator |
| `interaction_focus_order` | interaction | Focus flows leading → center → trailing |

**Nav-Header-App's own contracts**:

| Contract | Category | Description |
|----------|----------|-------------|
| `accessibility_no_heading` | accessibility | (Existing) No heading element rendered |
| `visual_background_override` | visual | Adds `--nav-bg-override` custom property for product-controlled background color |
| `visual_glow` | visual | Always-present underglow beneath nav bar; color syncs with background via `--nav-glow-color` |

### NavAboutPopover Contracts (One-Off)

| Contract | Category | Description |
|----------|----------|-------------|
| `interaction_pressable` | interaction | Click/tap toggles popover open/closed |
| `interaction_dismiss` | interaction | Closes on outside click or Escape key |
| `interaction_focus_order` | interaction | Focus moves to first anchor link on open, returns to trigger on close |
| `accessibility_aria_controls` | accessibility | Trigger has aria-expanded + aria-controls |
| `animation_coordination` | animation | Fade + translateY on open/close, respects prefers-reduced-motion |

---

## Open Questions

1. ~~**Popover ARIA role**~~ — **Resolved**: `role="navigation"` with `aria-label="Page sections"`. Items are anchor links.

2. ~~**Nav-Header-Base padding**~~ — **Resolved**: Padding goes on Nav-Header-App only. Base stays as pure slot relay (Peter Decision 8).

3. ~~**Popover positioning**~~ — **Resolved**: `position: absolute` relative to trigger.

4. ~~**Popover animation**~~ — **Resolved**: Animate (fade + translateY), respect `prefers-reduced-motion`.

5. ~~**Glow token specs**~~ — **Resolved**: Existing tokens cover it: `blur200` (32px), `glowOpacity300` (0.4), `glow.neonGreen` (green500). Zero-offset radial glow. No new primitives needed.

6. ~~**Outbound link icon SVG**~~ — **Resolved**: Delivered at `primitive-assets/external-link.svg`.

7. ~~**DesignerPunk logo asset**~~ — **Resolved**: Delivered at `primitive-assets/designerPunkLogo.svg`.

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Popover scope creep (keyboard nav complexity) | Medium | Medium | Keep simple: no focus trapping (items are links in a nav landmark, not a complex widget) |
| Background override breaks in Shadow DOM edge cases | Low | Low | CSS custom properties are well-supported through shadow boundaries |
| Base padding change affects Nav-Header-Page | Low | Low | Nav-Header-Page also needs padding; this is a fix, not a risk |
| Typography tokens not ready when implementation starts | Low | Medium | Ada creating tokens in parallel; can use primitives as fallback |
| `color.action.navigation.surface` not created yet | Low | Medium | Ada creating; can use green100 primitive as fallback |
| Glow tokens not specced yet | Low | Low | ~~Resolved 2026-05-08~~ — all existing tokens (`blur200`, `glowOpacity300`, `glow.neonGreen`). No blocking work. |

---

## Implementation Sequence (Preliminary)

0. **Font family primitives** (Ada) — Update `fontFamilyBody` → Figtree, `fontFamilyMono` → Commit Mono. Register `@font-face` declarations. Display font (Rajdhani) unchanged.
1. **Token creation** (Ada) — `color.action.navigation.surface`, `typography.displayLabelMd`, `typography.displayLabelLg`
2. **Nav-Header-App padding** — add `padding-inline` to App (not Base)
3. **Nav-Header-App contracts** — author contracts.yaml with full behavioral contracts including `visual_glow`
4. **Component token** — create `navButton.padding.vertical = space250`
5. **Background + glow override mechanism** — implement `--nav-bg-override`, `--nav-glow-color`, `--nav-border-color` custom properties
6. **Underglow implementation** — box-shadow with zero offset, `blur200`, `glowOpacity300`, `glow.neonGreen`
7. **NavAboutPopover** — one-off component with click-toggle, dismiss, accessibility, animation
8. **Submenu prefix pattern** — `//` / `!!` decorative elements with aria-hidden
9. **Outbound link icon** — Icon-Base with SVG from Peter
10. **Logo lockup** — asset from Peter + credit text with `typography.caption`
11. **Tests** — behavioral contract tests for Nav-Header-App + popover interaction tests
12. **Documentation** — README update, component-meta.yaml update

---

*This design outline captures architectural decisions made during the 2026-05-08 design session with Peter, incorporating Ada's token assessment and Figma extraction analysis. Ready for review before formalizing into requirements.md.*
