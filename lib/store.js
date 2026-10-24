import { useSyncExternalStore } from 'react'

// Tiny external store so the 3D scene (which lives in its own React reconciler)
// can talk to regular DOM components (e.g. open the project details drawer).
let state = { project: null }
const listeners = new Set()

export const ui = {
  get: () => state,
  set(patch) {
    state = { ...state, ...patch }
    listeners.forEach((l) => l())
  },
  subscribe(l) {
    listeners.add(l)
    return () => listeners.delete(l)
  },
}

export const useUI = () => useSyncExternalStore(ui.subscribe, ui.get, ui.get)
