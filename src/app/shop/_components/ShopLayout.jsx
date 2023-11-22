'use client'
import ShopSort from './ShopSort'
import ShopCategories from './ShopCategories'
import ShopDescription from './ShopDescription'
import ShopList from './ShopList'
import { eventpage_revealXAnimation, eventpage_revealYAnimation } from '@/utils/animations'
import { useProducts } from '@/utils/react-query/useProducts'
import { useState, useRef, useEffect } from 'react'

import gsap from 'gsap'
import CSSRulePlugin from 'gsap/CSSRulePlugin'
gsap.registerPlugin(CSSRulePlugin)

const ShopLayout = () => {
  const horizontalRef = useRef()
  const eventBodyRef = useRef()
  useEffect(() => {
    if (!horizontalRef.current) return
    let diagonalPseudo = CSSRulePlugin.getRule('.event-item-head::before') //get pseudo element
    eventpage_revealXAnimation({ horizontalLine: horizontalRef.current })
    eventpage_revealYAnimation({ diagonal: diagonalPseudo, vertical: eventBodyRef.current })
  }, [])

  const { products, isFetching, error, setProductsFilter, setProductsSubFilter } = useProducts()

  const [sortDateStatus, setSortDate] = useState('none') // none/ asc/ dsc
  const [sortPriceStatus, setSortPrice] = useState('none') // none/ asc/ dsc

  return (
    <div className='mt-12 flex h-auto w-full translate-y-16 flex-col items-end text-green-900'>
      <div
        className={
          'event-item-head relative h-[52px] w-full min-w-[350px] translate-x-12 justify-end md:w-[calc(100%-200px)]'
        }
      >
        <div
          ref={horizontalRef}
          style={{ opacity: 0 }}
          className='relative flex h-[52px] w-full border-t border-green-900/60'
        >
          <p className='absolute -top-8 right-0 inline-flex w-[260px] gap-4 '>
            <ShopSort setSortDate={setSortDate} setSortPrice={setSortPrice} />
          </p>
        </div>
      </div>

      <div
        ref={eventBodyRef}
        style={{ opacity: 0 }}
        className='relative 
                  bottom-0  
                  min-h-[600px] w-full min-w-[350px] translate-x-[-4px] 
                  translate-y-[1px] border-l border-green-900/60 md:w-[calc(100%-200px)]
                  '
      >
        <div className='flex w-screen flex-col justify-between px-8 md:absolute md:left-[-200px] md:flex-row'>
          <ShopCategories setProductsFilter={setProductsFilter} setProductsSubFilter={setProductsSubFilter} />
          <div className='w-full md:w-[calc(100%-200px)]'>
            <ShopDescription />
            <ShopList
              products={products}
              sortDateStatus={sortDateStatus}
              sortPriceStatus={sortPriceStatus}
              isFetching={isFetching}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopLayout
//
