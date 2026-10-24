'use client'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { COL } from '@/lib/world'
import { ui } from '@/lib/store'
import { Btn, Panel, Txt, drag, fillGeometry } from './primitives'
import { useNarrow, useStation, useWorld } from './context'

const pad = (n) => String(n).padStart(2, '0')
const noRaycast = () => null

/**
 * A row of 3D cards: the active one faces the camera, neighbours recede and turn inward.
 * `children(item, i, isActive)` renders a card's contents, centred on the card origin.
 */
export default function CoverFlow({ items, index, onIndex, cardW = 6.6, cardH = 8.2, children }) {
  const { active } = useStation()
  const { reduced } = useWorld()
  const narrow = useNarrow()
  const gl = useThree((s) => s.gl)
  const n = items.length

  const groups = useRef([])
  const dims = useRef([])
  const borders = useRef([])
  const cur = useRef(null)
  const idx = useRef(index)
  idx.current = index

  const spacing = cardW + (narrow ? 0.5 : 0.9)
  const dimGeo = useMemo(() => fillGeometry(cardW, cardH, 0.38), [cardW, cardH])

  const go = (d) => onIndex(THREE.MathUtils.clamp(idx.current + d, 0, n - 1))

  // --- animation ---------------------------------------------------------
  useFrame((_, dt) => {
    const lam = reduced ? 60 : 5.5
    const first = !cur.current
    if (first) cur.current = items.map(() => ({ x: 0, ry: 0, z: 0, s: 1, dim: 0, b: 0 }))

    for (let i = 0; i < n; i++) {
      const g = groups.current[i]
      if (!g) continue
      const off = i - idx.current
      const a = Math.abs(off)
      const t = {
        x: off * spacing,
        ry: THREE.MathUtils.clamp(-off * 0.42, -0.85, 0.85),
        z: -Math.min(a, 3) * 2.4,
        s: 1 - Math.min(a, 2) * 0.1,
        dim: Math.min(a, 1) * 0.58 + Math.max(a - 1, 0) * 0.2,
        b: a < 0.5 ? 1 : 0,
      }
      const c = cur.current[i]
      if (first) Object.assign(c, t)
      else for (const k in t) c[k] = THREE.MathUtils.damp(c[k], t[k], lam, dt)

      g.position.set(c.x, 0, c.z)
      g.rotation.y = c.ry
      g.scale.setScalar(c.s)
      g.visible = a < 2.6
      if (dims.current[i]) dims.current[i].opacity = c.dim
      if (borders.current[i]) borders.current[i].opacity = 0.12 + c.b * 0.3
    }
  })

  // --- keyboard ----------------------------------------------------------
  useEffect(() => {
    if (!active) return
    const onKey = (e) => {
      if (ui.get().project !== null) return
      const tag = e.target?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, n])

  // --- swipe / drag + wheel ---------------------------------------------
  useEffect(() => {
    if (!active) return
    const el = gl.domElement
    let x0 = null
    let moved = false
    let lastWheel = 0

    const down = (e) => {
      if (e.button !== undefined && e.button !== 0) return
      x0 = e.clientX
      moved = false
    }
    const move = (e) => {
      if (x0 === null) return
      if (Math.abs(e.clientX - x0) > 12) {
        moved = true
        drag.moved = true
      }
    }
    const up = (e) => {
      if (x0 === null) return
      const dx = e.clientX - x0
      x0 = null
      if (moved && Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
      setTimeout(() => (drag.moved = false), 60)
    }
    const wheel = (e) => {
      if (ui.get().project !== null) return
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      const now = performance.now()
      if (Math.abs(d) < 24 || now - lastWheel < 420) return
      lastWheel = now
      go(d > 0 ? 1 : -1)
    }

    el.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
    el.addEventListener('wheel', wheel, { passive: true })
    return () => {
      el.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
      el.removeEventListener('wheel', wheel)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, gl, n])

  return (
    <group>
      {items.map((item, i) => (
        <group
          key={i}
          ref={(el) => {
            groups.current[i] = el
          }}
          onClick={(e) => {
            if (drag.moved || i === index) return
            e.stopPropagation()
            onIndex(i)
          }}
        >
          <Panel w={cardW} h={cardH} r={0.38} fillOpacity={0.88} borderColor={COL.accent} borderOpacity={0.12} borderRef={(m) => {
              borders.current[i] = m
            }} />
          {children(item, i, i === index)}
          {/* darkens receding cards (sits above content, never blocks the pointer) */}
          <mesh geometry={dimGeo} position-z={0.14} renderOrder={10} raycast={noRaycast}>
            <meshBasicMaterial ref={(m) => {
                dims.current[i] = m
              }} color="#05070f" transparent opacity={0} depthWrite={false} toneMapped={false} />
          </mesh>
        </group>
      ))}

      {/* controls */}
      <group position-y={-cardH / 2 - 0.7}>
        <Btn w={0.95} h={0.7} size={0.34} label="<" position-x={-2.1} faded={index === 0} disabled={index === 0} onClick={() => go(-1)} />
        <Txt size={0.22} bold anchorX="center" anchorY="middle" color={COL.accent} letterSpacing={0.1}>
          {`${pad(index + 1)} / ${pad(n)}`}
        </Txt>
        <Btn w={0.95} h={0.7} size={0.34} label=">" position-x={2.1} faded={index === n - 1} disabled={index === n - 1} onClick={() => go(1)} />
      </group>
    </group>
  )
}
