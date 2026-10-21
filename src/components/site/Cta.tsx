import { EMAIL, MAILTO } from "@/data/site"
import { ArrowIcon, Button, Reveal } from "./ui"

export function Cta() {
  return (
    <section id="contact" className="bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-6 py-28 sm:py-36">
        <Reveal>
          <p className="text-sm text-paper/50">Contact</p>
          <h2 className="mt-6 max-w-4xl text-5xl leading-[1.02] sm:text-7xl">Have a project in mind? <em className="text-[#7fc4b8]">Let's talk.</em></h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/60">Tell us what you're building. You'll get a reply with next steps and a fixed quote.</p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Button href={MAILTO} variant="light">Start a project <ArrowIcon /></Button>
            <a href={MAILTO} className="link-underline text-lg text-paper/80 hover:text-paper">{EMAIL}</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
