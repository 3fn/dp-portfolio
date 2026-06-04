# Task 3.1 Completion: Convert Simple Observer Scripts

**Date**: 2026-06-04
**Task**: 3.1 Convert simple observer scripts (stats, reveal, scroll-nav, agents)
**Type**: Implementation
**Status**: Complete

---

## Summary

Converted 4 scripts to the init/cleanup pattern following the `token-evolution.ts` exemplar.

---

## Scripts Converted

| Script | Cleanup Action | Complexity |
|--------|---------------|-----------|
| `stats.ts` | `observer.disconnect()` | Low — single observer |
| `reveal.ts` | `observer.disconnect()` | Low — single observer |
| `scroll-nav.ts` | `observer.disconnect()` | Low — single observer |
| `agents.ts` | Remove all mouseenter/mouseleave/load listeners | Medium — multiple listeners via cleanupFns array |

---

## Pattern Applied

```typescript
export function init(): () => void {
  // DOM queries + null guards
  // Setup logic (observers, listeners)
  return () => { /* cleanup */ };
}

// DOMContentLoaded fallback boot
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => init());
} else {
  init();
}
```

---

## Implementation Notes

- `stats.ts`: Reduced motion path returns empty cleanup (no observer created)
- `reveal.ts`: Minimal — just wrapped existing logic
- `scroll-nav.ts`: Maps (BG_MAP, GLOW_MAP, BORDER_MAP) remain module-level constants (immutable, no cleanup needed)
- `agents.ts`: Uses `cleanupFns` array pattern since multiple elements get multiple listeners

---

## Validation

- [x] All 4 scripts export `init()` returning cleanup function
- [x] All 4 scripts have DOMContentLoaded fallback boot
- [x] Cleanup removes all listeners/disconnects observers
- [x] No behavioral changes to existing functionality
