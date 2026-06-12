# NavAboutPopover: Migrate RGBA Blends to OKLCH

**Date**: 2026-06-10
**Agent**: Sparky
**Severity**: Low
**Blocked by**: Core team clarification on recommended product blend pattern

## Problem

`src/components/product/NavAboutPopover/NavAboutPopover.web.ts` still uses `rgba()` for interaction blends:

- Line 173: `background: rgba(0, 0, 0, var(--blend-hover-darker, 0.08));`
- Line 227: `background: rgba(255, 255, 255, 0.08);`
- Line 231: `background: rgba(255, 255, 255, 0.12);`

Post-v12.0.0, core components use `color-mix(in oklch, ...)` for blends. Product components should follow the same pattern.

## Waiting On

Core team response on recommended pattern for product components (captured in `.kiro/@3fn-core-feedback/2026-06-10-remaining-rgba-blend-patterns.md`):
- Use `color-mix(in oklch, ...)` directly?
- Reference a blend utility/token?
- Is `--blend-hover-darker` still valid in v12?

## When Unblocked

Replace the 3 rgba blend lines with the recommended OKLCH pattern. Verify hover/press states still produce correct visual feedback.
