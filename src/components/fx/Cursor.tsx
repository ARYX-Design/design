import { useEffect, useRef, useState } from "react"
import { finePointer, reducedMotion } from "./scroll"

/** A ring that trails the pointer, grows over links and shows a label over elements with data-cursor. */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState("")
  const [mode, setMode] = useState<"" | "link" | "label">("")
  const [visible, setVisible] = useState(false)
  const enabled = finePointer && !reducedMotion
  useEffect(() => {
    if (!enabled) return
    let tx = -100, ty = -100, rx = -100, ry = -100, raf = 0
    const move = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY
      setVisible(true)
      if (dot.current) dot.current.style.transform = `translate3d(${tx}px,${ty}px,0)`
    }
    const over = (e: Event) => {
      const t = e.target as HTMLElement
      const tagged = t.closest<HTMLElement>("[data-cursor]")
      if (tagged) { setLabel(tagged.dataset.cursor ?? ""); setMode("label"); return }
      setLabel("")
      setMode(t.closest("a,button") ? "link" : "")
    }
    const loop = () => {
      rx += (tx - rx) * 0.18; ry += (ty - ry) * 0.18
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0)`
      raf = requestAnimationFrame(loop)
    }
    const leave = () => setVisible(false)
    window.addEventListener("pointermove", move, { passive: true })
    document.addEventListener("pointerover", over)
    document.documentElement.addEventListener("pointerleave", leave)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", move)
      document.removeEventListener("pointerover", over)
      document.documentElement.removeEventListener("pointerleave", leave)
    }
  }, [enabled])
  if (!enabled) return null
  return (
    <div aria-hidden className={`pointer-events-none fixed inset-0 z-[90] transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}>
      <div ref={ring} className="absolute top-0 left-0">
        <div className={`cursor-ring grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full ${mode === "label" ? "size-24 bg-primary text-white" : mode === "link" ? "size-14 border-2 border-primary/70 bg-primary/10" : "size-9 border-2 border-ink/40"}`}>
          {mode === "label" && <span className="text-xs font-semibold tracking-wide">{label}</span>}
        </div>
      </div>
      <div ref={dot} className="absolute top-0 left-0"><div className="size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" /></div>
    </div>
  )
}
