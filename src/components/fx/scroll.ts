// One shared, rAF-throttled scroll loop. Effects subscribe instead of each adding listeners.
type Fn = () => void
const subs = new Set<Fn>()
export const scrollState = { y: 0, vy: 0, heroP: 0, pageP: 0 }
let ticking = false
let lastY = 0

function tick() {
  ticking = false
  const y = window.scrollY
  scrollState.vy = y - lastY
  lastY = y
  scrollState.y = y
  scrollState.heroP = Math.min(1, Math.max(0, y / window.innerHeight))
  const max = document.documentElement.scrollHeight - window.innerHeight
  scrollState.pageP = max > 0 ? y / max : 0
  const root = document.documentElement.style
  root.setProperty("--hero-p", scrollState.heroP.toFixed(4))
  root.setProperty("--page-p", scrollState.pageP.toFixed(4))
  subs.forEach((f) => f())
}
const request = () => { if (!ticking) { ticking = true; requestAnimationFrame(tick) } }
if (typeof window !== "undefined") {
  window.addEventListener("scroll", request, { passive: true })
  window.addEventListener("resize", request)
  requestAnimationFrame(tick)
}

export function onScroll(fn: Fn) {
  subs.add(fn)
  fn()
  return () => { subs.delete(fn) }
}

export const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
export const finePointer = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
