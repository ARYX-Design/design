import { lazy, Suspense } from "react"
import { MAILTO } from "@/data/site"
import { Button } from "./ui"

const Sculpture = lazy(() => import("@/components/three/Sculpture"))

const lines = ["Design and AI,", "connected."]

/** Splits a line into words (kept whole when wrapping) of individually animated letters. */
function Letters({ text, start }: { text: string; start: number }) {
  let n = start
  return (
    <>
      {text.split(" ").map((w, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {w.split("").map((c, ci) => {
            const d = 0.15 + n++ * 0.035
            return <span key={ci} aria-hidden className="char" style={{ animationDelay: `calc(var(--intro-delay, 0s) + ${d}s)` }}>{c}</span>
          })}
          {wi < text.split(" ").length - 1 && <span className="inline-block w-[0.28em]" />}
        </span>
      ))}
    </>
  )
}

export function Hero() {
  let count = 0
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob absolute top-[8%] right-[-6%] size-[46vw] max-w-[720px] rounded-full bg-[radial-gradient(circle,rgba(46,75,255,.28),transparent_65%)] blur-2xl" />
        <div className="blob absolute bottom-[-12%] left-[30%] size-[38vw] max-w-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,138,76,.25),transparent_65%)] blur-2xl [animation-delay:-6s]" />
        <div className="blob absolute top-[-10%] left-[-8%] size-[34vw] max-w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.9),transparent_65%)] blur-xl [animation-delay:-12s]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(11,18,32,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(11,18,32,.045)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_60%_40%,#000_10%,transparent_70%)]" />
      </div>
      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl lg:static items-center gap-4 px-6 pt-28 pb-16 lg:grid-cols-12 lg:pt-20">
        <div className="relative z-10 lg:col-span-7" style={{ transform: "translate3d(0, calc(var(--hero-p, 0) * -140px), 0)", opacity: "calc(1 - var(--hero-p, 0) * 1.4)" }}>
          <h1 aria-label="Design and AI, connected." className="text-[clamp(3.2rem,7.2vw,6.6rem)] leading-[0.92] [perspective:900px]">
            {lines.map((l) => {
              const start = count
              count += l.replace(/ /g, "").length
              return <span key={l} className="block pb-[0.06em]"><Letters text={l} start={start} /></span>
            })}
          </h1>
          <div className="hero-fade" style={{ animationDelay: "calc(var(--intro-delay, 0s) + 0.7s)" }}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
              ARYX is a studio for brand identity, websites, apps and AI agents. Fixed prices from €19.99, and one point of contact from first sketch to launch.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={MAILTO}>Start a project</Button>
              <Button href="#work" variant="ghost">See our work</Button>
            </div>
          </div>
        </div>
        <div className="relative -mx-6 h-[min(70vw,440px)] lg:static lg:col-span-5 lg:mx-0 lg:h-[680px]" data-cursor="Move me">
          <Suspense fallback={<img src="/assets/logo/aryx-mark.svg" alt="" className="absolute inset-0 m-auto size-40 opacity-40 lg:left-auto lg:right-[12%]" />}>
            <Sculpture className="absolute inset-0" style={{ opacity: "calc(1 - var(--hero-p, 0) * 0.85)" }} />
          </Suspense>
        </div>
      </div>
      <a href="#services" aria-label="Scroll to services" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block" style={{ opacity: "calc(1 - var(--hero-p, 0) * 4)" }}>
        <span className="hero-fade flex flex-col items-center gap-2 text-xs text-muted-foreground" style={{ animationDelay: "calc(var(--intro-delay, 0s) + 1.2s)" }}>
          Scroll
          <span className="relative h-10 w-[1.5px] overflow-hidden bg-border"><span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-dot_1.6s_ease-in-out_infinite] bg-primary" /></span>
        </span>
      </a>
    </section>
  )
}
