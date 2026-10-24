'use client'
import { createContext, useContext } from 'react'
import { useThree } from '@react-three/fiber'
import { isNarrow } from '@/lib/world'

// Next's router contexts don't cross into the R3F canvas, so the Scene reads the
// route outside the canvas and provides it here.
export const WorldContext = createContext({ index: 0, go: () => {}, reduced: false, low: false })
export const useWorld = () => useContext(WorldContext)

// Per-station info (is the camera here right now?)
export const StationContext = createContext({ active: false, index: 0 })
export const useStation = () => useContext(StationContext)

// true on portrait / phone-shaped viewports. Selector returns a boolean so we only re-render on flips.
export const useNarrow = () => useThree((s) => isNarrow(s.size.width / s.size.height))
