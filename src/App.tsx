import { ScrollProgress } from "@/components/magicui/scroll-progress"
import { About } from "@/components/site/About"
import { Cta } from "@/components/site/Cta"
import { Footer } from "@/components/site/Footer"
import { Hero } from "@/components/site/Hero"
import { Nav } from "@/components/site/Nav"
import { Pricing } from "@/components/site/Pricing"
import { Process } from "@/components/site/Process"
import { Services } from "@/components/site/Services"
import { Strip } from "@/components/site/Strip"
import { Watch } from "@/components/site/Watch"
import { Work } from "@/components/site/Work"

export default function App() {
  return (
    <>
      <ScrollProgress className="h-[3px] from-violet via-teal to-teal" />
      <Nav />
      <main>
        <Hero />
        <Strip />
        <Services />
        <Watch />
        <Work />
        <Process />
        <Pricing />
        <About />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
