import { services } from "@/data/site"
import { Reveal, Section, SectionHead } from "./ui"

export function Services() {
  return (
    <Section id="services">
      <SectionHead index="01" eyebrow="Services" title={<>Everything a small brand needs, <em className="text-accent">under one roof.</em></>}>
        From the first logo sketch to a live website, an app or an AI agent that takes work off your plate.
      </SectionHead>
      <ul className="border-t border-border">
        {services.map((s, i) => (
          <Reveal key={s.key} delay={Math.min(i, 4) * 0.03}>
            <li className="group grid gap-4 border-b border-border py-8 transition-colors hover:bg-card/70 md:grid-cols-12 md:gap-8 md:px-4">
              <span className="text-sm text-muted-foreground tabular-nums md:col-span-1 md:pt-2">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-3xl leading-tight md:col-span-4">{s.name}</h3>
              <div className="md:col-span-7">
                <p className="leading-relaxed text-foreground/80">{s.description}</p>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-muted-foreground">
                  {s.bullets.map((b) => <li key={b} className="before:mr-2 before:text-accent before:content-['—']">{b}</li>)}
                </ul>
              </div>
            </li>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
