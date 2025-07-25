'use client'
import ShopLayout from './ShopLayout'
import ScrollArrow from '@/components/ScrollArrow'

import { useRef } from 'react'

const Shop = () => {
  const mainScopeRef = useRef(null)

  return (
    <>
      <div ref={mainScopeRef} className='mt-12 flex h-auto w-full translate-y-16 flex-col items-end text-green-900'>
        <ShopLayout mainScopeRef={mainScopeRef} />
      </div>
      <ScrollArrow />
    </>
  )
}
export default Shop
