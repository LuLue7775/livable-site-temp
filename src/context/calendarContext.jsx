'use clinet'

import { createContext, useState, useContext } from 'react'
import { getLocalTimeZone, today } from '@internationalized/date'

export const SelectedDateContext = createContext({
  selectedDate: today(getLocalTimeZone()),
  setSelectedDate: () => {},
})

export function SelectedDateProvider({ children }) {
  const [selectedDate, setSelectedDate] = useState(today(getLocalTimeZone()))
  return (
    <SelectedDateContext.Provider value={{ selectedDate, setSelectedDate }}>{children}</SelectedDateContext.Provider>
  )
}

export function useSelectedDate() {
  const context = useContext(SelectedDateContext)
  if (context === undefined) throw new Error('useSelectedDate must be used within a SelectedDateProvider')
  return context
}
