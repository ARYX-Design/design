import { useEffect, useState } from "react"
import { reducedMotion } from "./scroll"

// Decide before the first paint, so the hero can delay its own entrance behind the curtain.
const show = (() => {
  if (typeof window === "undefined" || reducedMotion) return false
  try { if (sessionStorage.getItem("aryx-intro")) return false; sessionStorage.setItem("aryx-intro", "1") } catch { /* private mode */ }
  return true
})()
if (show) document.documentElement.style.setProperty("--intro-delay", "1.15s")

/** Short curtain on the first visit of a session: the wordmark rises, then the panel lifts away. */
export function Intro() {
  const [on, setOn] = useState(show)
  useEffect(() => {
    if (!on) return
    const t = setTimeout(() => setOn(false), 2100)
    return () => clearTimeout(t)
  }, [on])
  if (!on) return null
  return (
    <div aria-hidden className="intro fixed inset-0 z-[80] grid place-items-center bg-ink text-white">
      <div className="flex items-center gap-4 overflow-hidden">
        <img src="/assets/logo/aryx-mark-mono-white.svg" alt="" className="intro-mark size-14" />
        <p className="flex font-display text-6xl font-extrabold tracking-[0.06em] sm:text-7xl">
          {"ARYX".split("").map((c, i) => <span key={i} className="intro-char inline-block" style={{ animationDelay: `${0.1 + i * 0.07}s` }}>{c}</span>)}
        </p>
      </div>
      <div className="intro-bar absolute bottom-0 left-0 h-1 bg-primary" />
    </div>
  )
}
