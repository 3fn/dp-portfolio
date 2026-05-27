# DP-Portfolio — Roadmap

## Spec Progress

| # | Spec | Status | Notes |
|---|------|--------|-------|
| 000 | Nav-Header-App Hardening | ✅ Complete | Production-ready nav with underglow, popover, contracts, tests |
| 001 | Portfolio Page Architecture | ✅ Complete | Button-CTA polymorphic rendering, scroll system, section builds |
| 002 | Portfolio Token Compliance | ✅ Complete | Full audit: 565 values inventoried, token mapping, semantic promotion, canvas audits |
| 003 | Portfolio System Readiness | ✅ Complete | 9 system tokens created, product tokens authored, full screen spec |
| 004 | Portfolio Page Implementation | ⏳ Pending | Sparky implements from screen spec. Depends on Spec 003. |

## System Updates (from Spec 003)

- @3fn/core upgraded to v11.7.1 (product token pipeline + governance doc)
- 5 new primitives: space900, space1200, space1600, shadowOffsetY.600, blur400
- 3 new semantics: color.text.heading, space.sectioned.generous, space.sectioned.expansive
- 1 updated semantic: shadow.modal (dramatic elevation)
- 12 product tokens authored (9 layout, 3 motion)
- Agent prompts updated with product token awareness

## Key Decisions Made

- Product tokens use v11.7.1 pipeline (YAML → generated CSS/Swift/Kotlin)
- Visualization colors are application-level (not tokenized)
- Canvas font sizes (7-10px) are documented exceptions to type scale
- SectionHeading is NOT a component (CSS pattern only — Lina consultation)
- Section consolidation: 14 → 11 landmarks for accessibility
- Background image (808KB) to be compressed + lazy-loaded
- Rajdhani font to be self-hosted and subset to 500/600/700 Latin

## Next Steps

1. **Spec 004**: Sparky implements the portfolio page from the screen spec
2. **Responsive**: Full responsive behavior at 3 breakpoints (specified in screen spec)
3. **Performance**: Critical CSS inlining, image optimization, font subsetting
4. **Accessibility**: Focus trapping, text alternatives, reduced-motion compliance
- Blend mode imagery (historical figures, code screenshots)
- Stats bar with count-up animation on reveal
- Section navigation dropdown (About link)
- Light theme only
- Custom fonts: Rajdhani (display), Figtree (body), Commit Mono (mono)
- Custom domain deployment
- Additional scroll-linked animations (parallax, section transitions)

**Dependencies**:
- Font override mechanism (Ada — primitive-level font swap in pipeline)
- Any component modifications needed for portfolio context

**Out of scope**: Dark mode, WCAG theme, mobile optimization beyond basic stacking

---

## Phase 2: Mobile Refinement

**Goal**: Ensure the site is genuinely usable and visually coherent on mobile devices.

**Scope**:
- Responsive layouts for all sections (multi-column → single-column)
- Touch-friendly interactions (tap equivalents for hover states)
- Simplified or alternative data viz for small screens
- Nav behavior on mobile (hamburger? collapsed section links?)
- Performance audit for mobile devices
- Image optimization and lazy loading

---

## Phase 3: Dark Mode

**Goal**: Full dark theme that respects DesignerPunk's theming infrastructure.

**Scope**:
- Dark theme semantic overrides via `designerpunk.config.ts`
- Section color strategy adapted for dark context
- Blend mode adjustments (multiply ↔ screen swap)
- Data viz color adjustments for dark backgrounds
- System preference detection (`prefers-color-scheme`)
- Manual toggle option

---

## Phase 4: WCAG Mode

**Goal**: Enhanced accessibility theme meeting WCAG 2.1 AA across the board.

**Scope**:
- WCAG semantic overrides (enhanced contrast ratios)
- `prefers-reduced-motion` support (disable scroll-reveal, count-up, diagram animation)
- Focus indicator visibility on all interactive elements
- Screen reader audit and ARIA refinement
- Keyboard navigation for chord diagram and career timeline

---

## Phase 5+: Future Enhancements

- Live stats pulled from repo at build time
- Performance optimization (code splitting, critical CSS)
- Analytics integration
- Blog or case study sub-pages (if scope expands beyond single-page)
- Additional data visualizations
