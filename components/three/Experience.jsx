'use client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import Loader from './Loader'

// three.js is large — load it only in the browser, after the page shell.
const Scene = dynamic(() => import('./Scene'), { ssr: false })

function webglSupported() {
  try {
    const c = document.createElement('canvas')
    const gl = c.getContext('webgl2') || c.getContext('webgl')
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
    return !!gl
  } catch {
    return false
  }
}

export default function Experience() {
  const [ok, setOk] = useState(null)

  useEffect(() => {
    const supported = webglSupported()
    setOk(supported)
    // CSS reveals the plain-HTML version of each page when WebGL isn't available.
    document.documentElement.classList.toggle('no-webgl', !supported)
  }, [])

  if (!ok) return null
  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <Scene />
      <Loader />
    </div>
  )
}
