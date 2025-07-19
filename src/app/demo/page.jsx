'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const PencilLinesCanvas = dynamic(() => import('./PencilLinesCanvas'), {
  ssr: false,
})

export default function DemoPage() {
  return (
    <main className="h-screen w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <PencilLinesCanvas />
      </Suspense>
    </main>
  )
} 