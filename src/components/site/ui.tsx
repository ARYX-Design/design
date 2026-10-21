import type { ReactNode } from "react"
import { BlurFade } from "@/components/magicui/blur-fade"
import { cn } from "@/lib/utils"

/** Quiet fade-up on scroll (Magic UI BlurFade without the blur). */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <BlurFade inView direction="up" offset={14} blur="0px" duration={0.6} delay={delay} className={className}>
      {children}
    </BlurFade>
  )
}

export function Section({ id, className, children }: { id?: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={cn("relative mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-24 sm:py-32", className)}>
      {children}
    </section>
  )
}

export function SectionHead({ index, eyebrow, title, children, className }: { index?: string; eyebrow: string; title: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <Reveal className={cn("mb-14 grid gap-6 border-t border-border pt-6 lg:grid-cols-12", className)}>
      <p className="text-sm text-muted-foreground lg:col-span-3">
        {index && <span className="mr-3 tabular-nums">{index}</span>}
        {eyebrow}
      </p>
      <div className="lg:col-span-9">
        <h2 className="text-4xl leading-[1.05] sm:text-6xl">{title}</h2>
        {children && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{children}</p>}
      </div>
    </Reveal>
  )
}

export function Button({ href, children, variant = "solid", className }: { href: string; children: ReactNode; variant?: "solid" | "outline" | "light"; className?: string }) {
  const styles = {
    solid: "bg-ink text-paper hover:bg-ink/85",
    outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink/[.04]",
    light: "bg-paper text-ink hover:bg-white",
  }[variant]
  return (
    <a href={href} className={cn("group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium transition-colors", styles, className)}>
      {children}
    </a>
  )
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={cn("size-4 transition-transform group-hover:translate-x-0.5", className)} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}
