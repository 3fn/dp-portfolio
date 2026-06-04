# Design Outline: Astro Site Migration

**Date**: 2026-06-01
**Updated**: 2026-06-04
**Spec**: 006-astro-site-migration
**Owner**: Leonardo (architecture) → Sparky (implementation)
**Status**: Design Outline — Feedback Incorporated
**Source material**: Deploy strategy discussion (2026-06-01), Sparky R1 feedback, current GitHub Actions workflow

---

## Context

The portfolio site at designerpunk.ai currently deploys by uploading `./src` to Dreamhost via SFTP. This creates several problems:

1. **No root index.html** — websites expect `index.html` at the served root, not nested in `/pages/`
2. **Asset paths are project-relative** — HTML references `/src/assets/...` and `/dist/...` which only work if the entire project root is the web root
3. **No multi-page support** — adding docs pages or new sections requires manual wiring
4. **No build optimization** — assets aren't minified, images aren't optimized, no cache-busting

Astro provides file-based routing, a proper build pipeline, and static output — solving all four issues while preserving the existing Web Component architecture.

---

## Why Astro

- **Static-first** — outputs plain HTML/CSS/JS, no runtime framework
- **Web Component native** — passes custom elements through without transformation
- **File-based routing** — `src/pages/index.astro` → `/`, `src/pages/docs/index.astro` → `/docs/`
- **TypeScript native** — matches existing project language
- **Asset pipeline** — handles fonts, images, CSS with optimization and cache-busting
- **Markdown support** — enables future docs pages from .md files
- **Vite 7 under the hood** — Vite for dev/build, Rollup for bundling (NOT esbuild for bundling — this matters for component isolation)

---

## Current State (Post Spec 005 + 007)

### Files that matter for migration:

| File | Role | Notes |
|------|------|-------|
| `src/pages/index.html` | Page content | Single page, all sections |
| `src/styles/portfolio.css` | Single stylesheet | Only CSS file loaded by the page |
| `src/scripts/*.ts` (9 files) | Page behavior | `token-evolution.ts` already has init/cleanup; others need conversion |
| `src/scripts/components.ts` | Component registration | Side-effect bundle — NOT a normal script |
| `src/components/product/` | Product web components | NavAboutPopover, NavHeaderContent |
| `dist/scripts/*.js` | esbuild output | Committed to git (NOT gitignored) |
| `dist/tokens/*.css` | Generated token CSS | System + component + product tokens |
| `src/assets/fonts/` | Font files + CSS | Three families: Rajdhani, Figtree, CommitMono |
| `src/assets/illustration/` | SVG illustrations | Referenced by path in HTML and JS |
| `src/assets/images/` | Favicon, OG image | Referenced in `<head>` meta tags |
| `primitive-assets/` | Logo SVG | Referenced by path in HTML |
| `.github/workflows/deploy.yml` | Deploy pipeline | Uploads `./src` via SFTP |

### Key observations:
- `dist/` is committed to git (not gitignored) — Astro output directory MUST be different
- `page.ts` deleted in Spec 005 but `dist/scripts/page.js` is stale — clean up
- Other CSS files in `src/styles/` (layout.css, stats.css, etc.) are NOT loaded — exploratory/unused
- Deploy workflow runs `npm run build:page` then uploads `./src`

---

## Architectural Decisions (Confirmed)

### 1. Asset Path Strategy: Clean URLs

**Decision**: Rewrite all paths. Drop `/src/` and `/dist/` from served URLs.

| Current served path | New served path |
|---|---|
| `/dist/tokens/DesignTokens.web.css` | `/tokens/DesignTokens.web.css` |
| `/dist/tokens/product/ProductTokens.web.css` | `/tokens/product/ProductTokens.web.css` |
| `/dist/tokens/ComponentTokens.web.css` | `/tokens/ComponentTokens.web.css` |
| `/dist/scripts/*.js` | `/scripts/*.js` |
| `/src/assets/fonts/*` | `/fonts/*` |
| `/src/assets/illustration/*` | `/illustration/*` |
| `/src/assets/images/*` | `/images/*` |
| `/src/styles/portfolio.css` | Astro CSS import (processed, fingerprinted) |
| `/primitive-assets/*` | `/brand/*` |

**Action required**: Grep all `.ts`, `.html`, and `.css` files for `/src/assets`, `/dist/`, and `/primitive-assets/` — update all references in the same commit.

### 2. Component Bundle: Separate esbuild Pre-Step

**Decision**: Keep the component/script bundle as a separate esbuild step. Output to `public/scripts/`.

**Rationale**: Web Components use `--loader:.css=text` for Shadow DOM stylesheets. Vite treats CSS imports as side-effects (injects `<style>` into document head). If Vite ever processes the component bundle, all Shadow DOM styling breaks silently. Strict separation required.

**Build sequence**: `npm run build:scripts && astro build`

### 3. Token CSS: Static in `public/tokens/`

**Decision**: Token CSS files go in `public/tokens/`, served statically without Vite processing.

**Rationale**: Tokens are pre-generated artifacts. Vite would warn on undefined custom properties and add scoping/hashing that breaks global token availability.

**Load order in Astro layout** (must be preserved):
1. `DesignTokens.web.css` (system tokens)
2. `ComponentTokens.web.css` (component tokens)
3. `ProductTokens.web.css` (product tokens)

### 4. Astro Output Directory: `_site/`

**Decision**: Set `outDir: '_site/'` in `astro.config.mjs`. NOT `dist/`.

**Rationale**: `dist/` is currently used for esbuild output and generated tokens (and is committed to git). Astro's build would wipe it. Using `_site/` avoids the collision entirely.

**`.gitignore` update**: Add `_site/` to gitignore.

### 5. Dev Server: Astro + Concurrent esbuild Watch

**Decision**: Use Astro's dev server with a concurrent esbuild watch for the script bundle.

```json
"dev": "concurrently \"astro dev\" \"npm run build:scripts -- --watch\""
```

### 6. CSS Strategy: Astro Import for portfolio.css

**Decision**: Import `portfolio.css` in the Astro layout (processed by Vite for minification/fingerprinting). Token CSS stays static.

### 7. `components.ts` Handling: Head Script, Not Island

**Decision**: `components.ts` registers custom elements and MUST execute before DOM renders. It stays as a `<script>` in `<head>` (not deferred, not an island, not `client:visible`).

### 8. CSS Structure: Single File for Phase 1

**Decision**: Keep `portfolio.css` as a single file. Split into per-section scoped styles in Phase 2 when sections become Astro components.

**Rationale**: Splitting is a refactor that adds ordering/specificity risk to a parity migration. Responsive media queries cross-cut multiple sections — they don't split cleanly without duplication. The natural split point is Phase 2 component extraction, where each Astro component gets a co-located `<style>` block with proper scoping.

**Prep**: Add section comment markers to portfolio.css if missing, to orient Phase 2 componentization.

### 9. ComponentTokens.web.css: Not Loaded (Intentional)

**Decision**: Do NOT add `ComponentTokens.web.css` to the Astro layout. No page components currently consume component tokens. If this changes in the future, add it between system and product token links.

---

## Migration Strategy

### Phase 1: Parity (this spec)

Get the existing single-page site building and deploying through Astro with zero visual changes.

1. **Install & configure Astro** — `astro.config.mjs` with `output: 'static'`, `outDir: '_site'`
2. **Set up `public/` directory** — tokens, scripts, fonts, illustrations, images, brand assets
3. **Create base layout** — extract `<head>` boilerplate (token links, font links, component script) into `src/layouts/Base.astro`
4. **Migrate index** — `src/pages/index.html` → `src/pages/index.astro`
5. **Update all asset paths** — grep and replace `/src/assets/`, `/dist/`, `/primitive-assets/` everywhere (HTML, TS, CSS)
6. **Update font `@font-face` paths** — font CSS files reference relative `.woff2`/`.otf` paths that will change
7. **Convert scripts to init/cleanup** — all 8 scripts (excluding components.ts) get export init/cleanup pattern following `token-evolution.ts` exemplar
8. **Update build pipeline** — `package.json` scripts: `build:scripts` (esbuild) → `build` (astro build)
9. **Update deploy workflow** — GitHub Actions: `astro build` then upload `_site/` instead of `./src`
10. **Clean up stale/orphaned artifacts** — delete 11 orphaned CSS files in `src/styles/` (layout.css, stats.css, etc.), delete `dist/scripts/page.js`
11. **Update `.gitignore`** — add `_site/`, plan for eventual `dist/` gitignore (separate concern)
12. **Verify** — site at designerpunk.ai works identically

**Grep-and-replace scope for path updates** (Step 5):
- All `.ts` files in `src/scripts/` and `src/components/`
- `src/pages/index.html` (becomes `index.astro`)
- `product/experience-map/pages/portfolio/portfolio.yaml`
- Font CSS files (`@font-face` url() paths)
- Any other file referencing `/src/assets/`, `/dist/`, or `/primitive-assets/`

**Note on current deploy**: The existing GitHub Actions workflow is broken/incomplete — it uploads only `./src` but the page depends on `/dist/` assets. The site works because `dist/` was previously uploaded (manually or by earlier workflow). Astro fixes this entirely by producing a single output directory.

### Phase 2: Multi-page (future spec)

- Shared layout with nav/footer
- Docs section (content collections from markdown)
- Proper 404 page

---

## Script Migration Plan

### Already done (Spec 007):
- `token-evolution.ts` — exports `init()` / `cleanup()` ✅

### Minimum viable for Phase 1 (simple IntersectionObserver patterns):
- `stats.ts` — DOMContentLoaded + observer → export init, return cleanup (disconnect observer)
- `reveal.ts` — DOMContentLoaded + observer → export init, return cleanup (disconnect observer)
- `scroll-nav.ts` — DOMContentLoaded + observer → export init, return cleanup (disconnect observer)

### Complex (animation frames + resize listeners):
- `chord.ts` — animation frame + resize → export init, return cleanup (cancelAnimationFrame + removeEventListener)
- `career.ts` — animation frame + resize → export init, return cleanup
- `ecosystem.ts` — click/keydown/resize → export init, return cleanup
- `agents.ts` — portrait hover listeners → export init, return cleanup

### Not converted (side-effect by design):
- `components.ts` — registers custom elements, no lifecycle to manage

**All converted scripts retain a DOMContentLoaded fallback** so they work as plain `<script type="module">` during transition.

---

## Success Criteria

- `astro build` produces `_site/` directory with `index.html` at root
- Site renders identically to current production
- GitHub Actions deploys successfully from Astro output
- Dev server (`astro dev`) works for local development
- No changes to HTML content or visual output
- All scripts export init/cleanup (except components.ts)
- Token CSS load order preserved (system → component → product)
- Future pages can be added by creating files in `src/pages/`

---

## Dependencies

- Spec 005 (CSS cleanup) ✅ Complete — migrate clean CSS
- Spec 007 (Audience repositioning) ✅ Complete — migrate updated content
- @3fn/core 11.8.0 ✅
- Dreamhost SFTP deploy target unchanged

---

## Changes From Spec 007 That Affect This Migration

1. **`src/scripts/token-evolution.ts`** — Already has init/cleanup pattern. Exemplar for other script conversions. Becomes a `client:visible` island candidate in Phase 2.
2. **Stats bar is full-bleed** — `.stats` parent has no `max-inline-size`; content constrained on inner `.stats__grid`. Layout extraction must preserve this.
3. **`.audience__*` replaces `.enterprise__*`** — The enterprise section no longer exists.
4. **Product token: `tokenEvolutionStickyOffset`** — Added to `product/tokens/layout.yaml`. Must be in `public/tokens/product/`.
5. **`token-evolution.ts` as migration pattern** — reference for converting other 7 scripts.

---

## Risks

| Risk | Mitigation |
|------|-----------|
| Shadow DOM CSS + Vite (CRITICAL) | Strict separation — components ONLY built by esbuild pre-step, never processed by Vite. Exclude from Astro source scope. |
| `dist/` directory collision | Use `_site/` as Astro output. Add to `.gitignore`. |
| Asset path breakage | Grep-and-replace all paths in single commit. Test locally before deploy. |
| Font `@font-face` path breakage | Update relative `url()` paths in font CSS files to match new structure. |
| First Astro deploy fails | Deploy to staging first, verify parity, then cut over to production. |
| OG image path change | Accept one-time social media cache invalidation (or set up redirect). |
| Node version | Pin to Node 22 in GitHub Actions (Astro 6 requires ≥22.12.0). |
| esbuild conflict with Vite | No conflict — they're separate steps. esbuild runs first, outputs to `public/`. Vite never sees component source. |
