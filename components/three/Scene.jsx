'use client'
import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import { usePathname, useRouter } from 'next/navigation'
import { BASE_FOV, COL, stationIndexFor } from '@/lib/world'
import { WorldContext } from './context'
import Backdrop from './Backdrop'
import CameraRig from './CameraRig'
import HomeStation from './HomeStation'
import ServicesStation from './ServicesStation'
import ResumeStation from './ResumeStation'
import WorkStation from './WorkStation'
import ContactStation from './ContactStation'

function detectEnv() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const weak = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4
  return { reduced, low: coarse || weak }
}

export default function Scene() {
  const pathname = usePathname()
  const router = useRouter()
  const env = useMemo(detectEnv, [])
  const index = stationIndexFor(pathname)

  // The R3F canvas has its own React root, so route info is handed in via context.
  const world = useMemo(
    () => ({ index, go: (p) => router.push(p), reduced: env.reduced, low: env.low }),
    [index, router, env]
  )

  return (
    <Canvas
      flat
      dpr={[1, env.low ? 1.25 : 2]}
      camera={{ fov: BASE_FOV, near: 0.1, far: 500, position: [0, 20, 120] }}
      gl={{ antialias: env.low, powerPreference: 'high-performance' }}
      style={{ touchAction: 'pan-y' }}
    >
      <WorldContext.Provider value={world}>
        <color attach="background" args={[COL.bg]} />
        <fog attach="fog" args={[COL.bg, 55, 200]} />

        <CameraRig />
        <Backdrop />

        <Suspense fallback={null}><HomeStation /></Suspense>
        <Suspense fallback={null}><ServicesStation /></Suspense>
        <Suspense fallback={null}><ResumeStation /></Suspense>
        <Suspense fallback={null}><WorkStation /></Suspense>
        <Suspense fallback={null}><ContactStation /></Suspense>

        {!env.low && (
          <EffectComposer multisampling={4} disableNormalPass>
            <Bloom intensity={0.9} luminanceThreshold={0.9} luminanceSmoothing={0.15} mipmapBlur radius={0.75} />
            <Vignette offset={0.25} darkness={0.75} />
          </EffectComposer>
        )}
      </WorldContext.Provider>
    </Canvas>
  )
}
