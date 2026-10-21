import { services } from "@/data/site"
import { cn } from "@/lib/utils"
import { Iso } from "./Iso"
import { Obj } from "./Obj"
import { TiltCard } from "./Tilt"
import { Reveal, Section, SectionHead } from "./ui"

export function Services() {
  return (
    <Section id="services">
      <SectionHead title="Everything a growing brand needs, from one studio.">
        Identity, websites, apps and AI that works for you, designed and built together so it all fits.
      </SectionHead>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const wide = s.className.includes("col-span-2")
          return (
            <Reveal key={s.key} delay={(i % 3) * 0.05} className={cn(wide && "lg:col-span-2")}>
              <TiltCard className="shadow-depth rounded-[1.6rem] bg-card" max={wide ? 5 : 8}>
                <div className={cn("flex h-full flex-col gap-6 p-7", wide && "lg:flex-row lg:items-center lg:gap-10")}>
                  <div className={cn("lift grid h-40 place-items-center rounded-2xl bg-gradient-to-b from-[#f2f4f9] to-[#e4e9f2]", wide && "lg:h-52 lg:w-[42%] lg:flex-none")}>
                    <Obj kind={s.key} className={cn("h-40 w-full", wide && "lg:h-52")} fallback={<Iso k={s.key} className="h-32 w-auto drop-shadow-[0_14px_14px_rgba(26,36,64,.18)] lg:h-36" />} />
                  </div>
                  <div className="lift">
                    <h3 className="text-2xl">{s.name}</h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{s.description}</p>
                    <ul className="mt-4 space-y-1.5 text-sm text-foreground/80">
                      {s.bullets.map((b) => <li key={b} className="flex gap-2"><span className="mt-2 size-1.5 flex-none rounded-full bg-primary" />{b}</li>)}
                    </ul>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
