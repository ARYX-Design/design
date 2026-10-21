import { useEffect, useState } from "react"
import { gallery } from "@/data/site"
import { cn } from "@/lib/utils"
import { Reveal, Section, SectionHead } from "./ui"

type Tile = (typeof gallery)[number]

/** Tries photo-N.jpg first (drop your own in assets/photos/), then the bundled studio artwork. */
function Pic({ t, className }: { t: Tile; className?: string }) {
  const sources = [`/assets/photos/photo-${t.n}.jpg`, `/assets/works/studio-${t.n}.svg`]
  const [i, setI] = useState(0)
  if (i >= sources.length) return <div className={cn("bg-stone", className)} />
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
      <SectionHead index="02" eyebrow="Studio work" title={<>The kind of work <em className="text-accent">we deliver.</em></>}>
        Studio concepts that show the range: identity, web, product and AI. Real client work replaces them as projects launch.
      </SectionHead>
      <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2">
        {gallery.map((t, i) => (
          <Reveal key={t.n} delay={(i % 2) * 0.08} className={i % 2 ? "sm:mt-16" : ""}>
            <button type="button" onClick={() => setOpen(t)} aria-label={`Open: ${t.title}`} className="group block w-full cursor-zoom-in text-left">
              <div className="overflow-hidden rounded-2xl border border-border">
                <Pic t={t} className="aspect-[4/3] w-full transition duration-700 group-hover:scale-[1.03]" />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="text-2xl">{t.title}</h3>
                <span className="text-sm text-muted-foreground tabular-nums">{String(t.n).padStart(2, "0")}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
            </button>
          </Reveal>
        ))}
      </div>
      {open && (
        <div role="dialog" aria-modal="true" aria-label={open.title} onClick={() => setOpen(null)} className="fixed inset-0 z-50 grid place-items-center bg-ink/80 p-6 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Pic t={open} className="aspect-[4/3] max-h-[78vh] w-full rounded-2xl" />
            <p className="mt-4 text-center text-paper/80"><span className="font-display text-xl text-paper">{open.title}</span> · {open.text}</p>
            <button type="button" onClick={() => setOpen(null)} aria-label="Close" className="absolute -top-3 -right-3 grid size-10 place-items-center rounded-full bg-paper text-ink">✕</button>
          </div>
        </div>
      )}
    </Section>
  )
}
