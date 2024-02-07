'use client'

import { useContext, createContext, useRef } from 'react'

export const GlassElementContext = createContext()

/**
 * @TODO
 * setOpen handler: when "desination page content" is rendered, should setOpen
 * promise: make this a promise, only resolve this glass and open it when signal has given approval
 * remove "useDelayRouting", it's a bad idea!
 */

export function GlassProvider({ children }) {
  const glassRef = useRef()

  return <GlassElementContext.Provider value={{ glassRef }}>{children}</GlassElementContext.Provider>
}

export function useGlass() {
  const context = useContext(GlassElementContext)
  if (context === undefined) throw new Error('useGlass must be used within a GlassProvider')
  return context
}
