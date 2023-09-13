'use client'
import CheckoutEvents from './CheckoutEvents'
import CheckoutProducts from './CheckoutProducts'
import CheckoutTotal from './CheckoutTotal'
import { useRef } from 'react'

const CheckoutContent = () => {
  const horizontalRef = useRef()
  const eventHeadRef = useRef()
  const eventBodyRef = useRef()

  return (
    <div className='mt-4 flex h-auto w-full flex-col items-end overflow-hidden text-green-900'>
      <div
        className={
          'event-item-head relative h-[52px] w-full min-w-[350px] translate-x-12 justify-end md:w-[calc(100%-10px)]'
        }
      >
        <p ref={horizontalRef} className='relative flex h-[52px] w-full border-t border-black/50' />
      </div>

      <div
        className='relative 
                  bottom-0 min-h-[600px] w-full min-w-[350px] 
                  translate-x-[-4px] translate-y-[1px] overflow-hidden border-l border-black/50 p-6 md:w-[calc(100%-10px)]'
      >
        <CheckoutEvents />
        {/* <CheckoutProducts /> */}
        <CheckoutTotal />
      </div>
    </div>
  )
}
export default CheckoutContent
