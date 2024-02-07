'use client'
import CommonAnimation from './CommonAnimation'
import { useRef } from 'react'

const CommonAnimationLayout = ({ children }) => {
  const mainScopeRef = useRef(null)
  return (
    <div ref={mainScopeRef} className='mt-12 flex h-auto w-full translate-y-16 flex-col items-end text-green-900'>
      <CommonAnimation mainScopeRef={mainScopeRef}>{children}</CommonAnimation>
    </div>
  )
}

export default CommonAnimationLayout
