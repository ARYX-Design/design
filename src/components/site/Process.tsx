import { useEffect, useRef } from "react"
import { onScroll } from "@/components/fx/scroll"
import { process } from "@/data/site"
import { TiltCard } from "./Tilt"
import { Reveal, Section, SectionHead } from "./ui"

export function Process() {
  const line = useRef<HTMLDivElement>(null)
  const host = useRef<HTMLOListElement>(null)
  useEffect(() => onScroll(() => {
    const h = host.current, l = line.current
    if (!h || !l) return
    const r = h.getBoundingClientRect()
    const p = Math.min(1, Math.max(0, (window.innerHeight * 0.85 - r.top) / (r.height + window.innerHeight * 0.3)))
    l.style.setProperty("--p", p.toFixed(3))
  }), [])
  return (
    <Section id="process">
      <SectionHead title="Four steps, no surprises.">
        Every project runs the same way, so you always know what happens next and what it costs.
      </SectionHead>
      <div ref={line} aria-hidden className="relative mb-10 hidden h-[3px] rounded-full bg-border lg:block">
        <div className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-gradient-to-r from-primary to-[#ff8a4c]" style={{ transform: "scaleX(var(--p, 0))" }} />
        <div className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff8a4c] shadow-[0_0_0_6px_rgba(255,138,76,.2),0_0_24px_rgba(255,138,76,.8)]" style={{ left: "calc(var(--p, 0) * 100%)" }} />
        {process.map((p, i) => (
          <span key={p.n} className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-white" style={{ left: `calc(${i} * (100% - 3.75rem) / 4 + ${i} * 1.25rem + 3.5rem)` }} />
        ))}
      </div>
      <ol ref={host} className="grid items-end gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {process.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.08}>
            <li style={{ marginBottom: `${i * 2.2}rem` }} className="max-lg:!mb-0">
              <TiltCard className="shadow-depth rounded-[1.6rem] bg-card" max={8}>
                <div className="flex flex-col p-7" style={{ minHeight: `${15 + i * 2.2}rem` }}>
                  <span className="lift grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-[#5b73ff] to-primary font-display text-2xl font-bold text-white shadow-[0_12px_24px_-10px_rgba(46,75,255,.8)]">{i + 1}</span>
                  <h3 className="lift mt-auto pt-10 text-2xl">{p.title}</h3>
                  <p className="lift mt-2 leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              </TiltCard>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
