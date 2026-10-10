# ARYX — Digital Creator Site

Landing page for **ARYX**: websites, logos, apps, games, AI agents and automation (from €19.99).

Built with **React 19 + Vite + Tailwind CSS 4**, with animated components from
[Magic UI](https://github.com/magicuidesign/magicui) (MIT). Magic UI is copy-paste, so the components used
live in `src/components/magicui/` and can be edited freely.

## Run it
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs dist/
npm run typecheck
```

## Layout
- `src/` — the React site (`components/site/*` sections, `components/magicui/*` copied Magic UI components, `data/site.ts` for all copy, prices and video lists, `art/` for the animated SVG service visuals).
- `assets/` — logo, brand docs (`brand/`), works artwork, 23+ promo/explainer/viral videos. Source of truth for media.
- `scripts/prepare-public.mjs` — runs before `dev`/`build` and copies only what the site needs (logo, works, posters, 3 videos, `insights.html`, `classic.html`) into `public/` (git-ignored) to keep the deploy small.
- `legacy/classic.html` — the previous hand-written single-file design, served at `/classic.html`.
- `insights.html` — the static global-economy Insights page, served at `/insights.html`.

## Make it yours
- **Copy, prices, links:** edit `src/data/site.ts`. The €490 / €1,900 prices and the About text are sample values; only "from €19.99" comes from the brief.
- **Photos:** save your own images as `assets/photos/photo-1.jpg` … `photo-6.jpg`. They replace the bundled artwork in the Work grid automatically.
- **Videos:** the Watch section uses 3 videos listed in `videos` (`src/data/site.ts`) and copied by `scripts/prepare-public.mjs`.
- **Colors:** brand tokens are CSS variables at the top of `src/index.css`.

## Deploy (Vercel)
`vercel.json` sets framework `vite`, `npm ci`, `npm run build`, output `dist`. Connect the repo in Vercel and it builds on every push.
