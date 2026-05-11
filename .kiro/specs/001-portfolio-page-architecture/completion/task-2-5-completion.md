# Task 2.5 Completion: Update README

**Date**: 2026-05-10
**Task**: 2.5 Update README
**Type**: Setup
**Status**: Complete

---

## Artifacts Modified

- `src/components/core/Button-CTA/README.md` — Added polymorphic rendering docs, iconPosition, updated contracts table and API reference

## Implementation Details

### Sections Added/Updated

| Section | Change |
|---------|--------|
| Key Features | Added after: "Polymorphic Rendering" section with full documentation |
| Behavioral Contracts | Updated from 7 to 9 contracts, added `content_renders_link` and `layout_icon_position` |
| API Reference | Added `href`, `target`, `rel`, `iconPosition` props; updated `icon` description; noted `disabled` ignored with href |

### Polymorphic Rendering Section Covers

- Usage examples (button vs link rendering)
- Behavior differences table (keyboard, role, disabled, aria-disabled, rel)
- Security note (auto `rel="noopener noreferrer"`)
- Icon position usage (trailing for outbound links)

## Validation (Tier 1: Minimal)

### Requirements Compliance
- ✅ Requirement 2, AC9: README documents `href` prop and polymorphic behavior
- ✅ Requirement 2, AC9: Documents that `disabled` is ignored when `href` is set
- ✅ Requirement 2, AC10: Documents explicit icon approach for outbound links
