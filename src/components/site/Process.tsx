import { BlurFade } from "@/components/magicui/blur-fade"
import { MagicCard } from "@/components/magicui/magic-card"
import { process } from "@/data/site"
import { Section, SectionHead } from "./ui"

export function Process() {
  return (
    <Section id="process">
      <SectionHead eyebrow="How it works" title={<>A simple process, <span className="text-grad">zero surprises.</span></>}>
        Clear steps, fixed timelines, and one point of contact from kickoff to launch.
      </SectionHead>
      <div className="relative grid gap-4 md:grid-cols-4">
        <div className="pointer-events-none absolute top-[3.1rem] right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-violet/0 via-violet/60 to-teal/0 md:block" />
        {process.map((p, i) => (
          <BlurFade key={p.n} inView delay={0.1 * i} className="h-full">
            <MagicCard className="h-full rounded-xl" gradientColor="#1c1c2e" gradientFrom="#9a78ff" gradientTo="#00f0c8">
              <div className="p-6">
                <div className="font-display text-5xl font-bold text-grad opacity-80">{p.n}</div>
                <h3 className="mt-4 text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
              </div>
            </MagicCard>
          </BlurFade>
        ))}
      </div>
    </Section>
  )
}
