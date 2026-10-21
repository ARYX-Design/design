import { useRef, useState } from "react"
import { videos } from "@/data/site"
import { Obj } from "./Obj"
import { ScrollTilt } from "./Tilt"

type V = (typeof videos)[number]

function VideoCard({ v }: { v: V }) {
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
    <article>
      <div className="relative overflow-hidden rounded-[1.6rem] bg-black shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)] ring-1 ring-white/10">
        <video
          ref={ref}
          src={v.src}
          poster={v.poster}
          preload="none"
          playsInline
          className="aspect-video w-full object-cover"
          onPlay={() => setPlaying(true)}
          onEnded={() => { setPlaying(false); if (ref.current) { ref.current.controls = false; ref.current.load() } }}
          aria-label={v.title}
        />
        {!playing && (
          <button type="button" onClick={play} aria-label={`Play ${v.title}`} className="group absolute inset-0 grid place-items-center bg-black/20 transition-colors hover:bg-black/5">
            <span className="grid size-16 place-items-center rounded-full bg-white text-ink shadow-xl transition group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="ml-0.5 size-6" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            </span>
          </button>
        )}
      </div>
      <h3 className="mt-5 text-2xl text-white">{v.title}</h3>
      <p className="mt-1 text-white/60">{v.text}</p>
    </article>
  )
}

export function Watch() {
  const list = videos.filter((v) => !v.vertical)
  return (
    <section id="watch" className="scroll-mt-16 overflow-hidden bg-ink text-white">
      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div aria-hidden className="pointer-events-none absolute -top-40 right-0 size-[520px] rounded-full bg-primary/30 blur-[140px]" />
        <div className="relative mb-14 grid items-end gap-6 lg:grid-cols-12">
          <h2 className="text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.98] lg:col-span-7">Short films about what we build.</h2>
          <p className="max-w-md text-lg leading-relaxed text-white/60 lg:col-span-7 lg:row-start-2">Under a minute each, with voiceover. Press play for sound.</p>
          <div aria-hidden className="hidden h-64 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:block">
            <Obj kind="knot" zoom={6.4} className="size-full" />
          </div>
        </div>
        <div className="relative grid gap-10 md:grid-cols-2">
          {list.map((v) => <ScrollTilt key={v.id}><VideoCard v={v} /></ScrollTilt>)}
        </div>
      </div>
    </section>
  )
}
