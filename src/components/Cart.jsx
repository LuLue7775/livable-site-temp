'use client'

import { useRouter } from 'next/navigation'
import Button from './Button'
import CheckoutEvents from '@/checkout/CheckoutEvents'
import CheckoutFormProvider from '@/checkout/CheckoutFormProvider'

const Cart = ({ isCartOpened, setCartOpened }) => {
  const router = useRouter()

  return (
    <CheckoutFormProvider>
      <div
        className={`
      ${isCartOpened ? 'right-0' : 'right-[-450px]'}
             absolute  top-[-3rem] z-10 flex h-[500px] 
            w-[390px] flex-col justify-between rounded-sm bg-green-900/10 p-4	text-lg backdrop-blur-md
          backdrop-sepia-0 duration-300
    `}
      >
        <div className='h-full overflow-auto'>
          <button onClick={() => setCartOpened(false)}>
            <p className='cursor-pointer text-right hover:text-red-400'>[ x close ]</p>
          </button>
          <h3>CART</h3>
          <CheckoutEvents />

          <Button onClick={() => router.push('/checkout')}> CHECKOUT -&gt;</Button>
        </div>
      </div>
    </CheckoutFormProvider>
  )
}

export default Cart
