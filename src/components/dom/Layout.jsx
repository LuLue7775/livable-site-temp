'use client'
import Nav from '../Nav'
import Cart from '../Cart'
import { useGlass } from '@/providers/glassElementContext'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Menu from '../Menu'

import React, { lazy } from 'react'
import { Canvas } from '@react-three/offscreen'

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

  const [worker, setWorker] = useState()

  useEffect(() => {
    const newWorker = new Worker(new URL('@/components/canvas/worker.jsx', import.meta.url), { type: 'module' })
    setWorker(newWorker)

    return () => {
      newWorker.terminate()
    }
  }, [])

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
      </div>
    </>
  )
}

export { Layout }
