# Task 2.2 Completion: Implement Scroll-Tracked Active State

**Date**: 2026-06-12
**Task**: 2.2 Implement scroll-tracked active state + URL hash handling
**Type**: Implementation
**Status**: Complete

---

## Summary

Created `src/scripts/rosetta-nav.ts` — IntersectionObserver tracks which beat section is in viewport and updates nav rail's `aria-current`. Handles URL hash on page load.

---

## Implementation

- `IntersectionObserver` with `rootMargin: '-20% 0px -60% 0px'` — activates when section is in the upper-middle of viewport
- Updates `aria-current="true"/"false"` on all nav links when active section changes
- On page load: checks `window.location.hash`, scrolls to target if present
- Exports `init()` returning cleanup (`observer.disconnect()`)
- DOMContentLoaded fallback boot pattern
- Added to `build:scripts` in package.json (10 scripts total)

---

## Validation

- [x] Scroll updates active nav item
- [x] URL hash on load scrolls to beat
- [x] Exports init/cleanup (Astro-ready)
- [x] Passive-compatible (IntersectionObserver, no scroll listener needed)
- [x] Build passes (10 scripts, 2 pages)
