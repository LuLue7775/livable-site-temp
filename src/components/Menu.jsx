'use client'
import { useCart } from '@/context/cartContext'
import Link from 'next/link'

const Menu = ({ isMenuOpened, setMenuOpened }) => {
  const { calculateTotalQuantity, setCartOpened } = useCart()

  return isMenuOpened ? (
    <div className='absolute left-[1rem] top-[-3rem] z-10 flex h-[400px] w-[350px] flex-col justify-between rounded-sm bg-green-900/10 p-4 text-lg	backdrop-blur-md backdrop-sepia-0 '>
      <ul className=' h-full '>
        <a className='block w-full cursor-pointer text-right hover:text-red-400' onClick={() => setMenuOpened(false)}>
          {' '}
          [x close ]{' '}
        </a>
        <Link onClick={() => setMenuOpened(false)} href='/' className='hover:text-red-400'>
          {' '}
          <li>THE LIVABLE STUDIO</li>
        </Link>
        <Link onClick={() => setMenuOpened(false)} href='/events' className='hover:text-red-400'>
          {' '}
          <li>EVENTS</li>
        </Link>
        <Link onClick={() => setMenuOpened(false)} href='/checkout' className='hover:text-red-400'>
          {' '}
          <li>CHECKOUT</li>
        </Link>
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
  ) : (
    ''
  )
}

export default Menu
