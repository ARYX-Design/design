import { cn } from "@/lib/utils"

export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <a href="#top" className={cn("flex items-center gap-2.5", className)} aria-label="ARYX home">
      <img src={light ? "/assets/logo/aryx-mark-mono-white.svg" : "/assets/logo/aryx-mark-mono-black.svg"} alt="" width={26} height={26} className="size-[26px]" />
      <span className="text-[15px] font-semibold tracking-[0.22em]">ARYX</span>
    </a>
  )
}
