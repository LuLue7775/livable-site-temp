'use client'
import { useState, createContext, useContext } from 'react'

export const MenuContext = createContext({})

export function useMenu() {
  const context = useContext(MenuContext)
  if (context === undefined) throw new Error('useMenu must be used within a MenuProvider')
  return context
}

export function MenuProvider({ children }) {
  const [isMenuOpened, setMenuOpened] = useState(false)

  return <MenuContext.Provider value={{ isMenuOpened, setMenuOpened }}>{children}</MenuContext.Provider>
}
