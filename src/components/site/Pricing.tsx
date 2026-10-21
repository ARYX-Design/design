import { MAILTO, pricing } from "@/data/site"
import { cn } from "@/lib/utils"
import { ArrowIcon, Button, Reveal, Section, SectionHead } from "./ui"

const fmt = (p: (typeof pricing)[number]) =>
  p.price == null ? "Let's talk" : `€${p.price.toLocaleString("en-US", { minimumFractionDigits: p.decimals, maximumFractionDigits: p.decimals })}`

export function Pricing() {
  return (
    <Section id="pricing">
      <SectionHead index="05" eyebrow="Pricing" title={<>Clear, fixed prices. <em className="text-accent">Start small.</em></>}>
        Know what you're paying before we start. Begin with a single task from €19.99, or go all in with a full brand and website.
      </SectionHead>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {pricing.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.06} className="h-full">
            <div className={cn("flex h-full flex-col rounded-2xl border p-7", p.featured ? "border-ink bg-ink text-paper" : "border-border bg-card")}>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-2xl">{p.name}</h3>
                {p.featured && <span className="mt-1.5 whitespace-nowrap rounded-full border border-paper/25 px-2.5 py-0.5 text-xs text-paper/80">Recommended</span>}
              </div>
              <p className={cn("mt-1 text-sm", p.featured ? "text-paper/60" : "text-muted-foreground")}>{p.desc}</p>
              <p className="mt-8 font-display text-5xl leading-none">
                {p.from && <span className={cn("mr-1.5 font-sans text-sm", p.featured ? "text-paper/60" : "text-muted-foreground")}>from</span>}
                {fmt(p)}
              </p>
              <p className={cn("mt-2 text-sm", p.featured ? "text-paper/60" : "text-muted-foreground")}>{p.note}</p>
              <ul className={cn("mt-7 flex-1 space-y-2.5 border-t pt-6 text-sm", p.featured ? "border-paper/15" : "border-border")}>
                {p.items.map((it) => (
                  <li key={it} className="flex gap-2.5">
                    <svg viewBox="0 0 24 24" className={cn("mt-0.5 size-4 flex-none", p.featured ? "text-[#7fc4b8]" : "text-accent")} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                    {it}
                  </li>
                ))}
              </ul>
              <Button href={MAILTO} variant={p.featured ? "light" : "outline"} className="mt-8 justify-center">{p.cta} <ArrowIcon /></Button>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
