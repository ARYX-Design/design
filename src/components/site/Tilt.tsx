import { useRef, type ReactNode } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { cn } from "@/lib/utils"

/** Card that tilts toward the pointer in 3D, with a soft light glare. Children can lift out with `.lift`. */
export function TiltCard({ children, className, max = 9 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const move = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el || reduce || e.pointerType !== "mouse") return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height
    el.style.setProperty("--ry", `${(x - 0.5) * max * 2}deg`)
    el.style.setProperty("--rx", `${(0.5 - y) * max * 2}deg`)
    el.style.setProperty("--gx", `${x * 100}%`)
    el.style.setProperty("--gy", `${y * 100}%`)
  }
  const leave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg")
  }
  return (
    <div className="h-full [perspective:1100px]">
      <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={cn("tilt group relative h-full", className)}>
        {children}
        <span aria-hidden className="tilt-glare pointer-events-none absolute inset-0 rounded-[inherit]" />
      </div>
    </div>
  )
}

/** Tips a block back in 3D and stands it up as it scrolls into view. */
export function ScrollTilt({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center 60%"] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 32, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.88, 1])
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 60, 0])
  return (
    <div ref={ref} className={cn("[perspective:1400px]", className)}>
      <motion.div style={{ rotateX, scale, y, transformOrigin: "50% 100%" }}>{children}</motion.div>
    </div>
  )
}
