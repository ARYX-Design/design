// Copies the static files the site needs into public/ (git-ignored), so Vite serves and ships them.
// Source of truth stays in assets/, insights.html and legacy/. Only the videos used on the site are
// shipped; the other videos stay in the repo (assets/video) but are not deployed.
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const pub = join(root, "public")
rmSync(pub, { recursive: true, force: true })
mkdirSync(join(pub, "assets", "video"), { recursive: true })

const copy = (from, to) => {
  const src = join(root, from)
  if (!existsSync(src)) { console.warn("skip (missing):", from); return }
  cpSync(src, join(pub, to), { recursive: true })
}

copy("assets/logo", "assets/logo")
copy("assets/works", "assets/works")
copy("assets/photos", "assets/photos")
copy("assets/video/posters", "assets/video/posters")
// videos shown on the Watch section
for (const v of ["aryx-promo-16x9", "aryx-ai-explainer-16x9", "aryx-ai-support-9x16"]) copy(`assets/video/${v}.mp4`, `assets/video/${v}.mp4`)
// extra pages
copy("insights.html", "insights.html")
copy("legacy/classic.html", "classic.html")
console.log("public/ ready")
