# DP-Portfolio — Roadmap

## Phase 1: Desktop Launch

**Goal**: Ship a functional, polished desktop experience that demonstrates DesignerPunk's capabilities to hiring managers.

**Scope**:
- All page sections built and styled (hero through footer)
- Sticky nav with scroll-linked color transitions
- Scroll-reveal animations (CSS-first, Intersection Observer)
- Hero chord diagram interaction (rest/hover states, tooltips)
- Career timeline data visualization (refactored to DP tokens/typography)
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
