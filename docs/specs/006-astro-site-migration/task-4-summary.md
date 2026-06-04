# Task 4 Summary: Deploy Pipeline & Cleanup

**Spec**: 006-astro-site-migration
**Date**: 2026-06-04
**Status**: Complete

---

- **Deploy workflow**: Node 22, `npm run build`, uploads `_site/` via SFTP
- **Cleanup**: Deleted 11 orphaned CSS files + stale `dist/scripts/page.js`
- **Gitignore**: `_site/` confirmed (Task 1.1)
- **Product context**: Added Build & Serve section to `product/overview.yaml` (dev/build commands, asset structure, esbuild/Vite separation)
