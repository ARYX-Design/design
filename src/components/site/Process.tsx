import { process } from "@/data/site"
import { TiltCard } from "./Tilt"
import { Reveal, Section, SectionHead } from "./ui"

export function Process() {
  return (
    <Section id="process">
      <SectionHead title="Four steps, no surprises.">
        Every project runs the same way, so you always know what happens next and what it costs.
      </SectionHead>
      <ol className="grid items-end gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
