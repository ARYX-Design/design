import type { ReactNode } from "react"
import { BlurFade } from "@/components/magicui/blur-fade"
import { ShimmerButton, type ShimmerButtonProps } from "@/components/magicui/shimmer-button"
import { cn } from "@/lib/utils"

export function Section({ id, className, children }: { id?: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={cn("relative mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-24", className)}>
      {children}
    </section>
  )
}

export function SectionHead({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <BlurFade inView className="mb-12 max-w-2xl">
      <span className="font-display text-xs font-semibold tracking-[0.22em] text-teal uppercase">{eyebrow}</span>
      <h2 className="mt-4 text-3xl leading-tight font-bold sm:text-5xl">{title}</h2>
      {children && <p className="mt-4 text-lg text-muted-foreground">{children}</p>}
    </BlurFade>
  )
}

/** A Magic UI ShimmerButton that behaves like a link (a <button> must not live inside an <a>). */
export function ShimmerLink({ href, className, children, ...props }: { href: string } & ShimmerButtonProps) {
  return (
    <ShimmerButton
      type="button"
      shimmerColor="#ffffff"
      background="linear-gradient(120deg, #6f4df0, #00b8a0)"
      className={cn("font-display font-semibold shadow-[0_8px_30px_rgba(124,92,255,0.35)]", className)}
      onClick={() => {
        if (href.startsWith("#")) document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
        else window.location.href = href
      }}
      {...props}
    >
      {children}
    </ShimmerButton>
  )
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={cn("size-4", className)} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}
