import { Marquee } from "@/components/magicui/marquee"
import { marqueeItems } from "@/data/site"

export function Strip() {
  return (
    <div className="border-y border-border bg-stone/60 py-5 text-muted-foreground" aria-label="Capabilities">
      <Marquee pauseOnHover className="[--duration:60s] [--gap:3rem] p-0">
        {marqueeItems.map((m) => (
          <span key={m} className="flex items-center gap-12 font-display text-2xl text-foreground/70">
            {m}<span aria-hidden className="text-base text-border">/</span>
          </span>
        ))}
      </Marquee>
    </div>
  )
}
