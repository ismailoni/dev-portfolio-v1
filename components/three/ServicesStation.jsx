'use client'
import { useState } from 'react'
import { COL } from '@/lib/world'
import { services } from '@/lib/data'
import { Btn, GLOW, Txt } from './primitives'
import { useWorld } from './context'
import CoverFlow from './CoverFlow'
import Station from './Station'

const W = 6.6
const H = 8.2
const L = -W / 2 + 0.55 // left text edge
const TW = W - 1.1 // text width

function ServiceCard({ s, isActive }) {
  const { go } = useWorld()
  return (
    <group>
      {/* big outlined number */}
      <Txt
        size={1.1}
        bold
        opacity={0}
        strokeWidth={0.014}
        strokeColor={isActive ? COL.accent : '#ffffff'}
        strokeOpacity={isActive ? 1 : 0.55}
        position={[L, H / 2 - 0.45, 0.03]}
      >
        {s.num}
      </Txt>

      <Btn w={0.95} h={0.95} size={0.4} label=">" position={[W / 2 - 0.85, H / 2 - 1.0, 0.02]} disabled={!isActive} onClick={() => go(s.href)} />

      <Txt size={0.46} bold lineHeight={1.15} maxWidth={TW} position={[L, H / 2 - 2.0, 0.03]}>
        {s.title}
      </Txt>

      <Txt size={0.24} opacity={0.72} lineHeight={1.5} maxWidth={TW} position={[L, 0.7, 0.03]}>
        {s.description}
      </Txt>

      {s.highlights.map((h, i) => (
        <group key={h} position={[0, -1.85 - i * 0.78, 0.03]}>
          <mesh position={[L + 0.08, -0.14, 0]}>
            <circleGeometry args={[0.075, 16]} />
            <meshBasicMaterial color={GLOW} toneMapped={false} />
          </mesh>
          <Txt size={0.22} opacity={0.62} maxWidth={TW - 0.45} position={[L + 0.42, 0, 0]}>
            {h}
          </Txt>
        </group>
      ))}
    </group>
  )
}

export default function ServicesStation() {
  const [index, setIndex] = useState(0)
  return (
    <Station index={1}>
      <CoverFlow items={services} index={index} onIndex={setIndex} cardW={W} cardH={H}>
        {(s, i, isActive) => <ServiceCard s={s} isActive={isActive} />}
      </CoverFlow>
    </Station>
  )
}
