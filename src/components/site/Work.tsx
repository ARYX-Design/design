import { useEffect, useState } from "react"
import { gallery } from "@/data/site"
import { cn } from "@/lib/utils"
import { ScrollTilt, TiltCard } from "./Tilt"
import { Section, SectionHead } from "./ui"

type Tile = (typeof gallery)[number]

/** Tries photo-N.jpg first (drop your own in assets/photos/), then the bundled studio artwork. */
function Pic({ t, className }: { t: Tile; className?: string }) {
  const sources = [`/assets/photos/photo-${t.n}.jpg`, `/assets/works/studio-${t.n}.svg`]
  const [i, setI] = useState(0)
  if (i >= sources.length) return <div className={cn("bg-muted", className)} />
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
      <SectionHead title="Studio work.">
        Concepts that show the range, from identity to an AI assistant. Client projects take their place as they launch.
      </SectionHead>
      <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2">
        {gallery.map((t, i) => (
          <ScrollTilt key={t.n} className={i % 2 ? "sm:mt-24" : ""}>
            <button type="button" onClick={() => setOpen(t)} aria-label={`Open ${t.title}`} className="block w-full cursor-zoom-in text-left">
              <TiltCard className="shadow-depth overflow-hidden rounded-[1.6rem] bg-card" max={6}>
                <Pic t={t} className="aspect-[4/3] w-full" />
              </TiltCard>
              <h3 className="mt-5 text-2xl">{t.title}</h3>
              <p className="mt-1 text-muted-foreground">{t.text}</p>
            </button>
          </ScrollTilt>
        ))}
      </div>
      {open && (
        <div role="dialog" aria-modal="true" aria-label={open.title} onClick={() => setOpen(null)} className="fixed inset-0 z-50 grid place-items-center bg-ink/80 p-6 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Pic t={open} className="aspect-[4/3] max-h-[78vh] w-full rounded-3xl" />
            <p className="mt-4 text-center text-white/80"><span className="font-display text-xl font-bold text-white">{open.title}.</span> {open.text}</p>
            <button type="button" onClick={() => setOpen(null)} aria-label="Close" className="absolute -top-3 -right-3 grid size-10 place-items-center rounded-full bg-white text-ink">✕</button>
          </div>
        </div>
      )}
    </Section>
  )
}
