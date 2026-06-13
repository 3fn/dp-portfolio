# Lessons Learned — Out-of-Flow Sibling Shift & Verification Without a Rendered Page

**Date**: 2026-06-12
**Source**: Spec 008 (Rosetta documentation page) layout regression — fix in commit `3da6f57`
**Captured by**: Stacy
**For**: All product agents (Sparky, Kenya, Data) + Leonardo (cross-platform routing)

---

## What Happened

The Rosetta documentation page shipped with a broken three-column layout. The page declared a CSS grid with three tracks (nav `80px` | narrative `1fr` | viz `1fr`), but `.docs-nav` was styled `position: fixed`. A fixed element is removed from grid flow, so it no longer occupied track 1. Because `.docs-narrative` and `.docs-viz` relied on auto-placement rather than explicit track assignment, both siblings shifted one track to the left: narrative was crushed into the 80px rail, viz landed where narrative belonged, and track 3 sat empty.

The design-outline and the task-1.2 completion doc both specified the nav as `position: sticky`. The shipped code used `position: fixed` — an undocumented deviation introduced during styling. That single property change was the entire defect mechanism.

The fix (commit `3da6f57`) restored the nav to `position: sticky` as grid track 1, restored the three-track grid, and reverted a temporary 2-column-plus-padding workaround. Build passes; compiled output confirms the corrected layout.

Separately, the task-1.2 and task-5 completion docs had checked off "three-column grid renders" and "mobile renders correctly" — but those checks were attested against design intent, not against a rendered page. Sparky has since appended honest "Post-Release Correction" addenda to both docs (rather than silently re-checking boxes).

---

## Lessons

### 1. (Web-technical) Taking an element out of flow silently shifts siblings that reserve its slot

When a layout container (CSS grid or flexbox) reserves a slot for a child, and that child is then removed from flow via `position: fixed` or `position: absolute`, the reserved slot does not stay empty in the way you expect — the remaining in-flow siblings collapse or auto-place into the wrong tracks. The failure is silent: no error, no warning, just a visually wrong layout.

**Guardrails:**
- If a grid/flex child must be taken out of flow, do not rely on auto-placement for its siblings. Assign explicit `grid-column` / `grid-row` (or explicit order) to every sibling so their placement does not depend on the out-of-flow element's presence.
- Prefer `position: sticky` over `position: fixed` for elements that are meant to remain part of the layout grid — `sticky` keeps the element in flow and occupying its track. (`sticky` was what the design outline specified here; `fixed` was the deviation.)
- Treat any change from `static`/`sticky` to `fixed`/`absolute` on a grid or flex child as a layout-affecting change that requires a visual check, not just a build check.

### 2. (Process) Completion-doc checks attested without a rendered page are "checkbox theater"

This is the real release-blocker mechanism, and it is more important than the CSS lesson. The "three-column grid renders" and "mobile renders correctly" checkboxes were marked complete based on what the code was *intended* to produce, not on observing the page in a browser. A build that compiles is not a page that renders correctly. Visual acceptance criteria require visual verification.

**Guardrails:**
- A checkbox that asserts a visual or rendered outcome ("renders correctly", "three columns display", "responsive at mobile") may only be checked after viewing the rendered output — not from reading the source or a passing build.
- Distinguish in completion docs between *build-verified* claims (compiles, types pass, tokens resolve) and *render-verified* claims (observed in a browser/simulator). They are different evidence classes and should not be conflated.
- Sparky's response here is the correct pattern for a post-release correction: append an honest "Post-Release Correction" addendum documenting what was actually attested, rather than silently re-checking the box. Preserve the record of the gap.

---

## Cross-Platform Watch-For (Caution, Not a Parity Defect)

The out-of-flow sibling-shift pattern is **portable** — it is not a web-only quirk. The same class of bug appears wherever a layout reserves space for a child that is then pulled out of the normal layout pass:

- **SwiftUI**: `overlay`, `ZStack`, and `safeAreaInset` children that are positioned outside the parent stack's normal layout can leave siblings to fill space unexpectedly, or be displaced when the overlay child is assumed to occupy a slot it does not.
- **Jetpack Compose**: a `Box` with offset children (or `Modifier.offset` / absolute alignment) where siblings assume the offset child still reserves its position.

This is framed as an **awareness caution**, not a parity defect — the iOS and Android implementations of this page do not exist yet, and there is no observed drift to correct. The point is preventive: when Kenya and Data implement equivalent layered or pinned layouts, the same "reserved slot vs. out-of-flow child" reasoning applies.

**Routing**: This caution routes to **Leonardo** for Kenya/Data awareness when the Rosetta page (or any layered/pinned layout) is specified for native platforms.

---

## Open Items

| Item | Owner | Notes |
|---|---|---|
| Process change: completion docs must distinguish *build-verified* vs *render-verified* claims, and visual-outcome checkboxes require a rendered page before checking | Peter (decide) → Stacy (draft if approved) | The durable fix for the checkbox-theater mechanism. Recommend before adding tooling. |
| Optional: define scope for a screenshot smoke test (catch silent layout regressions automatically) | Peter (scope) → Sparky (implement if approved) | Counter-argument below — weigh cost vs. value before committing. |
| Cross-platform watch-for awareness when Rosetta page is specified for iOS/Android | Leonardo (route to Kenya/Data) | Caution only; revisit at native-implementation time. |

---

## Candid Counter-Arguments

- **Risk of over-documenting a single incident.** This is one CSS property on one page. There is a real risk of inflating a single bug into a heavyweight process burden that slows the team during a fast-moving phase. The web-technical lesson (Lesson 1) is arguably "things every web dev should know" and borders on ceremonial. I have kept it because the *specific failure mode* (auto-placement siblings shifting silently) is non-obvious and was genuinely missed — but if future readers find it obvious, prune it.
- **The process lesson is the one that earns its keep.** Lesson 2 (checkbox theater) is the higher-value capture and the actual release-blocker mechanism. If only one lesson survives review, keep this one.
- **The screenshot smoke test is not free.** Visual regression tooling carries setup, flakiness, and maintenance cost. For a docs site with a small number of pages, a disciplined manual render-check (Lesson 2's guardrail) may deliver most of the value at none of the cost. Recommend treating the smoke test as optional and scoping it deliberately rather than reflexively adding it because a regression occurred.
- **The cross-platform caution is speculative.** No iOS/Android implementation exists yet. There is a risk of preloading Kenya/Data with a caution they may never need, or that frames itself differently in native layout systems. Kept deliberately lightweight and routed through Leonardo rather than asserted as a parity requirement.

---

## Applies To

- All product web work involving grid/flex layouts with out-of-flow children (Sparky)
- All product completion-doc authoring that includes visual/rendered acceptance criteria (all platform agents)
- Native layered/pinned layouts when specified (Kenya, Data — via Leonardo)
