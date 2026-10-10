import { BlurFade } from "@/components/magicui/blur-fade"
import { BorderBeam } from "@/components/magicui/border-beam"
import { MagicCard } from "@/components/magicui/magic-card"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { MAILTO, pricing } from "@/data/site"
import { cn } from "@/lib/utils"
import { Section, SectionHead, ShimmerLink } from "./ui"

export function Pricing() {
  return (
    <Section id="pricing">
      <SectionHead eyebrow="Packages" title={<>Straightforward <span className="text-grad">pricing.</span></>}>
        Fixed-price packages so you know exactly what you're getting: start small from €19.99, or go big with a full brand and site.
      </SectionHead>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {pricing.map((p, i) => (
          <BlurFade key={p.name} inView delay={0.08 * i} className="h-full">
            <div className="relative h-full rounded-xl">
              <MagicCard className="h-full rounded-xl" gradientColor="#1c1c2e" gradientFrom="#9a78ff" gradientTo="#00f0c8">
                <div className="flex h-full flex-col p-7">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    {p.featured && <span className="font-display text-[0.7rem] font-semibold tracking-[0.12em] text-teal uppercase">Most popular</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                  <div className="mt-6 flex items-baseline gap-1.5 font-display text-4xl font-bold">
                    {p.price === null ? (
                      <span className="text-3xl">Let's talk</span>
                    ) : (
                      <>
                        {p.from && <span className="text-sm font-medium text-muted-foreground">from</span>}
                        <span>€<NumberTicker value={p.price} decimalPlaces={p.decimals} className="text-foreground" /></span>
                      </>
                    )}
                  </div>
                  <p className="mt-1 mb-6 text-sm text-muted-foreground">{p.note}</p>
                  <ul className="mb-8 flex-1 space-y-3 text-sm text-neutral-300">
                    {p.items.map((it) => (
                      <li key={it} className="flex gap-3"><span className="font-bold text-teal">✓</span>{it}</li>
                    ))}
                  </ul>
                  {p.featured ? (
                    <ShimmerLink href={MAILTO} className="w-full py-3 text-sm">{p.cta}</ShimmerLink>
                  ) : (
                    <a href={MAILTO} className={cn("block rounded-full border border-white/15 py-3 text-center font-display text-sm font-semibold transition hover:bg-white/5")}>{p.cta}</a>
                  )}
                </div>
              </MagicCard>
              {p.featured && <BorderBeam size={140} duration={8} colorFrom="#9a78ff" colorTo="#00f0c8" borderWidth={2} />}
            </div>
          </BlurFade>
        ))}
      </div>
    </Section>
  )
}
