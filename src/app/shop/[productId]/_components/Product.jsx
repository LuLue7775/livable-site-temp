'use client'
import { useRef } from 'react'
import ProductLayout from './ProductLayout'

const Product = ({ product }) => {
  const mainScopeRef = useRef(null)
  return (
    <div ref={mainScopeRef} className='mt-12 flex h-auto w-full translate-y-16 flex-col items-end text-green-900'>
      <ProductLayout product={product} mainScopeRef={mainScopeRef}/>
    </div>
  )
}

export default Product
