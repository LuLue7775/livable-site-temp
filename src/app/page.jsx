'use client'

import dynamic from 'next/dynamic'
import { Suspense, useState, useRef, useEffect } from 'react'
import { introAnimation } from '@/utils/animations'

const Tiles = dynamic(() => import('@/components/canvas/Tiles').then((mod) => mod.Tiles), { ssr: false })

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export const metadata = {
  title: 'The Livable Studio Homepage',
  description: 'A website created by The Livable Studio.',
}

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

        <section
          ref={sidelineRef}
          style={{ opacity: '0' }}
          className='detail-wrapper absolute mt-24 flex h-full w-full items-start justify-end pr-6 text-right text-green-900 opacity-40 lg:opacity-100'
        >
          <div className='max-h-[120px] w-auto max-w-[300px] text-xl'>
            <p>
              “Inframince”, a term coined by Marcel Duchamp, refers to ephemeral, ultra-thin, and undecidable phenomena
              – such as the warmth that remains on a chair after a person gets up.
            </p>
          </div>
        </section>

        <section className='absolute bottom-4 right-4 z-20 text-end'>
          <p>統一編號：93224119</p>
          <p>email: thelivablestudio@gmail.com </p>
        </section>

        <section className='pointer-events-none absolute z-0 h-full w-full text-center'>
          <View className='flex h-full w-full items-center justify-center'>
            <Suspense fallback={null}>
              <Tiles isReveal={isReveal} />
              <Common />
            </Suspense>
          </View>
        </section>
      </div>

      <button
        ref={buttonRef}
        style={{ opacity: '0' }}
        onClick={() => setRevealDetail(!isReveal)}
        className='absolute bottom-12 left-1/2 z-20 -translate-x-1/2 text-green-900 hover:text-red-400'
      >
        [detail]
      </button>
    </>
  )
}
