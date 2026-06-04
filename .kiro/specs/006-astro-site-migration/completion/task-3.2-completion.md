# Task 3.2 Completion: Convert Complex Animation Scripts

**Date**: 2026-06-04
**Task**: 3.2 Convert complex animation scripts (chord, career, ecosystem)
**Type**: Implementation
**Status**: Complete

---

## Summary

Converted 3 complex scripts to the init/cleanup pattern. Each has unique cleanup requirements beyond simple observer disconnect.

---

## Scripts Converted

| Script | Cleanup Actions | Approach |
|--------|----------------|----------|
| `chord.ts` | `cancelAnimationFrame` + `observer.disconnect` + `removeEventListener('resize')` | Wrapped entire `if(canvas)` block in init; cleanup cancels RAF and removes resize |
| `career.ts` | `observer.disconnect` + `removeEventListener('resize')` | Named resize handler (`onResize`) for proper removal |
| `ecosystem.ts` | `removeEventListener('resize')` via hoisted `cleanupConnectors` ref | Two sub-blocks (modal + connectors); hoisted cleanup variable bridges scope |

---

## Implementation Notes

- **chord.ts**: The `if(canvas)` block becomes a nested block scope `{ }` inside init() to preserve variable scoping. Entire animation lifecycle (RAF start/stop via observer) managed internally.
- **career.ts**: Resize handler was previously an anonymous arrow function — named it `onResize` to enable `removeEventListener`.
- **ecosystem.ts**: Two independent blocks (modal logic + connector lines) both wrapped inside one `init()`. The `drawConnectors` function is scoped inside the connector `if` block, so cleanup uses a hoisted `cleanupConnectors` variable set from inside the block.

---

## Validation

- [x] All 3 scripts export `init()` returning cleanup function
- [x] All 3 scripts have DOMContentLoaded fallback boot
- [x] chord.ts: cleanup cancels RAF + disconnects observer + removes resize listener
- [x] career.ts: cleanup disconnects observer + removes resize listener
- [x] ecosystem.ts: cleanup removes resize listener
- [x] All compile cleanly via esbuild
- [x] Full `npm run build` passes (esbuild + Astro)
