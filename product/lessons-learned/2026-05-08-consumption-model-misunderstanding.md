# Lessons Learned — Package Consumption Model Misunderstanding

**Date**: 2026-05-08
**Phase**: Phase 1 spec planning
**Captured by**: Thurgood
**For**: Stacy (Lessons Synthesis Review), All agents

---

## What Happened

Multiple agents (Leonardo, Thurgood) spent significant planning time treating "primitive token override" as a blocking architectural gap requiring its own spec. The conclusion was that products couldn't customize fonts because `defineConfig` only supports semantic overrides, not primitive overrides.

The actual architecture: products using `npx designerpunk init` receive editable token source (`src/tokens/`). They own the definitions directly. Font swaps are a two-line edit to a local file — no pipeline feature needed.

## Root Cause

Leonardo investigated the `defineConfig` API surface and correctly identified that no `primitiveOverrides` field exists. The error was in framing: "How do I override primitives from config?" rather than "How do I change primitives for my project?" The existence of `src/tokens/` in the product repo — editable source, not read-only output — was the answer, but no agent recognized it.

## Contributing Factors

1. **No documentation of the two consumption modes.** The Integration Guide and `defineConfig` docs don't explicitly state: "Products in source mode own their token definitions and can edit them directly."

2. **Anchoring on the wrong abstraction.** Once the problem was framed as "config API limitation," all subsequent investigation stayed within that frame. Nobody stepped back to ask why `src/tokens/` existed in the product repo.

3. **Unchallenged lessons-learned.** Leonardo's finding was marked "Blocking, Route to Ada" and accepted at face value by Thurgood without independent verification of the underlying assumption.

## Impact

- ~1 hour of planning time spent on a non-existent problem
- Spec breakdown included a phantom "Primitive Override Mechanism" spec
- Dependency graph showed a false blocker on font work

## Corrective Actions

1. **Document consumption modes** — The `@3fn/core` Integration Guide should explicitly describe Mode A (package-only) vs Mode B (source mode with editable tokens). Route to: Ada (documentation update in core package).

2. **Challenge framing, not just findings** — When an agent reports "X is impossible," verify the framing of the problem, not just the technical finding within that frame. "Is the config API the right place to solve this?" was never asked.

3. **Directory structure is architecture documentation** — A `src/tokens/` directory in a product repo IS the answer to "can I customize tokens?" Agents should treat project structure as a primary signal, not just API surfaces and docs.

---

## Summary

| # | Category | Severity | Route To |
|---|----------|----------|----------|
| 1 | Documentation gap (consumption modes) | Medium | Ada (core package docs) |
| 2 | Agent investigation methodology | Low | All agents (process learning) |
| 3 | Framing bias in problem-solving | Low | All agents (process learning) |
