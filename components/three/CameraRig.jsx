'use client'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { STATIONS, BASE_FOV, CAM_ELEVATION, cameraDistance } from '@/lib/world'
import { useWorld } from './context'

// Flies the camera to whichever station matches the current route.
export default function CameraRig() {
  const { index, reduced } = useWorld()

  const rig = useRef({
    ready: false,
    base: new THREE.Vector3(),
    look: new THREE.Vector3(),
    par: new THREE.Vector3(),
    prev: new THREE.Vector3(),
    roll: 0,
    fov: BASE_FOV,
  })
  const tmp = useMemo(
    () => ({
      target: new THREE.Vector3(),
      lookT: new THREE.Vector3(),
      v: new THREE.Vector3(),
      right: new THREE.Vector3(),
    }),
    []
  )

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const { camera, size, pointer } = state
    const r = rig.current
    const st = STATIONS[index]
    const D = cameraDistance(size.width / size.height)

    // Where the camera should rest: in front of the station, a little above it.
    tmp.target.copy(st.position).addScaledVector(st.normal, D)
    tmp.target.y += CAM_ELEVATION
    tmp.lookT.copy(st.position)

    if (!r.ready) {
      // Intro: start high and far away, then glide in.
      r.base.copy(tmp.target)
      if (!reduced) {
        r.base.addScaledVector(st.normal, D * 1.8)
        r.base.y += 18
      }
      r.look.copy(tmp.lookT)
      r.prev.copy(r.base)
      r.ready = true
    }

    const smooth = reduced ? 0.01 : 1.05
    easing.damp3(r.base, tmp.target, smooth, dt)
    easing.damp3(r.look, tmp.lookT, smooth * 0.8, dt)

    // Mouse / touch parallax (in the station's own right/up axes)
    tmp.v.set(0, 0, 0)
    if (!reduced) {
      tmp.v.addScaledVector(st.right, pointer.x * 0.8)
      tmp.v.y = pointer.y * 0.45
    }
    easing.damp3(r.par, tmp.v, 0.35, dt)

    camera.position.copy(r.base).add(r.par)
    camera.lookAt(r.look)

    // Flight feel: widen the FOV and bank the camera while it's moving fast.
    tmp.v.copy(r.base).sub(r.prev).divideScalar(Math.max(dt, 1e-4))
    r.prev.copy(r.base)
    const speed = tmp.v.length()
    const fovTarget = BASE_FOV + (reduced ? 0 : Math.min(speed * 0.22, 14))
    easing.damp(r, 'fov', fovTarget, 0.25, dt)
    if (Math.abs(camera.fov - r.fov) > 0.01) {
      camera.fov = r.fov
      camera.updateProjectionMatrix()
    }

    tmp.right.set(1, 0, 0).applyQuaternion(camera.quaternion)
    const lateral = tmp.v.dot(tmp.right)
    const rollTarget = reduced ? 0 : THREE.MathUtils.clamp(-lateral * 0.006, -0.14, 0.14)
    easing.damp(r, 'roll', rollTarget, 0.3, dt)
    camera.rotateZ(r.roll)
  })

  return null
}
