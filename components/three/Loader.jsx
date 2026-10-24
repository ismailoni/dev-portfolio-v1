'use client'
import { useProgress } from '@react-three/drei'

// Minimal DOM loading indicator, shown until textures/fonts for the first view are ready.
export default function Loader() {
  const { active, progress } = useProgress()
  const show = active || progress < 100
  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-[#070a14] transition-opacity duration-700 ${
        show ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <p className="text-xs uppercase tracking-[0.3em] text-accent">Entering the 3D world</p>
      <div className="h-[2px] w-48 overflow-hidden rounded bg-white/10">
        <div className="h-full bg-accent transition-all duration-300" style={{ width: `${Math.max(progress, 6)}%` }} />
      </div>
    </div>
  )
}
