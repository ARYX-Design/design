import { BlurFade } from "@/components/magicui/blur-fade"
import { MagicCard } from "@/components/magicui/magic-card"
import { services, type Service, type ServiceKey } from "@/data/site"
import { cn } from "@/lib/utils"
import { ArtVisual, AgentsVisual, AutomationVisual, ChatVisual, LogoVisual } from "./visuals"
import { Section, SectionHead } from "./ui"

const visual: Record<ServiceKey, React.ReactNode> = {
  agents: <AgentsVisual />,
  websites: <ArtVisual k="1" />,
  logo: <LogoVisual />,
  automation: <AutomationVisual />,
  chatbots: <ChatVisual />,
  workflows: <ArtVisual k="9" />,
  apps: <ArtVisual k="5" />,
  games: <ArtVisual k="4" />,
  uiux: <ArtVisual k="3" />,
}

function BentoCard({ s, i }: { s: Service; i: number }) {
  return (
    <BlurFade inView delay={0.05 * (i % 3)} className={cn("h-full", s.className)}>
      <MagicCard className="h-full rounded-xl" gradientColor="#1c1c2e" gradientFrom="#9a78ff" gradientTo="#00f0c8">
        <div className="flex h-full flex-col">
          <div className="relative h-44 shrink-0 overflow-hidden border-b border-white/10 bg-[#101018]">{visual[s.key]}</div>
          <div className="flex flex-1 flex-col p-5">
            <h3 className="text-xl font-semibold">{s.name}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{s.description}</p>
            <ul className="mt-auto space-y-1 pt-3 text-sm text-neutral-400">
              {s.bullets.map((b) => (
                <li key={b} className="flex gap-2"><span className="text-teal">→</span>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </MagicCard>
    </BlurFade>
  )
}

export function Services() {
  return (
    <Section id="services">
      <SectionHead eyebrow="What I do" title={<>One creator, <span className="text-grad">everything</span> your brand needs.</>}>
        From the first sketch of a logo to a live website, a custom app, a small game, an AI agent or a workflow that runs itself: one creator, one point of contact, no juggling five freelancers.
      </SectionHead>
      <BlurFade inView className="-mt-6 mb-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-grad px-4 py-2 font-display text-sm font-semibold text-[#08080c] shadow-[0_8px_24px_rgba(124,92,255,.35)]">✦ Starting from just €19.99</span>
      </BlurFade>
      <div className="grid auto-rows-[26rem] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => <BentoCard key={s.key} s={s} i={i} />)}
      </div>
    </Section>
  )
}
