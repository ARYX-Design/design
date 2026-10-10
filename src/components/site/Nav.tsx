import { useState } from "react"
import { MAILTO, navLinks } from "@/data/site"
import { Logo } from "./Logo"
import { ShimmerLink } from "./ui"

export function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-background/60 backdrop-blur-xl">
      <nav className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-6">
        <Logo />
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </a>
          ))}
          <ShimmerLink href={MAILTO} className="px-5 py-2.5 text-sm">Start a project</ShimmerLink>
        </div>
        <button
          type="button"
          className="grid size-10 place-items-center rounded-lg border border-white/10 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>
      {open && (
        <div className="flex flex-col gap-1 border-t border-white/5 bg-background/95 px-6 py-4 lg:hidden">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-muted-foreground hover:bg-white/5 hover:text-foreground">
              {l.label}
            </a>
          ))}
          <ShimmerLink href={MAILTO} className="mt-2 px-5 py-3 text-sm">Start a project</ShimmerLink>
        </div>
      )}
    </header>
  )
}
