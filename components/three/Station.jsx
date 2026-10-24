'use client'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { COL, HUES, NAMES, STATIONS } from '@/lib/world'
import { DashedRing, GLOW, Glow, Txt } from './primitives'
import { StationContext, useNarrow, useWorld } from './context'

// A floating platform + atmosphere that every route's content sits on.
export default function Station({ index, children }) {
  const { index: current, low, reduced } = useWorld()
  const narrow = useNarrow()
  const st = STATIONS[index]
  const active = current === index
  const hue = HUES[index]
  const spin = useRef()
  // Keep content mounted-but-hidden once the camera has left (saves draw calls, and stops
  // neighbouring stations' cards peeking into the shot). Stays visible while the camera flies away.
  const [show, setShow] = useState(active)
  useEffect(() => {
    if (active) return setShow(true)
    const t = setTimeout(() => setShow(false), reduced ? 0 : 2400)
    return () => clearTimeout(t)
  }, [active, reduced])
  const spin2 = useRef()

  useFrame((_, dt) => {
    if (spin.current) spin.current.rotation.z += dt * 0.12
    if (spin2.current) spin2.current.rotation.z -= dt * 0.07
  })

  return (
    <StationContext.Provider value={{ active, index }}>
      <group position={st.position} rotation-y={st.angle}>
        {/* platform */}
        <group position-y={-5.7}>
          <group rotation-x={-Math.PI / 2}>
            <mesh>
              <ringGeometry args={[5.15, 5.27, 128]} />
              <meshBasicMaterial color={GLOW} toneMapped={false} />
            </mesh>
            <mesh position-z={-0.02}>
              <circleGeometry args={[5.15, 64]} />
              <meshBasicMaterial color={hue} transparent opacity={0.07} depthWrite={false} />
            </mesh>
            <group ref={spin}>
              <DashedRing radius={6.6} width={0.06} count={28} fill={0.45} color={hue} opacity={0.55} />
            </group>
            <group ref={spin2}>
              <DashedRing radius={8.2} width={0.04} count={44} fill={0.3} color={hue} opacity={0.3} />
            </group>
          </group>
        </group>

        {/* backlight + drifting particles */}
        <Glow color={hue} position={[0, 0.5, -15]} scale={52} opacity={0.3} />
        <Sparkles count={low ? 24 : 48} scale={[19, 11, 8]} size={3} speed={0.3} opacity={0.75} color={hue} position-z={1} />

        <group visible={show}>
        {/* oversized ghost word behind the content */}
        <Txt
          size={narrow ? 1.5 : 3.4}
          bold
          anchorX="center"
          anchorY="middle"
          renderOrder={0}
          color={hue}
          opacity={0.07}
          position={[0, narrow ? 7 : 0.3, -7]}
          letterSpacing={0.08}
        >
          {NAMES[index].toUpperCase()}
        </Txt>

          {children}
        </group>
      </group>
    </StationContext.Provider>
  )
}
