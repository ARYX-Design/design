import { useEffect, useMemo, useRef, type ReactNode } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, PerspectiveCamera, RoundedBox, View } from "@react-three/drei"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"
import * as THREE from "three"

export type Kind =
  | "agents" | "websites" | "logo" | "automation" | "chatbots" | "workflows" | "apps" | "games" | "uiux"
  | "cube" | "network" | "cluster" | "knot"

// ---------- shared environment, pointer and materials ----------
let envTex: THREE.Texture | null = null
function Env() {
  const { gl, scene } = useThree()
  useEffect(() => {
    if (!envTex) envTex = new THREE.PMREMGenerator(gl).fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = envTex
  }, [gl, scene])
  return null
}

const pointer = { x: 0, y: 0 }
if (typeof window !== "undefined") {
  window.addEventListener("pointermove", (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1
  }, { passive: true })
}
const still = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

const mats = {
  cobalt: { color: "#2e4bff", roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.08, envMapIntensity: 0.6 },
  apricot: { color: "#ff8a4c", roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.08, envMapIntensity: 0.7 },
  ink: { color: "#1a2236", roughness: 0.35, clearcoat: 0.6 },
  porcelain: { color: "#f5f7fc", roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.15 },
  chrome: { color: "#eef2f9", metalness: 0.85, roughness: 0.18, clearcoat: 1 },
  glass: { color: "#dfe5ff", roughness: 0.06, clearcoat: 1, transparent: true, opacity: 0.6, envMapIntensity: 1.6 },
  glassBlue: { color: "#5f78ff", roughness: 0.05, clearcoat: 1, transparent: true, opacity: 0.7, envMapIntensity: 1.4 },
} as const
type MatName = keyof typeof mats
const M = ({ m }: { m: MatName }) => <meshPhysicalMaterial {...mats[m]} />

function Link({ a, b, r = 0.06, m = "chrome" }: { a: THREE.Vector3; b: THREE.Vector3; r?: number; m?: MatName }) {
  const { pos, quat, len } = useMemo(() => {
    const d = new THREE.Vector3().subVectors(b, a)
    return { pos: a.clone().add(b).multiplyScalar(0.5), quat: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize()), len: d.length() }
  }, [a, b])
  return <mesh position={pos} quaternion={quat}><capsuleGeometry args={[r, len, 4, 16]} /><M m={m} /></mesh>
}
const Ball = ({ p, r, m }: { p: [number, number, number]; r: number; m: MatName }) => (
  <mesh position={p}><sphereGeometry args={[r, 32, 32]} /><M m={m} /></mesh>
)

/** Turns its children slowly and leans toward the pointer. */
function Spin({ children, speed = 0.4, lean = 0.35, tilt = 0.35 }: { children: ReactNode; speed?: number; lean?: number; tilt?: number }) {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ clock }, dt) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    const ty = still ? 0.5 : t * speed + pointer.x * lean
    ref.current.rotation.y = speed ? ty : THREE.MathUtils.damp(ref.current.rotation.y, pointer.x * lean, 3, dt)
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, tilt + (still ? 0 : pointer.y * 0.15), 3, dt)
  })
  return <group ref={ref}>{children}</group>
}

// ---------- the objects ----------
function Agents({ big = false }: { big?: boolean }) {
  const s = big ? 1.25 : 1
  const n = useMemo(() => [new THREE.Vector3(0, 0.95, 0), new THREE.Vector3(-0.95, -0.7, 0.3), new THREE.Vector3(0.95, -0.7, -0.3), new THREE.Vector3(0.1, 0, 0.9)].map((v) => v.multiplyScalar(s)), [s])
  return (
    <Spin speed={0.35}>
      {[[0, 1], [0, 2], [1, 2], [0, 3], [1, 3], [2, 3]].map(([a, b]) => <Link key={`${a}${b}`} a={n[a]} b={n[b]} r={0.05 * s} />)}
      <Ball p={n[0].toArray()} r={0.34 * s} m="apricot" />
      <Ball p={n[1].toArray()} r={0.3 * s} m="cobalt" />
      <Ball p={n[2].toArray()} r={0.3 * s} m="cobalt" />
      <Ball p={n[3].toArray()} r={0.24 * s} m="porcelain" />
    </Spin>
  )
}

function Websites() {
  const refs = useRef<(THREE.Mesh | null)[]>([])
  useFrame(({ clock }) => {
    const g = still ? 0.45 : 0.42 + Math.sin(clock.getElapsedTime() * 1.4) * 0.14
    refs.current.forEach((m, i) => m && (m.position.y = (i - 1) * g))
  })
  return (
    <Spin speed={0.3} tilt={0.5}>
      {["porcelain", "porcelain", "cobalt"].map((m, i) => (
        <RoundedBox key={i} ref={(el) => { refs.current[i] = el }} args={[2, 0.14, 1.4]} radius={0.06} smoothness={4}><M m={m as MatName} /></RoundedBox>
      ))}
    </Spin>
  )
}

function Logo() {
  return (
    <Spin speed={0.45} tilt={0.3}>
      <mesh><icosahedronGeometry args={[1.05, 0]} /><meshPhysicalMaterial {...mats.glassBlue} flatShading /></mesh>
      <Ball p={[0, 0, 0]} r={0.38} m="apricot" />
    </Spin>
  )
}

function Automation() {
  const a = useRef<THREE.Mesh>(null), b = useRef<THREE.Mesh>(null), c = useRef<THREE.Mesh>(null)
  useFrame((_, dt) => {
    if (still) return
    if (a.current) a.current.rotation.x += dt * 0.8
    if (b.current) b.current.rotation.y += dt * 0.6
    if (c.current) c.current.rotation.z += dt * 0.7
  })
  return (
    <Spin speed={0.2}>
      <mesh ref={a}><torusGeometry args={[0.95, 0.11, 16, 64]} /><M m="chrome" /></mesh>
      <mesh ref={b} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.75, 0.11, 16, 64]} /><M m="cobalt" /></mesh>
      <mesh ref={c} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[0.55, 0.11, 16, 48]} /><M m="apricot" /></mesh>
    </Spin>
  )
}

function Chatbots() {
  const dots = useRef<(THREE.Mesh | null)[]>([])
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    dots.current.forEach((d, i) => d && (d.position.y = 0.05 + (still ? 0 : Math.max(0, Math.sin(t * 5 - i * 0.7)) * 0.16)))
  })
  return (
    <Spin speed={0} lean={0.6} tilt={0.15}>
      <RoundedBox args={[2.1, 1.25, 0.45]} radius={0.22} smoothness={4}><M m="porcelain" /></RoundedBox>
      <mesh position={[-0.6, -0.72, 0]} rotation={[0, 0, 0.5]}><coneGeometry args={[0.2, 0.4, 24]} /><M m="porcelain" /></mesh>
      {[-0.45, 0, 0.45].map((x, i) => (
        <mesh key={i} ref={(el) => { dots.current[i] = el }} position={[x, 0.05, 0.26]}><sphereGeometry args={[0.13, 32, 32]} /><M m={i === 1 ? "apricot" : "cobalt"} /></mesh>
      ))}
    </Spin>
  )
}

function Workflows() {
  const ball = useRef<THREE.Mesh>(null)
  const tops = [[-0.75, 0.0], [0, 0.45], [0.75, 0.9]]
  useFrame(({ clock }) => {
    if (!ball.current) return
    const t = still ? 0.5 : (clock.getElapsedTime() * 0.6) % 3
    const i = Math.min(2, Math.floor(t)), f = t - i
    const [x0, y0] = tops[i], [x1, y1] = tops[(i + 1) % 3]
    const back = i === 2
    ball.current.position.x = THREE.MathUtils.lerp(x0, back ? tops[0][0] : x1, f)
    ball.current.position.y = THREE.MathUtils.lerp(y0, back ? tops[0][1] : y1, f) + Math.sin(f * Math.PI) * (back ? 0.9 : 0.45) + 0.24
  })
  return (
    <Spin speed={0} lean={0.5} tilt={0.35}>
      <group position={[0, -0.55, 0]}>
        {[0.5, 0.95, 1.4].map((h, i) => (
          <RoundedBox key={i} args={[0.7, h, 0.9]} radius={0.06} position={[-0.75 + i * 0.75, h / 2 - 0.2, 0]}><M m={i === 2 ? "cobalt" : "porcelain"} /></RoundedBox>
        ))}
        <mesh ref={ball}><sphereGeometry args={[0.18, 32, 32]} /><M m="apricot" /></mesh>
      </group>
    </Spin>
  )
}

function Apps() {
  return (
    <Float speed={still ? 0 : 2} rotationIntensity={0.6} floatIntensity={0.4}>
      <Spin speed={0} lean={0.8} tilt={0.1}>
        <RoundedBox args={[1.05, 2.05, 0.12]} radius={0.12} smoothness={4}><M m="ink" /></RoundedBox>
        <mesh position={[0, 0, 0.065]}><planeGeometry args={[0.88, 1.8]} /><meshPhysicalMaterial color="#2e4bff" roughness={0.3} emissive="#2e4bff" emissiveIntensity={0.25} /></mesh>
        {[[-0.22, 0.5], [0.22, 0.5], [-0.22, 0.05], [0.22, 0.05]].map(([x, y], i) => (
          <RoundedBox key={i} args={[0.3, 0.3, 0.08]} radius={0.06} position={[x, y, 0.12]}><M m={i === 0 ? "apricot" : "porcelain"} /></RoundedBox>
        ))}
      </Spin>
    </Float>
  )
}

function Games() {
  const ref = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (!ref.current || still) return
    ref.current.rotation.x += dt * 0.55; ref.current.rotation.y += dt * 0.8
  })
  const pip = (p: [number, number, number], k: string) => <mesh key={k} position={p}><sphereGeometry args={[0.1, 24, 24]} /><M m="ink" /></mesh>
  const d = 0.66
  return (
    <group ref={ref} rotation={[0.5, 0.6, 0]}>
      <RoundedBox args={[1.3, 1.3, 1.3]} radius={0.2} smoothness={4}><M m="porcelain" /></RoundedBox>
      {pip([0, 0, d], "f1")}
      {[[-0.32, 0.32], [0.32, -0.32]].map(([a, b], i) => pip([a, d, b], `t${i}`))}
      {[[-0.32, -0.32], [0, 0], [0.32, 0.32]].map(([a, b], i) => pip([d, a, b], `r${i}`))}
      {[[-0.32, -0.32], [0.32, -0.32], [-0.32, 0.32], [0.32, 0.32]].map(([a, b], i) => pip([a, b, -d], `b${i}`))}
    </group>
  )
}

function Uiux() {
  const refs = useRef<(THREE.Mesh | null)[]>([])
  useFrame(({ clock }) => {
    const g = still ? 0.4 : 0.35 + Math.sin(clock.getElapsedTime() * 1.2) * 0.12
    refs.current.forEach((m, i) => m && (m.position.z = (i - 1) * g))
  })
  return (
    <Spin speed={0} lean={0.7} tilt={-0.25}>
      <group rotation={[0, -0.6, 0]}>
        {(["porcelain", "cobalt", "apricot"] as MatName[]).map((m, i) => (
          <RoundedBox key={i} ref={(el) => { refs.current[i] = el }} args={[1.9 - i * 0.35, 1.3 - i * 0.25, 0.06]} radius={0.05} position={[i * 0.12, i * 0.08, 0]}><M m={m} /></RoundedBox>
        ))}
      </group>
    </Spin>
  )
}

function Cube() {
  return <Spin speed={0.5} tilt={0.5}><RoundedBox args={[1.2, 1.2, 1.2]} radius={0.18} smoothness={4}><M m="apricot" /></RoundedBox></Spin>
}

function Cluster() {
  const items: [number, number, number, number, MatName][] = [
    [0, 0, 0, 1.1, "glassBlue"], [1.3, 0.8, -0.6, 0.6, "porcelain"], [-1.2, 0.9, -0.3, 0.5, "apricot"],
    [1.1, -0.9, 0.4, 0.45, "glass"], [-1.0, -0.8, 0.5, 0.65, "porcelain"], [0.2, 1.5, -1, 0.35, "cobalt"],
  ]
  return (
    <Spin speed={0.12} tilt={0.2}>
      {items.map(([x, y, z, s, m], i) => (
        <Float key={i} speed={still ? 0 : 1.5 + i * 0.2} rotationIntensity={1.2} floatIntensity={0.8}>
          <RoundedBox args={[s, s, s]} radius={s * 0.16} smoothness={5} position={[x, y, z]} rotation={[i, i * 0.7, 0]}><M m={m} /></RoundedBox>
        </Float>
      ))}
    </Spin>
  )
}

function Knot() {
  return <Spin speed={0.25} tilt={0.3}><mesh><torusKnotGeometry args={[0.95, 0.3, 140, 20]} /><M m="cobalt" /></mesh></Spin>
}

const scenes: Record<Kind, () => ReactNode> = {
  agents: () => <Agents />, websites: () => <Websites />, logo: () => <Logo />, automation: () => <Automation />,
  chatbots: () => <Chatbots />, workflows: () => <Workflows />, apps: () => <Apps />, games: () => <Games />, uiux: () => <Uiux />,
  cube: () => <Cube />, network: () => <Agents big />, cluster: () => <Cluster />, knot: () => <Knot />,
}

/** A real 3D object drawn into this element's box through the shared canvas. */
export default function Object3D({ kind, className, zoom = 5.2 }: { kind: Kind; className?: string; zoom?: number }) {
  return (
    <View className={className}>
      <PerspectiveCamera makeDefault position={[0, 0, zoom]} fov={32} />
      <Env />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} />
      <directionalLight position={[-4, -2, 2]} intensity={0.4} color="#c9d4ff" />
      {scenes[kind]()}
    </View>
  )
}

/** The one fixed, transparent canvas that every Object3D renders into. */
export function Port() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 30 }}
      eventSource={document.getElementById("root") ?? undefined}
    >
      <View.Port />
    </Canvas>
  )
}
