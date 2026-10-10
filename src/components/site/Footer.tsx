import { EMAIL, MAILTO } from "@/data/site"
import { Logo } from "./Logo"

const cols = [
  { h: "Services", links: [["Websites", "#services"], ["Logo & Identity", "#services"], ["AI Agents", "#services"], ["Automation", "#services"], ["Apps & Games", "#services"]] },
  { h: "Explore", links: [["Watch", "#watch"], ["Work", "#work"], ["Process", "#process"], ["Pricing", "#pricing"], ["Insights", "/insights.html"]] },
]

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0d0d14]">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">Digital creator crafting websites, logos, apps, games, AI agents and automations for teams who want to look world-class.</p>
          </div>
          <div className="flex flex-wrap gap-16">
            {cols.map((c) => (
              <div key={c.h}>
                <h4 className="mb-4 font-display text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">{c.h}</h4>
                <ul className="space-y-2.5 text-sm">
                  {c.links.map(([l, h]) => <li key={l}><a href={h} className="text-neutral-300 hover:text-foreground">{l}</a></li>)}
                </ul>
              </div>
            ))}
            <div>
              <h4 className="mb-4 font-display text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">Get in touch</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href={MAILTO} className="text-neutral-300 hover:text-foreground">{EMAIL}</a></li>
                <li><a href="/classic.html" className="text-neutral-300 hover:text-foreground">Classic design</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-muted-foreground">
          <p>© 2026 ARYX. All rights reserved.</p>
          <p>Built with React, Tailwind and Magic UI.</p>
        </div>
      </div>
    </footer>
  )
}
