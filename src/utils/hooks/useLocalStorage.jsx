import { useEffect, useState } from 'react'

/**
 * @TODO set expire date
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue)
  useEffect(() => {
    const jsonValue = localStorage.getItem(key)
    setValue(jsonValue ? JSON.parse(jsonValue) : initialValue)
  }, [])

  useEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(initialValue)) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [value])

  return [value, setValue]
}
