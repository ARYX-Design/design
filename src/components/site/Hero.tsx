import { useReducedMotion } from "motion/react"
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text"
import { AuroraText } from "@/components/magicui/aurora-text"
import { BlurFade } from "@/components/magicui/blur-fade"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { Particles } from "@/components/magicui/particles"
import { Safari } from "@/components/magicui/safari"
import { WordRotate } from "@/components/magicui/word-rotate"
import { MAILTO, rotatingWords } from "@/data/site"
import { ArrowIcon, ShimmerLink } from "./ui"

function Stat({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-bold text-grad sm:text-3xl">{children}</div>
      <div className="text-xs text-muted-foreground sm:text-sm">{label}</div>
    </div>
  )
}

export function Hero() {
  const reduce = useReducedMotion()
  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        {!reduce && <Particles className="absolute inset-0" quantity={80} ease={80} staticity={40} color="#9a78ff" />}
        <div className="absolute top-[-20%] left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-violet/20 blur-[130px]" />
        <div className="absolute right-[-10%] bottom-[-30%] h-[600px] w-[600px] rounded-full bg-teal/10 blur-[130px]" />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_30%,#000_20%,transparent_70%)] bg-[linear-gradient(to_right,rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:52px_52px]" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <BlurFade>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-4 py-1.5 text-sm">
              <span className="size-2 rounded-full bg-teal shadow-[0_0_10px_var(--teal)]" />
              <AnimatedShinyText className="mx-0 max-w-none">Available for new projects</AnimatedShinyText>
            </div>
          </BlurFade>

          <BlurFade delay={0.08}>
            <h1 className="mt-6 text-5xl leading-[1.05] font-bold sm:text-6xl lg:text-7xl">
              <span className="block text-3xl font-medium text-foreground/80 sm:text-4xl">I build</span>
              <span className="block h-[1.2em] overflow-hidden">
                <WordRotate words={rotatingWords} duration={2200} className="text-grad pr-2" />
              </span>
              <span className="block">
                that look <AuroraText colors={["#9a78ff", "#00f0c8", "#ff5c8a", "#9a78ff"]}>world-class.</AuroraText>
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.16}>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
              I'm ARYX, a digital creator who designs and builds brands from the ground up. Websites, logos, apps, games, AI agents and automation, starting from just €19.99.
            </p>
          </BlurFade>

          <BlurFade delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ShimmerLink href={MAILTO} className="px-7 py-3.5 text-base">
                Start a project <ArrowIcon className="ml-2" />
              </ShimmerLink>
              <a href="#watch" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 font-display text-base font-semibold transition hover:bg-white/5">
                Watch the promo
              </a>
            </div>
          </BlurFade>

          <BlurFade delay={0.32}>
            <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8">
              <Stat label="services under one roof"><NumberTicker value={9} className="text-grad" /></Stat>
              <Stat label="starting price">€<NumberTicker value={19.99} decimalPlaces={2} className="text-grad" /></Stat>
              <Stat label="point of contact, no hand-offs"><NumberTicker value={1} className="text-grad" /></Stat>
            </div>
          </BlurFade>
        </div>

        <BlurFade delay={0.2} direction="left" offset={24}>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-grad opacity-20 blur-3xl" />
            <Safari url="ARYX, digital creator" imageSrc="/assets/video/posters/aryx-promo-16x9.jpg" className="relative drop-shadow-2xl" />
            <a href="#watch" aria-label="Watch the ARYX promo video" className="absolute inset-0 z-20 grid place-items-center">
              <span className="grid size-20 place-items-center rounded-full bg-grad shadow-[0_10px_40px_rgba(124,92,255,.6)] transition hover:scale-110">
                <svg viewBox="0 0 24 24" className="ml-1 size-8 text-[#08080c]" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </span>
            </a>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}
