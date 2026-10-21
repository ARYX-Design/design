import { aboutTags } from "@/data/site"
import { Reveal, Section } from "./ui"

export function About() {
  return (
    <Section id="about">
      <div className="grid items-center gap-14 border-t border-border pt-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="mb-8 text-sm text-muted-foreground"><span className="mr-3">06</span>About</p>
          <div className="grid aspect-square place-items-center rounded-2xl border border-border bg-stone">
            <img src="/assets/logo/aryx-mark-mono-black.svg" alt="ARYX logo mark" className="size-2/5 opacity-90" />
          </div>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-7">
          <h2 className="text-4xl leading-[1.05] sm:text-6xl">Design that does the heavy lifting <em className="text-accent">for your brand.</em></h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>ARYX is a small, independent studio obsessed with the details that make a brand feel premium: the weight of a logo, the rhythm of a layout, the split-second a page takes to load.</p>
            <p>Working with one studio means faster decisions, a consistent vision, and a brand that actually feels like you, not stitched together from templates.</p>
          </div>
          <p className="mt-10 text-sm text-muted-foreground">Tools & disciplines</p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-foreground/80">
            {aboutTags.map((t, i) => <li key={t}>{t}{i < aboutTags.length - 1 && <span className="ml-5 text-border">/</span>}</li>)}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
