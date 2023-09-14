'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Logo = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Logo), { ssr: false })
const TileA = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.TileA), { ssr: false })
const Box = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Box), { ssr: false })
const Tiles = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Tiles), { ssr: false })

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

export default function Page() {
  return (
    <>
      <div className='relative z-[-1] h-full w-full -translate-y-[64px]'>
        <div className='pointer-events-none absolute flex h-full w-full select-none items-center justify-start text-green-900 md:items-end '>
          <div className='title-wrapper my-4 flex h-1/2 flex-col items-start justify-center p-6 text-2xl font-light leading-tight md:justify-end md:text-4xl '>
            <div className='homepage-long-dash relative inline-flex gap-32 '>
              <p className='w-14'> 14 OCT</p>

              <p className='w-14'> 22 OCT</p>
            </div>
            <h1 className='my-4 flex items-center text-4xl font-bold leading-tight md:text-6xl '>SOFT RE-OPENING</h1>
          </div>
        </div>

        <div className='absolute h-full w-full text-center'>
          <View className='flex h-full w-full items-center justify-center'>
            <Suspense fallback={null}>
              <Tiles />
              <Common />
            </Suspense>
          </View>
        </div>
      </div>
      <a href={'/events/first-opening'} className='absolute bottom-12 left-1/2 -translate-x-1/2 hover:text-red-400 '>
        [view event]
      </a>
    </>
  )
}
