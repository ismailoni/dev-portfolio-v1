'use client'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Grid, Stars } from '@react-three/drei'
import { COL, RING_RADIUS } from '@/lib/world'
import { GLOW } from './primitives'
import { useWorld } from './context'

// Deterministic pseudo-random so the layout is stable between renders
function rng(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

const FLOOR_Y = -15

function Debris({ count }) {
  const group = useRef()
  const items = useMemo(() => {
    const r = rng(42)
    const geos = [new THREE.IcosahedronGeometry(1, 0), new THREE.OctahedronGeometry(1, 0), new THREE.TetrahedronGeometry(1, 0)]
    return Array.from({ length: count }, (_, i) => {
      // keep clear of the ring where the camera travels (radius ~ 38..64)
      const inner = r() < 0.25
      const radius = inner ? 6 + r() * 26 : 72 + r() * 70
      const a = r() * Math.PI * 2
      return {
        geo: geos[i % geos.length],
        pos: [Math.sin(a) * radius, -6 + r() * 38, Math.cos(a) * radius],
        scale: 0.8 + r() * 2.8,
        spin: [(r() - 0.5) * 0.4, (r() - 0.5) * 0.4],
        color: i % 3 === 0 ? COL.accent : i % 3 === 1 ? COL.blue : COL.purple,
      }
    })
  }, [count])

  useFrame((_, dt) => {
    group.current?.children.forEach((m, i) => {
      m.rotation.x += items[i].spin[0] * dt
      m.rotation.y += items[i].spin[1] * dt
    })
  })

  return (
    <group ref={group}>
      {items.map((it, i) => (
        <mesh key={i} geometry={it.geo} position={it.pos} scale={it.scale}>
          <meshBasicMaterial wireframe color={it.color} transparent opacity={0.16} toneMapped={false} />
        </mesh>
      ))}
    </group>
  )
}

export default function Backdrop() {
  const { low } = useWorld()
  return (
    <>
      <Stars radius={170} depth={70} count={low ? 1800 : 4200} factor={6} saturation={0} fade speed={0.5} />
      <Debris count={low ? 18 : 40} />

      {/* Floor: a faint grid and a glowing ring under the camera's orbit */}
      <Grid
        position={[0, FLOOR_Y, 0]}
        args={[10, 10]}
        cellSize={2}
        cellThickness={0.5}
        cellColor="#111a30"
        sectionSize={10}
        sectionThickness={0.8}
        sectionColor="#0c4a2e"
        fadeDistance={85}
        fadeStrength={2}
        infiniteGrid
      />
      <mesh rotation-x={-Math.PI / 2} position-y={FLOOR_Y + 0.02}>
        <ringGeometry args={[RING_RADIUS - 0.12, RING_RADIUS + 0.12, 256]} />
        <meshBasicMaterial color={GLOW} transparent opacity={0.55} toneMapped={false} />
      </mesh>
    </>
  )
}
