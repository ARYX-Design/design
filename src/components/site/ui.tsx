import type { ReactNode } from "react"
import { BlurFade } from "@/components/magicui/blur-fade"
import { cn } from "@/lib/utils"

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <BlurFade inView direction="up" offset={18} blur="0px" duration={0.7} delay={delay} className={className}>
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

export function SectionHead({ title, children, className }: { title: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <div className={cn("mb-14 grid items-end gap-6 lg:grid-cols-12", className)}>
      <h2 className="text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.98] lg:col-span-7">{title}</h2>
      {children && <p className="max-w-md text-lg leading-relaxed text-muted-foreground lg:col-span-5 lg:justify-self-end">{children}</p>}
    </div>
  )
}

export function Button({ href, children, variant = "solid", className }: { href: string; children: ReactNode; variant?: "solid" | "ghost" | "light" | "dark"; className?: string }) {
  const styles = {
    solid: "bg-primary text-primary-foreground shadow-[0_10px_30px_-10px_rgba(46,75,255,.7)] hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-12px_rgba(46,75,255,.8)]",
    ghost: "bg-white/70 text-foreground ring-1 ring-border backdrop-blur hover:-translate-y-0.5 hover:bg-white",
    light: "bg-white text-ink hover:-translate-y-0.5",
    dark: "bg-ink text-white hover:-translate-y-0.5",
  }[variant]
  return (
    <a href={href} className={cn("inline-flex items-center justify-center rounded-full px-6 py-3.5 text-[15px] font-semibold transition-all duration-300", styles, className)}>
      {children}
    </a>
  )
}
