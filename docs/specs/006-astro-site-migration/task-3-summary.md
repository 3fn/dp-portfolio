# Task 3 Summary: Script Init/Cleanup Migration

**Spec**: 006-astro-site-migration
**Date**: 2026-06-04
**Status**: Complete

---

Converted 7 scripts to export `init()` / `cleanup()` with DOMContentLoaded fallback boot:

- **Simple** (3.1): stats, reveal, scroll-nav, agents — observer disconnect + listener removal
- **Complex** (3.2): chord (RAF + observer + resize), career (observer + resize), ecosystem (resize via hoisted ref)
- `components.ts` not converted (side-effect by design)
- Full build passes (9 scripts bundled, Astro builds successfully)
