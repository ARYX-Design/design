import { process } from "@/data/site"
import { Reveal, Section, SectionHead } from "./ui"

export function Process() {
  return (
    <Section id="process">
      <SectionHead index="04" eyebrow="Process" title={<>A simple process, <em className="text-accent">no surprises.</em></>} />
      <ol className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {process.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.06} className="h-full">
            <li className="flex h-full flex-col bg-background p-8">
              <span className="font-display text-6xl text-accent">{p.n}</span>
              <h3 className="mt-10 text-3xl">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{p.text}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
