import { facts, MAILTO } from "@/data/site"
import { ArrowIcon, Button, Reveal } from "./ui"

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-6 pt-36 pb-20 sm:pt-44">
      <Reveal>
        <p className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <span className="size-1.5 rounded-full bg-accent" />
          Design & AI studio · Taking on new projects
        </p>
      </Reveal>
      <div className="mt-8 grid items-end gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal delay={0.05}>
            <h1 className="text-[clamp(2.9rem,6vw,5.4rem)] leading-[1.0]">
              Brands, websites and AI tools that <em className="text-accent">actually work.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              ARYX designs and builds identities, websites, apps and AI automations for small businesses and founders. One studio, one point of contact, fixed prices.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={MAILTO}>Start a project <ArrowIcon /></Button>
              <Button href="#work" variant="outline">See the work</Button>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="lg:col-span-5">
          <figure className="overflow-hidden rounded-2xl border border-border bg-card">
            <img src="/assets/works/studio-1.svg" alt="ARYX brand identity: letterhead and business cards" className="aspect-[4/3] w-full object-cover" />
          </figure>
        </Reveal>
      </div>
      <Reveal delay={0.22}>
        <dl className="mt-20 grid grid-cols-1 border-t border-border sm:grid-cols-3">
          {facts.map((f, i) => (
            <div key={f.v} className={`py-6 sm:px-6 ${i ? "border-t border-border sm:border-t-0 sm:border-l" : "sm:pl-0"}`}>
              <dt className="font-display text-4xl">{f.k}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{f.v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  )
}
