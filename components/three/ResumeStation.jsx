'use client'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { COL } from '@/lib/world'
import { about, education, experience, skills } from '@/lib/data'
import { GLOW, Txt } from './primitives'
import { useStation, useWorld } from './context'
import CoverFlow from './CoverFlow'
import Station from './Station'

const W = 6.6
const H = 8.6
const L = -W / 2 + 0.55
const TW = W - 1.1

const CARDS = [
  { kind: 'about', data: about },
  { kind: 'timeline', data: education, key: 'degree', sub: 'institution' },
  { kind: 'timeline', data: experience, key: 'position', sub: 'company' },
  { kind: 'skills', data: skills },
]

function Header({ title, description, descLines = 3 }) {
  return (
    <>
      <Txt size={0.5} bold maxWidth={TW} position={[L, H / 2 - 0.5, 0.03]}>
        {title}
      </Txt>
      <mesh position={[L + 0.55, H / 2 - 1.25, 0.03]}>
        <planeGeometry args={[1.1, 0.045]} />
        <meshBasicMaterial color={GLOW} toneMapped={false} />
      </mesh>
      <Txt size={0.2} opacity={0.7} lineHeight={1.5} maxWidth={TW} position={[L, H / 2 - 1.55, 0.03]}>
        {description}
      </Txt>
    </>
  )
}

// One entry. The sub-line is positioned from the title's *measured* height, so it always
// sits right under the title whether that wrapped onto one line or two.
function TimelineItem({ it, k, sub, y }) {
  const [h, setH] = useState(0.34)
  return (
    <group position={[0, y, 0.03]}>
      <mesh position={[L, -0.1, 0]}>
        <circleGeometry args={[0.07, 16]} />
        <meshBasicMaterial color={GLOW} toneMapped={false} />
      </mesh>
      <Txt size={0.2} color={COL.accent} position={[L + 0.32, 0, 0]}>
        {it.duration}
      </Txt>
      <Txt
        size={0.28}
        bold
        lineHeight={1.2}
        maxWidth={TW - 0.35}
        position={[L + 0.32, -0.4, 0]}
        onSync={(t) => {
          const b = t.textRenderInfo?.blockBounds
          if (b) setH((prev) => (Math.abs(prev - (b[3] - b[1])) > 0.01 ? b[3] - b[1] : prev))
        }}
      >
        {it[k]}
      </Txt>
      <Txt size={0.21} opacity={0.62} position={[L + 0.32, -0.4 - h - 0.14, 0]}>
        {it[sub]}
      </Txt>
    </group>
  )
}

function Timeline({ data, k, sub }) {
  return (
    <group>
      <Header title={data.title} description={data.description} />
      {data.items.map((it, i) => (
        <TimelineItem key={i} it={it} k={k} sub={sub} y={0.95 - i * 1.65} />
      ))}
    </group>
  )
}

// ---------------------------------------------------------------------------
// Rotating tag sphere
// ---------------------------------------------------------------------------
function SkillSphere({ radius = 2.2, ...props }) {
  const { active } = useStation()
  const { reduced } = useWorld()
  const items = skills.list
  const labels = useRef([])
  const core = useRef()
  const tmp = useMemo(() => new THREE.Vector3(), [])
  const base = useMemo(
    () =>
      items.map((_, i) => {
        // Fibonacci sphere → evenly spread points
        const y = 1 - (i / (items.length - 1)) * 2
        const rr = Math.sqrt(1 - y * y)
        const th = i * Math.PI * (3 - Math.sqrt(5))
        return new THREE.Vector3(Math.cos(th) * rr, y, Math.sin(th) * rr).multiplyScalar(radius)
      }),
    [items, radius]
  )
  const t = useRef(0)

  useFrame((state, dt) => {
    if (!reduced && active) t.current += dt * 0.35
    const cos = Math.cos(t.current)
    const sin = Math.sin(t.current)
    const tilt = 0.35
    items.forEach((_, i) => {
      const n = labels.current[i]
      if (!n) return
      const b = base[i]
      // rotate around Y, then tip the whole sphere toward the viewer
      const x = b.x * cos + b.z * sin
      const z0 = -b.x * sin + b.z * cos
      const y = b.y * Math.cos(tilt) - z0 * Math.sin(tilt)
      const z = b.y * Math.sin(tilt) + z0 * Math.cos(tilt)
      n.position.set(x, y, z)
      const depth = (z / radius + 1) / 2 // 0 back … 1 front
      n.scale.setScalar(0.7 + depth * 0.5)
      n.fillOpacity = 0.25 + depth * 0.75
    })
    if (core.current) {
      core.current.rotation.y += dt * 0.3
      core.current.rotation.x += dt * 0.15
    }
  })

  return (
    <group {...props}>
      <group ref={core}>
        <mesh>
          <icosahedronGeometry args={[radius * 0.98, 2]} />
          <meshBasicMaterial wireframe color={COL.accent} transparent opacity={0.13} toneMapped={false} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[radius * 0.42, 1]} />
          <meshBasicMaterial wireframe color={GLOW} toneMapped={false} />
        </mesh>
      </group>
      {items.map((s, i) => (
        <Txt
          key={s.short}
          ref={(el) => {
            labels.current[i] = el
          }}
          size={0.3}
          bold
          anchorX="center"
          anchorY="middle"
          color={i % 3 === 0 ? COL.accent : COL.text}
          renderOrder={4}
        >
          {s.short}
        </Txt>
      ))}
    </group>
  )
}

function Skills() {
  return (
    <group>
      <Header title={skills.title} description={skills.description} />
      <SkillSphere radius={2.0} position={[0, -1.05, 0.6]} />
    </group>
  )
}

function About() {
  return (
    <group>
      <Txt size={0.5} bold maxWidth={TW} position={[L, H / 2 - 0.5, 0.03]}>
        {about.title}
      </Txt>
      <mesh position={[L + 0.55, H / 2 - 1.25, 0.03]}>
        <planeGeometry args={[1.1, 0.045]} />
        <meshBasicMaterial color={GLOW} toneMapped={false} />
      </mesh>
      <Txt size={0.185} opacity={0.7} lineHeight={1.55} maxWidth={TW} position={[L, H / 2 - 1.55, 0.03]}>
        {about.description}
      </Txt>
      {about.info.map((it, i) => (
        <group key={it.fieldName} position={[0, 0.5 - i * 0.7, 0.03]}>
          <Txt size={0.16} color={COL.muted} letterSpacing={0.08} position={[L, 0, 0]}>
            {it.fieldName.toUpperCase()}
          </Txt>
          <Txt size={0.24} maxWidth={TW} position={[L, -0.26, 0]}>
            {it.fieldValue}
          </Txt>
        </group>
      ))}
    </group>
  )
}

export default function ResumeStation() {
  const [index, setIndex] = useState(0)
  return (
    <Station index={2}>
      <CoverFlow items={CARDS} index={index} onIndex={setIndex} cardW={W} cardH={H}>
        {(c) =>
          c.kind === 'timeline' ? <Timeline data={c.data} k={c.key} sub={c.sub} /> : c.kind === 'skills' ? <Skills /> : <About />
        }
      </CoverFlow>
    </Station>
  )
}
