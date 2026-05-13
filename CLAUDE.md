# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (see `pnpm-workspace.yaml` — the repo is a single-package workspace, intentionally, to opt into `allowBuilds` for `esbuild`/`sharp`).

```bash
pnpm dev       # astro dev on :8787
pnpm build     # astro build → dist/
pnpm preview   # serve dist/ on :8787
pnpm deploy    # npx wrangler deploy (uploads dist/ as Cloudflare Worker assets)
```

There is no test suite, no linter, no typechecker script. Astro's build does basic type checking on `.astro` frontmatter; rely on `pnpm build` as the smoke test.

## Architecture

Static Astro 5 site (`output: 'static'` in `astro.config.mjs`) deployed as a Cloudflare Worker that serves `dist/` via the assets binding in `wrangler.jsonc`. There is no server-side runtime — every page is a prerendered HTML file.

The whole site is currently **one page**: `src/pages/index.astro`. It composes the page from per-section components (`HomeHeader`, `HomeIntro`, `HomeSection`, `NowList`, `TimelineRow`, `LinkGrid`, `SiteMenu`) wrapped in `SiteLayout`. To change *content* of the homepage, edit **`src/data/home.ts`** — the arrays there (`nowItems`, `workRows`, `investRows`, `writingRows`, `elsewhereLinks`, `navItems`) are the canonical source. Components are presentational and rarely need touching.

Styling is a single global stylesheet (`src/styles/site.css`) imported by `SiteLayout.astro`. There are no scoped `<style>` blocks in components — class names in components must match selectors in `site.css`. Theme is light/dark/auto, switched by setting `data-theme` / `data-effective` on `<html>`; an inline `<script is:inline>` in the layout applies the saved theme before paint to avoid flash.

Client interactivity lives in `src/scripts/site-interactions.js` (menu open/close, theme toggle, rotating status text, `M`/`T`/`Esc` keyboard shortcuts). It's imported once from `SiteLayout.astro` via a `<script>` tag — Astro bundles it. It hard-references DOM IDs (`menuBtn`, `menuOverlay`, `menuLabel`, `themeName`, `status`, `statusText`, `.sw[data-theme-btn]`); if you rename these in components, update the script too.

Email obfuscation in `elsewhereLinks` uses Cloudflare's `email-decode.min.js` (loaded in `SiteLayout.astro`). The `cfemail` value on the Email link is the CF-encoded address — regenerate it via Cloudflare's email protection if the address changes; do not hand-edit.

## Deployment notes

- `wrangler.jsonc` worker name is `wangyunfan` (the commit `bcda9c0 fix: wrangler name` corrected this — don't rename it without also updating Cloudflare).
- `compatibility_date` is intentionally near-current; bump it when adopting newer Workers runtime features.
- `pnpm deploy` runs `wrangler deploy` directly against `dist/`, so **always `pnpm build` first** (deploy does not chain build).
