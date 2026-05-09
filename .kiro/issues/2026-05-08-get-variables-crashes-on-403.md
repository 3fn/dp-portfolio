# Issue: getVariables Crashes on 403 Response

**Date**: 2026-05-08
**Severity**: Medium
**Domain**: Rosetta / Figma Pipeline
**Route to**: Ada (@3fn/core)
**Package**: @3fn/core@11.1.3

---

## Summary

`ConsoleMCPClientImpl.getVariables()` throws `TypeError: tokens.map is not a function` when the Figma REST API returns a 403 due to missing `file_variables:read` scope on the personal access token. The method assumes the response is always an array and doesn't handle error responses gracefully.

## Error

```
⚠ Failed to read existing Figma variables: TypeError: tokens.map is not a function
    at ConsoleMCPClientImpl.getVariables (ConsoleMCPClientImpl.js:154:31)
    at DesignExtractor.readTokenBindings (DesignExtractor.js:1609:27)
    at async Promise.all (index 1)
    at async DesignExtractor.extractComponentAnalysis (DesignExtractor.js:2686:47)
```

## Root Cause

`getVariables()` calls `figma_get_token_values` which hits the Figma Variables REST API. When the PAT lacks `file_variables:read` scope, the API returns:

```json
{"status": 403, "error": true, "message": "Invalid scope(s): ... This endpoint requires the file_variables:read scope"}
```

The Console MCP tool returns this error object. `getVariables()` then attempts to call `.map()` on it, which fails because it's an object, not an array.

## Impact

- `readTokenBindings()` fails, returning no token bindings
- The extractor continues (the error is caught in `extractComponentAnalysis`), but without the variable library
- `translateByBinding()` can't map resolved variable names to DTCG token paths as effectively
- Classification accuracy is reduced — some bindings that would resolve to semantic tokens only resolve to primitives (or not at all)

## Fix

In `ConsoleMCPClientImpl.getVariables()` (~line 154), add a guard:

```typescript
const result = await this.callTool('figma_get_token_values', { fileKey });

// Guard: API may return error object instead of array
if (!Array.isArray(result)) {
  return [];
}

return result.map(/* ... */);
```

Optionally log a warning so the user knows the variable library is unavailable:

```typescript
if (!Array.isArray(result)) {
  console.warn('[figma] Variable library unavailable — check PAT has file_variables:read scope');
  return [];
}
```

## User-Side Fix

Regenerate or edit the Figma personal access token to include the **Variables: Read** scope, then update `.env`.

---

*Discovered during Nav component extraction. The extractor completes but with degraded accuracy.*
