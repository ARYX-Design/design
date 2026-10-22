import { Cursor } from "@/components/fx/Cursor"
import { Intro } from "@/components/fx/Intro"
import { VelocityMarquee } from "@/components/fx/Marquee"
import { About } from "@/components/site/About"
import { ObjPort } from "@/components/site/Obj"
import { Cta } from "@/components/site/Cta"
import { Footer } from "@/components/site/Footer"
import { Hero } from "@/components/site/Hero"
import { Nav } from "@/components/site/Nav"
import { Pricing } from "@/components/site/Pricing"
import { Process } from "@/components/site/Process"
import { Services } from "@/components/site/Services"
import { Watch } from "@/components/site/Watch"
import { Work } from "@/components/site/Work"

export default function App() {
  return (
    <>
      <Intro />
      <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-primary to-[#ff8a4c]" style={{ transform: "scaleX(var(--page-p, 0))" }} />
      <Nav />
      <main>
        <Hero />
        <VelocityMarquee />
        <Services />
        <Work />
        <Watch />
        <Process />
        <Pricing />
        <About />
        <Cta />
      </main>
      <Footer />
      <ObjPort />
      <Cursor />
      <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[55] opacity-[0.045]" />
    </>
  )
}
