import { useRef, useState } from "react"
import { videos } from "@/data/site"
import { Reveal } from "./ui"

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
      <div className="relative overflow-hidden rounded-2xl bg-black">
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
          <button type="button" onClick={play} aria-label={`Play: ${v.title}`} className="group absolute inset-0 grid place-items-center bg-black/25 transition-colors hover:bg-black/10">
            <span className="grid size-16 place-items-center rounded-full bg-paper text-ink transition group-hover:scale-105">
              <svg viewBox="0 0 24 24" className="ml-0.5 size-6" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            </span>
          </button>
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="text-2xl text-paper">{v.title}</h3>
        <span className="text-sm text-paper/50">{v.tag}</span>
      </div>
      <p className="mt-1 text-sm text-paper/60">{v.text}</p>
    </article>
  )
}

export function Watch() {
  const list = videos.filter((v) => !v.vertical)
  return (
    <section id="watch" className="scroll-mt-16 bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal className="mb-14 grid gap-6 border-t border-paper/15 pt-6 lg:grid-cols-12">
          <p className="text-sm text-paper/50 lg:col-span-3"><span className="mr-3">03</span>Films</p>
          <div className="lg:col-span-9">
            <h2 className="text-4xl leading-[1.05] sm:text-6xl">Short films about <em className="text-[#7fc4b8]">what we build.</em></h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper/60">Under a minute each, with voiceover. Press play for sound.</p>
          </div>
        </Reveal>
        <div className="grid gap-10 md:grid-cols-2">
          {list.map((v, i) => <Reveal key={v.id} delay={i * 0.08}><VideoCard v={v} /></Reveal>)}
        </div>
      </div>
    </section>
  )
}
