import { useEffect, useRef, type ReactNode } from "react"
import { SplitWords } from "@/components/fx/Split"
import { finePointer, reducedMotion } from "@/components/fx/scroll"
import { cn } from "@/lib/utils"

/** Fades content up once it scrolls into view. Pure CSS transition, so it never waits on a busy main thread. */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect() } }, { rootMargin: "0px 0px -40px 0px" })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <div ref={ref} className={cn("reveal", className)} style={{ transitionDelay: `${delay}s` }}>{children}</div>
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
      {typeof title === "string"
        ? <SplitWords text={title} className="text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.98] lg:col-span-7" />
        : <h2 className="text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.98] lg:col-span-7">{title}</h2>}
      {children && <p className="max-w-md text-lg leading-relaxed text-muted-foreground lg:col-span-5 lg:justify-self-end">{children}</p>}
    </div>
  )
}

/** Link styled as a pill button that leans toward the pointer (magnetic). */
export function Button({ href, children, variant = "solid", className }: { href: string; children: ReactNode; variant?: "solid" | "ghost" | "light" | "dark"; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const magnetic = finePointer && !reducedMotion
  const move = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el || !magnetic) return
    const r = el.getBoundingClientRect()
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`
  }
  const leave = () => { if (ref.current) ref.current.style.transform = "" }
  const styles = {
    solid: "bg-primary text-primary-foreground shadow-[0_10px_30px_-10px_rgba(46,75,255,.7)] hover:shadow-[0_16px_36px_-12px_rgba(46,75,255,.8)]",
    ghost: "bg-white/70 text-foreground ring-1 ring-border backdrop-blur hover:bg-white",
    light: "bg-white text-ink",
    dark: "bg-ink text-white",
  }[variant]
  return (
    <a ref={ref} href={href} onPointerMove={move} onPointerLeave={leave} className={cn("inline-flex items-center justify-center rounded-full px-6 py-3.5 text-[15px] font-semibold transition-[transform,box-shadow,background-color] duration-300 ease-out", styles, className)}>
      {children}
    </a>
  )
}
