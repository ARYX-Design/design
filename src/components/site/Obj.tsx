import { lazy, Suspense, type ReactNode } from "react"
import type { Kind } from "@/components/three/objects"

const Object3D = lazy(() => import("@/components/three/objects"))
const LazyPort = lazy(() => import("@/components/three/objects").then((m) => ({ default: m.Port })))

export const webgl = (() => {
  if (typeof document === "undefined") return false
  try {
    const c = document.createElement("canvas")
    return !!(c.getContext("webgl2") || c.getContext("webgl"))
  } catch { return false }
})()

/** Real 3D object when WebGL is available, otherwise the given fallback (e.g. the isometric SVG). */
export function Obj({ kind, className, zoom, fallback = null }: { kind: Kind; className?: string; zoom?: number; fallback?: ReactNode }) {
  if (!webgl) return <>{fallback}</>
  return (
    <Suspense fallback={fallback}>
      <Object3D kind={kind} className={className} zoom={zoom} />
    </Suspense>
  )
}

export function ObjPort() {
  if (!webgl) return null
  return <Suspense fallback={null}><LazyPort /></Suspense>
}
