// Copied from magicuidesign/magicui (MIT, https://github.com/magicuidesign/magicui). Modified only where noted.
// Modified: the overdamped spring never lands exactly on the target (19.99 stalled at 19.98), so snap to the exact value once the count-up has had time to finish.
"use client"

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react"
import { useInView, useMotionValue, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number
  startValue?: number
  direction?: "up" | "down"
  delay?: number
  decimalPlaces?: number
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(direction === "down" ? value : startValue)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: "0px" })

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null
    let snap: ReturnType<typeof setTimeout> | null = null

    if (isInView) {
      const target = direction === "down" ? startValue : value
      timer = setTimeout(() => {
        motionValue.set(target)
      }, delay * 1000)
      snap = setTimeout(() => {
        springValue.jump(target)
      }, delay * 1000 + 2200)
    }

    return () => {
      if (timer !== null) clearTimeout(timer)
      if (snap !== null) clearTimeout(snap)
    }
  }, [motionValue, springValue, isInView, delay, value, direction, startValue])

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-US", {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
          }).format(Number(latest.toFixed(decimalPlaces)))
        }
      }),
    [springValue, decimalPlaces]
  )

  return (
    <span
      ref={ref}
      className={cn(
        "inline-block tracking-wider text-black tabular-nums dark:text-white",
        className
      )}
      {...props}
    >
      {startValue}
    </span>
  )
}
