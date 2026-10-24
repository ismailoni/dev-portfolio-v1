'use client'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { FaGithub, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { COL } from '@/lib/world'
import { hero, socials, stats } from '@/lib/data'
import { Btn, DashedRing, GLOW, Glow, Panel, Txt, useImage } from './primitives'
import { useNarrow, useStation, useWorld } from './context'
import Station from './Station'

// ---------------------------------------------------------------------------
// Portrait "coin" wrapped in a gyroscope of glowing rings. Tilts toward the pointer.
// ---------------------------------------------------------------------------
function Portrait({ r = 2.8, ...props }) {
  const tex = useImage('/3d/hero.webp')
  const group = useRef()
  const ringA = useRef()
  const ringB = useRef()
  const ringC = useRef()
  const orbA = useRef()
  const orbB = useRef()
  const dash = useRef()

  useMemo(() => {
    const ia = tex.image.width / tex.image.height
    tex.repeat.set(1 / ia, 1)
    tex.offset.set((1 - 1 / ia) / 2, 0)
  }, [tex])

  useFrame((state, dt) => {
    const { pointer } = state
    const g = group.current
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.x * 0.35, 4, dt)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -pointer.y * 0.25, 4, dt)
    g.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.12
    ringA.current.rotation.z += dt * 0.35
    ringB.current.rotation.z -= dt * 0.28
    orbA.current.rotation.z += dt * 0.9
    orbB.current.rotation.z -= dt * 0.7
    ringC.current.rotation.z -= dt * 0.3
    dash.current.rotation.z -= dt * 0.25
  })

  return (
    <group {...props}>
      <Glow color={COL.accent} scale={r * 5.5} opacity={0.55} position-z={-0.8} />
      <group ref={group}>
        <mesh renderOrder={2}>
          <circleGeometry args={[r, 96]} />
          <meshBasicMaterial map={tex} color="#e2e2e2" toneMapped={false} />
        </mesh>
        {/* hairline rim */}
        <mesh position-z={0.01}>
          <ringGeometry args={[r, r + 0.05, 128]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.35} toneMapped={false} />
        </mesh>
        <group ref={dash}>
          <DashedRing radius={r * 1.1} width={0.07} count={16} fill={0.55} />
        </group>

        {/* orbit rings: fixed tilt that precesses, so they sweep around the portrait but never cut across the face */}
        <group ref={ringA}>
          <group rotation-x={0.5}>
            <mesh>
              <torusGeometry args={[r * 1.22, 0.022, 12, 200]} />
              <meshBasicMaterial color={GLOW} toneMapped={false} />
            </mesh>
            <group ref={orbA}>
              <mesh position={[r * 1.22, 0, 0]}>
                <sphereGeometry args={[0.11, 20, 20]} />
                <meshBasicMaterial color={GLOW} toneMapped={false} />
              </mesh>
            </group>
          </group>
        </group>
        <group ref={ringB}>
          <group rotation-x={-0.62}>
            <mesh>
              <torusGeometry args={[r * 1.38, 0.016, 12, 200]} />
              <meshBasicMaterial color={new THREE.Color(COL.blue).multiplyScalar(2.5)} toneMapped={false} />
            </mesh>
            <group ref={orbB}>
              <mesh position={[-r * 1.38, 0, 0]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshBasicMaterial color={new THREE.Color(COL.blue).multiplyScalar(3)} toneMapped={false} />
              </mesh>
            </group>
          </group>
        </group>
        <group ref={ringC} rotation={[0, 0, 0]}>
          <mesh>
            <torusGeometry args={[r * 1.5, 0.01, 8, 200]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.25} toneMapped={false} />
          </mesh>
        </group>
      </group>
    </group>
  )
}

// ---------------------------------------------------------------------------
// Stat card with a count-up that (re)starts whenever the camera arrives here.
// ---------------------------------------------------------------------------
function Stat({ stat, w, h, numSize, labelSize, labelX, ...props }) {
  const { active } = useStation()
  const { reduced } = useWorld()
  const num = useRef()
  const st = useRef({ t: 0, shown: -1 })
  const suffix = stat.plus ? '+' : ''

  useFrame((_, dt) => {
    const s = st.current
    const node = num.current
    if (!node) return
    if (!active) {
      if (s.shown !== 0) {
        node.text = `0${suffix}`
        node.sync()
        s.shown = 0
      }
      s.t = reduced ? 3 : -0.9 // small delay so the count starts as the camera lands
      return
    }
    if (s.t >= 2.6 && s.shown === stat.num) return
    s.t += dt
    const p = Math.min(Math.max(s.t, 0) / 2.6, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    const v = Math.round(eased * stat.num)
    if (v !== s.shown) {
      node.text = `${v}${suffix}`
      node.sync()
      s.shown = v
    }
  })

  return (
    <group {...props}>
      <Panel w={w} h={h} r={0.28} fillOpacity={0.8} />
      <Txt ref={num} size={numSize} bold color={GLOW} anchorX="left" anchorY="middle" position={[-w / 2 + 0.35, 0, 0.03]}>
        {`0${suffix}`}
      </Txt>
      <Txt
        size={labelSize}
        color={COL.text}
        opacity={0.75}
        anchorX="left"
        anchorY="middle"
        maxWidth={w / 2 - 0.5}
        lineHeight={1.25}
        position={[labelX, 0, 0.03]}
      >
        {stat.text}
      </Txt>
    </group>
  )
}

function openUrl(url) {
  window.open(url, '_blank', 'noopener,noreferrer')
}

const socialIcons = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
  x: FaXTwitter,
}

function SocialIcon({ name }) {
  const { active } = useStation()
  const Icon = socialIcons[name]
  if (!active || !Icon) return null

  return (
    <Html center style={{ pointerEvents: 'none' }}>
      <Icon aria-hidden size={24} />
    </Html>
  )
}

function downloadResume() {
  const a = document.createElement('a')
  a.href = hero.resumeFile
  a.download = 'IsmailOniResume.pdf'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

// ---------------------------------------------------------------------------
function HomeContent() {
  const narrow = useNarrow()
  const { active } = useStation()
  const { go } = useWorld()

  if (!narrow) {
    const x0 = -8.6
    return (
      <group>
        {/* pill */}
        <group position={[x0 + 2.85, 3.95, 0]}>
          <Panel w={5.7} h={0.62} r={0.31} fillOpacity={0.5} borderColor={COL.accent} borderOpacity={0.35} />
          <Txt size={0.17} anchorX="center" anchorY="middle" color={COL.accent} letterSpacing={0.08} position-z={0.02}>
            {hero.pill.toUpperCase()}
          </Txt>
        </group>

        <Txt size={0.82} bold position={[x0, 3.4, 0]}>{hero.line1}</Txt>
        <Txt size={0.82} bold color={GLOW} position={[x0, 2.35, 0]}>{hero.line2}</Txt>
        <Txt size={0.26} opacity={0.75} maxWidth={9} lineHeight={1.55} position={[x0, 0.95, 0]}>{hero.blurb}</Txt>

        <Btn primary w={3.5} h={0.85} size={0.22} label="Download Resume" position={[x0 + 1.75, -1.25, 0]} disabled={!active} onClick={downloadResume} />
        <Btn w={3.9} h={0.85} size={0.22} label="Let’s Work Together" position={[x0 + 5.75, -1.25, 0]} disabled={!active} onClick={() => go('/contact')} />
        {socials.map((s, i) => (
          <Btn key={s.icon} w={0.72} h={0.72} size={0.2} position={[x0 + 8.4 + i * 0.88, -1.25, 0]} disabled={!active} onClick={() => openUrl(s.url)}>
            <SocialIcon name={s.icon} />
          </Btn>
        ))}

        <Txt size={0.19} color={COL.muted} position={[x0, -2.2, 0]}>
          {`${hero.focus}   |   ${hero.location}`}
        </Txt>

        {stats.map((s, i) => (
          <Stat key={s.text} stat={s} w={4.3} h={1.4} numSize={0.8} labelSize={0.185} labelX={0.2} position={[-6.75 + i * 4.5, -4.35, 0]} />
        ))}

        <Portrait r={2.75} position={[6.2, 0.9, 0]} />
      </group>
    )
  }

  // portrait / phone layout (everything centred in a ~7.6 unit wide column)
  return (
    <group>
      <Portrait r={1.45} position={[0, 4.45, 0]} />

      <group position={[0, 2.4, 0]}>
        <Panel w={5.4} h={0.5} r={0.25} fillOpacity={0.5} borderColor={COL.accent} borderOpacity={0.35} />
        <Txt size={0.13} anchorX="center" anchorY="middle" color={COL.accent} letterSpacing={0.06} position-z={0.02}>
          {hero.pill.toUpperCase()}
        </Txt>
      </group>

      <Txt size={0.5} bold anchorX="center" position={[0, 1.8, 0]}>{hero.line1}</Txt>
      <Txt size={0.5} bold anchorX="center" color={GLOW} position={[0, 1.15, 0]}>{hero.line2}</Txt>
      <Txt size={0.2} opacity={0.75} anchorX="center" textAlign="center" maxWidth={6.9} lineHeight={1.5} position={[0, 0.3, 0]}>{hero.blurb}</Txt>

      <Btn primary w={3.3} h={0.8} size={0.19} label="Download Resume" position={[-1.75, -1.55, 0]} disabled={!active} onClick={downloadResume} />
      <Btn w={3.3} h={0.8} size={0.19} label="Let’s Work Together" position={[1.75, -1.55, 0]} disabled={!active} onClick={() => go('/contact')} />
      {socials.map((s, i) => (
        <Btn key={s.icon} w={0.72} h={0.72} size={0.2} position={[-1.32 + i * 0.88, -2.8, 0]} disabled={!active} onClick={() => openUrl(s.url)}>
          <SocialIcon name={s.icon} />
        </Btn>
      ))}

      <Txt size={0.16} color={COL.muted} anchorX="center" textAlign="center" maxWidth={6.9} lineHeight={1.5} position={[0, -3.55, 0]}>
        {`${hero.focus}\n${hero.location}`}
      </Txt>

      {stats.map((s, i) => (
        <Stat key={s.text} stat={s} w={3.4} h={1.15} numSize={0.55} labelSize={0.17} labelX={0.05} position={[i % 2 ? 1.85 : -1.85, -5.2 - Math.floor(i / 2) * 1.35, 0]} />
      ))}
    </group>
  )
}

export default function HomeStation() {
  return (
    <Station index={0}>
      <HomeContent />
    </Station>
  )
}
