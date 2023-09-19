'use client'
import Nav from '@/components/Nav'
import Cart from '@/components/Cart'
import Menu from '@/components/Menu'
import { useGlass } from '@/context/glassElementContext'
import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

const Layout = ({ children }) => {
  const ref = useRef()
  const pathname = usePathname()
  const reg = new RegExp(`\/events/([\\w-]+)`, 'g') // only scroll y on /events/[id] page
  const yScroll = reg.test(pathname) || pathname === '/events' || pathname === '/checkout'

  const { glassRef } = useGlass()

  return (
    <>
      <div
        ref={glassRef}
        className='pointer-events-none absolute z-50 h-screen w-screen -translate-x-full bg-livable/10 backdrop-blur-md backdrop-sepia-0'
      />
      <div
        ref={ref}
        style={{
          overflowY: yScroll ? 'auto' : 'hidden',
          overflowX: 'hidden',
          position: 'relative',
          width: '100%',
          height: '100%',
          touchAction: 'auto',
        }}
      >
        <Nav />
        <div className='relative'>
          <Menu />
          <Cart />
        </div>

        {children}

        {/** z index cant be negative in canvas */}
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
      </div>
    </>
  )
}

export { Layout }
