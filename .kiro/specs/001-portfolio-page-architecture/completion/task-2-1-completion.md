# Task 2.1 Completion: Add href Prop to Types and Schema

**Date**: 2026-05-10
**Task**: 2.1 Add `href` prop to types and schema
**Type**: Implementation
**Status**: Complete

---

## Artifacts Modified

- `src/components/core/Button-CTA/types.ts` — Added `href?`, `target?`, `rel?` to `ButtonProps`
- `src/components/core/Button-CTA/Button-CTA.schema.yaml` — Added three new properties

## Implementation Details

### Props Added

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `href` | `string` | false | When set, renders `<a>` instead of `<button>`. Triggers polymorphic rendering. |
| `target` | `string` | false | Link target. When `"_blank"`, auto-sets `rel`. Only applies when `href` set. |
| `rel` | `string` | false | Link rel. Auto-set to `"noopener noreferrer"` when `target="_blank"`. |

### Key Decisions

1. **`disabled` JSDoc updated** — Added note that `disabled` is ignored when `href` is set (links aren't disableable per DesignerPunk philosophy).
2. **`onPress` remains required** — Even with `href`, `onPress` can still fire (e.g., for analytics tracking). The link navigates AND the callback fires.
3. **No `iconPosition` yet** — The design doc references `iconPosition="trailing"` for outbound links, but this prop doesn't exist in the current API. Will need to be addressed in Task 2.2 or flagged as a gap.

### Observation: `iconPosition` Gap

The design doc and requirements reference `icon="external-link" iconPosition="trailing"` for outbound CTAs. But Button-CTA currently only supports a leading icon (no `iconPosition` prop). This needs resolution before Task 10 (Phase H: CTAs) can fully deliver.

Options:
1. Add `iconPosition` prop in Task 2.2 alongside the polymorphic rendering
2. Flag for Peter and defer to Spec 005 (Visual Refinements)

Flagging for Peter's decision.

## Validation (Tier 2: Standard)

### Syntax Validation
- ✅ Token pipeline passes
- ✅ All 35 existing tests pass (no regression)

### Functional Validation
- ✅ Props are additive (no existing interface changes)
- ✅ Schema documents polymorphic behavior and auto-rel
- ✅ JSDoc includes usage examples and remarks

### Requirements Compliance
- ✅ Requirement 2, AC5: `href` documented in schema as optional string
