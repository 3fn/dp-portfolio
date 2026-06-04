# Design Document: Astro Site Migration

**Date**: 2026-06-04
**Spec**: 006 - Astro Site Migration (Phase 1: Parity)
**Status**: Design Phase
**Dependencies**: Spec 005 ✅, Spec 007 ✅

---

## Overview

Phase 1 is a parity migration: same content, same behavior, different build tool. The output is a single `_site/` directory that Astro produces, deployed to Dreamhost instead of the current broken `./src` upload.

No visual changes. No content changes. No architectural experiments. Just a working build pipeline with clean URLs.

---

## Architecture

### Build Pipeline (New)

```
npm run build
  ├── build:scripts (esbuild)
  │   └── src/scripts/*.ts → public/scripts/*.js
  │       src/components/**/*.ts → public/scripts/components.js
  │       (--loader:.css=text for Shadow DOM stylesheets)
  │
  └── astro build
      ├── src/pages/index.astro → _site/index.html
      ├── public/ (copied verbatim) → _site/
      │   ├── tokens/*.css
      │   ├── scripts/*.js
      │   ├── fonts/
      │   ├── illustration/
      │   ├── images/
      │   └── brand/
      └── src/styles/portfolio.css (imported, minified) → _site/_astro/portfolio.[hash].css
```

### Directory Structure (New)

```
project root/
├── astro.config.mjs          ← NEW
├── public/                   ← NEW (static assets, copied to _site/ verbatim)
│   ├── tokens/
│   │   ├── DesignTokens.web.css
│   │   └── product/ProductTokens.web.css
│   ├── scripts/              ← esbuild output target (moved from dist/scripts/)
│   ├── fonts/                ← moved from src/assets/fonts/
│   ├── illustration/         ← moved from src/assets/illustration/
│   ├── images/               ← moved from src/assets/images/
│   └── brand/                ← moved from primitive-assets/
├── src/
│   ├── layouts/
│   │   └── Base.astro        ← NEW (head boilerplate, token links, component script)
│   ├── pages/
│   │   └── index.astro       ← MIGRATED from index.html
│   ├── styles/
│   │   └── portfolio.css     ← KEPT (single file, imported by layout)
│   ├── scripts/              ← SOURCE (not served directly)
│   └── components/           ← SOURCE (built by esbuild, not Vite)
├── _site/                    ← NEW (Astro output, gitignored, deployed)
└── dist/                     ← LEGACY (tokens still generated here by @3fn/core pipeline)
```

### Key Separation

| Concern | Tool | Source | Output |
|---------|------|--------|--------|
| Page HTML | Astro | `src/pages/*.astro` | `_site/*.html` |
| Page CSS | Astro/Vite | `src/styles/portfolio.css` | `_site/_astro/portfolio.[hash].css` |
| Scripts + Components | esbuild | `src/scripts/*.ts`, `src/components/**` | `public/scripts/*.js` |
| Tokens | @3fn/core pipeline | `src/tokens/` | `dist/tokens/` → copied to `public/tokens/` |
| Static assets | None (pass-through) | `public/` | `_site/` |

---

## Base Layout (`src/layouts/Base.astro`)

```astro
---
// Base.astro — shared <head> content
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <slot name="meta" />

  <!-- Token cascade: system → product -->
  <link rel="stylesheet" href="/tokens/DesignTokens.web.css">
  <link rel="stylesheet" href="/tokens/product/ProductTokens.web.css">

  <!-- Fonts -->
  <link rel="stylesheet" href="/fonts/rajdhani/rajdhani.css">
  <link rel="stylesheet" href="/fonts/figtree/figtree.css">
  <link rel="stylesheet" href="/fonts/commit-mono/commit-mono.css">

  <!-- Component registration (must execute before DOM) -->
  <script src="/scripts/components.js" type="module"></script>

  <slot name="head" />
</head>
<body>
  <slot />
</body>
</html>
```

---

## Script Migration Pattern

### Target Pattern (all scripts except components.ts)

```typescript
// src/scripts/stats.ts — example conversion

export function init(): () => void {
  const elements = document.querySelectorAll('.stats__value');
  if (!elements.length) return () => {};

  const observer = new IntersectionObserver(/* ... */);
  elements.forEach(el => observer.observe(el));

  // Return cleanup
  return () => {
    observer.disconnect();
  };
}

// DOMContentLoaded fallback (backward-compatible boot)
if (typeof window !== 'undefined') {
  const boot = () => { init(); };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
}
```

### Script Status

| Script | Complexity | Current Pattern | Migration Work |
|--------|-----------|-----------------|----------------|
| `token-evolution.ts` | Medium | init/cleanup ✅ | None (Spec 007) |
| `stats.ts` | Low | DOMContentLoaded + observer | Add export wrapper |
| `reveal.ts` | Low | DOMContentLoaded + observer | Add export wrapper |
| `scroll-nav.ts` | Low | DOMContentLoaded + observer | Add export wrapper |
| `agents.ts` | Medium | Immediate exec + hover listeners | Add export + cleanup |
| `chord.ts` | High | Immediate + resize + animFrame | Add export + cleanup (frame cancel + resize remove) |
| `career.ts` | High | Immediate + resize + animFrame | Add export + cleanup (frame cancel + resize remove) |
| `ecosystem.ts` | High | Immediate + resize + click/key | Add export + cleanup (multiple listeners) |
| `components.ts` | N/A | Side-effect (registers elements) | NO CONVERSION — stays as-is |

---

## Token Copy Step

Tokens are generated by `@3fn/core` pipeline into `dist/tokens/`. For Astro, they need to be in `public/tokens/`. Options:

**Option A**: Copy step in build (`cp -r dist/tokens/ public/tokens/`)
**Option B**: Symlink (`public/tokens` → `../dist/tokens`)
**Option C**: Change `@3fn/core` output config to write directly to `public/tokens/`

**Recommendation**: Option A (copy step) — explicit, no symlink fragility, no upstream config change. Add as `prebuild:astro` script.

---

## Deploy Workflow (Updated)

```yaml
name: Build & Deploy to Dreamhost

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - name: Configure npm for GitHub Packages
        run: |
          echo "@3fn:registry=https://npm.pkg.github.com" >> ~/.npmrc
          echo "//npm.pkg.github.com/:_authToken=${{ secrets.NPM_READ_PACKAGES_TOKEN }}" >> ~/.npmrc
      - run: npm install
      - run: npm run build
      - uses: wangyucode/sftp-upload-action@v2.0.2
        with:
          host: ${{ secrets.DREAMHOST_SFTP_HOST }}
          port: 22
          username: ${{ secrets.DREAMHOST_USERNAME }}
          password: ${{ secrets.DREAMHOST_PASSWORD }}
          localDir: './_site'
          remoteDir: ${{ secrets.DREAMHOST_REMOTE_DIR }}
          sftpArgs: '-o ConnectTimeout=5'
```

---

## Error Handling

Not applicable for the migration itself. Script init functions should silently no-op if expected DOM elements are missing (graceful degradation pattern from Spec 005).

---

## Testing Strategy

### Visual Verification
- Side-by-side comparison of current production vs `_site/` output at desktop + mobile breakpoints
- All interactive elements function (modals, chord, career chart, token animation)
- Forced-colors mode renders correctly
- Reduced motion respects preferences

### Build Verification
- `npm run build` completes without errors
- `_site/index.html` exists at root
- All referenced assets exist in `_site/`
- No 404s when serving `_site/` locally

### Deploy Verification
- Deploy to staging subdomain first
- Verify all assets load (network tab — no 404s)
- Cut over to production after parity confirmed

---

## Design Decisions

### Decision 1: Clean URLs Over Preserve-and-Patch

**Options**: (A) Rewrite all paths to clean URLs, (B) Mirror existing `/src/`+`/dist/` in `public/`

**Decision**: Option A.

**Rationale**: The ugly paths leak project internals. Astro forces rethinking asset placement anyway. One clean pass now avoids perpetuating debt. Risk is bounded — grep identifies all references.

### Decision 2: Single CSS File (Phase 1)

**Options**: (A) Keep portfolio.css as single file, (B) Split into per-section files

**Decision**: Option A.

**Rationale**: Splitting adds ordering/specificity risk to a parity migration. Responsive media queries cross-cut sections. The natural split boundary is Phase 2 component extraction with scoped `<style>` blocks.

### Decision 3: Script Init/Cleanup In-Scope

**Options**: (A) Convert all scripts to init/cleanup, (B) Wrap existing auto-executing scripts

**Decision**: Option A.

**Rationale**: Wrapping provides zero Astro benefit — scripts still leak listeners on dev server HMR reloads. The pattern exists (`token-evolution.ts`). Converting enables proper dev experience and makes Phase 2 islands trivial.

### Decision 4: esbuild Separation (Not Vite Integration)

**Options**: (A) Keep esbuild as separate pre-step, (B) Integrate into Vite via plugin

**Decision**: Option A.

**Rationale**: Shadow DOM CSS-as-text (`--loader:.css=text`) would silently break under Vite. Strict tool separation eliminates this risk class entirely. Long-term Vite unification is Phase 2+ if ever.
