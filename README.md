# ARYX — Digital Creator Landing Page

A single-file, responsive landing page for **ARYX**, a digital creator offering
websites, logos, and brand identity design.

## What's inside
- **`index.html`** — the entire site. No build step, no dependencies (fonts load from Google Fonts). Just open it or host it anywhere.

## Sections
1. **Hero** — headline, positioning, and quick stats
2. **Services** — Websites · Logo & Identity · UI/UX
3. **Work** — portfolio tiles (placeholders — swap in real case studies)
4. **Process** — 4-step how-it-works
5. **Pricing** — three packages
6. **About** — personal intro + tool tags
7. **Contact / CTA** — mailto link to `aryx.design@gmail.com`
8. **Footer** — nav, links, socials

## Make it yours
- **Portfolio:** the four `#work` tiles use built-in CSS/SVG device mockups (browser, logo board, dashboard, phone) so the page is fully self-contained. To show real work, replace the `.work-preview` contents of a tile with an image: `<div class="work-preview"><img src="assets/your-shot.jpg" alt="" style="width:100%;height:100%;object-fit:cover"></div>` and update the `.work-meta` title/tag.
- **Copy & stats:** the hero stats (120+, 7 days, 98%) and pricing are sample numbers — edit to match reality.
- **Colors:** tweak the `--accent`, `--accent-2`, `--accent-3` and `--grad` variables at the top of the `<style>` block.
- **Social links:** the footer icons currently point to `#` — add your real profile URLs.

## Deploy
Drop `index.html` on any static host — GitHub Pages, Netlify, Vercel, or Cloudflare Pages. For GitHub Pages, enable Pages on this branch in repo settings.
