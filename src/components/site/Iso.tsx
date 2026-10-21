// Small isometric 3D glyphs, drawn as SVG boxes with lit top, mid and shaded faces.
import type { ServiceKey } from "@/data/site"

type Pt = [number, number]
const C = Math.cos(Math.PI / 6), Sn = 0.5
const pr = (x: number, y: number, z: number): Pt => [(x - y) * C, (x + y) * Sn - z]
const poly = (pts: Pt[]) => pts.map((q) => q.map((n) => n.toFixed(2)).join(",")).join(" ")

const tones: Record<string, [string, string, string]> = {
  cobalt: ["#7d90ff", "#2e4bff", "#1d33c4"],
  apricot: ["#ffc2a0", "#ff8a4c", "#d9632a"],
  ink: ["#3a4458", "#1a2236", "#0b1220"],
  porcelain: ["#ffffff", "#e3e8f1", "#c3cbda"],
}

function box(x: number, y: number, z: number, w: number, d: number, h: number, tone: keyof typeof tones, key: string) {
  const [top, left, right] = tones[tone]
  const t = [pr(x, y, z + h), pr(x + w, y, z + h), pr(x + w, y + d, z + h), pr(x, y + d, z + h)]
  const l = [pr(x, y + d, z), pr(x + w, y + d, z), pr(x + w, y + d, z + h), pr(x, y + d, z + h)]
  const r = [pr(x + w, y, z), pr(x + w, y + d, z), pr(x + w, y + d, z + h), pr(x + w, y, z + h)]
  return (
    <g key={key}>
      <polygon points={poly(l)} fill={left} />
      <polygon points={poly(r)} fill={right} />
      <polygon points={poly(t)} fill={top} />
    </g>
  )
}

function ball(x: number, y: number, z: number, r: number, tone: keyof typeof tones, key: string) {
  const [cx, cy] = pr(x, y, z)
  const id = `b-${key}`
  return (
    <g key={key}>
      <defs>
        <radialGradient id={id} cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor={tones[tone][0]} />
          <stop offset=".55" stopColor={tones[tone][1]} />
          <stop offset="1" stopColor={tones[tone][2]} />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id})`} />
    </g>
  )
}

function line(a: [number, number, number], b: [number, number, number], key: string) {
  const [x1, y1] = pr(...a), [x2, y2] = pr(...b)
  return <line key={key} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#9aa6bd" strokeWidth={2.2} strokeLinecap="round" />
}

const scenes: Record<ServiceKey, () => React.ReactNode[]> = {
  agents: () => [
    box(-30, -30, 0, 60, 60, 8, "porcelain", "base"),
    line([0, -18, 26], [-18, 16, 26], "l1"), line([0, -18, 26], [18, 16, 26], "l2"), line([-18, 16, 26], [18, 16, 26], "l3"),
    ball(0, -18, 26, 11, "apricot", "n1"), ball(-18, 16, 26, 10, "cobalt", "n2"), ball(18, 16, 26, 10, "cobalt", "n3"),
  ],
  websites: () => [
    box(-26, -20, 0, 52, 40, 5, "porcelain", "p1"), box(-26, -20, 12, 52, 40, 5, "porcelain", "p2"),
    box(-26, -20, 24, 52, 40, 5, "cobalt", "p3"), box(-18, -12, 29, 22, 8, 3, "porcelain", "p4"),
  ],
  logo: () => [box(-22, -22, 0, 44, 44, 34, "ink", "c"), box(-8, -8, 34, 16, 16, 16, "apricot", "c2")],
  automation: () => [
    box(-36, -10, 0, 20, 20, 14, "porcelain", "a"), box(-10, -10, 0, 20, 20, 22, "cobalt", "b"), box(16, -10, 0, 20, 20, 30, "apricot", "c"),
  ],
  chatbots: () => [box(-26, -18, 0, 52, 36, 10, "porcelain", "a"), box(-20, -12, 16, 30, 14, 10, "cobalt", "b"), box(-2, 2, 30, 26, 12, 9, "apricot", "c")],
  workflows: () => [box(-30, -14, 0, 20, 28, 12, "porcelain", "a"), box(-10, -14, 0, 20, 28, 24, "porcelain", "b"), box(10, -14, 0, 20, 28, 36, "cobalt", "c")],
  apps: () => [box(-14, -24, 0, 28, 8, 56, "ink", "a"), box(-10, -26, 6, 20, 2, 44, "cobalt", "s"), box(18, -4, 0, 16, 16, 16, "apricot", "b")],
  games: () => [
    box(-22, -22, 0, 44, 44, 44, "porcelain", "c"),
    ...[[-8, -8], [8, 8], [0, 0], [-8, 8], [8, -8]].map(([x, y], i) => ball(x, y, 44, 3.6, "ink", `d${i}`)),
  ],
  uiux: () => [box(-28, -22, 0, 56, 44, 4, "porcelain", "a"), box(-22, -16, 14, 44, 32, 4, "cobalt", "b"), box(-16, -10, 28, 32, 20, 4, "apricot", "c")],
}

export function Iso({ k, className }: { k: ServiceKey; className?: string }) {
  return (
    <svg viewBox="-60 -70 120 100" className={className} aria-hidden>
      <ellipse cx="0" cy="22" rx="46" ry="9" fill="#0b1220" opacity=".08" />
      {scenes[k]()}
    </svg>
  )
}
