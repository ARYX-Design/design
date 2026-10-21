import { EMAIL, MAILTO } from "@/data/site"
import { Iso } from "./Iso"
import { Button, Reveal } from "./ui"

export function Cta() {
  return (
    <section id="contact" className="px-4 pb-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.2rem] bg-gradient-to-br from-[#4660ff] via-primary to-[#1d33c4] text-white shadow-[0_50px_100px_-40px_rgba(46,75,255,.8)]">
        <div aria-hidden className="pointer-events-none absolute -right-10 -bottom-16 hidden w-[440px] rotate-[-8deg] opacity-95 md:block [animation:float-y_7s_ease-in-out_infinite]">
          <Iso k="workflows" className="w-full drop-shadow-[0_30px_30px_rgba(0,0,0,.3)]" />
        </div>
        <Reveal className="relative px-8 py-20 sm:px-14 sm:py-28">
          <h2 className="max-w-3xl text-[clamp(2.8rem,6.4vw,5.6rem)] leading-[0.94]">Have a project in mind? Let's build it.</h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/75">Tell us what you're working on. You'll get a reply with next steps and a fixed quote.</p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Button href={MAILTO} variant="light">Start a project</Button>
            <a href={MAILTO} className="link-underline text-lg text-white/85 hover:text-white">{EMAIL}</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
