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
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-3">
      <nav className={cn("mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full px-4 pl-5 transition-all duration-300", scrolled || open ? "bg-white/80 shadow-depth backdrop-blur-xl" : "")}>
        <Logo />
        <ul className="hidden items-center gap-7 text-[15px] text-muted-foreground md:flex">
          {navLinks.map((l) => (
            <li key={l.href}><a href={l.href} className="transition-colors hover:text-foreground">{l.label}</a></li>
          ))}
        </ul>
        <Button href={MAILTO} className="hidden px-5 py-2.5 text-sm md:inline-flex">Start a project</Button>
        <button type="button" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={open} className="grid size-10 place-items-center rounded-full bg-white/80 md:hidden">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">{open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}</svg>
        </button>
      </nav>
      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-3xl bg-white/95 p-5 shadow-depth backdrop-blur-xl md:hidden">
          <ul className="flex flex-col">
            {navLinks.map((l) => (
              <li key={l.href}><a href={l.href} onClick={() => setOpen(false)} className="block border-b border-border py-3 font-display text-2xl font-semibold">{l.label}</a></li>
            ))}
          </ul>
          <Button href={MAILTO} className="mt-5 w-full">Start a project</Button>
        </div>
      )}
    </header>
  )
}
