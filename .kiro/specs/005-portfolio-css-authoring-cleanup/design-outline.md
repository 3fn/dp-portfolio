# Design Outline: Portfolio Web Authoring Compliance Audit & Cleanup

**Date**: 2026-06-01
**Spec**: 005-portfolio-css-authoring-cleanup
**Owner**: Sparky (implementation)
**Status**: Design Outline
**Source material**: Web-Authoring-Standards.md (@3fn/core 11.8.0), platform-implementation-guidelines.md, portfolio audit

---

## Context

The portfolio site was built before `Web-Authoring-Standards.md` and current platform implementation guidelines were formalized. It contains violations of the now-codified Hard Rules — primarily physical CSS properties where logical equivalents are required, hard-coded values that should be product tokens, and HTML/JS patterns that predate current accessibility and authoring standards.

This spec brings the existing portfolio into full compliance across CSS, HTML, and TypeScript before the Astro migration (Spec 006) begins — ensuring we migrate clean code, not legacy patterns.

---

## Scope

### In Scope

**CSS (Web-Authoring-Standards compliance):**
- **Logical properties sweep** — replace all physical directional properties with logical equivalents
- **Hard-coded value audit** — identify px/rem values that should reference system or product tokens
- **Focus pattern check** — verify `:focus-visible` usage (not bare `:focus`)
- **Reduced motion check** — verify all transitions/animations have `prefers-reduced-motion` handling
- **High contrast mode** — add `forced-colors` handling for interactive elements
- **Critical CSS in `<head>`** — same rules apply to the inline `<style>` block in `index.html`

**HTML (semantic and accessibility audit):**
- **Semantic structure** — proper use of landmarks (`<main>`, `<nav>`, `<section>`, `<article>`, `<aside>`, `<header>`, `<footer>`)
- **Heading hierarchy** — correct h1→h6 nesting without skipped levels
- **ARIA usage** — verify ARIA attributes are correct and necessary (no ARIA is better than bad ARIA)
- **Interactive element semantics** — buttons are `<button>`, links are `<a>`, no `<div onclick>`
- **Image accessibility** — all `<img>` have appropriate `alt` (or `alt=""` for decorative)
- **Form associations** — labels properly associated with inputs

**TypeScript/JS (authoring quality audit):**
- **Event handling patterns** — proper cleanup, passive listeners where appropriate
- **Accessibility in JS** — focus management, keyboard navigation, live region updates
- **Module organization** — are scripts well-structured for the Astro migration?
- **DOM query patterns** — safe selectors, null checks, type safety
- **Lessons learned** — document patterns that should inform Spec 006 approach

**Product components:**
- **NavAboutPopover** — Shadow DOM styles and behavior audit
- **NavHeaderContent** — Shadow DOM styles and behavior audit

### Out of Scope

- Content changes (that's spec 007 or later)
- Astro migration (that's spec 006 — but findings here inform 006's approach)
- Component Shadow DOM CSS from @3fn/core (governed by the package, not this project)

---

## Known CSS Violations (from initial review)

| Location | Violation | Fix |
|----------|-----------|-----|
| `.section-prefix` | `left: -36px` | `inset-inline-start: -36px` |
| `.viz-indent` | `padding-left: 20px` | `padding-inline-start: 20px` |
| `.why-build__easter` | `top`, `right` | `inset-block-start`, `inset-inline-end` |
| `.ecosystem__modal-close` | `top`, `right` | `inset-block-start`, `inset-inline-end` |
| `#career-tooltip` | `max-width: 270px` | `max-inline-size: 270px` (or product token) |
| `#chord-tip` | `border: 2px solid`, `max-width: 260px` | Token + logical |
| `.stats__hero-number` | `font-size: 8rem` | Product token or document rationale |
| Various | `overflow: hidden` | `overflow: hidden` is acceptable (not directional) |
| Critical CSS (`<head>`) | `max-width`, `gap` | Logical equivalents |

---

## HTML & JS Audit Areas (to be discovered by Sparky)

The following areas need Sparky's expert review — specific violations are not yet catalogued:

**HTML concerns to investigate:**
- Landmark structure and heading hierarchy
- ARIA correctness (over-use, misuse, or missing)
- Interactive element semantics (any `<div>` acting as buttons?)
- Image alt text completeness
- Form/input label associations

**TypeScript concerns to investigate:**
- Event listener cleanup patterns (memory leaks?)
- Keyboard navigation completeness
- Focus management during modal/popover interactions
- DOM query safety (null handling, type assertions)
- Script organization readiness for Astro island architecture

---

## Approach

1. **CSS sweep** — Sparky loads `Web-Authoring-Standards.md` via MCP, systematic top-to-bottom audit of `portfolio.css` and `index.html` inline styles
2. **HTML audit** — Sparky reviews `index.html` for semantic structure, accessibility, and ARIA correctness
3. **TypeScript audit** — Sparky reviews `src/scripts/*.ts` for event patterns, accessibility, and module organization
4. **Product components** — Sparky reviews `NavAboutPopover` and `NavHeaderContent` for Shadow DOM compliance
5. **Lessons learned document** — Sparky produces findings that inform Spec 006 (Astro migration) approach
6. **Implementation** — Fix violations, create product tokens as needed per Product-Token-Governance.md
7. **Verification** — Dev server comparison, no visual regressions

---

## Success Criteria

**CSS:**
- Zero physical directional properties in portfolio.css (exceptions documented per Web-Authoring-Standards)
- All interactive elements have `forced-colors` handling
- No bare `:focus` selectors
- All transitions covered by `prefers-reduced-motion`
- Zero hard-coded tokenizable values without product token or documented exception

**HTML:**
- Correct landmark structure (`<main>`, `<nav>`, etc.)
- Valid heading hierarchy (no skipped levels)
- No incorrect or unnecessary ARIA
- All interactive elements use semantic HTML (no `<div onclick>`)
- All images have appropriate alt text

**TypeScript:**
- No event listener leaks (proper cleanup)
- Keyboard navigation works for all interactive elements
- Focus management correct for modals/popovers
- Lessons learned document produced for Spec 006

**Overall:**
- Build passes, site renders identically (no visual regressions)
- Lessons learned document captures patterns and recommendations for Astro migration

---

## Deliverables

1. **Updated `src/styles/portfolio.css`** — fully compliant
2. **Updated `src/pages/index.html`** — semantic HTML, inline CSS compliant
3. **Updated `src/scripts/*.ts`** — any JS fixes identified
4. **Updated product components** — NavAboutPopover, NavHeaderContent if needed
5. **Product tokens** — any new tokens created per Product-Token-Governance.md
6. **Lessons learned document** — findings and recommendations for Spec 006

---

## Dependencies

- @3fn/core 11.8.0 installed ✅ (Web-Authoring-Standards.md available via MCP)
- Product-Token-Governance.md available ✅ (new in 11.8.0)
- Must complete before Spec 006 (Astro migration)
