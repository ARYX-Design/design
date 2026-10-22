import { MAILTO, pricing } from "@/data/site"
import { cn } from "@/lib/utils"
import { Obj } from "./Obj"
import { TiltCard } from "./Tilt"
import { Button, Reveal, Section, SectionHead } from "./ui"

const kinds = ["cube", "logo", "websites", "automation"] as const

const fmt = (p: (typeof pricing)[number]) =>
  p.price == null ? "Let's talk" : `€${p.price.toLocaleString("en-US", { minimumFractionDigits: p.decimals, maximumFractionDigits: p.decimals })}`

export function Pricing() {
  return (
    <Section id="pricing">
      <SectionHead title="Clear, fixed prices.">
        Know what you pay before we start. Begin with one small task, or go all in with a brand and a website.
      </SectionHead>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {pricing.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.06} className="h-full">
            <TiltCard className={cn("rounded-[1.6rem]", p.featured ? "beam bg-ink text-white shadow-[0_40px_80px_-30px_rgba(46,75,255,.6)]" : "shadow-depth bg-card")} max={7}>
              <div className="flex h-full flex-col p-7">
                <Obj kind={kinds[i]} zoom={5.4} className="lift -mt-3 mb-2 h-28 w-full" />
                {p.featured && <span className="lift mb-3 self-start rounded-full bg-primary px-2.5 py-1 text-xs font-semibold">Recommended</span>}
                <h3 className="lift text-2xl">{p.name}</h3>
                <p className={cn("lift mt-1 text-sm", p.featured ? "text-white/60" : "text-muted-foreground")}>{p.desc}</p>
                <p className={cn("lift mt-8 font-display font-bold tracking-tight", p.price == null ? "text-4xl" : "text-5xl")}>
                  {p.from && <span className={cn("mr-1.5 font-sans text-sm font-normal", p.featured ? "text-white/60" : "text-muted-foreground")}>from</span>}
                  {fmt(p)}
                </p>
                <p className={cn("mt-2 text-sm", p.featured ? "text-white/60" : "text-muted-foreground")}>{p.note}</p>
                <ul className={cn("mt-7 flex-1 space-y-2.5 border-t pt-6 text-sm", p.featured ? "border-white/15" : "border-border")}>
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-2.5">
                      <svg viewBox="0 0 24 24" className={cn("mt-0.5 size-4 flex-none", p.featured ? "text-[#8fa0ff]" : "text-primary")} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
                <Button href={MAILTO} variant={p.featured ? "solid" : "dark"} className="lift mt-8">{p.cta}</Button>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
