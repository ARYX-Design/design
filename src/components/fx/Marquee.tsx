import { useEffect, useRef } from "react"
import { reducedMotion, scrollState } from "./scroll"

const words = ["Brand identity", "Websites", "AI agents", "Apps", "Automation", "Games", "UI / UX"]

function Row({ dir, outline }: { dir: 1 | -1; outline?: boolean }) {
  return (
    <div className="marquee-row flex w-max gap-12 whitespace-nowrap" data-dir={dir}>
      {[0, 1].map((k) => (
        <div key={k} className="flex shrink-0 items-center gap-12" aria-hidden={k === 1}>
          {words.map((w, i) => (
            <span key={w} className="flex items-center gap-12">
              <span className={(i + (outline ? 1 : 0)) % 2 ? "text-outline" : ""}>{w}</span>
              <span className="inline-block size-[0.35em] rotate-45 rounded-[0.08em] bg-primary" />
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

/** Two giant bands that drift in opposite directions, speed up and lean with scroll velocity. */
export function VelocityMarquee() {
  const host = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = host.current
    if (!el || reducedMotion) return
    const rows = [...el.querySelectorAll<HTMLElement>(".marquee-row")]
    let x = 0, v = 0, dir = 1, raf = 0, active = false
    const io = new IntersectionObserver(([e]) => { active = e.isIntersecting; if (active) { cancelAnimationFrame(raf); raf = requestAnimationFrame(loop) } })
    const loop = () => {
      if (!active) return
      const sv = scrollState.vy
      scrollState.vy *= 0.85
      if (Math.abs(sv) > 0.5) dir = sv > 0 ? 1 : -1
      v += (sv - v) * 0.12
      x += (0.6 + Math.min(Math.abs(v), 60) * 0.12) * dir
      const skew = Math.max(-10, Math.min(10, v * 0.35))
      rows.forEach((r) => {
        const w = r.scrollWidth / 2
        const d = Number(r.dataset.dir)
        const off = ((x * d) % w + w) % w
        r.style.transform = `translate3d(${-off}px,0,0) skewX(${-skew * d}deg)`
      })
      raf = requestAnimationFrame(loop)
    }
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [])
  return (
    <div ref={host} aria-label="What ARYX does" className="relative -rotate-2 overflow-hidden border-y border-border bg-white/60 py-6 font-display text-[clamp(2.6rem,7vw,6rem)] leading-none font-extrabold tracking-[-0.04em] backdrop-blur">
      <Row dir={1} />
      <div className="mt-4"><Row dir={-1} outline /></div>
    </div>
  )
}
