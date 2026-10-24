'use client'
import { Suspense, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { COL } from '@/lib/world'
import { projects } from '@/lib/data'
import { ui } from '@/lib/store'
import { Btn, CoverImage, Txt, drag } from './primitives'
import CoverFlow from './CoverFlow'
import Station from './Station'

const W = 6.6
const H = 9.2
const L = -W / 2 + 0.4
const TW = W - 0.8

function ProjectCard({ p, i, isActive }) {
  const shot = useRef()
  // Gentle breathing on the active screenshot so the card feels alive
  useFrame((s) => {
    if (!shot.current) return
    const k = isActive ? 1 + Math.sin(s.clock.elapsedTime * 0.9) * 0.008 : 1
    shot.current.scale.setScalar(k)
  })

  const open = () => ui.set({ project: i })

  return (
    <group>
      <group
        ref={shot}
        position={[0, H / 2 - 2.05, 0.03]}
        onPointerOver={(e) => isActive && (e.stopPropagation(), (document.body.style.cursor = 'pointer'))}
        onPointerOut={() => (document.body.style.cursor = '')}
        onClick={(e) => {
          if (!isActive || drag.moved) return
          e.stopPropagation()
          open()
        }}
      >
        <Suspense fallback={null}>
          <CoverImage src={p.cover} w={W - 0.8} h={3.3} r={0.2} />
        </Suspense>
      </group>

      <Txt size={0.19} color={COL.accent} letterSpacing={0.06} position={[L, 0.62, 0.03]}>
        {`${p.num}  /  ${p.category.toUpperCase()}`}
      </Txt>

      <Txt size={0.4} bold lineHeight={1.15} maxWidth={TW} position={[L, 0.18, 0.03]}>
        {p.title}
      </Txt>

      <Txt size={0.2} opacity={0.72} lineHeight={1.5} maxWidth={TW} position={[L, -0.98, 0.03]}>
        {p.description}
      </Txt>

      <Txt size={0.17} color={COL.accent} opacity={0.85} lineHeight={1.5} maxWidth={TW} position={[L, -2.5, 0.03]}>
        {p.stack.join('  ·  ')}
      </Txt>

      <group position={[0, -H / 2 + 0.78, 0.03]}>
        <Btn primary w={1.8} h={0.66} size={0.19} label="Live" position-x={-1.95} disabled={!isActive} onClick={() => window.open(p.live, '_blank', 'noopener,noreferrer')} />
        {p.github ? (
          <Btn w={1.8} h={0.66} size={0.19} label="GitHub" disabled={!isActive} onClick={() => window.open(p.github, '_blank', 'noopener,noreferrer')} />
        ) : (
          <Btn w={1.8} h={0.66} size={0.19} label="Private" faded disabled />
        )}
        <Btn w={1.8} h={0.66} size={0.19} label="Details" position-x={1.95} disabled={!isActive} onClick={open} />
      </group>
    </group>
  )
}

export default function WorkStation() {
  const [index, setIndex] = useState(0)
  return (
    <Station index={3}>
      <CoverFlow items={projects} index={index} onIndex={setIndex} cardW={W} cardH={H}>
        {(p, i, isActive) => <ProjectCard p={p} i={i} isActive={isActive} />}
      </CoverFlow>
    </Station>
  )
}
