import { lazy, Suspense } from "react"
import { motion, useReducedMotion } from "motion/react"
import { MAILTO } from "@/data/site"
import { Button } from "./ui"

const Sculpture = lazy(() => import("@/components/three/Sculpture"))

const lines = ["Design and AI,", "connected."]

export function Hero() {
  const reduce = useReducedMotion()
  const rise = (i: number) => reduce ? {} : { initial: { y: "110%", rotateX: -55 }, animate: { y: "0%", rotateX: 0 }, transition: { duration: 1.1, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] as const } }
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_75%_40%,#ffffff_0%,rgba(255,255,255,0)_70%),radial-gradient(40%_40%_at_90%_80%,rgba(46,75,255,.12),transparent_70%),radial-gradient(35%_35%_at_60%_10%,rgba(255,138,76,.12),transparent_70%)]" />
      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl items-center gap-4 px-6 pt-28 pb-16 lg:grid-cols-12 lg:pt-20">
        <div className="relative z-10 lg:col-span-7">
          <h1 className="text-[clamp(3.2rem,7.2vw,6.6rem)] leading-[0.92] [perspective:800px]">
            {lines.map((l, i) => (
              <span key={l} className="block overflow-y-clip pb-[0.08em]">
                <motion.span className="block origin-bottom" {...rise(i)}>{l}</motion.span>
              </span>
            ))}
          </h1>
          <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55 }}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
              ARYX is a studio for brand identity, websites, apps and AI agents. Fixed prices from €19.99, and one point of contact from first sketch to launch.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={MAILTO}>Start a project</Button>
              <Button href="#work" variant="ghost">See our work</Button>
            </div>
          </motion.div>
        </div>
        <div className="relative -mx-6 h-[min(70vw,440px)] lg:col-span-5 lg:mx-0 lg:h-[680px]">
          <Suspense fallback={<img src="/assets/logo/aryx-mark.svg" alt="" className="absolute inset-0 m-auto size-40 opacity-40" />}>
            <Sculpture className="absolute inset-0 lg:-right-28 lg:-left-28" />
          </Suspense>
          <p className="pointer-events-none absolute right-6 bottom-2 text-xs text-muted-foreground lg:right-0">Move your cursor to turn it</p>
        </div>
      </div>
    </section>
  )
}
