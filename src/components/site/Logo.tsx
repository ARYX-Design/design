import { cn } from "@/lib/utils"

export function Logo({ className, text = true }: { className?: string; text?: boolean }) {
  return (
    <a href="#top" className={cn("flex items-center gap-2.5 font-display text-xl font-bold tracking-wide", className)} aria-label="ARYX home">
      <img src="/assets/logo/aryx-mark.svg" alt="" width={30} height={30} className="size-[30px] drop-shadow-[0_4px_12px_rgba(124,92,255,0.5)]" />
      {text && <span>ARYX</span>}
    </a>
  )
}
