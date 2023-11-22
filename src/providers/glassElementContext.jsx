'use client'

import { useContext, createContext, useRef } from 'react'

export const GlassElementContext = createContext()

export function GlassProvider({ children }) {
  const glassRef = useRef()

  return <GlassElementContext.Provider value={{ glassRef }}>{children}</GlassElementContext.Provider>
}

export function useGlass() {
  const context = useContext(GlassElementContext)
  if (context === undefined) throw new Error('useGlass must be used within a GlassProvider')
  return context
}
