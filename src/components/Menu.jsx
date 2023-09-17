'use client'
import { useMenu } from '@/context/menuContext'
import { useCart } from '@/context/cartContext'
import useDelayRouting from '@/utils/hooks/useDelayRouting'

const Menu = () => {
  const { calculateTotalQuantity, setCartOpened } = useCart()
  const { isMenuOpened, setMenuOpened } = useMenu()

  const routerMiddleware = useDelayRouting()

  return (
    <div
      className={`
          ${isMenuOpened ? 'left-[1rem]' : 'left-[-350px]'} duration-300 
        absolute  top-[1rem] z-20 flex h-[400px] w-[min(90%,350px)]  
        flex-col justify-between rounded-sm bg-green-900/10 p-4 font-mono text-lg	backdrop-blur-md backdrop-sepia-0
    `}
    >
      <ul className=' h-full '>
        <a className='block w-full cursor-pointer text-right hover:text-red-400' onClick={() => setMenuOpened(false)}>
          {' '}
          [x close ]{' '}
        </a>
        <a onClick={() => routerMiddleware.push('/')} className='hover:text-red-400'>
          {' '}
          <li>THE LIVABLE STUDIO</li>
        </a>
        <a onClick={() => routerMiddleware.push('/events')} className='hover:text-red-400'>
          {' '}
          <li>EVENTS</li>
        </a>
        <a onClick={() => routerMiddleware.push('/checkout')} className='hover:text-red-400'>
          {' '}
          <li>CHECKOUT</li>
        </a>
      </ul>
      <a
        onClick={() => {
          setCartOpened(true)
          setMenuOpened(false)
        }}
        className='cursor-pointer list-none hover:text-red-400'
      >
        <li className='flex'>
          CART
          <p className='text-xs italic'> {` (${calculateTotalQuantity})`}</p>
        </li>
      </a>
    </div>
  )
}

export default Menu
