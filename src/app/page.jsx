'use client'

import LoadingIcon from '@/components/LoadingIcon'
import HomepageCanvas from '@/app/HomepageCanvas'
import HomeTitle from './_components/HomeTitle'
import HomeSidelines from './_components/HomeSidelines'
import { Suspense, useState, useRef } from 'react'

export default function Page() {
  // reveal text behind
  const [isReveal, setRevealDetail] = useState(false)
  const introScopeRef = useRef(null)

  return (
    <>
      <div ref={introScopeRef} className='relative h-full w-full'>
        <HomeTitle introScopeRef={introScopeRef} />

        <HomeSidelines introScopeRef={introScopeRef} />

        <section className='absolute bottom-4 right-4 z-20 text-end text-sm text-green-900'>
          <p>統一編號：93224119</p>
          <p>email: info@thelivablestudio.com </p>
          <p>Copyright © 2024 The Livable Studio. All rights reserved. </p>
        </section>

        <Suspense fallback={<LoadingIcon />}>
          <section className='absolute left-1/2 top-1/2 max-w-[300px] -translate-x-1/2 -translate-y-1/2 text-4xl text-green-900'>
            <p className=' inline pr-4 '>EXPERIENCE THE JOURNEY OF LIVING IN OUR</p>
            <a
              onClick={() => routerMiddleware.push('/shop')}
              className='cursor-pointer bg-green-900 text-white transition-colors duration-300 ease-in-out hover:bg-red-400'
            >
              LANDSCAPE
            </a>
          </section>
        </Suspense>

        <HomepageCanvas isReveal={isReveal} />
      </div>

    <button
      onClick={() => setRevealDetail(!isReveal)}
      className='absolute bottom-12 left-1/2 z-20 -translate-x-1/2 text-2xl text-green-900 transition-colors duration-300 ease-in-out hover:text-red-400'
    >
      [ detail ]
    </button>    </>
  )
}
