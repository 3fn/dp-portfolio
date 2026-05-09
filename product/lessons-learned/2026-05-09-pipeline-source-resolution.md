# Lessons Learned — Pipeline Reads from Installed Package, Not Local Source

**Date**: 2026-05-09
**Phase**: Spec 000 implementation (Task 1.1)
**Captured by**: Ada
**For**: All agents
**Related**: `2026-05-08-consumption-model-misunderstanding.md`

---

## What Happened

During Task 1.1 (font family primitive update), Ada edited `src/tokens/FontFamilyTokens.ts` and ran `npx designerpunk generate`. The pipeline output still showed the old values (Inter, SF Mono). Investigation revealed the pipeline CLI reads token definitions from `node_modules/@3fn/core/src/tokens/`, not from the local `src/tokens/` directory.

The fix required editing both the local source (canonical) AND the installed package copy (runtime). The local edit is the source of truth for the next publish; the node_modules edit makes the pipeline work now.

## Root Cause

Failure to verify how the pipeline resolves its inputs before making edits. The `designerpunk.config.ts` imports from `@3fn/core/config` — this was the signal that the pipeline is package-driven. Ada proceeded with the edit before confirming the data flow.

## Contributing Factors

1. **Same file exists in two locations.** `src/tokens/FontFamilyTokens.ts` (local) and `node_modules/@3fn/core/src/tokens/FontFamilyTokens.ts` (package) are near-identical. It's not obvious which one the pipeline reads without tracing the import chain.

2. **Previous lessons learned not consulted.** The 2026-05-08 lesson explicitly discusses the consumption model and `src/tokens/` ownership. Had Ada reviewed it before starting implementation, the dual-edit requirement would have been anticipated.

3. **"Edit then verify" vs "understand then edit."** The correct workflow for unfamiliar infrastructure is: understand the data flow → identify the correct edit location → make the change → verify. Ada skipped step 1.

## Impact

- ~5 minutes of investigation time (low)
- No incorrect output shipped (caught by verification step)
- Demonstrates the value of always running the pipeline after token changes

## Corrective Actions

1. **Before editing tokens, confirm which copy the pipeline reads.** Rule of thumb: if `designerpunk.config.ts` imports from `@3fn/core`, the pipeline reads from `node_modules/@3fn/core/src/tokens/`. Both locations must be updated for changes to take effect immediately.

2. **Consult existing lessons learned before starting implementation tasks.** The previous lesson about consumption modes directly addressed this scenario.

3. **Always run the pipeline after token edits.** The verification step caught the issue immediately. Never assume an edit took effect without confirming output.

---

## Summary

| # | Category | Severity | Route To |
|---|----------|----------|----------|
| 1 | Dual-edit requirement for token changes | Low | Ada, Lina (anyone editing tokens) |
| 2 | Consult lessons learned before implementation | Low | All agents (process learning) |
| 3 | Verify pipeline output after every token edit | Low | Ada (standard practice) |
