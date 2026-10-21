import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, Lightformer } from "@react-three/drei"
import * as THREE from "three"

// The ARYX mark (48×48 SVG) rebuilt in 3D: three nodes, three edges and the centre ring.
const S = 0.1
const p = (x: number, y: number) => new THREE.Vector3((x - 24) * S, (26 - y) * S, 0)
const TOP = p(24, 8), LEFT = p(6, 41), RIGHT = p(42, 41), BAR_L = p(12.9, 28), BAR_R = p(35.1, 28), RING = p(24, 28)

function Tube({ a, b, r = 0.13 }: { a: THREE.Vector3; b: THREE.Vector3; r?: number }) {
  const { pos, quat, len } = useMemo(() => {
    const dir = new THREE.Vector3().subVectors(b, a)
    return {
      pos: new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5),
      quat: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize()),
      len: dir.length(),
    }
  }, [a, b])
  return (
    <mesh position={pos} quaternion={quat} castShadow>
      <capsuleGeometry args={[r, len, 6, 20]} />
      <meshPhysicalMaterial color="#f3f6fc" metalness={0.75} roughness={0.22} clearcoat={1} clearcoatRoughness={0.12} envMapIntensity={1.8} />
    </mesh>
  )
}

function Node({ at, r, color }: { at: THREE.Vector3; r: number; color: string }) {
  return (
    <mesh position={at} castShadow>
      <sphereGeometry args={[r, 40, 40]} />
      <meshPhysicalMaterial color={color} roughness={0.18} clearcoat={1} clearcoatRoughness={0.08} sheen={0.4} />
    </mesh>
  )
}

/** Small "agents" circling the mark on tilted orbits. */
function Satellites({ still }: { still: boolean }) {
  const group = useRef<THREE.Group>(null)
  const orbits = useMemo(() => [
    { r: 3.0, tilt: [1.15, 0.2, 0], speed: 0.35, phase: 0, color: "#2e4bff", size: 0.12 },
    { r: 3.4, tilt: [1.35, -0.5, 0.3], speed: -0.25, phase: 2, color: "#ff8a4c", size: 0.1 },
    { r: 2.6, tilt: [0.9, 0.7, -0.2], speed: 0.45, phase: 4, color: "#0b1220", size: 0.09 },
  ], [])
  useFrame(({ clock }) => {
    if (!group.current || still) return
    group.current.children.forEach((orbit, i) => {
      const o = orbits[i], t = clock.getElapsedTime() * o.speed + o.phase
      const dot = orbit.children[1] as THREE.Mesh
      dot.position.set(Math.cos(t) * o.r, Math.sin(t) * o.r, 0)
    })
  })
  return (
    <group ref={group}>
      {orbits.map((o, i) => (
        <group key={i} rotation={o.tilt as [number, number, number]}>
          <mesh>
            <torusGeometry args={[o.r, 0.006, 4, 96]} />
            <meshBasicMaterial color="#0b1220" transparent opacity={0.16} />
          </mesh>
          <mesh position={[Math.cos(o.phase) * o.r, Math.sin(o.phase) * o.r, 0]}>
            <sphereGeometry args={[o.size, 32, 32]} />
            <meshPhysicalMaterial color={o.color} roughness={0.2} clearcoat={1} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Mark({ still }: { still: boolean }) {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ pointer, clock }, dt) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    const ty = still ? -0.35 : pointer.x * 0.55 + Math.sin(t * 0.35) * 0.35 - 0.3
    const tx = still ? 0.12 : -pointer.y * 0.3 + 0.1
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, ty, 3, dt)
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, tx, 3, dt)
  })
  return (
    <group ref={ref}>
      <Float speed={still ? 0 : 1.4} rotationIntensity={0.25} floatIntensity={0.6}>
        <Tube a={TOP} b={LEFT} />
        <Tube a={TOP} b={RIGHT} />
        <Tube a={BAR_L} b={BAR_R} r={0.1} />
        <Node at={TOP} r={0.5} color="#ff8a4c" />
        <Node at={LEFT} r={0.46} color="#2e4bff" />
        <Node at={RIGHT} r={0.46} color="#2e4bff" />
        <mesh position={RING} castShadow>
          <torusGeometry args={[0.43, 0.13, 20, 64]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.08} clearcoat={1} transparent opacity={0.72} envMapIntensity={2} />
        </mesh>
        <Satellites still={still} />
      </Float>
    </group>
  )
}

export default function Sculpture({ className }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const still = useMemo(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches, [])
  useEffect(() => {
    const el = host.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={host} className={className} aria-hidden>
      <div className="pointer-events-none absolute bottom-[6%] left-1/2 h-10 w-[55%] -translate-x-1/2 rounded-[50%] bg-[#1a2440]/25 blur-2xl" />
      <Canvas frameloop={visible ? "always" : "never"} dpr={[1, 1.5]} camera={{ position: [0, 0, 9], fov: 38 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 6, 5]} intensity={1.6} castShadow />
        <Mark still={still} />
        <Environment resolution={128}>
          <Lightformer form="rect" intensity={4} position={[0, 4, -6]} scale={[14, 6, 1]} />
          <Lightformer form="rect" intensity={2.5} position={[0, 0, 8]} scale={[14, 8, 1]} />
          <Lightformer form="rect" intensity={2} position={[-6, 1, 2]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} />
          <Lightformer form="rect" intensity={1.5} color="#c9d4ff" position={[6, -1, 2]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} />
          <Lightformer form="ring" intensity={2} color="#ffd9c4" position={[0, -4, 4]} scale={4} />
        </Environment>
      </Canvas>
    </div>
  )
}
