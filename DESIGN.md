# Design notes

This is a snapshot, not a contract. When it conflicts with the author's current judgment, the author wins. Add to this only what was tried and consciously reverted.

## Ethos

**Signal > noise.** Site is maintained by 王雲帆 for 同路人 + 自己留档 — not a hiring page, not a marketing site. Restraint is the feature.

## Resume voice ≠ homepage voice

The author keeps separate resume materials elsewhere. Those use achievement-quantified, KPI-bulleted, EvidenceRef-cited *resume voice*. **Do not import that voice into the homepage.** Pull facts; rewrite in the homepage's restrained 第一人称.

Patterns that were tried and reverted:

- `高级前端工程师 / 前端 Lead` — title-as-identity. The Work section avoids "前端" entirely; `B → C → G → AI` is the spine instead.
- `Founder & CTO of stealth AI infra co` — fabricated company / role. Anonymize as `某 X` if needed; never invent a name that doesn't exist.
- Outcome bullets with placeholder numbers (`[X%]`, `[Xms]`). Either real or omitted.

## Tokens

All color / font / easing values live in `src/styles/site.css` (`:root` and `html[data-effective="dark"]`). Reference variables; never hardcode hex. Two themes share one semantic ladder: `--ink → --ink-soft → --muted → --muted-2`.

The background is cream (`--bg: #fafaf7`), not white. The grain overlay (`body::before`) is load-bearing for the warm feel.

`var(--mono)` (IBM Plex Mono) is the default. `var(--serif)` (Plex Serif) is reserved for `<em>` inside `.intro` and `.now` — the only italic on the site.

## Components

| File | Role |
|---|---|
| `SiteLayout.astro` | HTML shell, theme bootstrap, fonts, grain overlay |
| `SiteMenu.astro` | Fixed top-right trigger + overlay nav + theme swatches |
| `HomeHeader.astro` | H1 + blinking caret + status pill |
| `HomeIntro.astro` | 4-step path + breathing tagline |
| `HomeSection.astro` | Section header (title / zh / meta / rule) + slot |
| `NowList.astro` | Em-dash bulleted list (renders HTML via `set:html`) |
| `TimelineRow.astro` | 3-col grid: `when` \| body \| `tag` |
| `LinkGrid.astro` | 2-col `key` / `value`; Cloudflare `cfemail` aware |

Content lives in `src/data/home.ts`. Styles in `src/styles/site.css`. Those two files cover ~95% of changes.
