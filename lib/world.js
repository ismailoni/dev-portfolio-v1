import * as THREE from 'three'

// ---------------------------------------------------------------------------
// The world: five stations on a ring. Each route is a station the camera flies to.
// ---------------------------------------------------------------------------

export const COL = {
  bg: '#070a14',
  panel: '#0f1629',
  text: '#dce4f5',
  muted: '#8e9ab4',
  accent: '#13cf71',
  blue: '#4e84ff',
  purple: '#a855f7',
  border: '#ffffff',
}

// Hue used for the atmospheric glow behind each station
export const HUES = [COL.accent, COL.blue, COL.purple, COL.accent, COL.blue]

export const ROUTES = ['/', '/services', '/resume', '/work', '/contact']
export const NAMES = ['Home', 'Services', 'Resume', 'Work', 'Contact']

export const RING_RADIUS = 44
export const BASE_FOV = 50
export const CAM_ELEVATION = 1.7 // camera sits a little above the station centre, looks slightly down
const HEIGHTS = [0, 2.5, -1.5, 3, -1] // stations float at slightly different heights

export const STATIONS = ROUTES.map((path, i) => {
  const a = (i / ROUTES.length) * Math.PI * 2
  const normal = new THREE.Vector3(Math.sin(a), 0, Math.cos(a)) // faces away from ring centre
  const right = new THREE.Vector3(Math.cos(a), 0, -Math.sin(a)) // station-local +x in world space
  const position = new THREE.Vector3(normal.x * RING_RADIUS, HEIGHTS[i], normal.z * RING_RADIUS)
  return { path, name: NAMES[i], index: i, angle: a, normal, right, position }
})

export function stationIndexFor(pathname = '/') {
  const i = ROUTES.findIndex((r) => (r === '/' ? pathname === '/' : pathname.startsWith(r)))
  return i === -1 ? 0 : i
}

// ---------------------------------------------------------------------------
// Responsive framing. Each station is designed for a "box" of world units that must
// always be fully visible; the camera backs away until the box fits the viewport.
// ---------------------------------------------------------------------------

export const NARROW_ASPECT = 0.9
const WIDE_BOX = { w: 19.5, h: 11.5 }
const NARROW_BOX = { w: 7.6, h: 14 }

export const isNarrow = (aspect) => aspect < NARROW_ASPECT

export function cameraDistance(aspect) {
  const box = isNarrow(aspect) ? NARROW_BOX : WIDE_BOX
  const visibleH = Math.max(box.w / aspect, box.h)
  return visibleH / (2 * Math.tan(THREE.MathUtils.degToRad(BASE_FOV / 2)))
}
