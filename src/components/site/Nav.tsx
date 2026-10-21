import { useEffect, useState } from "react"
import { MAILTO, navLinks } from "@/data/site"
import { cn } from "@/lib/utils"
import { Logo } from "./Logo"
import { Button } from "./ui"

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12)
    on(); window.addEventListener("scroll", on, { passive: true })
    return () => window.removeEventListener("scroll", on)
  }, [])
  return (
    <header className={cn("fixed inset-x-0 top-0 z-40 border-b transition-colors", scrolled || open ? "border-border bg-paper/90 backdrop-blur-md" : "border-transparent")}>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo />
        <ul className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {navLinks.map((l) => (
            <li key={l.href}><a href={l.href} className="link-underline transition-colors hover:text-foreground">{l.label}</a></li>
          ))}
        </ul>
        <Button href={MAILTO} className="hidden px-5 py-2 text-sm md:inline-flex">Start a project</Button>
        <button type="button" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={open} className="grid size-10 place-items-center rounded-full border border-border md:hidden">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">{open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}</svg>
        </button>
      </nav>
      {open && (
        <div className="border-t border-border px-6 pt-2 pb-6 md:hidden">
          <ul className="flex flex-col">
            {navLinks.map((l) => (
              <li key={l.href}><a href={l.href} onClick={() => setOpen(false)} className="block border-b border-border py-3 font-display text-2xl">{l.label}</a></li>
            ))}
          </ul>
          <Button href={MAILTO} className="mt-5">Start a project</Button>
        </div>
      )}
    </header>
  )
}
