import { Fragment, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

/** Heading whose words slide up from a mask, one after another, when it scrolls into view. */
export function SplitWords({ text, className, as: Tag = "h2" }: { text: string; className?: string; as?: "h1" | "h2" | "h3" }) {
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect() } }, { rootMargin: "0px 0px -60px 0px" })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const words = text.split(" ")
  return (
    <Tag ref={ref} className={cn("split", className)} aria-label={text}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span aria-hidden className="split-w"><span style={{ transitionDelay: `${i * 0.06}s` }}>{w}</span></span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </Tag>
  )
}
