# Task 3.1 Completion: Extract and Implement Ecosystem Modal + Connectors

**Date**: 2026-05-26
**Type**: Implementation | Tier 2 - Standard

## Artifacts Created
- `src/scripts/ecosystem.ts` — 209 lines

## Implementation Notes

### Modal (FLIP animation)
- FLIP pattern: capture card rect → set modal position → apply inverse transform → animate to final
- Close: reverse FLIP back to card position, fade out
- Focus trap via `inert` attribute on all body children except modal/backdrop
- Focus returns to triggering card on close
- Keyboard: Enter/Space on cards opens modal, Escape closes
- `prefers-reduced-motion`: instant show/hide (opacity only, no transform)
- Close triggers: backdrop click, Escape key, close button

### Connectors (SVG)
- Waits for illustration `<object>` load event (double rAF for layout stability)
- Reads pointer-location circle cx/cy from illustration's contentDocument
- Scales by (rendered size / viewBox size) for page-relative coordinates
- Draws line + shadow dot + color dot for each system card
- Redraws on window resize
- Graceful degradation: if contentDocument inaccessible, no connectors drawn

## Validation
- esbuild compiles successfully (12.9KB output)
- Modal data matches prototype content exactly
- All 3 close triggers implemented
- Keyboard activation on cards (role="button" already in HTML)
