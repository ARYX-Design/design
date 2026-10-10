import { useEffect, useState } from "react"
import { BlurFade } from "@/components/magicui/blur-fade"
import { gallery } from "@/data/site"
import { cn } from "@/lib/utils"
import { Section, SectionHead } from "./ui"

type Tile = (typeof gallery)[number]
/** Tries photo-N.jpg first (drop your own in assets/photos/), then the bundled artwork, then a gradient. */
function Pic({ t, className }: { t: Tile; className?: string }) {
  const sources = [`/assets/photos/photo-${t.n}.jpg`, `/assets/works/work-${t.n}.svg`]
  const [i, setI] = useState(0)
  if (i >= sources.length) return <div className={cn("bg-gradient-to-br from-violet/40 to-teal/30", className)} />
  return <img src={sources[i]} alt={t.alt} onError={() => setI((x) => x + 1)} className={cn("object-cover", className)} />
}

export function Work() {
  const [open, setOpen] = useState<Tile | null>(null)
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null)
    window.addEventListener("keydown", k)
    return () => window.removeEventListener("keydown", k)
  }, [])
  return (
    <Section id="work">
      <SectionHead eyebrow="Work" title={<>The ARYX <span className="text-grad">brand system.</span></>}>
        Logo, layout, type, color and launch: the pieces every project gets. Have your own photos? Drop them in <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-teal">assets/photos/</code> as <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-teal">photo-1.jpg</code> to <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-teal">photo-6.jpg</code> and they replace these automatically.
      </SectionHead>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((t, i) => (
          <BlurFade key={t.n} inView delay={0.06 * i} className="aspect-[4/3]">
            <button type="button" onClick={() => setOpen(t)} aria-label={`Open: ${t.title}`} className="group relative block size-full cursor-zoom-in overflow-hidden rounded-2xl border border-white/10 text-left">
              <Pic t={t} className="size-full transition duration-700 group-hover:scale-[1.06]" />
              <span className="absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-black/85 to-transparent px-5 pt-10 pb-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 max-sm:translate-y-0 max-sm:opacity-100">
                <b className="block font-display text-lg">{t.title}</b>
                <span className="text-sm text-muted-foreground">{t.text}</span>
              </span>
            </button>
          </BlurFade>
        ))}
      </div>
      {open && (
        <div role="dialog" aria-modal="true" aria-label={open.title} onClick={() => setOpen(null)} className="fixed inset-0 z-50 grid place-items-center bg-black/90 p-6 backdrop-blur-md">
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Pic t={open} className="aspect-[4/3] max-h-[78vh] w-full rounded-2xl" />
            <p className="mt-4 text-center font-display text-muted-foreground">{open.title}: {open.text}</p>
            <button type="button" onClick={() => setOpen(null)} aria-label="Close" className="absolute -top-3 -right-3 grid size-10 place-items-center rounded-full border border-white/20 bg-background text-lg">✕</button>
          </div>
        </div>
      )}
    </Section>
  )
}
