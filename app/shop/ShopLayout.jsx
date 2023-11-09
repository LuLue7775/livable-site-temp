'use client'
import ShopSort from './ShopSort'
import ShopCategories from './ShopCategories'
import ShopDescription from './ShopDescription'
import ShopList from './ShopList'
import { eventpage_revealXAnimation, eventpage_revealYAnimation } from '@/utils/animations'
import useDelayRouting from '@/utils/hooks/useDelayRouting'
import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import CSSRulePlugin from 'gsap/CSSRulePlugin'
gsap.registerPlugin(CSSRulePlugin)

const ShopLayout = () => {
  const routerMiddleware = useDelayRouting()

  const horizontalRef = useRef()
  const eventBodyRef = useRef()
  useEffect(() => {
    if (!horizontalRef.current) return
    let diagonalPseudo = CSSRulePlugin.getRule('.event-item-head::before') //get pseudo element
    eventpage_revealXAnimation({ horizontalLine: horizontalRef.current })
    eventpage_revealYAnimation({ diagonal: diagonalPseudo, vertical: eventBodyRef.current })
  }, [])

  return (
    <div className='mt-4 flex h-full w-full translate-y-16 flex-col items-end overflow-x-hidden text-green-900'>
      <div
        className={
          'event-item-head relative h-[52px] w-full min-w-[350px] translate-x-12 justify-end md:w-[calc(100%-200px)]'
        }
      >
        <p
          ref={horizontalRef}
          style={{ opacity: 0 }}
          className='relative flex h-[52px] w-full border-t border-green-900/60'
        />
      </div>

      <div
        ref={eventBodyRef}
        style={{ opacity: 0 }}
        className='relative 
                  bottom-0 min-h-[600px] 
                  w-full min-w-[350px] translate-x-[-4px] translate-y-[1px] border-l border-green-900/60 p-6 md:w-[calc(100%-200px)]'
      >
        <ShopSort />
        <ShopCategories />
        <ShopDescription />
        <ShopList/>
      </div>
    </div>
  )
}

export default ShopLayout
