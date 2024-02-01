'use client'

import { introAnimation } from '@/utils/animations'
import LoadingIcon from '@/components/LoadingIcon'
import HomepageCanvas from '@/app/HomepageCanvas'
import { Suspense, useState, useRef, useEffect } from 'react'

export default function Page() {
  // reveal text behind
  const [isReveal, setRevealDetail] = useState(false)

  const titleRef = useRef()
  const sidelineRef = useRef()
  const buttonRef = useRef()

  useEffect(() => {
    if (!titleRef.current) return

    introAnimation([titleRef.current, sidelineRef.current, buttonRef.current])
  }, [])

  return (
    <>
      <div className='relative h-full w-full'>
        <section
          ref={titleRef}
          style={{ opacity: '0' }}
          className='pointer-events-none absolute bottom-8 z-10 flex h-full w-full select-none items-end justify-start text-green-900'
        >
          <div className='title-wrapper my-4 flex h-1/2 flex-col items-start justify-end p-6 font-light leading-tight '>
            <div className='homepage-long-dash relative inline-flex gap-32  '>
              <p className=' w-8 text-lg  lg:w-14 lg:text-4xl'> 14 OCT</p>
              <p className=' w-8 text-lg  lg:w-14 lg:text-4xl'> 22 OCT</p>
            </div>
            <h1 className='m-0 my-4 flex items-center text-4xl font-bold leading-tight lg:text-6xl '>
              SOFT RE-OPENING
            </h1>
          </div>
        </section>

        <Suspense fallback={<LoadingIcon />}>
          <section
            ref={sidelineRef}
            style={{ opacity: '0' }}
            className='detail-wrapper absolute mt-24 flex h-full w-full items-start justify-end pr-6 text-right text-green-900 opacity-40 lg:opacity-100'
          >
            <div className='max-h-[120px] w-auto max-w-[300px] text-xl'>
              <p>
                “Inframince”, a term coined by Marcel Duchamp, refers to ephemeral, ultra-thin, and undecidable
                phenomena – such as the warmth that remains on a chair after a person gets up.
              </p>
            </div>
          </section>
        </Suspense>

        <section className='absolute bottom-4 right-4 z-20 text-end'>
          <p>統一編號：93224119</p>
          <p>email: info@thelivablestudio.com </p>
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
        ref={buttonRef}
        style={{ opacity: '0' }}
        onClick={() => setRevealDetail(!isReveal)}
        className='absolute bottom-12 left-1/2 z-20 -translate-x-1/2 text-2xl text-green-900 transition-colors duration-300 ease-in-out hover:text-red-400'
      >
        [ detail ]
      </button>
    </>
  )
}
