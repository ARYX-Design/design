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
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground">
          <p>© 2026 ARYX. All rights reserved.</p>
          <a href="/classic.html" className="link-underline">Previous site</a>
        </div>
      </div>
    </footer>
  )
}
