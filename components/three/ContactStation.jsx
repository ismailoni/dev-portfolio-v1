'use client'
import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { COL } from '@/lib/world'
import { DashedRing, GLOW, GLOW_BLUE, Glow } from './primitives'
import { useNarrow, useWorld } from './context'
import Station from './Station'

// A pulsing signal beacon. The form itself is real DOM (see app/contact/page.jsx) —
// keyboards, autofill and screen readers all work far better with native inputs.
function Beacon({ r = 2.1, ...props }) {
  const { low } = useWorld()
  const cage = useRef()
  const inner = useRef()
  const r1 = useRef()
  const r2 = useRef()
  const pulse = useRef()
  const group = useRef()

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    cage.current.rotation.y += dt * 0.25
    cage.current.rotation.x += dt * 0.1
    inner.current.rotation.y -= dt * 0.5
    inner.current.scale.setScalar(1 + Math.sin(t * 2) * 0.06)
    r1.current.rotation.x += dt * 0.6
    r2.current.rotation.y += dt * 0.5
    // expanding "signal" ring
    const k = (t * 0.45) % 1
    pulse.current.scale.setScalar(1 + k * 1.6)
    pulse.current.material.opacity = (1 - k) * 0.5
    group.current.position.y = Math.sin(t * 0.8) * 0.15
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, state.pointer.x * 0.4, 4, dt)
  })

  return (
    <group {...props}>
      <Glow color={COL.accent} scale={r * 7} opacity={0.6} position-z={-1} />
      <group ref={group}>
        <mesh ref={cage}>
          <icosahedronGeometry args={[r, 1]} />
          <meshBasicMaterial wireframe color={GLOW} transparent opacity={0.8} toneMapped={false} />
        </mesh>
        <mesh ref={inner}>
          <icosahedronGeometry args={[r * 0.5, 0]} />
          <meshBasicMaterial color={new THREE.Color(COL.accent).multiplyScalar(1.6)} toneMapped={false} />
        </mesh>
        <group ref={r1} rotation={[0.9, 0, 0.3]}>
          <mesh>
            <torusGeometry args={[r * 1.35, 0.02, 10, 200]} />
            <meshBasicMaterial color={GLOW_BLUE} toneMapped={false} />
          </mesh>
        </group>
        <group ref={r2} rotation={[0.2, 0, 1.2]}>
          <mesh>
            <torusGeometry args={[r * 1.55, 0.014, 10, 200]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.3} toneMapped={false} />
          </mesh>
        </group>
        <mesh ref={pulse} rotation-x={0}>
          <ringGeometry args={[r * 1.0, r * 1.03, 128]} />
          <meshBasicMaterial color={GLOW} transparent opacity={0.4} toneMapped={false} depthWrite={false} side={THREE.DoubleSide} />
        </mesh>
        <DashedRing radius={r * 1.75} width={0.05} count={30} fill={0.4} opacity={0.5} />
        <Sparkles count={low ? 20 : 40} scale={[r * 4, r * 4, r * 3]} size={3} speed={0.4} color={COL.accent} />
      </group>
    </group>
  )
}

function ContactContent() {
  const narrow = useNarrow()
  return narrow ? <Beacon r={1.5} position={[0, 4.6, 0]} /> : <Beacon r={1.75} position={[-5.6, 1.9, 0]} />
}

export default function ContactStation() {
  return (
    <Station index={4}>
      <ContactContent />
    </Station>
  )
}
