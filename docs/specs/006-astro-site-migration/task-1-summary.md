# Task 1 Summary: Astro Foundation & Directory Setup

**Spec**: 006-astro-site-migration
**Date**: 2026-06-04
**Status**: Complete

---

- **Astro**: Installed, configured (`output: 'static'`, `outDir: '_site'`)
- **public/**: All static assets in clean URL structure (tokens, scripts, fonts, illustrations, images, brand)
- **Base.astro**: Layout with token cascade, font links, component script, portfolio.css import
- **Build pipeline**: `copy:tokens → build:scripts → astro build` produces correct `_site/` output
- **Dev**: `concurrently "astro dev" "build:scripts --watch"` configured
