/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'

const ShopSort = ({ setSortDate, setSortPrice }) => {
  const [isDscDate, setDscDate] = useState(null)
  const [isDscPrice, setDscPrice] = useState(null)

  useEffect(() => {
    if (isDscDate) setSortDate('dsc')
    else setSortDate('asc')
  }, [isDscDate])
  useEffect(() => {
    if (isDscPrice) setSortPrice('dsc')
    else setSortPrice('asc')
  }, [isDscPrice])

  return (
    <>
      Sort By
      <a className='cursor-pointer' onClick={() => setDscDate(!isDscDate)}>
        Newest {isDscDate ? '↑' : '↓'}
      </a>
      <a className='cursor-pointer' onClick={() => setDscPrice(!isDscPrice)}>
        Price {isDscPrice ? '↓' : '↑'}
      </a>
    </>
  )
}
export default ShopSort
