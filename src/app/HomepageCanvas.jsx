// 'use client'

// import LoadingIcon from '@/components/LoadingIcon'
// // import { Tiles } from '@/components/canvas/Tiles'
// // import { Common } from '@/components/canvas/View'
// import dynamic from 'next/dynamic'
// import { Suspense } from 'react'

// const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
//   ssr: false,
//   loading: () => (
//     <div className='flex h-96 w-full flex-col items-center justify-center'>
//       <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
//         <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
//         <path
//           className='opacity-75'
//           fill='currentColor'
//           d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
//         />
//       </svg>
//     </div>
//   ),
// })

// const Tiles = dynamic(() => import('@/components/canvas/Tiles').then((mod) => mod.Tiles), { ssr: false })
// const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

// const HomepageCanvas = ({ isReveal }) => {
//   return (
//     <section className='pointer-events-none absolute z-0 h-full w-full text-center'>
//       <View orbit className='flex h-full w-full items-center justify-center'>
//         <Suspense fallback={<LoadingIcon />}>
//           <Tiles isReveal={isReveal} />
//           <Common />
//         </Suspense>
//       </View>
//     </section>
//   )
// }

// export default HomepageCanvas
