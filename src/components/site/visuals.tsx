import { forwardRef, useEffect, useRef, useState, type ReactNode } from "react"
import { AnimatedBeam } from "@/components/magicui/animated-beam"
import { AnimatedList } from "@/components/magicui/animated-list"
import { OrbitingCircles } from "@/components/magicui/orbiting-circles"
import { TypingAnimation } from "@/components/magicui/typing-animation"
import { art } from "@/art/art-data"
import { cn } from "@/lib/utils"

/** The animated SVG illustrations (own artwork), styled in art/art.css. */
export function ArtVisual({ k }: { k: string }) {
  return <div className={`sa sa-${k}`} dangerouslySetInnerHTML={{ __html: art[k] }} />
}

/** Re-mounts its children every `ms`, so one-shot Magic UI animations loop. */
function Loop({ ms, children, className }: { ms: number; children: ReactNode; className?: string }) {
  const [k, setK] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setK((x) => x + 1), ms)
    return () => clearInterval(t)
  }, [ms])
  return <div key={k} className={className}>{children}</div>
}

const Circle = forwardRef<HTMLDivElement, { className?: string; children: ReactNode }>(({ className, children }, ref) => (
  <div ref={ref} className={cn("z-10 grid size-11 place-items-center rounded-full border border-white/15 bg-[#14121f] shadow-[0_0_20px_-8px_rgba(255,255,255,.4)]", className)}>{children}</div>
))
Circle.displayName = "Circle"

const Icon = ({ d, color }: { d: string; color: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden><path d={d} /></svg>
)
const icons = {
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  calendar: "M5 5h14v15H5zM5 10h14M9 3v4M15 3v4",
  chat: "M5 5h14v11H9l-4 4z",
  doc: "M7 3h8l4 4v14H7zM14 3v5h5M10 13h6M10 17h6",
}

/** AI Agents: a hub connected to the tools it works across (Magic UI AnimatedBeam). */
export function AgentsVisual() {
  const box = useRef<HTMLDivElement>(null)
  const hub = useRef<HTMLDivElement>(null)
  const a = useRef<HTMLDivElement>(null), b = useRef<HTMLDivElement>(null), c = useRef<HTMLDivElement>(null), d = useRef<HTMLDivElement>(null)
  return (
    <div ref={box} className="relative flex h-full items-center justify-between px-10 sm:px-20">
      <div className="flex flex-col gap-8">
        <Circle ref={a}><Icon d={icons.mail} color="#9a78ff" /></Circle>
        <Circle ref={b}><Icon d={icons.calendar} color="#ff5c8a" /></Circle>
      </div>
      <Circle ref={hub} className="size-16 border-teal/60">
        <img src="/assets/logo/aryx-mark.svg" alt="" className="size-9" />
      </Circle>
      <div className="flex flex-col gap-8">
        <Circle ref={c}><Icon d={icons.chat} color="#00f0c8" /></Circle>
        <Circle ref={d}><Icon d={icons.doc} color="#ffb347" /></Circle>
      </div>
      <AnimatedBeam containerRef={box} fromRef={a} toRef={hub} curvature={-30} gradientStartColor="#9a78ff" gradientStopColor="#00f0c8" />
      <AnimatedBeam containerRef={box} fromRef={b} toRef={hub} curvature={30} delay={0.6} gradientStartColor="#ff5c8a" gradientStopColor="#00f0c8" />
      <AnimatedBeam containerRef={box} fromRef={c} toRef={hub} curvature={-30} reverse delay={0.3} gradientStartColor="#00f0c8" gradientStopColor="#9a78ff" />
      <AnimatedBeam containerRef={box} fromRef={d} toRef={hub} curvature={30} reverse delay={0.9} gradientStartColor="#ffb347" gradientStopColor="#00f0c8" />
    </div>
  )
}

/** Logo & Identity: palette swatches orbiting the mark (Magic UI OrbitingCircles). */
export function LogoVisual() {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden">
      <img src="/assets/logo/aryx-mark.svg" alt="" className="relative z-10 size-14 drop-shadow-[0_0_24px_rgba(124,92,255,.6)]" />
      <OrbitingCircles iconSize={26} radius={56} duration={16}>
        <div className="size-5 rounded-full bg-violet" />
        <div className="size-5 rounded-full bg-teal" />
        <div className="size-5 rounded-full bg-coral" />
      </OrbitingCircles>
      <OrbitingCircles iconSize={22} radius={96} duration={26} reverse>
        <div className="size-4 rounded-md bg-amber" />
        <div className="size-4 rotate-45 rounded-sm bg-white" />
      </OrbitingCircles>
    </div>
  )
}

const flows = [
  { t: "New form submitted", c: "#9a78ff" },
  { t: "Row added to your sheet", c: "#00f0c8" },
  { t: "Confirmation email sent", c: "#ffb347" },
  { t: "Weekly report ready", c: "#ff5c8a" },
]

/** Automation: tasks completing themselves (Magic UI AnimatedList, restarted so it loops). */
export function AutomationVisual() {
  return (
    <Loop ms={9500} className="h-full overflow-hidden px-6 pt-4 [mask-image:linear-gradient(to_bottom,#000_60%,transparent)]">
      <AnimatedList delay={1400} className="gap-2.5">
        {flows.map((f) => (
          <div key={f.t} className="flex w-full max-w-sm items-center gap-3 rounded-xl border border-white/10 bg-white/[.05] px-3 py-2.5">
            <span className="grid size-8 place-items-center rounded-lg" style={{ background: f.c + "33" }}>
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke={f.c} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10" /></svg>
            </span>
            <span className="text-sm font-medium">{f.t}</span>
          </div>
        ))}
      </AnimatedList>
    </Loop>
  )
}

/** AI Chatbots: a bot answering, typed out (Magic UI TypingAnimation). */
export function ChatVisual() {
  return (
    <Loop ms={8000} className="flex h-full flex-col justify-center gap-3 px-6">
      <div className="ml-auto max-w-[75%] rounded-2xl rounded-br-sm bg-violet px-4 py-2 text-sm font-medium text-[#08080c]">Can I book a call?</div>
      <div className="flex items-start gap-2">
        <span className="mt-1 size-7 shrink-0 rounded-full bg-grad" />
        <div className="max-w-[80%] rounded-2xl rounded-bl-sm border border-white/10 bg-white/[.06] px-4 py-2 text-sm">
          <TypingAnimation duration={38} delay={700} startOnView={false} className="leading-snug tracking-normal">
            Of course! Pick a time that suits you and I'll confirm it.
          </TypingAnimation>
        </div>
      </div>
    </Loop>
  )
}
