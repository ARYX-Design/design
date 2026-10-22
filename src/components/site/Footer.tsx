import { EMAIL, MAILTO } from "@/data/site"
import { Logo } from "./Logo"

const cols = [
  { h: "Services", links: [["Websites", "#services"], ["Logo & Identity", "#services"], ["AI Agents", "#services"], ["Automation", "#services"], ["Apps & Games", "#services"]] },
  { h: "Studio", links: [["Work", "#work"], ["Films", "#watch"], ["Process", "#process"], ["Pricing", "#pricing"], ["Insights", "/insights.html"]] },
]

export function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-wrap justify-between gap-12">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">Design & AI studio for brand identity, websites, apps and automation.</p>
          </div>
          <div className="flex flex-wrap gap-16">
            {cols.map((c) => (
              <div key={c.h}>
                <h4 className="mb-4 text-sm text-muted-foreground">{c.h}</h4>
                <ul className="space-y-2.5 text-sm">
                  {c.links.map(([l, h]) => <li key={l}><a href={h} className="link-underline">{l}</a></li>)}
                </ul>
              </div>
            ))}
            <div>
              <h4 className="mb-4 text-sm text-muted-foreground">Contact</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href={MAILTO} className="link-underline">{EMAIL}</a></li>
              </ul>
            </div>
          </div>
        </div>
        <p aria-hidden className="mt-16 -mb-4 select-none bg-clip-text text-center font-display text-[25vw] leading-[0.78] font-extrabold tracking-[-0.06em] text-transparent lg:text-[17rem]" style={{ backgroundImage: "linear-gradient(100deg,#0b1220 30%,#2e4bff 45%,#ff8a4c 55%,#0b1220 70%)", backgroundSize: "300% 100%", animation: "shimmer-x 7s ease-in-out infinite alternate" }}>ARYX</p>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground">
          <p>© 2026 ARYX. All rights reserved.</p>
          <a href="/classic.html" className="link-underline">Previous site</a>
        </div>
      </div>
    </footer>
  )
}
