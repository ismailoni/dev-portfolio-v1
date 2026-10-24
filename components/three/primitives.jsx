'use client'
import { forwardRef, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Text, useCursor, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { COL } from '@/lib/world'

export const FONT = '/fonts/JetBrainsMono-Regular.woff'
export const FONT_BOLD = '/fonts/JetBrainsMono-Bold.woff'

// Colours > 1 are deliberate: only things brighter than the bloom threshold glow.
export const GLOW = new THREE.Color(COL.accent).multiplyScalar(3)
export const GLOW_BLUE = new THREE.Color(COL.blue).multiplyScalar(3)
export const GLOW_PURPLE = new THREE.Color(COL.purple).multiplyScalar(3)

// Set by the swipe handler so a drag that ends over a button doesn't also "click" it.
export const drag = { moved: false }

const noRaycast = () => null

// ---------------------------------------------------------------------------
// Text (troika SDF text — crisp at any distance)
// ---------------------------------------------------------------------------
export const Txt = forwardRef(function Txt(
  {
    children,
    size = 0.3,
    color = COL.text,
    bold = false,
    anchorX = 'left',
    anchorY = 'top',
    renderOrder = 3,
    opacity = 1,
    ...rest
  },
  ref
) {
  return (
    <Text
      ref={ref}
      font={bold ? FONT_BOLD : FONT}
      fontSize={size}
      color={color}
      anchorX={anchorX}
      anchorY={anchorY}
      renderOrder={renderOrder}
      fillOpacity={opacity}
      raycast={noRaycast}
      {...rest}
    >
      {children}
    </Text>
  )
})

// ---------------------------------------------------------------------------
// Rounded-rect geometry (cached by size)
// ---------------------------------------------------------------------------
function roundedRectShape(w, h, r) {
  const s = new THREE.Shape()
  const x = -w / 2
  const y = -h / 2
  r = Math.min(r, w / 2, h / 2)
  s.moveTo(x + r, y)
  s.lineTo(x + w - r, y)
  s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false)
  s.lineTo(x + w, y + h - r)
  s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false)
  s.lineTo(x + r, y + h)
  s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false)
  s.lineTo(x, y + r)
  s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false)
  return s
}

const cache = new Map()
const memo = (key, make) => {
  if (!cache.has(key)) cache.set(key, make())
  return cache.get(key)
}

export function fillGeometry(w, h, r) {
  return memo(`f${w}|${h}|${r}`, () => {
    const g = new THREE.ShapeGeometry(roundedRectShape(w, h, r), 10)
    // ShapeGeometry UVs are world-space; normalise to 0..1 so textures map correctly.
    const uv = g.attributes.uv
    const pos = g.attributes.position
    for (let i = 0; i < uv.count; i++) uv.setXY(i, pos.getX(i) / w + 0.5, pos.getY(i) / h + 0.5)
    return g
  })
}

export function borderGeometry(w, h, r, t = 0.028) {
  return memo(`b${w}|${h}|${r}|${t}`, () => {
    const outer = roundedRectShape(w, h, r)
    outer.holes.push(roundedRectShape(w - 2 * t, h - 2 * t, Math.max(r - t, 0.01)))
    return new THREE.ShapeGeometry(outer, 10)
  })
}

// Flat glass panel with a hairline border. Refs let a parent animate the materials.
export function Panel({
  w,
  h,
  r = 0.3,
  fill = COL.panel,
  fillOpacity = 0.84,
  borderColor = '#ffffff',
  borderOpacity = 0.14,
  fillRef,
  borderRef,
  order = 1,
  ...group
}) {
  const f = useMemo(() => fillGeometry(w, h, r), [w, h, r])
  const b = useMemo(() => borderGeometry(w, h, r), [w, h, r])
  return (
    <group {...group}>
      <mesh geometry={f} renderOrder={order}>
        <meshBasicMaterial ref={fillRef} color={fill} transparent opacity={fillOpacity} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh geometry={b} position-z={0.004} renderOrder={order + 1}>
        <meshBasicMaterial ref={borderRef} color={borderColor} transparent opacity={borderOpacity} depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  )
}

// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------
const PRIMARY = new THREE.Color(COL.accent).multiplyScalar(1.1)
const PRIMARY_HOT = new THREE.Color(COL.accent).multiplyScalar(1.35)
const DARK = new THREE.Color(COL.panel)
const DARK_HOT = new THREE.Color('#17314a')

export function Btn({ label, w = 3, h = 0.8, size = 0.22, primary = false, disabled = false, faded = false, onClick, children, ...pos }) {
  const [hover, setHover] = useState(false)
  useCursor(hover && !disabled)
  const inner = useRef()
  const fill = useRef()
  const border = useRef()
  const t = useRef(0)

  useFrame((_, dt) => {
    t.current = THREE.MathUtils.damp(t.current, hover && !disabled ? 1 : 0, 12, dt)
    const k = t.current
    if (inner.current) {
      inner.current.scale.setScalar(1 + k * 0.06)
      inner.current.position.z = k * 0.2
    }
    if (fill.current) fill.current.color.lerpColors(primary ? PRIMARY : DARK, primary ? PRIMARY_HOT : DARK_HOT, k)
    if (border.current) border.current.opacity = ((primary ? 0 : 0.3) + k * 0.7) * (faded ? 0.4 : 1)
  })

  return (
    <group {...pos}>
      <group
        ref={inner}
        onPointerOver={(e) => {
          if (disabled) return
          e.stopPropagation()
          setHover(true)
        }}
        onPointerOut={() => setHover(false)}
        onClick={(e) => {
          if (disabled || drag.moved) return
          e.stopPropagation()
          onClick?.(e)
        }}
      >
        <Panel
          w={w}
          h={h}
          r={Math.min(0.24, h / 2)}
          fill={primary ? COL.accent : COL.panel}
          fillOpacity={faded ? 0.35 : primary ? 1 : 0.92}
          borderColor={COL.accent}
          borderOpacity={primary ? 0 : 0.3}
          fillRef={fill}
          borderRef={border}
          order={5}
        />
        {label && (
          <Txt
            size={size}
            bold
            anchorX="center"
            anchorY="middle"
            position={[0, 0, 0.02]}
            renderOrder={7}
            color={primary ? '#05210f' : COL.text}
            opacity={faded ? 0.4 : 1}
          >
            {label}
          </Txt>
        )}
        {children}
      </group>
    </group>
  )
}

// ---------------------------------------------------------------------------
// Images
// ---------------------------------------------------------------------------
export function useImage(src) {
  const tex = useTexture(src)
  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 8
    tex.needsUpdate = true
  }, [tex])
  return tex
}

// Rounded image that behaves like CSS object-fit: cover.
export function CoverImage({ src, w, h, r = 0.18, focus = 'center', ...props }) {
  const tex = useImage(src)
  const geo = useMemo(() => fillGeometry(w, h, r), [w, h, r])
  useMemo(() => {
    const img = tex.image
    if (!img) return
    const ia = img.width / img.height
    const ba = w / h
    let rx = 1
    let ry = 1
    if (ia > ba) rx = ba / ia
    else ry = ia / ba
    tex.repeat.set(rx, ry)
    tex.offset.set((1 - rx) / 2, focus === 'top' ? 1 - ry : (1 - ry) / 2)
  }, [tex, w, h, focus])
  return (
    <mesh geometry={geo} renderOrder={2} {...props}>
      {/* slightly below pure white so bright screenshots don't trip the bloom threshold */}
      <meshBasicMaterial map={tex} color="#e2e2e2" toneMapped={false} />
    </mesh>
  )
}

// ---------------------------------------------------------------------------
// Soft additive glow (radial gradient sprite)
// ---------------------------------------------------------------------------
let glowTex
export function getGlowTexture() {
  if (glowTex) return glowTex
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const x = c.getContext('2d')
  const g = x.createRadialGradient(128, 128, 0, 128, 128, 128)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.22, 'rgba(255,255,255,0.35)')
  g.addColorStop(0.55, 'rgba(255,255,255,0.08)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  x.fillStyle = g
  x.fillRect(0, 0, 256, 256)
  glowTex = new THREE.CanvasTexture(c)
  glowTex.colorSpace = THREE.SRGBColorSpace
  return glowTex
}

export function Glow({ color = COL.accent, scale = 10, opacity = 0.5, ...props }) {
  return (
    <sprite scale={[scale, scale, 1]} renderOrder={-1} {...props}>
      <spriteMaterial
        map={getGlowTexture()}
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        fog={false}
        toneMapped={false}
      />
    </sprite>
  )
}

// A ring broken into dashes (cheap: a handful of ring-geometry arcs)
export function DashedRing({ radius, width = 0.05, count = 12, fill = 0.5, color = GLOW, opacity = 1, ...props }) {
  const arcs = useMemo(() => {
    const step = (Math.PI * 2) / count
    return Array.from({ length: count }, (_, i) => new THREE.RingGeometry(radius - width / 2, radius + width / 2, 24, 1, i * step, step * fill))
  }, [radius, width, count, fill])
  return (
    <group {...props}>
      {arcs.map((g, i) => (
        <mesh key={i} geometry={g}>
          <meshBasicMaterial color={color} transparent opacity={opacity} toneMapped={false} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}
