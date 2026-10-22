import { useEffect, useRef, useState } from "react"
import { onScroll, reducedMotion } from "@/components/fx/scroll"
import { SplitWords } from "@/components/fx/Split"
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

const useWide = () => {
  const q = "(min-width: 1024px)"
  const [wide, setWide] = useState(() => typeof window !== "undefined" && window.matchMedia(q).matches)
  useEffect(() => {
    const m = window.matchMedia(q)
    const on = () => setWide(m.matches)
    m.addEventListener("change", on)
    return () => m.removeEventListener("change", on)
  }, [])
  return wide
}

const intro = "Concepts that show the range, from identity to an AI assistant. Client projects take their place as they launch."

/** Desktop: the section pins and the cards travel sideways, turning in 3D as they pass the centre. */
function Rail({ onOpen }: { onOpen: (t: Tile) => void }) {
  const sec = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  useEffect(() => {
    const measure = () => {
      const t = track.current
      if (t) setHeight(t.scrollWidth - window.innerWidth + window.innerHeight)
    }
    measure()
    window.addEventListener("resize", measure)
    const imgs = track.current?.querySelectorAll("img") ?? []
    imgs.forEach((im) => im.addEventListener("load", measure))
    return () => window.removeEventListener("resize", measure)
  }, [])
  useEffect(() => onScroll(() => {
    const s = sec.current, t = track.current
    if (!s || !t) return
    const r = s.getBoundingClientRect()
    const span = s.offsetHeight - window.innerHeight
    if (r.bottom < 0 || r.top > window.innerHeight) return
    const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0
    const dist = t.scrollWidth - window.innerWidth
    t.style.transform = `translate3d(${-p * dist}px,0,0)`
    if (bar.current) bar.current.style.transform = `scaleX(${p})`
    if (reducedMotion) return
    const vw = window.innerWidth
    t.querySelectorAll<HTMLElement>("[data-card]").forEach((c) => {
      const b = c.getBoundingClientRect()
      const d = (b.left + b.width / 2 - vw / 2) / vw
      c.style.transform = `perspective(1400px) rotateY(${d * -28}deg) scale(${1 - Math.min(Math.abs(d), 1) * 0.1})`
    })
  }), [height])
  return (
    <section id="work" ref={sec} className="relative scroll-mt-0" style={{ height: height || undefined }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div ref={track} className="flex items-center gap-10 pr-[12vw] pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] will-change-transform">
          <div className="w-[30vw] max-w-md shrink-0">
            <SplitWords text="Studio work." className="text-[clamp(2.8rem,5.6vw,5rem)] leading-[0.95]" />
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{intro}</p>
            <p className="mt-10 text-sm text-muted-foreground">Keep scrolling</p>
          </div>
          {gallery.map((t) => (
            <button key={t.n} type="button" data-card data-cursor="View" onClick={() => onOpen(t)} aria-label={`Open ${t.title}`} className="block w-[min(52vw,720px)] shrink-0 cursor-zoom-in text-left will-change-transform">
              <div className="shadow-depth overflow-hidden rounded-[1.8rem] bg-card"><Pic t={t} className="aspect-[4/3] w-full" /></div>
              <div className="mt-5 flex items-baseline justify-between gap-6">
                <h3 className="text-3xl">{t.title}</h3>
                <p className="max-w-xs text-right text-muted-foreground">{t.text}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="mx-auto mt-12 h-[3px] w-[min(72rem,calc(100vw-3rem))] overflow-hidden rounded-full bg-border">
          <div ref={bar} className="h-full origin-left bg-primary" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </section>
  )
}

function Stack({ onOpen }: { onOpen: (t: Tile) => void }) {
  return (
    <Section id="work">
      <SectionHead title="Studio work.">{intro}</SectionHead>
      <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2">
        {gallery.map((t, i) => (
          <ScrollTilt key={t.n} className={i % 2 ? "sm:mt-24" : ""}>
            <button type="button" onClick={() => onOpen(t)} aria-label={`Open ${t.title}`} className="block w-full cursor-zoom-in text-left">
              <TiltCard className="shadow-depth overflow-hidden rounded-[1.6rem] bg-card" max={6}>
                <Pic t={t} className="aspect-[4/3] w-full" />
              </TiltCard>
              <h3 className="mt-5 text-2xl">{t.title}</h3>
              <p className="mt-1 text-muted-foreground">{t.text}</p>
            </button>
          </ScrollTilt>
        ))}
      </div>
    </Section>
  )
}

export function Work() {
  const wide = useWide()
  const [open, setOpen] = useState<Tile | null>(null)
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null)
    window.addEventListener("keydown", k)
    return () => window.removeEventListener("keydown", k)
  }, [])
  return (
    <>
      {wide ? <Rail onOpen={setOpen} /> : <Stack onOpen={setOpen} />}
      {open && (
        <div role="dialog" aria-modal="true" aria-label={open.title} onClick={() => setOpen(null)} className="fixed inset-0 z-[85] grid place-items-center bg-ink/80 p-6 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Pic t={open} className="aspect-[4/3] max-h-[78vh] w-full rounded-3xl" />
            <p className="mt-4 text-center text-white/80"><span className="font-display text-xl font-bold text-white">{open.title}.</span> {open.text}</p>
            <button type="button" onClick={() => setOpen(null)} aria-label="Close" className="absolute -top-3 -right-3 grid size-10 place-items-center rounded-full bg-white text-ink">✕</button>
          </div>
        </div>
      )}
    </>
  )
}
