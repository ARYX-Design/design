import { BlurFade } from "@/components/magicui/blur-fade"
import { Meteors } from "@/components/magicui/meteors"
import { EMAIL, MAILTO } from "@/data/site"
import { ArrowIcon, Section, ShimmerLink } from "./ui"

export function Cta() {
  return (
    <Section id="contact" className="pt-8">
      <BlurFade inView>
        <div className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet/30 via-card to-teal/20 px-6 py-16 text-center sm:px-16 sm:py-24">
          <Meteors number={16} />
          <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-violet/30 blur-[100px]" />
          <h2 className="mx-auto max-w-3xl text-4xl leading-tight font-bold sm:text-6xl">Let's build something <span className="text-grad">people remember.</span></h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">Tell me about your project and I'll get back to you as soon as I can with next steps.</p>
          <div className="mt-9 flex justify-center">
            <ShimmerLink href={MAILTO} className="px-8 py-4 text-base">
              {EMAIL} <ArrowIcon className="ml-2" />
            </ShimmerLink>
          </div>
        </div>
      </BlurFade>
    </Section>
  )
}
