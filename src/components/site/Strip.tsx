import { Marquee } from "@/components/magicui/marquee"
import { marqueeItems } from "@/data/site"

export function Strip() {
  return (
    <div className="relative border-y border-white/10 bg-white/[.02] py-3">
      <Marquee pauseOnHover className="[--duration:35s] [--gap:1.25rem]">
        {marqueeItems.map((m) => (
          <span key={m} className="inline-flex items-center gap-5 font-display text-lg text-muted-foreground">
            {m} <span className="text-violet">✦</span>
          </span>
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-background" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-background" />
    </div>
  )
}
