import { BlurFade } from "@/components/magicui/blur-fade"
import { Ripple } from "@/components/magicui/ripple"
import { aboutTags } from "@/data/site"
import { Section } from "./ui"

export function About() {
  return (
    <Section id="about">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <BlurFade inView direction="right" offset={24} className="order-first">
          <div className="relative mx-auto grid aspect-square w-full max-w-md place-items-center overflow-hidden rounded-3xl border border-white/10 bg-card">
            <Ripple mainCircleSize={150} mainCircleOpacity={0.18} numCircles={6} />
            <div className="absolute size-3/5 rounded-full bg-grad opacity-30 blur-[70px]" />
            <img src="/assets/logo/aryx-mark.svg" alt="ARYX logo mark" className="relative z-10 size-1/2 drop-shadow-[0_0_40px_rgba(124,92,255,.6)]" />
          </div>
        </BlurFade>
        <BlurFade inView>
          <span className="font-display text-xs font-semibold tracking-[0.22em] text-teal uppercase">About ARYX</span>
          <h2 className="mt-4 text-3xl leading-tight font-bold sm:text-5xl">Design that does the <span className="text-grad">heavy lifting</span> for your brand.</h2>
          <p className="mt-6 text-lg text-muted-foreground">I'm a digital creator obsessed with the details that make a brand feel premium: the weight of a logo, the rhythm of a layout, the split-second a page takes to load.</p>
          <p className="mt-4 text-lg text-muted-foreground">Working with one person means faster decisions, a consistent vision, and a brand that actually feels like <em>you</em>, not stitched together from templates.</p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {aboutTags.map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-white/[.04] px-4 py-1.5 text-sm text-muted-foreground">{t}</span>
            ))}
          </div>
        </BlurFade>
      </div>
    </Section>
  )
}
