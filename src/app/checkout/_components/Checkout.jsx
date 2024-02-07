'use client'

import CheckoutForm from './CheckoutForm'
import CheckoutContent from './CheckoutContent'
import { useRef } from 'react'

const Checkout = () => {
  const introScopeRef = useRef(null)
  const mainScopeRef = useRef(null)

  return (
    <main ref={mainScopeRef} className='grid grid-cols-1 gap-4 md:grid-cols-3'>
      <div className='col-span-1 flex justify-start md:col-span-1 md:justify-end'>
        <CheckoutForm introScopeRef={introScopeRef} />
        {/** @TODO POLICIES */}
      </div>
      <div className='col-span-1 w-full md:col-span-2 '>
        <CheckoutContent mainScopeRef={mainScopeRef} />
      </div>
    </main>
  )
}
export default Checkout
