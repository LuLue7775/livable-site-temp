'use client'
import Nav from '../Nav'
import Cart from '../Cart'
import Menu from '../Menu'
import { useGlass } from '@/providers/glassElementContext'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { usePathname } from 'next/navigation'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

const Layout = ({ children }) => {
  const ref = useRef()
  const pathname = usePathname()
  const isEventsId = new RegExp(`\/events/([\\w-]+)`, 'g') // only scroll y on /events/[id] page
  const isShopId = new RegExp(`\/shop/([\\w-]+)`, 'g')
  const yScroll =
    isEventsId.test(pathname) ||
    isShopId.test(pathname) ||
    pathname === '/events' ||
    pathname === '/checkout' ||
    pathname === '/shop' ||
    pathname === '/privacy-policy' ||
    pathname === '/return-policy' ||
    pathname === '/service-policy'
  const { glassRef } = useGlass()

  return (
    <>
      <div
        ref={glassRef}
        className='pointer-events-none absolute z-50 h-screen w-screen -translate-x-full bg-livable/10 backdrop-blur-md backdrop-sepia-0'
      />
      <div
        ref={ref}
        data-scroll-container
        style={{
          overflowY: yScroll ? 'auto' : 'hidden',
          overflowX: 'hidden',
          width: '100%',
          height: '100%',
          touchAction: 'auto',
        }}
      >
        <Nav />
        <div >
          <Menu />
          <Cart />
        </div>

        {children}

        {/** z index cant be negative in canvas */}
        {pathname === '/' && (
          <Scene
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              pointerEvents: 'none',
            }}
            eventSource={ref}
            eventPrefix='client'
          />
        )}
      </div>
    </>
  )
}

export { Layout }
