import { useRef, useState } from "react"
import { BlurFade } from "@/components/magicui/blur-fade"
import { videos } from "@/data/site"
import { cn } from "@/lib/utils"
import { Section, SectionHead } from "./ui"

type V = (typeof videos)[number]

function VideoCard({ v, className }: { v: V; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const play = () => {
    document.querySelectorAll("video").forEach((o) => o !== ref.current && o.pause())
    const el = ref.current
    if (!el) return
    el.controls = true
    el.play().catch(() => {})
  }
  return (
    <BlurFade inView className={cn("h-full", className)}>
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-card transition-colors hover:border-white/25">
        <div className={cn("relative bg-black", v.vertical ? "aspect-[9/16] lg:aspect-auto lg:min-h-0 lg:flex-1" : "aspect-video")}>
          <video
            ref={ref}
            src={v.src}
            poster={v.poster}
            preload="none"
            playsInline
            className="absolute inset-0 size-full object-cover"
            onPlay={() => setPlaying(true)}
            onEnded={() => { setPlaying(false); if (ref.current) { ref.current.controls = false; ref.current.load() } }}
            aria-label={v.title}
          />
          {!playing && (
            <button type="button" onClick={play} aria-label={`Play: ${v.title}`} className="absolute inset-0 grid place-items-center bg-gradient-to-t from-black/55 to-transparent">
              <span className="grid size-20 place-items-center rounded-full bg-grad shadow-[0_10px_34px_rgba(124,92,255,.55)] transition group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="ml-1 size-8 text-[#08080c]" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </span>
            </button>
          )}
        </div>
        <div className="p-5">
          <span className="font-display text-xs font-semibold tracking-[0.14em] text-teal uppercase">{v.tag}</span>
          <h3 className="mt-2 text-xl font-semibold">{v.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{v.text}</p>
        </div>
      </article>
    </BlurFade>
  )
}

export function Watch() {
  const [promo, ai, support] = videos
  return (
    <Section id="watch">
      <SectionHead eyebrow="Watch" title={<>See ARYX <span className="text-grad">in action.</span></>}>
        Short videos on what ARYX builds, from websites and brands to AI agents that do the work. Tap play to hear the voiceover.
      </SectionHead>
      <div className="grid gap-5 lg:grid-cols-3">
        <VideoCard v={promo} className="lg:col-span-2" />
        <VideoCard v={support} className="lg:col-start-3 lg:row-span-2 lg:row-start-1" />
        <VideoCard v={ai} className="lg:col-span-2" />
      </div>
    </Section>
  )
}
