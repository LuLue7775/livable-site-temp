'use client'

import Button from './Button'
import { useCart } from '@/providers/cartContext'
import useDelayRouting from '@/utils/hooks/useDelayRouting'
import CheckoutEvents from '@/app/checkout/_components/CheckoutEvents'
import CheckoutFormProvider from '@/app/checkout/_components/CheckoutFormProvider'
import CheckoutProducts from '@/app/checkout/_components/CheckoutProducts'

const Cart = () => {
  const { isCartOpened, setCartOpened } = useCart()
  const routerMiddleware = useDelayRouting()

  return (
    <CheckoutFormProvider>
      <div
        className={`
      ${isCartOpened ? 'right-[1rem]' : 'right-[-450px]'}
             absolute  top-[1rem] z-20 flex h-[500px] 
            w-[min(90%,390px)] flex-col justify-between rounded-sm bg-green-900/10 p-4	font-mono text-lg
          backdrop-blur-md backdrop-sepia-0 duration-300
    `}
      >
        <div className='h-full overflow-auto'>
          <div className='flex justify-between'>
            <h3 className='font-semibold'>CART</h3>
            <button onClick={() => setCartOpened(false)}>
              <p className='cursor-pointer text-right hover:text-red-400'>[ x close ]</p>
            </button>
          </div>
          <CheckoutProducts />
          <CheckoutEvents />

          <Button onClick={() => routerMiddleware.push('/checkout')}> CHECKOUT -&gt;</Button>
        </div>
      </div>
    </CheckoutFormProvider>
  )
}

export default Cart
