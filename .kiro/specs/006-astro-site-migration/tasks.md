# Implementation Plan: Astro Site Migration

**Date**: 2026-06-04
**Spec**: 006 - Astro Site Migration (Phase 1: Parity)
**Status**: Implementation Planning
**Dependencies**: Spec 005 ✅, Spec 007 ✅

---

## Implementation Plan

Five parent tasks sequenced to build foundation first (Astro install + directory structure), then migrate content (page + assets), then scripts, then deploy pipeline, then verify + cleanup.

---

## Task List

- [x] 1. Astro Foundation & Directory Setup

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Astro installed and configured with `output: 'static'`, `outDir: '_site'`
  - `public/` directory populated with all static assets in clean URL structure
  - Base layout created with correct token/font/component loading
  - `npm run dev` starts Astro dev server + esbuild watch concurrently
  - `npm run build` produces `_site/` with correct structure

  **Primary Artifacts:**
  - `astro.config.mjs`
  - `src/layouts/Base.astro`
  - `public/` directory (tokens, fonts, illustration, images, brand)
  - Updated `package.json` scripts

  **Completion Documentation:**
  - Detailed: `.kiro/specs/006-astro-site-migration/completion/task-1-completion.md`
  - Summary: `docs/specs/006-astro-site-migration/task-1-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 1 Complete: Astro Foundation & Directory Setup"`
  - Verify: Check GitHub for committed changes

  - [x] 1.1 Install Astro and create config
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Sparky
    - Install `astro` and required dependencies
    - Create `astro.config.mjs` with `output: 'static'`, `outDir: '_site'`
    - Add `_site/` to `.gitignore`
    - Update `package.json` scripts: `dev`, `build`, `build:scripts`, `preview`
    - _Requirements: 1.1, 1.4_

  - [x] 1.2 Set up public directory structure
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Sparky
    - Create `public/tokens/` — copy token CSS from `dist/tokens/` (system + product)
    - Create `public/fonts/` — move font files from `src/assets/fonts/`
    - Create `public/illustration/` — move SVGs from `src/assets/illustration/`
    - Create `public/images/` — move from `src/assets/images/`
    - Create `public/brand/` — move from `primitive-assets/`
    - Create `public/scripts/` — esbuild output target
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 4.3_

  - [x] 1.3 Create Base.astro layout
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Create `src/layouts/Base.astro` with token links (system → product), font links, component script
    - Token link order: DesignTokens.web.css → ProductTokens.web.css
    - Component script in `<head>` (not deferred)
    - Import `portfolio.css` via Astro CSS import
    - Add slots for meta and head content
    - _Requirements: 4.1, 4.2, 4.3, 5.3_

  - [x] 1.4 Configure build pipeline
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Update `build:scripts` to output to `public/scripts/` (instead of `dist/scripts/`)
    - Add token copy step (`prebuild:astro` copies `dist/tokens/` → `public/tokens/`)
    - Configure `build` as `build:scripts && astro build`
    - Configure `dev` as `concurrently "astro dev" "npm run build:scripts -- --watch"`
    - Verify `npm run build` produces `_site/` with `index.html` at root
    - _Requirements: 1.2, 1.3, 5.1, 5.4, 9.1_

---

- [x] 2. Page Migration & Asset Paths

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - `src/pages/index.astro` renders identically to current `index.html`
  - All asset references use new clean URLs
  - Font `@font-face` declarations resolve correctly
  - Zero references to `/dist/`, `/src/assets/`, or `/primitive-assets/` in source
  - `npm run build` produces working `_site/`

  **Primary Artifacts:**
  - `src/pages/index.astro` (migrated from index.html)
  - Updated font CSS files
  - Updated TypeScript files (asset path references)
  - Updated `product/experience-map/pages/portfolio/portfolio.yaml`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/006-astro-site-migration/completion/task-2-completion.md`
  - Summary: `docs/specs/006-astro-site-migration/task-2-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 2 Complete: Page Migration & Asset Paths"`
  - Verify: Check GitHub for committed changes

  - [ ] 2.1 Migrate index.html to index.astro
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Create `src/pages/index.astro` using Base.astro layout
    - Move page-specific `<meta>` tags to layout's meta slot
    - Move inline critical CSS `<style>` to appropriate location (head slot or layout)
    - Move page body content into default slot
    - Add page-specific script references
    - _Requirements: 2.1, 1.2_

  - [x] 2.2 Update all asset path references
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Grep all `.ts`, `.astro`, `.css` files for `/dist/`, `/src/assets/`, `/primitive-assets/`
    - Update to new clean paths (`/tokens/`, `/scripts/`, `/fonts/`, `/illustration/`, `/images/`, `/brand/`)
    - Update `product/experience-map/pages/portfolio/portfolio.yaml`
    - Update hard-coded paths in `ecosystem.ts` MODAL_DATA
    - _Requirements: 7.1, 7.2, 7.4, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

  - [x] 2.3 Update font @font-face paths
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Update `url()` paths in rajdhani.css, figtree.css, commit-mono.css
    - Paths must resolve from new `/fonts/` location
    - Verify fonts render correctly in dev server
    - _Requirements: 7.3_

---

- [x] 3. Script Init/Cleanup Migration

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - All 7 scripts (excluding components.ts, token-evolution.ts) export init() and cleanup()
  - cleanup() removes all listeners, disconnects observers, cancels animation frames
  - Scripts self-initialize via DOMContentLoaded fallback
  - All interactive features function identically after conversion
  - No memory leaks on repeated init/cleanup cycles

  **Primary Artifacts:**
  - `src/scripts/stats.ts` (converted)
  - `src/scripts/reveal.ts` (converted)
  - `src/scripts/scroll-nav.ts` (converted)
  - `src/scripts/agents.ts` (converted)
  - `src/scripts/chord.ts` (converted)
  - `src/scripts/career.ts` (converted)
  - `src/scripts/ecosystem.ts` (converted)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/006-astro-site-migration/completion/task-3-completion.md`
  - Summary: `docs/specs/006-astro-site-migration/task-3-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 3 Complete: Script Init/Cleanup Migration"`
  - Verify: Check GitHub for committed changes

  - [x] 3.1 Convert simple observer scripts
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Convert `stats.ts`: export init → create observer, return cleanup (disconnect)
    - Convert `reveal.ts`: export init → create observer, return cleanup (disconnect)
    - Convert `scroll-nav.ts`: export init → create observer, return cleanup (disconnect)
    - All retain DOMContentLoaded fallback boot
    - Follow `token-evolution.ts` as exemplar pattern
    - _Requirements: 6.1, 6.2, 6.3_

  - [x] 3.2 Convert complex animation scripts
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Convert `chord.ts`: export init → setup canvas + listeners, return cleanup (cancelAnimationFrame + removeEventListener resize)
    - Convert `career.ts`: export init → setup canvas + listeners, return cleanup (cancelAnimationFrame + removeEventListener resize)
    - Convert `ecosystem.ts`: export init → setup modal + listeners, return cleanup (remove click/keydown/resize listeners)
    - Convert `agents.ts`: export init → setup hover listeners, return cleanup (remove hover listeners)
    - All retain DOMContentLoaded fallback boot
    - Verify all interactive features function after conversion
    - _Requirements: 6.1, 6.2, 6.3_

---

- [x] 4. Deploy Pipeline & Cleanup

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - GitHub Actions workflow updated to build Astro and deploy `_site/`
  - Node 20 pinned in workflow
  - Orphaned CSS files deleted
  - Stale `dist/scripts/page.js` deleted
  - `.gitignore` updated with `_site/`

  **Primary Artifacts:**
  - `.github/workflows/deploy.yml` (updated)
  - `.gitignore` (updated)
  - Deleted files (11 orphaned CSS + page.js)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/006-astro-site-migration/completion/task-4-completion.md`
  - Summary: `docs/specs/006-astro-site-migration/task-4-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 4 Complete: Deploy Pipeline & Cleanup"`
  - Verify: Check GitHub for committed changes

  - [x] 4.1 Update deploy workflow
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Update `.github/workflows/deploy.yml`: Node 22, `npm run build`, `localDir: './_site'`
    - Remove old `build:page` reference
    - Verify workflow syntax is valid
    - _Requirements: 8.1, 8.2, 8.3_

  - [x] 4.2 Clean up orphaned files
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Sparky
    - Delete 11 orphaned CSS files in `src/styles/` (layout.css, stats.css, why-build.css, critical-features.css, cta-footer.css, who-built.css, how-built.css, code-screenshots.css, responsive.css, utilities.css, reveal.css)
    - Delete `dist/scripts/page.js`
    - Verify no remaining references to deleted files
    - _Requirements: 10.1, 10.2_

  - [x] 4.3 Update .gitignore
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Sparky
    - Add `_site/` to `.gitignore`
    - _Requirements: 10.3_

  - [x] 4.4 Update product context for agents
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Add "Build & Serve" section to `product/overview.yaml` with: dev command, build command, asset directory structure, esbuild/Vite separation note
    - Keep brief — agents need commands and paths, not Astro internals
    - _Requirements: 8.4_

---

- [x] 5. Verification & Go-Live

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Staging deploy works with all assets loading (no 404s)
  - Visual parity confirmed at desktop and mobile breakpoints
  - All interactive elements function correctly
  - Production cut-over successful
  - designerpunk.ai accessible and working

  **Primary Artifacts:**
  - Verified staging deployment
  - Production deployment

  **Completion Documentation:**
  - Detailed: `.kiro/specs/006-astro-site-migration/completion/task-5-completion.md`
  - Summary: `docs/specs/006-astro-site-migration/task-5-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 5 Complete: Verification & Go-Live"`
  - Verify: Check GitHub for committed changes

  - [x] 5.1 Staging verification
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Build locally and serve `_site/` to verify no 404s
    - Side-by-side comparison with current production (desktop + mobile)
    - Test all interactive elements (modals, chord, career, token animation, reveal)
    - Test forced-colors mode and reduced-motion
    - Verify scroll-driven effects
    - Check network tab for any failed asset loads
    - _Requirements: 2.1, 2.2, 2.3, 8.4, 9.4_

  - [x] 5.2 Production go-live
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Push to main to trigger deploy workflow
    - Verify GitHub Actions completes successfully
    - Verify designerpunk.ai loads correctly with all assets
    - Verify OG image loads (may need cache time)
    - Confirm no regressions
    - _Requirements: 8.4, 2.1, 10.4_
