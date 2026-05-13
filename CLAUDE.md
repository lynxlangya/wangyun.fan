# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev       # astro dev on :8787
pnpm build     # astro build → dist/
pnpm deploy    # npx wrangler deploy (uploads dist/ as Cloudflare Worker assets)
```

No test / lint / typecheck script. `pnpm build` is the smoke test.

## Where to make changes

- **Content** (any user-facing copy): `src/data/home.ts` — `nowItems`, `workRows`, `investRows`, `writingRows`, `elsewhereLinks`, `navItems`. Components in `src/components/` are presentational and rarely need touching.
- **Styles**: `src/styles/site.css` — single global stylesheet, imported once by `SiteLayout.astro`. No scoped styles in components. Theme is light/dark/auto via `data-theme` / `data-effective` on `<html>`; an inline `<script is:inline>` in the layout applies the saved theme before paint.
- **Client interactivity**: `src/scripts/site-interactions.js` — menu, theme toggle, status text rotation, `M`/`T`/`Esc` shortcuts. Hard-references DOM IDs (`menuBtn`, `themeName`, `status`, …); rename in components and script together.

**Before editing user-facing copy or visual style, read `DESIGN.md`.** It captures voice, tokens, and a short list of patterns that were tried and reverted (most importantly: do not bring resume-bullet voice into the homepage).

## Gotchas

- **Cloudflare email-decode**: the email in `elsewhereLinks` and `SiteMenu.astro` is XOR-encoded (first byte = key). Regenerate programmatically when the address changes; never hand-edit the `cfemail` hex.
- **Worker name `wangyunfan`** in `wrangler.jsonc` is load-bearing (commit `bcda9c0` exists because it was wrong). Don't rename without updating Cloudflare.
- **`pnpm deploy` does not chain `pnpm build`** — always build first.
