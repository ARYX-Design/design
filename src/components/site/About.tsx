import { aboutTags } from "@/data/site"
import { Iso } from "./Iso"
import { Obj } from "./Obj"
import { TiltCard } from "./Tilt"
import { Reveal, Section } from "./ui"

export function About() {
  return (
    <Section id="about">
      <div className="grid items-center gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <TiltCard className="shadow-depth rounded-[2rem] bg-gradient-to-b from-white to-[#e4e9f2]" max={10}>
            <div className="lift grid aspect-square place-items-center">
              <Obj kind="network" zoom={8} className="size-full" fallback={<Iso k="agents" className="w-3/4 drop-shadow-[0_24px_24px_rgba(26,36,64,.2)]" />} />
            </div>
          </TiltCard>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-7">
          <h2 className="text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.98]">A small studio that sweats the details.</h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>ARYX cares about what makes a brand feel premium: the weight of a logo, the rhythm of a layout, the split second a page takes to load.</p>
            <p>Working with one studio means faster decisions, one consistent vision, and a brand that feels like you rather than a template.</p>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2">
            {aboutTags.map((t) => <li key={t} className="rounded-full bg-white px-4 py-2 text-sm shadow-depth">{t}</li>)}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
